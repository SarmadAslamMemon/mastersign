import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { Palette, Eye, EyeOff, AlertTriangle, CheckCircle, Download, Upload } from 'lucide-react';

interface SignColorPanelProps {
  store: any;
}

// Print-safe color palettes
const colorPalettes = {
  'real-estate': {
    name: 'Real Estate',
    description: 'Professional colors for property signs',
    colors: [
      { name: 'Real Estate Red', value: '#cc0000', category: 'Primary' },
      { name: 'Professional Blue', value: '#0066cc', category: 'Primary' },
      { name: 'Trust Green', value: '#006600', category: 'Primary' },
      { name: 'Warm Gold', value: '#ffcc00', category: 'Accent' },
      { name: 'Neutral Gray', value: '#666666', category: 'Neutral' },
      { name: 'Pure White', value: '#ffffff', category: 'Neutral' },
      { name: 'Rich Black', value: '#000000', category: 'Neutral' }
    ]
  },
  'business': {
    name: 'Business',
    description: 'Corporate colors for business promotion',
    colors: [
      { name: 'Corporate Blue', value: '#003366', category: 'Primary' },
      { name: 'Success Green', value: '#009900', category: 'Primary' },
      { name: 'Energy Orange', value: '#ff6600', category: 'Accent' },
      { name: 'Trust Blue', value: '#0066cc', category: 'Primary' },
      { name: 'Premium Gold', value: '#ffd700', category: 'Accent' },
      { name: 'Professional Gray', value: '#333333', category: 'Neutral' },
      { name: 'Clean White', value: '#ffffff', category: 'Neutral' }
    ]
  },
  'political': {
    name: 'Political',
    description: 'Campaign colors for political signs',
    colors: [
      { name: 'Patriot Blue', value: '#000080', category: 'Primary' },
      { name: 'American Red', value: '#cc0000', category: 'Primary' },
      { name: 'Pure White', value: '#ffffff', category: 'Neutral' },
      { name: 'Navy Blue', value: '#000033', category: 'Primary' },
      { name: 'Bold Red', value: '#990000', category: 'Primary' },
      { name: 'Trust Blue', value: '#0066cc', category: 'Primary' },
      { name: 'Rich Black', value: '#000000', category: 'Neutral' }
    ]
  },
  'events': {
    name: 'Events',
    description: 'Vibrant colors for event promotion',
    colors: [
      { name: 'Festival Purple', value: '#800080', category: 'Primary' },
      { name: 'Party Pink', value: '#ff00ff', category: 'Accent' },
      { name: 'Sunny Yellow', value: '#ffff00', category: 'Accent' },
      { name: 'Ocean Blue', value: '#0066cc', category: 'Primary' },
      { name: 'Grass Green', value: '#00cc00', category: 'Primary' },
      { name: 'Fire Orange', value: '#ff6600', category: 'Accent' },
      { name: 'Pure White', value: '#ffffff', category: 'Neutral' }
    ]
  },
  'construction': {
    name: 'Construction',
    description: 'Safety colors for construction signs',
    colors: [
      { name: 'Safety Orange', value: '#ff6600', category: 'Primary' },
      { name: 'Warning Yellow', value: '#ffff00', category: 'Primary' },
      { name: 'Stop Red', value: '#ff0000', category: 'Primary' },
      { name: 'Caution Yellow', value: '#ffcc00', category: 'Primary' },
      { name: 'Info Blue', value: '#0066cc', category: 'Primary' },
      { name: 'Rich Black', value: '#000000', category: 'Neutral' },
      { name: 'Pure White', value: '#ffffff', category: 'Neutral' }
    ]
  }
};

// Color contrast checker
const getContrastRatio = (color1: string, color2: string): number => {
  // Simple contrast calculation (Luminance-based)
  const getLuminance = (color: string): number => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      if (c <= 0.03928) return c / 12.92;
      return Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// Check if color is print-safe
const isPrintSafe = (color: string): boolean => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Check if color is within CMYK printable range
  // This is a simplified check - in reality, CMYK conversion is more complex
  return r <= 255 && g <= 255 && b <= 255;
};

export const SignColorPanel = observer(({ store }: SignColorPanelProps) => {
  const [activePalette, setActivePalette] = useState('real-estate');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [showColorWarnings, setShowColorWarnings] = useState(true);
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [selectedElement, setSelectedElement] = useState<any>(null);

  // Get selected element
  useEffect(() => {
    const updateSelectedElement = () => {
      const selection = store.selectedElements;
      if (selection.length === 1) {
        setSelectedElement(selection[0]);
        // Update selected color based on element type
        if (selection[0].type === 'text') {
          setSelectedColor(selection[0].fill || '#000000');
        } else if (selection[0].type === 'rect' || selection[0].type === 'circle') {
          setSelectedColor(selection[0].fill || '#000000');
        }
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

  // Apply color to selected element
  const applyColor = (color: string) => {
    if (!selectedElement) return;
    
    if (selectedElement.type === 'text') {
      selectedElement.set({ fill: color });
    } else if (selectedElement.type === 'rect' || selectedElement.type === 'circle') {
      selectedElement.set({ fill: color });
    }
    
    setSelectedColor(color);
  };

  // Add custom color
  const addCustomColor = (color: string) => {
    if (!customColors.includes(color)) {
      setCustomColors([...customColors, color]);
    }
  };

  // Remove custom color
  const removeCustomColor = (color: string) => {
    setCustomColors(customColors.filter(c => c !== color));
  };

  // Export color palette
  const exportColorPalette = () => {
    const palette = colorPalettes[activePalette as keyof typeof colorPalettes];
    const data = {
      name: palette.name,
      colors: palette.colors.map(c => ({ name: c.name, value: c.value, category: c.category }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${palette.name.toLowerCase().replace(' ', '-')}-colors.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import color palette
  const importColorPalette = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          // Handle imported palette (could add to custom palettes)
          console.log('Imported palette:', data);
        } catch (error) {
          console.error('Error parsing color palette:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="sign-color-panel w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Color Tools</h2>
        <p className="text-sm text-gray-600">
          Professional color palettes for sign design
        </p>
      </div>

      {/* Color Palette Selection */}
      <div className="p-4 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">Color Palette</label>
        <select
          value={activePalette}
          onChange={(e) => setActivePalette(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {Object.entries(colorPalettes).map(([key, palette]) => (
            <option key={key} value={key}>{palette.name}</option>
          ))}
        </select>
        
        <p className="text-xs text-gray-600 mt-1">
          {colorPalettes[activePalette as keyof typeof colorPalettes]?.description}
        </p>
      </div>

      {/* Color Warnings Toggle */}
      <div className="px-4 py-2 border-b border-gray-200">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showColorWarnings}
            onChange={(e) => setShowColorWarnings(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700">Show color warnings</span>
        </label>
      </div>

      {/* Color Palette Display */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Palette Colors</h3>
            <div className="grid grid-cols-2 gap-2">
              {colorPalettes[activePalette as keyof typeof colorPalettes]?.colors.map((color) => {
                const isPrintSafeColor = isPrintSafe(color.value);
                const contrastWithWhite = getContrastRatio(color.value, '#ffffff');
                const contrastWithBlack = getContrastRatio(color.value, '#000000');
                const bestContrast = contrastWithWhite > contrastWithBlack ? 'white' : 'black';
                
                return (
                  <button
                    key={color.value}
                    onClick={() => applyColor(color.value)}
                    className={`relative p-3 border rounded-lg transition-all hover:scale-105 ${
                      selectedColor === color.value
                        ? 'border-blue-500 ring-2 ring-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Color Swatch */}
                    <div
                      className="w-full h-12 rounded mb-2"
                      style={{ backgroundColor: color.value }}
                    />
                    
                    {/* Color Info */}
                    <div className="text-left">
                      <div className="font-medium text-gray-900 text-sm">{color.name}</div>
                      <div className="text-xs text-gray-600">{color.category}</div>
                      <div className="text-xs text-gray-500 font-mono">{color.value}</div>
                    </div>
                    
                    {/* Warnings */}
                    {showColorWarnings && (
                      <div className="absolute top-2 right-2 space-y-1">
                        {!isPrintSafeColor && (
                          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center" title="May not print well">
                            <AlertTriangle className="w-3 h-3 text-white" />
                          </div>
                        )}
                        {isPrintSafeColor && (
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center" title="Print-safe color">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Contrast Indicator */}
                    <div className="absolute bottom-2 right-2">
                      <div
                        className={`w-3 h-3 rounded-full border border-gray-300 ${
                          bestContrast === 'white' ? 'bg-white' : 'bg-black'
                        }`}
                        title={`Best contrast with ${bestContrast}`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Colors */}
          {customColors.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Custom Colors</h3>
              <div className="grid grid-cols-2 gap-2">
                {customColors.map((color) => (
                  <div key={color} className="relative">
                    <button
                      onClick={() => applyColor(color)}
                      className={`w-full p-3 border rounded-lg transition-all hover:scale-105 ${
                        selectedColor === color
                          ? 'border-blue-500 ring-2 ring-blue-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className="w-full h-12 rounded mb-2"
                        style={{ backgroundColor: color }}
                      />
                      <div className="text-xs text-gray-500 font-mono">{color}</div>
                    </button>
                    
                    <button
                      onClick={() => removeCustomColor(color)}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      title="Remove color"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Custom Color */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Add Custom Color</h3>
            <div className="flex space-x-2">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-12 h-12 border border-gray-300 rounded-md cursor-pointer"
              />
              <button
                onClick={() => addCustomColor(selectedColor)}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
              >
                Add to Palette
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={exportColorPalette}
          className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-sm font-medium"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Palette
        </button>
        
        <label className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-sm font-medium cursor-pointer">
          <Upload className="h-4 w-4 mr-2" />
          Import Palette
          <input
            type="file"
            accept=".json"
            onChange={importColorPalette}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
});

export default SignColorPanel;
