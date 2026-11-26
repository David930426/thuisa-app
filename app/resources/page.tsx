import type { Metadata } from "next";
import Link from "next/link";
import { ArrivalChecklist } from "@/components/guide/arrival-checklist";
import { EmergencyNumbers } from "@/components/guide/emergency-numbers";
import { ResourceGroup } from "@/components/guide/resource-group";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { resourceGroups } from "@/lib/resources";

export const metadata: Metadata = {
  title: "New Students",
  description:
    "A practical guide for Indonesian students arriving at Tunghai University — visas, ARC, dorms, health insurance, banking, scholarships, and emergency contacts.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="New Students"
        title="The guide we wish someone had given us"
        lede="Everything below is the practical side of studying at Tunghai as an Indonesian student — the paperwork, the deadlines, and the things nobody warns you about until it is already a problem."
      >
        <Button asChild variant="onDark" size="lg">
          <a href="#before-you-arrive">Start at the beginning</a>
        </Button>
      </PageHeader>

      {/* Emergency numbers, first thing on the page */}
      <EmergencyNumbers moreHref="/help" />

      <ArrivalChecklist />

      {/* Jump nav */}
      {/* pt-0 only on phones: from md up the section keeps its top padding */}
      <Section spacing="tight" className="pt-0 md:pt-16">
        <Container size="wide">
          <nav aria-label="Resource sections">
            <ul className="flex flex-wrap gap-2">
              {resourceGroups.map((group) => (
                <li key={group.id}>
                  <Badge
                    asChild
                    variant="secondary"
                    className="gap-2 px-4 py-2 text-sm font-medium hover:bg-brand-600 hover:text-fg-inverse"
                  >
                    <a href={`#${group.id}`}>
                      <Icon name={group.icon} className="size-4" />
                      {group.title}
                    </a>
                  </Badge>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      {/* Resource groups */}
      {resourceGroups.map((group, index) => (
        <ResourceGroup
          key={group.id}
          group={group}
          tone={index % 2 === 0 ? "default" : "muted"}
        />
      ))}

      {/* Link accuracy note */}
      <Section spacing="tight" tone="default">
        <Container size="wide">
          <Card className="flex-col gap-4 border-dashed border-ink-300 bg-surface-muted p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-fg-muted">
              <span className="font-semibold text-fg">
                Found something out of date?
              </span>{" "}
              Government and university pages move around. Tell us and we will
              fix it the same week.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/contact">Report a broken link</Link>
            </Button>
          </Card>
        </Container>
      </Section>

    </>
  );
}
