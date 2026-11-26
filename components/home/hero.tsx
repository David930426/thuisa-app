"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";

import { Button } from "@/components/ui/button";
import { images } from "@/lib/site";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Hero() {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [playing, setPlaying] = useState(true);

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

  return (
    <section className="relative" aria-label="Welcome">
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
        modules={[Navigation, Pagination, Autoplay, EffectFade, Keyboard]}
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
          <SwiperSlide key={slide.src}>
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
                    <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>
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
