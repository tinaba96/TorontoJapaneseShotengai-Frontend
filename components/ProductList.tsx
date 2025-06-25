import ProductCard from "./ProductCard";

// 仮の商品データ（日本語版）
const products = [
  {
    id: 1,
    name: "ヴィンテージデニムジャケット",
    price: 45,
    image: "/images/bg2.png?height=200&width=200",
    description:
      "1980年代のヴィンテージデニムジャケット。本物のレトロな雰囲気を醸し出す、希少なアイテムです。サイズはMで、着用感も抜群です。",
    seller: {
      name: "田中太郎",
      phone: "+1-416-555-0123",
      email: "tanaka@example.com",
    },
  },
  {
    id: 2,
    name: "レトロポラロイドカメラ",
    price: 65,
    image: "/images/bg.png?height=200&width=200",
    description:
      "クラシックなポラロイドカメラ。インスタント写真の魅力を体験できる、コレクターズアイテムです。動作確認済みで、すぐにお使いいただけます。",
    seller: {
      name: "佐藤花子",
      phone: "+1-416-555-0456",
      email: "sato@example.com",
    },
  },
  {
    id: 3,
    name: "アンティーク真鍮ランプ",
    price: 30,
    image: "/images/default.png?height=200&width=200",
    description:
      "アンティーク調の真鍮製テーブルランプ。温かみのある光を放ち、インテリアのアクセントとして最適です。",
    seller: {
      name: "山田次郎",
      phone: "+1-416-555-0789",
      email: "yamada@example.com",
    },
  },
  {
    id: 4,
    name: "クラシックビニールレコード",
    price: 25,
    image: "/images/tjs_bg.png?height=200&width=200",
    description:
      "70年代のクラシックロックレコード。音質も良好で、音楽愛好家に人気のアイテムです。",
    seller: {
      name: "鈴木美咲",
      phone: "+1-416-555-0321",
      email: "suzuki@example.com",
    },
  },
  {
    id: 5,
    name: "ハンドメイド陶器花瓶",
    price: 40,
    image: "/images/default.png?height=200&width=200",
    description:
      "職人による手作りの陶器花瓶。一つ一つ表情が異なり、自然な風合いが魅力です。花を生けるのに最適なサイズです。",
    seller: {
      name: "高橋健一",
      phone: "+1-416-555-0654",
      email: "takahashi@example.com",
    },
  },
  {
    id: 6,
    name: "ヴィンテージレザーサッチェル",
    price: 55,
    image: "/images/default2.png?height=200&width=200",
    description:
      "本革製のヴィンテージサッチェル。使い込まれた風合いが味わい深く、日常使いにもおしゃれに使えます。",
    seller: {
      name: "伊藤由美",
      phone: "+1-416-555-0987",
      email: "ito@example.com",
    },
  },
  {
    id: 7,
    name: "スノーボード",
    price: 155,
    image: "/images/default.png?height=200&width=200",
    description:
      "プロ仕様のスノーボード。軽量で操作性が良く、上級者にも満足いただける高性能なボードです。",
    seller: {
      name: "渡辺正雄",
      phone: "+1-416-555-0543",
      email: "watanabe@example.com",
    },
  },
];

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
