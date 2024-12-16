"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

type Shop = {
  id: number;
  name: string;
  type: string;
  description: string;
  icon: string;
  position: { top: string; left: string };
};

const shops: Shop[] = [
  {
    id: 1,
    name: "和菓子屋 花月",
    type: "菓子店",
    description: "伝統的な和菓子を提供する老舗店です。",
    icon: "🍡",
    position: { top: "15%", left: "20%" },
  },
  {
    id: 2,
    name: "魚河岸 大漁",
    type: "鮮魚店",
    description: "新鮮な魚介類を取り扱う地元で人気の鮮魚店です。",
    icon: "🐟",
    position: { top: "35%", left: "65%" },
  },
  {
    id: 3,
    name: "古本屋 知恵袋",
    type: "書店",
    description: "珍しい古書から最新の書籍まで幅広く取り扱っています。",
    icon: "📚",
    position: { top: "75%", left: "35%" },
  },
  {
    id: 4,
    name: "呉服店 絹美",
    type: "衣料品店",
    description: "高品質な着物や和装小物を取り扱う専門店です。",
    icon: "👘",
    position: { top: "45%", left: "45%" },
  },
  {
    id: 5,
    name: "茶房 緑風",
    type: "喫茶店",
    description: "ほっと一息つける、懐かしい雰囲気の喫茶店です。",
    icon: "🍵",
    position: { top: "25%", left: "75%" },
  },
  {
    id: 6,
    name: "八百屋 みどり",
    type: "八百屋",
    description: "新鮮な野菜や果物を取り扱う地元の八百屋です。",
    icon: "🥬",
    position: { top: "55%", left: "25%" },
  },
  {
    id: 7,
    name: "肉の大和",
    type: "精肉店",
    description: "質の高いお肉を提供する老舗の精肉店です。",
    icon: "🥩",
    position: { top: "85%", left: "55%" },
  },
  {
    id: 8,
    name: "酒蔵 富士",
    type: "酒店",
    description: "地酒から輸入酒まで幅広く取り揃える専門店です。",
    icon: "🍶",
    position: { top: "5%", left: "45%" },
  },
];

export default function JapaneseMarketMap() {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Toronto Japanese Shotengai
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 relative bg-white rounded-xl shadow-lg overflow-hidden">
          <Image
            src="/images/mapImage.png"
            alt="Toronto Japanese Shotengai"
            width={800}
            height={800}
            className="w-full h-auto"
          />
          {shops.map((shop) => (
            <Button
              key={shop.id}
              variant="outline"
              className="absolute w-10 h-10 p-0 rounded-full bg-white hover:bg-red-50 transition-all duration-300 border-2 border-red-400 hover:border-red-500 shadow-md transform hover:scale-110"
              style={{ top: shop.position.top, left: shop.position.left }}
              onClick={() => setSelectedShop(shop)}
            >
              <span className="text-xl" role="img" aria-label={shop.name}>
                {shop.icon}
              </span>
            </Button>
          ))}
        </div>

        <Card className="w-full lg:w-1/3">
          <CardHeader className="flex flex-row items-center justify-between bg-red-50 border-b border-red-100">
            <CardTitle className="text-gray-800">
              {selectedShop ? selectedShop.name : "店舗情報"}
            </CardTitle>
            {selectedShop && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedShop(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">閉じる</span>
              </Button>
            )}
          </CardHeader>
          <CardContent className="mt-4">
            {selectedShop ? (
              <>
                <p className="text-4xl mb-4">{selectedShop.icon}</p>
                <p className="font-semibold mb-2 text-gray-700">
                  業種: {selectedShop.type}
                </p>
                <p className="text-gray-600">{selectedShop.description}</p>
              </>
            ) : (
              <p className="text-gray-600">
                マップ上の店舗アイコンをクリックすると、詳細情報が表示されます。
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
