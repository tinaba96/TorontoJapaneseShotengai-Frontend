import Link from "next/link";
import { ArrowUpRight, Mail, Store } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-sumi p-10 md:p-16 shadow-elegant ring-1 ring-gold-400/20">
          {/* Aurora */}
          <div className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-sakura-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-gold-500/25 blur-3xl" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 text-washi-50">
              <div className="section-eyebrow text-gold-400">
                <span className="h-px w-8 bg-gold-400" />
                Join the Shotengai
              </div>
              <h2 className="mt-4 font-display text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-balance">
                <span className="text-gradient-gold">出店</span>するなら、
                <br className="hidden md:block" />
                ここから。
              </h2>
              <p className="mt-5 max-w-xl text-base md:text-lg text-washi-100/80">
                テナント事業者様、フリマ出品者様、ともに商店街を育てる仲間を募集中。
                登録はカンタン、最短即日で公開。
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="https://forms.gle/nNQfVLwU6yrVL2DC6/"
                  target="_blank"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-bold text-sumi-900 shadow-glow-gold btn-glow transition-all hover:-translate-y-0.5"
                >
                  <Store className="h-4 w-4" />
                  企業様 新規登録
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
                </Link>
                <Link
                  href="/create"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-7 py-3.5 text-sm font-semibold text-washi-50 transition-all hover:bg-white/10 hover:-translate-y-0.5"
                >
                  投稿を作成する
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Right side editorial card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-white/5 backdrop-blur-md border border-white/15 p-7 ring-1 ring-inset ring-white/10">
                <div className="absolute -top-3 -right-3 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-sakura text-white shadow-glow rotate-3">
                  <Mail className="h-5 w-5" />
                </div>

                <div className="font-jp text-sm text-gold-300 tracking-[0.3em]">
                  お問い合わせ
                </div>
                <p className="mt-3 font-display text-2xl md:text-3xl font-bold leading-snug text-washi-50">
                  迷ったら、まずは
                  <br />
                  メッセージから。
                </p>
                <p className="mt-3 text-sm text-washi-100/70">
                  小さな質問も歓迎です。あなたの一歩を、
                  <span className="text-sakura-300">私たちが後押し</span>
                  します。
                </p>

                <a
                  href="mailto:info@tjs.com"
                  className="group mt-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-washi-50 ring-1 ring-white/15 transition-all hover:bg-white/15"
                >
                  <span className="text-gradient-gold">info@tjs.com</span>
                  <ArrowUpRight className="h-4 w-4 text-gold-300 transition-transform group-hover:rotate-12" />
                </a>

                {/* Numbered list */}
                <ul className="mt-7 space-y-3 text-sm">
                  {["登録は無料", "最短即日で公開", "サポートも安心"].map(
                    (t, i) => (
                      <li
                        key={t}
                        className="flex items-center gap-3 text-washi-100/80"
                      >
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-gold text-[10px] font-bold text-sumi-900">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {t}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
