"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                  href="/about"
                  className="text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  TJSについて
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
                  href="/about"
                  className="block text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  心斎橋について
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
                  href="/shops"
                  className="block text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  ショップ
                </Link>
              </li>
              <li>
                <Link
                  href="/access"
                  className="block text-shinsaibashi-blue hover:text-shinsaibashi-orange"
                >
                  アクセス
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
