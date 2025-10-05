"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  Upload,
  Search,
  User,
  Clock,
  MoreHorizontal,
  FileText,
  Database,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  type: "conversation" | "upload" | "search" | "system"
  title: string
  description: string
  timestamp: string
  user?: string
  avatar?: string
  status?: "success" | "warning" | "error" | "info"
  metadata?: Record<string, any>
}

interface RecentActivityProps {
  className?: string
}

export function RecentActivity({ className }: RecentActivityProps) {
  const [activities] = React.useState<ActivityItem[]>([
    {
      id: "1",
      type: "conversation",
      title: "New conversation started",
      description: "Project planning discussion with AI assistant",
      timestamp: "2 minutes ago",
      user: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      status: "success"
    },
    {
      id: "2",
      type: "upload",
      title: "Document uploaded",
      description: "Q4 Financial Report.pdf (2.3 MB)",
      timestamp: "5 minutes ago",
      user: "Mike Johnson",
      avatar: "/avatars/mike.jpg",
      status: "success"
    },
    {
      id: "3",
      type: "search",
      title: "Knowledge base query",
      description: "Search: 'customer retention strategies'",
      timestamp: "8 minutes ago",
      user: "Emily Davis",
      avatar: "/avatars/emily.jpg",
      status: "success"
    },
    {
      id: "4",
      type: "system",
      title: "System optimization",
      description: "Database indexing completed successfully",
      timestamp: "12 minutes ago",
      status: "info"
    },
    {
      id: "5",
      type: "conversation",
      title: "Conversation summarized",
      description: "Meeting notes auto-summarized and archived",
      timestamp: "15 minutes ago",
      user: "Alex Rodriguez",
      avatar: "/avatars/alex.jpg",
      status: "success"
    },
    {
      id: "6",
      type: "upload",
      title: "Bulk document processing",
      description: "15 documents processed and indexed",
      timestamp: "18 minutes ago",
      user: "Lisa Wang",
      avatar: "/avatars/lisa.jpg",
      status: "success"
    }
  ])

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "conversation":
        return MessageSquare
      case "upload":
        return Upload
      case "search":
        return Search
      case "system":
        return Zap
      default:
        return FileText
    }
  }

  const getStatusColor = (status?: ActivityItem["status"]) => {
    switch (status) {
      case "success":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "error":
        return "text-red-500"
      case "info":
        return "text-blue-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusBadge = (status?: ActivityItem["status"]) => {
    switch (status) {
      case "success":
        return <Badge variant="default" className="bg-green-100 text-green-800 text-xs">Success</Badge>
      case "warning":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">Warning</Badge>
      case "error":
        return <Badge variant="destructive" className="text-xs">Error</Badge>
      case "info":
        return <Badge variant="outline" className="text-xs">Info</Badge>
      default:
        return null
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type)
          
          return (
            <div key={activity.id} className="flex items-start space-x-3 group">
              <div className="flex-shrink-0">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  "bg-muted group-hover:bg-accent transition-colors"
                )}>
                  {activity.user && activity.avatar ? (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={activity.avatar} alt={activity.user} />
                      <AvatarFallback>
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Icon className={cn("h-4 w-4", getStatusColor(activity.status))} />
                  )}
                </div>
              </div>
              
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-2">
                    {getStatusBadge(activity.status)}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{activity.timestamp}</span>
                  {activity.user && (
                    <>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{activity.user}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
