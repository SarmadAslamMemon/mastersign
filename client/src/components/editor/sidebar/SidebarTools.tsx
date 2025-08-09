import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Type, 
  Square, 
  Circle, 
  Copy, 
  Trash2 
} from 'lucide-react';
import { useEditorState } from '../hooks/useEditorState';
import { useTldrawEditor } from '../hooks/useTldrawEditor';
import { createShapeId } from '@tldraw/tldraw';

export const SidebarTools: React.FC = () => {
  const { setSelectedShape } = useEditorState();
  const { editor, addToast } = useTldrawEditor();

  const createShape = (type: string) => {
    if (!editor) return;
    
    try {
      let shape;
      const shapeId = createShapeId();
      
      switch (type) {
        case 'rectangle':
          shape = editor.createShape({
            id: shapeId,
            type: 'geo',
            x: 100,
            y: 100,
            props: {
              geo: 'rectangle',
              w: 100,
              h: 100,
              fill: 'solid',
              color: 'black',
              dash: 'draw',
              size: 'm',
              opacity: 1,
            },
          });
          break;
        case 'circle':
          shape = editor.createShape({
            id: shapeId,
            type: 'geo',
            x: 100,
            y: 100,
            props: {
              geo: 'ellipse',
              w: 100,
              h: 100,
              fill: 'solid',
              color: 'black',
              dash: 'draw',
              size: 'm',
              opacity: 1,
            },
          });
          break;
        case 'text':
          shape = editor.createShape({
            id: shapeId,
            type: 'text',
            x: 100,
            y: 100,
            props: {
              text: 'Click to edit',
              color: 'black',
              font: 'Arial',
              size: 24,
              weight: 'normal',
              style: 'normal',
              align: 'middle',
            },
          });
          break;
      }
      
      if (shape) {
        addToast(`${type} created successfully!`);
        setSelectedShape(shape);
      }
    } catch (error) {
      console.error('Error creating shape:', error);
      addToast(`Error creating ${type}: ${error.message}`, { icon: 'error' });
    }
  };

  const handleAction = (action: string) => {
    if (!editor) return;
    
    switch (action) {
      case 'selectAll':
        editor.selectAll();
        break;
      case 'delete':
        if (editor.selectedShapeIds.length > 0) {
          editor.deleteShapes(editor.selectedShapeIds);
          addToast('Selected shapes deleted');
        }
        break;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-gray-800 mb-3">Design Tools</h3>
      
      {/* Shape Tools */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Shapes</h4>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => createShape('rectangle')}
            className="h-12 flex flex-col items-center justify-center gap-1"
          >
            <Square className="w-4 h-4" />
            <span className="text-xs">Rectangle</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => createShape('circle')}
            className="h-12 flex flex-col items-center justify-center gap-1"
          >
            <Circle className="w-4 h-4" />
            <span className="text-xs">Circle</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => createShape('text')}
            className="h-12 flex flex-col items-center justify-center gap-1"
          >
            <Type className="w-4 h-4" />
            <span className="text-xs">Text</span>
          </Button>
        </div>
      </div>

      {/* Action Tools */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Actions</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction('selectAll')}
            className="h-10"
          >
            <Copy className="w-4 h-4 mr-1" />
            Select All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction('delete')}
            className="h-10"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
