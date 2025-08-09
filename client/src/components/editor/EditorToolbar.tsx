import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Undo, 
  Redo, 
  Download, 
  Trash2,
  Maximize,
  Palette,
  FolderOpen,
  Grid3X3,
  Magnet
} from 'lucide-react';
import { useEditorState } from './hooks/useEditorState';
import { useTldrawEditor } from './hooks/useTldrawEditor';

export const EditorToolbar: React.FC = () => {
  const { 
    zoomLevel, 
    canUndo, 
    canRedo,
    showBackgroundPanel,
    setShowBackgroundPanel,
    isTemplateBrowserOpen,
    setIsTemplateBrowserOpen,
    showGrid,
    setShowGrid,
    snapToGrid,
    setSnapToGrid,
    setZoomLevel,
    setUndoRedoState 
  } = useEditorState();
  
  const { editor } = useTldrawEditor();

  // Listen for undo/redo state changes from tldraw
  useEffect(() => {
    const handleUndoRedoState = (event: CustomEvent) => {
      setUndoRedoState(event.detail.canUndo, event.detail.canRedo);
    };
    
    window.addEventListener('tldraw-undo-redo-state', handleUndoRedoState as EventListener);
    return () => {
      window.removeEventListener('tldraw-undo-redo-state', handleUndoRedoState as EventListener);
    };
  }, [setUndoRedoState]);

  const handleZoom = (action: 'in' | 'out' | 'fit' | 'reset') => {
    if (!editor) return;
    
    switch (action) {
      case 'in':
        editor.zoomIn();
        setZoomLevel(prev => Math.min(prev + 25, 400));
        break;
      case 'out':
        editor.zoomOut();
        setZoomLevel(prev => Math.max(prev - 25, 25));
        break;
      case 'fit':
        editor.zoomToFit();
        setZoomLevel(100);
        break;
      case 'reset':
        editor.resetZoom();
        setZoomLevel(100);
        break;
    }
  };

  const handleHistory = (action: 'undo' | 'redo') => {
    if (!editor) return;
    
    if (action === 'undo') {
      editor.undo();
    } else {
      editor.redo();
    }
  };

  const handleExport = async (format: 'png' | 'svg') => {
    if (!editor) return;
    
    try {
      if (format === 'png') {
        const dataUrl = await editor.exportImage();
        const link = document.createElement('a');
        link.download = `signflow-design.${format}`;
        link.href = dataUrl;
        link.click();
      } else if (format === 'svg') {
        const svg = await editor.exportSvg();
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `signflow-design.${format}`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const handleClear = () => {
    if (!editor) return;
    editor.selectAll();
    editor.deleteShapes(editor.selectedShapeIds);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-12 bg-white border-b border-gray-200 px-6 flex items-center justify-center space-x-4 z-20"
    >
      {/* Zoom Controls */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleZoom('out')}
          className="h-8 w-8 p-0"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleZoom('fit')}
          className="h-8 px-3"
        >
          Fit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleZoom('in')}
          className="h-8 w-8 p-0"
          title="Zoom In"
        >
          <ZoomOut className="w-4 h-4 rotate-180" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleZoom('reset')}
          className="h-8 px-3"
        >
          Reset
        </Button>
      </div>

      {/* Zoom Level Display */}
      <div className="text-sm text-gray-600 min-w-[60px] text-center">
        {zoomLevel}%
      </div>

      {/* Grid Controls */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowGrid(!showGrid)}
          className={`h-8 w-8 p-0 ${showGrid ? 'bg-blue-100 text-blue-700' : ''}`}
          title={showGrid ? "Hide Grid" : "Show Grid"}
        >
          <Grid3X3 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSnapToGrid(!snapToGrid)}
          className={`h-8 w-8 p-0 ${snapToGrid ? 'bg-blue-100 text-blue-700' : ''}`}
          title={snapToGrid ? "Disable Snap to Grid" : "Enable Snap to Grid"}
        >
          <Magnet className="w-4 h-4" />
        </Button>
      </div>

      {/* History Controls */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleHistory('undo')}
          disabled={!canUndo}
          className="h-8 w-8 p-0"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleHistory('redo')}
          disabled={!canRedo}
          className="h-8 w-8 p-0"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowBackgroundPanel(!showBackgroundPanel)}
          className={`h-8 px-3 ${showBackgroundPanel ? 'bg-blue-100 text-blue-700' : ''}`}
          title={showBackgroundPanel ? "Hide Background Panel" : "Show Background Panel"}
        >
          <Palette className="w-4 h-4 mr-1" />
          Background
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsTemplateBrowserOpen(!isTemplateBrowserOpen)}
          className={`h-8 px-3 ${isTemplateBrowserOpen ? 'bg-blue-100 text-blue-700' : ''}`}
          title={isTemplateBrowserOpen ? "Hide Template Browser" : "Show Template Browser"}
        >
          <FolderOpen className="w-4 h-4 mr-1" />
          Templates
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleExport('png')}
          className="h-8 px-3"
          title="Export as PNG"
        >
          <Download className="w-4 h-4 mr-1" />
          PNG
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleExport('svg')}
          className="h-8 px-3"
          title="Export as SVG"
        >
          <Download className="w-4 h-4 mr-1" />
          SVG
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="h-8 px-3"
          title="Clear Canvas"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Clear
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="h-8 px-3"
          title="Reset Editor"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>
    </motion.div>
  );
};
