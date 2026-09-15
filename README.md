This is a THUISA project with [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm run dev
pnpm start (for IOS)
node dist/server.js (for Windows)
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses tailwind CSS  for styling and designing the website.

## Set Up Your SMTP by using .env.local

# --- SMTP settings ---
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
# SMTP gmail pass must use app password, cannot use basic password

# --- Mail metadata ---
MAIL_FROM="GlowGrove Support <support@glowgrove.com>"
MAIL_TO="support@glowgrove.com"

## Editing the site content

Nearly all text and images live in `lib/`, so you rarely need to touch a page
file to change what the site says:

| File | What it controls |
| --- | --- |
| `lib/site.ts` | Org details, navigation, socials, stats, the four "what we do" cards, partners, and **all image paths** |
| `lib/events.ts` | The event calendar. Adding an event here adds it to the homepage and the events page |
| `lib/team.ts` | Leadership photos/names and the six divisions |
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
- Replace `joinFormUrl` and the LINE link in `lib/site.ts`
- Add real Tunghai University and PERPITA logos in `partners` (they currently
  reuse other logos as stand-ins)
- Confirm the event dates in `lib/events.ts` match the real academic year

## Components

The UI is built on [shadcn/ui](https://ui.shadcn.com/docs/components) (new-york
style). Components live in `components/ui/` and are yours to edit — they are
copied into the repo, not installed from a package.

In use: `accordion`, `avatar`, `badge`, `button`, `card`, `dialog`, `input`,
`label`, `navigation-menu`, `progress`, `select`, `separator`, `sheet`, `tabs`,
`textarea`, plus `sonner` for toasts.

Two local extensions to the stock components:

- `Card` and `CardTitle` accept `asChild`, so a card can render as the `<a>`,
  `<Link>`, or heading it wraps instead of nesting one inside a div
- `Button` adds four THUISA variants on top of the shadcn defaults:
  `brand`, `brandOutline`, `onDark`, and `onDarkOutline` (the last two are for
  the red and dark sections)

`components/ui/section.tsx` is not from shadcn — it holds the `Container`,
`Section`, `SectionHeading`, and `PageHeader` layout primitives that give every
page the same rhythm.

### Adding more shadcn components

The CLI (`pnpm dlx shadcn@latest add <name>`) currently emits imports from the
`radix-ui` umbrella package, while this project uses the individual
`@radix-ui/react-*` packages. After adding a component, rewrite
`import { Foo as FooPrimitive } from "radix-ui"` to
`import * as FooPrimitive from "@radix-ui/react-foo"` and add that package.
