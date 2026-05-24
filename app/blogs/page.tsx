"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
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

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <main className="flex-grow">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-gradient-sumi text-washi-50">
          <div className="pointer-events-none absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-sakura-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-20 h-[32rem] w-[32rem] rounded-full bg-gold-500/20 blur-3xl" />
          <div className="divider-gold" />
          <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-24">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-washi-100/60">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              Blog · TJSのお店をご紹介
            </div>
            <h1 className="mt-6 font-display font-black leading-[0.95] tracking-tight text-balance text-5xl md:text-7xl lg:text-8xl">
              <span className="text-gradient-aurora">Stories</span>{" "}
              <span className="italic text-gradient-gold">from the streets.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-washi-100/80">
              お店のうしろがわ、街のあいだ。
              ローカルの温度を、ことばで届ける。
            </p>
          </div>
          <div className="divider-gold" />
        </section>

        <section className="py-16">
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

            {!isLoading && !error && posts.length === 0 && (
              <div className="mx-auto max-w-xl text-center py-12">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-sakura-50 to-gold-50 ring-1 ring-gold-200/50 shadow-glow-soft">
                  <BookOpen className="h-9 w-9 text-gold-500" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-sumi-800">
                  まだ記事がありません
                </h3>
                <p className="mt-2 text-sm text-sumi-500">
                  最初の記事を、お待ちください。
                </p>
              </div>
            )}

            {!isLoading && !error && posts.length > 0 && (
              <>
                {/* Featured */}
                {featured && (
                  <Link
                    href={`/blogs/${featured.id}`}
                    className="group relative grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 overflow-hidden rounded-[2rem] bg-white border border-sumi-100 shadow-elegant hover:shadow-glow transition-shadow duration-500"
                  >
                    <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden">
                      <Image
                        src={featured.image || "/images/default.png"}
                        alt={featured.title}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/55 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-gradient-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sumi-900 shadow-glow-gold">
                        <Sparkles className="h-3 w-3" />
                        Featured · 注目
                      </div>
                    </div>
                    <div className="lg:col-span-5 p-7 md:p-10 flex flex-col justify-center">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-gold-500">
                        {formatDate(featured)} · {featured.category}
                      </div>
                      <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-sumi-800 group-hover:text-sakura-600 transition-colors text-balance line-clamp-3">
                        {featured.title}
                      </h2>
                      <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sakura-600">
                        記事を読む
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                )}

                {/* Grid */}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rest.map((post, idx) => (
                      <article
                        key={post.id}
                        style={{ animationDelay: `${idx * 60}ms` }}
                        className="group animate-fade-in-up"
                      >
                        <Link href={`/blogs/${post.id}`} className="block">
                          <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-2xl bg-sumi-100 shadow-glow-soft">
                            <Image
                              src={post.image || "/images/default.png"}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                              sizes="(min-width: 768px) 33vw, 100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sumi-800 ring-1 ring-sumi-100">
                              {post.category}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <time className="font-mono text-[10px] uppercase tracking-widest text-sumi-400">
                              {formatDate(post)}
                            </time>
                            <h3 className="font-display text-xl font-bold leading-tight text-sumi-800 group-hover:text-sakura-600 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <div className="pt-2 inline-flex items-center gap-1 text-xs font-semibold text-sumi-500 group-hover:text-sakura-600">
                              続きを読む
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
