"use client";

import Link from "next/link";
import Image from "next/image";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
            </div>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="border-t border-sumi-100/50 bg-white/60">
          <div className="container mx-auto px-4 lg:px-8 py-8 text-center text-xs text-sumi-400">
            © Toronto Japanese — トロントの日本人向け賃貸
          </div>
        </footer>
      </div>
    </GoogleOAuthProvider>
  );
}
