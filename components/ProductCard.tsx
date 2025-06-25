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
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-0 relative">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-0 right-0 bg-white px-3 py-1 m-2 rounded-full text-sm font-semibold text-gray-700 flex items-center shadow-md">
            <DollarSign className="w-4 h-4 mr-1" />
            {product.price}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">
            {product.name}
          </h3>
          <div className="w-full mb-3">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              ¥{product.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">送料別途</div>
          </div>
          <div className="w-full space-y-2">
            <Button
              onClick={handleViewDetails}
              variant="outline"
              className="w-full"
            >
              <Eye className="w-4 h-4 mr-2" />
              詳細を見る
            </Button>
            <Button onClick={handleAddToCart} className="w-full">
              <ShoppingCart className="w-4 h-4 mr-2" />
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
