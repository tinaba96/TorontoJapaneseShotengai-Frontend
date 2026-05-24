"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Users,
  Plus,
  ArrowUpRight,
  Sparkles,
  Calendar as CalendarIcon,
} from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <main className="flex-grow">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-gradient-sumi text-washi-50">
          <div className="pointer-events-none absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-sakura-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-20 h-[32rem] w-[32rem] rounded-full bg-gold-500/20 blur-3xl" />
          <div className="divider-gold" />
          <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-24">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-washi-100/60">
              <span className="h-1.5 w-1.5 rounded-full bg-sakura-400 animate-pulse" />
              Events · 開催情報
            </div>
            <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <h1 className="font-display font-black leading-[0.95] tracking-tight text-balance text-5xl md:text-7xl lg:text-8xl">
                <span className="text-gradient-aurora">Events</span>{" "}
                <span className="italic text-gradient-gold">&amp; Vibes.</span>
              </h1>
              <Link
                href="/create"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-sakura px-6 py-3 text-sm font-bold text-white shadow-glow btn-glow transition-all hover:-translate-y-0.5 self-start md:self-end"
              >
                <Plus className="h-4 w-4" />
                イベントを作成
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
              </Link>
            </div>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-washi-100/80">
              トロントの日本コミュニティで、いま動いていること。
              次の週末の予定は、ここから。
            </p>
          </div>
          <div className="divider-gold" />
        </section>

        {/* LIST */}
        <section className="relative py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {isLoading && (
              <div className="flex justify-center py-20">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-2 border-sakura-100" />
                  <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-transparent border-t-sakura-500 animate-spin" />
                </div>
              </div>
            )}

            {error && !isLoading && (
              <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-red-50/70 backdrop-blur p-8 text-center">
                <p className="text-red-700 font-semibold mb-2">エラー</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {!isLoading && !error && events.length === 0 && (
              <div className="mx-auto max-w-xl text-center py-12">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-sakura-50 to-gold-50 ring-1 ring-gold-200/50 shadow-glow-soft">
                  <CalendarIcon className="h-9 w-9 text-gold-500" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-sumi-800">
                  まだイベントがありません
                </h3>
                <p className="mt-2 text-sm text-sumi-500">
                  最初のイベントを、あなたの手で。
                </p>
                <Link
                  href="/create"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-sakura px-6 py-3 text-sm font-bold text-white shadow-glow"
                >
                  <Plus className="h-4 w-4" />
                  イベントを作成
                </Link>
              </div>
            )}

            {!isLoading && !error && events.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, idx) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                    className="group relative overflow-hidden rounded-3xl bg-white border border-sumi-100 shadow-glow-soft transition-all duration-500 hover:shadow-elegant hover:-translate-y-1 hover:border-sakura-200 animate-fade-in-up"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src="/images/default.png"
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/60 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-gradient-sakura px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
                        <Sparkles className="h-3 w-3" />
                        {event.status === "upcoming" ? "開催予定" : event.status}
                      </div>

                      {event.maxAttendees && (
                        <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-sumi-800 ring-1 ring-sumi-100">
                          <Users className="h-3 w-3 text-gold-500" />
                          {event.current_attendees}/{event.maxAttendees}
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-sumi-800 group-hover:text-sakura-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {event.title}
                      </h3>

                      <div className="mt-4 space-y-2 text-sm text-sumi-500">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-gold-500 shrink-0" />
                          <span>
                            {event.eventDate} {event.eventTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-sakura-500 shrink-0" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-sumi-400">
                          Read more
                        </span>
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-sumi-50 text-sumi-600 transition-all group-hover:bg-gradient-sakura group-hover:text-white group-hover:rotate-45">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
