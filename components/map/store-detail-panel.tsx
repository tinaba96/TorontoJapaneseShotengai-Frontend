"use client";

import { useEffect } from "react";
import {
  X,
  Phone,
  Clock,
  Globe,
  Star,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Store } from "@/lib/genre-data";

interface StoreDetailPanelProps {
  store: Store | null;
  onClose: () => void;
}

export default function StoreDetailPanel({
  store,
  onClose,
}: StoreDetailPanelProps) {
  // Close on ESC
  useEffect(() => {
    if (!store) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [store, onClose]);

  return (
    <AnimatePresence>
      {store && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-sumi-900/60 backdrop-blur-md"
            style={{ zIndex: 60 }}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-0 grid place-items-center p-4 md:p-8 pointer-events-none"
            style={{ zIndex: 61 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-detail-title"
          >
            <div className="pointer-events-auto relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[2rem] bg-white shadow-elegant ring-1 ring-gold-400/30 flex flex-col">
              {/* HERO HEADER */}
              <div className="relative overflow-hidden bg-gradient-sumi text-washi-50 p-7 md:p-9">
                {/* Aurora glows */}
                <div className="pointer-events-none absolute -top-32 -right-20 h-72 w-72 rounded-full bg-sakura-500/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-gold-500/25 blur-3xl" />
                {/* Grid subtle pattern */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                />
                {/* Top hairline */}
                <div className="divider-gold absolute top-0 inset-x-0" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-gold-300">
                      <Sparkles className="h-3 w-3" />
                      Store · 店舗詳細
                    </div>
                    <h2
                      id="store-detail-title"
                      className="mt-4 font-display text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-balance text-washi-50 break-words"
                    >
                      {store.name}
                    </h2>
                    {store.description && (
                      <p className="mt-3 text-sm md:text-base text-washi-100/80 leading-relaxed">
                        {store.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={onClose}
                    aria-label="閉じる"
                    className="shrink-0 grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-white/15 text-washi-50 backdrop-blur transition-all hover:bg-white/20 hover:rotate-90 hover:-translate-y-0.5"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Rating chip pinned to bottom-left of hero */}
                {store.storeInfo?.rating && (
                  <div className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-3.5 py-1.5 text-sumi-900 shadow-glow-gold">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="font-bold text-sm">
                      {store.storeInfo.rating}
                    </span>
                    <span className="text-xs opacity-75">/ 5.0</span>
                  </div>
                )}
              </div>

              {/* BODY */}
              <div className="flex-1 overflow-y-auto bg-gradient-to-b from-washi-50 to-white">
                <div className="p-7 md:p-9 space-y-5">
                  {/* Extended description */}
                  {store.storeInfo?.description && (
                    <div className="rounded-2xl border border-sumi-100 bg-white p-5 shadow-glow-soft">
                      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500">
                        About
                      </div>
                      <p className="mt-2 text-sm text-sumi-700 leading-relaxed">
                        {store.storeInfo.description}
                      </p>
                    </div>
                  )}

                  {/* Info grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {store.storeInfo?.hours && (
                      <InfoTile
                        icon={<Clock className="h-4 w-4" />}
                        label="Hours · 営業時間"
                        accent="sakura"
                      >
                        <p className="text-sm text-sumi-700 break-words">
                          {store.storeInfo.hours}
                        </p>
                      </InfoTile>
                    )}

                    {store.storeInfo?.phone && (
                      <InfoTile
                        icon={<Phone className="h-4 w-4" />}
                        label="Phone · 電話"
                        accent="gold"
                      >
                        <a
                          href={`tel:${store.storeInfo.phone}`}
                          className="text-sm font-semibold text-sumi-800 hover:text-sakura-600 transition-colors break-all"
                        >
                          {store.storeInfo.phone}
                        </a>
                      </InfoTile>
                    )}

                    <InfoTile
                      icon={<MapPin className="h-4 w-4" />}
                      label="Location · 場所"
                      accent="indigo"
                    >
                      <p className="text-sm text-sumi-700">店舗・施設</p>
                    </InfoTile>

                    {store.storeInfo?.website && (
                      <InfoTile
                        icon={<Globe className="h-4 w-4" />}
                        label="Website · サイト"
                        accent="sakura"
                      >
                        <a
                          href={store.storeInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-sakura-600 hover:text-sakura-700 break-all"
                        >
                          公式サイト
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </InfoTile>
                    )}
                  </div>

                  {/* Services */}
                  {store.storeInfo?.services &&
                    store.storeInfo.services.length > 0 && (
                      <div className="rounded-2xl border border-sumi-100 bg-white p-5 shadow-glow-soft">
                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500">
                          <Tag className="h-3 w-3" />
                          Services · サービス・設備
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {store.storeInfo.services.map((service, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-sakura-50 to-gold-50 ring-1 ring-gold-200/60 px-3 py-1 text-xs font-semibold text-sumi-700"
                            >
                              <Sparkles className="h-3 w-3 text-gold-500" />
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="relative border-t border-sumi-100 bg-white/90 backdrop-blur p-5">
                <div className="divider-gold absolute top-0 inset-x-0" />
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                  {store.storeInfo?.phone && (
                    <a
                      href={`tel:${store.storeInfo.phone}`}
                      className="group inline-flex items-center justify-center gap-2 rounded-full border border-sumi-200 bg-white px-5 py-2.5 text-sm font-semibold text-sumi-700 transition-all hover:border-sakura-300 hover:text-sakura-600 hover:-translate-y-0.5"
                    >
                      <Phone className="h-4 w-4" />
                      電話する
                    </a>
                  )}
                  {store.storeInfo?.website ? (
                    <a
                      href={store.storeInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-sakura px-5 py-2.5 text-sm font-bold text-white shadow-glow btn-glow transition-all hover:-translate-y-0.5"
                    >
                      公式サイトへ
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
                    </a>
                  ) : (
                    <button
                      onClick={onClose}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-sumi-800 px-5 py-2.5 text-sm font-bold text-washi-50 shadow-glow-soft btn-glow transition-all hover:bg-sumi-900 hover:-translate-y-0.5"
                    >
                      閉じる
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const accentStyles: Record<string, string> = {
  sakura:
    "bg-gradient-sakura text-white shadow-glow",
  gold: "bg-gradient-gold text-sumi-900 shadow-glow-gold",
  indigo: "bg-sumi-800 text-washi-50 shadow-glow-soft",
};

function InfoTile({
  icon,
  label,
  children,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  accent: "sakura" | "gold" | "indigo";
}) {
  return (
    <div className="group rounded-2xl border border-sumi-100 bg-white p-4 shadow-glow-soft transition-all duration-300 hover:shadow-elegant hover:-translate-y-0.5">
      <div className="flex items-center gap-2.5">
        <span
          className={`grid h-8 w-8 place-items-center rounded-xl ${accentStyles[accent]}`}
        >
          {icon}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-sumi-400">
          {label}
        </span>
      </div>
      <div className="mt-3 pl-[2.625rem]">{children}</div>
    </div>
  );
}
