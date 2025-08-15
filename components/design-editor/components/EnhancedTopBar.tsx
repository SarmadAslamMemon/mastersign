import React, { useState } from 'react'
import { 
  Save, 
  Download, 
  Undo, 
  Redo, 
  Image, 
  Palette, 
  Settings,
  ZoomIn,
  ZoomOut,
  Maximize,
  Eye,
  EyeOff
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
  onSetBackgroundImage: (file: File) => void
  onSetBackgroundPreset: (preset: BackgroundPreset) => void
  onGenerateRandomTestImage: () => void
  onAddImageInShape: () => void
  canUndo: boolean
  canRedo: boolean
  currentZoom: number
  selectedObjectCount: number
  currentTool: string
}

export const EnhancedTopBar: React.FC<EnhancedTopBarProps> = ({
  onSave,
  onExport,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onSetBackgroundImage,
  onSetBackgroundPreset,
  onGenerateRandomTestImage,
  onAddImageInShape,
  canUndo,
  canRedo,
  currentZoom,
  selectedObjectCount,
  currentTool
}) => {
  const [showBackgroundGallery, setShowBackgroundGallery] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [lastAppliedBackground, setLastAppliedBackground] = useState<string | null>(null)
  const backgroundService = BackgroundImageService.getInstance()
  const backgroundPresets = backgroundService.getBackgroundPresets()

  const handleBackgroundImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onSetBackgroundImage(file)
      setShowImageUpload(false)
    }
  }

  const handlePresetSelect = (preset: BackgroundPreset) => {
    onSetBackgroundPreset(preset)
    setLastAppliedBackground(preset.name)
    setShowBackgroundGallery(false)
    
    // Clear the indicator after 2 seconds
    setTimeout(() => setLastAppliedBackground(null), 2000)
  }

  // Create a default background preset for the Background button
  const handleBackgroundButtonClick = () => {
    const defaultBackground: BackgroundPreset = {
      id: 'default-background',
      name: 'Default Background',
      type: 'solid',
      value: '#f8f9fa'
    }
    onSetBackgroundPreset(defaultBackground)
    setLastAppliedBackground('Default Background')
    
    // Clear the indicator after 2 seconds
    setTimeout(() => setLastAppliedBackground(null), 2000)
  }

  // Create a test background preset for the Test BG button
  const handleTestBGButtonClick = () => {
    const testBackground: BackgroundPreset = {
      id: 'test-background',
      name: 'Test Background',
      type: 'gradient',
      value: 'test-gradient'
    }
    onSetBackgroundPreset(testBackground)
    setLastAppliedBackground('Test Background')
    
    // Clear the indicator after 2 seconds
    setTimeout(() => setLastAppliedBackground(null), 2000)
  }

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section - Main Controls */}
        <div className="flex items-center space-x-3">
          {/* Save & Export */}
          <button
            onClick={onSave}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span className="text-sm font-medium">Save</span>
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
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
              lastAppliedBackground === 'Default Background'
                ? 'bg-green-100 text-green-700 border-2 border-green-300'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
            title="Apply a light gray background to the selected template"
          >
            <Image className="w-4 h-4" />
            <span className="text-sm font-medium">Background</span>
            {lastAppliedBackground === 'Default Background' && (
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">✓</span>
            )}
          </button>

          {/* Background Presets */}
          <div className="relative">
            <button
              onClick={() => setShowBackgroundGallery(!showBackgroundGallery)}
              className="flex items-center space-x-2 px-3 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
            >
              <Palette className="w-4 h-4" />
              <span className="text-sm font-medium">Presets</span>
            </button>
            
            {showBackgroundGallery && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-4 z-50 min-w-[300px]">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Background Presets</h3>
                <div className="grid grid-cols-2 gap-2">
                  {backgroundPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetSelect(preset)}
                      className="p-2 text-left border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-full h-16 rounded mb-2" style={{
                        background: preset.type === 'gradient' ? preset.value as string : preset.value as string
                      }} />
                      <div className="text-xs font-medium text-gray-900">{preset.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{preset.type}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Test BG Button - Now works like a preset */}
          <button
            onClick={handleTestBGButtonClick}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
              lastAppliedBackground === 'Test Background'
                ? 'bg-green-100 text-green-700 border-2 border-green-300'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
            title="Apply a test gradient background to the selected template"
          >
            <Image className="w-4 h-4" />
            <span className="text-sm font-medium">Test BG</span>
            {lastAppliedBackground === 'Test Background' && (
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

      {/* Background Click Handler */}
      {showBackgroundGallery && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowBackgroundGallery(false)
          }}
        />
      )}
    </div>
  )
}

export default EnhancedTopBar
