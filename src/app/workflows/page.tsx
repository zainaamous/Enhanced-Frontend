import { Layout } from "@/components/layout/layout"
import { WorkflowList } from "@/components/workflows/workflow-list"
import { StatsCards } from "@/components/dashboard/stats-cards"

export default function WorkflowsPage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold youmna-gradient-text">
              Workflow Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage automated workflows and processes
            </p>
          </div>

          {/* Workflow Stats */}
          <StatsCards />

          {/* Workflow List */}
          <WorkflowList />
        </div>
      </div>
    </Layout>
  )
}
