import React, { useState, useCallback } from 'react'
import { useCanvasEditor } from './hooks/useCanvasEditor'
import { EnhancedTopBar } from './components/EnhancedTopBar'
import { EnhancedSidebar } from './components/EnhancedSidebar'
import { Template } from './data/templates'
import { BackgroundPreset } from './services/BackgroundImageService'

interface EnhancedDesignEditorProps {
  canvasId: string
  width?: number
  height?: number
  onSave?: () => void
  onExport?: () => void
  className?: string
}

export const EnhancedDesignEditor: React.FC<EnhancedDesignEditorProps> = ({
  canvasId,
  width = 800,
  height = 600,
  onSave,
  onExport,
  className = ''
}) => {
  const [currentTool, setCurrentToolState] = useState<string>('select')
  const [templates] = useState<Template[]>([
    // Real template with actual content
    {
      id: 'real-estate-sample',
      name: 'Real Estate Sample',
      description: 'Professional real estate sign template',
      category: 'real-estate',
      dimensions: { width: 1200, height: 800 },
      objects: [
        {
          id: 'header-text',
          type: 'text',
                     templateRole: 'text',
          isEditable: true,
          isRequired: true,
          properties: {
            left: 600,
            top: 100,
            width: 1000,
            height: 100,
            fill: '#cc0000',
            stroke: '#000000',
            strokeWidth: 2,
            opacity: 1,
            visible: true
          },
          textProperties: {
            text: 'FOR SALE',
            fontSize: 80,
            fontFamily: 'Arial Black',
            fontWeight: 'bold',
            textAlign: 'center'
          }
        },
        {
          id: 'property-photo',
          type: 'image',
                     templateRole: 'background',
          isEditable: true,
          isRequired: true,
          properties: {
            left: 200,
            top: 250,
            width: 400,
            height: 300,
            fill: '#f0f0f0',
            stroke: '#cccccc',
            strokeWidth: 2,
            opacity: 1,
            visible: true
          },
                                             imageProperties: {
               src: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20240118_151230.jpg',
               filters: []
             }
        },
        {
          id: 'contact-info',
          type: 'text',
                     templateRole: 'text',
          isEditable: true,
          isRequired: true,
          properties: {
            left: 650,
            top: 300,
            width: 500,
            height: 200,
            fill: '#000000',
            stroke: 'transparent',
            strokeWidth: 0,
            opacity: 1,
            visible: true
          },
          textProperties: {
            text: 'John Smith, Realtor\n555-SOLD-NOW\nwww.johnsellshouses.com',
            fontSize: 24,
            fontFamily: 'Arial',
            fontWeight: 'normal',
            textAlign: 'left'
          }
        }
      ],
      thumbnail: undefined
    },
    // Custom Banner Template for testing background rendering
    {
      id: 'custom-banner-template',
      name: 'Custom Banner Template',
      description: 'A custom template with heading, banner area, and note section for testing background rendering',
      category: 'marketing',
      dimensions: { width: 1200, height: 800 },
      objects: [
        {
          id: 'main-banner-area',
          type: 'rectangle',
          templateRole: 'background',
          isEditable: true,
          isRequired: true,
          placeholder: 'Main Banner Area',
          properties: {
            left: 600, top: 400, width: 1000, height: 600, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#f8f9fa', stroke: '#4A90E2', strokeWidth: 3, opacity: 1,
            visible: true, selectable: true, evented: true, zIndex: 1
          }
        },
        {
          id: 'heading-text',
          type: 'text',
          templateRole: 'text',
          isEditable: true,
          isRequired: true,
          placeholder: 'MAIN HEADING',
          properties: {
            left: 600, top: 150, width: 800, height: 80, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#2C3E50', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
          },
          textProperties: {
            fontFamily: 'Arial Black', fontSize: 64, fontWeight: 'bold', textAlign: 'center', text: 'MAIN HEADING'
          }
        },
        {
          id: 'subheading-text',
          type: 'text',
          templateRole: 'text',
          isEditable: true,
          isRequired: false,
          placeholder: 'Subheading text goes here',
          properties: {
            left: 600, top: 250, width: 600, height: 40, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#7F8C8D', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
          },
          textProperties: {
            fontFamily: 'Arial', fontSize: 28, fontWeight: 'normal', textAlign: 'center', text: 'Subheading text goes here'
          }
        },
        {
          id: 'note-section',
          type: 'rectangle',
          templateRole: 'text',
          isEditable: true,
          isRequired: false,
          placeholder: 'Note Section',
          properties: {
            left: 1000, top: 700, width: 300, height: 150, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#E8F5E8', stroke: '#4CAF50', strokeWidth: 2, opacity: 1,
            visible: true, selectable: true, evented: true, zIndex: 2
          }
        },
        {
          id: 'note-text',
          type: 'text',
          templateRole: 'text',
          isEditable: true,
          isRequired: false,
          placeholder: 'Important note text',
          properties: {
            left: 1000, top: 750, width: 250, height: 80, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#2E7D32', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 3
          },
          textProperties: {
            fontFamily: 'Arial', fontSize: 18, fontWeight: 'normal', textAlign: 'left', text: 'Important note text goes here. This section can contain additional information or reminders.'
          }
        }
      ],
      thumbnail: undefined
    }
  ])

  const {
    canvas,
    selectedObjects,
    zoom,
    currentTemplate,
    addText,
    addRectangle,
    addCircle,
    addImage,
    deleteSelected,
    exportToPNG,
    loadTemplate,
    replaceImage,
    setBackgroundImage,
    setBackgroundPreset,
    removeBackgroundImage,
    zoomIn,
    zoomOut,
    resetZoom,
    fitToCanvas,
    debugCanvasObjects,
    addImageInShape,
    setCurrentTool: setCanvasTool
  } = useCanvasEditor({
    canvasId,
    width,
    height,
    onObjectModified: (obj) => {
      console.log('Object modified:', obj)
    }
  })

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave()
    } else {
      console.log('Save functionality not implemented')
    }
  }, [onSave])

  const handleExport = useCallback(() => {
    if (onExport) {
      onExport()
    } else {
      const dataUrl = exportToPNG()
      if (dataUrl) {
        const link = document.createElement('a')
        link.download = 'design-export.png'
        link.href = dataUrl
        link.click()
      }
    }
  }, [onExport, exportToPNG])

  const handleUndo = useCallback(() => {
    // Implement undo functionality
    console.log('Undo not implemented yet')
  }, [])

  const handleRedo = useCallback(() => {
    // Implement redo functionality
    console.log('Redo not implemented yet')
  }, [])

  const handleTemplateSelect = useCallback((template: Template) => {
    loadTemplate(template)
  }, [loadTemplate])

  const handleBackgroundImageUpload = useCallback((file: File) => {
    setBackgroundImage(file, { fitMode: 'cover' })
  }, [setBackgroundImage])

  const handleBackgroundPreset = useCallback((preset: BackgroundPreset) => {
    setBackgroundPreset(preset)
  }, [setBackgroundPreset])

  // Function to generate a random test image for testing background rendering
  const generateRandomTestImage = useCallback(() => {
    // Create a canvas element to generate a random image
    const canvas = document.createElement('canvas')
    canvas.width = 1000  // Match the template banner area width
    canvas.height = 600  // Match the template banner area height
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      // Generate random colors
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
      ]
      
      // Fill background with random color
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
      ctx.fillRect(0, 0, 1000, 600)
      
      // Add some random shapes
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
        const x = Math.random() * 1000
        const y = Math.random() * 600
        const size = 80 + Math.random() * 150
        
        if (Math.random() > 0.5) {
          ctx.beginPath()
          ctx.arc(x, y, size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(x - size / 2, y - size / 2, size, size)
        }
      }
      
      // Add some text
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 72px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('TEST BACKGROUND', 500, 250)
      ctx.font = '36px Arial'
      ctx.fillText('Random Generated Image', 500, 320)
      ctx.font = '24px Arial'
      ctx.fillText('Perfect for testing template backgrounds!', 500, 380)
      
      // Convert to blob and create file
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'test-background.png', { type: 'image/png' })
          console.log('🎨 Generated random test image for background testing (1000x600)')
          handleBackgroundImageUpload(file)
        }
      }, 'image/png')
    }
  }, [handleBackgroundImageUpload])

  const handleZoomIn = useCallback(() => {
    zoomIn()
  }, [zoomIn])

  const handleZoomOut = useCallback(() => {
    zoomOut()
  }, [zoomOut])

  const handleResetZoom = useCallback(() => {
    resetZoom()
  }, [resetZoom])

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Enhanced Top Bar */}
             <EnhancedTopBar
         onSave={handleSave}
         onExport={handleExport}
         onUndo={handleUndo}
         onRedo={handleRedo}
         onZoomIn={handleZoomIn}
         onZoomOut={handleZoomOut}
         onResetZoom={handleResetZoom}
         onSetBackgroundImage={handleBackgroundImageUpload}
         onSetBackgroundPreset={handleBackgroundPreset}
         onGenerateRandomTestImage={generateRandomTestImage}
         onAddImageInShape={addImageInShape}
         canUndo={false} // TODO: Implement undo/redo state
         canRedo={false}
         currentZoom={zoom}
         selectedObjectCount={selectedObjects.length}
         currentTool={currentTool}
       />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Enhanced Sidebar */}
        <EnhancedSidebar
          templates={templates}
          currentTemplate={currentTemplate}
          onTemplateSelect={handleTemplateSelect}
          onSetBackgroundPreset={handleBackgroundPreset}
          onSetBackgroundImage={handleBackgroundImageUpload}
        />

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <canvas
              id={canvasId}
              className="block"
              style={{ width: `${width}px`, height: `${height}px` }}
            />
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties</h3>
          
          {/* Tool Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Tools</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setCurrentToolState('select')
                  setCanvasTool('select')
                }}
                className={`p-2 text-sm rounded-md transition-colors ${
                  currentTool === 'select'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Select
              </button>
              <button
                onClick={() => {
                  setCurrentToolState('text')
                  setCanvasTool('text')
                }}
                className={`p-2 text-sm rounded-md transition-colors ${
                  currentTool === 'text'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Text
              </button>
              <button
                onClick={() => {
                  setCurrentToolState('rectangle')
                  setCanvasTool('rectangle')
                }}
                className={`p-2 text-sm rounded-md transition-colors ${
                  currentTool === 'rectangle'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Rectangle
              </button>
              <button
                onClick={() => {
                  setCurrentToolState('circle')
                  setCanvasTool('circle')
                }}
                className={`p-2 text-sm rounded-md transition-colors ${
                  currentTool === 'circle'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Circle
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h4>
            <div className="space-y-2">
              {/* Add Image in Shape Button - Also available in Properties panel */}
              <button
  onClick={() => addImageInShape()}
  className="w-full p-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
  title="Add an image inside a selected shape (circle or rectangle)"
>
  Add Image in Shape
</button>
              
              <button
                onClick={() => addText()}
                className="w-full p-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Text
              </button>
              <button
                onClick={() => addRectangle()}
                className="w-full p-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Add Rectangle
              </button>
              <button
                onClick={() => addCircle()}
                className="w-full p-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Add Circle
              </button>
              <button
                onClick={() => addImage()}
                className="w-full p-2 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                Add Image
              </button>
            </div>
          </div>

          {/* Canvas Controls */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Canvas</h4>
            <div className="space-y-2">
              <button
                onClick={fitToCanvas}
                className="w-full p-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Fit to Canvas
              </button>
              <button
                onClick={debugCanvasObjects}
                className="w-full p-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Debug Objects
              </button>
            </div>
          </div>

          {/* Selection Info */}
          {selectedObjects.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selection</h4>
              <p className="text-sm text-gray-600">
                {selectedObjects.length} object{selectedObjects.length !== 1 ? 's' : ''} selected
              </p>
              <button
                onClick={deleteSelected}
                className="w-full mt-2 p-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EnhancedDesignEditor
