"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
  CheckCircle2,
  Store,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

type ContentType = "job" | "product" | "event" | "property" | "store";

interface FormData {
  // 共通
  title: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  // 求人
  company: string;
  salary: string;
  location: string;
  jobType: string;
  requirements: string;
  // フリマ
  price: string;
  condition: string;
  category: string;
  images: string;
  // イベント
  eventDate: string;
  eventTime: string;
  venue: string;
  organizer: string;
  maxAttendees: string;
  // 賃貸
  address: string;
  rent: string;
  size: string;
  rooms: string;
  utilities: string;
  parking: string;
  petPolicy: string;
  // 商店街
  businessHours: string;
  website: string;
  services: string;
  storeAddress: string;
  storeType: string;
}

const contentTypeMeta: Record<
  ContentType,
  { label: string; icon: React.ReactNode; tone: "sakura" | "gold" | "indigo" }
> = {
  job: { label: "求人情報", icon: <Briefcase className="h-5 w-5" />, tone: "sakura" },
  product: { label: "フリマ商品", icon: <ShoppingBag className="h-5 w-5" />, tone: "gold" },
  event: { label: "イベント", icon: <Calendar className="h-5 w-5" />, tone: "sakura" },
  property: { label: "賃貸物件", icon: <Home className="h-5 w-5" />, tone: "indigo" },
  store: { label: "商店街店舗", icon: <Store className="h-5 w-5" />, tone: "gold" },
};

const toneClasses: Record<string, string> = {
  sakura:
    "data-[active=true]:bg-gradient-sakura data-[active=true]:text-white data-[active=true]:shadow-glow data-[active=true]:border-transparent",
  gold: "data-[active=true]:bg-gradient-gold data-[active=true]:text-sumi-900 data-[active=true]:shadow-glow-gold data-[active=true]:border-transparent",
  indigo:
    "data-[active=true]:bg-sumi-800 data-[active=true]:text-washi-50 data-[active=true]:shadow-elegant data-[active=true]:border-transparent",
};

const selectClass =
  "flex h-10 w-full items-center justify-between rounded-md border border-sumi-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:border-sakura-300 focus:ring-2 focus:ring-sakura-200/40 disabled:cursor-not-allowed disabled:opacity-50";

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

  const getContentTypeLabel = (type: ContentType) => contentTypeMeta[type].label;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (contentType === "event") {
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
        toast({
          title: "イベント登録完了",
          description: "イベントが正常に登録されました。",
          variant: "default",
        });
        setTimeout(() => {
          setIsSuccess(false);
          resetForm();
        }, 3000);
      } else if (contentType === "job") {
        const { createJob } = await import("@/app/lib/api/jobs");
        const jobData = {
          title: formData.title,
          description: formData.description,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone || undefined,
          company: formData.company,
          salary: formData.salary,
          location: formData.location,
          jobType: formData.jobType,
          requirements: formData.requirements || undefined,
        };
        await createJob(jobData);
        setIsSubmitting(false);
        setIsSuccess(true);
        toast({
          title: "求人情報登録完了",
          description: "求人情報が正常に登録されました。",
          variant: "default",
        });
        setTimeout(() => {
          setIsSuccess(false);
          resetForm();
        }, 3000);
      } else if (contentType === "product") {
        const { createProduct } = await import("@/app/lib/api/products");
        const productData = {
          title: formData.title,
          description: formData.description,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone || undefined,
          price: formData.price,
          condition: formData.condition,
          category: formData.category,
          images: formData.images || undefined,
        };
        await createProduct(productData);
        setIsSubmitting(false);
        setIsSuccess(true);
        toast({
          title: "商品登録完了",
          description: "フリマ商品が正常に登録されました。",
          variant: "default",
        });
        setTimeout(() => {
          setIsSuccess(false);
          resetForm();
        }, 3000);
      } else if (contentType === "property") {
        const { createProperty } = await import("@/app/lib/api/properties");
        const propertyData = {
          title: formData.title,
          description: formData.description,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone || undefined,
          address: formData.address,
          rent: formData.rent,
          size: formData.size,
          rooms: formData.rooms,
          utilities: formData.utilities || undefined,
          parking: formData.parking || undefined,
          petPolicy: formData.petPolicy || undefined,
        };
        await createProperty(propertyData);
        setIsSubmitting(false);
        setIsSuccess(true);
        toast({
          title: "賃貸物件登録完了",
          description: "賃貸物件が正常に登録されました。",
          variant: "default",
        });
        setTimeout(() => {
          setIsSuccess(false);
          resetForm();
        }, 3000);
      } else if (contentType === "store") {
        const { createStore } = await import("@/app/lib/api/stores");
        const storeData = {
          title: formData.title,
          description: formData.description,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone || undefined,
          businessHours: formData.businessHours,
          website: formData.website || undefined,
          services: formData.services || undefined,
          storeAddress: formData.storeAddress,
          storeType: formData.storeType,
        };
        await createStore(storeData);
        setIsSubmitting(false);
        setIsSuccess(true);
        toast({
          title: "店舗登録完了",
          description: "商店街店舗が正常に登録されました。",
          variant: "default",
        });
        setTimeout(() => {
          setIsSuccess(false);
          resetForm();
        }, 3000);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("投稿エラー:", error);

      let errorTitle = "登録エラー";
      let errorMessage = "投稿に失敗しました。もう一度お試しください。";

      if (error instanceof Error) {
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

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-washi-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 lg:px-8 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="relative mx-auto w-fit">
              <div className="absolute inset-0 -m-4 rounded-full bg-gradient-sakura blur-2xl opacity-50 animate-pulse-soft" />
              <div className="relative grid h-24 w-24 mx-auto place-items-center rounded-full bg-gradient-sakura text-white shadow-glow ring-4 ring-white">
                <CheckCircle2 className="h-12 w-12" strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="mt-8 font-display text-4xl md:text-5xl font-extrabold text-sumi-800">
              <span className="text-gradient-sakura">登録完了</span>
              <span className="text-gold-500">!</span>
            </h1>
            <p className="mt-4 text-sumi-600">
              {getContentTypeLabel(contentType)}の登録が完了しました。
            </p>
            <Button
              onClick={() => setIsSuccess(false)}
              variant="sakura"
              size="lg"
              className="mt-8"
            >
              <Plus className="h-4 w-4" />
              新しい投稿を作成
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <main className="flex-grow">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-gradient-sumi text-washi-50">
          <div className="pointer-events-none absolute -top-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-sakura-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-[32rem] w-[32rem] rounded-full bg-gold-500/20 blur-3xl" />
          <div className="divider-gold" />
          <div className="relative container mx-auto px-4 lg:px-8 py-14 md:py-20">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-washi-100/60">
              <span className="h-1.5 w-1.5 rounded-full bg-sakura-400 animate-pulse" />
              Create · 新規投稿
            </div>
            <h1 className="mt-6 font-display font-black leading-[0.95] tracking-tight text-balance text-5xl md:text-7xl">
              <span className="text-gradient-aurora">Post</span>{" "}
              <span className="italic text-gradient-gold">something new.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-washi-100/80">
              投稿したい情報を選んで、詳細を入力してください。
            </p>
          </div>
          <div className="divider-gold" />
        </section>

        <section className="container mx-auto px-4 lg:px-8 py-12 max-w-5xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 投稿タイプ選択 */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-sumi-400 mb-4">
                Step 01 · 投稿タイプを選択
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {(Object.keys(contentTypeMeta) as ContentType[]).map((type) => {
                  const meta = contentTypeMeta[type];
                  const active = contentType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      data-active={active}
                      onClick={() => setContentType(type)}
                      className={`group relative rounded-2xl border border-sumi-200 bg-white p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-sakura-200 hover:shadow-glow-soft ${toneClasses[meta.tone]}`}
                    >
                      <span className="block">{meta.icon}</span>
                      <span className="mt-3 block font-display text-sm font-bold">
                        {meta.label}
                      </span>
                      {active && (
                        <Sparkles className="absolute top-3 right-3 h-3.5 w-3.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 共通フィールド */}
            <div className="overflow-hidden rounded-3xl bg-white border border-sumi-100 shadow-glow-soft">
              <div className="flex items-center gap-3 px-7 py-5 border-b border-sumi-100 bg-gradient-to-r from-sakura-50/40 to-transparent">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-sakura text-white shadow-glow">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500">
                    Step 02
                  </div>
                  <h2 className="font-display text-lg font-bold text-sumi-800">
                    基本情報
                  </h2>
                </div>
              </div>

              <div className="p-7 space-y-5">
                <div>
                  <Label htmlFor="title">タイトル *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder={`${getContentTypeLabel(contentType)}のタイトルを入力`}
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
            </div>

            {/* タイプ別フィールド */}
            <div className="overflow-hidden rounded-3xl bg-white border border-sumi-100 shadow-glow-soft">
              <div className="flex items-center gap-3 px-7 py-5 border-b border-sumi-100 bg-gradient-to-r from-gold-50/50 to-transparent">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-gold text-sumi-900 shadow-glow-gold">
                  {contentTypeMeta[contentType].icon}
                </span>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-sakura-500">
                    Step 03
                  </div>
                  <h2 className="font-display text-lg font-bold text-sumi-800">
                    {getContentTypeLabel(contentType)}の詳細
                  </h2>
                </div>
              </div>

              <div className="p-7 space-y-5">
                {/* 求人 */}
                {contentType === "job" && (
                  <>
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
                          className={selectClass}
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
                  </>
                )}

                {/* フリマ */}
                {contentType === "product" && (
                  <>
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
                          className={selectClass}
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
                          className={selectClass}
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
                        placeholder="商品画像のURL（複数の場合は改行で区切る）"
                      />
                    </div>
                  </>
                )}

                {/* イベント */}
                {contentType === "event" && (
                  <>
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
                  </>
                )}

                {/* 賃貸 */}
                {contentType === "property" && (
                  <>
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
                  </>
                )}

                {/* 商店街 */}
                {contentType === "store" && (
                  <>
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
                        placeholder="https://example.com"
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
                        placeholder="提供しているサービスや設備について詳しく入力してください"
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
                        className={selectClass}
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
                  </>
                )}
              </div>
            </div>

            {/* 送信ボタン */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-sakura text-white px-10 py-4 text-base font-bold shadow-glow btn-glow transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    登録中...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    登録する
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
