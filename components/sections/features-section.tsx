"use client"

import { Brain, Code, Smartphone, Zap, Shield, Palette, Sparkles } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function FeaturesSection() {
  const { t } = useTranslation()

  const features = [
    {
      icon: Brain,
      title: t("aiPowered"),
      description: t("aiPoweredDesc"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Code,
      title: t("noCode"),
      description: t("noCodeDesc"),
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Smartphone,
      title: t("responsive"),
      description: t("responsiveDesc"),
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: t("fastDeployment"),
      description: t("fastDeploymentDesc"),
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "أمان متقدم",
      description: "حماية شاملة لموقعك وبياناتك مع شهادات SSL مجانية",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: Palette,
      title: "تخصيص كامل",
      description: "تحكم كامل في التصميم والألوان والخطوط لتناسب هويتك",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t("featuresTitle")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اكتشف القوة الحقيقية للذكاء الاصطناعي في بناء المواقع الإلكترونية
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 border border-blue-200">
            <Sparkles className="w-5 h-5 text-blue-600 ml-2" />
            <span className="text-blue-800 font-medium">وأكثر من 50 ميزة أخرى في انتظارك</span>
          </div>
        </div>
      </div>
    </section>
  )
}
