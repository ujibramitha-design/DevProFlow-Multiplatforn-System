'use client'

import { PipelineUnit } from '../types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'

interface BankNotaryTrackingProps {
  units: PipelineUnit[]
}

export function BankNotaryTracking({ units }: BankNotaryTrackingProps) {
  const stages = [
    { key: 'PRA_AKAD', label: 'Pra-Akad', color: 'from-blue-500/20 to-blue-600/20', borderColor: 'border-blue-500/30', textColor: 'text-blue-300' },
    { key: 'AKAD', label: 'Akad', color: 'from-cyan-500/20 to-cyan-600/20', borderColor: 'border-cyan-500/30', textColor: 'text-cyan-300' },
    { key: 'PASCA_AKAD', label: 'Pasca-Akad', color: 'from-emerald-500/20 to-emerald-600/20', borderColor: 'border-emerald-500/30', textColor: 'text-emerald-300' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black text-white mb-2">Bank & Notary Tracking</h1>
        <p className="text-white/60">Monitor all applications across transaction stages</p>
      </div>

      {/* Stage Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stages.map((stage) => {
          const stageUnits = units.filter(u => u.stage === stage.key)
          const completed = stageUnits.filter(u => u.status === 'COMPLETED').length
          const inProgress = stageUnits.filter(u => u.status === 'PENDING' || u.status === 'SUBMITTED').length
          
          return (
            <Card key={stage.key} className={`bg-gradient-to-br ${stage.color} ${stage.borderColor}`}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className={`${stage.textColor} text-sm font-semibold mb-2`}>{stage.label}</p>
                    <p className="text-3xl font-black text-white">{stageUnits.length}</p>
                  </div>
                  
                  <div className="space-y-2 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-xs">Completed</span>
                      <span className="text-white/90 font-semibold">{completed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-xs">In Progress</span>
                      <span className="text-white/90 font-semibold">{inProgress}</span>
                    </div>
                  </div>

                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden border border-white/20">
                    <div 
                      className={`h-full bg-gradient-to-r ${stage.color}`}
                      style={{ width: `${stageUnits.length > 0 ? (completed / stageUnits.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Detailed Tracking by Bank & Notary */}
      {stages.map((stage) => {
        const stageUnits = units.filter(u => u.stage === stage.key)
        if (stageUnits.length === 0) return null

        return (
          <Card key={`detail-${stage.key}`} className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className={`text-white`}>{stage.label} - Bank & Notary Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {stageUnits.map((unit) => (
                  <div key={unit.id} className="p-4 bg-white/3 rounded-lg border border-white/5 hover:bg-white/5 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-white font-semibold">{unit.applicantName}</p>
                        <p className="text-white/50 text-xs font-mono mt-1">{unit.id}</p>
                      </div>
                      <Badge className={`${stage.textColor} bg-white/10 border-white/20 text-xs`}>
                        {unit.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                      <div>
                        <p className="text-white/60 text-xs mb-1">Bank</p>
                        <p className="text-white/90 text-sm font-medium">{unit.bankName}</p>
                      </div>
                      {unit.notaryName && (
                        <div>
                          <p className="text-white/60 text-xs mb-1">Notary</p>
                          <p className="text-white/90 text-sm font-medium">{unit.notaryName}</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-white/10">
                      <div>
                        <p className="text-white/60 text-xs mb-1">Risk Level</p>
                        <Badge className="bg-white/10 border-white/20 text-xs text-white/90">
                          {unit.riskLevel}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs mb-1">Days in Stage</p>
                        <p className="text-white/90 text-sm font-mono">{unit.daysStuck} days</p>
                      </div>
                    </div>

                    {/* Document Progress */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white/60 text-xs">Documents</p>
                        <p className="text-white/90 text-xs font-semibold">
                          {unit.documents.filter(d => d.status === 'APPROVED' || d.status === 'COMPLETED').length}/{unit.documents.length}
                        </p>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden border border-white/20">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          style={{ width: `${(unit.documents.filter(d => d.status === 'APPROVED' || d.status === 'COMPLETED').length / unit.documents.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
