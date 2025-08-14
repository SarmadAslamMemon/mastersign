import { EditorTool } from '../types'

export interface ToolbarProps {
  activeTool: EditorTool
  onToolChange: (tool: EditorTool) => void
  onUndo: () => void
  onRedo: () => void
  onCopy: () => void
  onPaste: () => void
  onDelete: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomFit: () => void
  onGridToggle: () => void
  onSave: () => void
  onExport: () => void
  onShare: () => void
  canUndo: boolean
  canRedo: boolean
  canCopy: boolean
  canPaste: boolean
  canDelete: boolean
  zoom: number
  showGrid: boolean
  className?: string
}

export interface ToolProps {
  isActive?: boolean
  disabled?: boolean
  onClick: () => void
  tooltip?: string
  shortcut?: string
  className?: string
}

export interface ToolSectionProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export type ToolCategory = 
  | 'selection'
  | 'shapes' 
  | 'text'
  | 'image'
  | 'drawing'
  | 'view'
  | 'actions'
  | 'export'
