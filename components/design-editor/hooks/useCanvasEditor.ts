import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { CanvasObject, EditorProject } from '../types'
import { Template, TemplateObject } from '../data/templates'
import { BackgroundImageService, BackgroundImageOptions, BackgroundPreset } from '../services/BackgroundImageService'

interface UseCanvasEditorProps {
  canvasId: string
  width: number
  height: number
  onObjectModified?: (object: CanvasObject) => void
}

export const useCanvasEditor = ({ canvasId, width, height, onObjectModified }: UseCanvasEditorProps) => {
  const canvasRef = useRef<fabric.Canvas | null>(null)
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])
  const [zoom, setZoom] = useState(0.8) // Start at 80% zoom instead of 100% - this is the default zoom level
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null)
  const backgroundService = BackgroundImageService.getInstance()
  
  // Drawing state variables
  let isDrawing = false
  let startPoint: { x: number; y: number } | null = null
  let currentShape: fabric.Object | null = null

  // Utility function to generate unique IDs
  const generateId = () => `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Initialize canvas with minimal setup
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasId, {
      width,
      height,
      backgroundColor: 'white',
      selection: true,
      preserveObjectStacking: true,
      // Enhanced selection and interaction settings
      selectionColor: 'rgba(74, 144, 226, 0.3)',
      selectionBorderColor: '#4A90E2',
      selectionLineWidth: 2,
      // Better object interaction
      allowTouchScrolling: true,
      // Improved selection behavior
      selectionFullyContained: false
    })

    canvasRef.current = canvas

    // Apply initial zoom (80%) - this is the default zoom level for the application
    canvas.setZoom(0.8)
    console.log('🔍 Initial zoom set to 80%')

    // Enhanced selection tracking with better UX
    canvas.on('selection:created', () => {
       const activeObjects = canvas.getActiveObjects()
       setSelectedObjects(activeObjects)
       console.log('🎯 Selection created:', activeObjects.length, 'objects')
       
       // Highlight selected objects
       activeObjects.forEach(obj => {
         obj.set('borderColor', '#4A90E2')
         obj.set('borderScaleFactor', 2)
       })
       
       // If background is selected with other objects, ensure it moves with them
       handleBackgroundGroupSelection(activeObjects)
       
       canvas.renderAll()
     })
    
    canvas.on('selection:updated', () => {
      const activeObjects = canvas.getActiveObjects()
      setSelectedObjects(activeObjects)
      console.log('🔄 Selection updated:', activeObjects.length, 'objects')
      
      // Update highlights
      canvas.getObjects().forEach(obj => {
        if (activeObjects.includes(obj)) {
          obj.set('borderColor', '#4A90E2')
          obj.set('borderScaleFactor', 2)
        } else {
          obj.set('borderColor', 'transparent')
          obj.set('borderScaleFactor', 1)
        }
      })
      canvas.renderAll()
    })
    
    canvas.on('selection:cleared', () => {
      setSelectedObjects([])
      console.log('❌ Selection cleared')
      
      // Remove all highlights
      canvas.getObjects().forEach(obj => {
        obj.set('borderColor', 'transparent')
        obj.set('borderScaleFactor', 1)
      })
      canvas.renderAll()
    })

         // Enhanced object interaction with smooth movement
     canvas.on('object:moving', (e) => {
       console.log('🚀 Object moving:', e.target?.id)
       
       // Show alignment guides
       showAlignmentGuides(e.target)
       
       // If moving a template object, also move its background
       if (e.target && (e.target as any).templateRole !== 'template-background') {
         moveBackgroundWithTemplate(e.target)
       }
     })

    canvas.on('object:scaling', (e) => {
      console.log('📏 Object scaling:', e.target?.id)
      
      // Maintain aspect ratio for certain objects
      if (e.target && (e.target as any).maintainAspectRatio) {
        const scaleX = e.target.scaleX || 1
        const scaleY = e.target.scaleY || 1
        if (Math.abs(scaleX - scaleY) > 0.1) {
          const avgScale = (scaleX + scaleY) / 2
          e.target.set({ scaleX: avgScale, scaleY: avgScale })
        }
      }
    })

    canvas.on('object:rotating', (e) => {
      console.log('🔄 Object rotating:', e.target?.id)
      
      // Snap to common angles (0, 45, 90, 135, 180, 225, 270, 315)
      if (e.target) {
        const angle = e.target.angle || 0
        const snappedAngle = Math.round(angle / 45) * 45
        if (Math.abs(angle - snappedAngle) < 10) {
          e.target.set('angle', snappedAngle)
        }
      }
    })

    // Add hover effects for better UX
    canvas.on('mouse:over', (e) => {
      if (e.target && !e.target.isSelected) {
        e.target.set('opacity', 0.8)
        canvas.defaultCursor = 'pointer'
        canvas.renderAll()
      }
    })

    canvas.on('mouse:out', (e) => {
      if (e.target && !e.target.isSelected) {
        e.target.set('opacity', e.target.originalOpacity || 1)
        canvas.defaultCursor = 'default'
        canvas.renderAll()
      }
    })



    // Let Fabric.js handle text editing naturally
    canvas.on('mouse:dblclick', (e) => {
      if (e.target && e.target.type === 'i-text') {
        const textObj = e.target as fabric.IText
        textObj.enterEditing()
      }
    })



    // Handle drawing shapes and image clicks
    canvas.on('mouse:down', (e) => {
      // First check if we're in drawing mode
      const currentTool = (canvasRef.current as any).currentTool || 'select'
      console.log('🖱️ Mouse down - Current tool:', currentTool, 'isDrawing:', isDrawing)
      
      // If we're already drawing, don't start a new shape
      if (isDrawing) {
        return
      }
      
      if (currentTool === 'rectangle' || currentTool === 'circle') {
        // Don't start drawing if clicking on an existing object
        if (e.target) {
          console.log('⚠️ Clicked on existing object, not starting new shape')
          return
        }
        
        // Start drawing mode
        isDrawing = true
        const pointer = canvas.getPointer(e.e)
        startPoint = { x: pointer.x, y: pointer.y }
        
        if (currentTool === 'rectangle') {
          currentShape = new fabric.Rect({
            left: startPoint.x,
            top: startPoint.y,
            width: 0,
            height: 0,
            fill: '#FF6B6B',
            stroke: '#000000',
            strokeWidth: 1,
            selectable: false,
            evented: false
          })
        } else if (currentTool === 'circle') {
          currentShape = new fabric.Circle({
            left: startPoint.x,
            top: startPoint.y,
            radius: 0,
            fill: '#4ECDC4',
            stroke: '#000000',
            strokeWidth: 1,
            selectable: false,
            evented: false
          })
        }
        
        if (currentShape) {
          canvas.add(currentShape)
          canvas.renderAll()
          console.log('🎨 Started drawing shape:', currentTool)
        }
        return // Exit early, don't handle image clicks when drawing
      }
      
      // Handle image clicks for upload (only when not drawing)
      if (e.target && e.target.type === 'image' && e.e.button === 0) {
        const imageObj = e.target as fabric.Image
        const templateId = (imageObj as any).templateId
        
        console.log('🖼️ Image clicked!', {
          type: imageObj.type,
          templateId: templateId,
          isEditable: (imageObj as any).isEditable,
          isRequired: (imageObj as any).isRequired,
          templateRole: (imageObj as any).templateRole,
          id: imageObj.id
        })
        
        // Check if this is an editable template image
        if (templateId && (imageObj as any).isEditable) {
          console.log('✅ Triggering image upload for:', templateId)
          // Trigger file upload dialog
          triggerImageUpload(templateId)
        } else {
          console.log('❌ Image not editable or missing templateId:', {
            hasTemplateId: !!templateId,
            isEditable: (imageObj as any).isEditable,
            templateId: templateId
          })
          
          // Debug: Log all image objects on canvas
          const allImages = canvas.getObjects().filter(obj => obj.type === 'image')
          console.log('🔍 All image objects on canvas:', allImages.map(img => ({
            id: img.id,
            templateId: (img as any).templateId,
            isEditable: (img as any).isEditable,
            templateRole: (img as any).templateRole
          })))
        }
      }
      
      // Handle clicking on template elements - switch to selector cursor
      if (e.target && e.target.selectable) {
        // Switch to select tool when clicking on template elements
        ;(canvasRef.current as any).currentTool = 'select'
        canvasRef.current.defaultCursor = 'move'
        canvasRef.current.selection = true
        console.log('🎯 Clicked on template element, switched to selector mode')
      } else if (!e.target) {
        // Clicked outside template elements (empty canvas space) - show arrow cursor
        canvasRef.current.defaultCursor = 'default'
        console.log('⬆️ Clicked outside template, showing arrow cursor')
      }
    })

    // Handle drawing shapes - mouse move
    canvas.on('mouse:move', (e) => {
      if (!isDrawing || !startPoint || !currentShape || !canvasRef.current) return
      
      const currentTool = (canvasRef.current as any).currentTool || 'select'
      const pointer = canvas.getPointer(e.e)
      
      // Update shape dimensions while drawing
      if (currentShape.type === 'rect') {
        const rect = currentShape as fabric.Rect
        const width = Math.abs(pointer.x - startPoint.x)
        const height = Math.abs(pointer.y - startPoint.y)
        const left = Math.min(pointer.x, startPoint.x)
        const top = Math.min(pointer.y, startPoint.y)
        
        rect.set({
          left: left,
          top: top,
          width: width,
          height: height
        })
      } else if (currentShape.type === 'circle') {
        const circle = currentShape as fabric.Circle
        const radius = Math.sqrt(
          Math.pow(pointer.x - startPoint.x, 2) + 
          Math.pow(pointer.y - startPoint.y, 2)
        ) / 2
        
        const centerX = (startPoint.x + pointer.x) / 2
        const centerY = (startPoint.y + pointer.y) / 2
        
        circle.set({
          left: centerX - radius,
          top: centerY - radius,
          radius: radius
        })
      }
      
      canvas.renderAll()
    })
    
    // Enhanced mouse move handler for cursor management
    canvas.on('mouse:move', (e) => {
      if (!canvasRef.current) return
      
      const currentTool = (canvasRef.current as any).currentTool || 'select'
      
      // Only handle cursor changes when not drawing
      if (isDrawing) return
      
      if (e.target) {
        // Hovering over an object
        if (e.target.type === 'image' && (e.target as any).isEditable) {
          // Show pointer cursor for editable images
          canvasRef.current.defaultCursor = 'pointer'
        } else if (e.target.selectable) {
          // Show move cursor for selectable objects
          canvasRef.current.defaultCursor = 'move'
        } else {
          // Show default cursor for non-selectable objects
          canvasRef.current.defaultCursor = 'default'
        }
      } else {
        // Not hovering over any object - show cursor based on current tool
        if (currentTool === 'select') {
          canvasRef.current.defaultCursor = 'default' // Arrow cursor
        } else if (currentTool === 'text') {
          canvasRef.current.defaultCursor = 'text'
        } else if (currentTool === 'rectangle' || currentTool === 'circle') {
          canvasRef.current.defaultCursor = 'crosshair'
        } else {
          canvasRef.current.defaultCursor = 'default'
        }
      }
      
      canvas.renderAll()
    })

    // Handle drawing shapes - mouse up
    canvas.on('mouse:up', (e) => {
      if (!isDrawing || !currentShape || !canvasRef.current) return
      
      isDrawing = false
      startPoint = null
      
      // Make the shape selectable and interactive
      currentShape.set({
        selectable: true,
        evented: true,
        hasControls: true,
        hasBorders: true
      })
      
      currentShape.id = generateId()
      currentShape.setCoords()
      canvas.renderAll()
      
      // Reset to select tool after drawing
      ;(canvasRef.current as any).currentTool = 'select'
      canvasRef.current.defaultCursor = 'default' // Arrow cursor
      canvasRef.current.selection = true
      
      console.log('✅ Shape drawn and tool reset to select with arrow cursor')
    })

    // Add hover effects for editable images
    canvas.on('mouse:over', (e) => {
      if (e.target && e.target.type === 'image') {
        const imageObj = e.target as fabric.Image
        if ((imageObj as any).isEditable) {
          canvas.defaultCursor = 'pointer'
          // Add a subtle highlight effect
          imageObj.set('opacity', 0.8)
          canvas.renderAll()
        }
      }
    })

    canvas.on('mouse:out', (e) => {
      if (e.target && e.target.type === 'image') {
        const imageObj = e.target as fabric.Image
        if ((imageObj as any).isEditable) {
          // Reset to default cursor (arrow) when not hovering over objects
          canvas.defaultCursor = 'default'
          // Restore original opacity
          imageObj.set('opacity', (imageObj as any).originalOpacity || 1)
          canvas.renderAll()
        }
      }
    })

    // Enhanced zoom functionality with performance optimization
    let zoomTimeout: NodeJS.Timeout
    canvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY
      let zoom = canvas.getZoom()
      zoom *= 0.999 ** delta

      // Limit zoom range
      if (zoom > 5) zoom = 5
      if (zoom < 0.1) zoom = 0.1

      // Zoom towards mouse position
      const point = new fabric.Point(opt.e.offsetX, opt.e.offsetY)
      canvas.zoomToPoint(point, zoom)
      
      setZoom(zoom)
      
      // Debounce zoom rendering for better performance
      clearTimeout(zoomTimeout)
      zoomTimeout = setTimeout(() => {
        canvas.renderAll()
      }, 50)
      
      opt.e.preventDefault()
      opt.e.stopPropagation()
    })

    // Performance optimization: Debounced rendering during interactions
    let renderTimeout: NodeJS.Timeout
    const debouncedRender = () => {
      clearTimeout(renderTimeout)
      renderTimeout = setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.renderAll()
        }
      }, 16) // ~60fps
    }

    // Use debounced rendering for heavy operations
    canvas.on('object:modified', debouncedRender)
    canvas.on('object:added', debouncedRender)
    canvas.on('object:removed', debouncedRender)

    // Add panning with middle mouse button or space + drag
    let isDragging = false
    let lastPosX = 0
    let lastPosY = 0

    canvas.on('mouse:down', (opt) => {
      const evt = opt.e
      if (evt.button === 1 || (evt.button === 0 && evt.spaceKey)) { // Middle mouse or space + left click
        isDragging = true
        canvas.selection = false
        lastPosX = evt.clientX
        lastPosY = evt.clientY
        canvas.defaultCursor = 'grab'
        canvas.hoverCursor = 'grab'
      }
    })

    canvas.on('mouse:move', (opt) => {
      if (isDragging) {
        const evt = opt.e
        const vpt = canvas.viewportTransform!
        vpt[4] += evt.clientX - lastPosX
        vpt[5] += evt.clientY - lastPosY
        canvas.requestRenderAll()
        lastPosX = evt.clientX
        lastPosY = evt.clientY
        
        setPanX(vpt[4])
        setPanY(vpt[5])
      }
    })

    canvas.on('mouse:up', () => {
      isDragging = false
      canvas.selection = true
      canvas.defaultCursor = 'default'
      canvas.hoverCursor = 'move'
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

  const addImage = (file?: File) => {
    if (!canvasRef.current) return

    if (file) {
      // Load image from file
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const fabricImage = new fabric.Image(img, {
            left: 100,
            top: 100,
            originX: 'center',
            originY: 'center',
            cornerSize: 12,
            cornerStyle: 'circle',
            borderColor: '#4A90E2',
            cornerColor: '#4A90E2',
            transparentCorners: false,
          })

          fabricImage.id = generateId()
          fabricImage.setCoords()
          canvasRef.current?.add(fabricImage)
          canvasRef.current?.setActiveObject(fabricImage)
          canvasRef.current?.renderAll()
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    } else {
      // Create placeholder image
      const placeholderImg = new Image()
      placeholderImg.onload = () => {
        const fabricImage = new fabric.Image(placeholderImg, {
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          originX: 'center',
          originY: 'center',
          cornerSize: 12,
          cornerStyle: 'circle',
          borderColor: '#4A90E2',
          cornerColor: '#4A90E2',
          transparentCorners: false,
        })

        fabricImage.id = generateId()
        fabricImage.setCoords()
        canvasRef.current?.add(fabricImage)
        canvasRef.current?.setActiveObject(fabricImage)
        canvasRef.current?.renderAll()
      }
      // Create a simple placeholder SVG
      const svgData = 'data:image/svg+xml;base64,' + btoa(`
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#f0f0f0" stroke="#ccc" stroke-width="2"/>
          <text x="50" y="55" text-anchor="middle" fill="#999" font-family="Arial" font-size="12">IMAGE</text>
        </svg>
      `)
      placeholderImg.src = svgData
    }
  }

  const replaceImage = (templateId: string, file: File) => {
    if (!canvasRef.current) return

    // Find the object by templateId instead of id
    const obj = canvasRef.current.getObjects().find(o => (o as any).templateId === templateId)
    if (!obj || obj.type !== 'image') {
      console.error('❌ Object not found or not an image:', templateId)
      console.log('🔍 Available objects:', canvasRef.current.getObjects().map(o => ({
        id: o.id,
        templateId: (o as any).templateId,
        type: o.type,
        isEditable: (o as any).isEditable
      })))
      return
    }

    console.log('🔄 Replacing image for object:', templateId)
    console.log('📁 File:', file.name, file.type, file.size)
    console.log('🎯 Original object properties:', {
      left: obj.left,
      top: obj.top,
      width: obj.width,
      height: obj.height,
      scaleX: obj.scaleX,
      scaleY: obj.scaleY
    })
    
    // Lock template layout to prevent movement during replacement
    lockTemplateLayout()

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        // Get the target dimensions from the placeholder
        const targetWidth = obj.width || 100
        const targetHeight = obj.height || 100
        
        // Calculate scale to fit the image within the target bounds while maintaining aspect ratio
        const scaleX = targetWidth / img.width
        const scaleY = targetHeight / img.height
        const scale = Math.min(scaleX, scaleY) // Maintain aspect ratio
        
        // Calculate the actual dimensions the image will have after scaling
        const scaledWidth = img.width * scale
        const scaledHeight = img.height * scale
        
        console.log('📏 Image scaling:', {
          originalImageSize: { width: img.width, height: img.height },
          targetSize: { width: targetWidth, height: targetHeight },
          calculatedScale: scale,
          finalScaledSize: { width: scaledWidth, height: scaledHeight }
        })

        // Preserve the object's current properties and metadata EXACTLY
        const fabricImage = new fabric.Image(img, {
          left: obj.left || 0,
          top: obj.top || 0,
          width: targetWidth,        // Set explicit width to match placeholder
          height: targetHeight,      // Set explicit height to match placeholder
          scaleX: scale,
          scaleY: scale,
          angle: obj.angle || 0,
          originX: obj.originX || 'center',
          originY: obj.originY || 'center',
          cornerSize: 12,
          cornerStyle: 'circle',
          borderColor: '#4A90E2',
          cornerColor: '#4A90E2',
          transparentCorners: false,
        })
        
        // Ensure the image is positioned exactly where the original was
        fabricImage.setCoords()
        
        // Double-check positioning to prevent any drift
        if (obj.left !== undefined && obj.top !== undefined) {
          fabricImage.set({
            left: obj.left,
            top: obj.top
          })
        }

        // Copy all the important metadata from the original object
        fabricImage.id = obj.id
        fabricImage.setCoords()
        
        // Copy template metadata
        if ((obj as any).templateId) {
          (fabricImage as any).templateId = (obj as any).templateId
        }
        if ((obj as any).templateRole) {
          (fabricImage as any).templateRole = (obj as any).templateRole
        }
        if ((obj as any).isEditable !== undefined) {
          (fabricImage as any).isEditable = (obj as any).isEditable
        }
        if ((obj as any).isRequired !== undefined) {
          (fabricImage as any).isRequired = (obj as any).isRequired
        }
        if ((obj as any).placeholder) {
          (fabricImage as any).placeholder = (obj as any).placeholder
        }
        if ((obj as any).originalOpacity !== undefined) {
          (fabricImage as any).originalOpacity = (obj as any).originalOpacity
        }
        
        // Ensure the new image is properly interactive
        fabricImage.set({
          selectable: (obj as any).isEditable !== false,
          evented: (obj as any).isEditable !== false,
          lockMovementX: false,
          lockMovementY: false,
          lockRotation: false,
          lockScalingX: false,
          lockScalingY: false,
          hasControls: (obj as any).isEditable !== false,
          hasBorders: (obj as any).isEditable !== false,
          cornerSize: (obj as any).isEditable !== false ? 12 : 0,
          cornerStyle: 'circle',
          borderColor: (obj as any).isEditable !== false ? '#4A90E2' : 'transparent',
          cornerColor: '#4A90E2',
          transparentCorners: false
        })
        
        // Ensure proper event handling
        if ((obj as any).isEditable !== false) {
          fabricImage.on('mousedown', () => {
            console.log('🖼️ Editable image clicked for manipulation')
          })
        }
        
                // Replace the old object
        canvasRef.current?.remove(obj)
        canvasRef.current?.add(fabricImage)
        canvasRef.current?.setActiveObject(fabricImage)
        
        // Preserve template layout - ensure other objects don't move
        preserveTemplateLayout()
        
        // Unlock template layout after replacement
        unlockTemplateLayout()
        
        canvasRef.current?.renderAll()
        
        console.log('✅ Image replaced successfully with preserved metadata and interaction')
        console.log('🎯 Final image dimensions:', {
          width: fabricImage.width,
          height: fabricImage.height,
          scaleX: fabricImage.scaleX,
          scaleY: fabricImage.scaleY
        })
      }
      img.onerror = () => {
        console.error('❌ Failed to load image')
      }
      img.src = e.target?.result as string
    }
    reader.onerror = () => {
      console.error('❌ Failed to read file')
    }
    reader.readAsDataURL(file)
  }

  const triggerImageUpload = (templateId: string) => {
    // Create a hidden file input
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.style.display = 'none'
    
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement
      const file = target.files?.[0]
      
      if (file) {
        console.log('📁 File selected:', file.name)
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          console.error('❌ Invalid file type:', file.type)
          alert('Please select an image file (JPEG, PNG, GIF, etc.)')
          return
        }
        
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          console.error('❌ File too large:', file.size)
          alert('Please select an image smaller than 10MB')
          return
        }
        
        try {
          replaceImage(templateId, file)
        } catch (error) {
          console.error('❌ Error replacing image:', error)
          alert('Failed to upload image. Please try again.')
        }
      }
      
      // Clean up
      document.body.removeChild(fileInput)
    }
    
    // Handle cancellation
    fileInput.oncancel = () => {
      document.body.removeChild(fileInput)
    }
    
    // Add to DOM and trigger click
    document.body.appendChild(fileInput)
    fileInput.click()
  }

  const deleteSelected = () => {
    if (!canvasRef.current) return
    const activeObjects = canvasRef.current.getActiveObjects()
    canvasRef.current.remove(...activeObjects)
    canvasRef.current.discardActiveObject()
    canvasRef.current.renderAll()
  }

  const exportToPNG = (): string | null => {
    console.log('🔍 exportToPNG function called')
    console.log('🔍 canvasRef.current exists:', !!canvasRef.current)
    
    if (!canvasRef.current) {
      console.error('❌ Canvas reference is null, cannot export')
      return null
    }
    
    try {
      console.log('🔍 Canvas reference found, starting export...')
      
      // Ensure canvas is properly rendered
      console.log('🔍 Rendering canvas...')
      canvasRef.current.renderAll()
      console.log('🔍 Canvas rendered successfully')
      
      // Get canvas dimensions
      const canvas = canvasRef.current
      const canvasWidth = canvas.width || width
      const canvasHeight = canvas.height || height
      
      console.log('📐 Exporting canvas with dimensions:', canvasWidth, 'x', canvasHeight)
      console.log('📐 Canvas width property:', canvas.width)
      console.log('📐 Canvas height property:', canvas.height)
      console.log('📐 Hook width prop:', width)
      console.log('📐 Hook height prop:', height)
      
      // Export with high quality settings
      console.log('🔍 Calling canvas.toDataURL...')
      const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 1.0,
        multiplier: 2 // Higher resolution export
      })
      
      console.log('🔍 toDataURL result received')
      console.log('🔍 Data URL starts with:', dataUrl ? dataUrl.substring(0, 50) + '...' : 'null')
      
      if (dataUrl) {
        console.log('✅ PNG export successful, data URL length:', dataUrl.length)
        return dataUrl
      } else {
        console.error('❌ Failed to generate PNG data URL')
        return null
      }
    } catch (error) {
      console.error('❌ Error during PNG export:', error)
      console.error('❌ Error details:', error instanceof Error ? error.message : 'Unknown error')
      console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace')
      return null
    }
  }

     // Enhanced template loading functionality
   const loadTemplate = (template: Template, options: { 
     clearCanvas?: boolean
     fitToCanvas?: boolean 
   } = {}) => {
     if (!canvasRef.current) return
     
     console.log('🎨 ===== TEMPLATE LOADING STARTED =====')
     console.log('📋 Template:', template.name)
     console.log('🏷️ Template ID:', template.id)
     console.log('📐 Dimensions:', template.dimensions)
     console.log('📦 Total Objects:', template.objects.length)
     console.log('🖼️ Image Objects:', template.objects.filter(obj => obj.type === 'image').length)
     console.log('📝 Text Objects:', template.objects.filter(obj => obj.type === 'text').length)
     console.log('🔲 Shape Objects:', template.objects.filter(obj => ['rectangle', 'circle', 'triangle'].includes(obj.type)).length)

    console.log('🎨 Loading Template:', template.name)
    console.log('📦 Template Objects:', template.objects.length)
    
    const { clearCanvas = true, fitToCanvas = true } = options

    // Clear existing objects if requested
    if (clearCanvas) {
      console.log('🧹 Clearing canvas...')
      canvasRef.current.clear()
      canvasRef.current.backgroundColor = 'white'
    }

    // Calculate scaling and centering
    let scaleX = 1
    let scaleY = 1
    let offsetX = 0
    let offsetY = 0
    
    if (fitToCanvas) {
      const canvasWidth = canvasRef.current.width || width
      const canvasHeight = canvasRef.current.height || height
      
      scaleX = canvasWidth / template.dimensions.width
      scaleY = canvasHeight / template.dimensions.height
      
      // Use the smaller scale to maintain aspect ratio
      const scale = Math.min(scaleX, scaleY, 0.8) // Use 80% of canvas to leave margins
      scaleX = scale
      scaleY = scale
      
      // Calculate centering offset
      const scaledTemplateWidth = template.dimensions.width * scale
      const scaledTemplateHeight = template.dimensions.height * scale
      offsetX = (canvasWidth - scaledTemplateWidth) / 2
      offsetY = (canvasHeight - scaledTemplateHeight) / 2
      
      console.log('📏 Canvas Size:', canvasWidth, 'x', canvasHeight)
      console.log('📐 Template Size:', template.dimensions.width, 'x', template.dimensions.height)
      console.log('🔍 Scale Factor:', scale)
      console.log('📍 Center Offset:', offsetX, 'x', offsetY)
    }

    // Store template reference
    setCurrentTemplate(template)

    // Convert template objects to Fabric.js objects
    let successCount = 0
    let failCount = 0
    
    // Process objects in order to maintain proper layering
    const processObjects = async () => {
      for (let i = 0; i < template.objects.length; i++) {
        const templateObj = template.objects[i]
        console.log(`🔧 Creating object ${i + 1}:`, templateObj.id, templateObj.type, templateObj.templateRole)
        
        const fabricObj = await createFabricObjectFromTemplate(templateObj, scaleX, scaleY, offsetX, offsetY)
        if (fabricObj) {
          canvasRef.current?.add(fabricObj)
          successCount++
          console.log('✅ Added:', templateObj.id)
        } else {
          failCount++
          console.log('❌ Failed:', templateObj.id, templateObj.type)
        }
      }

      console.log(`📊 Template Loading Summary: ${successCount} success, ${failCount} failed`)
      console.log('🎯 Canvas Objects After Load:', canvasRef.current?.getObjects().length)
      
           // Ensure proper object ordering and interaction
     if (canvasRef.current) {
       const canvasObjects = canvasRef.current.getObjects()
       
       // Configure all objects for proper interaction
       canvasObjects.forEach(obj => {
         // Ensure all objects are selectable and interactive
         obj.set({
           selectable: true,
           evented: true,
           hasControls: true,
           hasBorders: true,
           lockMovementX: false,
           lockMovementY: false,
           lockRotation: false,
           lockScalingX: false,
           lockScalingY: false
         })
         
         // Store original positions for movement tracking
         obj.set({
           originalLeft: obj.left,
           originalTop: obj.top
         })
         
         // Add visible borders to all objects for better visibility
         if (obj.type === 'rect' || obj.type === 'image') {
           obj.set({
             stroke: '#4A90E2',
             strokeWidth: 2,
             cornerSize: 12,
             cornerStyle: 'circle',
             borderColor: '#4A90E2',
             cornerColor: '#4A90E2',
             transparentCorners: false
           })
         }
         
         // Bring text objects to front for better editing
         if (obj.type === 'i-text') {
           canvasRef.current?.bringToFront(obj)
         }
       })
        
                 canvasRef.current.renderAll()
         console.log('🎯 All objects configured for smooth interaction')
         
         // Load all pending images after objects are configured
         loadPendingImages()
         
         console.log('🎨 ===== TEMPLATE LOADING COMPLETED =====')
         console.log('✅ Template loaded successfully:', template.name)
         console.log('🎯 Canvas ready for editing')
       }
     }
 
     processObjects()
   }

  const createFabricObjectFromTemplate = async (
    templateObj: TemplateObject, 
    scaleX: number = 1, 
    scaleY: number = 1,
    offsetX: number = 0,
    offsetY: number = 0
  ): Promise<fabric.Object | null> => {
    console.log('🏗️ Creating fabric object for:', templateObj.id)
    console.log('📋 Object properties:', templateObj.properties)
    console.log('🎭 Template metadata:', {
      role: templateObj.templateRole,
      editable: templateObj.isEditable,
      required: templateObj.isRequired
    })
    
    const baseProps = {
      left: (templateObj.properties.left * scaleX) + offsetX,
      top: (templateObj.properties.top * scaleY) + offsetY,
      scaleX: (templateObj.properties.scaleX || 1) * scaleX,
      scaleY: (templateObj.properties.scaleY || 1) * scaleY,
      angle: templateObj.properties.angle || 0,
      fill: templateObj.properties.fill,
      stroke: templateObj.properties.stroke,
      strokeWidth: templateObj.properties.strokeWidth || 0,
      opacity: templateObj.properties.opacity || 1,
      visible: templateObj.properties.visible !== false,
      // Force selectable and evented for all template objects to ensure smooth interaction
      selectable: true,
      evented: true,
      originX: 'center',
      originY: 'center'
    }

    console.log('🎨 Base props calculated:', baseProps)

    // Add template metadata - CRITICAL: Use templateObj.id as templateId
    const templateMetadata = {
      templateId: templateObj.id, // This is the key fix - use templateObj.id
      templateRole: templateObj.templateRole,
      isEditable: templateObj.isEditable,
      isRequired: templateObj.isRequired,
      placeholder: templateObj.placeholder
    }

    let fabricObj: fabric.Object | null = null

    switch (templateObj.type) {
      case 'text':
        console.log('📝 Creating text object...')
        if (templateObj.textProperties) {
          console.log('📄 Text properties:', templateObj.textProperties)
          fabricObj = new fabric.IText(templateObj.textProperties.text, {
            ...baseProps,
            fontSize: (templateObj.textProperties.fontSize || 16) * Math.min(scaleX, scaleY),
            fontFamily: templateObj.textProperties.fontFamily || 'Arial',
            fontWeight: templateObj.textProperties.fontWeight || 'normal',
            textAlign: templateObj.textProperties.textAlign || 'left',
            cornerSize: 12,
            cornerStyle: 'circle',
            borderColor: '#4A90E2',
            cornerColor: '#4A90E2',
            transparentCorners: false,
            hasControls: true,
            hasBorders: true,
            lockMovementX: false,
            lockMovementY: false,
            lockRotation: false,
            lockScalingX: false,
            lockScalingY: false,
            // Add visible text boundaries
            stroke: '#4A90E2',
            strokeWidth: 1,
            ...templateMetadata
          })
          console.log('✅ Text object created with explicit properties')
        } else {
          console.log('❌ No text properties found')
        }
        break

      case 'rectangle':
        console.log('🟦 Creating rectangle object...')
        fabricObj = new fabric.Rect({
          ...baseProps,
          width: (templateObj.properties.width || 100) * scaleX,
          height: (templateObj.properties.height || 100) * scaleY,
          cornerSize: 12,
          cornerStyle: 'circle',
          borderColor: '#4A90E2',
          cornerColor: '#4A90E2',
          transparentCorners: false,
          hasControls: true,
          hasBorders: true,
          lockMovementX: false,
          lockMovementY: false,
          lockRotation: false,
          lockScalingX: false,
          lockScalingY: false,
          ...templateMetadata
        })
        console.log('✅ Rectangle object created with center origin')
        break

      case 'circle':
        console.log('🔵 Creating circle object...')
        const radius = Math.min(
          (templateObj.properties.width || 100) * scaleX, 
          (templateObj.properties.height || 100) * scaleY
        ) / 2
        fabricObj = new fabric.Circle({
          ...baseProps,
          radius: radius,
          cornerSize: 12,
          cornerStyle: 'circle',
          borderColor: '#4A90E2',
          cornerColor: '#4A90E2',
          transparentCorners: false,
          hasControls: true,
          hasBorders: true,
          lockMovementX: false,
          lockMovementY: false,
          lockRotation: false,
          lockScalingX: false,
          lockScalingY: false,
          ...templateMetadata
        })
        console.log('✅ Circle object created with center origin')
        break

      case 'triangle':
        console.log('🔺 Creating triangle object...')
        fabricObj = new fabric.Triangle({
          ...baseProps,
          width: (templateObj.properties.width || 100) * scaleX,
          height: (templateObj.properties.height || 100) * scaleY,
          cornerSize: templateObj.isEditable ? 12 : 0,
          cornerStyle: 'circle',
          borderColor: templateObj.isEditable ? '#4A90E2' : 'transparent',
          cornerColor: '#4A90E2',
          transparentCorners: false,
          ...templateMetadata
        })
        console.log('✅ Triangle object created with center origin')
        break

             case 'image':
         console.log('🖼️ Creating image object...')
         if (templateObj.imageProperties) {
           console.log('📸 Image properties found:', templateObj.imageProperties)
           
           // Create a placeholder first, then load the image asynchronously
           fabricObj = new fabric.Rect({
             ...baseProps,
             width: (templateObj.properties.width || 100) * scaleX,
             height: (templateObj.properties.height || 100) * scaleY,
             fill: '#f0f0f0',
             stroke: '#4A90E2',
             strokeWidth: 3,
             cornerSize: templateObj.isEditable ? 12 : 0,
             cornerStyle: 'circle',
             borderColor: templateObj.isEditable ? '#4A90E2' : '#4A90E2',
             cornerColor: '#4A90E2',
             transparentCorners: false,
             dashArray: [5, 5], // Add dashed border for placeholder
             ...templateMetadata
           })
           
           // Store original opacity for hover effects
           ;(fabricObj as any).originalOpacity = templateObj.properties.opacity || 1
           
           // Store image URL for later loading
           ;(fabricObj as any).pendingImageUrl = templateObj.imageProperties.src
           ;(fabricObj as any).isImagePlaceholder = true
           
           console.log('✅ Image placeholder created, will load image:', templateObj.imageProperties.src)
         } else {
           console.log('❌ No image properties found, creating basic placeholder')
           // Create a basic placeholder if no image properties
           fabricObj = new fabric.Rect({
             ...baseProps,
             width: (templateObj.properties.width || 100) * scaleX,
             height: (templateObj.properties.height || 100) * scaleY,
             fill: '#f0f0f0',
             stroke: '#999',
             strokeWidth: 2,
             cornerSize: templateObj.isEditable ? 12 : 0,
             cornerStyle: 'circle',
             borderColor: templateObj.isEditable ? '#999' : 'transparent',
             cornerColor: '#999',
             transparentCorners: false,
             dashArray: [5, 5],
             ...templateMetadata
           })
         }
         break

      default:
        console.warn(`❌ Unsupported template object type: ${templateObj.type}`)
        return null
    }

    if (fabricObj) {
      fabricObj.setCoords()
      console.log('🎯 Object coordinates set, final object:', fabricObj.type)
      console.log('📍 Final position:', { 
        left: fabricObj.left, 
        top: fabricObj.top, 
        width: fabricObj.width, 
        height: fabricObj.height,
        visible: fabricObj.visible,
        opacity: fabricObj.opacity
      })
      console.log('🎨 Final appearance:', {
        fill: fabricObj.fill,
        stroke: fabricObj.stroke,
        strokeWidth: fabricObj.strokeWidth
      })
    } else {
      console.log('❌ Failed to create fabric object')
    }

    return fabricObj
  }

  const applyColorVariation = (template: Template, variationId: string) => {
    if (!canvasRef.current) return

    const variation = template.colorVariations.find(v => v.id === variationId)
    if (!variation) return

    // Apply colors to matching objects
    canvasRef.current.getObjects().forEach(obj => {
      const templateId = (obj as any).templateId
      if (templateId && variation.colors[templateId]) {
        obj.set('fill', variation.colors[templateId])
      }
    })

    canvasRef.current.renderAll()
  }

  const applyTextVariation = (template: Template, variationId: string) => {
    if (!canvasRef.current || !template.textVariations) return

    const variation = template.textVariations.find(v => v.id === variationId)
    if (!variation) return

    // Apply texts to matching objects
    canvasRef.current.getObjects().forEach(obj => {
      const templateId = (obj as any).templateId
      if (templateId && variation.texts[templateId] && obj.type === 'i-text') {
        (obj as fabric.IText).set('text', variation.texts[templateId])
      }
    })

    canvasRef.current.renderAll()
  }

  // Zoom control functions
  const zoomIn = () => {
    if (!canvasRef.current) return
    const currentZoom = canvasRef.current.getZoom()
    const newZoom = Math.min(currentZoom * 1.2, 5)
    canvasRef.current.setZoom(newZoom)
    setZoom(newZoom)
  }

  const zoomOut = () => {
    if (!canvasRef.current) return
    const currentZoom = canvasRef.current.getZoom()
    const newZoom = Math.max(currentZoom / 1.2, 0.1)
    canvasRef.current.setZoom(newZoom)
    setZoom(newZoom)
  }

  const resetZoom = () => {
    if (!canvasRef.current) return
    canvasRef.current.setZoom(0.8) // Reset to 80% instead of 100%
    canvasRef.current.setViewportTransform([0.8, 0, 0, 0.8, 0, 0]) // Apply 80% zoom
    setZoom(0.8) // Update state to 80%
    setPanX(0)
    setPanY(0)
  }

  const fitToCanvas = () => {
    if (!canvasRef.current) return
    const objects = canvasRef.current.getObjects()
    if (objects.length === 0) return

    // Calculate bounding box of all objects
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    
    objects.forEach(obj => {
      const bounds = obj.getBoundingRect()
      minX = Math.min(minX, bounds.left)
      minY = Math.min(minY, bounds.top)
      maxX = Math.max(maxX, bounds.left + bounds.width)
      maxY = Math.max(maxY, bounds.top + bounds.height)
    })

    const objectWidth = maxX - minX
    const objectHeight = maxY - minY
    const canvasWidth = canvasRef.current.width || width
    const canvasHeight = canvasRef.current.height || height

    // Calculate zoom to fit with some padding
    const zoom = Math.min(
      (canvasWidth * 0.9) / objectWidth,
      (canvasHeight * 0.9) / objectHeight
    )

    // Center the objects
    const centerX = canvasWidth / 2 - (minX + objectWidth / 2) * zoom
    const centerY = canvasHeight / 2 - (minY + objectHeight / 2) * zoom

    canvasRef.current.setViewportTransform([zoom, 0, 0, zoom, centerX, centerY])
    setZoom(zoom)
    setPanX(centerX)
    setPanY(centerY)
  }

     // Load all pending images after template is fully loaded
   const loadPendingImages = () => {
     if (!canvasRef.current) return
     
     console.log('🔄 Loading pending images...')
     const objects = canvasRef.current.getObjects()
     let loadedCount = 0
     let failedCount = 0
     
     objects.forEach((obj, index) => {
       if ((obj as any).isImagePlaceholder && (obj as any).pendingImageUrl) {
         console.log(`🖼️ Loading image ${index + 1}:`, (obj as any).pendingImageUrl)
         
         const img = new Image()
         img.crossOrigin = 'anonymous'
         
         img.onload = () => {
           console.log('✅ Image loaded successfully:', (obj as any).pendingImageUrl)
           
           // Create fabric image with proper properties
           const fabricImage = new fabric.Image(img, {
             left: obj.left,
             top: obj.top,
             width: obj.width,
             height: obj.height,
             scaleX: obj.scaleX || 1,
             scaleY: obj.scaleY || 1,
             angle: obj.angle || 0,
             originX: obj.originX || 'center',
             originY: obj.originY || 'center',
             selectable: obj.selectable,
             evented: obj.evented,
             cornerSize: (obj as any).isEditable ? 12 : 0,
             cornerStyle: 'circle',
             borderColor: (obj as any).isEditable ? '#4A90E2' : 'transparent',
             cornerColor: '#4A90E2',
             transparentCorners: false,
             hasControls: (obj as any).isEditable !== false,
             hasBorders: (obj as any).isEditable !== false
           })
           
           // Copy all custom properties
           Object.keys(obj).forEach(key => {
             if (key !== 'canvas' && key !== 'group' && key !== 'group' && key !== 'evented') {
               ;(fabricImage as any)[key] = (obj as any)[key]
             }
           })
           
           // Ensure proper positioning
           fabricImage.setCoords()
           
           // Replace placeholder with actual image
           if (canvasRef.current) {
             canvasRef.current.remove(obj)
             canvasRef.current.insertAt(fabricImage, index)
             canvasRef.current.renderAll()
             loadedCount++
             console.log(`✅ Image ${loadedCount} replaced placeholder successfully`)
           }
         }
         
         img.onerror = (error) => {
           console.error('❌ Failed to load image:', (obj as any).pendingImageUrl, error)
           failedCount++
           
           // Keep the placeholder but mark it as failed
           obj.set({
             fill: '#ffebee',
             stroke: '#f44336',
             strokeWidth: 2
           })
           
           // Add error text overlay
           const errorText = new fabric.IText('Image Failed', {
             left: obj.left,
             top: obj.top + (obj.height || 100) / 2 + 20,
             fontSize: 12,
             fill: '#f44336',
             textAlign: 'center',
             originX: 'center',
             originY: 'center',
             selectable: false,
             evented: false
           })
           
           if (canvasRef.current) {
             canvasRef.current.add(errorText)
             canvasRef.current.renderAll()
           }
         }
         
         // Start loading the image
         img.src = (obj as any).pendingImageUrl
       }
     })
     
     console.log(`📊 Image loading complete: ${loadedCount} loaded, ${failedCount} failed`)
   }
   
   // Retry loading a specific failed image
   const retryImageLoad = (objectId: string) => {
     if (!canvasRef.current) return
     
     const obj = canvasRef.current.getObjects().find(o => o.id === objectId)
     if (!obj || !(obj as any).isImagePlaceholder) {
       console.log('❌ Object not found or not an image placeholder:', objectId)
       return
     }
     
     console.log('🔄 Retrying image load for:', objectId)
     
     const img = new Image()
     img.crossOrigin = 'anonymous'
     
     img.onload = () => {
       console.log('✅ Image loaded successfully on retry:', (obj as any).pendingImageUrl)
       
       // Create fabric image with proper properties
       const fabricImage = new fabric.Image(img, {
         left: obj.left,
         top: obj.top,
         width: obj.width,
         height: obj.height,
         scaleX: obj.scaleX || 1,
         scaleY: obj.scaleY || 1,
         angle: obj.angle || 0,
         originX: obj.originX || 'center',
         originY: obj.originY || 'center',
         selectable: obj.selectable,
         evented: obj.evented,
         cornerSize: (obj as any).isEditable ? 12 : 0,
         cornerStyle: 'circle',
         borderColor: (obj as any).isEditable ? '#4A90E2' : 'transparent',
         cornerColor: '#4A90E2',
         transparentCorners: false,
         hasControls: (obj as any).isEditable !== false,
         hasBorders: (obj as any).isEditable !== false
       })
       
       // Copy all custom properties
       Object.keys(obj).forEach(key => {
         if (key !== 'canvas' && key !== 'group' && key !== 'evented') {
           ;(fabricImage as any)[key] = (obj as any)[key]
         }
       })
       
       // Ensure proper positioning
       fabricImage.setCoords()
       
       // Replace placeholder with actual image
       if (canvasRef.current) {
         const index = canvasRef.current.getObjects().indexOf(obj)
         canvasRef.current.remove(obj)
         canvasRef.current.insertAt(fabricImage, index)
         canvasRef.current.renderAll()
         console.log('✅ Image replaced placeholder successfully on retry')
       }
     }
     
     img.onerror = (error) => {
       console.error('❌ Failed to load image on retry:', (obj as any).pendingImageUrl, error)
     }
     
     // Start loading the image
     img.src = (obj as any).pendingImageUrl
   }
   
   // Debug helper function
   const debugCanvasObjects = () => {
     if (!canvasRef.current) return
     
     const objects = canvasRef.current.getObjects()
     console.log('🔍 Canvas Objects Debug:', objects.map(obj => ({
       id: obj.id,
       type: obj.type,
       templateId: (obj as any).templateId,
       isEditable: (obj as any).isEditable,
       templateRole: (obj as any).templateRole,
       left: obj.left,
       top: obj.top,
       visible: obj.visible
     })))
   }
   
   // Check template image loading status
   const checkTemplateImageStatus = () => {
     if (!canvasRef.current) return
     
     const objects = canvasRef.current.getObjects()
     const imageObjects = objects.filter(obj => obj.type === 'image')
     const placeholderObjects = objects.filter(obj => (obj as any).isImagePlaceholder)
     
     console.log('📊 Template Image Status:')
     console.log(`- Total objects: ${objects.length}`)
     console.log(`- Image objects: ${imageObjects.length}`)
     console.log(`- Image placeholders: ${placeholderObjects.length}`)
     
     placeholderObjects.forEach((obj, index) => {
       console.log(`- Placeholder ${index + 1}:`, {
         id: obj.id,
         pendingImageUrl: (obj as any).pendingImageUrl,
         templateId: (obj as any).templateId,
         isEditable: (obj as any).isEditable
       })
     })
   }

  // Enhanced background image functionality with proper layer management
  const setBackgroundImage = (file: File, options: BackgroundImageOptions = {}) => {
    if (!canvasRef.current || !currentTemplate) return

    // Check if there's a selected object to set background for
    const selectedObject = canvasRef.current.getActiveObject()
    
    if (!selectedObject) {
      alert('Please select a template object (like the sign board) first, then set the background image.')
      return
    }

    const { fitMode = 'cover', opacity = 1, position = 'center' } = options
    console.log('🎨 Setting background image for selected template area:', selectedObject, 'with options:', { fitMode, opacity, position })
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        // Get the selected object's bounds and create a proper background container
        const objBounds = selectedObject.getBoundingRect()
        const objLeft = objBounds.left
        const objTop = objBounds.top
        const objWidth = objBounds.width
        const objHeight = objBounds.height
        
        console.log('🎯 Template area bounds for background:', { left: objLeft, top: objTop, width: objWidth, height: objHeight })
        
        // Debug: Show the template area visually (temporary)
        const debugRect = new fabric.Rect({
          left: objLeft + objWidth / 2,
          top: objTop + objHeight / 2,
          width: objWidth,
          height: objHeight,
          fill: 'rgba(255, 0, 0, 0.2)',
          stroke: 'red',
          strokeWidth: 2,
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false
        })
        
        // Add debug rectangle temporarily
        canvasRef.current!.add(debugRect)
        canvasRef.current!.sendToBack(debugRect)
        
        // Remove debug rectangle after 3 seconds
        setTimeout(() => {
          if (canvasRef.current) {
            canvasRef.current.remove(debugRect)
            canvasRef.current.renderAll()
          }
        }, 3000)
        
                 // Create background image that will be clipped to the template area
         const fabricImage = new fabric.Image(img, {
           left: objLeft + objWidth / 2,
           top: objTop + objHeight / 2,
           width: objWidth,  // Set explicit width to match template area
           height: objHeight, // Set explicit height to match template area
           originX: 'center',
           originY: 'center',
           selectable: true,  // Allow selection for group movement
           evented: true,     // Allow events for group movement
           lockMovementX: false,  // Allow movement when part of group
           lockMovementY: false,  // Allow movement when part of group
           lockRotation: true,    // Keep rotation locked
           lockScalingX: true,    // Keep scaling locked
           lockScalingY: true,    // Keep scaling locked
           hasControls: false,    // No individual controls
           hasBorders: false,     // No individual borders
           opacity: opacity,
           templateRole: 'template-background',
           isEditable: false,
           isRequired: false,
           // Enhanced metadata
           linkedObjectId: selectedObject.id,
           backgroundFitMode: fitMode,
           backgroundPosition: position,
           zIndex: -1, // Ensure background stays behind template objects
           // Add clipping path to ensure the image stays within template bounds
           clipPath: new fabric.Rect({
             left: -objWidth / 2,
             top: -objHeight / 2,
             width: objWidth,
             height: objHeight,
             originX: 'left',
             originY: 'top'
           })
         })

        // Calculate scaling to cover the template area
        let scaleX, scaleY
        
        if (fitMode === 'cover') {
          // For cover mode: scale to cover the entire template area
          // Calculate scales for both dimensions
          const scaleX1 = objWidth / img.width
          const scaleY1 = objHeight / img.height
          
          // Use the larger scale to ensure coverage
          // This is crucial for different orientations:
          // - Portrait image + Landscape template: use height scale
          // - Landscape image + Portrait template: use width scale
          const scale = Math.max(scaleX1, scaleY1)
          scaleX = scale
          scaleY = scale
          
          // Calculate the actual dimensions of the scaled image
          const scaledImgWidth = img.width * scale
          const scaledImgHeight = img.height * scale
          
          // Position the image so it covers the template area completely
          // The image should be centered on the template area
          fabricImage.set({
            left: objLeft + objWidth / 2,
            top: objTop + objHeight / 2,
            originX: 'center',
            originY: 'center'
          })
          
          console.log('🎯 Cover mode scaling:', {
            originalImage: { width: img.width, height: img.height },
            templateArea: { width: objWidth, height: objHeight },
            calculatedScale: scale,
            scaleX1,
            scaleY1,
            scaledImage: { width: scaledImgWidth, height: scaledImgHeight },
            position: { left: fabricImage.left, top: fabricImage.top }
          })
          
        } else if (fitMode === 'contain') {
          // For contain mode: scale to fit within template area
          const scaleX1 = objWidth / img.width
          const scaleY1 = objHeight / img.height
          const scale = Math.min(scaleX1, scaleY1)
          scaleX = scale
          scaleY = scale
          
          // Center the image within the template bounds
          fabricImage.set({
            left: objLeft + objWidth / 2,
            top: objTop + objHeight / 2,
            originX: 'center',
            originY: 'center'
          })
          
        } else if (fitMode === 'stretch') {
          // For stretch mode: fill template area exactly
          scaleX = objWidth / img.width
          scaleY = objHeight / img.height
          
          // Position to fill exactly
          fabricImage.set({
            left: objLeft,
            top: objTop,
            originX: 'left',
            originY: 'top'
          })
          
        } else {
          // Default to smart fit - similar to cover but with better positioning
          const scaleX1 = objWidth / img.width
          const scaleY1 = objHeight / img.height
          const scale = Math.max(scaleX1, scaleY1)
          scaleX = scale
          scaleY = scale
          
          // Smart positioning - center the image
          fabricImage.set({
            left: objLeft + objWidth / 2,
            top: objTop + objHeight / 2,
            originX: 'center',
            originY: 'center'
          })
        }
        
        // Apply scaling and ensure proper dimensions
        fabricImage.set({
          scaleX: scaleX,
          scaleY: scaleY,
          width: objWidth,  // Ensure width matches template area
          height: objHeight // Ensure height matches template area
        })
        
        // Position the image so it's centered within the template bounds
        fabricImage.set({
          left: objLeft + objWidth / 2,
          top: objTop + objHeight / 2
        })

        console.log('🎯 Background image configuration:', {
          imageSize: { width: img.width, height: img.height },
          templateArea: { width: objWidth, height: objHeight },
          calculatedScale: { scaleX, scaleY },
          finalDimensions: { width: fabricImage.width, height: fabricImage.height },
          position: { left: fabricImage.left, top: fabricImage.top }
        })

        // Remove existing background images for this template
        const existingBackgrounds = canvasRef.current!.getObjects().filter(obj => 
          (obj as any).templateRole === 'template-background' && 
          (obj as any).linkedObjectId === selectedObject.id
        )
        existingBackgrounds.forEach(bg => canvasRef.current!.remove(bg))

        // Add new background image behind the template
        canvasRef.current!.add(fabricImage)
        canvasRef.current!.sendToBack(fabricImage)
        
        // Debug: Show the background image bounds (temporary)
        const bgDebugRect = new fabric.Rect({
          left: fabricImage.left!,
          top: fabricImage.top!,
          width: (fabricImage.width! * fabricImage.scaleX!),
          height: (fabricImage.height! * fabricImage.scaleY!),
          fill: 'rgba(0, 255, 0, 0.2)',
          stroke: 'green',
          strokeWidth: 2,
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false
        })
        
        // Add debug rectangle temporarily
        canvasRef.current!.add(bgDebugRect)
        canvasRef.current!.sendToBack(bgDebugRect)
        
        // Remove debug rectangle after 3 seconds
        setTimeout(() => {
          if (canvasRef.current) {
            canvasRef.current.remove(bgDebugRect)
            canvasRef.current.renderAll()
          }
        }, 3000)
        
        // Ensure the template objects are above the background
        canvasRef.current!.bringToFront(selectedObject)
        canvasRef.current!.renderAll()
        
        // Reset cursor to default (arrow) after background operation
        canvasRef.current!.defaultCursor = 'default'
        
        console.log('✅ Template background image set successfully')
        console.log('🎯 Background image details:', {
          imagePosition: { left: fabricImage.left, top: fabricImage.top },
          imageScale: { scaleX: fabricImage.scaleX, scaleY: fabricImage.scaleY },
          templateBounds: { left: objLeft, top: objTop, width: objWidth, height: objHeight },
          fitMode: fitMode
        })
      }
      img.onerror = () => {
        console.error('❌ Failed to load background image')
        alert('Failed to load background image. Please try again.')
      }
      img.src = e.target?.result as string
    }
    reader.onerror = () => {
      console.error('❌ Failed to read background image file')
      alert('Failed to read background image file. Please try again.')
    }
    reader.readAsDataURL(file)
  }

  // Set background from preset
  const setBackgroundPreset = (preset: BackgroundPreset) => {
    if (!canvasRef.current || !currentTemplate) return

    // Check if there's a selected object to set background for
    const selectedObject = canvasRef.current.getActiveObject()
    
    if (!selectedObject) {
      alert('Please select a template object (like the sign board) first, then set the background preset.')
      return
    }

    console.log('🎨 Setting background preset for selected template area:', preset.name)
    console.log('🎯 Selected object type:', selectedObject.type)
    console.log('🎯 Selected object:', selectedObject)

    // Handle both single objects and groups
    let targetObject = selectedObject
    let objBounds: any
    
    if (selectedObject.type === 'group') {
      // If it's a group, find the main template object (usually the largest one)
      const groupObjects = (selectedObject as fabric.Group).getObjects()
      console.log('🎯 Group contains objects:', groupObjects.length)
      
      // Find the largest object in the group (likely the main template background)
      let largestObject = groupObjects[0]
      let largestArea = 0
      
      groupObjects.forEach(obj => {
        const area = obj.width! * obj.height!
        if (area > largestArea) {
          largestArea = area
          largestObject = obj
        }
      })
      
      targetObject = largestObject
      objBounds = targetObject.getBoundingRect()
      console.log('🎯 Using largest object in group as template area:', largestObject.type, largestObject.id)
    } else {
      objBounds = selectedObject.getBoundingRect()
    }

    const objLeft = objBounds.left
    const objTop = objBounds.top
    const objWidth = objBounds.width
    const objHeight = objBounds.height
    
    console.log('🎯 Template area bounds for background preset:', { left: objLeft, top: objTop, width: objWidth, height: objHeight })
    
    // Debug: Show the template area visually
    const debugRect = new fabric.Rect({
      left: objLeft + objWidth / 2,
      top: objTop + objHeight / 2,
      width: objWidth,
      height: objHeight,
      fill: 'rgba(255, 0, 0, 0.2)',
      stroke: 'red',
      strokeWidth: 2,
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false
    })
    
    // Add debug rectangle temporarily
    canvasRef.current!.add(debugRect)
    canvasRef.current!.sendToBack(debugRect)
    
    // Remove debug rectangle after 3 seconds
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.remove(debugRect)
        canvasRef.current.renderAll()
      }
    }, 3000)

    // Create background from preset using template area dimensions
    const backgroundObject = backgroundService.createBackgroundFromPreset(preset, objWidth, objHeight)
    
         // Position the background to cover only the template area
     backgroundObject.set({
       left: objLeft + objWidth / 2,  // Center of template area
       top: objTop + objHeight / 2,   // Center of template area
       originX: 'center',
       originY: 'center',
       selectable: true,  // Allow selection for group movement
       evented: true,     // Allow events for group movement
       lockMovementX: false,  // Allow movement when part of group
       lockMovementY: false,  // Allow movement when part of group
       lockRotation: true,    // Keep rotation locked
       lockScalingX: true,    // Keep scaling locked
       lockScalingY: true,    // Keep scaling locked
       hasControls: false,    // No individual controls
       hasBorders: false,     // No individual borders
       templateRole: 'template-background', // Template-specific
       isEditable: false,
       isRequired: false,
       linkedObjectId: selectedObject.id,
       zIndex: -100 // Behind template objects but above canvas
     })

    // Remove existing background images for this template
    const existingBackgrounds = canvasRef.current!.getObjects().filter(obj => 
      (obj as any).templateRole === 'template-background' && 
      (obj as any).linkedObjectId === targetObject.id
    )
    existingBackgrounds.forEach(bg => canvasRef.current!.remove(bg))

    // Add new background and position it correctly
    canvasRef.current!.add(backgroundObject)
    canvasRef.current!.sendToBack(backgroundObject)
    canvasRef.current!.bringToFront(targetObject)
    canvasRef.current!.renderAll()
    
    // Handle image loading if this is an image placeholder
    if ((backgroundObject as any).isImagePlaceholder && (backgroundObject as any).imagePromise) {
      console.log('🔄 Handling image promise for background object')
      
      // Wait for the image to load and then replace the placeholder
      ;(backgroundObject as any).imagePromise.then((fabricImage: fabric.Image) => {
        console.log('✅ Image loaded, replacing placeholder')
        
        // Copy the positioning and properties from the placeholder
        fabricImage.set({
          left: backgroundObject.left,
          top: backgroundObject.top,
          originX: backgroundObject.originX,
          originY: backgroundObject.originY,
          scaleX: backgroundObject.scaleX,
          scaleY: backgroundObject.scaleY,
          angle: backgroundObject.angle,
          selectable: true,  // Allow selection for group movement
          evented: true,     // Allow events for group movement
          lockMovementX: false,  // Allow movement when part of group
          lockMovementY: false,  // Allow movement when part of group
          lockRotation: true,    // Keep rotation locked
          lockScalingX: true,    // Keep scaling locked
          lockScalingY: true,    // Keep scaling locked
          hasControls: false,    // No individual controls
          hasBorders: false     // No individual borders
        })
        
        // Copy custom properties
        ;(fabricImage as any).templateRole = (backgroundObject as any).templateRole
        ;(fabricImage as any).isEditable = (backgroundObject as any).isEditable
        ;(fabricImage as any).isRequired = (backgroundObject as any).isRequired
        ;(fabricImage as any).linkedObjectId = (backgroundObject as any).linkedObjectId
        ;(fabricImage as any).zIndex = (backgroundObject as any).zIndex
        
        // Log debug information if available
        if ((fabricImage as any).debugInfo) {
          console.log('🔍 Background image debug info:', (fabricImage as any).debugInfo)
        }
        
        // Replace the placeholder with the actual image
        if (canvasRef.current) {
          const canvas = canvasRef.current
          const index = canvas.getObjects().indexOf(backgroundObject)
          if (index !== -1) {
            canvas.remove(backgroundObject)
            canvas.insertAt(fabricImage, index)
            canvas.sendToBack(fabricImage)
            canvas.renderAll()
            console.log('✅ Background image replaced placeholder successfully')
          } else {
            console.error('❌ Could not find placeholder in canvas objects')
          }
        } else {
          console.error('❌ Canvas reference is null during image replacement')
        }
      }).catch((error: any) => {
        console.error('❌ Failed to load background image:', error)
        console.error('❌ Error details:', error.message)
        // The placeholder will remain as a fallback
      })
    } else {
      console.log('ℹ️ Background object is not an image placeholder or missing imagePromise')
    }

    console.log('✅ Template background preset applied successfully:', preset.name)
    console.log('📍 Background positioned at template center:', { 
      left: objLeft + objWidth / 2, 
      top: objTop + objHeight / 2,
      width: objWidth,
      height: objHeight
    })
    
    // Reset cursor to default (arrow) after background preset operation
    if (canvasRef.current) {
      canvasRef.current.defaultCursor = 'default'
    }
  }

  // Remove background image functionality
  const removeBackgroundImage = () => {
    if (!canvasRef.current) return

    // Check if there's a selected object to remove background from
    const selectedObject = canvasRef.current.getActiveObject()
    
    if (!selectedObject) {
      alert('Please select a template object first, then remove its background image.')
      return
    }

    console.log('🗑️ Removing background image for selected template')

    // Remove background images for the selected template
    const backgroundImages = canvasRef.current.getObjects().filter(obj => 
      (obj as any).templateRole === 'template-background' && 
      (obj as any).linkedObjectId === selectedObject.id
    )
    
    if (backgroundImages.length > 0) {
      backgroundImages.forEach(bg => canvasRef.current!.remove(bg))
      canvasRef.current!.renderAll()
      console.log('✅ Template background image removed')
      
      // Reset cursor to default (arrow) after background removal
      canvasRef.current!.defaultCursor = 'default'
    } else {
      console.log('ℹ️ No background image found for selected template')
      alert('No background image found for the selected template.')
    }
  }

  // Remove all template backgrounds (useful for resetting)
  const removeAllBackgrounds = () => {
    if (!canvasRef.current) return
    
    console.log('🗑️ Removing all template backgrounds')
    
    const allBackgrounds = canvasRef.current.getObjects().filter(obj => 
      (obj as any).templateRole === 'template-background'
    )
    
    if (allBackgrounds.length > 0) {
      allBackgrounds.forEach(bg => canvasRef.current!.remove(bg))
      canvasRef.current!.renderAll()
      console.log('✅ All template backgrounds removed')
      
      // Reset cursor to default (arrow) after removing all backgrounds
      canvasRef.current!.defaultCursor = 'default'
    } else {
      console.log('ℹ️ No template backgrounds found')
    }
  }

  // Group all template objects together for easy movement
  const groupTemplateObjects = () => {
    if (!canvasRef.current || !currentTemplate) return
    
    const allObjects = canvasRef.current.getObjects()
    if (allObjects.length === 0) return
    
    // Create a group with all objects
    const group = new fabric.Group(allObjects, {
      left: 0,
      top: 0,
      originX: 'center',
      originY: 'center',
      selectable: true,
      evented: true,
      hasControls: true,
      hasBorders: true,
      lockMovementX: false,
      lockMovementY: false,
      lockRotation: false,
      lockScalingX: false,
      lockScalingY: false,
      cornerSize: 12,
      cornerStyle: 'circle',
      borderColor: '#4A90E2',
      cornerColor: '#4A90E2',
      transparentCorners: false,
      // Template metadata
      templateId: 'template-group',
      templateRole: 'template-group',
      isEditable: true
    })
    
    // Clear canvas and add the group
    canvasRef.current.clear()
    canvasRef.current.add(group)
    canvasRef.current.setActiveObject(group)
    canvasRef.current.renderAll()
    
    console.log('✅ Template objects grouped together')
    return group
  }

  // Ungroup template objects to edit individual elements
  const ungroupTemplateObjects = () => {
    if (!canvasRef.current) return
    
    const activeObject = canvasRef.current.getActiveObject()
    if (activeObject && activeObject.type === 'group') {
      const group = activeObject as fabric.Group
      const items = group.getObjects()
      
      // Remove the group
      canvasRef.current.remove(group)
      
      // Add all items back individually
      items.forEach(item => {
        // Ensure each item is properly configured
        item.set({
          selectable: true,
          evented: true,
          hasControls: true,
          hasBorders: true,
          lockMovementX: false,
          lockMovementY: false,
          lockRotation: false,
          lockScalingX: false,
          lockScalingY: false
        })
        canvasRef.current!.add(item)
      })
      
      canvasRef.current.renderAll()
      console.log('✅ Template objects ungrouped')
    }
  }

  // Show alignment guides when moving objects
  const showAlignmentGuides = (movingObject: fabric.Object | undefined) => {
    if (!canvasRef.current || !movingObject) return
    
    const allObjects = canvasRef.current.getObjects().filter(obj => 
      obj !== movingObject && obj.type !== 'object-background'
    )
    
    // Clear existing guides
    const existingGuides = canvasRef.current.getObjects().filter(obj => 
      (obj as any).templateRole === 'alignment-guide'
    )
    existingGuides.forEach(guide => canvasRef.current!.remove(guide))
    
    // Create new guides based on object alignment
    allObjects.forEach(obj => {
      const movingBounds = movingObject.getBoundingRect()
      const objBounds = obj.getBoundingRect()
      
      // Vertical alignment (left, center, right)
      if (Math.abs(movingBounds.left - objBounds.left) < 10) {
        createAlignmentGuide('vertical', objBounds.left, 'left')
      }
      if (Math.abs((movingBounds.left + movingBounds.width/2) - (objBounds.left + objBounds.width/2)) < 10) {
        createAlignmentGuide('vertical', objBounds.left + objBounds.width/2, 'center')
      }
      if (Math.abs((movingBounds.left + movingBounds.width) - (objBounds.left + objBounds.width)) < 10) {
        createAlignmentGuide('vertical', objBounds.left + objBounds.width, 'right')
      }
      
      // Horizontal alignment (top, middle, bottom)
      if (Math.abs(movingBounds.top - objBounds.top) < 10) {
        createAlignmentGuide('horizontal', objBounds.top, 'top')
      }
      if (Math.abs((movingBounds.top + movingBounds.height/2) - (objBounds.top + objBounds.height/2)) < 10) {
        createAlignmentGuide('horizontal', objBounds.top + objBounds.height/2, 'middle')
      }
      if (Math.abs((movingBounds.top + movingBounds.height) - (objBounds.top + objBounds.height)) < 10) {
        createAlignmentGuide('horizontal', objBounds.top + objBounds.height, 'bottom')
      }
    })
  }

  // Create alignment guide lines
  const createAlignmentGuide = (direction: 'vertical' | 'horizontal', position: number, type: string) => {
    if (!canvasRef.current) return
    
    const canvasWidth = canvasRef.current.width || 800
    const canvasHeight = canvasRef.current.height || 600
    
    const guide = new fabric.Line(
      direction === 'vertical' 
        ? [position, 0, position, canvasHeight]
        : [0, position, canvasWidth, position],
      {
        stroke: '#4A90E2',
        strokeWidth: 1,
        strokeDashArray: [5, 5],
        selectable: false,
        evented: false,
        templateRole: 'alignment-guide',
        opacity: 0.7
      }
    )
    
    canvasRef.current.add(guide)
    canvasRef.current.sendToBack(guide)
  }

     // Handle background group selection to ensure backgrounds move with other objects
   const handleBackgroundGroupSelection = (selectedObjects: fabric.Object[]) => {
     if (!canvasRef.current || selectedObjects.length < 2) return
     
     // Check if selection includes both background and template objects
     const hasBackground = selectedObjects.some(obj => (obj as any).templateRole === 'template-background')
     const hasTemplateObject = selectedObjects.some(obj => (obj as any).templateRole !== 'template-background')
     
     if (hasBackground && hasTemplateObject) {
       console.log('🎯 Background selected with template objects - enabling group movement')
       
       // Ensure background can move with the group
       selectedObjects.forEach(obj => {
         if ((obj as any).templateRole === 'template-background') {
           obj.set({
             lockMovementX: false,
             lockMovementY: false,
             selectable: true,
             evented: true
           })
         }
       })
     }
   }
   
   // Move background image with template object when template is moved
   const moveBackgroundWithTemplate = (templateObject: fabric.Object) => {
     if (!canvasRef.current) return
     
     // Find the background linked to this template object
     const background = canvasRef.current.getObjects().find(obj => 
       (obj as any).templateRole === 'template-background' && 
       (obj as any).linkedObjectId === templateObject.id
     )
     
     if (background) {
       // Calculate the movement delta
       const deltaX = (templateObject.left || 0) - (templateObject.originalLeft || templateObject.left || 0)
       const deltaY = (templateObject.top || 0) - (templateObject.originalTop || templateObject.top || 0)
       
       // Move the background by the same amount
       background.set({
         left: (background.left || 0) + deltaX,
         top: (background.top || 0) + deltaY
       })
       
       // Store current position as original for next movement
       templateObject.set({
         originalLeft: templateObject.left,
         originalTop: templateObject.top
       })
       
       canvasRef.current.renderAll()
     }
   }
   
   // Preserve template layout during image replacement
   const preserveTemplateLayout = () => {
     if (!canvasRef.current) return
     
     console.log('🔒 Preserving template layout...')
     
     // Get all template objects (excluding backgrounds)
     const templateObjects = canvasRef.current.getObjects().filter(obj => 
       (obj as any).templateRole && 
       (obj as any).templateRole !== 'template-background' &&
       (obj as any).templateId
     )
     
     // Ensure all template objects maintain their exact positions
     templateObjects.forEach(obj => {
       // Store current position if not already stored
       if ((obj as any).originalLeft === undefined) {
         obj.set({
           originalLeft: obj.left,
           originalTop: obj.top
         })
       }
       
       // Ensure the object stays in its exact position
       obj.set({
         left: (obj as any).originalLeft || obj.left,
         top: (obj as any).originalTop || obj.top,
         // Keep all other properties intact
         width: obj.width,
         height: obj.height,
         scaleX: obj.scaleX,
         scaleY: obj.scaleY,
         angle: obj.angle,
         originX: obj.originX,
         originY: obj.originY
       })
       
       // Ensure proper interaction settings without disrupting layout
       obj.set({
         selectable: true,
         evented: true,
         hasControls: (obj as any).isEditable !== false,
         hasBorders: (obj as any).isEditable !== false,
         lockMovementX: false,
         lockMovementY: false,
         lockRotation: false,
         lockScalingX: false,
         lockScalingY: false
       })
     })
     
     console.log(`🔒 Template layout preserved for ${templateObjects.length} objects`)
   }
   
   // Lock template layout temporarily to prevent movement during operations
   const lockTemplateLayout = () => {
     if (!canvasRef.current) return
     
     console.log('🔒 Locking template layout temporarily...')
     
     const templateObjects = canvasRef.current.getObjects().filter(obj => 
       (obj as any).templateRole && 
       (obj as any).templateRole !== 'template-background' &&
       (obj as any).templateId
     )
     
     templateObjects.forEach(obj => {
       // Temporarily lock movement to prevent drift
       obj.set({
         lockMovementX: true,
         lockMovementY: true
       })
     })
   }
   
   // Unlock template layout after operations complete
   const unlockTemplateLayout = () => {
     if (!canvasRef.current) return
     
     console.log('🔓 Unlocking template layout...')
     
     const templateObjects = canvasRef.current.getObjects().filter(obj => 
       (obj as any).templateRole && 
       (obj as any).templateRole !== 'template-background' &&
       (obj as any).templateId
     )
     
     templateObjects.forEach(obj => {
       // Restore movement capabilities
       obj.set({
         lockMovementX: false,
         lockMovementY: false
       })
     })
   }
   
   // Ensure all objects are selectable and movable after any modification
   const ensureObjectInteraction = () => {
     if (!canvasRef.current) return
     
     const allObjects = canvasRef.current.getObjects()
     allObjects.forEach(obj => {
       // Ensure all objects are interactive
       obj.set({
         selectable: true,
         evented: true,
         hasControls: true,
         hasBorders: true,
         lockMovementX: false,
         lockMovementY: false,
         lockRotation: false,
         lockScalingX: false,
         lockScalingY: false
       })
     })
     
     canvasRef.current.renderAll()
     console.log('✅ All objects configured for interaction')
   }

   // Set the current drawing tool and update canvas cursor
   const setCurrentTool = (tool: string) => {
     if (!canvasRef.current) return
     
     // Reset drawing state when changing tools
     isDrawing = false
     startPoint = null
     currentShape = null
     
     // Store the current tool on the canvas for the drawing handlers
     ;(canvasRef.current as any).currentTool = tool
     
     // Update cursor based on tool
     switch (tool) {
       case 'select':
         canvasRef.current.defaultCursor = 'default'
         canvasRef.current.selection = true
         break
       case 'text':
         canvasRef.current.defaultCursor = 'text'
         canvasRef.current.selection = false
         break
       case 'rectangle':
         canvasRef.current.defaultCursor = 'crosshair'
         canvasRef.current.selection = false
         break
       case 'circle':
         canvasRef.current.defaultCursor = 'crosshair'
         canvasRef.current.selection = false
         break
       default:
         canvasRef.current.defaultCursor = 'default'
         canvasRef.current.selection = true
     }
     
     console.log('🛠️ Tool changed to:', tool, 'Canvas ref:', canvasRef.current)
     console.log('🛠️ Canvas currentTool property:', (canvasRef.current as any).currentTool)
   }

   // Enhanced cursor management function
   const updateCursor = (cursor: string, target?: fabric.Object) => {
     if (!canvasRef.current) return
     
     // Update cursor based on context
     if (target) {
       // When hovering over objects, show appropriate cursor
       if (target.type === 'image' && (target as any).isEditable) {
         canvasRef.current.defaultCursor = 'pointer'
       } else if (target.selectable) {
         canvasRef.current.defaultCursor = 'move'
       } else {
         canvasRef.current.defaultCursor = cursor
       }
     } else {
       // When not hovering over objects, show default cursor
       canvasRef.current.defaultCursor = cursor
     }
     
     canvasRef.current.renderAll()
   }

   // Reset cursor to default (arrow) after background operations
   const resetCursorToDefault = () => {
     if (!canvasRef.current) return
     canvasRef.current.defaultCursor = 'default'
     canvasRef.current.renderAll()
   }

   // Add image inside a selected shape (circle or rectangle)
   const addImageInShape = () => {
     if (!canvasRef.current) return
     
     const selectedObject = canvasRef.current.getActiveObject()
     if (!selectedObject) {
       alert('Please select a shape (circle or rectangle) first, then click "Add Image in Shape"')
       return
     }
     
     // Check if the selected object is a shape
     if (selectedObject.type !== 'rect' && selectedObject.type !== 'circle') {
       alert('Please select a circle or rectangle shape first')
       return
     }
     
     // Create a file input for image selection
     const input = document.createElement('input')
     input.type = 'file'
     input.accept = 'image/*'
     input.style.display = 'none'
     
     input.onchange = (e) => {
       const file = (e.target as HTMLInputElement).files?.[0]
       if (!file) return
       
       const reader = new FileReader()
       reader.onload = (e) => {
         const img = new Image()
         img.onload = () => {
           // Get the shape dimensions
           const shapeBounds = selectedObject.getBoundingRect()
           const shapeWidth = selectedObject.width || shapeBounds.width
           const shapeHeight = selectedObject.height || shapeBounds.height
           
           // Calculate the scaling to cover the entire shape
           const imgWidth = img.width
           const imgHeight = img.height
           
           // Scale to cover the entire shape (use max to ensure full coverage)
           const scaleX = shapeWidth / imgWidth
           const scaleY = shapeHeight / imgHeight
           const scale = Math.max(scaleX, scaleY)
           
           // Create a fabric image pattern with proper scaling
           const pattern = new fabric.Pattern({
             source: img,
             repeat: 'no-repeat',
             patternTransform: [scale, 0, 0, scale, 0, 0] // [scaleX, skewX, skewY, scaleY, offsetX, offsetY]
           })
           
           // Apply the image pattern as the fill of the existing shape
           selectedObject.set({
             fill: pattern,
             selectable: true,
             evented: true,
             hasControls: true,
             hasBorders: true
           })
           
           // Ensure the shape maintains its original properties
           selectedObject.setCoords()
           canvasRef.current?.renderAll()
           
           // Select the shape for editing
           canvasRef.current?.setActiveObject(selectedObject)
           
           console.log('✅ Image pattern applied to shape successfully with proper scaling')
         }
         img.src = e.target?.result as string
       }
       reader.readAsDataURL(file)
     }
     
     // Trigger file selection
     document.body.appendChild(input)
     input.click()
     document.body.removeChild(input)
   }

  return {
    canvas: canvasRef.current,
    selectedObjects,
    zoom,
    currentTemplate,
    addText,
    addRectangle,
    addCircle,
    addImage,
    addImageInShape,
    setCurrentTool,
    deleteSelected,
    exportToPNG,
    // Template functionality
    loadTemplate,
    applyColorVariation,
    applyTextVariation,
    // Image functionality
    replaceImage,
    setBackgroundImage,
    setBackgroundPreset,
    removeBackgroundImage,
    removeAllBackgrounds,
    // Template grouping functionality
    groupTemplateObjects,
    ungroupTemplateObjects,
    ensureObjectInteraction,
    // Enhanced interaction
    showAlignmentGuides,
    createAlignmentGuide,
    // Zoom functionality
    zoomIn,
    zoomOut,
    resetZoom,
    fitToCanvas,
         // Debug functionality
     debugCanvasObjects,
     checkTemplateImageStatus,
     // Image loading functionality
     loadPendingImages,
     retryImageLoad,
     // Background group selection handling
     handleBackgroundGroupSelection,
     moveBackgroundWithTemplate,
     // Template layout preservation
     preserveTemplateLayout,
     lockTemplateLayout,
     unlockTemplateLayout,
     updateCursor,
     resetCursorToDefault
   }
}
