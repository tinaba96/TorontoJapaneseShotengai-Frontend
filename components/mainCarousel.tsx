"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

type Slide = {
  src: string;
  kicker: string;
  number: string;
  title: string;
  excerpt: string;
  tag: string;
  cta: { label: string; href: string };
};

const slides: Slide[] = [
  {
    src: "/images/ad.png",
    kicker: "Editor's pick",
    number: "01",
    title: "今日の一杯、\n日本の温度で。",
    excerpt:
      "朝の珈琲、昼の抹茶。トロントで見つける、まっすぐな味と、ていねいな時間。",
    tag: "Cafe & Sweets",
    cta: { label: "お店を探す", href: "/map" },
  },
  {
    src: "/images/ad2.png",
    kicker: "Curated for you",
    number: "02",
    title: "暮らしを彩る、\nローカルの逸品。",
    excerpt:
      "ふだん使いの和雑貨から、こだわりの調味料まで。あなたの今日に、ちょうどいいモノを。",
    tag: "Shop & Goods",
    cta: { label: "ショップへ", href: "/fm" },
  },
  {
    src: "/images/ad3.png",
    kicker: "Voices",
    number: "03",
    title: "誰かの物語が、\nここから始まる。",
    excerpt:
      "店主の言葉、お客さんの一言。ローカルの空気を、文章でお届け。",
    tag: "Community Stories",
    cta: { label: "ブログを読む", href: "/blogs" },
  },
  {
    src: "/images/ad4.png",
    kicker: "This week",
    number: "04",
    title: "週末を、\n少しだけ特別に。",
    excerpt:
      "ポップアップ、ワークショップ、季節のフェスティバル。あなたの予定に、彩りを。",
    tag: "Events",
    cta: { label: "イベント一覧", href: "/events" },
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
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [nextSlide, isPlaying]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute top-32 -left-20 h-80 w-80 rounded-full bg-sakura-200/40 blur-3xl -z-10" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gold-200/40 blur-3xl -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Eyebrow header */}
        <div className="mb-10 flex items-end justify-between gap-6">
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
              onClick={prevSlide}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sumi-200 bg-white/80 text-sumi-700 backdrop-blur transition-all hover:border-sakura-300 hover:text-sakura-600 hover:-translate-y-0.5"
              aria-label="前のスライド"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sumi-200 bg-white/80 text-sumi-700 backdrop-blur transition-all hover:border-sakura-300 hover:text-sakura-600 hover:-translate-y-0.5"
              aria-label="次のスライド"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sumi-200 bg-white/80 text-sumi-700 backdrop-blur transition-all hover:border-sakura-300 hover:text-sakura-600 hover:-translate-y-0.5"
              aria-label={isPlaying ? "一時停止" : "再生"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* MAGAZINE SPREAD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[2rem] overflow-hidden shadow-elegant ring-1 ring-sumi-100/60 bg-white">
          {/* LEFT: Image panel */}
          <div className="relative lg:col-span-7 aspect-[4/3] lg:aspect-auto lg:min-h-[560px] overflow-hidden bg-sumi-900">
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
                  src={s.src}
                  alt={s.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Gradient overlay — subtle, just for type contrast at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/45 via-transparent to-sumi-900/10" />
              </div>
            ))}

            {/* Floating number badge top-left */}
            <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-washi-50">
              <span className="h-1.5 w-1.5 rounded-full bg-sakura-400 animate-pulse-soft" />
              {slide.kicker}
            </div>

            {/* Giant magazine number bottom-right */}
            <div className="absolute bottom-6 right-6 font-display font-black text-[5rem] md:text-[7rem] leading-none text-white/15 select-none pointer-events-none">
              {slide.number}
            </div>

            {/* Tag chip bottom-left */}
            <div className="absolute bottom-6 left-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-gold px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-sumi-900 shadow-glow-gold">
                <Sparkles className="h-3 w-3" />
                {slide.tag}
              </span>
            </div>
          </div>

          {/* RIGHT: Editorial caption */}
          <div className="relative lg:col-span-5 flex flex-col bg-gradient-to-br from-washi-50 to-white p-8 md:p-12">
            {/* Decorative number */}
            <div className="absolute top-8 right-8 font-mono text-[10px] uppercase tracking-[0.4em] text-sumi-400">
              {String(currentSlide + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </div>

            {/* Top accent */}
            <div className="divider-gold mb-8 mt-2 lg:mt-0" />

            {/* Sliding content */}
            <div className="flex-1 flex flex-col justify-center min-h-[280px]">
              <div className="font-jp text-sm font-semibold tracking-[0.3em] text-gold-500">
                {slide.tag}
              </div>
              <h3 className="mt-4 font-display font-extrabold text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-tight text-sumi-800 whitespace-pre-line text-balance">
                {slide.title.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? (
                      <span className="text-gradient-sakura italic">
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </h3>
              <p className="mt-6 text-sumi-600 text-base leading-relaxed max-w-md">
                {slide.excerpt}
              </p>

              <Link
                href={slide.cta.href}
                className="group mt-8 inline-flex items-center gap-2 self-start rounded-full bg-sumi-800 px-6 py-3 text-sm font-bold text-washi-50 shadow-glow-soft btn-glow transition-all hover:bg-gradient-sakura hover:-translate-y-0.5"
              >
                {slide.cta.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
              </Link>
            </div>

            {/* Bottom indicator track */}
            <div className="mt-10 pt-6 border-t border-sumi-100">
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    aria-current={currentSlide === index}
                    aria-label={`Slide ${index + 1}`}
                    className={`group relative h-1.5 flex-1 overflow-hidden rounded-full transition-all duration-500 ${
                      currentSlide === index
                        ? "bg-sumi-100"
                        : "bg-sumi-100/60 hover:bg-sumi-200/80"
                    }`}
                  >
                    {currentSlide === index && (
                      <span
                        key={`bar-${currentSlide}-${isPlaying}`}
                        className="absolute inset-y-0 left-0 bg-gradient-sakura"
                        style={{
                          width: "100%",
                          animation: isPlaying
                            ? "carousel-progress 6.5s linear forwards"
                            : "none",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Mobile controls */}
              <div className="mt-4 flex md:hidden items-center justify-between">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sumi-200 bg-white text-sumi-700"
                  aria-label="前のスライド"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sumi-200 bg-white text-sumi-700"
                  aria-label={isPlaying ? "一時停止" : "再生"}
                >
                  {isPlaying ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sumi-200 bg-white text-sumi-700"
                  aria-label="次のスライド"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes carousel-progress {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default MainCarousel;
