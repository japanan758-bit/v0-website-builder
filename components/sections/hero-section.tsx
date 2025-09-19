"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Sparkles, Zap, Globe, Users, ArrowRight } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"

export default function HeroSection() {
  const { t, language } = useTranslation()
  const [currentStat, setCurrentStat] = useState(0)

  const stats = [
    { icon: Globe, value: "10,000+", label: language === "ar" ? "موقع تم إنشاؤه" : "Websites Created" },
    { icon: Users, value: "5,000+", label: language === "ar" ? "عميل سعيد" : "Happy Clients" },
    { icon: Sparkles, value: "50+", label: language === "ar" ? "قالب متاح" : "Templates Available" },
    { icon: Zap, value: "24/7", label: language === "ar" ? "دعم فني" : "Support Available" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-background">
      {/* Animated Background */}
      <div className="absolute inset-0 mesh-bg opacity-5"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute top-40 right-20 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-24 h-24 bg-secondary/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-40 right-10 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-card border border-border mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-accent ml-2 rtl:mr-2 rtl:ml-0" />
            <span className="text-sm font-medium text-foreground">
              {language === "ar" ? "الآن مع تقنية الذكاء الاصطناعي المتقدمة" : "Now with Advanced AI Technology"}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="gradient-text">{language === "ar" ? "Chat2Site" : "Chat2Site"}</span>
            <br />
            <span className="text-foreground">
              {language === "ar" ? "إنشاء المواقع بالدردشة" : "Create Websites by Chatting"}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {language === "ar"
              ? "أخبرنا عن فكرة موقعك في محادثة بسيطة، وسنقوم بإنشائه لك بالذكاء الاصطناعي في دقائق معدودة"
              : "Tell us about your website idea in a simple conversation, and we'll create it for you with AI in minutes"}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/generate">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground text-lg px-8 py-4 h-auto btn-glow"
              >
                <MessageSquare className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
                {language === "ar" ? "ابدأ المحادثة الآن" : "Start Chatting Now"}
                <ArrowRight className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 h-auto hover-lift bg-card/50 backdrop-blur-sm border-border/50"
            >
              <Sparkles className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
              {language === "ar" ? "شاهد كيف يعمل" : "See How It Works"}
            </Button>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className={`text-center p-6 rounded-2xl transition-all duration-500 backdrop-blur-sm ${
                    currentStat === index
                      ? "bg-card shadow-xl scale-105 glow border border-accent/20"
                      : "bg-card/50 hover:bg-card/80 border border-border/50"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 mx-auto mb-3 ${currentStat === index ? "text-accent" : "text-muted-foreground"}`}
                  />
                  <div
                    className={`text-2xl font-bold mb-1 ${currentStat === index ? "gradient-text" : "text-foreground"}`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
