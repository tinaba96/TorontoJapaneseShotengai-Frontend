import Image from "next/image";

/**
 * 他アプリ宣伝バナー（Shenzhen Buddies）。
 * 画像は public/images/shenzhen-buddies.png に配置してください。
 * リンク先・画像は必要に応じて差し替え可能。
 */
const PROMO_URL = "https://www.shenzhen-buddies.com/welcome";
const PROMO_IMAGE = "/images/shenzhen-buddies.png";

export default function PromoBanner() {
  return (
    <a
      href={PROMO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Shenzhen Buddies — 深圳旅行のマッチング"
      className="block overflow-hidden rounded-3xl border border-sumi-100 shadow-glow-soft transition-transform hover:-translate-y-0.5"
    >
      <Image
        src={PROMO_IMAGE}
        alt="ぜひ深圳市に遊びに来てください — Buddyが安く・楽しく・安全にご案内します"
        width={1536}
        height={1024}
        className="h-auto w-full"
        sizes="(max-width: 1024px) 100vw, 1024px"
      />
    </a>
  );
}
