'use client'

import React, { useState, useEffect } from 'react'
import { User, Home, Building2, Circle, FileText } from 'lucide-react'

interface DocStatus {
  ktp: boolean
  kk: boolean
  npwp: boolean
}

interface AkadCase {
  id: number
  name: string
  unit: string
  bank: string
  plafon: string
  docs: DocStatus
  status: 'Ready' | 'Pending' | 'Review' | 'Scheduled'
}

const akadData: AkadCase[] = [
  { id: 1, name: 'Ahmad Fauzi', unit: 'A1-05', bank: 'Mandiri', plafon: 'Rp 850jt', docs: { ktp: true, kk: true, npwp: false }, status: 'Ready' },
  { id: 2, name: 'Siti Nur', unit: 'B2-12', bank: 'BCA', plafon: 'Rp 420jt', docs: { ktp: true, kk: false, npwp: false }, status: 'Pending' },
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ready':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    case 'Pending':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    case 'Review':
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    case 'Scheduled':
      return 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

const DocChecklistItem = ({ label, completed }: { label: string; completed: boolean }) => (
  <div className="flex flex-col items-center gap-1">
    <div className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${completed ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' : 'bg-red-500/30 text-red-300 border border-red-500/50'}`}>
      {label[0]}
    </div>
  </div>
)

const TickerRow = ({ item }: { item: AkadCase }) => (
  <div className="flex items-center gap-6 border-b border-border/20 px-6 py-4 transition-colors hover:bg-white/5 min-h-20">
    {/* Name + Icon */}
    <div className="flex items-center gap-3 w-32 shrink-0">
      <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
        <User className="size-4 text-primary" />
      </div>
      <span className="font-semibold text-foreground text-sm truncate">{item.name}</span>
    </div>

    {/* Unit */}
    <div className="flex items-center gap-2 w-24 shrink-0">
      <Home className="size-4 text-blue-400 shrink-0" />
      <span className="text-sm text-muted-foreground">{item.unit}</span>
    </div>

    {/* Bank */}
    <div className="flex items-center gap-2 w-28 shrink-0">
      <Building2 className="size-4 text-amber-400 shrink-0" />
      <span className="text-sm text-muted-foreground">{item.bank}</span>
    </div>

    {/* Plafon (Right Aligned) */}
    <div className="w-24 shrink-0 text-right">
      <span className="font-medium text-cyan-400 text-sm">{item.plafon}</span>
    </div>

    {/* Checklist Group - Horizontal */}
    <div className="flex items-center gap-2 shrink-0">
      <DocChecklistItem label="KTP" completed={item.docs.ktp} />
      <DocChecklistItem label="KK" completed={item.docs.kk} />
      <DocChecklistItem label="NPWP" completed={item.docs.npwp} />
    </div>

    {/* Status Badge */}
    <div className="shrink-0">
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}>
        {item.status}
      </span>
    </div>
  </div>
)

export default function AkadLiveTicker() {
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive((prev) => !prev)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full space-y-4">
      {/* Header with Live Indicator */}
      <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/50 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Circle className={`size-3 ${isLive ? 'fill-red-500 text-red-500 animate-pulse' : 'text-red-500'}`} />
          <span className="font-semibold text-foreground">LIVE MONITORING: TAHAP AKAD</span>
        </div>
      </div>

      {/* Ticker Container */}
      <div className="relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-b from-card/60 to-card/40 backdrop-blur-sm">
        {/* Gradient overlays */}
        <div className="absolute left-0 right-0 top-0 z-10 h-12 bg-gradient-to-b from-card/80 to-transparent pointer-events-none" />
        <div className="absolute left-0 right-0 bottom-0 z-10 h-12 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />

        <style>{`
          @keyframes scroll-up {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-100%);
            }
          }
          
          .ticker-wrapper {
            animation: scroll-up 45s linear infinite;
          }
          
          .ticker-wrapper:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="h-96 overflow-hidden">
          <div className="ticker-wrapper">
            {akadData.map((item) => (
              <TickerRow key={`first-${item.id}`} item={item} />
            ))}
            {akadData.map((item) => (
              <TickerRow key={`second-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
