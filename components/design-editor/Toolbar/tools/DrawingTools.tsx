import React from 'react'
import { ToolButton } from '../components/ToolButton'
import { ToolSection } from '../components/ToolSection'
import { EditorTool } from '../../types'

interface DrawingToolsProps {
  activeTool: EditorTool
  onToolChange: (tool: EditorTool) => void
}

export const DrawingTools: React.FC<DrawingToolsProps> = ({
  activeTool,
  onToolChange
}) => {
  return (
    <ToolSection>
      <ToolButton
        isActive={activeTool === 'draw'}
        onClick={() => onToolChange('draw')}
        tooltip="Pen Tool"
        shortcut="P"
        icon="✏"
      />
      <ToolButton
        onClick={() => {/* TODO: Implement brush */}}
        tooltip="Brush Tool"
        shortcut="B"
        icon="🖌"
      />
      <ToolButton
        onClick={() => {/* TODO: Implement eraser */}}
        tooltip="Eraser Tool"
        shortcut="E"
        icon="🧹"
      />
    </ToolSection>
  )
}
