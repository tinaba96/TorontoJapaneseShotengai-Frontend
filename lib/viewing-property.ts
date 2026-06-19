/**
 * 内見予約MVP — 物件コンテンツ（1物件・手動管理）
 *
 * ★ ここを編集するだけで物件ページの内容を差し替えられます。
 *   写真は public/images/ 配下に置いて、そのパスを photos に書いてください。
 *   （例: public/images/rental/room1.jpg → "/images/rental/room1.jpg"）
 */

export interface PropertyPhoto {
  src: string;
  alt: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ViewingProperty {
  name: string;
  tagline: string;
  address: string;
  rent: string;
  deposit: string;
  available: string;
  highlights: string[];
  description: string;
  details: { label: string; value: string }[];
  photos: PropertyPhoto[];
  faq: FaqItem[];
}

export const viewingProperty: ViewingProperty = {
  name: "ダウンタウン・シェアハウス（仮）",
  tagline: "トロント到着後すぐ住める、安心の日本人向けシェアハウス",
  address: "Toronto, ON（最寄り駅まで徒歩◯分 / 詳細は内見時に）",
  rent: "$ ---- / 月",
  deposit: "デポジット: 1ヶ月分",
  available: "入居可能: 即日〜",
  highlights: [
    "家具・家電付き、スーツケース1つで入居OK",
    "光熱費・Wi-Fi 込みで予算が読みやすい",
    "日本語で相談できる安心のオーナー対応",
    "ダウンタウンへアクセス良好",
  ],
  description:
    "日本からトロントに来る方が、到着後すぐに生活を始められるよう整えたシェアハウスです。" +
    "家具・家電・Wi-Fi 完備で、初期費用と手間を抑えてスタートできます。" +
    "オーナーが日本語で対応するので、初めての海外生活でも安心です。",
  details: [
    { label: "間取り", value: "個室 / 共用キッチン・バス" },
    { label: "家賃", value: "$ ---- / 月（光熱費・Wi-Fi込み）" },
    { label: "デポジット", value: "1ヶ月分" },
    { label: "入居可能日", value: "即日〜" },
    { label: "契約期間", value: "応相談（短期・長期どちらも）" },
    { label: "最寄り", value: "（内見時にご案内）" },
  ],
  // ↓ まずはプレースホルダー。実際の写真に差し替えてください。
  photos: [
    { src: "/images/default.png", alt: "リビング" },
    { src: "/images/default.png", alt: "個室" },
    { src: "/images/default.png", alt: "キッチン" },
    { src: "/images/default.png", alt: "バスルーム" },
    { src: "/images/default.png", alt: "建物外観" },
    { src: "/images/default.png", alt: "周辺環境" },
  ],
  faq: [
    {
      q: "内見はオンラインでもできますか？",
      a: "はい。現地に来られない方にはビデオ通話での内見も可能です。予約時の備考、または予約後のメールでご相談ください。",
    },
    {
      q: "到着前に契約できますか？",
      a: "可能です。日本にいる間にビデオ内見 → 仮押さえ → 到着日入居、という流れに対応しています。",
    },
    {
      q: "光熱費やWi-Fiは別途かかりますか？",
      a: "家賃に光熱費・Wi-Fi が含まれています。追加の固定費は基本的にありません。",
    },
    {
      q: "短期だけの滞在でも大丈夫ですか？",
      a: "短期・長期どちらもご相談ください。ワーホリ・留学・単身赴任など、滞在予定に合わせて調整します。",
    },
    {
      q: "保証人やクレジットヒストリーは必要ですか？",
      a: "到着直後の方でも入居できるよう、柔軟に対応しています。詳細は内見時にご説明します。",
    },
  ],
};
