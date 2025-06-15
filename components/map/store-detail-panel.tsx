"use client";

import { X, Phone, Clock, Globe, Star, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Store } from "@/lib/genre-data";

interface StoreDetailPanelProps {
  store: Store | null;
  onClose: () => void;
}

export default function StoreDetailPanel({
  store,
  onClose,
}: StoreDetailPanelProps) {
  return (
    <AnimatePresence>
      {store && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl overflow-y-auto border-l border-gray-200"
          style={{ zIndex: 50 }} // サイドパネルが最前面になるように
        >
          <div
            className="sticky top-0 bg-white border-b p-4 flex justify-between items-center"
            style={{ zIndex: 51 }}
          >
            <h2
              className="text-xl font-bold truncate pr-2"
              style={{ zIndex: 52 }}
            >
              {store.name}
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full flex-shrink-0"
              style={{ zIndex: 52 }}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4 space-y-4" style={{ zIndex: 51 }}>
            {/* 基本情報 */}
            <div>
              <p className="text-gray-600 mb-2" style={{ zIndex: 52 }}>
                {store.description}
              </p>
              {store.storeInfo?.description && (
                <p className="text-sm text-gray-700" style={{ zIndex: 52 }}>
                  {store.storeInfo.description}
                </p>
              )}
            </div>

            {/* 評価 */}
            {store.storeInfo?.rating && (
              <div
                className="flex items-center space-x-2"
                style={{ zIndex: 52 }}
              >
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-semibold">{store.storeInfo.rating}</span>
                <span className="text-gray-500">/ 5.0</span>
              </div>
            )}

            {/* 営業時間 */}
            {store.storeInfo?.hours && (
              <div
                className="flex items-start space-x-3"
                style={{ zIndex: 52 }}
              >
                <Clock className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold">営業時間</p>
                  <p className="text-gray-600 break-words">
                    {store.storeInfo.hours}
                  </p>
                </div>
              </div>
            )}

            {/* 電話番号 */}
            {store.storeInfo?.phone && (
              <div
                className="flex items-center space-x-3"
                style={{ zIndex: 52 }}
              >
                <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold">電話番号</p>
                  <a
                    href={`tel:${store.storeInfo.phone}`}
                    className="text-blue-600 hover:underline break-all"
                  >
                    {store.storeInfo.phone}
                  </a>
                </div>
              </div>
            )}

            {/* ウェブサイト */}
            {store.storeInfo?.website && (
              <div
                className="flex items-center space-x-3"
                style={{ zIndex: 52 }}
              >
                <Globe className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold">ウェブサイト</p>
                  <a
                    href={store.storeInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    公式サイトを見る
                  </a>
                </div>
              </div>
            )}

            {/* サービス */}
            {store.storeInfo?.services &&
              store.storeInfo.services.length > 0 && (
                <div style={{ zIndex: 52 }}>
                  <p className="font-semibold mb-2">サービス・設備</p>
                  <div className="flex flex-wrap gap-2">
                    {store.storeInfo.services.map((service, index) => (
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
            <div className="flex items-center space-x-3" style={{ zIndex: 52 }}>
              <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">場所</p>
                <p className="text-gray-600">店舗・施設</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
