import Image from "next/image";
import { Mail, Ticket } from "lucide-react";
import { shelfCardClass } from "@/components/shelf-card";
import { TextLink } from "@/components/text-link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/section";
import { site, socials } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Closing section of the homepage (used there only), in the same Apple Store
 * style as the shelves: two-tone headline, then a bento grid of white cards.
 *
 * Instagram gets the large tile because that is where announcements go
 * first. Membership is deliberately one small tile among five, with
 * id="join" so it can be linked to as /#join.
 */

const [instagram, ...otherSocials] = socials;

const socialNotes: Record<string, string> = {
  TikTok: "Short clips from events, and what the day actually looked like.",
  LINE: "The quickest way to reach someone on the committee directly.",
};

const tile = cn(shelfCardClass, "h-full p-7 hover:scale-100");

export function StayConnected() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container size="wide">
        <h2 className="max-w-4xl font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          <span className="text-ink-900">Stay in the loop.</span>{" "}
          <span className="text-ink-400">
            Dates, posters, and last-minute changes go here first.
          </span>
        </h2>

        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Instagram, featured */}
          <Card
            className={cn(
              tile,
              "relative overflow-hidden p-8 md:col-span-2 lg:row-span-2 md:p-10"
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-gradient-to-br from-accent-300/40 via-brand-400/30 to-fuchsia-500/20 blur-3xl"
            />
            <div className="relative flex h-full flex-col">
              <span className="grid size-16 place-items-center rounded-2xl bg-ink-50 ring-1 ring-ink-100">
                <Image
                  src={instagram.icon}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 object-contain"
                />
              </span>
              <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-brand-600">
                {instagram.label}
              </p>
              <h3 className="mt-2 max-w-md font-display text-3xl font-bold leading-tight text-ink-900 md:text-4xl">
                Every event is announced here first.
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink-600">
                Posters, registration links, date changes, and the photos
                afterwards. Questions in the DMs get answered by the committee.
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-8">
                <TextLink href={instagram.href} external>
                  Follow {instagram.handle}
                </TextLink>
                <TextLink href="/events">See the calendar</TextLink>
              </div>
            </div>
          </Card>

          {/* TikTok, LINE */}
          {otherSocials.map((social) => (
            <Card key={social.label} className={tile}>
              <span className="grid size-12 place-items-center rounded-xl bg-ink-50 ring-1 ring-ink-100">
                <Image
                  src={social.icon}
                  alt=""
                  width={26}
                  height={26}
                  className="size-[26px] object-contain"
                />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-ink-900">
                {social.label}
              </h3>
              <p className="mt-1 text-sm text-ink-500">{social.handle}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {socialNotes[social.label]}
              </p>
              <div className="mt-auto pt-5">
                <TextLink href={social.href} external>
                  Open {social.label}
                </TextLink>
              </div>
            </Card>
          ))}

          {/* Email */}
          <Card className={tile}>
            <span className="grid size-12 place-items-center rounded-xl bg-ink-50 text-ink-700 ring-1 ring-ink-100">
              <Mail className="size-6" strokeWidth={1.5} aria-hidden />
            </span>
            <h3 className="mt-6 font-display text-xl font-bold text-ink-900">
              Email
            </h3>
            <p className="mt-1 break-all text-sm text-ink-500">{site.email}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              For anything official: partnerships, sponsorship, and letters.
            </p>
            <div className="mt-auto pt-5">
              <TextLink href={`mailto:${site.email}`}>Send an email</TextLink>
            </div>
          </Card>

          {/* Membership */}
          <Card id="join" className={cn(tile, "bg-ink-50 shadow-none")}>
            <span className="grid size-12 place-items-center rounded-xl bg-white text-brand-600 ring-1 ring-ink-100">
              <Ticket className="size-6" strokeWidth={1.5} aria-hidden />
            </span>
            <h3 className="mt-6 font-display text-xl font-bold text-ink-900">
              Membership
            </h3>
            <p className="mt-1 text-sm font-medium text-ink-500">
              {site.membershipFee}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              For Indonesian students at Tunghai. Members pay less at events;
              you do not need it to come along.
            </p>
            <div className="mt-auto flex flex-col items-start gap-1 pt-5">
              <TextLink href={site.joinFormUrl} external>
                Membership form
              </TextLink>
              <TextLink href="/contact">Ask about it</TextLink>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
