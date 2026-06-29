"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles, X } from "lucide-react";

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
            みんなで立て替え、
            <br />
            もう精算でモメない。
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-sumi-500">
            BBQ・パーティ・旅行——みんなで買い込んで立て替えがバラバラでも、
            <span className="font-semibold text-sumi-700">
              誰が何を払ったかを記録すれば自動で精算。
            </span>
            「結局、誰が誰にいくら払えばいい？」を、いちばんシンプルで支払い回数が最小のかたちで提案してくれるサイトです。
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
        </div>
      </div>
    </div>
  );
}
