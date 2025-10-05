"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Slack,
  Mail,
  Calendar,
  Database,
  FileText,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Plus,
  ExternalLink,
  Trash2,
  RefreshCw
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  status: "connected" | "disconnected" | "error" | "pending"
  lastSync?: Date
  configurable: boolean
  category: "communication" | "productivity" | "storage" | "ai"
  features: string[]
  setupRequired?: boolean
}

interface IntegrationListProps {
  className?: string
}

export function IntegrationList({ className }: IntegrationListProps) {
  const [integrations, setIntegrations] = React.useState<Integration[]>([
    {
      id: "slack",
      name: "Slack",
      description: "Connect with your Slack workspace for notifications and team collaboration.",
      icon: Slack,
      status: "connected",
      lastSync: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      configurable: true,
      category: "communication",
      features: ["Notifications", "Team Messages", "Channel Integration"]
    },
    {
      id: "notion",
      name: "Notion",
      description: "Sync with Notion workspaces to access and update your knowledge base.",
      icon: FileText,
      status: "connected",
      lastSync: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      configurable: true,
      category: "productivity",
      features: ["Page Sync", "Database Access", "Content Updates"]
    },
    {
      id: "inngest",
      name: "Inngest",
      description: "Background job processing and workflow automation platform.",
      icon: Zap,
      status: "connected",
      lastSync: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
      configurable: true,
      category: "ai",
      features: ["Job Processing", "Workflow Automation", "Event Handling"]
    },
    {
      id: "email",
      name: "Email Integration",
      description: "Connect email accounts for automated processing and notifications.",
      icon: Mail,
      status: "pending",
      configurable: true,
      category: "communication",
      features: ["Email Processing", "Auto-Reply", "Notification Emails"],
      setupRequired: true
    },
    {
      id: "calendar",
      name: "Calendar Sync",
      description: "Integrate with Google Calendar and Outlook for meeting management.",
      icon: Calendar,
      status: "disconnected",
      configurable: true,
      category: "productivity",
      features: ["Meeting Sync", "Schedule Management", "Availability Check"]
    },
    {
      id: "database",
      name: "PostgreSQL",
      description: "Primary database connection for data storage and retrieval.",
      icon: Database,
      status: "connected",
      lastSync: new Date(Date.now() - 1000 * 10), // 10 seconds ago
      configurable: false,
      category: "storage",
      features: ["Data Storage", "Query Processing", "Backup Management"]
    }
  ])

  const getStatusColor = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "disconnected":
        return "bg-gray-100 text-gray-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-3 w-3" />
      case "disconnected":
        return <AlertCircle className="h-3 w-3" />
      case "error":
        return <AlertCircle className="h-3 w-3" />
      case "pending":
        return <Clock className="h-3 w-3" />
      default:
        return <AlertCircle className="h-3 w-3" />
    }
  }

  const getCategoryColor = (category: Integration["category"]) => {
    switch (category) {
      case "communication":
        return "bg-blue-100 text-blue-800"
      case "productivity":
        return "bg-purple-100 text-purple-800"
      case "storage":
        return "bg-gray-100 text-gray-800"
      case "ai":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleIntegrationToggle = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: integration.status === "connected" ? "disconnected" : "connected",
            lastSync: integration.status === "connected" ? undefined : new Date()
          }
        : integration
    ))
  }

  const handleIntegrationAction = (integrationId: string, action: string) => {
    console.log(`Action ${action} on integration ${integrationId}`)
  }

  const handleRefresh = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, lastSync: new Date() }
        : integration
    ))
  }

  const groupedIntegrations = integrations.reduce((acc, integration) => {
    if (!acc[integration.category]) {
      acc[integration.category] = []
    }
    acc[integration.category].push(integration)
    return acc
  }, {} as Record<string, Integration[]>)

  return (
    <div className={cn("space-y-6", className)}>
      {/* Available Integrations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Available Integrations</CardTitle>
          <Button className="youmna-gradient text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(groupedIntegrations).map(([category, categoryIntegrations]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium capitalize">{category}</h3>
                <Badge variant="outline" className="text-xs">
                  {categoryIntegrations.length}
                </Badge>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {categoryIntegrations.map((integration) => {
                  const Icon = integration.icon
                  
                  return (
                    <div
                      key={integration.id}
                      className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium">{integration.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {integration.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={cn("text-xs", getStatusColor(integration.status))}>
                            {getStatusIcon(integration.status)}
                            <span className="ml-1 capitalize">{integration.status}</span>
                          </Badge>
                          
                          {integration.configurable && (
                            <Switch
                              checked={integration.status === "connected"}
                              onCheckedChange={() => handleIntegrationToggle(integration.id)}
                            />
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Features:</h5>
                        <div className="flex flex-wrap gap-1">
                          {integration.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Last Sync */}
                      {integration.lastSync && (
                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>
                              Last sync: {integration.lastSync.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleRefresh(integration.id)}
                            >
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                            
                            {integration.configurable && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleIntegrationAction(integration.id, "settings")}
                              >
                                <Settings className="h-3 w-3" />
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleIntegrationAction(integration.id, "view")}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Setup Required */}
                      {integration.setupRequired && (
                        <div className="mt-3 pt-3 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => handleIntegrationAction(integration.id, "setup")}
                          >
                            Complete Setup
                          </Button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Integration Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Connected", count: integrations.filter(i => i.status === "connected").length, color: "text-green-600" },
              { label: "Disconnected", count: integrations.filter(i => i.status === "disconnected").length, color: "text-gray-600" },
              { label: "Pending", count: integrations.filter(i => i.status === "pending").length, color: "text-yellow-600" },
              { label: "Error", count: integrations.filter(i => i.status === "error").length, color: "text-red-600" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={cn("text-2xl font-bold", stat.color)}>
                  {stat.count}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
