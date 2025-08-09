import React, { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { Template, TemplateCategory } from '@/types/template';

interface TemplateGalleryProps {
  templates: Template[];
  onSelect: (template: Template) => void;
  onClose?: () => void;
}

export default function TemplateGallery({ templates, onSelect, onClose }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [, setLocation] = useLocation();

  // Get unique categories from templates
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    templates.forEach(template => {
      uniqueCategories.add(template.category.mainCategory);
    });
    return Array.from(uniqueCategories).sort();
  }, [templates]);

  // Filter templates based on search and category
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = searchQuery === '' || 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === '' || 
        template.category.mainCategory === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [templates, searchQuery, selectedCategory]);

  const handleTemplateClick = (template: Template) => {
    onSelect(template);
  };

  const handleEditTemplate = (template: Template) => {
    setLocation(`/editor/${template.id}`);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Template Gallery</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {(searchQuery || selectedCategory) && (
          <button
            onClick={handleClearFilters}
            className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 border border-gray-300 rounded-md transition-colors"
          >
            Clear Filters
          </button>
        )}

        {/* Results Count */}
        <div className="text-xs text-gray-500 mt-2">
          {filteredTemplates.length} of {templates.length} templates
        </div>
      </div>

      {/* Templates List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-2">🔍</div>
            <p className="text-gray-500 text-sm">
              {searchQuery || selectedCategory 
                ? 'No templates match your filters'
                : 'No templates available'
              }
            </p>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={handleClearFilters}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                onClick={() => handleTemplateClick(template)}
                className="group cursor-pointer border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center overflow-hidden">
                  {template.thumbnail ? (
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="text-gray-400 text-xs text-center">
                      <div className="text-2xl mb-1">📄</div>
                      No Preview
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                    {template.name}
                  </h4>
                  
                  {template.description && (
                    <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                      {template.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{template.width} × {template.height}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      {template.category.mainCategory}
                    </span>
                  </div>

                  {/* Tags */}
                  {template.tags && template.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {template.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {template.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                          +{template.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTemplate(template);
                      }}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateClick(template);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-xs rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Use
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          Click on a template to load it into the editor
        </div>
      </div>
    </div>
  );
}
