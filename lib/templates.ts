export interface Template {
  id: string
  name: string
  category: string
  description: string
  image: string
  price: "Free" | "Pro" | "Premium"
  rating: number
  likes: number
  views: string
  tags: string[]
  color: string
  featured: boolean
  sections: TemplateSection[]
}

export interface TemplateSection {
  id: string
  name: string
  type: "header" | "hero" | "features" | "about" | "contact" | "footer"
  content: any
}

export const templates: Template[] = [
  {
    id: "restaurant-modern",
    name: "Modern Restaurant",
    category: "restaurant",
    description: "Elegant restaurant design with online ordering system",
    image: "/placeholder.svg?height=300&width=400&text=Restaurant+Template",
    price: "Free",
    rating: 4.9,
    likes: 892,
    views: "12.5K",
    tags: ["Restaurant", "Food", "Ordering", "Booking"],
    color: "from-orange-500 to-red-500",
    featured: true,
    sections: [
      {
        id: "header",
        name: "Header",
        type: "header",
        content: {
          logo: "Restaurant Logo",
          navigation: ["Home", "Menu", "About", "Contact", "Order Online"],
        },
      },
      {
        id: "hero",
        name: "Hero Section",
        type: "hero",
        content: {
          title: "Authentic Mediterranean Cuisine",
          subtitle: "Experience the finest flavors from the Mediterranean",
          backgroundImage: "/placeholder.svg?height=600&width=1200&text=Restaurant+Hero",
          ctaButton: "View Menu",
        },
      },
    ],
  },
  {
    id: "ecommerce-fashion",
    name: "Fashion Store",
    category: "ecommerce",
    description: "Complete fashion e-commerce with shopping cart",
    image: "/placeholder.svg?height=300&width=400&text=Fashion+Store",
    price: "Pro",
    rating: 4.8,
    likes: 1234,
    views: "18.3K",
    tags: ["Fashion", "E-commerce", "Shopping", "Store"],
    color: "from-pink-500 to-purple-500",
    featured: false,
    sections: [],
  },
]

export function getTemplateById(id: string): Template | undefined {
  return templates.find((template) => template.id === id)
}

export function getTemplatesByCategory(category: string): Template[] {
  if (category === "all") return templates
  return templates.filter((template) => template.category === category)
}
