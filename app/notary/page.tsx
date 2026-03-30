'use client'

import React from 'react'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopbar } from '@/components/dashboard/topbar'
import { FileText, Clock, CheckCircle2, Upload } from 'lucide-react'

// TOP METRICS DATA
const topMetrics = [
  { label: 'Total Antrean Akad', value: '12 Units', icon: Clock, color: 'amber' },
  { label: 'Total TBO / Proses Balik Nama', value: '22 Units', icon: FileText, color: 'blue' },
  { label: 'Sertifikat Selesai', value: '45 Units', icon: CheckCircle2, color: 'green' },
]

// LEGAL TRACKER DATA - AKAD & TBO TRACKING
const legalTrackerData = [
  { nama: 'Ahmad Fauzi', jadwalAkad: '15 Apr 2026', statusMinutaAjb: 'Menjadwalkan Akad', statusSertifikat: 'Belum Diproses' },
  { nama: 'Siti Nurhaliza', jadwalAkad: '18 Apr 2026', statusMinutaAjb: 'Proses TBO', statusSertifikat: 'Pengajuan Balik Nama' },
  { nama: 'Budi Santoso', jadwalAkad: '12 Apr 2026', statusMinutaAjb: 'Selesai', statusSertifikat: 'Sertifikat Diterima' },
  { nama: 'Dewi Lestari', jadwalAkad: '20 Apr 2026', statusMinutaAjb: 'Menjadwalkan Akad', statusSertifikat: 'Belum Diproses' },
  { nama: 'Rendra Wijaya', jadwalAkad: '22 Apr 2026', statusMinutaAjb: 'Proses TBO', statusSertifikat: 'Pengajuan Balik Nama' },
  { nama: 'Bambang Irawan', jadwalAkad: '10 Apr 2026', statusMinutaAjb: 'Selesai', statusSertifikat: 'Sertifikat Diterima' },
  { nama: 'Eka Putri', jadwalAkad: '25 Apr 2026', statusMinutaAjb: 'Menjadwalkan Akad', statusSertifikat: 'Belum Diproses' },
  { nama: 'Fahri Rahman', jadwalAkad: '17 Apr 2026', statusMinutaAjb: 'Proses TBO', statusSertifikat: 'Pengajuan Balik Nama' },
  { nama: 'Gita Merah', jadwalAkad: '08 Apr 2026', statusMinutaAjb: 'Selesai', statusSertifikat: 'Sertifikat Diterima' },
  { nama: 'Hendra Gunawan', jadwalAkad: '28 Apr 2026', statusMinutaAjb: 'Menjadwalkan Akad', statusSertifikat: 'Belum Diproses' },
]

// DOCUMENT QUEUE - COLLECTED DOCUMENTS
const documentQueueData = [
  { dokumen: 'Kartu Tanda Penduduk (KTP)', pengumpulOleh: 'Legal Team', tanggal: '05 Apr 2026', status: 'Dikumpulkan' },
  { dokumen: 'Nomor Pokok Wajib Pajak (NPWP)', pengumpulOleh: 'Legal Team', tanggal: '05 Apr 2026', status: 'Dikumpulkan' },
  { dokumen: 'Surat Izin Mengemudi (SIM)', pengumpulOleh: 'Legal Team', tanggal: '06 Apr 2026', status: 'Dikumpulkan' },
  { dokumen: 'Surat Keterangan Domisili', pengumpulOleh: 'Legal Team', tanggal: '07 Apr 2026', status: 'Dikumpulkan' },
  { dokumen: 'Bukti Pembayaran Pajak Bumi & Bangunan', pengumpulOleh: 'Legal Team', tanggal: '08 Apr 2026', status: 'Dikumpulkan' },
  { dokumen: 'Sertifikat Tanah (SHM)', pengumpulOleh: 'Legal Team', tanggal: '10 Apr 2026', status: 'Dikumpulkan' },
  { dokumen: 'Surat Kuasa Mutlak (SKM)', pengumpulOleh: 'Sales Team', tanggal: '11 Apr 2026', status: 'Dikumpulkan' },
  { dokumen: 'Surat Pernyataan Penghasilan', pengumpulOleh: 'Legal Team', tanggal: '12 Apr 2026', status: 'Dalam Verifikasi' },
  { dokumen: 'Rekening Koran Terakhir', pengumpulOleh: 'Bank Team', tanggal: '14 Apr 2026', status: 'Menunggu Scan' },
  { dokumen: 'Laporan Keuangan Bisnis', pengumpulOleh: 'Bank Team', tanggal: '15 Apr 2026', status: 'Dalam Verifikasi' },
]

const getStatusColorMinuta = (status: string) => {
  switch (status) {
    case 'Menjadwalkan Akad':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    case 'Proses TBO':
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    case 'Selesai':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

const getStatusColorSertifikat = (status: string) => {
  switch (status) {
    case 'Belum Diproses':
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
    case 'Pengajuan Balik Nama':
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    case 'Sertifikat Diterima':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

const getDocStatusColor = (status: string) => {
  switch (status) {
    case 'Dikumpulkan':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    case 'Dalam Verifikasi':
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    case 'Menunggu Scan':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

export default function NotaryPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-8 py-7">
            {/* HEADER */}
            <div>
              <h1 className="text-4xl font-bold text-foreground">Portal Jadwal Akad & Pemberkasan TBO</h1>
              <p className="mt-2 text-muted-foreground">Kelola jadwal Akad (Contract Signing) dan pelacakan Transfer Bea Obat (TBO) untuk semua klien</p>
            </div>

            {/* TOP 3 METRICS */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topMetrics.map((metric) => {
                const IconComponent = metric.icon
                const colorMap = {
                  amber: 'from-amber-500/15 to-amber-500/5 text-amber-400',
                  blue: 'from-blue-500/15 to-blue-500/5 text-blue-400',
                  green: 'from-green-500/15 to-green-500/5 text-green-400',
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

            {/* LEGAL TRACKER TABLE */}
            <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-6 border-b border-border/40">
                <h2 className="text-xl font-bold text-foreground">Jadwal Akad & Pemberkasan TBO</h2>
                <p className="mt-1 text-xs text-muted-foreground">Kelola status kontrak dan transfer kepemilikan properti untuk setiap nasabah</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 bg-card/50">
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Nama Nasabah</th>
                      <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Jadwal Akad</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Status Minuta AJB</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Status Sertifikat</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {legalTrackerData.map((item, idx) => (
                      <tr key={idx} className="border-b border-border/20 transition-colors hover:bg-card/50">
                        <td className="px-6 py-4 font-medium">{item.nama}</td>
                        <td className="px-6 py-4 text-right text-sm font-medium">{item.jadwalAkad}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColorMinuta(item.statusMinutaAjb)}`}>
                            {item.statusMinutaAjb}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColorSertifikat(item.statusSertifikat)}`}>
                            {item.statusSertifikat}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-all">
                            <Upload className="size-4" />
                            Upload Document
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* DOCUMENT QUEUE */}
            <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-6 border-b border-border/40">
                <h2 className="text-xl font-bold text-foreground">Antrian Dokumen Fisik yang Dikumpulkan</h2>
                <p className="mt-1 text-xs text-muted-foreground">Status dokumen yang sudah dikumpulkan oleh tim legal dan pihak terkait</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 bg-card/50">
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Dokumen</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Dikumpulkan oleh</th>
                      <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Tanggal Dikumpulkan</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentQueueData.map((item, idx) => (
                      <tr key={idx} className="border-b border-border/20 transition-colors hover:bg-card/50">
                        <td className="px-6 py-4 font-medium">{item.dokumen}</td>
                        <td className="px-6 py-4 text-sm">{item.pengumpulOleh}</td>
                        <td className="px-6 py-4 text-right text-sm font-medium">{item.tanggal}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getDocStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
