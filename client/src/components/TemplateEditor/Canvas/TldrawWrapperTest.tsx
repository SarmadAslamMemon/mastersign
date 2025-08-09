import React, { useRef } from 'react';
import TldrawWrapper, { TldrawWrapperRef } from './TldrawWrapper';

export const TldrawWrapperTest: React.FC = () => {
  const canvasRef = useRef<TldrawWrapperRef>(null);

  const handleTestLoad = () => {
    if (canvasRef.current) {
      console.log('Testing canvas methods...');
      
      // Test getDocument
      const doc = canvasRef.current.getDocument();
      console.log('Current document:', doc);
      
      // Test export methods (these will fail without actual tldraw integration)
      canvasRef.current.exportPNG().then(blob => {
        console.log('PNG export successful:', blob);
      }).catch(err => {
        console.log('PNG export failed (expected):', err.message);
      });
      
      canvasRef.current.exportSVG().then(svg => {
        console.log('SVG export successful:', svg);
      }).catch(err => {
        console.log('SVG export failed (expected):', err.message);
      });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="p-4 bg-gray-100 border-b">
        <h1 className="text-xl font-bold mb-2">TldrawWrapper Test</h1>
        <p className="text-sm text-gray-600 mb-4">
          This is a test page to verify the TldrawWrapper component renders correctly.
        </p>
        <button
          onClick={handleTestLoad}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Canvas Methods
        </button>
      </div>
      
      <div className="flex-1">
        <TldrawWrapper
          ref={canvasRef}
          initialDocument={{
            store: {},
            schema: {},
            records: {}
          }}
          onDocumentChange={(document) => {
            console.log('Document changed:', document);
          }}
        />
      </div>
    </div>
  );
};
