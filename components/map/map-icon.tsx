"use client";

import {
  Home,
  ShoppingBag,
  Building2,
  Hospital,
  Car,
  TreePine,
  Coffee,
  Book,
  Utensils,
  MapPin,
  LucideIcon,
} from "lucide-react";
import { ComponentProps } from "react";

interface MapIconProps extends ComponentProps<LucideIcon> {
  type: string;
}

const iconMap = {
  residential: Home,
  commercial: ShoppingBag,
  business: Building2,
  public: Hospital,
  car: Car,
  tree: TreePine,
  cafe: Coffee,
  library: Book,
  restaurant: Utensils,
  location: MapPin,
};

export default function MapIcon({
  type,
  className = "h-6 w-6",
  ...props
}: MapIconProps) {
  const IconComponent = iconMap[type as keyof typeof iconMap] || MapPin;

  return <IconComponent className={className} {...props} />;
}
