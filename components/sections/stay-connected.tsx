import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { site, socials } from "@/lib/site";

/**
 * Closing section for most pages. The point is to show people where we post,
 * not to sell membership — the membership note is deliberately the smaller
 * half. It keeps the id="join" anchor because links across the site point at
 * it.
 */
export function StayConnected() {
  return (
    <Section tone="brand" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.09] [background-image:linear-gradient(135deg,#fff_1px,transparent_1px),linear-gradient(45deg,#fff_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-accent-400/20 blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow-light">
              <span aria-hidden className="h-px w-6 bg-accent-300/70" />
              Keep up with us
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] text-white md:text-4xl">
              Dates, posters, and last-minute changes go on Instagram first
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
              That is where we announce events, post photos afterwards, and
              answer questions. LINE is for reaching the committee directly, and
              email for anything official.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full items-center gap-3 rounded-xl bg-white/10 p-3 ring-1 ring-white/15 transition-colors hover:bg-white/20"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white">
                      <Image
                        src={social.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="size-5 object-contain"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-white">
                        {social.label}
                      </span>
                      <span className="block text-xs text-white/70">
                        {social.handle}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button asChild variant="onDark" size="lg">
                <Link href="/events">See what is coming up</Link>
              </Button>
            </div>
          </div>

          <div id="join" className="lg:justify-self-end lg:max-w-md">
            <Card className="gap-0 border-white/20 bg-white/10 p-8 text-white backdrop-blur-sm">
              <h3 className="font-display text-lg font-bold text-white">
                A note on membership
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Most of what we run is open to any Indonesian student at
                Tunghai, whether you are a member or not. Membership is{" "}
                <span className="font-semibold text-white">
                  {site.membershipFee}
                </span>{" "}
                and its only real purpose is that members pay a lower price at
                events. The fees go back into running them.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                If you are an Indonesian student here and you go to more than a
                couple of events a year, it pays for itself. If you are not sure
                yet, come to one first.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="onDarkOutline" size="sm">
                  <a href={site.joinFormUrl} target="_blank" rel="noopener noreferrer">Membership form</a>
                </Button>
                <Button asChild variant="onDarkOutline" size="sm">
                  <Link href="/contact">Ask us about it</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
