// ============================================================================
// TLDRAW TYPES & UTILITIES - SignFlow Integration
// ============================================================================

import { TLShape, TLTextShape, TLImageShape, TLGeoShape, TLFrameShape } from '@tldraw/tldraw';

// Extended TLDraw shape types for SignFlow
export interface SignFlowShape extends TLShape {
  metadata?: {
    templateId?: string;
    elementId?: string;
    isEditable?: boolean;
    isRequired?: boolean;
    placeholder?: string;
    category?: string;
    subCategory?: string;
  };
}

// Text shape with SignFlow properties
export interface SignFlowTextShape extends TLTextShape {
  metadata?: {
    templateId?: string;
    elementId?: string;
    isEditable?: boolean;
    isRequired?: boolean;
    placeholder?: string;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: string;
    originalText?: string;
  };
}

// Image shape with SignFlow properties
export interface SignFlowImageShape extends TLImageShape {
  metadata?: {
    templateId?: string;
    elementId?: string;
    isEditable?: boolean;
    isRequired?: boolean;
    originalUrl?: string;
    uploadedImage?: boolean;
  };
}

// Geometric shape with SignFlow properties
export interface SignFlowGeoShape extends TLGeoShape {
  metadata?: {
    templateId?: string;
    elementId?: string;
    isEditable?: boolean;
    isRequired?: boolean;
    shapeType?: string;
    originalColor?: string;
  };
}

// Frame shape for templates
export interface SignFlowFrameShape extends TLFrameShape {
  metadata?: {
    templateId?: string;
    templateName?: string;
    templateCategory?: string;
    templateDimensions?: { width: number; height: number };
    templateUnit?: string;
    templatePrice?: number;
  };
}

// Template element mapping
export interface TemplateElementMapping {
  elementId: string;
  tldrawShapeId: string;
  type: 'text' | 'image' | 'shape' | 'frame';
  metadata: any;
}

// TLDraw store state for SignFlow
export interface SignFlowStore {
  templateId: string | null;
  templateName: string | null;
  templateCategory: string | null;
  templateDimensions: { width: number; height: number } | null;
  templateUnit: string | null;
  templatePrice: number | null;
  elementMappings: TemplateElementMapping[];
  uploadedImages: string[];
  selectedElements: string[];
  history: any[];
  historyIndex: number;
}

// Shape creation utilities - Updated for TLDraw v2
export const createSignFlowText = (
  text: string,
  x: number,
  y: number,
  metadata: Partial<SignFlowTextShape['metadata']> = {}
): Partial<SignFlowTextShape> => ({
  type: 'text',
  x,
  y,
  props: {
    text: text || 'Click to edit',
    color: metadata.fontColor || '#000000',
    font: metadata.fontFamily || 'Arial',
    size: metadata.fontSize || 24,
    weight: metadata.fontWeight || 'normal',
    style: metadata.fontStyle || 'normal',
    align: 'middle',
  },
  metadata: {
    isEditable: true,
    isRequired: metadata.isRequired || false,
    placeholder: metadata.placeholder || 'Click to edit',
    originalText: text,
    ...metadata,
  },
});

export const createSignFlowImage = (
  imageUrl: string,
  x: number,
  y: number,
  width: number,
  height: number,
  metadata: Partial<SignFlowImageShape['metadata']> = {}
): Partial<SignFlowImageShape> => ({
  type: 'image',
  x,
  y,
  props: {
    w: width,
    h: height,
    assetId: imageUrl, // TLDraw asset ID
  },
  metadata: {
    isEditable: true,
    isRequired: metadata.isRequired || false,
    originalUrl: imageUrl,
    uploadedImage: true,
    ...metadata,
  },
});

export const createSignFlowShape = (
  shapeType: string,
  x: number,
  y: number,
  width: number,
  height: number,
  metadata: Partial<SignFlowGeoShape['metadata']> = {}
): Partial<SignFlowGeoShape> => {
  // TLDraw v2 uses 'solid' for fill and expects colors in a different structure
  const baseShape = {
    x,
    y,
    props: {
      w: width,
      h: height,
      fill: 'solid', // TLDraw v2 expects 'solid' not a hex color
      stroke: 'solid', // TLDraw v2 expects 'solid' not a hex color
      strokeWidth: metadata.borderWidth || 0,
      // Colors are handled differently in TLDraw v2
      // We'll need to use the editor's color system
    },
    metadata: {
      isEditable: true,
      isRequired: metadata.isRequired || false,
      shapeType,
      originalColor: metadata.backgroundColor || '#cccccc',
      ...metadata,
    },
  };

  switch (shapeType) {
    case 'rect':
      return { ...baseShape, type: 'geo', props: { ...baseShape.props, geo: 'rectangle' } };
    case 'circle':
      return { ...baseShape, type: 'geo', props: { ...baseShape.props, geo: 'ellipse' } };
    case 'triangle':
      return { ...baseShape, type: 'geo', props: { ...baseShape.props, geo: 'triangle' } };
    case 'line':
      return { ...baseShape, type: 'line', props: { ...baseShape.props, geo: 'line' } };
    case 'ellipse':
      return { ...baseShape, type: 'geo', props: { ...baseShape.props, geo: 'ellipse' } };
    case 'polygon':
      return { ...baseShape, type: 'geo', props: { ...baseShape.props, geo: 'polygon' } };
    case 'star':
      return { ...baseShape, type: 'geo', props: { ...baseShape.props, geo: 'star' } };
    case 'arrow':
      return { ...baseShape, type: 'arrow', props: { ...baseShape.props, geo: 'arrow' } };
    default:
      return { ...baseShape, type: 'geo', props: { ...baseShape.props, geo: 'rectangle' } };
  }
};

export const createSignFlowFrame = (
  template: any,
  metadata: Partial<SignFlowFrameShape['metadata']> = {}
): Partial<SignFlowFrameShape> => ({
  type: 'frame',
  x: 0,
  y: 0,
  props: {
    w: template.width * 10,
    h: template.height * 10,
    fill: 'solid', // TLDraw v2 expects 'solid' not a hex color
    stroke: 'solid', // TLDraw v2 expects 'solid' not a hex color
    strokeWidth: 2,
  },
  metadata: {
    templateId: template.id,
    templateName: template.name,
    templateCategory: template.category,
    templateDimensions: { width: template.width, height: template.height },
    templateUnit: template.unit,
    templatePrice: template.basePrice,
    ...metadata,
  },
});

// Utility functions
export const convertFabricToTldraw = (fabricObject: any, templateId?: string) => {
  const baseMetadata = {
    templateId,
    isEditable: true,
    isRequired: false,
  };

  switch (fabricObject.type) {
    case 'text':
    case 'textbox':
      return createSignFlowText(
        fabricObject.text || 'Click to edit',
        fabricObject.left || 0,
        fabricObject.top || 0,
        {
          ...baseMetadata,
          fontFamily: fabricObject.fontFamily,
          fontSize: fabricObject.fontSize,
          fontWeight: fabricObject.fontWeight,
          fontStyle: fabricObject.fontStyle,
          fontColor: fabricObject.fill,
        }
      );
    case 'image':
      return createSignFlowImage(
        fabricObject.src || '',
        fabricObject.left || 0,
        fabricObject.top || 0,
        fabricObject.width || 100,
        fabricObject.height || 100,
        baseMetadata
      );
    case 'rect':
    case 'circle':
    case 'triangle':
    case 'line':
    case 'ellipse':
    case 'polygon':
      return createSignFlowShape(
        fabricObject.type,
        fabricObject.left || 0,
        fabricObject.top || 0,
        fabricObject.width || 100,
        fabricObject.height || 100,
        {
          ...baseMetadata,
          backgroundColor: fabricObject.fill,
          borderColor: fabricObject.stroke,
          borderWidth: fabricObject.strokeWidth,
        }
      );
    default:
      return null;
  }
};

export const convertTldrawToFabric = (tldrawShape: any) => {
  // This is for backward compatibility if needed
  const baseProps = {
    left: tldrawShape.x,
    top: tldrawShape.y,
    selectable: true,
    evented: true,
  };

  switch (tldrawShape.type) {
    case 'text':
      return {
        type: 'text',
        text: tldrawShape.props.text,
        fontSize: tldrawShape.props.size,
        fontFamily: tldrawShape.props.font,
        fill: tldrawShape.props.color,
        fontWeight: tldrawShape.props.weight,
        fontStyle: tldrawShape.props.style,
        ...baseProps,
      };
    case 'image':
      return {
        type: 'image',
        src: tldrawShape.props.assetId,
        width: tldrawShape.props.w,
        height: tldrawShape.props.h,
        ...baseProps,
      };
    case 'geo':
      return {
        type: tldrawShape.props.geo,
        width: tldrawShape.props.w,
        height: tldrawShape.props.h,
        fill: tldrawShape.props.fill,
        stroke: tldrawShape.props.stroke,
        strokeWidth: tldrawShape.props.strokeWidth,
        ...baseProps,
      };
    default:
      return null;
  }
};
