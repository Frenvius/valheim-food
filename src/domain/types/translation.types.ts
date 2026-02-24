export interface TranslatedString {
  id: number;
  name: string;
  strings: string;
}

export interface StringItem {
  string: string;
  english: string;
  translate: string;
}

export interface DiffItem {
  string: string;
  original: string;
  translate: string;
}

export interface Translation {
  id: number;
  language: string;
  json: string;
}

export interface SaveTranslationDto {
  language: string;
  data: Record<string, string>;
}

export interface ApproveTranslationDto {
  language: string;
  json: string;
  id: number;
}

export interface TranslationPercentage {
  percentage: number;
  color: string;
}

export interface TranslationEditState {
  editingRow: number | null;
  editValue: string;
  isSaving: boolean;
}

export interface StringTableProps {
  initialLanguage?: string;
}
