"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowRight, ArrowLeft, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/use-auth"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const { language } = useTranslation()

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [emailSent, setEmailSent] = useState(false)

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError(language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError(language === "ar" ? "البريد الإلكتروني غير صحيح" : "Invalid email format")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await resetPassword(email)

      if (result.success) {
        setSuccess(
          language === "ar"
            ? "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني"
            : "Password reset link sent to your email",
        )
        setEmailSent(true)
      } else {
        setError(result.error || (language === "ar" ? "فشل في إرسال رابط إعادة التعيين" : "Failed to send reset link"))
      }
    } catch (error) {
      setError(language === "ar" ? "حدث خطأ غير متوقع" : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
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
              <Mail className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              {language === "ar" ? "نسيت كلمة المرور؟" : "Forgot Password?"}
            </CardTitle>
            <p className="text-blue-100">
              {emailSent
                ? language === "ar"
                  ? "تحقق من بريدك الإلكتروني"
                  : "Check your email"
                : language === "ar"
                  ? "أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور"
                  : "Enter your email to reset your password"}
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

            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-100">
                    {language === "ar" ? "البريد الإلكتروني" : "Email Address"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                      className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      {language === "ar" ? "جاري الإرسال..." : "Sending..."}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      {language === "ar" ? "إرسال رابط إعادة التعيين" : "Send Reset Link"}
                      <ArrowRight className="w-5 h-5 mr-2" />
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {language === "ar" ? "تم إرسال البريد!" : "Email Sent!"}
                  </h3>
                  <p className="text-blue-200 mb-4">
                    {language === "ar"
                      ? "تحقق من صندوق الوارد الخاص بك واتبع التعليمات لإعادة تعيين كلمة المرور."
                      : "Check your inbox and follow the instructions to reset your password."}
                  </p>
                  <p className="text-sm text-blue-300">
                    {language === "ar"
                      ? "لم تتلق البريد؟ تحقق من مجلد الرسائل غير المرغوب فيها."
                      : "Didn't receive the email? Check your spam folder."}
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setEmailSent(false)
                    setEmail("")
                    setError("")
                    setSuccess("")
                  }}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {language === "ar" ? "إرسال مرة أخرى" : "Send Again"}
                </Button>
              </div>
            )}

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-blue-300 hover:text-blue-100 font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                {language === "ar" ? "العودة لتسجيل الدخول" : "Back to Login"}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
