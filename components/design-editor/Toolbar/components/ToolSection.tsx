import React from 'react'
import { ToolSectionProps } from '../types'

export const ToolSection: React.FC<ToolSectionProps> = ({
  children,
  title,
  className = ''
}) => {
  return (
    <div className={`tool-section flex items-center gap-1 ${className}`}>
      {title && (
        <span className="text-xs text-gray-500 mr-2 font-medium">{title}</span>
      )}
      <div className="flex gap-1">
        {children}
      </div>
    </div>
  )
}
