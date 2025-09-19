export interface Language {
  code: string
  name: string
  nativeName: string
  dir: "ltr" | "rtl"
  flag: string
}

export const languages: Record<string, Language> = {
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    dir: "rtl",
    flag: "🇸🇦",
  },
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    dir: "ltr",
    flag: "🇺🇸",
  },
}

export const defaultLanguage = "ar"

export function getLanguageFromLocale(locale: string): string {
  return languages[locale] ? locale : defaultLanguage
}

export function isRTL(language: string): boolean {
  return languages[language]?.dir === "rtl"
}
