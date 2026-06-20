"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { createPost } from "@/app/lib/api/board";
import MarkdownEditor from "../_components/MarkdownEditor";
import LoginInline from "../_components/LoginInline";

export default function NewPostPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) return;
    try {
      setSubmitting(true);
      setError(null);
      const created = await createPost({ title: title.trim(), body: body.trim() });
      router.push(`/board/${created.id}`);
    } catch {
      setError("投稿に失敗しました。時間をおいて再度お試しください。");
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 max-w-3xl">
      <Link
        href="/board"
        className="inline-flex items-center gap-1.5 text-sm text-sumi-500 hover:text-sakura-600"
      >
        <ArrowLeft className="h-4 w-4" />
        掲示板に戻る
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-sumi-800">新規投稿</h1>

      {!isAuthenticated ? (
        <div className="mt-6">
          <LoginInline note="投稿するにはGoogleログインが必要です。" />
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-sumi-700 mb-1">
              タイトル <span className="text-sakura-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: おすすめの携帯プランは？"
              className="w-full rounded-xl border border-sumi-200 px-4 py-2.5 text-sm focus:border-sakura-400 focus:outline-none focus:ring-2 focus:ring-sakura-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sumi-700 mb-1">
              本文 <span className="text-sakura-500">*</span>
            </label>
            <MarkdownEditor value={body} onChange={setBody} />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim() || !body.trim() || submitting}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-sakura px-6 py-3 text-sm font-bold text-white shadow-glow transition-all enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> 投稿中…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> 投稿する
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
