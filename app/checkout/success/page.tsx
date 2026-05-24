"use client";

import React from "react";
import { CheckCircle2, Home, ShoppingBag, Package, Sparkles, ArrowUpRight } from "lucide-react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import SakuraPetals from "@/components/decor/SakuraPetals";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <main className="flex-grow relative isolate overflow-hidden">
        {/* Aurora glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-sakura-300/30 blur-3xl" />
        <div className="pointer-events-none absolute top-40 right-1/4 h-72 w-72 rounded-full bg-gold-300/30 blur-3xl" />
        <SakuraPetals density="light" />

        <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            {/* Hero icon */}
            <div className="relative mx-auto w-fit">
              <div className="absolute inset-0 -m-6 rounded-full bg-gradient-sakura blur-2xl opacity-50 animate-pulse-soft" />
              <div className="relative grid h-28 w-28 mx-auto place-items-center rounded-full bg-gradient-sakura text-white shadow-glow ring-4 ring-white">
                <CheckCircle2 className="h-14 w-14" strokeWidth={2.5} />
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-gold-200/60 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.4em] text-gold-600">
              <Sparkles className="h-3 w-3" />
              Order Confirmed
            </div>

            <h1 className="mt-6 font-display font-black leading-tight tracking-tight text-balance text-5xl md:text-7xl text-sumi-800">
              <span className="text-gradient-sakura">購入完了</span>
              <span className="text-gold-500">!</span>
            </h1>

            <p className="mt-5 text-lg text-sumi-600 max-w-md mx-auto">
              ご購入ありがとうございます。
              <br />
              商品はご指定の住所へ大切にお届けします。
            </p>

            {/* 配送情報カード */}
            <div className="mt-10 relative overflow-hidden rounded-3xl bg-gradient-sumi p-8 text-left text-washi-50 shadow-elegant ring-1 ring-gold-400/20">
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-sumi-900 shadow-glow-gold">
                    <Package className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-300">
                      Shipping
                    </div>
                    <h2 className="font-display text-xl font-bold text-washi-50">
                      配送について
                    </h2>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    "商品は3-5営業日で配送されます",
                    "配送状況はメールでお知らせします",
                    "ご質問はメッセージ機能からお気軽に",
                  ].map((t, i) => (
                    <li key={t} className="flex items-start gap-3 text-washi-100/85">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-gold-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/fm"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-sakura px-7 py-3.5 text-sm font-bold text-white shadow-glow btn-glow transition-all hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4" />
                フリマへ戻る
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sumi-200 bg-white px-7 py-3.5 text-sm font-semibold text-sumi-700 transition-all hover:border-sakura-300 hover:text-sakura-600 hover:-translate-y-0.5"
              >
                <Home className="w-4 h-4" />
                ホームへ
              </Link>
            </div>

            <p className="mt-10 text-xs text-sumi-400 font-jp tracking-widest">
              ご利用、心より感謝します。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
