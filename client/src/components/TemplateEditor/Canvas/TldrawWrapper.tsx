import React, { forwardRef, useImperativeHandle, useCallback, useEffect, useState, useRef } from 'react';
import { Tldraw } from '@tldraw/tldraw';
import { getSnapshot } from 'tldraw';
import '@tldraw/tldraw/tldraw.css';

export interface TldrawWrapperRef {
  loadTemplate: (templateId: string) => void;
  getDocument: () => any;
  exportPNG: () => Promise<string>;
  exportSVG: () => Promise<string>;
}

export interface TldrawWrapperProps {
  initialDocument?: any;
  onDocumentChange?: (document: any) => void;
  canvasWidth?: number;
  canvasHeight?: number;
}

const TldrawWrapper = forwardRef<TldrawWrapperRef, TldrawWrapperProps>(
  ({ initialDocument, onDocumentChange, canvasWidth = 800, canvasHeight = 600 }, ref) => {
    const [editor, setEditor] = useState<any>(null);
    const [isLoadingShapes, setIsLoadingShapes] = useState(false);
    const isLoadingShapesRef = useRef(false);
    
    // Update ref when state changes
    useEffect(() => {
      isLoadingShapesRef.current = isLoadingShapes;
      console.log('TldrawWrapper: isLoadingShapes state changed to:', isLoadingShapes);
    }, [isLoadingShapes]);

    // Define methods at the top level using useCallback
    const loadTemplate = useCallback((templateId: string) => {
      console.log('Loading template:', templateId);
      // Implementation will be added when we have template loading logic
    }, []);
    
    const getDocument = useCallback(() => {
      if (editor) {
        return getSnapshot(editor.store);
      }
      return null;
    }, [editor]);
    
    // Helper: map tldraw color names to hex values
    const colorToHex: Record<string, string> = {
      black: '#000000',
      white: '#ffffff',
      red: '#ff0000',
      green: '#00ff00',
      blue: '#0000ff',
      yellow: '#ffff00',
      orange: '#ffa500',
      violet: '#800080',
      'light-violet': '#ffc0cb',
      'light-blue': '#87ceeb',
      'light-green': '#90ee90',
      'light-red': '#ffb6c1',
      grey: '#808080',
    };

    const extractPlainText = (rich: any): string => {
      try {
        if (typeof rich === 'string') return rich;
        const walk = (node: any): string => {
          if (!node) return '';
          if (typeof node === 'string') return node;
          if (Array.isArray(node)) return node.map(walk).join('');
          if (node.text) return String(node.text);
          if (node.children) return node.children.map(walk).join('');
          return '';
        };
        return walk(rich).trim();
      } catch {
        return '';
      }
    };

    const exportSVG = useCallback(async (): Promise<string> => {
      if (!editor) throw new Error('Editor not initialized');

      const snapshot = getSnapshot(editor.store);
      const records: Record<string, any> = snapshot?.records || {};
      const shapes = Object.values(records).filter((r: any) => r?.type && (r.type === 'geo' || r.type === 'text' || r.type === 'image')) as any[];

      const svgParts: string[] = [];
      svgParts.push(
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}">`
      );

      for (const shape of shapes) {
        const x = Number(shape.x || 0);
        const y = Number(shape.y || 0);
        if (shape.type === 'geo') {
          const w = Number(shape.props?.w || 100);
          const h = Number(shape.props?.h || 100);
          const fillStyle = shape.props?.fill === 'none' ? 'none' : (colorToHex[shape.props?.color] || '#000000');
          const stroke = colorToHex[shape.props?.color] || '#000000';
          const strokeWidth = shape.props?.size === 'l' ? 6 : shape.props?.size === 'm' ? 3 : 1;
          svgParts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fillStyle}" stroke="${stroke}" stroke-width="${strokeWidth}" />`);
        } else if (shape.type === 'text') {
          const text = extractPlainText(shape.props?.richText) || '';
          const fontSize = shape.props?.size === 'xl' ? 48 : shape.props?.size === 'l' ? 28 : shape.props?.size === 'm' ? 18 : 14;
          const fill = colorToHex[shape.props?.color] || '#000000';
          const textAnchor = shape.props?.textAlign === 'middle' ? 'middle' : shape.props?.textAlign === 'end' ? 'end' : 'start';
          svgParts.push(`<text x="${x}" y="${y}" font-size="${fontSize}" fill="${fill}" text-anchor="${textAnchor}" dominant-baseline="hanging">${text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</text>`);
        } else if (shape.type === 'image') {
          const w = Number(shape.props?.w || 100);
          const h = Number(shape.props?.h || 100);
          const href = shape.meta?.src || '';
          if (href) {
            svgParts.push(`<image x="${x}" y="${y}" width="${w}" height="${h}" href="${href}" />`);
          }
        }
      }

      svgParts.push('</svg>');
      return svgParts.join('\n');
    }, [editor, canvasWidth, canvasHeight]);

    const exportPNG = useCallback(async (): Promise<string> => {
      if (!editor) throw new Error('Editor not initialized');
      const svgString = await exportSVG();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      try {
        const img = new Image();
        const dataUrl: string = await new Promise((resolve, reject) => {
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = canvasWidth;
              canvas.height = canvasHeight;
              const ctx = canvas.getContext('2d');
              if (!ctx) return reject(new Error('Canvas context not available'));
              ctx.drawImage(img, 0, 0);
              const out = canvas.toDataURL('image/png');
              resolve(out);
            } catch (e) {
              reject(e);
            } finally {
              URL.revokeObjectURL(url);
            }
          };
          img.onerror = (e) => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to render SVG to image'));
          };
          img.src = url;
        });
        return dataUrl;
      } finally {
        // URL revoked in onload/onerror paths
      }
    }, [editor]);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      loadTemplate: (templateId: string) => {
        console.log('TldrawWrapper: loadTemplate called with:', templateId);
        // Implementation for loading templates
      },
      getDocument: () => {
        console.log('TldrawWrapper: getDocument called');
        if (!editor) return null;
        return getSnapshot(editor.store);
      },
      exportPNG: exportPNG,
      exportSVG: exportSVG
    }), [editor, exportPNG, exportSVG]);

    // Handle document changes
    const handleMount = useCallback((editorInstance: any) => {
      console.log('TldrawWrapper: handleMount callback created/executed');
      console.log('TldrawWrapper: Editor mounted:', editorInstance);
      console.log('TldrawWrapper: Setting up change listener...');
      setEditor(editorInstance);
      
      // Set up change listener
      const unsubscribe = editorInstance.store.listen(() => {
        console.log('TldrawWrapper: Store change detected, isLoadingShapes:', isLoadingShapesRef.current);
        
        if (onDocumentChange && !isLoadingShapesRef.current) {
          const snapshot = getSnapshot(editorInstance.store);
          
          console.log('TldrawWrapper: Change listener fired, snapshot:', snapshot);
          console.log('TldrawWrapper: Snapshot records:', snapshot?.records);
          console.log('TldrawWrapper: Records count:', Object.keys(snapshot?.records || {}).length);
          
          // Only trigger change if the snapshot has meaningful content
          const hasRecords = snapshot && snapshot.records && Object.keys(snapshot.records).length > 0;
          if (hasRecords) {
            console.log('TldrawWrapper: Triggering onDocumentChange with meaningful content');
            onDocumentChange(snapshot);
          } else {
            console.log('TldrawWrapper: Skipping change event - no meaningful content');
          }
        } else {
          console.log('TldrawWrapper: Change listener fired but skipping - isLoadingShapes:', isLoadingShapesRef.current, 'onDocumentChange:', !!onDocumentChange);
        }
      });
      
      // Clean up subscription when component unmounts
      return () => {
        unsubscribe();
      };
    }, [onDocumentChange]);

    // Load initial document when it changes
    useEffect(() => {
      console.log('TldrawWrapper: useEffect for initialDocument triggered');
      console.log('TldrawWrapper: initialDocument:', initialDocument);
      console.log('TldrawWrapper: editor:', editor);
      
      if (initialDocument && editor) {
        try {
          console.log('TldrawWrapper: Loading initial document:', initialDocument);
          console.log('TldrawWrapper: Document type:', typeof initialDocument);
          console.log('TldrawWrapper: Document keys:', Object.keys(initialDocument || {}));
          console.log('TldrawWrapper: Has records:', !!initialDocument.records);
          console.log('TldrawWrapper: Has shapes:', !!initialDocument.shapes);
          console.log('TldrawWrapper: Records count:', Object.keys(initialDocument.records || {}).length);
          console.log('TldrawWrapper: Shapes count:', Object.keys(initialDocument.shapes || {}).length);
          
          // Check if the document has meaningful content
          const hasRecords = initialDocument.records && Object.keys(initialDocument.records).length > 0;
          const hasShapes = initialDocument.shapes && Object.keys(initialDocument.shapes).length > 0;
          
          console.log('TldrawWrapper: Content check - hasRecords:', hasRecords, 'hasShapes:', hasShapes);
          
          if (!hasRecords && !hasShapes) {
            console.log('TldrawWrapper: Skipping empty document');
            return;
          }
          
          // Set loading flag to prevent change listener from firing
          console.log('TldrawWrapper: Setting isLoadingShapes to true');
          setIsLoadingShapes(true);
          isLoadingShapesRef.current = true;
          
          // Wait a bit for Tldraw to fully initialize and ensure loading flag is set
          setTimeout(() => {
            console.log('TldrawWrapper: Starting shape creation, isLoadingShapes:', isLoadingShapesRef.current);
            
            // Check if we have records (shapes) to load
            if (initialDocument.records && Object.keys(initialDocument.records).length > 0) {
              console.log('TldrawWrapper: Loading template shapes from records:', initialDocument.records);
              console.log('TldrawWrapper: Records to process:', Object.keys(initialDocument.records));
              
              // Instead of using store.put, let's create shapes using Tldraw's API
              Object.entries(initialDocument.records).forEach(([id, shapeData]: [string, any]) => {
                try {
                  console.log(`TldrawWrapper: Creating shape ${id} with type ${shapeData.type}:`, shapeData);
                  console.log(`TldrawWrapper: Shape ${id} props:`, shapeData.props);
                  
                  if (shapeData.type === 'geo') {
                    // Create geometric shape (rectangle, circle, etc.)
                    const geoShape = editor.createShape({
                      id,
                      type: 'geo',
                      x: shapeData.x,
                      y: shapeData.y,
                      props: {
                        geo: shapeData.props.geo || 'rectangle',
                        fill: shapeData.props.fill || 'solid',
                        color: shapeData.props.color || 'black',
                        dash: shapeData.props.dash || 'solid',
                        size: shapeData.props.size || 'm',
                        w: shapeData.props.w || 100,
                        h: shapeData.props.h || 100
                      }
                    });
                    console.log(`Created geo shape ${id}:`, geoShape);
                  } else if (shapeData.type === 'text') {
                    // Create text shape
                    const textShape = editor.createShape({
                      id,
                      type: 'text',
                      x: shapeData.x,
                      y: shapeData.y,
                      props: {
                        richText: shapeData.props.richText, // already converted object from DesignCanvas
                        size: shapeData.props.size || 'm',
                        textAlign: shapeData.props.textAlign || 'start',
                        color: shapeData.props.color || 'black',
                        font: shapeData.props.font || 'draw'
                      }
                    });
                    console.log(`Created text shape ${id}:`, textShape);
                  } else if (shapeData.type === 'image') {
                    // Create image shape
                    const assetId = (shapeData.props.assetId && String(shapeData.props.assetId).startsWith('asset:'))
                      ? shapeData.props.assetId
                      : `asset:${shapeData.props.assetId || id}`

                    // If we have a src in meta, register the asset first
                    const src = shapeData.meta?.src
                    if (src) {
                      try {
                        editor.store.put([
                          {
                            id: assetId,
                            type: 'asset',
                            typeName: 'asset',
                            meta: {},
                            props: {
                              type: 'image',
                              src,
                              w: shapeData.props.w || 100,
                              h: shapeData.props.h || 100
                            }
                          }
                        ])
                      } catch (e) {
                        console.warn('Failed to register image asset, proceeding anyway:', e)
                      }
                    }

                    const imageShape = editor.createShape({
                      id,
                      type: 'image',
                      x: shapeData.x,
                      y: shapeData.y,
                      props: {
                        assetId,
                        w: shapeData.props.w || 100,
                        h: shapeData.props.h || 100
                      }
                    });
                    console.log(`Created image shape ${id}:`, imageShape);
                  }
                } catch (error) {
                  console.error(`Error creating shape ${id}:`, error);
                }
              });
              
              console.log('TldrawWrapper: All shapes created, checking editor state...');
              console.log('TldrawWrapper: Editor store snapshot after shape creation:', getSnapshot(editor.store));
              
              // Adjust viewport to fit all shapes
              setTimeout(() => {
                try {
                  editor.zoomToFit();
                  console.log('TldrawWrapper: Viewport adjusted to fit all shapes');
                } catch (e) {
                  console.warn('TldrawWrapper: Could not adjust viewport:', e);
                }
              }, 100);
            } else {
              console.log('TldrawWrapper: No records found in initialDocument');
            }
            
            // Clear loading flag after shapes are loaded
            console.log('TldrawWrapper: Setting isLoadingShapes to false');
            setIsLoadingShapes(false);
            isLoadingShapesRef.current = false;
          }, 100);
        } catch (error) {
          console.error('TldrawWrapper: Error loading initial document:', error);
          console.log('TldrawWrapper: Clearing loading flag due to error');
          setIsLoadingShapes(false);
          isLoadingShapesRef.current = false;
        }
      }
    }, [initialDocument, editor]);

    return (
      <div className="w-full h-full">
        <Tldraw
          onMount={handleMount}
        />
      </div>
    );
  }
);

TldrawWrapper.displayName = 'TldrawWrapper';

export default TldrawWrapper;
