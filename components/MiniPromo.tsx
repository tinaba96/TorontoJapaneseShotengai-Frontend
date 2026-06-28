"use client";

import { ArrowRight, Wallet } from "lucide-react";

/**
 * 控えめなテキスト型ミニバナー（SplitWhom）。
 * ブログ・掲示板など各所に軽く差し込む用。画像広告(AdSense)とは見た目を変えて干渉を避ける。
 */
const URL =
  "https://splitwhom.com/?utm_source=toronto-shotengai&utm_medium=referral&utm_campaign=mini_banner";

function trackClick() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", "promo_banner_click", { promo: "splitwhom_mini", link_url: URL });
}

export default function MiniPromo({ className = "" }: { className?: string }) {
  return (
    <a
      href={URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackClick}
      className={`group flex items-center gap-3 rounded-xl border border-sumi-100 bg-white/70 px-4 py-3 text-sm transition-colors hover:border-sakura-200 hover:bg-sakura-50/40 ${className}`}
    >
      <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-sakura-50 text-sakura-500">
        <Wallet className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-sumi-800">
          割り勘・送金をかんたんに — SplitWhom
        </span>
        <span className="block text-xs text-sumi-400">
          友達やルームメイトとの精算をスマートに（PR）
        </span>
      </span>
      <ArrowRight className="h-4 w-4 flex-shrink-0 text-sumi-300 transition-transform group-hover:translate-x-0.5 group-hover:text-sakura-500" />
    </a>
  );
}
