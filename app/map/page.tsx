import Link from "next/link";
import {
  MapPin,
  Compass,
  MousePointer2,
  Layers,
  Sparkles,
  Utensils,
  ShoppingBag,
  Briefcase,
  HeartPulse,
  ArrowUpRight,
} from "lucide-react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import InteractiveMap from "@/components/map/interactive-map";

const stats = [
  { num: "4", label: "Main Genres", jp: "メインジャンル" },
  { num: "20+", label: "Sub Genres", jp: "サブジャンル" },
  { num: "120+", label: "Local Stores", jp: "登録店舗" },
  { num: "Live", label: "Updates", jp: "随時更新" },
];

const howToSteps = [
  {
    num: "01",
    icon: <Layers className="h-5 w-5" />,
    title: "ジャンルを選ぶ",
    desc: "メインジャンルのエリアをクリックしてサブジャンルへ。",
    accent: "sakura",
  },
  {
    num: "02",
    icon: <MapPin className="h-5 w-5" />,
    title: "ピンをタップ",
    desc: "地図上の店舗ピンをクリックして詳細をチェック。",
    accent: "gold",
  },
  {
    num: "03",
    icon: <MousePointer2 className="h-5 w-5" />,
    title: "詳細を見る",
    desc: "営業時間・サービス・連絡先まで一目で。",
    accent: "indigo",
  },
] as const;

const categories = [
  {
    id: "food",
    icon: <Utensils className="h-5 w-5" />,
    title: "飲食・グルメ",
    desc: "レストラン / カフェ / パン屋 / 食品店",
    accent: "from-orange-50 to-rose-50 ring-orange-200/60",
    chip: "bg-gradient-sakura text-white",
  },
  {
    id: "shopping",
    icon: <ShoppingBag className="h-5 w-5" />,
    title: "ショッピング",
    desc: "百貨店 / 書店 / 衣料品 / 電化製品",
    accent: "from-purple-50 to-pink-50 ring-purple-200/60",
    chip: "bg-gradient-gold text-sumi-900",
  },
  {
    id: "service",
    icon: <Briefcase className="h-5 w-5" />,
    title: "サービス・金融",
    desc: "銀行 / コワーキング / 美容院",
    accent: "from-blue-50 to-indigo-50 ring-blue-200/60",
    chip: "bg-sumi-800 text-washi-50",
  },
  {
    id: "public",
    icon: <HeartPulse className="h-5 w-5" />,
    title: "公共施設・医療",
    desc: "公共施設 / 病院 / 薬局",
    accent: "from-emerald-50 to-teal-50 ring-emerald-200/60",
    chip: "bg-sumi-800 text-washi-50",
  },
];

const accentMap: Record<string, string> = {
  sakura:
    "bg-gradient-sakura text-white shadow-glow ring-sakura-300/40",
  gold:
    "bg-gradient-gold text-sumi-900 shadow-glow-gold ring-gold-300/40",
  indigo:
    "bg-sumi-800 text-washi-50 shadow-glow-soft ring-sumi-300/40",
};

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const placements: Record<string, string> = {
    tl: "top-0 left-0",
    tr: "top-0 right-0 rotate-90",
    bl: "bottom-0 left-0 -rotate-90",
    br: "bottom-0 right-0 rotate-180",
  };
  return (
    <span
      aria-hidden
      className={`absolute ${placements[position]} pointer-events-none`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        className="text-gold-400"
      >
        <path
          d="M2 12V2H12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <main className="flex-grow">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-gradient-sumi text-washi-50">
          <div className="pointer-events-none absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-sakura-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-20 h-[32rem] w-[32rem] rounded-full bg-gold-500/20 blur-3xl" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
          <div className="divider-gold" />
          <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-24">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-washi-100/60">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              MAP · 商店街マップ
            </div>
            <h1 className="mt-6 font-display font-black leading-[0.95] tracking-tight text-balance text-5xl md:text-7xl lg:text-8xl">
              <span className="text-gradient-aurora">Walk the</span>{" "}
              <span className="italic text-gradient-gold">Shotengai.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-washi-100/80">
              トロントのローカル日本店舗を、地図から探す。
              気になるピンをクリックして、お店の詳細へ。
            </p>

            {/* Stats strip */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="group flex flex-col gap-1 p-5 md:p-6 bg-sumi-900/40 transition-colors hover:bg-sumi-900/60"
                >
                  <span className="font-display text-3xl md:text-4xl font-extrabold text-gradient-gold">
                    {s.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-washi-100/60">
                    {s.label}
                  </span>
                  <span className="font-jp text-xs text-washi-100/50">
                    {s.jp}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="divider-gold" />
        </section>

        {/* MAP STAGE */}
        <section className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <div className="section-eyebrow">
                <span className="h-px w-8 bg-gold-400" />
                Interactive · タップで巡る
              </div>
              <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-sumi-800">
                <span className="text-gradient-sakura">Live</span>{" "}
                Map
              </h2>
            </div>
            <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-sumi-200 bg-white/80 backdrop-blur px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-sumi-700 shadow-glow-soft">
              <Compass className="h-3.5 w-3.5 text-gold-500" />
              Toronto · ON · 43°N
            </div>
          </div>

          {/* Map frame with corner brackets */}
          <div className="relative">
            {/* Top-left location badge (outside the map content) */}
            <div className="absolute -top-3 left-6 z-20 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-sumi-900 shadow-glow-gold ring-2 ring-white">
              <MapPin className="h-3.5 w-3.5" />
              You are here
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-sumi-100 bg-white shadow-elegant ring-1 ring-gold-200/40 p-2">
              {/* Corner brackets */}
              <CornerBracket position="tl" />
              <CornerBracket position="tr" />
              <CornerBracket position="bl" />
              <CornerBracket position="br" />

              <div className="rounded-[1.5rem] overflow-hidden aspect-[4/3] bg-washi-50">
                <InteractiveMap />
              </div>
            </div>

            {/* Bottom-right helper chip */}
            <div className="absolute -bottom-3 right-6 z-20 inline-flex items-center gap-2 rounded-full bg-sumi-800 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-washi-50 shadow-elegant ring-2 ring-white">
              <Sparkles className="h-3.5 w-3.5 text-gold-300" />
              Click to explore
            </div>
          </div>
        </section>

        {/* HOW TO USE */}
        <section className="relative py-20 overflow-hidden">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[120%] -translate-x-1/2 bg-gold-100/40 blur-3xl" />
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <div className="section-eyebrow justify-center inline-flex">
                <span className="h-px w-8 bg-gold-400" />
                How to use · 使い方
                <span className="h-px w-8 bg-gold-400" />
              </div>
              <h2 className="mt-4 section-heading text-sumi-800">
                <span className="text-gradient-aurora">3 steps</span>{" "}
                <span className="font-jp text-sumi-700">地図のあるき方</span>
              </h2>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {howToSteps.map((step, i) => (
                <li
                  key={step.num}
                  className="relative overflow-hidden rounded-3xl border border-sumi-100 bg-white p-7 shadow-glow-soft transition-all duration-500 hover:shadow-elegant hover:-translate-y-1"
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl ring-1 ${accentMap[step.accent]}`}
                  >
                    {step.icon}
                  </span>
                  <div className="mt-5 text-[10px] font-mono uppercase tracking-[0.3em] text-sumi-400">
                    Step {step.num}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-sumi-800">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-sumi-500 leading-relaxed">
                    {step.desc}
                  </p>
                  {i < howToSteps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-1/2 right-0 hidden md:block translate-x-1/2 -translate-y-1/2 h-px w-6 bg-gradient-to-r from-gold-400 to-transparent"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <div className="section-eyebrow">
                  <span className="h-px w-8 bg-gold-400" />
                  Browse · カテゴリ別
                </div>
                <h2 className="mt-3 section-heading text-sumi-800">
                  <span className="text-gradient-aurora">Genres</span>{" "}
                  <span className="font-jp text-sumi-700">ジャンルで探す</span>
                </h2>
              </div>
              <p className="max-w-md text-sm text-sumi-500">
                ジャンルから直接お店を絞り込み。
                上のマップで該当エリアをタップしても飛べます。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${cat.accent} ring-1 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant`}
                >
                  <span
                    className={`inline-flex items-center justify-center h-11 w-11 rounded-2xl shadow-glow-soft ${cat.chip}`}
                  >
                    {cat.icon}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-sumi-800">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs text-sumi-500 leading-relaxed">
                    {cat.desc}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.3em] text-sumi-400">
                    Click pins on map
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-sumi p-10 md:p-14 shadow-elegant ring-1 ring-gold-400/20 text-center">
              <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[120%] -translate-x-1/2 bg-sakura-500/20 blur-3xl" />
              <h2 className="relative font-display text-3xl md:text-5xl font-extrabold leading-tight text-balance text-washi-50">
                マップに、<span className="text-gradient-gold">お店</span>を載せる。
              </h2>
              <p className="relative mt-4 max-w-xl mx-auto text-washi-100/80">
                テナント事業者様の登録は無料。最短即日で公開できます。
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="https://forms.gle/nNQfVLwU6yrVL2DC6/"
                  target="_blank"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-bold text-sumi-900 shadow-glow-gold btn-glow transition-all hover:-translate-y-0.5"
                >
                  <Sparkles className="h-4 w-4" />
                  企業様 新規登録
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
                </Link>
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-7 py-3.5 text-sm font-semibold text-washi-50 transition-all hover:bg-white/10 hover:-translate-y-0.5"
                >
                  店舗を投稿
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
