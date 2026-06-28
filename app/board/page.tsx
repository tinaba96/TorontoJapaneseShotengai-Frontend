"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessagesSquare,
  MessageCircle,
  Heart,
  Loader2,
  PenLine,
} from "lucide-react";
import { listPosts } from "@/app/lib/api/board";
import type { BoardPostSummary } from "@/app/types/board";
import { ApiError } from "@/app/lib/api/client";
import BoardNotice from "./_components/BoardNotice";
import AdUnit from "@/components/AdUnit";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("ja-JP", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BoardListPage() {
  const [posts, setPosts] = useState<BoardPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        setPosts(await listPosts());
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          setPosts([]);
        } else {
          setError("読み込みに失敗しました。時間をおいて再度お試しください。");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 max-w-3xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-sumi-800">
            <MessagesSquare className="h-7 w-7 text-sakura-500" />
            掲示板
          </h1>
          <p className="mt-1 text-sm text-sumi-500">
            トロント生活の質問・情報交換に。
          </p>
        </div>
        <Link
          href="/board/new"
          className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-gradient-sakura px-5 py-2.5 text-sm font-bold text-white shadow-glow transition-all hover:-translate-y-0.5"
        >
          <PenLine className="h-4 w-4" />
          投稿する
        </Link>
      </div>

      <div className="mt-6">
        <BoardNotice />
      </div>

      <div className="mt-6 space-y-3">
        {loading && (
          <div className="flex items-center gap-2 py-10 text-sm text-sumi-400">
            <Loader2 className="h-4 w-4 animate-spin" /> 読み込み中…
          </div>
        )}

        {error && !loading && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="rounded-3xl border border-sumi-100 bg-white p-10 text-center">
            <p className="text-sm text-sumi-500">まだ投稿がありません。</p>
            <Link
              href="/board/new"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-sakura px-5 py-2.5 text-sm font-bold text-white shadow-glow"
            >
              <PenLine className="h-4 w-4" />
              最初の投稿をする
            </Link>
          </div>
        )}

        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/board/${p.id}`}
            className="block rounded-2xl border border-sumi-100 bg-white p-5 transition-all hover:border-sakura-200 hover:shadow-glow-soft"
          >
            <h2 className="font-display text-lg font-bold text-sumi-800 line-clamp-2">
              {p.title}
            </h2>
            <div className="mt-2 flex items-center gap-4 text-xs text-sumi-400">
              <span>{p.author_name}</span>
              <span>{formatDate(p.created_at)}</span>
              <span className="inline-flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" />
                {p.comment_count}
              </span>
              <span className="inline-flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" />
                {p.reaction_total}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <AdUnit className="mt-8" />
    </div>
  );
}
