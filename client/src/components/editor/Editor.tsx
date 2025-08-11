import React, { useRef, useCallback, useEffect, useState } from 'react';
import TldrawWrapper, { TldrawWrapperRef } from '../TemplateEditor/Canvas/TldrawWrapper';
import { loadTemplateById } from '@/utils/templateLoader';
import { Template } from '@/types/template';

interface EditorProps {
  initialDocument?: any; // tldraw JSON
  templateId?: string;
}

const Editor: React.FC<EditorProps> = ({ initialDocument, templateId }) => {
  const tldrawRef = useRef<TldrawWrapperRef>(null);
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load template by ID when templateId changes
  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId);
    }
  }, [templateId]);

  const loadTemplate = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const template = loadTemplateById(id);
      if (template) {
        setCurrentTemplate(template);
        // Load the template document into tldraw
        if (tldrawRef.current) {
          // The TldrawWrapper will handle loading the document via initialDocument prop
          console.log('Template loaded:', template);
        }
      } else {
        console.error('Template not found:', id);
      }
    } catch (error) {
      console.error('Failed to load template:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDocumentChange = useCallback((document: any) => {
    console.log('Document changed:', document);
    // Here you can implement auto-save or other change handling
  }, []);

  const handleSave = useCallback(async () => {
    if (tldrawRef.current) {
      try {
        const document = tldrawRef.current.getDocument();
        if (document) {
          // Save the modified document
          if (currentTemplate) {
            // For now, save to localStorage
            const savedTemplate = {
              ...currentTemplate,
              document: document,
              lastModified: new Date().toISOString()
            };
            localStorage.setItem(`template_${currentTemplate.id}`, JSON.stringify(savedTemplate));
            console.log('Template saved:', savedTemplate);
          }
        }
      } catch (error) {
        console.error('Failed to save template:', error);
      }
    }
  }, [currentTemplate]);

  const handleExport = useCallback(async () => {
    if (tldrawRef.current) {
      try {
        const document = tldrawRef.current.getDocument();
        if (document) {
          // Export the document as JSON
          const dataStr = JSON.stringify(document, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${currentTemplate?.name || 'design'}.json`;
          link.click();
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error('Failed to export document:', error);
      }
    }
  }, [currentTemplate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentTemplate ? `Editing: ${currentTemplate.name}` : 'Template Editor'}
            </h1>
            {currentTemplate && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {currentTemplate.categories[0]?.mainCategory || 'Uncategorized'}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative">
        <TldrawWrapper
          ref={tldrawRef}
          initialDocument={initialDocument || currentTemplate?.document}
          onDocumentChange={handleDocumentChange}
        />
      </div>
    </div>
  );
};

export default Editor;
