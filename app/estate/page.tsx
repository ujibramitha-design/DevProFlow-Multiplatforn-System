'use client'

import React, { useState } from 'react'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopbar } from '@/components/dashboard/topbar'
import { CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react'

// TOP METRICS DATA
const topMetrics = [
  { label: 'Total BAST this Month', value: '24 Units', icon: CheckCircle2, color: 'green' },
  { label: 'Active Complaint Tickets', value: '7 Tickets', icon: AlertCircle, color: 'red', highlight: true },
  { label: 'Handover Success Rate', value: '98%', icon: TrendingUp, color: 'emerald' },
]

// BAST HANDOVER TRACKING DATA
const bastTrackerData = [
  { nama: 'Ahmad Fauzi', blok: 'A-102', jadwalBast: '15 Apr 2026', batasMasaRetensi: '15 May 2026', status: 'Sudah BAST' },
  { nama: 'Siti Nurhaliza', blok: 'A-105', jadwalBast: '18 Apr 2026', batasMasaRetensi: '18 May 2026', status: 'Cek Fisik Internal' },
  { nama: 'Budi Santoso', blok: 'B-201', jadwalBast: '22 Apr 2026', batasMasaRetensi: '22 May 2026', status: 'Sudah BAST' },
  { nama: 'Dewi Lestari', blok: 'B-205', jadwalBast: '10 Apr 2026', batasMasaRetensi: '10 May 2026', status: 'Perbaikan Defect' },
  { nama: 'Rendra Wijaya', blok: 'C-301', jadwalBast: '25 Apr 2026', batasMasaRetensi: '25 May 2026', status: 'Sudah BAST' },
  { nama: 'Bambang Irawan', blok: 'C-305', jadwalBast: '12 Apr 2026', batasMasaRetensi: '12 May 2026', status: 'Perbaikan Defect' },
  { nama: 'Eka Putri', blok: 'D-401', jadwalBast: '20 Apr 2026', batasMasaRetensi: '20 May 2026', status: 'Cek Fisik Internal' },
  { nama: 'Fahri Rahman', blok: 'D-405', jadwalBast: '28 Apr 2026', batasMasaRetensi: '28 May 2026', status: 'Sudah BAST' },
  { nama: 'Gita Merah', blok: 'E-501', jadwalBast: '08 Apr 2026', batasMasaRetensi: '08 May 2026', status: 'Cek Fisik Internal' },
  { nama: 'Hendra Gunawan', blok: 'E-505', jadwalBast: '30 Apr 2026', batasMasaRetensi: '30 May 2026', status: 'Sudah BAST' },
]

// COMPLAINT/DEFECT DATA
const defectTrackerData = [
  { nama: 'Ahmad Fauzi', blok: 'A-102', issue: 'Atap Bocor', priority: 'High', reportDate: '10 Apr 2026', status: 'In Progress' },
  { nama: 'Siti Nurhaliza', blok: 'A-105', issue: 'Cat Mengelupas', priority: 'Medium', reportDate: '12 Apr 2026', status: 'Pending Repair' },
  { nama: 'Budi Santoso', blok: 'B-201', issue: 'Kayu Kusen Melengkung', priority: 'High', reportDate: '08 Apr 2026', status: 'In Progress' },
  { nama: 'Dewi Lestari', blok: 'B-205', issue: 'Retakan Dinding', priority: 'Medium', reportDate: '15 Apr 2026', status: 'Pending Repair' },
  { nama: 'Rendra Wijaya', blok: 'C-301', issue: 'Lantai Bergelombang', priority: 'Low', reportDate: '18 Apr 2026', status: 'Completed' },
  { nama: 'Bambang Irawan', blok: 'C-305', issue: 'Plafon Bocor', priority: 'High', reportDate: '05 Apr 2026', status: 'In Progress' },
  { nama: 'Eka Putri', blok: 'D-401', issue: 'Pintu Tidak Rapat', priority: 'Low', reportDate: '20 Apr 2026', status: 'Pending Repair' },
  { nama: 'Fahri Rahman', blok: 'D-405', issue: 'Cela Plester Meluas', priority: 'Medium', reportDate: '14 Apr 2026', status: 'In Progress' },
  { nama: 'Gita Merah', blok: 'E-501', issue: 'Toilet Bising', priority: 'Low', reportDate: '22 Apr 2026', status: 'Completed' },
  { nama: 'Hendra Gunawan', blok: 'E-505', issue: 'Kaca Jendela Retak', priority: 'Medium', reportDate: '25 Apr 2026', status: 'Pending Repair' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Cek Fisik Internal':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    case 'Perbaikan Defect':
      return 'bg-red-500/20 text-red-300 border border-red-500/30'
    case 'Sudah BAST':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-red-500/20 text-red-300 border border-red-500/30'
    case 'Medium':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    case 'Low':
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

const getComplaintStatusColor = (status: string) => {
  switch (status) {
    case 'In Progress':
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    case 'Pending Repair':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    case 'Completed':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

export default function EstatePage() {
  const [activeTab, setActiveTab] = useState('bast')
  const activeComplaints = defectTrackerData.filter(d => d.priority === 'High' || d.priority === 'Medium').length

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-8 py-7">
            {/* HEADER */}
            <div>
              <h1 className="text-4xl font-bold text-foreground">Estate Management & Handover</h1>
              <p className="mt-2 text-muted-foreground">Track BAST schedules, retention periods, and building defect management</p>
            </div>

            {/* TOP 3 METRICS */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topMetrics.map((metric) => {
                const IconComponent = metric.icon
                const colorMap = {
                  green: 'from-green-500/15 to-green-500/5 text-green-400',
                  red: 'from-red-500/15 to-red-500/5 text-red-400',
                  emerald: 'from-emerald-500/15 to-emerald-500/5 text-emerald-400',
                }
                return (
                  <div
                    key={metric.label}
                    className={`rounded-2xl bg-gradient-to-br ${colorMap[metric.color as keyof typeof colorMap]} p-6 ring-1 ring-border/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                      metric.highlight && activeComplaints > 5 ? 'ring-red-500 ring-2' : ''
                    }`}
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

            {/* INTERACTIVE TABS */}
            <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="flex border-b border-border/40">
                <button
                  onClick={() => setActiveTab('bast')}
                  className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
                    activeTab === 'bast'
                      ? 'text-foreground bg-white/5 border-b-2 border-blue-500'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Serah Terima (BAST)
                </button>
                <button
                  onClick={() => setActiveTab('defect')}
                  className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
                    activeTab === 'defect'
                      ? 'text-foreground bg-white/5 border-b-2 border-red-500'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Komplain Bangunan (Defect)
                </button>
              </div>

              {/* BAST TAB CONTENT */}
              {activeTab === 'bast' && (
                <div className="overflow-hidden">
                  <div className="p-6 border-b border-border/40">
                    <h2 className="text-xl font-bold text-foreground">Tracking Serah Terima (BAST)</h2>
                    <p className="mt-1 text-xs text-muted-foreground">Monitor handover schedules and retention periods</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/40 bg-card/50">
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Nama Konsumen</th>
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Blok/No Unit</th>
                          <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Jadwal BAST</th>
                          <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Batas Masa Retensi</th>
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Status Kelayakan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bastTrackerData.map((item, idx) => (
                          <tr key={idx} className="border-b border-border/20 transition-colors hover:bg-card/50">
                            <td className="px-6 py-4 font-medium">{item.nama}</td>
                            <td className="px-6 py-4 text-sm">{item.blok}</td>
                            <td className="px-6 py-4 text-right text-sm font-medium">{item.jadwalBast}</td>
                            <td className="px-6 py-4 text-right text-sm font-medium">{item.batasMasaRetensi}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* DEFECT TAB CONTENT */}
              {activeTab === 'defect' && (
                <div className="overflow-hidden">
                  <div className="p-6 border-b border-border/40">
                    <h2 className="text-xl font-bold text-foreground">Komplain Bangunan (Defect Tracking)</h2>
                    <p className="mt-1 text-xs text-muted-foreground">Monitor reported building defects and repair progress</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/40 bg-card/50">
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Nama Konsumen</th>
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Blok/No Unit</th>
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Jenis Komplain</th>
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Priority</th>
                          <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Tanggal Report</th>
                          <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Status Perbaikan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {defectTrackerData.map((item, idx) => (
                          <tr key={idx} className="border-b border-border/20 transition-colors hover:bg-card/50">
                            <td className="px-6 py-4 font-medium">{item.nama}</td>
                            <td className="px-6 py-4 text-sm">{item.blok}</td>
                            <td className="px-6 py-4 text-sm">{item.issue}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getPriorityColor(item.priority)}`}>
                                {item.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right text-sm font-medium">{item.reportDate}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getComplaintStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
