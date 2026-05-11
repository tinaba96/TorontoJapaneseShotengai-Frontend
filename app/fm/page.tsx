"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <HeroSection />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          人気の商品
        </h2>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-semibold mb-2">エラー</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              商品がありません
            </h3>
            <p className="text-gray-600 mb-6">
              現在表示できる商品がありません
            </p>
            <Link
              href="/create"
              className="inline-block bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              商品を出品
            </Link>
          </div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
