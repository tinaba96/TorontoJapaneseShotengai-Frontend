import ProductCard from "./ProductCard";

// 仮の商品データ（日本語版）
const products = [
  {
    id: 1,
    name: "ヴィンテージデニムジャケット",
    price: 45,
    image: "/images/bg2.png?height=200&width=200",
  },
  {
    id: 2,
    name: "レトロポラロイドカメラ",
    price: 65,
    image: "/images/bg.png?height=200&width=200",
  },
  {
    id: 3,
    name: "アンティーク真鍮ランプ",
    price: 30,
    image: "/images/default.png?height=200&width=200",
  },
  {
    id: 4,
    name: "クラシックビニールレコード",
    price: 25,
    image: "/images/tjs_bg.png?height=200&width=200",
  },
  {
    id: 5,
    name: "ハンドメイド陶器花瓶",
    price: 40,
    image: "/images/default.png?height=200&width=200",
  },
  {
    id: 6,
    name: "ヴィンテージレザーサッチェル",
    price: 55,
    image: "/images/default2.png?height=200&width=200",
  },
  {
    id: 7,
    name: "スノーボード",
    price: 155,
    image: "/images/default.png?height=200&width=200",
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
