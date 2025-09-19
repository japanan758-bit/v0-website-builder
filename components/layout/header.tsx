"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Sparkles, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { useStore } from "@/lib/store"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()
  const { language, setLanguage } = useStore()

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">Chat2Site</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link href="/" className="text-foreground hover:text-accent transition-colors">
              {t("home")}
            </Link>
            <Link href="/generate" className="text-foreground hover:text-accent transition-colors">
              {language === "ar" ? "إنشاء موقع" : "Generate"}
            </Link>
            <Link href="/templates" className="text-foreground hover:text-accent transition-colors">
              {t("templates")}
            </Link>
            <Link href="/pricing" className="text-foreground hover:text-accent transition-colors">
              {t("pricing")}
            </Link>
            <Link href="/about" className="text-foreground hover:text-accent transition-colors">
              {t("about")}
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "ar" ? "EN" : "العربية"}</span>
            </Button>
            <Link href="/generate">
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
              >
                {language === "ar" ? "ابدأ الآن" : "Start Now"}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-accent transition-colors">
                {t("home")}
              </Link>
              <Link href="/generate" className="text-foreground hover:text-accent transition-colors">
                {language === "ar" ? "إنشاء موقع" : "Generate"}
              </Link>
              <Link href="/templates" className="text-foreground hover:text-accent transition-colors">
                {t("templates")}
              </Link>
              <Link href="/pricing" className="text-foreground hover:text-accent transition-colors">
                {t("pricing")}
              </Link>
              <Link href="/about" className="text-foreground hover:text-accent transition-colors">
                {t("about")}
              </Link>
              <div className="flex items-center space-x-4 rtl:space-x-reverse pt-4 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center space-x-1 rtl:space-x-reverse"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === "ar" ? "EN" : "العربية"}</span>
                </Button>
                <Link href="/generate">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                  >
                    {language === "ar" ? "ابدأ الآن" : "Start Now"}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
