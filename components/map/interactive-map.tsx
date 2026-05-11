"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { genreData, type Store, type GenreData } from "@/lib/genre-data";
import GenreArea from "@/components/map/genre_area";
import MapPlot from "@/components/map/map-plot";
import StoreDetailPanel from "@/components/map/store-detail-panel";
import { getStores } from "@/app/lib/api/stores";
import type { Store as ApiStore } from "@/app/types/store";

function mergeDbStores(dbStores: ApiStore[]): GenreData {
  const clone: GenreData = {
    mainGenres: genreData.mainGenres.map((mg) => ({
      ...mg,
      subGenres: mg.subGenres.map((sg) => ({
        ...sg,
        stores: [...sg.stores],
      })),
    })),
  };
  dbStores.forEach((s) => {
    const main = clone.mainGenres.find((m) => m.id === s.mainGenre);
    if (!main) return;
    const sub = main.subGenres.find((g) => g.id === s.subGenre);
    if (!sub) return;
    sub.stores.push({
      id: s.id,
      name: s.title,
      description: s.description,
      position: { x: s.position_x, y: s.position_y },
      storeInfo: {
        phone: s.contactPhone,
        hours: s.businessHours,
        website: s.website,
        description: s.description,
        services: s.services
          ? s.services
              .split(/[、,\n]/)
              .map((x) => x.trim())
              .filter(Boolean)
          : undefined,
      },
    });
  });
  return clone;
}

function RoadSystemBackground() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
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
  );
}

export default function InteractiveMap() {
  const [data, setData] = useState<GenreData>(genreData);
  const [selectedMainGenre, setSelectedMainGenre] = useState<string | null>(
    null
  );
  const [selectedSubGenre, setSelectedSubGenre] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showPlots, setShowPlots] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const dbStores = await getStores();
        setData(mergeDbStores(dbStores));
      } catch (err) {
        // 404 (no stores yet) is normal — fall back to static genreData
        if (
          err &&
          typeof err === "object" &&
          "status" in err &&
          (err as { status?: number }).status === 404
        ) {
          return;
        }
        console.error("Failed to fetch stores:", err);
      }
    };
    load();
  }, []);

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
    ? data.mainGenres.find((genre) => genre.id === selectedMainGenre)
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
            <RoadSystemBackground />

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
        ) : selectedMainGenre && currentMainGenre ? (
          // サブジャンル表示画面
          <motion.div
            key={selectedMainGenre}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <RoadSystemBackground />
            {currentMainGenre.subGenres.map((subGenre) => (
              <GenreArea
                key={subGenre.id}
                genre={subGenre}
                onClick={() => handleSubGenreClick(subGenre.id)}
                isSubGenre={true}
              />
            ))}
          </motion.div>
        ) : (
          // メインジャンル表示画面
          <motion.div
            key="main"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <RoadSystemBackground />
            {data.mainGenres.map((genre) => (
              <GenreArea
                key={genre.id}
                genre={genre}
                onClick={() => handleMainGenreClick(genre.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 店舗詳細パネル */}
      {selectedStore && (
        <StoreDetailPanel store={selectedStore} onClose={handleClosePanel} />
      )}
    </div>
  );
}
