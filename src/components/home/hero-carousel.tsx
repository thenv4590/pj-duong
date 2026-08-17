"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { heroSlides } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5000;

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section aria-label="Banner giới thiệu" className="relative w-full">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent className="ml-0">
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.title} className="pl-0">
              <div className="relative aspect-[16/7] w-full min-h-[280px] sm:min-h-[360px] lg:aspect-[1920/720]">
                <Image
                  src={slide.image}
                  alt={`${slide.title} - ${slide.subtitle}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center bg-black/25">
                  <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-4">
                    <div className="max-w-md text-white">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                        Kuka Home
                      </p>
                      <h2 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        {slide.title}
                      </h2>
                      <p className="mt-2 text-lg font-light sm:text-xl">
                        {slide.subtitle}
                      </p>
                      <Link
                        href={slide.href}
                        className="mt-6 inline-flex h-11 items-center rounded-full bg-brand px-7 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-brand-dark"
                      >
                        {slide.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Đến banner ${index + 1}`}
            aria-current={selected === index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              selected === index ? "w-6 bg-white" : "w-2 bg-white/50"
            )}
          />
        ))}
      </div>
    </section>
  );
}
