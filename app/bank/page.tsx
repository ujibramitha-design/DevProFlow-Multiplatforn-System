'use client'

import React, { useState } from 'react'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopbar } from '@/components/dashboard/topbar'
import { FileText, CheckCircle2, Clock, Upload } from 'lucide-react'

// TOP METRICS DATA
const topMetrics = [
  { label: 'Total Applications Submitted', value: '34 Units', icon: FileText, color: 'blue' },
  { label: 'Total Approved (SP3K)', value: '18 Units', icon: CheckCircle2, color: 'green' },
  { label: 'Average Processing Time', value: '14 Days', icon: Clock, color: 'amber' },
]

// KPR APPLICATION TRACKER DATA
const kprApplicationsData = [
  { nama: 'Ahmad Fauzi', plafon: 'Rp 850.000.000', status: 'SP3K Terbit', sp3kDate: '20 Apr 2026' },
  { nama: 'Siti Nurhaliza', plafon: 'Rp 950.000.000', status: 'Menunggu Appraisal', daysWaiting: 5 },
  { nama: 'Budi Santoso', plafon: 'Rp 1.100.000.000', status: 'SP3K Terbit', sp3kDate: '18 Apr 2026' },
  { nama: 'Dewi Lestari', plafon: 'Rp 875.000.000', status: 'Ditolak', rejectReason: 'Income Verification Failed' },
  { nama: 'Rendra Wijaya', plafon: 'Rp 1.200.000.000', status: 'Menunggu Appraisal', daysWaiting: 12 },
  { nama: 'Bambang Irawan', plafon: 'Rp 700.000.000', status: 'SP3K Terbit', sp3kDate: '22 Apr 2026' },
  { nama: 'Eka Putri', plafon: 'Rp 925.000.000', status: 'Menunggu Appraisal', daysWaiting: 8 },
  { nama: 'Fahri Rahman', plafon: 'Rp 1.050.000.000', status: 'SP3K Terbit', sp3kDate: '15 Apr 2026' },
  { nama: 'Gita Merah', plafon: 'Rp 800.000.000', status: 'Ditolak', rejectReason: 'Collateral Valuation Issues' },
  { nama: 'Hendra Gunawan', plafon: 'Rp 1.150.000.000', status: 'Menunggu Appraisal', daysWaiting: 3 },
]

// RECENT ACTIVITY DATA (Latest 5 Updates)
const recentActivityData = [
  { date: '28 Apr 2026', time: '14:32', nasabah: 'Ahmad Fauzi', action: 'SP3K Diterbitkan', unit: 'A-102' },
  { date: '27 Apr 2026', time: '10:15', nasabah: 'Budi Santoso', action: 'Appraisal Selesai', unit: 'B-201' },
  { date: '26 Apr 2026', time: '16:45', nasabah: 'Dewi Lestari', action: 'Aplikasi Ditolak', unit: 'B-205' },
  { date: '25 Apr 2026', time: '09:20', nasabah: 'Rendra Wijaya', action: 'Dokumen Lengkap Diterima', unit: 'C-301' },
  { date: '24 Apr 2026', time: '13:50', nasabah: 'Bambang Irawan', action: 'SP3K Diterbitkan', unit: 'C-305' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Menunggu Appraisal':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    case 'SP3K Terbit':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    case 'Ditolak':
      return 'bg-red-500/20 text-red-300 border border-red-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

const getActivityActionColor = (action: string) => {
  if (action.includes('Diterbitkan')) return 'text-emerald-400'
  if (action.includes('Ditolak')) return 'text-red-400'
  if (action.includes('Selesai')) return 'text-blue-400'
  return 'text-cyan-400'
}

export default function BankPage() {
  const [selectedApp, setSelectedApp] = useState<string | null>(null)

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-8 py-7">
            {/* HEADER */}
            <div>
              <h1 className="text-4xl font-bold text-foreground">Bank Verification & KPR Approval Portal</h1>
              <p className="mt-2 text-muted-foreground">Track KPR application submissions, appraisal status, and SP3K (Approval Letter) generation</p>
            </div>

            {/* TOP 3 METRICS */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topMetrics.map((metric) => {
                const IconComponent = metric.icon
                const colorMap = {
                  blue: 'from-blue-500/15 to-blue-500/5 text-blue-400',
                  green: 'from-green-500/15 to-green-500/5 text-green-400',
                  amber: 'from-amber-500/15 to-amber-500/5 text-amber-400',
                }
                return (
                  <div
                    key={metric.label}
                    className={`rounded-2xl bg-gradient-to-br ${colorMap[metric.color as keyof typeof colorMap]} p-6 ring-1 ring-border/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                        <p className="mt-3 text-right text-2xl font-bold">{metric.value}</p>
                      </div>
                      <IconComponent className="mt-1 size-5" strokeWidth={2} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* APPLICATION TRACKER TABLE */}
            <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-6 border-b border-border/40">
                <h2 className="text-xl font-bold text-foreground">KPR Application Tracker</h2>
                <p className="mt-1 text-xs text-muted-foreground">Monitor loan applications, appraisal status, and SP3K approval letters</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 bg-card/50">
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Nama Nasabah</th>
                      <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Plafon Diajukan</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Appraisal Status</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kprApplicationsData.map((app, idx) => (
                      <tr key={idx} className="border-b border-border/20 transition-colors hover:bg-card/50">
                        <td className="px-6 py-4 font-medium">{app.nama}</td>
                        <td className="px-6 py-4 text-right font-semibold text-cyan-400">{app.plafon}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {app.status === 'SP3K Terbit' ? (
                            <button
                              onClick={() => setSelectedApp(app.nama)}
                              className="inline-flex items-center gap-2 rounded-lg bg-blue-500/20 px-3 py-2 text-xs font-semibold text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-all"
                            >
                              <Upload className="size-3" />
                              Upload SP3K
                            </button>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RECENT ACTIVITY SECTION */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* RECENT ACTIVITY LIST */}
              <div className="rounded-2xl border border-border/40 bg-card/50 p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
                <p className="mt-1 text-xs text-muted-foreground mb-6">Latest 5 status updates from bank</p>
                <div className="space-y-3">
                  {recentActivityData.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-4 rounded-lg border border-border/20 bg-white/5 p-4 backdrop-blur-md">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm text-foreground">{activity.nasabah}</p>
                          <span className="text-xs text-muted-foreground">{activity.unit}</span>
                        </div>
                        <p className={`text-xs font-medium mb-1 ${getActivityActionColor(activity.action)}`}>{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.date} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* APPLICATION STATISTICS */}
              <div className="rounded-2xl border border-border/40 bg-card/50 p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-foreground">Application Statistics</h2>
                <p className="mt-1 text-xs text-muted-foreground mb-6">Current status breakdown</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-border/20 bg-white/5 p-4 backdrop-blur-md">
                    <div>
                      <p className="text-xs text-muted-foreground">Menunggu Appraisal</p>
                      <p className="text-sm font-semibold text-amber-300 mt-1">4 Aplikasi</p>
                    </div>
                    <div className="text-right">
                      <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-1/3"></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">40%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border/20 bg-white/5 p-4 backdrop-blur-md">
                    <div>
                      <p className="text-xs text-muted-foreground">SP3K Terbit</p>
                      <p className="text-sm font-semibold text-emerald-300 mt-1">4 Aplikasi</p>
                    </div>
                    <div className="text-right">
                      <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-1/3"></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">40%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border/20 bg-white/5 p-4 backdrop-blur-md">
                    <div>
                      <p className="text-xs text-muted-foreground">Ditolak</p>
                      <p className="text-sm font-semibold text-red-300 mt-1">2 Aplikasi</p>
                    </div>
                    <div className="text-right">
                      <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-1/4"></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">20%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
