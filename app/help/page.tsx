import type { Metadata } from "next";
import { Building2, Flag, MessagesSquare, type LucideIcon } from "lucide-react";
import { EmergencyNumbers } from "@/components/guide/emergency-numbers";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/layout/heading";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TextLink } from "@/components/shared/text-link";
import { Card } from "@/components/ui/card";
import { kdei, thuisaHelp, universityContact } from "@/lib/help";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help",
  description:
    "Emergency numbers in Taiwan (110 and 119), the 1990 foreigner help line, and who to contact next: KDEI Taipei, Tunghai's Office of International Relations, and THUISA.",
};

// University details that haven't been supplied yet are empty and left out.
const universityDetails = [
  {
    label: "Phone",
    value: universityContact.phone,
    href: `tel:${universityContact.phone.replace(/[^\d+]/g, "")}`,
  },
  {
    label: "Email",
    value: universityContact.email,
    href: `mailto:${universityContact.email}`,
  },
  { label: "Office", value: universityContact.office },
  { label: "After hours", value: universityContact.afterHours },
].filter((detail) => detail.value);

// Instagram, and LINE once its invite link exists (see lib/links.ts).
const thuisaChannels = socials.filter(
  (social) =>
    (social.label === "Instagram" || social.label === "LINE") && social.href
);

/** One "who to contact" card: icon, kicker, name, description, then links. */
function ContactCard({
  icon: IconComponent,
  kicker,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  kicker: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card variant="tile" className="h-full p-7">
      <IconComponent
        className="size-9 text-brand-600"
        strokeWidth={1.5}
        aria-hidden
      />
      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-600">
        {kicker}
      </p>
      <h3 className="mt-2 font-display text-xl font-bold text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
        {description}
      </p>
      {children}
    </Card>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Who to call"
        lede="Emergency numbers first. Below them, who to contact for everything else."
      />

      {/* 110 and 119 as tap-to-call buttons, then 1990 as a help line */}
      <EmergencyNumbers />

      <Section tone="muted">
        <Container size="wide">
          <Heading
            variant="headline"
            title="Not an emergency?"
            subtitle="These people can help."
          />

          <ol className="mt-10 grid gap-5 md:mt-12 lg:grid-cols-3">
            <li>
              <ContactCard
                icon={Flag}
                kicker="Indonesian office in Taiwan"
                title={kdei.name}
                description={kdei.description}
              >
                <div className="mt-auto pt-5">
                  <TextLink href={kdei.href} external>
                    Visit the KDEI website
                  </TextLink>
                </div>
              </ContactCard>
            </li>

            <li>
              <ContactCard
                icon={Building2}
                kicker="Tunghai University"
                title={universityContact.name}
                description={universityContact.description}
              >
                {universityDetails.length > 0 ? (
                  <dl className="mt-4 space-y-2 text-sm">
                    {universityDetails.map((detail) => (
                      <div key={detail.label}>
                        <dt className="font-semibold text-fg">{detail.label}</dt>
                        <dd className="text-fg-muted">
                          {detail.href ? (
                            <a
                              href={detail.href}
                              className="break-all font-medium text-brand-600 underline-offset-4 hover:underline"
                            >
                              {detail.value}
                            </a>
                          ) : (
                            detail.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                <div className="mt-auto pt-5">
                  <TextLink href={universityContact.href} external>
                    Visit the OIR website
                  </TextLink>
                </div>
              </ContactCard>
            </li>

            <li>
              <ContactCard
                icon={MessagesSquare}
                kicker="Your student association"
                title={thuisaHelp.title}
                description={thuisaHelp.description}
              >
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {thuisaHelp.replyTime}
                </p>
                <ul className="mt-auto flex flex-col items-start gap-3 pt-5">
                  <li>
                    <TextLink href={`mailto:${site.email}`}>
                      Email {site.email}
                    </TextLink>
                  </li>
                  {thuisaChannels.map((social) => (
                    <li key={social.label}>
                      <TextLink href={social.href} external>
                        {social.label} {social.handle}
                      </TextLink>
                    </li>
                  ))}
                  <li>
                    <TextLink href="/contact">All ways to reach us</TextLink>
                  </li>
                </ul>
              </ContactCard>
            </li>
          </ol>
        </Container>
      </Section>
    </>
  );
}
