"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getNews } from "@/app/lib/api/news";
import type { News } from "@/app/types/news";

const categories = ["すべて", "イベント", "オープン", "お知らせ"];

function formatDate(news: News): string {
  return (news.publishDate || news.created_at || "").slice(0, 10);
}

export default function NewsPage() {
  const [items, setItems] = useState<News[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getNews();
        setItems(data);
      } catch (err) {
        if (
          err &&
          typeof err === "object" &&
          "status" in err &&
          (err as { status?: number }).status === 404
        ) {
          setItems([]);
          return;
        }
        setError("ニュースの読み込みに失敗しました");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    if (selectedCategory === "すべて") return items;
    return items.filter((n) => n.category === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-shinsaibashi-blue to-shinsaibashi-orange text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ニュース</h1>
          <p className="text-xl opacity-90">
            トロント日本人商店街の最新情報をお届けします
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border transition-colors duration-300 ${
                    selectedCategory === category
                      ? "bg-shinsaibashi-orange text-white border-shinsaibashi-orange"
                      : "bg-white border-gray-300 hover:bg-shinsaibashi-orange hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {isLoading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-shinsaibashi-orange"></div>
            </div>
          )}

          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!isLoading && !error && filtered.length === 0 && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ニュースがありません
              </h3>
              <p className="text-gray-600">
                {selectedCategory === "すべて"
                  ? "現在表示できるニュースがありません。"
                  : `「${selectedCategory}」カテゴリのニュースはありません。`}
              </p>
            </div>
          )}

          {!isLoading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {item.image && (
                    <div className="h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">
                        {formatDate(item)}
                      </span>
                      <span className="px-3 py-1 bg-shinsaibashi-orange text-white text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-shinsaibashi-blue hover:text-shinsaibashi-orange transition-colors duration-300">
                      <Link href={`/news/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.excerpt || ""}
                    </p>
                    <Link
                      href={`/news/${item.id}`}
                      className="inline-flex items-center text-shinsaibashi-orange hover:text-shinsaibashi-blue transition-colors duration-300"
                    >
                      続きを読む
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
