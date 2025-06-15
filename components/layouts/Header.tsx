"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/app/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md mb-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/images/tjs.png"
              alt="Toronto Japanese Shotengai"
              width={50}
              height={50}
              className="w-full h-auto"
            />
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/"
                  className="text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  ホームページ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  TJSについて
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  商店街マップ
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  求人情報
                </Link>
              </li>
              <li>
                <Link
                  href="/rental-properties"
                  className="text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  賃貸情報
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  イベント
                </Link>
              </li>
              <li>
                <Link
                  href="/fm"
                  className="text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  フリマ
                </Link>
              </li>
              <li>
                <Link
                  href="/company"
                  className="text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  会社情報
                </Link>
              </li>
              <li>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700">{user?.name}</span>
                    <button
                      onClick={logout}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      ログアウト
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    ログイン
                  </Link>
                )}
              </li>
            </ul>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開く"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="block text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  ホームページ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  TJSについて
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="block text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  商店街マップ
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="block text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  求人情報
                </Link>
              </li>
              <li>
                <Link
                  href="/rental-properties"
                  className="block text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  賃貸情報
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="block text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  イベント
                </Link>
              </li>
              <li>
                <Link
                  href="/fm"
                  className="block text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  フリマ
                </Link>
              </li>
              <li>
                <Link
                  href="/company"
                  className="block text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  会社情報
                </Link>
              </li>
              <li className="border-t pt-2 mt-2">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <span className="block text-gray-700">{user?.name}</span>
                    <button
                      onClick={logout}
                      className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      ログアウト
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
                  >
                    ログイン
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
