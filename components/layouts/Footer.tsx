import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden bg-gradient-sumi text-washi-50">
      {/* Decorative top hairline */}
      <div className="divider-gold" />

      {/* Decorative aurora glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[140%] -translate-x-1/2 rounded-full bg-gradient-sakura opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand block */}
          <div className="md:col-span-5">
            <div className="section-eyebrow text-gold-400">
              <span className="h-px w-8 bg-gold-400" />
              Toronto · Tokyo Vibes
            </div>
            <h3 className="mt-3 font-display text-3xl font-bold text-washi-50">
              Toronto Japanese{" "}
              <span className="text-gradient-gold">Shotengai</span>
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-washi-100/70">
              トロントの日本人コミュニティをつなぐ、オンライン商店街。
              人と店、文化と暮らし。すべての出会いを、心地よく。
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-sakura-400/50 hover:bg-sakura-500/10 hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-washi-100/80 transition-colors group-hover:text-sakura-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-red-400/50 hover:bg-red-500/10 hover:-translate-y-0.5"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-washi-100/80 transition-colors group-hover:text-red-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-blue-400/50 hover:bg-blue-500/10 hover:-translate-y-0.5"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-washi-100/80 transition-colors group-hover:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { href: "/about", label: "TJSについて" },
                { href: "/jobs", label: "求人情報" },
                { href: "/rental-properties", label: "賃貸情報" },
                { href: "/events", label: "イベント" },
                { href: "/fm", label: "フリマ" },
                { href: "/company", label: "会社概要" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-washi-100/70 transition-colors hover:text-sakura-300"
                  >
                    <span className="h-px w-3 bg-gold-400/60 transition-all group-hover:w-5 group-hover:bg-sakura-400" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
              Contact
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-washi-100/80">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-white/5 border border-white/10">
                  <MapPin className="h-3.5 w-3.5 text-gold-400" />
                </span>
                <span className="leading-relaxed">
                  123 Garden ave, Toronto,
                  <br />
                  ONTARIO, M4N 5M1
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/5 border border-white/10">
                  <Phone className="h-3.5 w-3.5 text-gold-400" />
                </span>
                <span>06-1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/5 border border-white/10">
                  <Mail className="h-3.5 w-3.5 text-gold-400" />
                </span>
                <a
                  href="mailto:info@tjs.com"
                  className="hover:text-sakura-300 transition-colors"
                >
                  info@tjs.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-gold mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-washi-100/50 md:flex-row">
          <span>&copy; 2025 Toronto Japanese Shotengai. All rights reserved.</span>
          <span className="font-jp tracking-widest text-gold-400/80">
            縁を、つなぐ。
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
