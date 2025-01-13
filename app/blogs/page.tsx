import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: "BEAUTY" | "EXPERIENCE";
  imageUrl: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "トロントで楽しむ日本の伝統祭り！TJS祭りの魅力",
    date: "2025.01.14",
    category: "EXPERIENCE",
    imageUrl: "/images/img.png?height=200&width=200",
    slug: "toronto-traditional-festival",
  },
  {
    id: "2",
    title: "トロントの日本食レストラン巡り！おすすめの5選",
    date: "2025.01.09",
    category: "BEAUTY",
    imageUrl: "/images/img2.png?height=200&width=200",
    slug: "toronto-japanese-restaurants",
  },
  {
    id: "3",
    title: "トロントで見つけた！日本のアニメグッズショップ",
    date: "2025.01.06",
    category: "EXPERIENCE",
    imageUrl: "/images/img3.png?height=200&width=200",
    slug: "toronto-anime-goods",
  },
  {
    id: "4",
    title: "トロントの日本庭園で心を癒すひととき",
    date: "2024.12.17",
    category: "BEAUTY",
    imageUrl: "/images/img4.png?height=200&width=200",
    slug: "toronto-japanese-garden",
  },
  {
    id: "5",
    title: "トロントで体験する茶道教室！日本文化を学ぶ",
    date: "2024.12.10",
    category: "EXPERIENCE",
    imageUrl: "/images/img5.png?height=200&width=200",
    slug: "toronto-tea-ceremony",
  },
  {
    id: "6",
    title: "トロントの日本語学校で学ぶ！言語と文化の交流",
    date: "2024.12.05",
    category: "BEAUTY",
    imageUrl: "/images/img2.png?height=200&width=200",
    slug: "toronto-japanese-school",
  },
  {
    id: "7",
    title: "トロントで楽しむ日本の映画祭！おすすめ作品紹介",
    date: "2024.11.30",
    category: "EXPERIENCE",
    imageUrl: "/images/img3.png?height=200&width=200",
    slug: "toronto-japanese-film-festival",
  },
  {
    id: "8",
    title: "トロントの日本人コミュニティでのボランティア活動",
    date: "2024.11.25",
    category: "BEAUTY",
    imageUrl: "/images/img4.png?height=200&width=200",
    slug: "toronto-japanese-volunteer",
  },
  {
    id: "9",
    title: "トロントで見つけた！日本の伝統工芸品ショップ",
    date: "2024.11.20",
    category: "EXPERIENCE",
    imageUrl: "/images/img6.png?height=200&width=200",
    slug: "toronto-traditional-crafts",
  },
  {
    id: "10",
    title: "トロントの日本人アーティストによるアート展覧会",
    date: "2024.11.15",
    category: "BEAUTY",
    imageUrl: "/images/img2.png?height=200&width=200",
    slug: "toronto-japanese-art-exhibition",
  },
];

export default function BlogListing() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      <h1 className="text-3xl font-bold text-center mb-8">ブログ一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold line-clamp-2 leading-tight">
                  {post.title}
                </h2>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <time dateTime={post.date.replace(/\./g, "-")}>
                    {post.date}
                  </time>
                  <span className="text-xs tracking-wider">
                    カテゴリ{" "}
                    <span className="font-medium underline">
                      {post.category}
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <Footer />
    </main>
  );
}
