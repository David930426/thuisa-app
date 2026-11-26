import { Container } from "@/components/layout/container";

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
        <div className="max-w-reading">
          {eyebrow ? (
            <p className="eyebrow-light">
              <span aria-hidden className="h-px w-6 bg-gold-300/70" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-4 type-h1">
            {title}
          </h1>
          {lede ? (
            <p className="mt-6 type-lead-lg text-white/75">
              {lede}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </header>
  );
}
