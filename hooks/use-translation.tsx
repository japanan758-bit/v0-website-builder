"use client"

"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { defaultLanguage } from "@/lib/i18n"

interface TranslationContextType {
  language: "en" | "ar"
  setLanguage: (lang: "en" | "ar") => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

const translations = {
  en: {
    "hero.title": "Create Websites by Chatting",
    "hero.subtitle": "Tell us your idea and we'll build it with AI",
    "chat.placeholder": "Describe your website idea...",
    "chat.send": "Send",
    "chat.generating": "Generating...",
    home: "Home",
    templates: "Templates",
    pricing: "Pricing",
    about: "About",
  },
  ar: {
    "hero.title": "أنشئ المواقع بالدردشة",
    "hero.subtitle": "أخبرنا بفكرتك وسننشئها بالذكاء الاصطناعي",
    "chat.placeholder": "اكتب وصف موقعك...",
    "chat.send": "إرسال",
    "chat.generating": "جاري الإنشاء...",
    home: "الرئيسية",
    templates: "القوالب",
    pricing: "الأسعار",
    about: "حول",
  },
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<"en" | "ar">(defaultLanguage as "en" | "ar")

  useEffect(() => {
    try {
      const saved = (typeof window !== "undefined" && localStorage.getItem("language")) as "en" | "ar" | null
      const browserLang = typeof navigator !== "undefined" && navigator.language?.startsWith("ar") ? "ar" : "en"
      const initial = (saved || browserLang || defaultLanguage) as "en" | "ar"
      setLanguageState(initial)
      document.documentElement.lang = initial
      document.documentElement.dir = initial === "ar" ? "rtl" : "ltr"
    } catch {}
  }, [])

  const setLanguage = (lang: "en" | "ar") => {
    setLanguageState(lang)
    try {
      localStorage.setItem("language", lang)
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    }
  }

  const t = (key: string): string => {
    return (translations as any)[language]?.[key] || key
  }

  return <TranslationContext.Provider value={{ language, setLanguage, t }}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
