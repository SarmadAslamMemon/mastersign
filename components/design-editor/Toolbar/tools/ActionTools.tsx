import React from 'react'
import { ToolButton } from '../components/ToolButton'
import { ToolSection } from '../components/ToolSection'

interface ActionToolsProps {
  onUndo: () => void
  onRedo: () => void
  onCopy: () => void
  onPaste: () => void
  onDelete: () => void
  canUndo: boolean
  canRedo: boolean
  canCopy: boolean
  canPaste: boolean
  canDelete: boolean
}

export const ActionTools: React.FC<ActionToolsProps> = ({
  onUndo,
  onRedo,
  onCopy,
  onPaste,
  onDelete,
  canUndo,
  canRedo,
  canCopy,
  canPaste,
  canDelete
}) => {
  return (
    <ToolSection>
      <ToolButton
        onClick={onUndo}
        disabled={!canUndo}
        tooltip="Undo"
        shortcut="Ctrl+Z"
        icon="↶"
      />
      <ToolButton
        onClick={onRedo}
        disabled={!canRedo}
        tooltip="Redo"
        shortcut="Ctrl+Y"
        icon="↷"
      />
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <ToolButton
        onClick={onCopy}
        disabled={!canCopy}
        tooltip="Copy"
        shortcut="Ctrl+C"
        icon="📋"
      />
      <ToolButton
        onClick={onPaste}
        disabled={!canPaste}
        tooltip="Paste"
        shortcut="Ctrl+V"
        icon="📄"
      />
      <ToolButton
        onClick={onDelete}
        disabled={!canDelete}
        tooltip="Delete"
        shortcut="Del"
        icon="🗑"
      />
    </ToolSection>
  )
}
