"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { getNews, getNewsById } from "@/app/lib/api/news";
import type { News } from "@/app/types/news";

function formatDate(news: News): string {
  return (news.publishDate || news.created_at || "").slice(0, 10);
}

export default function NewsArticlePage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const [article, setArticle] = useState<News | null>(null);
  const [related, setRelated] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetched = await getNewsById(id);
        setArticle(fetched);
        try {
          const all = await getNews();
          setRelated(all.filter((n) => n.id !== fetched.id).slice(0, 4));
        } catch {
          setRelated([]);
        }
      } catch (err) {
        if (
          err &&
          typeof err === "object" &&
          "status" in err &&
          (err as { status?: number }).status === 404
        ) {
          setNotFound(true);
          return;
        }
        setError("記事の読み込みに失敗しました");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-shinsaibashi-orange"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">記事が見つかりません</h1>
          <Link href="/news" className="text-shinsaibashi-orange hover:underline">
            ニュース一覧に戻る
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-red-600">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="bg-gradient-to-r from-shinsaibashi-blue to-shinsaibashi-orange text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <Link
                href="/news"
                className="text-white hover:text-gray-200 transition-colors duration-300"
              >
                ← ニュース一覧に戻る
              </Link>
            </div>
            <span className="inline-block px-3 py-1 bg-white text-shinsaibashi-orange text-sm rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {article.title}
            </h1>
            <div className="flex items-center text-sm opacity-90">
              <span>{formatDate(article)}</span>
              {article.author && (
                <>
                  <span className="mx-2">•</span>
                  <span>by {article.author}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              {article.image && (
                <div className="h-64 md:h-96 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 md:p-8">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {article.tags && article.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">タグ</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-3">シェア</h3>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300">
                      Facebook
                    </button>
                    <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors duration-300">
                      Twitter
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300">
                      LINE
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {related.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">関連記事</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      href={`/news/${r.id}`}
                      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      {r.image && (
                        <div className="h-32 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={r.image}
                            alt={r.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <span className="text-xs text-gray-500">
                          {formatDate(r)}
                        </span>
                        <h3 className="text-lg font-semibold mt-1 text-shinsaibashi-blue hover:text-shinsaibashi-orange transition-colors duration-300">
                          {r.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
