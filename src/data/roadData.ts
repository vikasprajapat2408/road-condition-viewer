import defectiveRoad1 from "@/assets/defective-road-1.jpg";
import defectiveRoad2 from "@/assets/defective-road-2.jpg";
import defectiveRoad3 from "@/assets/defective-road-3.jpg";
import defectiveRoad4 from "@/assets/defective-road-4.jpg";

export interface DefectivePoint {
  id: string;
  lat: number;
  lng: number;
  location: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  reportedDate: string;
  image: string;
}

export interface RoadSection {
  id: string;
  name: string;
  coordinates: [number, number][];
  conditionPercent: number;
  lastInspection: string;
  length: string;
  status: "good" | "moderate" | "poor" | "critical";
}

export const defectivePoints: DefectivePoint[] = [
  {
    id: "1",
    lat: 40.7128,
    lng: -74.006,
    location: "Main Street & 5th Avenue",
    description: "Large pothole causing traffic hazards. Estimated 2 feet in diameter.",
    severity: "critical",
    reportedDate: "2026-02-01",
    image: defectiveRoad1,
  },
  {
    id: "2",
    lat: 40.7282,
    lng: -73.9942,
    location: "Broadway & Houston Street",
    description: "Multiple cracks extending across lane. Surface degradation visible.",
    severity: "high",
    reportedDate: "2026-02-03",
    image: defectiveRoad2,
  },
  {
    id: "3",
    lat: 40.7589,
    lng: -73.9851,
    location: "42nd Street near Times Square",
    description: "Edge erosion on southbound lane. Requires immediate attention.",
    severity: "high",
    reportedDate: "2026-02-04",
    image: defectiveRoad3,
  },
  {
    id: "4",
    lat: 40.7484,
    lng: -73.9857,
    location: "34th Street & Park Avenue",
    description: "Repair work in progress. Lane closure expected for 3 days.",
    severity: "medium",
    reportedDate: "2026-02-05",
    image: defectiveRoad4,
  },
];

export const roadSections: RoadSection[] = [
  {
    id: "1",
    name: "Highway I-278 Section A",
    coordinates: [
      [40.7128, -74.006],
      [40.7228, -73.996],
    ],
    conditionPercent: 85,
    lastInspection: "2026-01-15",
    length: "2.5 miles",
    status: "good",
  },
  {
    id: "2",
    name: "Broadway North Segment",
    coordinates: [
      [40.7282, -73.9942],
      [40.7382, -73.9842],
    ],
    conditionPercent: 62,
    lastInspection: "2026-01-20",
    length: "1.8 miles",
    status: "moderate",
  },
  {
    id: "3",
    name: "5th Avenue Central",
    coordinates: [
      [40.7484, -73.9857],
      [40.7584, -73.9757],
    ],
    conditionPercent: 35,
    lastInspection: "2026-01-28",
    length: "3.2 miles",
    status: "poor",
  },
  {
    id: "4",
    name: "East River Drive South",
    coordinates: [
      [40.7089, -73.9851],
      [40.7189, -73.9751],
    ],
    conditionPercent: 18,
    lastInspection: "2026-02-01",
    length: "4.1 miles",
    status: "critical",
  },
];
