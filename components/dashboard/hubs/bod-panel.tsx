'use client'

import { KPIData } from '../types'
import { formatRupiah, getRiskBadgeStyle } from '../mock-data'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, TrendingUp, Users, DollarSign, ArrowLeft } from 'lucide-react'

interface BODPanelProps {
  kpiData: KPIData
}

export function BODPanel({ kpiData }: BODPanelProps) {
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
        <h1 className="text-3xl font-black text-white mb-2">Board of Directors Panel</h1>
        <p className="text-white/60">Executive KPIs and strategic overview</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-300 text-sm mb-1">Total Pipeline</p>
                <p className="text-2xl font-black text-white">{kpiData.totalUnits}</p>
              </div>
              <Users className="w-8 h-8 text-cyan-400/50" />
            </div>
            <p className="text-xs text-cyan-300/60 mt-2">Active applications</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm mb-1">Completion Rate</p>
                <p className="text-2xl font-black text-white">{kpiData.completionPercentage}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400/50" />
            </div>
            <p className="text-xs text-green-300/60 mt-2">{kpiData.completedUnits} completed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-300 text-sm mb-1">Risk Alerts</p>
                <p className="text-2xl font-black text-white">{kpiData.bottlenecks.length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-400/50" />
            </div>
            <p className="text-xs text-orange-300/60 mt-2">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm mb-1">Portfolio Value</p>
                <p className="text-xl font-black text-white">{formatRupiah(kpiData.totalValue).split(' ')[0]}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-400/50" />
            </div>
            <p className="text-xs text-purple-300/60 mt-2">Total portfolio</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Completion Progress</span>
              <span className="text-white font-semibold">{kpiData.completionPercentage}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-white/20">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${kpiData.completionPercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Portfolio Processing</span>
              <span className="text-white font-semibold">{Math.round((kpiData.processedValue / kpiData.totalValue) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-white/20">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${(kpiData.processedValue / kpiData.totalValue) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Bottlenecks */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Critical Issues</CardTitle>
        </CardHeader>
        <CardContent>
          {kpiData.bottlenecks.filter(b => b.riskLevel === 'CRITICAL' || b.riskLevel === 'HIGH').length > 0 ? (
            <div className="space-y-3">
              {kpiData.bottlenecks.filter(b => b.riskLevel === 'CRITICAL' || b.riskLevel === 'HIGH').slice(0, 5).map((alert) => (
                <div key={alert.id} className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-white">{alert.applicantName}</p>
                      <p className="text-sm text-white/60 mt-1">{alert.blockingDocument}</p>
                    </div>
                    <Badge className={`text-xs border ${getRiskBadgeStyle(alert.riskLevel)}`}>
                      {alert.riskLevel}
                    </Badge>
                  </div>
                  <p className="text-xs text-red-300 mt-2">Stuck for {alert.daysStuck} days</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/50 text-sm py-4">No critical issues</p>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Summary Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Avg Processing Time</p>
              <p className="text-xl font-bold text-cyan-400">{kpiData.averageProcessingDays} days</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Pending Units</p>
              <p className="text-xl font-bold text-yellow-400">{kpiData.pendingUnits}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Processed Value</p>
              <p className="text-lg font-bold text-green-400">{formatRupiah(kpiData.processedValue)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
