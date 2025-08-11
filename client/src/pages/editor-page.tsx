import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import Editor from '@/components/editor/Editor';
import { loadTemplateById } from '@/utils/templateLoader';
import { Template } from '@/types/template';

const EditorPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract templateId from URL
  const getTemplateIdFromUrl = (): string | null => {
    const path = window.location.pathname;
    const match = path.match(/^\/editor\/(.+)$/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const templateId = getTemplateIdFromUrl();
    
    if (!templateId) {
      setError('No template ID provided');
      setIsLoading(false);
      return;
    }

    const loadTemplate = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const loadedTemplate = loadTemplateById(templateId);
        
        if (loadedTemplate) {
          setTemplate(loadedTemplate);
        } else {
          setError(`Template "${templateId}" not found`);
        }
      } catch (err) {
        setError('Failed to load template');
        console.error('Error loading template:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTemplate();
  }, []);

  const handleBackToGallery = () => {
    setLocation('/editor');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full animate-spin border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-gray-600">Loading template...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Template Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={handleBackToGallery}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Gallery
            </button>
            <button
              onClick={() => setLocation('/')}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!template) {
    return null;
  }

  return (
    <Editor
      templateId={template.id}
      initialDocument={template.document}
    />
  );
};

export default EditorPage;
