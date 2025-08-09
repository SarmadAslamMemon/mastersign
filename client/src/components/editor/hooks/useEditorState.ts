import { useState, useCallback, useMemo } from 'react';
import { SignTemplate } from '@/services/TemplateService';

export interface EditorState {
  // Template management
  currentTemplate: SignTemplate | null;
  isTemplateBrowserOpen: boolean;
  
  // Background settings
  showBackgroundPanel: boolean;
  backgroundColor: string;
  backgroundImageFile: File | null;
  
  // UI state
  activeSidebarTab: 'templates' | 'tools' | 'properties';
  selectedShape: any;
  
  // Editor controls
  zoomLevel: number;
  canUndo: boolean;
  canRedo: boolean;
  
  // Grid settings
  showGrid: boolean;
  snapToGrid: boolean;
}

export const useEditorState = () => {
  const [state, setState] = useState<EditorState>({
    currentTemplate: null,
    isTemplateBrowserOpen: false,
    showBackgroundPanel: false,
    backgroundColor: '#ffffff',
    backgroundImageFile: null,
    activeSidebarTab: 'templates',
    selectedShape: null,
    zoomLevel: 100,
    canUndo: false,
    canRedo: false,
    showGrid: false,
    snapToGrid: false,
  });

  // Template actions
  const setCurrentTemplate = useCallback((template: SignTemplate | null) => {
    setState(prev => ({ ...prev, currentTemplate: template }));
  }, []);

  const setIsTemplateBrowserOpen = useCallback((isOpen: boolean) => {
    setState(prev => ({ ...prev, isTemplateBrowserOpen: isOpen }));
  }, []);

  // Background actions
  const setShowBackgroundPanel = useCallback((show: boolean) => {
    setState(prev => ({ ...prev, showBackgroundPanel: show }));
  }, []);

  const setBackgroundColor = useCallback((color: string) => {
    setState(prev => ({ ...prev, backgroundColor: color }));
  }, []);

  const setBackgroundImageFile = useCallback((file: File | null) => {
    setState(prev => ({ ...prev, backgroundImageFile: file }));
  }, []);

  // Sidebar actions
  const setActiveSidebarTab = useCallback((tab: EditorState['activeSidebarTab']) => {
    setState(prev => ({ ...prev, activeSidebarTab: tab }));
  }, []);

  const setSelectedShape = useCallback((shape: any) => {
    setState(prev => ({ ...prev, selectedShape: shape }));
  }, []);

  // Editor control actions
  const setZoomLevel = useCallback((level: number) => {
    setState(prev => ({ ...prev, zoomLevel: level }));
  }, []);

  const setUndoRedoState = useCallback((canUndo: boolean, canRedo: boolean) => {
    setState(prev => ({ ...prev, canUndo, canRedo }));
  }, []);

  // Grid actions
  const setShowGrid = useCallback((show: boolean) => {
    setState(prev => ({ ...prev, showGrid: show }));
  }, []);

  const setSnapToGrid = useCallback((snap: boolean) => {
    setState(prev => ({ ...prev, snapToGrid: snap }));
  }, []);

  // Computed values
  const hasTemplate = useMemo(() => !!state.currentTemplate, [state.currentTemplate]);
  const hasBackgroundImage = useMemo(() => !!state.backgroundImageFile, [state.backgroundImageFile]);

  return {
    // State
    ...state,
    
    // Actions
    setCurrentTemplate,
    setIsTemplateBrowserOpen,
    setShowBackgroundPanel,
    setBackgroundColor,
    setBackgroundImageFile,
    setActiveSidebarTab,
    setSelectedShape,
    setZoomLevel,
    setUndoRedoState,
    setShowGrid,
    setSnapToGrid,
    
    // Computed
    hasTemplate,
    hasBackgroundImage,
  };
};
