"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Database,
  Search,
  Upload,
  BarChart3,
  Workflow,
  Settings,
  Zap,
  Plus,
  ChevronDown,
  ChevronRight,
  Star,
  Clock,
  Trash2,
  MoreHorizontal,
  Bot,
  Sparkles,
  TrendingUp,
  FileText,
  Brain,
  Shield
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  badge?: string | number
  children?: NavItem[]
  isActive?: boolean
}

interface Conversation {
  id: string
  title: string
  timestamp: string
  isPinned?: boolean
  isActive?: boolean
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = React.useState<string[]>(["conversations"])
  const [conversations, setConversations] = React.useState<Conversation[]>([
    { id: "1", title: "Project Planning Discussion", timestamp: "2 min ago", isActive: true },
    { id: "2", title: "Data Analysis Review", timestamp: "1 hour ago", isPinned: true },
    { id: "3", title: "Meeting Notes Summary", timestamp: "3 hours ago" },
    { id: "4", title: "Research Findings", timestamp: "Yesterday" },
    { id: "5", title: "Strategy Development", timestamp: "2 days ago", isPinned: true },
  ])

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
      badge: "3"
    },
    {
      id: "conversations",
      label: "Conversations",
      icon: MessageSquare,
      children: conversations.map(conv => ({
        id: conv.id,
        label: conv.title,
        icon: MessageSquare,
        href: `/conversations/${conv.id}`,
        isActive: conv.isActive
      }))
    },
    {
      id: "knowledge",
      label: "Knowledge Base",
      icon: Database,
      href: "/knowledge",
      badge: "127"
    },
    {
      id: "search",
      label: "Search",
      icon: Search,
      href: "/search"
    },
    {
      id: "workflows",
      label: "Workflows",
      icon: Workflow,
      href: "/workflows",
      badge: "5"
    },
    {
      id: "upload",
      label: "Upload",
      icon: Upload,
      href: "/upload"
    }
  ]

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleNewChat = () => {
    // Create new conversation logic
    console.log("Starting new conversation")
  }

  const handleConversationAction = (conversationId: string, action: string) => {
    console.log(`Action ${action} on conversation ${conversationId}`)
  }

  return (
    <div className={cn(
      "flex flex-col h-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-r border-slate-200/60 dark:border-slate-700/60 transition-all duration-300",
      isOpen ? "w-64" : "w-0 overflow-hidden"
    )}>
      {/* Enhanced New Chat Button */}
      <div className="p-4 border-b border-slate-200/60 dark:border-slate-700/60">
        <Button 
          onClick={handleNewChat}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Conversation
        </Button>
      </div>

      {/* Enhanced Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {/* Main Navigation Items */}
        {navItems.filter(item => !item.children).map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <div key={item.id}>
              <Link href={item.href || "#"}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-12 px-4 rounded-xl font-medium transition-all duration-200 group",
                    isActive 
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm" 
                      : "hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 mr-3 transition-colors",
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                  )} />
                  <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="ml-2 h-6 px-2 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          )
        })}
        
        <div className="py-3">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
        </div>

        {/* Enhanced Conversations Section */}
        {navItems.find(item => item.id === "conversations") && (
          <div>
            <div className="px-4 py-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                Recent Conversations
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg"
                onClick={() => toggleExpanded("conversations")}
              >
                {expandedItems.includes("conversations") ? (
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                )}
              </Button>
            </div>

            {expandedItems.includes("conversations") && (
              <div className="space-y-1">
                {conversations.map((conversation, index) => (
                  <div
                    key={conversation.id}
                    className={cn(
                      "group flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all duration-200",
                      conversation.isActive && "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                    )}
                  >
                    <Link 
                      href={`/conversations/${conversation.id}`}
                      className="flex-1 min-w-0"
                    >
                      <div className="flex items-center space-x-3">
                        {conversation.isPinned && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-slate-900 dark:text-slate-100">
                            {conversation.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {conversation.timestamp}
                          </p>
                        </div>
                      </div>
                    </Link>
                    
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 rounded-lg"
                        onClick={() => handleConversationAction(conversation.id, "pin")}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg"
                        onClick={() => handleConversationAction(conversation.id, "delete")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      
      </nav>

      {/* Enhanced Bottom Section */}
      <div 
        className="p-4 border-t border-slate-200/60 dark:border-slate-700/60 space-y-2"
      >
        <Link href="/settings">
          <Button
            variant="ghost"
            className="w-full justify-start h-12 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 font-medium transition-all duration-200 text-sm group"
          >
            <Settings className="h-5 w-5 mr-3 text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300" />
            <span className="text-slate-700 dark:text-slate-300">Settings</span>
          </Button>
        </Link>
        
        {/* AI Status Indicator */}
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <p className="text-xs font-medium text-green-700 dark:text-green-300">YOUMNA AI Online</p>
            <p className="text-xs text-green-600 dark:text-green-400">Ready to assist</p>
          </div>
        </div>
      </div>
    </div>
  )
}
