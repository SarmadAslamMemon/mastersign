'use client'

import React, { useState } from 'react'
import { TemplateEditor } from '../components/design-editor'

export default function BackgroundImageTestPage() {
  const [testInstructions] = useState([
    '1. Select a template (e.g., "Open/Closed Sign")',
    '2. Click "Set Background" button in toolbar or Elements tab',
    '3. Choose an image file (JPG, PNG, GIF)',
    '4. Image will be set as background with subtle overlay',
    '5. All existing elements remain in place',
    '6. Use "Remove Background" to clear background image',
    '7. Test image manipulation (resize, move, rotate) on editable images'
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Background Image Test</h1>
          <p className="text-gray-600 mt-1">
            Test the new background image functionality and improved image manipulation
          </p>
        </div>
      </div>
      
      <div className="flex">
        {/* Instructions Panel */}
        <div className="w-80 bg-white border-r border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Test Instructions</h3>
          <div className="space-y-2">
            {testInstructions.map((instruction, index) => (
              <div key={index} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                {instruction}
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded">
            <h4 className="font-medium text-blue-900 mb-2">New Features:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Background image setting</li>
              <li>• Improved image manipulation</li>
              <li>• Proper scaling and positioning</li>
              <li>• Layer preservation</li>
            </ul>
          </div>
        </div>
        
        {/* Template Editor */}
        <div className="flex-1">
          <TemplateEditor 
            width={900} 
            height={700}
          />
        </div>
      </div>
    </div>
  )
}
