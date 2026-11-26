"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Ticket, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { eventDateParts, formatEventDate, type ThuisaEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

export function EventCard({
  event,
  past = false,
  className,
}: {
  event: ThuisaEvent;
  past?: boolean;
  className?: string;
}) {
  const { day, monthShort, year } = eventDateParts(event.date);

  return (
    <Dialog>
      <Card
        id={event.id}
        className={cn(
          "group gap-0 overflow-hidden border-border py-0 transition-all duration-300 hover:-translate-y-1 hover:border-ink-300 hover:shadow-xl hover:shadow-ink-900/10",
          className
        )}
      >
        <div className="relative aspect-[3/2] overflow-hidden bg-surface-sunken">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              past && "grayscale-[35%]"
            )}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent"
          />

          {/* Date chip */}
          <div className="absolute left-4 top-4 overflow-hidden rounded-xl bg-white/95 text-center shadow-lg backdrop-blur-sm">
            <p className="bg-brand-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-fg-inverse">
              {monthShort}
            </p>
            <p className="px-3 py-1.5 font-display text-xl font-extrabold leading-none text-fg">
              {day}
            </p>
          </div>

          {past ? (
            <Badge className="absolute right-4 top-4 bg-ink-900/75 uppercase tracking-wider backdrop-blur-sm">
              Past
            </Badge>
          ) : null}

          <p className="absolute bottom-3 left-4 right-4 text-xs font-medium text-white/85">
            {year}
          </p>
        </div>

        <CardHeader className="pt-6">
          <Badge
            variant="outline"
            className="mb-1 border-brand-200 bg-brand-50 uppercase tracking-wider text-brand-700"
          >
            {event.type}
          </Badge>
          <CardTitle className="font-display text-xl font-bold text-fg">
            {event.title}
          </CardTitle>
          <CardDescription className="font-medium text-brand-700">
            {event.tagline}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <dl className="space-y-2 text-sm text-fg-muted">
            <div className="flex items-start gap-2.5">
              <dt className="sr-only">Date</dt>
              <CalendarDays
                className="mt-0.5 size-4 shrink-0 text-ink-500"
                aria-hidden
              />
              <dd>{formatEventDate(event.date)}</dd>
            </div>
            <div className="flex items-start gap-2.5">
              <dt className="sr-only">Location</dt>
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-ink-500"
                aria-hidden
              />
              <dd>{event.location}</dd>
            </div>
          </dl>
        </CardContent>

        <CardFooter className="mt-auto pb-6 pt-6">
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="w-full hover:bg-brand-600 hover:text-fg-inverse"
            >
              {past ? "See what happened" : "Event details"}
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>

      {/* `block` overrides the base grid: a grid item with an aspect ratio and
          a percentage width collapses its row to zero and overlaps the body. */}
      <DialogContent className="block max-h-[88vh] max-w-2xl overflow-y-auto rounded-2xl p-0">
        <div className="relative aspect-[5/2] w-full overflow-hidden bg-surface-sunken">
          <Image
            src={event.image}
            alt=""
            fill
            sizes="640px"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent"
          />
          <Badge className="absolute bottom-4 left-6 bg-white/15 uppercase tracking-[0.16em] text-gold-300 backdrop-blur-sm">
            {event.type}
          </Badge>
        </div>

        <div className="px-6 pb-8 pt-2">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold text-fg">
              {event.title}
            </DialogTitle>
            <DialogDescription className="text-base text-brand-700">
              {event.tagline}
            </DialogDescription>
          </DialogHeader>

          <dl className="mt-6 grid gap-3 rounded-xl bg-surface-muted p-4 text-sm sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <CalendarDays
                className="mt-0.5 size-4 shrink-0 text-brand-600"
                aria-hidden
              />
              <div>
                <dt className="font-semibold text-fg">When</dt>
                <dd className="text-fg-muted">{formatEventDate(event.date)}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-brand-600"
                aria-hidden
              />
              <div>
                <dt className="font-semibold text-fg">Where</dt>
                <dd className="text-fg-muted">{event.location}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Users
                className="mt-0.5 size-4 shrink-0 text-brand-600"
                aria-hidden
              />
              <div>
                <dt className="font-semibold text-fg">Who can come</dt>
                <dd className="text-fg-muted">{event.who}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Ticket
                className="mt-0.5 size-4 shrink-0 text-brand-600"
                aria-hidden
              />
              <div>
                <dt className="font-semibold text-fg">Registration</dt>
                <dd className="text-fg-muted">
                  {event.noTicket
                    ? "Free, no registration needed"
                    : "Open to all; members pay a lower price"}
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-ink-700">
            <section>
              <h4 className="font-display text-base font-bold text-fg">
                About the event
              </h4>
              <p className="mt-2">{event.about}</p>
            </section>

            <Separator />

            <div className="grid gap-6 sm:grid-cols-2">
              <section>
                <h4 className="font-display text-base font-bold text-fg">
                  What happens
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {event.activities.map((activity) => (
                    <li key={activity} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-500"
                      />
                      {activity}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="font-display text-base font-bold text-fg">
                  Why you should join
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {event.reasons.map((reason) => (
                    <li key={reason} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-500"
                      />
                      {reason}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {event.note ? (
              <p className="rounded-xl border-l-4 border-gold-400 bg-gold-50 px-4 py-3 text-fg-body">
                <span className="font-semibold">Please note: </span>
                {event.note}
              </p>
            ) : null}
          </div>

          {!past ? (
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href="/contact">Ask us about this event</Link>
              </Button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
