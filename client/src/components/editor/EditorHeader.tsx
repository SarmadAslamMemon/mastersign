import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eye, Save, ArrowRight, Settings, Image } from 'lucide-react';
import { useEditorState } from './hooks/useEditorState';

export const EditorHeader: React.FC = () => {
  const { 
    currentTemplate, 
    setShowBackgroundPanel,
    showBackgroundPanel 
  } = useEditorState();

  const handleBackgroundToggle = () => {
    setShowBackgroundPanel(!showBackgroundPanel);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-80 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-30 flex items-center justify-between px-6"
    >
      {/* Left Section - Project Info */}
      <div className="flex items-center space-x-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900">SignFlow Editor</h1>
          {currentTemplate ? (
            <p className="text-sm text-gray-600">
              {currentTemplate.name} • {currentTemplate.dimensions.width}" × {currentTemplate.dimensions.height}" • ${currentTemplate.price}
            </p>
          ) : (
            <p className="text-sm text-gray-600">Professional Sign Design Tool</p>
          )}
        </div>
      </div>

      {/* Right Section - Project Actions */}
      <div className="flex items-center space-x-3">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleBackgroundToggle}
          className={showBackgroundPanel ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}
        >
          <Image className="w-4 h-4 mr-1" />
          Background
        </Button>
        
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-1" />
          Settings
        </Button>
        
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-1" />
          Preview
        </Button>
        
        <Button variant="outline" size="sm">
          <Save className="w-4 h-4 mr-1" />
          Save
        </Button>
        
        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Continue
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
};
