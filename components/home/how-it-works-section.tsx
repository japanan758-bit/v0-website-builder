"use client"

import { useState } from "react"
import { Search, Palette, Rocket, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

export function HowItWorksSection() {
  const { language } = useTranslation()
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const isRTL = languages[language].dir === "rtl"

  const steps = [
    {
      icon: Search,
      title: language === "ar" ? "اختر القالب" : "Choose Template",
      description:
        language === "ar"
          ? "تصفح مكتبتنا الواسعة واختر القالب المناسب لمشروعك"
          : "Browse our extensive library and choose the perfect template for your project",
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
      step: "01",
    },
    {
      icon: Palette,
      title: language === "ar" ? "خصص التصميم" : "Customize Design",
      description:
        language === "ar"
          ? "غير الألوان والخطوط والصور لتناسب هويتك التجارية"
          : "Change colors, fonts, and images to match your brand identity",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      step: "02",
    },
    {
      icon: Settings,
      title: language === "ar" ? "أضف المحتوى" : "Add Content",
      description:
        language === "ar"
          ? "أضف النصوص والصور ومقاطع الفيديو الخاصة بك"
          : "Add your own text, images, and videos to make it yours",
      color: "from-green-500 to-teal-500",
      bgColor: "from-green-50 to-teal-50",
      step: "03",
    },
    {
      icon: Rocket,
      title: language === "ar" ? "انشر الموقع" : "Launch Website",
      description:
        language === "ar"
          ? "انشر موقعك على الإنترنت بنقرة واحدة واجعله متاحاً للعالم"
          : "Publish your website online with one click and make it available to the world",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      step: "04",
    },
  ]

  return (
    <section className="py-20 bg-white" dir={languages[language].dir}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 ${isRTL ? "text-right" : "text-left"} md:text-center`}>
          <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-0 rounded-full">
            {language === "ar" ? "كيف يعمل" : "How It Works"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "ar" ? "أنشئ موقعك في 4 خطوات بسيطة" : "Create Your Website in 4 Simple Steps"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "ar"
              ? "عملية بسيطة وسريعة لإنشاء موقع احترافي دون الحاجة لخبرة تقنية"
              : "A simple and fast process to create a professional website without technical expertise"}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br ${step.bgColor} hover:scale-105 rounded-3xl overflow-hidden cursor-pointer relative`}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Step Number */}
              <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                >
                  {step.step}
                </div>
              </div>

              <CardContent className="p-8 pt-16">
                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>

                {/* Hover Effect */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rtl:origin-right`}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-16 relative">
          <div className="flex items-center justify-center">
            <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}
                  >
                    {step.step}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-16 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-lg text-gray-600">
              {language === "ar"
                ? "من الفكرة إلى الموقع المنشور في أقل من 30 دقيقة"
                : "From idea to published website in less than 30 minutes"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
