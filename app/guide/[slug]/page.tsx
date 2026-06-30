import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getGuidePost, guidePosts } from "@/lib/guide-posts";
import ArticleReaction from "@/components/ArticleReaction";
import AdUnit from "@/components/AdUnit";
import RecommendedServices from "@/components/RecommendedServices";
import ArrivalEssentials from "@/components/ArrivalEssentials";
import MiniPromo from "@/components/MiniPromo";

export function generateStaticParams() {
  return guidePosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getGuidePost(slug);
  if (!post) return { title: "記事が見つかりません | Toronto Japanese" };
  // 記事ごとのOG画像は既存サムネを流用（未設定時は共通のデフォルト）
  const ogImage = post.thumbnail ?? "/images/default.png";
  return {
    title: `${post.title} | Toronto Japanese`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/guide/${slug}`,
      images: [{ url: ogImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

function formatDate(date: string): string {
  return date.replace(/-/g, ".");
}

const markdownComponents = {
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-10 mb-3 font-display text-2xl font-bold text-sumi-800"
      {...props}
    />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-2 font-display text-lg font-bold text-sumi-800" {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="my-4 text-[15px] leading-relaxed text-sumi-600" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-4 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-sumi-600"
      {...props}
    />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="my-4 list-decimal space-y-1.5 pl-5 text-[15px] leading-relaxed text-sumi-600"
      {...props}
    />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-sumi-800" {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-sakura-600 underline underline-offset-2 hover:text-sakura-700"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-4 border-l-4 border-sakura-200 bg-sakura-50/40 px-4 py-2 text-[14px] text-sumi-600"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-sumi-100" />,
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: React.ComponentPropsWithoutRef<"th">) => (
    <th
      className="border border-sumi-200 bg-sumi-50 px-3 py-2 text-left font-semibold text-sumi-700"
      {...props}
    />
  ),
  td: (props: React.ComponentPropsWithoutRef<"td">) => (
    <td className="border border-sumi-200 px-3 py-2 text-sumi-600" {...props} />
  ),
};

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getGuidePost(slug);
  if (!post) notFound();

  return (
    <article>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-sumi text-washi-50">
        <div className="pointer-events-none absolute -top-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-sakura-500/25 blur-3xl" />
        <div className="divider-gold" />
        <div className="relative container mx-auto max-w-3xl px-4 lg:px-8 py-12 md:py-16">
          <Link
            href="/guide"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.3em] text-washi-100/70 hover:text-washi-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            記事一覧
          </Link>
          <div className="mt-5 flex items-center gap-3 text-xs text-washi-100/70">
            <span className="rounded-full bg-white/15 px-3 py-1 font-semibold">
              {post.category}
            </span>
            <span>{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              約{post.readingMinutes}分
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl md:text-4xl font-black leading-tight text-balance">
            {post.title}
          </h1>
        </div>
        <div className="divider-gold" />
      </section>

      <div className="container mx-auto max-w-3xl px-4 lg:px-8 py-12">
        {post.thumbnail && (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl border border-sumi-100 bg-sumi-50">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <div className="markdown">
          <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {post.content}
          </Markdown>
        </div>

        <ArrivalEssentials slug={post.slug} className="mt-10" />

        <RecommendedServices slug={post.slug} className="mt-10" />

        <AdUnit className="mt-10" />

        <div className="mt-12">
          <ArticleReaction slug={post.slug} />
        </div>

        <MiniPromo className="mt-8" />

        <div className="mt-8 border-t border-sumi-100 pt-8">
          <Link
            href="/guide"
            className="inline-flex items-center gap-2 rounded-full border border-sumi-200 px-5 py-2.5 text-sm font-semibold text-sumi-700 hover:border-sakura-300 hover:text-sakura-600"
          >
            <ArrowLeft className="h-4 w-4" />
            他の記事を読む
          </Link>
        </div>
      </div>
    </article>
  );
}
