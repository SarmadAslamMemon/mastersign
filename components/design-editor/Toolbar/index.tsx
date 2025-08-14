'use client'

import React from 'react'
import { ToolbarProps } from './types'
import { SelectionTools } from './tools/SelectionTools'
import { ShapeTools } from './tools/ShapeTools'
import { TextTools } from './tools/TextTools'
import { ImageTools } from './tools/ImageTools'
import { DrawingTools } from './tools/DrawingTools'
import { ViewTools } from './tools/ViewTools'
import { ActionTools } from './tools/ActionTools'
import { ExportTools } from './tools/ExportTools'

export const ToolbarContainer: React.FC<ToolbarProps> = ({
  activeTool,
  onToolChange,
  onUndo,
  onRedo,
  onCopy,
  onPaste,
  onDelete,
  onZoomIn,
  onZoomOut,
  onZoomFit,
  onGridToggle,
  onSave,
  onExport,
  onShare,
  canUndo,
  canRedo,
  canCopy,
  canPaste,
  canDelete,
  zoom,
  showGrid,
  className = ''
}) => {
  const handleAddText = () => {
    // This will be handled by the parent component
    console.log('Add text triggered from toolbar')
  }

  const handleImageUpload = () => {
    // This will be handled by the parent component
    console.log('Image upload triggered from toolbar')
  }

  const handleStockImages = () => {
    // This will be handled by the parent component
    console.log('Stock images triggered from toolbar')
  }

  return (
    <div className={`toolbar-container flex items-center gap-4 p-4 bg-gray-100 border-b overflow-x-auto ${className}`}>
      {/* Selection Tools */}
      <SelectionTools
        activeTool={activeTool}
        onToolChange={onToolChange}
      />

      <div className="w-px h-8 bg-gray-300" />

      {/* Shape Tools */}
      <ShapeTools
        activeTool={activeTool}
        onToolChange={onToolChange}
      />

      <div className="w-px h-8 bg-gray-300" />

      {/* Text Tools */}
      <TextTools
        activeTool={activeTool}
        onToolChange={onToolChange}
        onAddText={handleAddText}
      />

      <div className="w-px h-8 bg-gray-300" />

      {/* Image Tools */}
      <ImageTools
        activeTool={activeTool}
        onToolChange={onToolChange}
        onImageUpload={handleImageUpload}
        onStockImages={handleStockImages}
      />

      <div className="w-px h-8 bg-gray-300" />

      {/* Drawing Tools */}
      <DrawingTools
        activeTool={activeTool}
        onToolChange={onToolChange}
      />

      <div className="w-px h-8 bg-gray-300" />

      {/* View Tools */}
      <ViewTools
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onZoomFit={onZoomFit}
        onGridToggle={onGridToggle}
        zoom={zoom}
        showGrid={showGrid}
      />

      <div className="w-px h-8 bg-gray-300" />

      {/* Action Tools */}
      <ActionTools
        onUndo={onUndo}
        onRedo={onRedo}
        onCopy={onCopy}
        onPaste={onPaste}
        onDelete={onDelete}
        canUndo={canUndo}
        canRedo={canRedo}
        canCopy={canCopy}
        canPaste={canPaste}
        canDelete={canDelete}
      />

      <div className="flex-1" />

      {/* Export Tools */}
      <ExportTools
        onSave={onSave}
        onExport={onExport}
        onShare={onShare}
      />
    </div>
  )
}

// Export all components for external use
export * from './types'
export * from './components/ToolButton'
export * from './components/ToolSection'
export * from './tools/SelectionTools'
export * from './tools/ShapeTools'
export * from './tools/TextTools'
export * from './tools/ImageTools'
export * from './tools/DrawingTools'
export * from './tools/ViewTools'
export * from './tools/ActionTools'
export * from './tools/ExportTools'
