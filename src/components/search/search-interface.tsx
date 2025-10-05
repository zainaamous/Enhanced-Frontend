"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  SortAsc,
  Clock,
  FileText,
  MessageSquare,
  Star,
  ThumbsUp,
  Copy,
  ExternalLink,
  Zap,
  Database,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  type: "document" | "conversation" | "chunk"
  title: string
  content: string
  score: number
  source?: string
  timestamp: Date
  metadata?: {
    chunks?: number
    conversationId?: string
    documentId?: string
    author?: string
  }
}

interface SearchInterfaceProps {
  className?: string
}

export function SearchInterface({ className }: SearchInterfaceProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = React.useState(false)
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>(["document", "conversation", "chunk"])
  const [sortBy, setSortBy] = React.useState<"relevance" | "date" | "score">("relevance")

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    
    // Simulate API call
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: "1",
          type: "document",
          title: "Q4 Financial Report.pdf",
          content: "The quarterly financial report shows strong growth in revenue with a 15% increase compared to Q3. Key metrics include...",
          score: 0.95,
          source: "Q4_Report.pdf",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          metadata: {
            chunks: 47,
            documentId: "doc_1",
            author: "Sarah Chen"
          }
        },
        {
          id: "2",
          type: "conversation",
          title: "Project Planning Discussion",
          content: "Based on the documents in our knowledge base, I can see we have several key initiatives underway. Let me analyze the current status...",
          score: 0.87,
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          metadata: {
            conversationId: "conv_1",
            author: "YOUMNA AI"
          }
        },
        {
          id: "3",
          type: "chunk",
          title: "Product Development Roadmap - Phase 2",
          content: "Phase 2 of the product development roadmap focuses on advanced features and market expansion. Key deliverables include...",
          score: 0.82,
          source: "Product_Roadmap.docx",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          metadata: {
            documentId: "doc_2",
            author: "Mike Johnson"
          }
        },
        {
          id: "4",
          type: "conversation",
          title: "Market Research Analysis",
          content: "The market research data indicates significant opportunities in the enterprise segment. Customer feedback suggests...",
          score: 0.78,
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          metadata: {
            conversationId: "conv_2",
            author: "YOUMNA AI"
          }
        }
      ]

      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1500)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const getResultIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />
      case "conversation":
        return <MessageSquare className="h-4 w-4" />
      case "chunk":
        return <Database className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return "bg-green-100 text-green-800"
    if (score >= 0.7) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const handleResultAction = (resultId: string, action: string) => {
    console.log(`Action ${action} on result ${resultId}`)
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Knowledge Search</span>
            <Badge variant="outline" className="ml-auto">
              <Zap className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search across all documents, conversations, and knowledge..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSearching || !searchQuery.trim()}
                className="youmna-gradient text-white"
              >
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by type:</span>
              </div>
              
              {["document", "conversation", "chunk"].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilters.includes(filter) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter(filter)}
                  className="capitalize"
                >
                  {filter}s
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <SortAsc className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Sort by:</span>
              </div>
              
              {[
                { value: "relevance", label: "Relevance" },
                { value: "date", label: "Date" },
                { value: "score", label: "Score" }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(option.value as typeof sortBy)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Search Results</CardTitle>
            <Badge variant="secondary">
              {searchResults.length} results found
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {searchResults
              .filter(result => selectedFilters.includes(result.type))
              .sort((a, b) => {
                switch (sortBy) {
                  case "date":
                    return b.timestamp.getTime() - a.timestamp.getTime()
                  case "score":
                    return b.score - a.score
                  default:
                    return b.score - a.score
                }
              })
              .map((result) => (
                <div
                  key={result.id}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getResultIcon(result.type)}
                      <h3 className="font-medium">{result.title}</h3>
                      <Badge className={cn("text-xs", getScoreColor(result.score))}>
                        {Math.round(result.score * 100)}% match
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleResultAction(result.id, "copy")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleResultAction(result.id, "view")}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                    {result.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{result.timestamp.toLocaleDateString()}</span>
                      </div>
                      
                      {result.metadata?.author && (
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{result.metadata.author}</span>
                        </div>
                      )}
                      
                      {result.source && (
                        <div className="flex items-center space-x-1">
                          <FileText className="h-3 w-3" />
                          <span>{result.source}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() => handleResultAction(result.id, "like")}
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Helpful
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {searchQuery && searchResults.length === 0 && !isSearching && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-medium mb-2">No results found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or filters to find what you&apos;re looking for.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent Searches */}
      {!searchQuery && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                "Q4 financial analysis",
                "product development roadmap",
                "customer feedback trends",
                "team meeting notes",
                "market research data"
              ].map((query, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => setSearchQuery(query)}
                >
                  <Clock className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span>{query}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
