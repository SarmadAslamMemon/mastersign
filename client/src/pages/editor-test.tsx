import React, { useState } from 'react'
import { DesignEditor } from '../../../components/design-editor/DesignEditor'
import { EditorProject } from '../../../components/design-editor/types'
import { Template } from '../../../components/design-editor/data/templates'

const EditorTestPage: React.FC = () => {
  const [loadedTemplate, setLoadedTemplate] = useState<Template | null>(null)

  const handleSave = (project: EditorProject) => {
    console.log('Saving project:', project)
    alert('Project saved! Check console for details.')
  }

  const handleExport = (blob: Blob, format: string) => {
    console.log('Exporting:', format, blob)
    
    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `design-export.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    alert('Design exported successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 bg-white border-b">
        <h1 className="text-2xl font-bold">Design Editor Test</h1>
        <p className="text-gray-600 mt-1">
          Test the basic design editor functionality
        </p>
        <div className="mt-2 text-sm text-gray-500">
          <strong>Keyboard shortcuts:</strong> V (select), T (text), R (rectangle), C (circle), Ctrl+Z (undo), Ctrl+Y (redo), Del (delete)
          <br />
          <strong>Text editing:</strong> Double-click any text to edit it, or press T to add new editable text
          <br />
          <strong>Undo/Redo:</strong> Use Ctrl+Z to undo and Ctrl+Y to redo. The toolbar buttons will show if undo/redo is available.
        </div>
      </div>
      
      <div className="h-[calc(100vh-120px)]">
        <DesignEditor
          onSave={handleSave}
          onExport={handleExport}
          width={800}
          height={600}
          tools={['select', 'text', 'rectangle', 'circle', 'image']}
          className="h-full"
        />
      </div>
    </div>
  )
}

export default EditorTestPage
