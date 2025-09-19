"use client"

import { useState } from "react"
import {
  Sparkles,
  Palette,
  Code,
  Smartphone,
  Search,
  Shield,
  Zap,
  Users,
  BarChart3,
  Headphones,
  ArrowRight,
  Check,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

export default function ServicesPage() {
  const { language } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState("all")

  const services = [
    {
      id: "ai-website-builder",
      category: "ai",
      icon: Sparkles,
      title: language === "ar" ? "منشئ المواقع بالذكاء الاصطناعي" : "AI Website Builder",
      description:
        language === "ar"
          ? "أنشئ مواقع احترافية في دقائق باستخدام الذكاء الاصطناعي المتقدم"
          : "Create professional websites in minutes using advanced AI technology",
      features: [
        language === "ar" ? "إنشاء تلقائي للمحتوى" : "Automatic content generation",
        language === "ar" ? "تصميم متجاوب" : "Responsive design",
        language === "ar" ? "تحسين محركات البحث" : "SEO optimization",
        language === "ar" ? "قوالب متنوعة" : "Diverse templates",
      ],
      price: language === "ar" ? "من 99 ريال/شهر" : "From $99/month",
      popular: true,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "custom-design",
      category: "design",
      icon: Palette,
      title: language === "ar" ? "التصميم المخصص" : "Custom Design",
      description:
        language === "ar"
          ? "تصميمات فريدة ومخصصة تعكس هوية علامتك التجارية"
          : "Unique custom designs that reflect your brand identity",
      features: [
        language === "ar" ? "تصميم حسب الطلب" : "Bespoke design",
        language === "ar" ? "هوية بصرية متكاملة" : "Complete visual identity",
        language === "ar" ? "مراجعات غير محدودة" : "Unlimited revisions",
        language === "ar" ? "ملفات المصدر" : "Source files included",
      ],
      price: language === "ar" ? "من 299 ريال/مشروع" : "From $299/project",
      popular: false,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "development",
      category: "development",
      icon: Code,
      title: language === "ar" ? "التطوير المتقدم" : "Advanced Development",
      description:
        language === "ar"
          ? "حلول برمجية متقدمة ومخصصة لاحتياجاتك الخاصة"
          : "Advanced custom software solutions for your specific needs",
      features: [
        language === "ar" ? "برمجة مخصصة" : "Custom programming",
        language === "ar" ? "تكامل API" : "API integration",
        language === "ar" ? "قواعد بيانات متقدمة" : "Advanced databases",
        language === "ar" ? "أمان عالي" : "High security",
      ],
      price: language === "ar" ? "من 499 ريال/مشروع" : "From $499/project",
      popular: false,
      color: "from-green-500 to-teal-500",
    },
    {
      id: "mobile-optimization",
      category: "mobile",
      icon: Smartphone,
      title: language === "ar" ? "تحسين الجوال" : "Mobile Optimization",
      description:
        language === "ar"
          ? "تحسين مواقعك لتعمل بشكل مثالي على جميع الأجهزة المحمولة"
          : "Optimize your websites to work perfectly on all mobile devices",
      features: [
        language === "ar" ? "تصميم متجاوب" : "Responsive design",
        language === "ar" ? "سرعة تحميل عالية" : "Fast loading speed",
        language === "ar" ? "تجربة مستخدم محسنة" : "Enhanced user experience",
        language === "ar" ? "اختبار على أجهزة متعددة" : "Multi-device testing",
      ],
      price: language === "ar" ? "من 199 ريال/موقع" : "From $199/website",
      popular: false,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "seo-optimization",
      category: "seo",
      icon: Search,
      title: language === "ar" ? "تحسين محركات البحث" : "SEO Optimization",
      description:
        language === "ar"
          ? "حسن ترتيب موقعك في نتائج البحث وزد عدد الزوار"
          : "Improve your website ranking in search results and increase visitors",
      features: [
        language === "ar" ? "تحليل الكلمات المفتاحية" : "Keyword analysis",
        language === "ar" ? "تحسين المحتوى" : "Content optimization",
        language === "ar" ? "بناء الروابط" : "Link building",
        language === "ar" ? "تقارير شهرية" : "Monthly reports",
      ],
      price: language === "ar" ? "من 149 ريال/شهر" : "From $149/month",
      popular: false,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "security",
      category: "security",
      icon: Shield,
      title: language === "ar" ? "الأمان والحماية" : "Security & Protection",
      description:
        language === "ar"
          ? "احم موقعك من التهديدات الإلكترونية والهجمات الضارة"
          : "Protect your website from cyber threats and malicious attacks",
      features: [
        language === "ar" ? "جدار حماية متقدم" : "Advanced firewall",
        language === "ar" ? "شهادات SSL" : "SSL certificates",
        language === "ar" ? "نسخ احتياطية يومية" : "Daily backups",
        language === "ar" ? "مراقبة 24/7" : "24/7 monitoring",
      ],
      price: language === "ar" ? "من 79 ريال/شهر" : "From $79/month",
      popular: false,
      color: "from-red-500 to-pink-500",
    },
  ]

  const categories = [
    { id: "all", name: language === "ar" ? "جميع الخدمات" : "All Services" },
    { id: "ai", name: language === "ar" ? "الذكاء الاصطناعي" : "AI Services" },
    { id: "design", name: language === "ar" ? "التصميم" : "Design" },
    { id: "development", name: language === "ar" ? "التطوير" : "Development" },
    { id: "mobile", name: language === "ar" ? "الجوال" : "Mobile" },
    { id: "seo", name: language === "ar" ? "السيو" : "SEO" },
    { id: "security", name: language === "ar" ? "الأمان" : "Security" },
  ]

  const filteredServices =
    selectedCategory === "all" ? services : services.filter((service) => service.category === selectedCategory)

  const testimonials = [
    {
      name: language === "ar" ? "أحمد محمد" : "Ahmed Mohammed",
      company: language === "ar" ? "شركة التقنية المتقدمة" : "Advanced Tech Company",
      content:
        language === "ar"
          ? "خدمة رائعة وفريق محترف. تم إنشاء موقعنا في وقت قياسي بجودة عالية."
          : "Excellent service and professional team. Our website was created in record time with high quality.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: language === "ar" ? "فاطمة العلي" : "Fatima Al-Ali",
      company: language === "ar" ? "متجر الأزياء العصرية" : "Modern Fashion Store",
      content:
        language === "ar"
          ? "الذكاء الاصطناعي ساعدني في إنشاء متجر إلكتروني احترافي بسهولة تامة."
          : "AI helped me create a professional online store with complete ease.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: language === "ar" ? "خالد السعيد" : "Khalid Al-Saeed",
      company: language === "ar" ? "مطعم النكهات الشرقية" : "Eastern Flavors Restaurant",
      content:
        language === "ar"
          ? "موقع مطعمنا أصبح أكثر جاذبية وزادت الطلبات بشكل ملحوظ."
          : "Our restaurant website became more attractive and orders increased significantly.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

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
              {language === "ar" ? "خدماتنا المتميزة" : "Our Premium Services"}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {language === "ar" ? "خدمات شاملة" : "Complete Services"}
              </span>
              <br />
              {language === "ar" ? "لنجاح مشروعك الرقمي" : "For Your Digital Success"}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {language === "ar"
                ? "نقدم مجموعة شاملة من الخدمات الرقمية المتطورة لمساعدتك في تحقيق أهدافك التجارية"
                : "We offer a comprehensive range of advanced digital services to help you achieve your business goals"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg"
              >
                {language === "ar" ? "استكشف خدماتنا" : "Explore Our Services"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
              >
                {language === "ar" ? "تحدث مع خبير" : "Talk to Expert"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "border-white/30 text-white hover:bg-white/10"
                } transition-all duration-300`}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="group bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                      {language === "ar" ? "الأكثر طلباً" : "Most Popular"}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed">{service.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-cyan-400">{service.price}</span>
                    <Button className={`bg-gradient-to-r ${service.color} hover:opacity-90 text-white`}>
                      {language === "ar" ? "اطلب الآن" : "Order Now"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {language === "ar" ? "كيف نعمل" : "How We Work"}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {language === "ar"
                ? "عملية بسيطة ومنظمة لضمان تحقيق أفضل النتائج"
                : "A simple and organized process to ensure the best results"}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: language === "ar" ? "التشاور" : "Consultation",
                description: language === "ar" ? "نناقش احتياجاتك وأهدافك" : "We discuss your needs and goals",
                icon: Users,
              },
              {
                step: "02",
                title: language === "ar" ? "التخطيط" : "Planning",
                description:
                  language === "ar" ? "نضع استراتيجية مخصصة لمشروعك" : "We create a custom strategy for your project",
                icon: BarChart3,
              },
              {
                step: "03",
                title: language === "ar" ? "التنفيذ" : "Execution",
                description:
                  language === "ar"
                    ? "ننفذ المشروع بأعلى معايير الجودة"
                    : "We execute the project with highest quality standards",
                icon: Zap,
              },
              {
                step: "04",
                title: language === "ar" ? "الدعم" : "Support",
                description:
                  language === "ar" ? "نقدم دعماً مستمراً بعد التسليم" : "We provide ongoing support after delivery",
                icon: Headphones,
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {language === "ar" ? "آراء عملائنا" : "Client Testimonials"}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {language === "ar"
                ? "اكتشف ما يقوله عملاؤنا عن خدماتنا وجودة عملنا"
                : "Discover what our clients say about our services and work quality"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/20 to-blue-600/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "ar" ? "جاهز للبدء؟" : "Ready to Get Started?"}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {language === "ar"
              ? "تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك"
              : "Contact us today and get a free consultation for your project"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg"
            >
              {language === "ar" ? "احصل على استشارة مجانية" : "Get Free Consultation"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
            >
              {language === "ar" ? "تصفح أعمالنا" : "View Our Work"}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
