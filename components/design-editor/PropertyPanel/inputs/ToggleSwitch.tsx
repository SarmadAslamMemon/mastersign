import React from 'react'

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: {
      switch: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4'
    },
    md: {
      switch: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5'
    },
    lg: {
      switch: 'w-14 h-8',
      thumb: 'w-7 h-7',
      translate: 'translate-x-6'
    }
  }

  const currentSize = sizeClasses[size]

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleToggle()
    }
  }

  return (
    <div className={`toggle-switch ${className}`}>
      <div className="flex items-start gap-3">
        {/* Toggle Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${currentSize.switch}
            ${checked 
              ? 'bg-blue-600' 
              : 'bg-gray-200'
            }
            ${disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-opacity-75'
            }
          `}
        >
          <span
            className={`
              pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 
              transition duration-200 ease-in-out
              ${currentSize.thumb}
              ${checked ? currentSize.translate : 'translate-x-0'}
            `}
          />
        </button>

        {/* Label and Description */}
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label 
                className={`
                  block text-sm font-medium text-gray-700 cursor-pointer
                  ${disabled ? 'opacity-50' : ''}
                `}
                onClick={handleToggle}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={`
                text-sm text-gray-500 mt-1
                ${disabled ? 'opacity-50' : ''}
              `}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
