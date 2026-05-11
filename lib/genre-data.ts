export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface StoreInfo {
  phone?: string;
  hours?: string;
  website?: string;
  rating?: number;
  description?: string;
  image?: string;
  services?: string[];
}

export interface Store {
  id: string;
  name: string;
  description: string;
  position: Position; // マップ上での実際の位置
  storeInfo: StoreInfo;
}

export interface SubGenre {
  id: string;
  name: string;
  description: string;
  position: Position; // ジャンルマップ上での表示位置
  size: Size;
  color: string;
  stores: Store[];
}

export interface MainGenre {
  id: string;
  name: string;
  description: string;
  position: Position;
  size: Size;
  color: string;
  subGenres: SubGenre[];
}

export interface GenreData {
  mainGenres: MainGenre[];
}

// ジャンル階層の定義のみ。実際の店舗データは DB から取得して merge する。
export const genreData: GenreData = {
  mainGenres: [
    {
      id: "food",
      name: "飲食・グルメ/お店",
      description: "レストラン、カフェ、食品店",
      position: { x: 20, y: 20 },
      size: { width: 30, height: 25 },
      color: "bg-orange-200 border-orange-500",
      subGenres: [
        {
          id: "restaurant",
          name: "レストラン",
          description: "本格的な食事を楽しめるお店",
          position: { x: 25, y: 25 },
          size: { width: 30, height: 20 },
          color: "bg-red-200 border-red-500",
          stores: [],
        },
        {
          id: "cafe",
          name: "カフェ・喫茶店",
          description: "コーヒーや軽食を楽しめるお店",
          position: { x: 65, y: 25 },
          size: { width: 25, height: 20 },
          color: "bg-amber-200 border-amber-500",
          stores: [],
        },
        {
          id: "convenience",
          name: "コンビニ・食品店",
          description: "日用品や食品を扱うお店",
          position: { x: 25, y: 65 },
          size: { width: 25, height: 20 },
          color: "bg-cyan-200 border-cyan-500",
          stores: [],
        },
        {
          id: "bakery",
          name: "パン屋・ベーカリー",
          description: "焼きたてパンの専門店",
          position: { x: 5, y: 30 },
          size: { width: 18, height: 18 },
          color: "bg-yellow-200 border-yellow-500",
          stores: [],
        },
        {
          id: "grocery",
          name: "食料品店・スーパー",
          description: "新鮮な食材を扱うお店",
          position: { x: 75, y: 65 },
          size: { width: 22, height: 20 },
          color: "bg-teal-200 border-teal-500",
          stores: [],
        },
      ],
    },
    {
      id: "shopping",
      name: "ショッピング",
      description: "百貨店、書店、雑貨店",
      position: { x: 80, y: 20 },
      size: { width: 30, height: 25 },
      color: "bg-purple-200 border-purple-500",
      subGenres: [
        {
          id: "department",
          name: "百貨店・デパート",
          description: "大型商業施設",
          position: { x: 25, y: 30 },
          size: { width: 30, height: 20 },
          color: "bg-pink-200 border-pink-500",
          stores: [],
        },
        {
          id: "bookstore",
          name: "書店・文具店",
          description: "本や文房具を扱うお店",
          position: { x: 70, y: 30 },
          size: { width: 25, height: 20 },
          color: "bg-indigo-200 border-indigo-500",
          stores: [],
        },
        {
          id: "clothing",
          name: "衣料品店",
          description: "ファッション・アパレル",
          position: { x: 25, y: 70 },
          size: { width: 30, height: 20 },
          color: "bg-fuchsia-200 border-fuchsia-500",
          stores: [],
        },
        {
          id: "electronics",
          name: "電化製品店",
          description: "家電・電子機器",
          position: { x: 70, y: 70 },
          size: { width: 25, height: 20 },
          color: "bg-sky-200 border-sky-500",
          stores: [],
        },
      ],
    },
    {
      id: "service",
      name: "サービス・金融",
      description: "銀行、オフィス、各種サービス",
      position: { x: 20, y: 80 },
      size: { width: 30, height: 25 },
      color: "bg-gray-200 border-gray-500",
      subGenres: [
        {
          id: "bank",
          name: "銀行・金融",
          description: "銀行や金融機関",
          position: { x: 25, y: 30 },
          size: { width: 30, height: 20 },
          color: "bg-emerald-200 border-emerald-500",
          stores: [],
        },
        {
          id: "workspace",
          name: "オフィス・コワーキング",
          description: "仕事場やオフィススペース",
          position: { x: 70, y: 30 },
          size: { width: 25, height: 20 },
          color: "bg-lime-200 border-lime-500",
          stores: [],
        },
        {
          id: "beauty",
          name: "美容院・サロン",
          description: "ヘアサロンや美容関連",
          position: { x: 25, y: 70 },
          size: { width: 30, height: 20 },
          color: "bg-rose-200 border-rose-500",
          stores: [],
        },
        {
          id: "other",
          name: "その他",
          description: "その他のサービス",
          position: { x: 70, y: 70 },
          size: { width: 25, height: 20 },
          color: "bg-stone-200 border-stone-500",
          stores: [],
        },
      ],
    },
    {
      id: "public",
      name: "公共施設・医療",
      description: "病院、図書館、市役所など",
      position: { x: 80, y: 80 },
      size: { width: 30, height: 25 },
      color: "bg-green-200 border-green-500",
      subGenres: [
        {
          id: "medical",
          name: "病院・医療",
          description: "病院や医療機関",
          position: { x: 25, y: 25 },
          size: { width: 30, height: 20 },
          color: "bg-red-100 border-red-400",
          stores: [],
        },
        {
          id: "government",
          name: "公共機関",
          description: "図書館、市役所など",
          position: { x: 70, y: 25 },
          size: { width: 25, height: 20 },
          color: "bg-blue-100 border-blue-400",
          stores: [],
        },
        {
          id: "recreation",
          name: "公園・レクリエーション",
          description: "公園や娯楽施設",
          position: { x: 25, y: 70 },
          size: { width: 25, height: 20 },
          color: "bg-green-100 border-green-400",
          stores: [],
        },
        {
          id: "pharmacy",
          name: "薬局・ドラッグストア",
          description: "薬局や日用品のお店",
          position: { x: 70, y: 70 },
          size: { width: 25, height: 20 },
          color: "bg-violet-200 border-violet-500",
          stores: [],
        },
      ],
    },
  ],
};
