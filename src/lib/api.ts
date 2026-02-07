/**
 * API client for ROAD_ai backend.
 * In dev: uses /api proxy (vite proxies to localhost:8000).
 * Otherwise: VITE_API_URL or http://localhost:8000.
 */

const API_BASE =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? "/api" : "http://localhost:8000");

export type WeatherCondition =
  | "sunny"
  | "partly_cloudy"
  | "cloudy"
  | "rainy"
  | "stormy"
  | "snowy"
  | "foggy";

export interface DefectivePoint {
  id: string;
  lat: number;
  lng: number;
  location: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  reportedDate: string;
  image: string;
  weather: WeatherCondition;
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

export async function fetchDefectivePoints(): Promise<DefectivePoint[]> {
  const res = await fetch(`${API_BASE}/defective-points`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to fetch defective points: ${res.statusText}`);
  return res.json();
}

export async function fetchRoadSections(): Promise<RoadSection[]> {
  const res = await fetch(`${API_BASE}/road-sections`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to fetch road sections: ${res.statusText}`);
  return res.json();
}
