import React, { useState } from 'react'
import { 
  Save, 
  Download, 
  Undo, 
  Redo, 
  Image, 
  ZoomIn,
  ZoomOut,
  Maximize,
  Eye,
  EyeOff,
  PanelLeft,
  PanelRight
} from 'lucide-react'
import { BackgroundImageService, BackgroundPreset } from '../services/BackgroundImageService'

interface EnhancedTopBarProps {
  onSave: () => void
  onExport: () => void
  onUndo: () => void
  onRedo: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  onSetBackgroundPreset: (preset: BackgroundPreset) => void
  onGenerateRandomTestImage: () => void
  onAddImageInShape: () => void
  onToggleLeftSidebar?: () => void
  onToggleRightPanel?: () => void
  showLeftSidebar?: boolean
  showRightPanel?: boolean
  canUndo: boolean
  canRedo: boolean
  currentZoom: number
  selectedObjectCount: number
  currentTool: string
  isSaving?: boolean
}

export const EnhancedTopBar: React.FC<EnhancedTopBarProps> = ({
  onSave,
  onExport,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onSetBackgroundPreset,
  onGenerateRandomTestImage,
  onAddImageInShape,
  onToggleLeftSidebar,
  onToggleRightPanel,
  showLeftSidebar = true,
  showRightPanel = true,
  canUndo,
  canRedo,
  currentZoom,
  selectedObjectCount,
  currentTool,
  isSaving
}) => {
  const [lastAppliedBackground, setLastAppliedBackground] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const backgroundService = BackgroundImageService.getInstance()

  // Create a default background preset for the Background button
  const handleBackgroundButtonClick = async () => {
    try {
      setIsLoading(true)
      const defaultBackground: BackgroundPreset = {
        id: 'default-background',
        name: 'Default Background',
        type: 'solid',
        value: '#f8f9fa'
      }
      await onSetBackgroundPreset(defaultBackground)
      setLastAppliedBackground('Default Background')
      
      // Clear the indicator after 2 seconds
      setTimeout(() => setLastAppliedBackground(null), 2000)
    } catch (error) {
      console.error('Error applying default background:', error)
      alert('Failed to apply default background. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 relative">
      {/* Global Loading Indicator */}
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
      )}
      
      {/* Main Toolbar */}
      <div className="flex items-center justify-between">
        {/* Left Section - Main Controls */}
        <div className="flex items-center space-x-3">
          {/* Sidebar Toggle Buttons - Mobile Only */}
          {onToggleLeftSidebar && (
            <button
              onClick={onToggleLeftSidebar}
              className="md:hidden flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              title="Toggle left sidebar"
            >
              <PanelLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Templates</span>
            </button>
          )}
          
          {onToggleRightPanel && (
            <button
              onClick={onToggleRightPanel}
              className="lg:hidden flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              title="Toggle properties panel"
            >
              <PanelRight className="w-4 h-4" />
              <span className="text-sm font-medium">Properties</span>
            </button>
          )}

          {/* Save & Export */}
          <button
            onClick={onSave}
            disabled={isSaving}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
              isSaving 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            title={isSaving ? 'Saving...' : 'Save design as PNG'}
          >
            <Save className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isSaving ? 'Saving...' : 'Save'}
            </span>
          </button>
          
          <button
            onClick={onExport}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300" />

          {/* Undo/Redo */}
                    <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
              canUndo
                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Undo className="w-4 h-4" />
            <span className="text-sm font-medium">Undo</span>
          </button>
          
                    <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
              canRedo
                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Redo className="w-4 h-4" />
            <span className="text-sm font-medium">Redo</span>
          </button>
        </div>

        {/* Center Section - Background Controls */}
        <div className="flex items-center space-x-3">

          {/* Background Button - Now works like a preset */}
          <button
            onClick={handleBackgroundButtonClick}
            disabled={isLoading}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
              lastAppliedBackground === 'Default Background'
                ? 'bg-green-100 text-green-700 border-2 border-green-300'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Apply a light gray background to the selected template"
          >
            <Image className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isLoading ? 'Applying...' : 'Background'}
            </span>
            {lastAppliedBackground === 'Default Background' && (
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">✓</span>
            )}
          </button>
        </div>

        {/* Right Section - Zoom & Status */}
        <div className="flex items-center space-x-3">
          {/* Status Info */}
          <div className="text-sm text-gray-600">
            <span className="font-medium">{selectedObjectCount}</span> selected | 
            Tool: <span className="font-medium">{currentTool}</span>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300" />

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onZoomOut}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
              {Math.round(currentZoom * 100)}%
            </span>
            
            <button
              onClick={onZoomIn}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            
            <button
              onClick={onResetZoom}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedTopBar
