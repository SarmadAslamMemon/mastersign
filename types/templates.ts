import { CanvasObject } from '../components/design-editor/types'

export interface TemplateCategory {
  id: string
  name: string
  description: string
  icon: string // SVG icon or emoji
  parentId?: string // for subcategories
  sortOrder: number
}

export interface Template {
  id: string
  name: string
  description: string
  categoryId: string
  tags: string[]
  thumbnail: string // base64 or URL
  preview: string // larger preview image
  dimensions: {
    width: number
    height: number
    units: 'px' | 'in' | 'cm' | 'mm'
  }
  objects: TemplateObject[]
  metadata: {
    createdAt: string
    updatedAt: string
    version: string
    isPublic: boolean
    downloads: number
    rating: number
  }
}

export interface TemplateObject extends CanvasObject {
  isEditable: boolean
  isRequired: boolean
  placeholder?: string
  constraints?: {
    minSize?: { width: number, height: number }
    maxSize?: { width: number, height: number }
    aspectRatio?: number
    allowedColors?: string[]
    allowedFonts?: string[]
  }
  customData?: {
    svgPath?: string // for custom SVG shapes
    colorVariations?: ColorVariation[]
    textVariations?: TextVariation[]
  }
}

export interface ColorVariation {
  id: string
  name: string
  colors: { [objectId: string]: string }
}

export interface TextVariation {
  id: string
  name: string
  texts: { [objectId: string]: string }
}

export interface SignboardCategory extends TemplateCategory {
  signType: 'outdoor' | 'indoor' | 'vehicle' | 'window' | 'yard'
  materials: string[]
  standardSizes: Array<{
    name: string
    width: number
    height: number
    units: string
  }>
}

// Additional interfaces for template system
export interface TemplateSearchFilters {
  categoryId?: string
  tags?: string[]
  signType?: string
  minRating?: number
  sortBy?: 'popular' | 'recent' | 'rating' | 'name'
  sortOrder?: 'asc' | 'desc'
}

export interface TemplateLoadOptions {
  preserveDimensions?: boolean
  replaceCanvas?: boolean
  mergeWithCurrent?: boolean
  autoFitToCanvas?: boolean
}

export interface TemplateCache {
  categories: Map<string, TemplateCategory>
  templates: Map<string, Template>
  thumbnails: Map<string, string>
  lastUpdated: Map<string, number>
}
