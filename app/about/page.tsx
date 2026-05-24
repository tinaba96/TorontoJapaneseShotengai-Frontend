"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  ShoppingBag,
  Repeat,
  Sparkles,
  ArrowUpRight,
  Heart,
  MapPin,
  Globe,
} from "lucide-react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import SakuraPetals from "../../components/decor/SakuraPetals";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <main className="flex-grow">
        {/* HERO — Editorial */}
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
          <SakuraPetals density="light" />
          <div className="divider-gold" />

          <div className="relative container mx-auto px-4 lg:px-8 py-20 md:py-28">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-washi-100/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sakura-400 animate-pulse" />
              About · TJSについて
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="mt-6 font-display font-black leading-[0.95] tracking-tight text-balance"
            >
              <span className="block text-5xl md:text-7xl lg:text-8xl">
                <span className="text-gradient-aurora">A community,</span>
              </span>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] italic -mt-2">
                <span className="text-gradient-gold">curated.</span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-8 max-w-2xl text-base md:text-xl text-washi-100/80 leading-relaxed text-balance"
            >
              トロントの日本人コミュニティをつなぐ、
              <span className="text-gold-300">オンライン商店街</span>。
              人と人、店と暮らし。すべての出会いを、心地よく。
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link
                href="/map"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-sakura px-7 py-3.5 text-sm font-bold text-white shadow-glow btn-glow transition-all hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4" />
                今すぐ参加する
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-7 py-3.5 text-sm font-semibold text-washi-50 transition-all hover:bg-white/10 hover:-translate-y-0.5"
              >
                イベントを見る
              </Link>
            </motion.div>
          </div>
          <div className="divider-gold" />
        </section>

        {/* MANIFESTO — large quote */}
        <section className="relative py-24 overflow-hidden">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[120%] -translate-x-1/2 bg-gold-200/30 blur-3xl" />
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
            <div className="section-eyebrow justify-center inline-flex">
              <span className="h-px w-8 bg-gold-400" />
              Manifesto · 私たちの想い
              <span className="h-px w-8 bg-gold-400" />
            </div>
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-sumi-800 text-balance"
            >
              <span className="text-gold-500 font-jp">「</span>
              遠く離れていても、
              <br className="hidden md:block" />
              <span className="text-gradient-sakura">縁は、つなげる</span>。
              <span className="text-gold-500 font-jp">」</span>
            </motion.blockquote>
            <p className="mt-6 text-sm md:text-base text-sumi-500 max-w-2xl mx-auto leading-relaxed">
              異国の地でも、ふとした瞬間に故郷を感じる。
              そんな小さな喜びを、もっと身近に。
              TJS は、その「縁」を編む場所です。
            </p>
          </div>
        </section>

        {/* FEATURES — bento */}
        <section className="relative py-20 bg-gradient-to-b from-washi-50 via-white to-washi-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-14">
              <div className="section-eyebrow justify-center inline-flex">
                <span className="h-px w-8 bg-gold-400" />
                Features · TJSの特徴
                <span className="h-px w-8 bg-gold-400" />
              </div>
              <h2 className="mt-4 section-heading text-sumi-800">
                <span className="text-gradient-aurora">Three pillars</span>{" "}
                <span className="font-jp text-sumi-700">3つの柱</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Feature
                idx={0}
                icon={<Users className="h-6 w-6" />}
                title="Community"
                jp="日本人コミュニティ"
                description="同じ境遇の日本人と出会い、つながりを深める。気軽な雑談から、人生の節目まで。"
                accent="sakura"
              />
              <Feature
                idx={1}
                icon={<ShoppingBag className="h-6 w-6" />}
                title="Authentic"
                jp="日本の商品"
                description="懐かしい日本の品、トロントでは手に入りにくいアイテム。日々の暮らしに温度を。"
                accent="gold"
              />
              <Feature
                idx={2}
                icon={<Repeat className="h-6 w-6" />}
                title="Free Market"
                jp="フリーマーケット"
                description="コミュニティ内で、簡単に物々交換や売買。譲って、譲られて、循環する暮らし。"
                accent="indigo"
              />
            </div>
          </div>
        </section>

        {/* STORY — split */}
        <section className="relative py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="section-eyebrow">
                  <span className="h-px w-8 bg-gold-400" />
                  Our Story
                </div>
                <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-sumi-800 text-balance">
                  小さな商店街から、
                  <br />
                  <span className="text-gradient-sakura">大きな縁を</span>。
                </h2>
                <div className="mt-6 text-sm text-sumi-500 leading-relaxed">
                  TJSはトロント在住の日本人有志により始まりました。
                  日本のローカル文化を、海外でも当たり前に楽しめる場所をつくる
                  ― そんな小さな願いが、いまの形に。
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { num: "2025", label: "始動" },
                    { num: "120+", label: "店舗" },
                    { num: "5K+", label: "会員" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-sumi-100 bg-white p-4 text-center shadow-glow-soft"
                    >
                      <div className="font-display text-2xl font-extrabold text-gradient-gold">
                        {s.num}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-widest text-sumi-400">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <ol className="relative space-y-8 before:absolute before:left-5 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-sakura-300 before:via-gold-400 before:to-sumi-200">
                  {[
                    {
                      year: "Step 01",
                      title: "出会いの場をつくる",
                      desc: "イベント、フリマ、メッセージ。きっかけは多い方が、いい。",
                      icon: <Heart className="h-4 w-4" />,
                    },
                    {
                      year: "Step 02",
                      title: "地域を歩いて回る",
                      desc: "MAP からお店を探して、実際に足を運ぶ。デジタルから、リアルへ。",
                      icon: <MapPin className="h-4 w-4" />,
                    },
                    {
                      year: "Step 03",
                      title: "世界へ広げる",
                      desc: "トロントの日本コミュニティを、世界中の人に。文化の架け橋に。",
                      icon: <Globe className="h-4 w-4" />,
                    },
                  ].map((s, i) => (
                    <motion.li
                      key={s.title}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative pl-14"
                    >
                      <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-gradient-sakura text-white shadow-glow ring-4 ring-washi-50">
                        {s.icon}
                      </span>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-gold-500">
                        {s.year}
                      </div>
                      <h3 className="mt-1 font-display text-2xl font-bold text-sumi-800">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm text-sumi-500 leading-relaxed">
                        {s.desc}
                      </p>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-sumi p-10 md:p-16 shadow-elegant ring-1 ring-gold-400/20 text-center">
              <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[120%] -translate-x-1/2 bg-sakura-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72 bg-gold-500/20 blur-3xl" />
              <h2 className="relative font-display text-3xl md:text-5xl font-extrabold leading-tight text-balance text-washi-50">
                さぁ、<span className="text-gradient-gold">縁</span>を編もう。
              </h2>
              <p className="relative mt-4 max-w-xl mx-auto text-washi-100/80">
                登録は無料。今日から、TJS コミュニティの一員に。
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/login"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-bold text-sumi-900 shadow-glow-gold btn-glow transition-all hover:-translate-y-0.5"
                >
                  <Sparkles className="h-4 w-4" />
                  ログイン / 新規登録
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
                </Link>
                <Link
                  href="/company"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-7 py-3.5 text-sm font-semibold text-washi-50 transition-all hover:bg-white/10 hover:-translate-y-0.5"
                >
                  会社情報を見る
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

const accentClass: Record<"sakura" | "gold" | "indigo", string> = {
  sakura:
    "from-sakura-50 to-white border-sakura-200/60 [&_.icon-wrap]:bg-gradient-sakura [&_.icon-wrap]:text-white",
  gold: "from-gold-50 to-white border-gold-200/60 [&_.icon-wrap]:bg-gradient-gold [&_.icon-wrap]:text-sumi-900",
  indigo:
    "from-sumi-50 to-white border-sumi-200/60 [&_.icon-wrap]:bg-sumi-800 [&_.icon-wrap]:text-washi-50",
};

function Feature({
  icon,
  title,
  jp,
  description,
  accent,
  idx,
}: {
  icon: React.ReactNode;
  title: string;
  jp: string;
  description: string;
  accent: "sakura" | "gold" | "indigo";
  idx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br p-7 shadow-glow-soft transition-shadow duration-500 hover:shadow-elegant ${accentClass[accent]}`}
    >
      <div className="icon-wrap grid h-12 w-12 place-items-center rounded-2xl shadow-glow-soft">
        {icon}
      </div>
      <div className="mt-5 text-[10px] font-mono uppercase tracking-[0.3em] text-sumi-400">
        {`0${idx + 1}`} · {title}
      </div>
      <h3 className="mt-2 font-display text-2xl font-bold text-sumi-800">
        {jp}
      </h3>
      <p className="mt-3 text-sm text-sumi-500 leading-relaxed">{description}</p>
      <ArrowUpRight className="absolute top-6 right-6 h-4 w-4 text-sumi-300 transition-all duration-500 group-hover:text-sakura-500 group-hover:rotate-12" />
    </motion.div>
  );
}
