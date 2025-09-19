"use client"

import { useState } from "react"
import {
  User,
  Mail,
  Lock,
  Bell,
  Globe,
  Palette,
  Shield,
  CreditCard,
  Download,
  Upload,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Camera,
  Smartphone,
  Monitor,
  SettingsIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from "@/lib/store"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

export default function SettingsPage() {
  const { language } = useTranslation()
  const { user, setLanguage } = useStore()
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true,
    security: true,
    updates: true,
  })

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    website: "",
    location: "",
    timezone: "Asia/Riyadh",
  })

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
  })

  const handleSaveProfile = () => {
    // Save profile logic
    console.log("Saving profile:", profile)
  }

  const handleSaveSecurity = () => {
    // Save security settings logic
    console.log("Saving security:", security)
  }

  const handleDeleteAccount = () => {
    // Delete account logic
    if (confirm(language === "ar" ? "هل أنت متأكد من حذف الحساب؟" : "Are you sure you want to delete your account?")) {
      console.log("Deleting account")
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      dir={languages[language].dir}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
            <SettingsIcon className="w-8 h-8 mr-3" />
            {language === "ar" ? "الإعدادات" : "Settings"}
          </h1>
          <p className="text-lg text-gray-600">
            {language === "ar" ? "إدارة حسابك وتفضيلاتك" : "Manage your account and preferences"}
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-white shadow-sm">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {language === "ar" ? "الملف الشخصي" : "Profile"}
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              {language === "ar" ? "الأمان" : "Security"}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              {language === "ar" ? "الإشعارات" : "Notifications"}
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              {language === "ar" ? "الفوترة" : "Billing"}
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              {language === "ar" ? "التفضيلات" : "Preferences"}
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              {language === "ar" ? "البيانات" : "Data"}
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  {language === "ar" ? "المعلومات الشخصية" : "Personal Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                  <div className="relative">
                    <img
                      src={user?.avatar || "/placeholder.svg?height=80&width=80"}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                    <p className="text-gray-600">{profile.email}</p>
                    <div className="flex space-x-2 rtl:space-x-reverse mt-2">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        {language === "ar" ? "رفع صورة" : "Upload Photo"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        {language === "ar" ? "حذف" : "Remove"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "ar" ? "الاسم الكامل" : "Full Name"}
                    </label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "ar" ? "البريد الإلكتروني" : "Email Address"}
                    </label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "ar" ? "الموقع الإلكتروني" : "Website"}
                    </label>
                    <Input
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "ar" ? "الموقع" : "Location"}
                    </label>
                    <Input
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      placeholder={language === "ar" ? "الرياض، السعودية" : "Riyadh, Saudi Arabia"}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === "ar" ? "نبذة شخصية" : "Bio"}
                  </label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder={language === "ar" ? "اكتب نبذة عن نفسك..." : "Write a short bio about yourself..."}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === "ar" ? "المنطقة الزمنية" : "Timezone"}
                  </label>
                  <Select
                    value={profile.timezone}
                    onValueChange={(value) => setProfile({ ...profile, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Riyadh">(GMT+3) Riyadh</SelectItem>
                      <SelectItem value="Asia/Dubai">(GMT+4) Dubai</SelectItem>
                      <SelectItem value="Asia/Kuwait">(GMT+3) Kuwait</SelectItem>
                      <SelectItem value="Africa/Cairo">(GMT+2) Cairo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  {language === "ar" ? "حفظ التغييرات" : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Password */}
              <Card className="bg-white shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="w-5 h-5 mr-2" />
                    {language === "ar" ? "كلمة المرور" : "Password"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "ar" ? "كلمة المرور الحالية" : "Current Password"}
                    </label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••••" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "ar" ? "كلمة المرور الجديدة" : "New Password"}
                    </label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
                    </label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full">{language === "ar" ? "تحديث كلمة المرور" : "Update Password"}</Button>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card className="bg-white shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    {language === "ar" ? "إعدادات الأمان" : "Security Settings"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {language === "ar" ? "المصادقة الثنائية" : "Two-Factor Authentication"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === "ar" ? "حماية إضافية لحسابك" : "Extra security for your account"}
                      </p>
                    </div>
                    <Switch
                      checked={security.twoFactor}
                      onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {language === "ar" ? "تنبيهات تسجيل الدخول" : "Login Alerts"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === "ar" ? "إشعار عند تسجيل دخول جديد" : "Notify on new login"}
                      </p>
                    </div>
                    <Switch
                      checked={security.loginAlerts}
                      onCheckedChange={(checked) => setSecurity({ ...security, loginAlerts: checked })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "ar" ? "انتهاء الجلسة (دقيقة)" : "Session Timeout (minutes)"}
                    </label>
                    <Select
                      value={security.sessionTimeout}
                      onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 {language === "ar" ? "دقيقة" : "minutes"}</SelectItem>
                        <SelectItem value="30">30 {language === "ar" ? "دقيقة" : "minutes"}</SelectItem>
                        <SelectItem value="60">60 {language === "ar" ? "دقيقة" : "minutes"}</SelectItem>
                        <SelectItem value="120">120 {language === "ar" ? "دقيقة" : "minutes"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleSaveSecurity} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {language === "ar" ? "حفظ الإعدادات" : "Save Settings"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  {language === "ar" ? "تفضيلات الإشعارات" : "Notification Preferences"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {language === "ar" ? "إشعارات البريد الإلكتروني" : "Email Notifications"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === "ar" ? "تلقي الإشعارات عبر البريد" : "Receive notifications via email"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Smartphone className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {language === "ar" ? "الإشعارات الفورية" : "Push Notifications"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === "ar" ? "إشعارات فورية على الجهاز" : "Instant notifications on device"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Smartphone className="w-5 h-5 text-purple-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {language === "ar" ? "رسائل SMS" : "SMS Messages"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === "ar" ? "إشعارات عبر الرسائل النصية" : "Notifications via text messages"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Globe className="w-5 h-5 text-orange-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {language === "ar" ? "التسويق والعروض" : "Marketing & Offers"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === "ar" ? "عروض وأخبار المنتج" : "Product news and offers"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Shield className="w-5 h-5 text-red-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {language === "ar" ? "تنبيهات الأمان" : "Security Alerts"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === "ar" ? "تنبيهات مهمة للأمان" : "Important security alerts"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.security}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, security: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Monitor className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {language === "ar" ? "تحديثات المنتج" : "Product Updates"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === "ar" ? "ميزات وتحديثات جديدة" : "New features and updates"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.updates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
                    />
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  {language === "ar" ? "حفظ التفضيلات" : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Plan */}
              <Card className="bg-white shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    {language === "ar" ? "الخطة الحالية" : "Current Plan"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{language === "ar" ? "الخطة" : "Plan"}</span>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      {language === "ar" ? "محترف" : "Professional"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{language === "ar" ? "السعر" : "Price"}</span>
                    <span className="font-semibold">$99/{language === "ar" ? "شهر" : "month"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{language === "ar" ? "تاريخ التجديد" : "Next Billing"}</span>
                    <span className="font-medium">Feb 15, 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{language === "ar" ? "الحالة" : "Status"}</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {language === "ar" ? "نشط" : "Active"}
                    </Badge>
                  </div>
                  <div className="pt-4 space-y-2">
                    <Button variant="outline" className="w-full bg-transparent">
                      {language === "ar" ? "ترقية الخطة" : "Upgrade Plan"}
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 hover:text-red-700 bg-transparent">
                      {language === "ar" ? "إلغاء الاشتراك" : "Cancel Subscription"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-white shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    {language === "ar" ? "طريقة الدفع" : "Payment Method"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">•••• •••• •••• 4242</div>
                      <div className="text-sm text-gray-600">Expires 12/25</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {language === "ar" ? "افتراضي" : "Default"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full bg-transparent">
                      {language === "ar" ? "إضافة بطاقة جديدة" : "Add New Card"}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      {language === "ar" ? "تحديث طريقة الدفع" : "Update Payment Method"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Billing History */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle>{language === "ar" ? "سجل الفواتير" : "Billing History"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-right p-3 font-semibold text-gray-900">
                          {language === "ar" ? "التاريخ" : "Date"}
                        </th>
                        <th className="text-right p-3 font-semibold text-gray-900">
                          {language === "ar" ? "الوصف" : "Description"}
                        </th>
                        <th className="text-center p-3 font-semibold text-gray-900">
                          {language === "ar" ? "المبلغ" : "Amount"}
                        </th>
                        <th className="text-center p-3 font-semibold text-gray-900">
                          {language === "ar" ? "الحالة" : "Status"}
                        </th>
                        <th className="text-center p-3 font-semibold text-gray-900">
                          {language === "ar" ? "الإجراءات" : "Actions"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: "2024-01-15", description: "Professional Plan", amount: "$99.00", status: "paid" },
                        { date: "2023-12-15", description: "Professional Plan", amount: "$99.00", status: "paid" },
                        { date: "2023-11-15", description: "Professional Plan", amount: "$99.00", status: "paid" },
                      ].map((invoice, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="p-3 text-gray-900">{invoice.date}</td>
                          <td className="p-3 text-gray-900">{invoice.description}</td>
                          <td className="p-3 text-center font-semibold text-gray-900">{invoice.amount}</td>
                          <td className="p-3 text-center">
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              {language === "ar" ? "مدفوع" : "Paid"}
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              {language === "ar" ? "تحميل" : "Download"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  {language === "ar" ? "تفضيلات العرض" : "Display Preferences"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {language === "ar" ? "اللغة" : "Language"}
                  </label>
                  <Select value={language} onValueChange={(value: "ar" | "en") => setLanguage(value)}>
                    <SelectTrigger className="w-full">
                      <Globe className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {language === "ar" ? "المظهر" : "Theme"}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Theme selectors wired to next-themes */}
                    <ThemeSelector />
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  {language === "ar" ? "حفظ التفضيلات" : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Export Data */}
              <Card className="bg-white shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="w-5 h-5 mr-2" />
                    {language === "ar" ? "تصدير البيانات" : "Export Data"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    {language === "ar" ? "قم بتحميل نسخة من جميع بياناتك" : "Download a copy of all your data"}
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      {language === "ar" ? "تصدير المواقع" : "Export Websites"}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      {language === "ar" ? "تصدير التحليلات" : "Export Analytics"}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      {language === "ar" ? "تصدير جميع البيانات" : "Export All Data"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Delete Account */}
              <Card className="bg-white shadow-sm border-0 border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600">
                    <Trash2 className="w-5 h-5 mr-2" />
                    {language === "ar" ? "حذف الحساب" : "Delete Account"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    {language === "ar"
                      ? "حذف الحساب نهائياً مع جميع البيانات"
                      : "Permanently delete your account and all data"}
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">
                      {language === "ar"
                        ? "تحذير: هذا الإجراء لا يمكن التراجع عنه"
                        : "Warning: This action cannot be undone"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {language === "ar" ? "حذف الحساب نهائياً" : "Delete Account Permanently"}
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
