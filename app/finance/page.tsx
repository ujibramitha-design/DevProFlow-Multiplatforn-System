'use client'

import React from 'react'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopbar } from '@/components/dashboard/topbar'
import { TrendingUp, DollarSign, Lock, CheckCircle2, AlertCircle } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// TOP STAT CARDS DATA
const statCards = [
  { label: 'Total Revenue Pipeline', value: 'Rp 277.5 B', icon: DollarSign, color: 'blue' },
  { label: 'Expected Cash-In (30 Days)', value: 'Rp 42.1 B', icon: TrendingUp, color: 'green' },
  { label: 'Total Retention Holding', value: 'Rp 12.8 B', icon: Lock, color: 'amber' },
  { label: 'Realized Revenue', value: 'Rp 156.4 B', icon: CheckCircle2, color: 'emerald' },
  { label: 'Pending Claims', value: '18 Units | Rp 4.5 B', icon: AlertCircle, color: 'red' },
]

// MONTHLY CASH-IN PROJECTION DATA
const projectionData = [
  { month: 'Apr', revenue: 28.5 },
  { month: 'May', revenue: 35.2 },
  { month: 'Jun', revenue: 42.1 },
  { month: 'Jul', revenue: 38.9 },
  { month: 'Aug', revenue: 45.3 },
  { month: 'Sep', revenue: 52.1 },
]

// RETENTION CLAIMS TABLE DATA
const retentionClaimsData = [
  { nasabah: 'Ahmad Fauzi', plafon: 'Rp 500 M', retensi: 'Rp 25 M', estimasiCair: 'Apr 2026', status: 'Ready' },
  { nasabah: 'Siti Nurhaliza', plafon: 'Rp 750 M', retensi: 'Rp 37.5 M', estimasiCair: 'May 2026', status: 'Ready' },
  { nasabah: 'Dr. Budi Santoso', plafon: 'Rp 1,200 M', retensi: 'Rp 60 M', estimasiCair: 'Jun 2026', status: 'Processing' },
  { nasabah: 'Bambang Irawan', plafon: 'Rp 600 M', retensi: 'Rp 30 M', estimasiCair: 'Jul 2026', status: 'Ready' },
  { nasabah: 'Eka Putri', plafon: 'Rp 850 M', retensi: 'Rp 42.5 M', estimasiCair: 'Aug 2026', status: 'Pending' },
  { nasabah: 'Fahri Rahman', plafon: 'Rp 700 M', retensi: 'Rp 35 M', estimasiCair: 'Sep 2026', status: 'Ready' },
]

// FINANCE TICKERS DATA
const financeTickersData = {
  recentCashIn: [
    { unit: 'A-102', amount: 'Rp 42.5 M', date: '28 Mar 2026' },
    { unit: 'B-205', amount: 'Rp 35.8 M', date: '27 Mar 2026' },
    { unit: 'C-308', amount: 'Rp 58.2 M', date: '26 Mar 2026' },
    { unit: 'D-410', amount: 'Rp 29.1 M', date: '25 Mar 2026' },
    { unit: 'E-512', amount: 'Rp 65.3 M', date: '24 Mar 2026' },
    { unit: 'F-614', amount: 'Rp 47.9 M', date: '23 Mar 2026' },
    { unit: 'G-715', amount: 'Rp 52.6 M', date: '22 Mar 2026' },
    { unit: 'H-816', amount: 'Rp 38.4 M', date: '21 Mar 2026' },
    { unit: 'I-917', amount: 'Rp 71.2 M', date: '20 Mar 2026' },
    { unit: 'J-1018', amount: 'Rp 44.8 M', date: '19 Mar 2026' },
  ],
  dueForClaim: [
    { unit: 'K-1119', amount: 'Rp 25.0 M', overdue: '5 hari' },
    { unit: 'L-1220', amount: 'Rp 37.5 M', overdue: '12 hari' },
    { unit: 'M-1321', amount: 'Rp 60.0 M', overdue: '3 hari' },
    { unit: 'N-1422', amount: 'Rp 30.0 M', overdue: '8 hari' },
    { unit: 'O-1523', amount: 'Rp 42.5 M', overdue: '15 hari' },
    { unit: 'P-1624', amount: 'Rp 35.0 M', overdue: '7 hari' },
    { unit: 'Q-1725', amount: 'Rp 48.2 M', overdue: '10 hari' },
    { unit: 'R-1826', amount: 'Rp 52.1 M', overdue: '6 hari' },
    { unit: 'S-1927', amount: 'Rp 39.8 M', overdue: '9 hari' },
    { unit: 'T-2028', amount: 'Rp 56.3 M', overdue: '14 hari' },
  ],
  bankDisbursement: [
    { unit: 'U-2129', bank: 'BCA', status: 'Processing' },
    { unit: 'V-2230', bank: 'Mandiri', status: 'Approved' },
    { unit: 'W-2331', bank: 'BRI', status: 'Processing' },
    { unit: 'X-2432', bank: 'CIMB', status: 'Pending' },
    { unit: 'Y-2533', bank: 'Panin', status: 'Approved' },
    { unit: 'Z-2634', bank: 'BCA', status: 'Processing' },
    { unit: 'AA-2735', bank: 'Mandiri', status: 'Approved' },
    { unit: 'AB-2836', bank: 'BRI', status: 'Pending' },
    { unit: 'AC-2937', bank: 'CIMB', status: 'Processing' },
    { unit: 'AD-3038', bank: 'Panin', status: 'Approved' },
  ],
}

// HORIZONTAL FINANCE TABLE COMPONENT
function FinanceTable({ items, label, color, type }: { items: any[]; label: string; color: string; type: 'cash' | 'claim' | 'disbursement' }) {
  const colorDot = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    emerald: 'bg-emerald-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    cyan: 'bg-cyan-500',
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
      case 'Processing':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
      case 'Pending':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className={`size-2 rounded-full ${colorDot[color as keyof typeof colorDot]} animate-pulse`}></div>
        <h3 className="text-sm font-semibold text-foreground">{label}</h3>
      </div>
      <div className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-max">
            {type === 'cash' && (
              <>
                <div className="bg-card/50 px-6 py-4 border-b border-border/40 flex gap-8">
                  <div className="flex-1 min-w-[120px] text-xs font-semibold text-muted-foreground">Unit</div>
                  <div className="flex-1 min-w-[140px] text-right text-xs font-semibold text-muted-foreground">Amount</div>
                  <div className="flex-1 min-w-[140px] text-right text-xs font-semibold text-muted-foreground">Date</div>
                </div>
                {items.slice(0, 8).map((item, idx) => (
                  <div key={idx} className="border-b border-border/20 hover:bg-white/5 transition-colors">
                    <div className="px-6 py-3 flex gap-8">
                      <div className="flex-1 min-w-[120px] font-medium text-sm text-foreground">{item.unit}</div>
                      <div className="flex-1 min-w-[140px] text-right text-sm font-semibold text-cyan-400">{item.amount}</div>
                      <div className="flex-1 min-w-[140px] text-right text-sm text-muted-foreground">{item.date}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {type === 'claim' && (
              <>
                <div className="bg-card/50 px-6 py-4 border-b border-border/40 flex gap-8">
                  <div className="flex-1 min-w-[120px] text-xs font-semibold text-muted-foreground">Unit</div>
                  <div className="flex-1 min-w-[140px] text-right text-xs font-semibold text-muted-foreground">Amount</div>
                  <div className="flex-1 min-w-[140px] text-right text-xs font-semibold text-muted-foreground">Overdue</div>
                </div>
                {items.slice(0, 8).map((item, idx) => (
                  <div key={idx} className="border-b border-border/20 hover:bg-white/5 transition-colors">
                    <div className="px-6 py-3 flex gap-8">
                      <div className="flex-1 min-w-[120px] font-medium text-sm text-foreground">{item.unit}</div>
                      <div className="flex-1 min-w-[140px] text-right text-sm font-semibold text-cyan-400">{item.amount}</div>
                      <div className="flex-1 min-w-[140px] text-right text-sm text-amber-400 font-medium">{item.overdue}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {type === 'disbursement' && (
              <>
                <div className="bg-card/50 px-6 py-4 border-b border-border/40 flex gap-8">
                  <div className="flex-1 min-w-[120px] text-xs font-semibold text-muted-foreground">Unit</div>
                  <div className="flex-1 min-w-[120px] text-xs font-semibold text-muted-foreground">Bank</div>
                  <div className="flex-1 min-w-[140px] text-xs font-semibold text-muted-foreground">Status</div>
                </div>
                {items.slice(0, 8).map((item, idx) => (
                  <div key={idx} className="border-b border-border/20 hover:bg-white/5 transition-colors">
                    <div className="px-6 py-3 flex gap-8 items-center">
                      <div className="flex-1 min-w-[120px] font-medium text-sm text-foreground">{item.unit}</div>
                      <div className="flex-1 min-w-[120px] text-sm text-foreground">{item.bank}</div>
                      <div className="flex-1 min-w-[140px]">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FinancePage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-8 py-7">
            {/* HEADER */}
            <div>
              <h1 className="text-4xl font-bold text-foreground">Finance Dashboard</h1>
              <p className="mt-2 text-muted-foreground">Revenue Pipeline, Cash Flow Projection & Retention Claims Management</p>
            </div>

            {/* TOP 5 STAT CARDS */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {statCards.map((card) => {
                const IconComponent = card.icon
                const colorMap = {
                  blue: 'from-blue-500/15 to-blue-500/5 text-blue-400',
                  green: 'from-green-500/15 to-green-500/5 text-green-400',
                  emerald: 'from-emerald-500/15 to-emerald-500/5 text-emerald-400',
                  amber: 'from-amber-500/15 to-amber-500/5 text-amber-400',
                  red: 'from-red-500/15 to-red-500/5 text-red-400',
                }
                return (
                  <div
                    key={card.label}
                    className={`rounded-2xl bg-gradient-to-br ${colorMap[card.color as keyof typeof colorMap]} p-6 ring-1 ring-border/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                        <p className="mt-3 text-right text-2xl font-bold">{card.value}</p>
                      </div>
                      <IconComponent className="mt-1 size-5" strokeWidth={2} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* REVENUE PROJECTION CHART */}
            <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
              <h2 className="mb-6 text-xl font-bold text-foreground">Monthly Cash-In Projection (Next 6 Months)</h2>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={projectionData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `Rp ${value} B`}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#colorRevenue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* RETENTION CLAIMS TABLE */}
            <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-6 border-b border-border/40">
                <h2 className="text-xl font-bold text-foreground">Retention Claims - Dana Siap Ditagih</h2>
                <p className="mt-1 text-xs text-muted-foreground">Daftar retensi yang siap dicairkan setelah Pasca-Akad/Balik Nama selesai</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 bg-card/50">
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Nama Nasabah</th>
                      <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Plafon KPR</th>
                      <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Nilai Retensi (5%)</th>
                      <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Estimasi Cair</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Status Trigger</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retentionClaimsData.map((item, idx) => (
                      <tr key={idx} className="border-b border-border/20 transition-colors hover:bg-card/50">
                        <td className="px-6 py-4 font-medium">{item.nasabah}</td>
                        <td className="px-6 py-4 text-right text-sm">{item.plafon}</td>
                        <td className="px-6 py-4 text-right text-sm font-semibold text-cyan-400">{item.retensi}</td>
                        <td className="px-6 py-4 text-right text-sm">{item.estimasiCair}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                              item.status === 'Ready'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : item.status === 'Processing'
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* LIVE FINANCE TABLES - 3 COLUMNS WITH WIDE HORIZONTAL ROWS */}
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
              <FinanceTable items={financeTickersData.recentCashIn} label="RECENT CASH-IN" color="blue" type="cash" />
              <FinanceTable items={financeTickersData.dueForClaim} label="DUE FOR CLAIM" color="amber" type="claim" />
              <FinanceTable items={financeTickersData.bankDisbursement} label="BANK DISBURSEMENT QUEUE" color="cyan" type="disbursement" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
