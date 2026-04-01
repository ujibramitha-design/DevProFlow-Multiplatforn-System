'use client'

import { KPIData } from '../types'
import { formatRupiah, getRiskBadgeStyle } from '../mock-data'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { ArrowLeft } from 'lucide-react'

interface FinanceHubProps {
  kpiData: KPIData
}

export function FinanceHub({ kpiData }: FinanceHubProps) {
  // Chart data
  const stageData = [
    { stage: 'Pra-Akad', units: 8, value: 2_500_000_000 },
    { stage: 'Akad', units: 10, value: 3_200_000_000 },
    { stage: 'Pasca-Akad', units: 6, value: 1_800_000_000 }
  ]

  const timelineData = [
    { week: 'Week 1', completed: 4, pending: 6 },
    { week: 'Week 2', completed: 7, pending: 5 },
    { week: 'Week 3', completed: 11, pending: 4 },
    { week: 'Week 4', completed: 16, pending: 2 }
  ]

  const riskDistribution = [
    { name: 'Low', value: 12, color: '#00ff88' },
    { name: 'Medium', value: 7, color: '#ffb700' },
    { name: 'High', value: 3, color: '#ff6600' },
    { name: 'Critical', value: 2, color: '#ff3366' }
  ]

  const KPICard = ({ label, value, unit, trend }: { label: string; value: string | number; unit?: string; trend?: number }) => (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="pt-6">
        <p className="text-white/60 text-sm mb-2">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-white">{value}</p>
          {unit && <p className="text-white/60 text-sm">{unit}</p>}
        </div>
        {trend !== undefined && (
          <p className={`text-xs mt-2 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last period
          </p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white text-sm font-medium"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Dashboard
        </a>
      </div>

      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black text-white mb-2">Finance Hub</h1>
        <p className="text-white/60">Analytics, KPIs, and financial tracking</p>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Units" value={kpiData.totalUnits} unit="applications" trend={5} />
        <KPICard label="Completed" value={kpiData.completedUnits} unit="units" trend={8} />
        <KPICard label="Completion Rate" value={`${kpiData.completionPercentage}%`} trend={3} />
        <KPICard label="Avg Processing" value={kpiData.averageProcessingDays} unit="days" />
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-cyan-400 mb-2">
              {formatRupiah(kpiData.totalValue)}
            </div>
            <p className="text-white/60 text-sm">
              Processed: <span className="text-green-400 font-semibold">{formatRupiah(kpiData.processedValue)}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Active Bottlenecks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-400 mb-2">
              {kpiData.bottlenecks.length}
            </div>
            <p className="text-white/60 text-sm">
              Critical: <span className="text-red-400 font-semibold">{kpiData.bottlenecks.filter(b => b.riskLevel === 'CRITICAL').length}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stage Distribution */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Units by Stage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stageData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="stage" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="units" fill="#00d9ff" name="Units" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Timeline & Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Completion Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#00ff88" name="Completed" strokeWidth={2} />
                <Line type="monotone" dataKey="pending" stroke="#ffb700" name="Pending" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.2)' }}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottleneck Alerts */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Active Bottleneck Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {kpiData.bottlenecks.length > 0 ? (
              kpiData.bottlenecks.map((alert) => (
                <div key={alert.id} className="p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-white">{alert.applicantName}</p>
                      <p className="text-sm text-white/60">{alert.blockingDocument}</p>
                    </div>
                    <Badge className={`text-xs border ${getRiskBadgeStyle(alert.riskLevel)}`}>
                      {alert.riskLevel}
                    </Badge>
                  </div>
                  <p className="text-xs text-white/70">
                    Stuck for <span className="font-semibold text-orange-400">{alert.daysStuck} days</span> • Action: {alert.recommendedAction}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-white/50 text-sm py-4">No active bottlenecks</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
