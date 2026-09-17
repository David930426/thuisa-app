import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/home/hero";
import { EventCard } from "@/components/event-card";
import { Gallery } from "@/components/sections/gallery";
import { StayConnected } from "@/components/sections/stay-connected";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { Pillars } from "@/components/sections/pillars";
import { StatsBand } from "@/components/sections/stats-band";
import { WhereToStart } from "@/components/sections/where-to-start";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { getUpcomingEvents } from "@/lib/events";
import { images, site } from "@/lib/site";

export default function Home() {
  const upcoming = getUpcomingEvents(3);

  return (
    <>
      <Hero />

      {/* Welcome */}
      <Section id="welcome">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-100 ring-1 ring-ink-200">
                <Image
                  src={images.aboutStory}
                  alt="THUISA members together on campus"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              {/* Small overlapping card, anchored to the image */}
              <div className="absolute -bottom-6 -right-4 hidden w-56 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-ink-200 sm:block lg:-right-8">
                <p className="font-display text-3xl font-extrabold text-brand-600">
                  {site.foundedYear}
                </p>
                <p className="mt-1 text-sm leading-snug text-ink-600">
                  Founded at Tunghai, and run by students every year since.
                </p>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Who we are"
                title="THUISA is the Indonesian student association at Tunghai"
                lede="It has existed since 2017 and is run by a committee of students, elected each year, across six working divisions."
              />
              <p className="mt-5 text-base leading-relaxed text-ink-600">
                Around 400 Indonesian students study at Tunghai University in
                Taichung. We organise seven events across the academic year,
                work with the university&apos;s Office of International Relations
                on the ones that involve the wider campus, and stay in touch
                with Indonesian associations at other universities in Taiwan.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild variant="brand" size="lg">
                  <Link href="/about">Our story</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/resources">New student guide</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <StatsBand />

      <Pillars />

      {/* Upcoming events */}
      <Section>
        <Container size="wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="What's next"
              title="Coming up at THUISA"
              lede="Our calendar follows the academic year, from the welcome nights in September through to Graduation in June."
              className="md:mb-0"
            />
            <Link
              href="/events"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
            >
              View the full calendar
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </Section>

      <WhereToStart />

      <Gallery />

      <PartnersStrip />

      <StayConnected />
    </>
  );
}
