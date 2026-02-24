"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DiffTable } from "./diff-table";
import type { Translation, DiffItem } from "@/domain/types";

export interface DiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  translation: Translation | null;
  diffData: DiffItem[];
}

export const DiffModal: React.FC<DiffModalProps> = ({
  isOpen,
  onClose,
  translation,
  diffData,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-4xl max-h-[80vh] overflow-auto"
        onClose={onClose}
      >
        <DialogHeader>
          <DialogTitle>
            Translation Details - {translation?.language}
          </DialogTitle>
        </DialogHeader>
        <DiffTable data={diffData} />
      </DialogContent>
    </Dialog>
  );
};
