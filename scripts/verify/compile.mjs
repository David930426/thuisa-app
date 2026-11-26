// Compile a CSS file (or app/globals.css at a git ref) with the project's
// Tailwind and write the result.
//
// Usage:
//   node scripts/verify/compile.mjs <input.css> <out.css> [--optimize]
//   node scripts/verify/compile.mjs --globals=<ref> <out.css> [--optimize]
//
// <ref> is a git ref such as dev or HEAD~1, or WORKTREE for the files on disk.
// With --globals, styles/tokens.css from the same ref is pasted in, and the
// project's source files are scanned as usual. --optimize runs Lightning CSS
// like a production build (without minifying).
import fs from "fs";
import path from "path";
import { compile, globalsAt } from "./lib.mjs";

const args = process.argv.slice(2);
const optimize = args.includes("--optimize");
const [input, out] = args.filter((a) => a !== "--optimize");
if (!input || !out) {
  console.error("Usage: node scripts/verify/compile.mjs <input.css | --globals=REF> <out.css> [--optimize]");
  process.exit(2);
}

const css = input.startsWith("--globals=") ? globalsAt(input.slice("--globals=".length)) : fs.readFileSync(path.resolve(input), "utf8");
const result = await compile(css, { optimize });
fs.writeFileSync(out, result);
console.log("ok", out, result.length, "bytes");
