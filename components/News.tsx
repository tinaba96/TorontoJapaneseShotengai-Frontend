"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Newspaper, Calendar } from "lucide-react";
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
    <section className="relative py-24 overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 h-72 w-72 rounded-full bg-sakura-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gold-200/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="section-eyebrow">
            <span className="h-px w-8 bg-gold-400" />
            Latest · 最新情報
            <span className="h-px w-8 bg-gold-400" />
          </div>
          <h2 className="mt-4 section-heading text-sumi-800">
            <span className="text-gradient-aurora">News</span>{" "}
            <span className="font-jp text-sumi-700">最新ニュース</span>
          </h2>
          <p className="mt-3 max-w-lg text-sm text-sumi-500">
            TJSコミュニティのいま、を毎週お届け。
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="relative">
              <div className="h-12 w-12 rounded-full border-2 border-sakura-100" />
              <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-transparent border-t-sakura-500 animate-spin" />
            </div>
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <div className="mx-auto max-w-md text-center py-12">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-sakura-50 to-gold-50 ring-1 ring-gold-200/50">
              <Newspaper className="h-7 w-7 text-gold-500" />
            </div>
            <p className="mt-4 text-sm text-sumi-500">
              現在表示できるニュースはありません
            </p>
          </div>
        )}

        {!isLoading && items.length > 0 && (
          <ul className="mx-auto max-w-3xl space-y-3">
            {items.map((item, idx) => (
              <li
                key={item.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <Link
                  href={`/news/${item.id}`}
                  className="group relative flex items-center gap-4 rounded-2xl border border-sumi-100/60 bg-white/80 backdrop-blur p-4 md:p-5 shadow-sm transition-all duration-500 hover:shadow-elegant hover:-translate-y-0.5 hover:border-sakura-200"
                >
                  {/* Left accent bar */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r bg-gradient-sakura opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="hidden sm:flex shrink-0 flex-col items-center justify-center w-16 rounded-xl bg-gradient-to-br from-sumi-50 to-washi-100 py-2 ring-1 ring-sumi-100">
                    <Calendar className="h-3.5 w-3.5 text-gold-500" />
                    <span className="mt-1 font-mono text-[10px] tracking-wider text-sumi-500">
                      {formatDate(item) || "----"}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="sm:hidden mb-1 font-mono text-[10px] tracking-wider text-sumi-400">
                      {formatDate(item)}
                    </div>
                    <h3 className="font-display text-base md:text-lg font-semibold text-sumi-800 group-hover:text-sakura-600 transition-colors duration-300 truncate">
                      {item.title}
                    </h3>
                  </div>

                  <ArrowRight className="shrink-0 h-4 w-4 text-sumi-300 transition-all duration-300 group-hover:text-sakura-500 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 rounded-full bg-sumi-800 px-7 py-3 text-sm font-semibold text-washi-50 shadow-glow-soft btn-glow transition-all hover:bg-sumi-900 hover:shadow-elegant hover:-translate-y-0.5"
          >
            ニュース一覧を見る
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
