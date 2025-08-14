import { fabric } from 'fabric'

export interface BackgroundImageOptions {
  fitMode: 'cover' | 'contain' | 'fill' | 'stretch' | 'smart'
  opacity: number
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay'
  effects?: {
    brightness?: number
    contrast?: number
    saturation?: number
  }
}

export interface BackgroundPreset {
  id: string
  name: string
  type: 'gradient' | 'pattern' | 'solid' | 'image'
  value: string | object
  thumbnail?: string
}

export class BackgroundImageService {
  private static instance: BackgroundImageService
  private backgroundPresets: BackgroundPreset[] = []

  static getInstance(): BackgroundImageService {
    if (!BackgroundImageService.instance) {
      BackgroundImageService.instance = new BackgroundImageService()
    }
    return BackgroundImageService.instance
  }

  constructor() {
    this.initializePresets()
  }

  private initializePresets() {
    this.backgroundPresets = [
      // Real Image Presets from assets
      {
        id: 'banner-main',
        name: 'Main Banner',
        type: 'image',
        value: '/src/assets/Banners/MAIN - Banner.jpg'
      },
      {
        id: 'banner-1',
        name: 'Banner Style 1',
        type: 'image',
        value: '/src/assets/Banners/Banner (1) copy.jpg'
      },
      {
        id: 'banner-3',
        name: 'Banner Style 3',
        type: 'image',
        value: '/src/assets/Banners/Banner (3).jpg'
      },
      {
        id: 'banner-4',
        name: 'Banner Style 4',
        type: 'image',
        value: '/src/assets/Banners/Banner (4) copy.jpg'
      },
      {
        id: 'banner-6',
        name: 'Banner Style 6',
        type: 'image',
        value: '/src/assets/Banners/Banner (6) copy.jpg'
      },
      {
        id: 'banner-canyon',
        name: 'Canyon Hills Banner',
        type: 'image',
        value: '/src/assets/Banners/Banner-Canyon Hills.jpg'
      },
      // Gradient Presets
      {
        id: 'gradient-blue',
        name: 'Blue Gradient',
        type: 'gradient',
        value: 'blue-gradient'
      },
      {
        id: 'gradient-pink',
        name: 'Pink Gradient',
        type: 'gradient',
        value: 'pink-gradient'
      },
      {
        id: 'gradient-green',
        name: 'Green Gradient',
        type: 'gradient',
        value: 'green-gradient'
      },
      // Solid Color Presets
      {
        id: 'solid-white',
        name: 'Pure White',
        type: 'solid',
        value: '#ffffff'
      },
      {
        id: 'solid-black',
        name: 'Pure Black',
        type: 'solid',
        value: '#000000'
      },
      {
        id: 'solid-gray',
        name: 'Light Gray',
        type: 'solid',
        value: '#f8f9fa'
      }
    ]
  }

  getBackgroundPresets(): BackgroundPreset[] {
    return this.backgroundPresets
  }

  createClippingPath(object: fabric.Object, objWidth: number, objHeight: number): fabric.Object | undefined {
    if (object.type === 'triangle') {
      return new fabric.Triangle({
        left: -objWidth / 2,
        top: -objHeight / 2,
        width: objWidth,
        height: objHeight,
        originX: 'left',
        originY: 'top',
        scaleX: (object as any).scaleX || 1,
        scaleY: (object as any).scaleY || 1,
        angle: (object as any).angle || 0
      })
    } else if (object.type === 'rect' || object.type === 'rectangle') {
      return new fabric.Rect({
        left: -objWidth / 2,
        top: -objHeight / 2,
        width: objWidth,
        height: objHeight,
        originX: 'left',
        originY: 'top',
        scaleX: (object as any).scaleX || 1,
        scaleY: (object as any).scaleY || 1,
        angle: (object as any).angle || 0
      })
    } else if (object.type === 'circle') {
      const radius = (object as any).radius || Math.min(objWidth, objHeight) / 2
      return new fabric.Circle({
        left: -radius,
        top: -radius,
        radius: radius,
        originX: 'left',
        originY: 'top',
        scaleX: (object as any).scaleX || 1,
        scaleY: (object as any).scaleY || 1,
        angle: (object as any).angle || 0
      })
    } else {
      return new fabric.Rect({
        left: -objWidth / 2,
        top: -objHeight / 2,
        width: objWidth,
        height: objHeight,
        originX: 'left',
        originY: 'top'
      })
    }
  }

  calculateImageScale(
    imgWidth: number,
    imgHeight: number,
    objWidth: number,
    objHeight: number,
    fitMode: string
  ): { scaleX: number; scaleY: number } {
    const imgAspectRatio = imgWidth / imgHeight
    const objAspectRatio = objWidth / objHeight

    let scaleX: number, scaleY: number

    switch (fitMode) {
      case 'cover':
        if (imgAspectRatio > objAspectRatio) {
          scaleY = objHeight / imgHeight
          scaleX = scaleY
        } else {
          scaleX = objWidth / imgWidth
          scaleY = scaleX
        }
        break
      case 'contain':
        if (imgAspectRatio > objAspectRatio) {
          scaleX = objWidth / imgWidth
          scaleY = scaleX
        } else {
          scaleY = objHeight / imgHeight
          scaleX = scaleY
        }
        break
      case 'fill':
        scaleX = objWidth / imgWidth
        scaleY = objHeight / imgHeight
        break
      case 'stretch':
        const padding = 1.1
        scaleX = (objWidth * padding) / imgWidth
        scaleY = (objHeight * padding) / imgHeight
        break
      case 'smart':
        // Smart mode: choose best fit automatically
        if (imgAspectRatio > objAspectRatio) {
          scaleY = objHeight / imgHeight
          scaleX = scaleY
        } else {
          scaleX = objWidth / imgWidth
          scaleY = scaleX
        }
        break
      default:
        scaleX = objWidth / imgWidth
        scaleY = objHeight / imgHeight
    }

    return { scaleX, scaleY }
  }

  applyImageEffects(fabricImage: fabric.Image, effects: any): void {
    if (effects.brightness !== undefined) {
      fabricImage.filters?.push(new (fabric.Image.filters as any).Brightness({
        brightness: effects.brightness
      }))
    }
    if (effects.contrast !== undefined) {
      fabricImage.filters?.push(new (fabric.Image.filters as any).Contrast({
        contrast: effects.contrast
      }))
    }
    if (effects.saturation !== undefined) {
      fabricImage.filters?.push(new (fabric.Image.filters as any).Saturation({
        saturation: effects.saturation
      }))
    }
    
    if (fabricImage.filters && fabricImage.filters.length > 0) {
      fabricImage.applyFilters()
    }
  }

  createBackgroundFromPreset(preset: BackgroundPreset, width: number, height: number): fabric.Object {
    if (preset.type === 'image') {
      // Create a placeholder rectangle first
      const placeholder = new fabric.Rect({
        left: 0,
        top: 0,
        width: width,
        height: height,
        fill: '#f0f0f0',
        stroke: '#4A90E2',
        strokeWidth: 2,
        selectable: false,
        evented: false,
        originX: 'left',
        originY: 'top'
      })

      // Load the actual image with better error handling
      const img = new Image()
      img.crossOrigin = 'anonymous' // Handle CORS issues
      
      console.log('🔄 Attempting to load background image:', preset.value)
      
      img.onload = () => {
        console.log('✅ Background image loaded successfully:', preset.value)
        console.log('📏 Image dimensions:', { width: img.naturalWidth, height: img.naturalHeight })
        
        // Create fabric image from loaded image with proper sizing
        const fabricImage = new fabric.Image(img, {
          left: 0,
          top: 0,
          width: width,
          height: height,
          selectable: false,
          evented: false,
          originX: 'left',
          originY: 'top',
          scaleX: 1,
          scaleY: 1
        })
        
        // Apply the image to the canvas if it exists
        if (placeholder.canvas) {
          const canvas = placeholder.canvas
          const index = canvas.getObjects().indexOf(placeholder)
          if (index !== -1) {
            canvas.remove(placeholder)
            canvas.insertAt(fabricImage, index)
            canvas.renderAll()
            console.log('✅ Background image applied to canvas')
          }
        }
      }
      
      img.onerror = (error) => {
        console.error('❌ Failed to load background image:', preset.value, error)
        // Keep placeholder if image fails to load
        placeholder.set({
          fill: '#ff6b6b',
          stroke: '#e74c3c',
          strokeWidth: 3
        })
        if (placeholder.canvas) {
          placeholder.canvas.renderAll()
        }
      }
      
      // Set image source with retry logic
      img.src = preset.value as string
      
      // Add timeout for image loading
      setTimeout(() => {
        if (!img.complete) {
          console.warn('⚠️ Image loading taking too long, may be too large:', preset.value)
        }
      }, 5000)
      
      return placeholder
    } else if (preset.type === 'gradient') {
      // Handle gradient presets
      if (preset.value === 'blue-gradient') {
        return new fabric.Rect({
          left: 0,
          top: 0,
          width: width,
          height: height,
          fill: new fabric.Gradient({
            type: 'linear',
            coords: { x1: 0, y1: 0, x2: width, y2: height },
            colorStops: [
              { offset: 0, color: '#667eea' },
              { offset: 1, color: '#764ba2' }
            ]
          }),
          selectable: false,
          evented: false
        })
      } else if (preset.value === 'pink-gradient') {
        return new fabric.Rect({
          left: 0,
          top: 0,
          width: width,
          height: height,
          fill: new fabric.Gradient({
            type: 'linear',
            coords: { x1: 0, y1: 0, x2: width, y2: height },
            colorStops: [
              { offset: 0, color: '#ff9a9e' },
              { offset: 1, color: '#fecfef' }
            ]
          }),
          selectable: false,
          evented: false
        })
      } else if (preset.value === 'green-gradient') {
        return new fabric.Rect({
          left: 0,
          top: 0,
          width: width,
          height: height,
          fill: new fabric.Gradient({
            type: 'linear',
            coords: { x1: 0, y1: 0, x2: width, y2: height },
            colorStops: [
              { offset: 0, color: '#a8edea' },
              { offset: 1, color: '#fed6e3' }
            ]
          }),
          selectable: false,
          evented: false
        })
      } else {
        // Default gradient fallback
        return new fabric.Rect({
          left: 0,
          top: 0,
          width: width,
          height: height,
          fill: new fabric.Gradient({
            type: 'linear',
            coords: { x1: 0, y1: 0, x2: width, y2: height },
            colorStops: [
              { offset: 0, color: '#ffffff' },
              { offset: 1, color: '#f0f0f0' }
            ]
          }),
          selectable: false,
          evented: false
        })
      }
    } else if (preset.type === 'solid') {
      return new fabric.Rect({
        left: 0,
        top: 0,
        width: width,
        height: height,
        fill: preset.value as string,
        selectable: false,
        evented: false
      })
    } else {
      // Default white background
      return new fabric.Rect({
        left: 0,
        top: 0,
        width: width,
        height: height,
        fill: '#ffffff',
        selectable: false,
        evented: false
      })
    }
  }
}

export default BackgroundImageService

