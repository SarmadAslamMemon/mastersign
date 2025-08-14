import React from 'react'
import { ToolButton } from '../components/ToolButton'
import { ToolSection } from '../components/ToolSection'

interface ViewToolsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomFit: () => void
  onGridToggle: () => void
  zoom: number
  showGrid: boolean
}

export const ViewTools: React.FC<ViewToolsProps> = ({
  onZoomIn,
  onZoomOut,
  onZoomFit,
  onGridToggle,
  zoom,
  showGrid
}) => {
  return (
    <ToolSection>
      <ToolButton
        onClick={onZoomOut}
        tooltip="Zoom Out"
        shortcut="Ctrl+-"
        icon="🔍−"
      />
      <span className="px-2 py-1 text-xs bg-gray-100 rounded min-w-[50px] text-center">
        {Math.round(zoom * 100)}%
      </span>
      <ToolButton
        onClick={onZoomIn}
        tooltip="Zoom In"
        shortcut="Ctrl++"
        icon="🔍+"
      />
      <ToolButton
        onClick={onZoomFit}
        tooltip="Fit to Screen"
        shortcut="Ctrl+0"
        icon="⛶"
      />
      <ToolButton
        isActive={showGrid}
        onClick={onGridToggle}
        tooltip="Toggle Grid"
        shortcut="Ctrl+G"
        icon="⚏"
      />
    </ToolSection>
  )
}
