'use client'

import React, { useState, useMemo } from 'react'
import { Search, Filter, X, Grid3X3, List, Palette, Type, Download, Heart } from 'lucide-react'
import { Template, ColorVariation, TextVariation, getTemplateCategories, getAllTemplates, searchTemplates } from './data/templates'

interface TemplateBrowserProps {
  onTemplateSelect: (template: Template) => void
  onClose: () => void
  className?: string
}

export const TemplateBrowser: React.FC<TemplateBrowserProps> = ({ 
  onTemplateSelect, 
  onClose, 
  className = '' 
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [previewVariation, setPreviewVariation] = useState<{
    colorId?: string
    textId?: string
  }>({})

  const categories = getTemplateCategories()
  const allTemplates = getAllTemplates()

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    allTemplates.forEach(template => {
      template.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [allTemplates])

  // Filter templates based on search and filters
  const filteredTemplates = useMemo(() => {
    let templates = allTemplates

    // Filter by category
    if (selectedCategory !== 'all') {
      templates = templates.filter(t => t.category === selectedCategory)
    }

    // Filter by search query and tags
    if (searchQuery || selectedTags.length > 0) {
      templates = searchTemplates(searchQuery, selectedTags.length > 0 ? selectedTags : undefined)
    }

    return templates
  }, [allTemplates, selectedCategory, searchQuery, selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
    setPreviewVariation({})
  }

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      onTemplateSelect(selectedTemplate)
      onClose()
    }
  }

  const TemplateCard = ({ template }: { template: Template }) => (
    <div
      className={`bg-white rounded-lg border-2 cursor-pointer transition-all duration-200 ${
        selectedTemplate?.id === template.id 
          ? 'border-blue-500 shadow-lg' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={() => handleTemplateClick(template)}
    >
      {/* Template Thumbnail */}
      <div className="aspect-[4/3] bg-gray-50 rounded-t-lg overflow-hidden">
        <img 
          src={template.thumbnail} 
          alt={template.name}
          className="w-full h-full object-contain p-4"
        />
      </div>
      
      {/* Template Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-gray-800">{template.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>
        
        {/* Dimensions */}
        <div className="text-xs text-gray-500 mb-2">
          {template.dimensions.width} × {template.dimensions.height} px
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {template.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
              {tag}
            </span>
          ))}
          {template.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{template.tags.length - 3}</span>
          )}
        </div>
        
        {/* Color variations preview */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {template.colorVariations.slice(0, 4).map(variation => (
              <div 
                key={variation.id}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: variation.preview }}
                title={variation.name}
              />
            ))}
            {template.colorVariations.length > 4 && (
              <div className="w-4 h-4 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-600">+</span>
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500">
            {template.objects.filter(o => o.isEditable).length} editable
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex ${className}`}>
      <div className="bg-white w-full max-w-7xl mx-auto my-4 rounded-lg shadow-xl flex overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Templates</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                All Templates ({allTemplates.length})
              </button>
              {categories.map(category => {
                const count = allTemplates.filter(t => t.category === category.id).length
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      selectedCategory === category.id 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name} ({count})</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedTags.length > 0 || selectedCategory !== 'all') && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Active Filters</h3>
              <div className="space-y-2">
                {selectedCategory !== 'all' && (
                  <div className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg">
                    <span className="text-sm text-blue-700">
                      Category: {categories.find(c => c.id === selectedCategory)?.name}
                    </span>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="text-blue-700 hover:text-blue-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {selectedTags.map(tag => (
                  <div key={tag} className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg">
                    <span className="text-sm text-blue-700">Tag: {tag}</span>
                    <button
                      onClick={() => handleTagToggle(tag)}
                      className="text-blue-700 hover:text-blue-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {filteredTemplates.length} Templates Found
              </h3>
              <p className="text-sm text-gray-600">
                Choose a template to get started with your design
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Templates Grid/List */}
          <div className="flex-1 overflow-y-auto">
            {filteredTemplates.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No templates found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              </div>
            ) : (
              <div className={`p-6 ${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }`}>
                {filteredTemplates.map(template => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            )}
          </div>

          {/* Selected Template Actions */}
          {selectedTemplate && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{selectedTemplate.name}</h3>
                  <p className="text-gray-600">{selectedTemplate.description}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Color Variations */}
                  {selectedTemplate.colorVariations.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-gray-600" />
                      <div className="flex gap-1">
                        {selectedTemplate.colorVariations.map(variation => (
                          <button
                            key={variation.id}
                            onClick={() => setPreviewVariation(prev => ({ ...prev, colorId: variation.id }))}
                            className={`w-6 h-6 rounded-full border-2 ${
                              previewVariation.colorId === variation.id
                                ? 'border-blue-500 ring-2 ring-blue-200'
                                : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: variation.preview }}
                            title={variation.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Text Variations */}
                  {selectedTemplate.textVariations && selectedTemplate.textVariations.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Type className="h-4 w-4 text-gray-600" />
                      <select
                        value={previewVariation.textId || ''}
                        onChange={(e) => setPreviewVariation(prev => ({ ...prev, textId: e.target.value }))}
                        className="px-3 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Default Text</option>
                        {selectedTemplate.textVariations.map(variation => (
                          <option key={variation.id} value={variation.id}>
                            {variation.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    onClick={handleUseTemplate}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Use This Template
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
