"use client"

import { useState } from "react"
import { Check, X, Zap, Crown, Rocket, ArrowRight, Users, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

export default function PricingPage() {
  const { language } = useTranslation()
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("pro")

  const plans = [
    {
      id: "starter",
      name: language === "ar" ? "المبتدئ" : "Starter",
      icon: Zap,
      description: language === "ar" ? "مثالي للمشاريع الصغيرة والشخصية" : "Perfect for small and personal projects",
      monthlyPrice: 29,
      yearlyPrice: 290,
      currency: language === "ar" ? "ريال" : "$",
      color: "from-blue-500 to-cyan-500",
      features: [
        { name: language === "ar" ? "5 مواقع" : "5 websites", included: true },
        { name: language === "ar" ? "10 جيجا تخزين" : "10GB storage", included: true },
        { name: language === "ar" ? "قوالب أساسية" : "Basic templates", included: true },
        { name: language === "ar" ? "دعم فني عبر البريد" : "Email support", included: true },
        { name: language === "ar" ? "شهادة SSL مجانية" : "Free SSL certificate", included: true },
        { name: language === "ar" ? "ذكاء اصطناعي متقدم" : "Advanced AI", included: false },
        { name: language === "ar" ? "تحليلات متقدمة" : "Advanced analytics", included: false },
        { name: language === "ar" ? "دعم أولوية" : "Priority support", included: false },
        { name: language === "ar" ? "نسخ احتياطية يومية" : "Daily backups", included: false },
      ],
    },
    {
      id: "pro",
      name: language === "ar" ? "المحترف" : "Professional",
      icon: Crown,
      description: language === "ar" ? "الأفضل للشركات والمشاريع المتوسطة" : "Best for businesses and medium projects",
      monthlyPrice: 99,
      yearlyPrice: 990,
      currency: language === "ar" ? "ريال" : "$",
      color: "from-purple-500 to-pink-500",
      popular: true,
      features: [
        { name: language === "ar" ? "مواقع غير محدودة" : "Unlimited websites", included: true },
        { name: language === "ar" ? "100 جيجا تخزين" : "100GB storage", included: true },
        { name: language === "ar" ? "جميع القوالب" : "All templates", included: true },
        { name: language === "ar" ? "ذكاء اصطناعي متقدم" : "Advanced AI", included: true },
        { name: language === "ar" ? "تحليلات متقدمة" : "Advanced analytics", included: true },
        { name: language === "ar" ? "دعم أولوية" : "Priority support", included: true },
        { name: language === "ar" ? "نسخ احتياطية يومية" : "Daily backups", included: true },
        { name: language === "ar" ? "تكامل API" : "API integration", included: true },
        { name: language === "ar" ? "إزالة العلامة المائية" : "Remove watermark", included: true },
      ],
    },
    {
      id: "enterprise",
      name: language === "ar" ? "المؤسسات" : "Enterprise",
      icon: Rocket,
      description:
        language === "ar" ? "للمؤسسات الكبيرة والمشاريع المعقدة" : "For large enterprises and complex projects",
      monthlyPrice: 299,
      yearlyPrice: 2990,
      currency: language === "ar" ? "ريال" : "$",
      color: "from-orange-500 to-red-500",
      features: [
        { name: language === "ar" ? "كل ميزات المحترف" : "Everything in Pro", included: true },
        { name: language === "ar" ? "تخزين غير محدود" : "Unlimited storage", included: true },
        { name: language === "ar" ? "مدير حساب مخصص" : "Dedicated account manager", included: true },
        { name: language === "ar" ? "دعم فني 24/7" : "24/7 technical support", included: true },
        { name: language === "ar" ? "تدريب مخصص" : "Custom training", included: true },
        { name: language === "ar" ? "API مخصص" : "Custom API", included: true },
        { name: language === "ar" ? "تكامل متقدم" : "Advanced integrations", included: true },
        { name: language === "ar" ? "SLA مضمون" : "Guaranteed SLA", included: true },
        { name: language === "ar" ? "أمان متقدم" : "Advanced security", included: true },
      ],
    },
  ]

  const addOns = [
    {
      name: language === "ar" ? "تصميم مخصص" : "Custom Design",
      description: language === "ar" ? "تصميم فريد لموقعك" : "Unique design for your website",
      price: 199,
      currency: language === "ar" ? "ريال" : "$",
    },
    {
      name: language === "ar" ? "تحسين السرعة" : "Speed Optimization",
      description: language === "ar" ? "تحسين سرعة تحميل الموقع" : "Optimize website loading speed",
      price: 99,
      currency: language === "ar" ? "ريال" : "$",
    },
    {
      name: language === "ar" ? "تحسين محركات البحث" : "SEO Optimization",
      description: language === "ar" ? "تحسين ترتيب موقعك في البحث" : "Improve your website search ranking",
      price: 149,
      currency: language === "ar" ? "ريال" : "$",
    },
  ]

  const faqs = [
    {
      question: language === "ar" ? "هل يمكنني تغيير الخطة لاحقاً؟" : "Can I change my plan later?",
      answer:
        language === "ar"
          ? "نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. التغييرات ستطبق في دورة الفوترة التالية."
          : "Yes, you can upgrade or downgrade your plan anytime. Changes will apply in the next billing cycle.",
    },
    {
      question: language === "ar" ? "هل هناك فترة تجريبية مجانية؟" : "Is there a free trial period?",
      answer:
        language === "ar"
          ? "نعم، نقدم فترة تجريبية مجانية لمدة 14 يوم لجميع الخطط المدفوعة."
          : "Yes, we offer a 14-day free trial for all paid plans.",
    },
    {
      question: language === "ar" ? "ما هي طرق الدفع المتاحة؟" : "What payment methods are available?",
      answer:
        language === "ar"
          ? "نقبل جميع البطاقات الائتمانية الرئيسية، PayPal، والتحويل البنكي."
          : "We accept all major credit cards, PayPal, and bank transfers.",
    },
    {
      question: language === "ar" ? "هل يمكنني إلغاء اشتراكي؟" : "Can I cancel my subscription?",
      answer:
        language === "ar"
          ? "نعم، يمكنك إلغاء اشتراكك في أي وقت. لن يتم تجديد الاشتراك تلقائياً بعد الإلغاء."
          : "Yes, you can cancel your subscription anytime. It won't auto-renew after cancellation.",
    },
  ]

  const getPrice = (plan: any) => {
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
    return price
  }

  const getSavings = (plan: any) => {
    const monthlyCost = plan.monthlyPrice * 12
    const yearlyCost = plan.yearlyPrice
    const savings = monthlyCost - yearlyCost
    return Math.round((savings / monthlyCost) * 100)
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
      dir={languages[language].dir}
    >
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-4 py-2">
              {language === "ar" ? "خطط الأسعار" : "Pricing Plans"}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {language === "ar" ? "اختر الخطة" : "Choose the Plan"}
              </span>
              <br />
              {language === "ar" ? "المناسبة لك" : "That's Right for You"}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {language === "ar"
                ? "خطط مرنة تناسب جميع احتياجاتك، من المشاريع الشخصية إلى المؤسسات الكبيرة"
                : "Flexible plans that suit all your needs, from personal projects to large enterprises"}
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-lg ${!isYearly ? "text-white font-semibold" : "text-gray-400"}`}>
                {language === "ar" ? "شهري" : "Monthly"}
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-600"
              />
              <span className={`text-lg ${isYearly ? "text-white font-semibold" : "text-gray-400"}`}>
                {language === "ar" ? "سنوي" : "Yearly"}
              </span>
              {isYearly && (
                <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0 ml-2">
                  {language === "ar" ? "وفر 20%" : "Save 20%"}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative transition-all duration-500 hover:scale-105 ${
                  plan.popular
                    ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500 shadow-2xl scale-105"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                } backdrop-blur-md cursor-pointer`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-6 py-2 text-sm font-semibold">
                      {language === "ar" ? "الأكثر شعبية" : "Most Popular"}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <plan.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-300 mb-6">{plan.description}</CardDescription>

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-white">{getPrice(plan)}</span>
                      <span className="text-xl text-cyan-400 ml-1">{plan.currency}</span>
                      <span className="text-gray-400 ml-2">
                        /{language === "ar" ? (isYearly ? "سنة" : "شهر") : isYearly ? "year" : "month"}
                      </span>
                    </div>
                    {isYearly && (
                      <p className="text-green-400 text-sm">
                        {language === "ar" ? `وفر ${getSavings(plan)}%` : `Save ${getSavings(plan)}%`}
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button
                    className={`w-full mb-8 bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-semibold py-3 text-lg`}
                    onClick={() => {}}
                  >
                    {language === "ar" ? "ابدأ الآن" : "Get Started"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>

                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                        )}
                        <span className={`${feature.included ? "text-gray-300" : "text-gray-500"}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {language === "ar" ? "خدمات إضافية" : "Add-on Services"}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {language === "ar"
                ? "عزز موقعك بخدمات إضافية متخصصة"
                : "Enhance your website with specialized additional services"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {addOns.map((addon, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-3">{addon.name}</h3>
                  <p className="text-gray-300 mb-4">{addon.description}</p>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-3xl font-bold text-cyan-400">{addon.price}</span>
                    <span className="text-lg text-gray-400 ml-1">{addon.currency}</span>
                  </div>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                    {language === "ar" ? "إضافة" : "Add"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {language === "ar" ? "مقارنة الخطط" : "Plan Comparison"}
              </span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-6 text-white font-semibold">
                    {language === "ar" ? "الميزات" : "Features"}
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="text-center p-6">
                      <div className="text-white font-semibold">{plan.name}</div>
                      <div className="text-cyan-400 text-sm">
                        {getPrice(plan)} {plan.currency}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plans[0].features.map((feature, index) => (
                  <tr key={index} className="border-b border-white/10 last:border-b-0">
                    <td className="p-6 text-gray-300">{feature.name}</td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="text-center p-6">
                        {plan.features[index].included ? (
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-500 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-md border border-white/20 rounded-2xl p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "ar" ? "جاهز للبدء؟" : "Ready to Get Started?"}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {language === "ar"
                ? "انضم إلى آلاف العملاء الذين يثقون بنا في إنشاء مواقعهم"
                : "Join thousands of customers who trust us to create their websites"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg"
              >
                {language === "ar" ? "ابدأ التجربة المجانية" : "Start Free Trial"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
              >
                {language === "ar" ? "تحدث مع المبيعات" : "Talk to Sales"}
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 mt-8 text-gray-400">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>{language === "ar" ? "آمن 100%" : "100% Secure"}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>{language === "ar" ? "دعم 24/7" : "24/7 Support"}</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                <span>{language === "ar" ? "عالمي" : "Global"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
