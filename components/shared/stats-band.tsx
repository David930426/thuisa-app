import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { stats } from "@/lib/site";

export function StatsBand() {
  return (
    <Section tone="dark" spacing="tight" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-band-glow"
      />
      <Container size="wide" className="relative">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <dd className="font-display text-4xl font-extrabold text-fg-inverse md:text-5xl">
                {stat.value}
              </dd>
              <dt className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">
                {stat.label}
              </dt>
              <p className="mt-1.5 text-sm text-fg-inverse-muted">{stat.detail}</p>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
