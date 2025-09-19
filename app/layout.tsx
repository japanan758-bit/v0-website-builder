import type React from "react"
import type { Metadata } from "next"
import { Inter, Fira_Code, Noto_Sans_Arabic } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  weight: ["400", "500", "600", "700"],
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-sans-arabic",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Chat2Site - إنشاء المواقع بالدردشة | Create Websites by Chatting",
  description:
    "Create stunning websites by simply chatting with our AI. No coding required. أنشئ مواقع رائعة بمجرد الدردشة مع الذكاء الاصطناعي. لا حاجة للبرمجة.",
  keywords: [
    "AI",
    "website builder",
    "chat",
    "artificial intelligence",
    "web design",
    "منشئ مواقع",
    "ذكاء اصطناعي",
    "دردشة",
  ],
  authors: [{ name: "Chat2Site Team" }],
  creator: "Chat2Site",
  publisher: "Chat2Site",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "ar-SA": "/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Chat2Site - Create Websites by Chatting with AI",
    description: "Create stunning websites by simply chatting with our AI. No coding required.",
    siteName: "Chat2Site",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chat2Site - Create Websites by Chatting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chat2Site - Create Websites by Chatting with AI",
    description: "Create stunning websites by simply chatting with our AI. No coding required.",
    images: ["/og-image.jpg"],
    creator: "@chat2site",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  generator: "Chat2Site",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} ${notoSansArabic.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
