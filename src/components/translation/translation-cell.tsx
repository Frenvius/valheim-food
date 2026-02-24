"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface TranslationCellProps {
  value: string;
  isEditing: boolean;
  editValue: string;
  isSaving: boolean;
  onStartEdit: () => void;
  onEditChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const TranslationCell: React.FC<TranslationCellProps> = ({
  value,
  isEditing,
  editValue,
  isSaving,
  onStartEdit,
  onEditChange,
  onSave,
  onCancel,
}) => {
  if (isEditing) {
    return (
      <div className="flex gap-2">
        <Input
          value={editValue}
          onChange={(e) => onEditChange(e.target.value)}
          className="h-8 focus-visible:ring-muted-foreground/50"
          autoFocus
        />
        <Button size="sm" variant="ghost" onClick={onSave} disabled={isSaving}>
          Save
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div
      className="cursor-pointer hover:bg-accent p-2 rounded"
      onClick={onStartEdit}
    >
      {value || (
        <span className="text-muted-foreground italic">Click to translate</span>
      )}
    </div>
  );
};
