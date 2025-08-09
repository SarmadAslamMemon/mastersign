// ============================================================================
// TLDRAW CUSTOM TOOLS - SignFlow Integration (TLDraw v2 Compatible)
// ============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Tldraw, 
  TLShape,
  Editor,
  useEditor,
  useToasts,
  TLShapeId,
  createShapeId,
  getDefaultColorTheme,
  TLImageShape,
  TLTextShape,
  TLGeoShape,
} from '@tldraw/tldraw';
import { SignTemplate } from '@/services/TemplateService';

// Context for sharing editor and toast function
interface SignFlowContextType {
  editor: Editor | null;
  addToast: (message: string, options?: { id?: string; icon?: string }) => void;
  loadTemplate: (template: SignTemplate) => void;
  currentTemplate: SignTemplate | null;
  setBackgroundImage: (imageUrl: string) => void;
  backgroundImage: string | null;
}

const SignFlowContext = createContext<SignFlowContextType>({
  editor: null,
  addToast: () => {},
  loadTemplate: () => {},
  currentTemplate: null,
  setBackgroundImage: () => {},
  backgroundImage: null,
});

export const useSignFlowContext = () => useContext(SignFlowContext);

// Custom TLDraw component with SignFlow integration
export const SignFlowTldraw: React.FC<{
  children?: React.ReactNode;
  onShapeCreate?: (shape: TLShape) => void;
  onShapeUpdate?: (shape: TLShape) => void;
  onShapeDelete?: (shapeId: string) => void;
  onSelectionChange?: (shapeIds: string[]) => void;
  templateData?: SignTemplate;
  onTemplateLoad?: (template: SignTemplate) => void;
}> = ({ 
  children, 
  onShapeCreate, 
  onShapeUpdate, 
  onShapeDelete, 
  onSelectionChange,
  templateData,
  onTemplateLoad,
}) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; icon?: string }>>([]);
  const [currentTemplate, setCurrentTemplate] = useState<SignTemplate | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const addToast = (message: string, options?: { id?: string; icon?: string }) => {
    const id = options?.id || `toast-${Date.now()}`;
    const newToast = { id, message, icon: options?.icon };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  // Load template into the editor
  const loadTemplate = (template: SignTemplate) => {
    if (!editor) {
      addToast('Editor not ready yet', { icon: 'error' });
      return;
    }

    try {
      // Clear existing shapes
      const existingShapes = editor.getCurrentPageShapes();
      if (existingShapes.length > 0) {
        editor.deleteShapes(existingShapes.map(shape => shape.id));
      }

      // Set canvas dimensions based on template
      const canvasWidth = template.dimensions.width * 50; // Scale factor
      const canvasHeight = template.dimensions.height * 50;
      
      // Create background frame
      const frameId = createShapeId();
      const frame = editor.createShape({
        id: frameId,
        type: 'frame',
        x: 0,
        y: 0,
        props: {
          w: canvasWidth,
          h: canvasHeight,
          name: template.name,
        },
      });

      // Set background color if template has one
      if (template.backgroundColor) {
        // Create background rectangle with template color
        const backgroundRect = editor.createShape({
          id: createShapeId(),
          type: 'geo',
          x: 0,
          y: 0,
          props: {
            geo: 'rectangle',
            w: canvasWidth,
            h: canvasHeight,
            fill: 'solid',
            color: template.backgroundColor,
            dash: 'draw',
            size: 's',
            opacity: 1,
            isBackground: true,
          },
        });
        
        // Send background to back
        editor.sendToBack([backgroundRect.id]);
      }

      // Set background image if template has one
      if (template.backgroundImage) {
        setBackgroundImage(template.backgroundImage);
        
        // Create background image shape
        const backgroundImageShape = editor.createShape({
          id: createShapeId(),
          type: 'image',
          x: 0,
          y: 0,
          props: {
            w: canvasWidth,
            h: canvasHeight,
            assetId: template.backgroundImage,
            opacity: 0.4, // Semi-transparent background
            isBackground: true,
          },
        });
        
        // Send background image to back
        editor.sendToBack([backgroundImageShape.id]);
      }

      // Load template elements
      template.elements.forEach((element) => {
        try {
          switch (element.type) {
            case 'text':
              const textShape = editor.createShape({
                id: element.id,
                type: 'text',
                x: element.x * 50, // Scale to canvas coordinates
                y: element.y * 50,
                props: {
                  text: element.props.text,
                  color: element.props.color,
                  font: element.props.font,
                  size: element.props.size,
                  weight: element.props.weight,
                  style: element.props.style,
                  align: element.props.align,
                  w: element.props.text.length * (element.props.size / 2), // Approximate width
                  h: element.props.size * 1.2, // Approximate height
                },
              });
              break;

            case 'geo':
              const geoShape = editor.createShape({
                id: element.id,
                type: 'geo',
                x: element.x * 50,
                y: element.y * 50,
                props: {
                  geo: element.props.geo,
                  w: element.props.w * 50,
                  h: element.props.h * 50,
                  fill: element.props.fill,
                  color: element.props.color,
                  dash: element.props.dash,
                  size: element.props.size,
                  opacity: element.props.opacity,
                },
              });
              break;

            case 'image':
              if (element.props.imageUrl) {
                const imageShape = editor.createShape({
                  id: element.id,
                  type: 'image',
                  x: element.x * 50,
                  y: element.y * 50,
                  props: {
                    w: element.props.w * 50,
                    h: element.props.h * 50,
                    assetId: element.props.imageUrl,
                    opacity: element.props.opacity || 1,
                  },
                });
              }
              break;
          }
        } catch (error) {
          console.error(`Error creating element ${element.type}:`, error);
        }
      });

      setCurrentTemplate(template);
      addToast(`Template "${template.name}" loaded successfully!`);
      
      if (onTemplateLoad) {
        onTemplateLoad(template);
      }
    } catch (error) {
      console.error('Error loading template:', error);
      addToast(`Error loading template: ${error.message}`, { icon: 'error' });
    }
  };

  // Handle background image
  const handleBackgroundImage = (imageUrl: string) => {
    setBackgroundImage(imageUrl);
    
    if (editor) {
      // Create or update background image shape
      const existingBackground = editor.getCurrentPageShapes().find(
        shape => shape.type === 'image' && shape.props.isBackground
      );

      if (existingBackground) {
        // Update existing background
        editor.updateShape({
          id: existingBackground.id,
          props: {
            assetId: imageUrl,
          },
        });
      } else {
        // Create new background image
        const backgroundShape = editor.createShape({
          id: createShapeId(),
          type: 'image',
          x: 0,
          y: 0,
          props: {
            w: 800, // Full canvas width
            h: 600, // Full canvas height
            assetId: imageUrl,
            opacity: 0.3, // Semi-transparent background
            isBackground: true,
          },
        });
        
        // Send background to back
        editor.sendToBack([backgroundShape.id]);
      }
    }
  };

  const contextValue: SignFlowContextType = {
    editor,
    addToast,
    loadTemplate,
    currentTemplate,
    setBackgroundImage: handleBackgroundImage,
    backgroundImage,
  };

  // Load template data if provided
  useEffect(() => {
    if (templateData && editor) {
      loadTemplate(templateData);
    }
  }, [templateData, editor]);

  // Test function to create a simple shape using TLDraw v2 API
  const testCreateShape = () => {
    if (editor) {
      try {
        // Create a simple rectangle using TLDraw v2's correct API
        const shapeId = createShapeId();
        const shape = editor.createShape({
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
        console.log('✅ Shape created successfully:', shape);
        addToast('Test shape created successfully!');
      } catch (error) {
        console.error('❌ Error creating test shape:', error);
        addToast(`Error creating shape: ${error.message}`, { icon: 'error' });
      }
    }
  };

  return (
    <SignFlowContext.Provider value={contextValue}>
      <Tldraw
        onMount={(editor) => {
          console.log('🎨 TLDraw editor mounted');
          console.log('🎨 Editor instance:', editor);
          setEditor(editor);
          
          // Basic keyboard shortcuts
          const handleKeyDown = (event: KeyboardEvent) => {
            const { key, ctrlKey, metaKey, shiftKey } = event;
            const isMac = navigator.platform.toUpperCase().includes('MAC');
            const mod = isMac ? metaKey : ctrlKey;
            
            if (key === 'Delete' || key === 'Backspace') {
              event.preventDefault();
              const selectedIds = editor.selectedShapeIds;
              if (selectedIds.length > 0) {
                editor.deleteShapes(selectedIds);
                console.log('Shapes deleted');
              }
            }
            
            if (mod && key === 'z') {
              event.preventDefault();
              if (shiftKey) {
                editor.redo();
                console.log('Redone');
              } else {
                editor.undo();
                console.log('Undone');
              }
            }
            
            if (mod && key === 'a') {
              event.preventDefault();
              editor.selectAll();
              console.log('All shapes selected');
            }

            // Custom SignFlow shortcuts
            if (key === 'b' && !mod && !shiftKey) {
              event.preventDefault();
              // Dispatch custom event to toggle background panel
              window.dispatchEvent(new CustomEvent('toggle-background-panel'));
            }

            if (key === 't' && !mod && !shiftKey) {
              event.preventDefault();
              // Dispatch custom event to toggle template browser
              window.dispatchEvent(new CustomEvent('toggle-template-browser'));
            }
          };

          document.addEventListener('keydown', handleKeyDown);

          return () => {
            document.removeEventListener('keydown', handleKeyDown);
          };
        }}
      >
        {children}
      </Tldraw>
      
      {/* Template Info Display */}
      {currentTemplate && (
        <div className="fixed top-20 left-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs">
          <h3 className="font-semibold text-gray-900 mb-2">Current Template</h3>
          <p className="text-sm text-gray-600 mb-2">{currentTemplate.name}</p>
          <p className="text-xs text-gray-500 mb-3">
            {currentTemplate.dimensions.width}" × {currentTemplate.dimensions.height}"
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentTemplate(null)}
              className="text-xs text-red-600 hover:text-red-800"
            >
              Clear Template
            </button>
            {backgroundImage && (
              <button
                onClick={() => setBackgroundImage(null)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Remove Background
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Test Button */}
      {editor && (
        <button
          onClick={testCreateShape}
          className="fixed top-20 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
        >
          Test Create Shape
        </button>
      )}
      
      {/* Toast Display */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2 max-w-sm"
          >
            <div className="flex items-center space-x-2">
              {toast.icon === 'error' && (
                <div className="w-2 h-2 bg-red-500 rounded-full" />
              )}
              <span className="text-sm text-gray-800">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </SignFlowContext.Provider>
  );
};
