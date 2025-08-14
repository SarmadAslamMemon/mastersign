import React, { useMemo } from 'react'
import { fabric } from 'fabric'
import { TextProperties } from './TextProperties'
import { ShapeProperties } from './ShapeProperties'

interface PropertyPanelProps {
  selectedObjects: fabric.Object[]
  canvas: fabric.Canvas | null
  onUpdateObject: (objectId: string, properties: any) => void
  className?: string
}

interface ObjectProperties {
  id: string
  type: string
  [key: string]: any
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedObjects,
  canvas,
  onUpdateObject,
  className = ''
}) => {
  // Extract properties from selected objects
  const selectedObjectsData = useMemo(() => {
    return selectedObjects.map(obj => ({
      id: (obj as any).id || 'unknown',
      type: obj.type || 'unknown',
      ...obj.toObject()
    }))
  }, [selectedObjects])

  // Determine what type of properties to show
  const propertyType = useMemo(() => {
    if (selectedObjectsData.length === 0) return 'none'
    if (selectedObjectsData.length === 1) {
      const obj = selectedObjectsData[0]
      if (obj.type === 'i-text' || obj.type === 'text') return 'text'
      if (['rect', 'circle', 'triangle', 'line', 'polygon'].includes(obj.type)) return 'shape'
      if (obj.type === 'image') return 'image'
      return 'object'
    }
    return 'multi'
  }, [selectedObjectsData])

  // Get common properties for multi-selection
  const commonProperties = useMemo(() => {
    if (selectedObjectsData.length <= 1) return null

    const firstObj = selectedObjectsData[0]
    const common: any = {}

    // Check which properties are common across all selected objects
    Object.keys(firstObj).forEach(key => {
      const allHaveSameValue = selectedObjectsData.every(obj => obj[key] === firstObj[key])
      if (allHaveSameValue) {
        common[key] = firstObj[key]
      }
    })

    return common
  }, [selectedObjectsData])

  // Handle property changes with debouncing
  const handlePropertyChange = useMemo(() => {
    let timeoutId: NodeJS.Timeout

    return (properties: any) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        selectedObjectsData.forEach(obj => {
          onUpdateObject(obj.id, properties)
        })
      }, 300) // 300ms debounce
    }
  }, [selectedObjectsData, onUpdateObject])

  // Render appropriate property component based on selection
  const renderPropertyComponent = () => {
    switch (propertyType) {
      case 'none':
        return (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <p className="text-sm">Select an object to edit its properties</p>
            </div>
          </div>
        )

      case 'text':
        const textObj = selectedObjectsData[0]
        // Get the actual fabric object for real-time properties
        const fabricTextObj = selectedObjects[0] as fabric.IText
        return (
          <TextProperties
            properties={{
              text: fabricTextObj?.text || textObj.text || '',
              fontFamily: fabricTextObj?.fontFamily || textObj.fontFamily || 'Arial',
              fontSize: fabricTextObj?.fontSize || textObj.fontSize || 16,
              fontWeight: fabricTextObj?.fontWeight || textObj.fontWeight || 'normal',
              fontStyle: fabricTextObj?.fontStyle || textObj.fontStyle || 'normal',
              textAlign: fabricTextObj?.textAlign || textObj.textAlign || 'left',
              lineHeight: fabricTextObj?.lineHeight || textObj.lineHeight || 1.2,
              letterSpacing: fabricTextObj?.charSpacing || textObj.charSpacing || 0,
              fill: fabricTextObj?.fill?.toString() || textObj.fill || '#000000',
              stroke: fabricTextObj?.stroke?.toString() || textObj.stroke,
              strokeWidth: fabricTextObj?.strokeWidth || textObj.strokeWidth || 0,
              opacity: fabricTextObj?.opacity || textObj.opacity || 1,
              underline: fabricTextObj?.underline || textObj.underline || false,
              overline: fabricTextObj?.overline || textObj.overline || false,
              linethrough: fabricTextObj?.linethrough || textObj.linethrough || false
            }}
            onChange={handlePropertyChange}
          />
        )

      case 'shape':
        const shapeObj = selectedObjectsData[0]
        const fabricShapeObj = selectedObjects[0] as fabric.Object
        return (
          <ShapeProperties
            properties={{
              fill: fabricShapeObj?.fill?.toString() || shapeObj.fill || '#000000',
              stroke: fabricShapeObj?.stroke?.toString() || shapeObj.stroke,
              strokeWidth: fabricShapeObj?.strokeWidth || shapeObj.strokeWidth || 0,
              strokeDashArray: fabricShapeObj?.strokeDashArray || shapeObj.strokeDashArray,
              opacity: fabricShapeObj?.opacity || shapeObj.opacity || 1,
              shadow: fabricShapeObj?.shadow || shapeObj.shadow,
              rx: (fabricShapeObj as any)?.rx || shapeObj.rx,
              ry: (fabricShapeObj as any)?.ry || shapeObj.ry,
              radius: (fabricShapeObj as any)?.radius || shapeObj.radius,
              angle: fabricShapeObj?.angle || shapeObj.angle || 0,
              flipX: fabricShapeObj?.flipX || shapeObj.flipX || false,
              flipY: fabricShapeObj?.flipY || shapeObj.flipY || false
            }}
            onChange={handlePropertyChange}
            shapeType={shapeObj.type as any}
          />
        )

      case 'multi':
        return (
          <div className="multi-select-properties space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Multiple Objects ({selectedObjectsData.length})
            </h3>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Editing common properties for {selectedObjectsData.length} selected objects
              </p>

              {/* Common properties that can be edited */}
              {commonProperties && (
                <div className="space-y-3">
                  {typeof commonProperties.opacity === 'number' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Opacity
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={commonProperties.opacity}
                        onChange={(e) => handlePropertyChange({ opacity: parseFloat(e.target.value) })}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">
                        {Math.round(commonProperties.opacity * 100)}%
                      </span>
                    </div>
                  )}

                  {commonProperties.fill && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fill Color
                      </label>
                      <input
                        type="color"
                        value={commonProperties.fill}
                        onChange={(e) => handlePropertyChange({ fill: e.target.value })}
                        className="w-full h-10 rounded border border-gray-300"
                      />
                    </div>
                  )}

                  {typeof commonProperties.angle === 'number' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rotation
                      </label>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={commonProperties.angle}
                        onChange={(e) => handlePropertyChange({ angle: parseInt(e.target.value) })}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">
                        {commonProperties.angle}°
                      </span>
                    </div>
                  )}
                </div>
              )}

              {(!commonProperties || Object.keys(commonProperties).length === 0) && (
                <p className="text-sm text-gray-500 italic">
                  Selected objects have different properties. Select objects of the same type for more editing options.
                </p>
              )}
            </div>
          </div>
        )

      case 'image':
        return (
          <div className="image-properties space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Image Properties
            </h3>
            <p className="text-sm text-gray-600">
              Image properties will be implemented in the next phase
            </p>
          </div>
        )

      default:
        return (
          <div className="object-properties space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Object Properties
            </h3>
            <p className="text-sm text-gray-600">
              Generic object properties will be implemented in the next phase
            </p>
          </div>
        )
    }
  }

  if (!canvas) {
    return (
      <div className={`property-panel bg-white border-l border-gray-300 ${className}`}>
        <div className="p-4">
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p className="text-sm">Canvas not initialized</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`property-panel ${className}`}>
      <div className="p-4 h-full overflow-y-auto">
        {renderPropertyComponent()}
      </div>
    </div>
  )
}
