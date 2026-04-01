import { promises as fs } from 'fs'
import path from 'path'
import { Template } from './types'

export class TemplateManager {
  private templatesPath: string

  constructor(templatesPath?: string) {
    this.templatesPath = templatesPath || path.join(process.cwd(), 'public', 'templates')
  }

  async getTemplates(): Promise<Template[]> {
    try {
      const files = await fs.readdir(this.templatesPath)
      
      const templates: Template[] = []

      for (const file of files) {
        const ext = path.extname(file).toLowerCase()
        if (ext === '.docx' || ext === '.html') {
          const filePath = path.join(this.templatesPath, file)
          const stats = await fs.stat(filePath)
          
          templates.push({
            id: file.replace(/\.[^/.]+$/, ''),
            name: this.formatTemplateName(file),
            type: ext === '.docx' ? 'docx' : 'html',
            path: filePath,
            description: `Template ${this.formatTemplateName(file)}`,
            category: this.extractCategory(file)
          })
        }
      }

      return templates
    } catch (error) {
      console.error('Error reading templates:', error)
      return []
    }
  }

  async getTemplateById(templateId: string): Promise<Template | null> {
    const templates = await this.getTemplates()
    return templates.find(t => t.id === templateId) || null
  }

  async getTemplateBuffer(templatePath: string): Promise<Buffer> {
    try {
      return await fs.readFile(templatePath)
    } catch (error) {
      console.error('Error reading template file:', error)
      throw new Error('Failed to read template file')
    }
  }

  async getTemplateContent(templatePath: string): Promise<string> {
    try {
      const buffer = await fs.readFile(templatePath)
      return buffer.toString('utf-8')
    } catch (error) {
      console.error('Error reading template content:', error)
      throw new Error('Failed to read template content')
    }
  }

  private formatTemplateName(filename: string): string {
    return filename
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
  }

  private extractCategory(filename: string): string {
    const lower = filename.toLowerCase()
    
    if (lower.includes('akad') || lower.includes('perjanjian')) return 'Legal'
    if (lower.includes('invoice') || lower.includes('kwitansi')) return 'Finance'
    if (lower.includes('bast') || lower.includes('serah-terima')) return 'Estate'
    if (lower.includes('surat') || lower.includes('letter')) return 'Correspondence'
    if (lower.includes('laporan') || lower.includes('report')) return 'Reports'
    
    return 'General'
  }

  async uploadTemplate(file: File): Promise<{ success: boolean; templateId?: string; error?: string }> {
    try {
      const ext = path.extname(file.name).toLowerCase()
      
      if (ext !== '.docx' && ext !== '.html') {
        return {
          success: false,
          error: 'Only .docx and .html files are supported'
        }
      }

      const buffer = Buffer.from(await file.arrayBuffer())
      const filePath = path.join(this.templatesPath, file.name)
      
      await fs.writeFile(filePath, buffer)

      return {
        success: true,
        templateId: file.name.replace(/\.[^/.]+$/, '')
      }
    } catch (error) {
      console.error('Error uploading template:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      }
    }
  }

  async deleteTemplate(templateId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const template = await this.getTemplateById(templateId)
      
      if (!template) {
        return {
          success: false,
          error: 'Template not found'
        }
      }

      await fs.unlink(template.path)

      return { success: true }
    } catch (error) {
      console.error('Error deleting template:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delete failed'
      }
    }
  }
}

export const templateManager = new TemplateManager()
