"use client";

import { useEffect, useMemo, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { CalendarCheck, Check, Loader2, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { getSlots, createBooking } from "@/app/lib/api/viewing";
import type { AvailabilitySlot } from "@/app/types/viewing";
import { ApiError } from "@/app/lib/api/client";

function formatDay(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const end = new Date(d.getTime() + 30 * 60 * 1000);
  const fmt = (x: Date) =>
    x.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
  return `${fmt(d)}–${fmt(end)}`;
}

export default function BookingWidget() {
  const { isAuthenticated, user, loginWithGoogle, logout } = useAuth();

  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  // 選択中の枠は starts_at(ISO) で識別する
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  const loadSlots = async () => {
    try {
      setLoadingSlots(true);
      setSlotsError(null);
      const data = await getSlots();
      setSlots(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setSlots([]);
      } else {
        setSlotsError("内見枠の読み込みに失敗しました。時間をおいて再度お試しください。");
      }
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    loadSlots();
  }, []);

  const slotsByDay = useMemo(() => {
    const map = new Map<string, AvailabilitySlot[]>();
    for (const s of slots) {
      const day = formatDay(s.starts_at);
      if (!map.has(day)) map.set(day, []);
      map.get(day)!.push(s);
    }
    return Array.from(map.entries());
  }, [slots]);

  const handleSubmit = async () => {
    if (!selectedSlot || !user) return;
    try {
      setSubmitting(true);
      setSubmitError(null);
      await createBooking({
        starts_at: selectedSlot,
        name: name.trim() || user.name,
        email: user.email,
        phone: phone.trim() || undefined,
      });
      setDone(true);
    } catch (err) {
      if (err instanceof ApiError && err.status === 400) {
        setSubmitError(
          "すでに有効な予約があります。先に既存の予約をキャンセルしてから、別の時間をご予約ください。"
        );
      } else {
        setSubmitError("予約に失敗しました。時間をおいて再度お試しください。");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // --- 完了 ---------------------------------------------------------------
  if (done) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 text-center sm:p-8">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-sumi-800">
          内見のご予約を受け付けました
        </h3>
        <p className="mt-2 text-sm text-sumi-600">
          確認メールを <span className="font-semibold">{user?.email}</span> に送信しました。
          <br />
          キャンセルはメール内のリンクからいつでも可能です。
        </p>
      </div>
    );
  }

  // --- 未ログイン ---------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="rounded-3xl border border-sumi-100 bg-white p-6 shadow-glow-soft sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-sumi-700">
          <CalendarCheck className="h-5 w-5 text-sakura-500" />
          内見を予約する
        </div>
        <p className="mt-3 text-sm text-sumi-500">
          Googleアカウントでログインすると、内見の予約ができます。
          お名前とメールアドレスは自動で取得されます。
        </p>
        <div className="mt-5 flex justify-center">
          <GoogleLogin
            onSuccess={async (cred) => {
              setAuthError(null);
              if (!cred.credential) {
                setAuthError("Googleログインに失敗しました。");
                return;
              }
              try {
                await loginWithGoogle(cred.credential);
              } catch {
                setAuthError("ログインに失敗しました。時間をおいて再度お試しください。");
              }
            }}
            onError={() => setAuthError("Googleログインに失敗しました。")}
          />
        </div>
        {authError && (
          <p className="mt-3 text-center text-sm text-red-600">{authError}</p>
        )}
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-sumi-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          ログインは予約のためだけに使用します。
        </p>
      </div>
    );
  }

  // --- ログイン済み：枠選択＋フォーム ------------------------------------
  return (
    <div className="rounded-3xl border border-sumi-100 bg-white p-6 shadow-glow-soft sm:p-8">
      <div className="flex items-center gap-2 text-sm font-semibold text-sumi-700">
        <CalendarCheck className="h-5 w-5 text-sakura-500" />
        内見を予約する
      </div>

      <div className="mt-2 flex items-center justify-between gap-2 text-xs text-sumi-400">
        <span className="truncate">ログイン中: {user?.email}</span>
        <button
          type="button"
          onClick={logout}
          className="inline-flex flex-shrink-0 items-center gap-1 text-sumi-400 hover:text-sakura-600"
        >
          <LogOut className="h-3.5 w-3.5" />
          ログアウト
        </button>
      </div>

      {/* 枠選択 */}
      <div className="mt-5">
        <p className="text-sm font-medium text-sumi-700 mb-2">希望の時間枠（30分）</p>

        {loadingSlots && (
          <div className="flex items-center gap-2 text-sm text-sumi-400 py-6">
            <Loader2 className="h-4 w-4 animate-spin" />
            空き枠を読み込み中…
          </div>
        )}

        {slotsError && !loadingSlots && (
          <p className="text-sm text-red-600 py-4">{slotsError}</p>
        )}

        {!loadingSlots && !slotsError && slots.length === 0 && (
          <p className="text-sm text-sumi-500 py-4">
            現在予約可能な枠がありません。近日中に追加されます。
          </p>
        )}

        <div className="space-y-4">
          {slotsByDay.map(([day, daySlots]) => (
            <div key={day}>
              <p className="text-xs font-semibold text-sumi-500 mb-1.5">{day}</p>
              <div className="flex flex-wrap gap-2">
                {daySlots.map((s) => {
                  const active = selectedSlot === s.starts_at;
                  return (
                    <button
                      key={s.starts_at}
                      type="button"
                      onClick={() => setSelectedSlot(s.starts_at)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all ${
                        active
                          ? "border-sakura-500 bg-sakura-50 text-sakura-700 font-semibold shadow-sm"
                          : "border-sumi-200 text-sumi-600 hover:border-sakura-300 hover:bg-sakura-50/50"
                      }`}
                    >
                      {formatTime(s.starts_at)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* フォーム */}
      <div className="mt-6 space-y-4">
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
            メールアドレス
          </label>
          <input
            type="email"
            value={user?.email ?? ""}
            readOnly
            className="w-full rounded-xl border border-sumi-100 bg-sumi-50 px-4 py-2.5 text-sm text-sumi-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-sumi-700 mb-1">
            電話番号 <span className="text-sumi-400">(任意)</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-sumi-200 px-4 py-2.5 text-sm focus:border-sakura-400 focus:outline-none focus:ring-2 focus:ring-sakura-100"
            placeholder="+1 416 ..."
          />
        </div>
      </div>

      {submitError && (
        <p className="mt-4 text-sm text-red-600">{submitError}</p>
      )}

      <button
        type="button"
        disabled={!selectedSlot || submitting || !name.trim()}
        onClick={handleSubmit}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-sakura px-6 py-3 text-sm font-bold text-white shadow-glow transition-all enabled:hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            送信中…
          </>
        ) : (
          <>
            <CalendarCheck className="h-4 w-4" />
            この時間で予約する
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-sumi-400">
        ご予約はお一人さま1件まで。変更したい場合は確認メールからキャンセルできます。
      </p>
    </div>
  );
}
