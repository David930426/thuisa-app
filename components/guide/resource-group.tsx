import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Icon } from "@/components/shared/icon";
import type { ResourceGroup as ResourceGroupData } from "@/lib/resources";

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("tel:");
}

/**
 * One topic of the guide (Before you arrive, First weeks, ...): icon, title
 * and summary on the left, the list of links on the right. Its id is the
 * anchor the jump navigation and other pages link to.
 */
export function ResourceGroup({
  group,
  tone,
}: {
  group: ResourceGroupData;
  tone: "default" | "muted";
}) {
  return (
    <Section id={group.id} tone={tone}>
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
              <Icon name={group.icon} className="size-6" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-fg md:text-3xl">
              {group.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">
              {group.summary}
            </p>
          </div>

          <ul className="divide-y divide-border lg:col-span-8">
            {group.items.map((item) => {
              const external = isExternal(item.href);
              const content = (
                <>
                  <span className="flex-1">
                    <span className="flex items-center gap-2 font-display text-base font-bold text-fg transition-colors group-hover:text-brand-700">
                      {item.title}
                      {external ? (
                        <ArrowUpRight className="size-4 shrink-0 text-ink-500 transition-colors group-hover:text-brand-600" />
                      ) : null}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-fg-muted">
                      {item.description}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={item.title}>
                  {external ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("tel:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group flex gap-4 py-5 transition-colors"
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="group flex gap-4 py-5 transition-colors"
                    >
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
