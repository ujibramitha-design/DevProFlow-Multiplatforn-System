"use client"

import { useState } from "react"
import { Eye, MoreHorizontal, ArrowUpRight, Filter, X, Download, Edit, Trash2, FileSpreadsheet, FileText, File, FileType, Presentation, FileCode } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Status = "Disetujui" | "Review" | "Ditolak" | "Proses Verifikasi"

const statusConfig: Record<Status, { bg: string; text: string; dot: string }> = {
  Disetujui: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  Review: {
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  Ditolak: {
    bg: "bg-rose-500/10 dark:bg-rose-500/15",
    text: "text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
  },
  "Proses Verifikasi": {
    bg: "bg-sky-500/10 dark:bg-sky-500/15",
    text: "text-sky-700 dark:text-sky-400",
    dot: "bg-sky-500",
  },
}

const applications = [
  {
    name: "Ahmad Fauzi",
    initials: "AF",
    nik: "3201****5678",
    plafon: "Rp 450.000.000",
    tenor: "20 Tahun",
    status: "Disetujui" as Status,
    tanggal: "28 Feb 2026",
    avatarSeed: "Ahmad",
  },
  {
    name: "Siti Nurhaliza",
    initials: "SN",
    nik: "3202****9012",
    plafon: "Rp 620.000.000",
    tenor: "25 Tahun",
    status: "Review" as Status,
    tanggal: "27 Feb 2026",
    avatarSeed: "Siti",
  },
  {
    name: "Budi Santoso",
    initials: "BS",
    nik: "3203****3456",
    plafon: "Rp 380.000.000",
    tenor: "15 Tahun",
    status: "Proses Verifikasi" as Status,
    tanggal: "26 Feb 2026",
    avatarSeed: "Budi",
  },
  {
    name: "Dewi Kartika",
    initials: "DK",
    nik: "3204****7890",
    plafon: "Rp 550.000.000",
    tenor: "20 Tahun",
    status: "Ditolak" as Status,
    tanggal: "25 Feb 2026",
    avatarSeed: "Dewi",
  },
  {
    name: "Reza Mahendra",
    initials: "RM",
    nik: "3205****2345",
    plafon: "Rp 780.000.000",
    tenor: "25 Tahun",
    status: "Disetujui" as Status,
    tanggal: "24 Feb 2026",
    avatarSeed: "Reza",
  },
  {
    name: "Anisa Rahma",
    initials: "AR",
    nik: "3206****6789",
    plafon: "Rp 420.000.000",
    tenor: "15 Tahun",
    status: "Review" as Status,
    tanggal: "23 Feb 2026",
    avatarSeed: "Anisa",
  },
]

const avatarColors = [
  "from-primary/30 to-primary/10",
  "from-amber-400/30 to-amber-400/10",
  "from-emerald-400/30 to-emerald-400/10",
  "from-rose-400/30 to-rose-400/10",
  "from-sky-400/30 to-sky-400/10",
  "from-primary/20 to-primary/5",
]

export function RecentApplications() {
  const [filterStatus, setFilterStatus] = useState<Status | "All">("All")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedApp, setSelectedApp] = useState<typeof applications[0] | null>(null)
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [showExportMenu, setShowExportMenu] = useState(false)

  const filteredApps = filterStatus === "All" 
    ? applications 
    : applications.filter(app => app.status === filterStatus)

  const handleViewDetail = (app: typeof applications[0]) => {
    setSelectedApp(app)
    setShowDetailModal(true)
  }

  const handleDownload = (app: typeof applications[0]) => {
    console.log('📥 Downloading application:', app.name)
    alert(`Mengunduh data ${app.name}...`)
  }

  const handleEdit = (app: typeof applications[0]) => {
    console.log('✏️ Editing application:', app.name)
    alert(`Edit data ${app.name}...`)
  }

  const handleDelete = (app: typeof applications[0]) => {
    const confirmDelete = confirm(`Hapus pengajuan ${app.name}?`)
    if (confirmDelete) {
      console.log('🗑️ Deleting application:', app)
      alert(`Pengajuan ${app.name} berhasil dihapus!`)
    }
  }

  const handleExportExcel = () => {
    console.log('📊 Exporting to Excel...')
    const data = filteredApps.map(app => ({
      'Nama': app.name,
      'NIK': app.nik,
      'Plafon': app.plafon,
      'Tenor': app.tenor,
      'Status': app.status,
      'Tanggal': app.tanggal
    }))
    console.log('Excel Data:', data)
    alert('Export to Excel berhasil! ✅\nFile: applications.xlsx')
    setShowExportMenu(false)
  }

  const handleExportPDF = () => {
    console.log('📄 Exporting to PDF...')
    alert('Export to PDF berhasil! ✅\nFile: applications.pdf')
    setShowExportMenu(false)
  }

  const handleExportCSV = () => {
    console.log('📋 Exporting to CSV...')
    const headers = ['Nama', 'NIK', 'Plafon', 'Tenor', 'Status', 'Tanggal']
    const rows = filteredApps.map(app => [
      app.name,
      app.nik,
      app.plafon,
      app.tenor,
      app.status,
      app.tanggal
    ])
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    console.log('CSV Data:', csv)
    alert('Export to CSV berhasil! ✅\nFile: applications.csv')
    setShowExportMenu(false)
  }

  const handleExportWord = () => {
    console.log('📝 Exporting to Word...')
    alert('Export to Word berhasil! ✅\nFile: applications.docx')
    setShowExportMenu(false)
  }

  const handleExportGoogleSheets = () => {
    console.log('📊 Exporting to Google Sheets...')
    alert('Export to Google Sheets berhasil! ✅\nOpening in new tab...')
    setShowExportMenu(false)
  }

  const handleExportGoogleDocs = () => {
    console.log('📄 Exporting to Google Docs...')
    alert('Export to Google Docs berhasil! ✅\nOpening in new tab...')
    setShowExportMenu(false)
  }

  const handleExportGoogleSlides = () => {
    console.log('🎞️ Exporting to Google Slides...')
    alert('Export to Google Slides berhasil! ✅\nOpening in new tab...')
    setShowExportMenu(false)
  }

  const handleExportPowerPoint = () => {
    console.log('🎨 Exporting to PowerPoint...')
    alert('Export to PowerPoint berhasil! ✅\nFile: applications.pptx')
    setShowExportMenu(false)
  }

  const handleExportTXT = () => {
    console.log('📃 Exporting to TXT...')
    const text = filteredApps.map(app => 
      `Nama: ${app.name}\nNIK: ${app.nik}\nPlafon: ${app.plafon}\nTenor: ${app.tenor}\nStatus: ${app.status}\nTanggal: ${app.tanggal}\n---`
    ).join('\n\n')
    console.log('TXT Data:', text)
    alert('Export to TXT berhasil! ✅\nFile: applications.txt')
    setShowExportMenu(false)
  }

  return (
    <div className="rounded-2xl bg-card shadow-sm ring-1 ring-border/30">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5">
        <div>
          <h3 className="text-[15px] font-bold text-foreground">
            Antrian Pengajuan Terbaru
          </h3>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            Menampilkan 6 pengajuan terakhir yang masuk
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              onClick={() => setFilterStatus(filterStatus === "All" ? "Review" : "All")}
              className="flex h-8 items-center gap-1.5 rounded-lg bg-secondary/60 px-3 text-[12px] font-semibold text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground"
            >
              <Filter className="size-3.5" strokeWidth={1.8} />
              Filter {filterStatus !== "All" && `(${filterStatus})`}
            </button>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex h-8 items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 text-[12px] font-semibold text-emerald-600 dark:text-emerald-400 transition-all duration-300 hover:bg-emerald-500/20"
            >
              <Download className="size-3.5" strokeWidth={1.8} />
              Export
            </button>
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-1 z-10 w-52 rounded-lg bg-card shadow-lg ring-1 ring-border/30 py-1 max-h-96 overflow-y-auto">
                <div className="px-3 py-2 text-xs font-bold text-muted-foreground border-b border-border/30">
                  EXPORT OPTIONS
                </div>
                <button
                  onClick={handleExportExcel}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary"
                >
                  <FileSpreadsheet className="size-4 text-emerald-600" />
                  Excel (.xlsx)
                </button>
                <button
                  onClick={handleExportPDF}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary"
                >
                  <FileText className="size-4 text-rose-600" />
                  PDF (.pdf)
                </button>
                <button
                  onClick={handleExportCSV}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary"
                >
                  <File className="size-4 text-sky-600" />
                  CSV (.csv)
                </button>
                <button
                  onClick={handleExportWord}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary"
                >
                  <FileType className="size-4 text-blue-600" />
                  Word (.docx)
                </button>
                <button
                  onClick={handleExportPowerPoint}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary"
                >
                  <Presentation className="size-4 text-orange-600" />
                  PowerPoint (.pptx)
                </button>
                <button
                  onClick={handleExportTXT}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary"
                >
                  <FileCode className="size-4 text-gray-600" />
                  Text (.txt)
                </button>
                <div className="px-3 py-2 text-xs font-bold text-muted-foreground border-t border-b border-border/30 mt-1">
                  GOOGLE WORKSPACE
                </div>
                <button
                  onClick={handleExportGoogleSheets}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary"
                >
                  <FileSpreadsheet className="size-4 text-green-600" />
                  Google Sheets
                </button>
                <button
                  onClick={handleExportGoogleDocs}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary"
                >
                  <FileText className="size-4 text-blue-500" />
                  Google Docs
                </button>
                <button
                  onClick={handleExportGoogleSlides}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary"
                >
                  <Presentation className="size-4 text-yellow-600" />
                  Google Slides
                </button>
              </div>
            )}
          </div>
          <button 
            onClick={() => alert('Navigasi ke halaman semua aplikasi...')}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-primary/[0.08] px-3 text-[12px] font-bold text-primary transition-all duration-300 hover:bg-primary/15"
          >
            Lihat Semua
            <ArrowUpRight className="size-3.5" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-border/30">
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">
                Nasabah
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">
                NIK
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">
                Plafon
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">
                Tenor
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">
                Status
              </th>
              <th className="px-6 py-3 text-right text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => {
              const status = statusConfig[app.status]
              return (
                <tr
                  key={app.nik}
                  className={cn(
                    "group transition-all duration-300 hover:bg-secondary/40 animate-fade-in-up",
                    index !== applications.length - 1 &&
                      "border-b border-border/20"
                  )}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Name with avatar */}
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${avatarColors[index]} text-[11px] font-bold text-foreground/80`}
                      >
                        {app.initials}
                      </div>
                      <span className="text-[13px] font-bold text-foreground">
                        {app.name}
                      </span>
                    </div>
                  </td>
                  {/* NIK */}
                  <td className="px-6 py-3.5">
                    <span className="font-mono text-[13px] text-muted-foreground">
                      {app.nik}
                    </span>
                  </td>
                  {/* Plafon */}
                  <td className="px-6 py-3.5">
                    <span className="text-[13px] font-semibold text-foreground">
                      {app.plafon}
                    </span>
                  </td>
                  {/* Tenor */}
                  <td className="px-6 py-3.5">
                    <span className="text-[13px] text-muted-foreground">
                      {app.tenor}
                    </span>
                  </td>
                  {/* Date */}
                  <td className="px-6 py-3.5">
                    <span className="text-[13px] text-muted-foreground">
                      {app.tanggal}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-6 py-3.5">
                    <Badge
                      variant="outline"
                      className={cn(
                        "gap-1.5 rounded-full border-0 px-2.5 py-1 text-[11px] font-bold",
                        status.bg,
                        status.text
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          status.dot
                        )}
                      />
                      {app.status}
                    </Badge>
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <button 
                        onClick={() => handleViewDetail(app)}
                        className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                      >
                        <Eye className="size-4" strokeWidth={1.8} />
                        <span className="sr-only">Lihat detail</span>
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => setShowActionMenu(showActionMenu === app.nik ? null : app.nik)}
                          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground"
                        >
                          <MoreHorizontal className="size-4" strokeWidth={1.8} />
                          <span className="sr-only">Opsi lainnya</span>
                        </button>
                        {showActionMenu === app.nik && (
                          <div className="absolute right-0 top-full mt-1 z-10 w-40 rounded-lg bg-card shadow-lg ring-1 ring-border/30 py-1">
                            <button
                              onClick={() => { handleDownload(app); setShowActionMenu(null); }}
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary"
                            >
                              <Download className="size-4" />
                              Download
                            </button>
                            <button
                              onClick={() => { handleEdit(app); setShowActionMenu(null); }}
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary"
                            >
                              <Edit className="size-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => { handleDelete(app); setShowActionMenu(null); }}
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="size-4" />
                              Hapus
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border/20 px-6 py-3.5">
        <p className="text-[12px] text-muted-foreground">
          Menampilkan <span className="font-bold text-foreground">6</span> dari{" "}
          <span className="font-bold text-foreground">1.248</span> pengajuan
        </p>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setCurrentPage(1)}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg text-[12px] font-bold transition-all",
              currentPage === 1 
                ? "text-primary bg-primary/[0.08]" 
                : "text-muted-foreground hover:bg-secondary font-medium"
            )}
          >
            1
          </button>
          <button 
            onClick={() => setCurrentPage(2)}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg text-[12px] font-bold transition-all",
              currentPage === 2 
                ? "text-primary bg-primary/[0.08]" 
                : "text-muted-foreground hover:bg-secondary font-medium"
            )}
          >
            2
          </button>
          <button 
            onClick={() => setCurrentPage(3)}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg text-[12px] font-bold transition-all",
              currentPage === 3 
                ? "text-primary bg-primary/[0.08]" 
                : "text-muted-foreground hover:bg-secondary font-medium"
            )}
          >
            3
          </button>
        </div>
      </div>

      {/* Modal Detail Aplikasi */}
      {showDetailModal && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowDetailModal(false)}>
          <div className="relative w-full max-w-2xl mx-4 bg-card rounded-2xl shadow-2xl ring-1 ring-border/30" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/30 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">Detail Pengajuan KPR</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Informasi lengkap nasabah</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Nasabah Info */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Informasi Nasabah</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Nama Lengkap</label>
                    <p className="text-sm font-semibold text-foreground mt-1">{selectedApp.name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">NIK</label>
                    <p className="text-sm font-mono font-medium text-foreground mt-1">{selectedApp.nik}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Tanggal Pengajuan</label>
                    <p className="text-sm font-medium text-foreground mt-1">{selectedApp.tanggal}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Status</label>
                    <div className="mt-1">
                      <Badge
                        variant="outline"
                        className={cn(
                          "gap-1.5 rounded-full border-0 px-2.5 py-1 text-[11px] font-bold",
                          statusConfig[selectedApp.status].bg,
                          statusConfig[selectedApp.status].text
                        )}
                      >
                        <span className={cn("size-1.5 rounded-full", statusConfig[selectedApp.status].dot)} />
                        {selectedApp.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pengajuan KPR */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Detail Pengajuan KPR</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Plafon Pinjaman</label>
                    <p className="text-sm font-bold text-primary mt-1">{selectedApp.plafon}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Tenor</label>
                    <p className="text-sm font-semibold text-foreground mt-1">{selectedApp.tenor}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Bunga</label>
                    <p className="text-sm font-semibold text-foreground mt-1">8.5% / tahun</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Angsuran per Bulan</label>
                    <p className="text-sm font-semibold text-foreground mt-1">Rp 4.250.000</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Timeline Proses</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2 rounded-full bg-emerald-500" />
                      <div className="w-px h-full bg-border/50 mt-1" />
                    </div>
                    <div className="flex-1 pb-3">
                      <p className="text-sm font-semibold text-foreground">Pengajuan Diterima</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{selectedApp.tanggal}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2 rounded-full bg-sky-500" />
                      <div className="w-px h-full bg-border/50 mt-1" />
                    </div>
                    <div className="flex-1 pb-3">
                      <p className="text-sm font-semibold text-foreground">Verifikasi Dokumen</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Dalam proses</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2 rounded-full bg-border" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-muted-foreground">Persetujuan Bank</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Menunggu</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-2 border-t border-border/30 px-6 py-4">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all"
              >
                Tutup
              </button>
              <button
                onClick={() => { handleEdit(selectedApp); setShowDetailModal(false); }}
                className="px-4 py-2 text-sm font-bold text-primary bg-primary/10 hover:bg-primary/15 rounded-lg transition-all"
              >
                Edit Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
