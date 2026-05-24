"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Plus, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { getProducts } from "@/app/lib/api/products";
import type { Product as ApiProduct } from "@/app/types/product";

interface CardProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  seller?: {
    name: string;
    phone: string;
    email: string;
  };
}

function adaptProduct(p: ApiProduct, index: number): CardProduct {
  const parsedPrice = Number(p.price.replace(/[^\d.-]/g, ""));
  return {
    id: index + 1,
    name: p.title,
    price: Number.isFinite(parsedPrice) ? parsedPrice : 0,
    image: p.images || "/images/default.png?height=200&width=200",
    description: p.description,
    seller: {
      name: p.creator_id,
      phone: p.contactPhone || "",
      email: p.contactEmail,
    },
  };
}

export default function Home() {
  const [products, setProducts] = useState<CardProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProducts();
        setProducts(data.map(adaptProduct));
      } catch (err) {
        console.error("Failed to fetch products:", err);
        if (
          err &&
          typeof err === "object" &&
          "status" in err &&
          (err as { status?: number }).status === 404
        ) {
          setProducts([]);
          setError(null);
          return;
        }
        let errorMessage = "商品情報の読み込みに失敗しました";
        if (err && typeof err === "object") {
          const e = err as {
            data?: { message?: string; detail?: string };
            message?: string;
          };
          if (e.data?.message) errorMessage += `: ${e.data.message}`;
          else if (e.data?.detail) errorMessage += `: ${e.data.detail}`;
          else if (e.message) errorMessage += `: ${e.message}`;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <HeroSection />
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="section-eyebrow">
              <span className="h-px w-8 bg-gold-400" />
              Marketplace · 人気の商品
            </div>
            <h2 className="mt-3 section-heading text-sumi-800">
              <span className="text-gradient-aurora">Trending</span>{" "}
              <span className="font-jp text-sumi-700">いま人気</span>
            </h2>
          </div>
          <Link
            href="/create"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-sakura px-6 py-3 text-sm font-bold text-white shadow-glow btn-glow transition-all hover:-translate-y-0.5 self-start"
          >
            <Plus className="h-4 w-4" />
            商品を出品
            <Sparkles className="h-4 w-4" />
          </Link>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="relative">
              <div className="h-12 w-12 rounded-full border-2 border-sakura-100" />
              <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-transparent border-t-sakura-500 animate-spin" />
            </div>
          </div>
        )}

        {error && !isLoading && (
          <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-red-50/70 backdrop-blur p-8 text-center">
            <p className="text-red-700 font-semibold mb-2">エラー</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="mx-auto max-w-xl text-center py-12">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-sakura-50 to-gold-50 ring-1 ring-gold-200/50 shadow-glow-soft">
              <ShoppingBag className="h-9 w-9 text-gold-500" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-sumi-800">
              まだ商品がありません
            </h3>
            <p className="mt-2 text-sm text-sumi-500">
              最初の出品を、あなたから。
            </p>
            <Link
              href="/create"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-sakura px-6 py-3 text-sm font-bold text-white shadow-glow"
            >
              <Plus className="h-4 w-4" />
              商品を出品
            </Link>
          </div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
