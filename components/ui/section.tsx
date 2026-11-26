import { cn } from "@/lib/utils";

/** Consistent horizontal gutter + max width for every block on the site. */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
}) {
  // Widths and gutters come from styles/tokens.css. "wide" is the one page
  // width; "narrow" is for centred text. "default" (6xl) is only used by
  // PageHeader and is due to move to max-w-page as a separate, visible change.
  const widths = {
    narrow: "max-w-reading",
    default: "max-w-6xl",
    wide: "max-w-page",
  };
  return (
    <div className={cn("mx-auto w-full px-gutter sm:px-gutter-wide", widths[size], className)}>
      {children}
    </div>
  );
}

/** Vertical rhythm. Every page section should be wrapped in one of these. */
export function Section({
  children,
  className,
  id,
  tone = "default",
  spacing = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "brand" | "dark";
  spacing?: "tight" | "default" | "loose";
}) {
  const tones = {
    default: "bg-surface text-fg-body",
    muted: "bg-surface-muted text-fg-body",
    brand: "bg-brand-600 text-fg-inverse",
    dark: "bg-surface-inverse text-ink-100",
  };
  const spacings = {
    tight: "section-y-tight",
    default: "section-y",
    loose: "section-y-loose",
  };
  return (
    <section id={id} className={cn(tones[tone], spacings[spacing], className)}>
      {children}
    </section>
  );
}

/**
 * Section heading with an optional kicker above and lede below.
 * `align` controls text alignment; `tone` flips the colours for dark sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "default",
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "light";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className={light ? "eyebrow-light" : "eyebrow"}>
          <span
            aria-hidden
            className={cn(
              "h-px w-6",
              light ? "bg-gold-300/70" : "bg-brand-400/70"
            )}
          />
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "mt-4 text-3xl font-bold leading-[1.1] md:text-4xl lg:text-5xl",
          light ? "text-fg-inverse" : "text-fg"
        )}
      >
        {title}
      </Heading>
      {lede ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            light ? "text-white/80" : "text-fg-muted"
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/** Page header used at the top of every route except the homepage. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-surface-inverse pt-28 pb-16 text-fg-inverse md:pt-36 md:pb-24">
      {/* soft brand wash + woven texture, kept subtle so text stays readable */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-header-glow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] bg-woven"
      />
      <Container className="relative">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="eyebrow-light">
              <span aria-hidden className="h-px w-6 bg-gold-300/70" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
            {title}
          </h1>
          {lede ? (
            <p className="mt-6 text-lg leading-relaxed text-white/75 md:text-xl">
              {lede}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </header>
  );
}
