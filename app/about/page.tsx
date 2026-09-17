import type { Metadata } from "next";
import Image from "next/image";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { Pillars } from "@/components/sections/pillars";
import { StatsBand } from "@/components/sections/stats-band";
import { shelfCardClass } from "@/components/shelf-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Container,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { divisions, leadership } from "@/lib/team";
import { cn } from "@/lib/utils";
import { images, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "THUISA has supported Indonesian students at Tunghai University since 2017 — our story, mission, committee, and the divisions that run the organisation.",
};

const priorities = [
  {
    title: "Strengthen the community",
    body: "Deeper collaboration with other Indonesian associations in Taiwan, and with Tunghai's own student bodies. Fewer isolated events, more shared ones.",
  },
  {
    title: "Carbon-neutral events by 2030",
    body: "Cutting single-use materials, choosing venues we can reach without coaches, and measuring what each event actually costs the environment.",
  },
  {
    title: "Grow the THUISA Cup",
    body: "Our annual tournament is the largest gathering of Indonesian students we host. The goal is to make it the one every campus in Taiwan plans around.",
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="A home away from home, built by students"
        lede={`Since ${site.foundedYear}, THUISA has been the Indonesian student association at Tunghai University — run entirely by students, for the roughly 400 Indonesians studying here.`}
      >
        <Button asChild variant="onDarkOutline" size="lg">
          <a href="https://oir.thu.edu.tw/" target="_blank" rel="noopener noreferrer">Tunghai Office of International Relations</a>
        </Button>
      </PageHeader>

      {/* Our story */}
      <section className="bg-white py-16 md:py-24">
        <Container size="wide">
          <h2 className="max-w-4xl font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            <span className="text-ink-900">Our story.</span>{" "}
            <span className="text-ink-400">
              Nine years of Indonesian students at Tunghai, run by a new
              committee every year.
            </span>
          </h2>

          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[28px] bg-ink-100 sm:aspect-[16/9] md:mt-12 lg:aspect-[21/9]">
            <Image
              src={images.aboutCampus}
              alt="Tunghai University campus"
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent"
            />
            <p className="absolute inset-x-0 bottom-0 max-w-xl p-6 font-display text-2xl font-bold leading-tight text-white md:p-10 md:text-4xl">
              Founded in {site.foundedYear} at Tunghai University, Taichung.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-16">
            <p className="text-lg leading-relaxed text-ink-500 md:text-xl">
              <span className="font-semibold text-ink-900">
                It started with a welcome night.
              </span>{" "}
              What began as a small group of students is now the association
              every new Indonesian student at Tunghai gets introduced to. The
              calendar covers both semesters: welcome events, holiday dinners,
              a sports tournament, and the Indonesia booth at International
              Week.
            </p>
            <p className="text-lg leading-relaxed text-ink-500 md:text-xl">
              <span className="font-semibold text-ink-900">
                Every year, a new committee.
              </span>{" "}
              Each one keeps what worked, drops what did not, and writes it all
              down in the accountability report for the next group to read.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & vision */}
      <section className="bg-ink-50 py-16 md:py-24">
        <Container size="wide">
          <div className="grid gap-5 md:grid-cols-2">
            <Card className={cn(shelfCardClass, "h-full p-8 hover:scale-100 md:p-12")}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Our mission
              </h2>
              <p className="mt-4 font-display text-3xl font-bold leading-tight text-ink-900 md:text-4xl">
                Support, connect, and empower Indonesian students at Tunghai.
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink-500 md:text-lg">
                Practically, socially, and culturally, from the first week of
                paperwork to graduation day.
              </p>
            </Card>

            <Card className={cn(shelfCardClass, "h-full p-8 hover:scale-100 md:p-12")}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-accent-600">
                Our vision
              </h2>
              <p className="mt-4 font-display text-3xl font-bold leading-tight text-ink-900 md:text-4xl">
                A home away from home for every Indonesian student.
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink-500 md:text-lg">
                No matter which year they arrive in, or how long they stay.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <StatsBand />

      <Pillars />

      {/* Current priorities */}
      <Section>
        <Container size="wide">
          <SectionHeading
            eyebrow="Where we are heading"
            title="What this committee is working on"
            lede="Our priorities are reviewed each year and published so members can hold us to them."
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {priorities.map((priority, index) => (
              <li key={priority.title}>
                <Card className="h-full gap-0 border-ink-200 border-t-4 border-t-brand-600 bg-ink-50">
                  <CardHeader>
                    <span className="font-display text-sm font-extrabold text-brand-600">
                      0{index + 1}
                    </span>
                    <CardTitle asChild>
                      <h3 className="mt-2 font-display text-lg font-bold text-ink-900">
                        {priority.title}
                      </h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2.5">
                    <p className="text-sm leading-relaxed text-ink-600">
                      {priority.body}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Leadership */}
      <Section tone="muted">
        <Container size="wide">
          <SectionHeading
            eyebrow="Our team"
            title="The people running THUISA this year"
            lede="Every role here is voluntary and unpaid, held alongside a full course load."
          />

          <h3 className="mt-14 font-display text-lg font-bold text-ink-900">
            Leadership
          </h3>
          <ul className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            {leadership.map((member) => (
              <li key={member.name} className="group">
                <Avatar className="aspect-square size-full rounded-2xl ring-1 ring-ink-200">
                  <AvatarImage
                    src={member.photo}
                    alt={member.name}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <AvatarFallback className="rounded-2xl bg-ink-100 font-display text-2xl font-bold text-ink-400">
                    {member.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="mt-3 font-display font-bold text-ink-900">
                  {member.name}
                </p>
                <p className="text-sm text-brand-700">{member.role}</p>
              </li>
            ))}
          </ul>

          <h3 className="mt-16 font-display text-lg font-bold text-ink-900">
            Divisions
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-ink-600">
            Six working divisions carry the year between them. Committee members
            are announced at the start of each term.
          </p>
          <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {divisions.map((division) => (
              <li key={division.name}>
                <Card className="h-full gap-0 border-ink-200">
                  <CardHeader>
                    <CardTitle asChild>
                      <h4 className="font-display text-base font-bold text-ink-900">
                        {division.name}
                      </h4>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm leading-relaxed text-ink-600">
                      {division.summary}
                    </p>

                    {division.members.length > 0 ? (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {division.members.map((member) => (
                          <li key={member.name}>
                            <Badge variant="secondary">{member.name}</Badge>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-ink-400">
                        Members announced each term
                      </p>
                    )}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <PartnersStrip />

    </>
  );
}
