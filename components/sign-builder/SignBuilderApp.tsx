import React, { useState, useRef } from 'react';
import { fabric } from 'fabric';
import SignBuilder from './SignBuilder';
import TemplateManager from './TemplateManager';
import { 
  Edit3, 
  FolderOpen, 
  Download, 
  Save,
  Settings,
  HelpCircle
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description?: string;
  category: string;
  thumbnail?: string;
  objects: any[];
  width: number;
  height: number;
  isCustom: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SignBuilderApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'editor' | 'templates'>('templates');
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [canvasRef, setCanvasRef] = useState<fabric.Canvas | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const handleTemplateSelect = (template: Template) => {
    setCurrentTemplate(template);
    setCurrentView('editor');
  };

  const handleTemplateSave = (template: Template) => {
    setCurrentTemplate(template);
    // Template is already saved to localStorage by TemplateManager
  };

  const handleTemplateDelete = (templateId: string) => {
    if (currentTemplate?.id === templateId) {
      setCurrentTemplate(null);
    }
  };

  const handleSave = (data: any) => {
    // Save design data to localStorage or send to server
    const savedDesigns = JSON.parse(localStorage.getItem('signBuilderDesigns') || '[]');
    const newDesign = {
      id: `design-${Date.now()}`,
      name: `Design ${new Date().toLocaleDateString()}`,
      data,
      template: currentTemplate,
      createdAt: new Date()
    };
    savedDesigns.push(newDesign);
    localStorage.setItem('signBuilderDesigns', JSON.stringify(savedDesigns));
    
    alert('Design saved successfully!');
  };

  const handleExport = (imageData: string) => {
    // Create download link for the exported image
    const link = document.createElement('a');
    link.href = imageData;
    link.download = `sign-design-${Date.now()}.png`;
    link.click();
  };

  const handleEditorReady = (canvas: fabric.Canvas) => {
    setCanvasRef(canvas);
  };

  const loadTemplateToCanvas = (template: Template) => {
    if (canvasRef) {
      canvasRef.clear();
      
      template.objects.forEach(obj => {
        if (obj.type === 'i-text') {
          const text = new fabric.IText(obj.text, {
            left: obj.left,
            top: obj.top,
            fontSize: obj.fontSize,
            fontFamily: obj.fontFamily,
            fill: obj.fill,
            originX: obj.originX,
            originY: obj.originY,
            fontWeight: obj.fontWeight,
            selectable: obj.selectable !== false,
            evented: obj.evented !== false
          });
          canvasRef.add(text);
        } else if (obj.type === 'rect') {
          const rect = new fabric.Rect({
            left: obj.left,
            top: obj.top,
            width: obj.width,
            height: obj.height,
            fill: obj.fill,
            selectable: obj.selectable !== false,
            evented: obj.evented !== false
          });
          canvasRef.add(rect);
        } else if (obj.type === 'image') {
          fabric.Image.fromURL(obj.src, (img) => {
            img.set({
              left: obj.left,
              top: obj.top,
              scaleX: obj.scaleX || 1,
              scaleY: obj.scaleY || 1,
              selectable: obj.selectable !== false,
              evented: obj.evented !== false
            });
            canvasRef.add(img);
            canvasRef.renderAll();
          });
        } else if (obj.type === 'triangle') {
          const triangle = new fabric.Triangle({
            left: obj.left,
            top: obj.top,
            width: obj.width,
            height: obj.height,
            fill: obj.fill,
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth,
            selectable: obj.selectable !== false,
            evented: obj.evented !== false
          });
          canvasRef.add(triangle);
        } else if (obj.type === 'svg') {
          fabric.loadSVGFromString(obj.svgContent, (objects, options) => {
            const svgGroup = fabric.util.groupSVGElements(objects, options);
            svgGroup.set({
              left: obj.left,
              top: obj.top,
              scaleX: obj.scaleX || 1,
              scaleY: obj.scaleY || 1,
              selectable: obj.selectable !== false,
              evented: obj.evented !== false
            });
            canvasRef.add(svgGroup);
            canvasRef.renderAll();
          });
        }
      });
      
      canvasRef.renderAll();
    }
  };

  // Load template when switching to editor
  React.useEffect(() => {
    if (currentView === 'editor' && currentTemplate && canvasRef) {
      loadTemplateToCanvas(currentTemplate);
    }
  }, [currentView, currentTemplate, canvasRef]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">SignFlow Builder</h1>
              <span className="ml-3 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Beta
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Help"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setCurrentView('templates')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'templates'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FolderOpen className="w-4 h-4 mr-2 inline" />
                Templates
              </button>
              
              <button
                onClick={() => setCurrentView('editor')}
                disabled={!currentTemplate}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'editor'
                    ? 'bg-blue-600 text-white'
                    : currentTemplate
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Edit3 className="w-4 h-4 mr-2 inline" />
                Editor
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {currentView === 'templates' ? (
          <TemplateManager
            onTemplateSelect={handleTemplateSelect}
            onTemplateSave={handleTemplateSave}
            onTemplateDelete={handleTemplateDelete}
            currentCanvas={canvasRef}
          />
        ) : (
          <div className="h-[calc(100vh-4rem)]">
            <SignBuilder
              width={currentTemplate?.width || 1200}
              height={currentTemplate?.height || 900}
              onSave={handleSave}
              onExport={handleExport}
            />
          </div>
        )}
      </main>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">SignFlow Builder Help</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Getting Started</h3>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Choose a template from the Template Library</li>
                  <li>Click "Use Template" to open it in the Editor</li>
                  <li>Customize your design using the tools on the left</li>
                  <li>Save your design or export as an image</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Editor Tools</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Text Tool:</strong> Add and edit text elements</li>
                  <li><strong>Shape Tools:</strong> Add rectangles and circles</li>
                  <li><strong>Image Tool:</strong> Upload and add images</li>
                  <li><strong>Properties Panel:</strong> Edit object properties on the right</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Keyboard Shortcuts</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Delete:</strong> Remove selected object</li>
                  <li><strong>Ctrl+C:</strong> Copy selected object</li>
                  <li><strong>Ctrl+V:</strong> Paste copied object</li>
                  <li><strong>Ctrl+Z:</strong> Undo last action</li>
                  <li><strong>Ctrl+Y:</strong> Redo last action</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tips</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Use the grid and snap features for precise alignment</li>
                  <li>Save your work frequently</li>
                  <li>Create custom templates from your designs</li>
                  <li>Export in high resolution for print quality</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowHelp(false)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Floating Button */}
      {currentView === 'editor' && currentTemplate && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleSave(canvasRef?.toJSON())}
              className="p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
              title="Save Design"
            >
              <Save className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => handleExport(canvasRef?.toDataURL() || '')}
              className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              title="Export Image"
            >
              <Download className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setCurrentView('templates')}
              className="p-3 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"
              title="Back to Templates"
            >
              <FolderOpen className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignBuilderApp;
