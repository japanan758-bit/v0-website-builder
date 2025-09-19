"use client"

import { useState, useEffect } from "react"
import { Bot, Sparkles, MessageCircle, Zap, Globe, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChatInterface } from "@/components/chat/chat-interface"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

export function AgentHero() {
  const { t, language } = useTranslation()
  const [showChat, setShowChat] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const isRTL = languages[language].dir === "rtl"

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/50 overflow-hidden"
      dir={languages[language].dir}
    >
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-full blur-3xl transition-all duration-1000 ease-out animate-pulse"
          style={{
            left: mousePosition.x * 0.02 + 100,
            top: mousePosition.y * 0.02 + 100,
            transform: `translate(-50%, -50%)`,
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-cyan-300/15 to-blue-300/15 rounded-full blur-2xl animate-pulse delay-1000"
          style={{
            right: mousePosition.x * 0.01 + 50,
            top: mousePosition.y * 0.015 + 200,
            transform: `translate(50%, -50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content */}
        <div className={`space-y-8 ${isRTL ? "lg:order-2" : ""}`}>
          <Badge className="inline-flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-0 rounded-full">
            <Bot className="w-4 h-4" />
            <span className="font-medium">
              {t("aiPowered")} • {t("realTimeChat")} • {t("multiLanguage")}
            </span>
          </Badge>

          <div className="space-y-6">
            <h1 className={`text-6xl lg:text-7xl font-bold leading-tight ${isRTL ? "text-right" : "text-left"}`}>
              <span className="bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                {t("heroTitle")}
              </span>
            </h1>

            <p className={`text-xl text-gray-600 leading-relaxed max-w-lg ${isRTL ? "text-right" : "text-left"}`}>
              {t("heroDescription")}
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 rtl:sm:space-x-reverse ${isRTL ? "sm:flex-row-reverse" : ""}`}
          >
            <Button
              size="lg"
              onClick={() => setShowChat(!showChat)}
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-blue-500/40 transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 mx-2" />
              <span>{t("startChat")}</span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-full px-8 py-4 text-lg font-semibold bg-white/80"
            >
              <span>{t("watchDemo")}</span>
            </Button>
          </div>

          {/* Features */}
          <div className={`grid grid-cols-2 gap-4 pt-8 ${isRTL ? "text-right" : "text-left"}`}>
            {[
              { icon: Brain, text: t("aiPowered") },
              { icon: Zap, text: t("realTimeChat") },
              { icon: Globe, text: t("multiLanguage") },
              { icon: Sparkles, text: t("customDesign") },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 rtl:space-x-reverse text-gray-600 group cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium group-hover:text-blue-600 transition-colors duration-300">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className={`relative ${isRTL ? "lg:order-1" : ""}`}>
          {showChat ? (
            <div className="transform transition-all duration-500 ease-out scale-100 opacity-100">
              <ChatInterface className="shadow-2xl border-0 bg-white/90 backdrop-blur-xl" />
            </div>
          ) : (
            <div
              className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100/50 p-8 hover:shadow-blue-500/20 transition-all duration-500 group cursor-pointer"
              onClick={() => setShowChat(true)}
            >
              {/* Preview Chat */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t("heroTitle")}</div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>{t("online")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className={`bg-gray-50 rounded-2xl p-4 max-w-xs ${isRTL ? "mr-auto" : ""}`}>
                  <div className="text-gray-800 text-sm">{t("welcomeMessage")}</div>
                </div>

                <div className={`bg-blue-600 text-white rounded-2xl p-4 max-w-xs ${isRTL ? "mr-0" : "ml-auto"}`}>
                  <div className="text-sm">
                    {language === "ar" ? "أريد إنشاء موقع لمطعمي" : "I want to create a website for my restaurant"}
                  </div>
                </div>

                <div className={`bg-gray-50 rounded-2xl p-4 max-w-xs ${isRTL ? "mr-auto" : ""}`}>
                  <div className="text-gray-800 text-sm">
                    {language === "ar"
                      ? "ممتاز! سأساعدك في إنشاء موقع احترافي لمطعمك..."
                      : "Excellent! I'll help you create a professional restaurant website..."}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full px-6 py-2 group-hover:scale-105 transition-transform duration-300">
                  <MessageCircle className="w-4 h-4 mx-2" />
                  {t("startChat")}
                </Button>
              </div>

              {/* Click to start overlay */}
              <div className="absolute inset-0 bg-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <span className="text-blue-600 font-medium text-sm">{t("startChat")}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
