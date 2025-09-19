"use client"

import { MessageSquare, Zap, Globe, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"

export default function HowItWorksSection() {
  const { language } = useTranslation()

  const steps = [
    {
      icon: MessageSquare,
      title: language === "ar" ? "أخبرنا عن فكرتك" : "Tell Us Your Idea",
      description:
        language === "ar"
          ? "اكتب وصف بسيط لموقعك في محادثة طبيعية مع مساعدنا الذكي"
          : "Write a simple description of your website in a natural conversation with our AI assistant",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: language === "ar" ? "الذكاء الاصطناعي يعمل" : "AI Gets to Work",
      description:
        language === "ar"
          ? "يقوم الذكاء الاصطناعي بتحليل متطلباتك وإنشاء موقع مخصص لك"
          : "AI analyzes your requirements and creates a custom website for you",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Globe,
      title: language === "ar" ? "موقعك جاهز" : "Your Website is Ready",
      description:
        language === "ar"
          ? "احصل على موقع احترافي متجاوب مع جميع الأجهزة في دقائق معدودة"
          : "Get a professional responsive website that works on all devices in minutes",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {language === "ar" ? "كيف يعمل Chat2Site؟" : "How Does Chat2Site Work?"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === "ar"
              ? "ثلاث خطوات بسيطة لإنشاء موقعك الاحترافي"
              : "Three simple steps to create your professional website"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0"
                    style={{ width: "calc(100% - 2rem)" }}
                  />
                )}

                <Card className="relative z-10 text-center p-8 bg-card/50 backdrop-blur-sm border-border/50 hover-lift">
                  <CardContent className="p-0">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Features List */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                ar: "لا حاجة لخبرة تقنية",
                en: "No technical expertise needed",
              },
              {
                ar: "دعم كامل للغة العربية",
                en: "Full Arabic language support",
              },
              {
                ar: "مواقع متجاوبة مع جميع الأجهزة",
                en: "Responsive on all devices",
              },
              {
                ar: "تصميمات حديثة واحترافية",
                en: "Modern and professional designs",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-foreground">{language === "ar" ? feature.ar : feature.en}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
