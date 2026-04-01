'use client'

import React, { useState, useMemo } from 'react'
import { DollarSign, TrendingUp, Lock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// RETENTION RECOVERY DATA - Connected to Pasca-Akad stage
const retentionRecoveryData = [
  { nasabah: 'Ahmad Fauzi', unit: 'A-102', bank: 'Mandiri', plafon: 'Rp 850.000.000', retention: 'Rp 42.500.000', legalStatus: 'Sertifikat Ready', status: 'Ready' },
  { nasabah: 'Siti Nurhaliza', unit: 'A-105', bank: 'BCA', plafon: 'Rp 420.000.000', retention: 'Rp 21.000.000', legalStatus: 'Minuta Done', status: 'Processing' },
  { nasabah: 'Budi Santoso', unit: 'B-201', bank: 'Mandiri', plafon: 'Rp 1.200.000.000', retention: 'Rp 60.000.000', legalStatus: 'Sertifikat Ready', status: 'Ready' },
  { nasabah: 'Dewi Lestari', unit: 'B-205', bank: 'BRI', plafon: 'Rp 650.000.000', retention: 'Rp 32.500.000', legalStatus: 'Minuta Done', status: 'Pending' },
  { nasabah: 'Rendra Wijaya', unit: 'C-301', bank: 'Mandiri', plafon: 'Rp 950.000.000', retention: 'Rp 47.500.000', legalStatus: 'Sertifikat Ready', status: 'Ready' },
  { nasabah: 'Bambang Irawan', unit: 'C-305', bank: 'BCA', plafon: 'Rp 780.000.000', retention: 'Rp 39.000.000', legalStatus: 'Sertifikat Ready', status: 'Ready' },
  { nasabah: 'Eka Putri', unit: 'D-401', bank: 'BRI', plafon: 'Rp 520.000.000', retention: 'Rp 26.000.000', legalStatus: 'Pending Review', status: 'Blocked' },
  { nasabah: 'Fahri Rahman', unit: 'D-405', bank: 'Mandiri', plafon: 'Rp 1.100.000.000', retention: 'Rp 55.000.000', legalStatus: 'Sertifikat Ready', status: 'Ready' },
  { nasabah: 'Gita Merah', unit: 'E-501', bank: 'BCA', plafon: 'Rp 680.000.000', retention: 'Rp 34.000.000', legalStatus: 'Minuta Done', status: 'Processing' },
  { nasabah: 'Hendra Gunawan', unit: 'E-505', bank: 'BRI', plafon: 'Rp 800.000.000', retention: 'Rp 40.000.000', legalStatus: 'Sertifikat Ready', status: 'Ready' },
]

// RECENT DISBURSEMENTS DATA
const recentDisbursementsData = [
  { bank: 'Mandiri', amount: 'Rp 42.5 M' },
  { bank: 'BCA', amount: 'Rp 35.8 M' },
  { bank: 'BRI', amount: 'Rp 58.2 M' },
  { bank: 'Mandiri', amount: 'Rp 29.1 M' },
  { bank: 'BCA', amount: 'Rp 65.3 M' },
  { bank: 'BRI', amount: 'Rp 47.9 M' },
  { bank: 'Mandiri', amount: 'Rp 52.6 M' },
  { bank: 'BCA', amount: 'Rp 38.4 M' },
  { bank: 'BRI', amount: 'Rp 71.2 M' },
  { bank: 'Mandiri', amount: 'Rp 44.8 M' },
]

// REVENUE FUNNEL STAGES
const revenueFunnelStages = [
  { stage: 'LEGAL PREP', value: 'Rp 45.5 B', icon: '📋', color: 'from-blue-500/20 to-blue-500/5' },
  { stage: 'BANK PROCESS', value: 'Rp 38.2 B', icon: '🏦', color: 'from-purple-500/20 to-purple-500/5' },
  { stage: 'READY TO CLAIM', value: 'Rp 28.9 B', icon: '✓', color: 'from-emerald-500/20 to-emerald-500/5' },
  { stage: 'CASHED IN', value: 'Rp 22.1 B', icon: '💰', color: 'from-cyan-500/20 to-cyan-500/5' },
]

const getLegalStatusColor = (status: string) => {
  switch (status) {
    case 'Sertifikat Ready':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    case 'Minuta Done':
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    case 'Pending Review':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ready':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    case 'Processing':
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    case 'Pending':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    case 'Blocked':
      return 'bg-red-500/20 text-red-300 border border-red-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

export default function FinanceIntegrationHub() {
  // Calculate totals for top cards
  const totalRetentionReady = retentionRecoveryData
    .filter((item) => item.legalStatus === 'Sertifikat Ready')
    .reduce((sum, item) => sum + parseInt(item.retention.replace(/\D/g, '')), 0)

  const expectedCashIn = 45500000000
  const realizedRevenue = 156400000000

  return (
    <div className="space-y-8">
      {/* TOP FINANCE CARDS - Right-Aligned Numbers */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Retention Ready to Claim */}
        <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-6 backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Retention Ready to Claim</p>
              <p className="mt-3 text-right text-2xl font-bold text-emerald-400">Rp 12.800.000.000</p>
            </div>
            <Lock className="size-5 text-emerald-400" />
          </div>
        </div>

        {/* Expected Cash-In from Akad */}
        <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-6 backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Expected Cash-In (from Akad)</p>
              <p className="mt-3 text-right text-2xl font-bold text-blue-400">Rp 45.500.000.000</p>
            </div>
            <TrendingUp className="size-5 text-blue-400" />
          </div>
        </div>

        {/* Total Realized Revenue */}
        <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 p-6 backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Realized Revenue (This Month)</p>
              <p className="mt-3 text-right text-2xl font-bold text-cyan-400">Rp 156.400.000.000</p>
            </div>
            <DollarSign className="size-5 text-cyan-400" />
          </div>
        </div>
      </div>

      {/* REVENUE FUNNEL - Visual Tracking */}
      <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
        <h3 className="mb-6 text-lg font-bold text-foreground">Revenue Flow Funnel</h3>
        <div className="flex flex-col gap-4">
          {revenueFunnelStages.map((stage, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className={cn('rounded-xl bg-gradient-to-br p-6 flex-1', stage.color)}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{stage.stage}</p>
                    <p className="mt-2 text-right text-lg font-bold text-foreground">{stage.value}</p>
                  </div>
                  <span className="text-2xl">{stage.icon}</span>
                </div>
              </div>
              {idx < revenueFunnelStages.length - 1 && (
                <ArrowRight className="size-5 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RETENTION RECOVERY TRACKER - Connected to Pasca-Akad */}
      <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
        <h3 className="mb-6 text-lg font-bold text-foreground">Retention Recovery Tracker (From Pasca-Akad)</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 bg-card/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Nama Nasabah</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Unit</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Bank</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Total Plafon</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Retention (5%)</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Legal Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {retentionRecoveryData.map((item, idx) => {
                const isProcessable = item.legalStatus === 'Sertifikat Ready'
                return (
                  <tr key={idx} className="border-b border-border/20 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-medium text-sm text-foreground">{item.nasabah}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{item.unit}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{item.bank}</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-cyan-400">{item.plafon}</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-emerald-400">{item.retention}</td>
                    <td className="px-4 py-3">
                      <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', getLegalStatusColor(item.legalStatus))}>
                        {item.legalStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        disabled={!isProcessable}
                        className={cn(
                          'rounded-lg px-4 py-2 text-xs font-semibold transition-all',
                          isProcessable
                            ? 'bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer'
                            : 'bg-gray-500/10 text-gray-400 cursor-not-allowed opacity-50'
                        )}
                      >
                        Process Claim
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECENT DISBURSEMENTS TICKER */}
      <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
        <h3 className="mb-6 text-lg font-bold text-foreground">Recent Bank Disbursements (Pencairan)</h3>
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-3">
            <div className="text-sm text-muted-foreground mb-4">Last 10 Successful Transactions</div>
            <div className="space-y-2">
              {recentDisbursementsData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg bg-white/5 p-3 border border-border/20">
                  <span className="font-medium text-sm text-foreground">{item.bank}</span>
                  <span className="text-sm font-semibold text-cyan-400">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1">
            <div className="rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 p-6 border border-border/40 text-center">
              <p className="text-xs font-medium text-muted-foreground uppercase mb-3">Total Disbursed</p>
              <p className="text-2xl font-bold text-green-400">Rp 515.8 M</p>
              <p className="text-xs text-muted-foreground mt-4">10 transactions</p>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
