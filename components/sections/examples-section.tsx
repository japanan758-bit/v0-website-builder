"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Smartphone, Monitor } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function ExamplesSection() {
  const { language } = useTranslation()

  const examples = [
    {
      id: 1,
      title: language === "ar" ? "مطعم البحر الأبيض" : "Mediterranean Restaurant",
      description:
        language === "ar" ? "موقع مطعم مع قائمة طعام ونظام حجز" : "Restaurant website with menu and booking system",
      image: "/modern-restaurant-website-with-arabic-design.jpg",
      category: language === "ar" ? "مطعم" : "Restaurant",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 2,
      title: language === "ar" ? "متجر الأناقة" : "Fashion Store",
      description: language === "ar" ? "متجر إلكتروني للأزياء النسائية" : "E-commerce store for women's fashion",
      image: "/modern-fashion-ecommerce.png",
      category: language === "ar" ? "متجر إلكتروني" : "E-commerce",
      color: "from-pink-500 to-purple-500",
    },
    {
      id: 3,
      title: language === "ar" ? "شركة التقنية المتقدمة" : "Advanced Tech Company",
      description:
        language === "ar" ? "موقع شركة تقنية متخصصة في التطبيقات" : "Tech company specializing in app development",
      image: "/modern-tech-website-blue.png",
      category: language === "ar" ? "شركة" : "Business",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 4,
      title: language === "ar" ? "مدونة السفر والطبخ" : "Travel & Cooking Blog",
      description: language === "ar" ? "مدونة شخصية للسفر والطبخ" : "Personal blog about travel and cooking",
      image: "/modern-blog-website-with-travel-and-food-theme.jpg",
      category: language === "ar" ? "مدونة" : "Blog",
      color: "from-green-500 to-teal-500",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {language === "ar" ? "أمثلة على المواقع المُنشأة" : "Examples of Created Websites"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === "ar"
              ? "شاهد بعض المواقع التي تم إنشاؤها باستخدام Chat2Site"
              : "See some websites created using Chat2Site"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {examples.map((example) => (
            <Card
              key={example.id}
              className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover-lift"
            >
              <div className="relative overflow-hidden">
                <img
                  src={example.image || "/placeholder.svg"}
                  alt={example.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${example.color}`}
                  >
                    {example.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{example.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{example.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{language === "ar" ? "متاح للمعاينة" : "Available for preview"}</span>
                  </div>

                  <Button variant="outline" size="sm" className="bg-card/50 border-border/50">
                    <ExternalLink className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
                    {language === "ar" ? "معاينة" : "Preview"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card">
            {language === "ar" ? "شاهد المزيد من الأمثلة" : "See More Examples"}
          </Button>
        </div>
      </div>
    </section>
  )
}
