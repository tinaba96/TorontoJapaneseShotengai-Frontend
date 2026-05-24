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

// 枠内にバランスよく散らした座標プリセット。
// pin は -translate-y-full で y% を底辺基準にするため、y は 18-88、x は 12-88 で
// 余白を確保している。
const SCATTER: Position[] = [
  { x: 18, y: 22 },
  { x: 42, y: 18 },
  { x: 66, y: 26 },
  { x: 84, y: 40 },
  { x: 78, y: 62 },
  { x: 52, y: 72 },
  { x: 28, y: 60 },
  { x: 14, y: 80 },
  { x: 60, y: 48 },
  { x: 36, y: 42 },
];

type Seed = {
  name: string;
  description: string;
  rating?: number;
  hours?: string;
  phone?: string;
  website?: string;
  services?: string[];
};

function makeStores(prefix: string, seeds: Seed[]): Store[] {
  return seeds.map((s, i) => ({
    id: `${prefix}-${i + 1}`,
    name: s.name,
    description: s.description,
    position: SCATTER[i % SCATTER.length],
    storeInfo: {
      description: s.description,
      rating: s.rating ?? 4.3 + ((i * 7) % 6) / 10, // 4.3-4.8 でバラけさせる
      hours: s.hours ?? "月-金 10:00-20:00 / 土日 11:00-19:00",
      phone: s.phone ?? "+1 416 555 01" + String(10 + i).padStart(2, "0"),
      website: s.website,
      services: s.services,
    },
  }));
}

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
          stores: makeStores("restaurant", [
            {
              name: "Sakura Sushi",
              description: "厳選ネタの本格江戸前寿司",
              services: ["カウンター", "個室あり", "テイクアウト"],
            },
            {
              name: "Ramen Isshin",
              description: "豚骨白湯と自家製麺の名店",
              services: ["カウンター", "深夜営業"],
            },
            {
              name: "Donburi Bar",
              description: "ランチに人気の海鮮丼専門店",
              services: ["テイクアウト", "デリバリー"],
            },
            {
              name: "Yakiniku TJS",
              description: "上質な和牛を炭火で",
              services: ["個室", "宴会対応", "予約推奨"],
            },
            {
              name: "Izakaya Hana",
              description: "ふらりと寄れる日本酒居酒屋",
              services: ["深夜営業", "日本酒30種"],
            },
            {
              name: "Tempura Wabi",
              description: "目の前で揚げる本格天ぷら",
              services: ["カウンター", "コース"],
            },
            {
              name: "Soba Tsuki",
              description: "石臼挽き十割そば",
              services: ["テイクアウト", "ベジ対応"],
            },
            {
              name: "Okonomi House",
              description: "鉄板焼き＆お好み焼き",
              services: ["家族向け", "テイクアウト"],
            },
          ]),
        },
        {
          id: "cafe",
          name: "カフェ・喫茶店",
          description: "コーヒーや軽食を楽しめるお店",
          position: { x: 65, y: 25 },
          size: { width: 25, height: 20 },
          color: "bg-amber-200 border-amber-500",
          stores: makeStores("cafe", [
            {
              name: "Matcha House",
              description: "京都直送の抹茶スイーツ",
              services: ["Wi-Fi", "テイクアウト"],
            },
            {
              name: "Sakura Coffee",
              description: "自家焙煎スペシャルティ",
              services: ["Wi-Fi", "電源あり"],
            },
            {
              name: "Hana Bakery Café",
              description: "焼きたてパンとカフェラテ",
              services: ["朝食", "テイクアウト"],
            },
            {
              name: "Wabi Tea Room",
              description: "和茶と季節の和菓子",
              services: ["静かな空間", "予約可"],
            },
            {
              name: "Café Tsuki",
              description: "夜カフェ・本とジャズ",
              services: ["深夜営業", "Wi-Fi"],
            },
            {
              name: "Kissaten Shōwa",
              description: "ノスタルジック昭和喫茶",
              services: ["モーニング", "テイクアウト"],
            },
            {
              name: "Anko Sweets",
              description: "あんこ専門スイーツ店",
              services: ["持ち帰り", "ギフト"],
            },
          ]),
        },
        {
          id: "convenience",
          name: "コンビニ・食品店",
          description: "日用品や食品を扱うお店",
          position: { x: 25, y: 65 },
          size: { width: 25, height: 20 },
          color: "bg-cyan-200 border-cyan-500",
          stores: makeStores("convenience", [
            {
              name: "Konbini TJS",
              description: "おにぎり＆お弁当の品揃え豊富",
              services: ["24時間", "ATM"],
            },
            {
              name: "Tokyo Mart",
              description: "日本食材＆雑貨",
              services: ["輸入食材", "ギフト対応"],
            },
            {
              name: "Mini Mart Sakura",
              description: "深夜まで開いてる便利店",
              services: ["深夜営業", "宅配受取"],
            },
            {
              name: "Quick & Co.",
              description: "コーヒー＆ホットスナック",
              services: ["カウンター飲食", "Wi-Fi"],
            },
            {
              name: "Onigiri Stand",
              description: "握りたておにぎり専門",
              services: ["テイクアウト", "朝食"],
            },
            {
              name: "Bento Express",
              description: "和食弁当のテイクアウト",
              services: ["テイクアウト", "予約可"],
            },
          ]),
        },
        {
          id: "bakery",
          name: "パン屋・ベーカリー",
          description: "焼きたてパンの専門店",
          position: { x: 5, y: 30 },
          size: { width: 18, height: 18 },
          color: "bg-yellow-200 border-yellow-500",
          stores: makeStores("bakery", [
            {
              name: "Hana Pan",
              description: "メロンパンの人気店",
              services: ["朝6時開店", "ギフト"],
            },
            {
              name: "Sakura Bake",
              description: "和素材のおしゃれパン",
              services: ["カフェ併設", "Wi-Fi"],
            },
            {
              name: "Anko Bakery",
              description: "あんパンの本格派",
              services: ["持ち帰り"],
            },
            {
              name: "Mochi Pan",
              description: "もちもち食感の人気店",
              services: ["数量限定"],
            },
            {
              name: "Boulangerie Tsuki",
              description: "本格フランスパン＆クロワッサン",
              services: ["朝食メニュー"],
            },
          ]),
        },
        {
          id: "grocery",
          name: "食料品店・スーパー",
          description: "新鮮な食材を扱うお店",
          position: { x: 75, y: 65 },
          size: { width: 22, height: 20 },
          color: "bg-teal-200 border-teal-500",
          stores: makeStores("grocery", [
            {
              name: "Tokyo Grocery",
              description: "鮮魚・精肉・青果",
              services: ["デリバリー", "駐車場"],
            },
            {
              name: "Sakura Foods",
              description: "オーガニック日本食材",
              services: ["ベジ対応", "輸入食材"],
            },
            {
              name: "Wagyu Market",
              description: "厳選和牛＆精肉",
              services: ["ギフト対応", "予約可"],
            },
            {
              name: "Asian Pantry",
              description: "アジア食材のセレクトショップ",
              services: ["輸入調味料", "雑貨"],
            },
            {
              name: "Hokuto Fish",
              description: "新鮮な魚介の朝市スタイル",
              services: ["朝市", "テイクアウト"],
            },
            {
              name: "Green Yaoya",
              description: "ローカル野菜・果物",
              services: ["有機野菜", "デリバリー"],
            },
          ]),
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
          stores: makeStores("department", [
            {
              name: "TJS Plaza",
              description: "コミュニティ最大規模の総合モール",
              services: ["駐車場", "フードコート", "Wi-Fi"],
            },
            {
              name: "Hokuto Department",
              description: "和雑貨＆ファッションのデパート",
              services: ["免税対応", "ギフト包装"],
            },
            {
              name: "Sakura Mall",
              description: "若者向けセレクトモール",
              services: ["カフェ併設", "イベント"],
            },
            {
              name: "Wabi Annex",
              description: "和洋折衷のセレクト館",
              services: ["ギフト対応"],
            },
            {
              name: "Hana Outlet",
              description: "ブランドアウトレット",
              services: ["駐車場", "セール常時"],
            },
          ]),
        },
        {
          id: "bookstore",
          name: "書店・文具店",
          description: "本や文房具を扱うお店",
          position: { x: 70, y: 30 },
          size: { width: 25, height: 20 },
          color: "bg-indigo-200 border-indigo-500",
          stores: makeStores("bookstore", [
            {
              name: "Kinokuniya Lite",
              description: "和洋書＆雑誌の品揃え",
              services: ["カフェ併設", "取り寄せ可"],
            },
            {
              name: "Wabi Books",
              description: "アート＆建築の専門書店",
              services: ["ギャラリー併設"],
            },
            {
              name: "Hana Stationery",
              description: "日本製文房具と紙の専門店",
              services: ["ワークショップ"],
            },
            {
              name: "Tsuki Comics",
              description: "マンガ＆アニメ関連書籍",
              services: ["新刊予約"],
            },
            {
              name: "Café & Books Sakura",
              description: "本とコーヒー、ゆるい時間",
              services: ["Wi-Fi", "電源"],
            },
          ]),
        },
        {
          id: "clothing",
          name: "衣料品店",
          description: "ファッション・アパレル",
          position: { x: 25, y: 70 },
          size: { width: 30, height: 20 },
          color: "bg-fuchsia-200 border-fuchsia-500",
          stores: makeStores("clothing", [
            {
              name: "Yukata Studio",
              description: "浴衣＆和装レンタル＆販売",
              services: ["着付け", "レンタル"],
            },
            {
              name: "TJS Fashion",
              description: "メンズ＆レディースのセレクト",
              services: ["お直し", "ギフト包装"],
            },
            {
              name: "Sakura Boutique",
              description: "アクセサリー＆小物",
              services: ["ギフトラッピング"],
            },
            {
              name: "Mode Hana",
              description: "ハイブランドのセカンド",
              services: ["買取", "委託販売"],
            },
            {
              name: "Wabi Linen",
              description: "リネン＆コットンのナチュラル服",
              services: ["お直し"],
            },
            {
              name: "Hokuto Workwear",
              description: "上質な大人カジュアル",
              services: ["メンズ専門"],
            },
          ]),
        },
        {
          id: "electronics",
          name: "電化製品店",
          description: "家電・電子機器",
          position: { x: 70, y: 70 },
          size: { width: 25, height: 20 },
          color: "bg-sky-200 border-sky-500",
          stores: makeStores("electronics", [
            {
              name: "Tokyo Tech",
              description: "PC・スマホ・ガジェット",
              services: ["修理", "保証延長"],
            },
            {
              name: "Akihabara Lite",
              description: "オーディオ＆ホビー家電",
              services: ["試聴可", "下取り"],
            },
            {
              name: "Sakura Electronics",
              description: "白物家電の専門店",
              services: ["設置", "下取り"],
            },
            {
              name: "Wabi Audio",
              description: "ハイエンドオーディオ",
              services: ["試聴ルーム", "予約推奨"],
            },
            {
              name: "Hana Camera",
              description: "カメラ＆レンズの専門店",
              services: ["レンタル", "下取り"],
            },
          ]),
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
          stores: makeStores("bank", [
            {
              name: "TJS Trust Bank",
              description: "コミュニティバンク",
              services: ["ATM", "両替"],
            },
            {
              name: "Sakura Finance",
              description: "投資相談＆資産運用",
              services: ["相談予約", "個別相談室"],
            },
            {
              name: "Hokuto Credit Union",
              description: "ローカル信用組合",
              services: ["ATM", "貸付相談"],
            },
            {
              name: "Wabi Insurance",
              description: "ライフ＆損害保険",
              services: ["相談無料"],
            },
            {
              name: "Hana Exchange",
              description: "外貨両替＆送金",
              services: ["即日送金", "両替"],
            },
          ]),
        },
        {
          id: "workspace",
          name: "オフィス・コワーキング",
          description: "仕事場やオフィススペース",
          position: { x: 70, y: 30 },
          size: { width: 25, height: 20 },
          color: "bg-lime-200 border-lime-500",
          stores: makeStores("workspace", [
            {
              name: "TJS Hub",
              description: "コミュニティ系コワーキング",
              services: ["Wi-Fi", "ドリンクバー", "電源"],
            },
            {
              name: "Hana Coworking",
              description: "デザイナー御用達のスペース",
              services: ["会議室", "プリンター"],
            },
            {
              name: "Sakura Office",
              description: "個室レンタルオフィス",
              services: ["登記可", "24時間入退室"],
            },
            {
              name: "Wabi Studio",
              description: "クリエイター向けスタジオ",
              services: ["撮影機材", "防音"],
            },
            {
              name: "Hokuto Meeting",
              description: "ミーティングルーム特化",
              services: ["時間貸し", "予約制"],
            },
          ]),
        },
        {
          id: "beauty",
          name: "美容院・サロン",
          description: "ヘアサロンや美容関連",
          position: { x: 25, y: 70 },
          size: { width: 30, height: 20 },
          color: "bg-rose-200 border-rose-500",
          stores: makeStores("beauty", [
            {
              name: "Salon Sakura",
              description: "日本人スタイリストのヘアサロン",
              services: ["予約優先", "カラー", "縮毛矯正"],
            },
            {
              name: "Hair Hana",
              description: "メンズ＆レディース対応",
              services: ["予約優先", "シェービング"],
            },
            {
              name: "Spa Wabi",
              description: "リラクゼーション＆エステ",
              services: ["完全個室", "予約制"],
            },
            {
              name: "Nail Tsuki",
              description: "ジェルネイル専門",
              services: ["デザイン無制限", "予約制"],
            },
            {
              name: "Wagashi Nails",
              description: "和テイストネイル",
              services: ["和柄デザイン"],
            },
          ]),
        },
        {
          id: "other",
          name: "その他",
          description: "その他のサービス",
          position: { x: 70, y: 70 },
          size: { width: 25, height: 20 },
          color: "bg-stone-200 border-stone-500",
          stores: makeStores("other", [
            {
              name: "TJS Services",
              description: "翻訳＆生活サポート",
              services: ["日英対応", "予約制"],
            },
            {
              name: "Sakura Cleaners",
              description: "クリーニング＆リペア",
              services: ["集配", "シミ抜き"],
            },
            {
              name: "Hana Photo",
              description: "証明写真＆フォトスタジオ",
              services: ["撮影", "プリント"],
            },
            {
              name: "Wabi Repair",
              description: "靴＆鞄の修理",
              services: ["即日対応"],
            },
          ]),
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
          stores: makeStores("medical", [
            {
              name: "TJS Clinic",
              description: "日本語対応の内科・小児科",
              services: ["保険対応", "予約制"],
            },
            {
              name: "Sakura Dental",
              description: "日本語OKの歯科医院",
              services: ["小児歯科", "矯正"],
            },
            {
              name: "Hana Wellness",
              description: "予防医療＆健康相談",
              services: ["健康診断", "予約制"],
            },
            {
              name: "Hokuto Eye Clinic",
              description: "眼科＆コンタクト処方",
              services: ["コンタクト処方"],
            },
            {
              name: "Wabi Therapy",
              description: "整体・鍼灸治療",
              services: ["完全個室", "予約制"],
            },
          ]),
        },
        {
          id: "government",
          name: "公共機関",
          description: "図書館、市役所など",
          position: { x: 70, y: 25 },
          size: { width: 25, height: 20 },
          color: "bg-blue-100 border-blue-400",
          stores: makeStores("government", [
            {
              name: "TJS Community Centre",
              description: "コミュニティ交流の拠点",
              services: ["ホール貸出", "Wi-Fi"],
            },
            {
              name: "Sakura Library",
              description: "和書＆英書の図書館",
              services: ["和書", "学習スペース"],
            },
            {
              name: "Hana Hall",
              description: "イベント＆催事ホール",
              services: ["貸出予約", "音響設備"],
            },
            {
              name: "City Information",
              description: "観光＆生活情報案内",
              services: ["多言語対応"],
            },
          ]),
        },
        {
          id: "recreation",
          name: "公園・レクリエーション",
          description: "公園や娯楽施設",
          position: { x: 25, y: 70 },
          size: { width: 25, height: 20 },
          color: "bg-green-100 border-green-400",
          stores: makeStores("recreation", [
            {
              name: "Sakura Park",
              description: "桜の名所・芝生広場",
              services: ["駐車場", "ピクニック可"],
            },
            {
              name: "TJS Gym",
              description: "24時間トレーニングジム",
              services: ["24時間", "シャワー"],
            },
            {
              name: "Hana Studio",
              description: "ヨガ＆ピラティススタジオ",
              services: ["体験レッスン", "予約制"],
            },
            {
              name: "Wabi Garden",
              description: "和風日本庭園",
              services: ["散策", "茶室"],
            },
            {
              name: "Hokuto Onsen",
              description: "コミュニティ温泉",
              services: ["タオル付き", "深夜営業"],
            },
          ]),
        },
        {
          id: "pharmacy",
          name: "薬局・ドラッグストア",
          description: "薬局や日用品のお店",
          position: { x: 70, y: 70 },
          size: { width: 25, height: 20 },
          color: "bg-violet-200 border-violet-500",
          stores: makeStores("pharmacy", [
            {
              name: "Wabi Pharmacy",
              description: "処方箋＆OTC医薬品",
              services: ["処方箋対応", "宅配"],
            },
            {
              name: "Sakura Drug",
              description: "日用品＆化粧品",
              services: ["ポイントカード"],
            },
            {
              name: "Hana Health Mart",
              description: "サプリ＆健康食品",
              services: ["相談員常駐"],
            },
            {
              name: "Tsuki Pharmacy",
              description: "夜間営業の薬局",
              services: ["深夜営業"],
            },
            {
              name: "Hokuto Beauty Drug",
              description: "コスメ＆スキンケア",
              services: ["ポイント還元"],
            },
          ]),
        },
      ],
    },
  ],
};
