"use client"

import { useState } from "react"
import { Bot, MessageCircle, Globe, Zap, Brain, Palette, Code2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

export function AgentFeatures() {
  const { t, language } = useTranslation()
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const isRTL = languages[language].dir === "rtl"

  const features = [
    {
      icon: MessageCircle,
      title: language === "ar" ? "محادثة ذكية" : "Smart Conversation",
      description:
        language === "ar"
          ? "تحدث معي بلغتك الطبيعية وسأفهم احتياجاتك تماماً"
          : "Talk to me in your natural language and I'll understand your needs perfectly",
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
    },
    {
      icon: Brain,
      title: language === "ar" ? "ذكاء اصطناعي متقدم" : "Advanced AI",
      description:
        language === "ar"
          ? "أستخدم أحدث تقنيات الذكاء الاصطناعي لإنشاء مواقع مذهلة"
          : "I use the latest AI technology to create stunning websites",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      icon: Globe,
      title: language === "ar" ? "متعدد اللغات" : "Multi-language",
      description:
        language === "ar"
          ? "أتحدث العربية والإنجليزية وأنشئ مواقع بأي لغة تريدها"
          : "I speak Arabic and English and create websites in any language you want",
      color: "from-green-500 to-teal-500",
      bgColor: "from-green-50 to-teal-50",
    },
    {
      icon: Zap,
      title: language === "ar" ? "سرعة فائقة" : "Lightning Fast",
      description:
        language === "ar"
          ? "أنشئ موقعك في دقائق معدودة بجودة احترافية عالية"
          : "Create your website in minutes with high professional quality",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
    },
    {
      icon: Palette,
      title: language === "ar" ? "تصميم مخصص" : "Custom Design",
      description:
        language === "ar"
          ? "كل موقع أصممه فريد ومخصص حسب احتياجاتك وذوقك"
          : "Every website I design is unique and customized to your needs and taste",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
    },
    {
      icon: Code2,
      title: language === "ar" ? "كود نظيف" : "Clean Code",
      description:
        language === "ar"
          ? "أكتب كود نظيف ومحسن لمحركات البحث وسريع التحميل"
          : "I write clean, SEO-optimized code that loads fast",
      color: "from-indigo-500 to-blue-500",
      bgColor: "from-indigo-50 to-blue-50",
    },
  ]

  return (
    <section className="py-20 bg-white" dir={languages[language].dir}>
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 ${isRTL ? "text-right" : "text-left"} md:text-center`}>
          <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-0 rounded-full">
            {t("features")}
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === "ar" ? "لماذا أنا وكيلك المثالي؟" : "Why Am I Your Perfect Agent?"}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === "ar"
              ? "أجمع بين الذكاء الاصطناعي المتقدم والفهم العميق لاحتياجاتك"
              : "I combine advanced AI with deep understanding of your needs"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br ${feature.bgColor} hover:scale-105 rounded-3xl overflow-hidden cursor-pointer`}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Agent Personality Section */}
        <div className="mt-20">
          <Card className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-3xl overflow-hidden">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-6">
                {language === "ar" ? "مرحباً، أنا وكيلك الذكي!" : "Hello, I'm Your AI Agent!"}
              </h3>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                {language === "ar"
                  ? "أنا هنا لأساعدك في كل خطوة من رحلة إنشاء موقعك. من الفكرة الأولى إلى الإطلاق النهائي، سأكون معك لأضمن حصولك على موقع يفوق توقعاتك."
                  : "I'm here to help you every step of your website creation journey. From the first idea to the final launch, I'll be with you to ensure you get a website that exceeds your expectations."}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                  language === "ar" ? "🎨 مبدع" : "🎨 Creative",
                  language === "ar" ? "⚡ سريع" : "⚡ Fast",
                  language === "ar" ? "🧠 ذكي" : "🧠 Smart",
                  language === "ar" ? "💬 ودود" : "💬 Friendly",
                ].map((trait, index) => (
                  <Badge key={index} className="bg-white/20 text-white border-0 px-4 py-2 text-sm">
                    {trait}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
