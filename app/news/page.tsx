"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Newspaper, Filter, Sparkles } from "lucide-react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
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
        setError("ニュースの読み込みに失敗しました。");
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
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <main className="flex-grow">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-gradient-sumi text-washi-50">
          <div className="pointer-events-none absolute -top-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-gold-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-[32rem] w-[32rem] rounded-full bg-sakura-500/20 blur-3xl" />
          <div className="divider-gold" />
          <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-24">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-washi-100/60">
              <span className="h-1.5 w-1.5 rounded-full bg-sakura-400 animate-pulse" />
              News · 最新情報
            </div>
            <h1 className="mt-6 font-display font-black leading-[0.95] tracking-tight text-balance text-5xl md:text-7xl lg:text-8xl">
              <span className="text-gradient-aurora">Today&apos;s</span>{" "}
              <span className="italic text-gradient-gold">Headlines.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-washi-100/80">
              トロント日本人商店街の、いまをお届け。
              ローカルニュース、オープン情報、コミュニティの動き。
            </p>
          </div>
          <div className="divider-gold" />
        </section>

        {/* FILTER */}
        <section className="py-10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-sumi-400 mb-4">
              <Filter className="h-3 w-3" />
              Filter by category
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      active
                        ? "bg-gradient-sakura text-white shadow-glow border-transparent"
                        : "bg-white text-sumi-600 border border-sumi-200 hover:border-sakura-300 hover:text-sakura-600"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* LIST */}
        <section className="pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-2 border-sakura-100" />
                  <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-transparent border-t-sakura-500 animate-spin" />
                </div>
              </div>
            )}

            {error && !isLoading && (
              <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-red-50/70 backdrop-blur p-8 text-center">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {!isLoading && !error && filtered.length === 0 && (
              <div className="mx-auto max-w-xl text-center py-12">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-sakura-50 to-gold-50 ring-1 ring-gold-200/50 shadow-glow-soft">
                  <Newspaper className="h-9 w-9 text-gold-500" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-sumi-800">
                  ニュースがありません
                </h3>
                <p className="mt-2 text-sm text-sumi-500">
                  {selectedCategory === "すべて"
                    ? "現在表示できるニュースがありません。"
                    : `「${selectedCategory}」カテゴリのニュースはありません。`}
                </p>
              </div>
            )}

            {!isLoading && !error && filtered.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item, idx) => (
                  <article
                    key={item.id}
                    style={{ animationDelay: `${idx * 60}ms` }}
                    className="group relative overflow-hidden rounded-3xl bg-white border border-sumi-100 shadow-glow-soft transition-all duration-500 hover:shadow-elegant hover:-translate-y-1 hover:border-sakura-200 animate-fade-in-up"
                  >
                    <Link href={`/news/${item.id}`} className="block">
                      {item.image && (
                        <div className="relative h-52 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/55 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-gradient-sakura px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
                            <Sparkles className="h-3 w-3" />
                            {item.category}
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        {!item.image && (
                          <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-gradient-sakura px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
                            <Sparkles className="h-3 w-3" />
                            {item.category}
                          </div>
                        )}
                        <div className="font-mono text-[10px] uppercase tracking-widest text-sumi-400">
                          {formatDate(item)}
                        </div>
                        <h3 className="mt-2 font-display text-xl font-bold text-sumi-800 group-hover:text-sakura-600 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm text-sumi-500 leading-relaxed line-clamp-3">
                          {item.excerpt || ""}
                        </p>
                        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sakura-600">
                          続きを読む
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
