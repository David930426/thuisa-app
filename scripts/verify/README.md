# CSS verification scripts

Small Node scripts that check a styling refactor didn't change how the site
looks. They compile the CSS with the project's own Tailwind and compare the
results, so they need the project's dependencies installed (`pnpm install`).

They compare compiled CSS, not screenshots. A change in HTML structure, such
as replacing a `<section>` with a `<Section>` component, isn't covered; check
those in a browser.

Run every command from the project root.

## check-step.mjs: check one refactoring step

The main script. It compares the files on disk with a git ref.

```bash
# before committing a step: compare with the last commit
node scripts/verify/check-step.mjs HEAD

# after committing it, and after `npm run build`: also check the production CSS
node scripts/verify/check-step.mjs HEAD~1 --built
```

It checks three things:

1. **Global CSS.** `app/globals.css` (with `styles/tokens.css` pasted in) is
   compiled at both versions without any utility classes. Every selector must
   resolve to the same values after following all `var()` references.
2. **Changed class strings.** For every line the step changed in `app/`,
   `components/` or `lib/`, the quoted strings on the old and new lines are
   compared. Old classes are compiled with the old CSS and new classes with
   the new CSS. Their effective style must match at 375, 640, 768, 1024 and
   1280px, including hover, focus and other states.
3. **With `--built`:** every class the step introduced must appear in the CSS
   files in `.next/static/css`. Tailwind silently skips classes it doesn't
   recognise, so a typo would otherwise go unnoticed.

It also reports new classes that generate no CSS at all, and lists hunks it
can't pair automatically (where the step added or removed lines) for you to
read by hand.

The exit code is 0 when everything matches and 1 otherwise.

**Limits**
- Only strings on the same line are paired. A class list split across lines
  differently in the new version shows up under "review by hand".
- Class names built at runtime (for example `` `text-${colour}` ``) aren't seen.
- `@supports` blocks are treated as supported, as in any current browser.
- Tailwind's internal `--tw-*` variables are ignored when only one side sets
  them. Tailwind registers them with `inherits: false`, so they only affect
  the element itself, and that effect shows in the real properties compared.
- Sizes are compared at a 16px root font. Values that only match at that size,
  such as `0.75rem + 4px` and `1rem`, are reported separately.

## compare.mjs: compare two compiled CSS files

```bash
node scripts/verify/compare.mjs old.css new.css
```

Prints declarations that exist in only one file, and declarations whose value
differs after resolving `var()` chains. Selectors must match. Exit code 1 if
anything differs.

## compile.mjs: compile CSS with the project's Tailwind

```bash
# app/globals.css at a git ref (WORKTREE = files on disk), with the project's
# source files scanned for classes as in a real build
node scripts/verify/compile.mjs --globals=dev out-dev.css
node scripts/verify/compile.mjs --globals=WORKTREE out-now.css

# any CSS file; relative imports resolve from app/
node scripts/verify/compile.mjs some.css out.css

# add --optimize to run Lightning CSS like a production build
```

Together with `compare.mjs`, this compares the whole site's CSS between two
versions. It only works when class names didn't change; use `check-step.mjs`
for renames.

## pairs.mjs: check the planned token renames

```bash
node scripts/verify/pairs.mjs dev
```

Compares a fixed list of old → new class pairs (for example `bg-white` →
`bg-surface`, `text-accent-300` → `text-gold-300`, the `type-*` roles). Old
classes are compiled with `app/globals.css` at the given ref, new ones with the
files on disk. Use a ref from before the token migration as the old side. Edit
the list at the top of the file to add pairs.

## lib.mjs

Shared helpers for the scripts above: compiling, reading `globals.css` at a
git ref, and computing the effective style of a set of classes.
