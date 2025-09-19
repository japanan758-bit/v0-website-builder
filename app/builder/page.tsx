"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { BuilderToolbar } from "@/components/builder/builder-toolbar"
import { BuilderSidebar } from "@/components/builder/builder-sidebar"
import { BuilderCanvas } from "@/components/builder/builder-canvas"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Type, ImageIcon, Layout, Smartphone, Tablet, Monitor, Zap } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { languages } from "@/lib/i18n"

const elements = [
  {
    id: "text",
    name: { ar: "نص", en: "Text" },
    icon: Type,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "image",
    name: { ar: "صورة", en: "Image" },
    icon: ImageIcon,
    color: "from-green-500 to-green-600",
  },
  {
    id: "button",
    name: { ar: "زر", en: "Button" },
    icon: Zap,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "section",
    name: { ar: "قسم", en: "Section" },
    icon: Layout,
    color: "from-orange-500 to-orange-600",
  },
]

const devices = [
  { id: "desktop", icon: Monitor, name: { ar: "سطح المكتب", en: "Desktop" } },
  { id: "tablet", icon: Tablet, name: { ar: "تابلت", en: "Tablet" } },
  { id: "mobile", icon: Smartphone, name: { ar: "جوال", en: "Mobile" } },
]

export default function BuilderPage() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")
  const { language } = useLanguage()
  const [selectedDevice, setSelectedDevice] = useState("desktop")
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [isBuilding, setIsBuilding] = useState(false)

  const handleStartBuilding = () => {
    setIsBuilding(true)
  }

  useEffect(() => {
    if (templateId) {
      setIsBuilding(true)
    }
  }, [templateId])

  if (!isBuilding) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
        dir={languages[language].dir}
      >
        <Header />

        <main className="pt-20 flex items-center justify-center min-h-screen">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              {/* AI Builder Introduction */}
              <div className="mb-12">
                <div className="w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <Zap className="w-16 h-16 text-white" />
                </div>

                <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  <span className="block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    {language === "ar" ? "منشئ المواقع" : "Website Builder"}
                  </span>
                  <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {language === "ar" ? "بالذكاء الاصطناعي" : "Powered by AI"}
                  </span>
                </h1>

                <p className="text-2xl text-gray-200 mb-12 leading-relaxed">
                  {language === "ar"
                    ? "أخبرنا عن موقعك وسنقوم بإنشائه لك في ثوانٍ معدودة"
                    : "Tell us about your website and we'll create it for you in seconds"}
                </p>
              </div>

              {/* Quick Start Options */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Type className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{language === "ar" ? "وصف نصي" : "Text Description"}</h3>
                    <p className="text-gray-300">
                      {language === "ar" ? "اكتب وصفاً لموقعك" : "Write a description of your website"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <ImageIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{language === "ar" ? "رفع صورة" : "Upload Image"}</h3>
                    <p className="text-gray-300">
                      {language === "ar" ? "ارفع صورة للتصميم المطلوب" : "Upload an image of desired design"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Layout className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{language === "ar" ? "اختر قالب" : "Choose Template"}</h3>
                    <p className="text-gray-300">
                      {language === "ar" ? "ابدأ من قالب جاهز" : "Start from a ready template"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Start Building Button */}
              <Button
                size="lg"
                onClick={handleStartBuilding}
                className="group relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 text-white rounded-2xl px-12 py-6 text-2xl font-bold shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
              >
                <Zap className="w-8 h-8 mr-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>{language === "ar" ? "ابدأ الإنشاء الآن" : "Start Building Now"}</span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50" dir={languages[language].dir}>
      <BuilderToolbar />
      <div className="flex-1 flex overflow-hidden">
        <BuilderSidebar selectedElement={selectedElement} onElementSelect={setSelectedElement} />
        <BuilderCanvas templateId={templateId} selectedElement={selectedElement} onElementSelect={setSelectedElement} />
      </div>
    </div>
  )
}
