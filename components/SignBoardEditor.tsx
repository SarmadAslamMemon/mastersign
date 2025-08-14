
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { createStore } from 'polotno/model/store';
// Removed problematic Polotno side panel imports that don't exist in current version

// Import custom panels
import { TemplateBrowserPanel } from './TemplateBrowserPanel';
import { ImageReplacementPanel } from './ImageReplacementPanel';
import { SignSpecificationsPanel } from './SignSpecificationsPanel';
import { SignTextToolsPanel } from './SignTextToolsPanel';
import { SignColorPanel } from './SignColorPanel';

// Import templates
import { templateCategories } from '../data/signTemplates';

// Types
interface SignBoardEditorProps {
  onTemplateSelect?: (template: any) => void;
  onImageReplace?: (elementId: string, newImageFile: File) => void;
  onExportReady?: (blob: Blob) => void;
  initialCategory?: string;
}

// Sign Board Editor Component
export const SignBoardEditor = observer(({ 
  onTemplateSelect,
  onImageReplace,
  onExportReady,
  initialCategory = 'geometric'
}: SignBoardEditorProps) => {
  const [store] = useState(() => createStore());
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [canvasZoom, setCanvasZoom] = useState(0.25);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'templates' | 'images' | 'text' | 'colors' | 'settings'>('templates');
  const [customBackground, setCustomBackground] = useState<string | null>(null);
  const [canvasElements, setCanvasElements] = useState<any[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 2400, height: 1200 }); // Default canvas size
  const [exportOptions, setExportOptions] = useState({
    dpi: 300,
    format: 'pdf',
    addBleed: true,
    colorProfile: 'CMYK'
  });

    // Load template function - now places template on main canvas
  const loadTemplate = async (template: any) => {
    try {
      console.log('Loading template:', template);
      console.log('Template dimensions:', template.dimensions);
      console.log('Template elements:', template.json.pages?.[0]?.children);
      
      // Calculate proper positioning to center template on canvas
      const templateWidth = template.dimensions?.width || 400;
      const templateHeight = template.dimensions?.height || 400;
      
      // Ensure template fits within canvas bounds
      const maxWidth = Math.min(templateWidth, canvasSize.width * 0.8);
      const maxHeight = Math.min(templateHeight, canvasSize.height * 0.8);
      
      // Scale template if it's too large for canvas
      const scale = Math.min(maxWidth / templateWidth, maxHeight / templateHeight, 1);
      const scaledWidth = templateWidth * scale;
      const scaledHeight = templateHeight * scale;
      
      const centerX = Math.max(0, (canvasSize.width - scaledWidth) / 2);
      const centerY = Math.max(0, (canvasSize.height - scaledHeight) / 2);
      
             // Create a new template element to place on the canvas
       const templateElement = {
         id: `template-${Date.now()}`,
         type: 'template',
         template: template,
         x: centerX, // Center on canvas
         y: centerY,
         width: scaledWidth,
         height: scaledHeight,
         scale: scale, // Store scale for element positioning
         elements: template.json.pages?.[0]?.children || [],
         background: template.json.background || '#ffffff',
         customBackground: null,
         backgroundSize: 'contain',
         isSelected: false
       };
      
      console.log('Created template element:', templateElement);
      
      // Add template to canvas
      setCanvasElements(prev => [...prev, templateElement]);
      
      // Set as selected template for editing
      setSelectedTemplate(template);
      onTemplateSelect?.(template);
      
      // Load into store for editing capabilities
      store.clear();
      await store.loadJSON(template.json);
      
      // Set up image placeholders with proper IDs and add borders
      const page = store.activePage;
      if (page) {
        page.children.forEach((child: any) => {
          if (child.type === 'image' && child.id) {
            child.set({ 
              custom: { 
                isTemplateImage: true,
                placeholderName: child.name || 'Image'
              },
              // Add visible borders for template elements
              stroke: '#cccccc',
              strokeWidth: 2,
              dash: [5, 5] // Dashed border for templates
            });
          }
        });
        
        // Force re-render to ensure all elements display
        page.set({ id: page.id });
      }
    } catch (error) {
      console.error('Error loading template:', error);
      // Show user-friendly error message
      alert(`Failed to load template: ${template.name}. Please try again.`);
    }
  };

  // Handle image replacement
  const handleImageReplace = async (elementId: string, newImageFile: File) => {
    try {
      const page = store.activePage;
      if (!page) return;

      const element = page.children.find((el: any) => el.id === elementId);
      
      if (element && element.type === 'image') {
        // Create image URL from file
        const imageUrl = URL.createObjectURL(newImageFile);
        
        // Update the element
        element.set({
          src: imageUrl,
          cropX: 0,
          cropY: 0,
          cropWidth: 1,
          cropHeight: 1
        });

        onImageReplace?.(elementId, newImageFile);
      }
    } catch (error) {
      console.error('Error replacing image:', error);
    }
  };

  // Export for print production
  const exportForPrint = async (options = exportOptions) => {
    try {
      const {
        dpi = 300,
        format = 'pdf',
        addBleed = true,
        colorProfile = 'CMYK'
      } = options;

      // Export with print specifications
      const blob = await store.toBlob({
        pixelRatio: dpi / 72, // Convert DPI to pixel ratio
        mimeType: format === 'pdf' ? 'application/pdf' : 'image/png'
      });

      onExportReady?.(blob);
      return blob;
    } catch (error) {
      console.error('Error exporting for print:', error);
    }
  };

  // Export button component
  const ExportButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
    >
      Export for Print
    </button>
  );

  // Canvas interaction functions
  const selectCanvasElement = (elementId: string) => {
    setCanvasElements(prev => 
      prev.map(el => ({
        ...el,
        isSelected: el.id === elementId
      }))
    );
    setSelectedElement(elementId);
  };

  const moveCanvasElement = (elementId: string, newX: number, newY: number) => {
    setCanvasElements(prev => 
      prev.map(el => 
        el.id === elementId 
          ? { ...el, x: newX, y: newY }
          : el
      )
    );
  };

  const deleteCanvasElement = (elementId: string) => {
    setCanvasElements(prev => prev.filter(el => el.id !== elementId));
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
  };

  const updateElementBackground = (elementId: string, backgroundUrl: string | null, backgroundSize?: string) => {
    setCanvasElements(prev => 
      prev.map(el => 
        el.id === elementId 
          ? { ...el, customBackground: backgroundUrl, backgroundSize: backgroundSize || 'contain' }
          : el
      )
    );
  };



  return (
    <div className="sign-editor-container h-screen w-full">
      <PolotnoContainer>
        <SidePanelWrap>
          {/* Tab Navigation */}
          <div className="bg-white border-b border-gray-200">
            <div className="flex">
              {[
                { id: 'templates', label: 'Templates', icon: '📋' },
                { id: 'images', label: 'Images', icon: '🖼️' },
                { id: 'text', label: 'Text', icon: '📝' },
                { id: 'colors', label: 'Colors', icon: '🎨' },
                { id: 'settings', label: 'Settings', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'templates' && (
          <TemplateBrowserPanel 
            store={store}
            categories={templateCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onTemplateSelect={loadTemplate}
            selectedTemplate={selectedTemplate}
          />
            )}
          
            {activeTab === 'images' && (
          <ImageReplacementPanel 
            store={store}
            onImageReplace={handleImageReplace}
                                 onBackgroundChange={(backgroundUrl, backgroundSize) => {
                   if (selectedElement && canvasElements.find(el => el.id === selectedElement)) {
                     updateElementBackground(selectedElement, backgroundUrl, backgroundSize);
                   } else {
                     setCustomBackground(backgroundUrl);
                   }
                 }}
            selectedTemplate={selectedTemplate}
          />
            )}
            
            {activeTab === 'text' && (
              <SignTextToolsPanel store={store} />
            )}
            
            {activeTab === 'colors' && (
              <SignColorPanel store={store} />
            )}
            
            {activeTab === 'settings' && (
          <SignSpecificationsPanel 
            store={store}
            exportOptions={exportOptions}
            onExportOptionsChange={setExportOptions}
            onExport={exportForPrint}
          />
            )}
          </div>
        </SidePanelWrap>
        
        <WorkspaceWrap>
          <div className="bg-white border-b border-gray-200 p-4">
            {/* Top Row - Template Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">
                  {selectedTemplate ? `Template: ${selectedTemplate.name}` : 'No template selected'}
                </span>
                <span className="text-sm text-gray-600">
                  {selectedTemplate ? `${selectedTemplate.dimensions.width} × ${selectedTemplate.dimensions.height} px` : ''}
                </span>
              </div>
              
              {/* Export Button */}
            <ExportButton onClick={() => exportForPrint()} />
            </div>
            
            {/* Bottom Row - Canvas & Zoom Controls */}
            <div className="flex items-center justify-between">
              {/* Left Side - Canvas Size Controls */}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Canvas:</span>
                <select
                  value={`${canvasSize.width}x${canvasSize.height}`}
                  onChange={(e) => {
                    const [width, height] = e.target.value.split('x').map(Number);
                    setCanvasSize({ width, height });
                  }}
                  className="px-2 py-1 text-sm border border-gray-300 rounded"
                >
                  <option value="1200x600">1200 × 600 px</option>
                  <option value="1800x900">1800 × 900 px</option>
                  <option value="2400x1200">2400 × 1200 px</option>
                  <option value="3000x1500">3000 × 1500 px</option>
                  <option value="3600x1800">3600 × 1800 px</option>
                </select>
                
                <button
                  onClick={() => setCanvasElements([])}
                  className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                  title="Clear all templates"
                >
                  Clear Canvas
                </button>
              </div>
              
              {/* Right Side - Zoom Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCanvasZoom(Math.max(0.1, canvasZoom - 0.1))}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <span className="text-lg">−</span>
                </button>
                <span className="text-sm text-gray-600 w-16 text-center font-medium">
                  {Math.round(canvasZoom * 100)}%
                </span>
                <button
                  onClick={() => setCanvasZoom(Math.min(2, canvasZoom + 0.1))}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Canvas Area */}
          <div className="flex-1 bg-gray-100 p-4 overflow-auto">
            {/* Canvas Container */}
            <div className="relative bg-white shadow-2xl border border-gray-300 mx-auto" style={{
              width: canvasSize.width * canvasZoom,
              height: canvasSize.height * canvasZoom,
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: `${50 * canvasZoom}px ${50 * canvasZoom}px`,
              backgroundPosition: '0 0'
            }}>
              
              {/* Canvas Elements (Placed Templates) */}
              {canvasElements.map((element) => (
                <div
                  key={element.id}
                  className={`absolute cursor-move transition-all ${
                    element.isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
                  }`}
                  style={{
                    left: (element.x || 0) * canvasZoom,
                    top: (element.y || 0) * canvasZoom,
                    width: (element.width || 400) * canvasZoom,
                    height: (element.height || 400) * canvasZoom,
                    backgroundColor: element.customBackground ? 'transparent' : (element.background || '#ffffff'),
                    backgroundImage: element.customBackground ? `url(${element.customBackground})` : 'none',
                    backgroundSize: element.customBackground ? (element.backgroundSize || 'contain') : 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                  onClick={() => selectCanvasElement(element.id)}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', element.id);
                  }}
                  onDragEnd={(e) => {
                    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                    if (rect) {
                      const newX = (e.clientX - rect.left) / canvasZoom;
                      const newY = (e.clientY - rect.top) / canvasZoom;
                      moveCanvasElement(element.id, newX, newY);
                    }
                  }}
                >
                                     {/* Template Elements */}
                   {element.elements.map((templateElement: any) => {
                     // Ensure we have valid dimensions with fallbacks
                     const elementWidth = templateElement.width || 100;
                     const elementHeight = templateElement.height || 100;
                     
                     // Scale element coordinates to fit within template bounds and apply template scale
                     const scale = element.scale || 1;
                     const scaledElementX = (templateElement.x || 0) * scale;
                     const scaledElementY = (templateElement.y || 0) * scale;
                     const scaledElementWidth = (templateElement.width || 100) * scale;
                     const scaledElementHeight = (templateElement.height || 100) * scale;
                     
                     const elementX = Math.max(0, Math.min(scaledElementX, element.width - scaledElementWidth));
                     const elementY = Math.max(0, Math.min(scaledElementY, element.height - scaledElementHeight));
                     
                     return (
                       <div
                         key={templateElement.id}
                         className="absolute"
                         style={{
                           left: elementX * canvasZoom,
                           top: elementY * canvasZoom,
                           width: scaledElementWidth * canvasZoom,
                           height: scaledElementHeight * canvasZoom,
                           fontSize: (templateElement.fontSize || 48) * scale * canvasZoom,
                           fontFamily: templateElement.fontFamily || 'Arial',
                           color: templateElement.fontFill || '#000000',
                           textAlign: templateElement.align || 'left',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: templateElement.align === 'center' ? 'center' : 'flex-start',
                           textShadow: templateElement.stroke ? `2px 2px 0px ${templateElement.stroke}, -2px -2px 0px ${templateElement.stroke}, 2px -2px 0px ${templateElement.stroke}, -2px 2px 0px ${templateElement.stroke}` : 'none'
                         }}
                       >
                                                 {templateElement.type === 'text' ? templateElement.text : ''}
                         {templateElement.type === 'image' && (
                           <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-400 flex items-center justify-center">
                             <div className="text-center">
                               <div className="text-gray-400 mb-1">📷</div>
                               <span className="text-xs text-gray-500 font-medium">{templateElement.name || 'Image'}</span>
                             </div>
                           </div>
                         )}
                         {templateElement.type === 'svg' && (
                           <div 
                             className="w-full h-full"
                             dangerouslySetInnerHTML={{ __html: templateElement.svg }}
                           />
                         )}
                      </div>
                    );
                  })}
                  
                  {/* Element Controls */}
                  {element.isSelected && (
                    <>
                      {/* Resize Handles */}
                      <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full cursor-nw-resize"></div>
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full cursor-ne-resize"></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-500 rounded-full cursor-sw-resize"></div>
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize"></div>
                      
                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCanvasElement(element.id);
                        }}
                        className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        title="Delete template"
                      >
                        ×
                      </button>
                    </>
                  )}
                </div>
              ))}
              
              {/* Canvas Border */}
              <div className="absolute inset-0 border-2 border-gray-400 pointer-events-none"></div>
              
              {/* Canvas Info */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {canvasSize.width} × {canvasSize.height} px | {canvasElements.length} templates
              </div>
            </div>
            
            {/* Empty State */}
            {canvasElements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <p className="text-lg font-medium">Main Canvas</p>
                  <p className="text-sm">Select templates from the left panel to place them here</p>
                  <p className="text-xs mt-2">Canvas size: {canvasSize.width} × {canvasSize.height} px</p>
                </div>
              </div>
            )}
          </div>
        </WorkspaceWrap>
      </PolotnoContainer>
    </div>
  );
});

export default SignBoardEditor;
