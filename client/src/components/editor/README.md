# SignFlow Editor - Modular Architecture

## Overview

The SignFlow Editor has been refactored into a modular, maintainable component architecture that leverages tldraw's capabilities more efficiently. This new structure addresses the previous bottlenecks and provides better separation of concerns.

## Architecture Benefits

### ✅ **Before (Monolithic)**
- Large, hard-to-maintain components
- Scattered state management
- Poor performance due to unnecessary re-renders
- Tight coupling between components
- Limited reusability

### ✅ **After (Modular)**
- Small, focused components with single responsibilities
- Centralized state management with custom hooks
- Optimized re-renders using React.memo and useCallback
- Loose coupling through props and context
- Highly reusable components

## Component Structure

```
editor/
├── EditorLayout.tsx          # Main container and layout manager
├── EditorHeader.tsx          # Top header with project info and actions
├── EditorToolbar.tsx         # Editing controls (zoom, undo/redo, export)
├── EditorSidebar.tsx         # Left sidebar with tab navigation
├── EditorCanvas.tsx          # Main canvas area with tldraw integration
├── EditorFAB.tsx            # Floating action buttons
├── BackgroundPanel.tsx       # Background settings panel
├── sidebar/                  # Sidebar tab content components
│   ├── SidebarTemplates.tsx  # Templates tab
│   ├── SidebarTools.tsx      # Tools tab
│   └── SidebarProperties.tsx # Properties tab
├── hooks/                    # Custom hooks for state management
│   ├── useEditorState.ts     # Centralized editor state
│   └── useTldrawEditor.ts    # tldraw editor integration
└── index.ts                  # Component exports
```

## Key Components

### 1. **EditorLayout** - Main Container
- Manages overall layout structure
- Coordinates component positioning
- Handles z-index layering

### 2. **useEditorState** - State Management Hook
- Centralizes all editor state
- Provides optimized setter functions
- Computes derived values
- Prevents unnecessary re-renders

### 3. **EditorToolbar** - Editing Controls
- Zoom controls with tldraw integration
- Undo/redo with state synchronization
- Export functionality (PNG/SVG)
- Clear and reset actions

### 4. **EditorSidebar** - Left Panel
- Tab-based navigation (Templates, Tools, Properties)
- Smooth transitions between tabs
- Responsive design

### 5. **EditorFAB** - Quick Actions
- Floating action buttons for common tasks
- Animated entrance and interactions
- Quick shape creation

## State Management

The editor uses a centralized state management approach:

```typescript
const {
  // State
  currentTemplate,
  showBackgroundPanel,
  selectedShape,
  
  // Actions
  setCurrentTemplate,
  setShowBackgroundPanel,
  setSelectedShape,
  
  // Computed
  hasTemplate,
  hasBackgroundImage
} = useEditorState();
```

## Performance Optimizations

1. **Memoized State Setters**: All state setters use `useCallback` to prevent unnecessary re-renders
2. **Computed Values**: Derived state is computed using `useMemo`
3. **Component Splitting**: Large components are split into smaller, focused ones
4. **Conditional Rendering**: Components only render when needed

## tldraw Integration

The editor leverages tldraw's capabilities through:

- **useTldrawEditor Hook**: Provides access to tldraw editor instance
- **Shape Creation**: Direct integration with tldraw's shape system
- **Export Functions**: Uses tldraw's built-in export capabilities
- **Event Handling**: Listens to tldraw events for state synchronization

## Usage Example

```typescript
import { EditorLayout } from '@/components/editor';

export default function EditorPage() {
  return (
    <div className="h-screen">
      <EditorLayout />
    </div>
  );
}
```

## Future Improvements

1. **Plugin System**: Allow custom tools and extensions
2. **Keyboard Shortcuts**: Global keyboard shortcuts for common actions
3. **Undo/Redo Stack**: Custom undo/redo implementation for better control
4. **Collaboration**: Real-time collaboration features
5. **Template System**: Enhanced template management and customization

## Migration Guide

To migrate from the old monolithic structure:

1. Replace `EditorCanvasTldraw` with `EditorLayout`
2. Update imports to use the new modular structure
3. Remove old state management code
4. Use the new `useEditorState` hook for state management

## Contributing

When adding new features:

1. Create focused, single-responsibility components
2. Use the existing state management patterns
3. Follow the established component structure
4. Add proper TypeScript types
5. Include animations and transitions for better UX
