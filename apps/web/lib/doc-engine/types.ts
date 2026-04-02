export interface TemplateData {
  NAMA_NASABAH?: string
  NIK?: string
  HARGA_PROPERTI?: string | number
  TANGGAL?: string
  ALAMAT?: string
  NO_TELP?: string
  EMAIL?: string
  NAMA_PROPERTI?: string
  LUAS_TANAH?: string | number
  LUAS_BANGUNAN?: string | number
  TIPE_UNIT?: string
  BLOK?: string
  NOMOR_UNIT?: string
  HARGA_JUAL?: string | number
  DP?: string | number
  CICILAN?: string | number
  TENOR?: string | number
  BANK?: string
  NOTARIS?: string
  TANGGAL_AKAD?: string
  TANGGAL_SERAH_TERIMA?: string
  [key: string]: any
}

export interface Template {
  id: string
  name: string
  type: 'docx' | 'html'
  path: string
  description?: string
  category?: string
  variables?: string[]
  previewImage?: string
}

export interface GenerationOptions {
  templateId: string
  data: TemplateData
  outputFormat: 'docx' | 'pdf'
  preserveFormatting?: boolean
  imageQuality?: 'low' | 'medium' | 'high' | 'ultra'
  customVariables?: Record<string, any>
}

export interface BulkGenerationOptions {
  templates: string[]
  dataSource: 'database' | 'manual'
  recordIds?: string[]
  manualData?: TemplateData[]
  outputFormat: 'docx' | 'pdf'
  zipOutput?: boolean
}

export interface DocumentGenerationResult {
  success: boolean
  fileName: string
  fileBuffer?: Buffer
  fileUrl?: string
  error?: string
  metadata?: {
    templateUsed: string
    generatedAt: string
    dataUsed: TemplateData
  }
}
