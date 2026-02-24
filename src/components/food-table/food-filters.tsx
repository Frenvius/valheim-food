"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { FoodFilterState } from "@/domain/types";

export interface FoodFiltersProps {
  filters: FoodFilterState;
  onFilterChange: <K extends keyof FoodFilterState>(
    key: K,
    value: FoodFilterState[K]
  ) => void;
}

interface FilterCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => (
  <div className="flex items-center gap-2">
    <Checkbox
      id={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <Label htmlFor={id}>{label}</Label>
  </div>
);

export const FoodFilters: React.FC<FoodFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-wrap gap-6">
      <FilterCheckbox
        id="valharvest"
        label="Show Valharvest Foods"
        checked={filters.valharvestFood}
        onChange={(checked) => onFilterChange("valharvestFood", checked)}
      />
      <FilterCheckbox
        id="boneappetit"
        label="Show BoneAppetit Foods"
        checked={filters.boneAppetitFood}
        onChange={(checked) => onFilterChange("boneAppetitFood", checked)}
      />
      <FilterCheckbox
        id="valheim"
        label="Show Valheim Foods"
        checked={filters.valheimFood}
        onChange={(checked) => onFilterChange("valheimFood", checked)}
      />
      <FilterCheckbox
        id="valharvestStations"
        label="Use Valharvest Stations"
        checked={filters.useValharvestStations}
        onChange={(checked) => onFilterChange("useValharvestStations", checked)}
      />
    </div>
  );
};
