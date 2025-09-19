"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { useLanguage } from "@/hooks/use-language"
import { languages } from "@/lib/i18n"

export default function AnalyticsPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50" dir={languages[language].dir}>
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-8">
          <AnalyticsDashboard />
        </div>
      </main>
      <Footer />
    </div>
  )
}
