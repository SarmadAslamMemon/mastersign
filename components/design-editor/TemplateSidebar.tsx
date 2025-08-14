'use client'

import React, { useState, useMemo } from 'react'
import { Search, Filter, X, Grid3X3, List, Palette, Type, Download, ChevronDown, ChevronRight, RefreshCw } from 'lucide-react'
import { Template, ColorVariation, TextVariation, getTemplateCategories, getAllTemplates, searchTemplates } from './data/templates'

interface TemplateSidebarProps {
  onTemplateSelect: (template: Template) => void
  currentTemplate: Template | null
  onColorVariationChange: (variationId: string) => void
  onTextVariationChange: (variationId: string) => void
  className?: string
}

export const TemplateSidebar: React.FC<TemplateSidebarProps> = ({ 
  onTemplateSelect, 
  currentTemplate,
  onColorVariationChange,
  onTextVariationChange,
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'customize'>('browse')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['all']))

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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedTags([])
  }

  const TemplateCard = ({ template }: { template: Template }) => (
    <div
      className={`bg-white rounded-lg border cursor-pointer transition-all duration-200 ${
        currentTemplate?.id === template.id 
          ? 'border-blue-500 shadow-md ring-1 ring-blue-200' 
          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
      }`}
      onClick={() => onTemplateSelect(template)}
    >
      {/* Template Thumbnail */}
      <div className="aspect-[4/3] bg-gray-50 rounded-t-lg overflow-hidden">
        <img 
          src={template.thumbnail} 
          alt={template.name}
          className="w-full h-full object-contain p-2"
        />
      </div>
      
      {/* Template Info */}
      <div className="p-3">
        <h3 className="font-semibold text-sm mb-1 text-gray-800 line-clamp-1">{template.name}</h3>
        <p className="text-gray-600 text-xs mb-2 line-clamp-2">{template.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {template.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-1 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">
              {tag}
            </span>
          ))}
          {template.tags.length > 2 && (
            <span className="text-xs text-gray-500">+{template.tags.length - 2}</span>
          )}
        </div>
        
        {/* Color variations preview */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {template.colorVariations.slice(0, 3).map(variation => (
              <div 
                key={variation.id}
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: variation.preview }}
                title={variation.name}
              />
            ))}
            {template.colorVariations.length > 3 && (
              <div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-600">+</span>
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500">
            {template.objects.filter(o => o.isEditable).length}e
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={`bg-white border-r border-gray-300 flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Design Studio</h2>
        
        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'browse'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Browse Templates
          </button>
          <button
            onClick={() => setActiveTab('customize')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'customize'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            disabled={!currentTemplate}
          >
            Customize
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'browse' ? (
          <>
            {/* Search and Filters */}
            <div className="p-4 space-y-3 border-b border-gray-100">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {filteredTemplates.length} templates
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${
                      viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${
                      viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedTags.length > 0 || selectedCategory !== 'all' || searchQuery) && (
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {searchQuery && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                        "{searchQuery}"
                      </span>
                    )}
                    {selectedCategory !== 'all' && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </span>
                    )}
                    {selectedTags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-2">
                {/* All Templates */}
                <div>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                      selectedCategory === 'all' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-sm font-medium">All Templates</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                      {allTemplates.length}
                    </span>
                  </button>
                </div>

                {/* Category Groups */}
                {categories.map(category => {
                  const categoryTemplates = allTemplates.filter(t => t.category === category.id)
                  return (
                    <div key={category.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.id)
                          toggleCategory(category.id)
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                          selectedCategory === category.id 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{category.icon}</span>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                            {categoryTemplates.length}
                          </span>
                          {expandedCategories.has(category.id) ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </div>
                      </button>
                      
                      {/* Category Templates */}
                      {expandedCategories.has(category.id) && selectedCategory === category.id && (
                        <div className={`mt-2 ${
                          viewMode === 'grid' 
                            ? 'grid grid-cols-2 gap-2'
                            : 'space-y-2'
                        }`}>
                          {categoryTemplates.map(template => (
                            <TemplateCard key={template.id} template={template} />
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* All Templates Grid */}
                {selectedCategory === 'all' && (
                  <div className={`mt-4 ${
                    viewMode === 'grid' 
                      ? 'grid grid-cols-2 gap-3'
                      : 'space-y-2'
                  }`}>
                    {filteredTemplates.map(template => (
                      <TemplateCard key={template.id} template={template} />
                    ))}
                  </div>
                )}

                {/* No Results */}
                {filteredTemplates.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <h3 className="text-sm font-medium text-gray-600 mb-1">No templates found</h3>
                    <p className="text-xs text-gray-500">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Customize Tab */
          <div className="flex-1 overflow-y-auto">
            {currentTemplate ? (
              <div className="p-4 space-y-4">
                {/* Current Template Info */}
                <div className="bg-blue-50 rounded-lg p-3">
                  <h3 className="font-semibold text-sm text-blue-800 mb-1">{currentTemplate.name}</h3>
                  <p className="text-xs text-blue-600">{currentTemplate.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {currentTemplate.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-200 text-blue-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Color Variations */}
                {currentTemplate.colorVariations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Color Variations
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {currentTemplate.colorVariations.map(variation => (
                        <button
                          key={variation.id}
                          onClick={() => onColorVariationChange(variation.id)}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                        >
                          <div
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: variation.preview }}
                          />
                          <div className="text-left">
                            <div className="font-medium text-sm text-gray-800">{variation.name}</div>
                            <div className="text-xs text-gray-500">Click to apply</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Text Variations */}
                {currentTemplate.textVariations && currentTemplate.textVariations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Text Variations
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {currentTemplate.textVariations.map(variation => (
                        <button
                          key={variation.id}
                          onClick={() => onTextVariationChange(variation.id)}
                          className="text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                        >
                          <div className="font-medium text-sm text-gray-800 mb-1">{variation.name}</div>
                          <div className="text-xs text-gray-500">
                            Updates {Object.keys(variation.texts).length} text element{Object.keys(variation.texts).length !== 1 ? 's' : ''}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Template Actions */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => onTemplateSelect(currentTemplate)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reload Template
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <Palette className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <h3 className="font-medium mb-1">No Template Selected</h3>
                <p className="text-sm">Choose a template from the Browse tab to customize it</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
