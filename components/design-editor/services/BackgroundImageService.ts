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
                    // High-Quality Database Images
        {
          id: 'business-performance',
          name: 'Business Performance Sign',
          type: 'image',
          value: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Performance.jpg',
          thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Performance.jpg'
        },
        {
          id: 'hectors-building',
          name: 'Hectors Building',
          type: 'image',
          value: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Hectors_Building.jpg',
          thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Hectors_Building.jpg'
        },
        {
          id: 'liberty-sign',
          name: 'Liberty Sign',
          type: 'image',
          value: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Liberty.JPG',
          thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Liberty.JPG'
        },
        {
          id: 'dancology-sign',
          name: 'Dancology Sign',
          type: 'image',
          value: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Dancology.jpg',
          thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/Dancology.jpg'
        },
        {
          id: 'fabricated-sign',
          name: 'Fabricated Sign',
          type: 'image',
          value: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Fabricated%20Signs/20230616_154312.jpg',
          thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Fabricated%20Signs/20230616_154312.jpg'
        },
        {
          id: 'vehicle-graphics',
          name: 'Vehicle Graphics',
          type: 'image',
          value: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20240309_133150.jpg',
          thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Vehicle%20Graphics/20240309_133150.jpg'
        },
                                          // Real Image Presets from Supabase
         {
           id: 'banner-main',
           name: 'Main Banner',
           type: 'image',
           value: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg',
           thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/MAIN%20-%20Banner.jpg'
         },
         {
           id: 'banner-1',
           name: 'Banner Style 1',
           type: 'image',
           value: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%281%29%20copy.jpg',
           thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%281%29%20copy.jpg'
         },
         {
           id: 'banner-3',
           name: 'Banner Style 3',
           type: 'image',
           value: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%283%29.jpg',
           thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%283%29.jpg'
         },
         {
           id: 'banner-4',
           name: 'Banner Style 4',
           type: 'image',
           value: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%284%29%20copy.jpg',
           thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%284%29%20copy.jpg'
         },
         {
           id: 'banner-6',
           name: 'Banner Style 6',
           type: 'image',
           value: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%286%29%20copy.jpg',
           thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner%20%286%29%20copy.jpg'
         },
         {
           id: 'banner-canyon',
           name: 'Canyon Hills Banner',
           type: 'image',
           value: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner-Canyon%20Hills.jpg',
           thumbnail: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Banners/Banner-Canyon%20Hills.jpg'
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
      console.log('🔄 Creating image background from preset:', preset.value)
      
      // Create a placeholder rectangle that will be replaced with the actual image
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
        originY: 'top',
        // Ensure the background is clipped to the template area
        clipPath: new fabric.Rect({
          left: 0,
          top: 0,
          width: width,
          height: height,
          originX: 'left',
          originY: 'top'
        })
      })
      
      // Store the image URL and create a promise for loading
      ;(placeholder as any).imageUrl = preset.value
      ;(placeholder as any).isImagePlaceholder = true
      
              // Create a promise that resolves when the image is loaded
        const imagePromise = new Promise<fabric.Image>((resolve, reject) => {
          console.log('🔄 Starting to load image:', preset.value)
          
          let timeoutId: NodeJS.Timeout
          
          // Add error handling with timeout
          timeoutId = setTimeout(() => {
            console.error('❌ Image loading timeout for:', preset.value)
            reject(new Error('Image loading timeout'))
          }, 10000) // 10 second timeout
          
          fabric.Image.fromURL(preset.value as string, (loadedImage: fabric.Image) => {
            // Clear the timeout since image loaded successfully
            clearTimeout(timeoutId)
            
            console.log('✅ Background image loaded successfully:', preset.value)
            console.log('📏 Image dimensions:', { width: loadedImage.width, height: loadedImage.height })
            
            // Calculate proper scaling to fit the target dimensions
            const scaleX = width / loadedImage.width!
            const scaleY = height / loadedImage.height!
            
            console.log('📐 Calculated scaling:', { scaleX, scaleY, targetWidth: width, targetHeight: height })
            
            // For cover mode: use the scale that ensures FULL coverage
            // Use the larger scale to ensure the image covers the entire target area
            const finalScale = Math.max(scaleX, scaleY)
            
            console.log('📐 Final scaling:', { 
              scaleX, 
              scaleY,
              finalScale,
              originalImage: { width: loadedImage.width, height: loadedImage.height },
              targetArea: { width, height },
              scaledImage: { 
                width: loadedImage.width! * finalScale, 
                height: loadedImage.height! * finalScale 
              }
            })
            
                      // Update the loaded image with the correct positioning and properties
          // The image should be positioned to cover the entire target area
          loadedImage.set({
            left: 0,
            top: 0,
            originX: 'left',
            originY: 'top',
            scaleX: finalScale,
            scaleY: finalScale,
            selectable: false,
            evented: false,
            // Apply clipping to ensure the image stays within the target area
            clipPath: new fabric.Rect({
              left: 0,
              top: 0,
              width: width,
              height: height,
              originX: 'left',
              originY: 'top'
            })
          })
          
          // Store the calculated scale for later use
          ;(loadedImage as any).calculatedScale = finalScale
          
          console.log('🎨 Loaded image configured:', {
            position: { left: loadedImage.left, top: loadedImage.top },
            scale: { scaleX: loadedImage.scaleX, scaleY: loadedImage.scaleY },
            dimensions: { width: loadedImage.width, height: loadedImage.height },
            targetArea: { width, height },
            finalScale
          })
            
            // Add debug information to the image object
            ;(loadedImage as any).debugInfo = {
              originalDimensions: { width: loadedImage.width, height: loadedImage.height },
              targetArea: { width, height },
              scaleUsed: finalScale,
              resultingDimensions: { 
                width: loadedImage.width! * finalScale, 
                height: loadedImage.height! * finalScale 
              },
              scaleAnalysis: {
                scaleX: { scale: scaleX, coversBoth: scaleX >= 1 },
                scaleY: { scale: scaleY, coversBoth: scaleY >= 1 }
              }
            }
            
            resolve(loadedImage)
          }, {
            crossOrigin: 'anonymous'
          })
        })
      
      // Store the promise on the placeholder
      ;(placeholder as any).imagePromise = imagePromise
      
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
      } else if (preset.value === 'test-gradient') {
        return new fabric.Rect({
          left: 0,
          top: 0,
          width: width,
          height: height,
          fill: new fabric.Gradient({
            type: 'linear',
            coords: { x1: 0, y1: 0, x2: width, y2: height },
            colorStops: [
              { offset: 0, color: '#ff6b6b' },
              { offset: 0.5, color: '#4ecdc4' },
              { offset: 1, color: '#45b7d1' }
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

