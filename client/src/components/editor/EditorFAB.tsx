import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Type, Square, Image, Plus } from 'lucide-react';
import { useEditorState } from './hooks/useEditorState';
import { useTldrawEditor } from './hooks/useTldrawEditor';
import { createShapeId } from '@tldraw/tldraw';

export const EditorFAB: React.FC = () => {
  const { setSelectedShape } = useEditorState();
  const { editor, addToast } = useTldrawEditor();

  const quickActions = [
    { 
      label: 'Add Text', 
      icon: Type, 
      action: () => createShape('text'),
      delay: 0
    },
    { 
      label: 'Add Shape', 
      icon: Square, 
      action: () => createShape('rectangle'),
      delay: 100
    },
    { 
      label: 'Add Image', 
      icon: Image, 
      action: () => addToast('Image upload coming soon!'),
      delay: 200
    },
  ];

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
            x: 200,
            y: 200,
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
        case 'text':
          shape = editor.createShape({
            id: shapeId,
            type: 'text',
            x: 200,
            y: 200,
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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-3">
        {/* Quick Action Buttons */}
        <AnimatePresence>
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              transition={{ 
                delay: action.delay * 0.001,
                duration: 0.2,
                type: "spring",
                stiffness: 200
              }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={action.action}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <action.icon className="w-4 h-4 mr-2" />
                {action.label}
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Main FAB */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.3,
            type: "spring",
            stiffness: 200
          }}
        >
          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 relative group"
            title="Quick Actions - Click to see more options"
          >
            <Plus className="w-6 h-6" />
            
            {/* Help Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Quick Actions
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
