import { Wrench } from "lucide-react";
import { Container, Section } from "@/components/ui/section";

/**
 * Placeholder for a page that is not built yet. Nothing uses it right now —
 * Report and Resources both have real content — but it is here for the next
 * section that needs a holding page.
 */
export default function ComingSoon({
  title = "Coming soon",
  body = "We are still putting this page together. Check back soon.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Section spacing="loose">
      <Container size="narrow" className="text-center">
        <span className="mx-auto grid size-20 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
          <Wrench className="size-10" aria-hidden />
        </span>
        <h1 className="mt-8 font-display text-3xl font-bold text-ink-900 md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-base text-ink-600 md:text-lg">{body}</p>
      </Container>
    </Section>
  );
}
