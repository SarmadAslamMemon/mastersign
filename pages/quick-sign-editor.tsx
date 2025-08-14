import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { SignTemplateSelector } from '../components/design-editor/sign-templates'
import { SignExport } from '../components/design-editor/sign-export'
import { SignTools } from '../components/design-editor/sign-tools'
import { useState, useEffect } from 'react'

export default function QuickSignEditor() {
  const [editor, setEditor] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-800 mb-4">TLDraw Loading Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full flex bg-white">
      {/* Template Sidebar */}
      <div className="w-80 bg-gray-50 border-r overflow-y-auto space-y-4 flex-shrink-0">
        <SignTemplateSelector editor={editor} />
        <SignTools editor={editor} />
        <SignExport editor={editor} />
      </div>
      
      {/* TLDraw Editor - Ensure it takes full height and width */}
      <div className="flex-1 h-full min-w-0 relative">
        {isMounted && (
          <Tldraw 
            autoFocus
            showMenu={true}
            showPages={false}
            showStyles={true}
            showUI={true}
            showToolbar={true}
            showZoom={true}
            showGrid={true}
            onMount={(editor) => {
              console.log('TLDraw mounted successfully:', editor)
              console.log('Editor type:', typeof editor)
              console.log('Editor constructor:', editor.constructor.name)
              console.log('Available methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(editor)))
              console.log('Direct properties:', Object.keys(editor))
              setEditor(editor)
            }}
            onError={(error) => {
              console.error('TLDraw error:', error)
              setError(`TLDraw failed to load: ${error.message}`)
            }}
            // Force canvas to be visible and sized
            style={{ 
              width: '100%', 
              height: '100%',
              border: '2px solid #e5e7eb',
              backgroundColor: '#f9fafb'
            }}
          />
        )}
        
        {/* Loading indicator */}
        {!editor && isMounted && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading TLDraw Editor...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
