"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Sparkles, Check, ChevronDown } from "lucide-react";
import { viewingProperty as p } from "@/lib/viewing-property";
import BookingWidget from "./_components/BookingWidget";
import ContactDialog from "./_components/ContactDialog";
import LineButton from "./_components/LineButton";
import PromoBanner from "@/components/PromoBanner";

export default function ViewingPage() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-sumi text-washi-50">
        <div className="pointer-events-none absolute -top-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-sakura-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-[32rem] w-[32rem] rounded-full bg-gold-500/20 blur-3xl" />
        <div className="divider-gold" />
        <div className="relative container mx-auto px-4 lg:px-8 py-14 md:py-20">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-washi-100/60">
            <span className="h-1.5 w-1.5 rounded-full bg-sakura-400 animate-pulse" />
            Trusted Rentals · 信頼できる賃貸
          </div>
          <h1 className="mt-6 font-display font-black leading-[1.05] md:leading-[0.98] tracking-tight text-balance break-words text-3xl sm:text-4xl md:text-6xl">
            {p.name}
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-washi-100/80">
            {p.tagline}
          </p>
          <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span className="font-display text-4xl font-black tracking-tight text-gold-300 md:text-5xl">
              {p.rent}
            </span>
            <span className="rounded-full border border-gold-300/40 bg-gold-300/10 px-3 py-1 text-xs font-medium text-gold-200">
              光熱費・Wi-Fi込み
            </span>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-sm text-washi-100/80">
            <span className="inline-flex items-start gap-1.5">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-300" />
              <span className="min-w-0">{p.address}</span>
            </span>
            <span className="inline-flex items-start gap-1.5">
              <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-300" />
              <span className="min-w-0">{p.available}</span>
            </span>
          </div>
        </div>
        <div className="divider-gold" />
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14">
          {/* LEFT: content */}
          <div>
            {/* Gallery */}
            <div className="overflow-hidden rounded-3xl border border-sumi-100 bg-white shadow-glow-soft">
              <div className="relative aspect-[16/10] bg-sumi-50">
                <Image
                  src={p.photos[activePhoto]?.src ?? "/images/default.png"}
                  alt={p.photos[activePhoto]?.alt ?? p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
              <div className="flex gap-2 overflow-x-auto p-3">
                {p.photos.map((photo, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActivePhoto(i)}
                    className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl ring-2 transition-all ${
                      activePhoto === i
                        ? "ring-sakura-500"
                        : "ring-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Videos */}
            {p.videos?.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-sumi-800">
                  動画で見る
                </h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.videos.map((v) => (
                    <figure
                      key={v.src}
                      className="overflow-hidden rounded-3xl border border-sumi-100 bg-sumi-900 shadow-glow-soft"
                    >
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        className="aspect-[3/4] w-full bg-black object-contain"
                      >
                        <source src={v.src} type="video/mp4" />
                        お使いのブラウザは動画再生に対応していません。
                      </video>
                      <figcaption className="px-4 py-3 text-sm text-washi-100/80">
                        {v.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {p.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-2.5 rounded-2xl border border-sumi-100 bg-white p-4"
                >
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span className="text-sm text-sumi-700">{h}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold text-sumi-800">
                この物件について
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-sumi-600">
                {p.description}
              </p>
            </div>

            {/* Details */}
            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold text-sumi-800">
                物件情報
              </h2>
              <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {p.details.map((d) => (
                  <div
                    key={d.label}
                    className="flex flex-col gap-0.5 border-b border-sumi-100 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <dt className="flex-shrink-0 text-xs text-sumi-500 sm:text-sm">
                      {d.label}
                    </dt>
                    <dd className="min-w-0 break-words text-sm font-medium text-sumi-800 sm:text-right">
                      {d.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* FAQ */}
            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold text-sumi-800">
                よくある質問
              </h2>
              <div className="mt-4 space-y-2">
                {p.faq.map((item, i) => {
                  const open = openFaq === i;
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-sumi-100 bg-white overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="text-sm font-medium text-sumi-800">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 flex-shrink-0 text-sumi-400 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`grid transition-all duration-300 ${
                          open
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-4 text-sm leading-relaxed text-sumi-600">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: booking (sticky) */}
          <div>
            <div className="lg:sticky lg:top-24">
              <BookingWidget />
              <ContactDialog />
              <LineButton />
            </div>
          </div>
        </div>

        {/* PR: 他アプリ宣伝バナー */}
        <div className="mt-14">
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-sumi-300">
            PR
          </p>
          <PromoBanner />
        </div>
      </div>
    </div>
  );
}
