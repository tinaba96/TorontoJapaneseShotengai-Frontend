// import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          フリーマーケット
        </h1>
        <p className="text-xl mb-4">
          ユニークな商品を見つけよう。あなたの宝物が待っています!
        </p>
        <p className="text-lg mb-8">
          全商品カナダドル表示でグローバルなお買い物体験！！
        </p>
        {/* <Button size="lg" variant="secondary">
          商品を探す
        </Button> */}
      </div>
    </div>
  );
}
