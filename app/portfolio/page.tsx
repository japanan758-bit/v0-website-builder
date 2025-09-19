"use client"

import { useState } from "react"
import { Eye, ExternalLink, Calendar, User, Tag, Filter, Search, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"

interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  client: string
  date: string
  tags: string[]
  url?: string
  featured?: boolean
  likes: number
  views: string
}

export default function PortfolioPage() {
  const { language } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const portfolioItems: PortfolioItem[] = [
    {
      id: "1",
      title: language === "ar" ? "متجر الأزياء العصرية" : "Modern Fashion Store",
      description:
        language === "ar"
          ? "متجر إلكتروني متكامل للأزياء النسائية مع نظام دفع آمن وتجربة تسوق سلسة"
          : "Complete e-commerce store for women's fashion with secure payment and smooth shopping experience",
      image: "/placeholder.svg?height=400&width=600&text=Fashion+Store",
      category: "ecommerce",
      client: language === "ar" ? "بوتيك الأناقة" : "Elegance Boutique",
      date: "2024-01-15",
      tags: [
        language === "ar" ? "تجارة إلكترونية" : "E-commerce",
        language === "ar" ? "أزياء" : "Fashion",
        language === "ar" ? "متجاوب" : "Responsive",
      ],
      url: "https://fashion-demo.example.com",
      featured: true,
      likes: 245,
      views: "12.5K",
    },
    {
      id: "2",
      title: language === "ar" ? "مطعم البحر الأبيض" : "Mediterranean Restaurant",
      description:
        language === "ar"
          ? "موقع مطعم أنيق مع نظام حجز الطاولات وعرض القائمة التفاعلية"
          : "Elegant restaurant website with table booking system and interactive menu display",
      image: "/placeholder.svg?height=400&width=600&text=Restaurant+Website",
      category: "restaurant",
      client: language === "ar" ? "مطعم البحر الأبيض" : "Mediterranean Bistro",
      date: "2024-01-10",
      tags: [
        language === "ar" ? "مطعم" : "Restaurant",
        language === "ar" ? "حجز" : "Booking",
        language === "ar" ? "قائمة طعام" : "Menu",
      ],
      url: "https://restaurant-demo.example.com",
      featured: true,
      likes: 189,
      views: "8.7K",
    },
    {
      id: "3",
      title: language === "ar" ? "شركة التقنية المبتكرة" : "Innovative Tech Company",
      description:
        language === "ar"
          ? "موقع شركة تقنية حديث يعرض الخدمات والمنتجات بطريقة احترافية"
          : "Modern tech company website showcasing services and products professionally",
      image: "/placeholder.svg?height=400&width=600&text=Tech+Company",
      category: "business",
      client: language === "ar" ? "تك إنوفيشن" : "Tech Innovation",
      date: "2024-01-05",
      tags: [
        language === "ar" ? "تقنية" : "Technology",
        language === "ar" ? "شركة" : "Corporate",
        language === "ar" ? "خدمات" : "Services",
      ],
      url: "https://tech-demo.example.com",
      likes: 156,
      views: "6.2K",
    },
    {
      id: "4",
      title: language === "ar" ? "معرض الفنون الرقمية" : "Digital Art Gallery",
      description:
        language === "ar"
          ? "معرض فني رقمي تفاعلي لعرض الأعمال الفنية بطريقة مبتكرة"
          : "Interactive digital art gallery to showcase artworks in an innovative way",
      image: "/placeholder.svg?height=400&width=600&text=Art+Gallery",
      category: "portfolio",
      client: language === "ar" ? "معرض الإبداع" : "Creativity Gallery",
      date: "2023-12-28",
      tags: [
        language === "ar" ? "فن" : "Art",
        language === "ar" ? "معرض" : "Gallery",
        language === "ar" ? "تفاعلي" : "Interactive",
      ],
      url: "https://gallery-demo.example.com",
      featured: true,
      likes: 298,
      views: "15.3K",
    },
    {
      id: "5",
      title: language === "ar" ? "عيادة الأسنان المتخصصة" : "Specialized Dental Clinic",
      description:
        language === "ar"
          ? "موقع عيادة أسنان مع نظام حجز المواعيد ومعلومات الخدمات الطبية"
          : "Dental clinic website with appointment booking system and medical services information",
      image: "/placeholder.svg?height=400&width=600&text=Dental+Clinic",
      category: "healthcare",
      client: language === "ar" ? "عيادة النور" : "Bright Smile Clinic",
      date: "2023-12-20",
      tags: [
        language === "ar" ? "طب أسنان" : "Dentistry",
        language === "ar" ? "صحة" : "Healthcare",
        language === "ar" ? "مواعيد" : "Appointments",
      ],
      url: "https://dental-demo.example.com",
      likes: 134,
      views: "4.8K",
    },
    {
      id: "6",
      title: language === "ar" ? "مدونة السفر والمغامرات" : "Travel & Adventure Blog",
      description:
        language === "ar"
          ? "مدونة سفر تفاعلية مع خرائط الرحلات وقصص المغامرات"
          : "Interactive travel blog with trip maps and adventure stories",
      image: "/placeholder.svg?height=400&width=600&text=Travel+Blog",
      category: "blog",
      client: language === "ar" ? "مسافر العالم" : "World Traveler",
      date: "2023-12-15",
      tags: [
        language === "ar" ? "سفر" : "Travel",
        language === "ar" ? "مدونة" : "Blog",
        language === "ar" ? "مغامرات" : "Adventure",
      ],
      url: "https://travel-demo.example.com",
      likes: 267,
      views: "11.2K",
    },
  ]

  const categories = [
    { id: "all", name: language === "ar" ? "جميع المشاريع" : "All Projects", count: portfolioItems.length },
    { id: "ecommerce", name: language === "ar" ? "التجارة الإلكترونية" : "E-commerce", count: 1 },
    { id: "restaurant", name: language === "ar" ? "المطاعم" : "Restaurants", count: 1 },
    { id: "business", name: language === "ar" ? "الأعمال" : "Business", count: 1 },
    { id: "portfolio", name: language === "ar" ? "المعارض" : "Portfolios", count: 1 },
    { id: "healthcare", name: language === "ar" ? "الرعاية الصحية" : "Healthcare", count: 1 },
    { id: "blog", name: language === "ar" ? "المدونات" : "Blogs", count: 1 },
  ]

  const filteredItems = portfolioItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/50">
      {/* Header */}
      <section className="pt-20 pb-16 px-6">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-0 rounded-full">
            <Eye className="w-4 h-4 ml-2" />
            {language === "ar" ? "معرض أعمالنا" : "Our Portfolio"}
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
              {language === "ar" ? "مشاريع ملهمة" : "Inspiring Projects"}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {language === "ar" ? "نفخر بإنجازها" : "We're Proud Of"}
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            {language === "ar"
              ? "استكشف مجموعة من أفضل المشاريع التي أنجزناها لعملائنا في مختلف المجالات"
              : "Explore a collection of our best projects completed for clients across various industries"}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12 px-6">
        <div className="container mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder={language === "ar" ? "البحث في المشاريع..." : "Search projects..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 h-12 rounded-xl border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="rounded-full text-sm"
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 rounded-3xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                        ⭐ {language === "ar" ? "مميز" : "Featured"}
                      </Badge>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full p-3"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {item.url && (
                        <Button
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full p-3"
                          asChild
                        >
                          <Link href={item.url} target="_blank">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full p-3"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full p-3"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-4 text-white text-sm">
                      <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                        <Heart className="w-4 h-4 ml-1" />
                        {item.likes}
                      </div>
                      <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                        <Eye className="w-4 h-4 ml-1" />
                        {item.views}
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {categories.find((cat) => cat.id === item.category)?.name}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{item.description}</p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 ml-1" />
                      {item.client}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 ml-1" />
                      {new Date(item.date).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US")}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, index) => (
                      <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                        <Tag className="w-3 h-3 ml-1" />
                        <span className="text-xs text-gray-600">{tag}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300"
                    asChild
                  >
                    <Link href={`/portfolio/${item.id}`}>
                      {language === "ar" ? "عرض التفاصيل" : "View Details"}
                      <ExternalLink className="w-4 h-4 mr-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === "ar" ? "لا توجد مشاريع مطابقة" : "No matching projects"}
              </h3>
              <p className="text-gray-500 mb-6">
                {language === "ar"
                  ? "جرب تغيير معايير البحث أو الفلترة"
                  : "Try changing your search or filter criteria"}
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl"
              >
                {language === "ar" ? "إعادة تعيين الفلاتر" : "Reset Filters"}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "ar" ? "مستعد لمشروعك القادم؟" : "Ready for Your Next Project?"}
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            {language === "ar"
              ? "دعنا نساعدك في إنشاء موقع مذهل يحقق أهدافك ويترك انطباعاً لا يُنسى"
              : "Let us help you create an amazing website that achieves your goals and leaves a lasting impression"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/contact">
                {language === "ar" ? "ابدأ مشروعك" : "Start Your Project"}
                <ExternalLink className="w-5 h-5 mr-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-transparent"
              asChild
            >
              <Link href="/templates">{language === "ar" ? "تصفح القوالب" : "Browse Templates"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
