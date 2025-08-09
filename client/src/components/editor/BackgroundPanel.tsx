import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Palette, Upload, X } from 'lucide-react';
import { useEditorState } from './hooks/useEditorState';
import { useTldrawEditor } from './hooks/useTldrawEditor';

export const BackgroundPanel: React.FC = () => {
  const { 
    showBackgroundPanel,
    setShowBackgroundPanel,
    backgroundColor,
    setBackgroundColor,
    backgroundImageFile,
    setBackgroundImageFile
  } = useEditorState();
  
  const { editor, setBackgroundImage } = useTldrawEditor();

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
    
    if (editor) {
      // Find existing background rectangle
      const existingBackground = editor.getCurrentPageShapes().find(
        shape => shape.type === 'geo' && shape.props.isBackground
      );

      if (existingBackground) {
        // Update existing background
        editor.updateShape({
          id: existingBackground.id,
          props: {
            color: color,
          },
        });
      } else {
        // Create new background rectangle
        const backgroundRect = editor.createShape({
          id: editor.createShapeId(),
          type: 'geo',
          x: 0,
          y: 0,
          props: {
            geo: 'rectangle',
            w: 800,
            h: 600,
            fill: 'solid',
            color: color,
            dash: 'draw',
            size: 's',
            opacity: 1,
            isBackground: true,
          },
        });
        
        // Send background to back
        editor.sendToBack([backgroundRect.id]);
      }
    }
  };

  const handleBackgroundImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBackgroundImageFile(file);
      
      // Create object URL for the image
      const imageUrl = URL.createObjectURL(file);
      
      // Set background image in editor
      if (setBackgroundImage) {
        setBackgroundImage(imageUrl);
      }
    }
  };

  const removeBackgroundImage = () => {
    setBackgroundImageFile(null);
    
    if (editor) {
      // Find and remove background image shapes
      const backgroundImages = editor.getCurrentPageShapes().filter(
        shape => shape.type === 'image' && shape.props.isBackground
      );
      
      if (backgroundImages.length > 0) {
        editor.deleteShapes(backgroundImages.map(shape => shape.id));
      }
    }
  };

  if (!showBackgroundPanel) return null;

  const quickColors = ['#ffffff', '#f3f4f6', '#1f2937', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Background Settings</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowBackgroundPanel(false)}
          className="h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Background Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Palette className="w-4 h-4 inline mr-2" />
            Background Color
          </label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => handleBackgroundColorChange(e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
          />
        </div>
        
        {/* Background Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Upload className="w-4 h-4 inline mr-2" />
            Background Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundImageUpload}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {backgroundImageFile && (
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-xs text-gray-500 truncate">
                {backgroundImageFile.name}
              </span>
              <Button
                onClick={removeBackgroundImage}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-800 text-xs"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Background Presets */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick Presets
        </label>
        <div className="flex space-x-2">
          {quickColors.map((color) => (
            <button
              key={color}
              onClick={() => handleBackgroundColorChange(color)}
              className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
