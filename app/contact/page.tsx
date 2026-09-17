import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Ticket } from "lucide-react";
import { ContactForm } from "@/components/form";
import { shelfCardClass } from "@/components/shelf-card";
import { TextLink } from "@/components/text-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Container, PageHeader } from "@/components/ui/section";
import { site, socials } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with THUISA — Instagram, TikTok, LINE, or email. Frequently asked questions about membership, events, and joining the Indonesian student community at Tunghai.",
};

const faqs = [
  {
    q: "What is THUISA?",
    a: "THUISA is the Indonesian Student Association at Tunghai University. We run cultural, social, academic, and faith-friendly activities for Indonesian students — and plenty that are open to non-Indonesian students too.",
  },
  {
    q: "How do I become a member?",
    a: "Fill in the membership form and pay the fee to one of the committee (ganbu). If you are not sure who to pay, message us on Instagram and we will point you to the right person.",
    link: { label: "Open the membership form", href: site.joinFormUrl },
  },
  {
    q: "How much is the membership fee?",
    a: `${site.membershipFee}, covering one academic year. It is what funds the events on this site, and members pay a lower price at every one of them.`,
  },
  {
    q: "Do I have to be a member to come to events?",
    a: "No. Most of what we run is open to every Indonesian student at Tunghai, and some events — like International Week — are open to the whole campus. Members simply pay less.",
  },
  {
    q: "I am arriving next semester. What should I do first?",
    a: "Read the Resources page before you fly, then message us. We will add you to the student group chat so you land already knowing a few people.",
    link: { label: "Go to Resources", href: "/resources" },
  },
  {
    q: "Where do you post updates?",
    a: "Instagram and TikTok for quick updates, LINE for reaching the committee directly, and email for anything official.",
  },
  {
    q: "Where are events held?",
    a: "Mostly on the Tunghai campus, sometimes at venues around Taichung. Each event on the Events page lists its exact location.",
    link: { label: "See the events calendar", href: "/events" },
  },
  {
    q: "How can sponsors or partners work with THUISA?",
    a: "Email us your proposal and contact details. Our Communications division handles partnerships and will follow up with you directly.",
  },
];

/** What each channel is actually for, so people pick the right one. */
const channelNotes: Record<string, string> = {
  Instagram: "Event announcements, and DMs for quick questions.",
  TikTok: "Clips from events. Not the best place to ask things.",
  LINE: "The fastest way to reach someone on the committee.",
};

const tile = cn(shelfCardClass, "h-full p-7 hover:scale-100");

/** Two-tone Apple-style section headline. */
function Headline({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <h2 className="max-w-4xl font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
      <span className="text-ink-900">{title}</span>{" "}
      <span className="text-ink-400">{subtitle}</span>
    </h2>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Talk to us"
        lede="Questions about joining, an event, or something you are struggling with in Taichung — there is no question too small."
      />

      {/* Ways to reach us */}
      <section className="bg-ink-50 py-16 md:py-24">
        <Container size="wide">
          <Headline
            title="Pick a channel."
            subtitle="The committee checks all of them every day."
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
            {socials.map((social) => (
              <li key={social.label}>
                <Card className={tile}>
                  <Image
                    src={social.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 object-contain"
                  />
                  <h3 className="mt-6 font-display text-xl font-bold text-ink-900">
                    {social.label}
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">{social.handle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">
                    {channelNotes[social.label]}
                  </p>
                  <div className="mt-auto pt-5">
                    <TextLink href={social.href} external>
                      Open {social.label}
                    </TextLink>
                  </div>
                </Card>
              </li>
            ))}

            <li>
              <Card className={tile}>
                <Mail
                  className="size-10 text-ink-800"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <h3 className="mt-6 font-display text-xl font-bold text-ink-900">
                  Email
                </h3>
                <p className="mt-1 break-all text-sm text-ink-500">
                  {site.email}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  For anything official: partnerships, sponsorship, letters.
                </p>
                <div className="mt-auto pt-5">
                  <TextLink href={`mailto:${site.email}`}>Send an email</TextLink>
                </div>
              </Card>
            </li>
          </ul>
        </Container>
      </section>

      {/* Form */}
      <section className="bg-white py-16 md:py-24">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Headline
                title="Write to the committee."
                subtitle="Issues, concerns, suggestions, or proposals."
              />
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500 md:text-lg">
                This goes straight to the committee inbox. We usually reply
                within a few days, and what you tell us stays with the
                committee.
              </p>
            </div>

            <Card
              className={cn(
                shelfCardClass,
                "bg-ink-50 p-6 shadow-none hover:scale-100 hover:shadow-none md:p-10 lg:col-span-7"
              )}
            >
              <ContactForm />
            </Card>
          </div>
        </Container>
      </section>

      {/* Find us */}
      <section className="bg-ink-50 py-16 md:py-24">
        <Container size="wide">
          <Headline
            title="Find us."
            subtitle="No permanent office, but plenty of us on campus."
          />

          <div className="mt-10 grid gap-5 md:mt-12 lg:grid-cols-3">
            <Card className={cn(tile, "p-0 lg:col-span-2")}>
              <iframe
                title="Tunghai University on Google Maps"
                src={site.mapEmbedUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full border-0 md:h-full md:min-h-[28rem]"
              />
            </Card>

            <div className="grid gap-5">
              <Card className={tile}>
                <MapPin
                  className="size-9 text-brand-600"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                  {site.university}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  No. 1727, Sec. 4, Taiwan Blvd, Xitun District, Taichung City,
                  Taiwan.
                </p>
                <div className="mt-auto pt-5">
                  <TextLink
                    href="https://maps.google.com/?q=Tunghai+University"
                    external
                  >
                    Get directions
                  </TextLink>
                </div>
              </Card>

              <Card id="join" className={tile}>
                <Ticket
                  className="size-9 text-brand-600"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                  Membership
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {site.membershipFee}, for Indonesian students at Tunghai.
                  Members pay less at events.
                </p>
                <div className="mt-auto pt-5">
                  <TextLink href={site.joinFormUrl} external>
                    Membership form
                  </TextLink>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-24">
        <Container className="max-w-4xl">
          <Headline
            title="Questions."
            subtitle="The ones we get every semester."
          />

          <Accordion
            type="single"
            collapsible
            className="mt-10 w-full border-t border-ink-200 md:mt-12"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${index}`}
                className="border-ink-200"
              >
                <AccordionTrigger className="py-6 text-left font-display text-lg font-bold text-ink-900 hover:no-underline md:text-xl">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="max-w-2xl text-base leading-relaxed text-ink-600">
                    {faq.a}
                  </p>
                  {faq.link ? (
                    <div className="mt-4">
                      <TextLink
                        href={faq.link.href}
                        external={faq.link.href.startsWith("http")}
                      >
                        {faq.link.label}
                      </TextLink>
                    </div>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-10 text-base text-ink-500">
            Not here?{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-brand-600 underline-offset-4 hover:underline"
            >
              Ask us directly
            </a>{" "}
            and we will add it.
          </p>
        </Container>
      </section>
    </>
  );
}
