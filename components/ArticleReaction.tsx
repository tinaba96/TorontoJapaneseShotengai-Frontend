"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  getGuideReactions,
  reactToGuide,
} from "@/app/lib/api/guide-reactions";
import type { GuideReactionType } from "@/app/types/guide-reaction";

function storageKey(slug: string): string {
  return `guide_reaction_${slug}`;
}

export default function ArticleReaction({ slug }: { slug: string }) {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [hasCounts, setHasCounts] = useState(false);
  const [voted, setVoted] = useState<GuideReactionType | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // 初期表示: 既に投票済みか（localStorage）＋現在の集計を取得
  useEffect(() => {
    try {
      const v = localStorage.getItem(storageKey(slug));
      if (v === "good" || v === "bad") setVoted(v);
    } catch {
      /* localStorage 不可環境は無視 */
    }
    let active = true;
    getGuideReactions(slug)
      .then((s) => {
        if (!active) return;
        setGood(s.good);
        setBad(s.bad);
        setHasCounts(true);
      })
      .catch(() => {
        /* バックエンド未接続でもボタンは使える（集計は非表示） */
      });
    return () => {
      active = false;
    };
  }, [slug]);

  const total = good + bad;
  const goodPct = total > 0 ? Math.round((good / total) * 100) : 0;
  const badPct = total > 0 ? 100 - goodPct : 0;

  const handleVote = async (type: GuideReactionType) => {
    if (voted || submitting) return;
    setSubmitting(true);

    // 楽観的更新
    setVoted(type);
    if (type === "good") setGood((g) => g + 1);
    else setBad((b) => b + 1);
    try {
      localStorage.setItem(storageKey(slug), type);
    } catch {
      /* ignore */
    }

    // GA4 イベント（集計はGAでも追える）
    try {
      sendGAEvent("event", "guide_reaction", { article: slug, reaction: type });
    } catch {
      /* ignore */
    }

    // サーバーへ反映（失敗しても楽観値は維持）
    try {
      const s = await reactToGuide(slug, type);
      setGood(s.good);
      setBad(s.bad);
      setHasCounts(true);
    } catch {
      /* バックエンド未接続時はローカル値のまま */
    } finally {
      setSubmitting(false);
    }
  };

  const showRatio = hasCounts && total > 0;

  return (
    <div className="rounded-3xl border border-sumi-100 bg-white p-6 shadow-glow-soft">
      <p className="text-center text-sm font-semibold text-sumi-700">
        この記事は役に立ちましたか？
      </p>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => handleVote("good")}
          disabled={!!voted || submitting}
          aria-label="役に立った"
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
            voted === "good"
              ? "border-emerald-400 bg-emerald-50 text-emerald-700"
              : "border-sumi-200 text-sumi-600 enabled:hover:-translate-y-0.5 enabled:hover:border-emerald-300 enabled:hover:text-emerald-600"
          } disabled:cursor-not-allowed`}
        >
          <ThumbsUp className="h-4 w-4" />
          役に立った
        </button>
        <button
          type="button"
          onClick={() => handleVote("bad")}
          disabled={!!voted || submitting}
          aria-label="いまいち"
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
            voted === "bad"
              ? "border-rose-400 bg-rose-50 text-rose-700"
              : "border-sumi-200 text-sumi-600 enabled:hover:-translate-y-0.5 enabled:hover:border-rose-300 enabled:hover:text-rose-600"
          } disabled:cursor-not-allowed`}
        >
          <ThumbsDown className="h-4 w-4" />
          いまいち
        </button>
      </div>

      {voted && (
        <p className="mt-3 text-center text-xs text-sumi-400">
          ご協力ありがとうございます。
        </p>
      )}

      {showRatio && (
        <div className="mt-5">
          <div className="flex h-2.5 overflow-hidden rounded-full bg-sumi-100">
            <div
              className="bg-emerald-400"
              style={{ width: `${goodPct}%` }}
            />
            <div className="bg-rose-300" style={{ width: `${badPct}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-sumi-400">
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <ThumbsUp className="h-3 w-3" />
              {goodPct}%
            </span>
            <span className="text-sumi-300">{total}件の反応</span>
            <span className="inline-flex items-center gap-1 text-rose-500">
              {badPct}%
              <ThumbsDown className="h-3 w-3" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
