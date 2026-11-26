// Shared helpers for the CSS verification scripts in this folder.
// They compile CSS with the project's own Tailwind (@tailwindcss/postcss),
// so results match what `next build` produces, minus minification.
import { createRequire } from "module";
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const req = createRequire(path.join(projectRoot, "package.json"));
export const postcss = req("postcss");
const tailwind = req("@tailwindcss/postcss");

// Used only to resolve imports such as "../styles/tokens.css"; never written.
const virtualFrom = path.join(projectRoot, "app", "__virtual__.css");

/** Run git in the project and return stdout as text. */
export function git(args) {
  return execFileSync("git", args, { cwd: projectRoot, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

function readAt(ref, file) {
  if (ref === "WORKTREE") return fs.readFileSync(path.join(projectRoot, file), "utf8");
  try {
    return git(["show", `${ref}:${file}`]);
  } catch {
    return null;
  }
}

/**
 * app/globals.css as it was at `ref` ("WORKTREE" = files on disk), with
 * styles/tokens.css from the same ref pasted in place of its import, so an
 * old version can be compiled against its own tokens.
 */
export function globalsAt(ref) {
  const globals = readAt(ref, "app/globals.css");
  if (globals === null) throw new Error(`app/globals.css not found at ${ref}`);
  return globals.replace(/@import\s+["']\.\.\/styles\/tokens\.css["'];?/, () => {
    const tokens = readAt(ref, "styles/tokens.css");
    if (tokens === null) throw new Error(`styles/tokens.css not found at ${ref}`);
    return tokens;
  });
}

/**
 * Compile CSS with Tailwind.
 * - classes: extra class names to generate (via @source inline)
 * - scan: false turns off scanning the project's source files, so only
 *   `classes` (plus plain CSS) end up in the output
 * - optimize: true runs Lightning CSS like a production build
 */
export async function compile(css, { classes = [], scan = true, optimize = false } = {}) {
  let input = css;
  if (!scan) input = input.replace(/@import\s+["']tailwindcss["'];/, '@import "tailwindcss" source(none);');
  if (classes.length) input += `\n@source inline(${JSON.stringify([...new Set(classes)].join(" "))});\n`;
  const result = await postcss([tailwind({ base: projectRoot, optimize: optimize ? { minify: false } : false })]).process(input, { from: virtualFrom });
  for (const warning of result.warnings()) console.error("WARN", warning.toString());
  return result.css;
}

// ---------------------------------------------------------------------------
// Effective style of a set of classes, as a browser would apply it.
// ---------------------------------------------------------------------------

/** Index the compiled CSS: :root variables and every single-class rule. */
export function indexCss(cssText) {
  const root = postcss.parse(cssText);
  const vars = {};
  const rules = new Map(); // class name -> list of { minW, key, prop, value } in stylesheet order
  const order = [];
  let seq = 0; // position in the stylesheet, for the cascade
  root.walkRules((rule) => {
    const sel = rule.selector.trim();
    if (sel.includes(":root")) {
      rule.each((n) => {
        if (n.type === "decl" && n.prop.startsWith("--")) vars[n.prop] = n.value;
      });
      return;
    }
    const parent = rule.parent;
    const topLevel = parent.type === "root" || (parent.type === "atrule" && parent.name === "layer");
    const m = sel.match(/^\.((?:\\.|[\w-])+)$/);
    if (!topLevel || !m) return;
    const cls = m[1].replace(/\\(.)/g, "$1");
    const decls = rules.get(cls) ?? [];
    const walk = (node, minW, ctx) =>
      node.each((n) => {
        if (n.type === "decl") decls.push({ minW, key: `${ctx}|${n.prop}`, ctx, prop: n.prop, value: n.value, seq: seq++ });
        else if (n.type === "rule") walk(n, minW, `${ctx} ${n.selector.replace(/\s+/g, " ")}`);
        else if (n.type === "atrule" && n.name === "media") {
          const w = n.params.match(/^\(\s*width\s*>=\s*([\d.]+)rem\s*\)$/);
          if (w) walk(n, Math.max(minW, Number(w[1]) * 16), ctx);
          else walk(n, minW, `${ctx} @media ${n.params.replace(/\s+/g, " ")}`);
        } else if (n.type === "atrule" && n.name === "supports") walk(n, minW, ctx); // assume a modern browser
        else if (n.type === "atrule") walk(n, minW, `${ctx} @${n.name} ${n.params}`);
      });
    walk(rule, 0, "");
    rules.set(cls, decls);
    order.push(cls);
  });
  return { vars, rules, order };
}

export function resolveVars(value, vars, depth = 0) {
  if (depth > 30 || !value.includes("var(")) return value;
  return resolveVars(
    value.replace(/var\((--[\w-]+)\s*(?:,((?:[^()]|\((?:[^()]|\([^()]*\))*\))*))?\)/, (_, name, fallback) =>
      name in vars ? vars[name] : fallback !== undefined ? fallback.trim() : `<unset ${name}>`
    ),
    vars,
    depth + 1
  );
}

const calc = (v) => v.replace(/calc\(([\d.]+)rem \* ([\d.]+)\)/g, (_, a, b) => `${+(a * b).toFixed(4)}rem`);
export const normalise = (v) =>
  calc(v)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/#([0-9a-f])([0-9a-f])([0-9a-f])\b/g, "#$1$1$2$2$3$3")
    .replace(/\s*,\s*/g, ",")
    .trim();

/** Convert rem/calc lengths to px at a 16px root, for "equal only at 16px" checks. */
export const toPx = (v) =>
  v &&
  v
    .replace(/calc\(([\d.]+)rem \+ ([\d.]+)px\)/g, (_, a, b) => `${a * 16 + +b}px`)
    .replace(/calc\(([\d.]+)rem - ([\d.]+)px\)/g, (_, a, b) => `${a * 16 - b}px`)
    .replace(/([\d.]+)rem/g, (_, a) => `${a * 16}px`);

/**
 * Effective declarations for an element carrying `classes` at viewport
 * `width`. Returns { styles: {key: value}, unknown: [classes with no CSS] }.
 */
export function effectiveStyle(index, classes, width) {
  const list = [...new Set(classes)];
  const known = list.filter((c) => index.rules.has(c));
  const decls = known.flatMap((c) => index.rules.get(c)).filter((d) => d.minW <= width);
  decls.sort((a, b) => a.seq - b.seq); // later in the stylesheet wins
  const own = {};
  for (const d of decls) own[d.key] = d;
  const styles = {};
  for (const d of Object.values(own)) {
    const local = { ...index.vars };
    for (const o of Object.values(own)) if (o.prop.startsWith("--") && (o.ctx === "" || o.ctx === d.ctx)) local[o.prop] = o.value;
    styles[d.key] = normalise(resolveVars(d.value, local));
  }
  return { styles, unknown: list.filter((c) => !index.rules.has(c)) };
}

export const WIDTHS = [375, 640, 768, 1024, 1280];

/** Compare two class sets in two compiled worlds. Returns a list of differences. */
export function compareClassSets(oldIndex, oldClasses, newIndex, newClasses) {
  const issues = new Set();
  for (const w of WIDTHS) {
    const a = effectiveStyle(oldIndex, oldClasses, w).styles;
    const b = effectiveStyle(newIndex, newClasses, w).styles;
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (a[key] === b[key]) continue;
      if (a[key] && b[key] && toPx(a[key]) === toPx(b[key])) issues.add(`${key}: equal only at a 16px root font size (${a[key]} vs ${b[key]})`);
      else issues.add(`@${w}px ${key}: old=${a[key] ?? "(none)"} new=${b[key] ?? "(none)"}`);
    }
  }
  return [...issues];
}
