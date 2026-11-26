// Compare the pre-rendered HTML of a production build with a saved baseline.
//
// Usage:
//   node scripts/verify/compare-html.mjs --save <dir>
//       Copy the pages in .next/server/app/*.html and the CSS they link to into
//       <dir>, and record the current commit in <dir>/REF. Run `next build`
//       first, on a clean working tree, at the version you want as baseline.
//   node scripts/verify/compare-html.mjs <dir> [--verbose]
//       Compare the pages of the current build (.next) with the baseline.
//       --verbose also lists elements whose class lists changed but render
//       the same.
//
// For every page it compares the element tree, attributes, and text after
// removing noise that does not affect what is rendered: scripts (including
// React's flight data), script preloads, comments, build ids, stylesheet file
// names, and React useId values (renumbered in order of appearance, so ids
// still have to match up with their aria-* references).
//
// Class attributes are compared as sets. When an element's classes differ,
// their effective style is compared the same way check-step.mjs does it: old
// classes with app/globals.css at the baseline's commit, new classes with the
// files on disk, at 375-1280px including hover and focus states. Classes that
// produce no CSS of their own (`group`, `peer`, next/font classes) must match
// exactly, because they change how other elements are styled.
//
// The CSS each page links to is compared too, as text (rules only in one
// version are listed).
//
// It only sees the HTML rendered on the server. Client-only UI (dialogs,
// sheets, select menus, toasts) and hover/scroll states that need JavaScript
// are not covered; check those with check-step.mjs or in a browser.
//
// Exit code 1 if anything differs.
import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { compareClassSets, compile, git, globalsAt, indexCss, postcss, projectRoot } from "./lib.mjs";

const req = createRequire(path.join(projectRoot, "package.json"));
const { parse } = req("next/dist/compiled/node-html-parser");

const args = process.argv.slice(2);
const appDir = path.join(projectRoot, ".next", "server", "app");
const staticDir = path.join(projectRoot, ".next");

function pages(dir) {
  return fs.readdirSync(dir).filter((f) => f.endsWith(".html")).sort();
}

/** Stylesheets a page links to, in document order, as paths under .next. */
function stylesheets(html) {
  return [...html.matchAll(/<link rel="stylesheet" href="\/_next\/([^"]+)"/g)].map((m) => m[1]);
}

// --- save mode ---------------------------------------------------------------
if (args[0] === "--save") {
  const dir = path.resolve(args[1] ?? "");
  if (!args[1]) {
    console.error("Usage: node scripts/verify/compare-html.mjs --save <dir>");
    process.exit(2);
  }
  if (git(["status", "--porcelain"]).trim()) console.warn("warning: the working tree has changes; REF will not describe them");
  fs.mkdirSync(path.join(dir, "css"), { recursive: true });
  for (const page of pages(appDir)) {
    const html = fs.readFileSync(path.join(appDir, page), "utf8");
    fs.writeFileSync(path.join(dir, page), html);
    for (const css of stylesheets(html)) {
      const target = path.join(dir, "css", css);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(path.join(staticDir, css), target);
    }
  }
  const ref = git(["rev-parse", "HEAD"]).trim();
  fs.writeFileSync(path.join(dir, "REF"), ref + "\n");
  console.log(`saved ${pages(appDir).length} pages at ${ref} to ${dir}`);
  process.exit(0);
}

// --- compare mode ------------------------------------------------------------
const verbose = args.includes("--verbose");
const baseArg = args.find((a) => !a.startsWith("--"));
const baseDir = baseArg && path.resolve(baseArg);
if (!baseDir || !fs.existsSync(path.join(baseDir, "REF"))) {
  console.error("Usage: node scripts/verify/compare-html.mjs <baseline dir saved with --save>");
  process.exit(2);
}
const baseRef = fs.readFileSync(path.join(baseDir, "REF"), "utf8").trim();

const ID = /_R_[0-9a-zA-Z]*_|«[^»]*»|:R[0-9a-zA-Z]*:/g;

/** Parse a page into a plain tree with the noise removed. */
function load(html) {
  const ids = new Map();
  const fixIds = (v) => v.replace(ID, (m) => {
    if (!ids.has(m)) ids.set(m, `«id${ids.size}»`);
    return ids.get(m);
  });
  const root = parse(html, { comment: false, blockTextElements: { script: true, style: true, noscript: true, pre: true } });
  const convert = (node) => {
    if (node.nodeType === 3) return { text: node.rawText };
    const tag = (node.rawTagName ?? "").toLowerCase();
    const attrs = { ...node.attributes };
    if (tag === "script") return null;
    if (tag === "link" && attrs.rel === "preload" && attrs.as === "script") return null;
    if (tag === "link" && attrs.rel === "stylesheet") attrs.href = "(stylesheet)";
    for (const [k, v] of Object.entries(attrs)) attrs[k] = fixIds(v);
    const classes = (attrs.class ?? "").split(/\s+/).filter(Boolean);
    delete attrs.class;
    const children = [];
    for (const child of node.childNodes) {
      const c = convert(child);
      if (!c) continue;
      const last = children[children.length - 1];
      // React separates adjacent text with <!-- -->; join them back up.
      if (c.text !== undefined && last && last.text !== undefined) last.text += c.text;
      else children.push(c);
    }
    for (const c of children) if (c.text !== undefined) c.text = c.text.replace(/\s+/g, " ");
    return { tag, attrs, classes, children };
  };
  return convert(root);
}

const label = (el) => {
  let s = el.tag;
  if (el.tag === "html" || el.tag === "body") return s;
  if (el.attrs.id) s += `#${el.attrs.id}`;
  else if (el.classes.length) s += `.${el.classes.slice(0, 3).join(".")}`;
  return s;
};
const short = (t) => JSON.stringify(t.length > 70 ? t.slice(0, 67) + "..." : t);

let totalProblems = 0;
const classChecks = []; // { page, where, oldClasses, newClasses }
const results = new Map(); // page -> list of problems

function diffTree(page, a, b, where, problems) {
  if (a.text !== undefined || b.text !== undefined) {
    if (a.text !== b.text) problems.push(`${where}: text ${short(a.text ?? `<${a.tag}>`)} -> ${short(b.text ?? `<${b.tag}>`)}`);
    return;
  }
  if (a.tag !== b.tag) {
    problems.push(`${where}: <${a.tag}> -> <${b.tag}>`);
    return;
  }
  for (const k of new Set([...Object.keys(a.attrs), ...Object.keys(b.attrs)])) {
    if (a.attrs[k] !== b.attrs[k]) problems.push(`${where}: [${k}] ${short(String(a.attrs[k]))} -> ${short(String(b.attrs[k]))}`);
  }
  const sa = [...new Set(a.classes)].sort().join(" ");
  const sb = [...new Set(b.classes)].sort().join(" ");
  if (sa !== sb) classChecks.push({ page, where, oldClasses: a.classes, newClasses: b.classes });
  if (a.children.length !== b.children.length) {
    const kids = (el) => el.children.map((c) => (c.text !== undefined ? short(c.text) : label(c))).join(", ");
    problems.push(`${where}: ${a.children.length} -> ${b.children.length} children\n      old: ${kids(a)}\n      new: ${kids(b)}`);
    return;
  }
  const counts = {};
  a.children.forEach((child, i) => {
    const name = child.text !== undefined ? "#text" : child.tag;
    counts[name] = (counts[name] ?? 0) + 1;
    const step = child.text !== undefined ? `#text[${counts[name]}]` : `${label(child)}[${counts[name]}]`;
    diffTree(page, child, b.children[i], where ? `${where} > ${step}` : step, problems);
  });
}

/** CSS rules as "selector-chain { decls }" strings, for a text-level diff. */
function cssRules(files) {
  const out = [];
  for (const file of files) {
    postcss.parse(fs.readFileSync(file, "utf8")).walkRules((rule) => {
      const chain = [];
      for (let p = rule.parent; p && p.type !== "root"; p = p.parent) if (p.type === "atrule") chain.unshift(`@${p.name} ${p.params}`);
      const decls = rule.nodes.filter((n) => n.type === "decl").map((d) => `${d.prop}:${d.value}${d.important ? "!important" : ""}`).join(";");
      out.push(`${chain.join(" ")} ${rule.selector} {${decls}}`.trim());
    });
  }
  return out;
}

const basePages = pages(baseDir);
const newPages = pages(appDir);
for (const p of new Set([...basePages, ...newPages])) {
  if (!basePages.includes(p) || !newPages.includes(p)) {
    results.set(p, [`page only in ${basePages.includes(p) ? "baseline" : "current build"}`]);
    continue;
  }
  const oldHtml = fs.readFileSync(path.join(baseDir, p), "utf8");
  const newHtml = fs.readFileSync(path.join(appDir, p), "utf8");
  const problems = [];
  diffTree(p, load(oldHtml), load(newHtml), "", problems);

  // CSS linked from the page, compared rule by rule, in order.
  const oldCss = cssRules(stylesheets(oldHtml).map((f) => path.join(baseDir, "css", f)));
  const newCss = cssRules(stylesheets(newHtml).map((f) => path.join(staticDir, f)));
  if (oldCss.join("\n") !== newCss.join("\n")) {
    const onlyOld = oldCss.filter((r) => !newCss.includes(r));
    const onlyNew = newCss.filter((r) => !oldCss.includes(r));
    const lines = [...onlyOld.map((r) => `      - ${r}`), ...onlyNew.map((r) => `      + ${r}`)];
    problems.push(`CSS differs (${onlyOld.length} rules only in baseline, ${onlyNew.length} only in current${lines.length ? "" : "; same rules, different order"})\n${lines.slice(0, 40).join("\n")}${lines.length > 40 ? `\n      ... ${lines.length - 40} more` : ""}`);
  }
  results.set(p, problems);
}

// Effective style of elements whose class lists differ.
if (classChecks.length) {
  const oldIndex = indexCss(await compile(globalsAt(baseRef), { scan: false, classes: classChecks.flatMap((c) => c.oldClasses) }));
  const newIndex = indexCss(await compile(globalsAt("WORKTREE"), { scan: false, classes: classChecks.flatMap((c) => c.newClasses) }));
  for (const c of classChecks) {
    const issues = compareClassSets(oldIndex, c.oldClasses, newIndex, c.newClasses);
    const markersOld = c.oldClasses.filter((x) => !oldIndex.rules.has(x));
    const markersNew = c.newClasses.filter((x) => !newIndex.rules.has(x));
    const lost = markersOld.filter((x) => !markersNew.includes(x));
    const gained = markersNew.filter((x) => !markersOld.includes(x));
    if (lost.length || gained.length) issues.unshift(`classes without CSS of their own differ: -[${lost.join(" ")}] +[${gained.join(" ")}]`);
    if (issues.length) {
      results.get(c.page).push(`${c.where}: classes differ in effect\n      old: ${c.oldClasses.join(" ")}\n      new: ${c.newClasses.join(" ")}\n      ${issues.join("\n      ")}`);
    } else {
      c.same = true;
    }
  }
}

console.log(`Baseline: ${baseDir} (built at ${baseRef.slice(0, 7)})\n`);
for (const [page, problems] of results) {
  const reordered = classChecks.filter((c) => c.page === page && c.same).length;
  const note = reordered ? ` (${reordered} element(s) with different class lists, same effective style)` : "";
  if (problems.length) {
    totalProblems += problems.length;
    console.log(`DIFF  ${page}: ${problems.length} difference(s)${note}`);
    for (const p of problems) console.log(`   ${p}`);
  } else console.log(`same  ${page}${note}`);
  if (verbose) {
    for (const c of classChecks.filter((x) => x.page === page && x.same)) {
      console.log(`   ~ ${c.where}
      old: ${c.oldClasses.join(" ")}
      new: ${c.newClasses.join(" ")}`);
    }
  }
}
console.log(totalProblems ? `\n${totalProblems} difference(s)` : "\nOK: every page renders the same HTML");
process.exitCode = totalProblems ? 1 : 0;
