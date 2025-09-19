"use client"

import { useState } from "react"
import { Save, Eye, Undo, Redo, Smartphone, Tablet, Monitor, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"

export function BuilderToolbar() {
  const { language } = useTranslation()
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      {/* Left Actions */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Undo className="w-4 h-4 mr-2" />
          {language === "ar" ? "تراجع" : "Undo"}
        </Button>
        <Button variant="outline" size="sm">
          <Redo className="w-4 h-4 mr-2" />
          {language === "ar" ? "إعادة" : "Redo"}
        </Button>
      </div>

      {/* Center - Device Preview */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        <Button variant={device === "desktop" ? "default" : "ghost"} size="sm" onClick={() => setDevice("desktop")}>
          <Monitor className="w-4 h-4" />
        </Button>
        <Button variant={device === "tablet" ? "default" : "ghost"} size="sm" onClick={() => setDevice("tablet")}>
          <Tablet className="w-4 h-4" />
        </Button>
        <Button variant={device === "mobile" ? "default" : "ghost"} size="sm" onClick={() => setDevice("mobile")}>
          <Smartphone className="w-4 h-4" />
        </Button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          {language === "ar" ? "معاينة" : "Preview"}
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          {language === "ar" ? "إعدادات" : "Settings"}
        </Button>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Save className="w-4 h-4 mr-2" />
          {language === "ar" ? "حفظ" : "Save"}
        </Button>
      </div>
    </div>
  )
}
