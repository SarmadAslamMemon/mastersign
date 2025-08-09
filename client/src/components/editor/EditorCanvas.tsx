import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SignFlowTldraw } from '../tldraw/SignFlowTools';
import { useEditorState } from './hooks/useEditorState';
import { useTldrawEditor } from './hooks/useTldrawEditor';
import { Button } from '@/components/ui/button';
import { Type, Square, Image, Palette, FolderOpen, Copy, Layers, Trash2 } from 'lucide-react';

export const EditorCanvas: React.FC = () => {
  const { 
    currentTemplate, 
    setShowBackgroundPanel, 
    setIsTemplateBrowserOpen,
    showGrid
  } = useEditorState();
     const { editor } = useTldrawEditor();
   const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
   const [isLoading, setIsLoading] = useState(false);
      const [isEditorReady, setIsEditorReady] = useState(false);

   // Check when editor is ready
   useEffect(() => {
     if (editor && editor.selectedShapeIds && typeof editor.createShape === 'function') {
       setIsEditorReady(true);
     } else {
       setIsEditorReady(false);
     }
   }, [editor]);

   const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

        const createShape = (type: string) => {
     if (!editor || !editor.createShapeId) return;
     
     try {
       const shapeId = editor.createShapeId();
       let shape;
       
       switch (type) {
         case 'text':
           if (!editor.createShape) return;
           shape = editor.createShape({
             id: shapeId,
             type: 'text',
             x: contextMenu?.x || 100,
             y: contextMenu?.y || 100,
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
         case 'rectangle':
           if (!editor.createShape) return;
           shape = editor.createShape({
             id: shapeId,
             type: 'geo',
             x: contextMenu?.x || 100,
             y: contextMenu?.y || 100,
             props: {
               geo: 'rectangle',
               w: 100,
               h: 100,
               fill: 'solid',
               color: 'black',
               dash: 'draw',
               size: 'm',
             },
           });
           break;
       }
      
      if (shape) {
        closeContextMenu();
      }
    } catch (error) {
      console.error('Error creating shape:', error);
    }
  };

  const handleTemplateLoad = (template: any) => {
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
      console.log('Template loaded:', template);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full bg-white relative"
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
    >
      {/* Main Canvas Playground */}
      <div className="w-full h-full bg-white relative overflow-hidden">
        {/* Canvas Grid Background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="canvas-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
              </pattern>
              <pattern id="canvas-grid-minor" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f8f8f8" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#canvas-grid-minor)" />
            <rect width="100%" height="100%" fill="url(#canvas-grid)" />
          </svg>
        </div>

        {/* Canvas Content Area */}
        <div className="relative w-full h-full">
          {/* Template Canvas - Shows when template is loaded */}
          {currentTemplate && (
            <div 
              className="absolute border-2 border-dashed border-blue-300 bg-blue-50/30"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${currentTemplate.dimensions.width * 20}px`,
                height: `${currentTemplate.dimensions.height * 20}px`,
              }}
            >
              <div className="absolute top-2 left-2 text-xs text-blue-600 bg-white px-2 py-1 rounded">
                {currentTemplate.name} ({currentTemplate.dimensions.width}" × {currentTemplate.dimensions.height}")
              </div>
            </div>
          )}

          {/* Drop Zone Instructions */}
          {!currentTemplate && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-lg font-medium">Select a template to start designing</p>
                <p className="text-sm">Or drag and drop elements here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Welcome Message - Show when no template is loaded */}
      {!currentTemplate && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="text-6xl mb-6">🎨</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to SignFlow Studio</h2>
            <p className="text-gray-600 mb-6">
              Create professional signs with our powerful design tools. Start with a template or create from scratch.
            </p>
            <div className="space-y-3 text-sm text-gray-500">
              <div className="flex items-center justify-center space-x-2">
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">T</kbd>
                <span>Browse templates</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">B</kbd>
                <span>Set background</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span>Use the sidebar tools to add shapes and text</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span>Right-click on canvas for quick actions</span>
              </div>
            </div>
          </div>
        </div>
      )}

             {/* Context Menu */}
       {contextMenu && isEditorReady && (
        <div 
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[200px]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <div className="text-xs text-gray-500 px-3 py-2 border-b border-gray-200 mb-2">
            Quick Actions
          </div>
          
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => createShape('text')}
              className="w-full justify-start text-sm"
            >
              <Type className="w-4 h-4 mr-2" />
              Add Text
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => createShape('rectangle')}
              className="w-full justify-start text-sm"
            >
              <Square className="w-4 h-4 mr-2" />
              Add Rectangle
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowBackgroundPanel(true);
                closeContextMenu();
              }}
              className="w-full justify-start text-sm"
            >
              <Palette className="w-4 h-4 mr-2" />
              Set Background
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsTemplateBrowserOpen(true);
                closeContextMenu();
              }}
              className="w-full justify-start text-sm"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Browse Templates
            </Button>
          </div>
        </div>
      )}

             {/* Mini Toolbar - Appears when shapes are selected */}
       {isEditorReady && editor && editor.selectedShapeIds && editor.selectedShapeIds.length > 0 && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex items-center space-x-2">
                         <Button
               variant="ghost"
               size="sm"
               onClick={() => editor.duplicateShapes && editor.duplicateShapes(editor.selectedShapeIds)}
               className="h-8 px-3 text-xs"
               title="Duplicate"
             >
              <Copy className="w-3 h-3 mr-1" />
              Duplicate
            </Button>
            
                         <Button
               variant="ghost"
               size="sm"
               onClick={() => editor.bringToFront && editor.bringToFront(editor.selectedShapeIds)}
               className="h-8 px-3 text-xs"
               title="Bring to Front"
             >
              <Layers className="w-3 h-3 mr-1" />
              Front
            </Button>
            
                         <Button
               variant="ghost"
               size="sm"
               onClick={() => editor.sendToBack && editor.sendToBack(editor.selectedShapeIds)}
               className="h-8 px-3 text-xs"
               title="Send to Back"
             >
              <Layers className="w-3 h-3 mr-1" />
              Back
            </Button>
            
            <div className="w-px h-6 bg-gray-300"></div>
            
                         <Button
               variant="ghost"
               size="sm"
               onClick={() => editor.deleteShapes && editor.deleteShapes(editor.selectedShapeIds)}
               className="h-8 px-3 text-xs text-red-600 hover:text-red-800"
               title="Delete"
             >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Grid Overlay */}
      {showGrid && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )}

      {/* Test Button - Temporary for debugging */}
      <div className="absolute bottom-4 right-4 z-50">
        <Button
          onClick={() => createShape('rectangle')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
        >
          Test Create Rectangle
        </Button>
      </div>
    </motion.div>
  );
};
