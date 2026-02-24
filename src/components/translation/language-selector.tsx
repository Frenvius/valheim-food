"use client";

import React from "react";
import { Select } from "@/components/ui/select";
import { LANGUAGES } from "@/domain/constants";
import type { TranslationPercentage } from "@/domain/types";

export interface LanguageSelectorProps {
  value: string;
  onChange: (language: string) => void;
  getPercentage: (langCode: string) => TranslationPercentage;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  getPercentage,
}) => {
  return (
    <Select
      label="Language"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-48"
    >
      {LANGUAGES.map((lang) => {
        const { percentage } = getPercentage(lang.code);
        return (
          <option key={lang.code} value={lang.code}>
            {lang.name} ({percentage}%)
          </option>
        );
      })}
    </Select>
  );
};
