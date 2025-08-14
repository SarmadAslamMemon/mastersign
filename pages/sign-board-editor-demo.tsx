import React, { useState } from 'react';
import { SignBoardEditor } from '../components/SignBoardEditor';
import { SignTemplate } from '../data/signTemplates';

const SignBoardEditorDemo = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<SignTemplate | null>(null);
  const [replacedImages, setReplacedImages] = useState<Record<string, File>>({});
  const [exportedFile, setExportedFile] = useState<Blob | null>(null);

  // Handle template selection
  const handleTemplateSelect = (template: SignTemplate) => {
    setSelectedTemplate(template);
    console.log('Template selected:', template.name);
  };

  // Handle image replacement
  const handleImageReplace = (elementId: string, newImageFile: File) => {
    setReplacedImages(prev => ({
      ...prev,
      [elementId]: newImageFile
    }));
    console.log('Image replaced:', elementId, newImageFile.name);
  };

  // Handle export ready
  const handleExportReady = (blob: Blob) => {
    setExportedFile(blob);
    console.log('Export ready:', blob.size, 'bytes');
    
    // Auto-download the file
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sign-design-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">SignFlow - Professional Sign Design Editor</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {selectedTemplate && (
                  <span>Template: {selectedTemplate.name}</span>
                )}
              </div>
              <div className="text-sm text-gray-600">
                {Object.keys(replacedImages).length > 0 && (
                  <span>{Object.keys(replacedImages).length} images replaced</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="h-[calc(100vh-4rem)]">
        <SignBoardEditor
          onTemplateSelect={handleTemplateSelect}
          onImageReplace={handleImageReplace}
          onExportReady={handleExportReady}
          initialCategory="real-estate"
        />
      </div>

      {/* Status Bar */}
      {exportedFile && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>Design exported successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignBoardEditorDemo;

