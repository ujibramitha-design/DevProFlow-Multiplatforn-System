'use client'

import React, { useState, useEffect } from 'react'
import { User, Home, Building2, Circle, FileText } from 'lucide-react'

interface DocStatus {
  ktp: boolean
  kk: boolean
  npwp: boolean
}

interface CaseData {
  id: number
  name: string
  unit: string
  bank: string
  plafon: string
  docs: DocStatus
  status: 'Ready' | 'Pending' | 'Review' | 'Scheduled'
}

// PRA-AKAD DATA - Document Readiness (15 Units)
const praaAkadData: CaseData[] = [
  { id: 1, name: 'Ahmad Fauzi', unit: 'A1-05', bank: 'Mandiri', plafon: 'Rp 850jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Ready' },
  { id: 2, name: 'Siti Nurhaliza', unit: 'B2-12', bank: 'BCA', plafon: 'Rp 420jt', docs: { ktp: true, kk: false, npwp: false }, status: 'Pending' },
  { id: 3, name: 'Budi Santoso', unit: 'C3-08', bank: 'BRI', plafon: 'Rp 950jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready' },
  { id: 4, name: 'Dewi Lestari', unit: 'D4-15', bank: 'Mandiri', plafon: 'Rp 745jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Review' },
  { id: 5, name: 'Rendra Wijaya', unit: 'E5-03', bank: 'BCA', plafon: 'Rp 680jt', docs: { ktp: false, kk: true, npwp: false }, status: 'Pending' },
  { id: 6, name: 'Bambang Irawan', unit: 'F6-11', bank: 'BRI', plafon: 'Rp 1.1M', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready' },
  { id: 7, name: 'Eka Putri', unit: 'G7-06', bank: 'Mandiri', plafon: 'Rp 560jt', docs: { ktp: true, kk: false, npwp: true }, status: 'Pending' },
  { id: 8, name: 'Fahri Rahman', unit: 'H8-09', bank: 'BCA', plafon: 'Rp 890jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready' },
  { id: 9, name: 'Gita Merah', unit: 'I9-04', bank: 'BRI', plafon: 'Rp 725jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Review' },
  { id: 10, name: 'Hendra Gunawan', unit: 'J10-07', bank: 'Mandiri', plafon: 'Rp 810jt', docs: { ktp: false, kk: false, npwp: true }, status: 'Scheduled' },
  { id: 11, name: 'Iwan Setiawan', unit: 'K11-02', bank: 'BCA', plafon: 'Rp 780jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready' },
  { id: 12, name: 'Joko Pranoto', unit: 'L12-14', bank: 'BRI', plafon: 'Rp 920jt', docs: { ktp: true, kk: false, npwp: false }, status: 'Pending' },
]

// AKAD DATA - Bank Scheduling & Signing (8 Units)
const akadData: CaseData[] = [
  { id: 13, name: 'Kartika Sari', unit: 'M13-10', bank: 'Mandiri', plafon: 'Rp 1.2M', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready' },
  { id: 14, name: 'Lina Handoko', unit: 'N14-05', bank: 'BCA', plafon: 'Rp 550jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Scheduled' },
  { id: 15, name: 'Mardi Kusuma', unit: 'O15-13', bank: 'BRI', plafon: 'Rp 880jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready' },
  { id: 16, name: 'Niken Wijaya', unit: 'P16-08', bank: 'Mandiri', plafon: 'Rp 650jt', docs: { ktp: false, kk: true, npwp: true }, status: 'Pending' },
  { id: 17, name: 'Ompong Harahap', unit: 'Q17-11', bank: 'BCA', plafon: 'Rp 740jt', docs: { ktp: true, kk: false, npwp: false }, status: 'Review' },
  { id: 18, name: 'Pandu Arjuna', unit: 'R18-06', bank: 'BRI', plafon: 'Rp 1.05M', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready' },
  { id: 19, name: 'Quarantine Salim', unit: 'S19-09', bank: 'Mandiri', plafon: 'Rp 615jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Scheduled' },
  { id: 20, name: 'Rini Handiani', unit: 'T20-03', bank: 'BCA', plafon: 'Rp 835jt', docs: { ktp: true, kk: false, npwp: true }, status: 'Ready' },
]

// PASCA-AKAD DATA - Certificate & TBO (12 Units)
const pascaAkadData: CaseData[] = [
  { id: 21, name: 'Sapto Wijaya', unit: 'U21-12', bank: 'BRI', plafon: 'Rp 965jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready' },
  { id: 22, name: 'Tri Buwono', unit: 'V22-07', bank: 'Mandiri', plafon: 'Rp 520jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Scheduled' },
  { id: 23, name: 'Udin Setiawan', unit: 'W23-14', bank: 'BCA', plafon: 'Rp 700jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready' },
  { id: 24, name: 'Vina Magdalena', unit: 'X24-04', bank: 'BRI', plafon: 'Rp 875jt', docs: { ktp: false, kk: true, npwp: true }, status: 'Review' },
  { id: 25, name: 'Wahyu Pratama', unit: 'Y25-11', bank: 'Mandiri', plafon: 'Rp 795jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Pending' },
  { id: 26, name: 'Xander Kusuma', unit: 'Z26-09', bank: 'BCA', plafon: 'Rp 910jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready' },
  { id: 27, name: 'Yuli Rahmawati', unit: 'AA27-02', bank: 'BRI', plafon: 'Rp 645jt', docs: { ktp: true, kk: false, npwp: true }, status: 'Scheduled' },
  { id: 28, name: 'Zulfan Arianto', unit: 'AB28-06', bank: 'Mandiri', plafon: 'Rp 1.15M', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready' },
  { id: 29, name: 'Amelia Santos', unit: 'AC29-13', bank: 'BCA', plafon: 'Rp 480jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Review' },
  { id: 30, name: 'Bambang Setia', unit: 'AD30-08', bank: 'BRI', plafon: 'Rp 825jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Pending' },
  { id: 31, name: 'Citra Dewi', unit: 'AE31-10', bank: 'Mandiri', plafon: 'Rp 715jt', docs: { ktp: false, kk: false, npwp: true }, status: 'Ready' },
  { id: 32, name: 'Dedi Sutrisno', unit: 'AF32-05', bank: 'BCA', plafon: 'Rp 940jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Scheduled' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ready':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    case 'Scheduled':
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    case 'Review':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    case 'Pending':
      return 'bg-red-500/20 text-red-300 border border-red-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

interface TickerSectionProps {
  title: string
  subtitle: string
  data: CaseData[]
  color: string
}

const TickerSection: React.FC<TickerSectionProps> = ({ title, subtitle, data, color }) => {
  const [displayData, setDisplayData] = useState<CaseData[]>([...data, ...data])

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayData(prev => {
        const newData = [...prev]
        newData.push(newData.shift()!)
        return newData
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [data])

  return (
    <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 border-b border-border/40">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>

      <div className="relative h-[540px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-10" />
        
        <div className="space-y-1 p-3 h-full overflow-y-auto scrollbar-hide">
          {displayData.slice(0, 12).map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-background/40 hover:bg-background/60 transition-colors border border-border/20">
              {/* Name & Icon */}
              <div className="flex items-center gap-2 min-w-[140px]">
                <User className="size-4 text-primary/60" />
                <span className="text-sm font-medium text-foreground truncate">{item.name}</span>
              </div>

              {/* Unit */}
              <div className="flex items-center gap-2 min-w-[90px]">
                <Home className="size-4 text-blue-400/60" />
                <span className="text-sm text-muted-foreground">{item.unit}</span>
              </div>

              {/* Bank */}
              <div className="flex items-center gap-2 min-w-[100px]">
                <Building2 className="size-4 text-amber-400/60" />
                <span className="text-sm text-muted-foreground">{item.bank}</span>
              </div>

              {/* Plafon (Right Aligned) */}
              <div className="flex-1 text-right pr-4">
                <span className="text-sm font-semibold text-cyan-400">{item.plafon}</span>
              </div>

              {/* Checklist Dots */}
              <div className="flex items-center gap-1.5 px-3">
                <div
                  className={`size-2 rounded-full ${item.docs.ktp ? 'bg-emerald-500' : 'bg-red-500'}`}
                  title="KTP"
                />
                <div
                  className={`size-2 rounded-full ${item.docs.kk ? 'bg-emerald-500' : 'bg-red-500'}`}
                  title="KK"
                />
                <div
                  className={`size-2 rounded-full ${item.docs.npwp ? 'bg-emerald-500' : 'bg-red-500'}`}
                  title="NPWP"
                />
              </div>

              {/* Status Badge */}
              <div className="min-w-[100px]">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LegalTripleTicker() {
  return (
    <div className="space-y-8">
      <TickerSection
        title="PRA-AKAD: PEMBERKASAN & INTERNAL PREP"
        subtitle="Focus: Document Readiness - 15 Units | Rp 45.5B"
        data={praaAkadData}
        color="blue"
      />

      <TickerSection
        title="AKAD: PENJADWALAN & REALISASI BANK"
        subtitle="Focus: Bank Scheduling & Signing - 8 Units | Rp 24.2B"
        data={akadData}
        color="green"
      />

      <TickerSection
        title="PASCA-AKAD: BALIK NAMA & SERTIFIKAT"
        subtitle="Focus: Certificate & TBO - 12 Units | Rp 36.0B"
        data={pascaAkadData}
        color="emerald"
      />
    </div>
  )
}
