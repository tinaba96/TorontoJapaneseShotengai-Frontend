/**
 * 内見予約（viewing reservation）関連の型定義
 */

export interface ViewingSlot {
  id: string;
  starts_at: string; // ISO 8601 (UTC)
  booking_count: number;
  created_at: string;
}

export interface ViewingBooking {
  id: string;
  slot_id: string;
  starts_at?: string;
  name: string;
  email: string;
  phone?: string;
  status: string; // "active" | "cancelled"
  created_at: string;
}

export interface CreateBookingRequest {
  slot_id: string;
  name: string;
  email: string;
  phone?: string;
}
