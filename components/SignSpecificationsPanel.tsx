import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Settings, Download, Printer, Palette, Ruler } from 'lucide-react';

interface SignSpecificationsPanelProps {
  store: any;
  exportOptions: {
    dpi: number;
    format: string;
    addBleed: boolean;
    colorProfile: string;
  };
  onExportOptionsChange: (options: any) => void;
  onExport: (options?: any) => void;
}

// Standard sign dimensions
const standardDimensions = [
  { name: 'Yard Sign (12"×18")', width: 1200, height: 1800 },
  { name: 'Real Estate (18"×24")', width: 1800, height: 2400 },
  { name: 'Large Banner (24"×36")', width: 2400, height: 3600 },
  { name: 'Banner (24"×12")', width: 2400, height: 1200 },
  { name: 'Banner (24"×18")', width: 2400, height: 1800 },
  { name: 'Banner (4\'×8\')', width: 4800, height: 9600 },
  { name: 'Custom', width: 0, height: 0 }
];

// Material options
const materialOptions = [
  { id: 'coroplast', name: 'Coroplast (Corrugated Plastic)', description: 'Lightweight, weather-resistant, perfect for yard signs' },
  { id: 'aluminum', name: 'Aluminum', description: 'Durable, professional finish, great for business signs' },
  { id: 'vinyl', name: 'Vinyl Banner', description: 'Flexible, cost-effective, ideal for temporary displays' },
  { id: 'magnetic', name: 'Magnetic', description: 'Perfect for vehicle graphics and temporary installations' },
  { id: 'acrylic', name: 'Acrylic', description: 'Premium look, excellent for indoor business signage' }
];

// Quantity options
const quantityOptions = [
  { value: 1, label: '1 sign' },
  { value: 5, label: '5 signs' },
  { value: 10, label: '10 signs' },
  { value: 25, label: '25 signs' },
  { value: 50, label: '50 signs' },
  { value: 100, label: '100 signs' },
  { value: 'custom', label: 'Custom quantity' }
];

export const SignSpecificationsPanel = observer(({
  store,
  exportOptions,
  onExportOptionsChange,
  onExport
}: SignSpecificationsPanelProps) => {
  const [activeTab, setActiveTab] = useState<'dimensions' | 'materials' | 'export'>('dimensions');
  const [customQuantity, setCustomQuantity] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState('coroplast');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [customDimensions, setCustomDimensions] = useState({ width: 1800, height: 2400 });

  // Update store dimensions
  const updateDimensions = (width: number, height: number) => {
    if (store.activePage) {
      store.activePage.set({ width, height });
    }
  };

  // Handle dimension selection
  const handleDimensionSelect = (dimension: any) => {
    if (dimension.name === 'Custom') {
      // Keep current custom dimensions
      return;
    }
    updateDimensions(dimension.width, dimension.height);
  };

  // Handle custom dimension change
  const handleCustomDimensionChange = (field: 'width' | 'height', value: number) => {
    const newDimensions = { ...customDimensions, [field]: value };
    setCustomDimensions(newDimensions);
    updateDimensions(newDimensions.width, newDimensions.height);
  };

  // Handle export options change
  const handleExportOptionChange = (key: string, value: any) => {
    onExportOptionsChange({
      ...exportOptions,
      [key]: value
    });
  };

  // Calculate estimated cost (simplified)
  const calculateEstimatedCost = () => {
    const baseCost = 15; // Base cost per sign
    const materialMultiplier = {
      coroplast: 1,
      aluminum: 2.5,
      vinyl: 0.8,
      magnetic: 1.2,
      acrylic: 3
    };
    
    const quantity = selectedQuantity === 'custom' ? customQuantity : selectedQuantity;
    const materialCost = baseCost * (materialMultiplier[selectedMaterial as keyof typeof materialMultiplier] || 1);
    
    return (materialCost * quantity).toFixed(2);
  };

  return (
    <div className="sign-specifications-panel w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Sign Specifications</h2>
        <p className="text-sm text-gray-600">
          Configure dimensions, materials, and export settings
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'dimensions', label: 'Dimensions', icon: Ruler },
          { id: 'materials', label: 'Materials', icon: Palette },
          { id: 'export', label: 'Export', icon: Download }
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
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Dimensions Tab */}
        {activeTab === 'dimensions' && (
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Standard Sizes</h3>
              <div className="grid grid-cols-1 gap-2">
                {standardDimensions.map((dimension) => (
                  <button
                    key={dimension.name}
                    onClick={() => handleDimensionSelect(dimension)}
                    className="text-left p-3 border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{dimension.name}</div>
                    {dimension.name !== 'Custom' && (
                      <div className="text-sm text-gray-600">
                        {dimension.width / 100}" × {dimension.height / 100}"
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Custom Dimensions</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width (inches)</label>
                  <input
                    type="number"
                    value={customDimensions.width / 100}
                    onChange={(e) => handleCustomDimensionChange('width', parseInt(e.target.value) * 100)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height (inches)</label>
                  <input
                    type="number"
                    value={customDimensions.height / 100}
                    onChange={(e) => handleCustomDimensionChange('height', parseInt(e.target.value) * 100)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="120"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Materials Tab */}
        {activeTab === 'materials' && (
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Material Selection</h3>
              <div className="space-y-3">
                {materialOptions.map((material) => (
                  <label
                    key={material.id}
                    className="flex items-start space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="material"
                      value={material.id}
                      checked={selectedMaterial === material.id}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{material.name}</div>
                      <div className="text-sm text-gray-600">{material.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="grid grid-cols-2 gap-2">
                {quantityOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="quantity"
                      value={option.value}
                      checked={selectedQuantity === option.value}
                      onChange={(e) => setSelectedQuantity(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-900">{option.label}</span>
                  </label>
                ))}
              </div>
              
              {selectedQuantity === 'custom' && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custom Quantity</label>
                  <input
                    type="number"
                    value={customQuantity}
                    onChange={(e) => setCustomQuantity(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="1000"
                  />
                </div>
              )}
            </div>

            {/* Cost Estimate */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Estimated Cost:</span>
                <span className="text-lg font-bold text-blue-600">${calculateEstimatedCost()}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">*Final cost may vary based on complexity</p>
            </div>
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Export Settings</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resolution (DPI)</label>
                  <select
                    value={exportOptions.dpi}
                    onChange={(e) => handleExportOptionChange('dpi', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={150}>150 DPI (Standard)</option>
                    <option value={300}>300 DPI (High Quality)</option>
                    <option value={600}>600 DPI (Print Quality)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                  <select
                    value={exportOptions.format}
                    onChange={(e) => handleExportOptionChange('format', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pdf">PDF (Recommended)</option>
                    <option value="png">PNG (High Quality)</option>
                    <option value="jpg">JPG (Compressed)</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={exportOptions.addBleed}
                      onChange={(e) => handleExportOptionChange('addBleed', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Add Bleed Area (0.125")</span>
                  </label>
                  <p className="text-xs text-gray-600 mt-1">Required for professional printing</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color Profile</label>
                  <select
                    value={exportOptions.colorProfile}
                    onChange={(e) => handleExportOptionChange('colorProfile', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="CMYK">CMYK (Print)</option>
                    <option value="RGB">RGB (Digital)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={() => onExport()}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Export for Print Production
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default SignSpecificationsPanel;

