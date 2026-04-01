'use client'

import React, { useState, useMemo } from 'react'
import { Search, Clock, CheckCircle2, AlertTriangle, User, Home, Building2, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  profile: 'Fixed Income' | 'Non-Fixed/Professional'
}

// COMPREHENSIVE DATA - 30+ CASES ACROSS 3 STAGES
const praaAkadData: CaseData[] = [
  { id: 1, name: 'Ahmad Fauzi', unit: 'A1-05', bank: 'Mandiri', plafon: 'Rp 850jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Ready', profile: 'Fixed Income' },
  { id: 2, name: 'Siti Nurhaliza', unit: 'B2-12', bank: 'BCA', plafon: 'Rp 420jt', docs: { ktp: true, kk: false, npwp: false }, status: 'Pending', profile: 'Non-Fixed/Professional' },
  { id: 3, name: 'Budi Santoso', unit: 'C3-08', bank: 'BRI', plafon: 'Rp 950jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready', profile: 'Fixed Income' },
  { id: 4, name: 'Dewi Lestari', unit: 'D4-15', bank: 'Mandiri', plafon: 'Rp 745jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Review', profile: 'Fixed Income' },
  { id: 5, name: 'Rendra Wijaya', unit: 'E5-03', bank: 'BCA', plafon: 'Rp 680jt', docs: { ktp: false, kk: true, npwp: false }, status: 'Pending', profile: 'Non-Fixed/Professional' },
  { id: 6, name: 'Bambang Irawan', unit: 'F6-11', bank: 'BRI', plafon: 'Rp 1.1M', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready', profile: 'Fixed Income' },
  { id: 7, name: 'Eka Putri', unit: 'G7-06', bank: 'Mandiri', plafon: 'Rp 560jt', docs: { ktp: true, kk: false, npwp: true }, status: 'Pending', profile: 'Non-Fixed/Professional' },
  { id: 8, name: 'Fahri Rahman', unit: 'H8-09', bank: 'BCA', plafon: 'Rp 890jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready', profile: 'Fixed Income' },
  { id: 9, name: 'Gita Merah', unit: 'I9-04', bank: 'BRI', plafon: 'Rp 725jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Review', profile: 'Fixed Income' },
  { id: 10, name: 'Hendra Gunawan', unit: 'J10-07', bank: 'Mandiri', plafon: 'Rp 810jt', docs: { ktp: false, kk: false, npwp: true }, status: 'Scheduled', profile: 'Non-Fixed/Professional' },
  { id: 11, name: 'Iwan Setiawan', unit: 'K11-02', bank: 'BCA', plafon: 'Rp 780jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready', profile: 'Fixed Income' },
  { id: 12, name: 'Joko Pranoto', unit: 'L12-14', bank: 'BRI', plafon: 'Rp 920jt', docs: { ktp: true, kk: false, npwp: false }, status: 'Pending', profile: 'Non-Fixed/Professional' },
  { id: 13, name: 'Kartika Sari', unit: 'M13-10', bank: 'Mandiri', plafon: 'Rp 1.2M', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready', profile: 'Fixed Income' },
  { id: 14, name: 'Lina Handoko', unit: 'N14-08', bank: 'BCA', plafon: 'Rp 650jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Review', profile: 'Non-Fixed/Professional' },
]

const akadData: CaseData[] = [
  { id: 15, name: 'Mardi Kusuma', unit: 'O15-11', bank: 'BRI', plafon: 'Rp 1.05M', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready', profile: 'Fixed Income' },
  { id: 16, name: 'Niken Wijaya', unit: 'P16-05', bank: 'Mandiri', plafon: 'Rp 780jt', docs: { ktp: true, kk: false, npwp: true }, status: 'Pending', profile: 'Non-Fixed/Professional' },
  { id: 17, name: 'Ompong Harahap', unit: 'Q17-09', bank: 'BCA', plafon: 'Rp 920jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready', profile: 'Fixed Income' },
  { id: 18, name: 'Pandu Arjuna', unit: 'R18-13', bank: 'BRI', plafon: 'Rp 1.15M', docs: { ktp: true, kk: true, npwp: false }, status: 'Scheduled', profile: 'Non-Fixed/Professional' },
  { id: 19, name: 'Quarantine Salim', unit: 'S19-07', bank: 'Mandiri', plafon: 'Rp 680jt', docs: { ktp: false, kk: true, npwp: true }, status: 'Review', profile: 'Fixed Income' },
  { id: 20, name: 'Rini Handiani', unit: 'T20-02', bank: 'BCA', plafon: 'Rp 810jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready', profile: 'Non-Fixed/Professional' },
  { id: 21, name: 'Sapto Wijaya', unit: 'U21-10', bank: 'BRI', plafon: 'Rp 945jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Pending', profile: 'Fixed Income' },
]

const pascaAkadData: CaseData[] = [
  { id: 22, name: 'Tri Buwono', unit: 'V22-06', bank: 'Mandiri', plafon: 'Rp 1.3M', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready', profile: 'Non-Fixed/Professional' },
  { id: 23, name: 'Udin Setiawan', unit: 'W23-14', bank: 'BCA', plafon: 'Rp 750jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Scheduled', profile: 'Fixed Income' },
  { id: 24, name: 'Vina Magdalena', unit: 'X24-03', bank: 'BRI', plafon: 'Rp 880jt', docs: { ktp: true, kk: false, npwp: false }, status: 'Pending', profile: 'Non-Fixed/Professional' },
  { id: 25, name: 'Wahyu Pratama', unit: 'Y25-11', bank: 'Mandiri', plafon: 'Rp 1.05M', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready', profile: 'Fixed Income' },
  { id: 26, name: 'Xander Limantara', unit: 'Z26-08', bank: 'BCA', plafon: 'Rp 695jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Review', profile: 'Non-Fixed/Professional' },
  { id: 27, name: 'Yolanda Suryanto', unit: 'AA27-04', bank: 'BRI', plafon: 'Rp 920jt', docs: { ktp: true, kk: true, npwp: true }, status: 'Ready', profile: 'Fixed Income' },
  { id: 28, name: 'Zainudin Abbas', unit: 'AB28-12', bank: 'Mandiri', plafon: 'Rp 1.2M', docs: { ktp: false, kk: true, npwp: true }, status: 'Pending', profile: 'Non-Fixed/Professional' },
  { id: 29, name: 'Adi Kusuma', unit: 'AC29-09', bank: 'BCA', plafon: 'Rp 780jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Review', profile: 'Fixed Income' },
]

// STAT CARDS CONFIG
const statCards = [
  { label: 'Pra-Akad', count: 14, value: 'Rp 11.8B', icon: Clock, color: 'blue' },
  { label: 'Akad', count: 7, value: 'Rp 6.9B', icon: CheckCircle2, color: 'green' },
  { label: 'Pasca-Akad', count: 8, value: 'Rp 7.6B', icon: CheckCircle2, color: 'emerald' },
  { label: 'SP3K Issued', count: 3, value: 'Rp 2.8B', icon: CheckCircle2, color: 'purple' },
  { label: 'Missing Docs', count: 5, value: 'Critical', icon: AlertTriangle, color: 'red' },
]

// TICKER ROW COMPONENT
function TickerRow({ item }: { item: CaseData }) {
  return (
    <div className="flex items-center gap-6 border-b border-border/20 px-6 py-3 hover:bg-white/5 transition-colors animate-in fade-in duration-500">
      {/* Name + Icon */}
      <div className="flex items-center gap-2 min-w-[140px]">
        <User className="size-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">{item.name}</span>
      </div>

      {/* Unit + Icon */}
      <div className="flex items-center gap-2 min-w-[100px]">
        <Home className="size-4 text-muted-foreground" />
        <span className="text-sm text-foreground">{item.unit}</span>
      </div>

      {/* Bank + Icon */}
      <div className="flex items-center gap-2 min-w-[110px]">
        <Building2 className="size-4 text-muted-foreground" />
        <span className="text-sm text-foreground">{item.bank}</span>
      </div>

      {/* Checklist Dots - Green/Red */}
      <div className="flex items-center gap-2 min-w-[80px]">
        <Circle className={`size-2 rounded-full ${item.docs.ktp ? 'bg-emerald-500' : 'bg-red-500'}`} />
        <Circle className={`size-2 rounded-full ${item.docs.kk ? 'bg-emerald-500' : 'bg-red-500'}`} />
        <Circle className={`size-2 rounded-full ${item.docs.npwp ? 'bg-emerald-500' : 'bg-red-500'}`} />
      </div>

      {/* Status Badge - Right Aligned */}
      <div className="ml-auto flex-shrink-0">
        <span className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
          item.status === 'Ready' && 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
          item.status === 'Pending' && 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
          item.status === 'Review' && 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
          item.status === 'Scheduled' && 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
        )}>
          {item.status}
        </span>
      </div>
    </div>
  )
}

// COLUMN TICKER SECTION
function ColumnTicker({ title, items, color }: { title: string; items: CaseData[]; color: string }) {
  const colorMap = { blue: 'text-blue-400', green: 'text-green-400', emerald: 'text-emerald-400' }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-1">
        <Circle className={`size-2 ${colorMap[color as keyof typeof colorMap]} rounded-full animate-pulse`} />
        <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{title}</h3>
      </div>
      <div className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden max-h-[450px] overflow-y-auto">
        {items.map((item) => (
          <TickerRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function LegalMasterDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProfile, setSelectedProfile] = useState<'all' | 'fixed' | 'nonfixed'>('all')

  // FILTER DATA BY PROFILE
  const filteredPraaAkad = useMemo(() => {
    let data = praaAkadData
    if (selectedProfile === 'fixed') data = data.filter((d) => d.profile === 'Fixed Income')
    if (selectedProfile === 'nonfixed') data = data.filter((d) => d.profile === 'Non-Fixed/Professional')
    if (searchTerm) data = data.filter((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.unit.includes(searchTerm))
    return data
  }, [selectedProfile, searchTerm])

  const filteredAkad = useMemo(() => {
    let data = akadData
    if (selectedProfile === 'fixed') data = data.filter((d) => d.profile === 'Fixed Income')
    if (selectedProfile === 'nonfixed') data = data.filter((d) => d.profile === 'Non-Fixed/Professional')
    if (searchTerm) data = data.filter((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.unit.includes(searchTerm))
    return data
  }, [selectedProfile, searchTerm])

  const filteredPascaAkad = useMemo(() => {
    let data = pascaAkadData
    if (selectedProfile === 'fixed') data = data.filter((d) => d.profile === 'Fixed Income')
    if (selectedProfile === 'nonfixed') data = data.filter((d) => d.profile === 'Non-Fixed/Professional')
    if (searchTerm) data = data.filter((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.unit.includes(searchTerm))
    return data
  }, [selectedProfile, searchTerm])

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Document & Pipeline Tracker</h1>
          <p className="mt-2 text-muted-foreground">Real-time Legal Operation & Monitoring</p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by customer name or unit number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border/40 bg-background/60 pl-12 pr-4 py-3 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* STAT CARDS ROW */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {statCards.map((card) => {
          const Icon = card.icon
          const colorMap = {
            blue: 'from-blue-500/15 to-blue-500/5 text-blue-400',
            green: 'from-green-500/15 to-green-500/5 text-green-400',
            emerald: 'from-emerald-500/15 to-emerald-500/5 text-emerald-400',
            purple: 'from-purple-500/15 to-purple-500/5 text-purple-400',
            red: 'from-red-500/15 to-red-500/5 text-red-400',
          }
          return (
            <div
              key={card.label}
              className={`rounded-xl bg-gradient-to-br ${colorMap[card.color as keyof typeof colorMap]} p-4 ring-1 ring-border/30 backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{card.label}</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{card.count}</p>
                  <p className="text-right text-sm font-semibold text-foreground">{card.value}</p>
                </div>
                <Icon className="mt-1 size-5 flex-shrink-0" strokeWidth={2} />
              </div>
            </div>
          )
        })}
      </div>

      {/* PROFILE SEGMENTATION TABS */}
      <div className="flex gap-3 border-b border-border/40 pb-4">
        {[
          { id: 'all', label: 'All Profiles' },
          { id: 'fixed', label: 'Fixed Income' },
          { id: 'nonfixed', label: 'Non-Fixed/Professional' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedProfile(tab.id as any)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg',
              selectedProfile === tab.id
                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TRIPLE-TICKER GRID (3 COLUMNS) */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <ColumnTicker title="PRA-AKAD" items={filteredPraaAkad} color="blue" />
        <ColumnTicker title="AKAD" items={filteredAkad} color="green" />
        <ColumnTicker title="PASCA-AKAD" items={filteredPascaAkad} color="emerald" />
      </div>
    </div>
  )
}
