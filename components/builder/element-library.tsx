"use client"

import { useState } from "react"
import {
  Type,
  ImageIcon,
  Layout,
  Layers,
  Video,
  Map,
  Calendar,
  ShoppingCart,
  MessageSquare,
  Star,
  Users,
  BarChart3,
  Phone,
  Globe,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"

interface ElementLibraryProps {
  onElementAdd: (elementType: string, elementData: any) => void
}

export function ElementLibrary({ onElementAdd }: ElementLibraryProps) {
  const { language } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState("basic")

  const categories = [
    {
      id: "basic",
      name: language === "ar" ? "أساسي" : "Basic",
      elements: [
        {
          id: "text",
          name: language === "ar" ? "نص" : "Text",
          icon: Type,
          description: language === "ar" ? "إضافة نص قابل للتحرير" : "Add editable text",
          color: "from-blue-500 to-indigo-500",
        },
        {
          id: "heading",
          name: language === "ar" ? "عنوان" : "Heading",
          icon: Type,
          description: language === "ar" ? "عنوان رئيسي أو فرعي" : "Main or sub heading",
          color: "from-purple-500 to-pink-500",
        },
        {
          id: "image",
          name: language === "ar" ? "صورة" : "Image",
          icon: ImageIcon,
          description: language === "ar" ? "إضافة صورة" : "Add image",
          color: "from-green-500 to-teal-500",
        },
        {
          id: "button",
          name: language === "ar" ? "زر" : "Button",
          icon: Layout,
          description: language === "ar" ? "زر تفاعلي" : "Interactive button",
          color: "from-orange-500 to-red-500",
        },
      ],
    },
    {
      id: "layout",
      name: language === "ar" ? "تخطيط" : "Layout",
      elements: [
        {
          id: "container",
          name: language === "ar" ? "حاوية" : "Container",
          icon: Layers,
          description: language === "ar" ? "حاوية للعناصر" : "Container for elements",
          color: "from-gray-500 to-gray-600",
        },
        {
          id: "columns",
          name: language === "ar" ? "أعمدة" : "Columns",
          icon: Layout,
          description: language === "ar" ? "تخطيط بأعمدة" : "Column layout",
          color: "from-indigo-500 to-blue-500",
        },
        {
          id: "section",
          name: language === "ar" ? "قسم" : "Section",
          icon: Layers,
          description: language === "ar" ? "قسم كامل" : "Full section",
          color: "from-cyan-500 to-blue-500",
        },
      ],
    },
    {
      id: "media",
      name: language === "ar" ? "وسائط" : "Media",
      elements: [
        {
          id: "video",
          name: language === "ar" ? "فيديو" : "Video",
          icon: Video,
          description: language === "ar" ? "مشغل فيديو" : "Video player",
          color: "from-red-500 to-pink-500",
        },
        {
          id: "gallery",
          name: language === "ar" ? "معرض صور" : "Gallery",
          icon: ImageIcon,
          description: language === "ar" ? "معرض صور تفاعلي" : "Interactive image gallery",
          color: "from-purple-500 to-indigo-500",
        },
        {
          id: "map",
          name: language === "ar" ? "خريطة" : "Map",
          icon: Map,
          description: language === "ar" ? "خريطة تفاعلية" : "Interactive map",
          color: "from-green-500 to-emerald-500",
        },
      ],
    },
    {
      id: "interactive",
      name: language === "ar" ? "تفاعلي" : "Interactive",
      elements: [
        {
          id: "form",
          name: language === "ar" ? "نموذج" : "Form",
          icon: MessageSquare,
          description: language === "ar" ? "نموذج تواصل" : "Contact form",
          color: "from-blue-500 to-cyan-500",
        },
        {
          id: "calendar",
          name: language === "ar" ? "تقويم" : "Calendar",
          icon: Calendar,
          description: language === "ar" ? "تقويم تفاعلي" : "Interactive calendar",
          color: "from-orange-500 to-yellow-500",
        },
        {
          id: "cart",
          name: language === "ar" ? "سلة تسوق" : "Shopping Cart",
          icon: ShoppingCart,
          description: language === "ar" ? "سلة تسوق" : "Shopping cart",
          color: "from-green-500 to-teal-500",
        },
      ],
    },
    {
      id: "social",
      name: language === "ar" ? "اجتماعي" : "Social",
      elements: [
        {
          id: "reviews",
          name: language === "ar" ? "تقييمات" : "Reviews",
          icon: Star,
          description: language === "ar" ? "تقييمات العملاء" : "Customer reviews",
          color: "from-yellow-500 to-orange-500",
        },
        {
          id: "testimonials",
          name: language === "ar" ? "شهادات" : "Testimonials",
          icon: Users,
          description: language === "ar" ? "شهادات العملاء" : "Customer testimonials",
          color: "from-purple-500 to-pink-500",
        },
        {
          id: "social-links",
          name: language === "ar" ? "روابط اجتماعية" : "Social Links",
          icon: Globe,
          description: language === "ar" ? "روابط وسائل التواصل" : "Social media links",
          color: "from-blue-500 to-indigo-500",
        },
      ],
    },
    {
      id: "business",
      name: language === "ar" ? "أعمال" : "Business",
      elements: [
        {
          id: "stats",
          name: language === "ar" ? "إحصائيات" : "Statistics",
          icon: BarChart3,
          description: language === "ar" ? "عرض الإحصائيات" : "Display statistics",
          color: "from-green-500 to-emerald-500",
        },
        {
          id: "pricing",
          name: language === "ar" ? "جدول أسعار" : "Pricing Table",
          icon: Zap,
          description: language === "ar" ? "جدول الأسعار" : "Pricing table",
          color: "from-blue-500 to-cyan-500",
        },
        {
          id: "team",
          name: language === "ar" ? "فريق العمل" : "Team",
          icon: Users,
          description: language === "ar" ? "عرض فريق العمل" : "Display team members",
          color: "from-purple-500 to-indigo-500",
        },
        {
          id: "contact-info",
          name: language === "ar" ? "معلومات التواصل" : "Contact Info",
          icon: Phone,
          description: language === "ar" ? "معلومات التواصل" : "Contact information",
          color: "from-orange-500 to-red-500",
        },
      ],
    },
  ]

  const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory)

  return (
    <div className="h-full flex flex-col">
      {/* Category Tabs */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-xs"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Elements Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-3">
          {selectedCategoryData?.elements.map((element) => (
            <Card
              key={element.id}
              className="group hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-200 hover:border-blue-300"
              onClick={() => onElementAdd(element.id, { type: element.id, name: element.name })}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${element.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                  >
                    <element.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors duration-200">
                      {element.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{element.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
