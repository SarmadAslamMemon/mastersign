import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  TrendingUp,
  X,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TemplateService, Template, TemplateCategory } from '@/services/TemplateService';

interface TemplateBrowserProps {
  onTemplateSelect: (template: Template) => void;
  onClose: () => void;
}

const TemplateBrowser: React.FC<TemplateBrowserProps> = ({ onTemplateSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 200 });
  const [showPopular, setShowPopular] = useState(false);
  const [showFeatured, setShowFeatured] = useState(false);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<TemplateCategory[]>([]);

  useEffect(() => {
    setCategories(TemplateService.getCategories());
    updateFilteredTemplates();
  }, []);

  useEffect(() => {
    updateFilteredTemplates();
  }, [searchQuery, selectedCategory, priceRange, showPopular, showFeatured]);

  const updateFilteredTemplates = () => {
    let templates: Template[] = [];

    // Get templates based on category
    if (selectedCategory === 'all') {
      categories.forEach(category => {
        templates.push(...category.templates);
      });
    } else {
      templates = TemplateService.getTemplatesByCategory(selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      templates = TemplateService.searchTemplates(searchQuery);
    }

    // Apply price filter
    templates = templates.filter(template => 
      template.basePrice >= priceRange.min && template.basePrice <= priceRange.max
    );

    // Apply popular filter
    if (showPopular) {
      templates = templates.filter(template => template.popular);
    }

    // Apply featured filter
    if (showFeatured) {
      templates = templates.filter(template => template.featured);
    }

    setFilteredTemplates(templates);
  };

  const handleTemplateSelect = (template: Template) => {
    onTemplateSelect(template);
    onClose();
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || '📄';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Unknown';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Browse Templates</h2>
            <p className="text-gray-600 mt-1">
              Looking for design inspiration? Choose from professional templates to get started!
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                        className="w-20"
                      />
                      <span className="text-gray-500">-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                        className="w-20"
                      />
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div className="flex items-end space-x-2">
                    <Button
                      variant={showPopular ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setShowPopular(!showPopular)}
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Popular
                    </Button>
                    <Button
                      variant={showFeatured ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setShowFeatured(!showFeatured)}
                    >
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Featured
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-auto p-6">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
            }>
              {filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className={`bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer ${
                    viewMode === 'list' ? 'flex items-center space-x-4 p-4' : ''
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  {/* Template Preview */}
                  <div className={`relative ${viewMode === 'list' ? 'w-32 h-24' : 'h-48'}`}>
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      {template.popular && (
                        <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                          <Star className="h-3 w-3" />
                        </div>
                      )}
                      {template.featured && (
                        <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          <TrendingUp className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{template.name}</h3>
                      <span className="text-green-600 font-semibold text-sm">${template.basePrice}</span>
                    </div>
                    
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">{template.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {getCategoryIcon(template.category)} {getCategoryName(template.category)}
                        </span>
                        <span className="text-xs text-gray-400">
                          {template.width}" × {template.height}"
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">{template.elements.length} elements</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Preview functionality
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTemplateSelect(template);
                        }}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Use Template
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredTemplates.length} of {TemplateService.getCategories().reduce((acc, cat) => acc + cat.templates.length, 0)} templates
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TemplateBrowser; 