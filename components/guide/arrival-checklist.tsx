import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { arrivalChecklist } from "@/lib/resources";

/** "Six things, in order": the numbered checklist on a dark panel. */
export function ArrivalChecklist() {
  return (
    <Section spacing="tight">
      <Container size="wide">
        <div className="grid gap-10 rounded-2xl bg-surface-inverse p-8 text-fg-inverse md:grid-cols-12 md:p-12">
          <div className="md:col-span-5">
            <p className="eyebrow-light">
              <span aria-hidden className="h-px w-6 bg-gold-300/70" />
              Quick checklist
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
              Six things, in order
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-fg-inverse-muted">
              If you only read one part of this page, read this. Work down the
              list and you will avoid most of the problems new students run
              into.
            </p>
          </div>

          <ol className="space-y-3 md:col-span-7">
            {arrivalChecklist.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/10"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-600 font-display text-xs font-bold text-fg-inverse">
                  {index + 1}
                </span>
                <span className="text-sm text-ink-200 md:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
