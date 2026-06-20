/**
 * 内見予約関連の API 関数
 */

import { get, post, del } from "./client";
import type {
  AvailabilitySlot,
  AvailabilityWindow,
  ViewingBooking,
  CreateBookingRequest,
} from "@/app/types/viewing";

/** 公開: 期間から生成された30分スロット一覧（予約数つき） */
export async function getSlots(): Promise<AvailabilitySlot[]> {
  return get<AvailabilitySlot[]>("/viewing/slots");
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

/** admin: 内見可能な期間を登録 */
export async function createWindow(
  startsAtIso: string,
  endsAtIso: string
): Promise<AvailabilityWindow> {
  return post<AvailabilityWindow>(
    "/viewing/windows",
    { starts_at: startsAtIso, ends_at: endsAtIso },
    { requiresAuth: true }
  );
}

/** admin: 期間一覧 */
export async function getWindows(): Promise<AvailabilityWindow[]> {
  return get<AvailabilityWindow[]>("/viewing/windows", { requiresAuth: true });
}

/** admin: 期間を削除（範囲内に予約があると 409） */
export async function deleteWindow(id: string): Promise<void> {
  return del<void>(`/viewing/windows/${id}`, { requiresAuth: true });
}

/** admin: 予約一覧（誰がいつ来るか） */
export async function getBookings(): Promise<ViewingBooking[]> {
  return get<ViewingBooking[]>("/viewing/bookings", { requiresAuth: true });
}

/** admin: 予約者へ内見の住所をメール送信 */
export async function sendAddress(bookingId: string): Promise<ViewingBooking> {
  return post<ViewingBooking>(
    `/viewing/bookings/${bookingId}/send-address`,
    undefined,
    { requiresAuth: true }
  );
}
