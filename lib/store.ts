import { create } from "zustand"

interface Website {
  id: string
  name: string
  description: string
  template: string
  status: "draft" | "published" | "archived"
  createdAt: string
  updatedAt: string
  visits: number
  thumbnail: string
}

interface User {
  id: string
  name: string
  email: string
  avatar: string
  plan: "free" | "pro" | "enterprise"
  websites: Website[]
}

interface AppState {
  user: User | null
  websites: Website[]
  currentWebsite: Website | null
  isLoading: boolean
  language: "ar" | "en"

  // Actions
  setUser: (user: User) => void
  setWebsites: (websites: Website[]) => void
  setCurrentWebsite: (website: Website | null) => void
  setLoading: (loading: boolean) => void
  setLanguage: (language: "ar" | "en") => void
  addWebsite: (website: Omit<Website, "id" | "createdAt" | "updatedAt">) => void
  updateWebsite: (id: string, updates: Partial<Website>) => void
  deleteWebsite: (id: string) => void
}

export const useStore = create<AppState>((set, get) => ({
  user: {
    id: "1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "pro",
    websites: [],
  },
  websites: [
    {
      id: "1",
      name: "متجر الإلكترونيات",
      description: "متجر إلكتروني لبيع الأجهزة الذكية",
      template: "ecommerce",
      status: "published",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      visits: 1250,
      thumbnail: "/placeholder.svg?height=200&width=300&text=متجر+الإلكترونيات",
    },
    {
      id: "2",
      name: "مدونة التقنية",
      description: "مدونة شخصية عن التكنولوجيا والبرمجة",
      template: "blog",
      status: "published",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      visits: 890,
      thumbnail: "/placeholder.svg?height=200&width=300&text=مدونة+التقنية",
    },
    {
      id: "3",
      name: "شركة التسويق",
      description: "موقع شركة تسويق رقمي",
      template: "business",
      status: "draft",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-19",
      visits: 0,
      thumbnail: "/placeholder.svg?height=200&width=300&text=شركة+التسويق",
    },
  ],
  currentWebsite: null,
  isLoading: false,
  language: "ar",

  setUser: (user) => set({ user }),
  setWebsites: (websites) => set({ websites }),
  setCurrentWebsite: (website) => set({ currentWebsite: website }),
  setLoading: (loading) => set({ isLoading: loading }),
  setLanguage: (language) => set({ language }),

  addWebsite: (websiteData) => {
    const newWebsite: Website = {
      ...websiteData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      visits: 0,
    }
    set((state) => ({ websites: [...state.websites, newWebsite] }))
  },

  updateWebsite: (id, updates) => {
    set((state) => ({
      websites: state.websites.map((website) =>
        website.id === id ? { ...website, ...updates, updatedAt: new Date().toISOString().split("T")[0] } : website,
      ),
    }))
  },

  deleteWebsite: (id) => {
    set((state) => ({
      websites: state.websites.filter((website) => website.id !== id),
    }))
  },
}))
