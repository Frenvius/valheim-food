"use client";

import React from "react";

export interface TranslationStatsProps {
  pendingCount: number;
}

export const TranslationStats: React.FC<TranslationStatsProps> = ({
  pendingCount,
}) => {
  return (
    <span className="h-10 flex items-center text-destructive font-medium">
      {pendingCount} pending translations
    </span>
  );
};
