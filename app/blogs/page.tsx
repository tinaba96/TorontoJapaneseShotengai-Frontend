"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { getBlogs } from "@/app/lib/api/blogs";
import type { Blog } from "@/app/types/blog";

function formatDate(blog: Blog): string {
  const raw = blog.publishDate || blog.created_at || "";
  return raw.slice(0, 10).replace(/-/g, ".");
}

export default function BlogListing() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getBlogs();
        setPosts(data);
      } catch (err) {
        if (
          err &&
          typeof err === "object" &&
          "status" in err &&
          (err as { status?: number }).status === 404
        ) {
          setPosts([]);
          return;
        }
        setError("ブログの読み込みに失敗しました");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      <h1 className="text-3xl font-bold text-center mb-8">ブログ一覧</h1>

      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!isLoading && !error && posts.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            ブログ記事がありません
          </h3>
          <p className="text-gray-600">現在表示できる記事がありません</p>
        </div>
      )}

      {!isLoading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/blogs/${post.id}`} className="block">
                <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={post.image || "/images/default.png"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold line-clamp-2 leading-tight">
                    {post.title}
                  </h2>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <time>{formatDate(post)}</time>
                    <span className="text-xs tracking-wider">
                      カテゴリ{" "}
                      <span className="font-medium underline">
                        {post.category}
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      <Footer />
    </main>
  );
}
