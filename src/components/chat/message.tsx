"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProcessingIndicator } from "./processing-indicator"
import {
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  MoreHorizontal,
  Bot,
  User,
  Clock,
  Check,
  CheckCheck
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

interface MessageProps {
  message: Message
  onCopy?: (content: string) => void
  onLike?: (messageId: string) => void
  onDislike?: (messageId: string) => void
  onRegenerate?: (messageId: string) => void
  onShowSources?: (sources: string[]) => void
}

export function MessageComponent({
  message,
  onCopy,
  onLike,
  onDislike,
  onRegenerate,
  onShowSources
}: MessageProps) {
  const [showActions, setShowActions] = React.useState(false)
  const [isCopied, setIsCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setIsCopied(true)
      onCopy?.(message.content)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const getStatusIcon = (status?: Message["status"]) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-muted-foreground" />
      case "sent":
        return <Check className="h-3 w-3 text-muted-foreground" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-green-500" />
      case "error":
        return <div className="h-3 w-3 rounded-full bg-red-500" />
      default:
        return null
    }
  }

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return "default"
    if (confidence >= 0.8) return "default"
    if (confidence >= 0.6) return "secondary"
    return "destructive"
  }

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div
      className={cn(
        "group flex items-start space-x-3 px-4 py-3 hover:bg-accent/50 transition-colors duration-150",
        message.role === "assistant" ? "bg-muted/30" : ""
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {message.role === "assistant" ? (
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
        ) : (
          <Avatar className="w-8 h-8">
            <AvatarImage src="/avatars/user.jpg" alt="User" />
            <AvatarFallback className="bg-primary text-white text-sm">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
            {message.role === "assistant" ? "YOUMNA AI" : "You"}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {formatTimestamp(message.timestamp)}
          </span>
          {message.metadata?.confidence && (
            <Badge 
              variant={getConfidenceColor(message.metadata.confidence)}
              className="text-xs font-medium"
            >
              {Math.round(message.metadata.confidence * 100)}%
            </Badge>
          )}
          {getStatusIcon(message.status)}
        </div>

        {/* Message Text */}
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {message.isTyping ? (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
              <span className="text-sm">YOUMNA is thinking...</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {message.content}
            </div>
          )}
        </div>

        {/* Processing Steps */}
        {message.processingSteps && message.processingSteps.length > 0 && (
          <ProcessingIndicator 
            steps={message.processingSteps} 
            toolsUsed={message.toolsUsed}
          />
        )}

        {/* Search Query Info */}
        {message.metadata?.searchQuery && (
          <div className="mt-3 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold">Search query:</span> &ldquo;{message.metadata.searchQuery}&rdquo;
              {message.metadata.documentsRetrieved && (
                <span className="ml-2">• {message.metadata.documentsRetrieved} documents retrieved</span>
              )}
            </p>
          </div>
        )}

        {/* Sources */}
        {message.metadata?.sources && message.metadata.sources.length > 0 && (
          <div className="space-y-2 mt-3">
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">Sources:</div>
            <div className="flex flex-wrap gap-2">
              {message.metadata.sources.map((source, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200"
                  onClick={() => onShowSources?.(message.metadata?.sources || [])}
                >
                  {source}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && !message.isTyping && (
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              onClick={handleCopy}
            >
              {isCopied ? (
                <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
              ) : (
                <Copy className="h-3.5 w-3.5 mr-1.5" />
              )}
              <span className="text-xs">{isCopied ? "Copied" : "Copy"}</span>
            </Button>
            
            {message.role === "assistant" && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 rounded-lg hover:bg-green-100 dark:hover:bg-green-950 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  onClick={() => onLike?.(message.id)}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  onClick={() => onDislike?.(message.id)}
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => onRegenerate?.(message.id)}
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                  <span className="text-xs">Retry</span>
                </Button>
              </>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}

        {/* Metadata */}
        {message.metadata?.tokens && (
          <div className="text-xs text-muted-foreground">
            {message.metadata.tokens} tokens
          </div>
        )}
      </div>
    </div>
  )
}
