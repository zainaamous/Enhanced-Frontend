"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Link,
  Type,
  Database,
  Zap,
  FileUp,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadFile {
  id: string
  file: File
  status: "pending" | "uploading" | "processing" | "completed" | "error"
  progress: number
  error?: string
  chunks?: number
  summary?: string
}

interface UploadInterfaceProps {
  className?: string
}

export function UploadInterface({ className }: UploadInterfaceProps) {
  const [uploadFiles, setUploadFiles] = React.useState<UploadFile[]>([])
  const [dragActive, setDragActive] = React.useState(false)
  const [textContent, setTextContent] = React.useState("")
  const [urlInput, setUrlInput] = React.useState("")
  const [isProcessing, setIsProcessing] = React.useState(false)

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (files: File[]) => {
    const newFiles: UploadFile[] = files.map(file => ({
      id: Date.now().toString() + Math.random(),
      file,
      status: "pending",
      progress: 0
    }))
    
    setUploadFiles(prev => [...prev, ...newFiles])
    
    // Start upload simulation
    newFiles.forEach(uploadFile => {
      simulateUpload(uploadFile.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    setUploadFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, status: "uploading" } : file
    ))

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        
        // Move to processing
        setTimeout(() => {
          setUploadFiles(prev => prev.map(file => 
            file.id === fileId ? { ...file, status: "processing", progress: 100 } : file
          ))
          
          // Simulate processing completion
          setTimeout(() => {
            setUploadFiles(prev => prev.map(file => 
              file.id === fileId ? { 
                ...file, 
                status: "completed", 
                chunks: Math.floor(Math.random() * 50) + 10,
                summary: "Document processed and indexed successfully."
              } : file
            ))
          }, 2000)
        }, 500)
      }
      
      setUploadFiles(prev => prev.map(file => 
        file.id === fileId ? { ...file, progress } : file
      ))
    }, 200)
  }

  const removeFile = (fileId: string) => {
    setUploadFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const handleTextUpload = async () => {
    if (!textContent.trim()) return
    
    setIsProcessing(true)
    
    try {
      // Simulate text processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create a mock file entry for text content
      const textFile: UploadFile = {
        id: Date.now().toString(),
        file: new File([textContent], "text-content.txt", { type: "text/plain" }),
        status: "completed",
        progress: 100,
        chunks: Math.floor(textContent.length / 500) + 1,
        summary: "Text content processed and indexed successfully."
      }
      
      setUploadFiles(prev => [...prev, textFile])
      setTextContent("")
    } catch (error) {
      console.error("Text upload failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleUrlUpload = async () => {
    if (!urlInput.trim()) return
    
    setIsProcessing(true)
    
    try {
      // Simulate URL processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Create a mock file entry for URL content
      const urlFile: UploadFile = {
        id: Date.now().toString(),
        file: new File([urlInput], "url-content.html", { type: "text/html" }),
        status: "completed",
        progress: 100,
        chunks: Math.floor(Math.random() * 20) + 5,
        summary: "URL content extracted and indexed successfully."
      }
      
      setUploadFiles(prev => [...prev, urlFile])
      setUrlInput("")
    } catch (error) {
      console.error("URL upload failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const getStatusIcon = (status: UploadFile["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case "uploading":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: UploadFile["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "uploading":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Upload Methods */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileUp className="h-5 w-5" />
              <span>Upload Files</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Drag and Drop Area */}
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                "hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">Drop files here or click to browse</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Supports PDF, DOC, DOCX, TXT, MD, CSV, XLSX, PPTX
              </p>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Select Files
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt,.md,.csv,.xlsx,.pptx"
            />

            {/* Upload Queue */}
            {uploadFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Upload Queue</h4>
                {uploadFiles.map((uploadFile) => (
                  <div key={uploadFile.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(uploadFile.status)}
                        <span className="font-medium text-sm">{uploadFile.file.name}</span>
                        <Badge className={cn("text-xs", getStatusColor(uploadFile.status))}>
                          {uploadFile.status}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeFile(uploadFile.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    {uploadFile.status === "uploading" && (
                      <Progress value={uploadFile.progress} className="mb-2" />
                    )}
                    
                    {uploadFile.status === "completed" && (
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span>{uploadFile.chunks} chunks created</span>
                          <span>{uploadFile.file.size} bytes</span>
                        </div>
                        {uploadFile.summary && (
                          <p className="mt-1">{uploadFile.summary}</p>
                        )}
                      </div>
                    )}
                    
                    {uploadFile.error && (
                      <p className="text-sm text-red-500">{uploadFile.error}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Text and URL Upload */}
        <div className="space-y-6">
          {/* Text Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Type className="h-5 w-5" />
                <span>Add Text Content</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste or type your text content here..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="min-h-[120px]"
              />
              <Button
                onClick={handleTextUpload}
                disabled={!textContent.trim() || isProcessing}
                className="w-full youmna-gradient text-white"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Database className="h-4 w-4 mr-2" />
                )}
                {isProcessing ? "Processing..." : "Add to Knowledge Base"}
              </Button>
            </CardContent>
          </Card>

          {/* URL Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Link className="h-5 w-5" />
                <span>Extract from URL</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="https://example.com/article"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                type="url"
              />
              <Button
                onClick={handleUrlUpload}
                disabled={!urlInput.trim() || isProcessing}
                className="w-full"
                variant="outline"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Link className="h-4 w-4 mr-2" />
                )}
                {isProcessing ? "Extracting..." : "Extract Content"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Processing Status */}
      {isProcessing && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-3">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="font-medium">Processing content...</span>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              YOUMNA AI is analyzing and indexing your content
            </p>
          </CardContent>
        </Card>
      )}

      {/* Upload Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Upload Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Supported Formats</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• PDF documents</li>
                <li>• Word documents (.doc, .docx)</li>
                <li>• Text files (.txt, .md)</li>
                <li>• Spreadsheets (.csv, .xlsx)</li>
                <li>• Presentations (.pptx)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Best Practices</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use clear, descriptive filenames</li>
                <li>• Ensure documents are readable</li>
                <li>• Upload related documents together</li>
                <li>• Verify content quality before upload</li>
                <li>• Check processing status regularly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
