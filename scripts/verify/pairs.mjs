// For each [old classes, new classes] pair below, compare the effective style
// at 375/640/768/1024/1280px: old classes compiled with app/globals.css at
// <oldRef>, new classes compiled with app/globals.css at <newRef>.
// Hover/focus states are compared too.
//
// Usage: node scripts/verify/pairs.mjs <oldRef> [newRef]
//   oldRef  git ref before the token migration, e.g. dev
//   newRef  default WORKTREE (the files on disk)
// Exit code 1 if any pair differs.
import { compareClassSets, compile, globalsAt, indexCss } from "./lib.mjs";

const [oldRef, newRef = "WORKTREE"] = process.argv.slice(2);
if (!oldRef) {
  console.error("Usage: node scripts/verify/pairs.mjs <oldRef> [newRef]");
  process.exit(2);
}

const H = "font-display"; // h1-h4 get font-display from the base layer
const pairs = [
  // gold rename
  ["text-accent-700", "text-gold-700"], ["text-accent-300", "text-gold-300"],
  ["bg-accent-300", "bg-gold-300"], ["bg-accent-300/70", "bg-gold-300/70"], ["bg-accent-500", "bg-gold-500"],
  ["bg-accent-50", "bg-gold-50"], ["border-accent-400", "border-gold-400"], ["from-accent-300/40", "from-gold-300/40"],
  ["hover:bg-accent-50", "hover:bg-gold-50"],
  // shadcn grey accent and friends, unchanged
  ["bg-accent text-accent-foreground", "bg-accent text-accent-foreground"], ["bg-accent/50", "bg-accent/50"],
  ["bg-background text-foreground", "bg-background text-foreground"], ["text-muted-foreground", "text-muted-foreground"],
  ["bg-primary text-primary-foreground", "bg-primary text-primary-foreground"], ["border-border", "border-border"],
  ["bg-secondary text-secondary-foreground", "bg-secondary text-secondary-foreground"], ["bg-muted", "bg-muted"],
  ["bg-card text-card-foreground", "bg-card text-card-foreground"], ["bg-popover", "bg-popover"], ["bg-destructive", "bg-destructive"],
  ["border-input", "border-input"], ["ring-ring", "ring-ring"],
  // semantic surfaces and text
  ["bg-white", "bg-surface"], ["bg-ink-50", "bg-surface-muted"],
  ["bg-ink-100", "bg-surface-sunken"], ["bg-ink-900", "bg-surface-inverse"],
  ["text-ink-900", "text-fg"], ["text-ink-800", "text-fg-body"], ["text-ink-600", "text-fg-muted"],
  ["text-white", "text-fg-inverse"], ["text-ink-400", "text-fg-inverse-muted"],
  ["border-ink-200", "border-border"], ["ring-ink-200", "ring-border"],
  // layout
  ["max-w-7xl", "max-w-page"], ["max-w-3xl", "max-w-reading"], ["px-5 sm:px-8", "px-gutter sm:px-gutter-wide"],
  ["h-20", "h-header"], ["scroll-mt-24", "scroll-mt-anchor"],
  ["py-12 md:py-16", "section-y-tight"], ["py-16 md:py-24", "section-y"], ["py-20 md:py-32", "section-y-loose"],
  ["rounded-2xl", "rounded-card"], ["rounded-[18px]", "rounded-shelf"], ["rounded-[28px]", "rounded-feature"],
  ["shadow-[2px_4px_12px_rgba(0,0,0,0.08)]", "shadow-shelf"],
  // type roles (old strings copied from the components)
  [`${H} text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl`, "type-display"],
  [`${H} text-4xl font-bold leading-[1.05] md:text-6xl`, "type-h1"],
  [`${H} text-3xl font-bold leading-[1.1] md:text-4xl lg:text-5xl`, "type-h2"],
  ["font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl", "type-headline"],
  ["font-display text-2xl font-bold md:text-3xl", "type-h3"],
  ["font-display text-xl font-bold", "type-title"],
  ["font-display text-lg font-bold", "type-title-sm"],
  ["text-base leading-relaxed md:text-lg", "type-lead"],
  ["text-lg leading-relaxed md:text-xl", "type-lead-lg"],
  ["text-base leading-relaxed", "type-body"], ["text-sm leading-relaxed", "type-small"],
  ["text-xs font-semibold uppercase tracking-[0.18em]", "type-eyebrow"],
  ["font-display text-4xl font-extrabold md:text-5xl", "type-stat"],
  ["text-[11px]", "text-micro"], ["tracking-[0.18em]", "tracking-eyebrow"], ["tracking-[0.16em]", "tracking-label"],
  [`${H} text-2xl font-extrabold md:text-3xl`, "type-h3 font-extrabold"],
];

const split = (s) => s.split(" ");
const oldIndex = indexCss(await compile(globalsAt(oldRef), { scan: false, classes: pairs.flatMap((p) => split(p[0])) }));
const newIndex = indexCss(await compile(globalsAt(newRef), { scan: false, classes: pairs.flatMap((p) => split(p[1])) }));

let bad = 0;
for (const [o, n] of pairs) {
  const missing = [...split(o).filter((c) => !oldIndex.rules.has(c)).map((c) => `old:${c}`), ...split(n).filter((c) => !newIndex.rules.has(c)).map((c) => `new:${c}`)];
  const issues = missing.length ? [`classes that generate no CSS: ${missing.join(", ")}`] : compareClassSets(oldIndex, split(o), newIndex, split(n));
  if (issues.length) {
    bad++;
    console.log(`DIFF  "${o}"  ->  "${n}"\n   ${issues.join("\n   ")}`);
  }
}
console.log(`\n${pairs.length} pairs checked (${oldRef} -> ${newRef}), ${bad} with differences`);
process.exitCode = bad ? 1 : 0;
