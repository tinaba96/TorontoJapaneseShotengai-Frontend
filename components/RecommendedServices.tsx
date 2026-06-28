"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import { getServicesForArticle } from "@/lib/affiliate-links";

/**
 * 記事末尾の「渡航前に準備したいサービス」枠。
 * lib/affiliate-links.ts に url が設定されたサービスだけ表示。未設定なら何も出ない。
 */
export default function RecommendedServices({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const services = getServicesForArticle(slug);
  if (services.length === 0) return null;

  return (
    <section
      className={`rounded-3xl border border-gold-200/70 bg-gradient-to-br from-washi-50 to-white p-6 ${className}`}
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-sumi-700">
        <Sparkles className="h-4 w-4 text-gold-500" />
        渡航前に準備しておくと安心
      </div>
      <p className="mt-1 text-xs text-sumi-400">
        ※ 一部はアフィリエイト/紹介リンクを含みます
      </p>

      <div className="mt-4 space-y-3">
        {services.map((s) => (
          <a
            key={s.key}
            href={s.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() =>
              sendGAEvent("event", "affiliate_click", {
                service: s.key,
                article: slug,
              })
            }
            className="group flex items-center justify-between gap-4 rounded-2xl border border-sumi-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-gold-300"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold text-sumi-800">
                  {s.name}
                </span>
                {s.note && (
                  <span className="rounded-full bg-sumi-50 px-2 py-0.5 text-[10px] font-medium text-sumi-500">
                    {s.note}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-sumi-500">
                {s.tagline}
              </p>
            </div>
            <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-gradient-sakura px-4 py-2 text-xs font-bold text-white shadow-glow">
              {s.cta}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
