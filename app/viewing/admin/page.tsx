"use client";

import { useCallback, useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { CalendarPlus, Loader2, Trash2, Users, Lock } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  getSlots,
  createSlot,
  deleteSlot,
  getBookings,
} from "@/app/lib/api/viewing";
import type { ViewingSlot, ViewingBooking } from "@/app/types/viewing";
import { ApiError } from "@/app/lib/api/client";

function formatDateTime(iso?: string): string {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("ja-JP", {
    month: "short",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const { isAuthenticated, isAdmin, user, loginWithGoogle } = useAuth();

  const [slots, setSlots] = useState<ViewingSlot[]>([]);
  const [bookings, setBookings] = useState<ViewingBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newSlot, setNewSlot] = useState("");
  const [creating, setCreating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [s, b] = await Promise.all([getSlots(), getBookings()]);
      setSlots(s);
      setBookings(b);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setSlots([]);
        setBookings([]);
      } else {
        setError("データの読み込みに失敗しました。");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && isAdmin) loadAll();
  }, [isAuthenticated, isAdmin, loadAll]);

  const handleCreate = async () => {
    if (!newSlot) return;
    try {
      setCreating(true);
      setError(null);
      const iso = new Date(newSlot).toISOString();
      await createSlot(iso);
      setNewSlot("");
      await loadAll();
    } catch {
      setError("枠の作成に失敗しました。");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (slot: ViewingSlot) => {
    if (slot.booking_count > 0) return;
    try {
      await deleteSlot(slot.id);
      await loadAll();
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setError("予約が入っている枠は削除できません。");
      } else {
        setError("枠の削除に失敗しました。");
      }
    }
  };

  // --- 未ログイン ---------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-sm rounded-3xl border border-sumi-100 bg-white p-8 text-center shadow-glow-soft">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-sumi-100 text-sumi-500">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-4 font-display text-xl font-bold text-sumi-800">
            管理画面
          </h1>
          <p className="mt-2 text-sm text-sumi-500">
            管理者のGoogleアカウントでログインしてください。
          </p>
          <div className="mt-5 flex justify-center">
            <GoogleLogin
              onSuccess={async (cred) => {
                setAuthError(null);
                if (!cred.credential) return;
                try {
                  await loginWithGoogle(cred.credential);
                } catch {
                  setAuthError("ログインに失敗しました。");
                }
              }}
              onError={() => setAuthError("Googleログインに失敗しました。")}
            />
          </div>
          {authError && (
            <p className="mt-3 text-sm text-red-600">{authError}</p>
          )}
        </div>
      </div>
    );
  }

  // --- ログイン済みだが管理者でない --------------------------------------
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-sm rounded-3xl border border-red-100 bg-red-50/60 p-8 text-center">
          <p className="text-sm text-red-700">
            このアカウント（{user?.email}）には管理者権限がありません。
          </p>
        </div>
      </div>
    );
  }

  // --- 管理者ダッシュボード ----------------------------------------------
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-sumi-800">
          内見管理
        </h1>
        <span className="text-xs text-sumi-400">{user?.email}</span>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 枠管理 */}
        <section>
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-sumi-800">
            <CalendarPlus className="h-5 w-5 text-sakura-500" />
            内見枠（30分）
          </h2>

          <div className="mt-4 flex flex-wrap items-end gap-3 rounded-2xl border border-sumi-100 bg-white p-4">
            <div>
              <label className="block text-xs font-medium text-sumi-500 mb-1">
                開始日時を追加
              </label>
              <input
                type="datetime-local"
                value={newSlot}
                onChange={(e) => setNewSlot(e.target.value)}
                className="rounded-xl border border-sumi-200 px-3 py-2 text-sm focus:border-sakura-400 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleCreate}
              disabled={!newSlot || creating}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-sakura px-4 py-2 text-sm font-bold text-white shadow-glow disabled:opacity-40"
            >
              {creating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CalendarPlus className="h-4 w-4" />
              )}
              追加
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {loading && (
              <div className="flex items-center gap-2 py-4 text-sm text-sumi-400">
                <Loader2 className="h-4 w-4 animate-spin" /> 読み込み中…
              </div>
            )}
            {!loading && slots.length === 0 && (
              <p className="py-4 text-sm text-sumi-500">枠がありません。</p>
            )}
            {slots.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-xl border border-sumi-100 bg-white px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-sumi-800">
                    {formatDateTime(s.starts_at)}
                  </p>
                  <p className="text-xs text-sumi-400">
                    予約 {s.booking_count} 件
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(s)}
                  disabled={s.booking_count > 0}
                  title={
                    s.booking_count > 0
                      ? "予約が入っている枠は削除できません"
                      : "削除"
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-sumi-400 transition-colors enabled:hover:bg-red-50 enabled:hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 予約一覧 */}
        <section>
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-sumi-800">
            <Users className="h-5 w-5 text-sakura-500" />
            予約一覧（誰が来るか）
          </h2>

          <div className="mt-4 overflow-hidden rounded-2xl border border-sumi-100 bg-white">
            {!loading && bookings.length === 0 && (
              <p className="px-4 py-6 text-sm text-sumi-500">
                まだ予約はありません。
              </p>
            )}
            {bookings.length > 0 && (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sumi-100 text-left text-xs text-sumi-400">
                    <th className="px-4 py-2 font-medium">日時</th>
                    <th className="px-4 py-2 font-medium">名前</th>
                    <th className="px-4 py-2 font-medium">連絡先</th>
                    <th className="px-4 py-2 font-medium">状態</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b border-sumi-50 last:border-0"
                    >
                      <td className="px-4 py-3 text-sumi-700">
                        {formatDateTime(b.starts_at)}
                      </td>
                      <td className="px-4 py-3 text-sumi-800 font-medium">
                        {b.name}
                      </td>
                      <td className="px-4 py-3 text-sumi-600">
                        <div>{b.email}</div>
                        {b.phone && (
                          <div className="text-xs text-sumi-400">{b.phone}</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            b.status === "active"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-sumi-100 text-sumi-400 line-through"
                          }`}
                        >
                          {b.status === "active" ? "予約中" : "キャンセル"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
