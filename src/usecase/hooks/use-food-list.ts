"use client";

import React from "react";
import { foodParserService } from "@/usecase/converter";
import type { FoodItem, FoodFilterState } from "@/domain/types";

export interface UseFoodListResult {
  foodList: FoodItem[];
}

export const useFoodList = (filters: FoodFilterState): UseFoodListResult => {
  const foodList = React.useMemo(
    () =>
      foodParserService.parseFoods(
        filters.valharvestFood,
        filters.boneAppetitFood,
        filters.valheimFood
      ),
    [filters.valharvestFood, filters.boneAppetitFood, filters.valheimFood]
  );

  return { foodList };
};
