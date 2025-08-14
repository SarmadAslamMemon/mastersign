'use client'

import React from 'react'
import { TemplateEditor } from '@/components/design-editor'

export default function SimpleBackgroundTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Simple Background Test</h1>
          <p className="text-gray-600 mt-1">
            Test the background image functionality with a simple interface
          </p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-blue-900 mb-2">How to Test:</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Select a template from the sidebar</li>
            <li>Click the green "Set Background" button in the toolbar</li>
            <li>Choose any image file (JPG, PNG, GIF)</li>
            <li>The image will automatically become the background</li>
            <li>Use "Remove Background" to clear it</li>
          </ol>
        </div>
        
        <TemplateEditor 
          width={1000} 
          height={700}
        />
      </div>
    </div>
  )
}
