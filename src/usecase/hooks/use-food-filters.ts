"use client";

import React from "react";
import type { FoodFilterState } from "@/domain/types";

const DEFAULT_FILTERS: FoodFilterState = {
  valheimFood: false,
  valharvestFood: true,
  boneAppetitFood: false,
  useValharvestStations: true,
};

export interface UseFoodFiltersResult {
  filters: FoodFilterState;
  setFilter: <K extends keyof FoodFilterState>(
    key: K,
    value: FoodFilterState[K]
  ) => void;
  toggleFilter: (key: keyof FoodFilterState) => void;
}

export const useFoodFilters = (
  initialFilters: Partial<FoodFilterState> = {}
): UseFoodFiltersResult => {
  const [filters, setFilters] = React.useState<FoodFilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const setFilter = React.useCallback(
    <K extends keyof FoodFilterState>(key: K, value: FoodFilterState[K]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const toggleFilter = React.useCallback((key: keyof FoodFilterState) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return { filters, setFilter, toggleFilter };
};
