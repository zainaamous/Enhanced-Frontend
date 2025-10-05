"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Trash2,
  Eye,
  Edit,
  Star,
  Calendar,
  User,
  Database,
  RefreshCw,
  Upload,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadDate: Date
  lastModified: Date
  status: "indexed" | "processing" | "error" | "pending"
  chunks: number
  summary?: string
  uploader: string
  tags: string[]
}

interface DocumentListProps {
  className?: string
}

export function DocumentList({ className }: DocumentListProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedFilter, setSelectedFilter] = React.useState("all")
  const [documents] = React.useState<Document[]>([
    {
      id: "1",
      name: "Q4 Financial Report.pdf",
      type: "pdf",
      size: "2.3 MB",
      uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      lastModified: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: "indexed",
      chunks: 47,
      summary: "Comprehensive financial analysis for Q4 2024 including revenue, expenses, and growth metrics.",
      uploader: "Sarah Chen",
      tags: ["finance", "quarterly", "report"]
    },
    {
      id: "2",
      name: "Product Development Roadmap.docx",
      type: "docx",
      size: "1.8 MB",
      uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      status: "indexed",
      chunks: 32,
      summary: "Strategic roadmap outlining product development phases and milestones for 2025.",
      uploader: "Mike Johnson",
      tags: ["product", "roadmap", "strategy"]
    },
    {
      id: "3",
      name: "Market Research Data.xlsx",
      type: "xlsx",
      size: "4.1 MB",
      uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      status: "processing",
      chunks: 0,
      uploader: "Emily Davis",
      tags: ["research", "data", "market"]
    },
    {
      id: "4",
      name: "Team Meeting Notes.md",
      type: "md",
      size: "156 KB",
      uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
      status: "indexed",
      chunks: 8,
      summary: "Key decisions and action items from weekly team meeting.",
      uploader: "Alex Rodriguez",
      tags: ["meeting", "notes", "team"]
    },
    {
      id: "5",
      name: "Customer Feedback Analysis.pdf",
      type: "pdf",
      size: "3.2 MB",
      uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      status: "error",
      chunks: 0,
      uploader: "Lisa Wang",
      tags: ["customer", "feedback", "analysis"]
    }
  ])

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = selectedFilter === "all" || doc.status === selectedFilter
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: Document["status"]) => {
    switch (status) {
      case "indexed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "indexed":
        return <Database className="h-3 w-3" />
      case "processing":
        return <RefreshCw className="h-3 w-3 animate-spin" />
      case "error":
        return <div className="h-3 w-3 rounded-full bg-red-500" />
      case "pending":
        return <Clock className="h-3 w-3" />
      default:
        return null
    }
  }

  const handleDocumentAction = (documentId: string, action: string) => {
    console.log(`Action ${action} on document ${documentId}`)
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Knowledge Base</CardTitle>
        <Button className="youmna-gradient text-white">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
            >
              All ({documents.length})
            </Button>
            <Button
              variant={selectedFilter === "indexed" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("indexed")}
            >
              Indexed ({documents.filter(d => d.status === "indexed").length})
            </Button>
            <Button
              variant={selectedFilter === "processing" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("processing")}
            >
              Processing ({documents.filter(d => d.status === "processing").length})
            </Button>
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {filteredDocuments.map((document) => (
            <div
              key={document.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                {/* Document Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                {/* Document Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium truncate">{document.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {document.type.toUpperCase()}
                    </Badge>
                  </div>
                  
                  {document.summary && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {document.summary}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{document.uploader}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{document.uploadDate.toLocaleDateString()}</span>
                    </div>
                    <span>{document.size}</span>
                    {document.status === "indexed" && (
                      <span>{document.chunks} chunks</span>
                    )}
                  </div>

                  {/* Tags */}
                  {document.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {document.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center space-x-2">
                <Badge className={cn("text-xs", getStatusColor(document.status))}>
                  {getStatusIcon(document.status)}
                  <span className="ml-1 capitalize">{document.status}</span>
                </Badge>
                
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDocumentAction(document.id, "view")}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDocumentAction(document.id, "download")}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDocumentAction(document.id, "delete")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No documents found matching your criteria.</p>
            <p className="text-sm">Try adjusting your search or filter settings.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
