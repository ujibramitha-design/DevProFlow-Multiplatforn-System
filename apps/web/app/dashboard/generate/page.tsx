"use client"

import { useState, useEffect } from "react"
import { FileText, Download, Loader2, FileCheck, Settings2, Database, Filter, Zap } from "lucide-react"
import { Template, TemplateData } from "@/lib/doc-engine/types"

export default function DocumentGeneratorPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [templateVariables, setTemplateVariables] = useState<string[]>([])
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [outputFormat, setOutputFormat] = useState<"docx" | "pdf">("docx")
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<"manual" | "database">("manual")
  const [selectedRecordId, setSelectedRecordId] = useState<string>("")
  const [bulkMode, setBulkMode] = useState(false)
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  useEffect(() => {
    fetchTemplates()
  }, [])

  useEffect(() => {
    if (selectedTemplate) {
      fetchTemplateVariables(selectedTemplate)
    }
  }, [selectedTemplate])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/generate-doc?action=templates')
      const data = await response.json()
      setTemplates(data.templates || [])
    } catch (error) {
      console.error('Error fetching templates:', error)
    }
  }

  const fetchTemplateVariables = async (templateId: string) => {
    try {
      const response = await fetch(`/api/generate-doc?action=variables&templateId=${templateId}`)
      const data = await response.json()
      setTemplateVariables(data.variables || [])
      
      const initialData: Record<string, any> = {}
      data.variables?.forEach((v: string) => {
        initialData[v] = ''
      })
      setFormData(initialData)
      setActiveFilters(data.variables || [])
    } catch (error) {
      console.error('Error fetching variables:', error)
    }
  }

  const fetchDatabaseRecord = async () => {
    if (!selectedRecordId) return
    
    try {
      const response = await fetch(`/api/generate-doc?action=data&table=nasabah&id=${selectedRecordId}`)
      const data = await response.json()
      if (data.data) {
        setFormData(data.data)
      }
    } catch (error) {
      console.error('Error fetching database record:', error)
    }
  }

  const handleGenerate = async () => {
    if (!selectedTemplate && !bulkMode) return
    
    setLoading(true)
    try {
      const payload = bulkMode ? {
        mode: 'bulk',
        templates: selectedTemplates,
        dataSource,
        outputFormat,
        zipOutput: true,
        ...(dataSource === 'database' 
          ? { recordIds: [selectedRecordId] }
          : { manualData: [formData] }
        )
      } : {
        mode: 'single',
        templateId: selectedTemplate,
        data: formData,
        outputFormat,
        customVariables: {}
      }

      const response = await fetch('/api/generate-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Generation failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = bulkMode 
        ? `documents_${Date.now()}.zip` 
        : `document_${Date.now()}.${outputFormat}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error generating document:', error)
      alert('Failed to generate document')
    } finally {
      setLoading(false)
    }
  }

  const toggleTemplateSelection = (templateId: string) => {
    setSelectedTemplates(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    )
  }

  const toggleFilter = (variable: string) => {
    setActiveFilters(prev =>
      prev.includes(variable)
        ? prev.filter(v => v !== variable)
        : [...prev, variable]
    )
  }

  const groupedTemplates = templates.reduce((acc, template) => {
    const category = template.category || 'General'
    if (!acc[category]) acc[category] = []
    acc[category].push(template)
    return acc
  }, {} as Record<string, Template[]>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Document Generator
            </h1>
            <p className="mt-2 text-muted-foreground">
              Multi-Master High-Fidelity Template Engine
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBulkMode(!bulkMode)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                bulkMode
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <Zap className="size-4" />
              {bulkMode ? 'Bulk Mode Active' : 'Enable Bulk Mode'}
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <FileText className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Template Selection</h2>
                  <p className="text-sm text-muted-foreground">Choose your master template</p>
                </div>
              </div>

              {bulkMode ? (
                <div className="space-y-4">
                  {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        {category}
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {categoryTemplates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => toggleTemplateSelection(template.id)}
                            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                              selectedTemplates.includes(template.id)
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-border/40 hover:border-primary/50 hover:bg-secondary/50'
                            }`}
                          >
                            <FileCheck className={`size-5 ${
                              selectedTemplates.includes(template.id) ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">{template.name}</p>
                              <p className="text-xs text-muted-foreground">.{template.type}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        {category}
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {categoryTemplates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                              selectedTemplate === template.id
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-border/40 hover:border-primary/50 hover:bg-secondary/50'
                            }`}
                          >
                            <FileText className={`size-5 ${
                              selectedTemplate === template.id ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">{template.name}</p>
                              <p className="text-xs text-muted-foreground">.{template.type}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!bulkMode && selectedTemplate && (
              <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                      <Database className="size-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Data Input</h2>
                      <p className="text-sm text-muted-foreground">Fill template variables</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 rounded-lg bg-secondary p-1">
                    <button
                      onClick={() => setDataSource('manual')}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                        dataSource === 'manual' ? 'bg-background shadow-sm' : 'text-muted-foreground'
                      }`}
                    >
                      Manual
                    </button>
                    <button
                      onClick={() => setDataSource('database')}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                        dataSource === 'database' ? 'bg-background shadow-sm' : 'text-muted-foreground'
                      }`}
                    >
                      Database
                    </button>
                  </div>
                </div>

                {dataSource === 'database' && (
                  <div className="mb-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Record ID"
                      value={selectedRecordId}
                      onChange={(e) => setSelectedRecordId(e.target.value)}
                      className="flex-1 rounded-lg border border-border/40 bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      onClick={fetchDatabaseRecord}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      Load Data
                    </button>
                  </div>
                )}

                <div className="mb-4 flex items-center gap-2">
                  <Filter className="size-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">Active Filters:</span>
                  <div className="flex flex-wrap gap-2">
                    {templateVariables.map((variable) => (
                      <button
                        key={variable}
                        onClick={() => toggleFilter(variable)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                          activeFilters.includes(variable)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        {variable}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {templateVariables
                    .filter(variable => activeFilters.includes(variable))
                    .map((variable) => (
                      <div key={variable}>
                        <label className="mb-1.5 block text-sm font-semibold text-foreground">
                          {variable.replace(/_/g, ' ')}
                        </label>
                        <input
                          type="text"
                          value={formData[variable] || ''}
                          onChange={(e) => setFormData({ ...formData, [variable]: e.target.value })}
                          className="w-full rounded-lg border border-border/40 bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder={`Enter ${variable.toLowerCase().replace(/_/g, ' ')}`}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <Settings2 className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Output Settings</h2>
                  <p className="text-sm text-muted-foreground">Configure export options</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Output Format</label>
                  <div className="grid grid-cols-2 gap-2 rounded-lg bg-secondary p-1">
                    <button
                      onClick={() => setOutputFormat('docx')}
                      className={`rounded-md py-2 text-sm font-semibold transition-all ${
                        outputFormat === 'docx' ? 'bg-background shadow-sm' : 'text-muted-foreground'
                      }`}
                    >
                      DOCX
                    </button>
                    <button
                      onClick={() => setOutputFormat('pdf')}
                      className={`rounded-md py-2 text-sm font-semibold transition-all ${
                        outputFormat === 'pdf' ? 'bg-background shadow-sm' : 'text-muted-foreground'
                      }`}
                    >
                      PDF
                    </button>
                  </div>
                </div>

                <div className="space-y-2 rounded-xl bg-secondary/50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Image Quality</span>
                    <span className="font-semibold">Ultra HD (300 DPI)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Preserve Formatting</span>
                    <span className="font-semibold text-green-500">✓ Enabled</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Layout Protection</span>
                    <span className="font-semibold text-green-500">✓ Active</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || (!selectedTemplate && !bulkMode) || (bulkMode && selectedTemplates.length === 0)}
              className="w-full rounded-xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-6 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  Generating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Download className="size-5" />
                  {bulkMode ? `Generate ${selectedTemplates.length} Documents` : 'Generate Document'}
                </span>
              )}
            </button>

            {bulkMode && selectedTemplates.length > 0 && (
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                <p className="text-sm font-semibold text-primary">
                  {selectedTemplates.length} template{selectedTemplates.length > 1 ? 's' : ''} selected
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Documents will be packaged in a ZIP file
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
