"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Briefcase,
  ShoppingBag,
  Calendar,
  Home,
  Plus,
  CheckCircle,
  Store,
} from "lucide-react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

type ContentType = "job" | "product" | "event" | "property" | "store";

interface FormData {
  // 共通フィールド
  title: string;
  description: string;
  contactEmail: string;
  contactPhone: string;

  // 求人情報
  company: string;
  salary: string;
  location: string;
  jobType: string;
  requirements: string;

  // フリマ商品情報
  price: string;
  condition: string;
  category: string;
  images: string;

  // イベント情報
  eventDate: string;
  eventTime: string;
  venue: string;
  organizer: string;
  maxAttendees: string;

  // 賃貸情報
  address: string;
  rent: string;
  size: string;
  rooms: string;
  utilities: string;
  parking: string;
  petPolicy: string;

  // 商店街情報
  businessHours: string;
  website: string;
  services: string;
  storeAddress: string;
  storeType: string;
}

export default function CreatePage() {
  const { toast } = useToast();
  const [contentType, setContentType] = useState<ContentType>("job");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    company: "",
    salary: "",
    location: "",
    jobType: "",
    requirements: "",
    price: "",
    condition: "",
    category: "",
    images: "",
    eventDate: "",
    eventTime: "",
    venue: "",
    organizer: "",
    maxAttendees: "",
    address: "",
    rent: "",
    size: "",
    rooms: "",
    utilities: "",
    parking: "",
    petPolicy: "",
    businessHours: "",
    website: "",
    services: "",
    storeAddress: "",
    storeType: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (contentType === "event") {
        // イベント情報の場合、APIを呼び出す
        const { createEvent } = await import("@/app/lib/api/events");

        const eventData = {
          title: formData.title,
          description: formData.description,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone || undefined,
          eventDate: formData.eventDate,
          eventTime: formData.eventTime,
          venue: formData.venue,
          organizer: formData.organizer,
          maxAttendees: formData.maxAttendees
            ? parseInt(formData.maxAttendees, 10)
            : undefined,
        };

        await createEvent(eventData);
        setIsSubmitting(false);
        setIsSuccess(true);

        // 成功トーストを表示
        toast({
          title: "イベント登録完了",
          description: "イベントが正常に登録されました。",
          variant: "default",
        });

        // 3秒後にフォームをリセット
        setTimeout(() => {
          setIsSuccess(false);
          resetForm();
        }, 3000);
      } else {
        // その他のコンテンツタイプはデモ用の処理
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSuccess(true);

          // 成功トーストを表示
          toast({
            title: "登録完了",
            description: `${getContentTypeLabel(contentType)}が正常に登録されました。`,
            variant: "default",
          });

          // 3秒後にフォームをリセット
          setTimeout(() => {
            setIsSuccess(false);
            resetForm();
          }, 3000);
        }, 2000);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("投稿エラー:", error);

      // エラーメッセージを設定
      let errorTitle = "登録エラー";
      let errorMessage = "投稿に失敗しました。もう一度お試しください。";

      if (error instanceof Error) {
        // ApiErrorの場合
        const apiError = error as {
          status?: number;
          data?: { message?: string };
          message: string;
        };

        if (apiError.status === 401) {
          errorTitle = "認証エラー";
          errorMessage =
            "認証が必要です。ログインしてから再度お試しください。";
        } else if (apiError.status === 422) {
          errorTitle = "入力エラー";
          errorMessage = "入力内容に誤りがあります。入力内容を確認してください。";
        } else if (apiError.status === 0) {
          errorTitle = "ネットワークエラー";
          errorMessage =
            "ネットワークエラーが発生しました。接続を確認してください。";
        } else if (apiError.data?.message) {
          errorMessage = apiError.data.message;
        } else {
          errorMessage = error.message;
        }
      }

      // エラートーストを表示
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
      company: "",
      salary: "",
      location: "",
      jobType: "",
      requirements: "",
      price: "",
      condition: "",
      category: "",
      images: "",
      eventDate: "",
      eventTime: "",
      venue: "",
      organizer: "",
      maxAttendees: "",
      address: "",
      rent: "",
      size: "",
      rooms: "",
      utilities: "",
      parking: "",
      petPolicy: "",
      businessHours: "",
      website: "",
      services: "",
      storeAddress: "",
      storeType: "",
    });
  };

  const getContentTypeLabel = (type: ContentType) => {
    switch (type) {
      case "job":
        return "求人情報";
      case "product":
        return "フリマ商品情報";
      case "event":
        return "イベント情報";
      case "property":
        return "賃貸情報";
      case "store":
        return "商店街情報";
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              登録完了！
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {getContentTypeLabel(contentType)}の登録が完了しました。
            </p>
            <Button
              onClick={() => setIsSuccess(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              新しい投稿を作成
            </Button>
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              新規投稿作成
            </h1>
            <p className="text-gray-600">
              投稿したい情報の種類を選択して、詳細を入力してください
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardContent className="p-6">
                {/* 投稿タイプ選択 */}
                <div className="mb-8">
                  <Label className="text-lg font-semibold mb-4 block">
                    投稿タイプを選択
                  </Label>
                  <select
                    value={contentType}
                    onChange={(e) =>
                      setContentType(e.target.value as ContentType)
                    }
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="job">求人情報</option>
                    <option value="product">フリマ商品情報</option>
                    <option value="event">イベント情報</option>
                    <option value="property">賃貸情報</option>
                    <option value="store">商店街情報</option>
                  </select>
                </div>

                {/* 共通フィールド */}
                <div className="space-y-6 mb-8">
                  <div>
                    <Label htmlFor="title">タイトル *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder={`${getContentTypeLabel(
                        contentType
                      )}のタイトルを入力`}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">詳細説明 *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="詳細な説明を入力してください"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactEmail">連絡先メール *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) =>
                          handleInputChange("contactEmail", e.target.value)
                        }
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">連絡先電話番号</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) =>
                          handleInputChange("contactPhone", e.target.value)
                        }
                        placeholder="+1-416-555-0123"
                      />
                    </div>
                  </div>
                </div>

                {/* 求人情報フィールド */}
                {contentType === "job" && (
                  <div className="space-y-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
                      求人詳細情報
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">会社名 *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) =>
                            handleInputChange("company", e.target.value)
                          }
                          placeholder="会社名を入力"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="salary">給与 *</Label>
                        <Input
                          id="salary"
                          value={formData.salary}
                          onChange={(e) =>
                            handleInputChange("salary", e.target.value)
                          }
                          placeholder="例: $50,000 - $70,000"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">勤務地 *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                          placeholder="勤務地を入力"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="jobType">雇用形態 *</Label>
                        <select
                          value={formData.jobType}
                          onChange={(e) =>
                            handleInputChange("jobType", e.target.value)
                          }
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="">雇用形態を選択</option>
                          <option value="fulltime">正社員</option>
                          <option value="parttime">パートタイム</option>
                          <option value="contract">契約社員</option>
                          <option value="intern">インターン</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="requirements">応募要件</Label>
                      <Textarea
                        id="requirements"
                        value={formData.requirements}
                        onChange={(e) =>
                          handleInputChange("requirements", e.target.value)
                        }
                        placeholder="必要なスキル、経験、資格などを入力"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* フリマ商品情報フィールド */}
                {contentType === "product" && (
                  <div className="space-y-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <ShoppingBag className="w-5 h-5 mr-2 text-blue-500" />
                      商品詳細情報
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="price">価格 *</Label>
                        <Input
                          id="price"
                          value={formData.price}
                          onChange={(e) =>
                            handleInputChange("price", e.target.value)
                          }
                          placeholder="¥1,000"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="condition">商品状態 *</Label>
                        <select
                          value={formData.condition}
                          onChange={(e) =>
                            handleInputChange("condition", e.target.value)
                          }
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="">商品状態を選択</option>
                          <option value="new">新品</option>
                          <option value="like-new">ほぼ新品</option>
                          <option value="good">良好</option>
                          <option value="fair">可</option>
                          <option value="poor">要修理</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="category">カテゴリ *</Label>
                        <select
                          value={formData.category}
                          onChange={(e) =>
                            handleInputChange("category", e.target.value)
                          }
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="">カテゴリを選択</option>
                          <option value="electronics">電化製品</option>
                          <option value="clothing">衣類</option>
                          <option value="furniture">家具</option>
                          <option value="books">書籍</option>
                          <option value="sports">スポーツ用品</option>
                          <option value="other">その他</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="images">商品画像URL</Label>
                      <Input
                        id="images"
                        value={formData.images}
                        onChange={(e) =>
                          handleInputChange("images", e.target.value)
                        }
                        placeholder="商品画像のURLを入力（複数の場合は改行で区切る）"
                      />
                    </div>
                  </div>
                )}

                {/* イベント情報フィールド */}
                {contentType === "event" && (
                  <div className="space-y-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                      イベント詳細情報
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventDate">開催日 *</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={formData.eventDate}
                          onChange={(e) =>
                            handleInputChange("eventDate", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventTime">開催時間 *</Label>
                        <Input
                          id="eventTime"
                          type="time"
                          value={formData.eventTime}
                          onChange={(e) =>
                            handleInputChange("eventTime", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="venue">会場 *</Label>
                        <Input
                          id="venue"
                          value={formData.venue}
                          onChange={(e) =>
                            handleInputChange("venue", e.target.value)
                          }
                          placeholder="イベント会場を入力"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="organizer">主催者 *</Label>
                        <Input
                          id="organizer"
                          value={formData.organizer}
                          onChange={(e) =>
                            handleInputChange("organizer", e.target.value)
                          }
                          placeholder="主催者名を入力"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="maxAttendees">最大参加人数</Label>
                      <Input
                        id="maxAttendees"
                        type="number"
                        value={formData.maxAttendees}
                        onChange={(e) =>
                          handleInputChange("maxAttendees", e.target.value)
                        }
                        placeholder="例: 50"
                      />
                    </div>
                  </div>
                )}

                {/* 賃貸情報フィールド */}
                {contentType === "property" && (
                  <div className="space-y-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <Home className="w-5 h-5 mr-2 text-blue-500" />
                      物件詳細情報
                    </h3>

                    <div>
                      <Label htmlFor="address">住所 *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="完全な住所を入力"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="rent">家賃 *</Label>
                        <Input
                          id="rent"
                          value={formData.rent}
                          onChange={(e) =>
                            handleInputChange("rent", e.target.value)
                          }
                          placeholder="¥150,000"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="size">広さ (m²) *</Label>
                        <Input
                          id="size"
                          type="number"
                          value={formData.size}
                          onChange={(e) =>
                            handleInputChange("size", e.target.value)
                          }
                          placeholder="50"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="rooms">部屋数 *</Label>
                        <Input
                          id="rooms"
                          type="number"
                          value={formData.rooms}
                          onChange={(e) =>
                            handleInputChange("rooms", e.target.value)
                          }
                          placeholder="2"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="utilities">光熱費</Label>
                        <Input
                          id="utilities"
                          value={formData.utilities}
                          onChange={(e) =>
                            handleInputChange("utilities", e.target.value)
                          }
                          placeholder="例: 電気・ガス・水道込み"
                        />
                      </div>
                      <div>
                        <Label htmlFor="parking">駐車場</Label>
                        <Input
                          id="parking"
                          value={formData.parking}
                          onChange={(e) =>
                            handleInputChange("parking", e.target.value)
                          }
                          placeholder="例: 1台分含む"
                        />
                      </div>
                      <div>
                        <Label htmlFor="petPolicy">ペット</Label>
                        <Input
                          id="petPolicy"
                          value={formData.petPolicy}
                          onChange={(e) =>
                            handleInputChange("petPolicy", e.target.value)
                          }
                          placeholder="例: ペット可"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 商店街情報フィールド */}
                {contentType === "store" && (
                  <div className="space-y-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <Store className="w-5 h-5 mr-2 text-blue-500" />
                      商店街情報
                    </h3>

                    <div>
                      <Label htmlFor="businessHours">営業時間 *</Label>
                      <Input
                        id="businessHours"
                        value={formData.businessHours}
                        onChange={(e) =>
                          handleInputChange("businessHours", e.target.value)
                        }
                        placeholder="例: 月-金 9:00-18:00、土日 10:00-17:00"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">ウェブサイト</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        placeholder="例: https://example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="services">サービス・設備</Label>
                      <Textarea
                        id="services"
                        value={formData.services}
                        onChange={(e) =>
                          handleInputChange("services", e.target.value)
                        }
                        placeholder="提供しているサービスや設備について詳しく入力してください（例: 駐車場あり、Wi-Fi完備、デリバリー対応、24時間営業など）"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="storeAddress">店舗住所 *</Label>
                      <Input
                        id="storeAddress"
                        value={formData.storeAddress}
                        onChange={(e) =>
                          handleInputChange("storeAddress", e.target.value)
                        }
                        placeholder="完全な住所を入力"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="storeType">店舗種類 *</Label>
                      <select
                        value={formData.storeType}
                        onChange={(e) =>
                          handleInputChange("storeType", e.target.value)
                        }
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">店舗種類を選択</option>
                        <option value="restaurant">レストラン・飲食店</option>
                        <option value="cafe">カフェ・喫茶店</option>
                        <option value="grocery">食料品店・スーパー</option>
                        <option value="bakery">パン屋・ベーカリー</option>
                        <option value="clothing">衣料品店</option>
                        <option value="electronics">電化製品店</option>
                        <option value="pharmacy">薬局・ドラッグストア</option>
                        <option value="beauty">美容院・サロン</option>
                        <option value="bank">銀行・金融機関</option>
                        <option value="convenience">
                          コンビニエンスストア
                        </option>
                        <option value="other">その他</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* 送信ボタン */}
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        登録中...
                      </div>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        登録する
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
