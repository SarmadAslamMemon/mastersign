import React from 'react'
import { EnhancedDesignEditor } from '../components/design-editor'

const EnhancedEditorDemo = () => {
  return (
    <div className="h-screen bg-gray-50">
      <div className="h-full">
        <EnhancedDesignEditor 
          canvasId="enhanced-canvas"
          width={1200}
          height={800}
          onSave={() => {
            console.log('🎯 Enhanced Editor: Saving design...')
            alert('Save functionality - Enhanced Editor working!')
          }}
          onExport={() => {
            console.log('🎯 Enhanced Editor: Exporting design...')
            alert('Export functionality - Enhanced Editor working!')
          }}
        />
      </div>
    </div>
  )
}

export default EnhancedEditorDemo

