export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/users/authenticate",
  },

  TRANSLATE: {
    STRINGS: "/api/translate/strings",
    PENDING: "/api/translate/pending",
    SAVE: "/api/translate/save",
    TRANSLATIONS: "/api/translate/translations",
    APPROVE: "/api/translate/approve",
  },
} as const;

export type ApiRouteKey = keyof typeof API_ROUTES;
