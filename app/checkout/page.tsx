"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CreditCard, Truck, CheckCircle, Sparkles, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/contexts/CartContext";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Canada",
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const totalAmount = state.total + 500;

  const handleShippingChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 2000);
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
            <h1 className="mt-8 font-display text-4xl font-extrabold text-sumi-800">
              カートが空です
            </h1>
            <p className="mt-3 text-sumi-500">
              商品を追加してから決済を行ってください。
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
              Checkout · 決済
            </div>
            <h1 className="mt-3 section-heading text-sumi-800">
              <span className="text-gradient-aurora">Checkout</span>{" "}
              <span className="font-jp text-sumi-700">決済情報</span>
            </h1>
          </div>
          <Link href="/cart">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4" />
              カートに戻る
            </Button>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* 左側: 配送・決済情報 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 配送情報 */}
            <div className="overflow-hidden rounded-3xl bg-white border border-sumi-100 shadow-glow-soft">
              <div className="flex items-center gap-3 px-7 py-5 border-b border-sumi-100 bg-gradient-to-r from-sakura-50/40 to-transparent">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-sakura text-white shadow-glow">
                  <Truck className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500">
                    Section 01
                  </div>
                  <h2 className="font-display text-lg font-bold text-sumi-800">
                    配送情報
                  </h2>
                </div>
              </div>

              <div className="p-7 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">名</Label>
                    <Input
                      id="firstName"
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        handleShippingChange("firstName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">姓</Label>
                    <Input
                      id="lastName"
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        handleShippingChange("lastName", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) =>
                      handleShippingChange("email", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) =>
                      handleShippingChange("phone", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">住所</Label>
                  <Textarea
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) =>
                      handleShippingChange("address", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">都市</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        handleShippingChange("city", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">郵便番号</Label>
                    <Input
                      id="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={(e) =>
                        handleShippingChange("postalCode", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 決済情報 */}
            <div className="overflow-hidden rounded-3xl bg-white border border-sumi-100 shadow-glow-soft">
              <div className="flex items-center gap-3 px-7 py-5 border-b border-sumi-100 bg-gradient-to-r from-gold-50/50 to-transparent">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-gold text-sumi-900 shadow-glow-gold">
                  <CreditCard className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-sakura-500">
                    Section 02
                  </div>
                  <h2 className="font-display text-lg font-bold text-sumi-800">
                    決済情報
                  </h2>
                </div>
              </div>

              <div className="p-7 space-y-5">
                <div>
                  <Label htmlFor="cardholderName">カード名義人</Label>
                  <Input
                    id="cardholderName"
                    value={paymentInfo.cardholderName}
                    onChange={(e) =>
                      handlePaymentChange("cardholderName", e.target.value)
                    }
                    placeholder="TARO TANAKA"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber">カード番号</Label>
                  <Input
                    id="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={(e) =>
                      handlePaymentChange("cardNumber", e.target.value)
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">有効期限</Label>
                    <Input
                      id="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={(e) =>
                        handlePaymentChange("expiryDate", e.target.value)
                      }
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={paymentInfo.cvv}
                      onChange={(e) =>
                        handlePaymentChange("cvv", e.target.value)
                      }
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右側: 注文サマリー */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 relative overflow-hidden rounded-3xl bg-gradient-sumi text-washi-50 p-7 shadow-elegant ring-1 ring-gold-400/20">
              <div className="pointer-events-none absolute -top-32 -right-20 h-72 w-72 bg-sakura-500/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-gold-300">
                  <Sparkles className="h-3 w-3" />
                  Order Summary
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold text-washi-50">
                  注文サマリー
                </h2>

                {/* 商品一覧 */}
                <div className="mt-6 space-y-3 max-h-72 overflow-y-auto pr-1">
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/15">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-washi-50 text-sm truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-washi-100/70">
                          {item.quantity} × ¥{item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-sm font-bold text-gold-300">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="divider-gold opacity-60 my-5" />

                <div className="space-y-2 text-sm">
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
                </div>

                <div className="mt-4 flex justify-between items-baseline">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-washi-100/70">
                    Total
                  </span>
                  <span className="text-3xl font-display font-extrabold text-gradient-gold">
                    ¥{totalAmount.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold text-sumi-900 py-3.5 text-sm font-bold shadow-glow-gold btn-glow transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
                >
                  {isProcessing ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-sumi-900/30 border-t-sumi-900 animate-spin" />
                      決済処理中...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      ¥{totalAmount.toLocaleString()} で購入
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
