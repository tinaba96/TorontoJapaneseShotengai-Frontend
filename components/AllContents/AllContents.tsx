import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

type ContentTile = {
  href: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  span: string; // tailwind grid span classes
  accent: "sakura" | "gold" | "indigo";
  external?: boolean;
};

const tiles: ContentTile[] = [
  {
    href: "/events",
    title: "EVENT · CAMPAIGN",
    subtitle: "開催中のイベント・キャンペーン",
    image: "/images/default2.png",
    alt: "EVENT, CAMPAIGN",
    span: "md:col-span-2 md:row-span-2",
    accent: "sakura",
  },
  {
    href: "/blogs/",
    title: "BLOG",
    subtitle: "TJSのお店をご紹介",
    image: "/images/default.png",
    alt: "BLOG",
    span: "md:col-span-1",
    accent: "indigo",
  },
  {
    href: "/map/",
    title: "MAP",
    subtitle: "TJSのお店を探す",
    image: "/images/default.png",
    alt: "MAP",
    span: "md:col-span-1",
    accent: "gold",
  },
  {
    href: "https://forms.gle/nNQfVLwU6yrVL2DC6/",
    title: "TENANT OWNER",
    subtitle: "テナント事業者様へ",
    image: "/images/default2.png",
    alt: "TENANT OWNER",
    span: "md:col-span-2",
    accent: "sakura",
    external: true,
  },
];

const accentMap: Record<ContentTile["accent"], string> = {
  sakura:
    "from-sakura-500/80 via-sakura-700/70 to-sumi-900/80 group-hover:from-sakura-400/80 group-hover:to-sumi-900/90",
  gold:
    "from-gold-500/80 via-gold-700/70 to-sumi-900/80 group-hover:from-gold-300/80 group-hover:to-sumi-900/90",
  indigo:
    "from-sumi-700/70 via-sumi-800/70 to-sumi-900/80 group-hover:from-sakura-700/60 group-hover:to-sumi-900/90",
};

const AllContents = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Marquee banner */}
      <Link
        href="https://forms.gle/nNQfVLwU6yrVL2DC6/"
        target="_blank"
        className="group block relative overflow-hidden bg-gradient-sumi"
      >
        <div className="divider-gold" />
        <div className="relative flex items-center py-6">
          <div className="flex animate-marquee whitespace-nowrap will-change-transform">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-4 px-8 font-display text-2xl md:text-3xl font-bold tracking-wider text-washi-50"
              >
                <Sparkles className="h-5 w-5 text-gold-400" />
                <span>FOR BUSINESS</span>
                <span className="text-gradient-gold">企業様向け新規登録</span>
                <Sparkles className="h-5 w-5 text-sakura-400" />
              </span>
            ))}
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-sumi-900 shadow-glow-gold transition-transform group-hover:scale-105">
            登録はこちら
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="divider-gold" />
      </Link>

      <div className="container mx-auto px-4 lg:px-8 mt-16">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="section-eyebrow">
            <span className="h-px w-8 bg-gold-400" />
            Discover · 体験
            <span className="h-px w-8 bg-gold-400" />
          </div>
          <h2 className="mt-4 section-heading text-sumi-800">
            <span className="text-gradient-aurora">Explore</span>{" "}
            <span className="font-jp text-sumi-700">商店街をめぐる</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-sumi-500">
            イベント、お店、地図、ブログ。
            あなたの今日に、ちょうどいい一杯を。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[240px] gap-5">
          {tiles.map((tile) => (
              <Link
                key={tile.href + tile.title}
                href={tile.href}
                target={tile.external ? "_blank" : undefined}
                className={`group relative block min-h-[280px] md:min-h-0 overflow-hidden rounded-3xl bg-sumi-900 ring-1 ring-sumi-100/60 shadow-elegant transition-all duration-500 hover:-translate-y-1 hover:shadow-glow ${tile.span}`}
              >
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${accentMap[tile.accent]}`}
                />

                {/* Subtle grain overlay for texture */}
                <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-noise" />

                {/* Arrow badge */}
                <div className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/20 transition-all duration-500 group-hover:bg-white/25 group-hover:scale-110">
                  <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-500 group-hover:rotate-12" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-washi-50/70 mb-2">
                    {tile.accent === "sakura"
                      ? "Featured"
                      : tile.accent === "gold"
                      ? "Curated"
                      : "Stories"}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white text-shadow-elegant">
                    {tile.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-washi-100/85 font-jp">
                    {tile.subtitle}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 opacity-0 -translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>Discover more</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AllContents;
