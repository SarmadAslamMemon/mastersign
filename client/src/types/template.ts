export interface TemplateCategory {
  mainCategory: string // e.g., "Expo/Display", "Laser Engraving"
  subCategory?: string // e.g., "Mounting Hardware for Signs and Banners"
}

export interface Template {
  id: string // Unique ID (UUID recommended)
  name: string // Human-readable name
  categories: TemplateCategory[] // Support for multiple categories
  thumbnail: string // URL or local path to preview image
  width: number // in pixels or mm, depending on business logic
  height: number
  document: any // tldraw document JSON (shapes, bindings, assets, etc.)
  description?: string // Short description for gallery
  tags?: string[] // Search keywords
  svgAssets?: string[] // Array of SVG asset paths used in the template
}

// Legacy support - keep the old category field for backward compatibility
export interface LegacyTemplate extends Omit<Template, 'categories'> {
  category: TemplateCategory
}
