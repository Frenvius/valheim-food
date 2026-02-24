"use client";

import React from "react";
import { translationUtilsService } from "@/usecase/converter";
import type { TranslatedString, TranslationPercentage } from "@/domain/types";

export interface UseLanguagePercentageResult {
  getPercentage: (langCode: string) => TranslationPercentage;
}

export const useLanguagePercentage = (
  allStrings: TranslatedString[],
  englishStrings: Record<string, string>
): UseLanguagePercentageResult => {
  const getPercentage = React.useCallback(
    (langCode: string): TranslationPercentage => {
      if (allStrings.length === 0) {
        return { percentage: 0, color: "#ff0000" };
      }

      const langStrings = translationUtilsService.unescapeJson(
        allStrings.find((item) => item.name === langCode)?.strings || "{}"
      );

      return translationUtilsService.getTranslatedStringsPercentage(
        langStrings,
        englishStrings
      );
    },
    [allStrings, englishStrings]
  );

  return { getPercentage };
};
