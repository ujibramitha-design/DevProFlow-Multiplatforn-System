import { createClient } from '@supabase/supabase-js'
import { TemplateData } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface DatabaseRecord {
  id: string
  nama_nasabah?: string
  nik?: string
  alamat?: string
  no_telp?: string
  email?: string
  nama_properti?: string
  harga_properti?: number
  luas_tanah?: number
  luas_bangunan?: number
  tipe_unit?: string
  blok?: string
  nomor_unit?: string
  harga_jual?: number
  dp?: number
  cicilan?: number
  tenor?: number
  bank?: string
  notaris?: string
  tanggal_akad?: string
  tanggal_serah_terima?: string
  created_at?: string
  updated_at?: string
  [key: string]: any
}

export class DataMapper {
  async fetchRecordById(tableName: string, recordId: string): Promise<TemplateData | null> {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', recordId)
        .single()

      if (error) {
        console.error('Supabase fetch error:', error)
        return null
      }

      return this.mapDatabaseToTemplate(data)
    } catch (error) {
      console.error('Error fetching record:', error)
      return null
    }
  }

  async fetchMultipleRecords(tableName: string, recordIds: string[]): Promise<TemplateData[]> {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .in('id', recordIds)

      if (error) {
        console.error('Supabase fetch error:', error)
        return []
      }

      return data.map(record => this.mapDatabaseToTemplate(record))
    } catch (error) {
      console.error('Error fetching records:', error)
      return []
    }
  }

  async fetchAllRecords(tableName: string, filters?: Record<string, any>): Promise<TemplateData[]> {
    try {
      let query = supabase.from(tableName).select('*')

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }

      const { data, error } = await query

      if (error) {
        console.error('Supabase fetch error:', error)
        return []
      }

      return data.map(record => this.mapDatabaseToTemplate(record))
    } catch (error) {
      console.error('Error fetching records:', error)
      return []
    }
  }

  private mapDatabaseToTemplate(record: DatabaseRecord): TemplateData {
    return {
      NAMA_NASABAH: record.nama_nasabah || '',
      NIK: record.nik || '',
      ALAMAT: record.alamat || '',
      NO_TELP: record.no_telp || '',
      EMAIL: record.email || '',
      NAMA_PROPERTI: record.nama_properti || '',
      HARGA_PROPERTI: this.formatCurrency(record.harga_properti),
      LUAS_TANAH: record.luas_tanah || '',
      LUAS_BANGUNAN: record.luas_bangunan || '',
      TIPE_UNIT: record.tipe_unit || '',
      BLOK: record.blok || '',
      NOMOR_UNIT: record.nomor_unit || '',
      HARGA_JUAL: this.formatCurrency(record.harga_jual),
      DP: this.formatCurrency(record.dp),
      CICILAN: this.formatCurrency(record.cicilan),
      TENOR: record.tenor || '',
      BANK: record.bank || '',
      NOTARIS: record.notaris || '',
      TANGGAL: this.formatDate(new Date()),
      TANGGAL_AKAD: this.formatDate(record.tanggal_akad),
      TANGGAL_SERAH_TERIMA: this.formatDate(record.tanggal_serah_terima),
      ...record
    }
  }

  private formatCurrency(value?: number | string): string {
    if (!value) return 'Rp 0'
    const num = typeof value === 'string' ? parseFloat(value) : value
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num)
  }

  private formatDate(value?: string | Date): string {
    if (!value) return ''
    const date = typeof value === 'string' ? new Date(value) : value
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  mapCustomData(customData: Record<string, any>): TemplateData {
    const mapped: TemplateData = {
      TANGGAL: this.formatDate(new Date())
    }

    Object.entries(customData).forEach(([key, value]) => {
      const upperKey = key.toUpperCase()
      
      if (typeof value === 'number' && (key.toLowerCase().includes('harga') || key.toLowerCase().includes('price'))) {
        mapped[upperKey] = this.formatCurrency(value)
      } else if (value instanceof Date || (typeof value === 'string' && key.toLowerCase().includes('tanggal'))) {
        mapped[upperKey] = this.formatDate(value)
      } else {
        mapped[upperKey] = value
      }
    })

    return mapped
  }
}

export const dataMapper = new DataMapper()
