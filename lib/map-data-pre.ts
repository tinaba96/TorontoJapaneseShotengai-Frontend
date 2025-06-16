export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface SubArea {
  id: string
  name: string
  description: string
  position: Position
  size: Size
  color: string
}

export interface MapArea {
  id: string
  name: string
  description: string
  position: Position
  size: Size
  color: string
  subAreas: SubArea[]
}

export interface MapData {
  areas: MapArea[]
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
      subAreas: [
        {
          id: "residential-1",
          name: "高層マンション",
          description: "15階建てのタワーマンション",
          position: { x: 20, y: 30 },
          size: { width: 25, height: 20 },
          color: "bg-slate-200 border-slate-500",
        },
        {
          id: "residential-2",
          name: "戸建て住宅A",
          description: "緑豊かな住宅地",
          position: { x: 60, y: 25 },
          size: { width: 20, height: 15 },
          color: "bg-green-200 border-green-500",
        },
        {
          id: "residential-3",
          name: "戸建て住宅B",
          description: "ファミリー向け住宅",
          position: { x: 80, y: 45 },
          size: { width: 18, height: 15 },
          color: "bg-blue-200 border-blue-500",
        },
        {
          id: "residential-4",
          name: "学生寮",
          description: "大学生向けの寮",
          position: { x: 25, y: 65 },
          size: { width: 22, height: 18 },
          color: "bg-yellow-200 border-yellow-500",
        },
        {
          id: "residential-5",
          name: "アパート",
          description: "3階建てのアパート",
          position: { x: 65, y: 70 },
          size: { width: 20, height: 16 },
          color: "bg-pink-200 border-pink-500",
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
      subAreas: [
        {
          id: "commercial-1",
          name: "デパート",
          description: "大型百貨店",
          position: { x: 30, y: 25 },
          size: { width: 30, height: 20 },
          color: "bg-purple-200 border-purple-500",
        },
        {
          id: "commercial-2",
          name: "レストラン",
          description: "イタリアンレストラン",
          position: { x: 70, y: 30 },
          size: { width: 18, height: 15 },
          color: "bg-orange-200 border-orange-500",
        },
        {
          id: "commercial-3",
          name: "コンビニ",
          description: "24時間営業",
          position: { x: 25, y: 60 },
          size: { width: 15, height: 12 },
          color: "bg-cyan-200 border-cyan-500",
        },
        {
          id: "commercial-4",
          name: "カフェ",
          description: "おしゃれなカフェ",
          position: { x: 55, y: 65 },
          size: { width: 16, height: 14 },
          color: "bg-amber-200 border-amber-500",
        },
        {
          id: "commercial-5",
          name: "書店",
          description: "大型書店",
          position: { x: 80, y: 60 },
          size: { width: 18, height: 16 },
          color: "bg-indigo-200 border-indigo-500",
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
      subAreas: [
        {
          id: "business-1",
          name: "高層オフィスビル",
          description: "大企業の本社ビル",
          position: { x: 30, y: 30 },
          size: { width: 35, height: 25 },
          color: "bg-indigo-200 border-indigo-500",
        },
        {
          id: "business-2",
          name: "IT企業ビル",
          description: "テック系企業が集まる",
          position: { x: 70, y: 30 },
          size: { width: 25, height: 25 },
          color: "bg-teal-200 border-teal-500",
        },
        {
          id: "business-3",
          name: "銀行街",
          description: "金融機関が集中",
          position: { x: 30, y: 70 },
          size: { width: 25, height: 25 },
          color: "bg-emerald-200 border-emerald-500",
        },
        {
          id: "business-4",
          name: "コワーキングスペース",
          description: "フリーランサー向け",
          position: { x: 70, y: 70 },
          size: { width: 25, height: 25 },
          color: "bg-lime-200 border-lime-500",
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
      subAreas: [
        {
          id: "public-1",
          name: "総合病院",
          description: "24時間対応の大病院",
          position: { x: 30, y: 30 },
          size: { width: 35, height: 25 },
          color: "bg-red-100 border-red-400",
        },
        {
          id: "public-2",
          name: "市立図書館",
          description: "静かな学習環境",
          position: { x: 70, y: 30 },
          size: { width: 25, height: 25 },
          color: "bg-blue-100 border-blue-400",
        },
        {
          id: "public-3",
          name: "市役所",
          description: "各種手続きができる",
          position: { x: 30, y: 70 },
          size: { width: 25, height: 25 },
          color: "bg-yellow-100 border-yellow-400",
        },
        {
          id: "public-4",
          name: "公園",
          description: "緑豊かな憩いの場",
          position: { x: 70, y: 70 },
          size: { width: 25, height: 25 },
          color: "bg-green-100 border-green-400",
        },
      ],
    },
  ],
}
