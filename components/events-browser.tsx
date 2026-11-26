"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard } from "@/components/event-card";
import type { ThuisaEvent } from "@/lib/events";

type Tab = "upcoming" | "past";

export function EventsBrowser({
  upcoming,
  past,
}: {
  upcoming: ThuisaEvent[];
  past: ThuisaEvent[];
}) {
  // Open on whichever tab actually has something in it.
  const [tab, setTab] = useState<Tab>(upcoming.length > 0 ? "upcoming" : "past");

  // Links like /events#halloween point at a card. If that card sits in the
  // other tab, switch to it first, then scroll once it is visible.
  useEffect(() => {
    const tabFor = (id: string): Tab | null => {
      if (upcoming.some((event) => event.id === id)) return "upcoming";
      if (past.some((event) => event.id === id)) return "past";
      return null;
    };

    const reveal = (id: string) => {
      const target = tabFor(id);
      if (!target) return false;
      setTab(target);
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ block: "start" })
      );
      return true;
    };

    const fromHash = () => reveal(decodeURIComponent(window.location.hash.slice(1)));

    // Clicking a link to the hash already in the URL fires no hashchange.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href^='#']");
      const id = link?.getAttribute("href")?.slice(1);
      if (id && id === window.location.hash.slice(1) && reveal(id)) {
        e.preventDefault();
      }
    };

    fromHash();
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick);
    };
  }, [upcoming, past]);

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as Tab)}
      className="w-full"
    >
      <TabsList className="mx-auto mb-12 h-auto rounded-full bg-surface-sunken p-1.5">
        <TabsTrigger
          value="upcoming"
          className="group rounded-full px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-brand-600 data-[state=active]:text-fg-inverse"
        >
          Upcoming
          <span className="ml-2 text-xs opacity-70 group-data-[state=active]:opacity-100">{upcoming.length}</span>
        </TabsTrigger>
        <TabsTrigger
          value="past"
          className="group rounded-full px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-brand-600 data-[state=active]:text-fg-inverse"
        >
          Past
          <span className="ml-2 text-xs opacity-70 group-data-[state=active]:opacity-100">{past.length}</span>
        </TabsTrigger>
      </TabsList>

      {/* forceMount keeps both lists in the page, so every event card exists
          for links and search engines; the inactive one is only hidden. */}
      <TabsContent
        value="upcoming"
        forceMount
        className="data-[state=inactive]:hidden"
      >
        {upcoming.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState message="Next year's calendar is being planned. Follow us on Instagram to hear first." />
        )}
      </TabsContent>

      <TabsContent
        value="past"
        forceMount
        className="data-[state=inactive]:hidden"
      >
        {past.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard key={event.id} event={event} past />
            ))}
          </div>
        ) : (
          <EmptyState message="Nothing archived yet — the year is only getting started." />
        )}
      </TabsContent>
    </Tabs>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <p className="rounded-2xl border border-dashed border-ink-300 bg-surface-muted px-6 py-16 text-center text-fg-muted">
      {message}
    </p>
  );
}
