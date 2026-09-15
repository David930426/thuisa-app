"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";

import { Button } from "@/components/ui/button";
import { images } from "@/lib/site";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Hero() {
  return (
    <section className="relative" aria-label="Welcome">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        navigation
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
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
                <div className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8">
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
