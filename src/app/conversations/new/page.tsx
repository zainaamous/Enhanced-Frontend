import { Layout } from "@/components/layout/layout"
import { ChatInterface } from "@/components/chat/chat-interface"

export const dynamic = 'force-dynamic'

export default function NewConversationPage() {
  return (
    <Layout>
      <div className="h-full">
        <ChatInterface
          onSendMessage={(message, attachments) => {
            console.log("New message:", message, attachments)
            // Handle new conversation message
          }}
          onNewConversation={() => {
            console.log("Starting new conversation")
          }}
          className="h-full"
        />
      </div>
    </Layout>
  )
}
