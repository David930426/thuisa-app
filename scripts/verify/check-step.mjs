// Check that a refactoring step did not change how the site looks.
//
// Usage: node scripts/verify/check-step.mjs <baseRef> [--built]
//   Compares the files on disk with <baseRef> (e.g. HEAD~1 after committing
//   a step, or HEAD before committing).
//   --built  also checks that every class the step introduced is present in
//            the production CSS in .next/static/css (run `next build` first).
//
// What it checks:
// 1. Global CSS: app/globals.css (with styles/tokens.css) compiled at both
//    versions, without any utility classes. Every selector must resolve to
//    the same values (base styles, .eyebrow, Swiper, shelf track, ...).
// 2. Changed class strings: for each line the step changed in app/,
//    components/ and lib/, the quoted strings on the old line are compared
//    with those on the new line. The old classes are compiled with the old
//    CSS and the new ones with the new CSS, and their effective style
//    (including hover/focus and breakpoints) must match at 375, 640, 768,
//    1024 and 1280px.
// 3. New classes that produce no CSS at all (typos, removed tokens).
// Hunks whose line counts differ cannot be paired automatically and are
// listed for a manual look.
//
// Exit code 1 if anything differs or needs a manual look.
import fs from "fs";
import os from "os";
import path from "path";
import { execFileSync } from "child_process";
import { compareClassSets, compile, git, globalsAt, indexCss, projectRoot } from "./lib.mjs";

const args = process.argv.slice(2);
const checkBuilt = args.includes("--built");
const base = args.find((a) => !a.startsWith("--"));
if (!base) {
  console.error("Usage: node scripts/verify/check-step.mjs <baseRef> [--built]");
  process.exit(2);
}

let problems = 0;
const section = (title) => console.log(`\n=== ${title}`);

// --- 1. Global CSS --------------------------------------------------------
section("1. Global CSS (globals.css + tokens.css, no utility classes)");
{
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "thuisa-check-"));
  const a = path.join(dir, "old.css");
  const b = path.join(dir, "new.css");
  fs.writeFileSync(a, await compile(globalsAt(base), { scan: false }));
  fs.writeFileSync(b, await compile(globalsAt("WORKTREE"), { scan: false }));
  let out;
  try {
    out = execFileSync(process.execPath, [path.join(projectRoot, "scripts/verify/compare.mjs"), a, b], { encoding: "utf8" });
    console.log("same resolved values");
  } catch (e) {
    out = e.stdout;
    problems++;
    console.log(out);
  }
  fs.rmSync(dir, { recursive: true, force: true });
}

// --- 2. Changed class strings ---------------------------------------------
const diff = git(["diff", "--unified=0", "--no-color", base, "--", "app", "components", "lib"]).replace(/\r/g, "");
const pairs = []; // { file, line, oldLine, newLine }
const unpaired = [];
{
  let file = null;
  let hunk = null;
  const flush = () => {
    if (!hunk) return;
    // CSS files are covered by section 1; only source files hold class strings.
    if (!/\.(tsx?|jsx?|mjs)$/.test(file ?? "")) { hunk = null; return; }
    if (hunk.removed.length === hunk.added.length) {
      hunk.removed.forEach((oldLine, i) => pairs.push({ file, line: hunk.start + i, oldLine, newLine: hunk.added[i] }));
    } else if (hunk.removed.length || hunk.added.length) {
      unpaired.push({ file, line: hunk.start, ...hunk });
    }
    hunk = null;
  };
  for (const line of diff.split("\n")) {
    if (line.startsWith("diff --git")) { flush(); file = null; }
    else if (line.startsWith("+++ ")) file = line.slice(4).replace(/^b\//, "");
    else if (line.startsWith("@@")) { flush(); hunk = { start: Number(line.match(/\+(\d+)/)[1]), removed: [], added: [] }; }
    else if (hunk && line.startsWith("-")) hunk.removed.push(line.slice(1));
    else if (hunk && line.startsWith("+")) hunk.added.push(line.slice(1));
  }
  flush();
}

/** Quoted strings on a line (template-literal ${...} parts removed). */
function strings(line) {
  const out = [];
  for (const m of line.matchAll(/"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`/g)) {
    out.push((m[1] ?? m[2] ?? m[3].replace(/\$\{[^}]*\}/g, " ")).trim());
  }
  return out;
}
const tokens = (s) => s.split(/\s+/).filter(Boolean);
const looksLikeClass = (t) => /^[!a-z0-9:[\]/.%()_,=&>*'-]+$/i.test(t) && /-/.test(t) && !/^[/#.]|https?:/.test(t);

const comparisons = []; // { where, oldTokens, newTokens }
for (const p of pairs) {
  const a = strings(p.oldLine);
  const b = strings(p.newLine);
  const where = `${p.file}:${p.line}`;
  if (a.length === b.length) a.forEach((s, i) => s !== b[i] && comparisons.push({ where, oldTokens: tokens(s), newTokens: tokens(b[i]) }));
  else comparisons.push({ where: `${where} (strings merged)`, oldTokens: tokens(a.join(" ")), newTokens: tokens(b.join(" ")) });
}

const oldIndex = indexCss(await compile(globalsAt(base), { scan: false, classes: comparisons.flatMap((c) => c.oldTokens) }));
const newIndex = indexCss(await compile(globalsAt("WORKTREE"), { scan: false, classes: comparisons.flatMap((c) => c.newTokens) }));

section(`2. Changed class strings (${comparisons.length} compared, ${pairs.length} changed lines)`);
const introduced = new Set();
let checked = 0;
for (const c of comparisons) {
  const hasClasses = c.oldTokens.some((t) => oldIndex.rules.has(t)) || c.newTokens.some((t) => newIndex.rules.has(t));
  const noCss = c.newTokens.filter((t) => !newIndex.rules.has(t) && looksLikeClass(t) && (oldIndex.rules.has(t) || !c.oldTokens.includes(t)));
  for (const t of c.newTokens) if (newIndex.rules.has(t) && !c.oldTokens.includes(t)) introduced.add(t);
  if (!hasClasses && !noCss.length) continue;
  checked++;
  const issues = compareClassSets(oldIndex, c.oldTokens, newIndex, c.newTokens);
  if (noCss.length) issues.unshift(`classes that generate no CSS: ${noCss.join(", ")}`);
  if (issues.length) {
    problems++;
    console.log(`DIFF ${c.where}\n   old: ${c.oldTokens.join(" ")}\n   new: ${c.newTokens.join(" ")}\n   ${issues.join("\n   ")}`);
  }
}
console.log(`${checked} class strings checked`);

section(`Hunks to review by hand (${unpaired.length})`);
for (const u of unpaired) {
  problems++;
  console.log(`${u.file}:${u.line}\n${u.removed.map((l) => `  - ${l.trim()}`).join("\n")}\n${u.added.map((l) => `  + ${l.trim()}`).join("\n")}`);
}

// --- 3. Built CSS ----------------------------------------------------------
if (checkBuilt) {
  section(`3. New classes in the production CSS (${introduced.size})`);
  const dir = path.join(projectRoot, ".next", "static", "css");
  const built = new Set();
  for (const f of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
    if (!f.endsWith(".css")) continue;
    for (const m of fs.readFileSync(path.join(dir, f), "utf8").matchAll(/\.((?:\\.|[\w-])+)/g)) built.add(m[1].replace(/\\(.)/g, "$1"));
  }
  if (!built.size) {
    problems++;
    console.log("no CSS found in .next/static/css; run `next build` first");
  }
  const missing = [...introduced].filter((c) => !built.has(c));
  if (missing.length) {
    problems++;
    console.log(`missing: ${missing.join(", ")}`);
  } else console.log(`all present${introduced.size ? `: ${[...introduced].sort().join(" ")}` : ""}`);
}

console.log(problems ? `\n${problems} item(s) need attention` : "\nOK: no differences");
process.exitCode = problems ? 1 : 0;
