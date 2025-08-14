import React, { useState, useRef, useEffect } from 'react'
import { DEFAULT_COLORS } from '../../constants'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
  showPresets?: boolean
  disabled?: boolean
  className?: string
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label,
  showPresets = true,
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [customColor, setCustomColor] = useState(value)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Update custom color when value changes
  useEffect(() => {
    setCustomColor(value)
  }, [value])

  const handlePresetClick = (color: string) => {
    onChange(color)
    setIsOpen(false)
  }

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color)
    onChange(color)
  }

  const displayColor = value || '#000000'

  return (
    <div className={`color-picker relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative" ref={dropdownRef}>
        {/* Color Button */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full h-10 flex items-center justify-between px-3 py-2 
            border border-gray-300 rounded-md shadow-sm bg-white
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400 cursor-pointer'}
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          `}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded border border-gray-300"
              style={{ backgroundColor: displayColor }}
            />
            <span className="text-sm font-mono">{displayColor.toUpperCase()}</span>
          </div>
          <svg 
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            <div className="p-3">
              {/* Custom Color Input */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Custom Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => handleCustomColorChange(e.target.value)}
                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => handleCustomColorChange(e.target.value)}
                    placeholder="#000000"
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Preset Colors */}
              {showPresets && (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Presets
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {DEFAULT_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => handlePresetClick(color)}
                        className={`
                          w-8 h-8 rounded border-2 transition-all hover:scale-110
                          ${value === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}
                        `}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
