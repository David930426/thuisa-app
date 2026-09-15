"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard } from "@/components/event-card";
import type { ThuisaEvent } from "@/lib/events";

export function EventsBrowser({
  upcoming,
  past,
}: {
  upcoming: ThuisaEvent[];
  past: ThuisaEvent[];
}) {
  // Open on whichever tab actually has something in it.
  const defaultTab = upcoming.length > 0 ? "upcoming" : "past";

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="mx-auto mb-12 h-auto rounded-full bg-ink-100 p-1.5">
        <TabsTrigger
          value="upcoming"
          className="rounded-full px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-brand-600 data-[state=active]:text-white"
        >
          Upcoming
          <span className="ml-2 text-xs opacity-70">{upcoming.length}</span>
        </TabsTrigger>
        <TabsTrigger
          value="past"
          className="rounded-full px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-brand-600 data-[state=active]:text-white"
        >
          Past
          <span className="ml-2 text-xs opacity-70">{past.length}</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming">
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

      <TabsContent value="past">
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
    <p className="rounded-2xl border border-dashed border-ink-300 bg-ink-50 px-6 py-16 text-center text-ink-500">
      {message}
    </p>
  );
}
