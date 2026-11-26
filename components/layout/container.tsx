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
