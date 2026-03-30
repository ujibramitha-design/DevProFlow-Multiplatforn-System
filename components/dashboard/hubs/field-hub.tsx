'use client'

import { PipelineUnit, Document, DocumentStatus } from '../types'
import { formatRupiah, getRiskBadgeStyle } from '../mock-data'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Clock, AlertCircle, ArrowLeft } from 'lucide-react'

interface FieldHubProps {
  units: PipelineUnit[]
}

export function FieldHub({ units }: FieldHubProps) {
  // Only show units relevant to field operations
  const relevantUnits = units.filter(u => u.stage === 'AKAD' || u.stage === 'PASCA_AKAD').slice(0, 8)

  const getDocumentCompletionPercentage = (documents: Document[]): number => {
    if (documents.length === 0) return 0
    const completed = documents.filter(d => d.status === 'APPROVED' || d.status === 'COMPLETED').length
    return Math.round((completed / documents.length) * 100)
  }

  const getDocumentStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case 'COMPLETED':
      case 'APPROVED':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'SUBMITTED':
        return <Clock className="w-4 h-4 text-blue-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-red-400" />
    }
  }

  const getStatusBadgeColor = (status: DocumentStatus): string => {
    const colors: Record<DocumentStatus, string> = {
      PENDING: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      SUBMITTED: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      APPROVED: 'bg-green-500/20 text-green-300 border-green-500/30',
      REJECTED: 'bg-red-500/20 text-red-300 border-red-500/30',
      COMPLETED: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    }
    return colors[status]
  }

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
        <h1 className="text-3xl font-black text-white mb-2">Field Operations Hub</h1>
        <p className="text-white/60">On-ground operations and document tracking</p>
      </div>

      {/* Field Units */}
      {relevantUnits.length > 0 ? (
        relevantUnits.map((unit) => {
          const docCompletion = getDocumentCompletionPercentage(unit.documents)
          return (
            <Card key={unit.id} className="bg-white/5 border-white/10 overflow-hidden">
              <CardHeader className="pb-3">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base text-white truncate">{unit.applicantName}</CardTitle>
                      <p className="text-xs text-white/60 font-mono mt-1">{unit.id}</p>
                    </div>
                    <Badge className={`text-xs border flex-shrink-0 ${getRiskBadgeStyle(unit.riskLevel)}`}>
                      {unit.riskLevel}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Loan Amount */}
                <div>
                  <p className="text-xs text-white/60 mb-1">Loan Amount</p>
                  <p className="text-sm font-semibold text-cyan-400">{formatRupiah(unit.loanAmount)}</p>
                </div>

                {/* Stage & Status */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-white/60 mb-1">Stage</p>
                    <Badge variant="outline" className="text-xs bg-white/10 border-white/20">
                      {unit.stage.replace(/_/g, '-')}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-white/60 mb-1">Status</p>
                    <Badge className={`text-xs border ${getStatusBadgeColor(unit.status)}`}>
                      {unit.status}
                    </Badge>
                  </div>
                </div>

                {/* Document Completion */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-white/60">Documents</p>
                    <p className="text-xs font-semibold text-white">{docCompletion}%</p>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden border border-white/20">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                      style={{ width: `${docCompletion}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/50 mt-2">{unit.documents.length} documents</p>
                </div>

                {/* Documents Checklist */}
                <div className="space-y-2 bg-white/3 p-3 rounded-lg border border-white/5">
                  {unit.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-2">
                      {getDocumentStatusIcon(doc.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white/80 truncate">{doc.name}</p>
                      </div>
                      <Badge className={`text-xs border whitespace-nowrap ${getStatusBadgeColor(doc.status)}`}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Bank & Notary Info */}
                <div className="grid grid-cols-2 gap-2 text-xs text-white/60 pt-2 border-t border-white/10">
                  <div>
                    <span className="text-white/40">Bank:</span>
                    <p className="text-white/80 font-medium">{unit.bankName}</p>
                  </div>
                  {unit.notaryName && (
                    <div>
                      <span className="text-white/40">Notary:</span>
                      <p className="text-white/80 font-medium">{unit.notaryName}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })
      ) : (
        <Card className="bg-white/5 border-white/10">
          <CardContent className="py-8 text-center">
            <p className="text-white/50 text-sm">No field operations available</p>
          </CardContent>
        </Card>
      )}

      {relevantUnits.length > 0 && (
        <div className="text-center pt-4 text-xs text-white/50">
          Showing {relevantUnits.length} of {units.length} total applications
        </div>
      )}
    </div>
  )
}
