"use client"

import { useState } from "react"
import { Layers, Type, ImageIcon, Layout, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/hooks/use-translation"

interface BuilderSidebarProps {
  selectedElement: string | null
  onElementSelect: (elementId: string | null) => void
}

export function BuilderSidebar({ selectedElement, onElementSelect }: BuilderSidebarProps) {
  const { t, language } = useTranslation()
  const [activeTab, setActiveTab] = useState("elements")

  const elements = [
    { id: "text", name: language === "ar" ? "نص" : "Text", icon: Type },
    { id: "image", name: language === "ar" ? "صورة" : "Image", icon: ImageIcon },
    { id: "button", name: language === "ar" ? "زر" : "Button", icon: Layout },
    { id: "section", name: language === "ar" ? "قسم" : "Section", icon: Layers },
  ]

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{language === "ar" ? "أدوات التصميم" : "Design Tools"}</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-3 m-4">
          <TabsTrigger value="elements">{language === "ar" ? "عناصر" : "Elements"}</TabsTrigger>
          <TabsTrigger value="design">{language === "ar" ? "تصميم" : "Design"}</TabsTrigger>
          <TabsTrigger value="settings">{language === "ar" ? "إعدادات" : "Settings"}</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="elements" className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{language === "ar" ? "العناصر الأساسية" : "Basic Elements"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {elements.map((element) => (
                  <Button
                    key={element.id}
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => onElementSelect(element.id)}
                  >
                    <element.icon className="w-4 h-4 mr-2" />
                    {element.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design" className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{language === "ar" ? "الألوان والخطوط" : "Colors & Fonts"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {language === "ar" ? "اللون الأساسي" : "Primary Color"}
                  </label>
                  <div className="flex space-x-2">
                    {["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"].map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200 hover:border-gray-400"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{language === "ar" ? "إعدادات الموقع" : "Site Settings"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => {}}>
                  <Settings className="w-4 h-4 mr-2" />
                  {language === "ar" ? "الإعدادات العامة" : "General Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
