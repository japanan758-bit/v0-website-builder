"use client"

import { useState } from "react"
import { Bot, Zap, Globe, Palette, Code, Shield, BarChart3, Smartphone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

export function FeaturesSection() {
  const { t, language } = useTranslation()
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const isRTL = languages[language].dir === "rtl"

  const features = [
    {
      icon: Bot,
      title: language === "ar" ? "ذكاء اصطناعي متقدم" : "Advanced AI",
      description:
        language === "ar"
          ? "تقنية ذكاء اصطناعي متطورة تفهم متطلباتك وتحولها إلى مواقع احترافية"
          : "Advanced AI technology that understands your requirements and transforms them into professional websites",
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
    },
    {
      icon: Zap,
      title: language === "ar" ? "سرعة فائقة" : "Lightning Fast",
      description:
        language === "ar"
          ? "إنشاء مواقع كاملة في ثوانٍ معدودة بدلاً من أسابيع من العمل التقليدي"
          : "Create complete websites in seconds instead of weeks of traditional work",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
    },
    {
      icon: Palette,
      title: language === "ar" ? "تصميم مخصص" : "Custom Design",
      description:
        language === "ar"
          ? "تصاميم فريدة ومخصصة تناسب هويتك التجارية وتعكس شخصيتك المهنية"
          : "Unique and customized designs that match your brand identity and reflect your professional personality",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      icon: Smartphone,
      title: language === "ar" ? "متجاوب تماماً" : "Fully Responsive",
      description:
        language === "ar"
          ? "مواقع تعمل بشكل مثالي على جميع الأجهزة من الهواتف إلى أجهزة الكمبيوتر"
          : "Websites that work perfectly on all devices from phones to computers",
      color: "from-green-500 to-teal-500",
      bgColor: "from-green-50 to-teal-50",
    },
    {
      icon: Code,
      title: language === "ar" ? "كود نظيف" : "Clean Code",
      description:
        language === "ar"
          ? "كود مُحسَّن وسريع يضمن أداءً ممتازاً ومتوافق مع معايير الويب الحديثة"
          : "Optimized and fast code that ensures excellent performance and complies with modern web standards",
      color: "from-indigo-500 to-blue-500",
      bgColor: "from-indigo-50 to-blue-50",
    },
    {
      icon: Shield,
      title: language === "ar" ? "أمان عالي" : "High Security",
      description:
        language === "ar"
          ? "حماية متقدمة وشهادات SSL مجانية لضمان أمان موقعك وبيانات عملائك"
          : "Advanced protection and free SSL certificates to ensure the security of your site and customer data",
      color: "from-red-500 to-pink-500",
      bgColor: "from-red-50 to-pink-50",
    },
    {
      icon: BarChart3,
      title: language === "ar" ? "تحليلات ذكية" : "Smart Analytics",
      description:
        language === "ar"
          ? "تقارير مفصلة وتحليلات ذكية لفهم أداء موقعك وسلوك الزوار"
          : "Detailed reports and smart analytics to understand your site's performance and visitor behavior",
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-50 to-blue-50",
    },
    {
      icon: Globe,
      title: language === "ar" ? "متعدد اللغات" : "Multi-language",
      description:
        language === "ar"
          ? "دعم كامل للغات متعددة مع إمكانية التبديل السلس بين العربية والإنجليزية"
          : "Full support for multiple languages with seamless switching between Arabic and English",
      color: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-50 to-green-50",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30" dir={languages[language].dir}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 ${isRTL ? "text-right" : "text-left"} md:text-center`}>
          <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-0 rounded-full">
            {t("features")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "ar" ? "لماذا تختار منصتنا؟" : "Why Choose Our Platform?"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "ar"
              ? "نقدم لك أحدث التقنيات والأدوات لإنشاء مواقع استثنائية تلبي جميع احتياجاتك"
              : "We provide you with the latest technologies and tools to create exceptional websites that meet all your needs"}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br ${feature.bgColor} hover:scale-105 rounded-3xl overflow-hidden cursor-pointer`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                {/* Hover Effect */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rtl:origin-right`}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === "ar" ? "جاهز لتجربة القوة الكاملة؟" : "Ready to Experience the Full Power?"}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === "ar"
                ? "ابدأ رحلتك في إنشاء مواقع احترافية بالذكاء الاصطناعي اليوم"
                : "Start your journey in creating professional websites with AI today"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-full px-8 py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                {language === "ar" ? "ابدأ مجاناً" : "Start Free"}
              </button>
              <button className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-full px-8 py-3 font-semibold transition-all duration-300 bg-white/80">
                {language === "ar" ? "شاهد العرض" : "Watch Demo"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
