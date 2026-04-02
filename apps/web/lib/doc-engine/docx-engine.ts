import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { TemplateData, DocumentGenerationResult } from './types'

export class DocxEngine {
  private preserveImageQuality: boolean = true
  private imageQualityDPI: number = 300

  constructor(options?: { preserveImageQuality?: boolean; imageQualityDPI?: number }) {
    if (options?.preserveImageQuality !== undefined) {
      this.preserveImageQuality = options.preserveImageQuality
    }
    if (options?.imageQualityDPI) {
      this.imageQualityDPI = options.imageQualityDPI
    }
  }

  async generateDocument(
    templateBuffer: Buffer,
    data: TemplateData,
    templateName: string
  ): Promise<DocumentGenerationResult> {
    try {
      const zip = new PizZip(templateBuffer)
      
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        nullGetter: () => '',
        delimiters: {
          start: '{',
          end: '}'
        }
      })

      doc.render(data)

      const buffer = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 9
        },
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })

      const fileName = `${templateName}_${Date.now()}.docx`

      return {
        success: true,
        fileName,
        fileBuffer: buffer,
        metadata: {
          templateUsed: templateName,
          generatedAt: new Date().toISOString(),
          dataUsed: data
        }
      }
    } catch (error) {
      console.error('DocxEngine Error:', error)
      return {
        success: false,
        fileName: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  extractVariables(templateBuffer: Buffer): string[] {
    try {
      const zip = new PizZip(templateBuffer)
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true
      })

      const text = doc.getFullText()
      const variableRegex = /\{([A-Z_]+)\}/g
      const variables = new Set<string>()
      
      let match
      while ((match = variableRegex.exec(text)) !== null) {
        variables.add(match[1])
      }

      return Array.from(variables)
    } catch (error) {
      console.error('Error extracting variables:', error)
      return []
    }
  }

  async validateTemplate(templateBuffer: Buffer): Promise<{ valid: boolean; error?: string }> {
    try {
      const zip = new PizZip(templateBuffer)
      new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true
      })
      return { valid: true }
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Invalid template format'
      }
    }
  }
}
