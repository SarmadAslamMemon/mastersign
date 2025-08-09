import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { UserDesign } from '@/types/template-editor';

interface PropertiesPanelProps {
  design: UserDesign;
  selectedElements: string[];
  onElementUpdate: (elementId: string, updates: any) => void;
  onDesignUpdate: (updates: Partial<UserDesign>) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  design,
  selectedElements,
  onElementUpdate,
  onDesignUpdate
}) => {
  const hasSelection = selectedElements.length > 0;

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Design Properties */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Design Properties</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="design-name">Name</Label>
              <Input
                id="design-name"
                value={design.name}
                onChange={(e) => onDesignUpdate({ name: e.target.value })}
                placeholder="Design name"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="design-width">Width</Label>
                <Input
                  id="design-width"
                  type="number"
                  value={design.metadata.width}
                  onChange={(e) => onDesignUpdate({
                    metadata: { ...design.metadata, width: parseInt(e.target.value) || 0 }
                  })}
                  placeholder="Width"
                />
              </div>
              <div>
                <Label htmlFor="design-height">Height</Label>
                <Input
                  id="design-height"
                  type="number"
                  value={design.metadata.height}
                  onChange={(e) => onDesignUpdate({
                    metadata: { ...design.metadata, height: parseInt(e.target.value) || 0 }
                  })}
                  placeholder="Height"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Element Properties */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Element Properties</h3>
          {!hasSelection ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                Select an element to edit its properties
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                {selectedElements.length === 1 
                  ? '1 element selected' 
                  : `${selectedElements.length} elements selected`
                }
              </div>
              
              {/* Common Properties */}
              <div className="space-y-3">
                <div>
                  <Label>Position</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="X"
                      type="number"
                      // TODO: Connect to actual element position
                    />
                    <Input
                      placeholder="Y"
                      type="number"
                      // TODO: Connect to actual element position
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Size</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Width"
                      type="number"
                      // TODO: Connect to actual element size
                    />
                    <Input
                      placeholder="Height"
                      type="number"
                      // TODO: Connect to actual element size
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Rotation</Label>
                  <Input
                    placeholder="0°"
                    type="number"
                    // TODO: Connect to actual element rotation
                  />
                </div>
              </div>

              {/* Element-specific properties would go here */}
              <div className="text-xs text-gray-400">
                Additional properties will appear based on element type
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                // TODO: Implement duplicate action
                console.log('Duplicate selected elements');
              }}
            >
              Duplicate Selected
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                // TODO: Implement delete action
                console.log('Delete selected elements');
              }}
            >
              Delete Selected
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                // TODO: Implement bring to front action
                console.log('Bring to front');
              }}
            >
              Bring to Front
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                // TODO: Implement send to back action
                console.log('Send to back');
              }}
            >
              Send to Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
