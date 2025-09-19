"use client"

import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

export default function AnalyticsPage() {
  const { language } = useTranslation()

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      dir={languages[language].dir}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnalyticsDashboard />
      </div>
    </div>
  )
}
