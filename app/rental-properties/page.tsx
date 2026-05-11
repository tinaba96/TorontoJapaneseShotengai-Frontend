"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    imageUrl: "/images/rental.png?height=200&width=300",
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">賃貸物件</h1>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-semibold mb-2">エラー</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!isLoading && !error && properties.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              賃貸物件がありません
            </h3>
            <p className="text-gray-600 mb-6">
              現在表示できる賃貸物件がありません
            </p>
            <Link
              href="/create"
              className="inline-block bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              物件を登録
            </Link>
          </div>
        )}

        {!isLoading && !error && properties.length > 0 && (
          <>
            <Filter onFilterChange={handleFilterChange} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={handlePropertyClick}
                />
              ))}
            </div>
          </>
        )}
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
