'use client'

import { useState } from 'react'
import { PipelineUnit, DocumentStatus } from '../types'
import { formatRupiah, getRiskBadgeStyle } from '../mock-data'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { AlertCircle, Plus, CheckCircle2, Clock, ArrowLeft } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface LegalHubProps {
  units: PipelineUnit[]
}

export function LegalHub({ units }: LegalHubProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStage, setSelectedStage] = useState<string>('ALL')
  const [activeDocTab, setActiveDocTab] = useState<string>('fixed')

  const filteredUnits = units.filter(unit => {
    const matchesSearch = unit.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         unit.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStage = selectedStage === 'ALL' || unit.stage === selectedStage
    return matchesSearch && matchesStage
  })

  // Tracking cards by stage
  const stageBreakdown = {
    PRA_AKAD: units.filter(u => u.stage === 'PRA_AKAD').length,
    AKAD: units.filter(u => u.stage === 'AKAD').length,
    PASCA_AKAD: units.filter(u => u.stage === 'PASCA_AKAD').length
  }

  // Missing documents alert
  const missingDocsCount = units.flatMap(u => u.documents).filter(d => d.status === 'PENDING').length

  // Document profiles by type
  const documentProfiles = {
    fixed: {
      title: 'Fixed Income',
      docs: ['KTP', 'Kartu Keluarga', 'Bukti Penghasilan', 'Slip Gaji', 'SPT Tahunan']
    },
    nonFixed: {
      title: 'Non-Fixed Income',
      docs: ['KTP', 'Kartu Keluarga', 'Laporan Keuangan', 'Surat Rekomendasi Bank', 'Rekening Koran 3 Bulan']
    },
    professional: {
      title: 'Professional',
      docs: ['KTP', 'Paspor', 'Sertifikat Profesional', 'Bukti Registrasi', 'Laporan Klien']
    }
  }

  const getStatusColor = (status: DocumentStatus): string => {
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
        <h1 className="text-3xl font-black text-white mb-2">Legal Hub</h1>
        <p className="text-white/60">Full access to document management and pipeline control</p>
      </div>

      {/* Stage Tracking Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-blue-300 text-sm mb-2">Pra-Akad</p>
                <p className="text-3xl font-black text-white">{stageBreakdown.PRA_AKAD}</p>
              </div>
              <div className="size-10 rounded-lg bg-blue-500/30 flex items-center justify-center">
                <Clock className="size-5 text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border-cyan-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-cyan-300 text-sm mb-2">Akad</p>
                <p className="text-3xl font-black text-white">{stageBreakdown.AKAD}</p>
              </div>
              <div className="size-10 rounded-lg bg-cyan-500/30 flex items-center justify-center">
                <CheckCircle2 className="size-5 text-cyan-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-emerald-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-emerald-300 text-sm mb-2">Pasca-Akad</p>
                <p className="text-3xl font-black text-white">{stageBreakdown.PASCA_AKAD}</p>
              </div>
              <div className="size-10 rounded-lg bg-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="size-5 text-emerald-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Missing Documents Alert */}
      {missingDocsCount > 0 && (
        <Card className="bg-red-500/20 border-red-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="size-5 text-red-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-300 font-semibold">{missingDocsCount} Documents Awaiting Submission</p>
                <p className="text-red-300/60 text-sm">Immediate action required for pending documents</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white text-xs ml-auto">
                Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Checklist Tabs */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-lg text-white">Document Requirements by Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeDocTab} onValueChange={setActiveDocTab} className="w-full">
            <div className="flex gap-2 mb-6 border-b border-white/10 pb-3">
              <TabsTrigger 
                value="fixed" 
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:border-cyan-500 data-[state=inactive]:text-white/60"
              >
                Fixed Income
              </TabsTrigger>
              <TabsTrigger 
                value="nonFixed"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:border-cyan-500 data-[state=inactive]:text-white/60"
              >
                Non-Fixed Income
              </TabsTrigger>
              <TabsTrigger 
                value="professional"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:border-cyan-500 data-[state=inactive]:text-white/60"
              >
                Professional
              </TabsTrigger>
            </div>

            {/* Fixed Income Profile */}
            <TabsContent value="fixed" className="space-y-3">
              <div className="space-y-2">
                {documentProfiles.fixed.docs.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/3 rounded-lg border border-white/5 hover:bg-white/5 transition-colors">
                    <div className="size-5 rounded border-2 border-cyan-400 flex items-center justify-center flex-shrink-0">
                      <div className="size-2 rounded-full bg-cyan-400" />
                    </div>
                    <span className="text-white/90">{doc}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Non-Fixed Income Profile */}
            <TabsContent value="nonFixed" className="space-y-3">
              <div className="space-y-2">
                {documentProfiles.nonFixed.docs.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/3 rounded-lg border border-white/5 hover:bg-white/5 transition-colors">
                    <div className="size-5 rounded border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                      <div className="size-2 rounded-full bg-blue-400" />
                    </div>
                    <span className="text-white/90">{doc}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Professional Profile */}
            <TabsContent value="professional" className="space-y-3">
              <div className="space-y-2">
                {documentProfiles.professional.docs.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/3 rounded-lg border border-white/5 hover:bg-white/5 transition-colors">
                    <div className="size-5 rounded border-2 border-emerald-400 flex items-center justify-center flex-shrink-0">
                      <div className="size-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-white/90">{doc}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Add Custom Document Button */}
          <Button className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-500/30">
            <Plus className="size-4 mr-2" />
            Add Custom Document Requirement
          </Button>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-white">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/70 mb-2 block">Search</label>
              <Input
                placeholder="Search by applicant name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder-white/30"
              />
            </div>
            <div>
              <label className="text-sm text-white/70 mb-2 block">Filter by Stage</label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm cursor-pointer hover:bg-white/10 transition-colors"
              >
                <option value="ALL" className="bg-black">All Stages</option>
                <option value="PRA_AKAD" className="bg-black">Pra-Akad</option>
                <option value="AKAD" className="bg-black">Akad</option>
                <option value="PASCA_AKAD" className="bg-black">Pasca-Akad</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Units Table */}
      <Card className="bg-white/5 border-white/10 overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-white">
            Pipeline Units ({filteredUnits.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/10 border-b border-white/10">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-white/80 font-semibold">ID</TableHead>
                  <TableHead className="text-white/80 font-semibold">Applicant</TableHead>
                  <TableHead className="text-white/80 font-semibold">Stage</TableHead>
                  <TableHead className="text-white/80 font-semibold text-right">Loan Amount</TableHead>
                  <TableHead className="text-white/80 font-semibold">Status</TableHead>
                  <TableHead className="text-white/80 font-semibold">Risk Level</TableHead>
                  <TableHead className="text-white/80 font-semibold text-right">Days Stuck</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUnits.length > 0 ? (
                  filteredUnits.map((unit) => (
                    <TableRow key={unit.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="text-white/80 font-mono text-xs">{unit.id}</TableCell>
                      <TableCell className="text-white font-medium">{unit.applicantName}</TableCell>
                      <TableCell className="text-white/80">
                        <Badge variant="outline" className="text-xs bg-white/10 border-white/20">
                          {unit.stage.replace(/_/g, '-')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-white/90 font-semibold">
                        {formatRupiah(unit.loanAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs border ${getStatusColor(unit.status)}`}>
                          {unit.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs border ${getRiskBadgeStyle(unit.riskLevel)}`}>
                          {unit.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-white/80 font-mono">
                        {unit.daysStuck} days
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-white/50">
                      No units found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
