import { Editor } from '@tldraw/tldraw'

interface SignToolsProps {
  editor: Editor | null
}

export function SignTools({ editor }: SignToolsProps) {
  const addText = () => {
    if (!editor) return
    
    try {
      const textShape = {
        id: `shape:text-${Date.now()}`,
        type: 'text',
        x: 200,
        y: 200,
        text: 'Your Text Here',
        fontSize: 48,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: '#000000'
      }
      
      const result = editor.createShape(textShape)
      console.log('Text added successfully:', result)
    } catch (error) {
      console.error('Error adding text:', error)
    }
  }
  
  const addLabel = () => {
    if (!editor) return
    
    try {
      const labelShape = {
        id: `shape:label-${Date.now()}`,
        type: 'text',
        x: 300,
        y: 300,
        text: 'Label Text',
        fontSize: 24,
        fontFamily: 'Arial',
        fill: '#666666'
      }
      
      const result = editor.createShape(labelShape)
      console.log('Label added successfully:', result)
    } catch (error) {
      console.error('Error adding label:', error)
    }
  }
  
  const addHeading = () => {
    if (!editor) return
    
    try {
      const headingShape = {
        id: `shape:heading-${Date.now()}`,
        type: 'text',
        x: 400,
        y: 400,
        text: 'HEADING',
        fontSize: 72,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: '#000000'
      }
      
      const result = editor.createShape(headingShape)
      console.log('Heading added successfully:', result)
    } catch (error) {
      console.error('Error adding heading:', error)
    }
  }

  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Quick Tools</h3>
      <div className="space-y-3">
        <button
          onClick={addText}
          disabled={!editor}
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Text
        </button>
        <button
          onClick={addLabel}
          disabled={!editor}
          className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Label
        </button>
        <button
          onClick={addHeading}
          disabled={!editor}
          className="w-full p-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Heading
        </button>
      </div>
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
        <strong>Working Mode:</strong> Click these buttons to add text elements to your canvas. 
        Use the selection tool (V) to move and edit them.
      </div>
    </div>
  )
}
