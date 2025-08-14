import React, { useState, useEffect, useCallback } from 'react'

interface NumberSliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  unit?: string
  disabled?: boolean
  className?: string
  showInput?: boolean
  debounceMs?: number
}

export const NumberSlider: React.FC<NumberSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  unit = '',
  disabled = false,
  className = '',
  showInput = true,
  debounceMs = 300
}) => {
  const [localValue, setLocalValue] = useState(value.toString())
  const [isDragging, setIsDragging] = useState(false)

  // Debounced onChange
  const debouncedOnChange = useCallback(
    debounce((newValue: number) => {
      if (newValue >= min && newValue <= max) {
        onChange(newValue)
      }
    }, debounceMs),
    [onChange, min, max, debounceMs]
  )

  // Update local value when prop changes
  useEffect(() => {
    if (!isDragging) {
      setLocalValue(value.toString())
    }
  }, [value, isDragging])

  // Sync local value with actual value when not dragging
  useEffect(() => {
    if (!isDragging && Math.abs(parseFloat(localValue) - value) > 0.01) {
      setLocalValue(value.toString())
    }
  }, [value, localValue, isDragging])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    const clampedValue = Math.max(min, Math.min(max, newValue))
    setLocalValue(clampedValue.toString())
    setIsDragging(true)
    onChange(clampedValue) // Immediate update for slider
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setLocalValue(inputValue)
    
    const numValue = parseFloat(inputValue)
    if (!isNaN(numValue)) {
      debouncedOnChange(Math.max(min, Math.min(max, numValue)))
    }
  }

  const handleInputBlur = () => {
    const numValue = parseFloat(localValue)
    if (isNaN(numValue)) {
      setLocalValue(value.toString())
    } else {
      const clampedValue = Math.max(min, Math.min(max, numValue))
      setLocalValue(clampedValue.toString())
      onChange(clampedValue)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur()
    }
  }

  const handleSliderMouseUp = () => {
    setIsDragging(false)
  }

  const currentValue = Math.max(min, Math.min(max, value))
  const percentage = ((currentValue - min) / (max - min)) * 100

  return (
    <div className={`number-slider ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="flex items-center gap-3">
        {/* Slider */}
        <div className="flex-1 relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleSliderChange}
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
            disabled={disabled}
            className={`
              w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              slider
            `}
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
            }}
          />
        </div>

        {/* Input Field */}
        {showInput && (
          <div className="flex items-center">
            <input
              type="number"
              min={min}
              max={max}
              step={step}
              value={localValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              disabled={disabled}
              className={`
                w-16 px-2 py-1 text-sm border border-gray-300 rounded
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
                ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
              `}
            />
            {unit && (
              <span className="ml-1 text-sm text-gray-500">{unit}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
}
