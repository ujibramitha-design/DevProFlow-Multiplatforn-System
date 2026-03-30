'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface AkadItem {
  id: string
  name: string
  amount: string
  status: 'sudah_akad' | 'akan_akad'
  date: string
}

const akadData: AkadItem[] = [
  { id: '1', name: 'Ahmad Fauzi', amount: 'Rp 450.000.000', status: 'sudah_akad', date: '28 Feb 2026' },
  { id: '2', name: 'Siti Nurhaliza', amount: 'Rp 620.000.000', status: 'akan_akad', date: '27 Feb 2026' },
  { id: '3', name: 'Budi Santoso', amount: 'Rp 380.000.000', status: 'sudah_akad', date: '26 Feb 2026' },
  { id: '4', name: 'Dewi Kartika', amount: 'Rp 550.000.000', status: 'akan_akad', date: '25 Feb 2026' },
  { id: '5', name: 'Reza Mahendra', amount: 'Rp 780.000.000', status: 'sudah_akad', date: '24 Feb 2026' },
  { id: '6', name: 'Anisa Rahma', amount: 'Rp 420.000.000', status: 'akan_akad', date: '23 Feb 2026' },
]

export function AkadScrollCard() {
  const [items, setItems] = useState<AkadItem[]>([])

  useEffect(() => {
    // Duplicate items for seamless loop
    setItems([...akadData, ...akadData])
  }, [])

  return (
    <div className="relative w-full h-80 rounded-2xl border border-border/40 bg-gradient-to-br from-slate-900/60 to-slate-900/40 backdrop-blur-xl overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent blur-3xl" />
      </div>

      {/* Content container */}
      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Header */}
        <div className="space-y-2 z-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">Kelengkapan Akad</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">234</span>
            <span className="text-sm text-muted-foreground">Sudah Akad / Akan Akad</span>
          </div>
        </div>

        {/* Scrolling text area */}
        <div className="relative h-40 flex-1 overflow-hidden rounded-lg border border-primary/10 bg-black/20 my-4 z-10">
          <div className="absolute inset-0 flex flex-col animate-scroll">
            {items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center justify-between px-4 py-2 border-b border-border/20 hover:bg-primary/5 transition-colors flex-shrink-0"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{item.name}</span>
                    <span
                      className={cn(
                        'text-xs px-2 py-1 rounded-full font-semibold',
                        item.status === 'sudah_akad'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      )}
                    >
                      {item.status === 'sudah_akad' ? 'Sudah Akad' : 'Akan Akad'}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground/70 mt-0.5">{item.amount}</div>
                </div>
                <div className="text-xs text-muted-foreground/60 ml-4 flex-shrink-0">{item.date}</div>
              </div>
            ))}
          </div>
          {/* Gradient fade for smooth scroll appearance */}
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-slate-900/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-900/60 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Stats footer */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-xs text-muted-foreground/60 uppercase tracking-wide">Sudah Akad</div>
              <div className="text-lg font-bold text-emerald-400">189</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground/60 uppercase tracking-wide">Akan Akad</div>
              <div className="text-lg font-bold text-amber-400">45</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground/50">Diperbarui: 29 Mar 2026</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
      `}</style>
    </div>
  )
}
