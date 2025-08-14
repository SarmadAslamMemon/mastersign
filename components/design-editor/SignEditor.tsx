import React, { useState, useRef, useCallback, useReducer, useEffect } from 'react';
import { Stage, Layer, Text, Image, Transformer, Group, Rect, Circle } from 'react-konva';
import { 
  Type, 
  Image as ImageIcon, 
  Palette, 
  FileText, 
  Download, 
  Undo2, 
  Redo2, 
  Save,
  X,
  Layers,
  Grid3X3,
  ZoomIn,
  ZoomOut,
  Move,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Copy,
  Settings,
  Plus,
  Unlock
} from 'lucide-react';

// ===== INTERFACES =====
interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width?: number;
  height?: number;
  content?: string;
  fontSize?: number;
  fontColor?: string;
  imageSrc?: string;
  rotation?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  zIndex: number;
}

interface CanvasLayer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  zIndex: number;
  opacity: number;
  elements: CanvasElement[];
}

interface Template {
  id: string;
  name: string;
  category: string;
  elements: Array<{
    type: 'text' | 'image' | 'shape';
    x: number; // 0-1 relative coordinates
    y: number; // 0-1 relative coordinates
    width?: number; // 0-1 relative
    height?: number; // 0-1 relative
    content?: string;
    fontSize?: number;
    fontColor?: string;
    fill?: string;
    stroke?: string;
  }>;
  background: string;
  canvasWidth: number;
  canvasHeight: number;
}

interface CanvasState {
  stage: {
    width: number;
    height: number;
    scale: number;
    x: number;
    y: number;
  };
  layers: CanvasLayer[];
  selectedObjects: string[];
  activeTool: 'select' | 'text' | 'image' | 'shape';
  history: {
    past: CanvasState[];
    present: CanvasState;
    future: CanvasState[];
  };
  templates: Template[];
  settings: {
    gridSize: number;
    snapToGrid: boolean;
    showGuides: boolean;
  };
}

// ===== LAYER MANAGER =====
class LayerManager {
  static createLayer(name: string, zIndex: number): CanvasLayer {
    return {
      id: crypto.randomUUID(),
      name,
      visible: true,
      locked: false,
      zIndex,
      opacity: 1,
      elements: []
    };
  }

  static reorderLayers(layers: CanvasLayer[], fromIndex: number, toIndex: number): CanvasLayer[] {
    const newLayers = [...layers];
    const [movedLayer] = newLayers.splice(fromIndex, 1);
    newLayers.splice(toIndex, 0, movedLayer);
    
    // Update zIndex based on new order
    return newLayers.map((layer, index) => ({
      ...layer,
      zIndex: index * 10
    }));
  }

  static toggleLayerVisibility(layers: CanvasLayer[], layerId: string): CanvasLayer[] {
    return layers.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    );
  }

  static toggleLayerLock(layers: CanvasLayer[], layerId: string): CanvasLayer[] {
    return layers.map(layer => 
      layer.id === layerId ? { ...layer, locked: !layer.locked } : layer
    );
  }
}

// ===== TEMPLATE SYSTEM =====
const defaultTemplates: Template[] = [
  {
    id: 'yard-sign',
    name: 'Yard Sign',
    category: 'yard-signs',
    canvasWidth: 400,
    canvasHeight: 300,
    elements: [
      { 
        type: 'text', 
        x: 0.5, y: 0.4, 
        content: 'YARD SALE', 
        fontSize: 48, 
        fontColor: '#ff0000' 
      },
      { 
        type: 'text', 
        x: 0.5, y: 0.6, 
        content: 'Saturday 9AM-3PM', 
        fontSize: 24, 
        fontColor: '#000000' 
      }
    ],
    background: '#ffff00'
  },
  {
    id: 'banner',
    name: 'Banner',
    category: 'banners',
    canvasWidth: 800,
    canvasHeight: 200,
    elements: [
      { 
        type: 'text', 
        x: 0.5, y: 0.3, 
        content: 'GRAND OPENING', 
        fontSize: 64, 
        fontColor: '#ffffff' 
      },
      { 
        type: 'text', 
        x: 0.5, y: 0.7, 
        content: '50% OFF EVERYTHING', 
        fontSize: 36, 
        fontColor: '#ffffff' 
      }
    ],
    background: '#000000'
  },
  {
    id: 'business-card',
    name: 'Business Card',
    category: 'business-cards',
    canvasWidth: 350,
    canvasHeight: 200,
    elements: [
      { 
        type: 'text', 
        x: 0.5, y: 0.3, 
        content: 'ACME CORP', 
        fontSize: 28, 
        fontColor: '#0066cc' 
      },
      { 
        type: 'text', 
        x: 0.5, y: 0.5, 
        content: 'Professional Services', 
        fontSize: 16, 
        fontColor: '#333333' 
      },
      { 
        type: 'text', 
        x: 0.5, y: 0.7, 
        content: 'Call: (555) 123-4567', 
        fontSize: 14, 
        fontColor: '#666666' 
      }
    ],
    background: '#ffffff'
  }
];

// ===== COORDINATE SYSTEM =====
function scaleTemplateToCanvas(
  template: Template, 
  canvasWidth: number, 
  canvasHeight: number
): CanvasElement[] {
  return template.elements.map((element, index) => ({
    id: crypto.randomUUID(),
    type: element.type,
    x: element.x * canvasWidth,
    y: element.y * canvasHeight,
    width: element.width ? element.width * canvasWidth : undefined,
    height: element.height ? element.height * canvasHeight : undefined,
    content: element.content,
    fontSize: element.fontSize,
    fontColor: element.fontColor,
    fill: element.fill,
    stroke: element.stroke,
    rotation: 0,
    opacity: 1,
    zIndex: index
  }));
}

// ===== REDUCER =====
type CanvasAction = 
  | { type: 'SET_ACTIVE_TOOL'; payload: CanvasState['activeTool'] }
  | { type: 'ADD_ELEMENT'; payload: { layerId: string; element: CanvasElement } }
  | { type: 'UPDATE_ELEMENT'; payload: { layerId: string; elementId: string; updates: Partial<CanvasElement> } }
  | { type: 'DELETE_ELEMENT'; payload: { layerId: string; elementId: string } }
  | { type: 'SELECT_OBJECTS'; payload: string[] }
  | { type: 'LOAD_TEMPLATE'; payload: Template }
  | { type: 'ADD_LAYER'; payload: CanvasLayer }
  | { type: 'REORDER_LAYERS'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'TOGGLE_LAYER_VISIBILITY'; payload: string }
  | { type: 'TOGGLE_LAYER_LOCK'; payload: string }
  | { type: 'SET_STAGE_TRANSFORM'; payload: Partial<CanvasState['stage']> }
  | { type: 'UNDO' }
  | { type: 'REDO' };

function canvasReducer(state: CanvasState, action: CanvasAction): CanvasState {
  switch (action.type) {
    case 'SET_ACTIVE_TOOL':
      return { ...state, activeTool: action.payload };
    
    case 'ADD_ELEMENT': {
      const newLayers = state.layers.map(layer => 
        layer.id === action.payload.layerId 
          ? { ...layer, elements: [...layer.elements, action.payload.element] }
          : layer
      );
      return { ...state, layers: newLayers };
    }
    
    case 'UPDATE_ELEMENT': {
      const newLayers = state.layers.map(layer => 
        layer.id === action.payload.layerId 
          ? {
              ...layer,
              elements: layer.elements.map(el => 
                el.id === action.payload.elementId 
                  ? { ...el, ...action.payload.updates }
                  : el
              )
            }
          : layer
      );
      return { ...state, layers: newLayers };
    }
    
    case 'DELETE_ELEMENT': {
      const newLayers = state.layers.map(layer => 
        layer.id === action.payload.layerId 
          ? {
              ...layer,
              elements: layer.elements.filter(el => el.id !== action.payload.elementId)
            }
          : layer
      );
      return { ...state, layers: newLayers };
    }
    
    case 'SELECT_OBJECTS':
      return { ...state, selectedObjects: action.payload };
    
    case 'LOAD_TEMPLATE': {
      const template = action.payload;
      const scaledElements = scaleTemplateToCanvas(template, state.stage.width, state.stage.height);
      
      // Create a new template layer
      const templateLayer: CanvasLayer = {
        id: crypto.randomUUID(),
        name: `Template: ${template.name}`,
        visible: true,
        locked: false,
        zIndex: 10,
        opacity: 1,
        elements: scaledElements
      };
      
      return {
        ...state,
        layers: [templateLayer, ...state.layers.filter(l => l.zIndex >= 100)],
        stage: {
          ...state.stage,
          width: template.canvasWidth,
          height: template.canvasHeight
        }
      };
    }
    
    case 'ADD_LAYER':
      return { ...state, layers: [...state.layers, action.payload] };
    
    case 'REORDER_LAYERS': {
      const newLayers = LayerManager.reorderLayers(
        state.layers, 
        action.payload.fromIndex, 
        action.payload.toIndex
      );
      return { ...state, layers: newLayers };
    }
    
    case 'TOGGLE_LAYER_VISIBILITY': {
      const newLayers = LayerManager.toggleLayerVisibility(state.layers, action.payload);
      return { ...state, layers: newLayers };
    }
    
    case 'TOGGLE_LAYER_LOCK': {
      const newLayers = LayerManager.toggleLayerLock(state.layers, action.payload);
      return { ...state, layers: newLayers };
    }
    
    case 'SET_STAGE_TRANSFORM':
      return {
        ...state,
        stage: { ...state.stage, ...action.payload }
      };
    
    case 'UNDO': {
      if (state.history.past.length === 0) return state;
      const previous = state.history.past[state.history.past.length - 1];
      const newPast = state.history.past.slice(0, -1);
      
      return {
        ...previous,
        history: {
          past: newPast,
          present: previous,
          future: [state.history.present, ...state.history.future]
        }
      };
    }
    
    case 'REDO': {
      if (state.history.future.length === 0) return state;
      const next = state.history.future[0];
      const newFuture = state.history.future.slice(1);
      
      return {
        ...next,
        history: {
          past: [...state.history.past, state.history.present],
          present: next,
          future: newFuture
        }
      };
    }
    
    default:
      return state;
  }
}

// ===== MAIN COMPONENT =====
const SignEditor: React.FC = () => {
  const [state, dispatch] = useReducer(canvasReducer, {
    stage: {
      width: 800,
      height: 600,
      scale: 1,
      x: 0,
      y: 0
    },
    layers: [
      LayerManager.createLayer('Background', 0),
      LayerManager.createLayer('Content', 100)
    ],
    selectedObjects: [],
    activeTool: 'select',
    history: {
      past: [],
      present: {} as CanvasState,
      future: []
    },
    templates: defaultTemplates,
    settings: {
      gridSize: 25,
      snapToGrid: true,
      showGuides: true
    }
  });

  const transformerRef = useRef<any>(null);
  const stageRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState('#000000');
  const [isExporting, setIsExporting] = useState(false);
  const [showLayerPanel, setShowLayerPanel] = useState(true);

  // ===== UTILITY FUNCTIONS =====
  const getRelativePointerPosition = useCallback((e: any) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const transform = stage.getAbsoluteTransform().copy();
    transform.invert();
    return transform.point(point);
  }, []);

  const snapToGrid = useCallback((value: number) => {
    if (!state.settings.snapToGrid) return value;
    return Math.round(value / state.settings.gridSize) * state.settings.gridSize;
  }, [state.settings.snapToGrid, state.settings.gridSize]);

  const addToHistory = useCallback((newState: CanvasState) => {
    const newHistory = {
      past: [...state.history.past, state.history.present].slice(-49), // Keep max 50 operations
      present: newState,
      future: []
    };
    dispatch({ type: 'SET_STAGE_TRANSFORM', payload: {} }); // This will update history
  }, [state.history]);

  // ===== ELEMENT OPERATIONS =====
  const addText = useCallback((x: number, y: number) => {
    const snappedX = snapToGrid(x);
    const snappedY = snapToGrid(y);
    
    const newElement: CanvasElement = {
      id: crypto.randomUUID(),
      type: 'text',
      x: snappedX,
      y: snappedY,
      content: 'New Text',
      fontSize,
      fontColor,
      rotation: 0,
      opacity: 1,
      zIndex: 0
    };

    dispatch({ 
      type: 'ADD_ELEMENT', 
      payload: { layerId: state.layers[1].id, element: newElement } 
    });
    dispatch({ type: 'SELECT_OBJECTS', payload: [newElement.id] });
    dispatch({ type: 'SET_ACTIVE_TOOL', payload: 'select' });
  }, [fontSize, fontColor, snapToGrid, state.layers]);

  const addImage = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const newElement: CanvasElement = {
          id: crypto.randomUUID(),
          type: 'image',
          x: 100,
          y: 100,
          width: img.width,
          height: img.height,
          imageSrc: e.target?.result as string,
          rotation: 0,
          opacity: 1,
          zIndex: 0
        };
        
        dispatch({ 
          type: 'ADD_ELEMENT', 
          payload: { layerId: state.layers[1].id, element: newElement } 
        });
        dispatch({ type: 'SELECT_OBJECTS', payload: [newElement.id] });
      };
      img.onerror = () => {
        alert('Failed to load image. Please try another file.');
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      alert('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  }, [state.layers]);

  const updateElement = useCallback((layerId: string, elementId: string, updates: Partial<CanvasElement>) => {
    dispatch({ type: 'UPDATE_ELEMENT', payload: { layerId, elementId, updates } });
  }, []);

  const deleteElement = useCallback((layerId: string, elementId: string) => {
    dispatch({ type: 'DELETE_ELEMENT', payload: { layerId, elementId } });
    dispatch({ type: 'SELECT_OBJECTS', payload: [] });
  }, []);

  const loadTemplate = useCallback((template: Template) => {
    dispatch({ type: 'LOAD_TEMPLATE', payload: template });
  }, []);

  // ===== STAGE OPERATIONS =====
  const handleStageClick = useCallback((e: any) => {
    if (e.target === e.target.getStage()) {
      dispatch({ type: 'SELECT_OBJECTS', payload: [] });
      if (state.activeTool === 'text') {
        const pos = getRelativePointerPosition(e);
        addText(pos.x, pos.y);
      }
    }
  }, [state.activeTool, addText, getRelativePointerPosition]);

  const handleElementClick = useCallback((elementId: string) => {
    dispatch({ type: 'SELECT_OBJECTS', payload: [elementId] });
  }, []);

  const handleDragEnd = useCallback((elementId: string, layerId: string, e: any) => {
    const pos = e.target.position();
    const snappedX = snapToGrid(pos.x);
    const snappedY = snapToGrid(pos.y);
    
    updateElement(layerId, elementId, { x: snappedX, y: snappedY });
  }, [snapToGrid, updateElement]);

  const handleWheel = useCallback((e: any) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * 0.9 : oldScale * 1.1;
    const clampedScale = Math.max(0.1, Math.min(5, newScale));

    dispatch({
      type: 'SET_STAGE_TRANSFORM',
      payload: {
        scale: clampedScale,
        x: pointer.x - mousePointTo.x * clampedScale,
        y: pointer.y - mousePointTo.y * clampedScale
      }
    });
  }, []);

  // ===== EXPORT =====
  const exportCanvas = useCallback(async () => {
    setIsExporting(true);
    try {
      const stage = stageRef.current;
      if (stage) {
        const dataURL = stage.toDataURL({
          pixelRatio: 2,
          mimeType: 'image/png'
        });
        const link = document.createElement('a');
        link.download = `sign-export-${new Date().toISOString().slice(0, 10)}.png`;
        link.href = dataURL;
        link.click();
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, []);

  // ===== KEYBOARD SHORTCUTS =====
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              dispatch({ type: 'REDO' });
            } else {
              dispatch({ type: 'UNDO' });
            }
            break;
          case 'e':
            e.preventDefault();
            exportCanvas();
            break;
        }
      } else if (e.key === 'Delete' && state.selectedObjects.length > 0) {
        // Delete selected elements
        state.selectedObjects.forEach(elementId => {
          const layer = state.layers.find(l => l.elements.some(el => el.id === elementId));
          if (layer) {
            deleteElement(layer.id, elementId);
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.selectedObjects, state.layers, deleteElement, exportCanvas]);

  // ===== TRANSFORMER ATTACHMENT =====
  useEffect(() => {
    if (transformerRef.current && state.selectedObjects.length > 0) {
      const stage = transformerRef.current.getStage();
      const selectedNodes = state.selectedObjects.map(id => {
        for (const layer of state.layers) {
          const element = layer.elements.find(el => el.id === id);
          if (element) {
            return stage.findOne(`#${id}`);
          }
        }
        return null;
      }).filter(Boolean);
      
      if (selectedNodes.length > 0) {
        transformerRef.current.nodes(selectedNodes);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [state.selectedObjects, state.layers]);

  // ===== RENDER =====
  const renderElement = (element: CanvasElement, layerId: string) => {
    const commonProps = {
      id: element.id,
      x: element.x,
      y: element.y,
      rotation: element.rotation || 0,
      opacity: element.opacity || 1,
      draggable: !state.layers.find(l => l.id === layerId)?.locked,
      onClick: () => handleElementClick(element.id),
      onDragEnd: (e: any) => handleDragEnd(element.id, layerId, e)
    };

    switch (element.type) {
      case 'text':
        return (
          <Text
            {...commonProps}
            text={element.content || ''}
            fontSize={element.fontSize || 24}
            fill={element.fontColor || '#000000'}
            onDblClick={() => {
              const newText = prompt('Enter new text:', element.content);
              if (newText !== null) {
                updateElement(layerId, element.id, { content: newText });
              }
            }}
          />
        );
      
      case 'image':
        return (
          <Image
            {...commonProps}
            image={new window.Image()}
            src={element.imageSrc || ''}
            width={element.width}
            height={element.height}
          />
        );
      
      case 'shape':
        return (
          <Rect
            {...commonProps}
            width={element.width || 100}
            height={element.height || 100}
            fill={element.fill || '#ffffff'}
            stroke={element.stroke || '#000000'}
            strokeWidth={element.strokeWidth || 1}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar - Tools */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-4 overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-800">Tools</h2>
        
        <div className="space-y-2">
          <button
            onClick={() => dispatch({ type: 'SET_ACTIVE_TOOL', payload: 'select' })}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
              state.activeTool === 'select' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Move size={20} />
            <span>Select</span>
          </button>
          
          <button
            onClick={() => dispatch({ type: 'SET_ACTIVE_TOOL', payload: 'text' })}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
              state.activeTool === 'text' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Type size={20} />
            <span>Text Tool</span>
          </button>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ImageIcon size={20} />
            <span>Add Image</span>
          </button>
        </div>

        {/* Text Properties */}
        {state.activeTool === 'text' && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Font Size</label>
            <input
              type="range"
              min="12"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{fontSize}px</span>
            
            <label className="text-sm font-medium text-gray-700">Font Color</label>
            <input
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="w-full h-8 rounded-lg border border-gray-300"
            />
          </div>
        )}

        {/* Templates */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Templates</h3>
          {state.templates.map((template) => (
            <button
              key={template.id}
              onClick={() => loadTemplate(template)}
              className="w-full text-left px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">{template.name}</div>
              <div className="text-xs text-gray-500">{template.canvasWidth}×{template.canvasHeight}</div>
            </button>
          ))}
        </div>

        {/* Canvas Settings */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Canvas Settings</h3>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="snapToGrid"
              checked={state.settings.snapToGrid}
              onChange={(e) => dispatch({ 
                type: 'SET_STAGE_TRANSFORM', 
                payload: { snapToGrid: e.target.checked } 
              })}
              className="rounded"
            />
            <label htmlFor="snapToGrid" className="text-sm text-gray-700">Snap to Grid</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showGuides"
              checked={state.settings.showGuides}
              onChange={(e) => dispatch({ 
                type: 'SET_STAGE_TRANSFORM', 
                payload: { showGuides: e.target.checked } 
              })}
              className="rounded"
            />
            <label htmlFor="showGuides" className="text-sm text-gray-700">Show Guides</label>
          </div>
        </div>
      </div>

      {/* Center Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => dispatch({ type: 'UNDO' })}
              disabled={state.history.past.length === 0}
              className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Undo2 size={20} />
            </button>
            <button
              onClick={() => dispatch({ type: 'REDO' })}
              disabled={state.history.future.length === 0}
              className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Redo2 size={20} />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowLayerPanel(!showLayerPanel)}
              className={`p-2 rounded-lg border transition-colors ${
                showLayerPanel 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Layers size={20} />
            </button>
            <button
              onClick={() => dispatch({ 
                type: 'SET_STAGE_TRANSFORM', 
                payload: { scale: 1, x: 0, y: 0 } 
              })}
              className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Grid3X3 size={20} />
            </button>
            <button
              onClick={() => dispatch({ 
                type: 'SET_STAGE_TRANSFORM', 
                payload: { scale: Math.max(0.1, state.stage.scale * 0.9) } 
              })}
              className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ZoomOut size={20} />
            </button>
            <span className="text-sm text-gray-600">{Math.round(state.stage.scale * 100)}%</span>
            <button
              onClick={() => dispatch({ 
                type: 'SET_STAGE_TRANSFORM', 
                payload: { scale: Math.min(5, state.stage.scale * 1.1) } 
              })}
              className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={exportCanvas}
              disabled={isExporting}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download size={20} className="inline mr-2" />
              {isExporting ? 'Exporting...' : 'Export'}
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-6 bg-gray-200">
          <div className="bg-white rounded-lg shadow-lg">
            <Stage
              ref={stageRef}
              width={state.stage.width}
              height={state.stage.height}
              scaleX={state.stage.scale}
              scaleY={state.stage.scale}
              x={state.stage.x}
              y={state.stage.y}
              onClick={handleStageClick}
              onWheel={handleWheel}
              draggable={state.activeTool === 'select'}
            >
              {/* Grid Layer */}
              {state.settings.showGuides && (
                <Layer listening={false}>
                  {Array.from({ length: Math.ceil(state.stage.width / state.settings.gridSize) + 1 }, (_, i) => (
                    <Rect
                      key={`v-${i}`}
                      x={i * state.settings.gridSize}
                      y={0}
                      width={1}
                      height={state.stage.height}
                      fill="#e5e7eb"
                      opacity={0.3}
                    />
                  ))}
                  {Array.from({ length: Math.ceil(state.stage.height / state.settings.gridSize) + 1 }, (_, i) => (
                    <Rect
                      key={`h-${i}`}
                      x={0}
                      y={i * state.settings.gridSize}
                      width={state.stage.width}
                      height={1}
                      fill="#e5e7eb"
                      opacity={0.3}
                    />
                  ))}
                </Layer>
              )}

              {/* Content Layers */}
              {state.layers.map((layer) => (
                <Layer key={layer.id} visible={layer.visible} opacity={layer.opacity}>
                  {layer.elements.map((element) => renderElement(element, layer.id))}
                </Layer>
              ))}

              {/* Selection Layer */}
              <Layer>
                <Transformer
                  ref={transformerRef}
                  boundBoxFunc={(oldBox, newBox) => {
                    // Limit resize
                    return newBox.width < 5 || newBox.height < 5 ? oldBox : newBox;
                  }}
                />
              </Layer>
            </Stage>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Layer Panel */}
      {showLayerPanel && (
        <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Layers</h2>
            <button
              onClick={() => dispatch({ 
                type: 'ADD_LAYER', 
                payload: LayerManager.createLayer(`Layer ${state.layers.length + 1}`, state.layers.length * 10) 
              })}
              className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="space-y-2">
            {state.layers.map((layer, index) => (
              <div key={layer.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{layer.name}</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => dispatch({ type: 'TOGGLE_LAYER_VISIBILITY', payload: layer.id })}
                      className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button
                      onClick={() => dispatch({ type: 'TOGGLE_LAYER_LOCK', payload: layer.id })}
                      className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {layer.locked ? <Lock size={14} /> : <Unlock size={14} />}
                    </button>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mb-2">
                  {layer.elements.length} elements
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={layer.opacity}
                    onChange={(e) => dispatch({ 
                      type: 'UPDATE_ELEMENT', 
                      payload: { layerId: layer.id, elementId: '', updates: { opacity: Number(e.target.value) } } 
                    })}
                    className="flex-1"
                  />
                  <span className="text-xs text-gray-500">{Math.round(layer.opacity * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) addImage(file);
        }}
        className="hidden"
      />
    </div>
  );
};

export default SignEditor;
