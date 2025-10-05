"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Database,
  Search,
  TrendingUp,
  Clock,
  Users,
  Zap,
  Activity
} from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease"
    period: string
  }
  icon: React.ComponentType<{ className?: string }>
  description?: string
  badge?: string
  className?: string
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  description,
  badge,
  className
}: StatCardProps) {
  return (
    <Card className={cn(
      "hover:shadow-md transition-shadow duration-200 rounded-lg",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {change && (
          <div className="flex items-center mt-2">
            <TrendingUp 
              className={cn(
                "h-3 w-3 mr-1",
                change.type === "increase" 
                  ? "text-green-500" 
                  : "text-red-500 rotate-180"
              )} 
            />
            <span 
              className={cn(
                "text-xs font-medium",
                change.type === "increase" 
                  ? "text-green-500" 
                  : "text-red-500"
              )}
            >
              {change.value > 0 ? "+" : ""}{change.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              {change.period}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface StatsCardsProps {
  className?: string
}

export function StatsCards({ className }: StatsCardsProps) {
  const stats = [
    {
      title: "Active Conversations",
      value: 12,
      change: { value: 20, type: "increase" as const, period: "vs last week" },
      icon: MessageSquare,
      description: "Ongoing AI discussions",
      badge: "Live"
    },
    {
      title: "Knowledge Base",
      value: "2,847",
      change: { value: 5, type: "increase" as const, period: "new docs" },
      icon: Database,
      description: "Indexed documents",
      badge: "Updated"
    },
    {
      title: "Queries Today",
      value: 156,
      change: { value: 12, type: "increase" as const, period: "vs yesterday" },
      icon: Search,
      description: "AI-powered searches",
      badge: "24h"
    },
    {
      title: "Response Time",
      value: "1.2s",
      change: { value: 8, type: "decrease" as const, period: "faster" },
      icon: Zap,
      description: "Average AI response",
      badge: "Fast"
    },
    {
      title: "Active Users",
      value: 8,
      change: { value: 2, type: "increase" as const, period: "new users" },
      icon: Users,
      description: "Currently online",
      badge: "Online"
    },
    {
      title: "System Health",
      value: "99.9%",
      change: { value: 0.1, type: "increase" as const, period: "uptime" },
      icon: Activity,
      description: "Service availability",
      badge: "Healthy"
    }
  ]

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
