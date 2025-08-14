import React from 'react'
import { ToolButton } from '../components/ToolButton'
import { ToolSection } from '../components/ToolSection'

interface ExportToolsProps {
  onSave: () => void
  onExport: () => void
  onShare: () => void
}

export const ExportTools: React.FC<ExportToolsProps> = ({
  onSave,
  onExport,
  onShare
}) => {
  return (
    <ToolSection>
      <ToolButton
        onClick={onSave}
        tooltip="Save Project"
        shortcut="Ctrl+S"
        icon="💾"
        className="bg-blue-500 text-white hover:bg-blue-600"
      />
      <ToolButton
        onClick={onExport}
        tooltip="Export Image"
        shortcut="Ctrl+E"
        icon="⬇"
        className="bg-green-500 text-white hover:bg-green-600"
      />
      <ToolButton
        onClick={onShare}
        tooltip="Share"
        icon="🔗"
        className="bg-purple-500 text-white hover:bg-purple-600"
      />
    </ToolSection>
  )
}
