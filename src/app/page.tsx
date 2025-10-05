"use client"

import * as React from "react"
import { Layout } from "@/components/layout/layout"
import { ChatInterface } from "@/components/chat/chat-interface"

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

export default function ChatPage() {
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

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
      
      // Enhanced fallback response with helpful information
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I apologize, but I'm having trouble connecting to the backend service right now. This might be because the RAG API server isn't running on localhost:8000. 

For now, I can provide general assistance, but for full functionality, please ensure the backend API is running. 

Your message: "${message}" has been received and I'm ready to help once the connection is restored.`,
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
      <div className="h-full flex flex-col">
        {/* Simple Chat Interface */}
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
