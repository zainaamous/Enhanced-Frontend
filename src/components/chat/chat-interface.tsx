"use client"

import * as React from "react"
import { MessageComponent } from "./message"
import { ChatInput } from "./chat-input"
import { ConversationContext } from "./conversation-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  Bot,
  User,
  Plus,
  MoreHorizontal,
  Star,
  Trash2,
  Download,
  Share,
  Settings,
  History,
  Zap,
  FileText,
  Search,
  TrendingUp,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isTyping?: boolean
  status?: "sending" | "sent" | "delivered" | "error"
  threadId?: string
  parentId?: string
  toolsUsed?: string[]
  processingSteps?: {
    step: string
    status: "pending" | "processing" | "completed" | "error"
    timestamp: Date
  }[]
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
  summary?: string
  threadId?: string
  tags?: string[]
  context?: {
    documentsUsed: string[]
    previousQueries: string[]
    userPreferences?: Record<string, any>
  }
}

interface ChatInterfaceProps {
  conversation?: Conversation
  onSendMessage: (message: string, attachments?: File[]) => void
  onNewConversation: () => void
  onDeleteConversation?: (conversationId: string) => void
  onPinConversation?: (conversationId: string) => void
  onExportConversation?: (conversationId: string) => void
  onShareConversation?: (conversationId: string) => void
  isTyping?: boolean
  className?: string
}

export function ChatInterface({
  conversation,
  onSendMessage,
  onNewConversation,
  onDeleteConversation,
  onPinConversation,
  onExportConversation,
  onShareConversation,
  isTyping = false,
  className
}: ChatInterfaceProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation?.messages])

  const handleMessageAction = (action: string, messageId: string, data?: any) => {
    switch (action) {
      case "copy":
        console.log("Message copied:", messageId)
        break
      case "like":
        console.log("Message liked:", messageId)
        break
      case "dislike":
        console.log("Message disliked:", messageId)
        break
      case "regenerate":
        console.log("Regenerating message:", messageId)
        break
      case "showSources":
        console.log("Showing sources:", data)
        break
    }
  }

  const handleFileUpload = (files: File[]) => {
    console.log("Files uploaded:", files)
    // Process file uploads
  }

  const handleVoiceInput = () => {
    console.log("Voice input activated")
    // Handle voice input
  }

  if (!conversation) {
    return (
      <div className={cn("flex flex-col h-full bg-white dark:bg-slate-900", className)}>
        {/* Fresh ChatGPT-like Welcome */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Simple, clean header */}
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold text-slate-900 dark:text-slate-100">
                How can I help you today?
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                I&apos;m YOUMNA AI, your intelligent executive assistant. I can help with research, analysis, document processing, and strategic insights.
              </p>
            </div>

            {/* Simple example prompts like ChatGPT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
              <button
                className="p-4 text-left border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 group"
              onClick={() => onSendMessage("Analyze the Q4 financial report and provide key insights")}
            >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">Financial Analysis</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Analyze reports and extract key insights</p>
                  </div>
                </div>
              </button>

              <button
                className="p-4 text-left border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 group"
              onClick={() => onSendMessage("Summarize the latest team meeting notes and create action items")}
            >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">Meeting Summary</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Summarize meetings and extract action items</p>
                  </div>
                </div>
              </button>

              <button
                className="p-4 text-left border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 group"
              onClick={() => onSendMessage("Research the latest trends in artificial intelligence and machine learning")}
            >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Search className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">Research</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Research topics and industry trends</p>
                  </div>
                </div>
              </button>

              <button
                className="p-4 text-left border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 group"
              onClick={() => onSendMessage("Create a strategic plan for Q1 2024 based on our current data")}
            >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">Strategic Planning</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Create strategic plans and roadmaps</p>
              </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <ChatInput
          onSendMessage={onSendMessage}
          onFileUpload={handleFileUpload}
          onVoiceInput={handleVoiceInput}
          isTyping={isTyping}
          placeholder="Message YOUMNA AI..."
        />
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Enhanced Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">{conversation.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              {conversation.messages.length} messages • 
              <Clock className="h-3 w-3 ml-2 mr-1" />
              Updated {conversation.updatedAt.toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {conversation.isPinned && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Pinned
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPinConversation?.(conversation.id)}
            className="hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
          >
            <Star className={`h-4 w-4 ${conversation.isPinned ? 'fill-current text-yellow-500' : ''}`} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onExportConversation?.(conversation.id)}
            className="hover:bg-blue-100 dark:hover:bg-blue-900/20"
          >
            <Download className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onShareConversation?.(conversation.id)}
            className="hover:bg-green-100 dark:hover:bg-green-900/20"
          >
            <Share className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteConversation?.(conversation.id)}
            className="hover:bg-red-100 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-slate-100 dark:hover:bg-slate-800/50"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Enhanced Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-800">
        {conversation.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground p-8">
            <div className="text-center space-y-6 max-w-md">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center mx-auto">
                <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No messages yet</h3>
                <p className="text-slate-600 dark:text-slate-400">Start the conversation by typing a message below!</p>
              </div>
              
              {/* Conversation Context if available */}
              {(conversation.context || conversation.tags) && (
                <div className="mt-6">
                  <ConversationContext 
                    context={conversation.context}
                    tags={conversation.tags}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-1 p-4">
            {/* Show conversation context at the top */}
            {(conversation.context || conversation.tags) && conversation.messages.length > 0 && (
              <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-4">
                <ConversationContext 
                  context={conversation.context}
                  tags={conversation.tags}
                />
              </div>
            )}

            {conversation.messages.map((message, index) => (
              <div key={message.id}>
                <MessageComponent
                  message={message}
                  onCopy={(content) => handleMessageAction("copy", message.id, content)}
                  onLike={(id) => handleMessageAction("like", id)}
                  onDislike={(id) => handleMessageAction("dislike", id)}
                  onRegenerate={(id) => handleMessageAction("regenerate", id)}
                  onShowSources={(sources) => handleMessageAction("showSources", message.id, sources)}
                />
              </div>
            ))}
            
            {/* Enhanced Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-3 p-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">YOUMNA AI is thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={onSendMessage}
        onFileUpload={handleFileUpload}
        onVoiceInput={handleVoiceInput}
        isTyping={isTyping}
        placeholder="Continue the conversation..."
      />
    </div>
  )
}
