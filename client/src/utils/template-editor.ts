// ============================================================================
// TEMPLATE EDITOR UTILITIES - Helper functions for the sign template editor
// ============================================================================

import { 
  DesignElement, 
  TextElement, 
  ImageElement, 
  ShapeElement, 
  IconElement,
  TemplateDefinition 
} from '@/types/template-editor';

// Element Creation Utilities
export const createTextElement = (
  content: string = 'Sample Text',
  x: number = 100,
  y: number = 100
): TextElement => ({
  id: generateId(),
  type: 'text',
  content,
  x,
  y,
  width: 200,
  height: 50,
  rotation: 0,
  opacity: 1,
  zIndex: 1,
  locked: false,
  visible: true,
  fontFamily: 'Inter',
  fontSize: 24,
  fontWeight: '400',
  fontStyle: 'normal',
  textAlign: 'left',
  color: '#000000',
  letterSpacing: 0,
  lineHeight: 1.2,
  textDecoration: 'none',
  textTransform: 'none'
});

export const createImageElement = (
  src: string,
  x: number = 100,
  y: number = 100
): ImageElement => ({
  id: generateId(),
  type: 'image',
  src,
  alt: 'Image',
  x,
  y,
  width: 200,
  height: 200,
  rotation: 0,
  opacity: 1,
  zIndex: 1,
  locked: false,
  visible: true,
  fit: 'contain',
  borderRadius: 0,
  filters: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0
  }
});

export const createShapeElement = (
  shapeType: ShapeElement['shapeType'] = 'rectangle',
  x: number = 100,
  y: number = 100
): ShapeElement => ({
  id: generateId(),
  type: 'shape',
  shapeType,
  x,
  y,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  zIndex: 1,
  locked: false,
  visible: true,
  fillColor: '#3B82F6',
  strokeColor: '#1E40AF',
  strokeWidth: 2,
  borderRadius: 0,
  shadow: {
    enabled: false,
    x: 0,
    y: 2,
    blur: 4,
    spread: 0,
    color: 'rgba(0, 0, 0, 0.1)'
  }
});

export const createIconElement = (
  iconName: string = 'star',
  x: number = 100,
  y: number = 100
): IconElement => ({
  id: generateId(),
  type: 'icon',
  iconName,
  iconLibrary: 'lucide',
  x,
  y,
  width: 24,
  height: 24,
  rotation: 0,
  opacity: 1,
  zIndex: 1,
  locked: false,
  visible: true,
  color: '#000000',
  size: 24
});

// Coordinate and Math Utilities
export const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const calculateAngle = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
};

export const snapToGrid = (value: number, gridSize: number): number => {
  return Math.round(value / gridSize) * gridSize;
};

export const constrainToBounds = (
  value: number,
  min: number,
  max: number
): number => {
  return Math.max(min, Math.min(max, value));
};

// Element Manipulation Utilities
export const moveElement = (
  element: DesignElement,
  deltaX: number,
  deltaY: number,
  gridSize?: number
): DesignElement => {
  let newX = element.x + deltaX;
  let newY = element.y + deltaY;
  
  if (gridSize) {
    newX = snapToGrid(newX, gridSize);
    newY = snapToGrid(newY, gridSize);
  }
  
  return { ...element, x: newX, y: newY };
};

export const resizeElement = (
  element: DesignElement,
  newWidth: number,
  newHeight: number,
  maintainAspectRatio: boolean = false
): DesignElement => {
  let width = newWidth;
  let height = newHeight;
  
  if (maintainAspectRatio) {
    const aspectRatio = element.width / element.height;
    if (Math.abs(newWidth - element.width) > Math.abs(newHeight - element.height)) {
      height = newWidth / aspectRatio;
    } else {
      width = newHeight * aspectRatio;
    }
  }
  
  return { ...element, width, height };
};

export const rotateElement = (
  element: DesignElement,
  angle: number,
  centerX?: number,
  centerY?: number
): DesignElement => {
  const cx = centerX ?? element.x + element.width / 2;
  const cy = centerY ?? element.y + element.height / 2;
  
  // Calculate new position after rotation
  const cos = Math.cos((angle - element.rotation) * Math.PI / 180);
  const sin = Math.sin((angle - element.rotation) * Math.PI / 180);
  
  const dx = element.x - cx;
  const dy = element.y - cy;
  
  const newX = cx + dx * cos - dy * sin;
  const newY = cy + dx * sin + dy * cos;
  
  return { ...element, x: newX, y: newY, rotation: angle };
};

// Selection Utilities
export const isElementInSelection = (
  element: DesignElement,
  selectionBounds: { x: number; y: number; width: number; height: number }
): boolean => {
  const elementBounds = {
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height
  };
  
  return !(
    elementBounds.x > selectionBounds.x + selectionBounds.width ||
    elementBounds.x + elementBounds.width < selectionBounds.x ||
    elementBounds.y > selectionBounds.y + selectionBounds.height ||
    elementBounds.y + elementBounds.height < selectionBounds.y
  );
};

export const getSelectionBounds = (elements: DesignElement[]): {
  x: number;
  y: number;
  width: number;
  height: number;
} | null => {
  if (elements.length === 0) return null;
  
  const xs = elements.map(el => el.x);
  const ys = elements.map(el => el.y);
  const widths = elements.map(el => el.width);
  const heights = elements.map(el => el.height);
  
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs.map((x, i) => x + widths[i]));
  const maxY = Math.max(...ys.map((y, i) => y + heights[i]));
  
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
};

// Validation Utilities
export const validateElement = (element: DesignElement): string[] => {
  const errors: string[] = [];
  
  if (element.width <= 0) errors.push('Width must be greater than 0');
  if (element.height <= 0) errors.push('Height must be greater than 0');
  if (element.opacity < 0 || element.opacity > 1) errors.push('Opacity must be between 0 and 1');
  if (element.rotation < -360 || element.rotation > 360) errors.push('Rotation must be between -360 and 360 degrees');
  
  return errors;
};

export const validateTemplate = (template: TemplateDefinition): string[] => {
  const errors: string[] = [];
  
  if (!template.name.trim()) errors.push('Template name is required');
  if (template.width <= 0) errors.push('Template width must be greater than 0');
  if (template.height <= 0) errors.push('Template height must be greater than 0');
  if (template.elements.length === 0) errors.push('Template must have at least one element');
  
  // Validate all elements
  template.elements.forEach((element, index) => {
    const elementErrors = validateElement(element);
    elementErrors.forEach(error => {
      errors.push(`Element ${index + 1}: ${error}`);
    });
  });
  
  return errors;
};

// Export Utilities
export const calculateExportDimensions = (
  template: TemplateDefinition,
  resolution: number,
  unit: 'inches' | 'feet' | 'cm' | 'mm'
): { width: number; height: number } => {
  // Convert template dimensions to pixels based on resolution
  const dpi = resolution;
  let widthInches: number;
  let heightInches: number;
  
  switch (unit) {
    case 'inches':
      widthInches = template.width;
      heightInches = template.height;
      break;
    case 'feet':
      widthInches = template.width * 12;
      heightInches = template.height * 12;
      break;
    case 'cm':
      widthInches = template.width / 2.54;
      heightInches = template.height / 2.54;
      break;
    case 'mm':
      widthInches = template.width / 25.4;
      heightInches = template.height / 25.4;
      break;
    default:
      widthInches = template.width;
      heightInches = template.height;
  }
  
  return {
    width: Math.round(widthInches * dpi),
    height: Math.round(heightInches * dpi)
  };
};

// Helper Functions
export const generateId = (): string => {
  return `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (Array.isArray(obj)) return obj.map(item => deepClone(item)) as T;
  
  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
