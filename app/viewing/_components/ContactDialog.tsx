"use client";

import { useEffect, useState } from "react";
import { MessageSquarePlus, X, Check, Loader2 } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import { useAuth } from "@/app/contexts/AuthContext";
import { sendContact } from "@/app/lib/api/contact";

/**
 * 「質問する」ボタン＋モーダルフォーム。
 * ログイン不要。送信すると admin にメール＋送信者へ自動返信。
 */
export default function ContactDialog() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ログイン中なら初期値を補完
  useEffect(() => {
    if (user?.name) setName((n) => n || user.name);
    if (user?.email) setEmail((e) => e || user.email);
  }, [user?.name, user?.email]);

  // モーダル表示中は背面スクロール抑止
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const reset = () => {
    setDone(false);
    setError(null);
    setMessage("");
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    try {
      setSubmitting(true);
      setError(null);
      await sendContact({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setDone(true);
      sendGAEvent("event", "contact_submit");
    } catch {
      setError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* trigger */}
      <button
        type="button"
        onClick={() => {
          reset();
          setOpen(true);
          sendGAEvent("event", "contact_open");
        }}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-sumi-200 bg-white px-5 py-3 text-sm font-semibold text-sumi-700 transition-all hover:border-sakura-300 hover:text-sakura-600"
      >
        <MessageSquarePlus className="h-4 w-4" />
        質問する（予約前でもOK）
      </button>

      {/* modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-sumi-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-3xl border border-sumi-100 bg-white p-6 shadow-glow">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-sumi-400 hover:bg-sumi-50"
              aria-label="閉じる"
            >
              <X className="h-4 w-4" />
            </button>

            {done ? (
              <div className="py-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-sumi-800">
                  送信しました
                </h3>
                <p className="mt-2 text-sm text-sumi-600">
                  確認メールを {email} に送りました。
                  <br />
                  1営業日以内にご返信します。
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-5 rounded-full bg-gradient-sakura px-6 py-2.5 text-sm font-bold text-white shadow-glow"
                >
                  閉じる
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-bold text-sumi-800">
                  質問する
                </h3>
                <p className="mt-1 text-xs text-sumi-500">
                  物件・内見・生活のことなど、お気軽にどうぞ。
                </p>

                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-sumi-700 mb-1">
                      お名前 <span className="text-sakura-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-sumi-200 px-4 py-2.5 text-sm focus:border-sakura-400 focus:outline-none focus:ring-2 focus:ring-sakura-100"
                      placeholder="山田 太郎"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sumi-700 mb-1">
                      メールアドレス <span className="text-sakura-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-sumi-200 px-4 py-2.5 text-sm focus:border-sakura-400 focus:outline-none focus:ring-2 focus:ring-sakura-100"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sumi-700 mb-1">
                      お問い合わせ内容 <span className="text-sakura-500">*</span>
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full resize-y rounded-xl border border-sumi-200 px-4 py-2.5 text-sm focus:border-sakura-400 focus:outline-none focus:ring-2 focus:ring-sakura-100"
                      placeholder="例: 内見はオンラインでも可能ですか？ 入居可能日はいつですか？"
                    />
                  </div>
                </div>

                {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={
                    !name.trim() || !email.trim() || !message.trim() || submitting
                  }
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-sakura px-6 py-3 text-sm font-bold text-white shadow-glow transition-all enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> 送信中…
                    </>
                  ) : (
                    "送信する"
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
