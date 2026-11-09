export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";

export const otherLocale = (locale: Locale): Locale =>
  locale === "id" ? "en" : "id";

export const localeHref = (locale: Locale): string =>
  locale === "id" ? "/" : "/en/";
