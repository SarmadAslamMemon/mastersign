import React, { useRef, useCallback } from 'react';
import TldrawWrapper, { TldrawWrapperRef } from './Canvas/TldrawWrapper';
import { UserDesign } from '@/types/template-editor';

interface DesignCanvasProps {
  design: UserDesign;
  onDesignChange?: (design: UserDesign) => void;
}

const DesignCanvas: React.FC<DesignCanvasProps> = ({ design, onDesignChange }) => {
  const tldrawRef = useRef<TldrawWrapperRef>(null);

  // Ensure design has required properties
  const safeDesign = {
    ...design,
    metadata: {
      width: 800,
      height: 600,
      category: 'Custom',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastEdited: new Date(),
      version: 1,
      tags: [],
      ...design.metadata
    }
  };

  const handleDocumentChange = useCallback((document: any) => {
    if (onDesignChange) {
      const updatedDesign: UserDesign = {
        ...safeDesign,
        updatedAt: new Date().toISOString(),
        metadata: {
          ...safeDesign.metadata,
          lastModified: new Date().toISOString(),
          templateDocument: document
        }
      };
      onDesignChange(updatedDesign);
    }
  }, [safeDesign, onDesignChange]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b bg-white">
        <h3 className="text-lg font-semibold text-gray-700">{safeDesign.name}</h3>
        <span className="text-sm text-gray-500">
          {safeDesign.metadata.width} × {safeDesign.metadata.height}
        </span>
      </div>
      
      <div className="flex-1 relative">
        <TldrawWrapper
          ref={tldrawRef}
          initialDocument={safeDesign.metadata.templateDocument || {
            // Provide a default empty document structure
            store: {},
            schema: {},
            records: {}
          }}
          onDocumentChange={handleDocumentChange}
        />
      </div>
    </div>
  );
};

export default DesignCanvas;
