export const DEFAULT_CANVAS = {
  WIDTH: 800,
  HEIGHT: 600,
  BACKGROUND_COLOR: '#ffffff'
} as const

export const TOOLS = {
  SELECT: 'select',
  TEXT: 'text',
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  TRIANGLE: 'triangle',
  IMAGE: 'image',
  LINE: 'line'
} as const

export const DEFAULT_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
]
