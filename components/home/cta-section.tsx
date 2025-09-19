"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

export function CTASection() {
  const { t, language } = useTranslation()
  const isRTL = languages[language].dir === "rtl"

  return (
    <section
      className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden"
      dir={languages[language].dir}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Bot className="w-10 h-10 text-white" />
          </div>

          {/* Main Content */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {language === "ar" ? "جاهز لإنشاء موقعك؟" : "Ready to Build Your Website?"}
          </h2>

          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            {language === "ar"
              ? "انضم إلى آلاف المبدعين الذين يستخدمون الذكاء الاصطناعي لبناء مواقع استثنائية"
              : "Join thousands of creators who use AI to build exceptional websites"}
          </p>

          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { icon: Zap, text: language === "ar" ? "إنشاء فوري" : "Instant Creation" },
              { icon: Sparkles, text: language === "ar" ? "تصميم ذكي" : "Smart Design" },
              { icon: Bot, text: language === "ar" ? "مساعد ذكي" : "AI Assistant" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <item.icon className="w-5 h-5 text-cyan-300" />
                <span className="text-white font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-white/20 transition-all duration-300 group"
              asChild
            >
              <Link href="/signup" className="flex items-center space-x-2 rtl:space-x-reverse">
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>{language === "ar" ? "ابدأ مجاناً الآن" : "Start Free Now"}</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-transparent"
              asChild
            >
              <Link href="/templates">{language === "ar" ? "تصفح القوالب" : "Browse Templates"}</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-blue-200 mb-6">
              {language === "ar" ? "موثوق به من قبل أكثر من" : "Trusted by over"}{" "}
              <span className="font-bold text-white">25,000+</span>{" "}
              {language === "ar" ? "مستخدم حول العالم" : "users worldwide"}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-24 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">Logo {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-white/30 rounded-full animate-ping" />
      <div className="absolute bottom-10 right-10 w-6 h-6 bg-white/20 rounded-full animate-bounce" />
      <div className="absolute top-1/2 left-10 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
    </section>
  )
}
