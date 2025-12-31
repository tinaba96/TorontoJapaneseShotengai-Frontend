import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ニュース一覧 | Toronto Japanese Shotengai",
  description:
    "トロント日本人商店街の最新ニュース、イベント情報、お知らせをお届けします。",
};

interface NewsItem {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  link: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    date: "2024-11-01",
    title: "海外起業家のための福岡オンサイト&オンラインイベントのお知らせ",
    excerpt:
      "トロントで起業を目指す日本人のための福岡オンラインイベントを開催します。経験豊富な起業家による講演とネットワーキングの機会を提供します。",
    category: "イベント",
    image: "/images/img.png",
    link: "/news/1",
  },
  {
    id: 2,
    date: "2023-12-01",
    title: "日本食バトル開催決定",
    excerpt:
      "トロントの日本食レストランが参加する日本食バトルが開催されます。地元のシェフたちが腕を競い合い、最高の日本食を提供します。",
    category: "イベント",
    image: "/images/img2.png",
    link: "/news/2",
  },
  {
    id: 3,
    date: "2023-04-15",
    title: "新規ショップオープンのお知らせ!",
    excerpt:
      "日本人商店街に新しい和菓子店がオープンしました。伝統的な和菓子からモダンなアレンジまで、幅広い商品を取り揃えています。",
    category: "オープン",
    image: "/images/img3.png",
    link: "/news/3",
  },
  {
    id: 4,
    date: "2023-02-01",
    title: "ゴールデンウィークイベント情報",
    excerpt:
      "ゴールデンウィーク期間中、日本人商店街で様々なイベントを開催します。日本文化体験、特別セール、ライブパフォーマンスなど盛りだくさんです。",
    category: "イベント",
    image: "/images/img4.png",
    link: "/news/4",
  },
  {
    id: 5,
    date: "2022-12-01",
    title: "クリスマスイベント開催！",
    excerpt:
      "クリスマスシーズンに合わせて、日本人商店街で特別なクリスマスイベントを開催します。日本のクリスマス文化とカナダのクリスマスを融合した楽しいイベントです。",
    category: "イベント",
    image: "/images/img5.png",
    link: "/news/5",
  },
  {
    id: 6,
    date: "2022-10-15",
    title: "秋の味覚フェア開催",
    excerpt:
      "秋の味覚を楽しむフェアを開催します。松茸、栗、秋刀魚など、日本の秋の味覚をトロントで楽しむことができます。",
    category: "イベント",
    image: "/images/img6.png",
    link: "/news/6",
  },
  {
    id: 7,
    date: "2022-08-20",
    title: "夏祭り開催のお知らせ",
    excerpt:
      "恒例の夏祭りを開催します。盆踊り、花火大会、屋台など、日本の夏祭りの雰囲気をトロントで体験できます。",
    category: "イベント",
    image: "/images/ad.png",
    link: "/news/7",
  },
  {
    id: 8,
    date: "2022-06-10",
    title: "新しい日本食スーパーマーケットオープン",
    excerpt:
      "より多くの日本の食材を取り揃えた新しいスーパーマーケットがオープンしました。新鮮な食材から調味料まで、日本の味を再現できます。",
    category: "オープン",
    image: "/images/ad2.png",
    link: "/news/8",
  },
];

const categories = ["すべて", "イベント", "オープン", "お知らせ"];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-shinsaibashi-blue to-shinsaibashi-orange text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ニュース</h1>
          <p className="text-xl opacity-90">
            トロント日本人商店街の最新情報をお届けします
          </p>
        </div>
      </section>

      {/* News Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full bg-white border border-gray-300 hover:bg-shinsaibashi-orange hover:text-white transition-colors duration-300"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {item.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{item.date}</span>
                    <span className="px-3 py-1 bg-shinsaibashi-orange text-white text-xs rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-shinsaibashi-blue hover:text-shinsaibashi-orange transition-colors duration-300">
                    <Link href={item.link}>{item.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <Link
                    href={item.link}
                    className="inline-flex items-center text-shinsaibashi-orange hover:text-shinsaibashi-blue transition-colors duration-300"
                  >
                    続きを読む
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 text-gray-500 hover:text-shinsaibashi-orange">
                前へ
              </button>
              <button className="px-3 py-2 bg-shinsaibashi-orange text-white rounded">
                1
              </button>
              <button className="px-3 py-2 text-gray-500 hover:text-shinsaibashi-orange">
                2
              </button>
              <button className="px-3 py-2 text-gray-500 hover:text-shinsaibashi-orange">
                3
              </button>
              <button className="px-3 py-2 text-gray-500 hover:text-shinsaibashi-orange">
                次へ
              </button>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}
