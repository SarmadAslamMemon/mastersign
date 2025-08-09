import React, { useState, useEffect } from 'react';
import { Template, TemplateCategory } from '@/types/template';
import { 
  loadTemplatesByCategory, 
  searchTemplates, 
  getMainCategories, 
  getSubCategories 
} from '@/utils/templateLoader';

interface TemplateBrowserProps {
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

export default function TemplateBrowser({ onClose, onSelectTemplate }: TemplateBrowserProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mainCategories, setMainCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);

  useEffect(() => {
    // Load all main categories on component mount
    setMainCategories(getMainCategories());
  }, []);

  useEffect(() => {
    // Update subcategories when main category changes
    if (selectedCategory) {
      setSubCategories(getSubCategories(selectedCategory));
      setSelectedSubCategory(''); // Reset subcategory selection
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    // Load templates based on current filters
    if (searchQuery) {
      setTemplates(searchTemplates(searchQuery));
    } else if (selectedCategory) {
      const category: TemplateCategory = {
        mainCategory: selectedCategory,
        ...(selectedSubCategory && { subCategory: selectedSubCategory })
      };
      setTemplates(loadTemplatesByCategory(category));
    } else {
      setTemplates([]);
    }
  }, [selectedCategory, selectedSubCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleTemplateClick = (template: Template) => {
    onSelectTemplate(template.id);
  };

  return (
    <div className="w-full h-full bg-white p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Template Browser</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ✕ Close
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-4 mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {mainCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {subCategories.length > 0 && (
            <select
              value={selectedSubCategory}
              onChange={(e) => handleSubCategoryChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Subcategories</option>
              {subCategories.map(subCategory => (
                <option key={subCategory} value={subCategory}>{subCategory}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div
            key={template.id}
            onClick={() => handleTemplateClick(template)}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Thumbnail: {template.thumbnail}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{template.description}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{template.width} × {template.height}</span>
              <span>{template.category.mainCategory}</span>
            </div>
            {template.tags && template.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {template.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchQuery 
              ? `No templates found for "${searchQuery}"`
              : selectedCategory 
                ? `No templates found in ${selectedCategory}${selectedSubCategory ? ` > ${selectedSubCategory}` : ''}`
                : 'Select a category or search for templates'
            }
          </p>
        </div>
      )}
    </div>
  );
}
