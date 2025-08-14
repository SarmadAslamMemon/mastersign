'use client'

import React, { useState } from 'react'
import { TemplateEditor } from '@/components/design-editor'

export default function BackgroundImageTestPage() {
  const [debugInfo, setDebugInfo] = useState<string>('')

  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => prev + '\n' + new Date().toLocaleTimeString() + ': ' + info)
  }

  // Override console.log to capture debug info
  React.useEffect(() => {
    const originalLog = console.log
    console.log = (...args) => {
      originalLog(...args)
      if (args[0] && typeof args[0] === 'string' && args[0].includes('🖼️')) {
        addDebugInfo(args.join(' '))
      }
    }
    
    return () => {
      console.log = originalLog
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Background Image Test</h1>
          <p className="text-gray-600 mt-1">
            Test page for debugging background image functionality
          </p>
        </div>
      </div>
      
      <div className="flex">
        {/* Debug Panel */}
        <div className="w-80 bg-white border-r border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Debug Info</h3>
          <div className="bg-gray-100 p-3 rounded text-xs font-mono h-96 overflow-y-auto">
            <pre>{debugInfo || 'No debug info yet...'}</pre>
          </div>
          <button
            onClick={() => setDebugInfo('')}
            className="mt-2 px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
          >
            Clear Debug
          </button>
        </div>
        
        {/* Template Editor */}
        <div className="flex-1">
          <TemplateEditor 
            width={800} 
            height={600}
          />
        </div>
      </div>
    </div>
  )
}
