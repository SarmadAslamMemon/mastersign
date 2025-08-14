import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ChevronDown, Search, Grid, List } from 'lucide-react';
import { SignTemplate } from '../data/signTemplates';

interface TemplateBrowserPanelProps {
  store: any;
  categories: any;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onTemplateSelect: (template: SignTemplate) => void;
  selectedTemplate: SignTemplate | null;
}

export const TemplateBrowserPanel = observer(({
  store,
  categories,
  activeCategory,
  onCategoryChange,
  onTemplateSelect,
  selectedTemplate
}: TemplateBrowserPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['real-estate']));

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Filter templates by search query
  const filteredCategories = Object.entries(categories).filter(([key, category]: [string, any]) => {
    if (searchQuery) {
      return category.templates.some((template: SignTemplate) =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  // Get templates for current category
  const currentTemplates = categories[activeCategory]?.templates || [];

  return (
    <div className="template-browser-panel w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Sign Templates</h2>
        
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

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
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
      </div>

      {/* Categories and Templates */}
      <div className="flex-1 overflow-y-auto">
        {filteredCategories.map(([key, category]: [string, any]) => (
          <div key={key} className="border-b border-gray-100">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(key)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium text-gray-900">{category.name}</span>
                <span className="text-sm text-gray-500">({category.templates.length})</span>
              </div>
              <ChevronDown 
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  expandedCategories.has(key) ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Category Description */}
            {expandedCategories.has(key) && (
              <div className="px-4 pb-2">
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            )}

            {/* Templates */}
            {expandedCategories.has(key) && (
              <div className={`px-4 pb-4 ${
                viewMode === 'grid' 
                  ? 'grid grid-cols-2 gap-3' 
                  : 'space-y-2'
              }`}>
                {category.templates.map((template: SignTemplate) => (
                  <div
                    key={template.id}
                    onClick={() => onTemplateSelect(template)}
                    className={`cursor-pointer rounded-lg border-2 transition-all hover:shadow-md ${
                      selectedTemplate?.id === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Template Thumbnail */}
                    <div className="relative">
                      <div className="aspect-[3/4] bg-gray-100 rounded-t-lg flex items-center justify-center">
                        {template.thumbnail ? (
                          <img
                            src={template.thumbnail}
                            alt={template.name}
                            className="w-full h-full object-contain rounded-t-lg"
                            style={{ objectFit: 'contain' }}
                          />
                        ) : (
                          <div className="text-gray-400 text-center p-4">
                            <div className="text-2xl mb-2">📋</div>
                            <div className="text-xs">Template</div>
                          </div>
                        )}
                      </div>
                      
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
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => store.clear()}
          className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-sm font-medium"
        >
          Start from Scratch
        </button>
      </div>
    </div>
  );
});

export default TemplateBrowserPanel;
