import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { CanvasObject, EditorProject } from '../types'

interface UseCanvasEditorProps {
  canvasId: string
  width: number
  height: number
  onObjectModified?: (object: CanvasObject) => void
}

export const useCanvasEditor = ({ canvasId, width, height, onObjectModified }: UseCanvasEditorProps) => {
  const canvasRef = useRef<fabric.Canvas | null>(null)
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])
  const [zoom, setZoom] = useState(1)

  // Initialize canvas with minimal setup
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasId, {
      width,
      height,
      backgroundColor: 'white',
      selection: true,
      preserveObjectStacking: true
    })

    canvasRef.current = canvas

    // Simple selection tracking
    canvas.on('selection:created', () => {
      setSelectedObjects(canvas.getActiveObjects())
    })
    
    canvas.on('selection:updated', () => {
      setSelectedObjects(canvas.getActiveObjects())
    })
    
    canvas.on('selection:cleared', () => {
      setSelectedObjects([])
    })

    // Let Fabric.js handle text editing naturally
    canvas.on('mouse:dblclick', (e) => {
      if (e.target && e.target.type === 'i-text') {
        const textObj = e.target as fabric.IText
        textObj.enterEditing()
      }
    })

    return () => {
      canvas.dispose()
    }
  }, [canvasId, width, height])

  const addText = (text: string = 'Click to edit') => {
    if (!canvasRef.current) return
    
    const textObj = new fabric.IText(text, {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: '#000000',
      fontFamily: 'Arial'
    })
    
    canvasRef.current.add(textObj)
    canvasRef.current.setActiveObject(textObj)
    textObj.setCoords()
    canvasRef.current.renderAll()
  }

  const addRectangle = () => {
    if (!canvasRef.current) return
    
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 80,
      fill: '#FF6B6B',
      stroke: '#000000',
      strokeWidth: 1
    })
    
    canvasRef.current.add(rect)
    canvasRef.current.setActiveObject(rect)
    rect.setCoords()
    canvasRef.current.renderAll()
  }

  const addCircle = () => {
    if (!canvasRef.current) return
    
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: '#4ECDC4',
      stroke: '#000000',
      strokeWidth: 1
    })
    
    canvasRef.current.add(circle)
    canvasRef.current.setActiveObject(circle)
    circle.setCoords()
    canvasRef.current.renderAll()
  }

  const deleteSelected = () => {
    if (!canvasRef.current) return
    const activeObjects = canvasRef.current.getActiveObjects()
    canvasRef.current.remove(...activeObjects)
    canvasRef.current.discardActiveObject()
    canvasRef.current.renderAll()
  }

  const exportToPNG = (): string | null => {
    if (!canvasRef.current) return null
    return canvasRef.current.toDataURL('image/png')
  }

  return {
    canvas: canvasRef.current,
    selectedObjects,
    zoom,
    addText,
    addRectangle,
    addCircle,
    deleteSelected,
    exportToPNG
  }
}
