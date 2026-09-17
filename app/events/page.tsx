import type { Metadata } from "next";
import Link from "next/link";
import { EventsBrowser } from "@/components/events-browser";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Container,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { events, eventDateParts, getPastEvents, getUpcomingEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Our Events",
  description:
    "The THUISA event calendar — Yingxin welcome nights, Halloween, Christmas Dinner, the Gala Dinner, THUISA Cup, International Week, and Graduation.",
};

export default function Page() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  // The academic year in order, for the rhythm strip.
  const rhythm = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHeader
        eyebrow="Our Events"
        title="Seven events, one academic year"
        lede="From the welcome nights in September to Graduation in June, this is a full year at THUISA. Every event here is open to Indonesian students at Tunghai; members pay a lower price."
      >
        <Button asChild variant="onDarkOutline" size="lg">
          <a href="https://www.instagram.com/thuisa_official" target="_blank" rel="noopener noreferrer">Follow for announcements</a>
        </Button>
      </PageHeader>

      {/* The year at a glance */}
      <Section tone="muted" spacing="tight">
        <Container size="wide">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-500">
            The year at a glance
          </h2>
          <ol className="mt-6 flex gap-3 overflow-x-auto pb-3">
            {rhythm.map((event) => {
              const { monthShort, day } = eventDateParts(event.date);
              return (
                <li key={event.id} className="shrink-0">
                  <Card
                    asChild
                    className="w-36 gap-0 border-ink-200 p-4 transition-all hover:-translate-y-0.5 hover:border-brand-300"
                  >
                    <a href={`#${event.id}`}>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                        {monthShort} {day}
                      </span>
                      <span className="mt-1.5 font-display text-sm font-bold leading-snug text-ink-900">
                        {event.title}
                      </span>
                    </a>
                  </Card>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* Full calendar */}
      <Section>
        <Container size="wide">
          <SectionHeading
            eyebrow="Calendar"
            title="Every event, in full"
            lede="Open any event for the run-down: what happens, who it is for, and what you should know before you turn up."
            align="center"
            className="mb-14"
          />
          <EventsBrowser upcoming={upcoming} past={past} />
        </Container>
      </Section>

      {/* Host with us */}
      <Section tone="muted" spacing="tight">
        <Container size="narrow" className="text-center">
          <h2 className="font-display text-2xl font-bold text-ink-900 md:text-3xl">
            Want to collaborate on an event?
          </h2>
          <p className="mt-4 text-ink-600">
            We partner with student associations, campus offices, and sponsors
            every year. If you have an idea, or a proposal, we would like to
            hear it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="brand" size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/report">See how we report on events</Link>
            </Button>
          </div>
        </Container>
      </Section>

    </>
  );
}
