'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { fabric } from 'fabric'
import { Template } from '../data/templates'
import { Type, Palette, Move, RotateCw, Eye, EyeOff, Lock, Unlock, Trash2, Copy, ChevronDown, ChevronRight } from 'lucide-react'

interface TemplatePropertyPanelProps {
  canvas: fabric.Canvas | null
  selectedObjects: fabric.Object[]
  currentTemplate: Template | null
  onColorVariationChange: (variationId: string) => void
  onTextVariationChange: (variationId: string) => void
  className?: string
}

interface TemplateObjectInfo {
  id: string
  name: string
  type: string
  templateRole: string
  isEditable: boolean
  isRequired: boolean
  placeholder?: string
}

export const TemplatePropertyPanel: React.FC<TemplatePropertyPanelProps> = ({
  canvas,
  selectedObjects,
  currentTemplate,
  onColorVariationChange,
  onTextVariationChange,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'template' | 'object' | 'canvas'>('template')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['template-info', 'variations', 'properties']))

  // Get template object information
  const templateObjects = useMemo(() => {
    if (!canvas) return []
    
    return canvas.getObjects().map(obj => {
      const templateId = (obj as any).templateId
      const templateRole = (obj as any).templateRole || 'unknown'
      const isEditable = (obj as any).isEditable !== false
      const isRequired = (obj as any).isRequired || false
      const placeholder = (obj as any).placeholder
      
      return {
        id: templateId || obj.type || 'unknown',
        name: templateId || `${obj.type} ${canvas.getObjects().indexOf(obj) + 1}`,
        type: obj.type || 'unknown',
        templateRole,
        isEditable,
        isRequired,
        placeholder,
        fabricObject: obj
      }
    })
  }, [canvas, canvas?.getObjects()])

  const selectedObject = selectedObjects.length === 1 ? selectedObjects[0] : null
  const selectedTemplateInfo = selectedObject ? templateObjects.find(info => info.fabricObject === selectedObject) : null

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const updateObjectProperty = (property: string, value: any) => {
    if (!selectedObject || !canvas) return

    selectedObject.set(property, value)
    canvas.renderAll()
  }

  const updateTextProperty = (property: string, value: any) => {
    if (!selectedObject || selectedObject.type !== 'i-text' || !canvas) return

    const textObj = selectedObject as fabric.IText
    textObj.set(property, value)
    canvas.renderAll()
  }

  const deleteObject = (obj: fabric.Object) => {
    if (!canvas) return
    canvas.remove(obj)
    canvas.renderAll()
  }

  const duplicateObject = (obj: fabric.Object) => {
    if (!canvas) return
    
    obj.clone((cloned: fabric.Object) => {
      cloned.set({
        left: (cloned.left || 0) + 20,
        top: (cloned.top || 0) + 20,
      })
      canvas.add(cloned)
      canvas.setActiveObject(cloned)
      canvas.renderAll()
    })
  }

  const SectionHeader = ({ id, title, icon: Icon, children }: { 
    id: string
    title: string
    icon: React.ComponentType<any>
    children: React.ReactNode 
  }) => (
    <div className="border-b border-gray-200">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gray-600" />
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        {expandedSections.has(id) ? (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {expandedSections.has(id) && (
        <div className="p-3 bg-gray-50 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  )

  const PropertyInput = ({ 
    label, 
    value, 
    onChange, 
    type = 'text',
    min,
    max,
    step = 1,
    options 
  }: {
    label: string
    value: any
    onChange: (value: any) => void
    type?: 'text' | 'number' | 'color' | 'select' | 'range'
    min?: number
    max?: number
    step?: number
    options?: { value: any; label: string }[]
  }) => (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      {type === 'select' && options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'range' ? (
        <div className="space-y-1">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{min}</span>
            <span className="font-medium">{value}</span>
            <span>{max}</span>
          </div>
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          min={min}
          max={max}
          step={step}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      )}
    </div>
  )

  return (
    <div className={`bg-white border-l border-gray-300 flex flex-col ${className}`}>
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('template')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'template'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          Template
        </button>
        <button
          onClick={() => setActiveTab('object')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'object'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          Object ({selectedObjects.length})
        </button>
        <button
          onClick={() => setActiveTab('canvas')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'canvas'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          Canvas
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'template' && (
          <div>
            {currentTemplate ? (
              <>
                {/* Template Information */}
                <SectionHeader id="template-info" title="Template Info" icon={Type}>
                  <div className="space-y-2">
                    <div>
                      <div className="font-medium text-sm">{currentTemplate.name}</div>
                      <div className="text-xs text-gray-600">{currentTemplate.description}</div>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span>Category: <strong>{currentTemplate.category}</strong></span>
                      <span>Objects: <strong>{currentTemplate.objects.length}</strong></span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {currentTemplate.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SectionHeader>

                {/* Color Variations */}
                {currentTemplate.colorVariations.length > 0 && (
                  <SectionHeader id="color-variations" title="Color Variations" icon={Palette}>
                    <div className="grid grid-cols-2 gap-2">
                      {currentTemplate.colorVariations.map(variation => (
                        <button
                          key={variation.id}
                          onClick={() => onColorVariationChange(variation.id)}
                          className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:border-gray-300 transition-colors"
                        >
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: variation.preview }}
                          />
                          <span className="text-xs">{variation.name}</span>
                        </button>
                      ))}
                    </div>
                  </SectionHeader>
                )}

                {/* Text Variations */}
                {currentTemplate.textVariations && currentTemplate.textVariations.length > 0 && (
                  <SectionHeader id="text-variations" title="Text Variations" icon={Type}>
                    <div className="space-y-2">
                      {currentTemplate.textVariations.map(variation => (
                        <button
                          key={variation.id}
                          onClick={() => onTextVariationChange(variation.id)}
                          className="w-full text-left p-2 border border-gray-200 rounded hover:border-gray-300 transition-colors"
                        >
                          <div className="font-medium text-sm">{variation.name}</div>
                          <div className="text-xs text-gray-600">
                            {Object.keys(variation.texts).length} text changes
                          </div>
                        </button>
                      ))}
                    </div>
                  </SectionHeader>
                )}

                {/* Template Objects List */}
                <SectionHeader id="template-objects" title="Template Objects" icon={Move}>
                  <div className="space-y-2">
                    {templateObjects.map((objInfo, index) => (
                      <div
                        key={index}
                        className={`p-2 border rounded transition-colors ${
                          selectedObject === objInfo.fabricObject
                            ? 'border-blue-300 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{objInfo.name}</div>
                            <div className="text-xs text-gray-600">
                              {objInfo.templateRole} • {objInfo.type}
                              {objInfo.isRequired && <span className="text-red-600"> • Required</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => objInfo.fabricObject.set('visible', !objInfo.fabricObject.visible)}
                              className="p-1 hover:bg-gray-200 rounded"
                              title="Toggle visibility"
                            >
                              {objInfo.fabricObject.visible ? (
                                <Eye className="h-3 w-3" />
                              ) : (
                                <EyeOff className="h-3 w-3" />
                              )}
                            </button>
                            <button
                              onClick={() => duplicateObject(objInfo.fabricObject)}
                              className="p-1 hover:bg-gray-200 rounded"
                              title="Duplicate"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                            {!objInfo.isRequired && (
                              <button
                                onClick={() => deleteObject(objInfo.fabricObject)}
                                className="p-1 hover:bg-red-100 text-red-600 rounded"
                                title="Delete"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionHeader>
              </>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <Type className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <h3 className="font-medium mb-1">No Template Loaded</h3>
                <p className="text-sm">Click "Templates" to browse and load a template</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'object' && (
          <div>
            {selectedObject && selectedTemplateInfo ? (
              <>
                {/* Object Info */}
                <SectionHeader id="object-info" title="Object Info" icon={Move}>
                  <div className="space-y-2">
                    <div>
                      <div className="font-medium text-sm">{selectedTemplateInfo.name}</div>
                      <div className="text-xs text-gray-600">
                        {selectedTemplateInfo.templateRole} • {selectedTemplateInfo.type}
                      </div>
                    </div>
                    {selectedTemplateInfo.placeholder && (
                      <div className="text-xs text-gray-500">
                        Placeholder: {selectedTemplateInfo.placeholder}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs">
                      {selectedTemplateInfo.isEditable ? (
                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded">Editable</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">Locked</span>
                      )}
                      {selectedTemplateInfo.isRequired && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 rounded">Required</span>
                      )}
                    </div>
                  </div>
                </SectionHeader>

                {/* Position & Size */}
                <SectionHeader id="position-size" title="Position & Size" icon={Move}>
                  <div className="grid grid-cols-2 gap-3">
                    <PropertyInput
                      label="X Position"
                      type="number"
                      value={Math.round(selectedObject.left || 0)}
                      onChange={(value) => updateObjectProperty('left', value)}
                    />
                    <PropertyInput
                      label="Y Position"
                      type="number"
                      value={Math.round(selectedObject.top || 0)}
                      onChange={(value) => updateObjectProperty('top', value)}
                    />
                    <PropertyInput
                      label="Width"
                      type="number"
                      value={Math.round((selectedObject.width || 0) * (selectedObject.scaleX || 1))}
                      onChange={(value) => {
                        const newScaleX = value / (selectedObject.width || 1)
                        updateObjectProperty('scaleX', newScaleX)
                      }}
                      min={1}
                    />
                    <PropertyInput
                      label="Height"
                      type="number"
                      value={Math.round((selectedObject.height || 0) * (selectedObject.scaleY || 1))}
                      onChange={(value) => {
                        const newScaleY = value / (selectedObject.height || 1)
                        updateObjectProperty('scaleY', newScaleY)
                      }}
                      min={1}
                    />
                  </div>
                  
                  <PropertyInput
                    label="Rotation"
                    type="range"
                    value={selectedObject.angle || 0}
                    onChange={(value) => updateObjectProperty('angle', value)}
                    min={-180}
                    max={180}
                  />
                </SectionHeader>

                {/* Appearance */}
                <SectionHeader id="appearance" title="Appearance" icon={Palette}>
                  <PropertyInput
                    label="Fill Color"
                    type="color"
                    value={selectedObject.fill || '#000000'}
                    onChange={(value) => updateObjectProperty('fill', value)}
                  />
                  
                  <PropertyInput
                    label="Opacity"
                    type="range"
                    value={Math.round((selectedObject.opacity || 1) * 100)}
                    onChange={(value) => updateObjectProperty('opacity', value / 100)}
                    min={0}
                    max={100}
                  />

                  {selectedObject.stroke !== undefined && (
                    <>
                      <PropertyInput
                        label="Stroke Color"
                        type="color"
                        value={selectedObject.stroke || '#000000'}
                        onChange={(value) => updateObjectProperty('stroke', value)}
                      />
                      <PropertyInput
                        label="Stroke Width"
                        type="number"
                        value={selectedObject.strokeWidth || 0}
                        onChange={(value) => updateObjectProperty('strokeWidth', value)}
                        min={0}
                        max={20}
                      />
                    </>
                  )}
                </SectionHeader>

                {/* Text Properties */}
                {selectedObject.type === 'i-text' && (
                  <SectionHeader id="text-properties" title="Text Properties" icon={Type}>
                    <PropertyInput
                      label="Text Content"
                      type="text"
                      value={(selectedObject as fabric.IText).text || ''}
                      onChange={(value) => updateTextProperty('text', value)}
                    />
                    
                    <PropertyInput
                      label="Font Size"
                      type="number"
                      value={(selectedObject as fabric.IText).fontSize || 20}
                      onChange={(value) => updateTextProperty('fontSize', value)}
                      min={8}
                      max={200}
                    />

                    <PropertyInput
                      label="Font Family"
                      type="select"
                      value={(selectedObject as fabric.IText).fontFamily || 'Arial'}
                      onChange={(value) => updateTextProperty('fontFamily', value)}
                      options={[
                        { value: 'Arial', label: 'Arial' },
                        { value: 'Helvetica', label: 'Helvetica' },
                        { value: 'Times New Roman', label: 'Times New Roman' },
                        { value: 'Georgia', label: 'Georgia' },
                        { value: 'Verdana', label: 'Verdana' },
                        { value: 'Courier New', label: 'Courier New' }
                      ]}
                    />

                    <PropertyInput
                      label="Font Weight"
                      type="select"
                      value={(selectedObject as fabric.IText).fontWeight || 'normal'}
                      onChange={(value) => updateTextProperty('fontWeight', value)}
                      options={[
                        { value: 'normal', label: 'Normal' },
                        { value: 'bold', label: 'Bold' },
                        { value: '100', label: 'Thin' },
                        { value: '300', label: 'Light' },
                        { value: '500', label: 'Medium' },
                        { value: '700', label: 'Bold' },
                        { value: '900', label: 'Black' }
                      ]}
                    />

                    <PropertyInput
                      label="Text Align"
                      type="select"
                      value={(selectedObject as fabric.IText).textAlign || 'left'}
                      onChange={(value) => updateTextProperty('textAlign', value)}
                      options={[
                        { value: 'left', label: 'Left' },
                        { value: 'center', label: 'Center' },
                        { value: 'right', label: 'Right' },
                        { value: 'justify', label: 'Justify' }
                      ]}
                    />
                  </SectionHeader>
                )}
              </>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <Move className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <h3 className="font-medium mb-1">No Object Selected</h3>
                <p className="text-sm">Click on an object to edit its properties</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'canvas' && (
          <div>
            <SectionHeader id="canvas-properties" title="Canvas Properties" icon={Move}>
              <PropertyInput
                label="Background Color"
                type="color"
                value={canvas?.backgroundColor || '#ffffff'}
                onChange={(value) => {
                  if (canvas) {
                    canvas.backgroundColor = value
                    canvas.renderAll()
                  }
                }}
              />
              
              <div className="grid grid-cols-2 gap-3">
                <PropertyInput
                  label="Canvas Width"
                  type="number"
                  value={canvas?.width || 800}
                  onChange={(value) => {
                    if (canvas) {
                      canvas.setDimensions({ width: value })
                    }
                  }}
                  min={100}
                  max={2000}
                />
                <PropertyInput
                  label="Canvas Height"
                  type="number"
                  value={canvas?.height || 600}
                  onChange={(value) => {
                    if (canvas) {
                      canvas.setDimensions({ height: value })
                    }
                  }}
                  min={100}
                  max={2000}
                />
              </div>
            </SectionHeader>

            <SectionHeader id="canvas-stats" title="Canvas Statistics" icon={Type}>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Objects:</span>
                  <strong>{canvas?.getObjects().length || 0}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Selected Objects:</span>
                  <strong>{selectedObjects.length}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Template Objects:</span>
                  <strong>{templateObjects.length}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Editable Objects:</span>
                  <strong>{templateObjects.filter(obj => obj.isEditable).length}</strong>
                </div>
              </div>
            </SectionHeader>
          </div>
        )}
      </div>
    </div>
  )
}
