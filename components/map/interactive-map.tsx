"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { genreData, type Store } from "@/lib/genre-data";
import GenreArea from "@/components/map/genre_area";
import MapPlot from "@/components/map/map-plot";
import StoreDetailPanel from "@/components/map/store-detail-panel";

export default function InteractiveMap() {
  const [selectedMainGenre, setSelectedMainGenre] = useState<string | null>(
    null
  );
  const [selectedSubGenre, setSelectedSubGenre] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showPlots, setShowPlots] = useState(false);

  const handleMainGenreClick = (genreId: string) => {
    setSelectedMainGenre(genreId);
    setSelectedSubGenre(null);
    setShowPlots(false);
    setSelectedStore(null);
  };

  const handleSubGenreClick = (subGenreId: string) => {
    setSelectedSubGenre(subGenreId);
    setShowPlots(true);
    setSelectedStore(null);
  };

  const handleBackClick = () => {
    if (showPlots) {
      // プロット表示中の場合は、サブジャンル表示に戻る
      setShowPlots(false);
      setSelectedSubGenre(null);
      setSelectedStore(null);
    } else if (selectedMainGenre) {
      // メインジャンル表示中の場合は、トップに戻る
      setSelectedMainGenre(null);
      setSelectedStore(null);
    }
  };

  const handlePlotClick = (store: Store) => {
    setSelectedStore(store);
  };

  const handleClosePanel = () => {
    setSelectedStore(null);
  };

  const handleClearPlots = () => {
    setShowPlots(false);
    setSelectedSubGenre(null);
    setSelectedStore(null);
  };

  const currentMainGenre = selectedMainGenre
    ? genreData.mainGenres.find((genre) => genre.id === selectedMainGenre)
    : null;

  const currentSubGenre =
    selectedSubGenre && currentMainGenre
      ? currentMainGenre.subGenres.find((sub) => sub.id === selectedSubGenre)
      : null;

  return (
    <div className="relative w-full h-full bg-gray-100">
      <AnimatePresence mode="wait">
        {showPlots && currentSubGenre ? (
          // プロット表示画面
          <div key="plots" className="absolute inset-0">
            {/* 背景の道路システム */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 1 }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1000 750"
                className="absolute inset-0"
              >
                {/* Main roads - horizontal */}
                <rect x="0" y="200" width="1000" height="60" fill="#9ca3af" />
                <rect x="0" y="400" width="1000" height="60" fill="#9ca3af" />

                {/* Main roads - vertical */}
                <rect x="200" y="0" width="60" height="750" fill="#9ca3af" />
                <rect x="500" y="0" width="60" height="750" fill="#9ca3af" />

                {/* Road markings */}
                <rect x="0" y="225" width="1000" height="4" fill="#fbbf24" />
                <rect x="0" y="235" width="1000" height="4" fill="#fbbf24" />
                <rect x="225" y="0" width="4" height="750" fill="#fbbf24" />
                <rect x="235" y="0" width="4" height="750" fill="#fbbf24" />

                {/* Traffic lights */}
                <g transform="translate(200,200)">
                  <rect x="0" y="0" width="8" height="20" fill="#374151" />
                  <circle cx="4" cy="5" r="2" fill="#ef4444" />
                  <circle cx="4" cy="10" r="2" fill="#fbbf24" />
                  <circle cx="4" cy="15" r="2" fill="#22c55e" />
                </g>

                {/* Trees */}
                {[
                  [150, 150],
                  [350, 150],
                  [650, 150],
                  [850, 150],
                  [150, 350],
                  [350, 350],
                  [650, 350],
                  [850, 350],
                  [150, 550],
                  [350, 550],
                  [650, 550],
                  [850, 550],
                ].map(([x, y], i) => (
                  <g key={i} transform={`translate(${x},${y})`}>
                    <rect x="-3" y="10" width="6" height="15" fill="#92400e" />
                    <circle cx="0" cy="0" r="12" fill="#22c55e" />
                  </g>
                ))}
              </svg>
            </div>

            {/* ナビゲーションボタン */}
            <button
              onClick={handleBackClick}
              className="absolute top-4 left-4 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              style={{ zIndex: 45 }}
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            <button
              onClick={handleClearPlots}
              className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              style={{ zIndex: 45 }}
            >
              <X className="h-6 w-6" />
            </button>

            <div className="w-full h-full p-4" style={{ zIndex: 10 }}>
              <h2
                className="text-2xl font-bold mb-2 bg-white/80 inline-block px-3 py-1 rounded-lg shadow-lg"
                style={{ zIndex: 40 }}
              >
                {currentSubGenre.name} - 店舗位置
              </h2>

              <div className="w-full h-[calc(100%-3rem)] relative">
                {/* プロット表示 */}
                {currentSubGenre.stores.map((store) => (
                  <MapPlot
                    key={store.id}
                    store={{
                      id: store.id,
                      name: store.name,
                      description: store.description,
                      position: store.position,
                      size: { width: 0, height: 0 }, // プロットでは使用しない
                      color: "",
                      type: "store",
                      storeInfo: store.storeInfo,
                    }}
                    onClick={() => handlePlotClick(store)}
                  />
                ))}

                {/* プロット表示時の説明 */}
                <div
                  className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-md max-w-xs"
                  style={{ zIndex: 40 }}
                >
                  <p className="text-sm font-medium">
                    📍 {currentSubGenre.name}の店舗位置
                  </p>
                  <p className="text-xs text-gray-600">
                    ピンをクリックして詳細情報を表示
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : selectedMainGenre ? (
          // サブジャンル表示画面
          <motion.div
            key={selectedMainGenre}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* 背景の道路システム */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 1 }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1000 750"
                className="absolute inset-0"
              >
                {/* Main roads - horizontal */}
                <rect x="0" y="200" width="1000" height="60" fill="#9ca3af" />
                <rect x="0" y="400" width="1000" height="60" fill="#9ca3af" />

                {/* Main roads - vertical */}
                <rect x="200" y="0" width="60" height="750" fill="#9ca3af" />
                <rect x="500" y="0" width="60" height="750" fill="#9ca3af" />

                {/* Road markings */}
                <rect x="0" y="225" width="1000" height="4" fill="#fbbf24" />
                <rect x="0" y="235" width="1000" height="4" fill="#fbbf24" />
                <rect x="225" y="0" width="4" height="750" fill="#fbbf24" />
                <rect x="235" y="0" width="4" height="750" fill="#fbbf24" />

                {/* Traffic lights */}
                <g transform="translate(200,200)">
                  <rect x="0" y="0" width="8" height="20" fill="#374151" />
                  <circle cx="4" cy="5" r="2" fill="#ef4444" />
                  <circle cx="4" cy="10" r="2" fill="#fbbf24" />
                  <circle cx="4" cy="15" r="2" fill="#22c55e" />
                </g>

                {/* Trees */}
                {[
                  [150, 150],
                  [350, 150],
                  [650, 150],
                  [850, 150],
                  [150, 350],
                  [350, 350],
                  [650, 350],
                  [850, 350],
                  [150, 550],
                  [350, 550],
                  [650, 550],
                  [850, 550],
                ].map(([x, y], i) => (
                  <g key={i} transform={`translate(${x},${y})`}>
                    <rect x="-3" y="10" width="6" height="15" fill="#92400e" />
                    <circle cx="0" cy="0" r="12" fill="#22c55e" />
                  </g>
                ))}
              </svg>
            </div>

            <button
              onClick={handleBackClick}
              className="absolute top-4 left-4 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              style={{ zIndex: 45 }}
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="w-full h-full p-4" style={{ zIndex: 10 }}>
              <h2
                className="text-2xl font-bold mb-2 bg-white/80 inline-block px-3 py-1 rounded-lg shadow-lg"
                style={{ zIndex: 40 }}
              >
                {currentMainGenre?.name}
              </h2>

              <div className="w-full h-[calc(100%-3rem)] relative">
                {currentMainGenre?.subGenres.map((subGenre) => (
                  <GenreArea
                    key={subGenre.id}
                    genre={subGenre}
                    onClick={() => handleSubGenreClick(subGenre.id)}
                    isSubGenre={true}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          // メインジャンル表示画面
          <motion.div
            key="main-genres"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full relative"
          >
            {/* 背景の道路システム */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 1 }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1000 750"
                className="absolute inset-0"
              >
                {/* Main roads - horizontal */}
                <rect x="0" y="200" width="1000" height="60" fill="#9ca3af" />
                <rect x="0" y="400" width="1000" height="60" fill="#9ca3af" />
                <rect x="0" y="600" width="1000" height="60" fill="#9ca3af" />

                {/* Main roads - vertical */}
                <rect x="200" y="0" width="60" height="750" fill="#9ca3af" />
                <rect x="500" y="0" width="60" height="750" fill="#9ca3af" />
                <rect x="800" y="0" width="60" height="750" fill="#9ca3af" />

                {/* Road markings */}
                <rect x="0" y="225" width="1000" height="4" fill="#fbbf24" />
                <rect x="0" y="235" width="1000" height="4" fill="#fbbf24" />
                <rect x="0" y="425" width="1000" height="4" fill="#fbbf24" />
                <rect x="0" y="435" width="1000" height="4" fill="#fbbf24" />

                <rect x="225" y="0" width="4" height="750" fill="#fbbf24" />
                <rect x="235" y="0" width="4" height="750" fill="#fbbf24" />
                <rect x="525" y="0" width="4" height="750" fill="#fbbf24" />
                <rect x="535" y="0" width="4" height="750" fill="#fbbf24" />

                {/* Traffic lights */}
                <g transform="translate(200,200)">
                  <rect x="0" y="0" width="8" height="20" fill="#374151" />
                  <circle cx="4" cy="5" r="2" fill="#ef4444" />
                  <circle cx="4" cy="10" r="2" fill="#fbbf24" />
                  <circle cx="4" cy="15" r="2" fill="#22c55e" />
                </g>

                <g transform="translate(500,200)">
                  <rect x="0" y="0" width="8" height="20" fill="#374151" />
                  <circle cx="4" cy="5" r="2" fill="#ef4444" />
                  <circle cx="4" cy="10" r="2" fill="#fbbf24" />
                  <circle cx="4" cy="15" r="2" fill="#22c55e" />
                </g>

                {/* Trees */}
                {[
                  [150, 150],
                  [350, 150],
                  [650, 150],
                  [850, 150],
                  [150, 350],
                  [350, 350],
                  [650, 350],
                  [850, 350],
                  [150, 550],
                  [350, 550],
                  [650, 550],
                  [850, 550],
                ].map(([x, y], i) => (
                  <g key={i} transform={`translate(${x},${y})`}>
                    <rect x="-3" y="10" width="6" height="15" fill="#92400e" />
                    <circle cx="0" cy="0" r="12" fill="#22c55e" />
                  </g>
                ))}
              </svg>
            </div>

            {/* メインジャンルボックス */}
            <div style={{ zIndex: 10 }}>
              {genreData.mainGenres.map((genre) => (
                <GenreArea
                  key={genre.id}
                  genre={genre}
                  onClick={() => handleMainGenreClick(genre.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 店舗詳細サイドパネル */}
      <StoreDetailPanel store={selectedStore} onClose={handleClosePanel} />
    </div>
  );
}
