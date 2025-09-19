export interface Template {
  id: string
  name: string
  description: string
  category: string
  thumbnail: string
  preview: string
  features: string[]
  price: "free" | "pro"
}

export const templates: Template[] = [
  {
    id: "modern-business",
    name: "الأعمال العصرية",
    description: "قالب احترافي للشركات والأعمال التجارية",
    category: "business",
    thumbnail: "/placeholder.svg?height=300&width=400&text=الأعمال+العصرية",
    preview: "/placeholder.svg?height=600&width=800&text=معاينة+الأعمال+العصرية",
    features: ["تصميم متجاوب", "صفحة الخدمات", "نموذج التواصل", "معرض الأعمال"],
    price: "free",
  },
  {
    id: "ecommerce-store",
    name: "متجر إلكتروني",
    description: "قالب متكامل للمتاجر الإلكترونية",
    category: "ecommerce",
    thumbnail: "/placeholder.svg?height=300&width=400&text=متجر+إلكتروني",
    preview: "/placeholder.svg?height=600&width=800&text=معاينة+المتجر+الإلكتروني",
    features: ["عرض المنتجات", "سلة التسوق", "نظام الدفع", "إدارة المخزون"],
    price: "pro",
  },
  {
    id: "personal-blog",
    name: "مدونة شخصية",
    description: "قالب أنيق للمدونات الشخصية",
    category: "blog",
    thumbnail: "/placeholder.svg?height=300&width=400&text=مدونة+شخصية",
    preview: "/placeholder.svg?height=600&width=800&text=معاينة+المدونة+الشخصية",
    features: ["نظام المقالات", "التعليقات", "البحث", "الأرشيف"],
    price: "free",
  },
  {
    id: "restaurant-menu",
    name: "مطعم وقائمة طعام",
    description: "قالب مخصص للمطاعم وعرض قوائم الطعام",
    category: "restaurant",
    thumbnail: "/placeholder.svg?height=300&width=400&text=مطعم+وقائمة+طعام",
    preview: "/placeholder.svg?height=600&width=800&text=معاينة+المطعم",
    features: ["قائمة الطعام", "الحجوزات", "معرض الصور", "معلومات التواصل"],
    price: "free",
  },
  {
    id: "portfolio-creative",
    name: "معرض أعمال إبداعي",
    description: "قالب لعرض الأعمال الإبداعية والفنية",
    category: "portfolio",
    thumbnail: "/placeholder.svg?height=300&width=400&text=معرض+أعمال+إبداعي",
    preview: "/placeholder.svg?height=600&width=800&text=معاينة+معرض+الأعمال",
    features: ["معرض الأعمال", "السيرة الذاتية", "نموذج التواصل", "الشهادات"],
    price: "pro",
  },
  {
    id: "landing-page",
    name: "صفحة هبوط",
    description: "قالب لصفحات الهبوط والحملات التسويقية",
    category: "marketing",
    thumbnail: "/placeholder.svg?height=300&width=400&text=صفحة+هبوط",
    preview: "/placeholder.svg?height=600&width=800&text=معاينة+صفحة+الهبوط",
    features: ["دعوة للعمل", "نموذج التسجيل", "الشهادات", "الإحصائيات"],
    price: "free",
  },
]

export const categories = [
  { id: "all", name: "جميع القوالب", count: templates.length },
  { id: "business", name: "الأعمال", count: templates.filter((t) => t.category === "business").length },
  { id: "ecommerce", name: "التجارة الإلكترونية", count: templates.filter((t) => t.category === "ecommerce").length },
  { id: "blog", name: "المدونات", count: templates.filter((t) => t.category === "blog").length },
  { id: "restaurant", name: "المطاعم", count: templates.filter((t) => t.category === "restaurant").length },
  { id: "portfolio", name: "معرض الأعمال", count: templates.filter((t) => t.category === "portfolio").length },
  { id: "marketing", name: "التسويق", count: templates.filter((t) => t.category === "marketing").length },
]
