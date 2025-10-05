"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  FileText, 
  Search, 
  Tag, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ConversationContextProps {
  context?: {
    documentsUsed: string[]
    previousQueries: string[]
    userPreferences?: Record<string, any>
  }
  tags?: string[]
  className?: string
}

export function ConversationContext({ context, tags, className }: ConversationContextProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  if (!context && (!tags || tags.length === 0)) {
    return null
  }

  const hasContent = 
    (context?.documentsUsed && context.documentsUsed.length > 0) ||
    (context?.previousQueries && context.previousQueries.length > 0) ||
    (tags && tags.length > 0)

  if (!hasContent) {
    return null
  }

  return (
    <Card className={cn("rounded-lg border-primary/20 bg-primary/5", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-foreground flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Conversation Context</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 px-2"
          >
            {isExpanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4 pt-0">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground">
                <Tag className="h-3 w-3" />
                <span>Topics</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Documents Used */}
          {context?.documentsUsed && context.documentsUsed.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground">
                <FileText className="h-3 w-3" />
                <span>Documents Referenced</span>
              </div>
              <div className="space-y-1">
                {context.documentsUsed.slice(0, 5).map((doc, index) => (
                  <div
                    key={index}
                    className="text-xs text-foreground truncate px-2 py-1 rounded-sm bg-card border border-border"
                  >
                    {doc}
                  </div>
                ))}
                {context.documentsUsed.length > 5 && (
                  <p className="text-xs text-muted-foreground px-2">
                    +{context.documentsUsed.length - 5} more documents
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Previous Queries */}
          {context?.previousQueries && context.previousQueries.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground">
                <Search className="h-3 w-3" />
                <span>Related Queries</span>
              </div>
              <div className="space-y-1">
                {context.previousQueries.slice(0, 3).map((query, index) => (
                  <div
                    key={index}
                    className="text-xs text-foreground italic px-2 py-1 rounded-sm bg-card border border-border"
                  >
                    &ldquo;{query}&rdquo;
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

