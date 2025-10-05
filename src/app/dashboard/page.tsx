"use client"

import * as React from "react"

export const dynamic = 'force-dynamic'
import { Layout } from "@/components/layout/layout"
import { ChatInterface } from "@/components/chat/chat-interface"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Bot, 
  Sparkles, 
  Zap, 
  MessageSquare, 
  FileText, 
  Search, 
  TrendingUp,
  Brain,
  Shield,
  Clock,
  Star
} from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isTyping?: boolean
  status?: "sending" | "sent" | "delivered" | "error"
  metadata?: {
    sources?: string[]
    confidence?: number
    tokens?: number
    searchQuery?: string
    documentsRetrieved?: number
  }
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  isPinned?: boolean
}

export default function DashboardPage() {
  const [conversation, setConversation] = React.useState<Conversation | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isTyping, setIsTyping] = React.useState(false)

  const handleSendMessage = async (message: string, attachments?: File[]) => {
    if (!conversation) {
      // Create new conversation
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: message.slice(0, 50) + (message.length > 50 ? "..." : ""),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setConversation(newConversation)
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
      status: "sent"
    }

    setConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, userMessage],
      updatedAt: new Date()
    } : null)

    setIsLoading(true)
    setIsTyping(true)

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // API call to RAG system
    try {
      const response = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: message,
          conversation_id: conversation?.id || undefined,
          stream: false
        })
      })

      const data = await response.json()

      // Add assistant response
      const assistantMessage: Message = {
        id: data.messageId || (Date.now() + 1).toString(),
        content: data.response || data.answer || "I'm here to help! This is a simulated response. The actual RAG system integration will provide intelligent responses based on your knowledge base.",
        role: "assistant",
        timestamp: new Date(),
        status: "delivered",
        metadata: data.metadata || data.sources
      }

      setConversation(prev => prev ? {
        ...prev,
        id: data.conversationId || prev.id,
        messages: [...prev.messages, assistantMessage],
        updatedAt: new Date()
      } : {
        id: data.conversationId || Date.now().toString(),
        title: message.slice(0, 50) + (message.length > 50 ? "..." : ""),
        messages: [userMessage, assistantMessage],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Fallback response
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        role: "assistant",
        timestamp: new Date(),
        status: "error"
      }

      setConversation(prev => prev ? {
        ...prev,
        messages: [...prev.messages, errorMessage],
        updatedAt: new Date()
      } : {
        id: Date.now().toString(),
        title: message.slice(0, 50) + (message.length > 50 ? "..." : ""),
        messages: [userMessage, errorMessage],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const handleNewConversation = () => {
    setConversation(null)
  }

  const handleDeleteConversation = (conversationId: string) => {
    if (conversation?.id === conversationId) {
      setConversation(null)
    }
  }

  const handlePinConversation = (conversationId: string) => {
    setConversation(prev => prev && prev.id === conversationId ? {
      ...prev,
      isPinned: !prev.isPinned
    } : prev)
  }

  const handleExportConversation = (conversationId: string) => {
    console.log("Exporting conversation:", conversationId)
    // Implement export functionality
  }

  const handleShareConversation = (conversationId: string) => {
    console.log("Sharing conversation:", conversationId)
    // Implement share functionality
  }

  return (
    <Layout>
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Enhanced ChatGPT-like Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                <Bot className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                YOUMNA AI
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                Your intelligent executive assistant
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Online
            </Badge>
            <Button
              onClick={handleNewConversation}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-800"
            >
              <Plus className="h-4 w-4" />
              <span>New chat</span>
            </Button>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 overflow-hidden">
          <ChatInterface
            conversation={conversation || undefined}
            onSendMessage={handleSendMessage}
            onNewConversation={handleNewConversation}
            onDeleteConversation={handleDeleteConversation}
            onPinConversation={handlePinConversation}
            onExportConversation={handleExportConversation}
            onShareConversation={handleShareConversation}
            isTyping={isTyping}
            className="h-full"
          />
        </div>
      </div>
    </Layout>
  )
}
