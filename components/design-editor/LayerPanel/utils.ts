import { fabric } from 'fabric'
import { LayerNode } from './types'

// Generate thumbnail for layer item
export const generateLayerThumbnail = (fabricObject: fabric.Object, size: number = 32): string => {
  try {
    // Create a temporary canvas for thumbnail generation
    const tempCanvas = new fabric.Canvas(null, {
      width: size,
      height: size,
      backgroundColor: 'transparent'
    })

    // Clone the object to avoid modifying original
    const clonedObj = fabric.util.object.clone(fabricObject)
    
    // Calculate scale to fit thumbnail
    const objBounds = clonedObj.getBoundingRect()
    const scale = Math.min(size / objBounds.width, size / objBounds.height) * 0.8
    
    // Position and scale the object
    clonedObj.set({
      left: size / 2,
      top: size / 2,
      scaleX: clonedObj.scaleX * scale,
      scaleY: clonedObj.scaleY * scale
    })
    clonedObj.setCoords()
    
    tempCanvas.add(clonedObj)
    tempCanvas.centerObject(clonedObj)
    
    // Generate data URL
    const dataURL = tempCanvas.toDataURL({
      format: 'png',
      quality: 0.8,
      multiplier: 1
    })
    
    tempCanvas.dispose()
    return dataURL
  } catch (error) {
    console.warn('Failed to generate thumbnail:', error)
    return ''
  }
}

// Convert Fabric.js objects to layer structure
export const fabricObjectsToLayers = (objects: fabric.Object[]): LayerNode[] => {
  return objects.map((obj, index) => {
    // Ensure every object has an ID
    let id = (obj as any).id
    if (!id) {
      id = `layer-${Date.now()}-${index}`
      ;(obj as any).id = id
    }
    
    const type = obj.type || 'object'
    
    // Generate a readable name based on object type
    let name = ''
    switch (type) {
      case 'i-text':
      case 'text':
        const textContent = (obj as fabric.IText).text || 'Empty'
        name = `Text: ${textContent.substring(0, 20)}${textContent.length > 20 ? '...' : ''}`
        break
      case 'rect':
        name = 'Rectangle'
        break
      case 'circle':
        name = 'Circle'
        break
      case 'triangle':
        name = 'Triangle'
        break
      case 'line':
        name = 'Line'
        break
      case 'image':
        name = 'Image'
        break
      case 'group':
        name = `Group (${(obj as fabric.Group).getObjects().length} items)`
        break
      default:
        name = type.charAt(0).toUpperCase() + type.slice(1)
    }

    return {
      id,
      name,
      type,
      visible: obj.visible !== false,
      locked: obj.selectable === false,
      selected: false,
      zIndex: objects.length - index - 1, // Reverse index for visual order
      fabricObject: obj,
      thumbnail: '' // Will be generated lazily
    }
  }).reverse() // Reverse to match visual layer order (top to bottom)
}

// Filter layers based on search criteria
export const filterLayers = (
  layers: LayerNode[], 
  searchTerm: string, 
  filterType: string,
  showHidden: boolean
): LayerNode[] => {
  return layers.filter(layer => {
    // Search term filter
    const matchesSearch = !searchTerm || 
      layer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      layer.type.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Type filter
    const matchesType = filterType === 'all' || 
      (filterType === 'text' && ['text', 'i-text'].includes(layer.type)) ||
      (filterType === 'shapes' && ['rect', 'circle', 'triangle', 'line', 'polygon'].includes(layer.type)) ||
      (filterType === 'images' && layer.type === 'image') ||
      (filterType === 'groups' && layer.type === 'group')
    
    // Visibility filter
    const matchesVisibility = showHidden || layer.visible
    
    return matchesSearch && matchesType && matchesVisibility
  })
}

// Get layer by ID from hierarchical structure
export const findLayerById = (layers: LayerNode[], id: string): LayerNode | null => {
  for (const layer of layers) {
    if (layer.id === id) return layer
    if (layer.children) {
      const found = findLayerById(layer.children, id)
      if (found) return found
    }
  }
  return null
}

// Update layer in hierarchical structure
export const updateLayerInTree = (
  layers: LayerNode[], 
  layerId: string, 
  updates: Partial<LayerNode>
): LayerNode[] => {
  return layers.map(layer => {
    if (layer.id === layerId) {
      return { ...layer, ...updates }
    }
    if (layer.children) {
      return {
        ...layer,
        children: updateLayerInTree(layer.children, layerId, updates)
      }
    }
    return layer
  })
}

// Reorder layers in the structure
export const reorderLayers = (
  layers: LayerNode[],
  sourceId: string,
  destinationIndex: number,
  destinationParentId?: string
): LayerNode[] => {
  // Find and remove the source layer
  let sourceLayer: LayerNode | null = null
  
  const removeLayer = (layerList: LayerNode[]): LayerNode[] => {
    return layerList.filter(layer => {
      if (layer.id === sourceId) {
        sourceLayer = layer
        return false
      }
      if (layer.children) {
        layer.children = removeLayer(layer.children)
      }
      return true
    })
  }
  
  let newLayers = removeLayer([...layers])
  
  if (!sourceLayer) return layers
  
  // Insert at new position
  if (destinationParentId) {
    // Insert into a group
    const updateParent = (layerList: LayerNode[]): LayerNode[] => {
      return layerList.map(layer => {
        if (layer.id === destinationParentId) {
          const newChildren = [...(layer.children || [])]
          newChildren.splice(destinationIndex, 0, { ...sourceLayer!, parentId: destinationParentId })
          return { ...layer, children: newChildren }
        }
        if (layer.children) {
          return { ...layer, children: updateParent(layer.children) }
        }
        return layer
      })
    }
    newLayers = updateParent(newLayers)
  } else {
    // Insert at root level
    newLayers.splice(destinationIndex, 0, { ...sourceLayer, parentId: undefined })
  }
  
  return newLayers
}

// Debounce utility function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
