"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Workflow,
  Play,
  Pause,
  Square,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Zap,
  Users,
  Calendar,
  Activity
} from "lucide-react"
import { cn } from "@/lib/utils"

interface WorkflowItem {
  id: string
  name: string
  description: string
  status: "running" | "paused" | "completed" | "error" | "idle"
  progress: number
  lastRun?: Date
  nextRun?: Date
  executions: number
  successRate: number
  createdBy: string
  createdAt: Date
  tags: string[]
  steps: number
  completedSteps: number
}

interface WorkflowListProps {
  className?: string
}

export function WorkflowList({ className }: WorkflowListProps) {
  const [workflows] = React.useState<WorkflowItem[]>([
    {
      id: "1",
      name: "Document Processing Pipeline",
      description: "Automatically processes uploaded documents, extracts text, and indexes them in the knowledge base.",
      status: "running",
      progress: 75,
      lastRun: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      nextRun: new Date(Date.now() + 1000 * 60 * 45), // 45 minutes from now
      executions: 142,
      successRate: 98.5,
      createdBy: "Sarah Chen",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
      tags: ["automation", "document", "indexing"],
      steps: 5,
      completedSteps: 4
    },
    {
      id: "2",
      name: "Daily Report Generation",
      description: "Generates daily activity reports and sends them to stakeholders via email.",
      status: "completed",
      progress: 100,
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      nextRun: new Date(Date.now() + 1000 * 60 * 60 * 22), // 22 hours from now
      executions: 89,
      successRate: 100,
      createdBy: "Mike Johnson",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
      tags: ["reporting", "email", "daily"],
      steps: 3,
      completedSteps: 3
    },
    {
      id: "3",
      name: "Conversation Summarization",
      description: "Automatically summarizes long conversations and generates smart titles.",
      status: "paused",
      progress: 0,
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      executions: 67,
      successRate: 94.2,
      createdBy: "Emily Davis",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      tags: ["ai", "conversation", "summarization"],
      steps: 4,
      completedSteps: 0
    },
    {
      id: "4",
      name: "Knowledge Base Backup",
      description: "Creates daily backups of the knowledge base and stores them securely.",
      status: "error",
      progress: 60,
      lastRun: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      executions: 156,
      successRate: 89.7,
      createdBy: "Alex Rodriguez",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21), // 3 weeks ago
      tags: ["backup", "security", "daily"],
      steps: 6,
      completedSteps: 4
    },
    {
      id: "5",
      name: "User Activity Monitoring",
      description: "Monitors user activity and generates insights for system optimization.",
      status: "idle",
      progress: 0,
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      nextRun: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours from now
      executions: 234,
      successRate: 96.8,
      createdBy: "Lisa Wang",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
      tags: ["monitoring", "analytics", "users"],
      steps: 7,
      completedSteps: 0
    }
  ])

  const getStatusColor = (status: WorkflowItem["status"]) => {
    switch (status) {
      case "running":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "idle":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: WorkflowItem["status"]) => {
    switch (status) {
      case "running":
        return <Activity className="h-3 w-3 animate-pulse" />
      case "completed":
        return <CheckCircle className="h-3 w-3" />
      case "paused":
        return <Pause className="h-3 w-3" />
      case "error":
        return <AlertCircle className="h-3 w-3" />
      case "idle":
        return <Clock className="h-3 w-3" />
      default:
        return <Workflow className="h-3 w-3" />
    }
  }

  const handleWorkflowAction = (workflowId: string, action: string) => {
    console.log(`Action ${action} on workflow ${workflowId}`)
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Active Workflows</CardTitle>
        <Button className="youmna-gradient text-white">
          <Workflow className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium">{workflow.name}</h3>
                  <Badge className={cn("text-xs", getStatusColor(workflow.status))}>
                    {getStatusIcon(workflow.status)}
                    <span className="ml-1 capitalize">{workflow.status}</span>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {workflow.description}
                </p>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleWorkflowAction(workflow.id, "view")}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleWorkflowAction(workflow.id, "edit")}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleWorkflowAction(workflow.id, "settings")}
                >
                  <Settings className="h-4 w-4" />
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

            {/* Progress Bar */}
            {workflow.status === "running" && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{workflow.completedSteps}/{workflow.steps} steps</span>
                </div>
                <Progress value={workflow.progress} className="h-2" />
              </div>
            )}

            {/* Workflow Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{workflow.executions}</div>
                  <div className="text-xs text-muted-foreground">Executions</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <div className="font-medium">{workflow.successRate}%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">
                    {workflow.lastRun ? workflow.lastRun.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    }) : "Never"}
                  </div>
                  <div className="text-xs text-muted-foreground">Last Run</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{workflow.createdBy}</div>
                  <div className="text-xs text-muted-foreground">Created By</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-3">
              {workflow.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t">
              <div className="flex items-center space-x-2">
                {workflow.status === "running" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleWorkflowAction(workflow.id, "pause")}
                  >
                    <Pause className="h-3 w-3 mr-1" />
                    Pause
                  </Button>
                )}
                
                {workflow.status === "paused" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleWorkflowAction(workflow.id, "resume")}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Resume
                  </Button>
                )}
                
                {workflow.status === "idle" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleWorkflowAction(workflow.id, "start")}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                )}
                
                {workflow.status === "running" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleWorkflowAction(workflow.id, "stop")}
                  >
                    <Square className="h-3 w-3 mr-1" />
                    Stop
                  </Button>
                )}
              </div>
              
              <div className="text-xs text-muted-foreground">
                Created {workflow.createdAt.toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
