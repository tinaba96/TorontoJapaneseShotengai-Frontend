"use client";

import Image from "next/image";

/**
 * 他サービスの宣伝バナー（複数）。
 * - 遷移先GA: URLのUTMで流入元を計測
 * - 自サイトGA(GA4): クリック時に promo_banner_click イベントを送信
 * 画像は public/images/ に配置。
 */

type Banner = {
  id: string;
  url: string;
  image: string;
  alt: string;
  width: number;
  height: number;
};

const BANNERS: Banner[] = [
  {
    id: "splitwhom",
    url: "https://splitwhom.com/?utm_source=toronto-shotengai&utm_medium=referral&utm_campaign=og_banner",
    image: "/images/splitwhom-ja.png",
    alt: "SplitWhom — 割り勘・送金をかんたんに",
    width: 1200,
    height: 630,
  },
  {
    id: "shenzhen_buddies",
    url: "https://www.shenzhen-buddies.com/welcome?utm_source=toronto-shotengai.com&utm_medium=banner&utm_campaign=tjs_rental",
    image: "/images/shenzhen-buddies.png",
    alt: "ぜひ深圳市に遊びに来てください — Buddyが安く・楽しく・安全にご案内します",
    width: 1536,
    height: 1024,
  },
];

function trackClick(id: string, url: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", "promo_banner_click", { promo: id, link_url: url });
}

export default function PromoBanner() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      {BANNERS.map((b) => (
        <a
          key={b.id}
          href={b.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackClick(b.id, b.url)}
          aria-label={b.alt}
          className="block overflow-hidden rounded-2xl border border-sumi-100 shadow-glow-soft transition-transform hover:-translate-y-0.5"
        >
          <Image
            src={b.image}
            alt={b.alt}
            width={b.width}
            height={b.height}
            className="h-auto w-full"
            style={{ width: "100%", height: "auto" }}
            sizes="(max-width: 640px) 100vw, 576px"
          />
        </a>
      ))}
    </div>
  );
}
