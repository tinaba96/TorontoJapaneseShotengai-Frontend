"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";

interface EventDetail {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  description: string;
  organizer: string;
  capacity: number;
  price: string;
  tags: string[];
}

const eventDetails: EventDetail[] = [
  {
    id: "1",
    slug: "summer-jazz-festival",
    title: "夏のジャズフェスティバル",
    date: "2023-07-15",
    time: "18:00 - 22:00",
    location: "トロント・ハーバーフロント・センター",
    category: "ミュージック",
    image: "/images/default.png",
    description: `
      トロントの美しいハーバーフロントで開催される夏のジャズフェスティバル。
      国内外の一流ジャズミュージシャンが集結し、素晴らしい音楽の夜をお届けします。
      
      今年のテーマは「Jazz Under the Stars」。星空の下で聴くジャズの調べは、
      まさに夏の夜の醍醐味です。屋外ステージでの演奏と、美しいトロントの夜景を
      同時にお楽しみいただけます。
      
      会場では、地元のレストランによる美味しい料理とドリンクもご用意。
      音楽と美食を楽しみながら、素敵な夏の思い出を作りませんか？
    `,
    organizer: "トロント・ジャズ協会",
    capacity: 500,
    price: "一般: $45, 学生: $25",
    tags: ["ジャズ", "ライブ", "屋外", "夏"],
  },
  {
    id: "2",
    slug: "tech-conference-2023",
    title: "テックカンファレンス2023",
    date: "2023-08-22",
    time: "09:00 - 18:00",
    location: "トロント・コンベンション・センター",
    category: "テクノロジー",
    image: "/images/default2.png",
    description: `
      最新のテクノロジートレンドを学ぶ、トロント最大級のテックカンファレンス。
      AI、ブロックチェーン、クラウドコンピューティングなど、最先端技術の
      専門家による講演とワークショップを開催します。
      
      今年は特に「AIと未来社会」をテーマに、AI技術が私たちの生活に
      どのような影響を与えるかを深く掘り下げます。業界のリーダーたちが
      集結し、未来への洞察を共有します。
      
      ネットワーキングセッションも充実しており、同じ志を持つ
      プロフェッショナルとの出会いの場も提供します。
    `,
    organizer: "トロント・テックコミュニティ",
    capacity: 1000,
    price: "一般: $150, 学生: $75",
    tags: ["AI", "テクノロジー", "カンファレンス", "ネットワーキング"],
  },
  {
    id: "3",
    slug: "modern-art-exhibition",
    title: "現代アート展",
    date: "2023-09-10",
    time: "10:00 - 20:00",
    location: "トロント・アート・ギャラリー",
    category: "アート",
    image: "/images/bg2.png",
    description: `
      トロントを代表するアーティストたちによる現代アート展。
      絵画、彫刻、インスタレーション、デジタルアートなど、
      多様な表現方法で現代社会を映し出す作品を展示します。
      
      今回のテーマは「都市と人間」。大都市トロントで暮らす人々の
      日常や感情、都市の風景を様々な角度から表現した作品を
      ご覧いただけます。
      
      アーティストトークやワークショップも開催予定。
      アートを通じて、新しい視点や発見を得られることでしょう。
    `,
    organizer: "トロント・アート・ギャラリー",
    capacity: 200,
    price: "一般: $20, 学生: $10",
    tags: ["アート", "現代アート", "展示", "文化"],
  },
  {
    id: "4",
    slug: "marathon-2023",
    title: "マラソン大会",
    date: "2023-10-05",
    time: "07:00 - 14:00",
    location: "トロント・ウォーターフロント",
    category: "スポーツ",
    image: "/images/tjs_bg.png",
    description: `
      トロントの美しいウォーターフロントを走る、年一度のマラソン大会。
      フルマラソン（42.195km）、ハーフマラソン（21.1km）、
      10km、5kmの4つのコースからお選びいただけます。
      
      コースはトロントの主要な観光スポットを通り、
      走りながら街の魅力を再発見できるルートになっています。
      参加者全員に完走メダルと記録証をお渡しします。
      
      健康増進と地域コミュニティの活性化を目的とした
      このイベントに、ぜひご参加ください。
    `,
    organizer: "トロント・マラソン協会",
    capacity: 5000,
    price: "フル: $80, ハーフ: $60, 10km: $40, 5km: $30",
    tags: ["マラソン", "スポーツ", "健康", "ウォーターフロント"],
  },
];

export default function EventDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [isJoined, setIsJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const event = eventDetails.find((e) => e.slug === slug);

  const handleJoinEvent = () => {
    setIsJoining(true);
    // 参加処理のシミュレーション
    setTimeout(() => {
      setIsJoining(false);
      setIsJoined(true);
    }, 1500);
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              イベントが見つかりません
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
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full mb-2">
                  {event.category}
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
                      {event.date} {event.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                  <div>
                    <p className="font-medium">場所</p>
                    <p>{event.location}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3 text-blue-500" />
                  <div>
                    <p className="font-medium">定員</p>
                    <p>{event.capacity}名</p>
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
            </div>

            {/* 料金情報 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                参加料金
              </h3>
              <p className="text-gray-600">{event.price}</p>
            </div>

            {/* イベント説明 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                イベント詳細
              </h3>
              <div className="prose max-w-none text-gray-600 leading-relaxed">
                {event.description.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* タグ */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">タグ</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 参加ボタン */}
            <div className="border-t pt-6">
              {isJoined ? (
                <div className="flex items-center justify-center bg-green-50 border border-green-200 rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-green-800 font-semibold">参加済み</span>
                </div>
              ) : (
                <button
                  onClick={handleJoinEvent}
                  disabled={isJoining}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isJoining ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      参加中...
                    </div>
                  ) : (
                    "このイベントに参加する"
                  )}
                </button>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
