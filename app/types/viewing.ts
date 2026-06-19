/**
 * 内見予約（viewing reservation）関連の型定義
 */

// 公開: 期間から自動生成される30分スロット
export interface AvailabilitySlot {
  starts_at: string; // ISO 8601 (UTC)
  booking_count: number;
}

// admin: 内見可能な期間（この範囲の30分が選べる）
export interface AvailabilityWindow {
  id: string;
  starts_at: string; // ISO 8601 (UTC)
  ends_at: string; // ISO 8601 (UTC)
  created_at: string;
}

export interface ViewingBooking {
  id: string;
  starts_at?: string;
  name: string;
  email: string;
  phone?: string;
  status: string; // "active" | "cancelled"
  created_at: string;
}

export interface CreateBookingRequest {
  starts_at: string;
  name: string;
  email: string;
  phone?: string;
}

export interface CreateWindowRequest {
  starts_at: string;
  ends_at: string;
}
