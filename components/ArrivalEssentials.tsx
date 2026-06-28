"use client";

import {
  Plug,
  Zap,
  Smartphone,
  Package,
  Coffee,
  Snowflake,
  ShoppingBag,
  ArrowUpRight,
  Luggage,
} from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  getArrivalEssentials,
  itemUrl,
  type PickCategory,
} from "@/lib/amazon-picks";

const CATEGORY_ICON: Record<PickCategory, React.ComponentType<{ className?: string }>> = {
  電源: Plug,
  通信: Smartphone,
  収納: Package,
  キッチン: Coffee,
  防寒: Snowflake,
  生活: ShoppingBag,
};

const CATEGORY_TONE: Record<PickCategory, string> = {
  電源: "bg-amber-50 text-amber-600 ring-amber-200/60",
  通信: "bg-sky-50 text-sky-600 ring-sky-200/60",
  収納: "bg-violet-50 text-violet-600 ring-violet-200/60",
  キッチン: "bg-rose-50 text-rose-600 ring-rose-200/60",
  防寒: "bg-cyan-50 text-cyan-600 ring-cyan-200/60",
  生活: "bg-emerald-50 text-emerald-600 ring-emerald-200/60",
};

/**
 * 「到着後すぐ役立つグッズ」キュレーション（Amazon.ca / アフィリ）。
 * lib/amazon-picks.ts の ARRIVAL_ESSENTIALS_SLUG の記事でだけ表示。
 */
export default function ArrivalEssentials({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const items = getArrivalEssentials(slug);
  if (items.length === 0) return null;

  return (
    <section
      className={`overflow-hidden rounded-3xl border border-gold-200/70 bg-gradient-to-br from-washi-50 via-white to-washi-50 shadow-glow-soft ${className}`}
    >
      {/* ヘッダー */}
      <div className="relative border-b border-gold-100/70 bg-gradient-sumi px-6 py-5 text-washi-50">
        <div className="pointer-events-none absolute -top-10 -right-6 h-32 w-32 rounded-full bg-gold-500/20 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <Luggage className="h-5 w-5 text-gold-300" />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold leading-tight">
              到着後すぐ役立つグッズ
            </h2>
            <p className="mt-0.5 text-xs text-washi-100/70">
              スーツケースひとつで来た人の「あって良かった」を厳選
            </p>
          </div>
        </div>
      </div>

      {/* イントロ：現地調達(=Amazon.ca)を推奨 */}
      <p className="px-5 pt-4 text-xs leading-relaxed text-sumi-500">
        <span className="font-semibold text-sumi-700">
          北米仕様（プラグ・電圧）やかさばる物は、日本から持参するより現地で買う方が安くて確実
        </span>
        。下記はすべて <span className="font-semibold text-gold-600">Amazon.ca</span>{" "}
        で手に入り、早ければ翌日に届きます。スーツケースの容量も節約できます。
      </p>

      {/* グリッド */}
      <div className="grid grid-cols-1 gap-3 px-5 pb-5 pt-3 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = CATEGORY_ICON[item.category] ?? ShoppingBag;
          const tone = CATEGORY_TONE[item.category] ?? CATEGORY_TONE["生活"];
          return (
            <a
              key={item.id}
              href={itemUrl(item)}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() =>
                sendGAEvent("event", "amazon_click", {
                  item: item.id,
                  article: slug,
                })
              }
              className="group flex flex-col rounded-2xl border border-sumi-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-glow-soft"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl ring-1 ${tone}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-sumi-400">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-bold leading-snug text-sumi-800 group-hover:text-gold-600">
                    {item.name}
                  </h3>
                </div>
              </div>
              <p className="mt-2.5 flex-1 text-xs leading-relaxed text-sumi-500">
                {item.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 self-start text-xs font-bold text-gold-600">
                Amazonで見る
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          );
        })}
      </div>

      {/* 開示 */}
      <p className="px-5 pb-4 text-[11px] leading-relaxed text-sumi-400">
        ※ 当サイトは Amazon
        アソシエイト・プログラムの参加者です。上記リンク経由で対象商品をご購入いただくと、当サイトが紹介料を得る場合があります（価格は変わりません）。
      </p>
    </section>
  );
}
