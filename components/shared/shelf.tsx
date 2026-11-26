"use client";

import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/layout/heading";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

/**
 * Apple Store-style shelf: a two-tone headline ("Bold part. Grey part.") over
 * a row of cards that scrolls sideways, with round paddle buttons underneath.
 *
 * The track bleeds to the edge of the screen but its first card lines up with
 * the page container (see `.shelf-track` in globals.css).
 *
 * Below md (768px) the cards stack in one full-width column instead, inside
 * the normal page gutters, with no sideways scrolling and no paddles. Cards
 * should be full width below md and set their shelf size from md up.
 */
export function Shelf({
  title,
  subtitle,
  children,
  id,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updatePaddles = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updatePaddles();
    track.addEventListener("scroll", updatePaddles, { passive: true });
    window.addEventListener("resize", updatePaddles);
    return () => {
      track.removeEventListener("scroll", updatePaddles);
      window.removeEventListener("resize", updatePaddles);
    };
  }, [updatePaddles]);

  // Move by one card (plus the gap) per click.
  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const step = card
      ? card.getBoundingClientRect().width + 20
      : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <Section id={id} tone="muted" className={className}>
      <Container size="wide">
        <Heading variant="headline" title={title} subtitle={subtitle} />
      </Container>

      <ul
        ref={trackRef}
        aria-label={title}
        className="shelf-track mt-8 grid gap-5 py-6 md:mt-10 md:flex md:snap-x md:snap-proximity md:overflow-x-auto"
      >
        {Children.toArray(children).map((child, index) => (
          <li
            key={isValidElement(child) && child.key ? child.key : index}
            className="shrink-0 snap-start"
          >
            {child}
          </li>
        ))}
      </ul>

      <Container size="wide">
        <div className="hidden justify-end gap-3 md:flex">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label="Scroll back"
            disabled={!canPrev}
            onClick={() => scroll(-1)}
            className="bg-ink-200/70 text-ink-700 hover:bg-ink-200 disabled:opacity-40"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label="Scroll forward"
            disabled={!canNext}
            onClick={() => scroll(1)}
            className="bg-ink-200/70 text-ink-700 hover:bg-ink-200 disabled:opacity-40"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
