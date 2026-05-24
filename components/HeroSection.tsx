import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-sumi text-washi-50">
      {/* Aurora glow */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-96 w-96 rounded-full bg-sakura-500/30 blur-3xl animate-pulse-soft" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-gold-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay bg-noise" />
      <div className="divider-gold" />

      <div className="relative container mx-auto px-4 lg:px-8 py-20 md:py-28 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-300">
          <Sparkles className="h-3.5 w-3.5" />
          Free Market · フリーマーケット
        </div>

        <h1 className="mt-6 font-display text-5xl md:text-7xl font-extrabold tracking-tight text-balance">
          ここでしか出会えない、
          <br className="hidden md:block" />
          <span className="text-gradient-gold">あなたの宝物</span>。
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-washi-100/85 leading-relaxed">
          ユニークな商品と、誰かの物語。
          カナダにいながら、日本の温度を手に入れよう。
        </p>

        <div className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-washi-100/50 font-mono">
          <span className="h-px w-10 bg-gold-400/60" />
          Scroll to explore
          <span className="h-px w-10 bg-gold-400/60" />
        </div>
      </div>
      <div className="divider-gold" />
    </div>
  );
}
