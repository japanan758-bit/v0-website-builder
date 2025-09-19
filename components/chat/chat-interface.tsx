"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, Zap, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TypingIndicator } from "./typing-indicator"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  typing?: boolean
}

interface ChatInterfaceProps {
  className?: string
  onGenerate?: (description: string) => void
}

const examplePrompts = [
  {
    icon: <Globe className="w-4 h-4" />,
    text: "Create a modern restaurant website with online ordering",
    arabic: "أنشئ موقع مطعم حديث مع نظام طلبات أونلاين",
  },
  {
    icon: <Sparkles className="w-4 h-4" />,
    text: "Build an e-commerce store for handmade jewelry",
    arabic: "أنشئ متجر إلكتروني للمجوهرات المصنوعة يدوياً",
  },
  {
    icon: <Zap className="w-4 h-4" />,
    text: "Design a portfolio website for a photographer",
    arabic: "صمم موقع معرض أعمال لمصور فوتوغرافي",
  },
]

export function ChatInterface({ className, onGenerate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI website builder. Describe your project and I'll create a stunning website for you in minutes. What would you like to build today?",
      sender: "assistant",
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

  const handleSend = async () => {
    if (!inputValue.trim() || isGenerating) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Perfect! I understand your vision. Let me start creating your website right away. This will take just a few moments...",
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentMessage])
      setIsTyping(false)

      // Start generation process
      setTimeout(() => {
        setIsGenerating(true)
        onGenerate?.(currentInput)
      }, 1000)
    }, 1500)
  }

  const handleExampleClick = (prompt: string) => {
    setInputValue(prompt)
    textareaRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={`flex flex-col h-full max-w-4xl mx-auto ${className}`}>
      {/* Chat Header */}
      <CardHeader className="flex flex-row items-center space-y-0 pb-6 border-b">
        <div className="flex items-center space-x-4 flex-1">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <Bot className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-semibold gradient-text">Chat2Site AI</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Ready to build</span>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start space-x-3 max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  {message.sender === "assistant" ? (
                    <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-muted">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted text-muted-foreground rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <TypingIndicator />
          </motion.div>
        )}

        {isGenerating && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
            <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="flex items-center space-x-3">
                <LoadingSpinner size="md" />
                <div>
                  <p className="font-medium">Generating your website...</p>
                  <p className="text-sm text-muted-foreground">This may take a few moments</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      {/* Example Prompts */}
      {messages.length === 1 && !isTyping && (
        <div className="px-6 pb-4">
          <p className="text-sm text-muted-foreground mb-3">Try these examples:</p>
          <div className="grid gap-2">
            {examplePrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto p-3 text-left hover:bg-accent/50 bg-transparent"
                onClick={() => handleExampleClick(prompt.text)}
              >
                <div className="flex items-center space-x-3">
                  {prompt.icon}
                  <span className="text-sm">{prompt.text}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t p-6">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your website idea... (e.g., 'Create a modern restaurant website with online ordering')"
              className="min-h-[60px] max-h-[120px] resize-none pr-12"
              disabled={isGenerating}
            />
          </div>
          <Button
            onClick={handleSend}
            size="lg"
            className="px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            disabled={!inputValue.trim() || isGenerating}
          >
            {isGenerating ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
