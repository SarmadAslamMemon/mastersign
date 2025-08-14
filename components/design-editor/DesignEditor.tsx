'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useCanvasEditor } from './hooks/useCanvasEditor'
import { EditorProject, EditorTool } from './types'
import { DEFAULT_CANVAS } from './constants'
import { TemplateSidebar } from './TemplateSidebar'
import { Template } from './data/templates'
import { TemplatePropertyPanel } from './PropertyPanel/TemplatePropertyPanel'

interface DesignEditorProps {
  initialProject?: EditorProject
  onSave?: (project: EditorProject) => void
  onExport?: (blob: Blob, format: string) => void
  onTemplateLoad?: (template: Template) => void
  mode?: 'single' | 'collaborative'
  width?: number
  height?: number
  className?: string
  tools?: EditorTool[]
  showPropertyPanel?: boolean
  showTemplateSidebar?: boolean
}

export const DesignEditor: React.FC<DesignEditorProps> = ({
  initialProject,
  onSave,
  onExport,
  onTemplateLoad,
  mode = 'single',
  width = DEFAULT_CANVAS.WIDTH,
  height = DEFAULT_CANVAS.HEIGHT,
  className = '',
  tools = ['select', 'text', 'rectangle', 'circle', 'image'],
  showPropertyPanel = true,
  showTemplateSidebar = true
}) => {
  const canvasId = useRef(`canvas-${Date.now()}`).current
  const [activeTool, setActiveTool] = React.useState<EditorTool>('select')
  // Remove the old template browser state since we're using a sidebar now
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null)
  
  const {
    canvas,
    selectedObjects,
    zoom,
    addText,
    addRectangle,
    addCircle,
    addImage,
    deleteSelected,
    exportToPNG,
    loadTemplate,
    applyColorVariation,
    applyTextVariation,
    replaceImage,
    zoomIn,
    zoomOut,
    resetZoom,
    fitToCanvas
  } = useCanvasEditor({
    canvasId,
    width,
    height,
    onObjectModified: (obj) => {
      console.log('Object modified:', obj)
      // Auto-save logic can be added here
    }
  })

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        deleteSelected()
      }
      
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault()
            if (e.shiftKey) {
              redo()
            } else {
              undo()
            }
            break
          case 'y':
            e.preventDefault()
            redo()
            break
          case 's':
            e.preventDefault()
            handleSave()
            break
          case 'e':
            e.preventDefault()
            handleExport()
            break
        }
      }

      // Tool shortcuts
      switch (e.key) {
        case 'v':
          setActiveTool('select')
          break
        case 't':
          setActiveTool('text')
          break
        case 'r':
          setActiveTool('rectangle')
          break
        case 'c':
          setActiveTool('circle')
          break
        case 'i':
          setActiveTool('image')
          break
      }

      // Zoom shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '=':
          case '+':
            e.preventDefault()
            zoomIn()
            break
          case '-':
            e.preventDefault()
            zoomOut()
            break
          case '0':
            e.preventDefault()
            resetZoom()
            break
          case '1':
            e.preventDefault()
            fitToCanvas()
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [deleteSelected, zoomIn, zoomOut, resetZoom, fitToCanvas])

  const handleToolClick = (tool: EditorTool) => {
    setActiveTool(tool)
    
    // Execute tool action
    switch (tool) {
      case 'text':
        addText()
        break
      case 'rectangle':
        addRectangle()
        break
      case 'circle':
        addCircle()
        break
      case 'image':
        addImage()
        break
      case 'select':
        // Already handled by state change
        break
    }
  }

  const handleSave = () => {
    if (onSave && canvas) {
      const project: EditorProject = {
        id: initialProject?.id || `project-${Date.now()}`,
        name: initialProject?.name || 'Untitled Project',
        width,
        height,
        backgroundColor: canvas.backgroundColor as string || '#ffffff',
        objects: [], // TODO: Convert canvas objects to CanvasObject[]
        version: 1,
        createdAt: initialProject?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      onSave(project)
    }
  }

  const handleExport = () => {
    if (onExport) {
      const dataURL = exportToPNG()
      if (dataURL) {
        // Convert data URL to blob
        fetch(dataURL)
          .then(res => res.blob())
          .then(blob => onExport(blob, 'png'))
      }
    }
  }

  const handleTemplateSelect = (template: Template) => {
    console.log('🎭 Template Selected:', template.name)
    console.log('📦 Expected Objects:', template.objects.length)
    console.log('🏷️ Template Data:', template)
    
    loadTemplate(template, { clearCanvas: true, fitToCanvas: true })
    setCurrentTemplate(template)
    
    if (onTemplateLoad) {
      onTemplateLoad(template)
    }
  }

  const handleColorVariationChange = (variationId: string) => {
    if (currentTemplate) {
      applyColorVariation(currentTemplate, variationId)
    }
  }

  const handleTextVariationChange = (variationId: string) => {
    if (currentTemplate) {
      applyTextVariation(currentTemplate, variationId)
    }
  }

  return (
    <div className={`design-editor h-full flex ${className}`}>
      {/* Left Template Sidebar */}
      {showTemplateSidebar && (
        <div className="w-80 flex-shrink-0">
          <TemplateSidebar
            onTemplateSelect={handleTemplateSelect}
            currentTemplate={currentTemplate}
            onColorVariationChange={handleColorVariationChange}
            onTextVariationChange={handleTextVariationChange}
            className="h-full"
          />
        </div>
      )}

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="toolbar flex items-center gap-2 p-3 bg-white border-b border-gray-200 shadow-sm">
          {/* Tool buttons */}
          <div className="flex gap-1">
            {tools.includes('select') && (
              <button
                onClick={() => handleToolClick('select')}
                className={`p-2 rounded-lg transition-colors ${
                  activeTool === 'select' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                title="Select (V)"
              >
                ↖
              </button>
            )}
            
            {tools.includes('text') && (
              <button
                onClick={() => handleToolClick('text')}
                className={`p-2 rounded-lg transition-colors ${
                  activeTool === 'text' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                title="Text (T)"
              >
                T
              </button>
            )}
            
            {tools.includes('rectangle') && (
              <button
                onClick={() => handleToolClick('rectangle')}
                className={`p-2 rounded-lg transition-colors ${
                  activeTool === 'rectangle' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                title="Rectangle (R)"
              >
                ▢
              </button>
            )}
            
            {tools.includes('circle') && (
              <button
                onClick={() => handleToolClick('circle')}
                className={`p-2 rounded-lg transition-colors ${
                  activeTool === 'circle' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                title="Circle (C)"
              >
                ○
              </button>
            )}
            
            {tools.includes('image') && (
              <button
                onClick={() => handleToolClick('image')}
                className={`p-2 rounded-lg transition-colors ${
                  activeTool === 'image' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                title="Image (I)"
              >
                🖼️
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          {/* Action buttons */}
          <div className="flex gap-1">
            <button
              onClick={deleteSelected}
              disabled={selectedObjects.length === 0}
              className="p-2 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 disabled:hover:bg-gray-100 disabled:hover:text-gray-400 transition-colors"
              title="Delete (Del)"
            >
              🗑
            </button>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          {/* Zoom controls */}
          <div className="flex gap-1 items-center">
            <button
              onClick={zoomOut}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Zoom Out (-)"
            >
              🔍−
            </button>
            
            <button
              onClick={resetZoom}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors min-w-[60px]"
              title="Reset Zoom (100%)"
            >
              {Math.round(zoom * 100)}%
            </button>
            
            <button
              onClick={zoomIn}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Zoom In (+)"
            >
              🔍+
            </button>
            
            <button
              onClick={fitToCanvas}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Fit to Canvas"
            >
              ⛶
            </button>
          </div>

          {/* Status Info */}
          <div className="flex-1 text-center">
            <div className="text-sm text-gray-600">
              {selectedObjects.length} selected | Tool: <span className="font-medium">{activeTool}</span>
              {currentTemplate && (
                <span> | <span className="text-blue-600 font-medium">{currentTemplate.name}</span></span>
              )}
              {selectedObjects.length === 1 && selectedObjects[0].type === 'image' && (selectedObjects[0] as any).isEditable && (
                <span className="ml-4 text-green-600">
                  💡 Click image to upload new one
                </span>
              )}
            </div>
          </div>

          {/* Save/Export buttons */}
          <div className="flex gap-2">
            {onSave && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                title="Save (Ctrl+S)"
              >
                Save
              </button>
            )}
            
            {onExport && (
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                title="Export (Ctrl+E)"
              >
                Export
              </button>
            )}
          </div>
        </div>

        {/* Canvas and Property Panel Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Static Canvas Container */}
          <div className="flex-1 flex items-center justify-center bg-gray-50 p-4 min-w-0">
            <div className="canvas-wrapper border border-gray-300 shadow-lg bg-white rounded-lg overflow-hidden">
              <canvas
                id={canvasId}
                width={width}
                height={height}
                className="block"
              />
            </div>
          </div>

          {/* Right Property Panel */}
          {showPropertyPanel && (
            <div className="w-80 flex-shrink-0">
              <TemplatePropertyPanel
                canvas={canvas}
                selectedObjects={selectedObjects}
                currentTemplate={currentTemplate}
                onColorVariationChange={handleColorVariationChange}
                onTextVariationChange={handleTextVariationChange}
                className="h-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
