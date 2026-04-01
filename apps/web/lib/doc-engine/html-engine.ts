import Handlebars from 'handlebars'
import { TemplateData, DocumentGenerationResult } from './types'

export class HtmlEngine {
  private handlebars: typeof Handlebars

  constructor() {
    this.handlebars = Handlebars
    this.registerHelpers()
  }

  private registerHelpers() {
    this.handlebars.registerHelper('formatCurrency', (value: number | string) => {
      const num = typeof value === 'string' ? parseFloat(value) : value
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(num)
    })

    this.handlebars.registerHelper('formatDate', (value: string) => {
      const date = new Date(value)
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date)
    })

    this.handlebars.registerHelper('uppercase', (value: string) => {
      return value?.toUpperCase() || ''
    })

    this.handlebars.registerHelper('lowercase', (value: string) => {
      return value?.toLowerCase() || ''
    })
  }

  async generateDocument(
    templateHtml: string,
    data: TemplateData,
    templateName: string
  ): Promise<DocumentGenerationResult> {
    try {
      const template = this.handlebars.compile(templateHtml)
      const html = template(data)

      const fileName = `${templateName}_${Date.now()}.html`

      return {
        success: true,
        fileName,
        fileBuffer: Buffer.from(html, 'utf-8'),
        metadata: {
          templateUsed: templateName,
          generatedAt: new Date().toISOString(),
          dataUsed: data
        }
      }
    } catch (error) {
      console.error('HtmlEngine Error:', error)
      return {
        success: false,
        fileName: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  async generatePDF(
    templateHtml: string,
    data: TemplateData,
    templateName: string
  ): Promise<DocumentGenerationResult> {
    try {
      const template = this.handlebars.compile(templateHtml)
      const html = template(data)

      if (typeof window === 'undefined') {
        const puppeteer = await import('puppeteer')
        const browser = await puppeteer.default.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        })

        const page = await browser.newPage()
        await page.setContent(html, {
          waitUntil: 'networkidle0'
        })

        const pdfBuffer = await page.pdf({
          format: 'A4',
          printBackground: true,
          margin: {
            top: '20mm',
            right: '20mm',
            bottom: '20mm',
            left: '20mm'
          },
          preferCSSPageSize: true
        })

        await browser.close()

        const fileName = `${templateName}_${Date.now()}.pdf`

        return {
          success: true,
          fileName,
          fileBuffer: Buffer.from(pdfBuffer),
          metadata: {
            templateUsed: templateName,
            generatedAt: new Date().toISOString(),
            dataUsed: data
          }
        }
      } else {
        throw new Error('PDF generation is only available on server-side')
      }
    } catch (error) {
      console.error('HtmlEngine PDF Error:', error)
      return {
        success: false,
        fileName: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  extractVariables(templateHtml: string): string[] {
    const variableRegex = /\{\{([A-Z_]+)\}\}/g
    const variables = new Set<string>()
    
    let match
    while ((match = variableRegex.exec(templateHtml)) !== null) {
      variables.add(match[1])
    }

    return Array.from(variables)
  }
}
