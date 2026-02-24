import { PERCENTAGE_COLORS, PERCENTAGE_THRESHOLDS } from "@/domain/constants";
import type { StringItem, DiffItem, TranslationPercentage } from "@/domain/types";

class TranslationUtilsService {
  unescapeJson(json: string): Record<string, string> {
    if (json?.includes("\\")) {
      return JSON.parse(json.replace(/\\/g, ""));
    }
    return JSON.parse(json || "{}");
  }

  getTranslatedStringsPercentage(
    translated: Record<string, string>,
    englishStrings: Record<string, string>
  ): TranslationPercentage {
    const totalStrings = Object.keys(englishStrings).length;
    const translatedStringsCount = Object.keys(translated).length;
    const percentage = Math.round((translatedStringsCount / totalStrings) * 100);
    const color = this.getPercentageColor(percentage);
    return { percentage, color };
  }

  tableStringArray(
    languageString: Record<string, string>,
    englishStrings: Record<string, string>
  ): StringItem[] {
    const strings: StringItem[] = [];

    for (const key in englishStrings) {
      if (englishStrings[key] !== "u3164") {
        strings.push({
          string: key,
          english: englishStrings[key],
          translate: languageString[key] || "",
        });
      }
    }
    return strings;
  }

  diffTableStringArray(
    languageString: Record<string, string>,
    strings: Record<string, string>,
    englishStrings: Record<string, string>
  ): DiffItem[] {
    const tableStrings: DiffItem[] = [];

    for (const key in strings) {
      if (strings[key] !== "u3164") {
        if (languageString[key] !== strings[key]) {
          tableStrings.push({
            string: key,
            original: englishStrings[key],
            translate: strings[key],
          });
        }
      }
    }
    return tableStrings;
  }

  convertNewTranslate(
    englishStrings: Record<string, string>,
    newTranslate: StringItem[]
  ): Record<string, string> {
    const descriptions = this.getAllDescriptions(englishStrings);
    const newTexts: Record<string, string> = {};

    for (const item of newTranslate) {
      if (item.translate !== undefined) {
        newTexts[item.string] = item.translate;
      }
    }

    return {
      ...descriptions,
      ...newTexts,
    };
  }

  downloadStrings(data: string, language: string): void {
    const blob = new Blob([data], { type: "text/json" });
    const a = document.createElement("a");
    a.download = `${language}.json`;
    a.href = window.URL.createObjectURL(blob);
    a.click();
    a.remove();
  }

  private getPercentageColor(percentage: number): string {
    if (percentage < PERCENTAGE_THRESHOLDS.LOW) return PERCENTAGE_COLORS.LOW;
    if (percentage < PERCENTAGE_THRESHOLDS.MEDIUM) return PERCENTAGE_COLORS.MEDIUM;
    if (percentage < PERCENTAGE_THRESHOLDS.HIGH) return PERCENTAGE_COLORS.HIGH;
    return PERCENTAGE_COLORS.COMPLETE;
  }

  private getAllDescriptions(
    englishStrings: Record<string, string>
  ): Record<string, string> {
    const descriptions: Record<string, string> = {};
    Object.keys(englishStrings).forEach((key) => {
      if (key.includes("_desc")) {
        descriptions[key] = englishStrings[key];
      }
    });
    return descriptions;
  }
}

export const translationUtilsService = new TranslationUtilsService();
