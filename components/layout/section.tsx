import { cn } from "@/lib/utils";

/**
 * Vertical rhythm and background for a page band. Every page section should
 * be wrapped in one of these.
 *
 * - tone: default (white), muted (ink-50), brand (red), dark (ink-900)
 * - spacing: tight / default / loose, the section-y-* tokens in
 *   styles/tokens.css
 */
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
