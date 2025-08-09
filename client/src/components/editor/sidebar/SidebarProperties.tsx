import React from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useEditorState } from '../hooks/useEditorState';
import { useTldrawEditor } from '../hooks/useTldrawEditor';

export const SidebarProperties: React.FC = () => {
  const { selectedShape } = useEditorState();
  const { editor } = useTldrawEditor();

  const updateShapeProperty = (property: string, value: any) => {
    if (!editor || !selectedShape) return;
    
    try {
      if (property === 'x' || property === 'y') {
        editor.updateShape({
          id: selectedShape.id,
          [property]: parseFloat(value) || 0,
        });
      } else {
        editor.updateShape({
          id: selectedShape.id,
          props: { ...selectedShape.props, [property]: value },
        });
      }
    } catch (error) {
      console.error('Error updating shape property:', error);
    }
  };

  if (!selectedShape) {
    return (
      <div className="p-4">
        <p className="text-sm text-gray-500 text-center">
          Select a shape to edit its properties
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-gray-800 mb-3">Shape Properties</h3>
      
      {/* Position */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Position</label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="X"
            value={selectedShape.x || 0}
            onChange={(e) => updateShapeProperty('x', e.target.value)}
            className="text-sm"
          />
          <Input
            type="number"
            placeholder="Y"
            value={selectedShape.y || 0}
            onChange={(e) => updateShapeProperty('y', e.target.value)}
            className="text-sm"
          />
        </div>
      </div>

      {/* Size */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Size</label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Width"
            value={selectedShape.props?.w || 100}
            onChange={(e) => updateShapeProperty('w', parseFloat(e.target.value) || 100)}
            className="text-sm"
          />
          <Input
            type="number"
            placeholder="Height"
            value={selectedShape.props?.h || 100}
            onChange={(e) => updateShapeProperty('h', parseFloat(e.target.value) || 100)}
            className="text-sm"
          />
        </div>
      </div>

      {/* Opacity */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Opacity</label>
        <Slider
          value={[selectedShape.props?.opacity || 1]}
          onValueChange={([value]) => updateShapeProperty('opacity', value)}
          max={1}
          min={0}
          step={0.1}
          className="w-full"
        />
        <div className="text-xs text-gray-500 text-center">
          {Math.round((selectedShape.props?.opacity || 1) * 100)}%
        </div>
      </div>

      {/* Text Properties (if text shape) */}
      {selectedShape.type === 'text' && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Text</label>
          <Input
            type="text"
            placeholder="Enter text"
            value={selectedShape.props?.text || ''}
            onChange={(e) => updateShapeProperty('text', e.target.value)}
            className="text-sm"
          />
          
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Font Size"
              value={selectedShape.props?.size || 24}
              onChange={(e) => updateShapeProperty('size', parseFloat(e.target.value) || 24)}
              className="text-sm"
            />
            <select
              value={selectedShape.props?.font || 'Arial'}
              onChange={(e) => updateShapeProperty('font', e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
        </div>
      )}

      {/* Color (if applicable) */}
      {selectedShape.props?.color && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Color</label>
          <input
            type="color"
            value={selectedShape.props.color}
            onChange={(e) => updateShapeProperty('color', e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};
