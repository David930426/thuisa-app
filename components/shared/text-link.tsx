import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Apple-style inline link: coloured text with a small chevron. */
export function TextLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-0.5 text-sm font-medium text-brand-600 hover:underline underline-offset-4";
  const content = (
    <>
      {children}
      <ChevronRight className="size-4" aria-hidden />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
