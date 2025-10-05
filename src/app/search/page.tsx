import { Layout } from "@/components/layout/layout"
import { SearchInterface } from "@/components/search/search-interface"

export default function SearchPage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold youmna-gradient-text">
              Knowledge Search
            </h1>
            <p className="text-muted-foreground mt-1">
              Search across all documents, conversations, and knowledge
            </p>
          </div>

          {/* Search Interface */}
          <SearchInterface />
        </div>
      </div>
    </Layout>
  )
}
