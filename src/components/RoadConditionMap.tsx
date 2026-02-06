import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RoadSection } from "@/data/roadData";

interface RoadConditionMapProps {
  sections: RoadSection[];
  selectedSection: RoadSection | null;
  onSectionSelect: (section: RoadSection) => void;
}

const RoadConditionMap = ({ sections, selectedSection, onSectionSelect }: RoadConditionMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polylinesRef = useRef<L.Polyline[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView([40.7328, -73.99], 12);

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

    // Clear existing polylines
    polylinesRef.current.forEach((polyline) => polyline.remove());
    polylinesRef.current = [];

    // Add polylines for each road section
    sections.forEach((section) => {
      const statusColors = {
        good: "#16a34a",
        moderate: "#ca8a04",
        poor: "#ea580c",
        critical: "#dc2626",
      };

      const isSelected = selectedSection?.id === section.id;
      const color = statusColors[section.status];

      const polyline = L.polyline(section.coordinates, {
        color: color,
        weight: isSelected ? 8 : 5,
        opacity: isSelected ? 1 : 0.7,
      }).addTo(mapInstanceRef.current!);

      polyline.on("click", () => {
        onSectionSelect(section);
      });

      // Add tooltip
      polyline.bindTooltip(section.name, {
        permanent: false,
        direction: "top",
        className: "road-tooltip",
      });

      polylinesRef.current.push(polyline);
    });
  }, [sections, selectedSection, onSectionSelect]);

  useEffect(() => {
    if (selectedSection && mapInstanceRef.current) {
      const bounds = L.latLngBounds(selectedSection.coordinates);
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], animate: true });
    }
  }, [selectedSection]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ minHeight: "400px" }}
    />
  );
};

export default RoadConditionMap;
