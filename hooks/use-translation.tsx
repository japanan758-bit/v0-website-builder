"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

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
  },
  ar: {
    "hero.title": "أنشئ المواقع بالدردشة",
    "hero.subtitle": "أخبرنا بفكرتك وسننشئها بالذكاء الاصطناعي",
    "chat.placeholder": "اكتب وصف موقعك...",
    "chat.send": "إرسال",
    "chat.generating": "جاري الإنشاء...",
  },
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
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
