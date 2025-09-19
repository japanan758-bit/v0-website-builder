"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Globe, Users, Zap, TrendingUp, Star, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

interface StatItem {
  icon: React.ComponentType<any>
  value: number
  label: string
  suffix: string
  color: string
}

export function StatsSection() {
  const { language } = useTranslation()
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0, 0, 0])

  const stats: StatItem[] = [
    {
      icon: Globe,
      value: 50000,
      label: language === "ar" ? "موقع تم إنشاؤه" : "Websites Created",
      suffix: "+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      value: 25000,
      label: language === "ar" ? "عميل راضٍ" : "Happy Customers",
      suffix: "+",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      value: 99,
      label: language === "ar" ? "وقت تشغيل" : "Uptime",
      suffix: "%",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: TrendingUp,
      value: 300,
      label: language === "ar" ? "نمو شهري" : "Monthly Growth",
      suffix: "%",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Star,
      value: 4.9,
      label: language === "ar" ? "تقييم العملاء" : "Customer Rating",
      suffix: "/5",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Award,
      value: 15,
      label: language === "ar" ? "جائزة دولية" : "International Awards",
      suffix: "+",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  useEffect(() => {
    const animateValues = () => {
      stats.forEach((stat, index) => {
        let current = 0
        const increment = stat.value / 100
        const timer = setInterval(() => {
          current += increment
          if (current >= stat.value) {
            current = stat.value
            clearInterval(timer)
          }
          setAnimatedValues((prev) => {
            const newValues = [...prev]
            newValues[index] = current
            return newValues
          })
        }, 20)
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateValues()
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("stats-section")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="stats-section"
      className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden"
      dir={languages[language].dir}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {language === "ar" ? "أرقام تتحدث عن نفسها" : "Numbers That Speak"}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {language === "ar"
              ? "نفخر بالثقة التي وضعها عملاؤنا فينا والنجاحات التي حققناها معاً"
              : "We're proud of the trust our customers place in us and the successes we've achieved together"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <stat.icon className="w-10 h-10 text-white" />
                </div>

                {/* Value */}
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {stat.value === 4.9
                      ? animatedValues[index].toFixed(1)
                      : Math.floor(animatedValues[index]).toLocaleString()}
                  </span>
                  <span className="text-2xl font-bold text-cyan-400">{stat.suffix}</span>
                </div>

                {/* Label */}
                <p className="text-gray-300 text-lg font-medium">{stat.label}</p>

                {/* Progress Bar */}
                <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: `${(animatedValues[index] / stat.value) * 100}%`,
                    }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {language === "ar" ? "انضم إلى آلاف العملاء الراضين" : "Join Thousands of Satisfied Customers"}
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              {language === "ar"
                ? "ابدأ رحلتك في إنشاء مواقع احترافية بالذكاء الاصطناعي اليوم"
                : "Start your journey in creating professional AI-powered websites today"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                {language === "ar" ? "ابدأ مجاناً" : "Start Free Trial"}
              </button>
              <button className="border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                {language === "ar" ? "شاهد العرض التوضيحي" : "Watch Demo"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
      <div className="absolute bottom-20 right-10 w-6 h-6 bg-purple-400 rounded-full animate-pulse opacity-75"></div>
      <div className="absolute top-1/2 left-5 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-75"></div>
    </section>
  )
}
