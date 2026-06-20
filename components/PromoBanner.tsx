"use client";

import Image from "next/image";

/**
 * 他アプリ宣伝バナー（Shenzhen Buddies）。
 * 画像は public/images/shenzhen-buddies.png に配置。
 * - 遷移先GA: URLのUTMで流入元を計測
 * - 自サイトGA(GA4): クリック時に promo_banner_click イベントを送信
 */
const PROMO_URL =
  "https://www.shenzhen-buddies.com/welcome?utm_source=toronto-shotengai.com&utm_medium=banner&utm_campaign=tjs_rental";
const PROMO_IMAGE = "/images/shenzhen-buddies.png";

export default function PromoBanner() {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      const w = window as unknown as {
        gtag?: (...args: unknown[]) => void;
      };
      w.gtag?.("event", "promo_banner_click", {
        promo: "shenzhen_buddies",
        link_url: PROMO_URL,
      });
    }
  };

  return (
    <a
      href={PROMO_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Shenzhen Buddies — 深圳旅行のマッチング"
      className="block overflow-hidden rounded-3xl border border-sumi-100 shadow-glow-soft transition-transform hover:-translate-y-0.5"
    >
      <Image
        src={PROMO_IMAGE}
        alt="ぜひ深圳市に遊びに来てください — Buddyが安く・楽しく・安全にご案内します"
        width={1536}
        height={1024}
        className="h-auto w-full"
        style={{ width: "100%", height: "auto" }}
        sizes="(max-width: 1024px) 100vw, 1024px"
      />
    </a>
  );
}
