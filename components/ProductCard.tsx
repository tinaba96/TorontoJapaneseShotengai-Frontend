"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Eye, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/contexts/CartContext";
import ProductDetailModal from "./ProductDetailModal";

interface Product {
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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    alert("カートに追加しました！");
  };

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0 relative">
          <div className="relative overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-52 object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
            />
            {/* Cinematic overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
          </div>

          {/* Price badge */}
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-sm font-bold text-sumi-800 shadow-glow-soft ring-1 ring-gold-200/60">
            <DollarSign className="w-3.5 h-3.5 text-gold-500" />
            {product.price}
          </div>

          {/* Featured chip */}
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-gradient-sakura px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
            New
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-5">
          <h3 className="font-display text-lg font-bold text-sumi-800 mb-2 line-clamp-1">
            {product.name}
          </h3>
          <div className="w-full mb-4">
            <div className="text-2xl font-bold text-gradient-sakura">
              ¥{product.price.toLocaleString()}
            </div>
            <div className="text-xs text-sumi-400 mt-0.5">送料別途</div>
          </div>
          <div className="w-full space-y-2">
            <Button
              onClick={handleViewDetails}
              variant="outline"
              className="w-full"
            >
              <Eye className="w-4 h-4" />
              詳細を見る
            </Button>
            <Button onClick={handleAddToCart} variant="sakura" className="w-full">
              <ShoppingCart className="w-4 h-4" />
              カートに追加する
            </Button>
          </div>
        </CardFooter>
      </Card>

      <ProductDetailModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
