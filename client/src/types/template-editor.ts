// ============================================================================
// TEMPLATE EDITOR TYPES - Core interfaces for the sign template editor
// ============================================================================

// Design Element Types
export interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'icon';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  locked: boolean;
  visible: boolean;
}

// Text Element
export interface TextElement extends DesignElement {
  type: 'text';
  content: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  fontStyle: 'normal' | 'italic';
  textAlign: 'left' | 'center' | 'right' | 'justify';
  color: string;
  letterSpacing: number;
  lineHeight: number;
  textDecoration: 'none' | 'underline' | 'line-through';
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

// Image Element
export interface ImageElement extends DesignElement {
  type: 'image';
  src: string;
  alt: string;
  fit: 'contain' | 'cover' | 'fill' | 'none';
  borderRadius: number;
  filters: {
    brightness: number;
    contrast: number;
    saturation: number;
    blur: number;
  };
}

// Shape Element
export interface ShapeElement extends DesignElement {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'triangle' | 'star' | 'custom';
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  borderRadius: number;
  shadow: {
    enabled: boolean;
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
  };
}

// Icon Element
export interface IconElement extends DesignElement {
  type: 'icon';
  iconName: string;
  iconLibrary: 'lucide' | 'heroicons' | 'custom';
  color: string;
  size: number;
}

// Template Definition
export interface TemplateDefinition {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  description: string;
  preview: string;
  thumbnail: string;
  width: number;
  height: number;
  unit: 'inches' | 'feet' | 'cm' | 'mm';
  basePrice: number;
  elements: DesignElement[];
  layers: Layer[];
  metadata: {
    tags: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number; // in minutes
    popular: boolean;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

// Layer Management
export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay';
  elements: string[]; // element IDs
}

// Editor State
export interface EditorState {
  currentTemplate: TemplateDefinition | null;
  selectedElements: string[];
  clipboard: DesignElement[];
  history: {
    past: EditorAction[];
    future: EditorAction[];
  };
  viewport: {
    zoom: number;
    panX: number;
    panY: number;
  };
  grid: {
    enabled: boolean;
    size: number;
    snap: boolean;
  };
  rulers: {
    enabled: boolean;
    units: 'inches' | 'feet' | 'cm' | 'mm';
  };
}

// Editor Actions for Undo/Redo
export interface EditorAction {
  id: string;
  type: 'add' | 'delete' | 'modify' | 'move' | 'resize' | 'style';
  elementId: string;
  before: Partial<DesignElement>;
  after: Partial<DesignElement>;
  timestamp: Date;
}

// Design Export Options
export interface ExportOptions {
  format: 'png' | 'jpg' | 'svg' | 'pdf';
  quality: number; // 0-100
  resolution: number; // DPI
  includeBackground: boolean;
  backgroundColor: string;
  filename: string;
}

// Template Category
export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  subCategories: string[];
  templateCount: number;
}

// User Design
export interface UserDesign {
  id: string;
  name: string;
  templateId: string;
  elements: DesignElement[];
  layers: Layer[];
  metadata: {
    width: number;
    height: number;
    category: string;
    subCategory?: string;
    templateDocument?: any; // tldraw document JSON
    createdAt: Date;
    updatedAt: Date;
    lastEdited: Date;
    version: number;
    tags: string[];
  };
  exportHistory: {
    format: string;
    exportedAt: Date;
    fileSize: number;
  }[];
}

// Editor Tool State
export interface ToolState {
  activeTool: 'select' | 'text' | 'image' | 'shape' | 'icon' | 'pan' | 'zoom';
  toolOptions: {
    text: {
      defaultFont: string;
      defaultSize: number;
      defaultColor: string;
    };
    shape: {
      defaultFill: string;
      defaultStroke: string;
      defaultStrokeWidth: number;
    };
    image: {
      maxFileSize: number;
      allowedFormats: string[];
    };
  };
}
