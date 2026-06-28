/**
 * アフィリエイト / 紹介リンクの集約管理
 *
 * ★ ここの url を自分の紹介リンクに差し替えるだけで、全記事に反映されます。
 *   url が空文字 "" のサービスは表示されません（リンク取得後に貼ればOK）。
 */

export interface AffiliateService {
  key: string;
  name: string;
  tagline: string; // 一言説明
  note?: string; // 補足タグ（用途）
  url: string; // 紹介/アフィリリンク（空なら非表示）
  cta: string; // ボタン文言
}

export const affiliateServices: Record<string, AffiliateService> = {
  wise: {
    key: "wise",
    name: "Wise（ワイズ）",
    tagline: "日本⇄カナダの送金を、銀行より安く・速く。多通貨口座も無料。",
    note: "海外送金・両替",
    // 個人招待リンク（取り急ぎ）。公開サイト向けは将来パートナー/アフィリリンクに差し替え推奨。
    url: "https://wise.com/invite/dic/takahiroi45",
    cta: "Wiseを見る",
  },
  airalo: {
    key: "airalo",
    name: "Airalo（eSIM）",
    tagline: "到着前に設定すれば、空港に着いた瞬間からネットが使える。",
    note: "eSIM・通信",
    url: "", // ← Airaloアフィリリンク取得後に貼る
    cta: "eSIMを見る",
  },
  insurance: {
    key: "insurance",
    name: "海外保険（SafetyWing 等）",
    tagline: "ワーホリ(IEC)は保険が必須。到着前から入れる旅行/医療保険。",
    note: "医療・保険",
    url: "", // ← 保険アフィリリンク取得後に貼る
    cta: "保険を見る",
  },
};

/**
 * 記事(slug)ごとに出すサービス。記事内容に合うものだけ。
 */
export const articleServices: Record<string, string[]> = {
  "first-week-toronto": ["wise", "airalo"],
  "open-bank-account": ["wise"],
  "sim-esim": ["airalo"],
  "healthcare-insurance": ["insurance"],
};

/** 記事で表示すべき「url設定済み」サービスを返す */
export function getServicesForArticle(slug: string): AffiliateService[] {
  const keys = articleServices[slug] || [];
  return keys
    .map((k) => affiliateServices[k])
    .filter((s): s is AffiliateService => !!s && s.url.trim() !== "");
}
