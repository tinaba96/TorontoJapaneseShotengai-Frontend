import Image from "next/image";
import type React from "react";
import type { Property } from "../lib/types";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <Image
        src={property.imageUrl || "/placeholder.svg"}
        alt={property.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
        <p className="text-gray-600 mb-2">{property.address}</p>
        <div className="flex justify-between items-center">
          <span className="text-purple-600 font-bold">
            ${property.price.toLocaleString()}/monthis
          </span>
          <span className="text-gray-500">
            {property.size}m² • {property.rooms}rooms
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
