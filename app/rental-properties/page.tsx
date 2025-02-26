"use client";

import { useState } from "react";
import PropertyCard from "../../components/PropertyCard";
import Filter from "../../components/Filter";
import type { Property, FilterOptions } from "../../lib/types";

import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

// サンプルデータ
const properties: Property[] = [
  {
    id: "1",
    name: "Modern City Apartment",
    address: "123 Example Street, Toronto, ON M5A 1A1, Canada",
    price: 2000,
    size: 55,
    rooms: 2,
    imageUrl: "/images/rental.png?height=200&width=300",
  },
  {
    id: "2",
    name: "Downtown Loft",
    address: "456 King Street West, Toronto, ON M5V 1M3, Canada",
    price: 2500,
    size: 70,
    rooms: 3,
    imageUrl: "/images/rental2.png?height=200&width=300",
  },
  {
    id: "3",
    name: "Luxury Condo",
    address: "789 Queen Street East, Toronto, ON M4M 1H6, Canada",
    price: 3200,
    size: 90,
    rooms: 3,
    imageUrl: "/images/rental3.png?height=200&width=300",
  },
  {
    id: "4",
    name: "Suburban Family Home",
    address: "102 Birchmount Road, Scarborough, ON M1N 1E4, Canada",
    price: 3500,
    size: 120,
    rooms: 4,
    imageUrl: "/images/rental4.png?height=200&width=300",
  },
  {
    id: "5",
    name: "Cozy Studio Apartment",
    address: "12 College Street, Toronto, ON M5G 2E2, Canada",
    price: 1500,
    size: 35,
    rooms: 1,
    imageUrl: "/images/rental5.png?height=200&width=300",
  },
  {
    id: "6",
    name: "Waterfront Penthouse",
    address: "234 Lakeshore Boulevard, Toronto, ON M6K 3B7, Canada",
    price: 5000,
    size: 150,
    rooms: 4,
    imageUrl: "/images/rental6.png?height=200&width=300",
  },
  {
    id: "7",
    name: "Luxury Downtown Condo",
    address: "300 Front Street West, Toronto, ON M5V 0E9, Canada",
    price: 7000,
    size: 160,
    rooms: 3,
    imageUrl: "/images/rental2.png?height=200&width=300",
  },
  {
    id: "8",
    name: "Chic Loft in King West",
    address: "150 Bathurst Street, Toronto, ON M5V 2R4, Canada",
    price: 4000,
    size: 120,
    rooms: 2,
    imageUrl: "/images/rental3.png?height=200&width=300",
  },
  {
    id: "9",
    name: "Downtown High-rise Suite",
    address: "200 Bay Street, Toronto, ON M5J 2T2, Canada",
    price: 6000,
    size: 180,
    rooms: 3,
    imageUrl: "/images/rental3.png?height=200&width=300",
  },
  {
    id: "10",
    name: "Upscale Yorkville Apartment",
    address: "50 Yorkville Avenue, Toronto, ON M5R 1C6, Canada",
    price: 8000,
    size: 170,
    rooms: 4,
    imageUrl: "/images/rental.png?height=200&width=300",
  },
  {
    id: "11",
    name: "Spacious Family Home in Etobicoke",
    address: "350 The West Mall, Etobicoke, ON M9C 1E6, Canada",
    price: 4200,
    size: 200,
    rooms: 5,
    imageUrl: "/images/rental11.png?height=200&width=300",
  },
  {
    id: "12",
    name: "Stylish Condo with Lake View",
    address: "77 Queens Quay West, Toronto, ON M5J 2R8, Canada",
    price: 6500,
    size: 140,
    rooms: 3,
    imageUrl: "/images/rental2.png?height=200&width=300",
  },
  {
    id: "13",
    name: "Executive Penthouse with Skyline Views",
    address: "123 Queen Street West, Toronto, ON M5H 2M9, Canada",
    price: 10000,
    size: 220,
    rooms: 4,
    imageUrl: "/images/rental3.png?height=200&width=300",
  },
  {
    id: "14",
    name: "Grand Toronto Mansion",
    address: "1 Davenport Road, Toronto, ON M5R 3P1, Canada",
    price: 15000,
    size: 350,
    rooms: 6,
    imageUrl: "/images/rental4.png?height=200&width=300",
  },
  {
    id: "15",
    name: "Modern Condo with Terrace",
    address: "45 Spadina Avenue, Toronto, ON M5V 2H9, Canada",
    price: 5000,
    size: 130,
    rooms: 2,
    imageUrl: "/images/rental5.png?height=200&width=300",
  },
  {
    id: "16",
    name: "High-End Yorkville Residence",
    address: "100 Yorkville Avenue, Toronto, ON M5R 2H3, Canada",
    price: 9500,
    size: 180,
    rooms: 3,
    imageUrl: "/images/rental16.png?height=200&width=300",
  },
  {
    id: "17",
    name: "Exclusive Waterfront Villa",
    address: "500 Queens Quay West, Toronto, ON M5V 2V3, Canada",
    price: 12000,
    size: 250,
    rooms: 5,
    imageUrl: "/images/rental12.png?height=200&width=300",
  },
  {
    id: "18",
    name: "Stylish Loft in Distillery District",
    address: "20 Distillery Lane, Toronto, ON M5A 3C4, Canada",
    price: 4500,
    size: 110,
    rooms: 2,
    imageUrl: "/images/rental18.png?height=200&width=300",
  },
  {
    id: "19",
    name: "Luxury Condo with Balcony",
    address: "10 Yonge Street, Toronto, ON M5E 1G5, Canada",
    price: 6500,
    size: 150,
    rooms: 3,
    imageUrl: "/images/rental.png?height=200&width=300",
  },
  {
    id: "20",
    name: "Spacious Annex Home",
    address: "250 Dupont Street, Toronto, ON M5R 1V6, Canada",
    price: 5500,
    size: 180,
    rooms: 4,
    imageUrl: "/images/rental20.png?height=200&width=300",
  },
];

export default function Home() {
  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(properties);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">賃貸物件</h1>
        <Filter onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
