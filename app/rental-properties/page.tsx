"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home as HomeIcon, Plus, ArrowUpRight } from "lucide-react";
import PropertyCard from "../../components/PropertyCard";
import PropertyDetailModal from "../../components/PropertyDetailModal";
import Filter from "../../components/Filter";
import type { Property, FilterOptions } from "../../lib/types";

import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

import { getProperties } from "@/app/lib/api/properties";
import type { PropertyApi } from "@/app/types/property";

function adaptProperty(p: PropertyApi): Property {
  const parsedRent = Number(p.rent.replace(/[^\d.-]/g, ""));
  const parsedSize = Number(p.size);
  const parsedRooms = Number(p.rooms);
  return {
    id: p.id,
    name: p.title,
    address: p.address,
    price: Number.isFinite(parsedRent) ? parsedRent : 0,
    size: Number.isFinite(parsedSize) ? parsedSize : 0,
    rooms: Number.isFinite(parsedRooms) ? parsedRooms : 0,
    imageUrl: "/images/default.png?height=200&width=300",
  };
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProperties();
        const adapted = data.map(adaptProperty);
        setProperties(adapted);
        setFilteredProperties(adapted);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        if (
          err &&
          typeof err === "object" &&
          "status" in err &&
          (err as { status?: number }).status === 404
        ) {
          setProperties([]);
          setFilteredProperties([]);
          setError(null);
          return;
        }
        let errorMessage = "賃貸物件の読み込みに失敗しました";
        if (err && typeof err === "object") {
          const e = err as {
            data?: { message?: string; detail?: string };
            message?: string;
          };
          if (e.data?.message) errorMessage += `: ${e.data.message}`;
          else if (e.data?.detail) errorMessage += `: ${e.data.detail}`;
          else if (e.message) errorMessage += `: ${e.message}`;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleFilterChange = (filter: FilterOptions) => {
    const filtered = properties.filter(
      (property) =>
        property.price >= filter.minPrice &&
        property.price <= filter.maxPrice &&
        property.size >= filter.minSize &&
        property.size <= filter.maxSize &&
        property.rooms >= filter.rooms
    );
    setFilteredProperties(filtered);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <main className="flex-grow">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-gradient-sumi text-washi-50">
          <div className="pointer-events-none absolute -top-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-sakura-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-[32rem] w-[32rem] rounded-full bg-gold-500/20 blur-3xl" />
          <div className="divider-gold" />
          <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-24">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-washi-100/60">
              <span className="h-1.5 w-1.5 rounded-full bg-sakura-400 animate-pulse" />
              Rentals · 賃貸物件
            </div>
            <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <h1 className="font-display font-black leading-[0.95] tracking-tight text-balance text-5xl md:text-7xl lg:text-8xl">
                <span className="text-gradient-aurora">Your next</span>{" "}
                <span className="italic text-gradient-gold">home.</span>
              </h1>
              <Link
                href="/create"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-sakura px-6 py-3 text-sm font-bold text-white shadow-glow btn-glow transition-all hover:-translate-y-0.5 self-start md:self-end"
              >
                <Plus className="h-4 w-4" />
                物件を登録
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
              </Link>
            </div>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-washi-100/80">
              ここでの暮らしを、もっと心地よく。
              トロントのローカル物件をキュレーション。
            </p>
          </div>
          <div className="divider-gold" />
        </section>

        <section className="container mx-auto px-4 lg:px-8 py-16">
          {isLoading && (
            <div className="flex justify-center py-20">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-2 border-sakura-100" />
                <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-transparent border-t-sakura-500 animate-spin" />
              </div>
            </div>
          )}

          {error && !isLoading && (
            <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-red-50/70 backdrop-blur p-8 text-center">
              <p className="text-red-700 font-semibold mb-2">エラー</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {!isLoading && !error && properties.length === 0 && (
            <div className="mx-auto max-w-xl text-center py-12">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-sakura-50 to-gold-50 ring-1 ring-gold-200/50 shadow-glow-soft">
                <HomeIcon className="h-9 w-9 text-gold-500" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-sumi-800">
                まだ物件がありません
              </h3>
              <p className="mt-2 text-sm text-sumi-500">
                最初の物件を、あなたから。
              </p>
              <Link
                href="/create"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-sakura px-6 py-3 text-sm font-bold text-white shadow-glow"
              >
                <Plus className="h-4 w-4" />
                物件を登録
              </Link>
            </div>
          )}

          {!isLoading && !error && properties.length > 0 && (
            <>
              <Filter onFilterChange={handleFilterChange} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={handlePropertyClick}
                  />
                ))}
              </div>
              {filteredProperties.length === 0 && (
                <div className="mt-12 mx-auto max-w-md text-center text-sumi-500">
                  該当する物件が見つかりませんでした。
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />

      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
