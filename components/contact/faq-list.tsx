import { TextLink } from "@/components/shared/text-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type Faq = {
  q: string;
  a: string;
  /** Optional link under the answer; external when it starts with http. */
  link?: { label: string; href: string };
};

/** Frequently asked questions as an accordion, one open at a time. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="mt-10 w-full border-t border-border md:mt-12"
    >
      {items.map((faq, index) => (
        <AccordionItem
          key={faq.q}
          value={`faq-${index}`}
          className="border-border"
        >
          <AccordionTrigger className="py-6 text-left font-display text-lg font-bold text-fg hover:no-underline md:text-xl">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <p className="max-w-2xl text-base leading-relaxed text-fg-muted">
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
  );
}
