import React from 'react'
import { ToolButton } from '../components/ToolButton'
import { ToolSection } from '../components/ToolSection'
import { EditorTool } from '../../types'

interface TextToolsProps {
  activeTool: EditorTool
  onToolChange: (tool: EditorTool) => void
  onAddText: () => void
}

export const TextTools: React.FC<TextToolsProps> = ({
  activeTool,
  onToolChange,
  onAddText
}) => {
  const handleTextTool = () => {
    onToolChange('text')
    onAddText()
  }

  return (
    <ToolSection>
      <ToolButton
        isActive={activeTool === 'text'}
        onClick={handleTextTool}
        tooltip="Add Text"
        shortcut="T"
        icon="T"
      />
      <ToolButton
        onClick={() => {/* TODO: Implement bold */}}
        tooltip="Bold"
        shortcut="Ctrl+B"
        icon="B"
        className="font-bold"
      />
      <ToolButton
        onClick={() => {/* TODO: Implement italic */}}
        tooltip="Italic"
        shortcut="Ctrl+I"
        icon="I"
        className="italic"
      />
      <ToolButton
        onClick={() => {/* TODO: Implement underline */}}
        tooltip="Underline"
        shortcut="Ctrl+U"
        icon="U"
        className="underline"
      />
    </ToolSection>
  )
}
