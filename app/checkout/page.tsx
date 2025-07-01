"use client"; // ないとエラーになる

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CreditCard, Truck, CheckCircle } from "lucide-react";
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

  const totalAmount = state.total + 500; // 送料込み

  const handleShippingChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // デモ用の決済処理（実際のStripe APIは呼び出さない）
    setTimeout(() => {
      // 決済成功として扱い、完了ページに遷移
      clearCart();
      router.push("/checkout/success");
    }, 2000);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              カートが空です
            </h1>
            <p className="text-gray-600 mb-8">
              商品を追加してから決済を行ってください
            </p>
            <Link href="/fm">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                フリマページに戻る
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link href="/cart">
            <Button variant="outline" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              カートに戻る
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">決済情報</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* 左側: 配送・決済情報 */}
          <div className="space-y-6">
            {/* 配送情報 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Truck className="w-5 h-5 mr-2 text-blue-500" />
                  <h2 className="text-xl font-bold text-gray-800">配送情報</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
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

                <div className="space-y-4">
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
              </CardContent>
            </Card>

            {/* 決済情報 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
                  <h2 className="text-xl font-bold text-gray-800">決済情報</h2>
                </div>

                <div className="space-y-4">
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
              </CardContent>
            </Card>
          </div>

          {/* 右側: 注文サマリー */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  注文サマリー
                </h2>

                {/* 商品一覧 */}
                <div className="space-y-3 mb-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          数量: {item.quantity} × ¥{item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="font-semibold">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="my-4" />

                {/* 合計 */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">小計:</span>
                    <span>¥{state.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">送料:</span>
                    <span>¥500</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>合計:</span>
                    <span>¥{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* 決済ボタン */}
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      決済処理中...
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />¥
                      {totalAmount.toLocaleString()} で購入する
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
