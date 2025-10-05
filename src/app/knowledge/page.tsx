import { Layout } from "@/components/layout/layout"
import { DocumentList } from "@/components/knowledge/document-list"

export default function KnowledgePage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold youmna-gradient-text">
              Knowledge Base
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your documents and knowledge repository
            </p>
          </div>

          {/* Document List */}
          <DocumentList />
        </div>
      </div>
    </Layout>
  )
}
