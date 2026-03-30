'use client'

import React, { useState } from 'react'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopbar } from '@/components/dashboard/topbar'
import { Download, Upload, CheckCircle2, AlertCircle, Clock, Database } from 'lucide-react'

// TOP METRICS DATA
const topMetrics = [
  { label: 'Total Master Files', value: '1,248', unit: 'Files', icon: Database, color: 'blue' },
  { label: 'Last Successful Sync', value: 'Today', unit: '14:30 WIB', icon: Clock, color: 'green' },
  { label: 'Sync Error Logs', value: '0', unit: 'Errors', icon: AlertCircle, color: 'emerald' },
]

// SYNC HISTORY DATA
const syncHistoryData = [
  { filename: 'Master_Stock_Inventory.xlsx', category: 'Sales', uploadDate: '28 Mar 2026', uploader: 'Ahmad Fauzi', status: 'Success', recordsProcessed: 342 },
  { filename: 'Legal_Document_Templates.pdf', category: 'Legal', uploadDate: '27 Mar 2026', uploader: 'Siti Nurhaliza', status: 'Success', recordsProcessed: 156 },
  { filename: 'Finance_Account_Map.csv', category: 'Finance', uploadDate: '26 Mar 2026', uploader: 'Dr. Budi Santoso', status: 'Syncing', recordsProcessed: 89 },
  { filename: 'Bank_Product_List.xlsx', category: 'Sales', uploadDate: '25 Mar 2026', uploader: 'Bambang Irawan', status: 'Failed', recordsProcessed: 0 },
  { filename: 'Notary_Location_Database.csv', category: 'Legal', uploadDate: '24 Mar 2026', uploader: 'Eka Putri', status: 'Success', recordsProcessed: 267 },
]

// TEMPLATE REPOSITORY DATA
const templatesData = [
  { name: 'Template_Master_Stock.xlsx', size: '245 KB', description: 'Product inventory and stock tracking' },
  { name: 'Template_Finance_Account.xlsx', size: '178 KB', description: 'Financial account mapping' },
  { name: 'Template_Legal_Documents.xlsx', size: '312 KB', description: 'Legal document checklist' },
  { name: 'Template_Bank_Products.csv', size: '89 KB', description: 'Bank product information' },
  { name: 'Template_Notary_Locations.csv', size: '156 KB', description: 'Notary office database' },
]

// STATUS BADGE COLOR MAPPING
const statusColors = {
  Success: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  Syncing: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  Failed: 'bg-red-500/20 text-red-300 border border-red-500/30',
}

export default function MasterDataPage() {
  const [isDragActive, setIsDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    const files = Array.from(e.dataTransfer.files)
    setUploadedFiles([...uploadedFiles, ...files])
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedFiles([...uploadedFiles, ...files])
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-8 py-7">
            {/* HEADER */}
            <div>
              <h1 className="text-4xl font-bold text-foreground">Master Data & Document Synchronization</h1>
              <p className="mt-2 text-muted-foreground">Bulk upload, database synchronization, and template management</p>
            </div>

            {/* TOP METRICS - 3 CARDS */}
            <div className="grid gap-4 sm:grid-cols-3">
              {topMetrics.map((metric) => {
                const IconComponent = metric.icon
                const colorMap = {
                  blue: 'from-blue-500/15 to-blue-500/5 text-blue-400',
                  green: 'from-green-500/15 to-green-500/5 text-green-400',
                  emerald: 'from-emerald-500/15 to-emerald-500/5 text-emerald-400',
                }
                return (
                  <div
                    key={metric.label}
                    className={`rounded-2xl bg-gradient-to-br ${colorMap[metric.color as keyof typeof colorMap]} p-6 ring-1 ring-border/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                        <p className="mt-3 text-right text-3xl font-bold">{metric.value}</p>
                        <p className="mt-1 text-right text-xs text-muted-foreground">{metric.unit}</p>
                      </div>
                      <IconComponent className="mt-1 size-5" strokeWidth={2} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* BULK UPLOAD AREA */}
            <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
              <h2 className="mb-6 text-xl font-bold text-foreground">Bulk Upload Area</h2>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`rounded-xl border-2 border-dashed transition-all duration-300 ${
                  isDragActive ? 'border-primary bg-primary/10' : 'border-border/40 bg-card/30'
                } p-12 text-center`}
              >
                <Upload className="mx-auto size-12 text-muted-foreground mb-4" />
                <p className="text-lg font-semibold text-foreground">Drag & Drop Files Here</p>
                <p className="mt-2 text-sm text-muted-foreground">Supported formats: CSV, Excel (.xlsx), PDF</p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <label className="cursor-pointer rounded-lg bg-primary/10 px-6 py-3 font-semibold text-primary transition-all hover:bg-primary/20">
                    Browse Files
                    <input type="file" multiple accept=".csv,.xlsx,.pdf" onChange={handleFileInput} className="hidden" />
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-6 space-y-2 text-left">
                    <p className="text-xs font-semibold text-foreground">Selected Files ({uploadedFiles.length})</p>
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-lg bg-white/5 p-3 text-xs">
                        <span className="text-foreground">{file.name}</span>
                        <span className="text-muted-foreground text-right">{(file.size / 1024).toFixed(2)} KB</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="mt-6 w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20">
                Process & Sync to Database
              </button>
            </div>

            {/* SYNC HISTORY TABLE */}
            <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="border-b border-border/40 px-6 py-4">
                <h2 className="text-xl font-bold text-foreground">Sync History</h2>
                <p className="mt-1 text-xs text-muted-foreground">Recent upload and synchronization activities</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40 bg-card/50">
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Filename</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Data Category</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Upload Date</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Uploader</th>
                      <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Records Processed</th>
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Sync Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syncHistoryData.map((row, idx) => (
                      <tr key={idx} className="border-b border-border/20 transition-colors hover:bg-card/50">
                        <td className="px-6 py-4 font-medium text-foreground">{row.filename}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{row.category}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{row.uploadDate}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{row.uploader}</td>
                        <td className="px-6 py-4 text-right font-semibold text-cyan-400">{row.recordsProcessed}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusColors[row.status as keyof typeof statusColors]}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TEMPLATE REPOSITORY */}
            <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="border-b border-border/40 px-6 py-4">
                <h2 className="text-xl font-bold text-foreground">Template Repository</h2>
                <p className="mt-1 text-xs text-muted-foreground">Download standard Excel/CSV templates for bulk uploads</p>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-5">
                {templatesData.map((template, idx) => (
                  <div key={idx} className="rounded-lg border border-border/40 bg-white/5 p-4 transition-all hover:bg-white/10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm">{template.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{template.description}</p>
                        <p className="mt-2 text-right text-xs text-muted-foreground">{template.size}</p>
                      </div>
                    </div>
                    <button className="mt-4 w-full rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/20 flex items-center justify-center gap-1">
                      <Download className="size-3" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
