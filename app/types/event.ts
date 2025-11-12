/**
 * イベント関連の型定義
 */

// イベント作成リクエストの型
export interface CreateEventRequest {
  title: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  eventDate: string; // ISO 8601形式 (YYYY-MM-DD)
  eventTime: string; // HH:MM形式
  venue: string;
  organizer: string;
  maxAttendees?: number;
}

// イベントレスポンスの型
export interface Event {
  id: string; // UUIDを使用
  title: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  organizer: string;
  maxAttendees?: number;
  creator_id: string; // 作成者のユーザーID (UUID)
  current_attendees: number;
  status: string; // upcoming, ongoing, completed など
  created_at: string;
  updated_at: string;
}

// イベント更新リクエストの型
export interface UpdateEventRequest {
  title?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  eventDate?: string;
  eventTime?: string;
  venue?: string;
  organizer?: string;
  maxAttendees?: number;
}

// イベント一覧取得のクエリパラメータ
export interface EventListQuery {
  page?: number;
  limit?: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  organizer?: string;
}

// ページネーション付きイベント一覧レスポンス
// バックエンドは現在配列のみを返すため、シンプルな型を使用
export type EventsResponse = Event[];
