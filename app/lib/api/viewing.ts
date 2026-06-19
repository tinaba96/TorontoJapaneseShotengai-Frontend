/**
 * 内見予約関連の API 関数
 */

import { get, post, del } from "./client";
import type {
  ViewingSlot,
  ViewingBooking,
  CreateBookingRequest,
} from "@/app/types/viewing";

/** 公開: 今後の内見枠一覧（予約数つき）を取得 */
export async function getSlots(): Promise<ViewingSlot[]> {
  return get<ViewingSlot[]>("/viewing/slots");
}

/** 予約作成（ログイン必須） */
export async function createBooking(
  data: CreateBookingRequest
): Promise<ViewingBooking> {
  return post<ViewingBooking>("/viewing/bookings", data, { requiresAuth: true });
}

/** キャンセル（メールのトークンリンクから・ログイン不要） */
export async function cancelBooking(token: string): Promise<ViewingBooking> {
  return post<ViewingBooking>("/viewing/cancel", { token });
}

/** admin: 内見枠を作成 */
export async function createSlot(startsAtIso: string): Promise<ViewingSlot> {
  return post<ViewingSlot>(
    "/viewing/slots",
    { starts_at: startsAtIso },
    { requiresAuth: true }
  );
}

/** admin: 内見枠を削除（予約があると 409） */
export async function deleteSlot(id: string): Promise<void> {
  return del<void>(`/viewing/slots/${id}`, { requiresAuth: true });
}

/** admin: 予約一覧（誰がいつ来るか） */
export async function getBookings(): Promise<ViewingBooking[]> {
  return get<ViewingBooking[]>("/viewing/bookings", { requiresAuth: true });
}
