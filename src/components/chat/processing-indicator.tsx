"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { 
  Loader2, 
  Search, 
  Database, 
  FileText, 
  CheckCircle2, 
  XCircle,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ProcessingStep {
  step: string
  status: "pending" | "processing" | "completed" | "error"
  timestamp: Date
}

interface ProcessingIndicatorProps {
  steps: ProcessingStep[]
  toolsUsed?: string[]
  className?: string
}

const stepIcons = {
  search: Search,
  database: Database,
  retrieval: FileText,
  processing: Loader2,
  default: Clock
}

const getStepIcon = (stepName: string) => {
  const normalized = stepName.toLowerCase()
  if (normalized.includes('search')) return stepIcons.search
  if (normalized.includes('database') || normalized.includes('query')) return stepIcons.database
  if (normalized.includes('retriev') || normalized.includes('fetch')) return stepIcons.retrieval
  return stepIcons.default
}

export function ProcessingIndicator({ steps, toolsUsed, className }: ProcessingIndicatorProps) {
  if (steps.length === 0 && (!toolsUsed || toolsUsed.length === 0)) {
    return null
  }

  return (
    <div className={cn("space-y-3 mt-3", className)}>
      {/* Processing Steps */}
      {steps.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Processing Steps
          </p>
          <div className="space-y-1.5">
            {steps.map((step, index) => {
              const StepIcon = getStepIcon(step.step)
              return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center space-x-2 p-2 rounded border transition-colors duration-150",
                      step.status === "completed" && "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
                      step.status === "processing" && "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
                      step.status === "error" && "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
                      step.status === "pending" && "bg-muted border-border"
                    )}
                  >
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {step.status === "completed" && (
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    )}
                    {step.status === "processing" && (
                      <Loader2 className="h-4 w-4 text-primary animate-spin" />
                    )}
                    {step.status === "error" && (
                      <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                    {step.status === "pending" && (
                      <Clock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    )}
                  </div>

                  {/* Step Icon */}
                  <StepIcon className={cn(
                    "h-4 w-4",
                    step.status === "completed" && "text-green-600 dark:text-green-400",
                    step.status === "processing" && "text-primary",
                    step.status === "error" && "text-red-600 dark:text-red-400",
                    step.status === "pending" && "text-slate-400 dark:text-slate-500"
                  )} />

                  {/* Step Name */}
                  <span className={cn(
                    "flex-1 text-sm font-medium",
                    step.status === "completed" && "text-green-700 dark:text-green-300",
                    step.status === "processing" && "text-primary",
                    step.status === "error" && "text-red-700 dark:text-red-300",
                    step.status === "pending" && "text-slate-600 dark:text-slate-400"
                  )}>
                    {step.step}
                  </span>

                  {/* Timestamp */}
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {step.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Tools Used */}
      {toolsUsed && toolsUsed.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Tools Used
          </p>
          <div className="flex flex-wrap gap-2">
            {toolsUsed.map((tool, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-primary/10 text-primary font-medium text-xs"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

