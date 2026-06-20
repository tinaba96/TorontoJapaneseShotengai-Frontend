"use client";

import Link from "next/link";
import Image from "next/image";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { MessagesSquare, BookOpen } from "lucide-react";

/**
 * 内見予約セクション専用レイアウト。
 * 既存の共通ヘッダー（商店街/MAP/フリマ 等のナビ）は意図的に使わず、
 * このセクションだけの軽いヘッダー/フッターにする＝既存アプリに影響なし。
 */

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default function ViewingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex flex-col bg-washi-50">
        <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-sumi-100/30">
          <div className="divider-gold" />
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <Link
                href="/viewing"
                className="flex items-center gap-3"
                aria-label="Toronto Japanese — Rentals"
              >
                <div className="relative h-10 w-10 rounded-full ring-1 ring-gold-300/60 bg-white p-1 shadow-sm">
                  <Image
                    src="/images/tjs.png"
                    alt="Toronto Japanese"
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-base font-bold text-sumi-700 tracking-wide">
                    Toronto Japanese
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-semibold">
                    Rentals · 賃貸
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  href="/guide"
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold-300/70 bg-white/70 px-4 py-2 text-sm font-bold text-sumi-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold-400 hover:text-gold-600"
                >
                  <BookOpen className="h-4 w-4 text-gold-500" />
                  ブログ
                </Link>
                <Link
                  href="/board"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-sakura px-4 py-2 text-sm font-bold text-white shadow-glow transition-all hover:-translate-y-0.5"
                >
                  <MessagesSquare className="h-4 w-4" />
                  掲示板
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="border-t border-sumi-100/50 bg-white/60">
          <div className="container mx-auto px-4 lg:px-8 py-8 text-center text-xs text-sumi-400">
            <div>© Toronto Japanese — トロントの日本人向け賃貸</div>
            <div className="mt-2 flex items-center justify-center gap-4">
              <Link
                href="/guide"
                className="text-sumi-400 underline hover:text-sakura-600"
              >
                ブログ
              </Link>
              <Link
                href="/privacy"
                className="text-sumi-400 underline hover:text-sakura-600"
              >
                プライバシーポリシー
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </GoogleOAuthProvider>
  );
}
