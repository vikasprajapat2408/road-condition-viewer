import { useQuery } from "@tanstack/react-query";
import {
  fetchDefectivePoints,
  fetchRoadSections,
  DefectivePoint,
  RoadSection,
} from "@/lib/api";
import {
  defectivePoints as mockDefectivePoints,
  roadSections as mockRoadSections,
} from "@/data/roadData";

const API_ENABLED = import.meta.env.VITE_USE_API !== "false";

export function useDefectivePoints() {
  const query = useQuery({
    queryKey: ["defective-points"],
    queryFn: fetchDefectivePoints,
    enabled: API_ENABLED,
    retry: 1,
    staleTime: 60_000,
  });

  const points: DefectivePoint[] =
    API_ENABLED && query.data ? query.data : mockDefectivePoints;

  return {
    points,
    isLoading: API_ENABLED && query.isLoading,
    isError: API_ENABLED && query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useRoadSections() {
  const query = useQuery({
    queryKey: ["road-sections"],
    queryFn: fetchRoadSections,
    enabled: API_ENABLED,
    retry: 1,
    staleTime: 60_000,
  });

  const sections: RoadSection[] =
    API_ENABLED && query.data ? query.data : mockRoadSections;

  return {
    sections,
    isLoading: API_ENABLED && query.isLoading,
    isError: API_ENABLED && query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
