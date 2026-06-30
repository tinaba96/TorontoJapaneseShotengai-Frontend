import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { getSortedGuidePosts } from "@/lib/guide-posts";

const GUIDE_TITLE = "ブログ｜はじめてのトロント";
const GUIDE_DESC =
  "ワーホリ・留学・初めてトロントに来る方向けの実用ガイド。SIN・銀行口座・携帯・交通・家探し・仕事・医療・日本食材まで、現地生活の最初の一歩をまとめています。";

export const metadata: Metadata = {
  title: `${GUIDE_TITLE} | Toronto Japanese`,
  description: GUIDE_DESC,
  alternates: { canonical: "/guide" },
  openGraph: {
    title: GUIDE_TITLE,
    description: GUIDE_DESC,
    // og:url をトップ(ルート既定)から /guide に上書き。
    // Xはog:urlをカードのキャッシュキーに使うため、これが無いとトップ扱いで古いカードを使い回す。
    url: "/guide",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: GUIDE_TITLE,
    description: GUIDE_DESC,
  },
};

function formatDate(date: string): string {
  return date.replace(/-/g, ".");
}

export default function GuideListPage() {
  const posts = getSortedGuidePosts();

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-sumi text-washi-50">
        <div className="pointer-events-none absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-sakura-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-[32rem] w-[32rem] rounded-full bg-gold-500/20 blur-3xl" />
        <div className="divider-gold" />
        <div className="relative container mx-auto px-4 lg:px-8 py-14 md:py-20">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-washi-100/60">
            <span className="h-1.5 w-1.5 rounded-full bg-sakura-400 animate-pulse" />
            Toronto Blog · はじめてのトロント
          </div>
          <h1 className="mt-6 font-display font-black leading-[0.98] tracking-tight text-balance text-4xl md:text-6xl">
            トロント生活、最初の一歩
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-washi-100/80">
            ワーホリ・留学・初めての海外。到着してから困らないように、
            手続き・お金・住まい・交通・仕事まわりを、現地目線でまとめました。
          </p>
        </div>
        <div className="divider-gold" />
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {posts.length === 0 ? (
          <p className="text-center text-sm text-sumi-500 py-20">
            記事を準備中です。近日公開します。
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/guide/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-sumi-100 bg-white shadow-glow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="relative aspect-[16/10] bg-sumi-50">
                  <Image
                    src={post.thumbnail ?? "/images/default.png"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-sumi-600">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-[11px] text-sumi-400">
                    <span>{formatDate(post.date)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      約{post.readingMinutes}分
                    </span>
                  </div>
                  <h2 className="mt-2 font-display text-lg font-bold leading-snug text-sumi-800 group-hover:text-sakura-600">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-sumi-500">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sakura-600">
                    読む
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
