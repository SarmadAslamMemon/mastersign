import React from 'react'
import { ToolProps } from '../types'

interface ToolButtonProps extends ToolProps {
  children: React.ReactNode
  icon?: string
}

export const ToolButton: React.FC<ToolButtonProps> = ({
  children,
  icon,
  isActive = false,
  disabled = false,
  onClick,
  tooltip,
  shortcut,
  className = ''
}) => {
  const baseClasses = 'p-2 rounded transition-colors duration-200 flex items-center justify-center min-w-[36px] min-h-[36px]'
  const activeClasses = isActive ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  
  const tooltipText = tooltip && shortcut ? `${tooltip} (${shortcut})` : tooltip

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${activeClasses} ${disabledClasses} ${className}`}
      title={tooltipText}
      aria-label={tooltipText}
    >
      {icon ? (
        <span className="text-lg">{icon}</span>
      ) : (
        children
      )}
    </button>
  )
}
