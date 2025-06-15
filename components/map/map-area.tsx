"use client";

import { cn } from "@/lib/utils";
import type { MapArea as MapAreaType } from "@/app/lib/map_data";
import MapIcon from "./map-icon";

interface MapAreaProps {
  area: MapAreaType;
  onClick: () => void;
}

export default function MapArea({ area, onClick }: MapAreaProps) {
  return (
    <div
      className={cn(
        "absolute rounded-lg flex flex-col items-center justify-center text-center p-2",
        "bg-opacity-90 shadow-lg border-2 cursor-pointer",
        "backdrop-blur-sm",
        area.color
      )}
      style={{
        top: `${area.position.y}%`,
        left: `${area.position.x}%`,
        width: `${area.size.width}%`,
        height: `${area.size.height}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <MapIcon type={area.id} className="h-8 w-8 mb-2" />
      <div>
        <h3 className="font-bold text-lg">{area.name}</h3>
        <p className="text-sm">{area.description}</p>
      </div>
    </div>
  );
}
