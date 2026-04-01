import { DocxEngine } from './docx-engine'
import { HtmlEngine } from './html-engine'
import { TemplateManager } from './template-manager'
import { DataMapper } from './mapping-data'
import { 
  GenerationOptions, 
  BulkGenerationOptions, 
  DocumentGenerationResult,
  TemplateData,
  Template
} from './types'

export class DocumentEngine {
  private docxEngine: DocxEngine
  private htmlEngine: HtmlEngine
  private templateManager: TemplateManager
  private dataMapper: DataMapper

  constructor() {
    this.docxEngine = new DocxEngine({ 
      preserveImageQuality: true, 
      imageQualityDPI: 300 
    })
    this.htmlEngine = new HtmlEngine()
    this.templateManager = new TemplateManager()
    this.dataMapper = new DataMapper()
  }

  async generateDocument(options: GenerationOptions): Promise<DocumentGenerationResult> {
    try {
      const template = await this.templateManager.getTemplateById(options.templateId)
      
      if (!template) {
        return {
          success: false,
          fileName: '',
          error: 'Template not found'
        }
      }

      const data: TemplateData = {
        ...options.data,
        ...options.customVariables
      }

      if (template.type === 'docx') {
        const buffer = await this.templateManager.getTemplateBuffer(template.path)
        
        if (options.outputFormat === 'pdf') {
          return {
            success: false,
            fileName: '',
            error: 'PDF conversion from DOCX requires additional setup. Please use HTML templates for PDF output.'
          }
        }
        
        return await this.docxEngine.generateDocument(buffer, data, template.name)
      } else {
        const content = await this.templateManager.getTemplateContent(template.path)
        
        if (options.outputFormat === 'pdf') {
          return await this.htmlEngine.generatePDF(content, data, template.name)
        } else {
          return await this.htmlEngine.generateDocument(content, data, template.name)
        }
      }
    } catch (error) {
      console.error('DocumentEngine Error:', error)
      return {
        success: false,
        fileName: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  async generateBulkDocuments(options: BulkGenerationOptions): Promise<DocumentGenerationResult[]> {
    const results: DocumentGenerationResult[] = []

    try {
      let dataRecords: TemplateData[] = []

      if (options.dataSource === 'database' && options.recordIds) {
        dataRecords = await this.dataMapper.fetchMultipleRecords('nasabah', options.recordIds)
      } else if (options.dataSource === 'manual' && options.manualData) {
        dataRecords = options.manualData
      }

      for (const templateId of options.templates) {
        for (const data of dataRecords) {
          const result = await this.generateDocument({
            templateId,
            data,
            outputFormat: options.outputFormat
          })
          results.push(result)
        }
      }

      return results
    } catch (error) {
      console.error('Bulk generation error:', error)
      return [{
        success: false,
        fileName: '',
        error: error instanceof Error ? error.message : 'Bulk generation failed'
      }]
    }
  }

  async getAvailableTemplates(): Promise<Template[]> {
    return await this.templateManager.getTemplates()
  }

  async getTemplateVariables(templateId: string): Promise<string[]> {
    try {
      const template = await this.templateManager.getTemplateById(templateId)
      
      if (!template) {
        return []
      }

      if (template.type === 'docx') {
        const buffer = await this.templateManager.getTemplateBuffer(template.path)
        return this.docxEngine.extractVariables(buffer)
      } else {
        const content = await this.templateManager.getTemplateContent(template.path)
        return this.htmlEngine.extractVariables(content)
      }
    } catch (error) {
      console.error('Error extracting variables:', error)
      return []
    }
  }

  async fetchDataFromDatabase(tableName: string, recordId: string): Promise<TemplateData | null> {
    return await this.dataMapper.fetchRecordById(tableName, recordId)
  }

  async fetchMultipleRecords(tableName: string, recordIds: string[]): Promise<TemplateData[]> {
    return await this.dataMapper.fetchMultipleRecords(tableName, recordIds)
  }
}

export const documentEngine = new DocumentEngine()

export * from './types'
export { DocxEngine } from './docx-engine'
export { HtmlEngine } from './html-engine'
export { TemplateManager, templateManager } from './template-manager'
export { DataMapper, dataMapper } from './mapping-data'
