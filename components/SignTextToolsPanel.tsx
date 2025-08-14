import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, Palette } from 'lucide-react';

interface SignTextToolsPanelProps {
  store: any;
}

// Sign-appropriate fonts
const signFonts = [
  { name: 'Arial', value: 'Arial, sans-serif', category: 'Clean & Readable' },
  { name: 'Arial Black', value: 'Arial Black, sans-serif', category: 'Bold & Impactful' },
  { name: 'Impact', value: 'Impact, sans-serif', category: 'Bold & Impactful' },
  { name: 'Helvetica', value: 'Helvetica, sans-serif', category: 'Clean & Readable' },
  { name: 'Times New Roman', value: 'Times New Roman, serif', category: 'Professional' },
  { name: 'Georgia', value: 'Georgia, serif', category: 'Professional' },
  { name: 'Verdana', value: 'Verdana, sans-serif', category: 'Clean & Readable' },
  { name: 'Tahoma', value: 'Tahoma, sans-serif', category: 'Clean & Readable' },
  { name: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif', category: 'Modern' },
  { name: 'Comic Sans MS', value: 'Comic Sans MS, sans-serif', category: 'Casual' }
];

// Font size presets for signs
const fontSizePresets = [
  { label: 'Small (24pt)', value: 24 },
  { label: 'Medium (36pt)', value: 36 },
  { label: 'Large (48pt)', value: 48 },
  { label: 'Extra Large (72pt)', value: 72 },
  { label: 'Huge (96pt)', value: 96 },
  { label: 'Massive (120pt)', value: 120 },
  { label: 'Giant (144pt)', value: 144 }
];

// Text alignment options
const textAlignments = [
  { value: 'left', icon: AlignLeft, label: 'Left' },
  { value: 'center', icon: AlignCenter, label: 'Center' },
  { value: 'right', icon: AlignRight, label: 'Right' },
  { value: 'justify', icon: AlignJustify, label: 'Justify' }
];

// Sign color presets
const signColors = [
  { name: 'Black', value: '#000000', category: 'Primary' },
  { name: 'White', value: '#ffffff', category: 'Primary' },
  { name: 'Red', value: '#ff0000', category: 'Attention' },
  { name: 'Blue', value: '#0000ff', category: 'Trust' },
  { name: 'Green', value: '#00ff00', category: 'Positive' },
  { name: 'Yellow', value: '#ffff00', category: 'Warning' },
  { name: 'Orange', value: '#ff6600', category: 'Energy' },
  { name: 'Purple', value: '#800080', category: 'Luxury' },
  { name: 'Gray', value: '#808080', category: 'Neutral' },
  { name: 'Dark Blue', value: '#000080', category: 'Professional' },
  { name: 'Dark Red', value: '#800000', category: 'Professional' },
  { name: 'Gold', value: '#ffd700', category: 'Premium' }
];

export const SignTextToolsPanel = observer(({ store }: SignTextToolsPanelProps) => {
  const [activeTab, setActiveTab] = useState<'fonts' | 'sizing' | 'styling' | 'colors'>('fonts');
  const [selectedElement, setSelectedElement] = useState<any>(null);

  // Get selected text element
  React.useEffect(() => {
    const updateSelectedElement = () => {
      const selection = store.selectedElements;
      if (selection.length === 1 && selection[0].type === 'text') {
        setSelectedElement(selection[0]);
      } else {
        setSelectedElement(null);
      }
    };

    updateSelectedElement();
    const dispose = reaction(
      () => store.selectedElements,
      updateSelectedElement,
      { fireImmediately: false }
    );
    return dispose;
  }, [store]);

  // Apply font family
  const applyFontFamily = (fontFamily: string) => {
    if (selectedElement) {
      selectedElement.set({ fontFamily });
    }
  };

  // Apply font size
  const applyFontSize = (fontSize: number) => {
    if (selectedElement) {
      selectedElement.set({ fontSize });
    }
  };

  // Apply text alignment
  const applyTextAlignment = (align: string) => {
    if (selectedElement) {
      selectedElement.set({ align });
    }
  };

  // Apply text color
  const applyTextColor = (color: string) => {
    if (selectedElement) {
      selectedElement.set({ fill: color });
    }
  };

  // Toggle text style
  const toggleTextStyle = (style: string) => {
    if (!selectedElement) return;

    const currentValue = selectedElement[style] || false;
    selectedElement.set({ [style]: !currentValue });
  };

  // Add new text element
  const addNewText = () => {
    const page = store.activePage;
    if (page) {
      const textElement = page.addElement({
        type: 'text',
        text: 'Your Text Here',
        fontSize: 48,
        fontFamily: 'Arial',
        fill: '#000000',
        x: page.width / 2,
        y: page.height / 2,
        align: 'center'
      });
      
      // Select the new text element
      store.selectElements([textElement]);
    }
  };

  if (!selectedElement) {
    return (
      <div className="sign-text-tools-panel w-80 bg-white border-r border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Text Tools</h2>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <Type className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="mb-4">Select a text element to edit</p>
            <button
              onClick={addNewText}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Add New Text
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sign-text-tools-panel w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Text Tools</h2>
        <p className="text-sm text-gray-600">
          Customize text appearance and styling
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'fonts', label: 'Fonts', icon: Type },
          { id: 'sizing', label: 'Sizing', icon: Type },
          { id: 'styling', label: 'Style', icon: Bold },
          { id: 'colors', label: 'Colors', icon: Palette }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="h-4 w-4 mr-1" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Fonts Tab */}
        {activeTab === 'fonts' && (
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Font Family</h3>
              <div className="space-y-2">
                {signFonts.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => applyFontFamily(font.value)}
                    className={`w-full text-left p-3 border rounded-lg transition-colors ${
                      selectedElement.fontFamily === font.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900" style={{ fontFamily: font.value }}>
                      {font.name}
                    </div>
                    <div className="text-xs text-gray-600">{font.category}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sizing Tab */}
        {activeTab === 'sizing' && (
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Font Size</h3>
              <div className="space-y-2">
                {fontSizePresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => applyFontSize(preset.value)}
                    className={`w-full text-left p-3 border rounded-lg transition-colors ${
                      selectedElement.fontSize === preset.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{preset.label}</div>
                    <div className="text-xs text-gray-600">
                      {preset.value}pt - Good for {preset.value >= 72 ? 'headlines' : preset.value >= 48 ? 'subheadings' : 'body text'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Custom Size</h3>
              <input
                type="number"
                value={selectedElement.fontSize || 48}
                onChange={(e) => applyFontSize(parseInt(e.target.value) || 48)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="8"
                max="300"
                step="1"
              />
              <p className="text-xs text-gray-600 mt-1">Enter size in points (pt)</p>
            </div>
          </div>
        )}

        {/* Styling Tab */}
        {activeTab === 'styling' && (
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Text Alignment</h3>
              <div className="grid grid-cols-2 gap-2">
                {textAlignments.map((alignment) => (
                  <button
                    key={alignment.value}
                    onClick={() => applyTextAlignment(alignment.value)}
                    className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                      selectedElement.align === alignment.value
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <alignment.icon className="h-4 w-4 mr-2" />
                    {alignment.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Text Style</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => toggleTextStyle('fontWeight')}
                  className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                    selectedElement.fontWeight === 'bold'
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Bold className="h-4 w-4 mr-2" />
                  Bold
                </button>
                
                <button
                  onClick={() => toggleTextStyle('fontStyle')}
                  className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                    selectedElement.fontStyle === 'italic'
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Italic className="h-4 w-4 mr-2" />
                  Italic
                </button>
                
                <button
                  onClick={() => toggleTextStyle('textDecoration')}
                  className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                    selectedElement.textDecoration === 'underline'
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Underline className="h-4 w-4 mr-2" />
                  Underline
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Text Content</h3>
              <textarea
                value={selectedElement.text || ''}
                onChange={(e) => selectedElement.set({ text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Enter your text here..."
              />
            </div>
          </div>
        )}

        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Text Color</h3>
              <div className="grid grid-cols-3 gap-2">
                {signColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => applyTextColor(color.value)}
                    className={`p-3 border rounded-lg transition-colors ${
                      selectedElement.fill === color.value
                        ? 'border-blue-500 ring-2 ring-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-full h-8 rounded mb-2"
                      style={{ backgroundColor: color.value }}
                    />
                    <div className="text-xs text-gray-900">{color.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Custom Color</h3>
              <input
                type="color"
                value={selectedElement.fill || '#000000'}
                onChange={(e) => applyTextColor(e.target.value)}
                className="w-full h-12 border border-gray-300 rounded-md cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={addNewText}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
        >
          Add New Text
        </button>
      </div>
    </div>
  );
});

export default SignTextToolsPanel;
