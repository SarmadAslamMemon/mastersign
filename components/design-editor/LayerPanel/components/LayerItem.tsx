import React, { useState, useRef, useEffect, memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { LayerItemProps } from '../types'
import { generateLayerThumbnail } from '../utils'

const LayerItem: React.FC<LayerItemProps> = memo(({
  layer,
  level,
  isSelected,
  isMultiSelected,
  onSelect,
  onVisibilityToggle,
  onLockToggle,
  onRename,
  onDelete,
  style
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(layer.name)
  const [thumbnail, setThumbnail] = useState<string>(layer.thumbnail || '')
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)
  const editInputRef = useRef<HTMLInputElement>(null)
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: layer.id })

  // Generate thumbnail lazily
  useEffect(() => {
    if (!thumbnail && layer.fabricObject) {
      const generateThumbnail = async () => {
        try {
          const thumbUrl = generateLayerThumbnail(layer.fabricObject, 24)
          setThumbnail(thumbUrl)
        } catch (error) {
          console.warn('Failed to generate thumbnail for layer:', layer.id)
        }
      }
      
      // Delay thumbnail generation to improve performance
      const timeoutId = setTimeout(generateThumbnail, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [thumbnail, layer.fabricObject, layer.id])

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus()
      editInputRef.current.select()
    }
  }, [isEditing])

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    ...style
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const multiSelect = e.ctrlKey || e.metaKey || e.shiftKey
    onSelect(layer.id, multiSelect)
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleRename = () => {
    if (editName.trim() && editName !== layer.name) {
      onRename(layer.id, editName.trim())
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename()
    } else if (e.key === 'Escape') {
      setEditName(layer.name)
      setIsEditing(false)
    }
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsContextMenuOpen(true)
  }

  const getLayerIcon = () => {
    switch (layer.type) {
      case 'i-text':
      case 'text':
        return '📝'
      case 'rect':
        return '⬜'
      case 'circle':
        return '⭕'
      case 'triangle':
        return '🔺'
      case 'line':
        return '📏'
      case 'image':
        return '🖼️'
      case 'group':
        return '📁'
      default:
        return '🔷'
    }
  }

  const indentWidth = level * 16

  return (
    <div
      ref={setNodeRef}
      style={dragStyle}
      className={`
        layer-item flex items-center gap-2 px-2 py-1 hover:bg-gray-50 cursor-pointer
        ${isSelected ? 'bg-blue-100 border-l-2 border-blue-500' : ''}
        ${isMultiSelected ? 'bg-blue-50' : ''}
        ${layer.locked ? 'opacity-60' : ''}
        ${isDragging ? 'z-50 shadow-lg' : ''}
      `}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      {/* Indentation for hierarchy */}
      <div style={{ width: indentWidth }} />

      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="drag-handle w-3 h-3 cursor-grab active:cursor-grabbing opacity-50 hover:opacity-100"
      >
        ⋮⋮
      </div>

      {/* Thumbnail */}
      <div className="thumbnail w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-xs">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={layer.name}
            className="w-full h-full object-contain rounded"
          />
        ) : (
          <span>{getLayerIcon()}</span>
        )}
      </div>

      {/* Layer Name */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={handleKeyDown}
            className="w-full px-1 py-0 text-sm border border-blue-500 rounded focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="text-sm truncate block">
            {layer.name}
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="controls flex items-center gap-1">
        {/* Visibility Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onVisibilityToggle(layer.id)
          }}
          className={`
            w-5 h-5 flex items-center justify-center rounded hover:bg-gray-200
            ${layer.visible ? 'text-gray-700' : 'text-gray-300'}
          `}
          title={layer.visible ? 'Hide layer' : 'Show layer'}
        >
          {layer.visible ? '👁️' : '🙈'}
        </button>

        {/* Lock Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onLockToggle(layer.id)
          }}
          className={`
            w-5 h-5 flex items-center justify-center rounded hover:bg-gray-200
            ${layer.locked ? 'text-red-500' : 'text-gray-400'}
          `}
          title={layer.locked ? 'Unlock layer' : 'Lock layer'}
        >
          {layer.locked ? '🔒' : '🔓'}
        </button>

        {/* Delete Button (show on hover) */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(layer.id)
          }}
          className="w-5 h-5 flex items-center justify-center rounded hover:bg-red-100 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Delete layer"
        >
          🗑️
        </button>
      </div>
    </div>
  )
})

LayerItem.displayName = 'LayerItem'

export default LayerItem
