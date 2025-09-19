"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setOpen((v) => !v)} className="flex items-center gap-2">
        {theme === "dark" ? <Moon className="w-4 h-4" /> : theme === "light" ? <Sun className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
        <span className="text-sm capitalize">{theme || "system"}</span>
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg border bg-white shadow z-50 dark:bg-slate-800 dark:border-slate-700">
          <button
            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 ${theme === "light" ? "font-semibold" : ""}`}
            onClick={() => {
              setTheme("light")
              setOpen(false)
            }}
          >
            Light
          </button>
          <button
            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 ${theme === "dark" ? "font-semibold" : ""}`}
            onClick={() => {
              setTheme("dark")
              setOpen(false)
            }}
          >
            Dark
          </button>
          <button
            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 ${!theme || theme === "system" ? "font-semibold" : ""}`}
            onClick={() => {
              setTheme("system")
              setOpen(false)
            }}
          >
            System
          </button>
        </div>
      )}
      {open && <div className="fixed inset-0" onClick={() => setOpen(false)} />}
    </div>
  )
}
