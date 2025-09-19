"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bot, Play, ArrowRight, MessageCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChatInterface } from "@/components/chat/chat-interface"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

export function HeroSection() {
  const { t, language } = useTranslation()
  const [showChat, setShowChat] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const isRTL = languages[language].dir === "rtl"

  const heroTexts =
    language === "ar"
      ? ["مطعم عصري", "متجر إلكتروني", "شركة تقنية", "معرض أعمال", "عيادة طبية"]
      : ["Modern Restaurant", "E-commerce Store", "Tech Company", "Creative Portfolio", "Medical Clinic"]

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      setCurrentText(heroTexts[currentIndex])
      currentIndex = (currentIndex + 1) % heroTexts.length
    }, 2000)

    return () => clearInterval(interval)
  }, [language])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      dir={languages[language].dir}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isRTL ? "text-right lg:text-right" : "text-left lg:text-left"}`}>
            <div className="space-y-6">
              <Badge className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 rounded-full backdrop-blur-sm">
                <Bot className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {language === "ar" ? "مدعوم بالذكاء الاصطناعي" : "Powered by AI"}
              </Badge>

              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {t("heroTitle")}
                </span>
              </h1>

              <div className="text-2xl lg:text-3xl text-gray-300 font-medium">
                {language === "ar" ? "أنشئ " : "Create "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold min-h-[1.2em] inline-block">
                  {currentText}
                </span>
                {language === "ar" ? " في دقائق" : " in minutes"}
              </div>

              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">{t("heroDescription")}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 group"
                onClick={() => setShowChat(true)}
              >
                <MessageCircle className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 group-hover:scale-110 transition-transform duration-300" />
                {t("startChat")}
                <ArrowRight className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/50 rounded-full px-8 py-4 text-lg font-semibold backdrop-blur-sm group bg-transparent"
                asChild
              >
                <Link href="#demo" className="flex items-center">
                  <Play className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 group-hover:scale-110 transition-transform duration-300" />
                  {t("watchDemo")}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
              {[
                { number: "50K+", label: language === "ar" ? "موقع تم إنشاؤه" : "Websites Created" },
                { number: "25K+", label: language === "ar" ? "عميل راضٍ" : "Happy Clients" },
                { number: "30s", label: language === "ar" ? "متوسط وقت الإنشاء" : "Average Creation Time" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Chat Interface */}
          <div className="relative">
            <div className="relative z-10">
              {showChat ? (
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border border-white/20">
                  <ChatInterface className="h-[600px]" />
                </div>
              ) : (
                <div
                  className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 cursor-pointer hover:bg-white/15 transition-all duration-300"
                  onClick={() => setShowChat(true)}
                >
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <Bot className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{t("heroTitle")}</h3>
                      <p className="text-gray-300">
                        {language === "ar" ? "انقر للبدء في المحادثة" : "Click to start chatting"}
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full px-6 py-3">
                      <Zap className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {language === "ar" ? "ابدأ الآن" : "Start Now"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 animate-bounce delay-1000" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-30 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
