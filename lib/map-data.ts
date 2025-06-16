export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface StoreInfo {
  description?: string;
  rating?: number;
  hours?: string;
  phone?: string;
  website?: string;
  address?: string;
  services?: string[];
  type?: string; // 追加
}

export interface SubArea {
  id: string;
  name: string;
  description: string;
  position: Position;
  size: Size;
  color: string;
  storeInfo?: StoreInfo;
  type?: string; // 追加
}

export interface MapArea {
  id: string;
  name: string;
  description: string;
  position: Position;
  size: Size;
  color: string;
  subAreas: SubArea[];
  type?: string; // 追加
}

export interface MapData {
  areas: MapArea[];
}

export const mapData: MapData = {
  areas: [
    {
      id: "residential",
      name: "住宅街",
      description: "アパートや住宅が立ち並ぶエリア",
      position: { x: 25, y: 25 },
      size: { width: 35, height: 30 },
      color: "bg-blue-200 border-blue-500",
      type: "residential", // 追加
      subAreas: [
        {
          id: "residential-1",
          name: "高層マンション",
          description: "15階建てのタワーマンション",
          position: { x: 20, y: 30 },
          size: { width: 25, height: 20 },
          color: "bg-slate-200 border-slate-500",
          type: "mansion", // 追加
          storeInfo: {
            description: "眺めの良い高層マンション。24時間管理人常駐。",
            rating: 4.5,
            hours: "24時間",
            phone: "03-1234-5678",
            website: "https://tower-mansion.example.com",
            address: "東京都新宿区1-1-1",
            type: "apartment", // 追加
          },
        },
        {
          id: "residential-2",
          name: "戸建て住宅A",
          description: "緑豊かな住宅地",
          position: { x: 60, y: 25 },
          size: { width: 20, height: 15 },
          color: "bg-green-200 border-green-500",
          type: "house", // 追加
          storeInfo: {
            description: "静かな環境でファミリーに最適。",
            rating: 4.2,
            hours: "常時見学可",
            phone: "03-2345-6789",
            address: "東京都新宿区2-2-2",
            type: "house", // 追加
          },
        },
        {
          id: "residential-3",
          name: "戸建て住宅B",
          description: "ファミリー向け住宅",
          position: { x: 80, y: 45 },
          size: { width: 18, height: 15 },
          color: "bg-blue-200 border-blue-500",
          type: "house", // 追加
          storeInfo: {
            description: "広い庭付きの住宅。",
            rating: 4.0,
            hours: "常時見学可",
            phone: "03-3456-7890",
            address: "東京都新宿区3-3-3",
            type: "house", // 追加
          },
        },
        {
          id: "residential-4",
          name: "学生寮",
          description: "大学生向けの寮",
          position: { x: 25, y: 65 },
          size: { width: 22, height: 18 },
          color: "bg-yellow-200 border-yellow-500",
          type: "dormitory", // 追加
          storeInfo: {
            description: "リーズナブルな学生寮。Wi-Fi完備。",
            rating: 4.3,
            hours: "24時間",
            phone: "03-4567-8901",
            website: "https://student-dorm.example.com",
            address: "東京都新宿区4-4-4",
            type: "dormitory", // 追加
          },
        },
        {
          id: "residential-5",
          name: "アパート",
          description: "3階建てのアパート",
          position: { x: 65, y: 70 },
          size: { width: 20, height: 16 },
          color: "bg-pink-200 border-pink-500",
          type: "apartment", // 追加
          storeInfo: {
            description: "駅近の便利なアパート。",
            rating: 4.1,
            hours: "常時見学可",
            phone: "03-5678-9012",
            address: "東京都新宿区5-5-5",
            type: "apartment", // 追加
          },
        },
      ],
    },
    {
      id: "commercial",
      name: "商業地区",
      description: "ショップやレストランが集まるエリア",
      position: { x: 75, y: 25 },
      size: { width: 35, height: 30 },
      color: "bg-red-200 border-red-500",
      type: "commercial", // 追加
      subAreas: [
        {
          id: "commercial-1",
          name: "デパート",
          description: "大型百貨店",
          position: { x: 30, y: 25 },
          size: { width: 30, height: 20 },
          color: "bg-purple-200 border-purple-500",
          type: "department_store", // 追加
          storeInfo: {
            description: "ファッション・雑貨・食品など幅広く揃うデパート。",
            rating: 4.6,
            hours: "10:00-20:00",
            phone: "03-6789-0123",
            website: "https://department-store.example.com",
            address: "東京都新宿区6-6-6",
            type: "department_store", // 追加
          },
        },
        {
          id: "commercial-2",
          name: "レストラン",
          description: "イタリアンレストラン",
          position: { x: 70, y: 30 },
          size: { width: 18, height: 15 },
          color: "bg-orange-200 border-orange-500",
          type: "restaurant", // 追加
          storeInfo: {
            description: "本格イタリアンを楽しめるレストラン。",
            rating: 4.7,
            hours: "11:00-22:00",
            phone: "03-7890-1234",
            website: "https://italian-restaurant.example.com",
            address: "東京都新宿区7-7-7",
            type: "restaurant", // 追加
          },
        },
        {
          id: "commercial-3",
          name: "コンビニ",
          description: "24時間営業",
          position: { x: 25, y: 60 },
          size: { width: 15, height: 12 },
          color: "bg-cyan-200 border-cyan-500",
          type: "convenience_store", // 追加
          storeInfo: {
            description: "便利な24時間営業のコンビニ。",
            rating: 4.0,
            hours: "24時間",
            phone: "03-8901-2345",
            address: "東京都新宿区8-8-8",
            type: "convenience_store", // 追加
          },
        },
        {
          id: "commercial-4",
          name: "カフェ",
          description: "おしゃれなカフェ",
          position: { x: 55, y: 65 },
          size: { width: 16, height: 14 },
          color: "bg-amber-200 border-amber-500",
          type: "cafe", // 追加
          storeInfo: {
            description: "落ち着いた雰囲気のカフェ。Wi-Fiあり。",
            rating: 4.4,
            hours: "8:00-21:00",
            phone: "03-9012-3456",
            website: "https://cafe.example.com",
            address: "東京都新宿区9-9-9",
            type: "cafe", // 追加
          },
        },
        {
          id: "commercial-5",
          name: "書店",
          description: "大型書店",
          position: { x: 80, y: 60 },
          size: { width: 18, height: 16 },
          color: "bg-indigo-200 border-indigo-500",
          type: "bookstore", // 追加
          storeInfo: {
            description: "豊富な品揃えの書店。",
            rating: 4.5,
            hours: "9:00-21:00",
            phone: "03-0123-4567",
            website: "https://bookstore.example.com",
            address: "東京都新宿区10-10-10",
            type: "bookstore", // 追加
          },
        },
      ],
    },
    {
      id: "business",
      name: "ビジネス地区",
      description: "オフィスビルが立ち並ぶエリア",
      position: { x: 25, y: 75 },
      size: { width: 35, height: 30 },
      color: "bg-gray-200 border-gray-500",
      type: "business", // 追加
      subAreas: [
        {
          id: "business-1",
          name: "高層オフィスビル",
          description: "大企業の本社ビル",
          position: { x: 30, y: 30 },
          size: { width: 35, height: 25 },
          color: "bg-indigo-200 border-indigo-500",
          type: "office_building", // 追加
          storeInfo: {
            description: "最新設備の高層オフィス。",
            rating: 4.3,
            hours: "8:00-20:00",
            phone: "03-2345-6789",
            address: "東京都新宿区11-11-11",
            type: "office", // 追加
          },
        },
        {
          id: "business-2",
          name: "IT企業ビル",
          description: "テック系企業が集まる",
          position: { x: 70, y: 30 },
          size: { width: 25, height: 25 },
          color: "bg-teal-200 border-teal-500",
          type: "it_building", // 追加
          storeInfo: {
            description: "IT企業が多数入居。",
            rating: 4.2,
            hours: "9:00-19:00",
            phone: "03-3456-7890",
            address: "東京都新宿区12-12-12",
            type: "it_office", // 追加
          },
        },
        {
          id: "business-3",
          name: "銀行街",
          description: "金融機関が集中",
          position: { x: 30, y: 70 },
          size: { width: 25, height: 25 },
          color: "bg-emerald-200 border-emerald-500",
          type: "bank_district", // 追加
          storeInfo: {
            description: "主要銀行が集まるエリア。",
            rating: 4.1,
            hours: "9:00-15:00",
            phone: "03-4567-8901",
            address: "東京都新宿区13-13-13",
            type: "bank", // 追加
          },
        },
        {
          id: "business-4",
          name: "コワーキングスペース",
          description: "フリーランサー向け",
          position: { x: 70, y: 70 },
          size: { width: 25, height: 25 },
          color: "bg-lime-200 border-lime-500",
          type: "coworking", // 追加
          storeInfo: {
            description: "快適なコワーキングスペース。",
            rating: 4.6,
            hours: "7:00-23:00",
            phone: "03-5678-9012",
            website: "https://coworking.example.com",
            address: "東京都新宿区14-14-14",
            type: "coworking", // 追加
          },
        },
      ],
    },
    {
      id: "public",
      name: "公共施設",
      description: "病院や学校などの公共施設",
      position: { x: 75, y: 75 },
      size: { width: 35, height: 30 },
      color: "bg-green-200 border-green-500",
      type: "public", // 追加
      subAreas: [
        {
          id: "public-1",
          name: "総合病院",
          description: "24時間対応の大病院",
          position: { x: 30, y: 30 },
          size: { width: 35, height: 25 },
          color: "bg-red-100 border-red-400",
          type: "hospital", // 追加
          storeInfo: {
            description: "救急対応可能な総合病院。",
            rating: 4.7,
            hours: "24時間",
            phone: "03-6789-0123",
            website: "https://hospital.example.com",
            address: "東京都新宿区15-15-15",
            type: "hospital", // 追加
          },
        },
        {
          id: "public-2",
          name: "市立図書館",
          description: "静かな学習環境",
          position: { x: 70, y: 30 },
          size: { width: 25, height: 25 },
          color: "bg-blue-100 border-blue-400",
          type: "library", // 追加
          storeInfo: {
            description: "蔵書数豊富な図書館。",
            rating: 4.5,
            hours: "9:00-21:00",
            phone: "03-7890-1234",
            website: "https://library.example.com",
            address: "東京都新宿区16-16-16",
            type: "library", // 追加
          },
        },
        {
          id: "public-3",
          name: "市役所",
          description: "各種手続きができる",
          position: { x: 30, y: 70 },
          size: { width: 25, height: 25 },
          color: "bg-yellow-100 border-yellow-400",
          type: "city_hall", // 追加
          storeInfo: {
            description: "市民サービスを提供。",
            rating: 4.0,
            hours: "8:30-17:00",
            phone: "03-8901-2345",
            website: "https://cityhall.example.com",
            address: "東京都新宿区17-17-17",
            type: "city_hall", // 追加
          },
        },
        {
          id: "public-4",
          name: "公園",
          description: "緑豊かな憩いの場",
          position: { x: 70, y: 70 },
          size: { width: 25, height: 25 },
          color: "bg-green-100 border-green-400",
          type: "park", // 追加
          storeInfo: {
            description: "自然豊かな公園。遊具あり。",
            rating: 4.8,
            hours: "6:00-22:00",
            address: "東京都新宿区18-18-18",
            type: "park", // 追加
          },
        },
      ],
    },
  ],
};
