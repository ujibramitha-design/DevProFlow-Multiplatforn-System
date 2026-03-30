import {
  User, PipelineUnit, Document, KPIData, BottleneckAlert, DocumentProfile,
  UserRole, Stage, DocumentStatus, ProfileType, RiskLevel, Platform
} from './types'

// Mock Users by Role
export const mockUsers: Record<UserRole, User> = {
  LEGAL: {
    id: 'user-001',
    name: 'Budi Santoso',
    role: 'LEGAL',
    email: 'budi.santoso@devpro.id',
    permissions: ['view_all', 'edit_documents', 'manage_profiles', 'approve_documents', 'full_access']
  },
  BOD: {
    id: 'user-002',
    name: 'Dr. Bambang Wijaya',
    role: 'BOD',
    email: 'bambang.wijaya@devpro.id',
    permissions: ['view_analytics', 'view_kpi', 'view_risk']
  },
  FINANCE: {
    id: 'user-003',
    name: 'Sri Hartono',
    role: 'FINANCE',
    email: 'sri.hartono@devpro.id',
    permissions: ['view_analytics', 'view_kpi', 'view_financials']
  },
  BANK: {
    id: 'user-004',
    name: 'Ahmad Prabowo',
    role: 'BANK',
    email: 'ahmad.prabowo@bank.id',
    permissions: ['view_own_cases', 'upload_documents']
  },
  NOTARY: {
    id: 'user-005',
    name: 'Hendra Gunawan',
    role: 'NOTARY',
    email: 'hendra.gunawan@notary.id',
    permissions: ['view_own_cases', 'upload_documents']
  },
  SALES: {
    id: 'user-006',
    name: 'Sita Rahmawan',
    role: 'SALES',
    email: 'sita.rahmawan@devpro.id',
    permissions: ['view_status_simple']
  }
}

// Mock Document Profiles
export const mockDocumentProfiles: DocumentProfile[] = [
  {
    id: 'profile-fixed',
    type: 'FIXED_INCOME',
    stageRequirements: {
      PRA_AKAD: ['SK Gaji', 'Rekening Koran 3 Bulan', 'Kartu Kredit', 'Slip Gaji'],
      AKAD: ['Akta Notaris', 'Sertifikat Tanah', 'Bukti Pembayaran DP'],
      PASCA_AKAD: ['Asuransi', 'Premi Bulan Pertama']
    }
  },
  {
    id: 'profile-nonfixed',
    type: 'NON_FIXED',
    stageRequirements: {
      PRA_AKAD: ['Laporan Keuangan 2 Tahun', 'Rekening Koran 6 Bulan', 'NPWP'],
      AKAD: ['Akta Notaris', 'Sertifikat Tanah', 'Bukti Pembayaran DP'],
      PASCA_AKAD: ['Asuransi', 'Premi Bulan Pertama']
    }
  },
  {
    id: 'profile-professional',
    type: 'PROFESSIONAL',
    stageRequirements: {
      PRA_AKAD: ['SIPP/SIP', 'Surat Perikanan', 'Rekening Koran 6 Bulan'],
      AKAD: ['Akta Notaris', 'Sertifikat Tanah', 'Bukti Pembayaran DP'],
      PASCA_AKAD: ['Asuransi', 'Premi Bulan Pertama']
    }
  }
]

// Mock Pipeline Units
const generateMockUnits = (): PipelineUnit[] => {
  const names = ['Hari Sutrisno', 'Sinta Wijaya', 'Rudi Hermawan', 'Eka Putri', 'Bimo Saputro', 'Lina Kusuma', 'Dedi Maulana', 'Gita Amaliah']
  const banks = ['BCA', 'BRI', 'Mandiri', 'CIMB Niaga', 'Bank Rakyat']
  const notaries = ['Notaris Haryanto', 'Notaris Siti', 'Notaris Budi', 'Notaris Ahmad']
  
  return Array.from({ length: 24 }, (_, i) => ({
    id: `unit-${String(i + 1).padStart(3, '0')}`,
    applicantName: names[i % names.length],
    loanAmount: Math.floor(Math.random() * 500_000_000) + 100_000_000,
    stage: (['PRA_AKAD', 'AKAD', 'PASCA_AKAD'][i % 3] as Stage),
    profileType: (['FIXED_INCOME', 'NON_FIXED', 'PROFESSIONAL'][i % 3] as ProfileType),
    status: (['PENDING', 'SUBMITTED', 'APPROVED', 'COMPLETED'][i % 4] as DocumentStatus),
    startDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    completionDate: i % 4 === 3 ? new Date().toISOString() : undefined,
    documents: generateMockDocuments(i),
    bankName: banks[i % banks.length],
    notaryName: i % 3 !== 2 ? notaries[i % notaries.length] : undefined,
    riskLevel: i > 20 ? 'CRITICAL' : i > 15 ? 'HIGH' : i > 10 ? 'MEDIUM' : 'LOW',
    daysStuck: Math.floor(Math.random() * 60)
  }))
}

const generateMockDocuments = (unitIndex: number): Document[] => {
  const docTypes = ['VERIFICATION', 'CONTRACT', 'FINANCIAL', 'PROPERTY', 'INSURANCE']
  return docTypes.slice(0, 2 + (unitIndex % 3)).map((type, i) => ({
    id: `doc-${unitIndex}-${i}`,
    name: `${type} Document ${i + 1}`,
    type: type as any,
    status: (['PENDING', 'SUBMITTED', 'APPROVED', 'COMPLETED'][i % 4] as DocumentStatus),
    uploadedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
    requiredBy: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }))
}

export const mockPipelineUnits = generateMockUnits()

// Mock KPI Data
export const generateKPIData = (units: PipelineUnit[]): KPIData => {
  const completed = units.filter(u => u.status === 'COMPLETED').length
  const pending = units.filter(u => u.status === 'PENDING').length
  const total = units.length
  
  return {
    totalUnits: total,
    completedUnits: completed,
    pendingUnits: pending,
    completionPercentage: Math.round((completed / total) * 100),
    averageProcessingDays: Math.floor(Math.random() * 30) + 10,
    totalValue: units.reduce((sum, u) => sum + u.loanAmount, 0),
    processedValue: units.filter(u => u.status === 'COMPLETED').reduce((sum, u) => sum + u.loanAmount, 0),
    bottlenecks: generateBottleneckAlerts(units)
  }
}

const generateBottleneckAlerts = (units: PipelineUnit[]): BottleneckAlert[] => {
  return units
    .filter(u => u.daysStuck > 30)
    .slice(0, 5)
    .map((u, i) => ({
      id: `bottleneck-${i}`,
      unitId: u.id,
      applicantName: u.applicantName,
      stage: u.stage,
      daysStuck: u.daysStuck,
      riskLevel: u.riskLevel,
      blockingDocument: u.documents[0]?.name || 'Verification Document',
      recommendedAction: u.daysStuck > 45 ? 'Escalate to manager' : 'Follow up with applicant'
    }))
}

// Helper function to format Rupiah
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Helper function to get role display name
export const getRoleDisplayName = (role: UserRole): string => {
  const displayNames: Record<UserRole, string> = {
    LEGAL: 'Legal Hub',
    BOD: 'Board of Directors',
    FINANCE: 'Finance Hub',
    BANK: 'Bank Officer',
    NOTARY: 'Notary',
    SALES: 'Sales Team'
  }
  return displayNames[role]
}

// Helper function to determine risk color
export const getRiskColor = (risk: RiskLevel): string => {
  const colors: Record<RiskLevel, string> = {
    LOW: 'text-green-400',
    MEDIUM: 'text-yellow-400',
    HIGH: 'text-orange-400',
    CRITICAL: 'text-red-500'
  }
  return colors[risk]
}

// Helper function for risk badge styling
export const getRiskBadgeStyle = (risk: RiskLevel): string => {
  const styles: Record<RiskLevel, string> = {
    LOW: 'bg-green-500/20 text-green-300 border border-green-500/30',
    MEDIUM: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    HIGH: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    CRITICAL: 'bg-red-500/20 text-red-300 border border-red-500/30'
  }
  return styles[risk]
}
