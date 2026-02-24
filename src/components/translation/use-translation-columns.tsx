"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { StringItem } from "@/domain/types";
import { TranslationCell } from "./translation-cell";

interface UseTranslationColumnsOptions {
  editingRow: number | null;
  editValue: string;
  isSaving: boolean;
  onStartEdit: (rowIndex: number, currentValue: string) => void;
  onEditChange: (value: string) => void;
  onSave: (rowIndex: number) => void;
  onCancel: () => void;
}

export const useTranslationColumns = ({
  editingRow,
  editValue,
  isSaving,
  onStartEdit,
  onEditChange,
  onSave,
  onCancel,
}: UseTranslationColumnsOptions): ColumnDef<StringItem>[] => {
  return React.useMemo(
    () => [
      {
        accessorKey: "string",
        header: "String",
        size: 150,
      },
      {
        accessorKey: "english",
        header: "English Name",
        size: 200,
      },
      {
        accessorKey: "translate",
        header: "Translate",
        cell: ({ row }) => (
          <TranslationCell
            value={row.original.translate}
            isEditing={editingRow === row.index}
            editValue={editValue}
            isSaving={isSaving}
            onStartEdit={() => onStartEdit(row.index, row.original.translate)}
            onEditChange={onEditChange}
            onSave={() => onSave(row.index)}
            onCancel={onCancel}
          />
        ),
      },
    ],
    [editingRow, editValue, isSaving, onStartEdit, onEditChange, onSave, onCancel]
  );
};
