"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { EditableCellProps } from "./types";

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  placeholder = "Click to edit",
  isEditing,
  editValue,
  isSaving = false,
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
          className="h-8"
          autoFocus
        />
        <Button size="sm" onClick={onSave} disabled={isSaving}>
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel}>
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
        <span className="text-muted-foreground italic">{placeholder}</span>
      )}
    </div>
  );
};

export type { EditableCellProps } from "./types";
