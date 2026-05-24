import Link from "next/link";
import { ArrowUpRight, Home as HomeIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-sumi text-washi-50 px-4">
      <div className="relative text-center max-w-lg">
        <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-sakura-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-gold-500/25 blur-3xl" />
        <div className="relative">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-gold text-sumi-900 shadow-glow-gold">
            <HomeIcon className="h-7 w-7" />
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-extrabold text-balance">
            Toronto Japanese{" "}
            <span className="text-gradient-gold">Shotengai</span>
          </h1>
          <p className="mt-4 text-washi-100/75">
            トップページに移動して、商店街をめぐりましょう。
          </p>
          <Link
            href="/"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-sakura px-7 py-3.5 text-sm font-bold text-white shadow-glow btn-glow transition-all hover:-translate-y-0.5"
          >
            ホームへ
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
          </Link>
        </div>
      </div>
    </div>
  );
}
