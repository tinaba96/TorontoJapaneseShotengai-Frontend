/**
 * イベント関連のAPI関数
 */

import { get, post, put, del } from "./client";
import type {
  Event,
  CreateEventRequest,
  UpdateEventRequest,
  EventListQuery,
  EventsResponse,
} from "@/app/types/event";

/**
 * イベント一覧を取得
 */
export async function getEvents(
  query?: EventListQuery
): Promise<EventsResponse> {
  return get<EventsResponse>("/events/", {
    params: query as Record<string, string | number | boolean | undefined>,
  });
}

/**
 * 特定のイベントを取得
 */
export async function getEvent(id: string): Promise<Event> {
  return get<Event>(`/events/${id}/`);
}

/**
 * 新しいイベントを作成
 * 認証が必要
 */
export async function createEvent(data: CreateEventRequest): Promise<Event> {
  return post<Event>("/events/", data, {
    requiresAuth: true,
  });
}

/**
 * イベントを更新
 * 認証が必要
 */
export async function updateEvent(
  id: string,
  data: UpdateEventRequest
): Promise<Event> {
  return put<Event>(`/events/${id}/`, data, {
    requiresAuth: true,
  });
}

/**
 * イベントを削除
 * 認証が必要
 */
export async function deleteEvent(id: string): Promise<void> {
  return del<void>(`/events/${id}/`, {
    requiresAuth: true,
  });
}

/**
 * イベントに参加登録
 * 認証が必要
 */
export async function registerForEvent(eventId: string): Promise<Event> {
  return post<Event>(`/events/${eventId}/register/`, undefined, {
    requiresAuth: true,
  });
}

/**
 * イベントの参加登録をキャンセル
 * 認証が必要
 */
export async function unregisterFromEvent(eventId: string): Promise<Event> {
  return del<Event>(`/events/${eventId}/register/`, {
    requiresAuth: true,
  });
}
