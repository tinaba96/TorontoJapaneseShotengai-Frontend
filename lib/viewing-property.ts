/**
 * 内見予約MVP — 物件コンテンツ（1物件・手動管理）
 *
 * ★ ここを編集するだけで物件ページの内容を差し替えられます。
 *   写真は public/images/ 配下に置いて、そのパスを photos に書いてください。
 *   （例: public/images/rental/room-1.jpg → "/images/rental/room-1.jpg"）
 */

export interface PropertyPhoto {
  src: string;
  alt: string;
}

export interface PropertyVideo {
  src: string;
  label: string;
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
  videos: PropertyVideo[];
  faq: FaqItem[];
}

export const viewingProperty: ViewingProperty = {
  name: "Yonge & Finch｜家具付きの半地下個室",
  tagline:
    "North York の閑静な住宅街。日本人が暮らす一軒家の、家具付き個室。スーツケースひとつで、トロント生活を始められます。",
  address: "North York, Toronto（Yonge & Finch エリア / 一軒家の半地下フロア）",
  rent: "$695 / 月",
  deposit: "デポジット: 1ヶ月分（最終月の家賃に充当）",
  available: "入居可能: 2026年7月1日〜",
  highlights: [
    "月 $695・家具付きで、スーツケースひとつですぐ入居",
    "ベッド・デスク・椅子・TV完備＋クローゼット2つで収納たっぷり",
    "Wi-Fi利用可・洗濯乾燥無料・エアコン＆暖房完備",
    "リノベーション済みのキッチン＆バスルームで清潔",
    "閑静で治安の良い住宅街。日本人が暮らす安心の環境（学生・社会人問わず歓迎）",
    "オーナーと日本語で相談OK・門限なしの自由な暮らし",
    "緑あふれる共用の庭＆屋根付きラウンジでリフレッシュ",
  ],
  description:
    "North York・Yonge & Finch エリアにある一軒家の半地下フロア、約8畳の家具付き個室です。" +
    "ベッド・デスク・椅子・TV がそろい、クローゼットも2つあるので、衣類や荷物が多い方でも収納はたっぷり。" +
    "スーツケースひとつで到着したその日から、新生活を始められます。" +
    "キッチン・バスルームはリノベーション済みで清潔感があり、Wi-Fi 利用可・洗濯乾燥は無料・エアコン・暖房も完備。" +
    "キッチン・バス・トイレは3名でシェアし、現在は日本人の社会人が暮らしています。" +
    "学生・ワーホリ・社会人など、日本人の方ならどなたでも歓迎です。" +
    "閑静で治安の良い住宅街にあり、門限もありません。初めてのトロント生活でも、日本語で相談できるので安心です。",
  details: [
    { label: "間取り", value: "約8畳の個室（小窓あり・半地下）" },
    { label: "物件タイプ", value: "一軒家の地下フロア" },
    { label: "家賃", value: "$695 / 月" },
    { label: "デポジット", value: "1ヶ月分（最終月の家賃に充当）" },
    { label: "入居可能日", value: "2026年7月1日〜" },
    { label: "契約期間", value: "応相談（短期・長期）" },
    { label: "家具・家電", value: "ベッド / デスク / 椅子 / TV / クローゼット×2" },
    { label: "設備", value: "Wi-Fi利用可・洗濯乾燥無料・エアコン・暖房" },
    { label: "共用部", value: "キッチン・バス・トイレ（3名でシェア）" },
    { label: "募集対象", value: "日本人の方（学生・ワーホリ・社会人など歓迎）" },
    { label: "現在の入居者", value: "日本人の社会人" },
    { label: "周辺", value: "スーパーまで自転車で約10分" },
    { label: "エリア", value: "North York / Yonge & Finch" },
  ],
  photos: [
    { src: "/images/rental/room-1.jpg", alt: "約8畳の家具付き個室" },
    { src: "/images/rental/room-2.jpg", alt: "ベッド・デスク・ソファのある居室" },
    { src: "/images/rental/room-3.jpg", alt: "リクライニングソファとデスクのあるくつろぎスペース" },
    { src: "/images/rental/closet-1.jpg", alt: "ハンガーポール付きのクローゼット" },
    { src: "/images/rental/closet-2.jpg", alt: "棚付きクローゼット＋姿見" },
    { src: "/images/rental/kitchen.jpg", alt: "リノベーション済みのキッチン" },
    { src: "/images/rental/bathroom.jpg", alt: "リノベーション済みのバスルーム" },
    { src: "/images/rental/hallway.jpg", alt: "共用スペース・廊下" },
    { src: "/images/rental/garden-1.jpg", alt: "緑あふれる共用の庭" },
    { src: "/images/rental/garden-2.jpg", alt: "屋根付きのサンルーム・ラウンジ" },
    { src: "/images/rental/garden-3.jpg", alt: "ホットタブ付きのテラス" },
  ],
  videos: [
    { src: "/videos/rental/room-tour-1.mp4", label: "お部屋のツアー動画" },
    { src: "/videos/rental/room-tour-2.mp4", label: "室内の様子" },
    { src: "/videos/rental/garden-tour.mp4", label: "庭・テラス（スポーツ観戦・ジャグジー）" },
    { src: "/videos/rental/dog.mp4", label: "看板犬のいる暮らし🐶" },
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
      q: "どんな人が入居できますか？",
      a: "日本人の方であれば、学生・ワーホリ・社会人など、どなたでも歓迎です。現在は日本人の社会人が暮らしています。",
    },
    {
      q: "キッチンやお風呂は共用ですか？",
      a: "キッチン・バス・トイレは3名でシェアいただきます。現在は日本人の社会人が暮らしており、落ち着いた環境です。",
    },
    {
      q: "Wi-Fiや光熱費はどうなっていますか？",
      a: "Wi-Fi はご利用いただけます。洗濯・乾燥は無料、エアコン・暖房も完備しています。光熱費の詳しい扱いは内見時にご案内します。",
    },
    {
      q: "門限や生活のルールはありますか？",
      a: "門限はありません。落ち着いて快適に暮らせる環境です。細かな生活ルールは内見時にご説明します。",
    },
    {
      q: "デポジットはいくらですか？返ってきますか？",
      a: "デポジットは家賃1ヶ月分です。退去時に返金するのではなく、最終月の家賃として充当される仕組みなので、最後の月の家賃は不要です。",
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
