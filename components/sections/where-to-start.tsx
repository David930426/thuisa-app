import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Compass, MessagesSquare, Plus } from "lucide-react";
import { Shelf } from "@/components/shelf";
import { shelfCardClass } from "@/components/shelf-card";
import { Card } from "@/components/ui/card";
import { images } from "@/lib/site";
import { cn } from "@/lib/utils";

const startHere = [
  {
    title: "While you are still in Indonesia",
    body: "Resident visa, dorm application, admission documents. All of it is slower once you are already here.",
    href: "/resources#before-you-arrive",
    icon: Compass,
  },
  {
    title: "Your first two weeks in Taichung",
    body: "ARC within 15 days of landing, then a bank account, a SIM card, and an EasyCard. In that order.",
    href: "/resources#first-weeks",
    icon: CalendarDays,
  },
  {
    title: "Anything the official pages skip",
    body: "Which dorm is closer to class, where to find sambal, how to read a lease. Message us and a senior will answer.",
    href: "/contact",
    icon: MessagesSquare,
  },
];

const cardSize = "h-[340px] w-[290px] sm:w-[330px]";

/** "Where to start" — compact icon cards, closing on a photo card. */
export function WhereToStart() {
  return (
    <Shelf
      title="Arriving soon?"
      subtitle="Here is where to start."
    >
      {startHere.map((item) => (
        <Card
          key={item.title}
          asChild
          className={cn(shelfCardClass, cardSize, "p-8")}
        >
          <Link href={item.href}>
            <item.icon className="size-9 shrink-0 text-brand-600" strokeWidth={1.5} />
            <h3 className="mt-6 font-display text-xl font-bold leading-snug text-ink-900 sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              {item.body}
            </p>
            <span className="mt-auto grid size-9 shrink-0 place-items-center self-end rounded-full bg-ink-900 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-600">
              <Plus className="size-5" aria-hidden />
            </span>
          </Link>
        </Card>
      ))}

      <Card
        asChild
        className={cn(shelfCardClass, cardSize, "relative bg-ink-900 p-8")}
      >
        <Link href="/resources">
          <Image
            src={images.homeWelcome}
            alt=""
            fill
            sizes="330px"
            className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent"
          />
          <div className="relative mt-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-300">
              New student guide
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold leading-snug text-white">
              Everything else is in the full guide.
            </h3>
          </div>
          <span className="relative mt-5 grid size-9 shrink-0 place-items-center self-end rounded-full bg-white text-ink-900 transition-transform duration-300 group-hover:scale-110">
            <Plus className="size-5" aria-hidden />
          </span>
        </Link>
      </Card>
    </Shelf>
  );
}
