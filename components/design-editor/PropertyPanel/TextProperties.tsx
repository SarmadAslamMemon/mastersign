import React from 'react'
import { ColorPicker } from './inputs/ColorPicker'
import { NumberSlider } from './inputs/NumberSlider'
import { DropdownSelect, DropdownOption } from './inputs/DropdownSelect'
import { ToggleSwitch } from './inputs/ToggleSwitch'

interface TextPropertiesProps {
  properties: {
    text: string
    fontFamily: string
    fontSize: number
    fontWeight: string
    fontStyle: string
    textAlign: string
    lineHeight: number
    letterSpacing: number
    fill: string
    stroke?: string
    strokeWidth: number
    opacity: number
    underline: boolean
    overline: boolean
    linethrough: boolean
  }
  onChange: (properties: Partial<TextPropertiesProps['properties']>) => void
}

const FONT_FAMILIES: DropdownOption[] = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS' },
  { value: 'Tahoma', label: 'Tahoma' }
]

const FONT_WEIGHTS: DropdownOption[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'bold', label: 'Bold' },
  { value: '100', label: 'Thin (100)' },
  { value: '200', label: 'Extra Light (200)' },
  { value: '300', label: 'Light (300)' },
  { value: '400', label: 'Regular (400)' },
  { value: '500', label: 'Medium (500)' },
  { value: '600', label: 'Semi Bold (600)' },
  { value: '700', label: 'Bold (700)' },
  { value: '800', label: 'Extra Bold (800)' },
  { value: '900', label: 'Black (900)' }
]

const TEXT_ALIGN_OPTIONS: DropdownOption[] = [
  { 
    value: 'left', 
    label: 'Left', 
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
  },
  { 
    value: 'center', 
    label: 'Center', 
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm2 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm-2 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm2 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
  },
  { 
    value: 'right', 
    label: 'Right', 
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm6 4a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zm-6 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm6 4a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
  },
  { 
    value: 'justify', 
    label: 'Justify', 
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
  }
]

export const TextProperties: React.FC<TextPropertiesProps> = ({
  properties,
  onChange
}) => {
  return (
    <div className="text-properties space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
        Text Properties
      </h3>

      {/* Text Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text Content
        </label>
        <textarea
          value={properties.text}
          onChange={(e) => onChange({ text: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          placeholder="Enter text..."
        />
      </div>

      {/* Typography */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">Typography</h4>
        
        <DropdownSelect
          label="Font Family"
          value={properties.fontFamily}
          onChange={(value) => onChange({ fontFamily: value })}
          options={FONT_FAMILIES}
          searchable
        />

        <div className="grid grid-cols-2 gap-3">
          <NumberSlider
            label="Font Size"
            value={properties.fontSize || 16}
            onChange={(value) => onChange({ fontSize: Math.max(6, value) })}
            min={6}
            max={200}
            step={1}
            unit="px"
          />

          <DropdownSelect
            label="Font Weight"
            value={properties.fontWeight || 'normal'}
            onChange={(value) => onChange({ fontWeight: value })}
            options={FONT_WEIGHTS}
          />
        </div>

        <DropdownSelect
          label="Text Align"
          value={properties.textAlign}
          onChange={(value) => onChange({ textAlign: value })}
          options={TEXT_ALIGN_OPTIONS}
        />

        <div className="grid grid-cols-2 gap-3">
          <NumberSlider
            label="Line Height"
            value={properties.lineHeight || 1.2}
            onChange={(value) => onChange({ lineHeight: Math.max(0.5, value) })}
            min={0.5}
            max={5}
            step={0.1}
          />

          <NumberSlider
            label="Letter Spacing"
            value={properties.letterSpacing || 0}
            onChange={(value) => onChange({ letterSpacing: value })}
            min={-20}
            max={50}
            step={0.5}
            unit="px"
          />
        </div>
      </div>

      {/* Text Decoration */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">Text Decoration</h4>
        
        <div className="grid grid-cols-3 gap-3">
          <ToggleSwitch
            label="Underline"
            checked={properties.underline}
            onChange={(value) => onChange({ underline: value })}
            size="sm"
          />
          
          <ToggleSwitch
            label="Overline"
            checked={properties.overline}
            onChange={(value) => onChange({ overline: value })}
            size="sm"
          />
          
          <ToggleSwitch
            label="Strikethrough"
            checked={properties.linethrough}
            onChange={(value) => onChange({ linethrough: value })}
            size="sm"
          />
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">Colors</h4>
        
        <ColorPicker
          label="Text Color"
          value={properties.fill}
          onChange={(value) => onChange({ fill: value })}
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
              value={properties.strokeWidth}
              onChange={(value) => onChange({ strokeWidth: value })}
              min={0}
              max={20}
              unit="px"
            />
          </>
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
