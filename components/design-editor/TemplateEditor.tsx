'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Upload, Type, Square, Circle, ZoomIn, ZoomOut, RotateCcw, Maximize, Download, Palette, FileText, Triangle, Image as ImageIcon } from 'lucide-react'
import { useCanvasEditor } from './hooks/useCanvasEditor'
import { Template } from './data/templates'
import { MOCK_TEMPLATES, getTemplatesByCategory, getTemplateCategories } from './data/templates'

interface TemplateEditorProps {
  width?: number
  height?: number
  className?: string
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({
  width = 800,
  height = 600,
  className = ''
}) => {
  const canvasId = useRef(`template-canvas-${Date.now()}`).current
  const [activeTab, setActiveTab] = useState<'templates' | 'elements'>('templates')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedColorVariation, setSelectedColorVariation] = useState<string>('')
  const [selectedTextVariation, setSelectedTextVariation] = useState<string>('')

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
    applyColorVariation,
    applyTextVariation,
    replaceImage,
    setBackgroundImage,
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

  // Filter templates based on search and category
  const filteredTemplates = React.useMemo(() => {
    let templates = MOCK_TEMPLATES

    if (selectedCategory !== 'all') {
      templates = getTemplatesByCategory(selectedCategory)
    }

    if (searchQuery) {
      templates = templates.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    return templates
  }, [selectedCategory, searchQuery])

  // Handle template selection
  const handleTemplateSelect = useCallback((template: Template) => {
    console.log('🎨 Selected template:', template.name)
    loadTemplate(template, { clearCanvas: true, fitToCanvas: true })
  }, [loadTemplate])

  // Handle color variation change
  const handleColorVariationChange = useCallback((variationId: string) => {
    if (!currentTemplate) return
    
    setSelectedColorVariation(variationId)
    applyColorVariation(currentTemplate, variationId)
  }, [currentTemplate, applyColorVariation])

  // Handle text variation change
  const handleTextVariationChange = useCallback((variationId: string) => {
    if (!currentTemplate) return
    
    setSelectedTextVariation(variationId)
    applyTextVariation(currentTemplate, variationId)
  }, [currentTemplate, applyTextVariation])

  // Add new elements
  const handleAddText = useCallback(() => {
    addText('Click to edit')
  }, [addText])

  const handleAddRectangle = useCallback(() => {
    addRectangle()
  }, [addRectangle])

  const handleAddCircle = useCallback(() => {
    addCircle()
  }, [addCircle])

  const handleAddTriangle = useCallback(() => {
    if (!canvas) return
    
    const triangle = new (window as any).fabric.Triangle({
      left: 400,
      top: 300,
      width: 100,
      height: 100,
      fill: '#FF8C42',
      originX: 'center',
      originY: 'center',
      cornerSize: 12,
      cornerStyle: 'circle',
      borderColor: '#4A90E2',
      cornerColor: '#4A90E2',
      transparentCorners: false,
    })
    
    canvas.add(triangle)
    canvas.setActiveObject(triangle)
    canvas.renderAll()
  }, [canvas])

  const handleAddImage = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        addImage(file)
      }
    }
    input.click()
  }, [addImage])

  const handleSetBackgroundImage = useCallback(() => {
    if (!currentTemplate) {
      alert('Please select a template first')
      return
    }
    
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setBackgroundImage(file)
      }
    }
    input.click()
  }, [setBackgroundImage, currentTemplate])

  const handleRemoveBackgroundImage = useCallback(() => {
    removeBackgroundImage()
  }, [removeBackgroundImage])

  // Export functionality
  const handleExport = useCallback(() => {
    const dataURL = exportToPNG()
    if (dataURL) {
      const link = document.createElement('a')
      link.download = `${currentTemplate?.name || 'design'}.png`
      link.href = dataURL
      link.click()
    }
  }, [exportToPNG, currentTemplate])

  // Delete selected objects
  const handleDeleteSelected = useCallback(() => {
    deleteSelected()
  }, [deleteSelected])

  return (
    <div className={`min-h-screen bg-gray-50 flex ${className}`}>
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'templates' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4 inline-block mr-2" />
            Templates
          </button>
          <button
            onClick={() => setActiveTab('elements')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'elements' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Square className="w-4 h-4 inline-block mr-2" />
            Elements
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'templates' ? (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {getTemplateCategories().map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Templates Grid */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Choose Template</h3>
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="cursor-pointer border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="w-full h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
                      {template.thumbnail ? (
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <div className="text-2xl mb-1">📄</div>
                          <div className="text-xs">No Preview</div>
                        </div>
                      )}
                    </div>
                    <h4 className="font-medium text-sm text-gray-900">{template.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{template.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Color Variations */}
              {currentTemplate && currentTemplate.colorVariations.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    <Palette className="w-4 h-4 inline-block mr-2" />
                    Color Variations
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {currentTemplate.colorVariations.map((variation) => (
                      <button
                        key={variation.id}
                        onClick={() => handleColorVariationChange(variation.id)}
                        className={`p-2 border rounded-lg transition-colors ${
                          selectedColorVariation === variation.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div 
                          className="w-full h-8 rounded mb-1"
                          style={{ backgroundColor: variation.preview }}
                        />
                        <span className="text-xs text-gray-700">{variation.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Text Variations */}
              {currentTemplate && currentTemplate.textVariations && currentTemplate.textVariations.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    <FileText className="w-4 h-4 inline-block mr-2" />
                    Text Variations
                  </h3>
                  <div className="space-y-2">
                    {currentTemplate.textVariations.map((variation) => (
                      <button
                        key={variation.id}
                        onClick={() => handleTextVariationChange(variation.id)}
                        className={`w-full p-2 text-left border rounded-lg transition-colors ${
                          selectedTextVariation === variation.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="font-medium text-sm">{variation.name}</div>
                        <div className="text-xs text-gray-600">
                          {Object.values(variation.texts).join(', ')}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Add Elements</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddText}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <Type className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Text</span>
                </button>

                <button
                  onClick={handleAddRectangle}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <Square className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Rectangle</span>
                </button>

                <button
                  onClick={handleAddCircle}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <Circle className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Circle</span>
                </button>

                <button
                  onClick={handleAddTriangle}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <Triangle className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Triangle</span>
                </button>

                <button
                  onClick={handleAddImage}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <ImageIcon className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Image</span>
                </button>

                <button
                  onClick={handleSetBackgroundImage}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <ImageIcon className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Set Background</span>
                </button>

                <button
                  onClick={handleRemoveBackgroundImage}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all"
                >
                  <ImageIcon className="w-8 h-8 text-red-600 mb-2" />
                  <span className="text-sm font-medium text-red-700">Remove Background</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900">
                {currentTemplate ? currentTemplate.name : 'Template Editor'}
              </h1>
              {currentTemplate && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {currentTemplate.category}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={zoomOut}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              
              <span className="text-sm text-gray-600 px-2">
                {Math.round(zoom * 100)}%
              </span>
              
              <button
                onClick={zoomIn}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              
              <button
                onClick={resetZoom}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              
              <button
                onClick={fitToCanvas}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                title="Fit to Canvas"
              >
                <Maximize className="w-4 h-4" />
              </button>
              
              <div className="w-px h-6 bg-gray-300 mx-2" />
              
              {selectedObjects.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
              
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              
                             {/* Background Image Controls */}
               {currentTemplate && (
                 <>
                   <button
                     onClick={handleSetBackgroundImage}
                     className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 flex items-center"
                     title="Set Background Image"
                   >
                     <ImageIcon className="w-4 h-4 mr-1" />
                     Set Background
                   </button>
                   <button
                     onClick={handleRemoveBackgroundImage}
                     className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 flex items-center"
                     title="Remove Background Image"
                   >
                     <ImageIcon className="w-4 h-4 mr-1" />
                     Remove BG
                   </button>
                 </>
               )}
              
              {/* Debug button - remove in production */}
              <button
                onClick={() => {
                  console.log('🔍 Debug: Current template:', currentTemplate)
                  debugCanvasObjects()
                }}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                title="Debug Canvas Objects"
              >
                Debug
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 flex items-center justify-center p-6 bg-gray-100 relative">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <canvas 
              id={canvasId}
              className="block"
            />
          </div>
          
          {/* Floating Background Button */}
          {currentTemplate && (
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button
                onClick={handleSetBackgroundImage}
                className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
                title="Set Background Image"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleRemoveBackgroundImage}
                className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                title="Remove Background Image"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
