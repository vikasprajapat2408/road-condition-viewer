import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { DefectivePoint } from "@/lib/api";

interface DefectiveRoadMapProps {
  points: DefectivePoint[];
  selectedPoint: DefectivePoint | null;
  onPointSelect: (point: DefectivePoint) => void;
}

const DefectiveRoadMap = ({ points, selectedPoint, onPointSelect }: DefectiveRoadMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView([40.7128, -74.006], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add markers for each defective point
    points.forEach((point) => {
      const severityColors = {
        critical: "#dc2626",
        high: "#ea580c",
        medium: "#ca8a04",
        low: "#16a34a",
      };

      const isSelected = selectedPoint?.id === point.id;
      const color = severityColors[point.severity];

      const icon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            width: ${isSelected ? "32px" : "24px"};
            height: ${isSelected ? "32px" : "24px"};
            background-color: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: all 0.2s ease;
            transform: ${isSelected ? "scale(1.2)" : "scale(1)"};
          "></div>
        `,
        iconSize: [isSelected ? 32 : 24, isSelected ? 32 : 24],
        iconAnchor: [isSelected ? 16 : 12, isSelected ? 16 : 12],
      });

      const marker = L.marker([point.lat, point.lng], { icon }).addTo(mapInstanceRef.current!);

      marker.on("click", () => {
        onPointSelect(point);
      });

      markersRef.current.push(marker);
    });
  }, [points, selectedPoint, onPointSelect]);

  useEffect(() => {
    if (selectedPoint && mapInstanceRef.current) {
      mapInstanceRef.current.setView([selectedPoint.lat, selectedPoint.lng], 14, {
        animate: true,
      });
    }
  }, [selectedPoint]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ minHeight: "400px" }}
    />
  );
};

export default DefectiveRoadMap;
