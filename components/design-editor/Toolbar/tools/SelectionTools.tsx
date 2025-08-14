import React from 'react'
import { ToolButton } from '../components/ToolButton'
import { ToolSection } from '../components/ToolSection'
import { EditorTool } from '../../types'

interface SelectionToolsProps {
  activeTool: EditorTool
  onToolChange: (tool: EditorTool) => void
}

export const SelectionTools: React.FC<SelectionToolsProps> = ({
  activeTool,
  onToolChange
}) => {
  return (
    <ToolSection>
      <ToolButton
        isActive={activeTool === 'select'}
        onClick={() => onToolChange('select')}
        tooltip="Selection Tool"
        shortcut="V"
        icon="↖"
      />
    </ToolSection>
  )
}
