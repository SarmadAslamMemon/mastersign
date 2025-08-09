import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { EditorHeader } from './EditorHeader';
import { EditorSidebar } from './EditorSidebar';
import { EditorCanvas } from './EditorCanvas';
import { EditorToolbar } from './EditorToolbar';
import { EditorFAB } from './EditorFAB';
import { BackgroundPanel } from './BackgroundPanel';
import { TemplateBrowser } from '../TemplateBrowser';
import { useEditorState } from './hooks/useEditorState';
import { SignFlowTldraw } from '../tldraw/SignFlowTools';

export const EditorLayout: React.FC = () => {
  const { 
    isTemplateBrowserOpen, 
    setIsTemplateBrowserOpen,
    showBackgroundPanel,
    setShowBackgroundPanel,
    setCurrentTemplate
  } = useEditorState();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleToggleBackground = () => {
      setShowBackgroundPanel(!showBackgroundPanel);
    };

    const handleToggleTemplateBrowser = () => {
      setIsTemplateBrowserOpen(!isTemplateBrowserOpen);
    };

    window.addEventListener('toggle-background-panel', handleToggleBackground);
    window.addEventListener('toggle-template-browser', handleToggleTemplateBrowser);

    return () => {
      window.removeEventListener('toggle-background-panel', handleToggleBackground);
      window.removeEventListener('toggle-template-browser', handleToggleTemplateBrowser);
    };
  }, [showBackgroundPanel, isTemplateBrowserOpen, setShowBackgroundPanel, setIsTemplateBrowserOpen]);

  const handleTemplateSelect = (template: any) => {
    setCurrentTemplate(template);
    setIsTemplateBrowserOpen(false);
  };

  return (
    <SignFlowTldraw
      templateData={null}
      onTemplateLoad={() => {}}
    >
      <div className="h-screen w-screen bg-gray-50 overflow-hidden flex">
        {/* Left Sidebar */}
        <EditorSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Toolbar */}
          <EditorToolbar />
          
          {/* Canvas Area */}
          <div className="flex-1 relative overflow-hidden">
            <EditorCanvas />
            
            {/* Background Panel - Overlay */}
            {showBackgroundPanel && (
              <div className="absolute top-4 left-4 right-4 z-30">
                <BackgroundPanel />
              </div>
            )}
          </div>

          {/* Status Bar */}
          <div className="h-8 bg-gray-100 border-t border-gray-200 px-4 flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center space-x-4">
              <span>Press <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs">B</kbd> for Background</span>
              <span>Press <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs">T</kbd> for Templates</span>
              <span>Press <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs">Ctrl+Z</kbd> to Undo</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>SignFlow Studio v1.0</span>
              <span>Ready</span>
            </div>
          </div>
        </div>
        
        {/* Floating Action Button */}
        <EditorFAB />
        
        {/* Template Browser Modal */}
        <TemplateBrowser
          isOpen={isTemplateBrowserOpen}
          onClose={() => setIsTemplateBrowserOpen(false)}
          onTemplateSelect={handleTemplateSelect}
        />
      </div>
    </SignFlowTldraw>
  );
};
