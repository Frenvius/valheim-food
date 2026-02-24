"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Translation, DiffItem } from "@/domain/types";

interface UseTranslationColumnsOptions {
  onApprove: (row: Translation) => void;
}

export const useAdminTranslationColumns = ({
  onApprove,
}: UseTranslationColumnsOptions): ColumnDef<Translation>[] => {
  return React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 60,
      },
      {
        accessorKey: "language",
        header: "Language",
        size: 150,
      },
      {
        accessorKey: "json",
        header: "JSON",
        cell: ({ row }) => (
          <div className="max-w-md truncate text-muted-foreground">
            {row.original.json}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        size: 100,
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onApprove(row.original);
            }}
            title="Approve Translation"
          >
            <Save className="h-4 w-4" />
          </Button>
        ),
      },
    ],
    [onApprove]
  );
};

export const useDiffColumns = (): ColumnDef<DiffItem>[] => {
  return React.useMemo(
    () => [
      {
        accessorKey: "original",
        header: "Original",
      },
      {
        accessorKey: "translate",
        header: "Translated",
      },
    ],
    []
  );
};
