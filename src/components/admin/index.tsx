"use client";

import React from "react";
import { useTranslations, useDiffModal } from "@/usecase/hooks";
import { TranslationTable } from "./translation-table";
import { DiffModal } from "./diff-modal";
import type { AdminPanelProps } from "@/domain/types";

export const AdminPanel: React.FC<AdminPanelProps> = () => {
  const { translations, approveTranslation } = useTranslations();
  const { isOpen, modalData, diffData, openModal, closeModal } = useDiffModal();

  return (
    <>
      <TranslationTable
        data={translations}
        onApprove={approveTranslation}
        onRowClick={openModal}
      />

      <DiffModal
        isOpen={isOpen}
        onClose={closeModal}
        translation={modalData}
        diffData={diffData}
      />
    </>
  );
};
