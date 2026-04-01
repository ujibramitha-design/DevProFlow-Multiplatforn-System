/**
 * Document Profile System
 * Manages different document requirement profiles for KPR applicants
 * Based on WORKFLOW PROTOCOL standards
 */

export type DocumentProfileType = 'fixed-income' | 'non-fixed-income' | 'professional'

export interface DocumentRequirement {
  id: string
  label: string
  required: boolean
  description: string
  validationRules?: {
    expiryDate?: boolean
    legalization?: boolean
    originalRequired?: boolean
  }
}

export interface DocumentProfile {
  id: DocumentProfileType
  label: string
  description: string
  icon: string
  color: string
  documents: {
    personal: DocumentRequirement[]
    income: DocumentRequirement[]
    collateral: DocumentRequirement[]
    additional?: DocumentRequirement[]
  }
}

/**
 * Profile A: Fixed Income (Karyawan)
 * For salaried employees with fixed monthly income
 */
const fixedIncomeProfile: DocumentProfile = {
  id: 'fixed-income',
  label: 'Fixed Income (Karyawan)',
  description: 'Untuk karyawan dengan penghasilan tetap bulanan',
  icon: '💼',
  color: 'cyan',
  documents: {
    personal: [
      {
        id: 'ktp',
        label: 'KTP (Suami & Istri)',
        required: true,
        description: 'Fotocopy KTP yang masih berlaku',
        validationRules: {
          expiryDate: true,
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'kk',
        label: 'Kartu Keluarga (KK)',
        required: true,
        description: 'Fotocopy Kartu Keluarga terbaru',
        validationRules: {
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'npwp',
        label: 'NPWP',
        required: true,
        description: 'Fotocopy NPWP pribadi yang aktif',
        validationRules: {
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'akta_nikah',
        label: 'Akta Nikah/Cerai',
        required: true,
        description: 'Sesuai status pernikahan saat ini',
        validationRules: {
          legalization: false,
          originalRequired: false
        }
      }
    ],
    income: [
      {
        id: 'payslip_3months',
        label: 'Slip Gaji 3 Bulan Terakhir',
        required: true,
        description: 'Slip gaji asli atau fotocopy yang dilegalisir perusahaan',
        validationRules: {
          legalization: true,
          originalRequired: false
        }
      },
      {
        id: 'skk',
        label: 'Surat Keterangan Kerja (SKK)',
        required: true,
        description: 'Dari perusahaan, mencantumkan masa kerja dan jabatan',
        validationRules: {
          legalization: true,
          originalRequired: true
        }
      },
      {
        id: 'spt_21',
        label: 'SPT Tahunan PPh 21',
        required: true,
        description: 'SPT Tahunan 1 tahun terakhir',
        validationRules: {
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'rekening_koran',
        label: 'Rekening Koran 3 Bulan',
        required: true,
        description: 'Rekening tabungan/giro yang menunjukkan mutasi',
        validationRules: {
          originalRequired: true
        }
      }
    ],
    collateral: [
      {
        id: 'shm_shgb',
        label: 'Sertifikat Properti (SHM/SHGB)',
        required: true,
        description: 'Sertifikat asli yang akan dijaminkan',
        validationRules: {
          originalRequired: true
        }
      },
      {
        id: 'imb',
        label: 'IMB (Izin Mendirikan Bangunan)',
        required: true,
        description: 'IMB asli atau fotocopy yang dilegalisir',
        validationRules: {
          legalization: true,
          originalRequired: false
        }
      },
      {
        id: 'pbb_5years',
        label: 'PBB 5 Tahun Terakhir',
        required: true,
        description: 'Bukti pembayaran PBB yang sudah lunas',
        validationRules: {
          originalRequired: false
        }
      }
    ]
  }
}

/**
 * Profile B: Non-Fixed Income (Wirausaha)
 * For entrepreneurs and business owners
 */
const nonFixedIncomeProfile: DocumentProfile = {
  id: 'non-fixed-income',
  label: 'Non-Fixed Income (Wirausaha)',
  description: 'Untuk pengusaha dan pemilik bisnis',
  icon: '🏢',
  color: 'blue',
  documents: {
    personal: [
      {
        id: 'ktp',
        label: 'KTP (Suami & Istri)',
        required: true,
        description: 'Fotocopy KTP yang masih berlaku',
        validationRules: {
          expiryDate: true,
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'kk',
        label: 'Kartu Keluarga (KK)',
        required: true,
        description: 'Fotocopy Kartu Keluarga terbaru',
        validationRules: {
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'npwp',
        label: 'NPWP Pribadi/Badan',
        required: true,
        description: 'NPWP pribadi dan/atau badan usaha',
        validationRules: {
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'akta_nikah',
        label: 'Akta Nikah/Cerai',
        required: true,
        description: 'Sesuai status pernikahan saat ini',
        validationRules: {
          legalization: false,
          originalRequired: false
        }
      }
    ],
    income: [
      {
        id: 'nib_siup',
        label: 'NIB/SIUP/TDP',
        required: true,
        description: 'Nomor Induk Berusaha atau izin usaha lainnya',
        validationRules: {
          expiryDate: true,
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'financial_statement_6months',
        label: 'Laporan Keuangan 6 Bulan',
        required: true,
        description: 'Laporan keuangan usaha (audited/unaudited)',
        validationRules: {
          legalization: false,
          originalRequired: true
        }
      },
      {
        id: 'spt_badan',
        label: 'SPT Tahunan Badan/Pribadi',
        required: true,
        description: 'SPT Tahunan 1-2 tahun terakhir',
        validationRules: {
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'rekening_koran_business',
        label: 'Rekening Koran Usaha 6 Bulan',
        required: true,
        description: 'Rekening bisnis yang menunjukkan cash flow',
        validationRules: {
          originalRequired: true
        }
      },
      {
        id: 'business_recommendation',
        label: 'Surat Rekomendasi Bank',
        required: false,
        description: 'Surat rekomendasi dari bank tempat rekening usaha',
        validationRules: {
          originalRequired: true
        }
      }
    ],
    collateral: [
      {
        id: 'shm_shgb',
        label: 'Sertifikat Properti (SHM/SHGB)',
        required: true,
        description: 'Sertifikat asli yang akan dijaminkan',
        validationRules: {
          originalRequired: true
        }
      },
      {
        id: 'imb',
        label: 'IMB (Izin Mendirikan Bangunan)',
        required: true,
        description: 'IMB asli atau fotocopy yang dilegalisir',
        validationRules: {
          legalization: true,
          originalRequired: false
        }
      },
      {
        id: 'pbb_5years',
        label: 'PBB 5 Tahun Terakhir',
        required: true,
        description: 'Bukti pembayaran PBB yang sudah lunas',
        validationRules: {
          originalRequired: false
        }
      }
    ]
  }
}

/**
 * Profile C: Professional (Dokter, Lawyer, etc.)
 * For licensed professionals
 */
const professionalProfile: DocumentProfile = {
  id: 'professional',
  label: 'Professional (Dokter, Lawyer, dll)',
  description: 'Untuk profesional bersertifikat (dokter, pengacara, arsitek, dll)',
  icon: '⚕️',
  color: 'emerald',
  documents: {
    personal: [
      {
        id: 'ktp',
        label: 'KTP (Suami & Istri)',
        required: true,
        description: 'Fotocopy KTP yang masih berlaku',
        validationRules: {
          expiryDate: true,
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'kk',
        label: 'Kartu Keluarga (KK)',
        required: true,
        description: 'Fotocopy Kartu Keluarga terbaru',
        validationRules: {
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'npwp',
        label: 'NPWP',
        required: true,
        description: 'Fotocopy NPWP pribadi yang aktif',
        validationRules: {
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'akta_nikah',
        label: 'Akta Nikah/Cerai',
        required: true,
        description: 'Sesuai status pernikahan saat ini',
        validationRules: {
          legalization: false,
          originalRequired: false
        }
      }
    ],
    income: [
      {
        id: 'sip',
        label: 'Surat Izin Praktik (SIP)',
        required: true,
        description: 'SIP untuk dokter, lawyer, arsitek, dll',
        validationRules: {
          expiryDate: true,
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'certification',
        label: 'Sertifikat Keahlian',
        required: true,
        description: 'Sertifikat profesi atau keahlian',
        validationRules: {
          legalization: true,
          originalRequired: false
        }
      },
      {
        id: 'service_income_log',
        label: 'Catatan Penghasilan Jasa',
        required: true,
        description: 'Catatan penghasilan dari praktik/jasa profesional',
        validationRules: {
          originalRequired: true
        }
      },
      {
        id: 'spt_professional',
        label: 'SPT Tahunan Profesi',
        required: true,
        description: 'SPT Tahunan 1-2 tahun terakhir',
        validationRules: {
          legalization: false,
          originalRequired: false
        }
      },
      {
        id: 'rekening_koran',
        label: 'Rekening Koran 3-6 Bulan',
        required: true,
        description: 'Rekening yang menunjukkan penerimaan fee/jasa',
        validationRules: {
          originalRequired: true
        }
      },
      {
        id: 'client_list',
        label: 'Daftar Klien/Pasien (opsional)',
        required: false,
        description: 'Daftar klien/pasien untuk verifikasi (rahasia)',
        validationRules: {
          originalRequired: false
        }
      }
    ],
    collateral: [
      {
        id: 'shm_shgb',
        label: 'Sertifikat Properti (SHM/SHGB)',
        required: true,
        description: 'Sertifikat asli yang akan dijaminkan',
        validationRules: {
          originalRequired: true
        }
      },
      {
        id: 'imb',
        label: 'IMB (Izin Mendirikan Bangunan)',
        required: true,
        description: 'IMB asli atau fotocopy yang dilegalisir',
        validationRules: {
          legalization: true,
          originalRequired: false
        }
      },
      {
        id: 'pbb_5years',
        label: 'PBB 5 Tahun Terakhir',
        required: true,
        description: 'Bukti pembayaran PBB yang sudah lunas',
        validationRules: {
          originalRequired: false
        }
      }
    ],
    additional: [
      {
        id: 'practice_address_proof',
        label: 'Bukti Alamat Praktik',
        required: false,
        description: 'Bukti kepemilikan/sewa tempat praktik',
        validationRules: {
          originalRequired: false
        }
      }
    ]
  }
}

/**
 * Document Profile Registry
 */
export const DOCUMENT_PROFILES: Record<DocumentProfileType, DocumentProfile> = {
  'fixed-income': fixedIncomeProfile,
  'non-fixed-income': nonFixedIncomeProfile,
  'professional': professionalProfile
}

/**
 * Get document profile by type
 */
export function getDocumentProfile(profileType: DocumentProfileType): DocumentProfile {
  return DOCUMENT_PROFILES[profileType]
}

/**
 * Get all document profiles
 */
export function getAllDocumentProfiles(): DocumentProfile[] {
  return Object.values(DOCUMENT_PROFILES)
}

/**
 * Get all documents for a profile (flattened)
 */
export function getAllDocumentsForProfile(profileType: DocumentProfileType): DocumentRequirement[] {
  const profile = getDocumentProfile(profileType)
  return [
    ...profile.documents.personal,
    ...profile.documents.income,
    ...profile.documents.collateral,
    ...(profile.documents.additional || [])
  ]
}

/**
 * Get required documents count for a profile
 */
export function getRequiredDocumentsCount(profileType: DocumentProfileType): number {
  const allDocs = getAllDocumentsForProfile(profileType)
  return allDocs.filter(doc => doc.required).length
}

/**
 * Get document by ID from a profile
 */
export function getDocumentById(
  profileType: DocumentProfileType,
  documentId: string
): DocumentRequirement | undefined {
  const allDocs = getAllDocumentsForProfile(profileType)
  return allDocs.find(doc => doc.id === documentId)
}

/**
 * Validate document completeness
 */
export interface DocumentCompleteness {
  profileType: DocumentProfileType
  totalRequired: number
  totalSubmitted: number
  completionPercentage: number
  missingDocuments: DocumentRequirement[]
  submittedDocuments: string[]
}

export function validateDocumentCompleteness(
  profileType: DocumentProfileType,
  submittedDocumentIds: string[]
): DocumentCompleteness {
  const allDocs = getAllDocumentsForProfile(profileType)
  const requiredDocs = allDocs.filter(doc => doc.required)
  
  const missingDocs = requiredDocs.filter(
    doc => !submittedDocumentIds.includes(doc.id)
  )
  
  const totalRequired = requiredDocs.length
  const totalSubmitted = requiredDocs.length - missingDocs.length
  const completionPercentage = Math.round((totalSubmitted / totalRequired) * 100)
  
  return {
    profileType,
    totalRequired,
    totalSubmitted,
    completionPercentage,
    missingDocuments: missingDocs,
    submittedDocuments: submittedDocumentIds
  }
}

/**
 * Get color class for profile
 */
export function getProfileColorClass(profileType: DocumentProfileType): string {
  const profile = getDocumentProfile(profileType)
  const colorMap: Record<string, string> = {
    cyan: 'text-cyan-400 border-cyan-500 bg-cyan-500/10',
    blue: 'text-blue-400 border-blue-500 bg-blue-500/10',
    emerald: 'text-emerald-400 border-emerald-500 bg-emerald-500/10'
  }
  return colorMap[profile.color] || colorMap.cyan
}
