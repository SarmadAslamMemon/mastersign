import React, { useState, useRef, useEffect, useCallback } from 'react';
import { fabric } from 'fabric';
import { ChromePicker } from 'react-color';
import { 
  Download, 
  Save, 
  Upload, 
  Type, 
  Image as ImageIcon, 
  Square, 
  Circle, 
  Trash2,
  Layers,
  Move,
  RotateCcw,
  Copy,
  Paste,
  Undo,
  Redo
} from 'lucide-react';

interface SignBuilderProps {
  width?: number;
  height?: number;
  onSave?: (data: any) => void;
  onExport?: (imageData: string) => void;
  onEditorReady?: (canvas: fabric.Canvas) => void;
  template?: Template;
}

interface TemplateObject {
  type: string;
  [key: string]: any;
}

interface Template {
  id: string;
  name: string;
  objects: TemplateObject[];
  width: number;
  height: number;
}

const SignBuilder: React.FC<SignBuilderProps> = ({
  width = 1200,
  height = 900,
  onSave,
  onExport,
  onEditorReady,
  template
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showObjectColorPicker, setShowObjectColorPicker] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [showLayerPanel, setShowLayerPanel] = useState(false);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      try {
        const canvas = new fabric.Canvas(canvasRef.current, {
          width,
          height,
          backgroundColor: '#ffffff',
          preserveObjectStacking: true,
          selection: true,
          allowTouchScrolling: false
        });

        fabricCanvasRef.current = canvas;

        // Event listeners
        canvas.on('selection:created', handleSelection);
        canvas.on('selection:updated', handleSelection);
        canvas.on('selection:cleared', () => setSelectedObject(null));
        canvas.on('object:modified', saveToHistory);
        canvas.on('object:added', saveToHistory);
        canvas.on('object:removed', saveToHistory);

        // Load default templates
        loadDefaultTemplates();
        
        // Notify parent that editor is ready
        if (onEditorReady) {
          onEditorReady(canvas);
        }
        
        // Save initial state
        saveToHistory();
      } catch (error) {
        console.error('Failed to initialize canvas:', error);
      }
    }

    return () => {
      if (fabricCanvasRef.current) {
        try {
          fabricCanvasRef.current.dispose();
        } catch (error) {
          console.warn('Failed to dispose canvas:', error);
        }
        fabricCanvasRef.current = null;
      }
    };
  }, [width, height, onEditorReady]);

  const loadDefaultTemplates = () => {
    const defaultTemplates: Template[] = [
      {
        id: 'blank',
        name: 'Blank Canvas',
        width,
        height,
        objects: []
      },
      {
        id: 'business-sign',
        name: 'Business Sign',
        width,
        height,
        objects: [
          {
            type: 'rect',
            left: 0,
            top: 0,
            width: width,
            height: height,
            fill: '#f8f9fa',
            selectable: false,
            evented: false
          },
          {
            type: 'i-text',
            left: width / 2,
            top: height / 2 - 100,
            text: 'BUSINESS NAME',
            fontSize: 72,
            fontFamily: 'Arial',
            fill: '#2c3e50',
            originX: 'center',
            originY: 'center',
            fontWeight: 'bold'
          },
          {
            type: 'i-text',
            left: width / 2,
            top: height / 2 + 50,
            text: 'Tagline or Description',
            fontSize: 36,
            fontFamily: 'Arial',
            fill: '#7f8c8d',
            originX: 'center',
            originY: 'center'
          }
        ]
      },
      {
        id: 'event-sign',
        name: 'Event Sign',
        width,
        height,
        objects: [
          {
            type: 'rect',
            left: 0,
            top: 0,
            width: width,
            height: height,
            fill: '#e74c3c',
            selectable: false,
            evented: false
          },
          {
            type: 'i-text',
            left: width / 2,
            top: height / 2 - 80,
            text: 'EVENT TITLE',
            fontSize: 80,
            fontFamily: 'Arial',
            fill: '#ffffff',
            originX: 'center',
            originY: 'center',
            fontWeight: 'bold'
          },
          {
            type: 'i-text',
            left: width / 2,
            top: height / 2 + 80,
            text: 'Date • Time • Location',
            fontSize: 32,
            fontFamily: 'Arial',
            fill: '#ffffff',
            originX: 'center',
            originY: 'center'
          }
        ]
      }
    ];

    setTemplates(defaultTemplates);
    setCurrentTemplate(defaultTemplates[0]);
  };

  const handleSelection = (e: any) => {
    const activeObject = e.selected?.[0] || e.target;
    setSelectedObject(activeObject);
  };

  const saveToHistory = () => {
    if (fabricCanvasRef.current && fabricCanvasRef.current.getContext()) {
      try {
        const json = fabricCanvasRef.current.toJSON();
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(json);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      } catch (error) {
        console.warn('Failed to save to history:', error);
      }
    }
  };

  const loadTemplate = (template: Template) => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
      
      // Set canvas dimensions to match template
      fabricCanvasRef.current.setDimensions({
        width: template.width,
        height: template.height
      });
      
      // Reset color picker states to prevent undefined errors
      setShowColorPicker(false);
      setShowObjectColorPicker(false);
      
      template.objects.forEach(obj => {
        if (obj.type === 'i-text') {
          const text = new fabric.IText(obj.text, {
            left: obj.left,
            top: obj.top,
            fontSize: obj.fontSize,
            fontFamily: obj.fontFamily,
            fill: obj.fill || '#000000',
            originX: obj.originX,
            originY: obj.originY,
            fontWeight: obj.fontWeight,
            fontStyle: obj.fontStyle,
            selectable: obj.selectable !== false,
            evented: obj.evented !== false
          });
          fabricCanvasRef.current!.add(text);
        } else if (obj.type === 'rect') {
          const rect = new fabric.Rect({
            left: obj.left,
            top: obj.top,
            width: obj.width,
            height: obj.height,
            fill: obj.fill || '#000000',
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth,
            selectable: obj.selectable !== false,
            evented: obj.evented !== false
          });
          fabricCanvasRef.current!.add(rect);
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
            fabricCanvasRef.current!.add(img);
            fabricCanvasRef.current!.renderAll();
          });
        } else if (obj.type === 'triangle') {
          const triangle = new fabric.Triangle({
            left: obj.left,
            top: obj.top,
            width: obj.width,
            height: obj.height,
            fill: obj.fill || '#000000',
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth,
            selectable: obj.selectable !== false,
            evented: obj.evented !== false
          });
          fabricCanvasRef.current!.add(triangle);
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
            fabricCanvasRef.current!.add(svgGroup);
            fabricCanvasRef.current!.renderAll();
          });
        }
      });

      fabricCanvasRef.current.renderAll();
      setCurrentTemplate(template);
      setSelectedObject(null); // Clear selection when loading template
      saveToHistory();
    }
  };

  // Effect to handle template changes from parent
  useEffect(() => {
    if (template && fabricCanvasRef.current) {
      loadTemplate(template);
    }
  }, [template]);

  const clearCanvas = () => {
    if (isCanvasReady()) {
      try {
        fabricCanvasRef.current!.clear();
        // Reset to default dimensions
        fabricCanvasRef.current!.setDimensions({
          width: 1200,
          height: 900
        });
        setCurrentTemplate(null);
        saveToHistory();
      } catch (error) {
        console.warn('Failed to clear canvas:', error);
      }
    }
  };

  const addText = () => {
    if (fabricCanvasRef.current && fabricCanvasRef.current.getContext()) {
      try {
        const text = new fabric.IText('New Text', {
          left: 100,
          top: 100,
          fontSize,
          fontFamily,
          fill: selectedColor,
          originX: 'left',
          originY: 'top'
        });
        
        fabricCanvasRef.current.add(text);
        fabricCanvasRef.current.setActiveObject(text);
        fabricCanvasRef.current.renderAll();
        saveToHistory();
      } catch (error) {
        console.warn('Failed to add text:', error);
      }
    }
  };

  const addRectangle = () => {
    if (isCanvasReady()) {
      try {
        const rect = new fabric.Rect({
          left: 100,
          top: 100,
          width: 200,
          height: 100,
          fill: selectedColor,
          stroke: '#000000',
          strokeWidth: 2
        });
        
        fabricCanvasRef.current!.add(rect);
        fabricCanvasRef.current!.setActiveObject(rect);
        fabricCanvasRef.current!.renderAll();
        saveToHistory();
      } catch (error) {
        console.warn('Failed to add rectangle:', error);
      }
    }
  };

  const addCircle = () => {
    if (fabricCanvasRef.current) {
      const circle = new fabric.Circle({
        left: 100,
        top: 100,
        radius: 50,
        fill: selectedColor,
        stroke: '#000000',
        strokeWidth: 2
      });
      
      fabricCanvasRef.current.add(circle);
      fabricCanvasRef.current.setActiveObject(circle);
      fabricCanvasRef.current.renderAll();
      saveToHistory();
    }
  };

  const addTriangle = () => {
    if (fabricCanvasRef.current) {
      const triangle = new fabric.Triangle({
        left: 100,
        top: 100,
        width: 100,
        height: 100,
        fill: selectedColor,
        stroke: '#000000',
        strokeWidth: 2
      });
      
      fabricCanvasRef.current.add(triangle);
      fabricCanvasRef.current.setActiveObject(triangle);
      fabricCanvasRef.current.renderAll();
      saveToHistory();
    }
  };

  const addSVG = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.svg';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file && fabricCanvasRef.current) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          fabric.loadSVGFromString(event.target.result, (objects, options) => {
            const svgGroup = fabric.util.groupSVGElements(objects, options);
            svgGroup.set({
              left: 100,
              top: 100,
              scaleX: 0.5,
              scaleY: 0.5
            });
            fabricCanvasRef.current!.add(svgGroup);
            fabricCanvasRef.current!.setActiveObject(svgGroup);
            fabricCanvasRef.current!.renderAll();
            saveToHistory();
          });
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file && fabricCanvasRef.current) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          fabric.Image.fromURL(event.target.result, (img) => {
            img.scaleToWidth(200);
            img.set({
              left: 100,
              top: 100
            });
            fabricCanvasRef.current!.add(img);
            fabricCanvasRef.current!.setActiveObject(img);
            fabricCanvasRef.current!.renderAll();
            saveToHistory();
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const deleteSelected = () => {
    if (fabricCanvasRef.current && selectedObject && fabricCanvasRef.current.getContext()) {
      try {
        fabricCanvasRef.current.remove(selectedObject);
        fabricCanvasRef.current.renderAll();
        setSelectedObject(null);
        saveToHistory();
      } catch (error) {
        console.warn('Failed to delete object:', error);
      }
    }
  };

  const duplicateSelected = () => {
    if (fabricCanvasRef.current && selectedObject) {
      selectedObject.clone((cloned: fabric.Object) => {
        cloned.set({
          left: (cloned.left || 0) + 20,
          top: (cloned.top || 0) + 20
        });
        fabricCanvasRef.current!.add(cloned);
        fabricCanvasRef.current!.setActiveObject(cloned);
        fabricCanvasRef.current!.renderAll();
        saveToHistory();
      });
    }
  };

  const bringToFront = () => {
    if (fabricCanvasRef.current && selectedObject) {
      selectedObject.bringToFront();
      fabricCanvasRef.current.renderAll();
      saveToHistory();
    }
  };

  const sendToBack = () => {
    if (fabricCanvasRef.current && selectedObject) {
      selectedObject.sendToBack();
      fabricCanvasRef.current.renderAll();
      saveToHistory();
    }
  };

  const bringForward = () => {
    if (fabricCanvasRef.current && selectedObject) {
      selectedObject.bringForward();
      fabricCanvasRef.current.renderAll();
      saveToHistory();
    }
  };

  const sendBackward = () => {
    if (fabricCanvasRef.current && selectedObject) {
      selectedObject.sendBackwards();
      fabricCanvasRef.current.renderAll();
      saveToHistory();
    }
  };

  const updateSelectedObject = (updates: any) => {
    if (fabricCanvasRef.current && selectedObject) {
      selectedObject.set(updates);
      fabricCanvasRef.current.renderAll();
      saveToHistory();
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.loadFromJSON(history[newIndex], () => {
          fabricCanvasRef.current!.renderAll();
        });
      }
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.loadFromJSON(history[newIndex], () => {
          fabricCanvasRef.current!.renderAll();
        });
      }
    }
  };

  const exportImage = () => {
    if (fabricCanvasRef.current && onExport) {
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2
      });
      onExport(dataURL);
    }
  };

  const saveDesign = () => {
    if (fabricCanvasRef.current && onSave) {
      const jsonData = fabricCanvasRef.current.toJSON(['selectable', 'evented']);
      onSave(jsonData);
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Helper function to get safe color value
  const getSafeColor = (color: any): string => {
    if (typeof color === 'string' && color.startsWith('#')) {
      return color;
    }
    return '#000000';
  };

  // Helper function to check if canvas is ready
  const isCanvasReady = (): boolean => {
    return !!(fabricCanvasRef.current && fabricCanvasRef.current.getContext());
  };

  // Ensure color state is always valid
  useEffect(() => {
    if (!selectedColor || typeof selectedColor !== 'string' || !selectedColor.startsWith('#')) {
      setSelectedColor('#000000');
    }
  }, [selectedColor]);

  // Close color pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showColorPicker || showObjectColorPicker) {
        setShowColorPicker(false);
        setShowObjectColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker, showObjectColorPicker]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Toolbar */}
      <div className="w-16 bg-white shadow-lg flex flex-col items-center py-4 space-y-4">
        <button
          onClick={addText}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Add Text"
        >
          <Type className="w-6 h-6" />
        </button>
        
        <button
          onClick={addRectangle}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Add Rectangle"
        >
          <Square className="w-6 h-6" />
        </button>
        
        <button
          onClick={addCircle}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Add Circle"
        >
          <Circle className="w-6 h-6" />
        </button>
        
        <button
          onClick={addTriangle}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Add Triangle"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-4 h-4 bg-current transform rotate-45"></div>
          </div>
        </button>
        
        <button
          onClick={addImage}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Add Image"
        >
          <ImageIcon className="w-6 h-6" />
        </button>
        
        <button
          onClick={addSVG}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Add SVG"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-xs font-bold">SVG</span>
          </div>
        </button>
        
        <button
          onClick={clearCanvas}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Clear Canvas"
        >
          <Trash2 className="w-6 h-6" />
        </button>
        
        <div className="border-t border-gray-200 w-8 my-2"></div>
        
        <button
          onClick={undo}
          disabled={!canUndo}
          className={`p-3 rounded-lg transition-colors ${
            canUndo ? 'hover:bg-gray-100' : 'text-gray-400 cursor-not-allowed'
          }`}
          title="Undo"
        >
          <Undo className="w-6 h-6" />
        </button>
        
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`p-3 rounded-lg transition-colors ${
            canRedo ? 'hover:bg-gray-100' : 'text-gray-400 cursor-not-allowed'
          }`}
          title="Redo"
        >
          <Redo className="w-6 h-6" />
        </button>
        
        <div className="border-t border-gray-200 w-8 my-2"></div>
        
        <button
          onClick={saveDesign}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Save Design"
        >
          <Save className="w-6 h-6" />
        </button>
        
        <button
          onClick={exportImage}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Export Image"
        >
          <Download className="w-6 h-6" />
        </button>
        
        <div className="border-t border-gray-200 w-8 my-2"></div>
        
        <button
          onClick={() => setShowLayerPanel(!showLayerPanel)}
          className={`p-3 rounded-lg transition-colors ${
            showLayerPanel ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
          }`}
          title="Layer Panel"
        >
          <Layers className="w-6 h-6" />
        </button>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center px-6 space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Template:</span>
                         <select
               value={currentTemplate?.id || ''}
               onChange={(e) => {
                 const template = templates.find(t => t.id === e.target.value);
                 if (template) loadTemplate(template);
               }}
               className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-900"
             >
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Font:</span>
                         <select
               value={fontFamily}
               onChange={(e) => setFontFamily(e.target.value)}
               className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-900"
             >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Size:</span>
                         <input
               type="number"
               value={fontSize}
               onChange={(e) => setFontSize(Number(e.target.value))}
               className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm text-gray-900"
               min="8"
               max="200"
             />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Color:</span>
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-8 h-8 border border-gray-300 rounded-md"
                style={{ backgroundColor: selectedColor }}
              />
                             {showColorPicker && (
                 <div className="absolute top-full left-0 mt-2 z-50">
                   <ChromePicker
                     color={selectedColor || '#000000'}
                     onChange={(color) => {
                       if (color && color.hex) {
                         setSelectedColor(color.hex);
                         if (selectedObject) {
                           updateSelectedObject({ fill: color.hex });
                         }
                       }
                     }}
                   />
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>

                                                                                                                                                                              {/* Right Properties Panel */}
               <div className="w-80 bg-white shadow-lg border-l border-gray-200 p-6 text-gray-900">
         {showLayerPanel ? (
                       <div>
              <div className="bg-gradient-to-r from-green-800 to-green-900 text-white p-4 rounded-lg mb-6">
                <h3 className="text-xl font-bold">Layer Management</h3>
                <p className="text-green-300 text-sm mt-1">Organize and control your design elements</p>
              </div>
             <div className="space-y-2 max-h-96 overflow-y-auto">
               {fabricCanvasRef.current?.getObjects().map((obj, index) => (
                 <div
                   key={index}
                   className={`p-2 rounded border cursor-pointer ${
                     selectedObject === obj ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'
                   }`}
                   onClick={() => {
                     fabricCanvasRef.current?.setActiveObject(obj);
                     setSelectedObject(obj);
                   }}
                 >
                   <div className="flex items-center justify-between">
                     <span className="text-sm font-medium">
                       {obj.type === 'i-text' ? 'Text' : 
                        obj.type === 'rect' ? 'Rectangle' :
                        obj.type === 'circle' ? 'Circle' :
                        obj.type === 'triangle' ? 'Triangle' :
                        obj.type === 'image' ? 'Image' :
                        obj.type === 'group' ? 'SVG Group' : 'Object'}
                     </span>
                     <div className="flex space-x-1">
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           obj.bringToFront();
                           fabricCanvasRef.current?.renderAll();
                           saveToHistory();
                         }}
                         className="p-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                         title="Bring to Front"
                       >
                         ↑
                       </button>
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           obj.sendToBack();
                           fabricCanvasRef.current?.renderAll();
                           saveToHistory();
                         }}
                         className="p-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                         title="Send to Back"
                       >
                         ↓
                       </button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         ) : (
                       <div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-lg mb-6">
                <h3 className="text-xl font-bold">Object Properties</h3>
                <p className="text-gray-300 text-sm mt-1">Customize your selected object</p>
              </div>
             
                           {selectedObject ? (
                <div className="space-y-6">
                                                       <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Position
                      </label>
                    <div className="grid grid-cols-2 gap-3">
                                             <div>
                         <label className="block text-xs text-gray-700 mb-1 font-medium">X Position</label>
                         <input
                           type="number"
                           value={Math.round(selectedObject.left || 0)}
                           onChange={(e) => updateSelectedObject({ left: Number(e.target.value) })}
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                           placeholder="0"
                         />
                       </div>
                       <div>
                         <label className="block text-xs text-gray-700 mb-1 font-medium">Y Position</label>
                         <input
                           type="number"
                           value={Math.round(selectedObject.top || 0)}
                           onChange={(e) => updateSelectedObject({ top: Number(e.target.value) })}
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                           placeholder="0"
                         />
                       </div>
                    </div>
                  </div>
                 
                                   {selectedObject.type === 'i-text' && (
                    <>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <label className="block text-sm font-semibold text-blue-800 mb-3">
                          Text Content
                        </label>
                                                 <textarea
                           value={(selectedObject as fabric.IText).text || ''}
                           onChange={(e) => updateSelectedObject({ text: e.target.value })}
                           className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                           rows={3}
                           placeholder="Enter text content..."
                         />
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <label className="block text-sm font-semibold text-purple-800 mb-3">
                          Font Settings
                        </label>
                        <div className="space-y-3">
                                                     <div>
                             <label className="block text-xs text-purple-700 mb-1 font-medium">Font Size</label>
                             <input
                               type="number"
                               value={(selectedObject as fabric.IText).fontSize || 48}
                               onChange={(e) => updateSelectedObject({ fontSize: Number(e.target.value) })}
                               className="w-full px-3 py-2 border border-purple-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                               min="8"
                               max="200"
                             />
                           </div>
                           
                           <div>
                             <label className="block text-xs text-purple-700 mb-1 font-medium">Font Family</label>
                             <select
                               value={(selectedObject as fabric.IText).fontFamily || 'Arial'}
                               onChange={(e) => updateSelectedObject({ fontFamily: e.target.value })}
                               className="w-full px-3 py-2 border border-purple-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                             >
                              <option value="Arial">Arial</option>
                              <option value="Helvetica">Helvetica</option>
                              <option value="Times New Roman">Times New Roman</option>
                              <option value="Georgia">Georgia</option>
                              <option value="Verdana">Verdana</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                 
                                                                       <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                     <label className="block text-sm font-semibold text-orange-800 mb-3">
                       Fill Color
                     </label>
                     <div className="relative">
                       <button
                         onClick={() => setShowObjectColorPicker(!showObjectColorPicker)}
                         className="w-full h-12 border-2 border-orange-300 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
                         style={{ backgroundColor: getSafeColor(selectedObject.fill) }}
                       >
                         <span className="text-white text-sm font-semibold drop-shadow-lg">
                           {getSafeColor(selectedObject.fill)}
                         </span>
                       </button>
                       {showObjectColorPicker && (
                         <div className="absolute top-full left-0 mt-3 z-50 shadow-2xl rounded-lg overflow-hidden">
                           <ChromePicker
                             color={getSafeColor(selectedObject.fill)}
                             onChange={(color) => {
                               if (color && color.hex) {
                                 updateSelectedObject({ fill: color.hex });
                               }
                             }}
                           />
                         </div>
                       )}
                     </div>
                   </div>
                 
                                   <div className="space-y-4">
                    <div className="space-y-3">
                      <button
                        onClick={duplicateSelected}
                        className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-3"
                      >
                        <Copy className="w-5 h-5" />
                        <span>Duplicate Object</span>
                      </button>
                      
                      <button
                        onClick={deleteSelected}
                        className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-3"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span>Delete Object</span>
                      </button>
                    </div>
                   
                                                           <div className="border-t border-gray-200 pt-4">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Layer Order
                      </label>
                      <div className="space-y-2">
                        <button
                          onClick={bringToFront}
                          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                        >
                          <span className="text-lg">↑</span>
                          <span>Bring to Front</span>
                        </button>
                        <button
                          onClick={bringForward}
                          className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                        >
                          <span className="text-lg">↗</span>
                          <span>Bring Forward</span>
                        </button>
                        <button
                          onClick={sendBackward}
                          className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                        >
                          <span className="text-lg">↙</span>
                          <span>Send Backward</span>
                        </button>
                        <button
                          onClick={sendToBack}
                          className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                        >
                          <span className="text-lg">↓</span>
                          <span>Send to Back</span>
                        </button>
                      </div>
                    </div>
                 </div>
               </div>
                           ) : (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border-2 border-dashed border-blue-300">
                    <Layers className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">No Object Selected</h4>
                    <p className="text-blue-600 text-sm">Click on any object in the canvas to edit its properties</p>
                  </div>
                </div>
              )}
           </div>
         )}
       </div>
     </div>
      );
 };

 export default SignBuilder;
