"use client"

import { Check, Zap, Crown } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"

export default function PricingSection() {
  const { language } = useTranslation()

  const plans = [
    {
      name: language === "ar" ? "مجاني" : "Free",
      price: language === "ar" ? "مجاناً" : "Free",
      description: language === "ar" ? "للمشاريع الشخصية البسيطة" : "For simple personal projects",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      features: [
        language === "ar" ? "موقع واحد" : "1 Website",
        language === "ar" ? "5 صفحات كحد أقصى" : "Up to 5 pages",
        language === "ar" ? "قوالب أساسية" : "Basic templates",
        language === "ar" ? "دعم فني أساسي" : "Basic support",
        language === "ar" ? "استضافة مجانية" : "Free hosting",
      ],
      popular: false,
    },
    {
      name: language === "ar" ? "احترافي" : "Pro",
      price: language === "ar" ? "99 ريال/شهر" : "$29/month",
      description: language === "ar" ? "للشركات والمشاريع التجارية" : "For businesses and commercial projects",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      features: [
        language === "ar" ? "مواقع غير محدودة" : "Unlimited websites",
        language === "ar" ? "صفحات غير محدودة" : "Unlimited pages",
        language === "ar" ? "جميع القوالب المتقدمة" : "All premium templates",
        language === "ar" ? "دعم فني متقدم 24/7" : "24/7 premium support",
        language === "ar" ? "نطاق مخصص مجاني" : "Free custom domain",
        language === "ar" ? "تحليلات متقدمة" : "Advanced analytics",
        language === "ar" ? "نسخ احتياطية يومية" : "Daily backups",
      ],
      popular: true,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {language === "ar" ? "خطط الأسعار" : "Pricing Plans"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === "ar" ? "اختر الخطة المناسبة لاحتياجاتك" : "Choose the plan that fits your needs"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <Card
                key={index}
                className={`relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover-lift ${
                  plan.popular ? "ring-2 ring-accent/50 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      {language === "ar" ? "الأكثر شعبية" : "Most Popular"}
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-foreground mb-2">{plan.price}</div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                          : "bg-card hover:bg-card/80 text-foreground border border-border"
                      }`}
                      size="lg"
                    >
                      {language === "ar" ? "ابدأ الآن" : "Get Started"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            {language === "ar"
              ? "جميع الخطط تشمل ضمان استرداد المال لمدة 30 يوماً"
              : "All plans include a 30-day money-back guarantee"}
          </p>
        </div>
      </div>
    </section>
  )
}
