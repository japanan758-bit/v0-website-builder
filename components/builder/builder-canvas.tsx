"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"

interface BuilderCanvasProps {
  templateId: string | null
  selectedElement: string | null
  onElementSelect: (elementId: string | null) => void
}

export function BuilderCanvas({ templateId, selectedElement, onElementSelect }: BuilderCanvasProps) {
  const { language } = useTranslation()
  const [zoom, setZoom] = useState(100)

  return (
    <div className="flex-1 bg-gray-100 p-4 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Canvas Container */}
        <div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        >
          {/* Website Preview */}
          <div className="min-h-screen">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                  <span className="font-bold text-xl">Your Website</span>
                </div>
                <nav className="hidden md:flex space-x-6">
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Home
                  </a>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    About
                  </a>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Services
                  </a>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Contact
                  </a>
                </nav>
              </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
              <div className="container mx-auto px-6 text-center">
                <h1 className="text-5xl font-bold mb-6">Welcome to Your Website</h1>
                <p className="text-xl mb-8">Create something amazing with our website builder</p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100">
                  Get Started
                </button>
              </div>
            </section>

            {/* Content Sections */}
            <section className="py-20">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4"></div>
                      <h3 className="text-xl font-semibold mb-2">Feature {item}</h3>
                      <p className="text-gray-600">Description of this amazing feature</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
