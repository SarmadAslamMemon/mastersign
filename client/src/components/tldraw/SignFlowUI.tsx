// ============================================================================
// SIGNFLOW TLDRAW UI COMPONENTS
// ============================================================================

import React, { useState } from 'react';
import { useSignFlowContext } from './SignFlowTools';
import { createShapeId } from '@tldraw/tldraw';
import { TemplateService, SignTemplate } from '@/services/TemplateService';
import { TemplateBrowser } from '@/components/TemplateBrowser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  FolderOpen, 
  Image, 
  Type, 
  Square, 
  Circle, 
  Triangle, 
  Star, 
  ArrowRight,
  Download,
  RotateCcw,
  Trash2,
  Copy,
  Lock,
  Unlock,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Palette,
  ZoomIn,
  ZoomOut,
  Maximize,
  RotateCw,
  Undo,
  Redo,
  Save,
  Eye,
  Settings,
  Layers,
  Grid,
  Ruler,
  ChevronDown,
  ChevronRight,
  Plus,
  Search
} from 'lucide-react';

// Get templates from service
const templates = TemplateService.getAllTemplates();
const categories = TemplateService.getCategories();

// Sidebar Tab Component
export const SignFlowSidebar: React.FC = () => {
  const { editor, addToast } = useSignFlowContext();
  const [activeTab, setActiveTab] = useState<'templates' | 'tools' | 'properties'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<SignTemplate | null>(null);
  const [selectedShape, setSelectedShape] = useState<any>(null);
  const [isTemplateBrowserOpen, setIsTemplateBrowserOpen] = useState(false);

  const handleTemplateSelect = (template: SignTemplate) => {
    setSelectedTemplate(template);
    addToast(`Template "${template.name}" selected`);
    
    // Load template into editor
    if (editor && template.elements) {
      try {
        // Clear existing shapes
        editor.selectAll();
        editor.deleteShapes(editor.selectedShapeIds);
        
        // Create new shapes from template
        template.elements.forEach((element) => {
          editor.createShape({
            id: element.id,
            type: element.type,
            x: element.x * 20, // Scale up for better visibility
            y: element.y * 20,
            props: element.props,
          });
        });
        
        addToast(`Template "${template.name}" loaded successfully!`);
      } catch (error) {
        console.error('Error loading template:', error);
        addToast(`Error loading template: ${error.message}`, { icon: 'error' });
      }
    }
  };

  const openTemplateBrowser = () => {
    setIsTemplateBrowserOpen(true);
  };

  const closeTemplateBrowser = () => {
    setIsTemplateBrowserOpen(false);
  };

  const createShape = (type: string) => {
    if (!editor) return;
    
    try {
      let shape;
      const shapeId = createShapeId();
      
      switch (type) {
        case 'rectangle':
          shape = editor.createShape({
            id: shapeId,
            type: 'geo',
            x: 100,
            y: 100,
            props: {
              geo: 'rectangle',
              w: 100,
              h: 100,
              fill: 'solid',
              color: 'black',
              dash: 'draw',
              size: 'm',
              opacity: 1,
            },
          });
          break;
        case 'circle':
          shape = editor.createShape({
            id: shapeId,
            type: 'geo',
            x: 100,
            y: 100,
            props: {
              geo: 'ellipse',
              w: 100,
              h: 100,
              fill: 'solid',
              color: 'black',
              dash: 'draw',
              size: 'm',
              opacity: 1,
            },
          });
          break;
        case 'text':
          shape = editor.createShape({
            id: shapeId,
            type: 'text',
            x: 100,
            y: 100,
            props: {
              text: 'Click to edit',
              color: 'black',
              font: 'Arial',
              size: 24,
              weight: 'normal',
              style: 'normal',
              align: 'middle',
            },
          });
          break;
      }
      
      if (shape) {
        addToast(`${type} created successfully!`);
        setSelectedShape(shape);
      }
    } catch (error) {
      console.error('Error creating shape:', error);
      addToast(`Error creating ${type}: ${error.message}`, { icon: 'error' });
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 shadow-lg z-40">
      {/* Sidebar Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <h2 className="text-xl font-bold">SignFlow Studio</h2>
        <p className="text-sm opacity-90">Professional Sign Design Tool</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'templates', label: 'Templates', icon: FolderOpen },
          { id: 'tools', label: 'Tools', icon: Settings },
          { id: 'properties', label: 'Properties', icon: Layers }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Choose from professional templates to get started
              </p>
              
              {/* Browse Templates Button */}
              <Button
                onClick={openTemplateBrowser}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mb-4"
              >
                <Search className="w-4 h-4 mr-2" />
                Browse All Templates
              </Button>
            </div>
            
            {/* Quick Access Templates */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Quick Access</h3>
              <div className="grid grid-cols-2 gap-3">
                {templates.slice(0, 4).map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="cursor-pointer group"
                  >
                    <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-blue-50 transition-colors">
                      <div className="w-full h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded mb-2 flex items-center justify-center text-white font-bold text-xs">
                        {template.name}
                      </div>
                      <p className="text-xs text-gray-600">{template.dimensions.width}" × {template.dimensions.height}"</p>
                      <p className="text-sm font-semibold text-blue-600">${template.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={openTemplateBrowser}
                  className="w-full"
                >
                  View All Templates
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-3">Design Tools</h3>
            
            {/* Shape Tools */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Shapes</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createShape('rectangle')}
                  className="h-12 flex flex-col items-center justify-center gap-1"
                >
                  <Square className="w-4 h-4" />
                  <span className="text-xs">Rectangle</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createShape('circle')}
                  className="h-12 flex flex-col items-center justify-center gap-1"
                >
                  <Circle className="w-4 h-4" />
                  <span className="text-xs">Circle</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createShape('text')}
                  className="h-12 flex flex-col items-center justify-center gap-1"
                >
                  <Type className="w-4 h-4" />
                  <span className="text-xs">Text</span>
                </Button>
              </div>
            </div>

            {/* Action Tools */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => editor?.selectAll()}
                  className="h-10"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => editor?.deleteShapes(editor.selectedShapeIds)}
                  className="h-10"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-3">Shape Properties</h3>
            
            {selectedShape ? (
              <div className="space-y-4">
                {/* Position */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Position</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="X"
                      value={selectedShape.x || 0}
                      onChange={(e) => {
                        if (editor) {
                          editor.updateShape({
                            id: selectedShape.id,
                            x: parseFloat(e.target.value),
                          });
                        }
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="Y"
                      value={selectedShape.y || 0}
                      onChange={(e) => {
                        if (editor) {
                          editor.updateShape({
                            id: selectedShape.id,
                            y: parseFloat(e.target.value),
                          });
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Size */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Size</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Width"
                      value={selectedShape.props?.w || 100}
                      onChange={(e) => {
                        if (editor) {
                          editor.updateShape({
                            id: selectedShape.id,
                            props: { ...selectedShape.props, w: parseFloat(e.target.value) },
                          });
                        }
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="Height"
                      value={selectedShape.props?.h || 100}
                      onChange={(e) => {
                        if (editor) {
                          editor.updateShape({
                            id: selectedShape.id,
                            props: { ...selectedShape.props, h: parseFloat(e.target.value) },
                          });
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Opacity */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Opacity</label>
                  <Slider
                    value={[selectedShape.props?.opacity || 1]}
                    onValueChange={([value]) => {
                      if (editor) {
                        editor.updateShape({
                          id: selectedShape.id,
                          props: { ...selectedShape.props, opacity: value },
                        });
                      }
                    }}
                    max={1}
                    min={0}
                    step={0.1}
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Select a shape to edit its properties</p>
            )}
          </div>
        )}
      </div>
      
      {/* Template Browser Modal */}
      <TemplateBrowser
        isOpen={isTemplateBrowserOpen}
        onClose={closeTemplateBrowser}
        onTemplateSelect={handleTemplateSelect}
      />
    </div>
  );
};

// Top Toolbar Component
export const SignFlowTopToolbar: React.FC = () => {
  const { editor, addToast } = useSignFlowContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  React.useEffect(() => {
    const handleUndoRedoState = (event: CustomEvent) => {
      setCanUndo(event.detail.canUndo);
      setCanRedo(event.detail.canRedo);
    };
    window.addEventListener('tldraw-undo-redo-state', handleUndoRedoState as EventListener);
    return () => {
      window.removeEventListener('tldraw-undo-redo-state', handleUndoRedoState as EventListener);
    };
  }, []);

  const handleExport = async (format: 'png' | 'svg') => {
    if (!editor) return;
    
    try {
      if (format === 'png') {
        const dataUrl = await editor.exportImage();
        const link = document.createElement('a');
        link.download = `signflow-design.${format}`;
        link.href = dataUrl;
        link.click();
        addToast(`Exported as ${format.toUpperCase()}`);
      } else if (format === 'svg') {
        const svg = await editor.exportSvg();
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `signflow-design.${format}`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        addToast(`Exported as ${format.toUpperCase()}`);
      }
    } catch (error) {
      console.error('Export error:', error);
      addToast(`Export failed: ${error.message}`, { icon: 'error' });
    }
  };

  return (
    <div className="fixed top-0 left-80 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-30 flex items-center justify-between px-6">
      {/* Left Section - Project Info */}
      <div className="flex items-center space-x-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900">SignFlow Editor</h1>
          <p className="text-sm text-gray-600">Professional Business Card • 3.5" x 2" • $29.99</p>
        </div>
      </div>

      {/* Center Section - Editor Controls */}
      <div className="flex items-center space-x-2">
        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.zoomOut()}
            className="h-8 w-8 p-0"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.zoomToFit()}
            className="h-8 px-3"
          >
            Fit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.zoomIn()}
            className="h-8 w-8 p-0"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.resetZoom()}
            className="h-8 px-3"
          >
            Reset
          </Button>
        </div>

        {/* History Controls */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.undo()}
            disabled={!canUndo}
            className="h-8 w-8 p-0"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.redo()}
            disabled={!canRedo}
            className="h-8 w-8 p-0"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleExport('png')}
            className="h-8 px-3"
          >
            <Download className="w-4 h-4 mr-1" />
            PNG
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleExport('svg')}
            className="h-8 px-3"
          >
            <Download className="w-4 h-4 mr-1" />
            SVG
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.selectAll() && editor?.deleteShapes(editor.selectedShapeIds)}
            className="h-8 px-3"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.reload()}
            className="h-8 px-3"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Right Section - Project Actions */}
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-1" />
          Preview
        </Button>
        <Button variant="outline" size="sm">
          <Save className="w-4 h-4 mr-1" />
          Save
        </Button>
        <Button size="sm">
          Continue
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

// Floating Action Button
export const SignFlowFAB: React.FC = () => {
  const { editor, addToast } = useSignFlowContext();

  const quickActions = [
    { label: 'Add Text', icon: Type, action: () => createShape('text') },
    { label: 'Add Shape', icon: Square, action: () => createShape('rectangle') },
    { label: 'Add Image', icon: Image, action: () => addToast('Image upload coming soon!') },
  ];

  const createShape = (type: string) => {
    if (!editor) return;
    
    try {
      let shape;
      const shapeId = createShapeId();
      
      switch (type) {
        case 'rectangle':
          shape = editor.createShape({
            id: shapeId,
            type: 'geo',
            x: 200,
            y: 200,
            props: {
              geo: 'rectangle',
              w: 100,
              h: 100,
              fill: 'solid',
              color: 'black',
              dash: 'draw',
              size: 'm',
              opacity: 1,
            },
          });
          break;
        case 'text':
          shape = editor.createShape({
            id: shapeId,
            type: 'text',
            x: 200,
            y: 200,
            props: {
              text: 'Click to edit',
              color: 'black',
              font: 'Arial',
              size: 24,
              weight: 'normal',
              style: 'normal',
              align: 'middle',
            },
          });
          break;
      }
      
      if (shape) {
        addToast(`${type} created successfully!`);
      }
    } catch (error) {
      console.error('Error creating shape:', error);
      addToast(`Error creating ${type}: ${error.message}`, { icon: 'error' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-3">
        {/* Quick Action Buttons */}
        {quickActions.map((action, index) => (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            onClick={action.action}
            className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <action.icon className="w-4 h-4 mr-2" />
            {action.label}
          </Button>
        ))}
        
        {/* Main FAB */}
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};
