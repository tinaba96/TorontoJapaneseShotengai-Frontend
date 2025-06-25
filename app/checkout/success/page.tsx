"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, ShoppingBag, Package } from "lucide-react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-8">
              {/* 成功アイコン */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>

              {/* 成功メッセージ */}
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                購入完了！
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                ご購入ありがとうございます。商品は指定された住所に配送されます。
              </p>

              {/* 配送情報 */}
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-blue-500 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    配送について
                  </h2>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p>• 商品は3-5営業日で配送されます</p>
                  <p>• 配送状況はメールでお知らせします</p>
                  <p>
                    •
                    配送中の商品に関するお問い合わせは、メッセージ機能をご利用ください
                  </p>
                </div>
              </div>

              {/* アクションボタン */}
              <div className="space-y-4">
                <Link href="/fm">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    フリマページに戻る
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    <Home className="w-4 h-4 mr-2" />
                    ホームページに戻る
                  </Button>
                </Link>
              </div>

              {/* 追加情報 */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  ご質問やサポートが必要な場合は、お気軽にお問い合わせください。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
