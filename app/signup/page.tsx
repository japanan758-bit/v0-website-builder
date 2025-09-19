"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
  Loader2,
  CheckCircle,
  AlertCircle,
  Crown,
  Zap,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client"

const plans = [
  {
    id: "free",
    name: { ar: "مجاني", en: "Free" },
    price: { ar: "مجاني", en: "Free" },
    description: { ar: "للمبتدئين", en: "For beginners" },
    features: [
      { ar: "3 مواقع", en: "3 websites" },
      { ar: "قوالب أساسية", en: "Basic templates" },
      { ar: "دعم أساسي", en: "Basic support" },
    ],
    icon: Star,
    color: "from-gray-500 to-gray-600",
  },
  {
    id: "pro",
    name: { ar: "محترف", en: "Pro" },
    price: { ar: "$29/شهر", en: "$29/month" },
    description: { ar: "للمحترفين", en: "For professionals" },
    features: [
      { ar: "مواقع غير محدودة", en: "Unlimited websites" },
      { ar: "جميع القوالب", en: "All templates" },
      { ar: "دعم متقدم", en: "Priority support" },
      { ar: "تحليلات متقدمة", en: "Advanced analytics" },
    ],
    icon: Zap,
    color: "from-blue-500 to-purple-600",
    popular: true,
  },
  {
    id: "enterprise",
    name: { ar: "مؤسسي", en: "Enterprise" },
    price: { ar: "$99/شهر", en: "$99/month" },
    description: { ar: "للشركات", en: "For enterprises" },
    features: [
      { ar: "كل ميزات المحترف", en: "Everything in Pro" },
      { ar: "دعم مخصص", en: "Custom support" },
      { ar: "API متقدم", en: "Advanced API" },
      { ar: "تدريب مخصص", en: "Custom training" },
    ],
    icon: Crown,
    color: "from-purple-500 to-pink-600",
  },
]

export default function SignupPage() {
  const router = useRouter()
  const { register } = useAuth()
  const { language } = useTranslation()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    plan: "free" as "free" | "pro" | "enterprise",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})

  const validateStep1 = () => {
    const errors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      errors.name = language === "ar" ? "الاسم مطلوب" : "Name is required"
    } else if (formData.name.trim().length < 2) {
      errors.name = language === "ar" ? "الاسم يجب أن يكون حرفين على الأقل" : "Name must be at least 2 characters"
    }

    if (!formData.email) {
      errors.email = language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = language === "ar" ? "البريد الإلكتروني غير صحيح" : "Invalid email format"
    }

    if (!formData.password) {
      errors.password = language === "ar" ? "كلمة المرور مطلوبة" : "Password is required"
    } else if (formData.password.length < 8) {
      errors.password =
        language === "ar" ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل" : "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password =
        language === "ar"
          ? "كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم"
          : "Password must contain uppercase, lowercase and number"
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = language === "ar" ? "تأكيد كلمة المرور مطلوب" : "Confirm password is required"
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = language === "ar" ? "كلمات المرور غير متطابقة" : "Passwords do not match"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep1()) return

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await register({
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
        plan: formData.plan,
      })

      if (result.success) {
        setSuccess(
          language === "ar"
            ? "تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني."
            : "Account created successfully! Check your email.",
        )
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setError(result.error || (language === "ar" ? "فشل في إنشاء الحساب" : "Failed to create account"))
      }
    } catch (error) {
      setError(language === "ar" ? "حدث خطأ غير متوقع" : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignup = async (provider: "google" | "github") => {
    try {
      setIsLoading(true)
      if (!isSupabaseConfigured) {
        setError(language === "ar" ? "المصادقة غير مُهيأة" : "Authentication is not configured")
        return
      }
      const supabase = getSupabaseClient()
      if (!supabase) {
        setError(language === "ar" ? "المصادقة غير مُهيأة" : "Authentication is not configured")
        return
      }
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect=/dashboard`,
        },
      })

      if (error) {
        setError(error.message)
      }
    } catch (error) {
      setError(language === "ar" ? "حدث خطأ في التسجيل" : "Signup error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4"
      dir={languages[language].dir}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              {language === "ar" ? "إنشاء حساب جديد" : "Create Your Account"}
            </CardTitle>
            <p className="text-blue-100">
              {language === "ar"
                ? "ابدأ رحلتك في إنشاء المواقع بالذكاء الاصطناعي"
                : "Start your AI website building journey"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= 1 ? "bg-blue-600 text-white" : "bg-white/20 text-blue-200"
                  }`}
                >
                  1
                </div>
                <div className={`w-16 h-1 ${step >= 2 ? "bg-blue-600" : "bg-white/20"}`}></div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= 2 ? "bg-blue-600 text-white" : "bg-white/20 text-blue-200"
                  }`}
                >
                  2
                </div>
              </div>
            </div>

            {error && (
              <Alert className="bg-red-500/10 border-red-500/20 text-red-100">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-500/10 border-green-500/20 text-green-100">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleNextStep()
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100">
                      {language === "ar" ? "الاسم الكامل" : "Full Name"}
                    </label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                        className={`pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400 ${
                          validationErrors.name ? "border-red-400" : ""
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {validationErrors.name && <p className="text-red-300 text-sm">{validationErrors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100">
                      {language === "ar" ? "البريد الإلكتروني" : "Email Address"}
                    </label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                        className={`pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400 ${
                          validationErrors.email ? "border-red-400" : ""
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {validationErrors.email && <p className="text-red-300 text-sm">{validationErrors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-100">
                    {language === "ar" ? "كلمة المرور" : "Password"}
                  </label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder={language === "ar" ? "أدخل كلمة مرور قوية" : "Enter a strong password"}
                      className={`pr-10 pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400 ${
                        validationErrors.password ? "border-red-400" : ""
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-100 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex space-x-1 rtl:space-x-reverse">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-2 flex-1 rounded ${
                              passwordStrength >= level
                                ? passwordStrength <= 2
                                  ? "bg-red-500"
                                  : passwordStrength <= 3
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                : "bg-white/20"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-blue-200">
                        {language === "ar" ? "قوة كلمة المرور: " : "Password strength: "}
                        {passwordStrength <= 2 && (language === "ar" ? "ضعيفة" : "Weak")}
                        {passwordStrength === 3 && (language === "ar" ? "متوسطة" : "Medium")}
                        {passwordStrength >= 4 && (language === "ar" ? "قوية" : "Strong")}
                      </p>
                    </div>
                  )}

                  {validationErrors.password && <p className="text-red-300 text-sm">{validationErrors.password}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-100">
                    {language === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
                  </label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder={language === "ar" ? "أعد إدخال كلمة المرور" : "Re-enter your password"}
                      className={`pr-10 pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400 ${
                        validationErrors.confirmPassword ? "border-red-400" : ""
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-100 transition-colors"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="text-red-300 text-sm">{validationErrors.confirmPassword}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center justify-center">
                    {language === "ar" ? "التالي" : "Next"}
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </div>
                </Button>

                <div className="relative">
                  <Separator className="bg-white/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-slate-900 px-4 text-blue-200 text-sm">{language === "ar" ? "أو" : "or"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialSignup("google")}
                    disabled={isLoading}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <Chrome className="w-5 h-5 mr-2" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialSignup("github")}
                    disabled={isLoading}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {language === "ar" ? "اختر خطتك" : "Choose Your Plan"}
                  </h3>
                  <p className="text-blue-200">
                    {language === "ar" ? "يمكنك تغيير الخطة لاحقاً" : "You can change your plan later"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        formData.plan === plan.id
                          ? "bg-white/20 border-blue-400 shadow-lg"
                          : "bg-white/10 border-white/20 hover:bg-white/15"
                      } ${plan.popular ? "ring-2 ring-blue-400" : ""}`}
                      onClick={() => setFormData((prev) => ({ ...prev, plan: plan.id as any }))}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                            {language === "ar" ? "الأكثر شعبية" : "Most Popular"}
                          </Badge>
                        </div>
                      )}

                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                        >
                          <plan.icon className="w-8 h-8 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{plan.name[language]}</h3>

                        <p className="text-2xl font-bold text-blue-300 mb-2">{plan.price[language]}</p>

                        <p className="text-blue-200 text-sm mb-4">{plan.description[language]}</p>

                        <ul className="space-y-2 text-sm text-blue-100">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                              {feature[language]}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex space-x-4 rtl:space-x-reverse">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    {language === "ar" ? "السابق" : "Previous"}
                  </Button>

                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        {language === "ar" ? "جاري إنشاء الحساب..." : "Creating account..."}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        {language === "ar" ? "إنشاء الحساب" : "Create Account"}
                        <ArrowRight className="w-5 h-5 mr-2" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center">
              <p className="text-blue-200">
                {language === "ar" ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
                <Link href="/login" className="text-blue-300 hover:text-blue-100 font-semibold transition-colors">
                  {language === "ar" ? "تسجيل الدخول" : "Sign in"}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
