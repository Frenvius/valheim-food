"use client";

import React from "react";
import { translationService } from "@/usecase/service";
import { translationUtilsService } from "@/usecase/converter";
import type { Translation, DiffItem } from "@/domain/types";

export interface UseDiffModalResult {
  isOpen: boolean;
  modalData: Translation | null;
  diffData: DiffItem[];
  openModal: (translation: Translation) => void;
  closeModal: () => void;
}

export const useDiffModal = (): UseDiffModalResult => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState<Translation | null>(null);
  const [diffData, setDiffData] = React.useState<DiffItem[]>([]);

  React.useEffect(() => {
    if (modalData && isOpen) {
      translationService.getTranslatedStrings().then((res) => {
        const englishStrings = translationUtilsService.unescapeJson(
          res.find((item) => item.name === "English")?.strings || "{}"
        );
        const languageString = translationUtilsService.unescapeJson(
          res.find((item) => item.name === modalData.language)?.strings || "{}"
        );
        const diff = translationUtilsService.diffTableStringArray(
          languageString,
          JSON.parse(modalData.json),
          englishStrings
        );
        setDiffData(diff);
      });
    }
  }, [modalData, isOpen]);

  const openModal = React.useCallback((translation: Translation) => {
    setModalData(translation);
    setIsOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsOpen(false);
    setModalData(null);
    setDiffData([]);
  }, []);

  return {
    isOpen,
    modalData,
    diffData,
    openModal,
    closeModal,
  };
};
