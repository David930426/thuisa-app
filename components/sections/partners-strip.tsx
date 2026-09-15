import Image from "next/image";
import { Container, Section } from "@/components/ui/section";
import { partners } from "@/lib/site";

export function PartnersStrip() {
  return (
    <Section tone="muted" spacing="tight">
      <Container size="wide">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <p className="max-w-xs text-center text-sm font-semibold uppercase tracking-[0.16em] text-ink-500 md:text-left">
            Working alongside
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:justify-end">
            {partners.map((partner) => (
              <li key={partner.name}>
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
                >
                  <Image
                    src={partner.logo}
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 rounded-lg object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <span className="max-w-[10rem] leading-tight">
                    {partner.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
