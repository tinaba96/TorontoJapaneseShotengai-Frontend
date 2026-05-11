"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNews } from "@/app/lib/api/news";
import type { News } from "@/app/types/news";

function formatDate(news: News): string {
  return (news.publishDate || news.created_at || "").slice(0, 10);
}

const NewsSection = () => {
  const [items, setItems] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getNews();
        setItems(data.slice(0, 5));
      } catch (err) {
        // 404 (no news) is normal; ignore
        if (
          !(
            err &&
            typeof err === "object" &&
            "status" in err &&
            (err as { status?: number }).status === 404
          )
        ) {
          console.error("Failed to fetch news:", err);
        }
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-shinsaibashi-blue">
          最新ニュース
        </h2>

        {isLoading && (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-shinsaibashi-orange"></div>
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <p className="text-center text-gray-500">
            現在表示できるニュースがありません
          </p>
        )}

        {!isLoading && items.length > 0 && (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="bg-white p-4 rounded shadow">
                <Link href={`/news/${item.id}`} className="flex items-center">
                  <span className="text-gray-600 mr-4">{formatDate(item)}</span>
                  <span className="text-shinsaibashi-blue hover:text-shinsaibashi-orange">
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="text-center mt-8">
          <Link
            href="/news"
            className="inline-block bg-shinsaibashi-orange text-white px-6 py-2 rounded hover:bg-shinsaibashi-blue transition-colors duration-300"
          >
            ニュース一覧
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
