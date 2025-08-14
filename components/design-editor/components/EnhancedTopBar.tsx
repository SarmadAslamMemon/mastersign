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
  canUndo,
  canRedo,
  currentZoom,
  selectedObjectCount,
  currentTool
}) => {
  const [showBackgroundGallery, setShowBackgroundGallery] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
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
    setShowBackgroundGallery(false)
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
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
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
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Redo className="w-4 h-4" />
            <span className="text-sm font-medium">Redo</span>
          </button>
        </div>

        {/* Center Section - Background Controls */}
        <div className="flex items-center space-x-3">
          {/* Background Image Upload */}
          <div className="relative">
            <button
              onClick={() => setShowImageUpload(!showImageUpload)}
              className="flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
            >
              <Image className="w-4 h-4" />
              <span className="text-sm font-medium">Background</span>
            </button>
            
            {showImageUpload && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-50 min-w-[200px]">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Background Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundImageUpload}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  />
                </div>
              </div>
            )}
          </div>

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

          {/* Random Test Image Button */}
          <button
            onClick={onGenerateRandomTestImage}
            className="flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
            title="Generate a random test image to test background rendering"
          >
            <Image className="w-4 h-4" />
            <span className="text-sm font-medium">Test BG</span>
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
      {(showBackgroundGallery || showImageUpload) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowBackgroundGallery(false)
            setShowImageUpload(false)
          }}
        />
      )}
    </div>
  )
}

export default EnhancedTopBar
