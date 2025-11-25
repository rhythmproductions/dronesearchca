/**
 * MAP COMPONENT - OpenStreetMap Embed
 * 
 * Simple map implementation using OpenStreetMap iframe embed.
 * No API key required - completely free and open source.
 * 
 * Centered on Armstrong, BC with service area visible.
 */

import { cn } from "@/lib/utils";

interface MapViewProps {
  className?: string;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  onMapReady?: (map: any) => void;
}

export function MapView({
  className,
  initialCenter = { lat: 50.4489, lng: -119.1961 }, // Armstrong, BC
  initialZoom = 9,
  onMapReady,
}: MapViewProps) {
  // OpenStreetMap iframe embed - no API key needed
  // Shows Armstrong, BC and surrounding North Okanagan & Shuswap region
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-120.5,49.8,-118.5,51.0&layer=mapnik&marker=${initialCenter.lat},${initialCenter.lng}`;

  return (
    <div className={cn("w-full h-[400px] rounded-lg overflow-hidden border-2 border-gray-300", className)}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        src={mapUrl}
        style={{ border: 0 }}
        title="Service Area Map - Armstrong, BC and surrounding North Okanagan & Shuswap communities"
      />
    </div>
  );
}
