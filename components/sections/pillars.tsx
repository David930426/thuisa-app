import { Icon } from "@/components/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { pillars } from "@/lib/site";

export function Pillars() {
  return (
    <Section tone="muted">
      <Container size="wide">
        <SectionHeading
          eyebrow="What we do"
          title="The things we run"
          lede="All of it is organised by students at Tunghai, alongside their own coursework."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <li key={pillar.title}>
              <Card className="group relative h-full gap-0 overflow-hidden border-ink-200 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-ink-900/5">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-600 transition-transform duration-300 group-hover:scale-x-100"
                />
                <CardHeader>
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <Icon name={pillar.icon} className="size-6" />
                  </span>
                  <CardTitle className="mt-5 font-display text-lg font-bold text-ink-900">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2.5">
                  <p className="text-sm leading-relaxed text-ink-600">
                    {pillar.body}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
