"use client";

import React from "react";

export interface SortIndicatorProps {
  direction: "asc" | "desc" | false;
}

export const SortIndicator: React.FC<SortIndicatorProps> = ({ direction }) => {
  if (direction === "asc") return <span className="ml-1">↑</span>;
  if (direction === "desc") return <span className="ml-1">↓</span>;
  return null;
};
