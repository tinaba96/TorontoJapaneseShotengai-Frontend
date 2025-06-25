"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  X,
  DollarSign,
  ShoppingCart,
  MessageCircle,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { useCart } from "@/app/contexts/CartContext";
import { useRouter } from "next/navigation";

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

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addItem(product);
    alert("カートに追加しました！");
  };

  const handleMessageSeller = () => {
    setIsSendingMessage(true);
    // メッセージページに遷移（投稿者情報をクエリパラメータで渡す）
    setTimeout(() => {
      router.push(
        `/messages?seller=${product.seller?.name || "投稿者"}&product=${
          product.name
        }`
      );
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700 flex items-center shadow-md">
              <DollarSign className="w-4 h-4 mr-1" />
              {product.price}
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {product.name}
          </h2>

          <p className="text-gray-600 mb-6">
            {product.description ||
              "この商品は高品質で、お客様に満足していただける商品です。詳細な商品説明や特徴について、お気軽にお問い合わせください。"}
          </p>

          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-bold text-gray-800">
              ¥{product.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">送料別途</div>
          </div>

          {/* 投稿者情報 */}
          {product.seller && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                投稿者情報
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span className="font-medium">名前:</span>
                  <span className="ml-2">{product.seller.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="font-medium">電話:</span>
                  <span className="ml-2">{product.seller.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="font-medium">メール:</span>
                  <span className="ml-2">{product.seller.email}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <div className="w-full space-y-3">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              カートに追加する
            </Button>

            {product.seller && (
              <Button
                onClick={handleMessageSeller}
                disabled={isSendingMessage}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
              >
                {isSendingMessage ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    メッセージページに移動中...
                  </div>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    投稿者にメッセージする
                  </>
                )}
              </Button>
            )}

            <Button onClick={onClose} variant="outline" className="w-full">
              閉じる
            </Button>
          </div>
        </CardFooter>
      </div>
    </div>
  );
}
