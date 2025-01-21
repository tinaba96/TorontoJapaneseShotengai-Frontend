import Link from "next/link";

interface NewsItem {
  id: number;
  date: string;
  title: string;
  link: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    date: "2024-11-01",
    title: "起業家のためのオンラインイベントのお知らせ",
    link: "/news/1",
  },
  {
    id: 2,
    date: "2023-12-01",
    title: "日本食バトル開催決定",
    link: "/news/2",
  },
  {
    id: 3,
    date: "2023-04-15",
    title: "新規ショップオープンのお知らせ!",
    link: "/news/3",
  },
  {
    id: 4,
    date: "2023-02-01",
    title: "ゴールデンウィークイベント情報",
    link: "/news/4",
  },
  {
    id: 5,
    date: "2022-12-01",
    title: "クリスマスイベント情報",
    link: "/news/5",
  },
];

const NewsSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-shinsaibashi-blue">
          最新ニュース
        </h2>
        <ul className="space-y-4">
          {newsItems.map((item) => (
            <li key={item.id} className="bg-white p-4 rounded shadow">
              <Link href={item.link} className="flex items-center">
                <span className="text-gray-600 mr-4">{item.date}</span>
                <span className="text-shinsaibashi-blue hover:text-shinsaibashi-orange">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-center mt-8">
          <Link
            href="/news"
            className="inline-block bg-shinsaibashi-orange text-white px-6 py-2 rounded hover:bg-shinsaibashi-blue transition-colors duration-300"
          >
            ニュース一覧
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
