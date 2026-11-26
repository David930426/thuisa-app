This is a THUISA project with [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

The project uses [pnpm](https://pnpm.io) (version pinned in `package.json`;
`corepack enable` sets it up). The commands are the same on Windows, macOS
and Linux:

```bash
pnpm install   # install dependencies
pnpm dev       # development server on http://localhost:3000
pnpm build     # production build
pnpm start     # serve the production build (after pnpm build)
pnpm lint      # ESLint
```

Styling is Tailwind CSS 4. Colours, type, widths and spacing are design
tokens in `styles/tokens.css`, loaded by `app/globals.css`.

## Set Up Your SMTP by using .env.local

# --- SMTP settings ---
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
# SMTP gmail pass must use app password, cannot use basic password

# --- Mail metadata ---
MAIL_FROM=
MAIL_TO=
# MAIL_FROM is the sender address (usually the same account as SMTP_USER)
# MAIL_TO is the committee inbox that receives contact form messages

## Editing the site content

Nearly all text and images live in `lib/`, so you rarely need to touch a page
file to change what the site says:

| File | What it controls |
| --- | --- |
| `lib/site.ts` | Org details, navigation, socials, stats, the four "what we do" cards, partners, and **all image paths** |
| `lib/events.ts` | The event calendar. Adding an event here adds it to the homepage and the events page |
| `lib/team.ts` | Leadership photos/names and the six divisions |
| `lib/links.ts` | Membership form and LINE invite links (hidden while empty) |
| `lib/contact.ts` | Contact form categories |
| `lib/resources.ts` | The new-student guide links |
| `lib/reports.ts` | Accountability reports and the budget breakdown |

### Swapping the placeholder pictures

Every picture under `public/images/` is a placeholder. To replace one:

1. Put your photo in the same folder, e.g. `public/images/hero/hero-community.jpg`
2. Update the path in `lib/site.ts` (or `lib/events.ts` for event covers, `lib/team.ts` for people)

Any format works — `.jpg`, `.png`, `.webp`. The suggested crop and aspect ratio
are printed on each placeholder image.

### Before going live

- Check every external link in `lib/resources.ts` — the ones commented `// verify`
  are most likely to have moved
- Add the membership form and LINE links in `lib/links.ts`
- Work through `TODO.md`
- Add a real Tunghai University logo in `partners` (it currently reuses the
  OIR logo as a stand-in)
- Confirm the event dates in `lib/events.ts` match the real academic year

## Components

```
components/
  ui/        shadcn/ui primitives
  layout/    header, footer, container, section, page-header, heading
  shared/    used on more than one page: pillars, stats-band, partners-strip,
             shelf, text-link, icon
  home/      hero, where-to-start, gallery, stay-connected
  guide/     New Students guide: emergency-numbers, arrival-checklist,
             resource-group
  events/    event-card, events-browser
  contact/   contact-form, faq-list
```

### Layout components

- `Container`: page width and side gutters (`size="wide"` is the page width,
  `"narrow"` is for centred text).
- `Section`: one band of a page, with `tone` (`default`, `muted`, `brand`,
  `dark`) and `spacing` (`tight`, `default`, `loose`).
- `Heading`: section headings. `variant="section"` (the default) is a kicker,
  title and lede (`eyebrow`, `title`, `lede`, `align`, `tone`, `as`);
  `variant="headline"` is the two-tone "Bold part. Grey part." headline
  (`title`, `subtitle`, `subtitleTone`).
- `PageHeader`: the dark header at the top of every page except the home page.

### shadcn/ui

The primitives are [shadcn/ui](https://ui.shadcn.com/docs/components)
(new-york style), copied into `components/ui/` and yours to edit.

In use: `accordion`, `avatar`, `badge`, `button`, `card`, `dialog`, `input`,
`label`, `navigation-menu`, `progress`, `select`, `separator`, `sheet`, `tabs`,
`textarea`, and a small local `spinner`. Toasts use the `sonner` package
directly (`<Toaster>` in `app/layout.tsx`).

Local extensions to the stock components:

- `Card` and `CardTitle` accept `asChild`, so a card can render as the `<a>`,
  `<Link>`, or heading it wraps instead of nesting one inside a div
- `Card` has variants: `default` (the shadcn card, for plain bordered cards),
  `interactive` (shelf cards that are links; lift on hover), `tile` (the same
  surface without the hover lift) and `muted` (a tile on the grey surface).
  Pass size, padding and grid placement in `className`; don't override the
  variant's radius or shadow there, because `cn()` (tailwind-merge) doesn't
  recognise this project's token classes such as `rounded-shelf` and
  `shadow-shelf`, so both classes stay and the stylesheet order decides
- `Button` adds four THUISA variants on top of the shadcn defaults:
  `brand`, `brandOutline`, `onDark`, and `onDarkOutline` (the last two are for
  the red and dark sections)

### Checking that a refactor changes nothing visible

`scripts/verify/` holds scripts that compare compiled CSS and the pre-rendered
pages between two versions; see
[scripts/verify/README.md](scripts/verify/README.md).

### Adding more shadcn components

The CLI (`pnpm dlx shadcn@latest add <name>`) currently emits imports from the
`radix-ui` umbrella package, while this project uses the individual
`@radix-ui/react-*` packages. After adding a component, rewrite
`import { Foo as FooPrimitive } from "radix-ui"` to
`import * as FooPrimitive from "@radix-ui/react-foo"` and add that package.
