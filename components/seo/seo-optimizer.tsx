"use client"

import { useState } from "react"
import { Search, CheckCircle, AlertCircle, XCircle, TrendingUp, Globe, ImageIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTranslation } from "@/hooks/use-translation"

interface SEOScore {
  overall: number
  technical: number
  content: number
  performance: number
}

interface SEOIssue {
  type: "error" | "warning" | "success"
  title: string
  description: string
  impact: "high" | "medium" | "low"
}

export function SEOOptimizer() {
  const { language } = useTranslation()
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [seoScore, setSeoScore] = useState<SEOScore>({
    overall: 78,
    technical: 85,
    content: 72,
    performance: 76,
  })

  const seoIssues: SEOIssue[] = [
    {
      type: "error",
      title: language === "ar" ? "عنوان الصفحة مفقود" : "Missing page title",
      description: language === "ar" ? "بعض الصفحات لا تحتوي على عنوان" : "Some pages are missing title tags",
      impact: "high",
    },
    {
      type: "warning",
      title: language === "ar" ? "وصف ميتا قصير" : "Short meta description",
      description: language === "ar" ? "وصف الميتا أقل من 120 حرف" : "Meta description is less than 120 characters",
      impact: "medium",
    },
    {
      type: "success",
      title: language === "ar" ? "الصور محسنة" : "Images optimized",
      description: language === "ar" ? "جميع الصور تحتوي على نص بديل" : "All images have alt text",
      impact: "low",
    },
    {
      type: "warning",
      title: language === "ar" ? "سرعة التحميل" : "Page load speed",
      description: language === "ar" ? "يمكن تحسين سرعة التحميل" : "Page load speed can be improved",
      impact: "high",
    },
  ]

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{language === "ar" ? "محسن SEO" : "SEO Optimizer"}</h1>
        <p className="text-gray-600 mt-1">
          {language === "ar" ? "حسن موقعك لمحركات البحث" : "Optimize your website for search engines"}
        </p>
      </div>

      {/* URL Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Search className="w-5 h-5" />
            <span>{language === "ar" ? "تحليل الموقع" : "Website Analysis"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="url">{language === "ar" ? "رابط الموقع" : "Website URL"}</Label>
            <div className="flex space-x-2 rtl:space-x-reverse mt-1">
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAnalyze} disabled={isAnalyzing || !url}>
                {isAnalyzing
                  ? language === "ar"
                    ? "جاري التحليل..."
                    : "Analyzing..."
                  : language === "ar"
                    ? "تحليل"
                    : "Analyze"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray={`${seoScore.overall}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{seoScore.overall}</span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900">{language === "ar" ? "النتيجة الإجمالية" : "Overall Score"}</h3>
            <p className="text-sm text-gray-500 mt-1">{language === "ar" ? "من 100" : "out of 100"}</p>
          </CardContent>
        </Card>

        {[
          { title: language === "ar" ? "تقني" : "Technical", score: seoScore.technical, icon: Globe },
          { title: language === "ar" ? "محتوى" : "Content", score: seoScore.content, icon: TrendingUp },
          { title: language === "ar" ? "أداء" : "Performance", score: seoScore.performance, icon: ImageIcon },
        ].map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <item.icon className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold text-gray-900">{item.score}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <Progress value={item.score} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SEO Issues */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "ar" ? "مشاكل SEO" : "SEO Issues"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seoIssues.map((issue, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 rtl:space-x-reverse p-4 border border-gray-200 rounded-lg"
              >
                {getIssueIcon(issue.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{issue.title}</h4>
                    <Badge className={`text-xs ${getImpactColor(issue.impact)}`}>
                      {language === "ar"
                        ? issue.impact === "high"
                          ? "عالي"
                          : issue.impact === "medium"
                            ? "متوسط"
                            : "منخفض"
                        : issue.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{issue.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "ar" ? "توصيات التحسين" : "Optimization Recommendations"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Meta Tags */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">{language === "ar" ? "علامات الميتا" : "Meta Tags"}</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="title">{language === "ar" ? "عنوان الصفحة" : "Page Title"}</Label>
                  <Input
                    id="title"
                    placeholder={language === "ar" ? "عنوان جذاب ووصفي" : "Compelling and descriptive title"}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {language === "ar" ? "50-60 حرف مثالي" : "50-60 characters optimal"}
                  </p>
                </div>
                <div>
                  <Label htmlFor="description">{language === "ar" ? "وصف الميتا" : "Meta Description"}</Label>
                  <Textarea
                    id="description"
                    placeholder={
                      language === "ar" ? "وصف مقنع يشجع على النقر" : "Compelling description that encourages clicks"
                    }
                    className="mt-1"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {language === "ar" ? "150-160 حرف مثالي" : "150-160 characters optimal"}
                  </p>
                </div>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">{language === "ar" ? "الكلمات المفتاحية" : "Keywords"}</h4>
              <Input placeholder={language === "ar" ? "كلمة مفتاحية 1, كلمة مفتاحية 2" : "keyword 1, keyword 2"} />
              <p className="text-xs text-gray-500 mt-1">
                {language === "ar" ? "افصل بين الكلمات بفاصلة" : "Separate keywords with commas"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 rtl:space-x-reverse">
              <Button className="bg-blue-600 hover:bg-blue-700">
                {language === "ar" ? "تطبيق التحسينات" : "Apply Optimizations"}
              </Button>
              <Button variant="outline">{language === "ar" ? "تصدير التقرير" : "Export Report"}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
