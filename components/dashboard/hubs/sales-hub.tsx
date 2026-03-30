'use client'

import { PipelineUnit } from '../types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Clock, AlertCircle, ArrowLeft } from 'lucide-react'

interface SalesHubProps {
  units: PipelineUnit[]
}

export function SalesHub({ units }: SalesHubProps) {
  const akadReady = units.filter(u => u.stage === 'AKAD' && u.status !== 'PENDING').length
  const inProgress = units.filter(u => u.status === 'PENDING' || u.status === 'SUBMITTED').length
  const completed = units.filter(u => u.status === 'COMPLETED').length

  const recentUnits = units.filter(u => u.stage === 'PASCA_AKAD' || u.stage === 'AKAD').slice(0, 12)

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
        <h1 className="text-3xl font-black text-white mb-2">Sales Hub</h1>
        <p className="text-white/60">Simple pipeline status overview</p>
      </div>

      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-green-300">Ready for Akad</CardTitle>
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black text-white mb-2">{akadReady}</p>
            <p className="text-sm text-green-300/70">Ready for signing process</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 border-yellow-500/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-yellow-300">In Progress</CardTitle>
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black text-white mb-2">{inProgress}</p>
            <p className="text-sm text-yellow-300/70">Being processed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border-emerald-500/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-emerald-300">Completed</CardTitle>
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black text-white mb-2">{completed}</p>
            <p className="text-sm text-emerald-300/70">Successfully processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentUnits.map((unit) => (
              <div key={unit.id} className="p-4 bg-white/3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{unit.applicantName}</p>
                    <p className="text-xs text-white/50 font-mono">{unit.id}</p>
                  </div>
                  <Badge className="text-xs bg-white/10 border-white/20 flex-shrink-0">
                    {unit.stage.replace(/_/g, '-')}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/60">Status</span>
                    <Badge className={`text-xs border ${
                      unit.status === 'COMPLETED' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                      unit.status === 'APPROVED' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                      unit.status === 'SUBMITTED' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                      'bg-orange-500/20 text-orange-300 border-orange-500/30'
                    }`}>
                      {unit.status}
                    </Badge>
                  </div>

                  <div className="text-xs">
                    <span className="text-white/60">Bank: </span>
                    <span className="text-white font-medium">{unit.bankName}</span>
                  </div>

                  <p className="text-xs text-cyan-400 font-semibold">
                    Rp {(unit.loanAmount / 1_000_000).toFixed(0)}M
                  </p>
                </div>

                {unit.daysStuck > 30 && (
                  <div className="mt-3 p-2 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-300 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Stuck {unit.daysStuck} days
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Rate */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Pipeline Conversion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">Akad Ready</span>
                <span className="text-white font-semibold">{Math.round((akadReady / units.length) * 100)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-white/20">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${(akadReady / units.length) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">In Progress</span>
                <span className="text-white font-semibold">{Math.round((inProgress / units.length) * 100)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-white/20">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                  style={{ width: `${(inProgress / units.length) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">Completed</span>
                <span className="text-white font-semibold">{Math.round((completed / units.length) * 100)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-white/20">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  style={{ width: `${(completed / units.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
