import React, { useState, useCallback, useEffect } from 'react'
import { useCanvasEditor } from './hooks/useCanvasEditor'
import { EnhancedTopBar } from './components/EnhancedTopBar'
import { EnhancedSidebar } from './components/EnhancedSidebar'
import { Template } from './data/templates'
import { BackgroundPreset } from './services/BackgroundImageService'

interface EnhancedDesignEditorProps {
  canvasId: string
  width?: number
  height?: number
  onSave?: () => void
  onExport?: () => void
  className?: string
}

export const EnhancedDesignEditor: React.FC<EnhancedDesignEditorProps> = ({
  canvasId,
  width = 800,
  height = 600,
  onSave,
  onExport,
  className = ''
}) => {
  const [currentTool, setCurrentToolState] = useState<string>('select')
  const [showLeftSidebar, setShowLeftSidebar] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [templates] = useState<Template[]>([
    // Real template with actual content
    {
      id: 'real-estate-sample',
      name: 'Real Estate Sample',
      description: 'Professional real estate sign template',
      category: 'real-estate',
      dimensions: { width: 1200, height: 800 },
      thumbnail: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="150" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2"/>
          <rect x="20" y="20" width="160" height="30" fill="#cc0000" stroke="#000000" stroke-width="1"/>
          <text x="100" y="40" text-anchor="middle" fill="white" font-family="Arial" font-size="16" font-weight="bold">FOR SALE</text>
          <rect x="20" y="60" width="80" height="60" fill="#f0f0f0" stroke="#cccccc" stroke-width="1"/>
          <text x="60" y="95" text-anchor="middle" fill="#666" font-family="Arial" font-size="10">Photo</text>
          <text x="120" y="80" text-anchor="left" fill="#000" font-family="Arial" font-size="8">John Smith, Realtor</text>
          <text x="120" y="95" text-anchor="left" fill="#000" font-family="Arial" font-size="8">555-SOLD-NOW</text>
        </svg>
      `),
      objects: [
        {
          id: 'header-text',
          type: 'text',
                     templateRole: 'text',
          isEditable: true,
          isRequired: true,
          properties: {
            left: 600,
            top: 100,
            width: 1000,
            height: 100,
            fill: '#cc0000',
            stroke: '#000000',
            strokeWidth: 2,
            opacity: 1,
            visible: true
          },
          textProperties: {
            text: 'FOR SALE',
            fontSize: 80,
            fontFamily: 'Arial Black',
            fontWeight: 'bold',
            textAlign: 'center'
          }
        },
        {
          id: 'property-photo',
          type: 'image',
                     templateRole: 'background',
          isEditable: true,
          isRequired: true,
          properties: {
            left: 200,
            top: 250,
            width: 400,
            height: 300,
            fill: '#f0f0f0',
            stroke: '#cccccc',
            strokeWidth: 2,
            opacity: 1,
            visible: true
          },
                                             imageProperties: {
               src: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20240118_151230.jpg',
               filters: []
             }
        },
        {
          id: 'contact-info',
          type: 'text',
                     templateRole: 'text',
          isEditable: true,
          isRequired: true,
          properties: {
            left: 650,
            top: 300,
            width: 500,
            height: 200,
            fill: '#000000',
            stroke: 'transparent',
            strokeWidth: 0,
            opacity: 1,
            visible: true
          },
          textProperties: {
            text: 'John Smith, Realtor\n555-SOLD-NOW\nwww.johnsellshouses.com',
            fontSize: 24,
            fontFamily: 'Arial',
            fontWeight: 'normal',
            textAlign: 'left'
          }
        }
      ],
      thumbnail: undefined
    },
    // New T-Shirt/Banner Promotional Template
    {
      id: 't-shirt-banner-promo',
      name: 'T-Shirt Banner Promo',
      description: 'Promotional banner template for T-shirts, events, and marketing campaigns',
      category: 'marketing',
      dimensions: { width: 1200, height: 800 },
      thumbnail: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="150" fill="#f8f9fa" stroke="#FF6B35" stroke-width="3"/>
          <text x="100" y="25" text-anchor="middle" fill="#2C3E50" font-family="Arial" font-size="14" font-weight="bold">AMAZING DEALS!</text>
          <text x="100" y="40" text-anchor="middle" fill="#E74C3C" font-family="Arial" font-size="10" font-weight="bold">Limited Time Offer</text>
          <rect x="20" y="50" width="160" height="60" fill="#f8f9fa" stroke="#FF6B35" stroke-width="2"/>
          <text x="100" y="70" text-anchor="middle" fill="#34495E" font-family="Arial" font-size="8">Custom T-shirts</text>
          <text x="100" y="85" text-anchor="middle" fill="#34495E" font-family="Arial" font-size="8">High quality & fast</text>
          <rect x="120" y="100" width="60" height="30" fill="#FF6B35" stroke="#E55A2B" stroke-width="1"/>
          <text x="150" y="115" text-anchor="middle" fill="white" font-family="Arial" font-size="8" font-weight="bold">$15.99</text>
          <rect x="150" y="120" width="40" height="20" fill="#27AE60" stroke="#229954" stroke-width="1"/>
          <text x="170" y="132" text-anchor="middle" fill="white" font-family="Arial" font-size="6" font-weight="bold">ORDER</text>
        </svg>
      `),
      objects: [
        {
          id: 'main-banner-background',
          type: 'rectangle',
          templateRole: 'background',
          isEditable: true,
          isRequired: true,
          placeholder: 'Main Banner Background',
          properties: {
            left: 600, top: 400, width: 1000, height: 600, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#f8f9fa', stroke: '#FF6B35', strokeWidth: 4, opacity: 1,
            visible: true, selectable: true, evented: true, zIndex: 1
          }
        },
        {
          id: 'main-headline',
          type: 'text',
          templateRole: 'text',
          isEditable: true,
          isRequired: true,
          placeholder: 'MAIN HEADLINE',
          properties: {
            left: 600, top: 150, width: 800, height: 100, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#2C3E50', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
          },
          textProperties: {
            fontFamily: 'Arial Black', fontSize: 72, fontWeight: 'bold', textAlign: 'center', text: 'AMAZING DEALS!'
          }
        },
        {
          id: 'subheadline',
          type: 'text',
          templateRole: 'text',
          isEditable: true,
          isRequired: false,
          placeholder: 'Subheadline text',
          properties: {
            left: 600, top: 280, width: 700, height: 60, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#E74C3C', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
          },
          textProperties: {
            fontFamily: 'Arial', fontSize: 32, fontWeight: 'bold', textAlign: 'center', text: 'Limited Time Offer - Don\'t Miss Out!'
          }
        },
        {
          id: 'promo-text',
          type: 'text',
          templateRole: 'text',
          isEditable: true,
          isRequired: false,
          placeholder: 'Promotional details',
          properties: {
            left: 600, top: 380, width: 600, height: 120, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#34495E', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
          },
          textProperties: {
            fontFamily: 'Arial', fontSize: 24, fontWeight: 'normal', textAlign: 'center', text: 'Get your custom T-shirts now!\nPerfect for teams, events, and promotions\nHigh quality materials & fast printing'
          }
        },
        {
          id: 'price-section',
          type: 'rectangle',
          templateRole: 'text',
          isEditable: true,
          isRequired: false,
          placeholder: 'Price Section',
          properties: {
            left: 800, top: 550, width: 400, height: 120, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#FF6B35', stroke: '#E55A2B', strokeWidth: 3, opacity: 1,
            visible: true, selectable: true, evented: true, zIndex: 2
          }
        },
        {
          id: 'price-text',
          type: 'text',
          templateRole: 'text',
          isEditable: true,
          isRequired: false,
          placeholder: 'Price information',
          properties: {
            left: 800, top: 580, width: 400, height: 80, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#FFFFFF', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 3
          },
          textProperties: {
            fontFamily: 'Arial Black', fontSize: 36, fontWeight: 'bold', textAlign: 'center', text: 'Starting at $15.99\nBulk discounts available!'
          }
        },
        {
          id: 'cta-button',
          type: 'rectangle',
          templateRole: 'text',
          isEditable: true,
          isRequired: false,
          placeholder: 'Call to Action Button',
          properties: {
            left: 1000, top: 700, width: 200, height: 60, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#27AE60', stroke: '#229954', strokeWidth: 2, opacity: 1,
            visible: true, selectable: true, evented: true, zIndex: 2
          }
        },
        {
          id: 'cta-text',
          type: 'text',
          templateRole: 'text',
          isEditable: true,
          isRequired: false,
          placeholder: 'Call to action text',
          properties: {
            left: 1000, top: 715, width: 200, height: 30, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#FFFFFF', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 3
          },
          textProperties: {
            fontFamily: 'Arial Black', fontSize: 18, fontWeight: 'bold', textAlign: 'center', text: 'ORDER NOW!'
          }
        },
        {
          id: 'contact-info-promo',
          type: 'text',
          templateRole: 'text',
          isEditable: true,
          isRequired: false,
          placeholder: 'Contact information',
          properties: {
            left: 200, top: 700, width: 300, height: 80, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#2C3E50', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
          },
          textProperties: {
            fontFamily: 'Arial', fontSize: 16, fontWeight: 'normal', textAlign: 'left', text: 'Contact us:\n📞 (555) 123-4567\n📧 orders@tshirtpro.com\n🌐 www.tshirtpro.com'
          }
        }
      ],
      thumbnail: undefined
    },
    // Custom Banner Template for testing background rendering
    {
      id: 'custom-banner-template',
      name: 'Custom Banner Template',
      description: 'A custom template with heading, banner area, and note section for testing background rendering',
      category: 'marketing',
      dimensions: { width: 1200, height: 800 },
      thumbnail: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="150" fill="#f8f9fa" stroke="#4A90E2" stroke-width="3"/>
          <text x="100" y="25" text-anchor="middle" fill="#2C3E50" font-family="Arial" font-size="14" font-weight="bold">MAIN HEADING</text>
          <text x="100" y="40" text-anchor="middle" fill="#7F8C8D" font-family="Arial" font-size="10">Subheading text</text>
          <rect x="20" y="50" width="160" height="80" fill="#f8f9fa" stroke="#4A90E2" stroke-width="2"/>
          <text x="100" y="75" text-anchor="middle" fill="#4A90E2" font-family="Arial" font-size="8">Main Banner Area</text>
          <text x="100" y="90" text-anchor="middle" fill="#4A90E2" font-family="Arial" font-size="8">(Background Target)</text>
          <rect x="150" y="110" width="30" height="25" fill="#E8F5E8" stroke="#4CAF50" stroke-width="1"/>
          <text x="165" y="125" text-anchor="middle" fill="#2E7D32" font-family="Arial" font-size="6">Note</text>
        </svg>
      `),
      objects: [
        {
          id: 'main-banner-area',
          type: 'rectangle',
          templateRole: 'background',
          isEditable: true,
          isRequired: true,
          placeholder: 'Main Banner Area',
          properties: {
            left: 600, top: 400, width: 1000, height: 600, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#f8f9fa', stroke: '#4A90E2', strokeWidth: 3, opacity: 1,
            visible: true, selectable: true, evented: true, zIndex: 1
          }
        },
        {
          id: 'heading-text',
          type: 'text',
          templateRole: 'text',
          isEditable: true,
          isRequired: true,
          placeholder: 'MAIN HEADING',
          properties: {
            left: 600, top: 150, width: 800, height: 80, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#2C3E50', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
          },
          textProperties: {
            fontFamily: 'Arial Black', fontSize: 64, fontWeight: 'bold', textAlign: 'center', text: 'MAIN HEADING'
          }
        },
        {
          id: 'subheading-text',
          type: 'text',
          templateRole: 'text',
          isEditable: true,
          isRequired: false,
          placeholder: 'Subheading text goes here',
          properties: {
            left: 600, top: 250, width: 600, height: 40, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#7F8C8D', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
          },
          textProperties: {
            fontFamily: 'Arial', fontSize: 28, fontWeight: 'normal', textAlign: 'center', text: 'Subheading text goes here'
          }
        },
        {
          id: 'note-section',
          type: 'rectangle',
          templateRole: 'text',
          isEditable: true,
          isRequired: false,
          placeholder: 'Note Section',
          properties: {
            left: 1000, top: 700, width: 300, height: 150, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#E8F5E8', stroke: '#4CAF50', strokeWidth: 2, opacity: 1,
            visible: true, selectable: true, evented: true, zIndex: 2
          }
        },
        {
          id: 'note-text',
          type: 'text',
          templateRole: 'text',
          isEditable: true,
          isRequired: false,
          placeholder: 'Important note text',
          properties: {
            left: 1000, top: 750, width: 250, height: 80, angle: 0, scaleX: 1, scaleY: 1,
            fill: '#2E7D32', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 3
          },
          textProperties: {
            fontFamily: 'Arial', fontSize: 18, fontWeight: 'normal', textAlign: 'left', text: 'Important note text goes here. This section can contain additional information or reminders.'
          }
        }
      ]
    }
  ])

  const {
    canvas,
    selectedObjects,
    zoom,
    currentTemplate,
    addText,
    addRectangle,
    addCircle,
    addImage,
    deleteSelected,
    exportToPNG,
    loadTemplate,
    applyColorVariation,
    applyTextVariation,
    replaceImage,
    setBackgroundImage,
    setBackgroundPreset,
    removeBackgroundImage,
    removeAllBackgrounds,
    groupTemplateObjects,
    ungroupTemplateObjects,
    ensureObjectInteraction,
    showAlignmentGuides,
    createAlignmentGuide,
    zoomIn,
    zoomOut,
    resetZoom,
    fitToCanvas,
    debugCanvasObjects,
    addImageInShape,
    setCurrentTool: setCanvasTool
  } = useCanvasEditor({
    canvasId,
    width,
    height,
    onObjectModified: (obj) => {
      console.log('Object modified:', obj)
    }
  })

  const handleSave = useCallback(() => {
    console.log('🔍 Save button clicked!')
    console.log('🔍 onSave prop exists:', !!onSave)
    console.log('🔍 canvas from hook exists:', !!canvas)
    console.log('🔍 exportToPNG function exists:', !!exportToPNG)
    console.log('🔍 Canvas object:', canvas)
    
    // Always save as PNG since the onSave prop is not actually saving the canvas
    console.log('🔍 Saving as PNG...')
    setIsSaving(true)
    
    // Add a small delay to ensure canvas is fully ready
    setTimeout(() => {
      try {
        // Ensure canvas is properly rendered before export
        if (canvas) {
          console.log('🔍 Canvas exists, rendering...')
          console.log('🔍 Canvas type:', typeof canvas)
          console.log('🔍 Canvas properties:', Object.keys(canvas))
          console.log('🔍 Canvas has renderAll method:', typeof canvas.renderAll === 'function')
          console.log('🔍 Canvas has toDataURL method:', typeof canvas.toDataURL === 'function')
          console.log('🔍 Canvas has getElement method:', typeof canvas.getElement === 'function')
          
          // Check if it's a Fabric.js canvas
          if (canvas.renderAll && typeof canvas.renderAll === 'function') {
            canvas.renderAll()
            console.log('🔍 Canvas rendered successfully')
          } else {
            console.error('❌ Canvas is not a Fabric.js canvas object')
            if (typeof window !== 'undefined' && window.alert) {
              window.alert('Error: Canvas is not properly initialized')
            }
            return
          }
        } else {
          console.error('❌ Canvas is null or undefined')
          if (typeof window !== 'undefined' && window.alert) {
            window.alert('Error: Canvas not available for saving')
          }
          return
        }
        
        console.log('🔍 Calling exportToPNG...')
        const dataUrl = exportToPNG()
        console.log('🔍 exportToPNG result:', dataUrl ? 'Success' : 'Failed')
        console.log('🔍 Data URL length:', dataUrl ? dataUrl.length : 'N/A')
        
        // Fallback: Try direct canvas export if exportToPNG fails
        let finalDataUrl = dataUrl
        if (!finalDataUrl && canvas) {
          console.log('🔍 exportToPNG failed, trying direct canvas export...')
          try {
            // Try to get the canvas element directly
            const canvasElement = canvas.getElement()
            if (canvasElement) {
              console.log('🔍 Canvas element found, trying direct export...')
              finalDataUrl = canvasElement.toDataURL('image/png')
              console.log('🔍 Direct export result:', finalDataUrl ? 'Success' : 'Failed')
            } else {
              console.log('🔍 No canvas element found')
            }
          } catch (directError) {
            console.error('🔍 Direct export failed:', directError)
          }
        }
        
        if (finalDataUrl) {
          // Create a download link for the PNG
          const link = document.createElement('a')
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
          link.download = `master-signs-design-${timestamp}.png`
          link.href = finalDataUrl
          
          // Trigger download
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          
          console.log('✅ Design saved as PNG successfully')
          
          // Show success feedback to user
          if (typeof window !== 'undefined' && window.alert) {
            window.alert('Design saved successfully! Your PNG file has been downloaded.')
          }
        } else {
          console.error('❌ Failed to save design as PNG - no data URL generated')
          if (typeof window !== 'undefined' && window.alert) {
            window.alert('Failed to save design. Please try again.')
          }
        }
      } catch (error) {
        console.error('❌ Error saving design:', error)
        if (typeof window !== 'undefined' && window.alert) {
          window.alert('Error saving design. Please try again.')
        }
      } finally {
        setIsSaving(false)
      }
    }, 100) // Add a small delay
  }, [exportToPNG, canvas])

  const handleExport = useCallback(() => {
    if (onExport) {
      onExport()
    } else {
      const dataUrl = exportToPNG()
      if (dataUrl) {
        const link = document.createElement('a')
        link.download = 'design-export.png'
        link.href = dataUrl
        link.click()
      }
    }
  }, [onExport, exportToPNG])

  const handleUndo = useCallback(() => {
    // Implement undo functionality
    console.log('Undo not implemented yet')
  }, [])

  const handleRedo = useCallback(() => {
    // Implement redo functionality
    console.log('Redo not implemented yet')
  }, [])

  const handleTemplateSelect = useCallback((template: Template) => {
    loadTemplate(template)
  }, [loadTemplate])

  const handleBackgroundImageUpload = useCallback((file: File) => {
    setBackgroundImage(file, { fitMode: 'cover' })
  }, [setBackgroundImage])

  const handleBackgroundPreset = useCallback((preset: BackgroundPreset) => {
    setBackgroundPreset(preset)
  }, [setBackgroundPreset])

  // Function to generate a random test image for testing background rendering
  const generateRandomTestImage = useCallback(() => {
    try {
      // Create a canvas element to generate a random image
      const canvas = document.createElement('canvas')
      canvas.width = 1000  // Match the template banner area width
      canvas.height = 600  // Match the template banner area height
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        console.error('Failed to get canvas context for test image generation')
        return
      }
      
      // Generate random colors with better contrast
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6'
      ]
      
      // Fill background with random color
      const bgColor = colors[Math.floor(Math.random() * colors.length)]
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, 1000, 600)
      
      // Add some random shapes with better positioning
      for (let i = 0; i < 6; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        ctx.fillStyle = color
        const x = 100 + Math.random() * 800
        const y = 100 + Math.random() * 400
        const size = 60 + Math.random() * 120
        
        if (Math.random() > 0.5) {
          ctx.beginPath()
          ctx.arc(x, y, size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(x - size / 2, y - size / 2, size, size)
        }
      }
      
      // Add text with better readability
      ctx.fillStyle = '#FFFFFF'
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 3
      
      // Main text
      ctx.font = 'bold 64px Arial'
      ctx.textAlign = 'center'
      ctx.strokeText('TEST BACKGROUND', 500, 200)
      ctx.fillText('TEST BACKGROUND', 500, 200)
      
      // Subtitle
      ctx.font = 'bold 32px Arial'
      ctx.strokeText('Random Generated Image', 500, 280)
      ctx.fillText('Random Generated Image', 500, 280)
      
      // Description
      ctx.font = '20px Arial'
      ctx.strokeText('Perfect for testing template backgrounds!', 500, 320)
      ctx.fillText('Perfect for testing template backgrounds!', 500, 320)
      
      // Convert to blob and create file
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'test-background.png', { type: 'image/png' })
          console.log('🎨 Generated random test image for background testing (1000x600)')
          handleBackgroundImageUpload(file)
        } else {
          console.error('Failed to generate test image blob')
        }
      }, 'image/png', 0.9)
    } catch (error) {
      console.error('Error generating test image:', error)
    }
  }, [handleBackgroundImageUpload])

  const handleZoomIn = useCallback(() => {
    zoomIn()
  }, [zoomIn])

  const handleZoomOut = useCallback(() => {
    zoomOut()
  }, [zoomOut])

  const handleResetZoom = useCallback(() => {
    resetZoom()
  }, [resetZoom])

  // Fix canvas positioning issues
  useEffect(() => {
    const fixCanvasPosition = () => {
      const canvas = document.querySelector(`#${canvasId}`)
      if (canvas) {
        // Ensure canvas is properly positioned
        const canvasContainer = canvas.closest('.flex-1')
        if (canvasContainer) {
          canvasContainer.style.position = 'relative'
          canvasContainer.style.overflow = 'visible'
        }
        
        // Reset any transform issues
        canvas.style.transform = 'none'
        canvas.style.position = 'relative'
        canvas.style.top = '0'
        canvas.style.left = '0'
        
        // Force a reflow
        canvas.offsetHeight
      }
    }

    // Fix position after component mounts
    const timer = setTimeout(fixCanvasPosition, 100)
    
    // Also fix on window resize
    window.addEventListener('resize', fixCanvasPosition)
    
    // Add zoom change detection
    const handleZoomChange = () => {
      setTimeout(fixCanvasPosition, 50)
    }
    
    // Listen for zoom changes (using ResizeObserver as fallback)
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(handleZoomChange)
      resizeObserver.observe(document.body)
      
      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', fixCanvasPosition)
        resizeObserver.disconnect()
      }
    }
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', fixCanvasPosition)
    }
  }, [canvasId])

  // Add keyboard shortcuts for save (Ctrl+S / Cmd+S)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
        handleSave()
        console.log('⌨️ Save shortcut triggered (Ctrl+S/Cmd+S)')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleSave])

  return (
    <>
      <style>
        {`
          .zoom-responsive {
            transform-origin: center center;
            transition: transform 0.1s ease-out;
          }
          
          @media (max-width: 768px) {
            .zoom-responsive {
              transform: scale(0.8);
            }
          }
          
          @media (max-width: 640px) {
            .zoom-responsive {
              transform: scale(0.7);
            }
          }
          
          /* Ensure sidebars don't get hidden on zoom */
          .flex-shrink-0 {
            flex-shrink: 0 !important;
          }
          
          /* Better overflow handling */
          .overflow-hidden {
            overflow: hidden !important;
          }
          
          /* Ensure canvas area gets proper space */
          .flex-1 {
            flex: 1 1 auto !important;
            min-width: 0 !important;
          }
          
          /* Ensure properties panel text is visible */
          .properties-panel h3,
          .properties-panel h4,
          .properties-panel p,
          .properties-panel span,
          .properties-panel button {
            color: #374151 !important; /* text-gray-700 */
          }
          
          .properties-panel h3 {
            color: #111827 !important; /* text-gray-900 */
          }
          
          .properties-panel button {
            color: inherit !important;
          }
        `}
      </style>
      <div className={`flex flex-col h-full min-h-0 ${className}`} style={{
        minHeight: '100vh',
        height: '100vh',
        overflow: 'hidden'
      }}>
        {/* Enhanced Top Bar */}
        <EnhancedTopBar
          onSave={handleSave}
          onExport={handleExport}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          onSetBackgroundImage={handleBackgroundImageUpload}
          onSetBackgroundPreset={handleBackgroundPreset}
          onGenerateRandomTestImage={generateRandomTestImage}
          onAddImageInShape={addImageInShape}
          onToggleLeftSidebar={() => setShowLeftSidebar(!showLeftSidebar)}
          onToggleRightPanel={() => setShowRightPanel(!showRightPanel)}
          showLeftSidebar={showLeftSidebar}
          showRightPanel={showRightPanel}
          canUndo={false} // TODO: Implement undo/redo state
          canRedo={false}
          currentZoom={zoom}
          selectedObjectCount={selectedObjects.length}
          currentTool={currentTool}
          isSaving={isSaving}
        />

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden min-h-0" style={{ 
          position: 'relative',
          height: 'calc(100vh - 80px)', // Account for top bar height
          minHeight: '0'
        }}>
          {/* Enhanced Sidebar */}
          <div className={`flex-shrink-0 overflow-hidden transition-all duration-300 ${
            showLeftSidebar ? 'block' : 'hidden'
          } md:block`} style={{ 
            minWidth: '280px', 
            maxWidth: '320px', 
            width: 'clamp(280px, 20%, 320px)',
            height: '100%'
          }}>
            <EnhancedSidebar
              templates={templates}
              currentTemplate={currentTemplate}
              onTemplateSelect={handleTemplateSelect}
              onSetBackgroundPreset={handleBackgroundPreset}
              onSetBackgroundImage={handleBackgroundImageUpload}
            />
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden" style={{ 
            position: 'relative', 
            minHeight: '0',
            minWidth: 'clamp(300px, 60%, 100%)',
            flex: '1 1 auto',
            height: '100%'
          }}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden relative" style={{ 
              position: 'relative', 
              transform: 'none',
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'fit-content',
              height: 'fit-content'
            }}>
              <canvas
                id={canvasId}
                className="block zoom-responsive"
                style={{ 
                  width: `${width}px`, 
                  height: `${height}px`,
                  display: 'block',
                  position: 'relative',
                  top: '0',
                  left: '0',
                  transform: 'none',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>

          {/* Right Panel - Properties */}
          <div className={`properties-panel flex-shrink-0 bg-white border-l border-gray-200 p-4 overflow-y-auto transition-all duration-300 ${
            showRightPanel ? 'block' : 'hidden'
          } lg:block`} style={{ 
            minWidth: '280px', 
            maxWidth: '320px', 
            width: 'clamp(280px, 20%, 320px)',
            height: '100%'
          }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties</h3>
            
            {/* Tool Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tools</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setCurrentToolState('select')
                    setCanvasTool('select')
                  }}
                  className={`p-2 text-sm rounded-md transition-colors ${
                    currentTool === 'select'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Select
                </button>
                <button
                  onClick={() => {
                    setCurrentToolState('text')
                    setCanvasTool('text')
                  }}
                  className={`p-2 text-sm rounded-md transition-colors ${
                    currentTool === 'text'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => {
                    setCurrentToolState('rectangle')
                    setCanvasTool('rectangle')
                  }}
                  className={`p-2 text-sm rounded-md transition-colors ${
                    currentTool === 'rectangle'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Rectangle
                </button>
                <button
                  onClick={() => {
                    setCurrentToolState('circle')
                    setCanvasTool('circle')
                  }}
                  className={`p-2 text-sm rounded-md transition-colors ${
                    currentTool === 'circle'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Circle
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h4>
              <div className="space-y-2">
                {/* Add Image in Shape Button - Also available in Properties panel */}
                <button
                  onClick={() => addImageInShape()}
                  className="w-full p-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  title="Add an image inside a selected shape (circle or rectangle)"
                >
                  Add Image in Shape
                </button>
                
                <button
                  onClick={() => addText()}
                  className="w-full p-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Text
                </button>
                <button
                  onClick={() => addRectangle()}
                  className="w-full p-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Rectangle
                </button>
                <button
                  onClick={() => addCircle()}
                  className="w-full p-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Add Circle
                </button>
                <button
                  onClick={() => addImage()}
                  className="w-full p-2 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                >
                  Add Image
                </button>
              </div>
            </div>

            {/* Canvas Controls */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Canvas</h4>
              <div className="space-y-2">
                <button
                  onClick={handleSave}
                  className="w-full p-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  💾 Save Design
                </button>
                <button
                  onClick={fitToCanvas}
                  className="w-full p-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Fit to Canvas
                </button>
                <button
                  onClick={debugCanvasObjects}
                  className="w-full p-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Debug Objects
                </button>
              </div>
            </div>

            {/* Selection Info */}
            {selectedObjects.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Selection</h4>
                <p className="text-sm text-gray-600">
                  {selectedObjects.length} object{selectedObjects.length !== 1 ? 's' : ''} selected
                </p>
                <button
                  onClick={deleteSelected}
                  className="w-full mt-2 p-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default EnhancedDesignEditor
