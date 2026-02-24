"use client";

import React from "react";
import { translationService } from "@/usecase/service";
import type { Translation } from "@/domain/types";

export interface UseTranslationsResult {
  translations: Translation[];
  isLoading: boolean;
  loadTranslations: () => Promise<void>;
  approveTranslation: (row: Translation) => Promise<void>;
}

export const useTranslations = (): UseTranslationsResult => {
  const [translations, setTranslations] = React.useState<Translation[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadTranslations = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await translationService.getTranslations();
      setTranslations(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const approveTranslation = React.useCallback(
    async (row: Translation) => {
      await translationService.approveTranslation({
        language: row.language,
        json: row.json,
        id: row.id,
      });
      await loadTranslations();
    },
    [loadTranslations]
  );

  React.useEffect(() => {
    loadTranslations();
  }, [loadTranslations]);

  return {
    translations,
    isLoading,
    loadTranslations,
    approveTranslation,
  };
};
