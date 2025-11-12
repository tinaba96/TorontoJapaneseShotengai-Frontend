"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { getEvents } from "@/app/lib/api/events";
import type { Event } from "@/app/types/event";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);

        // 404エラー（イベントなし）の場合は空の配列として扱う
        if (
          err &&
          typeof err === "object" &&
          "status" in err &&
          err.status === 404
        ) {
          setEvents([]);
          setError(null);
          return;
        }

        // その他のエラーメッセージの詳細を表示
        let errorMessage = "イベントの読み込みに失敗しました";
        if (err && typeof err === "object") {
          const error = err as {
            status?: number;
            data?: { message?: string; detail?: string };
            message?: string;
          };
          if (error.data?.message) {
            errorMessage += `: ${error.data.message}`;
          } else if (error.data?.detail) {
            errorMessage += `: ${error.data.detail}`;
          } else if (error.message) {
            errorMessage += `: ${error.message}`;
          }
        }

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">イベント一覧</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* ローディング状態 */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* エラー状態 */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-semibold mb-2">エラー</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* データなし状態 */}
        {!isLoading && !error && events.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              イベントがありません
            </h3>
            <p className="text-gray-600 mb-6">
              現在表示できるイベントがありません
            </p>
            <Link
              href="/create"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              イベントを作成
            </Link>
          </div>
        )}

        {/* イベント一覧 */}
        {!isLoading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              >
                <div className="relative">
                  <Image
                    src="/images/default.png"
                    alt={event.title}
                    width={300}
                    height={200}
                    className="w-full object-cover h-48 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {event.eventDate} {event.eventTime}
                  </p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.venue}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {event.status === "upcoming" ? "開催予定" : event.status}
                    </span>
                    {event.maxAttendees && (
                      <span className="text-xs text-gray-500">
                        {event.current_attendees}/{event.maxAttendees}名
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
