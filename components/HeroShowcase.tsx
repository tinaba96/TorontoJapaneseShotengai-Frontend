"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, Compass } from "lucide-react";
import SakuraPetals from "./decor/SakuraPetals";

const HeroShowcase = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-sumi text-washi-50">
      {/* Aurora glows */}
      <div className="pointer-events-none absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-sakura-500/30 blur-[120px] animate-pulse-soft" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[40rem] w-[40rem] rounded-full bg-gold-500/25 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sakura-400/10 blur-3xl" />

      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Falling sakura */}
      <SakuraPetals />

      {/* Top gold hairline */}
      <div className="divider-gold" />

      <div className="relative container mx-auto px-4 lg:px-8 pt-16 md:pt-24 pb-24 md:pb-32">
        {/* Top eyebrow row */}
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.4em] text-washi-100/50">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sakura-400 animate-pulse" />
            EST · 2025
          </span>
          <span className="hidden md:inline">CA · ON · Toronto 43°N</span>
        </div>

        {/* Mega headline */}
        <div className="mt-10 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-9">
            <p className="font-jp text-sm md:text-base text-gold-300/90 tracking-[0.4em]">
              トロント 日本人 商店街
            </p>
            <h1 className="mt-4 font-display font-black leading-[0.95] tracking-tight text-balance">
              <span className="block text-6xl md:text-8xl lg:text-9xl">
                <span className="text-gradient-aurora">A new kind of</span>
              </span>
              <span className="block text-7xl md:text-[9rem] lg:text-[11rem] -mt-2 italic">
                <span className="text-gradient-gold">Shotengai.</span>
              </span>
            </h1>
          </div>
          <div className="hidden md:flex col-span-3 flex-col items-end text-right">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-washi-100/50">
              Issue · 01
            </span>
            <span className="mt-2 font-display text-5xl font-bold text-gradient-gold">
              25
            </span>
            <span className="text-xs text-washi-100/60 font-jp">
              ローカル店舗
            </span>
          </div>
        </div>

        {/* Lead paragraph */}
        <div className="mt-10 grid grid-cols-12 gap-6">
          <p className="col-span-12 md:col-span-7 lg:col-span-6 text-lg md:text-xl text-washi-100/80 leading-relaxed text-balance">
            人と店、文化と暮らし。
            トロントで出会う日本の温度を、
            <span className="text-gold-300">心地よい一冊のように</span>
            お届けします。
          </p>
          <div className="col-span-12 md:col-span-5 lg:col-span-6 flex md:justify-end items-end gap-3">
            <Link
              href="/map"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-sakura px-6 py-3 text-sm font-bold text-white shadow-glow btn-glow transition-all hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <Compass className="h-4 w-4" />
              MAP を見る
            </Link>
            <Link
              href="/fm"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-6 py-3 text-sm font-semibold text-washi-50 transition-all hover:bg-white/10 hover:-translate-y-0.5"
            >
              フリマへ
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          {[
            { num: "120+", label: "Local Stores", jp: "登録店舗" },
            { num: "30+", label: "Events / Year", jp: "年間イベント" },
            { num: "5K+", label: "Community", jp: "コミュニティ会員" },
            { num: "24/7", label: "Always Open", jp: "オンラインで" },
          ].map((s) => (
            <div
              key={s.label}
              className="group relative flex flex-col gap-1 p-5 md:p-6 bg-sumi-900/40 transition-colors hover:bg-sumi-900/60"
            >
              <span className="absolute top-3 right-3 text-[9px] font-mono tracking-widest text-gold-400/60">
                <Sparkles className="h-2.5 w-2.5 inline" />
              </span>
              <span className="font-display text-4xl md:text-5xl font-extrabold text-gradient-gold">
                {s.num}
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-washi-100/60">
                {s.label}
              </span>
              <span className="font-jp text-xs text-washi-100/50">{s.jp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gold hairline */}
      <div className="divider-gold" />
    </section>
  );
};

export default HeroShowcase;
