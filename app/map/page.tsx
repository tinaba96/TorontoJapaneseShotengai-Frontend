import { MapPin } from "lucide-react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import InteractiveMap from "@/components/map/interactive-map";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <main className="flex-grow">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-gradient-sumi text-washi-50">
          <div className="pointer-events-none absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-sakura-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-20 h-[32rem] w-[32rem] rounded-full bg-gold-500/20 blur-3xl" />
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
          </div>
          <div className="divider-gold" />
        </section>

        {/* MAP */}
        <section className="container mx-auto px-4 lg:px-8 py-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-sumi-100 bg-white shadow-elegant ring-1 ring-gold-200/40">
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.3em] text-sumi-700 ring-1 ring-sumi-100 shadow-glow-soft">
              <MapPin className="h-3 w-3 text-sakura-500" />
              Toronto · ON
            </div>
            <div className="w-full aspect-[4/3]">
              <InteractiveMap />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
