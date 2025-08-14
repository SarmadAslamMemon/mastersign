import React from 'react'
import { ToolButton } from '../components/ToolButton'
import { ToolSection } from '../components/ToolSection'
import { EditorTool } from '../../types'

interface ShapeToolsProps {
  activeTool: EditorTool
  onToolChange: (tool: EditorTool) => void
}

export const ShapeTools: React.FC<ShapeToolsProps> = ({
  activeTool,
  onToolChange
}) => {
  return (
    <ToolSection>
      <ToolButton
        isActive={activeTool === 'rectangle'}
        onClick={() => onToolChange('rectangle')}
        tooltip="Rectangle"
        shortcut="R"
        icon="▢"
      />
      <ToolButton
        isActive={activeTool === 'circle'}
        onClick={() => onToolChange('circle')}
        tooltip="Circle"
        shortcut="C"
        icon="○"
      />
      <ToolButton
        isActive={activeTool === 'triangle'}
        onClick={() => onToolChange('triangle')}
        tooltip="Triangle"
        shortcut="T"
        icon="△"
      />
      <ToolButton
        isActive={activeTool === 'line'}
        onClick={() => onToolChange('line')}
        tooltip="Line"
        shortcut="L"
        icon="―"
      />
    </ToolSection>
  )
}
