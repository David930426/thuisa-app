import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  arrivalChecklist,
  emergencyNumbers,
  foreignerHelpLine,
  resourceGroups,
} from "@/lib/resources";

export const metadata: Metadata = {
  title: "New Students",
  description:
    "A practical guide for Indonesian students arriving at Tunghai University — visas, ARC, dorms, health insurance, banking, scholarships, and emergency contacts.",
};

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("tel:");
}

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
      <Section tone="brand" spacing="tight">
        <Container size="wide">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/15 text-fg-inverse ring-1 ring-white/25">
                <Phone className="size-6" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-fg-inverse">
                  Emergency? Call now
                </h2>
                <p className="mt-1 text-sm text-fg-inverse">
                  Free from any phone. Save these numbers now, not later.
                </p>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {emergencyNumbers.map((item) => (
                <li key={item.number}>
                  <a
                    href={item.href}
                    className="flex items-center gap-4 rounded-xl bg-white px-5 py-3 text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
                  >
                    <span className="font-display text-3xl font-extrabold tabular-nums">
                      {item.number}
                    </span>
                    <span className="text-sm font-semibold text-fg">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-white/20 pt-5 text-sm text-fg-inverse sm:flex-row sm:items-center sm:justify-between">
            <a
              href={foreignerHelpLine.href}
              className="underline-offset-4 hover:underline"
            >
              <span className="font-semibold">
                {foreignerHelpLine.number} – {foreignerHelpLine.label}
              </span>{" "}
              <span>({foreignerHelpLine.detail})</span>
            </a>
            <a
              href="#help"
              className="shrink-0 font-semibold underline-offset-4 hover:underline"
            >
              Full help list
            </a>
          </div>
        </Container>
      </Section>

      {/* Checklist */}
      <Section spacing="tight">
        <Container size="wide">
          <div className="grid gap-10 rounded-2xl bg-surface-inverse p-8 text-fg-inverse md:grid-cols-12 md:p-12">
            <div className="md:col-span-5">
              <p className="eyebrow-light">
                <span aria-hidden className="h-px w-6 bg-gold-300/70" />
                Quick checklist
              </p>
              <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                Six things, in order
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-fg-inverse-muted">
                If you only read one part of this page, read this. Work down the
                list and you will avoid most of the problems new students run
                into.
              </p>
            </div>

            <ol className="space-y-3 md:col-span-7">
              {arrivalChecklist.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/10"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-600 font-display text-xs font-bold text-fg-inverse">
                    {index + 1}
                  </span>
                  <span className="text-sm text-ink-200 md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

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
        <Section
          key={group.id}
          id={group.id}
          tone={index % 2 === 0 ? "default" : "muted"}
        >
          <Container size="wide">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Icon name={group.icon} className="size-6" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-bold text-fg md:text-3xl">
                  {group.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-fg-muted">
                  {group.summary}
                </p>
              </div>

              <ul className="divide-y divide-border lg:col-span-8">
                {group.items.map((item) => {
                  const external = isExternal(item.href);
                  const content = (
                    <>
                      <span className="flex-1">
                        <span className="flex items-center gap-2 font-display text-base font-bold text-fg transition-colors group-hover:text-brand-700">
                          {item.title}
                          {external ? (
                            <ArrowUpRight className="size-4 shrink-0 text-ink-500 transition-colors group-hover:text-brand-600" />
                          ) : null}
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-fg-muted">
                          {item.description}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={item.title}>
                      {external ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("tel:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="group flex gap-4 py-5 transition-colors"
                        >
                          {content}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="group flex gap-4 py-5 transition-colors"
                        >
                          {content}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Container>
        </Section>
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
