"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Send, Trash2 } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  getPost,
  deletePost,
  addComment,
  deleteComment,
  reactPost,
  reactComment,
} from "@/app/lib/api/board";
import type { BoardPostDetail, CommentOut } from "@/app/types/board";
import { ApiError } from "@/app/lib/api/client";
import MarkdownView from "../_components/MarkdownView";
import MarkdownEditor from "../_components/MarkdownEditor";
import ReactionBar from "../_components/ReactionBar";
import LoginInline from "../_components/LoginInline";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BoardPostPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [post, setPost] = useState<BoardPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [comment, setComment] = useState("");
  const [commentNick, setCommentNick] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("board_nickname");
    if (saved) setCommentNick(saved);
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      setPost(await getPost(id));
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setError("この投稿は見つかりませんでした。");
      } else {
        setError("読み込みに失敗しました。");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // re-fetch after login so my_reactions / can_delete reflect the user
  useEffect(() => {
    if (isAuthenticated && post) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleReactPost = async (emoji: string) => {
    if (!post || !isAuthenticated) return;
    try {
      const state = await reactPost(post.id, emoji);
      setPost({ ...post, reactions: state.reactions, my_reactions: state.my_reactions });
    } catch {
      /* ignore */
    }
  };

  const handleReactComment = async (commentId: string, emoji: string) => {
    if (!post || !isAuthenticated) return;
    try {
      const state = await reactComment(commentId, emoji);
      setPost({
        ...post,
        comments: post.comments.map((c) =>
          c.id === commentId
            ? { ...c, reactions: state.reactions, my_reactions: state.my_reactions }
            : c
        ),
      });
    } catch {
      /* ignore */
    }
  };

  const handleAddComment = async () => {
    if (!post || !comment.trim()) return;
    try {
      setSubmitting(true);
      const nick = commentNick.trim();
      if (nick) localStorage.setItem("board_nickname", nick);
      const created = await addComment(post.id, comment.trim(), nick || undefined);
      setPost({ ...post, comments: [...post.comments, created] });
      setComment("");
    } catch {
      /* ignore */
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePost = async () => {
    if (!post) return;
    if (!confirm("この投稿を削除しますか？")) return;
    try {
      await deletePost(post.id);
      router.push("/board");
    } catch {
      /* ignore */
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!post) return;
    if (!confirm("このコメントを削除しますか？")) return;
    try {
      await deleteComment(commentId);
      setPost({ ...post, comments: post.comments.filter((c) => c.id !== commentId) });
    } catch {
      /* ignore */
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center gap-2 text-sm text-sumi-400">
        <Loader2 className="h-4 w-4 animate-spin" /> 読み込み中…
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-sm text-sumi-600">{error ?? "投稿が見つかりません。"}</p>
        <Link href="/board" className="mt-4 inline-block text-sm text-sakura-600 hover:underline">
          掲示板に戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 max-w-3xl">
      <Link
        href="/board"
        className="inline-flex items-center gap-1.5 text-sm text-sumi-500 hover:text-sakura-600"
      >
        <ArrowLeft className="h-4 w-4" />
        掲示板に戻る
      </Link>

      {/* Post */}
      <article className="mt-4 rounded-3xl border border-sumi-100 bg-white p-6 lg:p-8 shadow-glow-soft">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-display text-2xl font-bold text-sumi-800">{post.title}</h1>
          {post.can_delete && (
            <button
              type="button"
              onClick={handleDeletePost}
              title="投稿を削除"
              className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sumi-400 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="mt-1 flex items-center gap-3 text-xs text-sumi-400">
          <span>{post.author_name}</span>
          <span>{formatDate(post.created_at)}</span>
        </div>

        <div className="mt-5">
          <MarkdownView>{post.body}</MarkdownView>
        </div>

        <div className="mt-6">
          <ReactionBar
            reactions={post.reactions}
            myReactions={post.my_reactions}
            onToggle={handleReactPost}
            disabled={!isAuthenticated}
          />
          {!isAuthenticated && (
            <p className="mt-2 text-xs text-sumi-400">
              リアクションするにはログインしてください。
            </p>
          )}
        </div>
      </article>

      {/* Comments */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-bold text-sumi-800">
          コメント（{post.comments.length}）
        </h2>

        <div className="mt-4 space-y-3">
          {post.comments.map((c: CommentOut) => (
            <div key={c.id} className="rounded-2xl border border-sumi-100 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-sumi-400">
                  <span className="font-medium text-sumi-600">{c.author_name}</span>
                  <span>{formatDate(c.created_at)}</span>
                </div>
                {c.can_delete && (
                  <button
                    type="button"
                    onClick={() => handleDeleteComment(c.id)}
                    title="コメントを削除"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sumi-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="mt-2">
                <MarkdownView>{c.body}</MarkdownView>
              </div>
              <div className="mt-3">
                <ReactionBar
                  reactions={c.reactions}
                  myReactions={c.my_reactions}
                  onToggle={(emoji) => handleReactComment(c.id, emoji)}
                  disabled={!isAuthenticated}
                />
              </div>
            </div>
          ))}
          {post.comments.length === 0 && (
            <p className="text-sm text-sumi-400">まだコメントはありません。</p>
          )}
        </div>

        {/* Comment form */}
        <div className="mt-6">
          {isAuthenticated ? (
            <div className="space-y-3">
              <input
                type="text"
                value={commentNick}
                onChange={(e) => setCommentNick(e.target.value)}
                placeholder="表示名（空欄なら「匿名」）"
                className="w-full rounded-xl border border-sumi-200 px-4 py-2.5 text-sm focus:border-sakura-400 focus:outline-none focus:ring-2 focus:ring-sakura-100"
              />
              <MarkdownEditor
                value={comment}
                onChange={setComment}
                placeholder="コメントを書く（マークダウン・絵文字OK 😊）"
                minHeight={120}
              />
              <button
                type="button"
                onClick={handleAddComment}
                disabled={!comment.trim() || submitting}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-sakura px-5 py-2.5 text-sm font-bold text-white shadow-glow transition-all enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> 送信中…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> コメントする
                  </>
                )}
              </button>
            </div>
          ) : (
            <LoginInline note="コメントするにはGoogleログインが必要です。" />
          )}
        </div>
      </section>
    </div>
  );
}
