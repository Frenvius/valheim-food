"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserStore } from "@/usecase/store";
import { translationService } from "@/usecase/service";
import { translationUtilsService } from "@/usecase/converter";
import { useStringData, useLanguagePercentage } from "@/usecase/hooks";
import { LanguageSelector } from "./language-selector";
import { TranslationStats } from "./translation-stats";
import { ExportButton } from "./export-button";
import { useTranslationColumns } from "./use-translation-columns";
import { DEFAULT_LANGUAGE } from "@/domain/constants";
import type { StringTableProps } from "@/domain/types";

export const StringTable: React.FC<StringTableProps> = ({
  initialLanguage = DEFAULT_LANGUAGE,
}) => {
  const { user } = useUserStore();
  const [language, setLanguage] = React.useState(initialLanguage);
  const [editingRow, setEditingRow] = React.useState<number | null>(null);
  const [editValue, setEditValue] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  const { data, setData, allStrings, englishStrings, countPending } =
    useStringData(language);
  const { getPercentage } = useLanguagePercentage(allStrings, englishStrings);

  const handleSave = React.useCallback(
    async (rowIndex: number) => {
      const updatedData = [...data];
      updatedData[rowIndex] = { ...updatedData[rowIndex], translate: editValue };
      setData(updatedData);
      setEditingRow(null);

      setIsSaving(true);
      const newJson = translationUtilsService.convertNewTranslate(
        englishStrings,
        updatedData
      );
      await translationService.saveTranslation({ language, data: newJson });
      setIsSaving(false);
    },
    [data, editValue, englishStrings, language, setData]
  );

  const columns = useTranslationColumns({
    editingRow,
    editValue,
    isSaving,
    onStartEdit: (rowIndex, currentValue) => {
      setEditingRow(rowIndex);
      setEditValue(currentValue);
    },
    onEditChange: setEditValue,
    onSave: handleSave,
    onCancel: () => setEditingRow(null),
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        <LanguageSelector
          value={language}
          onChange={setLanguage}
          getPercentage={getPercentage}
        />
        <TranslationStats pendingCount={countPending} />
        {user && <ExportButton data={data} language={language} />}
      </div>

      <div className="rounded-md border max-h-[70vh] overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
