// ============================================================================
// TEMPLATE EDITOR - Main component for the sign template editor
// ============================================================================

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { UserDesign } from '@/types/template-editor';
import { Template } from '@/types/template';
import { getAllTemplates } from '@/utils/templateLoader';
import TemplateBrowser from './TemplateBrowser';
import TabbedSidebar from './TabbedSidebar';
import DesignCanvas, { DesignCanvasRef } from './DesignCanvas';

// Wrapper component for wouter routing
const TemplateEditorRoute: React.FC = () => {
  const [currentDesign, setCurrentDesign] = useState<UserDesign | null>(null);
  const canvasRef = React.useRef<DesignCanvasRef>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showTemplateBrowser, setShowTemplateBrowser] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  // Get real templates from templateLoader
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const loadTemplates = () => {
      const allTemplates = getAllTemplates();
      setTemplates(allTemplates);
    };
    loadTemplates();
  }, []);

  // Initialize editor with a default blank design
  useEffect(() => {
    if (!currentDesign) {
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
  }, [currentDesign]);

  // Initialize editor with template if provided
  useEffect(() => {
    if (selectedTemplate) {
      loadTemplate(selectedTemplate);
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
    console.log('Template document:', template.document);
    console.log('Template document type:', typeof template.document);
    console.log('Template document keys:', Object.keys(template.document || {}));
    
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
        category: template.categories[0]?.mainCategory || 'Uncategorized',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastEdited: new Date(),
        version: 1,
        tags: template.tags || [],
        templateDocument: template.document || {
          shapes: {},
          bindings: {},
          assets: {}
        }
      },
      exportHistory: []
    };
    
    console.log('Created new design:', newDesign);
    console.log('Template document in metadata:', newDesign.metadata.templateDocument);
    console.log('Template document metadata keys:', Object.keys(newDesign.metadata.templateDocument || {}));
    setCurrentDesign(newDesign);
    setSelectedTemplate(template.id);
  }, []);

  // If no design is loaded yet, show loading
  if (!currentDesign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full animate-spin border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Left side - Navigation and controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setCurrentDesign(null);
                setSelectedTemplate(null);
              }}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Design
            </button>
            
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                showSidebar 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
              title={showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <button
              onClick={() => setShowTemplateBrowser(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Browse Templates
            </button>
            
            <div className="h-6 w-px bg-gray-300"></div>
            
            <h1 className="text-2xl font-bold text-gray-900">Template Editor</h1>
          </div>
          
          {/* Right side - Action buttons */}
          <div className="flex items-center space-x-3">
            <button 
              className="flex items-center px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 font-medium"
              onClick={() => {
                // Navigate back to main website
                window.location.href = '/';
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Editor
            </button>
            
            <button
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
              onClick={async () => {
                try {
                  if (!canvasRef.current) throw new Error('Canvas not ready');
                  const dataUrl = await canvasRef.current.exportPNG();
                  const link = document.createElement('a');
                  link.href = dataUrl;
                  link.download = `${currentDesign?.name || 'design'}.png`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  console.log('Design exported successfully as PNG!');
                } catch (e) {
                  console.error('Export failed:', e);
                  alert('Export failed. Please try again.');
                }
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export PNG
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tabbed Sidebar */}
        {showSidebar && (
          <TabbedSidebar
            templates={templates}
            onTemplateSelect={handleTemplateSelect}
            onClose={() => setShowSidebar(false)}
          />
        )}

        {/* Canvas Area */}
        <div className="flex-1 relative">
          <DesignCanvas
            ref={canvasRef}
            design={currentDesign}
            onDesignChange={handleDesignChange}
          />
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

      {/* Template Browser Modal (rendered in a portal above Tldraw UI) */}
      {showTemplateBrowser &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            style={{ zIndex: 99999 }}
          >
            <div
              className="bg-white rounded-lg w-11/12 h-5/6 max-w-6xl overflow-hidden shadow-xl"
              style={{ zIndex: 100000 }}
            >
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
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export { TemplateEditorRoute };
