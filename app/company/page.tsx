"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  Calendar,
  Banknote,
  Users,
  Briefcase,
  MapPin,
  Lightbulb,
  Target,
  Heart,
  Globe,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

interface InfoRow {
  icon: React.ReactNode;
  title: string;
  content: string;
}

interface Strength {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: "sakura" | "gold" | "indigo";
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const infoRows: InfoRow[] = [
  { icon: <Building2 className="h-4 w-4" />, title: "会社名", content: "ACME株式会社" },
  { icon: <Calendar className="h-4 w-4" />, title: "設立", content: "2010年4月1日" },
  { icon: <Banknote className="h-4 w-4" />, title: "資本金", content: "1億円" },
  { icon: <Users className="h-4 w-4" />, title: "従業員数", content: "150名" },
  {
    icon: <Briefcase className="h-4 w-4" />,
    title: "事業内容",
    content: "ITコンサルティング、ソフトウェア開発、クラウドサービス提供",
  },
  {
    icon: <MapPin className="h-4 w-4" />,
    title: "所在地",
    content: "〒100-0005 東京都千代田区丸の内1-1-1",
  },
];

const strengths: Strength[] = [
  {
    title: "革新的な技術",
    description:
      "最新のテクノロジーを駆使し、常に業界の最前線で革新的なソリューションを提供します。",
    icon: <Lightbulb className="h-5 w-5" />,
    accent: "sakura",
  },
  {
    title: "顧客中心主義",
    description:
      "お客様のニーズを深く理解し、カスタマイズされたサービスを提供することで、長期的な信頼関係を築きます。",
    icon: <Target className="h-5 w-5" />,
    accent: "gold",
  },
  {
    title: "グローバルな視点",
    description:
      "国際的なネットワークを活かし、グローバル市場でのビジネス展開をサポートします。",
    icon: <Globe className="h-5 w-5" />,
    accent: "indigo",
  },
];

const accentClass: Record<Strength["accent"], string> = {
  sakura:
    "from-sakura-50 to-white border-sakura-200/60 [&_.icon-wrap]:bg-gradient-sakura [&_.icon-wrap]:text-white",
  gold: "from-gold-50 to-white border-gold-200/60 [&_.icon-wrap]:bg-gradient-gold [&_.icon-wrap]:text-sumi-900",
  indigo:
    "from-sumi-50 to-white border-sumi-200/60 [&_.icon-wrap]:bg-sumi-800 [&_.icon-wrap]:text-washi-50",
};

export default function Company() {
  return (
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <main className="flex-grow">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-gradient-sumi text-washi-50">
          <div className="pointer-events-none absolute -top-32 left-1/3 h-[28rem] w-[28rem] rounded-full bg-gold-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-20 h-[32rem] w-[32rem] rounded-full bg-sakura-500/20 blur-3xl" />
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

          <div className="relative container mx-auto px-4 lg:px-8 py-20 md:py-28">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-washi-100/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              Corporate · 会社情報
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="mt-6 font-display font-black leading-[0.95] tracking-tight text-balance"
            >
              <span className="block text-5xl md:text-7xl lg:text-8xl">
                <span className="text-gradient-aurora">Company</span>
              </span>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] italic -mt-2">
                <span className="text-gradient-gold">Profile.</span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-8 max-w-2xl text-base md:text-xl text-washi-100/80 leading-relaxed text-balance"
            >
              テクノロジーで、ひとの暮らしを<br className="hidden md:block" />
              <span className="text-gold-300">少し豊かに、確かに前へ</span>。
            </motion.p>
          </div>
          <div className="divider-gold" />
        </section>

        {/* MISSION / VISION */}
        <section className="relative py-24 overflow-hidden">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[120%] -translate-x-1/2 bg-gold-100/40 blur-3xl" />
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <div className="section-eyebrow justify-center inline-flex">
                <span className="h-px w-8 bg-gold-400" />
                Philosophy · 企業理念
                <span className="h-px w-8 bg-gold-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-3xl bg-white border border-sumi-100 p-8 md:p-10 shadow-glow-soft hover:shadow-elegant transition-shadow duration-500"
              >
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-sakura-100/60 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-sakura text-white shadow-glow">
                      <Heart className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500">
                        Mission
                      </div>
                      <h2 className="font-display text-2xl font-bold text-sumi-800">
                        企業理念
                      </h2>
                    </div>
                  </div>
                  <p className="mt-6 text-sumi-600 leading-relaxed">
                    ACMEは、革新的な技術とクリエイティブな発想で、お客様のビジネスに価値を提供し、
                    社会の発展に貢献することを使命としています。私たちは常に挑戦し続け、
                    <span className="text-sakura-600 font-semibold">
                      未来を創造する企業
                    </span>
                    であり続けることを目指しています。
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative overflow-hidden rounded-3xl bg-gradient-sumi text-washi-50 p-8 md:p-10 shadow-elegant"
              >
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gold-500/30 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-sumi-900 shadow-glow-gold">
                      <Target className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-300">
                        Vision
                      </div>
                      <h2 className="font-display text-2xl font-bold text-washi-50">
                        ビジョン
                      </h2>
                    </div>
                  </div>
                  <p className="mt-6 text-washi-100/85 leading-relaxed">
                    テクノロジーの力で、人々の生活を
                    <span className="text-gold-300 font-semibold">
                      より豊かに、より便利に、そしてより楽しく
                    </span>
                    する。私たちは、このビジョンを実現するために日々努力を重ねています。
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CORPORATE INFO TABLE */}
        <section className="relative py-20 bg-gradient-to-b from-washi-50 via-white to-washi-50">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <div className="section-eyebrow justify-center inline-flex">
                <span className="h-px w-8 bg-gold-400" />
                Corporate Info · 企業情報
                <span className="h-px w-8 bg-gold-400" />
              </div>
              <h2 className="mt-4 section-heading text-sumi-800">
                <span className="text-gradient-aurora">Profile</span>{" "}
                <span className="font-jp text-sumi-700">プロフィール</span>
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-3xl border border-sumi-100 bg-white shadow-elegant"
            >
              <ul>
                {infoRows.map((row, i) => (
                  <li
                    key={row.title}
                    className={`group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-3 sm:gap-6 items-center px-6 md:px-10 py-5 transition-colors hover:bg-sakura-50/40 ${
                      i !== infoRows.length - 1 ? "border-b border-sumi-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-sakura-50 to-gold-50 text-gold-600 ring-1 ring-gold-200/50">
                        {row.icon}
                      </span>
                      <span className="font-display text-sm font-bold uppercase tracking-widest text-sumi-700">
                        {row.title}
                      </span>
                    </div>
                    <span className="text-sumi-700 text-sm md:text-base">
                      {row.content}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* STRENGTHS */}
        <section className="relative py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-14">
              <div className="section-eyebrow justify-center inline-flex">
                <span className="h-px w-8 bg-gold-400" />
                Strengths · 私たちの強み
                <span className="h-px w-8 bg-gold-400" />
              </div>
              <h2 className="mt-4 section-heading text-sumi-800">
                <span className="text-gradient-aurora">What we bring</span>{" "}
                <span className="font-jp text-sumi-700">提供する価値</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {strengths.map((s, idx) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br p-7 shadow-glow-soft transition-shadow duration-500 hover:shadow-elegant ${accentClass[s.accent]}`}
                >
                  <div className="icon-wrap grid h-12 w-12 place-items-center rounded-2xl shadow-glow-soft">
                    {s.icon}
                  </div>
                  <div className="mt-5 text-[10px] font-mono uppercase tracking-[0.3em] text-sumi-400">
                    {`0${idx + 1}`} · Strength
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-sumi-800">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-sumi-500 leading-relaxed">
                    {s.description}
                  </p>
                  <ArrowUpRight className="absolute top-6 right-6 h-4 w-4 text-sumi-300 transition-all duration-500 group-hover:text-sakura-500 group-hover:rotate-12" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-sumi p-10 md:p-16 shadow-elegant ring-1 ring-gold-400/20 text-center">
              <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[120%] -translate-x-1/2 bg-gold-500/20 blur-3xl" />
              <h2 className="relative font-display text-3xl md:text-5xl font-extrabold leading-tight text-balance text-washi-50">
                一緒に、<span className="text-gradient-gold">未来を編もう</span>。
              </h2>
              <p className="relative mt-4 max-w-xl mx-auto text-washi-100/80">
                ご質問・ご相談・お仕事のご依頼、お気軽にどうぞ。
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:info@tjs.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-bold text-sumi-900 shadow-glow-gold btn-glow transition-all hover:-translate-y-0.5"
                >
                  <Sparkles className="h-4 w-4" />
                  お問い合わせ
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-7 py-3.5 text-sm font-semibold text-washi-50 transition-all hover:bg-white/10 hover:-translate-y-0.5"
                >
                  TJSについて
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
