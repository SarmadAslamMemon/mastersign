'use client'

import React from 'react'
import { TemplateEditor } from './TemplateEditor'

export const TemplateEditorDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">SignFlow Template Editor</h1>
          <p className="text-gray-600 mt-1">
            Professional sign design templates with drag-and-drop editing
          </p>
        </div>
      </div>
      
      <TemplateEditor 
        width={1000} 
        height={700}
        className="max-w-7xl mx-auto"
      />
    </div>
  )
}
