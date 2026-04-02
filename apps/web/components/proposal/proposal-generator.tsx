"use client"

import { useState } from "react"
import { Download, Printer, X, FileText, Building2, TrendingUp, Users, CheckCircle2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProposalData {
  developerName: string
  projectName: string
  projectLocation: string
  totalUnits: number
  priceRange: string
  completionDate: string
  facilities: string[]
  statistics: {
    approvalRate: string
    avgProcessTime: string
    totalApplications: number
    successRate: string
  }
}

const mockProposalData: ProposalData = {
  developerName: "PT. Premium Property Development",
  projectName: "Green Valley Residence",
  projectLocation: "BSD City, Tangerang Selatan",
  totalUnits: 250,
  priceRange: "Rp 800 Juta - Rp 2.5 Miliar",
  completionDate: "Q4 2026",
  facilities: [
    "Swimming Pool & Kids Pool",
    "24/7 Security System",
    "Jogging Track & Park",
    "Clubhouse & Function Hall",
    "Smart Home System",
    "Underground Parking"
  ],
  statistics: {
    approvalRate: "94.5%",
    avgProcessTime: "14 Hari",
    totalApplications: 1248,
    successRate: "89.2%"
  }
}

export function ProposalGenerator() {
  const [showPreview, setShowPreview] = useState(false)
  const [proposalData] = useState<ProposalData>(mockProposalData)

  const handleGeneratePDF = () => {
    console.log('📄 Generating PDF Proposal...')
    alert('✅ PDF Proposal berhasil di-generate!\n\nFile: DevProFlow_Proposal_2026.pdf\nSize: 2.4 MB\n\nProposal siap untuk dikirim ke client!')
  }

  const handlePrint = () => {
    console.log('🖨️ Printing Proposal...')
    window.print()
    alert('✅ Proposal siap untuk di-print!')
  }

  const handleDownload = () => {
    console.log('💾 Downloading Proposal...')
    alert('✅ Proposal berhasil di-download!\n\nFile: DevProFlow_Enterprise_Proposal.pdf')
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setShowPreview(true)}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
      >
        <FileText className="size-4" />
        Auto-Generate Proposal
      </button>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl bg-card shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/30 bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">Proposal Preview</h2>
                <p className="text-sm text-muted-foreground">DevPro Flow System Enterprise</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-secondary/80"
                >
                  <Printer className="size-4" />
                  Print
                </button>
                <button
                  onClick={handleGeneratePDF}
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90"
                >
                  <Download className="size-4" />
                  Download PDF
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex size-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] bg-gradient-to-b from-background to-secondary/10">
              <div className="mx-auto max-w-4xl p-8 space-y-8">
                
                {/* Cover Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-12 text-white shadow-xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
                  <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
                      <Building2 className="size-4" />
                      Enterprise Solution
                    </div>
                    <h1 className="text-5xl font-bold leading-tight">
                      DevPro Flow System
                      <br />
                      <span className="text-white/90">Enterprise Edition</span>
                    </h1>
                    <p className="text-lg text-white/80 max-w-2xl">
                      Solusi Manajemen KPR Terintegrasi untuk Developer Properti Modern
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-5" />
                        <span className="text-sm font-semibold">Automated Workflow</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-5" />
                        <span className="text-sm font-semibold">Real-time Analytics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-5" />
                        <span className="text-sm font-semibold">Multi-platform</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Overview */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Building2 className="size-6 text-primary" />
                    Project Overview
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/30">
                      <p className="text-sm text-muted-foreground">Developer</p>
                      <p className="text-lg font-bold text-foreground mt-1">{proposalData.developerName}</p>
                    </div>
                    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/30">
                      <p className="text-sm text-muted-foreground">Project Name</p>
                      <p className="text-lg font-bold text-foreground mt-1">{proposalData.projectName}</p>
                    </div>
                    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/30">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-lg font-bold text-foreground mt-1">{proposalData.projectLocation}</p>
                    </div>
                    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/30">
                      <p className="text-sm text-muted-foreground">Total Units</p>
                      <p className="text-lg font-bold text-foreground mt-1">{proposalData.totalUnits} Units</p>
                    </div>
                    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/30">
                      <p className="text-sm text-muted-foreground">Price Range</p>
                      <p className="text-lg font-bold text-foreground mt-1">{proposalData.priceRange}</p>
                    </div>
                    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/30">
                      <p className="text-sm text-muted-foreground">Completion</p>
                      <p className="text-lg font-bold text-foreground mt-1">{proposalData.completionDate}</p>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <TrendingUp className="size-6 text-primary" />
                    Performance Statistics
                  </h2>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-6 shadow-sm ring-1 ring-emerald-500/20">
                      <p className="text-sm text-muted-foreground">Approval Rate</p>
                      <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{proposalData.statistics.approvalRate}</p>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-6 shadow-sm ring-1 ring-blue-500/20">
                      <p className="text-sm text-muted-foreground">Avg Process Time</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{proposalData.statistics.avgProcessTime}</p>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-6 shadow-sm ring-1 ring-purple-500/20">
                      <p className="text-sm text-muted-foreground">Total Applications</p>
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{proposalData.statistics.totalApplications.toLocaleString()}</p>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-6 shadow-sm ring-1 ring-amber-500/20">
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                      <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-2">{proposalData.statistics.successRate}</p>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Users className="size-6 text-primary" />
                    Premium Facilities
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {proposalData.facilities.map((facility, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm ring-1 ring-border/30 transition-all hover:ring-primary/30"
                      >
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                          <CheckCircle2 className="size-5 text-primary" />
                        </div>
                        <span className="font-semibold text-foreground">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Features */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">DevPro Flow System Features</h2>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Automated KPR Processing",
                        description: "Sistem otomatis memproses aplikasi KPR dengan AI-powered validation dan approval workflow"
                      },
                      {
                        title: "Real-time Dashboard Analytics",
                        description: "Monitor semua aplikasi KPR secara real-time dengan visualisasi data yang interaktif"
                      },
                      {
                        title: "Multi-Bank Integration",
                        description: "Terintegrasi dengan berbagai bank untuk mempercepat proses persetujuan KPR"
                      },
                      {
                        title: "Document Management System",
                        description: "Kelola semua dokumen KPR dengan sistem cloud storage yang aman dan terenkripsi"
                      },
                      {
                        title: "Mobile & Desktop Apps",
                        description: "Akses sistem dari mana saja dengan aplikasi mobile (iOS/Android) dan desktop (Windows/Mac)"
                      }
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex gap-4 rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/30"
                      >
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <ArrowRight className="size-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property Images Placeholder */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">Project Gallery</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-muted-foreground shadow-sm ring-1 ring-border/30"
                      >
                        <div className="text-center">
                          <Building2 className="size-12 mx-auto mb-2 opacity-50" />
                          <p className="text-xs">Property Image {i}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact & Footer */}
                <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center shadow-sm ring-1 ring-primary/20">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Transform Your Business?</h3>
                  <p className="text-muted-foreground mb-6">
                    Hubungi kami untuk demo dan konsultasi gratis
                  </p>
                  <div className="flex items-center justify-center gap-6 text-sm">
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-semibold text-foreground">sales@devproflow.com</p>
                    </div>
                    <div className="h-8 w-px bg-border"></div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-semibold text-foreground">+62 21 1234 5678</p>
                    </div>
                    <div className="h-8 w-px bg-border"></div>
                    <div>
                      <p className="text-muted-foreground">Website</p>
                      <p className="font-semibold text-foreground">www.devproflow.com</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground border-t border-border/30 pt-6">
                  <p>© 2026 DevPro Flow System Enterprise. All rights reserved.</p>
                  <p className="mt-1">Generated on {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
