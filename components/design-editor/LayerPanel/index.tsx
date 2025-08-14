import React, { useState, useMemo, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { FixedSizeList as List } from 'react-window'
import LayerItem from './components/LayerItem'
import LayerSearch from './components/LayerSearch'
import { LayerPanelProps, LayerNode, LayerFilterType } from './types'
import { filterLayers, findLayerById, updateLayerInTree, reorderLayers } from './utils'

const ITEM_HEIGHT = 32
const MAX_VISIBLE_ITEMS = 15

const LayerPanel: React.FC<LayerPanelProps> = ({
  layers,
  selectedLayerIds,
  onLayerSelect,
  onLayerReorder,
  onLayerVisibilityToggle,
  onLayerLockToggle,
  onLayerRename,
  onLayerDelete,
  onLayerGroup,
  onLayerUngroup,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<LayerFilterType>('all')
  const [showHidden, setShowHidden] = useState(false)
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null)
  const [multiSelectedIds, setMultiSelectedIds] = useState<string[]>([])

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Filter layers based on search and filter criteria
  const filteredLayers = useMemo(() => {
    return filterLayers(layers, searchTerm, filterType, showHidden)
  }, [layers, searchTerm, filterType, showHidden])

  // Calculate list height
  const listHeight = Math.min(filteredLayers.length * ITEM_HEIGHT, MAX_VISIBLE_ITEMS * ITEM_HEIGHT)

  // Handle layer selection with multi-select support
  const handleLayerSelect = useCallback((layerId: string, multiSelect?: boolean) => {
    if (multiSelect) {
      setMultiSelectedIds(prev => {
        if (prev.includes(layerId)) {
          return prev.filter(id => id !== layerId)
        } else {
          return [...prev, layerId]
        }
      })
    } else {
      setMultiSelectedIds([])
      onLayerSelect(layerId, false)
    }
  }, [onLayerSelect])

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveLayerId(event.active.id as string)
  }

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = filteredLayers.findIndex(layer => layer.id === active.id)
      const newIndex = filteredLayers.findIndex(layer => layer.id === over?.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        // Optimistic update
        const newLayers = arrayMove(filteredLayers, oldIndex, newIndex)
        onLayerReorder(active.id as string, newIndex)
      }
    }

    setActiveLayerId(null)
  }

  // Handle bulk operations
  const handleBulkAction = useCallback((action: string) => {
    const targetIds = multiSelectedIds.length > 0 ? multiSelectedIds : selectedLayerIds

    switch (action) {
      case 'group':
        if (targetIds.length > 1) {
          onLayerGroup(targetIds)
          setMultiSelectedIds([])
        }
        break
      case 'delete':
        targetIds.forEach(id => onLayerDelete(id))
        setMultiSelectedIds([])
        break
      case 'hide':
        targetIds.forEach(id => onLayerVisibilityToggle(id))
        break
      case 'lock':
        targetIds.forEach(id => onLayerLockToggle(id))
        break
    }
  }, [multiSelectedIds, selectedLayerIds, onLayerGroup, onLayerDelete, onLayerVisibilityToggle, onLayerLockToggle])

  // Virtual list item renderer
  const ListItem = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const layer = filteredLayers[index]
    const isSelected = selectedLayerIds.includes(layer.id)
    const isMultiSelected = multiSelectedIds.includes(layer.id)

    return (
      <LayerItem
        key={layer.id}
        layer={layer}
        level={0} // TODO: Calculate actual nesting level
        isSelected={isSelected}
        isMultiSelected={isMultiSelected}
        onSelect={handleLayerSelect}
        onVisibilityToggle={onLayerVisibilityToggle}
        onLockToggle={onLayerLockToggle}
        onRename={onLayerRename}
        onDelete={onLayerDelete}
        style={style}
      />
    )
  }

  const activeLayer = activeLayerId ? findLayerById(layers, activeLayerId) : null

  return (
    <div className={`layer-panel bg-white border-r border-gray-300 ${className}`}>
      {/* Header */}
      <div className="layer-panel-header p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Layers</h3>
          
          {/* Bulk Actions */}
          {(multiSelectedIds.length > 0 || selectedLayerIds.length > 1) && (
            <div className="flex gap-1">
              <button
                onClick={() => handleBulkAction('group')}
                className="p-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                title="Group selected"
              >
                📁
              </button>
              <button
                onClick={() => handleBulkAction('hide')}
                className="p-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                title="Toggle visibility"
              >
                👁️
              </button>
              <button
                onClick={() => handleBulkAction('lock')}
                className="p-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                title="Toggle lock"
              >
                🔒
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="p-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                title="Delete selected"
              >
                🗑️
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <LayerSearch
        searchTerm={searchTerm}
        filterType={filterType}
        showHidden={showHidden}
        onSearchChange={setSearchTerm}
        onFilterTypeChange={setFilterType}
        onShowHiddenChange={setShowHidden}
        layerCount={layers.length}
        filteredCount={filteredLayers.length}
      />

      {/* Layer List */}
      <div className="layer-list flex-1 overflow-hidden">
        {filteredLayers.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-gray-500">
            <div className="text-center">
              <div className="text-2xl mb-2">📋</div>
              <p className="text-sm">No layers found</p>
              {searchTerm && (
                <p className="text-xs mt-1">Try adjusting your search or filters</p>
              )}
            </div>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext 
              items={filteredLayers.map(layer => layer.id)}
              strategy={verticalListSortingStrategy}
            >
              {listHeight > MAX_VISIBLE_ITEMS * ITEM_HEIGHT ? (
                // Use virtual scrolling for large lists
                <List
                  height={listHeight}
                  itemCount={filteredLayers.length}
                  itemSize={ITEM_HEIGHT}
                  className="scrollbar-thin"
                >
                  {ListItem}
                </List>
              ) : (
                // Render all items for small lists
                <div className="space-y-0">
                  {filteredLayers.map((layer, index) => (
                    <ListItem 
                      key={layer.id}
                      index={index}
                      style={{ height: ITEM_HEIGHT }}
                    />
                  ))}
                </div>
              )}
            </SortableContext>

            {/* Drag Overlay */}
            <DragOverlay>
              {activeLayer && (
                <div className="bg-white border border-gray-300 rounded shadow-lg">
                  <LayerItem
                    layer={activeLayer}
                    level={0}
                    isSelected={false}
                    isMultiSelected={false}
                    onSelect={() => {}}
                    onVisibilityToggle={() => {}}
                    onLockToggle={() => {}}
                    onRename={() => {}}
                    onDelete={() => {}}
                    isDragging={true}
                  />
                </div>
              )}
            </DragOverlay>
          </DndContext>
        )}
      </div>

      {/* Footer with selection info */}
      {(selectedLayerIds.length > 0 || multiSelectedIds.length > 0) && (
        <div className="layer-panel-footer p-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
          {multiSelectedIds.length > 0 
            ? `${multiSelectedIds.length} layers selected`
            : `${selectedLayerIds.length} layer${selectedLayerIds.length !== 1 ? 's' : ''} selected`
          }
          
          {multiSelectedIds.length > 1 && (
            <button
              onClick={() => setMultiSelectedIds([])}
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              Clear selection
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default LayerPanel
