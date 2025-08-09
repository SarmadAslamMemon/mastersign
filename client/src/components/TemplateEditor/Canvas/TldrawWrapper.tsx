import React, { forwardRef, useImperativeHandle, useCallback, useEffect, useState } from 'react';
import { Tldraw } from '@tldraw/tldraw';
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
}

const TldrawWrapper = forwardRef<TldrawWrapperRef, TldrawWrapperProps>(
  ({ initialDocument, onDocumentChange }, ref) => {
    const [editor, setEditor] = useState<any>(null);

    // Define methods at the top level using useCallback
    const loadTemplate = useCallback((templateId: string) => {
      console.log('Loading template:', templateId);
      // Implementation will be added when we have template loading logic
    }, []);
    
    const getDocument = useCallback(() => {
      if (editor) {
        return editor.store.getSnapshot();
      }
      return null;
    }, [editor]);
    
    const exportPNG = useCallback(async () => {
      if (editor) {
        // TODO: Implement PNG export
        throw new Error('PNG export not yet implemented');
      }
      throw new Error('Editor not initialized');
    }, [editor]);
    
    const exportSVG = useCallback(async () => {
      if (editor) {
        // TODO: Implement SVG export
        throw new Error('SVG export not yet implemented');
      }
      throw new Error('Editor not initialized');
    }, [editor]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      loadTemplate,
      getDocument,
      exportPNG,
      exportSVG
    }));

    // Handle document changes
    const handleMount = useCallback((editorInstance: any) => {
      console.log('Tldraw editor mounted:', editorInstance);
      setEditor(editorInstance);
      
      // Set up change listener
      const unsubscribe = editorInstance.store.listen(() => {
        if (onDocumentChange) {
          const snapshot = editorInstance.store.getSnapshot();
          onDocumentChange(snapshot);
        }
      });
      
      // Clean up subscription when component unmounts
      return () => {
        unsubscribe();
      };
    }, [onDocumentChange]);

    // Load initial document when it changes
    useEffect(() => {
      if (initialDocument && editor) {
        try {
          console.log('Loading initial document:', initialDocument);
          // Check if the document has the required structure
          if (initialDocument.store && typeof initialDocument.store === 'object') {
            editor.store.loadSnapshot(initialDocument);
          } else if (initialDocument.shapes && typeof initialDocument.shapes === 'object') {
            // If it's a legacy format, try to load it directly
            editor.store.loadSnapshot(initialDocument);
          } else {
            console.warn('Invalid document format, starting with empty canvas');
            // Try to load an empty document structure
            editor.store.loadSnapshot({
              store: {},
              schema: {},
              records: {}
            });
          }
        } catch (error) {
          console.error('Failed to load initial document:', error);
          console.log('Document structure:', initialDocument);
          // Try to load an empty document structure as fallback
          try {
            editor.store.loadSnapshot({
              store: {},
              schema: {},
              records: {}
            });
          } catch (fallbackError) {
            console.error('Failed to load fallback document:', fallbackError);
          }
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
