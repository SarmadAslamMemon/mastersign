import { Editor } from '@tldraw/tldraw'

interface SignExportProps {
  editor: Editor | null
}

export function SignExport({ editor }: SignExportProps) {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Export Options</h3>
      <div className="space-y-3">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
          <strong>Export PNG:</strong> Use File → Export → PNG in the TLDraw menu
        </div>
        <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
          <strong>Export SVG:</strong> Use File → Export → SVG for vector format
        </div>
        <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
          <strong>Print Ready:</strong> Export PNG at high resolution (300 DPI) for printing
        </div>
      </div>
      <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded text-sm text-purple-800">
        <strong>Quick Export:</strong> Press Ctrl+Shift+E (or Cmd+Shift+E on Mac) to open export menu
      </div>
    </div>
  )
}
