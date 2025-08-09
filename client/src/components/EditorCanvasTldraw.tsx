// ============================================================================
// EDITOR CANVAS TLDRAW - Main Editor Component
// ============================================================================

import React, { useState, useContext } from 'react';
import { SignFlowTldraw } from './tldraw/SignFlowTools';
import { SignFlowTopToolbar, SignFlowSidebar, SignFlowFAB } from './tldraw/SignFlowUI';
import { TemplateBrowser } from './TemplateBrowser';
import { SignTemplate } from '@/services/TemplateService';
import { Button } from '@/components/ui/button';
import { FolderOpen, Image, Settings, Upload, Palette } from 'lucide-react';
import { useSignFlowContext } from './tldraw/SignFlowTools';

export const EditorCanvasTldraw: React.FC = () => {
  const [isTemplateBrowserOpen, setIsTemplateBrowserOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<SignTemplate | null>(null);
  const [showBackgroundPanel, setShowBackgroundPanel] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(null);

  const { setBackgroundImage, editor } = useSignFlowContext();

  const handleTemplateSelect = (template: SignTemplate) => {
    setCurrentTemplate(template);
    setIsTemplateBrowserOpen(false);
    
    // Set background color from template
    if (template.backgroundColor) {
      setBackgroundColor(template.backgroundColor);
    }
  };

  const handleTemplateLoad = (template: SignTemplate) => {
    setCurrentTemplate(template);
    
    // Set background color from template
    if (template.backgroundColor) {
      setBackgroundColor(template.backgroundColor);
    }
  };

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
    
    if (editor) {
      // Find existing background rectangle
      const existingBackground = editor.getCurrentPageShapes().find(
        shape => shape.type === 'geo' && shape.props.isBackground
      );

      if (existingBackground) {
        // Update existing background
        editor.updateShape({
          id: existingBackground.id,
          props: {
            color: color,
          },
        });
      } else {
        // Create new background rectangle
        const backgroundRect = editor.createShape({
          id: editor.createShapeId(),
          type: 'geo',
          x: 0,
          y: 0,
          props: {
            geo: 'rectangle',
            w: 800,
            h: 600,
            fill: 'solid',
            color: color,
            dash: 'draw',
            size: 's',
            isBackground: true,
          },
        });
        
        // Send background to back
        editor.sendToBack([backgroundRect.id]);
      }
    }
  };

  const handleBackgroundImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBackgroundImageFile(file);
      
      // Create object URL for the image
      const imageUrl = URL.createObjectURL(file);
      
      // Set background image in editor
      if (setBackgroundImage) {
        setBackgroundImage(imageUrl);
      }
    }
  };

  const removeBackgroundImage = () => {
    setBackgroundImageFile(null);
    
    if (editor) {
      // Find and remove background image shapes
      const backgroundImages = editor.getCurrentPageShapes().filter(
        shape => shape.type === 'image' && shape.props.isBackground
      );
      
      if (backgroundImages.length > 0) {
        editor.deleteShapes(backgroundImages.map(shape => shape.id));
      }
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <SignFlowSidebar />
      
      {/* Top Toolbar */}
      <SignFlowTopToolbar />
      
      {/* Template Controls */}
      <div className="fixed top-16 left-80 right-0 z-40 bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setIsTemplateBrowserOpen(true)}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Browse Templates</span>
            </Button>
            
            {currentTemplate && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Current:</span>
                <span className="font-medium">{currentTemplate.name}</span>
                <span className="text-gray-400">
                  ({currentTemplate.dimensions.width}" × {currentTemplate.dimensions.height}")
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setShowBackgroundPanel(!showBackgroundPanel)}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Image className="w-4 h-4" />
              <span>Background</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background Panel */}
      {showBackgroundPanel && (
        <div className="fixed top-32 left-80 right-4 z-30 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Background Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Palette className="w-4 h-4 inline mr-2" />
                Background Color
              </label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => handleBackgroundColorChange(e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Upload className="w-4 h-4 inline mr-2" />
                Background Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundImageUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {backgroundImageFile && (
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xs text-gray-500 truncate">
                    {backgroundImageFile.name}
                  </span>
                  <Button
                    onClick={removeBackgroundImage}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-800 text-xs"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Background Presets */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Presets
            </label>
            <div className="flex space-x-2">
              {['#ffffff', '#f3f4f6', '#1f2937', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                <button
                  key={color}
                  onClick={() => handleBackgroundColorChange(color)}
                  className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Main Canvas Area */}
      <div className="fixed top-32 left-80 right-0 bottom-0">
        <SignFlowTldraw
          templateData={currentTemplate}
          onTemplateLoad={handleTemplateLoad}
        >
          {/* TLDraw will render its canvas here */}
        </SignFlowTldraw>
      </div>
      
      {/* Floating Action Button */}
      <SignFlowFAB />
      
      {/* Template Browser Modal */}
      <TemplateBrowser
        isOpen={isTemplateBrowserOpen}
        onClose={() => setIsTemplateBrowserOpen(false)}
        onTemplateSelect={handleTemplateSelect}
      />
    </div>
  );
};
