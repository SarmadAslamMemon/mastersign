'use client'

import React from 'react'
import { TEMPLATE_CATEGORIES, MOCK_TEMPLATES, getTemplatesByCategory, searchTemplates } from '../../../components/design-editor/data/templates'

export default function TemplateTestPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Template Data Test</h1>
        
        {/* Categories Overview */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Template Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TEMPLATE_CATEGORIES.map(category => (
              <div key={category.id} className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-medium">{category.name}</div>
                <div className="text-sm text-gray-500">
                  {getTemplatesByCategory(category.id).length} templates
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Templates by Category */}
        {TEMPLATE_CATEGORIES.map(category => (
          <div key={category.id} className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              {category.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTemplatesByCategory(category.id).map(template => (
                <div key={template.id} className="border rounded-lg overflow-hidden">
                  {/* Template Thumbnail */}
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <img 
                      src={template.thumbnail} 
                      alt={template.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  
                  {/* Template Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                    
                    {/* Dimensions */}
                    <div className="text-xs text-gray-500 mb-3">
                      {template.dimensions.width} × {template.dimensions.height} px
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Color Variations */}
                    <div className="mb-3">
                      <div className="text-xs font-medium text-gray-700 mb-1">Color Variations:</div>
                      <div className="flex gap-1">
                        {template.colorVariations.map(variation => (
                          <div 
                            key={variation.id}
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: variation.preview }}
                            title={variation.name}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Text Variations */}
                    {template.textVariations && template.textVariations.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs font-medium text-gray-700 mb-1">Text Variations:</div>
                        <div className="text-xs text-gray-600">
                          {template.textVariations.map(v => v.name).join(', ')}
                        </div>
                      </div>
                    )}
                    
                    {/* Object Count */}
                    <div className="text-xs text-gray-500">
                      {template.objects.length} objects • {template.objects.filter(o => o.isEditable).length} editable
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Search Test */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Search Test</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Search for "business":</h3>
              <div className="text-sm text-gray-600">
                Found {searchTemplates('business').length} templates: {' '}
                {searchTemplates('business').map(t => t.name).join(', ')}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Search for "safety" tag:</h3>
              <div className="text-sm text-gray-600">
                Found {searchTemplates('', ['safety']).length} templates: {' '}
                {searchTemplates('', ['safety']).map(t => t.name).join(', ')}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Search for "sign":</h3>
              <div className="text-sm text-gray-600">
                Found {searchTemplates('sign').length} templates: {' '}
                {searchTemplates('sign').map(t => t.name).join(', ')}
              </div>
            </div>
          </div>
        </div>

        {/* Template Structure Verification */}
        <div className="bg-white rounded-lg p-6 shadow-sm mt-8">
          <h2 className="text-xl font-semibold mb-4">Template Structure Verification</h2>
          <div className="space-y-4">
            {MOCK_TEMPLATES.slice(0, 2).map(template => (
              <div key={template.id} className="border border-gray-200 rounded p-4">
                <h3 className="font-medium mb-2">{template.name} - Object Details:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {template.objects.map(obj => (
                    <div key={obj.id} className="bg-gray-50 p-3 rounded">
                      <div className="font-medium">{obj.id}</div>
                      <div className="text-gray-600">Type: {obj.type}</div>
                      <div className="text-gray-600">Role: {obj.templateRole}</div>
                      <div className="text-gray-600">
                        Editable: {obj.isEditable ? '✅' : '❌'} | 
                        Required: {obj.isRequired ? '✅' : '❌'}
                      </div>
                      {obj.textProperties && (
                        <div className="text-gray-600">Text: "{obj.textProperties.text}"</div>
                      )}
                      <div className="text-gray-600">
                        Position: {obj.properties.left}x{obj.properties.top}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
