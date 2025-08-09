import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, 
  Settings, 
  Layers,
  Search,
  ArrowRight
} from 'lucide-react';
import { useEditorState } from './hooks/useEditorState';
import { SidebarTemplates } from './sidebar/SidebarTemplates';
import { SidebarTools } from './sidebar/SidebarTools';
import { SidebarProperties } from './sidebar/SidebarProperties';

export const EditorSidebar: React.FC = () => {
  const { 
    activeSidebarTab, 
    setActiveSidebarTab,
    isTemplateBrowserOpen,
    setIsTemplateBrowserOpen 
  } = useEditorState();

  const tabs = [
    { id: 'templates', label: 'Templates', icon: FolderOpen },
    { id: 'tools', label: 'Tools', icon: Settings },
    { id: 'properties', label: 'Properties', icon: Layers }
  ] as const;

  const openTemplateBrowser = () => {
    setIsTemplateBrowserOpen(true);
  };

  return (
    <motion.div
      initial={{ x: -320 }}
      animate={{ x: 0 }}
      className="w-80 bg-white border-r border-gray-200 shadow-lg z-40 flex flex-col"
    >
      {/* Sidebar Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <h2 className="text-xl font-bold">SignFlow Studio</h2>
        <p className="text-sm opacity-90">Professional Sign Design Tool</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSidebarTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeSidebarTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeSidebarTab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <SidebarTemplates onOpenBrowser={openTemplateBrowser} />
            </motion.div>
          )}
          
          {activeSidebarTab === 'tools' && (
            <motion.div
              key="tools"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <SidebarTools />
            </motion.div>
          )}
          
          {activeSidebarTab === 'properties' && (
            <motion.div
              key="properties"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <SidebarProperties />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
