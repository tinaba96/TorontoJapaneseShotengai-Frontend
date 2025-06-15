"use client";

import { X, Phone, Clock, Globe, Star, MapPin } from "lucide-react";
import type { SubArea } from "@/lib/map-data";

interface StoreDetailModalProps {
  store: SubArea | null;
  onClose: () => void;
}

export default function StoreDetailModal({
  store,
  onClose,
}: StoreDetailModalProps) {
  if (!store) return null;

  const { storeInfo } = store;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{store.name}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* 基本情報 */}
          <div>
            <p className="text-gray-600 mb-2">{store.description}</p>
            {storeInfo?.description && (
              <p className="text-sm text-gray-700">{storeInfo.description}</p>
            )}
          </div>

          {/* 評価 */}
          {storeInfo?.rating && (
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="font-semibold">{storeInfo.rating}</span>
              <span className="text-gray-500">/ 5.0</span>
            </div>
          )}

          {/* 営業時間 */}
          {storeInfo?.hours && (
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-semibold">営業時間</p>
                <p className="text-gray-600">{storeInfo.hours}</p>
              </div>
            </div>
          )}

          {/* 電話番号 */}
          {storeInfo?.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-semibold">電話番号</p>
                <a
                  href={`tel:${storeInfo.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {storeInfo.phone}
                </a>
              </div>
            </div>
          )}

          {/* ウェブサイト */}
          {storeInfo?.website && (
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-semibold">ウェブサイト</p>
                <a
                  href={storeInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  公式サイトを見る
                </a>
              </div>
            </div>
          )}

          {/* サービス */}
          {storeInfo?.services && storeInfo.services.length > 0 && (
            <div>
              <p className="font-semibold mb-2">サービス・設備</p>
              <div className="flex flex-wrap gap-2">
                {storeInfo.services.map((service, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 場所 */}
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-semibold">場所</p>
              <p className="text-gray-600">
                {store.type === "store"
                  ? "店舗"
                  : store.type === "facility"
                  ? "公共施設"
                  : "建物"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
