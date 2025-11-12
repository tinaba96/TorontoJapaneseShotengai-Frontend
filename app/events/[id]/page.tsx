"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Mail,
  Phone,
} from "lucide-react";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import { getEvent } from "@/app/lib/api/events";
import type { Event } from "@/app/types/event";

export default function EventDetail() {
  const params = useParams();
  const id = params.id as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getEvent(id);
        setEvent(data);
      } catch (err) {
        console.error("Failed to fetch event:", err);
        setError("イベントの読み込みに失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {error || "イベントが見つかりません"}
            </h1>
            <Link href="/events" className="text-blue-600 hover:underline">
              イベント一覧に戻る
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 戻るボタン */}
        <Link
          href="/events"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          イベント一覧に戻る
        </Link>

        {/* イベント詳細 */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* ヘッダー画像 */}
          <div className="relative h-64 md:h-96">
            <Image
              src="/images/default.png"
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full mb-2">
                  {event.status === "upcoming"
                    ? "開催予定"
                    : event.status === "ongoing"
                      ? "開催中"
                      : event.status === "completed"
                        ? "終了"
                        : event.status}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {event.title}
                </h1>
              </div>
            </div>
          </div>

          {/* イベント情報 */}
          <div className="p-6">
            {/* 基本情報 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                  <div>
                    <p className="font-medium">日時</p>
                    <p>
                      {event.eventDate} {event.eventTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                  <div>
                    <p className="font-medium">場所</p>
                    <p>{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3 text-blue-500" />
                  <div>
                    <p className="font-medium">主催</p>
                    <p>{event.organizer}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {event.maxAttendees && (
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-blue-500" />
                    <div>
                      <p className="font-medium">定員</p>
                      <p>
                        {event.current_attendees}/{event.maxAttendees}名
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-blue-500" />
                  <div>
                    <p className="font-medium">メール</p>
                    <a
                      href={`mailto:${event.contactEmail}`}
                      className="text-blue-600 hover:underline"
                    >
                      {event.contactEmail}
                    </a>
                  </div>
                </div>
                {event.contactPhone && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3 text-blue-500" />
                    <div>
                      <p className="font-medium">電話</p>
                      <a
                        href={`tel:${event.contactPhone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {event.contactPhone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* イベント説明 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                イベント詳細
              </h3>
              <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </div>
            </div>

            {/* 作成日時 */}
            <div className="border-t pt-6 text-sm text-gray-500">
              <p>
                作成日: {new Date(event.created_at).toLocaleString("ja-JP")}
              </p>
              <p>
                更新日: {new Date(event.updated_at).toLocaleString("ja-JP")}
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
