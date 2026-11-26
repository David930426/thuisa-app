// Compare two compiled Tailwind outputs after resolving var() chains to final
// values. Every declaration is keyed by its selector and at-rule context.
// Usage: node scripts/verify/compare.mjs <a.css> <b.css>
// Exit code 1 if anything differs.
import fs from "fs";
import { postcss } from "./lib.mjs";

const [aFile, bFile] = process.argv.slice(2);
if (!aFile || !bFile) {
  console.error("Usage: node scripts/verify/compare.mjs <a.css> <b.css>");
  process.exit(2);
}

function isRootSel(sel) {
  return /^(:root|:host|:root,\s*:host|:host,\s*:root)$/.test(sel.replace(/\s+/g, " ").trim()) || sel.includes(":root");
}

function load(file) {
  const root = postcss.parse(fs.readFileSync(file, "utf8"));
  const vars = {};
  const decls = [];
  root.walkDecls((d) => {
    const chain = [];
    for (let p = d.parent; p && p.type !== "root"; p = p.parent) {
      if (p.type === "rule") chain.unshift(p.selector.replace(/\s+/g, " "));
      else if (p.type === "atrule") chain.unshift("@" + p.name + " " + p.params.replace(/\s+/g, " "));
    }
    const ctx = chain.join(" > ");
    const inRoot = d.parent.type === "rule" && isRootSel(d.parent.selector);
    if (d.prop.startsWith("--") && inRoot) { vars[d.prop] = d.value; return; }
    decls.push({ ctx, prop: d.prop, value: d.value });
  });
  return { vars, decls };
}

function resolve(value, vars, depth = 0) {
  if (depth > 30) return value;
  let out = "", i = 0;
  while (i < value.length) {
    const j = value.indexOf("var(", i);
    if (j < 0) { out += value.slice(i); break; }
    out += value.slice(i, j);
    let k = j + 4, lvl = 1;
    while (k < value.length && lvl) { if (value[k] === "(") lvl++; else if (value[k] === ")") lvl--; k++; }
    const inner = value.slice(j + 4, k - 1);
    const comma = (() => { let l = 0; for (let n = 0; n < inner.length; n++) { const c = inner[n]; if (c === "(") l++; else if (c === ")") l--; else if (c === "," && !l) return n; } return -1; })();
    const name = (comma < 0 ? inner : inner.slice(0, comma)).trim();
    const fb = comma < 0 ? null : inner.slice(comma + 1).trim();
    if (name in vars) out += resolve(vars[name], vars, depth + 1);
    else if (fb !== null) out += "var(" + name + "," + resolve(fb, vars, depth + 1) + ")";
    else out += "var(" + name + ")";
    i = k;
  }
  return out;
}

const norm = (v) => v.toLowerCase().replace(/\s+/g, " ").replace(/#([0-9a-f])([0-9a-f])([0-9a-f])\b/g, "#$1$1$2$2$3$3").replace(/\s*,\s*/g, ",").trim();

function table(file) {
  const { vars, decls } = load(file);
  const m = new Map();
  for (const d of decls) {
    let key = d.ctx + " | " + d.prop, n = 0;
    while (m.has(key + "#" + n)) n++;
    m.set(key + "#" + n, norm(resolve(d.value, vars)));
  }
  return { m, vars };
}

const A = table(aFile), B = table(bFile);
const onlyA = [], onlyB = [], diff = [];
for (const [k, v] of A.m) { if (!B.m.has(k)) onlyA.push(k + " = " + v); else if (B.m.get(k) !== v) diff.push(k + "\n    A: " + v + "\n    B: " + B.m.get(k)); }
for (const [k, v] of B.m) if (!A.m.has(k)) onlyB.push(k + " = " + v);
console.log("declarations A:", A.m.size, " B:", B.m.size);
console.log("\n== only in A (" + onlyA.length + ")\n" + onlyA.join("\n"));
console.log("\n== only in B (" + onlyB.length + ")\n" + onlyB.join("\n"));
console.log("\n== different resolved value (" + diff.length + ")\n" + diff.join("\n"));
process.exitCode = onlyA.length || onlyB.length || diff.length ? 1 : 0;
