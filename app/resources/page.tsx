import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Icon } from "@/components/icon";
import { StayConnected } from "@/components/sections/stay-connected";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Container,
  PageHeader,
  Section,
} from "@/components/ui/section";
import { arrivalChecklist, resourceGroups } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources",
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
        eyebrow="Resources"
        title="The guide we wish someone had given us"
        lede="Everything below is the practical side of studying at Tunghai as an Indonesian student — the paperwork, the deadlines, and the things nobody warns you about until it is already a problem."
      >
        <Button asChild variant="onDark" size="lg">
          <a href="#before-you-arrive">Start at the beginning</a>
        </Button>
      </PageHeader>

      {/* Checklist */}
      <Section spacing="tight">
        <Container size="wide">
          <div className="grid gap-10 rounded-2xl bg-ink-900 p-8 text-white md:grid-cols-12 md:p-12">
            <div className="md:col-span-5">
              <p className="eyebrow-light">
                <span aria-hidden className="h-px w-6 bg-accent-300/70" />
                Quick checklist
              </p>
              <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                Six things, in order
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-400">
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
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-600 font-display text-xs font-bold text-white">
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
      <Section spacing="tight" className="pt-0">
        <Container size="wide">
          <nav aria-label="Resource sections">
            <ul className="flex flex-wrap gap-2">
              {resourceGroups.map((group) => (
                <li key={group.id}>
                  <Badge
                    asChild
                    variant="secondary"
                    className="gap-2 px-4 py-2 text-sm font-medium hover:bg-brand-600 hover:text-white"
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
                <h2 className="mt-5 font-display text-2xl font-bold text-ink-900 md:text-3xl">
                  {group.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-600">
                  {group.summary}
                </p>
              </div>

              <ul className="divide-y divide-ink-200 lg:col-span-8">
                {group.items.map((item) => {
                  const external = isExternal(item.href);
                  const content = (
                    <>
                      <span className="flex-1">
                        <span className="flex items-center gap-2 font-display text-base font-bold text-ink-900 transition-colors group-hover:text-brand-700">
                          {item.title}
                          {external ? (
                            <ArrowUpRight className="size-4 shrink-0 text-ink-400 transition-colors group-hover:text-brand-600" />
                          ) : null}
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-ink-600">
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
          <Card className="flex-col gap-4 border-dashed border-ink-300 bg-ink-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-ink-600">
              <span className="font-semibold text-ink-900">
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

      {/* Emergency footer strip */}
      <Section tone="brand" spacing="tight">
        <Container size="wide">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/25">
                <Phone className="size-6" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  Save these now, not later
                </h2>
                <p className="mt-1 text-sm text-white/80">
                  110 police · 119 fire and ambulance · 0800-024-111 foreigner
                  hotline
                </p>
              </div>
            </div>
            <Button asChild variant="onDark" size="default">
              <a href="#help">Full emergency list</a>
            </Button>
          </div>
        </Container>
      </Section>

      <StayConnected />
    </>
  );
}
