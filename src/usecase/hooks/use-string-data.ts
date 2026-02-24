"use client";

import React from "react";
import { translationService } from "@/usecase/service";
import { translationUtilsService } from "@/usecase/converter";
import type { StringItem, TranslatedString } from "@/domain/types";

export interface UseStringDataResult {
  data: StringItem[];
  setData: React.Dispatch<React.SetStateAction<StringItem[]>>;
  allStrings: TranslatedString[];
  englishStrings: Record<string, string>;
  countPending: number;
  isLoading: boolean;
}

export const useStringData = (language: string): UseStringDataResult => {
  const [data, setData] = React.useState<StringItem[]>([]);
  const [allStrings, setAllStrings] = React.useState<TranslatedString[]>([]);
  const [englishStrings, setEnglishStrings] = React.useState<Record<string, string>>({});
  const [countPending, setCountPending] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);

    translationService.getPendingStrings(language).then((res) => {
      if (res) {
        setCountPending(res.count);
      }
    });

    translationService.getTranslatedStrings().then((res) => {
      const english = translationUtilsService.unescapeJson(
        res.find((item) => item.name === "English")?.strings || "{}"
      );
      const langStrings = translationUtilsService.unescapeJson(
        res.find((item) => item.name === language)?.strings || "{}"
      );
      setEnglishStrings(english);
      setAllStrings(res);
      setData(translationUtilsService.tableStringArray(langStrings, english));
      setIsLoading(false);
    });
  }, [language]);

  return {
    data,
    setData,
    allStrings,
    englishStrings,
    countPending,
    isLoading,
  };
};
