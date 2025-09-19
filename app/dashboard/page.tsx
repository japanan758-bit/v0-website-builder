"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Globe,
  FileText,
  Archive,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Star,
  Settings,
  Upload,
  Share2,
  ExternalLink,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@/lib/store"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"
import Link from "next/link"

export default function DashboardPage() {
  const { t, language } = useTranslation()
  const { websites, user } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "archived">("all")
  const [sortBy, setSortBy] = useState<"name" | "created" | "updated" | "visits">("updated")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Calculate comprehensive stats
  const stats = useMemo(() => {
    const totalWebsites = websites.length
    const totalVisits = websites.reduce((sum, site) => sum + site.visits, 0)
    const publishedSites = websites.filter((site) => site.status === "published").length
    const draftSites = websites.filter((site) => site.status === "draft").length
    const archivedSites = websites.filter((site) => site.status === "archived").length

    // Calculate growth metrics
    const thisMonth = new Date().getMonth()
    const thisYear = new Date().getFullYear()
    const thisMonthSites = websites.filter((site) => {
      const siteDate = new Date(site.createdAt)
      return siteDate.getMonth() === thisMonth && siteDate.getFullYear() === thisYear
    }).length

    const avgVisitsPerSite = totalWebsites > 0 ? Math.round(totalVisits / totalWebsites) : 0
    const conversionRate = totalWebsites > 0 ? Math.round((publishedSites / totalWebsites) * 100) : 0

    return {
      totalWebsites,
      totalVisits,
      publishedSites,
      draftSites,
      archivedSites,
      thisMonthSites,
      avgVisitsPerSite,
      conversionRate,
    }
  }, [websites])

  // Filter and sort websites
  const filteredWebsites = useMemo(() => {
    const filtered = websites.filter((website) => {
      const matchesSearch =
        website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        website.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || website.status === statusFilter
      return matchesSearch && matchesStatus
    })

    // Sort websites
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "updated":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case "visits":
          return b.visits - a.visits
        default:
          return 0
      }
    })

    return filtered
  }, [websites, searchQuery, statusFilter, sortBy])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200"
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return language === "ar" ? "منشور" : "Published"
      case "draft":
        return language === "ar" ? "مسودة" : "Draft"
      case "archived":
        return language === "ar" ? "مؤرشف" : "Archived"
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const recentActivity = [
    {
      id: 1,
      action: language === "ar" ? "تم إنشاء موقع جديد" : "New website created",
      website: "متجر الإلكترونيات",
      time: "منذ ساعتين",
      type: "create",
    },
    {
      id: 2,
      action: language === "ar" ? "تم نشر الموقع" : "Website published",
      website: "مدونة التقنية",
      time: "منذ 4 ساعات",
      type: "publish",
    },
    {
      id: 3,
      action: language === "ar" ? "تم تحديث التصميم" : "Design updated",
      website: "شركة التسويق",
      time: "أمس",
      type: "update",
    },
    {
      id: 4,
      action: language === "ar" ? "تم إضافة صفحة جديدة" : "New page added",
      website: "متجر الإلكترونيات",
      time: "منذ يومين",
      type: "edit",
    },
  ]

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      dir={languages[language].dir}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                {language === "ar" ? "مرحباً" : "Welcome"}, {user?.name}
                <span className="ml-2 text-3xl">👋</span>
              </h1>
              <p className="text-lg text-gray-600">
                {language === "ar"
                  ? "إدارة مواقعك ومتابعة أدائها من مكان واحد"
                  : "Manage your websites and track their performance from one place"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex items-center bg-transparent">
                <Upload className="w-4 h-4 mr-2" />
                {language === "ar" ? "استيراد" : "Import"}
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                {language === "ar" ? "إنشاء موقع جديد" : "Create New Website"}
              </Button>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">
                  {language === "ar" ? "إجمالي المواقع" : "Total Websites"}
                </CardTitle>
                <Globe className="w-5 h-5 text-blue-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stats.totalWebsites}</div>
                <div className="flex items-center text-sm text-blue-100">
                  <TrendingUp className="w-4 h-4 mr-1" />+{stats.thisMonthSites}{" "}
                  {language === "ar" ? "هذا الشهر" : "this month"}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-100">
                  {language === "ar" ? "إجمالي الزيارات" : "Total Visits"}
                </CardTitle>
                <BarChart3 className="w-5 h-5 text-green-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stats.totalVisits.toLocaleString()}</div>
                <div className="flex items-center text-sm text-green-100">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% {language === "ar" ? "من الشهر الماضي" : "from last month"}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">
                  {language === "ar" ? "المواقع المنشورة" : "Published Sites"}
                </CardTitle>
                <Eye className="w-5 h-5 text-purple-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stats.publishedSites}</div>
                <div className="flex items-center text-sm text-purple-100">
                  <span>
                    {stats.conversionRate}% {language === "ar" ? "معدل النشر" : "publish rate"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-100">
                  {language === "ar" ? "متوسط الزيارات" : "Avg. Visits"}
                </CardTitle>
                <Users className="w-5 h-5 text-orange-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stats.avgVisitsPerSite}</div>
                <div className="flex items-center text-sm text-orange-100">
                  <span>{language === "ar" ? "لكل موقع" : "per website"}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="websites" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="websites" className="flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              {language === "ar" ? "المواقع" : "Websites"}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              {language === "ar" ? "التحليلات" : "Analytics"}
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {language === "ar" ? "النشاط" : "Activity"}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              {language === "ar" ? "الإعدادات" : "Settings"}
            </TabsTrigger>
          </TabsList>

          {/* Websites Tab */}
          <TabsContent value="websites" className="space-y-6">
            {/* Filters and Search */}
            <Card className="bg-white shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder={language === "ar" ? "البحث في المواقع..." : "Search websites..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                      <SelectTrigger className="w-full sm:w-40">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{language === "ar" ? "جميع الحالات" : "All Status"}</SelectItem>
                        <SelectItem value="published">{language === "ar" ? "منشور" : "Published"}</SelectItem>
                        <SelectItem value="draft">{language === "ar" ? "مسودة" : "Draft"}</SelectItem>
                        <SelectItem value="archived">{language === "ar" ? "مؤرشف" : "Archived"}</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="updated">{language === "ar" ? "آخر تحديث" : "Last Updated"}</SelectItem>
                        <SelectItem value="created">{language === "ar" ? "تاريخ الإنشاء" : "Date Created"}</SelectItem>
                        <SelectItem value="name">{language === "ar" ? "الاسم" : "Name"}</SelectItem>
                        <SelectItem value="visits">{language === "ar" ? "الزيارات" : "Visits"}</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex border border-gray-200 rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="px-3"
                      >
                        <div className="grid grid-cols-2 gap-1 w-4 h-4">
                          <div className="bg-current rounded-sm"></div>
                          <div className="bg-current rounded-sm"></div>
                          <div className="bg-current rounded-sm"></div>
                          <div className="bg-current rounded-sm"></div>
                        </div>
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="px-3"
                      >
                        <div className="space-y-1 w-4 h-4">
                          <div className="bg-current h-1 rounded"></div>
                          <div className="bg-current h-1 rounded"></div>
                          <div className="bg-current h-1 rounded"></div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Websites Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWebsites.map((website) => (
                  <Card
                    key={website.id}
                    className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={website.thumbnail || "/placeholder.svg?height=200&width=300"}
                        alt={website.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className={getStatusColor(website.status)}>{getStatusText(website.status)}</Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {website.name}
                        </h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">4.8</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{website.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(website.updatedAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{website.visits.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Eye className="w-4 h-4 mr-1" />
                          {language === "ar" ? "معاينة" : "Preview"}
                        </Button>
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          <Edit className="w-4 h-4 mr-1" />
                          {language === "ar" ? "تحرير" : "Edit"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white shadow-sm border-0">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-right p-4 font-semibold text-gray-900">
                            {language === "ar" ? "الموقع" : "Website"}
                          </th>
                          <th className="text-center p-4 font-semibold text-gray-900">
                            {language === "ar" ? "الحالة" : "Status"}
                          </th>
                          <th className="text-center p-4 font-semibold text-gray-900">
                            {language === "ar" ? "الزيارات" : "Visits"}
                          </th>
                          <th className="text-center p-4 font-semibold text-gray-900">
                            {language === "ar" ? "آخر تحديث" : "Last Updated"}
                          </th>
                          <th className="text-center p-4 font-semibold text-gray-900">
                            {language === "ar" ? "الإجراءات" : "Actions"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredWebsites.map((website) => (
                          <tr key={website.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                <img
                                  src={website.thumbnail || "/placeholder.svg?height=40&width=40"}
                                  alt={website.name}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                                <div>
                                  <div className="font-semibold text-gray-900">{website.name}</div>
                                  <div className="text-sm text-gray-500 line-clamp-1">{website.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <Badge className={getStatusColor(website.status)}>{getStatusText(website.status)}</Badge>
                            </td>
                            <td className="p-4 text-center font-semibold text-gray-900">
                              {website.visits.toLocaleString()}
                            </td>
                            <td className="p-4 text-center text-gray-600">{formatDate(website.updatedAt)}</td>
                            <td className="p-4">
                              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Share2 className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 bg-transparent"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {filteredWebsites.length === 0 && (
              <Card className="bg-white shadow-sm border-0">
                <CardContent className="text-center py-12">
                  <Archive className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {language === "ar" ? "لا توجد مواقع مطابقة" : "No matching websites"}
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    {language === "ar"
                      ? "جرب تغيير معايير البحث أو إنشاء موقع جديد"
                      : "Try changing your search criteria or create a new website"}
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    {language === "ar" ? "إنشاء موقع جديد" : "Create New Website"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traffic Overview */}
              <Card className="bg-white shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    {language === "ar" ? "نظرة عامة على الزيارات" : "Traffic Overview"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{language === "ar" ? "هذا الأسبوع" : "This Week"}</span>
                      <span className="font-semibold">2,847</span>
                    </div>
                    <Progress value={75} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {language === "ar" ? "الأسبوع الماضي" : "Last Week"}
                      </span>
                      <span className="font-semibold">2,234</span>
                    </div>
                    <Progress value={60} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{language === "ar" ? "هذا الشهر" : "This Month"}</span>
                      <span className="font-semibold">12,456</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Sites */}
              <Card className="bg-white shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    {language === "ar" ? "أفضل المواقع أداءً" : "Top Performing Sites"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {websites.slice(0, 3).map((site, index) => (
                      <div key={site.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                              index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{site.name}</div>
                            <div className="text-sm text-gray-500">
                              {site.visits} {language === "ar" ? "زيارة" : "visits"}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          +{Math.floor(Math.random() * 20 + 5)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle>{language === "ar" ? "تحليلات مفصلة" : "Detailed Analytics"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">98.5%</div>
                    <div className="text-sm text-gray-600">{language === "ar" ? "وقت التشغيل" : "Uptime"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">2.3s</div>
                    <div className="text-sm text-gray-600">{language === "ar" ? "متوسط التحميل" : "Avg Load Time"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">67%</div>
                    <div className="text-sm text-gray-600">{language === "ar" ? "معدل الارتداد" : "Bounce Rate"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-orange-600" />
                  {language === "ar" ? "النشاط الأخير" : "Recent Activity"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "create"
                            ? "bg-blue-100 text-blue-600"
                            : activity.type === "publish"
                              ? "bg-green-100 text-green-600"
                              : activity.type === "update"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {activity.type === "create" && <Plus className="w-5 h-5" />}
                        {activity.type === "publish" && <Globe className="w-5 h-5" />}
                        {activity.type === "update" && <Edit className="w-5 h-5" />}
                        {activity.type === "edit" && <FileText className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-900 font-medium">{activity.action}</p>
                          <span className="text-sm text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{activity.website}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Account Settings */}
              <Card className="bg-white shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-gray-600" />
                    {language === "ar" ? "إعدادات الحساب" : "Account Settings"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "ar" ? "الاسم" : "Name"}
                    </label>
                    <Input defaultValue={user?.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </label>
                    <Input defaultValue={user?.email} />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {language === "ar" ? "حفظ التغييرات" : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>

              {/* Subscription Info */}
              <Card className="bg-white shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    {language === "ar" ? "معلومات الاشتراك" : "Subscription Info"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{language === "ar" ? "الخطة الحالية" : "Current Plan"}</span>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      {user?.plan === "pro" ? (language === "ar" ? "محترف" : "Pro") : user?.plan}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{language === "ar" ? "تاريخ التجديد" : "Renewal Date"}</span>
                    <span className="font-medium">2024-02-15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{language === "ar" ? "المبلغ" : "Amount"}</span>
                    <span className="font-medium">$99/month</span>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Link href="/pricing">{language === "ar" ? "ترقية الخطة" : "Upgrade Plan"}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
