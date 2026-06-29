"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, X } from "lucide-react";

/**
 * ページ表示のたびに毎回表示するウェルカムモーダル（SplitWhom）。
 * 広告バナー然とした見た目を避け、「トロント新生活のヒント」として
 * 役立つ案内のトーンで自然に差し込む。
 * ステマ規制対応として極小の「PR」表記のみ残す。
 */

const URL =
  "https://splitwhom.com/?utm_source=toronto-shotengai&utm_medium=referral&utm_campaign=welcome_modal";

function track(event: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, { promo: "splitwhom_welcome", link_url: URL });
}

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // 表示のたびに毎回出す（少し遅らせて自然に立ち上げる）
    const t = window.setTimeout(() => {
      setOpen(true);
      track("welcome_modal_view");
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = () => {
    setOpen(false);
  };

  const handleCta = () => {
    track("welcome_modal_click");
    dismiss();
  };

  // ESCで閉じる & 背面スクロールロック
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-sumi-900/40 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-glow-soft animate-in fade-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じる */}
        <button
          onClick={dismiss}
          aria-label="閉じる"
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/70 text-sumi-400 backdrop-blur transition-colors hover:bg-white hover:text-sumi-700"
        >
          <X className="h-4 w-4" />
        </button>

        {/* 上部：桜グラデのウェルカム帯 */}
        <div className="relative bg-gradient-to-br from-sakura-50 via-white to-sakura-50/60 px-6 pb-5 pt-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sakura-100/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-sakura-600">
            <Sparkles className="h-3.5 w-3.5" />
            トロント新生活のヒント
          </span>
          <h2
            id="welcome-title"
            className="mt-4 font-serif text-2xl font-bold leading-snug text-sumi-900"
          >
            ルームシェアの
            <br className="sm:hidden" />
            「立て替え精算」、
            <br />
            もうモヤモヤしない。
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-sumi-500">
            家賃・光熱費・日用品にBBQまで——海外生活は誰かが立て替える場面の連続。
            <span className="font-semibold text-sumi-700">
              誰が何を払ったかを記録して、自動でかんたん精算。
            </span>
            渡航前後の出費が多い時期こそ、最初に入れておくと安心です。
          </p>
        </div>

        {/* 下部：CTA */}
        <div className="px-6 pb-6 pt-1">
          <a
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCta}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-sumi-900 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-sumi-800"
          >
            無料で使ってみる
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            onClick={dismiss}
            className="mt-2 w-full rounded-2xl px-5 py-2.5 text-xs font-medium text-sumi-400 transition-colors hover:text-sumi-600"
          >
            あとで
          </button>

          {/* ステマ規制対応の極小表記 */}
          <p className="mt-1 text-center text-[10px] text-sumi-300">
            SplitWhom 提供（PR）
          </p>
        </div>
      </div>
    </div>
  );
}
