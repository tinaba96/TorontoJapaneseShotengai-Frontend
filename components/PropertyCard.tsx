"use client";

import Image from "next/image";
import type React from "react";
import { MapPin, Ruler, BedDouble, ArrowUpRight } from "lucide-react";
import type { Property } from "../lib/types";

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl bg-white border border-sumi-100 shadow-glow-soft transition-all duration-500 hover:shadow-elegant hover:-translate-y-1 hover:border-sakura-200 cursor-pointer animate-fade-in"
      onClick={() => onClick(property)}
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={property.imageUrl || "/placeholder.svg"}
          alt={property.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sumi-900/55 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-gradient-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sumi-900 shadow-glow-gold">
          For Rent
        </div>
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-sm font-bold text-sumi-800 ring-1 ring-gold-200/60">
          ${property.price.toLocaleString()}
          <span className="text-[10px] text-sumi-500 font-normal">/mo</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-sumi-800 group-hover:text-sakura-600 transition-colors line-clamp-1">
          {property.name}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-sumi-500">
          <MapPin className="h-3.5 w-3.5 text-sakura-500" />
          <span className="truncate">{property.address}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-sumi-600">
            <span className="inline-flex items-center gap-1">
              <Ruler className="h-3.5 w-3.5 text-gold-500" />
              {property.size}m²
            </span>
            <span className="inline-flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5 text-gold-500" />
              {property.rooms}
            </span>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-sumi-50 text-sumi-600 transition-all group-hover:bg-gradient-sakura group-hover:text-white group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
