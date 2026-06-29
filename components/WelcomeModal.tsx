"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, Receipt, Sparkles, Users, X } from "lucide-react";

/**
 * ページ表示のたびに毎回表示するウェルカムモーダル（SplitWhom）。
 * SplitWhom は同一運営者による自社サービスのため、自前プロモーションとして表示。
 * 広告バナー然とした見た目を避け、「トロント新生活のヒント」として
 * 役立つ案内のトーンで自然に差し込む。
 */

const URL =
  "https://splitwhom.com/?utm_source=toronto-shotengai&utm_medium=referral&utm_campaign=welcome_modal";

// 表示しないページ（ブログ・掲示板）。物件ページ等は遷移/リロードのたびに毎回表示する。
const BLOCKED_PREFIXES = ["/blogs", "/board"];

function track(event: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, { promo: "splitwhom_welcome", link_url: URL });
}

export default function WelcomeModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const blocked = pathname
    ? BLOCKED_PREFIXES.some(
        (p) => pathname === p || pathname.startsWith(p + "/")
      )
    : false;

  useEffect(() => {
    if (typeof window === "undefined") return;
    // ブログ・掲示板では出さない
    if (blocked) {
      setOpen(false);
      return;
    }
    // それ以外（物件ページ等）はパスが変わる/リロードするたびに毎回出す
    setOpen(false);
    const t = window.setTimeout(() => {
      setOpen(true);
      track("welcome_modal_view");
    }, 1200);
    return () => window.clearTimeout(t);
  }, [pathname, blocked]);

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
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/70 p-4 backdrop-blur-md sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      onClick={dismiss}
    >
      {/* 背景の浮遊オーブ（奥行き） */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -left-10 top-1/4 h-64 w-64 rounded-full bg-sakura-500/20 blur-3xl" />
        <div
          className="animate-float absolute -right-10 bottom-1/4 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div
        className="animate-fade-in-up relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-sumi shadow-elegant"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 上部の光彩 & ノイズ質感 */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-radial from-sakura-500/25 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay" />
        {/* 上端のヘアライン */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/60 to-transparent" />

        {/* 閉じる */}
        <button
          onClick={dismiss}
          aria-label="閉じる"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur transition-all hover:bg-white/15 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative px-7 pb-7 pt-8">
          {/* キッカー */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-300/30 bg-gold-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-200">
            <Sparkles className="h-3.5 w-3.5" />
            Toronto Tips
          </span>

          {/* 見出し */}
          <h2
            id="welcome-title"
            className="mt-5 font-jp text-[1.7rem] font-bold leading-tight text-white"
          >
            「誰が誰に払う？」を
            <br />
            <span className="text-gradient-gold">一瞬で、最小回数に。</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            BBQ・パーティ・旅行——みんなで買い込んで立て替えがバラバラでも、
            <span className="font-medium text-white/90">記録するだけ。</span>
            あとは自動で精算し、いちばん支払い回数が少ない送金方法まで教えてくれます。
          </p>

          {/* 強みのビジュアル帯 */}
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
            <span className="flex -space-x-2">
              {["A", "B", "C"].map((n, i) => (
                <span
                  key={n}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-gradient-sakura text-[11px] font-bold text-white shadow-glow"
                  style={{ opacity: 1 - i * 0.18 }}
                >
                  {n}
                </span>
              ))}
            </span>
            <ArrowRight className="h-4 w-4 flex-shrink-0 text-gold-300" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/15 px-3 py-1.5 text-xs font-semibold text-gold-200">
              <Receipt className="h-3.5 w-3.5" />
              送金は最小回数
            </span>
          </div>

          {/* 特徴チップ */}
          <ul className="mt-4 flex flex-wrap gap-2">
            {[
              { icon: Users, label: "みんなの立て替えを記録" },
              { icon: Check, label: "自動でかんたん精算" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70"
              >
                <Icon className="h-3.5 w-3.5 text-sakura-300" />
                {label}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCta}
            className="group relative mt-7 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-gold px-5 py-4 text-sm font-bold text-sumi-900 shadow-glow-gold transition-transform hover:-translate-y-0.5"
          >
            {/* シマー */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">無料で使ってみる</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <button
            onClick={dismiss}
            className="mt-2.5 w-full rounded-2xl px-5 py-2 text-xs font-medium text-white/40 transition-colors hover:text-white/70"
          >
            あとで
          </button>
        </div>
      </div>
    </div>
  );
}
