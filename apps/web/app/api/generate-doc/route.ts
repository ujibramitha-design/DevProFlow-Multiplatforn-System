import { NextRequest, NextResponse } from 'next/server'
import { documentEngine } from '@/lib/doc-engine'
import { GenerationOptions, BulkGenerationOptions } from '@/lib/doc-engine/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mode, ...options } = body

    if (mode === 'bulk') {
      const bulkOptions = options as BulkGenerationOptions
      const results = await documentEngine.generateBulkDocuments(bulkOptions)
      
      const successResults = results.filter(r => r.success)
      
      if (successResults.length === 0) {
        return NextResponse.json(
          { error: 'All document generations failed', details: results },
          { status: 500 }
        )
      }

      if (bulkOptions.zipOutput && successResults.length > 1) {
        const JSZip = (await import('jszip')).default
        const zip = new JSZip()

        successResults.forEach(result => {
          if (result.fileBuffer) {
            zip.file(result.fileName, result.fileBuffer)
          }
        })

        const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })
        
        return new NextResponse(zipBuffer, {
          headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="documents_${Date.now()}.zip"`
          }
        })
      }

      return NextResponse.json({
        success: true,
        results: successResults.map(r => ({
          fileName: r.fileName,
          metadata: r.metadata
        }))
      })
    } else {
      const genOptions = options as GenerationOptions
      const result = await documentEngine.generateDocument(genOptions)

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 500 }
        )
      }

      if (result.fileBuffer) {
        const contentType = genOptions.outputFormat === 'pdf' 
          ? 'application/pdf' 
          : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

        return new NextResponse(result.fileBuffer, {
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${result.fileName}"`
          }
        })
      }

      return NextResponse.json({ success: true, result })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'templates') {
      const templates = await documentEngine.getAvailableTemplates()
      return NextResponse.json({ templates })
    }

    if (action === 'variables') {
      const templateId = searchParams.get('templateId')
      if (!templateId) {
        return NextResponse.json(
          { error: 'templateId is required' },
          { status: 400 }
        )
      }

      const variables = await documentEngine.getTemplateVariables(templateId)
      return NextResponse.json({ variables })
    }

    if (action === 'data') {
      const tableName = searchParams.get('table') || 'nasabah'
      const recordId = searchParams.get('id')

      if (recordId) {
        const data = await documentEngine.fetchDataFromDatabase(tableName, recordId)
        return NextResponse.json({ data })
      }

      const recordIds = searchParams.get('ids')?.split(',')
      if (recordIds) {
        const data = await documentEngine.fetchMultipleRecords(tableName, recordIds)
        return NextResponse.json({ data })
      }

      return NextResponse.json(
        { error: 'id or ids parameter is required' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('API GET Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
