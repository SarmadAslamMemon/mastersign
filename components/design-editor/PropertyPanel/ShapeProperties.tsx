import React from 'react'
import { ColorPicker } from './inputs/ColorPicker'
import { NumberSlider } from './inputs/NumberSlider'
import { ToggleSwitch } from './inputs/ToggleSwitch'

interface ShapePropertiesProps {
  properties: {
    fill: string
    stroke?: string
    strokeWidth: number
    strokeDashArray?: number[]
    opacity: number
    shadow?: {
      color: string
      blur: number
      offsetX: number
      offsetY: number
    }
    // Shape-specific properties
    rx?: number // Border radius for rectangles
    ry?: number
    radius?: number // For circles
    angle: number
    flipX: boolean
    flipY: boolean
  }
  onChange: (properties: Partial<ShapePropertiesProps['properties']>) => void
  shapeType: 'rectangle' | 'circle' | 'triangle' | 'line' | 'polygon'
}

export const ShapeProperties: React.FC<ShapePropertiesProps> = ({
  properties,
  onChange,
  shapeType
}) => {
  const handleShadowChange = (shadowProps: Partial<NonNullable<typeof properties.shadow>>) => {
    onChange({
      shadow: {
        ...properties.shadow,
        color: '#000000',
        blur: 10,
        offsetX: 5,
        offsetY: 5,
        ...shadowProps
      }
    })
  }

  const toggleShadow = (enabled: boolean) => {
    if (enabled) {
      onChange({
        shadow: {
          color: '#000000',
          blur: 10,
          offsetX: 5,
          offsetY: 5
        }
      })
    } else {
      onChange({ shadow: undefined })
    }
  }

  const handleStrokeDashToggle = (enabled: boolean) => {
    if (enabled) {
      onChange({ strokeDashArray: [5, 5] })
    } else {
      onChange({ strokeDashArray: undefined })
    }
  }

  return (
    <div className="shape-properties space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
        {shapeType.charAt(0).toUpperCase() + shapeType.slice(1)} Properties
      </h3>

      {/* Fill */}
      <ColorPicker
        label="Fill Color"
        value={properties.fill}
        onChange={(value) => onChange({ fill: value })}
      />

      {/* Stroke */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">Stroke</h4>
        
        <ToggleSwitch
          label="Enable Stroke"
          checked={!!properties.stroke}
          onChange={(enabled) => onChange({ stroke: enabled ? '#000000' : undefined })}
        />

        {properties.stroke && (
          <>
            <ColorPicker
              label="Stroke Color"
              value={properties.stroke}
              onChange={(value) => onChange({ stroke: value })}
            />
            
            <NumberSlider
              label="Stroke Width"
              value={properties.strokeWidth || 0}
              onChange={(value) => onChange({ strokeWidth: Math.max(0, value) })}
              min={0}
              max={50}
              step={0.5}
              unit="px"
            />

            <ToggleSwitch
              label="Dashed Stroke"
              checked={!!properties.strokeDashArray}
              onChange={handleStrokeDashToggle}
            />
          </>
        )}
      </div>

      {/* Shape-specific properties */}
      {shapeType === 'rectangle' && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Corner Radius</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <NumberSlider
              label="Horizontal"
              value={properties.rx || 0}
              onChange={(value) => onChange({ rx: value })}
              min={0}
              max={100}
              unit="px"
            />
            
            <NumberSlider
              label="Vertical"
              value={properties.ry || 0}
              onChange={(value) => onChange({ ry: value })}
              min={0}
              max={100}
              unit="px"
            />
          </div>
        </div>
      )}

      {shapeType === 'circle' && properties.radius !== undefined && (
        <NumberSlider
          label="Radius"
          value={properties.radius}
          onChange={(value) => onChange({ radius: value })}
          min={1}
          max={500}
          unit="px"
        />
      )}

      {/* Transform */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">Transform</h4>
        
        <NumberSlider
          label="Rotation"
          value={properties.angle}
          onChange={(value) => onChange({ angle: value })}
          min={-180}
          max={180}
          unit="°"
        />

        <div className="grid grid-cols-2 gap-3">
          <ToggleSwitch
            label="Flip Horizontal"
            checked={properties.flipX}
            onChange={(value) => onChange({ flipX: value })}
            size="sm"
          />
          
          <ToggleSwitch
            label="Flip Vertical"
            checked={properties.flipY}
            onChange={(value) => onChange({ flipY: value })}
            size="sm"
          />
        </div>
      </div>

      {/* Shadow */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">Shadow</h4>
        
        <ToggleSwitch
          label="Enable Shadow"
          checked={!!properties.shadow}
          onChange={toggleShadow}
        />

        {properties.shadow && (
          <div className="space-y-3 pl-4 border-l-2 border-gray-200">
            <ColorPicker
              label="Shadow Color"
              value={properties.shadow.color}
              onChange={(value) => handleShadowChange({ color: value })}
            />
            
            <NumberSlider
              label="Blur"
              value={properties.shadow.blur}
              onChange={(value) => handleShadowChange({ blur: value })}
              min={0}
              max={50}
              unit="px"
            />
            
            <div className="grid grid-cols-2 gap-3">
              <NumberSlider
                label="Offset X"
                value={properties.shadow.offsetX}
                onChange={(value) => handleShadowChange({ offsetX: value })}
                min={-50}
                max={50}
                unit="px"
              />
              
              <NumberSlider
                label="Offset Y"
                value={properties.shadow.offsetY}
                onChange={(value) => handleShadowChange({ offsetY: value })}
                min={-50}
                max={50}
                unit="px"
              />
            </div>
          </div>
        )}
      </div>

      {/* Opacity */}
      <NumberSlider
        label="Opacity"
        value={properties.opacity || 1}
        onChange={(value) => onChange({ opacity: Math.max(0, Math.min(1, value)) })}
        min={0}
        max={1}
        step={0.01}
      />
    </div>
  )
}
