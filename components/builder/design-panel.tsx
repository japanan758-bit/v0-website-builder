"use client"

import { useState } from "react"
import { Palette, Type, BracketsIcon as Spacing, Layout, Smartphone, Tablet, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/hooks/use-translation"

interface DesignPanelProps {
  selectedElement: string | null
  onStyleChange: (property: string, value: any) => void
}

export function DesignPanel({ selectedElement, onStyleChange }: DesignPanelProps) {
  const { language } = useTranslation()
  const [activeTab, setActiveTab] = useState("style")
  const [devicePreview, setDevicePreview] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const colorPalettes = [
    {
      name: language === "ar" ? "أزرق كلاسيكي" : "Classic Blue",
      colors: ["#3B82F6", "#1E40AF", "#60A5FA", "#DBEAFE", "#EFF6FF"],
    },
    {
      name: language === "ar" ? "أخضر طبيعي" : "Natural Green",
      colors: ["#10B981", "#047857", "#34D399", "#A7F3D0", "#ECFDF5"],
    },
    {
      name: language === "ar" ? "بنفسجي ملكي" : "Royal Purple",
      colors: ["#8B5CF6", "#5B21B6", "#A78BFA", "#DDD6FE", "#F3F4F6"],
    },
    {
      name: language === "ar" ? "برتقالي دافئ" : "Warm Orange",
      colors: ["#F59E0B", "#D97706", "#FBBF24", "#FEF3C7", "#FFFBEB"],
    },
  ]

  const fonts = [
    { name: "Inter", value: "Inter, sans-serif" },
    { name: "Cairo", value: "Cairo, sans-serif" },
    { name: "Roboto", value: "Roboto, sans-serif" },
    { name: "Open Sans", value: "Open Sans, sans-serif" },
    { name: "Poppins", value: "Poppins, sans-serif" },
    { name: "Montserrat", value: "Montserrat, sans-serif" },
  ]

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{language === "ar" ? "لوحة التصميم" : "Design Panel"}</h2>
        {selectedElement && (
          <p className="text-sm text-gray-500 mt-1">
            {language === "ar" ? "تحرير:" : "Editing:"} {selectedElement}
          </p>
        )}
      </div>

      {/* Device Preview Toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-center space-x-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant={devicePreview === "desktop" ? "default" : "ghost"}
            size="sm"
            onClick={() => setDevicePreview("desktop")}
            className="flex-1"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={devicePreview === "tablet" ? "default" : "ghost"}
            size="sm"
            onClick={() => setDevicePreview("tablet")}
            className="flex-1"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={devicePreview === "mobile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setDevicePreview("mobile")}
            className="flex-1"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-4 m-4">
          <TabsTrigger value="style" className="text-xs">
            <Palette className="w-3 h-3 mr-1" />
            {language === "ar" ? "نمط" : "Style"}
          </TabsTrigger>
          <TabsTrigger value="typography" className="text-xs">
            <Type className="w-3 h-3 mr-1" />
            {language === "ar" ? "خط" : "Text"}
          </TabsTrigger>
          <TabsTrigger value="spacing" className="text-xs">
            <Spacing className="w-3 h-3 mr-1" />
            {language === "ar" ? "مسافة" : "Space"}
          </TabsTrigger>
          <TabsTrigger value="layout" className="text-xs">
            <Layout className="w-3 h-3 mr-1" />
            {language === "ar" ? "تخطيط" : "Layout"}
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="style" className="p-4 space-y-6">
            {/* Color Palettes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{language === "ar" ? "لوحات الألوان" : "Color Palettes"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {colorPalettes.map((palette, index) => (
                  <div key={index} className="space-y-2">
                    <Label className="text-xs font-medium">{palette.name}</Label>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      {palette.colors.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-8 h-8 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-gray-400 transition-colors"
                          style={{ backgroundColor: color }}
                          onClick={() => onStyleChange("backgroundColor", color)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Background Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{language === "ar" ? "الخلفية" : "Background"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">{language === "ar" ? "نوع الخلفية" : "Background Type"}</Label>
                  <Select onValueChange={(value) => onStyleChange("backgroundType", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={language === "ar" ? "اختر النوع" : "Select type"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="color">{language === "ar" ? "لون صلب" : "Solid Color"}</SelectItem>
                      <SelectItem value="gradient">{language === "ar" ? "تدرج" : "Gradient"}</SelectItem>
                      <SelectItem value="image">{language === "ar" ? "صورة" : "Image"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Border & Shadow */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{language === "ar" ? "الحدود والظلال" : "Border & Shadow"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">{language === "ar" ? "نصف قطر الحدود" : "Border Radius"}</Label>
                  <Slider
                    defaultValue={[0]}
                    max={50}
                    step={1}
                    className="mt-2"
                    onValueChange={(value) => onStyleChange("borderRadius", `${value[0]}px`)}
                  />
                </div>
                <div>
                  <Label className="text-xs">{language === "ar" ? "عرض الحدود" : "Border Width"}</Label>
                  <Slider
                    defaultValue={[0]}
                    max={10}
                    step={1}
                    className="mt-2"
                    onValueChange={(value) => onStyleChange("borderWidth", `${value[0]}px`)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="p-4 space-y-6">
            {/* Font Family */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{language === "ar" ? "عائلة الخط" : "Font Family"}</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={(value) => onStyleChange("fontFamily", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === "ar" ? "اختر الخط" : "Select font"} />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Font Size */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{language === "ar" ? "حجم الخط" : "Font Size"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">{language === "ar" ? "الحجم (px)" : "Size (px)"}</Label>
                  <Slider
                    defaultValue={[16]}
                    min={8}
                    max={72}
                    step={1}
                    className="mt-2"
                    onValueChange={(value) => onStyleChange("fontSize", `${value[0]}px`)}
                  />
                </div>
                <div>
                  <Label className="text-xs">{language === "ar" ? "سماكة الخط" : "Font Weight"}</Label>
                  <Select onValueChange={(value) => onStyleChange("fontWeight", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={language === "ar" ? "اختر السماكة" : "Select weight"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300">{language === "ar" ? "خفيف" : "Light"}</SelectItem>
                      <SelectItem value="400">{language === "ar" ? "عادي" : "Normal"}</SelectItem>
                      <SelectItem value="500">{language === "ar" ? "متوسط" : "Medium"}</SelectItem>
                      <SelectItem value="600">{language === "ar" ? "نصف سميك" : "Semi Bold"}</SelectItem>
                      <SelectItem value="700">{language === "ar" ? "سميك" : "Bold"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Text Color */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{language === "ar" ? "لون النص" : "Text Color"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-2">
                  {["#000000", "#374151", "#6B7280", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"].map(
                    (color) => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-gray-400"
                        style={{ backgroundColor: color }}
                        onClick={() => onStyleChange("color", color)}
                      />
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spacing" className="p-4 space-y-6">
            {/* Padding */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{language === "ar" ? "الحشو الداخلي" : "Padding"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">{language === "ar" ? "جميع الجهات" : "All Sides"}</Label>
                  <Slider
                    defaultValue={[16]}
                    max={100}
                    step={4}
                    className="mt-2"
                    onValueChange={(value) => onStyleChange("padding", `${value[0]}px`)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Margin */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{language === "ar" ? "الهامش الخارجي" : "Margin"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">{language === "ar" ? "جميع الجهات" : "All Sides"}</Label>
                  <Slider
                    defaultValue={[0]}
                    max={100}
                    step={4}
                    className="mt-2"
                    onValueChange={(value) => onStyleChange("margin", `${value[0]}px`)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layout" className="p-4 space-y-6">
            {/* Display */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{language === "ar" ? "نوع العرض" : "Display Type"}</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={(value) => onStyleChange("display", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === "ar" ? "اختر النوع" : "Select type"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="block">{language === "ar" ? "كتلة" : "Block"}</SelectItem>
                    <SelectItem value="flex">{language === "ar" ? "مرن" : "Flex"}</SelectItem>
                    <SelectItem value="grid">{language === "ar" ? "شبكة" : "Grid"}</SelectItem>
                    <SelectItem value="inline">{language === "ar" ? "سطري" : "Inline"}</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Alignment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{language === "ar" ? "المحاذاة" : "Alignment"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs">{language === "ar" ? "محاذاة النص" : "Text Align"}</Label>
                  <Select onValueChange={(value) => onStyleChange("textAlign", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={language === "ar" ? "اختر المحاذاة" : "Select alignment"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">{language === "ar" ? "يسار" : "Left"}</SelectItem>
                      <SelectItem value="center">{language === "ar" ? "وسط" : "Center"}</SelectItem>
                      <SelectItem value="right">{language === "ar" ? "يمين" : "Right"}</SelectItem>
                      <SelectItem value="justify">{language === "ar" ? "ضبط" : "Justify"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
