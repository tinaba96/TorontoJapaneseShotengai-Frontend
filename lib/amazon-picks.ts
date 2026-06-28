/**
 * Amazon アソシエイト「到着グッズ」キュレーション
 *
 * ★ タグは AMAZON_TAG 一箇所で管理。
 *   各アイテムは既定で「Amazon.ca 検索リンク（タグ付き）」が入り、今すぐ報酬対象になります。
 *   より成約率を上げたい場合は productUrl に SiteStripe の個別商品リンクを入れてください
 *   （productUrl があればそちらを優先）。
 */

export const AMAZON_TAG = "torontoshoten-20";

export type PickCategory = "電源" | "通信" | "収納" | "キッチン" | "防寒" | "生活";

export interface ArrivalItem {
  id: string;
  name: string;
  category: PickCategory;
  description: string;
  /** Amazon.ca 検索クエリ（既定リンクに使用） */
  query: string;
  /** SiteStripe の個別商品リンク（あれば優先） */
  productUrl?: string;
}

/** Amazon.ca 検索リンク（タグ付き）を生成 */
export function amazonSearch(query: string): string {
  return `https://www.amazon.ca/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`;
}

/** アイテムの実リンク（個別商品があればそれ、なければ検索リンク） */
export function itemUrl(item: ArrivalItem): string {
  const direct = (item.productUrl || "").trim();
  return direct !== "" ? direct : amazonSearch(item.query);
}

/** この記事(slug)でだけ「到着グッズ」を表示する */
export const ARRIVAL_ESSENTIALS_SLUG = "first-week-toronto";

export const arrivalEssentials: ArrivalItem[] = [
  {
    id: "power-bar",
    name: "USB付き電源タップ（北米プラグ）",
    category: "電源",
    description:
      "カナダは120V・Type A/B。日本の機器もそのまま挿せますが、コンセントの口数が足りなくなりがち。USBポート付きのタップが1つあると、到着初日からスマホ・PCの充電が一気に楽になります。",
    query: "power bar with usb outlets",
  },
  {
    id: "usb-c-charger",
    name: "USB-C 急速充電器（PD対応）",
    category: "電源",
    description:
      "スマホとノートPCをまとめて急速充電。「100–240V」対応の製品なら、日本で買ったものもカナダでそのまま使えます（電圧変換器は不要）。",
    query: "usb c charger pd 65w",
  },
  {
    id: "sim-pin",
    name: "SIM取り出しピン",
    category: "通信",
    description:
      "eSIMの設定や物理SIMの入れ替えで地味に必要。クリップでも代用できますが、いざという時に見つからないもの。1つ持っておくと安心です。",
    query: "sim card ejector pin tool",
  },
  {
    id: "compression-bags",
    name: "衣類圧縮袋セット",
    category: "収納",
    description:
      "半地下やシェアルームは収納が限られがち。冬物やふとんをコンパクトに収納でき、スーツケースの整理や引っ越しにも便利です。",
    query: "vacuum compression storage bags",
  },
  {
    id: "electric-kettle",
    name: "電気ケトル",
    category: "キッチン",
    description:
      "シェアキッチンでもすぐお湯が沸かせて、お茶・コーヒー・カップ麺に。到着初日から活躍する定番アイテムです。",
    query: "electric kettle",
  },
  {
    id: "winter-set",
    name: "防寒インナー・手袋・ニット帽",
    category: "防寒",
    description:
      "トロントの冬は−20℃級になることも。冬に到着するなら初日から必須です。現地でも買えますが、移動中に凍えないよう1セット持っておくと安心。",
    query: "thermal base layer gloves beanie set",
  },
];

export function getArrivalEssentials(slug: string): ArrivalItem[] {
  if (slug !== ARRIVAL_ESSENTIALS_SLUG) return [];
  return arrivalEssentials;
}
