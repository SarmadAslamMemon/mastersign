// ============================================================================
// TEMPLATE EDITOR - Main component for the sign template editor
// ============================================================================

import React, { useState, useEffect, useCallback } from 'react';
import { UserDesign } from '@/types/template-editor';
import { Template } from '@/types/template';
import { getAllTemplates } from '@/utils/templateLoader';
import TemplateBrowser from './TemplateBrowser';
import TemplateGallery from './TemplateGallery';
import DesignCanvas from './DesignCanvas';

// Wrapper component for wouter routing
const TemplateEditorRoute: React.FC = () => {
  const [currentDesign, setCurrentDesign] = useState<UserDesign | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showTemplateBrowser, setShowTemplateBrowser] = useState(false);
  const [showTemplateGallery, setShowTemplateGallery] = useState(true);
  const [showTools, setShowTools] = useState(false);

  // Get real templates from templateLoader
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const loadTemplates = () => {
      const allTemplates = getAllTemplates();
      setTemplates(allTemplates);
    };
    loadTemplates();
  }, []);

  // Initialize editor with template if provided, or create default design
  useEffect(() => {
    if (selectedTemplate) {
      loadTemplate(selectedTemplate);
    } else {
      // Create a default empty design
      const defaultDesign: UserDesign = {
        id: 'default-design',
        name: 'New Design',
        templateId: 'default',
        elements: [],
        layers: [{
          id: 'default-layer',
          name: 'Main Layer',
          visible: true,
          locked: false,
          opacity: 1,
          blendMode: 'normal',
          elements: []
        }],
        metadata: {
          width: 800,
          height: 600,
          category: 'Custom',
          createdAt: new Date(),
          updatedAt: new Date(),
          lastEdited: new Date(),
          version: 1,
          tags: [],
          templateDocument: {
            store: {},
            schema: {},
            records: {}
          }
        },
        exportHistory: []
      };
      setCurrentDesign(defaultDesign);
    }
  }, [selectedTemplate]);

  const loadTemplate = useCallback((templateId: string) => {
    // TODO: Implement template loading logic
    console.log('Loading template:', templateId);
  }, []);

  const handleDesignChange = useCallback((updatedDesign: UserDesign) => {
    setCurrentDesign(updatedDesign);
  }, []);

  const handleTemplateSelect = useCallback((template: Template) => {
    console.log('Template selected:', template);
    // Create a new design based on the selected template
    const newDesign: UserDesign = {
      id: `design-${Date.now()}`,
      name: template.name,
      templateId: template.id,
      elements: [],
      layers: [{
        id: 'main-layer',
        name: 'Main Layer',
        visible: true,
        locked: false,
        opacity: 1,
        blendMode: 'normal',
        elements: []
      }],
      metadata: {
        width: template.width,
        height: template.height,
        category: template.category.mainCategory,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastEdited: new Date(),
        version: 1,
        tags: template.tags || [],
        templateDocument: template.document
      },
      exportHistory: []
    };
    setCurrentDesign(newDesign);
    setSelectedTemplate(template.id);
  }, []);

  if (!currentDesign) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowTemplateGallery(!showTemplateGallery)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showTemplateGallery 
                  ? 'bg-gray-600 text-white hover:bg-gray-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {showTemplateGallery ? 'Hide Gallery' : 'Show Gallery'}
            </button>
            <button
              onClick={() => setShowTemplateBrowser(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse Templates
            </button>
            <button
              onClick={() => setShowTools(!showTools)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showTools 
                  ? 'bg-gray-600 text-white hover:bg-gray-700' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {showTools ? 'Hide Tools' : 'Show Tools'}
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Template Editor</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Save
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Template Gallery */}
        {showTemplateGallery && (
          <TemplateGallery
            templates={templates}
            onSelect={handleTemplateSelect}
            onClose={() => setShowTemplateGallery(false)}
          />
        )}

        {/* Canvas Area */}
        <div className="flex-1 relative">
          <DesignCanvas
            design={currentDesign}
            onDesignChange={handleDesignChange}
          />
          
          {/* Floating Tools Panel */}
          {showTools && (
            <div className="absolute top-4 left-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-48">
              <h4 className="font-semibold text-gray-700 mb-3 text-sm">Tools</h4>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm">
                  ✋ Select
                </button>
                <button className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm">
                  ✏️ Draw
                </button>
                <button className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm">
                  T Text
                </button>
                <button className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm">
                  ⬜ Shape
                </button>
                <button className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm">
                  🖼️ Image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Properties</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Design Name
              </label>
              <input
                type="text"
                value={currentDesign.name}
                onChange={(e) => setCurrentDesign({
                  ...currentDesign,
                  name: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width
              </label>
              <input
                type="number"
                value={currentDesign.metadata.width}
                onChange={(e) => setCurrentDesign({
                  ...currentDesign,
                  metadata: {
                    ...currentDesign.metadata,
                    width: parseInt(e.target.value) || 800
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height
              </label>
              <input
                type="number"
                value={currentDesign.metadata.height}
                onChange={(e) => setCurrentDesign({
                  ...currentDesign,
                  metadata: {
                    ...currentDesign.metadata,
                    height: parseInt(e.target.value) || 600
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Template Browser Modal */}
      {showTemplateBrowser && (
        <TemplateBrowser
          onClose={() => setShowTemplateBrowser(false)}
          onSelectTemplate={(templateId) => {
            // Find the template by ID and select it
            const template = templates.find(t => t.id === templateId);
            if (template) {
              handleTemplateSelect(template);
            }
            setShowTemplateBrowser(false);
          }}
        />
      )}
    </div>
  );
};

export { TemplateEditorRoute };
