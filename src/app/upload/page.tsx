import { Layout } from "@/components/layout/layout"
import { UploadInterface } from "@/components/upload/upload-interface"

export default function UploadPage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold youmna-gradient-text">
              Upload Documents
            </h1>
            <p className="text-muted-foreground mt-1">
              Add documents, text, and URLs to your knowledge base
            </p>
          </div>

          {/* Upload Interface */}
          <UploadInterface />
        </div>
      </div>
    </Layout>
  )
}
