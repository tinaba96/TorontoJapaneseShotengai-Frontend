"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/ad.png",
  "/images/ad2.png",
  "/images/ad3.png",
  "/images/ad4.png",
];

const MainCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative w-full pt-6 pb-12">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Eyebrow */}
        <div className="mb-6 flex items-center justify-between">
          <div className="section-eyebrow">
            <span className="h-px w-8 bg-gold-400" />
            Featured · 注目
          </div>
          <span className="hidden md:inline-block text-xs font-mono text-sumi-400 tracking-widest">
            {String(currentSlide + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
        </div>

        <div
          id="default-carousel"
          className="relative w-full group"
          data-carousel="slide"
        >
          {/* Carousel wrapper */}
          <div className="relative h-[420px] md:h-[640px] overflow-hidden rounded-3xl shadow-elegant ring-1 ring-sumi-100/60">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -inset-10 z-0 bg-gradient-aurora opacity-20 blur-3xl" />

            {images.map((src, index) => (
              <div
                key={src}
                className={`absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  index === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Slide ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Cinematic gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/70 via-sumi-900/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/40 via-transparent to-transparent" />
              </div>
            ))}

            {/* Bottom-left caption */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-washi-50">
                  <span className="h-1.5 w-1.5 rounded-full bg-sakura-400 animate-pulse-soft" />
                  Now Featured
                </div>
                <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-washi-50 text-shadow-elegant text-balance">
                  カナダで出会う、
                  <span className="text-gradient-gold">日本の物語</span>
                </h2>
                <p className="mt-2 max-w-xl text-sm md:text-base text-washi-100/80">
                  暮らしを彩る、ローカルのお店・人・モノ。
                </p>
              </div>
            </div>
          </div>

          {/* Slider indicators */}
          <div className="absolute z-30 bottom-6 right-6 flex items-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-current={currentSlide === index}
                aria-label={`Slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === index
                    ? "w-10 bg-gradient-gold shadow-glow-gold"
                    : "w-4 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Slider controls */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="前のスライド"
            className="absolute left-4 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/25 hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="次のスライド"
            className="absolute right-4 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/25 hover:scale-110"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainCarousel;
