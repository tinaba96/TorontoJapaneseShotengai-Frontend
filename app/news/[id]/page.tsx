import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

interface NewsArticle {
  id: number;
  date: string;
  title: string;
  content: string;
  category: string;
  image?: string;
  author: string;
  tags: string[];
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    date: "2024-11-01",
    title: "起業家のためのオンラインイベントのお知らせ",
    content: `
      <p>トロントで起業を目指す日本人のためのオンラインイベントを開催いたします。このイベントでは、経験豊富な起業家による講演とネットワーキングの機会を提供します。ぜひご参加くださいw。</p>
      
      <h2>イベント詳細</h2>
      <ul>
        <li><strong>日時:</strong> 2024年11月15日（金）19:00-21:00 EST</li>
        <li><strong>場所:</strong> オンライン（Zoom）</li>
        <li><strong>参加費:</strong> 無料</li>
        <li><strong>定員:</strong> 100名</li>
      </ul>

      <h2>プログラム</h2>
      <ol>
        <li>19:00-19:10 開会の挨拶</li>
        <li>19:10-19:40 基調講演「カナダでの起業成功の秘訣」</li>
        <li>19:40-20:10 パネルディスカッション「起業家の体験談」</li>
        <li>20:10-21:00 ネットワーキングセッション</li>
      </ol>

      <h2>登壇者</h2>
      <p>今回のイベントでは、トロントで成功を収めている日本人起業家の方々をお招きします。実際の体験談を聞くことで、起業への道筋をより明確にご理解できるでしょう。</p>

      <h2>参加方法</h2>
      <p>ご参加をご希望の方は、以下のフォームからお申し込みください！定員に達し次第、申し込みを締め切らせていただきます。 お申し込みは<a href="/contact" style="color: #e67e22;">こちら</a>からお願いします。</p>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>お申し込みフォーム</h3>
        <p>申し込みは<a href="/contact" style="color: #e67e22;">こちら</a>からお願いします。</p>
      </div>

      <p>このイベントを通じて、トロントの日本人コミュニティの絆を深め、新しいビジネスの可能性を一緒に探求しましょう。</p>
    `,
    category: "イベント",
    image: "/images/img.png",
    author: "商店街事務局",
    tags: ["起業", "オンライン", "ネットワーキング", "ビジネス"],
  },
  {
    id: 2,
    date: "2023-12-01",
    title: "日本食バトル！開催決定！",
    content: `
      <p>トロントの日本食レストランが参加する日本食バトルが開催されます。地元のシェフたちが腕を競い合って、最高の日本食を提供します。</p>
      
      <h2>イベント概要</h2>
      <p>今回の日本食バトルでは、トロント市内の有名日本食レストランが参加し、それぞれの店舗の看板メニューを披露します！来場者の投票により、最優秀賞が決定されます！<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        
      </body>
      </html>ご期待ください！</p>

      <h2>参加店舗</h2>
      <ul>
        <li>寿司処 海鮮</li>
        <li>ラーメン 味噌</li>
        <li>天ぷら 天音おう</li>
        <li>焼肉 牛角f</li>
        <li>居酒屋 katu和</li>
      </ul>

      <h2>審査方法</h2>
      <p>ご来場者の皆様による投票で以下の項目を審査します：</p>
      <ul>
        <li>味（65点）</li>
        <li>見た目（15点）</li>
        <li>独創性（15点）</li>
        <li>サービス（5点）</li>
      </ul>

      <h2>---イベント詳細---</h2>
      <ul>
        <li><strong>日時:</strong> 2023年12月15日（土）11:00-18:00</li>
        <li><strong>場所:</strong> トロント日本人商店街 メインストリート</li>
        <li><strong>入場料:</strong> 大人 $15、子供 $8</li>
        <li><strong>試食券:</strong> 1枚 $5（各店舗の料理を試食できます）</li>
      </ul>

      <p>この機会に、トロントの日本食の魅力を存分にお楽しみください。家族連れでも楽しめるイベントとなっております。</p>
    `,
    category: "イベント",
    image: "/images/img2.png",
    author: "イベント委員会",
    tags: ["日本食", "バトル", "レストラン", "グルメ"],
  },
  {
    id: 3,
    date: "2025-04-4",
    title: "新規ショップオープンのお知らせ!",
    content: `
      <p>日本人商店街に新しい和菓子店「和菓子処 桜島」がオープンしました。伝統的な和菓子からモダンなアレンジまで、幅広い商品を取り揃えています。</p>
      
      <h2>店舗の情報</h2>
      <ul>
        <li><strong>店名:</strong> 和菓子処 桜まつり</li>
        <li><strong>住所:</strong> 123 Japanese Street, Toronto, ON</li>
        <li><strong>営業時間:</strong> 火曜日-日曜日 9:00-19:00（月曜定休）</li>
        <li><strong>電話番号:</strong> (416) 555-0123</li>
      </ul>

      <h2>取り扱い商品</h2>
      <h3>伝統的な和菓子など</h3>
      <ul>
        <li>大福（あんこ、いちご、抹茶）</li>
        <li>団子（みたらし、あんこ、きなこ）</li>
        <li>羊羹（小豆、抹茶、栗）</li>
        <li>最中（小豆、抹茶、栗）</li>
      </ul>

      <h3>季節限定商品</h3>
      <ul>
        <li>桜餅（春）</li>
        <li>水羊羹（夏）</li>
        <li>栗きんとん（秋）</li>
        <li>おはぎ（通年）</li>
      </ul>

      <h3>モダンアレンジ</h3>
      <ul>
        <li>抹茶ティラミスチーズ</li>
        <li>りんごケーキ</li>
        <li>和風パフェ</li>
        <li>和菓子風クッキーパンケーキ</li>
      </ul>

      <h2>オープン記念！</h2>
      <p>オープン記念として、4月15日から30日まで全商品20%OFFのセールを開催します。この機会にぜひお立ち寄りください。</p>

      <h2>店主からのメッセージ</h2>
      <blockquote style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #e67e22; margin: 20px 0;">
        「トロントの皆様に日本の伝統的な和菓子の美味しさと素晴らしさをお届けしたいと思い、この店をオープンしました。季節に応じた和菓子を通じて、日本の文化と味を体験していただければ幸いです。」
      </blockquote>

      <p>和菓子処 桜で、日本の伝統的な味と新しいアレンジを楽しんでください。</p>
    `,
    category: "オープン",
    image: "/images/img3.png",
    author: "商店街事務局",
    tags: ["和菓子", "オープン", "新店舗", "スイーツ"],
  },
  {
    id: 4,
    date: "2023-02-01",
    title: "ゴールデンウィークイベント情報",
    content: `
      <p>ゴールデンウィーク期間中、日本人商店街で様々なイベントを開催します。日本文化体験、特別セール、ライブパフォーマンスなど盛りだくさんです。</p>
      
      <h2>イベントスケジュール</h2>
      
      <h3>4月29日（土）</h3>
      <ul>
        <li>10:00-12:00 茶道体験（予約制）</li>
        <li>14:00-16:00 書道ワークショップ</li>
        <li>18:00-20:00 和太鼓ライブ</li>
      </ul>

      <h3>4月30日（日）</h3>
      <ul>
        <li>11:00-13:00 着物着付け体験</li>
        <li>15:00-17:00 折り紙ワークショップ</li>
        <li>19:00-21:00 日本音楽コンサート</li>
      </ul>

      <h3>5月1日（月）</h3>
      <ul>
        <li>10:00-18:00 全店舗特別セール</li>
        <li>14:00-16:00 日本料理デモンストレーション</li>
        <li>18:00-20:00 盆踊り大会</li>
      </ul>

      <h3>5月2日（火）</h3>
      <ul>
        <li>11:00-13:00 生け花体験</li>
        <li>15:00-17:00 日本映画上映会</li>
        <li>19:00-21:00 カラオケ大会</li>
      </ul>

      <h3>5月3日（水）</h3>
      <ul>
        <li>10:00-12:00 武道デモンストレーション</li>
        <li>14:00-16:00 日本文化クイズ大会</li>
        <li>18:00-20:00 閉会式・抽選会</li>
      </ul>

      <h2>特別セール情報</h2>
      <p>期間中、参加店舗で特別セールを実施します：</p>
      <ul>
        <li>食品店：全商品15%OFF</li>
        <li>雑貨店：全商品20%OFF</li>
        <li>レストラン：ランチタイム特別メニュー</li>
        <li>美容院：和風ヘアスタイル20%OFF</li>
      </ul>

      <h2>参加方法</h2>
      <p>各イベントへの参加は、当日受付または事前予約が必要です。詳細は各店舗にお問い合わせください。</p>

      <h2>注意事項</h2>
      <ul>
        <li>雨天時は一部イベントが屋内に変更される場合があります</li>
        <li>混雑時は入場制限を行う場合があります</li>
        <li>写真撮影は可能ですが、他のお客様にご配慮ください</li>
      </ul>

      <p>ゴールデンウィーク期間中、日本人商店街で日本の文化と味を存分にお楽しみください。</p>
    `,
    category: "イベント",
    image: "/images/img4.png",
    author: "イベント委員会",
    tags: ["ゴールデンウィーク", "イベント", "日本文化", "セール"],
  },
  {
    id: 5,
    date: "2022-12-01",
    title: "クリスマスイベント開催！",
    content: `
      <p>クリスマスシーズンに合わせて、日本人商店街で特別なクリスマスイベントを開催します。日本のクリスマス文化とカナダのクリスマスを融合した楽しいイベントです。</p>
      
      <h2>イベント概要</h2>
      <p>日本のクリスマスといえば、ケーキとチキンが定番。今回のイベントでは、日本のクリスマス文化を紹介しながら、カナダのクリスマスも楽しめる特別な企画を用意しました。</p>

      <h2>メインイベント</h2>
      
      <h3>1. 日本風クリスマスケーキコンテスト</h3>
      <p>地元のパティシエが参加する日本風クリスマスケーキコンテストを開催します。いちごのショートケーキから、モダンなアレンジまで、様々なケーキが登場します。</p>
      <ul>
        <li><strong>日時:</strong> 12月15日（土）14:00-16:00</li>
        <li><strong>場所:</strong> 商店街中央広場</li>
        <li><strong>参加費:</strong> 無料（試食は有料）</li>
      </ul>

      <h3>2. クリスマスイルミネーション点灯式</h3>
      <p>商店街全体を彩る美しいイルミネーションの点灯式を行います。日本の和風イルミネーションとカナダのクリスマスイルミネーションが融合した特別な演出です。</p>
      <ul>
        <li><strong>日時:</strong> 12月10日（月）18:00</li>
        <li><strong>場所:</strong> 商店街メインストリート</li>
        <li><strong>参加費:</strong> 無料</li>
      </ul>

      <h3>3. クリスマスマーケット</h3>
      <p>日本とカナダのクリスマスグッズが並ぶ特別なマーケットを開催します。手作りのオーナメントから、日本のクリスマス雑貨まで、様々な商品をお楽しみいただけます。</p>
      <ul>
        <li><strong>日時:</strong> 12月20日-24日 10:00-20:00</li>
        <li><strong>場所:</strong> 商店街各店舗</li>
        <li><strong>参加費:</strong> 無料（商品購入は別途）</li>
      </ul>

      <h2>特別メニュー</h2>
      <p>期間中、参加レストランで特別なクリスマスメニューを提供します：</p>
      <ul>
        <li>日本風クリスマスチキン</li>
        <li>抹茶クリスマスケーキ</li>
        <li>和風クリスマスパスタ</li>
        <li>日本酒クリスマスカクテル</li>
      </ul>

      <h2>子供向けイベント</h2>
      <ul>
        <li>サンタクロースとの写真撮影</li>
        <li>クリスマス工作ワークショップ</li>
        <li>クリスマスキャロルコンサート</li>
        <li>プレゼント抽選会</li>
      </ul>

      <h2>参加方法</h2>
      <p>各イベントへの参加は、当日受付または事前予約が必要です。詳細は各店舗にお問い合わせください。</p>

      <p>日本のクリスマスとカナダのクリスマスを同時に楽しめる、特別なイベントにぜひご参加ください。</p>
    `,
    category: "イベント",
    image: "/images/img5.png",
    author: "イベント委員会",
    tags: ["クリスマス", "イベント", "イルミネーション", "ケーキ"],
  },
];

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = newsArticles.find((a) => a.id === parseInt(id));

  if (!article) {
    return {
      title: "記事が見つかりません | Toronto Japanese Shotengai",
    };
  }

  return {
    title: `${article.title} | Toronto Japanese Shotengai`,
    description: article.content.replace(/<[^>]*>/g, "").substring(0, 160),
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = newsArticles.find((a) => a.id === parseInt(id));

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-shinsaibashi-blue to-shinsaibashi-orange text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <Link
                href="/news"
                className="text-white hover:text-gray-200 transition-colors duration-300"
              >
                ← ニュース一覧に戻る
              </Link>
            </div>
            <span className="inline-block px-3 py-1 bg-white text-shinsaibashi-orange text-sm rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {article.title}
            </h1>
            <div className="flex items-center text-sm opacity-90">
              <span>{article.date}</span>
              <span className="mx-2">•</span>
              <span>by {article.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              {article.image && (
                <div className="h-64 md:h-96 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 md:p-8">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-3">タグ</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-3">シェア</h3>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300">
                      Facebook
                    </button>
                    <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors duration-300">
                      Twitter
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300">
                      LINE
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Related Articles */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">関連記事</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newsArticles
                  .filter((a) => a.id !== article.id)
                  .slice(0, 4)
                  .map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      href={`/news/${relatedArticle.id}`}
                      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      {relatedArticle.image && (
                        <div className="h-32 overflow-hidden">
                          <img
                            src={relatedArticle.image}
                            alt={relatedArticle.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <span className="text-xs text-gray-500">
                          {relatedArticle.date}
                        </span>
                        <h3 className="text-lg font-semibold mt-1 text-shinsaibashi-blue hover:text-shinsaibashi-orange transition-colors duration-300">
                          {relatedArticle.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
