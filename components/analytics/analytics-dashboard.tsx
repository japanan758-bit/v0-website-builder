"use client"

import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  ArrowUp,
  ArrowDown,
  Calendar,
  Download,
  RefreshCw,
  MapPin,
  Activity,
  Target,
  Share2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

interface AnalyticsData {
  visitors: {
    total: number
    change: number
    trend: "up" | "down"
    unique: number
    returning: number
  }
  pageViews: {
    total: number
    change: number
    trend: "up" | "down"
    perSession: number
  }
  avgTime: {
    minutes: number
    seconds: number
    change: number
    trend: "up" | "down"
  }
  bounceRate: {
    percentage: number
    change: number
    trend: "up" | "down"
  }
  conversionRate: {
    percentage: number
    change: number
    trend: "up" | "down"
  }
}

export function AnalyticsDashboard() {
  const { language } = useTranslation()
  const [timeRange, setTimeRange] = useState("7d")
  const [isLoading, setIsLoading] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    visitors: { total: 15847, change: 15.3, trend: "up", unique: 12543, returning: 3304 },
    pageViews: { total: 67231, change: 12.8, trend: "up", perSession: 4.2 },
    avgTime: { minutes: 4, seconds: 23, change: 8.7, trend: "up" },
    bounceRate: { percentage: 28.4, change: -3.2, trend: "down" },
    conversionRate: { percentage: 3.8, change: 0.5, trend: "up" },
  })

  const refreshData = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const stats = [
    {
      title: language === "ar" ? "إجمالي الزوار" : "Total Visitors",
      value: analyticsData.visitors.total.toLocaleString(),
      change: analyticsData.visitors.change,
      trend: analyticsData.visitors.trend,
      icon: Users,
      color: "from-blue-500 to-indigo-500",
      subtitle: `${analyticsData.visitors.unique.toLocaleString()} ${language === "ar" ? "فريد" : "unique"}`,
    },
    {
      title: language === "ar" ? "مشاهدات الصفحة" : "Page Views",
      value: analyticsData.pageViews.total.toLocaleString(),
      change: analyticsData.pageViews.change,
      trend: analyticsData.pageViews.trend,
      icon: Eye,
      color: "from-green-500 to-teal-500",
      subtitle: `${analyticsData.pageViews.perSession} ${language === "ar" ? "لكل جلسة" : "per session"}`,
    },
    {
      title: language === "ar" ? "متوسط الوقت" : "Avg. Session Duration",
      value: `${analyticsData.avgTime.minutes}:${analyticsData.avgTime.seconds.toString().padStart(2, "0")}`,
      change: analyticsData.avgTime.change,
      trend: analyticsData.avgTime.trend,
      icon: Clock,
      color: "from-purple-500 to-pink-500",
      subtitle: language === "ar" ? "دقائق" : "minutes",
    },
    {
      title: language === "ar" ? "معدل الارتداد" : "Bounce Rate",
      value: `${analyticsData.bounceRate.percentage}%`,
      change: analyticsData.bounceRate.change,
      trend: analyticsData.bounceRate.trend,
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      subtitle: language === "ar" ? "من الجلسات" : "of sessions",
    },
    {
      title: language === "ar" ? "معدل التحويل" : "Conversion Rate",
      value: `${analyticsData.conversionRate.percentage}%`,
      change: analyticsData.conversionRate.change,
      trend: analyticsData.conversionRate.trend,
      icon: Target,
      color: "from-cyan-500 to-blue-500",
      subtitle: language === "ar" ? "من الزوار" : "of visitors",
    },
  ]

  const deviceData = [
    { device: language === "ar" ? "سطح المكتب" : "Desktop", percentage: 58.7, icon: Monitor, users: 9302 },
    { device: language === "ar" ? "الجوال" : "Mobile", percentage: 35.2, icon: Smartphone, users: 5578 },
    { device: language === "ar" ? "التابلت" : "Tablet", percentage: 6.1, icon: Globe, users: 967 },
  ]

  const topPages = [
    {
      page: "/",
      title: language === "ar" ? "الصفحة الرئيسية" : "Homepage",
      views: 18234,
      percentage: 27.1,
      change: 12.5,
    },
    { page: "/about", title: language === "ar" ? "من نحن" : "About Us", views: 12921, percentage: 19.2, change: 8.3 },
    {
      page: "/services",
      title: language === "ar" ? "الخدمات" : "Services",
      views: 9543,
      percentage: 14.2,
      change: -2.1,
    },
    {
      page: "/contact",
      title: language === "ar" ? "اتصل بنا" : "Contact",
      views: 7321,
      percentage: 10.9,
      change: 15.7,
    },
    { page: "/blog", title: language === "ar" ? "المدونة" : "Blog", views: 5456, percentage: 8.1, change: 22.4 },
  ]

  const trafficSources = [
    { source: language === "ar" ? "البحث المباشر" : "Direct", percentage: 42.3, visitors: 6702, color: "bg-blue-500" },
    {
      source: language === "ar" ? "محركات البحث" : "Search Engines",
      percentage: 31.8,
      visitors: 5034,
      color: "bg-green-500",
    },
    {
      source: language === "ar" ? "وسائل التواصل" : "Social Media",
      percentage: 18.4,
      visitors: 2916,
      color: "bg-purple-500",
    },
    {
      source: language === "ar" ? "المواقع المرجعية" : "Referrals",
      percentage: 7.5,
      visitors: 1195,
      color: "bg-orange-500",
    },
  ]

  const topCountries = [
    { country: language === "ar" ? "السعودية" : "Saudi Arabia", flag: "🇸🇦", visitors: 4521, percentage: 28.5 },
    { country: language === "ar" ? "الإمارات" : "UAE", flag: "🇦🇪", visitors: 3204, percentage: 20.2 },
    { country: language === "ar" ? "مصر" : "Egypt", flag: "🇪🇬", visitors: 2847, percentage: 18.0 },
    { country: language === "ar" ? "الكويت" : "Kuwait", flag: "🇰🇼", visitors: 1923, percentage: 12.1 },
    { country: language === "ar" ? "قطر" : "Qatar", flag: "🇶🇦", visitors: 1456, percentage: 9.2 },
  ]

  const realtimeActivity = [
    {
      action: language === "ar" ? "زار الصفحة الرئيسية" : "Visited homepage",
      time: "2s ago",
      location: "Riyadh, SA",
      device: "Desktop",
    },
    {
      action: language === "ar" ? "تصفح صفحة الخدمات" : "Browsed services page",
      time: "15s ago",
      location: "Dubai, AE",
      device: "Mobile",
    },
    {
      action: language === "ar" ? "ملأ نموذج التواصل" : "Filled contact form",
      time: "32s ago",
      location: "Cairo, EG",
      device: "Desktop",
    },
    {
      action: language === "ar" ? "شاهد معرض الأعمال" : "Viewed portfolio",
      time: "1m ago",
      location: "Kuwait City, KW",
      device: "Tablet",
    },
    {
      action: language === "ar" ? "قرأ مقال في المدونة" : "Read blog article",
      time: "2m ago",
      location: "Doha, QA",
      device: "Mobile",
    },
  ]

  return (
    <div className="space-y-8" dir={languages[language].dir}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {language === "ar" ? "لوحة التحليلات" : "Analytics Dashboard"}
          </h1>
          <p className="text-lg text-gray-600">
            {language === "ar"
              ? "تتبع أداء موقعك وسلوك الزوار بالتفصيل"
              : "Track your website performance and visitor behavior in detail"}
          </p>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse mt-4 lg:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24h</SelectItem>
              <SelectItem value="7d">7d</SelectItem>
              <SelectItem value="30d">30d</SelectItem>
              <SelectItem value="90d">90d</SelectItem>
              <SelectItem value="1y">1y</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            {language === "ar" ? "تحديث" : "Refresh"}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {language === "ar" ? "تصدير" : "Export"}
          </Button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center">
                  {stat.trend === "up" ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ml-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    {Math.abs(stat.change)}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Sources */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Share2 className="w-5 h-5" />
              <span>{language === "ar" ? "مصادر الزيارات" : "Traffic Sources"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                    <span className="font-medium text-gray-900">{source.source}</span>
                  </div>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="text-right rtl:text-left">
                      <div className="text-sm font-medium text-gray-900">{source.visitors.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{source.percentage}%</div>
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${source.color} rounded-full transition-all duration-500`}
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Monitor className="w-5 h-5" />
              <span>{language === "ar" ? "الأجهزة" : "Devices"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {deviceData.map((device, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <device.icon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{device.device}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{device.percentage}%</span>
                </div>
                <Progress value={device.percentage} className="h-2" />
                <div className="text-xs text-gray-500 text-right rtl:text-left">
                  {device.users.toLocaleString()} {language === "ar" ? "مستخدم" : "users"}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top Pages and Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <BarChart3 className="w-5 h-5" />
              <span>{language === "ar" ? "أهم الصفحات" : "Top Pages"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse flex-1">
                    <Badge
                      variant="outline"
                      className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {index + 1}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{page.title}</div>
                      <div className="text-xs text-gray-500 truncate">{page.page}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="text-right rtl:text-left">
                      <div className="text-sm font-medium text-gray-900">{page.views.toLocaleString()}</div>
                      <div
                        className={`text-xs flex items-center ${page.change > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {page.change > 0 ? (
                          <ArrowUp className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDown className="w-3 h-3 mr-1" />
                        )}
                        {Math.abs(page.change)}%
                      </div>
                    </div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${page.percentage * 3}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <MapPin className="w-5 h-5" />
              <span>{language === "ar" ? "أهم البلدان" : "Top Countries"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCountries.map((country, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <div className="font-medium text-gray-900">{country.country}</div>
                      <div className="text-xs text-gray-500">{country.percentage}% of traffic</div>
                    </div>
                  </div>
                  <div className="text-right rtl:text-left">
                    <div className="text-sm font-medium text-gray-900">{country.visitors.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{language === "ar" ? "زائر" : "visitors"}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <Activity className="w-5 h-5" />
              <span>{language === "ar" ? "النشاط المباشر" : "Real-time Activity"}</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {language === "ar" ? "47 زائر نشط" : "47 active visitors"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {realtimeActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      {activity.location} • {activity.device}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
