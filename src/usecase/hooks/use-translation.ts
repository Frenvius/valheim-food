"use client";

import React from "react";
import { translationService } from "@/usecase/service";
import type { TranslatedString, Translation } from "@/domain/types";

interface UseTranslatedStringsResult {
  data: TranslatedString[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useTranslatedStrings = (): UseTranslatedStringsResult => {
  const [data, setData] = React.useState<TranslatedString[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await translationService.getTranslatedStrings();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};

interface UsePendingCountResult {
  count: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const usePendingCount = (language: string): UsePendingCountResult => {
  const [count, setCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = React.useCallback(async () => {
    if (!language) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await translationService.getPendingStrings(language);
      setCount(result.count);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { count, isLoading, error, refetch: fetchData };
};

interface UseAdminTranslationsResult {
  data: Translation[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useAdminTranslations = (): UseAdminTranslationsResult => {
  const [data, setData] = React.useState<Translation[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await translationService.getTranslations();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};
