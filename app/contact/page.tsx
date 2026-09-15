import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/form";
import { StayConnected } from "@/components/sections/stay-connected";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import {
  Container,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { site, socials } from "@/lib/site";

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

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Talk to us"
        lede="Questions about joining, an event, or something you are struggling with in Taichung — there is no question too small. We have almost certainly been asked it before."
      />

      {/* Ways to reach us */}
      <Section spacing="tight">
        <Container size="wide">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {socials.map((social) => (
              <li key={social.label}>
                <Card
                  asChild
                  className="group h-full justify-start gap-0 border-ink-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-ink-900/5"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="grid size-12 place-items-center rounded-xl bg-ink-100 transition-colors group-hover:bg-brand-600">
                      <Image
                        src={social.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="size-6 object-contain"
                      />
                    </span>
                    <span className="mt-5 flex items-center gap-1.5 font-display text-base font-bold text-ink-900">
                      {social.label}
                      <ArrowUpRight className="size-4 text-ink-400 transition-colors group-hover:text-brand-600" />
                    </span>
                    <span className="mt-1 text-sm text-ink-600">
                      {social.handle}
                    </span>
                  </a>
                </Card>
              </li>
            ))}

            <li>
              <Card
                asChild
                className="group h-full justify-start gap-0 border-transparent bg-brand-600 p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-700 hover:shadow-lg"
              >
                <a href={`mailto:${site.email}`}>
                  <span className="grid size-12 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
                    <Mail className="size-6" aria-hidden />
                  </span>
                  <span className="mt-5 font-display text-base font-bold">
                    Email us
                  </span>
                  <span className="mt-1 break-all text-sm text-white/80">
                    {site.email}
                  </span>
                </a>
              </Card>
            </li>
          </ul>
        </Container>
      </Section>

      {/* Form + map */}
      <Section tone="muted">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Send a message"
                title="Write to the committee"
                lede="Issues, concerns, suggestions, or partnership proposals — this reaches the committee inbox directly."
              />
              <Card className="mt-10 border-ink-200 p-6 md:p-8">
                <ContactForm />
              </Card>
            </div>

            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Find us"
                title="Tunghai University"
                lede="No. 1727, Sec. 4, Taiwan Blvd, Xitun District, Taichung City, Taiwan."
              />

              <div className="mt-10 overflow-hidden rounded-2xl ring-1 ring-ink-200">
                <iframe
                  title="Tunghai University on Google Maps"
                  src={site.mapEmbedUrl}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-80 w-full border-0 md:h-[26rem]"
                />
              </div>

              <Card className="mt-6 flex-row items-start gap-3 border-ink-200 p-5">
                <MapPin
                  className="mt-0.5 size-5 shrink-0 text-brand-600"
                  aria-hidden
                />
                <p className="text-sm leading-relaxed text-ink-600">
                  We do not keep a permanent office. The quickest way to reach a
                  real person is Instagram or LINE — the committee checks both
                  every day.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Ask THUISA"
                title="Questions we get every semester"
                lede="If yours is not here, send it to us and we will add it."
              />
            </div>

            <div className="lg:col-span-8">
              <Accordion
                type="single"
                collapsible
                defaultValue="faq-0"
                className="w-full"
              >
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.q} value={`faq-${index}`}>
                    <AccordionTrigger className="py-5 text-left font-display text-base font-bold text-ink-900 hover:no-underline md:text-lg">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <p className="text-sm leading-relaxed text-ink-600 md:text-base">
                        {faq.a}
                      </p>
                      {faq.link ? (
                        <Link
                          href={faq.link.href}
                          {...(faq.link.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                        >
                          {faq.link.label}
                          <ArrowUpRight className="size-4" aria-hidden />
                        </Link>
                      ) : null}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Container>
      </Section>

      <StayConnected />
    </>
  );
}
