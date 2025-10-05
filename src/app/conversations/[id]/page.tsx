"use client"

import * as React from "react"

export const dynamic = 'force-dynamic'
import { Layout } from "@/components/layout/layout"
import { ChatInterface } from "@/components/chat/chat-interface"
import { useParams } from "next/navigation"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isTyping?: boolean
  status?: "sending" | "sent" | "delivered" | "error"
  threadId?: string
  parentId?: string
  toolsUsed?: string[]
  processingSteps?: {
    step: string
    status: "pending" | "processing" | "completed" | "error"
    timestamp: Date
  }[]
  metadata?: {
    sources?: string[]
    confidence?: number
    tokens?: number
    searchQuery?: string
    documentsRetrieved?: number
  }
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  isPinned?: boolean
  summary?: string
  threadId?: string
  tags?: string[]
  context?: {
    documentsUsed: string[]
    previousQueries: string[]
    userPreferences?: Record<string, any>
  }
}

export default function ConversationPage() {
  const params = useParams()
  const conversationId = params.id as string

  // Mock conversation data with NEW ENHANCED FEATURES
  const [conversation, setConversation] = React.useState<Conversation | undefined>({
    id: conversationId,
    title: "Q4 Project Planning & Strategy Discussion",
    threadId: "thread_" + conversationId,
    tags: ["Q4", "Planning", "Strategy", "Product Launch"],
    context: {
      documentsUsed: [
        "Q4_Report.pdf",
        "Project_Status.xlsx", 
        "Market_Analysis.docx",
        "Product_Launch_Plan.pdf",
        "Development_Timeline.xlsx"
      ],
      previousQueries: [
        "Q4 project planning",
        "product launch timeline",
        "critical path analysis"
      ]
    },
    messages: [
      {
        id: "1",
        content: "Hello! I'd like to discuss our Q4 project planning. Can you help me analyze the current status and suggest next steps?",
        role: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        status: "delivered",
        threadId: "thread_" + conversationId
      },
      {
        id: "2",
        content: "I'd be happy to help you with Q4 project planning! Based on the documents in our knowledge base, I can see we have several key initiatives underway.\n\nLet me analyze the current status:\n\n**Current Projects:**\n- Product Launch Initiative (85% complete)\n- Market Research Study (60% complete)\n- Team Expansion Plan (40% complete)\n\n**Key Recommendations:**\n1. **Prioritize Product Launch** - Focus resources on finalizing the launch timeline\n2. **Accelerate Market Research** - Complete analysis before Q4 end\n3. **Strategic Hiring** - Begin recruitment for critical roles\n\nWould you like me to dive deeper into any specific area or help you create a detailed action plan?",
        role: "assistant",
        timestamp: new Date(Date.now() - 1000 * 60 * 9),
        status: "delivered",
        threadId: "thread_" + conversationId,
        parentId: "1",
        toolsUsed: ["Document Search", "Content Retrieval", "Semantic Analysis"],
        processingSteps: [
          {
            step: "Analyzing query for Q4 planning context",
            status: "completed",
            timestamp: new Date(Date.now() - 1000 * 60 * 9.5)
          },
          {
            step: "Searching knowledge base (50 documents)",
            status: "completed",
            timestamp: new Date(Date.now() - 1000 * 60 * 9.4)
          },
          {
            step: "Retrieved 3 relevant documents",
            status: "completed",
            timestamp: new Date(Date.now() - 1000 * 60 * 9.3)
          },
          {
            step: "Analyzing project status and priorities",
            status: "completed",
            timestamp: new Date(Date.now() - 1000 * 60 * 9.2)
          },
          {
            step: "Generating recommendations",
            status: "completed",
            timestamp: new Date(Date.now() - 1000 * 60 * 9.1)
          }
        ],
        metadata: {
          sources: ["Q4_Report.pdf", "Project_Status.xlsx", "Market_Analysis.docx"],
          confidence: 0.92,
          tokens: 156,
          searchQuery: "Q4 project planning status recommendations",
          documentsRetrieved: 3
        }
      },
      {
        id: "3",
        content: "That's very helpful! Can you create a detailed timeline for the product launch initiative? I need to understand the critical path and dependencies.",
        role: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        status: "delivered",
        threadId: "thread_" + conversationId,
        parentId: "2"
      },
      {
        id: "4",
        content: "Absolutely! Let me create a comprehensive timeline for the Product Launch Initiative based on the project documentation.\n\n**Product Launch Critical Path Timeline:**\n\n**Week 1-2: Final Development**\n- Complete feature development (2 days)\n- Code review and testing (3 days)\n- Bug fixes and optimization (5 days)\n\n**Week 3: Quality Assurance**\n- Comprehensive testing (3 days)\n- Performance optimization (2 days)\n- Security audit (2 days)\n\n**Week 4: Launch Preparation**\n- Marketing material finalization (3 days)\n- Beta testing with select users (2 days)\n- Documentation completion (2 days)\n\n**Key Dependencies:**\n- Design approval (blocks marketing materials)\n- Legal review (blocks public launch)\n- Infrastructure scaling (blocks beta testing)\n\n**Risk Factors:**\n- Potential delays in design approval\n- Infrastructure scaling challenges\n- Beta user feedback requiring changes\n\nWould you like me to create a more detailed Gantt chart or identify potential bottlenecks?",
        role: "assistant",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
        status: "delivered",
        threadId: "thread_" + conversationId,
        parentId: "3",
        toolsUsed: ["Document Search", "Content Retrieval", "Timeline Generator", "Risk Analysis"],
        processingSteps: [
          {
            step: "Understanding timeline requirements",
            status: "completed",
            timestamp: new Date(Date.now() - 1000 * 60 * 4.8)
          },
          {
            step: "Searching for product launch documents",
            status: "completed",
            timestamp: new Date(Date.now() - 1000 * 60 * 4.6)
          },
          {
            step: "Retrieved 4 planning documents",
            status: "completed",
            timestamp: new Date(Date.now() - 1000 * 60 * 4.4)
          },
          {
            step: "Extracting timeline information",
            status: "completed",
            timestamp: new Date(Date.now() - 1000 * 60 * 4.2)
          },
          {
            step: "Identifying dependencies and risks",
            status: "completed",
            timestamp: new Date(Date.now() - 1000 * 60 * 4.1)
          },
          {
            step: "Creating structured timeline",
            status: "completed",
            timestamp: new Date(Date.now() - 1000 * 60 * 4)
          }
        ],
        metadata: {
          sources: [
            "Product_Launch_Plan.pdf", 
            "Development_Timeline.xlsx", 
            "Risk_Assessment.docx",
            "Dependencies_Matrix.xlsx"
          ],
          confidence: 0.88,
          tokens: 234,
          searchQuery: "product launch timeline critical path dependencies",
          documentsRetrieved: 4
        }
      }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
    isPinned: true,
    summary: "Discussion about Q4 project planning, focusing on product launch timeline and critical path analysis."
  })

  const handleSendMessage = (message: string, attachments?: File[]) => {
    if (!conversation) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
      status: "sending"
    }

    // Add user message immediately
    setConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newUserMessage],
      updatedAt: new Date()
    } : undefined)

    // Simulate AI response with ENHANCED FEATURES
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your question. Let me analyze this and provide you with a comprehensive response based on the available information in our knowledge base.\n\nBased on my analysis, here are the key points:\n\n• **Finding 1:** Relevant information from recent documents\n• **Finding 2:** Cross-referenced data from multiple sources\n• **Finding 3:** Actionable recommendations\n\nWould you like me to elaborate on any of these points?",
        role: "assistant",
        timestamp: new Date(),
        status: "delivered",
        threadId: conversation?.threadId,
        parentId: newUserMessage.id,
        toolsUsed: ["Document Search", "Content Retrieval", "Semantic Analysis"],
        processingSteps: [
          {
            step: "Analyzing your question",
            status: "completed",
            timestamp: new Date(Date.now() - 1800)
          },
          {
            step: "Searching knowledge base",
            status: "completed",
            timestamp: new Date(Date.now() - 1500)
          },
          {
            step: "Retrieved relevant documents",
            status: "completed",
            timestamp: new Date(Date.now() - 1000)
          },
          {
            step: "Generating comprehensive response",
            status: "completed",
            timestamp: new Date(Date.now() - 500)
          }
        ],
        metadata: {
          sources: ["Knowledge_Base.pdf", "Recent_Updates.docx", "Reference_Guide.pdf"],
          confidence: 0.89,
          tokens: 125,
          searchQuery: message.slice(0, 50),
          documentsRetrieved: 3
        }
      }

      setConversation(prev => prev ? {
        ...prev,
        messages: [...prev.messages, aiResponse],
        updatedAt: new Date(),
        context: {
          ...prev.context!,
          previousQueries: [...(prev.context?.previousQueries || []), message.slice(0, 50)]
        }
      } : undefined)
    }, 2000)
  }

  const handleNewConversation = () => {
    // Navigate to new conversation
    window.location.href = "/conversations/new"
  }

  const handleDeleteConversation = (conversationId: string) => {
    if (confirm("Are you sure you want to delete this conversation?")) {
      // Delete conversation logic
      console.log("Deleting conversation:", conversationId)
    }
  }

  const handlePinConversation = (conversationId: string) => {
    setConversation(prev => prev ? {
      ...prev,
      isPinned: !prev.isPinned
    } : undefined)
  }

  const handleExportConversation = (conversationId: string) => {
    console.log("Exporting conversation:", conversationId)
    // Export logic here
  }

  const handleShareConversation = (conversationId: string) => {
    console.log("Sharing conversation:", conversationId)
    // Share logic here
  }

  return (
    <Layout>
      <div className="h-full">
        <ChatInterface
          conversation={conversation}
          onSendMessage={handleSendMessage}
          onNewConversation={handleNewConversation}
          onDeleteConversation={handleDeleteConversation}
          onPinConversation={handlePinConversation}
          onExportConversation={handleExportConversation}
          onShareConversation={handleShareConversation}
          className="h-full"
        />
      </div>
    </Layout>
  )
}
