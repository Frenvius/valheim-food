"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { translationUtilsService } from "@/usecase/converter";
import type { StringItem } from "@/domain/types";

export interface ExportButtonProps {
  data: StringItem[];
  language: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ data, language }) => {
  const handleDownload = React.useCallback(() => {
    const stringsToDownload: Record<string, string> = {};
    for (const item of data) {
      stringsToDownload[item.string] = item.translate;
    }
    const json = JSON.stringify(stringsToDownload, null, 2);
    translationUtilsService.downloadStrings(json, language);
  }, [data, language]);

  return (
    <Button variant="outline" onClick={handleDownload}>
      Export Strings
    </Button>
  );
};
