"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

type Slide = {
  src: string;
  kicker: string;
  title: string;
  tag: string;
};

const slides: Slide[] = [
  {
    src: "/images/ad.png",
    kicker: "Featured · 01",
    title: "今日の一杯、\n日本の温度で。",
    tag: "Cafe & Sweets",
  },
  {
    src: "/images/ad2.png",
    kicker: "Featured · 02",
    title: "暮らしを彩る、\nローカルの逸品。",
    tag: "Shop & Goods",
  },
  {
    src: "/images/ad3.png",
    kicker: "Featured · 03",
    title: "誰かの物語が、\nここから始まる。",
    tag: "Community",
  },
  {
    src: "/images/ad4.png",
    kicker: "Featured · 04",
    title: "週末を、\n少しだけ特別に。",
    tag: "Events",
  },
];

const MainCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPlaying]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Eyebrow header */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <div className="section-eyebrow">
              <span className="h-px w-8 bg-gold-400" />
              Stories of Shotengai
            </div>
            <h2 className="mt-3 section-heading text-sumi-800">
              <span className="text-gradient-aurora">Featured</span>{" "}
              <span className="font-jp text-sumi-700">いま注目</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sumi-200 bg-white/70 text-sumi-700 backdrop-blur hover:border-sakura-300 hover:text-sakura-600 transition-colors"
              aria-label={isPlaying ? "一時停止" : "再生"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
            <span className="font-mono text-xs text-sumi-400 tracking-widest min-w-[64px] text-right">
              {String(currentSlide + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="group grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Big visual */}
          <div className="relative lg:col-span-9 h-[440px] md:h-[640px] overflow-hidden rounded-[2rem] shadow-elegant ring-1 ring-sumi-100/60">
            <div className="pointer-events-none absolute -inset-10 z-0 bg-gradient-aurora opacity-20 blur-3xl" />
            {slides.map((s, index) => (
              <div
                key={s.src}
                className={`absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  index === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <Image
                  src={s.src || "/placeholder.svg"}
                  alt={s.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/85 via-sumi-900/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-sumi-900/55 via-transparent to-transparent" />
              </div>
            ))}

            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-washi-50">
                  <span className="h-1.5 w-1.5 rounded-full bg-sakura-400 animate-pulse-soft" />
                  {slide.kicker}
                </span>
                <h3 className="mt-4 font-display text-3xl md:text-6xl font-extrabold text-washi-50 text-shadow-elegant whitespace-pre-line leading-[1.05] text-balance">
                  {slide.title}
                </h3>
                <p className="mt-3 font-jp text-sm md:text-base text-gold-300 tracking-widest">
                  {slide.tag}
                </p>
              </div>
            </div>

            {/* Indicators bottom right */}
            <div className="absolute z-30 bottom-6 right-6 flex items-center gap-2">
              {slides.map((_, index) => (
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

            {/* Controls */}
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

          {/* Right-rail thumbnails (magazine style) */}
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3">
            {slides.map((s, index) => (
              <button
                key={s.src + index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`group/thumb relative overflow-hidden rounded-2xl ring-1 transition-all duration-500 ${
                  index === currentSlide
                    ? "ring-gold-400 shadow-glow-gold scale-100"
                    : "ring-sumi-100/70 opacity-70 hover:opacity-100 hover:ring-sakura-200"
                }`}
                style={{ aspectRatio: "16 / 11" }}
                aria-label={`Show ${s.title}`}
              >
                <Image
                  src={s.src}
                  alt={s.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover/thumb:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/85 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-left">
                  <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-gold-300/90">
                    {s.kicker}
                  </div>
                  <div className="mt-0.5 font-display text-sm font-bold text-white text-shadow-elegant line-clamp-1">
                    {s.tag}
                  </div>
                </div>
                {index === currentSlide && (
                  <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-gradient-gold px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sumi-900">
                    Now
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCarousel;
