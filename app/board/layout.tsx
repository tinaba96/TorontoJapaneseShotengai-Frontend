"use client";

import Link from "next/link";
import Image from "next/image";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Home, MessagesSquare, BookOpen } from "lucide-react";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default function BoardLayout({
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
              <Link href="/" className="flex items-center gap-3" aria-label="Toronto Japanese">
                <div className="relative h-10 w-10 rounded-full ring-1 ring-gold-300/60 bg-white p-1 shadow-sm">
                  <Image
                    src="/images/tjs.png"
                    alt="Toronto Japanese"
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="font-display text-base font-bold text-sumi-700 tracking-wide">
                    Toronto Japanese
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-semibold">
                    Rentals · 賃貸
                  </span>
                </div>
              </Link>

              <nav className="flex items-center gap-1">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-sumi-600 transition-colors hover:bg-sakura-50 hover:text-sakura-600"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">物件</span>
                </Link>
                <Link
                  href="/guide"
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-sumi-600 transition-colors hover:bg-sakura-50 hover:text-sakura-600"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">ブログ</span>
                </Link>
                <Link
                  href="/board"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-sakura px-4 py-2 text-sm font-bold text-white shadow-glow"
                >
                  <MessagesSquare className="h-4 w-4" />
                  掲示板
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="border-t border-sumi-100/50 bg-white/60">
          <div className="container mx-auto px-4 lg:px-8 py-8 text-center text-xs text-sumi-400">
            <div>© Toronto Japanese — トロントの日本人向け賃貸</div>
            <Link
              href="/privacy"
              className="mt-2 inline-block text-sumi-400 underline hover:text-sakura-600"
            >
              プライバシーポリシー
            </Link>
          </div>
        </footer>
      </div>
    </GoogleOAuthProvider>
  );
}
