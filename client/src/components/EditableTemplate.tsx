import React, { useState, useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit, 
  Type, 
  Image as ImageIcon, 
  Palette, 
  Settings, 
  X, 
  Save, 
  Undo, 
  Redo,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Template, EditableElement } from '@/services/TemplateService';

interface EditableTemplateProps {
  template: Template;
  onSave: (template: Template) => void;
  onClose: () => void;
}

const EditableTemplate: React.FC<EditableTemplateProps> = ({ template, onSave, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [selectedElement, setSelectedElement] = useState<EditableElement | null>(null);
  const [showProperties, setShowProperties] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState<Template>(template);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Initialize canvas with template
  useEffect(() => {
    if (!canvasRef.current || !template) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: template.width * 10, // Scale for display
      height: template.height * 10,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
      selection: true
    });

    fabricRef.current = canvas;

    // Load template elements
    loadTemplateElements();

    return () => {
      canvas.dispose();
    };
  }, [template]);

  const loadTemplateElements = () => {
    const canvas = fabricRef.current;
    if (!canvas || !template) return;

    canvas.clear();

    // Add background
    const background = new fabric.Rect({
      left: 0,
      top: 0,
      width: template.width * 10,
      height: template.height * 10,
      fill: '#ffffff',
      selectable: false,
      evented: false
    });
    canvas.add(background);

    // Add template elements
    template.elements.forEach(element => {
      addElementToCanvas(element);
    });

    canvas.renderAll();
  };

  const addElementToCanvas = (element: EditableElement) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    let fabricObject: fabric.Object;

    switch (element.type) {
      case 'text':
        fabricObject = new fabric.Text(element.properties.text || 'Click to edit', {
          left: element.x,
          top: element.y,
          width: element.width,
          fontSize: element.properties.fontSize || 24,
          fontFamily: element.properties.fontFamily || 'Arial',
          fill: element.properties.fontColor || '#000000',
          fontWeight: element.properties.fontWeight || 'normal',
          fontStyle: element.properties.fontStyle || 'normal',
          selectable: element.isEditable,
          editable: element.isEditable
        });
        break;

      case 'image':
        fabric.Image.fromURL(element.properties.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjR0ZGRkZGIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZTwvdGV4dD4KPC9zdmc+', (img) => {
          img.set({
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            selectable: element.isEditable,
            evented: element.isEditable
          });
          canvas.add(img);
          canvas.renderAll();
        });
        return;

      case 'shape':
        fabricObject = new fabric.Rect({
          left: element.x,
          top: element.y,
          width: element.width,
          height: element.height,
          fill: element.properties.backgroundColor || '#cccccc',
          stroke: element.properties.borderColor || '#000000',
          strokeWidth: element.properties.borderWidth || 0,
          rx: element.properties.borderRadius || 0,
          selectable: element.isEditable,
          evented: element.isEditable
        });
        break;

      default:
        return;
    }

    canvas.add(fabricObject);
    canvas.renderAll();
  };

  const handleElementSelect = (element: EditableElement) => {
    setSelectedElement(element);
    setShowProperties(true);
  };

  const updateElementProperty = (property: string, value: any) => {
    if (!selectedElement) return;

    const updatedElement = {
      ...selectedElement,
      properties: {
        ...selectedElement.properties,
        [property]: value
      }
    };

    const updatedElements = editedTemplate.elements.map(el =>
      el.id === selectedElement.id ? updatedElement : el
    );

    setEditedTemplate({
      ...editedTemplate,
      elements: updatedElements
    });

    setSelectedElement(updatedElement);

    // Update canvas
    loadTemplateElements();
  };

  const handleTextChange = (text: string) => {
    updateElementProperty('text', text);
  };

  const handleFontSizeChange = (size: number) => {
    updateElementProperty('fontSize', size);
  };

  const handleFontColorChange = (color: string) => {
    updateElementProperty('fontColor', color);
  };

  const handleFontFamilyChange = (family: string) => {
    updateElementProperty('fontFamily', family);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedElement) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      updateElementProperty('imageUrl', imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(editedTemplate);
  };

  const handleDownload = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2
    });

    const link = document.createElement('a');
    link.download = `${template.name}-edited.png`;
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="h-full flex">
      {/* Left Sidebar - Element List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Template Elements</h3>
          <p className="text-sm text-gray-600 mt-1">Click to edit elements</p>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-3">
            {editedTemplate.elements.map((element) => (
              <motion.div
                key={element.id}
                whileHover={{ scale: 1.02 }}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedElement?.id === element.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleElementSelect(element)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {element.type === 'text' && <Type className="h-4 w-4 text-blue-500" />}
                    {element.type === 'image' && <ImageIcon className="h-4 w-4 text-green-500" />}
                    {element.type === 'shape' && <div className="w-4 h-4 bg-purple-500 rounded" />}
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {element.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {element.type} • {element.isEditable ? 'Editable' : 'Fixed'}
                      </p>
                    </div>
                  </div>

                  {element.isRequired && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                      Required
                    </span>
                  )}
                </div>

                {element.type === 'text' && (
                  <p className="text-xs text-gray-600 mt-2 truncate">
                    "{element.properties.text || element.placeholder}"
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <div className="h-4 w-px bg-gray-300"></div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProperties(!showProperties)}
                  className={showProperties ? 'bg-blue-50 text-blue-600' : ''}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Properties
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Template
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-auto p-4">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="border border-gray-300 shadow-lg bg-white"
            />
            
            {/* Template Info */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="text-sm font-medium text-gray-900">
                {template.name}
              </div>
              <div className="text-xs text-gray-600">
                {template.width}" × {template.height}" • {template.elements.length} elements
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Properties Panel */}
      <AnimatePresence>
        {showProperties && selectedElement && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-white border-l border-gray-200 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Element Properties</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProperties(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {selectedElement.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </p>
            </div>

            <div className="p-4 space-y-6">
              {selectedElement.type === 'text' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
                    <Input
                      value={selectedElement.properties.text || ''}
                      onChange={(e) => handleTextChange(e.target.value)}
                      placeholder={selectedElement.placeholder || 'Enter text...'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                    <Slider
                      value={[selectedElement.properties.fontSize || 24]}
                      onValueChange={(value) => handleFontSizeChange(value[0])}
                      max={100}
                      min={8}
                      step={1}
                      className="w-full"
                    />
                    <span className="text-xs text-gray-500">{selectedElement.properties.fontSize || 24}px</span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={selectedElement.properties.fontColor || '#000000'}
                        onChange={(e) => handleFontColorChange(e.target.value)}
                        className="w-8 h-8 rounded border-0"
                      />
                      <Input
                        value={selectedElement.properties.fontColor || '#000000'}
                        onChange={(e) => handleFontColorChange(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                    <select
                      value={selectedElement.properties.fontFamily || 'Arial'}
                      onChange={(e) => handleFontFamilyChange(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Impact">Impact</option>
                      <option value="Comic Sans MS">Comic Sans MS</option>
                    </select>
                  </div>
                </>
              )}

              {selectedElement.type === 'image' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {selectedElement.properties.imageUrl && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                      <img
                        src={selectedElement.properties.imageUrl}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500">X</label>
                    <Input
                      type="number"
                      value={selectedElement.x}
                      onChange={(e) => {
                        const updatedElement = { ...selectedElement, x: Number(e.target.value) };
                        setSelectedElement(updatedElement);
                      }}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Y</label>
                    <Input
                      type="number"
                      value={selectedElement.y}
                      onChange={(e) => {
                        const updatedElement = { ...selectedElement, y: Number(e.target.value) };
                        setSelectedElement(updatedElement);
                      }}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500">Width</label>
                    <Input
                      type="number"
                      value={selectedElement.width}
                      onChange={(e) => {
                        const updatedElement = { ...selectedElement, width: Number(e.target.value) };
                        setSelectedElement(updatedElement);
                      }}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Height</label>
                    <Input
                      type="number"
                      value={selectedElement.height}
                      onChange={(e) => {
                        const updatedElement = { ...selectedElement, height: Number(e.target.value) };
                        setSelectedElement(updatedElement);
                      }}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditableTemplate; 