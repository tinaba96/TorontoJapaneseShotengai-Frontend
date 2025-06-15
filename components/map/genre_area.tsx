"use client";

import { cn } from "@/lib/utils";
import type { MainGenre, SubGenre } from "@/lib/genre-data";
import MapIcon from "./map-icon";

interface GenreAreaProps {
  genre: MainGenre | SubGenre;
  onClick: () => void;
  isSubGenre?: boolean;
}

export default function GenreArea({
  genre,
  onClick,
  isSubGenre = false,
}: GenreAreaProps) {
  const storeCount =
    "subGenres" in genre
      ? genre.subGenres.reduce(
          (total: number, sub: SubGenre) => total + sub.stores.length,
          0
        )
      : genre.stores.length;

  return (
    <div
      className={cn(
        "absolute rounded-lg flex flex-col items-center justify-center text-center p-2",
        "bg-opacity-90 shadow-lg border-2 cursor-pointer",
        "backdrop-blur-sm hover:bg-opacity-100 transition-all",
        genre.color
      )}
      style={{
        top: `${genre.position.y}%`,
        left: `${genre.position.x}%`,
        width: `${genre.size.width}%`,
        height: `${genre.size.height}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 30, // テキストが最前面になるように高いz-indexを設定
        minHeight: "80px",
      }}
      onClick={onClick}
    >
      <div className="h-6 w-6 mb-1 flex-shrink-0" style={{ zIndex: 31 }}>
        <MapIcon type={genre.id} />
      </div>
      <div className="overflow-hidden" style={{ zIndex: 31 }}>
        <h3
          className="font-bold text-sm leading-tight mb-1 break-words"
          style={{ zIndex: 32 }}
        >
          {genre.name}
        </h3>
        <p
          className="text-xs text-gray-700 leading-tight mb-1 break-words line-clamp-2"
          style={{ zIndex: 32 }}
        >
          {genre.description}
        </p>
        <p className="text-xs text-gray-600" style={{ zIndex: 32 }}>
          {storeCount}件
        </p>
        {isSubGenre && (
          <p className="text-xs text-blue-600 mt-1" style={{ zIndex: 32 }}>
            クリックで表示
          </p>
        )}
      </div>
    </div>
  );
}
