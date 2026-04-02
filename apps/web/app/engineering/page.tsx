'use client'

import React from 'react'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopbar } from '@/components/dashboard/topbar'
import { Hammer, TrendingUp, CheckCircle2 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// TOP METRICS DATA
const topMetrics = [
  { label: 'Total Units in Construction', value: '142 Units', icon: Hammer, color: 'blue' },
  { label: 'Average Physical Progress', value: '65.4%', icon: TrendingUp, color: 'amber' },
  { label: 'On-Time Completion Rate', value: '92%', icon: CheckCircle2, color: 'green' },
]

// S-CURVE PROGRESS DATA (Planned vs Actual)
const progressData = [
  { month: 'Oct', planned: 5, actual: 3 },
  { month: 'Nov', planned: 12, actual: 8 },
  { month: 'Dec', planned: 22, actual: 18 },
  { month: 'Jan', planned: 35, actual: 32 },
  { month: 'Feb', planned: 52, actual: 50 },
  { month: 'Mar', planned: 70, actual: 72 },
  { month: 'Apr', planned: 85, actual: 86 },
]

// CONSTRUCTION TRACKER DATA
const constructionTrackerData = [
  { blok: 'A-102', tipe: 'Tipe 36', progress: 85, target: 'Apr 2026', status: 'Finishing' },
  { blok: 'A-105', tipe: 'Tipe 45', progress: 72, target: 'May 2026', status: 'Naik Bata' },
  { blok: 'B-201', tipe: 'Tipe 36', progress: 95, target: 'Mar 2026', status: 'Ready Stock' },
  { blok: 'B-205', tipe: 'Tipe 45', progress: 45, target: 'Jun 2026', status: 'Pondasi' },
  { blok: 'C-301', tipe: 'Tipe 60', progress: 28, target: 'Jul 2026', status: 'Persiapan' },
  { blok: 'C-305', tipe: 'Tipe 45', progress: 78, target: 'May 2026', status: 'Finishing' },
  { blok: 'D-401', tipe: 'Tipe 36', progress: 55, target: 'Jun 2026', status: 'Naik Bata' },
  { blok: 'D-405', tipe: 'Tipe 60', progress: 92, target: 'Apr 2026', status: 'Finishing' },
  { blok: 'E-501', tipe: 'Tipe 45', progress: 38, target: 'Jul 2026', status: 'Pondasi' },
  { blok: 'E-505', tipe: 'Tipe 36', progress: 65, target: 'May 2026', status: 'Naik Bata' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Finishing':
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    case 'Pondasi':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    case 'Ready Stock':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    case 'Persiapan':
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
    case 'Naik Bata':
      return 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

// PROGRESS BAR COMPONENT
const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden border border-border/20">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="text-right text-xs font-semibold text-foreground w-12">{progress}%</span>
    </div>
  )
}

export default function EngineeringPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-8 py-7">
            {/* HEADER */}
            <div>
              <h1 className="text-4xl font-bold text-foreground">Construction & Development Progress</h1>
              <p className="mt-2 text-muted-foreground">Monitor physical progress, construction milestones, and completion targets</p>
            </div>

            {/* TOP 3 METRICS */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topMetrics.map((metric) => {
                const IconComponent = metric.icon
                const colorMap = {
                  blue: 'from-blue-500/15 to-blue-500/5 text-blue-400',
                  amber: 'from-amber-500/15 to-amber-500/5 text-amber-400',
                  green: 'from-green-500/15 to-green-500/5 text-green-400',
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

            {/* PLANNED VS ACTUAL PROGRESS CHART (S-CURVE) */}
            <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
              <h2 className="mb-6 text-xl font-bold text-foreground">Planned vs Actual Construction Progress (S-Curve)</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `${value} Units`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="planned"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Planned Progress"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Actual Progress"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* CONSTRUCTION TRACKER TABLE */}
            <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-6 border-b border-border/40">
                <h2 className="text-xl font-bold text-foreground">Construction Tracker</h2>
                <p className="mt-1 text-xs text-muted-foreground">Physical progress monitoring and construction status per unit</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 bg-card/50">
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Blok/No Unit</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Tipe Rumah</th>
                      <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Physical Progress</th>
                      <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Target Completion</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Construction Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {constructionTrackerData.map((unit, idx) => (
                      <tr key={idx} className="border-b border-border/20 transition-colors hover:bg-card/50">
                        <td className="px-6 py-4 font-medium">{unit.blok}</td>
                        <td className="px-6 py-4 text-sm">{unit.tipe}</td>
                        <td className="px-6 py-4 text-right">
                          <ProgressBar progress={unit.progress} />
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium">{unit.target}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(unit.status)}`}>
                            {unit.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
