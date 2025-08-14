import { Editor } from '@tldraw/tldraw'

export const SIGN_TEMPLATES = [
  {
    id: 'yard-sign',
    name: 'Yard Sign (18x24")',
    dimensions: { width: 432, height: 576 }, // 18x24 inches in pixels at 24 DPI
    category: 'real-estate'
  },
  {
    id: 'banner',
    name: 'Banner (3x8\')',
    dimensions: { width: 864, height: 2304 }, // 3x8 feet in pixels at 24 DPI
    category: 'marketing'
  },
  {
    id: 'business-sign',
    name: 'Business Sign (24x36")',
    dimensions: { width: 576, height: 864 }, // 24x36 inches in pixels at 24 DPI
    category: 'business'
  }
]

interface SignTemplateSelectorProps {
  editor: Editor | null
}

export function SignTemplateSelector({ editor }: SignTemplateSelectorProps) {
  const loadTemplate = (template: typeof SIGN_TEMPLATES[0]) => {
    if (!editor) return
    
    console.log(`Loading template: ${template.name} - ${template.dimensions.width}x${template.dimensions.height}`)
    
    try {
      // First, let's see what shapes currently exist
      const currentShapes = editor.getCurrentPageShapes()
      console.log('Current shapes before loading template:', currentShapes)
      
      // Try to create a simple text shape using the createShape method
      const textShape = {
        id: `shape:title-${Date.now()}`,
        type: 'text',
        x: 100,
        y: 100,
        text: template.name,
        fontSize: 48,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: '#000000'
      }
      
      console.log('Attempting to create shape:', textShape)
      
      // Use the createShape method (singular) that we know exists
      const result = editor.createShape(textShape)
      console.log('Create shape result:', result)
      
      // Check what shapes exist now
      const newShapes = editor.getCurrentPageShapes()
      console.log('Shapes after creating:', newShapes)
      
      console.log('Template loaded successfully!')
      
    } catch (error) {
      console.error('Error loading template:', error)
    }
  }

  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Sign Templates</h3>
      <div className="grid grid-cols-1 gap-3">
        {SIGN_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => loadTemplate(template)}
            disabled={!editor}
            className="p-3 text-left border rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="font-medium">{template.name}</div>
            <div className="text-sm text-gray-600">
              {template.dimensions.width} × {template.dimensions.height} px
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
        <strong>Working Mode:</strong> Click a template to create a text shape on the canvas. 
        Check the console for detailed information about what's happening.
      </div>
    </div>
  )
}
