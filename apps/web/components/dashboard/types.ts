// Role-Based Access Control Types
export type UserRole = 'LEGAL' | 'BOD' | 'FINANCE' | 'BANK' | 'NOTARY' | 'SALES'
export type Platform = 'DESKTOP' | 'WEB' | 'MOBILE'
export type Stage = 'PRA_AKAD' | 'AKAD' | 'PASCA_AKAD'
export type ProfileType = 'FIXED_INCOME' | 'NON_FIXED' | 'PROFESSIONAL'
export type DocumentStatus = 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'COMPLETED'
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

// User & Role
export interface User {
  id: string
  name: string
  role: UserRole
  email: string
  permissions: string[]
}

// Document Types
export interface Document {
  id: string
  name: string
  type: 'VERIFICATION' | 'CONTRACT' | 'FINANCIAL' | 'PROPERTY' | 'INSURANCE'
  status: DocumentStatus
  uploadedAt: string
  updatedAt: string
  requiredBy: string
  notes?: string
}

// Bank & Notary Pipeline
export interface PipelineUnit {
  id: string
  applicantName: string
  loanAmount: number // in Rp
  stage: Stage
  profileType: ProfileType
  status: DocumentStatus
  startDate: string
  completionDate?: string
  documents: Document[]
  bankName: string
  notaryName?: string
  riskLevel: RiskLevel
  daysStuck: number // for bottleneck detection
}

// Document Profile Configuration
export interface DocumentProfile {
  id: string
  type: ProfileType
  stageRequirements: {
    [key in Stage]: string[]
  }
  customFields?: Record<string, string>
}

// Analytics & KPI
export interface KPIData {
  totalUnits: number
  completedUnits: number
  pendingUnits: number
  completionPercentage: number
  averageProcessingDays: number
  totalValue: number // in Rp
  processedValue: number // in Rp
  bottlenecks: BottleneckAlert[]
}

// Bottleneck Detection
export interface BottleneckAlert {
  id: string
  unitId: string
  applicantName: string
  stage: Stage
  daysStuck: number
  riskLevel: RiskLevel
  blockingDocument: string
  recommendedAction: string
}

// Dashboard Configuration
export interface DashboardState {
  currentUser: User
  platform: Platform
  selectedRole: UserRole
  activeStage: Stage
  selectedProfile?: ProfileType
  filters: DashboardFilters
}

export interface DashboardFilters {
  stage?: Stage
  status?: DocumentStatus
  riskLevel?: RiskLevel
  dateFrom?: string
  dateTo?: string
  searchQuery?: string
}

// Response Models
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  timestamp: string
}

// Hub-specific interfaces
export interface HubConfig {
  name: string
  role: UserRole[]
  platforms: Platform[]
  features: string[]
}

export interface TableRow {
  id: string
  [key: string]: any
}
