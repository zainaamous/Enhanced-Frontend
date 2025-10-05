import { Layout } from "@/components/layout/layout"
import { IntegrationList } from "@/components/integrations/integration-list"

export default function IntegrationsPage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold youmna-gradient-text">
              Integrations
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your integrations and external service connections
            </p>
          </div>

          {/* Integration List */}
          <IntegrationList />
        </div>
      </div>
    </Layout>
  )
}
