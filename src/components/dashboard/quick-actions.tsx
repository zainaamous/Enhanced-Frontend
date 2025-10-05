"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Plus,
  Upload,
  Search,
  MessageSquare,
  Database,
  Zap,
  FileText,
  Link,
  Mic,
  Camera
} from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickActionProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  onClick: () => void
  variant?: "default" | "secondary" | "outline"
  className?: string
}

export function QuickAction({
  icon: Icon,
  title,
  description,
  onClick,
  variant = "outline",
  className
}: QuickActionProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        "h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-all",
        className
      )}
      onClick={onClick}
    >
      <Icon className="h-6 w-6 mb-2" />
      <div className="text-left">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </Button>
  )
}

interface QuickActionsProps {
  className?: string
}

export function QuickActions({ className }: QuickActionsProps) {
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleNewConversation = () => {
    console.log("Starting new conversation")
  }

  const handleUploadDocument = () => {
    console.log("Opening document upload")
  }

  const handleQuickSearch = () => {
    if (searchQuery.trim()) {
      console.log("Performing quick search:", searchQuery)
    }
  }

  const handleVoiceInput = () => {
    console.log("Starting voice input")
  }

  const handleLinkAnalysis = () => {
    console.log("Opening link analysis")
  }

  const actions = [
    {
      icon: MessageSquare,
      title: "New Conversation",
      description: "Start chatting with YOUMNA AI",
      onClick: handleNewConversation,
      variant: "default" as const,
      className: "youmna-gradient text-white hover:opacity-90"
    },
    {
      icon: Upload,
      title: "Upload Document",
      description: "Add files to knowledge base",
      onClick: handleUploadDocument,
      variant: "outline" as const
    },
    {
      icon: Mic,
      title: "Voice Input",
      description: "Speak your query",
      onClick: handleVoiceInput,
      variant: "outline" as const
    },
    {
      icon: Link,
      title: "Analyze Link",
      description: "Extract content from URL",
      onClick: handleLinkAnalysis,
      variant: "outline" as const
    }
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Quick Search</label>
          <div className="flex space-x-2">
            <Input
              placeholder="Ask YOUMNA AI anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleQuickSearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleQuickSearch}
              disabled={!searchQuery.trim()}
              className="youmna-gradient text-white"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <QuickAction key={index} {...action} />
          ))}
        </div>

        {/* Recent Documents */}
        <div className="space-y-2 pt-4 border-t">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Recent Documents</h4>
            <Button variant="ghost" size="sm" className="text-xs">
              View All
            </Button>
          </div>
          <div className="space-y-2">
            {[
              { name: "Q4 Report.pdf", size: "2.3 MB", time: "5 min ago" },
              { name: "Meeting Notes.docx", size: "156 KB", time: "1 hour ago" },
              { name: "Research Data.xlsx", size: "1.8 MB", time: "2 hours ago" }
            ].map((doc, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent transition-colors">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.size} • {doc.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
