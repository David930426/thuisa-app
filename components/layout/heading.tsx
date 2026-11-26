import { cn } from "@/lib/utils";

type Level = "h1" | "h2" | "h3";

type SectionHeadingProps = {
  /** Kicker, eyebrow, title (type-h2) and lede. The default. */
  variant?: "section";
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Text alignment; "center" also centres the column. */
  align?: "left" | "center";
  /** "light" flips the colours for dark sections. */
  tone?: "default" | "light";
  className?: string;
  as?: Level;
};

type HeadlineProps = {
  /** Two-tone headline (type-headline): "Bold part. Grey part." */
  variant: "headline";
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /**
   * Colour of the subtitle. "soft" is ink-500 (large text only), "muted" is
   * fg-muted (ink-600). The Contact page uses "muted", the rest "soft";
   * making them the same is a visible change.
   */
  subtitleTone?: "soft" | "muted";
  className?: string;
  as?: Level;
};

export type HeadingProps = SectionHeadingProps | HeadlineProps;

/**
 * The site's section heading, in two variants:
 *
 *   <Heading eyebrow="Who we are" title="..." lede="..." />
 *   <Heading variant="headline" title="Our story." subtitle="Nine years of ..." />
 *
 * The page title (h1) lives in PageHeader.
 */
export function Heading(props: HeadingProps) {
  return props.variant === "headline" ? <Headline {...props} /> : <SectionHeading {...props} />;
}

function Headline({ title, subtitle, subtitleTone = "soft", className, as: Tag = "h2" }: HeadlineProps) {
  return (
    <Tag className={cn("max-w-4xl type-headline", className)}>
      <span className="text-fg">{title}</span>
      {subtitle ? (
        <>
          {" "}
          <span className={subtitleTone === "muted" ? "text-fg-muted" : "text-ink-500"}>
            {subtitle}
          </span>
        </>
      ) : null}
    </Tag>
  );
}

function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "default",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "max-w-reading",
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
      <Tag
        className={cn(
          "mt-4 type-h2",
          light ? "text-fg-inverse" : "text-fg"
        )}
      >
        {title}
      </Tag>
      {lede ? (
        <p
          className={cn(
            "mt-5 type-lead",
            light ? "text-white/80" : "text-fg-muted"
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
