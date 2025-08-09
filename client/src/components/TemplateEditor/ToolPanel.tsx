import React from 'react';
import { Button } from '@/components/ui/button';
import { Type, Image, Square, Circle, Star } from 'lucide-react';

interface ToolPanelProps {
  activeTool: string;
  onToolChange: (tool: 'select' | 'text' | 'image' | 'shape' | 'icon') => void;
  onAddElement: (elementType: 'text' | 'image' | 'shape' | 'icon') => void;
}

export const ToolPanel: React.FC<ToolPanelProps> = ({
  activeTool,
  onToolChange,
  onAddElement
}) => {
  const tools = [
    { id: 'select', icon: '👆', label: 'Select' },
    { id: 'text', icon: 'T', label: 'Text' },
    { id: 'image', icon: '🖼️', label: 'Image' },
    { id: 'shape', icon: '⬜', label: 'Shape' },
    { id: 'icon', icon: '⭐', label: 'Icon' }
  ];

  return (
    <div className="space-y-2">
      {tools.map((tool) => (
        <Button
          key={tool.id}
          variant={activeTool === tool.id ? "default" : "ghost"}
          size="sm"
          className="w-12 h-12 p-0"
          onClick={() => onToolChange(tool.id as any)}
          title={tool.label}
        >
          <span className="text-lg">{tool.icon}</span>
        </Button>
      ))}
      
      <div className="pt-4 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          className="w-12 h-12 p-0"
          onClick={() => onAddElement('text')}
          title="Add Text"
        >
          <Type className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-12 h-12 p-0 mt-2"
          onClick={() => onAddElement('image')}
          title="Add Image"
        >
          <Image className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-12 h-12 p-0 mt-2"
          onClick={() => onAddElement('shape')}
          title="Add Shape"
        >
          <Square className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
