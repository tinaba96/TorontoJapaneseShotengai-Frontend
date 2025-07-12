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

// ★ ジャンル別店舗データ（位置を調整してオーバーラップを防止） ★
export const genreData: GenreData = {
  mainGenres: [
    {
      id: "food",
      name: "飲食・グルメ",
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
          stores: [
            {
              id: "restaurant-1",
              name: "イタリアンレストラン ベラヴィスタ",
              description: "本格イタリアン料理",
              position: { x: 70, y: 30 },
              storeInfo: {
                phone: "03-2345-6789",
                hours: "11:30-14:30, 17:30-22:00",
                website: "https://bellavista.jp",
                rating: 4.8,
                description:
                  "シェフが厳選した食材を使用した本格イタリアン。特製パスタとピザが自慢です。",
                services: [
                  "テラス席",
                  "ワインセラー",
                  "貸切可能",
                  "デリバリー",
                ],
              },
            },
            {
              id: "restaurant-2",
              name: "和食処 さくら",
              description: "伝統的な日本料理",
              position: { x: 40, y: 60 },
              storeInfo: {
                phone: "03-3456-7891",
                hours: "17:00-23:00",
                website: "https://sakura-washoku.jp",
                rating: 4.6,
                description:
                  "季節の食材を活かした伝統的な日本料理をご提供します。",
                services: ["個室あり", "宴会対応", "お祝い料理", "懐石コース"],
              },
            },
          ],
        },
        {
          id: "cafe",
          name: "カフェ・喫茶店",
          description: "コーヒーや軽食を楽しめるお店",
          position: { x: 65, y: 25 },
          size: { width: 25, height: 20 },
          color: "bg-amber-200 border-amber-500",
          stores: [
            {
              id: "cafe-1",
              name: "カフェ・ド・パリ",
              description: "フランス風カフェ",
              position: { x: 55, y: 65 },
              storeInfo: {
                phone: "03-4567-8901",
                hours: "8:00-20:00",
                website: "https://cafe-de-paris.jp",
                rating: 4.6,
                description:
                  "パリの街角にあるような雰囲気のカフェ。自家焙煎コーヒーと手作りスイーツが人気。",
                services: [
                  "WiFi完備",
                  "電源席",
                  "テイクアウト",
                  "ケータリング",
                ],
              },
            },
            {
              id: "cafe-2",
              name: "スターバックス 中央店",
              description: "人気のコーヒーチェーン",
              position: { x: 80, y: 40 },
              storeInfo: {
                phone: "03-5678-9012",
                hours: "6:30-22:00",
                website: "https://starbucks.co.jp",
                rating: 4.3,
                description:
                  "世界的に有名なコーヒーチェーン。豊富なドリンクメニューが自慢。",
                services: [
                  "WiFi完備",
                  "モバイルオーダー",
                  "ギフトカード",
                  "テイクアウト",
                ],
              },
            },
          ],
        },
        {
          id: "convenience",
          name: "コンビニ・食品店",
          description: "日用品や食品を扱うお店",
          position: { x: 25, y: 65 },
          size: { width: 25, height: 20 },
          color: "bg-cyan-200 border-cyan-500",
          stores: [
            {
              id: "convenience-1",
              name: "ファミリーマート 中央店",
              description: "24時間営業のコンビニ",
              position: { x: 25, y: 60 },
              storeInfo: {
                phone: "03-3456-7890",
                hours: "24時間営業",
                rating: 4.2,
                description:
                  "日用品から食品まで何でも揃う便利なコンビニエンスストア。",
                services: ["ATM", "コピー機", "宅配便", "チケット販売"],
              },
            },
            {
              id: "convenience-2",
              name: "セブンイレブン 駅前店",
              description: "駅前の便利なコンビニ",
              position: { x: 15, y: 80 },
              storeInfo: {
                phone: "03-4567-8902",
                hours: "24時間営業",
                rating: 4.4,
                description:
                  "駅前立地で通勤・通学に便利。お弁当やスイーツが充実。",
                services: ["ATM", "宅配便", "チケット販売", "コピー・FAX"],
              },
            },
          ],
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
          stores: [
            {
              id: "department-1",
              name: "グランドデパート",
              description: "大型百貨店",
              position: { x: 30, y: 25 },
              storeInfo: {
                phone: "03-1234-5678",
                hours: "10:00-20:00",
                website: "https://grand-dept.com",
                rating: 4.5,
                description:
                  "地域最大級の百貨店。ファッション、グルメ、雑貨まで幅広く取り扱っています。",
                services: [
                  "駐車場完備",
                  "配送サービス",
                  "ギフト包装",
                  "免税対応",
                ],
              },
            },
          ],
        },
        {
          id: "bookstore",
          name: "書店・文具店",
          description: "本や文房具を扱うお店",
          position: { x: 70, y: 30 },
          size: { width: 25, height: 20 },
          color: "bg-indigo-200 border-indigo-500",
          stores: [
            {
              id: "bookstore-1",
              name: "ブックストア 知恵の森",
              description: "大型書店",
              position: { x: 80, y: 60 },
              storeInfo: {
                phone: "03-5678-9012",
                hours: "9:00-22:00",
                website: "https://chienomori.com",
                rating: 4.4,
                description:
                  "豊富な品揃えの書店。専門書からベストセラーまで幅広く取り扱い。",
                services: [
                  "カフェ併設",
                  "イベントスペース",
                  "取り寄せサービス",
                  "読書スペース",
                ],
              },
            },
            {
              id: "bookstore-2",
              name: "TSUTAYA 中央店",
              description: "本・DVD・CDの複合店",
              position: { x: 60, y: 80 },
              storeInfo: {
                phone: "03-6789-0123",
                hours: "10:00-23:00",
                website: "https://tsutaya.co.jp",
                rating: 4.2,
                description: "本だけでなく、DVD・CDも豊富に取り揃えています。",
                services: [
                  "レンタル",
                  "買取サービス",
                  "Tポイント",
                  "予約サービス",
                ],
              },
            },
          ],
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
          stores: [
            {
              id: "bank-1",
              name: "みずほ銀行 中央支店",
              description: "メガバンクの支店",
              position: { x: 30, y: 70 },
              storeInfo: {
                phone: "03-6789-0123",
                hours: "9:00-15:00 (平日のみ)",
                website: "https://mizuho-bank.co.jp",
                rating: 4.0,
                description:
                  "各種銀行サービスを提供。法人・個人問わずご利用いただけます。",
                services: ["ATM", "外貨両替", "住宅ローン相談", "投資信託"],
              },
            },
          ],
        },
        {
          id: "workspace",
          name: "オフィス・コワーキング",
          description: "仕事場やオフィススペース",
          position: { x: 70, y: 30 },
          size: { width: 25, height: 20 },
          color: "bg-lime-200 border-lime-500",
          stores: [
            {
              id: "workspace-1",
              name: "コワーキングスペース HUB",
              description: "フリーランサー向けオフィス",
              position: { x: 70, y: 70 },
              storeInfo: {
                phone: "03-7890-1234",
                hours: "7:00-23:00",
                website: "https://coworking-hub.jp",
                rating: 4.7,
                description:
                  "快適な作業環境を提供するコワーキングスペース。会議室やイベントスペースも完備。",
                services: ["高速WiFi", "会議室", "プリンター", "ドリンクバー"],
              },
            },
          ],
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
          stores: [
            {
              id: "medical-1",
              name: "中央総合病院",
              description: "24時間対応の大病院",
              position: { x: 30, y: 30 },
              storeInfo: {
                phone: "03-8901-2345",
                hours: "24時間 (救急外来)",
                website: "https://central-hospital.jp",
                rating: 4.3,
                description:
                  "地域の中核病院として、高度な医療サービスを提供しています。",
                services: ["救急外来", "人間ドック", "専門外来", "駐車場完備"],
              },
            },
          ],
        },
        {
          id: "government",
          name: "公共機関",
          description: "図書館、市役所など",
          position: { x: 70, y: 25 },
          size: { width: 25, height: 20 },
          color: "bg-blue-100 border-blue-400",
          stores: [
            {
              id: "government-1",
              name: "市立中央図書館",
              description: "静かな学習環境",
              position: { x: 70, y: 30 },
              storeInfo: {
                phone: "03-9012-3456",
                hours: "9:00-20:00 (月-金), 9:00-17:00 (土日)",
                website: "https://city-library.jp",
                rating: 4.5,
                description:
                  "豊富な蔵書と快適な学習スペースを提供する市立図書館。",
                services: ["学習室", "PC利用", "DVD貸出", "イベント開催"],
              },
            },
            {
              id: "government-2",
              name: "市役所",
              description: "各種手続きができる",
              position: { x: 30, y: 70 },
              storeInfo: {
                phone: "03-0123-4567",
                hours: "8:30-17:15 (平日のみ)",
                website: "https://city.example.jp",
                rating: 3.8,
                description: "住民票発行、税金関連、各種申請手続きを行えます。",
                services: ["住民票発行", "税務相談", "各種申請", "市民相談"],
              },
            },
          ],
        },
        {
          id: "recreation",
          name: "公園・レクリエーション",
          description: "公園や娯楽施設",
          position: { x: 25, y: 70 },
          size: { width: 25, height: 20 },
          color: "bg-green-100 border-green-400",
          stores: [
            {
              id: "recreation-1",
              name: "中央公園",
              description: "緑豊かな憩いの場",
              position: { x: 70, y: 70 },
              storeInfo: {
                hours: "24時間開放",
                rating: 4.6,
                description:
                  "四季折々の自然を楽しめる都市公園。ジョギングコースや遊具も完備。",
                services: ["遊具", "ジョギングコース", "ベンチ", "トイレ"],
              },
            },
          ],
        },
      ],
    },
  ],
};
