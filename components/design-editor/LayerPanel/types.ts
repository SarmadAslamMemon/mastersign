export interface LayerNode {
  id: string
  name: string
  type: string
  visible: boolean
  locked: boolean
  selected: boolean
  children?: LayerNode[]
  parentId?: string
  thumbnail?: string
  zIndex: number
  // Fabric.js object properties for thumbnail generation
  fabricObject?: any
}

export interface LayerPanelProps {
  layers: LayerNode[]
  selectedLayerIds: string[]
  onLayerSelect: (layerId: string, multiSelect?: boolean) => void
  onLayerReorder: (layerId: string, newIndex: number, newParentId?: string) => void
  onLayerVisibilityToggle: (layerId: string) => void
  onLayerLockToggle: (layerId: string) => void
  onLayerRename: (layerId: string, newName: string) => void
  onLayerDelete: (layerId: string) => void
  onLayerGroup: (layerIds: string[]) => void
  onLayerUngroup: (layerId: string) => void
  className?: string
}

export interface LayerItemProps {
  layer: LayerNode
  level: number
  isSelected: boolean
  isMultiSelected: boolean
  onSelect: (layerId: string, multiSelect?: boolean) => void
  onVisibilityToggle: (layerId: string) => void
  onLockToggle: (layerId: string) => void
  onRename: (layerId: string, newName: string) => void
  onDelete: (layerId: string) => void
  isDragging?: boolean
  style?: React.CSSProperties
}

export interface LayerContextMenuProps {
  isOpen: boolean
  position: { x: number; y: number }
  layerId: string
  onClose: () => void
  onRename: () => void
  onDuplicate: () => void
  onDelete: () => void
  onGroup: () => void
  onUngroup: () => void
  onBringToFront: () => void
  onSendToBack: () => void
}

export type LayerFilterType = 'all' | 'text' | 'shapes' | 'images' | 'groups'

export interface LayerSearchFilter {
  searchTerm: string
  filterType: LayerFilterType
  showHidden: boolean
}
