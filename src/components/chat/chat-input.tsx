"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Mic,
  Paperclip,
  Image,
  FileText,
  Link,
  Smile,
  Zap,
  Loader2,
  Bot,
  Sparkles,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSendMessage: (message: string, attachments?: File[]) => void
  onVoiceInput?: () => void
  onFileUpload?: (files: File[]) => void
  isTyping?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function ChatInput({
  onSendMessage,
  onVoiceInput,
  onFileUpload,
  isTyping = false,
  disabled = false,
  placeholder = "Ask YOUMNA AI anything...",
  className
}: ChatInputProps) {
  const [message, setMessage] = React.useState("")
  const [attachments, setAttachments] = React.useState<File[]>([])
  const [isRecording, setIsRecording] = React.useState(false)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), attachments)
      setMessage("")
      setAttachments([])
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setAttachments(prev => [...prev, ...files])
      onFileUpload?.(files)
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false)
      // Stop recording logic here
    } else {
      setIsRecording(true)
      onVoiceInput?.()
      // Start recording logic here
    }
  }

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [message])

  return (
    <div className={cn("border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900", className)}>
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2"
              >
                <FileText className="h-4 w-4 text-slate-500" />
                <span className="text-sm truncate max-w-[150px] text-slate-700 dark:text-slate-300">
                  {file.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                  onClick={() => removeAttachment(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-end space-x-3 bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 focus-within:border-blue-300 dark:focus-within:border-blue-600 transition-all duration-200">
          {/* Attachment Button */}
          <div className="relative">
            <input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.md,.csv,.xlsx,.pptx"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-700"
              onClick={() => document.getElementById("file-upload")?.click()}
              disabled={disabled}
            >
              <Paperclip className="h-4 w-4 text-slate-500" />
            </Button>
          </div>

          {/* Text Input */}
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className="min-h-[40px] max-h-[120px] resize-none bg-transparent border-0 focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
              rows={1}
            />
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            disabled={!message.trim() || disabled || isTyping}
            className={cn(
              "h-8 w-8 rounded-lg transition-all duration-200",
              message.trim() && !disabled && !isTyping
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
            )}
            size="icon"
          >
            {isTyping ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <div className="flex items-center space-x-2">
            <span>YOUMNA AI</span>
          </div>
        </div>
      </form>
    </div>
  )
}
