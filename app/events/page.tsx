"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

interface Event {
  id: string;
  title: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

const events: Event[] = [
  {
    id: "1",
    title: "夏のジャズフェスティバル",
    date: "2023-07-15",
    image: "/images/default.png?height=200&width=300",
    category: "ミュージック",
    slug: "summer-jazz-festival",
  },
  {
    id: "2",
    title: "テックカンファレンス2023",
    date: "2023-08-22",
    image: "/images/default2.png?height=200&width=300",
    category: "テクノロジー",
    slug: "tech-conference-2023",
  },
  {
    id: "3",
    title: "現代アート展",
    date: "2023-09-10",
    image: "/images/bg2.png?height=200&width=300",
    category: "アート",
    slug: "modern-art-exhibition",
  },
  {
    id: "4",
    title: "マラソン大会",
    date: "2023-10-05",
    image: "/images/tjs_bg.png?height=200&width=300",
    category: "スポーツ",
    slug: "marathon-2023",
  },
];

const categories = [
  "すべて",
  "ミュージック",
  "テクノロジー",
  "アート",
  "スポーツ",
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const filteredEvents = events.filter(
    (event) =>
      selectedCategory === "すべて" || event.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">イベント一覧</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-4 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              <div className="relative">
                <Image
                  src={event.image}
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
                <p className="mt-1 text-sm text-gray-500">{event.date}</p>
                <span className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {event.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
