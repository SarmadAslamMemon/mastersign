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
  const [currentTool, setCurrentTool] = useState<string>('select')
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
          templateRole: 'header',
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
          templateRole: 'main-image',
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
            src: '/placeholders/house-placeholder.jpg',
            placeholder: 'Property Photo'
          }
        },
        {
          id: 'contact-info',
          type: 'text',
          templateRole: 'contact',
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
    debugCanvasObjects
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
                onClick={() => setCurrentTool('select')}
                className={`p-2 text-sm rounded-md transition-colors ${
                  currentTool === 'select'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Select
              </button>
              <button
                onClick={() => setCurrentTool('text')}
                className={`p-2 text-sm rounded-md transition-colors ${
                  currentTool === 'text'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Text
              </button>
              <button
                onClick={() => setCurrentTool('rectangle')}
                className={`p-2 text-sm rounded-md transition-colors ${
                  currentTool === 'rectangle'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Rectangle
              </button>
              <button
                onClick={() => setCurrentTool('circle')}
                className={`p-2 text-sm rounded-md transition-colors ${
                  currentTool === 'circle'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
