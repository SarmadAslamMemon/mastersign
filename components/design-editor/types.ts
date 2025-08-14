export interface CanvasObject {
  id: string
  type: 'text' | 'rectangle' | 'circle' | 'triangle' | 'image' | 'line'
  properties: {
    left: number
    top: number
    width: number
    height: number
    angle: number
    scaleX: number
    scaleY: number
    fill?: string
    stroke?: string
    strokeWidth?: number
    opacity: number
    visible: boolean
    selectable: boolean
    evented: boolean
    zIndex: number
  }
  textProperties?: {
    fontFamily: string
    fontSize: number
    fontWeight: string
    textAlign: 'left' | 'center' | 'right'
    text: string
  }
  imageProperties?: {
    src: string
    filters: any[]
  }
}

export interface EditorProject {
  id: string
  name: string
  width: number
  height: number
  backgroundColor: string
  objects: CanvasObject[]
  version: number
  createdAt: string
  updatedAt: string
}

export type EditorTool = 'select' | 'text' | 'rectangle' | 'circle' | 'triangle' | 'image' | 'line' | 'draw'

export interface CollaborationUser {
  id: string
  name: string
  color: string
  cursor: { x: number, y: number }
  selectedObjects: string[]
  isActive: boolean
}
