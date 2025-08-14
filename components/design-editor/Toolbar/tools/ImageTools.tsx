import React from 'react'
import { ToolButton } from '../components/ToolButton'
import { ToolSection } from '../components/ToolSection'
import { EditorTool } from '../../types'

interface ImageToolsProps {
  activeTool: EditorTool
  onToolChange: (tool: EditorTool) => void
  onImageUpload: () => void
  onStockImages: () => void
}

export const ImageTools: React.FC<ImageToolsProps> = ({
  activeTool,
  onToolChange,
  onImageUpload,
  onStockImages
}) => {
  const handleImageTool = () => {
    onToolChange('image')
    onImageUpload()
  }

  return (
    <ToolSection>
      <ToolButton
        isActive={activeTool === 'image'}
        onClick={handleImageTool}
        tooltip="Upload Image"
        shortcut="I"
        icon="🖼"
      />
      <ToolButton
        onClick={onStockImages}
        tooltip="Stock Images"
        icon="📷"
      />
    </ToolSection>
  )
}
