import { Container, Section } from "@/components/ui/section";
import { stats } from "@/lib/site";

export function StatsBand() {
  return (
    <Section tone="dark" spacing="tight" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_20%_0%,rgba(206,17,38,0.4),transparent_60%)]"
      />
      <Container size="wide" className="relative">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <dd className="font-display text-4xl font-extrabold text-white md:text-5xl">
                {stat.value}
              </dd>
              <dt className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent-300">
                {stat.label}
              </dt>
              <p className="mt-1.5 text-sm text-ink-400">{stat.detail}</p>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
