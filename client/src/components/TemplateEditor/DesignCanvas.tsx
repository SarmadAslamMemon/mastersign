import React, { useRef, useCallback, forwardRef, useImperativeHandle, useEffect, useState, useMemo } from 'react';
import TldrawWrapper, { TldrawWrapperRef } from './Canvas/TldrawWrapper';
import { UserDesign } from '@/types/template-editor';

interface DesignCanvasProps {
  design: UserDesign;
  onDesignChange?: (design: UserDesign) => void;
}

export interface DesignCanvasRef {
  exportPNG: () => Promise<string>;
  exportSVG: () => Promise<string>;
}

const DesignCanvas = forwardRef<DesignCanvasRef, DesignCanvasProps>(({ design, onDesignChange }, ref) => {
  console.log('DesignCanvas: Component mounting with design:', design);
  
  // Ensure design has required properties and convert template format if needed
  const [safeDesign] = useState(() => {
    console.log('DesignCanvas: Initializing safeDesign with:', design);
    return {
      ...design,
      metadata: {
        ...design.metadata,
        width: design.metadata?.width || 800,
        height: design.metadata?.height || 600,
        category: design.metadata?.category || 'Custom',
        createdAt: design.metadata?.createdAt || new Date(),
        updatedAt: design.metadata?.updatedAt || new Date(),
        lastEdited: design.metadata?.lastEdited || new Date(),
        version: design.metadata?.version || 1,
        tags: design.metadata?.tags || []
      }
    };
  });
  
  console.log('DesignCanvas: safeDesign initialized:', safeDesign);
  
  const tldrawRef = useRef<TldrawWrapperRef>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Debug effect to track component lifecycle
  useEffect(() => {
    console.log('DesignCanvas: Component mounted/updated');
    console.log('DesignCanvas: Current design:', design);
    console.log('DesignCanvas: Current safeDesign:', safeDesign);
  }, [design, safeDesign]);

  // Helper function to convert hex colors to Tldraw color names
  const hexToTldrawColor = (hex: string): string => {
    const colorMap: { [key: string]: string } = {
      '#000000': 'black',
      '#ffffff': 'white',
      '#ff0000': 'red',
      '#00ff00': 'green',
      '#0000ff': 'blue',
      '#ffff00': 'yellow',
      '#ffa500': 'orange',
      '#ff6b35': 'orange', // Road sign orange
      '#800080': 'violet',
      '#ffc0cb': 'light-violet',
      '#87ceeb': 'light-blue',
      '#90ee90': 'light-green',
      '#ffb6c1': 'light-red',
      '#808080': 'grey',
      'transparent': 'white' // Handle transparent as white for now
    };
    return colorMap[hex.toLowerCase()] || 'black';
  };

  // Helper to map fontSize (px) to Tldraw's categorical size
  const mapFontSizeToTldrawSize = (fontSize: number): 's' | 'm' | 'l' | 'xl' => {
    if (fontSize >= 48) return 'xl'
    if (fontSize >= 28) return 'l'
    if (fontSize >= 18) return 'm'
    return 's'
  }

  // Helper to convert plain text to Tldraw rich text format
  const toRichText = (text: string) => {
    return [
      {
        id: '1',
        type: 'paragraph',
        children: [
          {
            id: '2',
            type: 'text',
            text: text || '',
            styles: {}
          }
        ]
      }
    ];
  };

  // Convert template document format to Tldraw format if needed
  const getTldrawDocument = () => {
    let templateDoc = safeDesign.metadata.templateDocument;
    console.log('DesignCanvas: templateDoc received:', templateDoc);
    
    // Add comprehensive debugging
    console.log('DEBUG: Raw template document keys:', Object.keys(templateDoc || {}));
    console.log('DEBUG: Has document property:', !!templateDoc?.document);
    console.log('DEBUG: Has shapes property:', !!templateDoc?.shapes);
    console.log('DEBUG: Has records property:', !!templateDoc?.records);
    console.log('DEBUG: Template document type:', typeof templateDoc);
    console.log('DEBUG: Template document stringified:', JSON.stringify(templateDoc, null, 2));
    
    // Handle nested document structure
    if (templateDoc && templateDoc.document) {
      templateDoc = templateDoc.document;
      console.log('DesignCanvas: Using nested document:', templateDoc);
      console.log('DEBUG: Nested document keys:', Object.keys(templateDoc || {}));
      console.log('DEBUG: Nested document shapes:', templateDoc?.shapes);
    }
    
    // PRIORITY 1: If it's in our template format (has shapes), convert it FIRST
    if (templateDoc && templateDoc.shapes && Object.keys(templateDoc.shapes).length > 0) {
      console.log('DesignCanvas: Converting template shapes to Tldraw format:', templateDoc.shapes);
      
      // Convert our template shapes to Tldraw records format
      const records = Object.entries(templateDoc.shapes).reduce((acc, [id, shapeData]: [string, any]) => {
        console.log(`DesignCanvas: Processing shape ${id}:`, shapeData);
        
        // Convert our shape format to Tldraw shape format
        // Map our generic types to Tldraw's actual shape types
        let tldrawType = shapeData.type;
        // Handle both old props structure and new direct properties
        let tldrawProps = { ...shapeData.props };
        if (!shapeData.props) {
          // New structure: properties are directly on the shape
          tldrawProps = {
            fill: shapeData.fill || 'solid',
            stroke: shapeData.stroke || 'none',
            strokeWidth: shapeData.strokeWidth || 0,
            color: shapeData.color || '#000000',
            dash: shapeData.dash || 'solid',
            w: shapeData.w || 100,
            h: shapeData.h || 100,
            text: shapeData.text || '',
            fontSize: shapeData.fontSize || 16,
            font: shapeData.font || 'draw',
            align: shapeData.align || 'center'
          };
        }
        
        console.log(`DesignCanvas: Initial tldrawProps for ${id}:`, tldrawProps);
        
        // Convert our generic types to Tldraw's specific types
        if (shapeData.type === 'rectangle') {
          tldrawType = 'geo';
          // Handle both old props structure and new direct properties
          const strokeWidth = Number(shapeData.strokeWidth || shapeData.props?.strokeWidth || 1);
          const size = strokeWidth >= 6 ? 'l' : strokeWidth >= 3 ? 'm' : 's';
          const fillStyle = (shapeData.fill === 'transparent' || shapeData.props?.fill === 'transparent') ? 'none' : 'solid';
          // Use stroke color if provided, otherwise fall back to fill color
          const primaryColor = hexToTldrawColor(
            (shapeData.stroke || shapeData.props?.stroke || shapeData.fill || shapeData.props?.fill || '#000000')
          );
          tldrawProps = {
            ...tldrawProps,
            geo: 'rectangle',
            fill: fillStyle,
            color: primaryColor,
            dash: shapeData.dash || 'solid',
            size,
            w: shapeData.w || shapeData.props?.width || 100,
            h: shapeData.h || shapeData.props?.height || 100
          };
        } else if (shapeData.type === 'text') {
          tldrawType = 'text';
          // Handle both old props structure and new direct properties
          const fontSizePx = Number(shapeData.fontSize || shapeData.props?.fontSize || 16);
          const textContent = shapeData.text || shapeData.props?.text || '';
          const textAlign = shapeData.align || shapeData.props?.textAlign || 'center';
          const textColor = shapeData.color || shapeData.props?.color || '#000000';
          const textFont = shapeData.font || shapeData.props?.font || 'draw';
          
          tldrawProps = {
            ...tldrawProps,
            richText: toRichText(textContent),
            size: mapFontSizeToTldrawSize(fontSizePx),
            textAlign: textAlign === 'center' ? 'middle' : (textAlign === 'left' ? 'start' : 'end'),
            color: hexToTldrawColor(textColor),
            font: textFont
          };
        } else if (shapeData.type === 'image') {
          tldrawType = 'image';
          const src = shapeData.src || shapeData.props?.src || shapeData.props?.url || '';
          let assetId = shapeData.assetId || shapeData.props?.assetId || src || id;
          if (assetId && !String(assetId).startsWith('asset:')) {
            assetId = `asset:${assetId}`;
          }
          tldrawProps = {
            ...tldrawProps,
            assetId,
            w: shapeData.w || shapeData.props?.width || 100,
            h: shapeData.h || shapeData.props?.height || 100
          };
          // Store original src on meta so the wrapper can create the asset
          (tldrawProps as any)._src = src;
        }
        
        // Tldraw requires shape IDs to start with "shape:"
        // Check if the ID already has the prefix to prevent duplication
        const tldrawId = id.startsWith('shape:') ? id : `shape:${id}`;
        
        const tldrawShape = {
          id: tldrawId,
          type: tldrawType,
          x: shapeData.x,
          y: shapeData.y,
          rotation: 0,
          isLocked: false,
          isAspectRatioLocked: false,
          isAspectRatioDefault: true,
          isCropable: true,
          isSizeLocked: false,
          isFilled: true,
          isClosed: true,
          isHidden: false,
          isSelected: false,
          isEditing: false,
          isHovered: false,
          isPen: false,
          isErasing: false,
          meta: tldrawType === 'image' ? { src: (tldrawProps as any)._src || '' } : {},
          props: tldrawProps
        };
        
        console.log(`DesignCanvas: Final tldrawShape for ${id}:`, tldrawShape);
        acc[tldrawId] = tldrawShape;
        console.log(`DesignCanvas: Converted shape ${id} to ${tldrawId}:`, { type: tldrawType, props: tldrawProps });
        return acc;
      }, {} as any);
      
      console.log('DesignCanvas: Converted Tldraw records:', records);
      
      const convertedDoc = {
        store: {
          // Tldraw store structure
          shapes: {},
          bindings: {},
          assets: {}
        },
        schema: {
          // Basic schema for Tldraw
          shapes: {},
          bindings: {},
          assets: {}
        },
        records
      };
      
      console.log('DesignCanvas: Final converted document:', convertedDoc);
      return convertedDoc;
    }
    
    // PRIORITY 2: If it's already in Tldraw format (has store, schema, records) AND has meaningful content
    if (templateDoc && templateDoc.store && templateDoc.schema && templateDoc.records) {
      // Check if the records actually contain shapes (not empty)
      const hasShapes = templateDoc.records && Object.keys(templateDoc.records).length > 0;
      console.log('DesignCanvas: Found Tldraw format, has shapes:', hasShapes);
      
      if (hasShapes) {
        console.log('DesignCanvas: Using existing Tldraw format with shapes');
        return templateDoc;
      } else {
        console.log('DesignCanvas: Tldraw format found but records are empty, will try to reconstruct');
      }
    }
    
    // PRIORITY 3: If it's in Tldraw format but missing some properties, reconstruct it
    if (templateDoc && templateDoc.records) {
      console.log('DesignCanvas: Reconstructing Tldraw document from records');
      return {
        store: {
          shapes: {},
          bindings: {},
          assets: {}
        },
        schema: {
          shapes: {},
          bindings: {},
          assets: {}
        },
        records: templateDoc.records
      };
    }
    
    console.log('DesignCanvas: No template document found, returning empty document');
    // Return empty document if no template
    return {
      store: {},
      schema: {},
      records: {}
    };
  };

  // Memoize the Tldraw document to prevent unnecessary recalculations
  const tldrawDocument = useMemo(() => {
    console.log('DesignCanvas: useMemo triggered - templateDocument changed');
    console.log('DesignCanvas: Current templateDocument:', safeDesign.metadata.templateDocument);
    
    // If we're already initialized and the template document is empty, don't recalculate
    if (isInitialized && (!safeDesign.metadata.templateDocument || 
        (safeDesign.metadata.templateDocument.records && Object.keys(safeDesign.metadata.templateDocument.records).length === 0))) {
      console.log('DesignCanvas: Already initialized with empty document, skipping recalculation');
      return null;
    }
    
    const doc = getTldrawDocument();
    
    // Only mark as initialized if we have a valid document with content
    if (doc && doc.records && Object.keys(doc.records).length > 0) {
      if (!isInitialized) {
        console.log('DesignCanvas: Marking as initialized with valid document');
        setIsInitialized(true);
      }
    }
    
    console.log('DesignCanvas: Passing to TldrawWrapper:', doc);
    return doc;
  }, [
    safeDesign.metadata.templateDocument, 
    safeDesign.id, // Only re-calculate if design actually changes
    safeDesign.metadata.updatedAt
    // Removed isInitialized from dependencies to prevent circular dependency
  ]);

  const handleDocumentChange = useCallback((document: any) => {
    if (onDesignChange) {
      console.log('DesignCanvas: handleDocumentChange called with:', document);
      
      // Don't update during initial load - only update if we're already initialized
      if (!isInitialized) {
        console.log('DesignCanvas: Skipping update during initial load');
        return;
      }
      
      // Only update if the document has actually changed and has meaningful content
      const currentDoc = safeDesign.metadata.templateDocument;
      const hasCurrentContent = currentDoc && (
        (currentDoc.records && Object.keys(currentDoc.records).length > 0) ||
        (currentDoc.shapes && Object.keys(currentDoc.shapes).length > 0)
      );
      const hasNewContent = document && (
        (document.records && Object.keys(document.records).length > 0) ||
        (document.shapes && Object.keys(document.shapes).length > 0)
      );
      
      // Only update if we're going from no content to content, or if content actually changed
      if (!hasCurrentContent || (hasNewContent && JSON.stringify(currentDoc) !== JSON.stringify(document))) {
        console.log('DesignCanvas: Updating design with new document content');
        const updatedDesign: UserDesign = {
          ...safeDesign,
          updatedAt: new Date().toISOString(),
          metadata: {
            ...safeDesign.metadata,
            updatedAt: new Date().toISOString(),
            templateDocument: document
          }
        };
        onDesignChange(updatedDesign);
      } else {
        console.log('DesignCanvas: Skipping update - no meaningful change detected');
      }
    }
  }, [safeDesign, onDesignChange, isInitialized]);

  useImperativeHandle(ref, () => ({
    exportPNG: async () => {
      if (!tldrawRef.current) throw new Error('Canvas not ready');
      return tldrawRef.current.exportPNG();
    },
    exportSVG: async () => {
      if (!tldrawRef.current) throw new Error('Canvas not ready');
      return tldrawRef.current.exportSVG();
    }
  }), []);

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b bg-white">
        <h3 className="text-lg font-semibold text-gray-700">{safeDesign.name}</h3>
        <span className="text-sm text-gray-500">
          {safeDesign.metadata.width} × {safeDesign.metadata.height}
        </span>
      </div>
      
      <div className="flex-1 relative overflow-auto">
        <div className="flex items-center justify-center min-h-full p-4">
          <div 
            className="bg-white border border-gray-200 shadow-sm"
            style={{
              width: safeDesign.metadata.width,
              height: safeDesign.metadata.height,
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            {tldrawDocument && Object.keys(tldrawDocument.records || {}).length > 0 ? (
              <TldrawWrapper
                ref={tldrawRef}
                initialDocument={tldrawDocument}
                onDocumentChange={handleDocumentChange}
                canvasWidth={safeDesign.metadata.width}
                canvasHeight={safeDesign.metadata.height}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-500">
                    {!tldrawDocument ? 'Loading template...' : 
                     safeDesign.metadata.templateDocument ? 'Processing template...' : 'Loading template...'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

DesignCanvas.displayName = 'DesignCanvas';

export default DesignCanvas;
