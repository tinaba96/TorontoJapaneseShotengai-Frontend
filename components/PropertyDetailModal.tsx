"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Home,
  Users,
  DollarSign,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { Property } from "../lib/types";

interface PropertyDetailModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

interface PropertyDetail extends Property {
  description: string;
  amenities: string[];
  availableFrom: string;
  utilities: string;
  parking: string;
  petPolicy: string;
  owner: {
    name: string;
    phone: string;
    email: string;
  };
}

const propertyDetails: PropertyDetail[] = [
  {
    id: "1",
    name: "Modern City Apartment",
    address: "123 Example Street, Toronto, ON M5A 1A1, Canada",
    price: 2000,
    size: 55,
    rooms: 2,
    imageUrl: "/images/rental.png",
    description:
      "ダウンタウンの中心部にあるモダンなアパートメント。最新の設備と快適な住環境を提供します。公共交通機関へのアクセスも良好で、ショッピングやレストランも徒歩圏内です。",
    amenities: [
      "エアコン",
      "洗濯機・乾燥機",
      "ジム",
      "プール",
      "駐車場",
      "バルコニー",
    ],
    availableFrom: "2024-02-01",
    utilities: "電気・ガス・水道込み",
    parking: "1台分含む",
    petPolicy: "ペット可（追加料金あり）",
    owner: {
      name: "田中太郎",
      phone: "+1-416-555-0123",
      email: "tanaka@example.com",
    },
  },
  {
    id: "2",
    name: "Downtown Loft",
    address: "456 King Street West, Toronto, ON M5V 1M3, Canada",
    price: 2500,
    size: 70,
    rooms: 3,
    imageUrl: "/images/rental2.png",
    description:
      "キングストリート沿いのスタイリッシュなロフト。高天井と大きな窓で開放感のある空間です。アートディストリクトの中心に位置し、文化的な刺激に満ちた環境です。",
    amenities: [
      "高天井",
      "大きな窓",
      "オープンキッチン",
      "エレベーター",
      "セキュリティ",
      "屋上テラス",
    ],
    availableFrom: "2024-02-15",
    utilities: "電気・ガス・水道込み",
    parking: "1台分含む",
    petPolicy: "ペット可",
    owner: {
      name: "佐藤花子",
      phone: "+1-416-555-0456",
      email: "sato@example.com",
    },
  },
  {
    id: "3",
    name: "Luxury Condo",
    address: "789 Queen Street East, Toronto, ON M4M 1H6, Canada",
    price: 3200,
    size: 90,
    rooms: 3,
    imageUrl: "/images/rental3.png",
    description:
      "クイーンストリート沿いの高級コンドミニアム。最新の設備と豪華な内装で、贅沢な生活を送ることができます。24時間セキュリティで安心・安全です。",
    amenities: [
      "24時間セキュリティ",
      "コンシェルジュ",
      "ジム",
      "スパ",
      "プール",
      "パーティールーム",
    ],
    availableFrom: "2024-03-01",
    utilities: "電気・ガス・水道込み",
    parking: "2台分含む",
    petPolicy: "ペット可（体重制限あり）",
    owner: {
      name: "山田次郎",
      phone: "+1-416-555-0789",
      email: "yamada@example.com",
    },
  },
  {
    id: "4",
    name: "Suburban Family Home",
    address: "102 Birchmount Road, Scarborough, ON M1N 1E4, Canada",
    price: 3500,
    size: 120,
    rooms: 4,
    imageUrl: "/images/rental4.png",
    description:
      "スカボロー地区の広々としたファミリーホーム。静かな住宅街に位置し、家族での生活に最適です。大きな庭と駐車場も完備しています。",
    amenities: ["庭", "駐車場", "地下室", "暖炉", "ガレージ", "子供用遊び場"],
    availableFrom: "2024-02-20",
    utilities: "電気・ガス・水道込み",
    parking: "3台分含む",
    petPolicy: "ペット可",
    owner: {
      name: "鈴木美咲",
      phone: "+1-416-555-0321",
      email: "suzuki@example.com",
    },
  },
  {
    id: "5",
    name: "Cozy Studio Apartment",
    address: "12 College Street, Toronto, ON M5G 2E2, Canada",
    price: 1500,
    size: 35,
    rooms: 1,
    imageUrl: "/images/rental5.png",
    description:
      "カレッジストリート沿いの居心地の良いスタジオアパートメント。学生や若いプロフェッショナルに人気のエリアです。コンパクトながら必要な設備は全て揃っています。",
    amenities: [
      "エアコン",
      "洗濯機",
      "キッチン",
      "クローゼット",
      "インターネット",
      "暖房",
    ],
    availableFrom: "2024-02-10",
    utilities: "電気・ガス・水道込み",
    parking: "なし",
    petPolicy: "ペット不可",
    owner: {
      name: "高橋健一",
      phone: "+1-416-555-0654",
      email: "takahashi@example.com",
    },
  },
];

export default function PropertyDetailModal({
  property,
  isOpen,
  onClose,
}: PropertyDetailModalProps) {
  const router = useRouter();
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const propertyDetail = propertyDetails.find((p) => p.id === property.id) || {
    ...property,
    description: "詳細情報はお問い合わせください。",
    amenities: ["エアコン", "暖房", "キッチン"],
    availableFrom: "2024-02-01",
    utilities: "電気・ガス・水道込み",
    parking: "要確認",
    petPolicy: "要確認",
    owner: {
      name: "オーナー",
      phone: "+1-416-555-0000",
      email: "owner@example.com",
    },
  };

  const handleMessageOwner = () => {
    setIsSendingMessage(true);
    // メッセージページに遷移（オーナー情報をクエリパラメータで渡す）
    setTimeout(() => {
      router.push(
        `/messages?owner=${propertyDetail.owner.name}&property=${property.name}`
      );
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{property.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* コンテンツ */}
        <div className="p-6">
          {/* 画像 */}
          <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
            <Image
              src={property.imageUrl}
              alt={property.name}
              fill
              className="object-cover"
            />
          </div>

          {/* 基本情報 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                <div>
                  <p className="font-medium">住所</p>
                  <p>{property.address}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Home className="w-5 h-5 mr-3 text-blue-500" />
                <div>
                  <p className="font-medium">部屋数・広さ</p>
                  <p>
                    {property.rooms}部屋 • {property.size}m²
                  </p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-5 h-5 mr-3 text-blue-500" />
                <div>
                  <p className="font-medium">家賃</p>
                  <p className="text-xl font-bold text-purple-600">
                    ${property.price.toLocaleString()}/月
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                <div>
                  <p className="font-medium">入居可能日</p>
                  <p>{propertyDetail.availableFrom}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-3 text-blue-500" />
                <div>
                  <p className="font-medium">オーナー</p>
                  <p>{propertyDetail.owner.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 詳細情報 */}
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                物件説明
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {propertyDetail.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                設備・アメニティ
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {propertyDetail.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">光熱費</h4>
                <p className="text-gray-600">{propertyDetail.utilities}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">駐車場</h4>
                <p className="text-gray-600">{propertyDetail.parking}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">ペット</h4>
                <p className="text-gray-600">{propertyDetail.petPolicy}</p>
              </div>
            </div>
          </div>

          {/* オーナー情報 */}
          <div className="bg-blue-50 rounded-lg p-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              オーナー情報
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">名前:</span>{" "}
                  {propertyDetail.owner.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">電話:</span>{" "}
                  {propertyDetail.owner.phone}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">メール:</span>{" "}
                  {propertyDetail.owner.email}
                </p>
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="border-t pt-6">
            <button
              onClick={handleMessageOwner}
              disabled={isSendingMessage}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isSendingMessage ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  メッセージページに移動中...
                </div>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  オーナーにメッセージする
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
