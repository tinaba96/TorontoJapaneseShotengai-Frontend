"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Loader2, XCircle } from "lucide-react";
import { cancelBooking } from "@/app/lib/api/viewing";
import { ApiError } from "@/app/lib/api/client";

function CancelInner() {
  const params = useSearchParams();
  const token = params.get("token");

  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    if (!token) return;
    try {
      setState("loading");
      await cancelBooking(token);
      setState("done");
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setError("この予約は見つかりませんでした。すでにキャンセル済みの可能性があります。");
      } else {
        setError("キャンセルに失敗しました。時間をおいて再度お試しください。");
      }
      setState("error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-md rounded-3xl border border-sumi-100 bg-white p-8 text-center shadow-glow-soft">
        {!token && (
          <p className="text-sm text-sumi-600">
            キャンセル用のリンクが正しくありません。確認メール内のリンクからお試しください。
          </p>
        )}

        {token && state === "idle" && (
          <>
            <h1 className="font-display text-2xl font-bold text-sumi-800">
              内見予約のキャンセル
            </h1>
            <p className="mt-3 text-sm text-sumi-600">
              この内見予約をキャンセルしますか？
            </p>
            <button
              type="button"
              onClick={handleCancel}
              className="mt-6 w-full rounded-full bg-sumi-800 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-sumi-900"
            >
              予約をキャンセルする
            </button>
            <Link
              href="/viewing"
              className="mt-3 inline-block text-xs text-sumi-400 hover:text-sumi-600"
            >
              やめる（物件ページに戻る）
            </Link>
          </>
        )}

        {state === "loading" && (
          <div className="flex items-center justify-center gap-2 py-6 text-sm text-sumi-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            キャンセル処理中…
          </div>
        )}

        {state === "done" && (
          <>
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white">
              <Check className="h-7 w-7" />
            </div>
            <h1 className="mt-5 font-display text-2xl font-bold text-sumi-800">
              キャンセルしました
            </h1>
            <p className="mt-2 text-sm text-sumi-600">
              またのご予約をお待ちしています。
            </p>
            <Link
              href="/viewing"
              className="mt-6 inline-block rounded-full bg-gradient-sakura px-6 py-3 text-sm font-bold text-white shadow-glow"
            >
              物件ページに戻る
            </Link>
          </>
        )}

        {state === "error" && (
          <>
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-100 text-red-500">
              <XCircle className="h-7 w-7" />
            </div>
            <p className="mt-5 text-sm text-sumi-600">{error}</p>
            <Link
              href="/viewing"
              className="mt-6 inline-block text-sm text-sumi-500 hover:text-sumi-700"
            >
              物件ページに戻る
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function CancelPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-sumi-400">読み込み中…</div>}>
      <CancelInner />
    </Suspense>
  );
}
