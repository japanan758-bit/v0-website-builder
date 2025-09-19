"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, Zap, MessageSquare, Globe, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useTranslation } from "@/hooks/use-translation"
import { languages } from "@/lib/i18n"

interface Message {
  id: string
  content: string
  sender: "user" | "agent"
  timestamp: Date
  typing?: boolean
}

export default function GeneratePage() {
  const { t, language } = useTranslation()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        language === "ar"
          ? "مرحباً! أنا مساعدك الذكي في Chat2Site. أخبرني عن فكرة موقعك وسأقوم بإنشائه لك في دقائق معدودة. ما نوع الموقع الذي تريد إنشاءه؟"
          : "Hello! I'm your AI assistant at Chat2Site. Tell me about your website idea and I'll create it for you in minutes. What type of website would you like to create?",
      sender: "agent",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const examplePrompts = [
    {
      ar: "أريد إنشاء موقع لمطعم عربي تقليدي مع نظام حجز طاولات",
      en: "I want to create a website for a traditional Arabic restaurant with table booking",
    },
    {
      ar: "متجر إلكتروني لبيع الملابس النسائية العصرية",
      en: "E-commerce store for selling modern women's clothing",
    },
    {
      ar: "موقع شركة تقنية متخصصة في تطوير التطبيقات",
      en: "Tech company website specializing in app development",
    },
    {
      ar: "مدونة شخصية للكتابة عن السفر والطبخ",
      en: "Personal blog for writing about travel and cooking",
    },
  ]

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAgentResponse(inputValue),
        sender: "agent",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentMessage])
      setIsTyping(false)

      // Check if we should start generation
      if (shouldStartGeneration(inputValue)) {
        setTimeout(() => {
          setIsGenerating(true)
          simulateGeneration()
        }, 2000)
      }
    }, 1500)
  }

  const shouldStartGeneration = (input: string): boolean => {
    const keywords =
      language === "ar"
        ? ["نعم", "ابدأ", "موافق", "أريد", "إنشاء", "تصميم"]
        : ["yes", "start", "create", "generate", "build", "design"]

    return keywords.some((keyword) => input.toLowerCase().includes(keyword.toLowerCase()))
  }

  const simulateGeneration = () => {
    const steps =
      language === "ar"
        ? [
            "🎨 تحليل متطلباتك...",
            "🏗️ إنشاء هيكل الموقع...",
            "🎨 تصميم الواجهات...",
            "📝 إنشاء المحتوى...",
            "🚀 تجهيز الموقع للنشر...",
            "✅ تم إنشاء موقعك بنجاح!",
          ]
        : [
            "🎨 Analyzing your requirements...",
            "🏗️ Creating website structure...",
            "🎨 Designing interfaces...",
            "📝 Generating content...",
            "🚀 Preparing for deployment...",
            "✅ Your website is ready!",
          ]

    steps.forEach((step, index) => {
      setTimeout(
        () => {
          const stepMessage: Message = {
            id: `step-${index}`,
            content: step,
            sender: "agent",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, stepMessage])

          if (index === steps.length - 1) {
            setTimeout(() => {
              const finalMessage: Message = {
                id: "final",
                content:
                  language === "ar"
                    ? "🎉 رائع! تم إنشاء موقعك بنجاح. يمكنك الآن معاينته أو تخصيصه أكثر. هل تريد رؤية النتيجة؟"
                    : "🎉 Amazing! Your website has been created successfully. You can now preview it or customize it further. Would you like to see the result?",
                sender: "agent",
                timestamp: new Date(),
              }
              setMessages((prev) => [...prev, finalMessage])
              setIsGenerating(false)
            }, 1000)
          }
        },
        (index + 1) * 2000,
      )
    })
  }

  const getAgentResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (language === "ar") {
      if (input.includes("مطعم")) {
        return "ممتاز! سأقوم بإنشاء موقع مطعم احترافي لك. سيتضمن الموقع قائمة الطعام، نظام حجز الطاولات، معرض الصور، ومعلومات التواصل. هل تريد إضافة نظام طلبات أونلاين أيضاً؟"
      }
      if (input.includes("متجر") || input.includes("تسوق")) {
        return "رائع! سأصمم لك متجر إلكتروني متكامل مع عربة التسوق، نظام الدفع، إدارة المنتجات، وتتبع الطلبات. ما نوع المنتجات التي تريد بيعها؟"
      }
      if (input.includes("شركة") || input.includes("أعمال")) {
        return "سأقوم بإنشاء موقع شركة احترافي يتضمن صفحة رئيسية جذابة، عن الشركة، الخدمات، فريق العمل، ونموذج تواصل. هل تريد إضافة مدونة أو قسم للأخبار؟"
      }
      if (input.includes("مدونة")) {
        return "سأصمم لك مدونة شخصية أنيقة مع نظام إدارة المقالات، التعليقات، الفئات، والبحث. هل تريد ربطها بوسائل التواصل الاجتماعي؟"
      }
      return "شكراً لك! بناءً على وصفك، سأقوم بتحليل متطلباتك وإنشاء موقع مخصص لك. هل أنت مستعد لبدء عملية الإنشاء؟"
    } else {
      if (input.includes("restaurant")) {
        return "Excellent! I'll create a professional restaurant website for you. It will include a menu, table booking system, photo gallery, and contact information. Would you like to add an online ordering system as well?"
      }
      if (input.includes("store") || input.includes("shop") || input.includes("ecommerce")) {
        return "Great! I'll design a complete e-commerce store with shopping cart, payment system, product management, and order tracking. What type of products do you want to sell?"
      }
      if (input.includes("company") || input.includes("business")) {
        return "I'll create a professional company website including an attractive homepage, about us, services, team section, and contact form. Would you like to add a blog or news section?"
      }
      if (input.includes("blog")) {
        return "I'll design an elegant personal blog with article management, comments, categories, and search functionality. Would you like to integrate it with social media?"
      }
      return "Thank you! Based on your description, I'll analyze your requirements and create a custom website for you. Are you ready to start the creation process?"
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleExampleClick = (example: { ar: string; en: string }) => {
    setInputValue(language === "ar" ? example.ar : example.en)
    textareaRef.current?.focus()
  }

  const isRTL = languages[language].dir === "rtl"

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-card to-background"
      dir={languages[language].dir}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl mb-4 pulse-glow">
            <MessageSquare className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{language === "ar" ? "Chat2Site" : "Chat2Site"}</h1>
          <p className="text-lg text-muted-foreground">
            {language === "ar"
              ? "أخبرنا عن فكرة موقعك وسنقوم بإنشائه لك بالذكاء الاصطناعي"
              : "Tell us about your website idea and we'll create it with AI"}
          </p>
        </div>

        {/* Chat Interface */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                    <Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {language === "ar" ? "مساعد Chat2Site الذكي" : "Chat2Site AI Assistant"}
                  </h3>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-green-600">{language === "ar" ? "متصل" : "Online"}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="flex items-center space-x-1 rtl:space-x-reverse text-xs text-muted-foreground">
                  <Sparkles className="w-3 h-3" />
                  <span>{language === "ar" ? "مدعوم بالذكاء الاصطناعي" : "AI Powered"}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-3 rtl:space-x-reverse max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse rtl:flex-row" : ""
                    }`}
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      {message.sender === "agent" ? (
                        <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-tr-sm"
                          : "bg-card text-card-foreground rounded-tl-sm border border-border/50"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString(language === "ar" ? "ar-SA" : "en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-card rounded-2xl rounded-tl-sm px-4 py-3 border border-border/50">
                      <div className="flex space-x-1 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-muted rounded-full animate-bounce typing-indicator" />
                        <div
                          className="w-2 h-2 bg-muted rounded-full animate-bounce typing-indicator"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-muted rounded-full animate-bounce typing-indicator"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 rounded-full">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Zap className="w-4 h-4 animate-pulse" />
                      <span className="text-sm font-medium">
                        {language === "ar" ? "جاري إنشاء موقعك..." : "Creating your website..."}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Example Prompts */}
            {messages.length === 1 && (
              <div className="px-6 pb-4">
                <p className="text-sm text-muted-foreground mb-3">
                  {language === "ar" ? "أو جرب أحد هذه الأمثلة:" : "Or try one of these examples:"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {examplePrompts.map((example, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-xs p-3 h-auto text-left justify-start bg-card/50 hover:bg-card border-border/50"
                      onClick={() => handleExampleClick(example)}
                    >
                      <Sparkles className="w-3 h-3 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
                      <span className="truncate">{language === "ar" ? example.ar : example.en}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-border/50 p-6">
              <div className="flex items-end space-x-3 rtl:space-x-reverse">
                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      language === "ar"
                        ? "اكتب وصف موقعك هنا... مثال: أريد موقع لمطعم عربي مع نظام حجز"
                        : "Describe your website here... Example: I want a restaurant website with booking system"
                    }
                    className={`min-h-[60px] resize-none rounded-xl border-border/50 bg-input/50 ${isRTL ? "text-right" : "text-left"}`}
                    dir={languages[language].dir}
                    disabled={isTyping || isGenerating}
                  />
                </div>
                <Button
                  onClick={handleSend}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-xl px-6 py-3 h-auto btn-glow"
                  disabled={!inputValue.trim() || isTyping || isGenerating}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {language === "ar"
                  ? "اضغط Enter للإرسال • Shift+Enter لسطر جديد"
                  : "Press Enter to send • Shift+Enter for new line"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="text-center p-6 bg-card/50 backdrop-blur-sm border-border/50 hover-lift">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold mb-2">{language === "ar" ? "سريع وذكي" : "Fast & Smart"}</h3>
            <p className="text-sm text-muted-foreground">
              {language === "ar"
                ? "إنشاء المواقع في دقائق معدودة بتقنية الذكاء الاصطناعي"
                : "Create websites in minutes with AI technology"}
            </p>
          </Card>

          <Card className="text-center p-6 bg-card/50 backdrop-blur-sm border-border/50 hover-lift">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold mb-2">{language === "ar" ? "متعدد اللغات" : "Multilingual"}</h3>
            <p className="text-sm text-muted-foreground">
              {language === "ar"
                ? "دعم كامل للغة العربية والإنجليزية مع التخطيط المناسب"
                : "Full Arabic and English support with proper layouts"}
            </p>
          </Card>

          <Card className="text-center p-6 bg-card/50 backdrop-blur-sm border-border/50 hover-lift">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold mb-2">{language === "ar" ? "متجاوب تماماً" : "Fully Responsive"}</h3>
            <p className="text-sm text-muted-foreground">
              {language === "ar"
                ? "مواقع تعمل بشكل مثالي على جميع الأجهزة والشاشات"
                : "Websites that work perfectly on all devices and screens"}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
