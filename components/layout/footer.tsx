"use client"

import Link from "next/link"
import { Bot, Heart, Globe, Zap } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

export function Footer() {
  const { t, language } = useTranslation()

  return (
    <footer
      className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white"
      dir={languages[language].dir}
    >
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  AI WebAgent
                </h3>
                <p className="text-sm text-gray-300">
                  {language === "ar" ? "منشئ المواقع الذكي" : "Smart Website Builder"}
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              {language === "ar"
                ? "نحول أفكارك إلى مواقع استثنائية باستخدام أحدث تقنيات الذكاء الاصطناعي. ابدأ رحلتك الرقمية معنا اليوم."
                : "We transform your ideas into exceptional websites using the latest AI technology. Start your digital journey with us today."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">{language === "ar" ? "روابط سريعة" : "Quick Links"}</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/templates"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <Zap className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  {language === "ar" ? "القوالب" : "Templates"}
                </Link>
              </li>
              <li>
                <Link
                  href="/builder"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <Bot className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  {language === "ar" ? "منشئ المواقع" : "Website Builder"}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <Globe className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  {language === "ar" ? "الأسعار" : "Pricing"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">{language === "ar" ? "المميزات" : "Features"}</h4>
            <ul className="space-y-4">
              <li>
                <span className="text-gray-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  {language === "ar" ? "ذكاء اصطناعي متطور" : "Advanced AI"}
                </span>
              </li>
              <li>
                <span className="text-gray-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  {language === "ar" ? "تصميم متجاوب" : "Responsive Design"}
                </span>
              </li>
              <li>
                <span className="text-gray-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  {language === "ar" ? "سرعة فائقة" : "Lightning Fast"}
                </span>
              </li>
              <li>
                <span className="text-gray-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  {language === "ar" ? "أمان عالي" : "High Security"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-gray-300">
              <span>{language === "ar" ? "صُنع بـ" : "Made with"}</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>{language === "ar" ? "باستخدام الذكاء الاصطناعي" : "using AI Technology"}</span>
            </div>

            <div className="text-center text-gray-400">
              <p>© 2025 AI WebAgent. {language === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Globe className="w-4 h-4" />
                <span>
                  {language === "ar" ? "متاح بـ" : "Available in"} 2 {language === "ar" ? "لغات" : "languages"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
