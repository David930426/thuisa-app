import Image from "next/image";
import Link from "next/link";
import { Shelf } from "@/components/shelf";
import { shelfCardClass } from "@/components/shelf-card";
import { Card } from "@/components/ui/card";
import { pillars } from "@/lib/site";
import { cn } from "@/lib/utils";

/** "What we do" — large photo cards in a sideways-scrolling shelf. */
export function Pillars() {
  return (
    <Shelf
      title="The things we run."
      subtitle="All of it organised by students, alongside their own coursework."
    >
      {pillars.map((pillar) => (
        <Card
          key={pillar.title}
          asChild
          className={cn(
            shelfCardClass,
            "h-[480px] w-[290px] sm:h-[500px] sm:w-[372px] lg:w-[400px]"
          )}
        >
          <Link href={pillar.href}>
            <div className="p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                {pillar.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-ink-900 sm:text-[28px]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {pillar.body}
              </p>
            </div>

            <div className="relative mt-auto min-h-40 flex-1 overflow-hidden">
              <Image
                src={pillar.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 372px, 290px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>
        </Card>
      ))}
    </Shelf>
  );
}
