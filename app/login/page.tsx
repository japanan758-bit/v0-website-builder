"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github, Chrome, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/use-auth"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"
import { supabase } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, loading } = useAuth()
  const { t, language } = useTranslation()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})

  const redirectTo = searchParams.get("redirect") || "/dashboard"

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!formData.email) {
      errors.email = language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = language === "ar" ? "البريد الإلكتروني غير صحيح" : "Invalid email format"
    }

    if (!formData.password) {
      errors.password = language === "ar" ? "كلمة المرور مطلوبة" : "Password is required"
    } else if (formData.password.length < 6) {
      errors.password =
        language === "ar" ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await login(formData)

      if (result.success) {
        setSuccess(language === "ar" ? "تم تسجيل الدخول بنجاح!" : "Login successful!")
        setTimeout(() => {
          router.push(redirectTo)
        }, 1000)
      } else {
        setError(result.error || (language === "ar" ? "فشل في تسجيل الدخول" : "Login failed"))
      }
    } catch (error) {
      setError(language === "ar" ? "حدث خطأ غير متوقع" : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
        },
      })

      if (error) {
        setError(error.message)
      }
    } catch (error) {
      setError(language === "ar" ? "حدث خطأ في تسجيل الدخول" : "Login error occurred")
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

      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              {language === "ar" ? "تسجيل الدخول" : "Welcome Back"}
            </CardTitle>
            <p className="text-blue-100">
              {language === "ar" ? "سجل دخولك للوصول إلى حسابك" : "Sign in to access your account"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
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

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder={language === "ar" ? "أدخل كلمة المرور" : "Enter your password"}
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
                {validationErrors.password && <p className="text-red-300 text-sm">{validationErrors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-blue-300 hover:text-blue-100 transition-colors">
                  {language === "ar" ? "نسيت كلمة المرور؟" : "Forgot password?"}
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    {language === "ar" ? "جاري تسجيل الدخول..." : "Signing in..."}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    {language === "ar" ? "تسجيل الدخول" : "Sign In"}
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </div>
                )}
              </Button>
            </form>

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
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("github")}
                disabled={isLoading}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>

            <div className="text-center">
              <p className="text-blue-200">
                {language === "ar" ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
                <Link href="/signup" className="text-blue-300 hover:text-blue-100 font-semibold transition-colors">
                  {language === "ar" ? "إنشاء حساب" : "Sign up"}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
