"use client";

import React from "react";
import { SortIndicator } from "./sort-indicator";

export interface SortableHeaderProps {
  label: string;
  isSorted: "asc" | "desc" | false;
  onToggleSort: () => void;
  className?: string;
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  isSorted,
  onToggleSort,
  className = "",
}) => {
  return (
    <button
      className={`flex items-center ${className}`}
      onClick={onToggleSort}
    >
      {label}
      <SortIndicator direction={isSorted} />
    </button>
  );
};

export { SortIndicator } from "./sort-indicator";
export type { SortIndicatorProps } from "./sort-indicator";
