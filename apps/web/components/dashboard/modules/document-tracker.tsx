'use client'

import { PipelineUnit, Document, DocumentStatus } from '../types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DocumentTrackerProps {
  units: PipelineUnit[]
}

export function DocumentTracker({ units }: DocumentTrackerProps) {
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

  // Flatten all documents with unit info
  const allDocuments = units.flatMap(unit =>
    unit.documents.map(doc => ({
      ...doc,
      unitId: unit.id,
      applicantName: unit.applicantName,
      stage: unit.stage
    }))
  )

  const documentsByStatus = {
    PENDING: allDocuments.filter(d => d.status === 'PENDING').length,
    SUBMITTED: allDocuments.filter(d => d.status === 'SUBMITTED').length,
    APPROVED: allDocuments.filter(d => d.status === 'APPROVED').length,
    COMPLETED: allDocuments.filter(d => d.status === 'COMPLETED').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black text-white mb-2">Document Submission Monitoring</h1>
        <p className="text-white/60">Track all document submissions and approvals</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="pt-6">
            <FileText className="w-5 h-5 text-yellow-400 mb-2" />
            <p className="text-yellow-300 text-sm mb-1">Pending</p>
            <p className="text-2xl font-black text-white">{documentsByStatus.PENDING}</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="pt-6">
            <FileText className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-blue-300 text-sm mb-1">Submitted</p>
            <p className="text-2xl font-black text-white">{documentsByStatus.SUBMITTED}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-green-500/30">
          <CardContent className="pt-6">
            <CheckCircle2 className="w-5 h-5 text-green-400 mb-2" />
            <p className="text-green-300 text-sm mb-1">Approved</p>
            <p className="text-2xl font-black text-white">{documentsByStatus.APPROVED}</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-500/10 border-emerald-500/30">
          <CardContent className="pt-6">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
            <p className="text-emerald-300 text-sm mb-1">Completed</p>
            <p className="text-2xl font-black text-white">{documentsByStatus.COMPLETED}</p>
          </CardContent>
        </Card>
      </div>

      {/* Document Table */}
      <Card className="bg-white/5 border-white/10 overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-white">
            All Documents ({allDocuments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/10 border-b border-white/10">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-white/80 font-semibold">Document</TableHead>
                  <TableHead className="text-white/80 font-semibold">Type</TableHead>
                  <TableHead className="text-white/80 font-semibold">Applicant</TableHead>
                  <TableHead className="text-white/80 font-semibold">Status</TableHead>
                  <TableHead className="text-white/80 font-semibold text-right">Uploaded</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allDocuments.slice(0, 20).map((doc) => (
                  <TableRow key={doc.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="text-white font-medium flex items-center gap-2">
                      {getDocumentStatusIcon(doc.status)}
                      {doc.name}
                    </TableCell>
                    <TableCell className="text-white/80 text-sm">{doc.type}</TableCell>
                    <TableCell className="text-white/80">{doc.applicantName}</TableCell>
                    <TableCell>
                      <Badge className={`text-xs border ${getStatusBadgeColor(doc.status)}`}>
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-white/60 text-sm">
                      {new Date(doc.uploadedAt).toLocaleDateString('id-ID')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Completion by Profile */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Document Completion by Application</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {units.slice(0, 10).map((unit) => {
              const completed = unit.documents.filter(d => d.status === 'APPROVED' || d.status === 'COMPLETED').length
              const percent = (completed / unit.documents.length) * 100
              return (
                <div key={unit.id} className="p-3 bg-white/3 rounded-lg border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-sm font-semibold text-white">{unit.applicantName}</p>
                      <p className="text-xs text-white/50 font-mono">{unit.id}</p>
                    </div>
                    <span className="text-sm font-semibold text-cyan-400">{completed}/{unit.documents.length}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden border border-white/20">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
