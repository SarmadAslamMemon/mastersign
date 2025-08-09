import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import { useEditorState } from '../hooks/useEditorState';
import { TemplateService } from '@/services/TemplateService';

interface SidebarTemplatesProps {
  onOpenBrowser: () => void;
}

export const SidebarTemplates: React.FC<SidebarTemplatesProps> = ({ onOpenBrowser }) => {
  const { setCurrentTemplate } = useEditorState();
  
  // Get templates from service
  const templates = TemplateService.getAllTemplates();

  const handleTemplateSelect = (template: any) => {
    setCurrentTemplate(template);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Choose from professional templates to get started
        </p>
        
        {/* Browse Templates Button */}
        <Button
          onClick={onOpenBrowser}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mb-4"
        >
          <Search className="w-4 h-4 mr-2" />
          Browse All Templates
        </Button>
      </div>
      
      {/* Quick Access Templates */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">Quick Access</h3>
        <div className="grid grid-cols-2 gap-3">
          {templates.slice(0, 4).map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className="cursor-pointer group"
            >
              <div className="bg-gray-100 rounded-lg p-3 text-center hover:bg-blue-50 transition-colors">
                <div className="w-full h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded mb-2 flex items-center justify-center text-white font-bold text-xs">
                  {template.name}
                </div>
                <p className="text-xs text-gray-600">
                  {template.dimensions.width}" × {template.dimensions.height}"
                </p>
                <p className="text-sm font-semibold text-blue-600">${template.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button
            variant="outline"
            onClick={onOpenBrowser}
            className="w-full"
          >
            View All Templates
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
