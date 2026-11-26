import { Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { emergencyNumbers, foreignerHelpLine } from "@/lib/resources";

/** Red band at the top of the guide: tap-to-call 110 and 119, then 1990. */
export function EmergencyNumbers() {
  return (
    <Section tone="brand" spacing="tight">
      <Container size="wide">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/15 text-fg-inverse ring-1 ring-white/25">
              <Phone className="size-6" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-fg-inverse">
                Emergency? Call now
              </h2>
              <p className="mt-1 text-sm text-fg-inverse">
                Free from any phone. Save these numbers now, not later.
              </p>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {emergencyNumbers.map((item) => (
              <li key={item.number}>
                <a
                  href={item.href}
                  className="flex items-center gap-4 rounded-xl bg-white px-5 py-3 text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
                >
                  <span className="font-display text-3xl font-extrabold tabular-nums">
                    {item.number}
                  </span>
                  <span className="text-sm font-semibold text-fg">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/20 pt-5 text-sm text-fg-inverse sm:flex-row sm:items-center sm:justify-between">
          <a
            href={foreignerHelpLine.href}
            className="underline-offset-4 hover:underline"
          >
            <span className="font-semibold">
              {foreignerHelpLine.number} – {foreignerHelpLine.label}
            </span>{" "}
            <span>({foreignerHelpLine.detail})</span>
          </a>
          <a
            href="#help"
            className="shrink-0 font-semibold underline-offset-4 hover:underline"
          >
            Full help list
          </a>
        </div>
      </Container>
    </Section>
  );
}
