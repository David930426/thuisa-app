"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";

import { Button } from "@/components/ui/button";
import { images, site } from "@/lib/site";

import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

/**
 * Home page slideshow. All slides stay in the DOM (fade effect), so every
 * slide except the visible one is `inert`: its links can't be focused or
 * reached by screen readers. Swiper 11's loop mode moves the real slides
 * around instead of cloning them, so there are no copies to handle.
 *
 * The page's only h1 is the visually hidden one below; slide titles are h2.
 */
export default function Hero() {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [playing, setPlaying] = useState(true);
  // Index of the visible slide in images.hero (Swiper's realIndex in loop mode).
  const [activeIndex, setActiveIndex] = useState(0);

  // People who ask their system for less motion start with the slideshow paused.
  useEffect(() => {
    if (!swiper) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      swiper.autoplay.stop();
      setPlaying(false);
    }
  }, [swiper]);

  const togglePlaying = () => {
    if (!swiper) return;
    if (playing) swiper.autoplay.stop();
    else swiper.autoplay.start();
    setPlaying(!playing);
  };

  // While keyboard focus is inside the hero, hold the slideshow still, so the
  // slide holding the focused link doesn't fade out and become inert. Mouse
  // clicks (no :focus-visible) keep the slideshow running as before.
  const holdForFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.target.matches(":focus-visible")) return;
    if (swiper && playing) swiper.autoplay.stop();
  };
  const releaseFocusHold = (event: React.FocusEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    if (swiper && playing) swiper.autoplay.start();
  };

  return (
    <section
      className="relative"
      aria-label="Welcome"
      onFocus={holdForFocus}
      onBlur={releaseFocusHold}
    >
      <h1 className="sr-only">
        {site.name} — {site.fullName}
      </h1>

      <button
        type="button"
        onClick={togglePlaying}
        aria-pressed={!playing}
        aria-label={playing ? "Pause slideshow" : "Play slideshow"}
        className="absolute bottom-4 right-5 z-20 grid size-11 place-items-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-brand-600/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:bottom-8 lg:right-32"
      >
        {playing ? (
          <Pause className="size-5" aria-hidden />
        ) : (
          <Play className="size-5" aria-hidden />
        )}
      </button>

      <Swiper
        onSwiper={setSwiper}
        onRealIndexChange={(instance) => setActiveIndex(instance.realIndex)}
        modules={[Navigation, Pagination, Autoplay, EffectFade, Keyboard, A11y]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        navigation
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        className="hero-swiper h-[88vh] min-h-[560px] w-full"
      >
        {images.hero.map((slide, index) => (
          <SwiperSlide key={slide.src} inert={index !== activeIndex}>
            <div className="relative h-full w-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              {/* Two layers: a bottom-up scrim for the text, plus a left wash
                  so the copy holds up over a busy photo. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/55 to-ink-950/35"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-transparent"
              />

              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-page px-gutter pb-16 sm:px-gutter-wide">
                  <div className="max-w-2xl">
                    <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white ring-1 ring-white/25 backdrop-blur-sm sm:text-xs">
                      {slide.eyebrow}
                    </p>
                    <h2 className="mt-6 text-4xl font-extrabold leading-[1.05] text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                      {slide.body}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button asChild variant="brand" size="lg">
                        <Link href={slide.cta.href}>{slide.cta.label}</Link>
                      </Button>
                      <Button asChild variant="onDarkOutline" size="lg">
                        <Link href={slide.secondaryCta.href}>{slide.secondaryCta.label}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
