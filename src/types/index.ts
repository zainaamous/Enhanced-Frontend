// Core Types for YOUMNA AI Dashboard

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'viewer'
  createdAt: string
  lastActive: string
}

export interface Conversation {
  conversation_id: string
  title: string
  created_at: string
  last_updated: string
  message_count: number
  metadata?: Record<string, any>
  summary?: string
}

export interface Message {
  message_id: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  metadata?: {
    sources?: number
    confidence?: number
    processing_time?: number
    [key: string]: any
  }
}

export interface Document {
  doc_id: string
  doc_uid: string
  source: string
  chunk_count: number
  version?: string
  indexed_at?: string
  metadata?: Record<string, any>
}

export interface QueryResult {
  answer: string
  sources: Array<{
    source: string
    content_preview?: string
    score?: number
  }>
  query_type: string
  confidence: number
  processing_time: number
  total_chunks_retrieved: number
  relevant_chunks_used: number
  conversation_id?: string
  metadata?: Record<string, any>
}

export interface SystemStats {
  indexing_stats: {
    vector_count: number
    index_dimension: number
    total_documents: number
    last_indexed: string
  }
  query_stats: {
    total_vectors: number
    queries_today: number
    avg_response_time: number
    success_rate: number
  }
  system_health: {
    api_status: 'healthy' | 'degraded' | 'error'
    database_status: 'connected' | 'disconnected' | 'error'
    memory_usage: string
    uptime: string
  }
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  currentConversationId: string | null
  isConnected: boolean
  error: string | null
}

export interface DashboardState {
  stats: SystemStats | null
  documents: Document[]
  conversations: Conversation[]
  isLoading: boolean
  error: string | null
}

export interface NotificationState {
  notifications: Notification[]
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: string
  read: boolean
  duration?: number
}

export interface WebSocketMessage {
  type: string
  data: any
  timestamp: string
}

export interface FileUpload {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
  result?: any
}

export interface ConversationSummary {
  conversation_id: string
  summary_text: string
  message_count: number
  created_at: string
  last_updated: string
  original_token_count?: number
  summary_token_count?: number
  token_reduction_percentage?: number
}

export interface SearchFilters {
  query: string
  dateRange?: {
    start: Date
    end: Date
  }
  documentTypes?: string[]
  conversationTypes?: string[]
  sortBy: 'date' | 'relevance' | 'title'
  sortOrder: 'asc' | 'desc'
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = any> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }>
}

export interface AnalyticsData {
  queriesPerDay: ChartData
  responseTimeTrend: ChartData
  documentUsage: ChartData
  conversationActivity: ChartData
  systemPerformance: {
    cpu: number
    memory: number
    disk: number
    network: number
  }
}

export interface Settings {
  theme: 'light' | 'dark' | 'system'
  language: string
  notifications: {
    enabled: boolean
    sound: boolean
    desktop: boolean
    email: boolean
  }
  chat: {
    autoSave: boolean
    showTimestamps: boolean
    showSources: boolean
    maxHistory: number
  }
  dashboard: {
    refreshInterval: number
    showAdvancedMetrics: boolean
    compactMode: boolean
  }
}

export interface Integration {
  id: string
  name: string
  type: 'slack' | 'notion' | 'google' | 'microsoft' | 'custom'
  status: 'connected' | 'disconnected' | 'error'
  config: Record<string, any>
  lastSync: string
  syncStatus: 'success' | 'error' | 'pending'
}

export interface Workflow {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'error'
  triggers: string[]
  steps: WorkflowStep[]
  createdAt: string
  updatedAt: string
  lastRun?: string
  runCount: number
}

export interface WorkflowStep {
  id: string
  type: string
  name: string
  config: Record<string, any>
  status: 'pending' | 'running' | 'completed' | 'error'
  result?: any
  error?: string
  duration?: number
}

export interface Agent {
  id: string
  name: string
  description: string
  type: 'general' | 'specialized' | 'custom'
  capabilities: string[]
  status: 'active' | 'inactive' | 'training'
  model: string
  parameters: Record<string, any>
  performance: {
    accuracy: number
    responseTime: number
    userSatisfaction: number
  }
  createdAt: string
  updatedAt: string
}

// Form Types
export interface LoginForm {
  email: string
  password: string
  remember: boolean
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export interface QueryForm {
  question: string
  useAdvancedFeatures: boolean
  includeSources: boolean
  conversationId?: string
}

export interface DocumentForm {
  title: string
  content: string
  source: string
  tags: string[]
  metadata: Record<string, any>
}

export interface ConversationForm {
  title: string
  metadata: Record<string, any>
}

// Component Props Types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

export interface InputProps extends BaseComponentProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  error?: string
  label?: string
  required?: boolean
}

export interface ModalProps extends BaseComponentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
}

export interface CardProps extends BaseComponentProps {
  title?: string
  description?: string
  actions?: React.ReactNode
}

// Hook Types
export interface UseWebSocketOptions {
  url: string
  reconnect?: boolean
  reconnectInterval?: number
  onMessage?: (message: WebSocketMessage) => void
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: Event) => void
}

export interface UseApiOptions {
  baseUrl?: string
  timeout?: number
  retries?: number
  onError?: (error: Error) => void
}

export interface UsePaginationOptions {
  pageSize?: number
  initialPage?: number
}

export interface UseSearchOptions {
  debounceMs?: number
  minLength?: number
  onSearch?: (query: string) => void
}

// Event Types
export interface ChatEvent {
  type: 'message' | 'typing' | 'stop_typing' | 'user_join' | 'user_leave'
  data: any
  timestamp: string
}

export interface DocumentEvent {
  type: 'upload' | 'process' | 'index' | 'delete' | 'error'
  document: Document
  timestamp: string
}

export interface SystemEvent {
  type: 'stats_update' | 'health_check' | 'error' | 'maintenance'
  data: any
  timestamp: string
}
