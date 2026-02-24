import { HttpClient } from "@/adapter/http";
import { API_ROUTES } from "@/domain/constants";
import type {
  TranslatedString,
  Translation,
  SaveTranslationDto,
  ApproveTranslationDto,
  ApiMessageResponse,
  PendingCountResponse,
} from "@/domain/types";

class TranslationService extends HttpClient {
  async getTranslatedStrings(): Promise<TranslatedString[]> {
    return this.get<TranslatedString[]>(API_ROUTES.TRANSLATE.STRINGS);
  }

  async getPendingStrings(language: string): Promise<PendingCountResponse> {
    return this.get<PendingCountResponse>(
      `${API_ROUTES.TRANSLATE.PENDING}?language=${encodeURIComponent(language)}`
    );
  }

  async saveTranslation(data: SaveTranslationDto): Promise<ApiMessageResponse> {
    return this.post<ApiMessageResponse>(API_ROUTES.TRANSLATE.SAVE, data);
  }

  async getTranslations(): Promise<Translation[]> {
    return this.get<Translation[]>(API_ROUTES.TRANSLATE.TRANSLATIONS);
  }

  async approveTranslation(
    data: ApproveTranslationDto
  ): Promise<ApiMessageResponse> {
    return this.post<ApiMessageResponse>(API_ROUTES.TRANSLATE.APPROVE, data);
  }
}

export const translationService = new TranslationService();
