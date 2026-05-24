"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Menu, X, MessageCircle, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useCart } from "@/app/contexts/CartContext";

const navLinks: Array<{ href: string; label: string }> = [
  { href: "/", label: "ホーム" },
  { href: "/about", label: "TJSについて" },
  { href: "/map", label: "MAP" },
  { href: "/jobs", label: "求人" },
  { href: "/rental-properties", label: "賃貸" },
  { href: "/events", label: "イベント" },
  { href: "/fm", label: "フリマ" },
  { href: "/create", label: "投稿" },
  { href: "/company", label: "会社情報" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { getItemCount } = useCart();

  // 未読メッセージ数（実際のアプリではAPIから取得）
  const unreadMessages = 2;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass shadow-glow-soft border-b border-sumi-100/40"
          : "bg-white/40 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      {/* gold hairline */}
      <div className="divider-gold" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Toronto Japanese Shotengai"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-sakura opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60" />
              <div className="relative h-11 w-11 rounded-full ring-1 ring-gold-300/60 bg-white p-1 shadow-sm">
                <Image
                  src="/images/tjs.png"
                  alt="Toronto Japanese Shotengai"
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-lg font-bold text-sumi-700 tracking-wide">
                Toronto Japanese
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold-500 font-semibold">
                Shotengai · 商店街
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-sumi-600 transition-colors hover:text-sakura-600 group"
                  >
                    {link.label}
                    <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-sakura scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <Link
              href="/messages"
              className="relative hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full text-sumi-600 transition-all hover:bg-sakura-50 hover:text-sakura-600"
              aria-label="メッセージ"
            >
              <MessageCircle className="h-5 w-5" />
              {unreadMessages > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid place-items-center min-w-[18px] h-[18px] px-1 bg-gradient-sakura text-white text-[10px] font-bold rounded-full shadow-glow">
                  {unreadMessages}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-sumi-600 transition-all hover:bg-gold-50 hover:text-gold-600"
              aria-label="カート"
            >
              <ShoppingCart className="h-5 w-5" />
              {getItemCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid place-items-center min-w-[18px] h-[18px] px-1 bg-gradient-gold text-sumi-800 text-[10px] font-bold rounded-full shadow-glow-gold">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2 pl-2 ml-1 border-l border-sumi-100">
                <span className="text-sm text-sumi-600 max-w-[120px] truncate">
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 rounded-full bg-sumi-800 px-3.5 py-1.5 text-xs font-semibold text-washi-50 transition-all hover:bg-sumi-900 hover:shadow-glow-soft"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  ログアウト
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:inline-flex items-center gap-1.5 ml-1 rounded-full bg-gradient-sakura px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-glow btn-glow transition-all hover:scale-[1.03]"
              >
                <Sparkles className="h-3.5 w-3.5" />
                ログイン
              </Link>
            )}

            <button
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-sumi-700 hover:bg-sakura-50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="メニューを開く"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden grid transition-all duration-500 ease-out ${
            isMenuOpen
              ? "grid-rows-[1fr] opacity-100 pb-6"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <nav className="mt-2 rounded-2xl border border-sumi-100/60 bg-white/80 backdrop-blur p-3 shadow-glow-soft">
              <ul className="grid grid-cols-2 gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-sumi-700 transition-colors hover:bg-sakura-50 hover:text-sakura-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="col-span-2">
                  <Link
                    href="/messages"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-sumi-700 transition-colors hover:bg-sakura-50 hover:text-sakura-600"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      メッセージ
                    </span>
                    {unreadMessages > 0 && (
                      <span className="grid place-items-center min-w-[20px] h-5 px-1.5 bg-gradient-sakura text-white text-[10px] font-bold rounded-full">
                        {unreadMessages}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>

              <div className="mt-3 pt-3 border-t border-sumi-100/70">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-sumi-600 truncate">
                      {user?.name}
                    </span>
                    <button
                      onClick={logout}
                      className="inline-flex items-center gap-1.5 rounded-full bg-sumi-800 px-4 py-2 text-xs font-semibold text-washi-50 hover:bg-sumi-900"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      ログアウト
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-sakura px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-glow"
                  >
                    <Sparkles className="h-4 w-4" />
                    ログイン
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
