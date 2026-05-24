"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, Sparkles } from "lucide-react";
import { useCart } from "@/app/contexts/CartContext";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-washi-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 lg:px-8 py-20">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-sakura-50 to-gold-50 ring-1 ring-gold-200/50 shadow-glow-soft">
              <ShoppingCart className="h-10 w-10 text-gold-500" />
            </div>
            <h1 className="mt-8 font-display text-4xl md:text-5xl font-extrabold text-sumi-800 text-balance">
              <span className="text-gradient-sakura">カート</span>は空です
            </h1>
            <p className="mt-4 text-sumi-500">
              商品を追加して、カートを満たしましょう。
            </p>
            <Link href="/fm">
              <Button variant="sakura" className="mt-8" size="lg">
                <ArrowLeft className="w-4 h-4" />
                フリマへ
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="section-eyebrow">
              <span className="h-px w-8 bg-gold-400" />
              Your Cart · カート
            </div>
            <h1 className="mt-3 section-heading text-sumi-800">
              <span className="text-gradient-aurora">Shopping</span>{" "}
              <span className="font-jp text-sumi-700">カート</span>
            </h1>
          </div>
          <Link href="/fm">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4" />
              買い物を続ける
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* カート内商品一覧 */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-sumi-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-display font-bold text-lg text-sumi-800 truncate">
                        {item.name}
                      </h3>
                      <div className="mt-1 text-gradient-sakura text-lg font-bold">
                        ¥{item.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="grid h-8 w-8 place-items-center rounded-full border border-sumi-200 text-sumi-700 hover:bg-sakura-50 hover:border-sakura-300 transition-colors"
                        aria-label="数量を減らす"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-bold text-sumi-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="grid h-8 w-8 place-items-center rounded-full border border-sumi-200 text-sumi-700 hover:bg-sakura-50 hover:border-sakura-300 transition-colors"
                        aria-label="数量を増やす"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-2 grid h-8 w-8 place-items-center rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                        aria-label="削除"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 注文サマリー */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 overflow-hidden rounded-3xl bg-gradient-sumi text-washi-50 p-7 shadow-elegant ring-1 ring-gold-400/20">
              <div className="pointer-events-none absolute -top-32 -right-20 h-72 w-72 bg-sakura-500/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-gold-300">
                  <Sparkles className="h-3 w-3" />
                  Order Summary
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold text-washi-50">
                  注文サマリー
                </h2>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between text-washi-100/80">
                    <span>商品数</span>
                    <span className="font-bold text-washi-50">
                      {state.items.length}点
                    </span>
                  </div>
                  <div className="flex justify-between text-washi-100/80">
                    <span>小計</span>
                    <span className="font-bold text-washi-50">
                      ¥{state.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-washi-100/80">
                    <span>送料</span>
                    <span className="font-bold text-washi-50">¥500</span>
                  </div>
                  <div className="divider-gold opacity-60 my-4" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-washi-100/70">
                      Total · 合計
                    </span>
                    <span className="text-3xl font-display font-extrabold text-gradient-gold">
                      ¥{(state.total + 500).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-7 space-y-3">
                  <Link href="/checkout" className="block">
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold text-sumi-900 py-3 text-sm font-bold shadow-glow-gold btn-glow transition-all hover:-translate-y-0.5">
                      レジに進む
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur py-3 text-sm font-semibold text-washi-50 transition-all hover:bg-white/10"
                  >
                    カートを空にする
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
