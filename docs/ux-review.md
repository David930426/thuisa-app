# THUISA website UX review

Review of the THUISA site (Next.js 15, React 19, Tailwind 4) for two groups of
visitors: Indonesian students already at Tunghai, and new or prospective
students looking for information.

- **Reviewed:** 26 November 2026, from the source code. The site was built and
  its pages fetched, but not clicked through in a browser.
- **Status:** steps 1 and 2 of the plan are done, and the code part of step 3
  (CSS tokens, component folders, one heading and card system, cleanup) is done
  on the `step-3b-components` branch (see [Order of work](#order-of-work)).
  Each problem below is marked **Fixed** or **Open**.
- **Information the committee must supply** (links, figures, photos, hosting)
  is tracked in [TODO.md](../TODO.md) with file and line references.

## Contents

1. [Problems for visitors](#problems-for-visitors)
2. [Problems in the code and CSS](#problems-in-the-code-and-css)
3. [Proposed layout](#proposed-layout)
4. [Proposed components and CSS](#proposed-components-and-css)
5. [Order of work](#order-of-work)
6. [Open items](#open-items)
7. [Questions for the committee](#questions-for-the-committee)

## Problems for visitors

Ranked by impact.

### Critical

| # | Problem | Status |
|---|---|---|
| 1 | **Wrong safety and immigration facts.** The foreigner hotline was listed as 0800-024-111 (replaced by 1990 in July 2022). The ARC deadline was "15 days" (30 days for Resident Visa holders). | **Fixed** in step 1. The guide links to the [NIA student guideline](https://www.immigration.gov.tw/5475/5478/141465/141808/417829/cp_news). Other claims are still unverified; see [TODO.md](../TODO.md) section 7. |
| 2 | **Main actions led nowhere.** The membership form opened google.com and LINE opened the generic LINE homepage. No way to join the student group chat. | **Partly fixed.** The buttons are hidden until real links are added in [lib/links.ts](../lib/links.ts). Some text still refers to them; see [Open items](#open-items). |
| 3 | **Contact form copied from another project.** "Complaint" wording, product/delivery/billing categories, another company's email address in the README. | **Partly fixed** in step 1: student categories, neutral wording, recipient from `MAIL_TO`. Validation and error handling are still open. |

### High

| # | Problem | Status |
|---|---|---|
| 4 | **Past events didn't render**, so links to them did nothing. After the last event of the year, every event would show in both tabs. | **Fixed** in step 2. "Upcoming" is still decided when the site is built, so it goes stale until the next deploy. |
| 5 | **New students had to hunt for their path.** "Arriving soon?" was the sixth block on the home page, the guide link was on the third hero slide, and the guide had three different names. | **Mostly fixed** in step 2: section moved under the hero, guide linked from slide 1, one name ("New Students"). Still open: the card row scrolls sideways on phones with no visible arrows, and checklist items don't link to their details. |
| 6 | **Events don't say when, how much, or how to sign up.** No time, price or registration link; the only action is "Ask us". Event details are in a pop-up, so one event can't be shared as a link. Past events still say "Why you should join". | **Open.** Needs new event fields and content. |
| 7 | **Report page looked untrustworthy.** It showed "100% of fees spent on members" and a budget split with no report published, and "Report" in the menu read like "report a problem". | **Partly fixed.** Figures hidden until the financial report exists (step 1). Renamed "Transparency" and moved to the footer and About page (step 2). Still open: lock icon on "In preparation", header text that implies reports exist. |
| 8 | **The site looks unfinished.** Every image under `public/images/` is a "replace me" placeholder, and division member lists are empty. | **Open.** Waiting for photos with consent. |
| 9 | **Resource links go to homepages** (dorm, bank, calendar, clubs, library, transport) instead of the specific page. The Taichung Mosque URL didn't resolve during the review. | **Open.** |

### Medium

| # | Problem | Status |
|---|---|---|
| 10 | **English only, with unexplained terms:** ganbu, Yingxin, OIR, ARC, NHI, KDEI. No Chinese names or addresses to show a taxi driver or office counter. | **Open.** Language decision needed. |
| 11 | **Prospective students are barely served.** Nothing on intakes, costs, housing basics, or getting from the airport to campus. | **Open.** Content needed. |
| 12 | **Emergency help was hard to reach.** Numbers were at the bottom of the guide, and the "110 / 119" entry only dialled 110. | **Fixed** in step 2. 110 and 119 are tap-to-call buttons at the top of the guide, with 1990 below them as a help line. The Contact page still has no pointer to urgent help. |
| 13 | **Navigation on phones.** The logo text is hidden on small screens, tapping the current page in the menu doesn't close it, and the header hides when scrolling down. | **Open.** |
| 14 | **Accessibility.** Low-contrast grey and gold text; the hero autoplayed with no pause. | **Partly fixed** in step 2: contrast meets WCAG AA, and the hero has a pause button. Still open: three `h1` headings in the hero, links inside hidden slides that keyboard users can reach, event titles that aren't headings, gallery captions shown only on hover. |
| 15 | **Sharing and polish.** No share image for links posted on LINE or Instagram, the web manifest isn't linked, and "Nine years" is hard-coded. | **Open.** |

### Two visitor walkthroughs

| Visitor and goal | Before | Now |
|---|---|---|
| Current student: "What's on, and how do I join?" | Event cards with no time, price or sign-up; membership form opened Google. | Membership button hidden until the real form exists. Time, price and sign-up still missing. |
| Current student: "Something's wrong, who do I call?" | Emergency numbers at the bottom of a long guide. | 110 and 119 at the top of the New Students guide, as tap-to-call buttons. |
| New student: "What do I do before flying?" | Guide buried and named three ways; wrong ARC deadline. | Guide is in the menu as "New Students" and directly under the hero; ARC deadline corrected. |
| Prospective student: "Should I apply, what does it cost?" | Little beyond links to university homepages. | Unchanged; content needed. |

## Problems in the code and CSS

All **open** unless marked.

**CSS**
- `accent` means two things: the gold colour scale (`accent-50` to `accent-900`) and shadcn's grey surface (`bg-accent`).
  **Fixed:** the gold scale is now `gold-*` (token migration step 2).
- Colours are written twice, once in `@theme` and again in `:root`. Error red is the same as brand red.
  **Fixed:** every colour is defined once in [styles/tokens.css](../styles/tokens.css) (token migration step 1). Error red is still brand red.
- A `dark` variant is declared but there are no dark-mode colours, and pages hard-code `bg-white`.
  **Fixed:** dark mode removed (step 6) and pages use semantic colours such as `bg-surface` (step 3). The `dark` variant line stays as a guard.
- Two heading styles: `SectionHeading` and a two-tone headline whose classes are copied into four files.
  **Partly fixed:** both now use type roles (`type-h2`, `type-headline`, step 6), and one
  [`Heading`](../components/layout/heading.tsx) component replaces both (`variant="section"` and
  `variant="headline"`). The two looks remain, and Contact's headline subtitle is `ink-600` while the
  others are `ink-500` (`subtitleTone`). Making them one style is a visible change, left for committee sign-off.
- Several sections use a raw `<section>` instead of the `Section` component.
  **Fixed:** only the full-bleed hero and the sub-sections of the event dialog use a plain `<section>`, on purpose.
- `shelfCardClass` is reused outside shelves and then partly undone with `hover:scale-100`.
  **Fixed:** [`Card`](../components/ui/card.tsx) has variants (`default`, `interactive`, `tile`, `muted`)
  and `shelfCardClass` is gone.
- Since token migration step 5, shelf cards don't look as their classes intend. `cn()` (tailwind-merge)
  doesn't recognise `rounded-shelf` and `shadow-shelf`, so the base card's `rounded-xl` and `shadow-sm`
  stay and win: shelf cards and tiles show a 16px radius and a small shadow instead of 18px and the soft
  shelf shadow, and the Contact form and home Membership cards show the shelf shadow where none was meant.
  The Card variants reproduce this exactly. **Open:** restoring the intended look is a visible change;
  [components/ui/card.tsx](../components/ui/card.tsx) explains which strings to change.
- Page widths and gutters are repeated as numbers in several files; the page header uses a narrower container than the page body.
  **Partly fixed:** widths and gutters come from tokens (step 4). The page header is still narrower; widening it is a visible change.
- Swiper is themed with many `!important` overrides in [app/globals.css](../app/globals.css).

**Components and project**
- `components/ui/` mixes shadcn primitives with site layout (`section.tsx`).
  **Fixed:** layout components live in `components/layout/`, and components are grouped by page (see [Folders](#folders)).
- Membership details and social channel descriptions are written in several places.
- The Instagram URL is hard-coded in several files.
- Apparently unused: `coming-soon.tsx`, `ui/dropdown-menu.tsx`, `ui/sonner.tsx`, the Geist Mono font, and the packages `@heroicons/react`, `@radix-ui/themes` and `next-themes`.
  **Fixed:** `ui/sonner.tsx` and `next-themes` removed (step 6); the rest removed with the component reorganisation.
- Two lockfiles: `package-lock.json` is out of date, while `packageManager` is pnpm.
  **Fixed:** `package-lock.json` removed.
- The README's run commands look wrong (`node dist/server.js`).
  **Fixed:** the README lists the pnpm commands.
- **Fixed:** `npm run lint` failed because pnpm 10 no longer hoists ESLint plugins. [pnpm-workspace.yaml](../pnpm-workspace.yaml) now sets `publicHoistPattern`.

## Proposed layout

### Sitemap

```
/              Home
/resources     New Students guide   (could move to /new-students with a redirect)
/events        Events               (later: /events/[id], one shareable page per event)
/about         About, team, membership
/help          NEW: emergency numbers and who to contact
/contact       Channels, form, FAQ
/report        Transparency         (footer and About only)
```

### Navigation

- **Desktop:** `Logo | New Students | Events | About | Contact | [Help] [Join THUISA]`. Show "Join THUISA" only once the real membership form exists.
- **Phones:** logo with a short "THUISA Tunghai" label, and a menu button. Menu order: New Students, Help, Events, About, Contact, Join, then social links. The menu closes on every tap, and the header stays visible.
- **Footer:** three groups: Students, THUISA (including Transparency), Follow us and partners.

### Home

```
[ Static hero: one heading, real photo ]
[ I'm arriving ]  [ I'm already here ]
Next event: name, date, time, place, [Sign up], then two more
New students: 3 steps (stacked on phones) -> full guide
Join the community: group chat / Instagram / membership
Who we are (short) + a few photos
Partners
```

The statistics band and the "things we run" cards move to About.

### New Students guide

```
Emergency numbers (done in step 2)
"Last checked: <date>"
Pick your stage: Applying | Before flying | First weeks | Living here   (stays on screen)
Checklist: each step links to its details, with deadline and official source
1 Applying            (content needed)
2 Before you fly      (message THUISA first)
3 Arrival day         (content needed)
4 First weeks         ARC, bank, SIM, transport, NHI
5 Living here         housing, food, worship, transport
6 Money and work
```

### Other pages

- **Help:** tap-to-call 110 and 119, then 1990 as a help line, KDEI, the university contact (to be supplied), and THUISA with expected response time.
- **Events:** next event featured, then upcoming, then past events on the same page. Each event shows date, time, place with a map link, member and non-member price, who can come, sign-up link and deadline, then the description.
- **About:** story, what we run, team, membership (fee, benefits, how to pay), partners, Transparency link, contact button.
- **Contact:** a line pointing to urgent help, channels with the best one marked, the form, location, FAQ.
- **Transparency:** documents first; figures only when a published report backs them.

### Language

The committee decides. A low-cost option: English, with Indonesian summaries on
the New Students guide and Help page, Chinese names beside key places and
documents, and a short glossary. Fully translated pages would be hard for a
student committee to keep up to date.

## Proposed components and CSS

### Folders

**Done** for `components/` (the parts in brackets are proposals still open):

```
app/            layout, page, globals.css, one folder per route   [not-found]
components/
  ui/           shadcn primitives only
  layout/       header (with the phone menu), footer, container, section, page-header, heading
  shared/       pillars, stats-band, partners-strip, shelf, text-link, icon   [channel card, membership card]
  home/         hero, where-to-start, gallery, stay-connected   [audience split, next events]
  guide/        emergency-numbers, arrival-checklist, resource-group   [stage picker]
  events/       event-card, events-browser   [event facts]
  contact/      contact-form, faq-list
lib/            site, links, contact, events, resources, team, reports, utils   [help]
styles/         tokens.css   [base.css]
actions/        contact action, schema
```

The channel and membership cards on Home and Contact differ in icon size and
text, so sharing one component would be a visible change.

- Keep content in `lib/`; no CMS is needed.
- Add `sourceUrl` and `lastVerified` to guide items, and `startTime`, `priceMember`, `priceNonMember`, `signupUrl` and `signupDeadline` to events.
- Make links optional everywhere, so a missing one hides its button (as [lib/links.ts](../lib/links.ts) already does).
- Retire `shelf.tsx` and Swiper if the static layouts are adopted.

### CSS system (Tailwind 4, no CSS modules)

```css
@theme {
  /* keep brand-* and ink-*; rename the gold accent-* scale to gold-* */
  --container-page: 80rem;
  --radius-card: 1rem;
}
:root {
  --header-h: 5rem;
  --surface: #ffffff;
  --surface-muted: var(--color-ink-50);
  --text: var(--color-ink-900);
  --text-muted: var(--color-ink-600);   /* never lighter than ink-600 for small text */
  --primary: var(--color-brand-600);
}
@theme inline {
  --color-surface: var(--surface);
  --color-surface-muted: var(--surface-muted);
  --color-text: var(--text);
  --color-text-muted: var(--text-muted);
}
```

- One `SectionHeading`, `Section` tones for every band, and `Card` variants (`plain`, `interactive`) instead of override strings.
  **Done:** `Heading`, `Section` and `Card` variants (`default`, `interactive`, `tile`, `muted`).
- One container width, shared by header, page header and body.
- Mobile first, using only the `sm`, `md` and `lg` breakpoints.
- Dark mode: add it only after pages use the semantic colours above; otherwise remove the unused `dark` variant.

### Contrast rule (from step 2)

| Use | Class | Ratio |
|---|---|---|
| Small text on white or `ink-50` | `text-ink-600` or darker | 6.6–7.0 : 1 |
| Large headings and icons on light backgrounds | `text-ink-500` | 4.3–4.5 : 1 |
| Small gold text on white | `text-gold-700` | 4.9 : 1 |
| Text on `ink-900` / `ink-950` | `text-ink-400` or lighter | 6.9–7.6 : 1 |
| Text on the red `brand-600` band | solid `text-white` | 5.6 : 1 |

`text-ink-400` on white (2.5:1) and semi-transparent white on red (85% is
4.3:1) both fail.

## Order of work

| Step | Scope | Status |
|---|---|---|
| 1. Correctness | Hotline and ARC facts, hide placeholder links, fix the contact form's wording and categories, hide unsupported report figures, create TODO.md. | **Done** (`648e72f`) |
| 2. Quick wins | Past events, navigation names, new-student section under the hero, emergency numbers at the top of the guide, contrast, hero pause button. Real photos postponed. | **Done** (`7f7b9d7`) |
| 3. Structure (about a week) | Help page; restructure the New Students guide; event fields and per-event pages; CSS tokens and a single heading and card system; component folders; remove unused code, packages and the old lockfile. | **In progress:** tokens, heading and card system, folders and cleanup done (branch `step-3b-components`); visible follow-ups (page header width, one headline style, intended shelf card radius and shadow) await sign-off. Help page, guide and events still to do. |
| 4. Content and upkeep | Prospective-student content, Indonesian summaries, published reports, a fact and link check before each intake, spam protection, optional dark mode, real photos. | Later |

## Open items

Left over from steps 1 and 2, roughly in order of importance.

**Text that refers to hidden links**
- The FAQ still says "Fill in the membership form" ([app/contact/page.tsx](../app/contact/page.tsx)).
- LINE cards on the home and Contact pages show "ID: thuisa" and call LINE the fastest way to reach the committee, but have no button. The footer and phone menu drop LINE entirely.

**Contact form**
- Email is only checked for length on the server, and field errors are never shown.
- A second identical error shows no pop-up message.
- A failed send may erase what the visitor typed. Test this in a browser first.
- No spam protection or length limits.
- `MAIL_TO` and the SMTP settings must be set on the host; the hosting choice is still open.

**Pages**
- "Upcoming" events are decided at build time. Rebuild regularly, or revalidate daily once hosting is chosen.
- Hero: three `h1` headings, and links in hidden slides can receive keyboard focus.
- "Arriving soon?" cards scroll sideways on phones with no visible arrows.
- Header hides on scroll; the phone menu doesn't close when tapping the current page; logo text is hidden on small screens.
- Transparency page: lock icon on "In preparation"; header says "These are our accountability reports" although none is published; the highlight row has a gap while the money figure is hidden.
- Contact page: no pointer to urgent help.
- No share image, no 404 page, web manifest not linked.

**Not yet checked in a browser** (step 2)
- Tapping a past event in "The year at a glance" switches to Past and scrolls to it.
- The hero pause button doesn't overlap the slide arrows on a laptop.
- The emergency buttons work on a phone.

## Questions for the committee

Links, figures, hosting, languages and photos are tracked in
[TODO.md](../TODO.md). Other decisions:

1. Who helps students arriving in the spring semester, when there is no Yingxin?
2. Should the site also serve students who haven't applied yet?
3. Who checks the guide's facts and links each year, and against which university pages?
4. Is there a separate OIR logo, and permission to use university logos?
5. Are the promises on the site accurate: replies within a few days, channels checked every day, carbon-neutral events by 2030?
6. Should the "Made by the Double U Team" credit in the footer stay?

## Sources

- [National Immigration Agency: foreigner hotline changed to 1990](https://www.immigration.gov.tw/5475/5478/6928/6940/204896/204917/cp_news)
- [National Immigration Agency: residence guidelines for foreign students](https://www.immigration.gov.tw/5475/5478/141465/141808/417829/cp_news) (dated 28 August 2026)
