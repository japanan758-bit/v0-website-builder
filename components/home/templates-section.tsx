"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Eye, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

export function TemplatesSection() {
  const { language } = useTranslation()
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null)
  const isRTL = languages[language].dir === "rtl"

  const templates = [
    {
      id: 1,
      name: language === "ar" ? "مطعم عصري" : "Modern Restaurant",
      category: language === "ar" ? "مطاعم" : "Restaurant",
      image: "/placeholder.svg?height=300&width=400&text=Restaurant+Template",
      description:
        language === "ar" ? "تصميم أنيق للمطاعم مع نظام طلبات" : "Elegant restaurant design with ordering system",
      features: [
        language === "ar" ? "نظام طلبات أونلاين" : "Online ordering",
        language === "ar" ? "معرض الصور" : "Photo gallery",
        language === "ar" ? "حجز الطاولات" : "Table booking",
      ],
      color: "from-orange-500 to-red-500",
      stats: { views: "12.5K", likes: "892", rating: 4.9 },
    },
    {
      id: 2,
      name: language === "ar" ? "متجر إلكتروني" : "E-commerce Store",
      category: language === "ar" ? "تجارة إلكترونية" : "E-commerce",
      image: "/placeholder.svg?height=300&width=400&text=E-commerce+Template",
      description: language === "ar" ? "متجر متكامل مع نظام دفع آمن" : "Complete store with secure payment system",
      features: [
        language === "ar" ? "سلة التسوق" : "Shopping cart",
        language === "ar" ? "نظام الدفع" : "Payment system",
        language === "ar" ? "إدارة المخزون" : "Inventory management",
      ],
      color: "from-blue-500 to-indigo-500",
      stats: { views: "18.3K", likes: "1.2K", rating: 4.8 },
    },
    {
      id: 3,
      name: language === "ar" ? "شركة تقنية" : "Tech Company",
      category: language === "ar" ? "أعمال" : "Business",
      image: "/placeholder.svg?height=300&width=400&text=Tech+Company+Template",
      description: language === "ar" ? "موقع احترافي للشركات التقنية" : "Professional website for tech companies",
      features: [
        language === "ar" ? "معرض الخدمات" : "Services showcase",
        language === "ar" ? "فريق العمل" : "Team section",
        language === "ar" ? "نموذج التواصل" : "Contact form",
      ],
      color: "from-purple-500 to-pink-500",
      stats: { views: "9.7K", likes: "743", rating: 4.7 },
    },
    {
      id: 4,
      name: language === "ar" ? "معرض أعمال" : "Creative Portfolio",
      category: language === "ar" ? "معرض أعمال" : "Portfolio",
      image: "/placeholder.svg?height=300&width=400&text=Portfolio+Template",
      description: language === "ar" ? "معرض أعمال للمبدعين والفنانين" : "Portfolio showcase for creatives and artists",
      features: [
        language === "ar" ? "معرض الأعمال" : "Work gallery",
        language === "ar" ? "السيرة الذاتية" : "About section",
        language === "ar" ? "نموذج التواصل" : "Contact form",
      ],
      color: "from-green-500 to-teal-500",
      stats: { views: "15.2K", likes: "1.1K", rating: 4.9 },
    },
    {
      id: 5,
      name: language === "ar" ? "عيادة طبية" : "Medical Clinic",
      category: language === "ar" ? "صحة" : "Healthcare",
      image: "/placeholder.svg?height=300&width=400&text=Medical+Template",
      description: language === "ar" ? "موقع طبي مع نظام حجز المواعيد" : "Medical website with appointment booking",
      features: [
        language === "ar" ? "حجز المواعيد" : "Appointment booking",
        language === "ar" ? "معلومات الأطباء" : "Doctor profiles",
        language === "ar" ? "الخدمات الطبية" : "Medical services",
      ],
      color: "from-cyan-500 to-blue-500",
      stats: { views: "8.9K", likes: "654", rating: 4.8 },
    },
    {
      id: 6,
      name: language === "ar" ? "مدونة شخصية" : "Personal Blog",
      category: language === "ar" ? "مدونة" : "Blog",
      image: "/placeholder.svg?height=300&width=400&text=Blog+Template",
      description: language === "ar" ? "مدونة أنيقة للكتاب والمدونين" : "Elegant blog for writers and bloggers",
      features: [
        language === "ar" ? "نظام التدوين" : "Blog system",
        language === "ar" ? "التعليقات" : "Comments",
        language === "ar" ? "البحث" : "Search functionality",
      ],
      color: "from-pink-500 to-rose-500",
      stats: { views: "11.4K", likes: "823", rating: 4.6 },
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30" dir={languages[language].dir}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 ${isRTL ? "text-right" : "text-left"} md:text-center`}>
          <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-0 rounded-full">
            {language === "ar" ? "القوالب الاحترافية" : "Professional Templates"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "ar" ? "اختر القالب المثالي" : "Choose Your Perfect Template"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {language === "ar"
              ? "مئات القوالب الاحترافية المصممة خصيصاً لكل نوع من أنواع المواقع"
              : "Hundreds of professional templates designed specifically for every type of website"}
          </p>
          <Button
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-full px-6 py-2"
            asChild
          >
            <Link href="/templates">
              {language === "ar" ? "تصفح جميع القوالب" : "Browse All Templates"}
              <ArrowRight className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 rtl:rotate-180" />
            </Link>
          </Button>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <Card
              key={template.id}
              className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 rounded-3xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredTemplate(index)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {/* Template Image */}
              <div className="relative overflow-hidden">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Overlay Actions */}
                <div className="absolute top-4 right-4 flex space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full p-2"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full p-2"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={`bg-gradient-to-r ${template.color} text-white border-0 text-xs px-3 py-1`}>
                    {template.category}
                  </Badge>
                </div>

                {/* Use Template Button */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    className={`bg-gradient-to-r ${template.color} text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300`}
                    asChild
                  >
                    <Link href={`/builder?template=${template.id}`}>
                      {language === "ar" ? "استخدم هذا القالب" : "Use This Template"}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Template Info */}
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {template.name}
                  </h3>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-600">{template.stats.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed text-sm">{template.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {template.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Eye className="w-4 h-4" />
                      <span>{template.stats.views}</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Heart className="w-4 h-4" />
                      <span>{template.stats.likes}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full px-3 py-1"
                    asChild
                  >
                    <Link href={`/templates/${template.id}`}>{language === "ar" ? "التفاصيل" : "Details"}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Templates */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-full px-8 py-3 text-lg font-semibold bg-white/80 backdrop-blur-sm"
            asChild
          >
            <Link href="/templates" className="flex items-center space-x-2 rtl:space-x-reverse">
              <span>{language === "ar" ? "تصفح جميع القوالب" : "Browse All Templates"}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
