'use client'

import React from 'react'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopbar } from '@/components/dashboard/topbar'
import { TrendingUp, DollarSign, Target, Home, PieChart } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'

// TOP METRICS DATA
const topMetrics = [
  { label: 'Total Units Sold', value: '142 Units', icon: Home, color: 'blue' },
  { label: 'Booking Fee Collected', value: 'Rp 1.420.000.000', icon: DollarSign, color: 'green' },
  { label: 'Leads Conversion Rate', value: '12.5%', icon: Target, color: 'amber' },
]

// TARGET VS ACTUAL SALES DATA
const salesData = [
  { month: 'October', target: 24, actual: 18 },
  { month: 'November', target: 28, actual: 22 },
  { month: 'December', target: 32, actual: 28 },
  { month: 'January', target: 35, actual: 31 },
  { month: 'February', target: 38, actual: 35 },
  { month: 'March', target: 40, actual: 36 },
]

// UNIT STOCK TRACKER DATA
const unitStockData = [
  { blok: 'A-102', tipe: 'Tipe 36', harga: 'Rp 850.000.000', status: 'Available', salesInCharge: 'Ahmad Fauzi' },
  { blok: 'A-105', tipe: 'Tipe 45', harga: 'Rp 950.000.000', status: 'Booked', salesInCharge: 'Siti Nurhaliza' },
  { blok: 'B-201', tipe: 'Tipe 36', harga: 'Rp 875.000.000', status: 'Sold', salesInCharge: 'Budi Santoso' },
  { blok: 'B-205', tipe: 'Tipe 45', harga: 'Rp 975.000.000', status: 'Available', salesInCharge: 'Dewi Lestari' },
  { blok: 'C-301', tipe: 'Tipe 60', harga: 'Rp 1.100.000.000', status: 'Booked', salesInCharge: 'Rendra Wijaya' },
  { blok: 'C-305', tipe: 'Tipe 45', harga: 'Rp 1.000.000.000', status: 'Sold', salesInCharge: 'Bambang Irawan' },
  { blok: 'D-401', tipe: 'Tipe 36', harga: 'Rp 900.000.000', status: 'Available', salesInCharge: 'Eka Putri' },
  { blok: 'D-405', tipe: 'Tipe 60', harga: 'Rp 1.150.000.000', status: 'Sold', salesInCharge: 'Fahri Rahman' },
  { blok: 'E-501', tipe: 'Tipe 45', harga: 'Rp 1.025.000.000', status: 'Booked', salesInCharge: 'Gita Merah' },
  { blok: 'E-505', tipe: 'Tipe 36', harga: 'Rp 925.000.000', status: 'Available', salesInCharge: 'Hendra Gunawan' },
]

// LEAD SOURCES DATA
const leadSourcesData = [
  { name: 'Facebook Ads', value: 35, color: '#3b82f6' },
  { name: 'Walk-in', value: 28, color: '#10b981' },
  { name: 'Referral', value: 22, color: '#f59e0b' },
  { name: 'Google Ads', value: 12, color: '#8b5cf6' },
  { name: 'Direct Call', value: 3, color: '#ef4444' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Available':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    case 'Booked':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    case 'Sold':
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

export default function SalesPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-8 py-7">
            {/* HEADER */}
            <div>
              <h1 className="text-4xl font-bold text-foreground">Sales Performance & Inventory</h1>
              <p className="mt-2 text-muted-foreground">Monitor unit availability, sales metrics, and lead conversion performance</p>
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

            {/* TARGET VS ACTUAL SALES CHART */}
            <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
              <h2 className="mb-6 text-xl font-bold text-foreground">Target vs Actual Sales (Last 6 Months)</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salesData}>
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
                  <Bar dataKey="target" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="actual" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* UNIT STOCK TRACKER TABLE */}
            <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-6 border-b border-border/40">
                <h2 className="text-xl font-bold text-foreground">Unit Stock Tracker</h2>
                <p className="mt-1 text-xs text-muted-foreground">Current inventory status across all blocks</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 bg-card/50">
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Blok/No Unit</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Tipe</th>
                      <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Harga Jual</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Status</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Sales In Charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unitStockData.map((unit, idx) => (
                      <tr key={idx} className="border-b border-border/20 transition-colors hover:bg-card/50">
                        <td className="px-6 py-4 font-medium">{unit.blok}</td>
                        <td className="px-6 py-4 text-sm">{unit.tipe}</td>
                        <td className="px-6 py-4 text-right font-semibold text-cyan-400">{unit.harga}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(unit.status)}`}>
                            {unit.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{unit.salesInCharge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* LEAD SOURCES SECTION */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* LEAD SOURCES PIE CHART */}
              <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
                <h2 className="mb-6 text-xl font-bold text-foreground">Lead Sources Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie data={leadSourcesData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                      {leadSourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              {/* LEAD SOURCES LIST */}
              <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
                <h2 className="mb-6 text-xl font-bold text-foreground">Lead Sources Details</h2>
                <div className="space-y-4">
                  {leadSourcesData.map((source, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-border/20 bg-white/5 p-4 backdrop-blur-md">
                      <div className="flex items-center gap-3">
                        <div className="size-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                        <span className="text-sm font-medium text-foreground">{source.name}</span>
                      </div>
                      <span className="text-right text-lg font-bold">{source.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
