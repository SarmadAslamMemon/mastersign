import React, { useState } from 'react'
import { 
  Search, 
  Grid, 
  List, 
  Star, 
  Clock, 
  Folder,
  Image as ImageIcon,
  Palette,
  Settings
} from 'lucide-react'
import { Template } from '../data/templates'
import { BackgroundImageService, BackgroundPreset } from '../services/BackgroundImageService'

interface EnhancedSidebarProps {
  templates: Template[]
  currentTemplate: Template | null
  onTemplateSelect: (template: Template) => void
  onSetBackgroundPreset: (preset: BackgroundPreset) => void
  onSetBackgroundImage: (file: File) => void
}

export const EnhancedSidebar: React.FC<EnhancedSidebarProps> = ({
  templates,
  currentTemplate,
  onTemplateSelect,
  onSetBackgroundPreset,
  onSetBackgroundImage
}) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'backgrounds' | 'recent'>('templates')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const backgroundService = BackgroundImageService.getInstance()
  const backgroundPresets = backgroundService.getBackgroundPresets()

  // Filter templates based on search
  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Get recent templates (last 5 used)
  const recentTemplates = templates.slice(0, 5)

  const toggleFavorite = (templateId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(templateId)) {
      newFavorites.delete(templateId)
    } else {
      newFavorites.add(templateId)
    }
    setFavorites(newFavorites)
  }

  const handleBackgroundImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      // Compress image before uploading
      compressAndUploadImage(file)
    }
  }

  // Compress image for better performance
  const compressAndUploadImage = (file: File) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions (max 800x600 for preview)
      const maxWidth = 800
      const maxHeight = 600
      let { width, height } = img
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, { type: 'image/jpeg' })
          onSetBackgroundImage(compressedFile)
        } else {
          onSetBackgroundImage(file)
        }
      }, 'image/jpeg', 0.7) // 70% quality for good compression
    }
    
    img.src = URL.createObjectURL(file)
  }

  const handleTabChange = (tab: 'templates' | 'backgrounds' | 'recent') => {
    setActiveTab(tab)
    
    // Fix canvas positioning issue by ensuring proper layout
    setTimeout(() => {
      const canvas = document.querySelector('canvas')
      if (canvas) {
        // Get the canvas container
        const canvasContainer = canvas.closest('.flex-1')
        if (canvasContainer) {
          // Ensure proper positioning
          canvasContainer.style.position = 'relative'
          canvasContainer.style.overflow = 'visible'
          canvasContainer.style.minHeight = '100%'
        }
        
        // Reset canvas positioning
        canvas.style.position = 'relative'
        canvas.style.top = '0'
        canvas.style.left = '0'
        canvas.style.transform = 'none'
        canvas.style.display = 'block'
        
        // Force a reflow
        canvas.offsetHeight
        
        // Trigger window resize to force layout recalculation
        window.dispatchEvent(new Event('resize'))
      }
    }, 150)
  }

  const renderTemplateCard = (template: Template) => (
    <div
      key={template.id}
      className={`relative cursor-pointer rounded-lg border-2 transition-all hover:shadow-md ${
        currentTemplate?.id === template.id
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onTemplateSelect(template)}
    >
      {/* Template Thumbnail */}
      <div className="relative">
        <div className="aspect-[3/4] bg-gray-100 rounded-t-lg flex items-center justify-center">
          {template.thumbnail ? (
            <img
              src={template.thumbnail}
              alt={template.name}
              className="w-full h-full object-contain rounded-t-lg"
            />
          ) : (
            <div className="text-gray-400 text-center p-4">
              <div className="text-2xl mb-2">📋</div>
              <div className="text-xs">Template</div>
            </div>
          )}
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(template.id)
          }}
          className={`absolute top-2 left-2 p-1 rounded-full transition-colors ${
            favorites.has(template.id)
              ? 'bg-yellow-400 text-yellow-800'
              : 'bg-white bg-opacity-80 text-gray-400 hover:text-yellow-500'
          }`}
        >
          <Star className="w-3 h-3" fill={favorites.has(template.id) ? 'currentColor' : 'none'} />
        </button>
        
        {/* Dimensions Badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {template.dimensions.width / 100}" × {template.dimensions.height / 100}"
        </div>
      </div>

      {/* Template Info */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">
          {template.name}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          {template.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 capitalize">{template.category}</span>
          <span className="text-xs text-gray-400">{template.objects?.length || 0} objects</span>
        </div>
      </div>
    </div>
  )

  const renderBackgroundPreset = (preset: BackgroundPreset) => (
    <div
      key={preset.id}
      className="cursor-pointer border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
      onClick={() => onSetBackgroundPreset(preset)}
    >
      <div className="w-full h-20 rounded-t-md overflow-hidden">
        {preset.thumbnail ? (
          <img
            src={preset.thumbnail}
            alt={preset.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to color if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.nextElementSibling?.classList.remove('hidden')
            }}
          />
        ) : null}
        <div 
          className={`w-full h-full ${preset.thumbnail ? 'hidden' : ''}`}
          style={{
            background: preset.type === 'gradient' 
              ? preset.value as string 
              : preset.type === 'solid' 
                ? preset.value as string 
                : '#f0f0f0'
          }}
        />
      </div>
      <div className="p-2">
        <div className="text-xs font-medium text-gray-900">{preset.name}</div>
        <div className="text-xs text-gray-500 capitalize">{preset.type}</div>
      </div>
    </div>
  )

  return (
    <div className="w-full bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Design Studio</h2>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-md p-1">
          <button
            onClick={() => handleTabChange('templates')}
            className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded transition-colors ${
              activeTab === 'templates'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid className="w-4 h-4 mr-2" />
            Templates
          </button>
          <button
            onClick={() => handleTabChange('backgrounds')}
            className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded transition-colors ${
              activeTab === 'backgrounds'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Palette className="w-4 h-4 mr-2" />
            Backgrounds
          </button>
          <button
            onClick={() => handleTabChange('recent')}
            className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded transition-colors ${
              activeTab === 'recent'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock className="w-4 h-4 mr-2" />
            Recent
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'templates' && (
          <div key="templates-tab" className="p-4">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Templates Grid/List */}
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-2 gap-3' 
                : 'space-y-2'
            }`}>
              {filteredTemplates.map(renderTemplateCard)}
            </div>
          </div>
        )}

        {activeTab === 'backgrounds' && (
          <div key="backgrounds-tab" className="p-4">
            {/* Background Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Background Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundImageUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Background Presets */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Background Presets</h3>
              <div className="grid grid-cols-2 gap-2">
                {backgroundPresets.map(renderBackgroundPreset)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recent' && (
          <div key="recent-tab" className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Templates</h3>
            <div className="space-y-2">
              {recentTemplates.map(renderTemplateCard)}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => {/* Clear canvas logic */}}
          className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-md transition-colors text-sm font-medium"
        >
          Start from Scratch
        </button>
      </div>
    </div>
  )
}

export default EnhancedSidebar

