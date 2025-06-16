"use client";

import { MapPin } from "lucide-react";
import type { Store } from "@/lib/genre-data";

interface MapPlotProps {
  store: Store;
  onClick: () => void;
}

export default function MapPlot({ store, onClick }: MapPlotProps) {
  return (
    <div
      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-full"
      style={{
        top: `${store.position.y}%`,
        left: `${store.position.x}%`,
        zIndex: 35,
      }}
      onClick={onClick}
    >
      {/* プロットピン */}
      <div className="relative group">
        <MapPin
          className="h-8 w-8 drop-shadow-lg hover:scale-110 transition-transform text-red-500"
          style={{ zIndex: 36 }}
        />

        {/* ホバー時の店舗名ラベル */}
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ zIndex: 40 }}
        >
          <div className="bg-black text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap max-w-48 truncate shadow-lg">
            {store.name}
            {store.storeInfo?.rating && (
              <span className="ml-1 text-yellow-400">
                ★{store.storeInfo.rating}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
