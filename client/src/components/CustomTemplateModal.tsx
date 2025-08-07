import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler, Type, Palette, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTemplate: (template: {
    name: string;
    width: number;
    height: number;
    unit: string;
    backgroundColor: string;
  }) => void;
}

export default function CustomTemplateModal({ isOpen, onClose, onCreateTemplate }: CustomTemplateModalProps) {
  const [name, setName] = useState("");
  const [width, setWidth] = useState(36);
  const [height, setHeight] = useState(48);
  const [unit, setUnit] = useState("inches");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreateTemplate({
      name: name.trim(),
      width,
      height,
      unit,
      backgroundColor
    });

    // Reset form
    setName("");
    setWidth(36);
    setHeight(48);
    setUnit("inches");
    setBackgroundColor("#ffffff");
    onClose();
  };

  const presetSizes = [
    { name: "Small Banner", width: 24, height: 36 },
    { name: "Medium Banner", width: 36, height: 48 },
    { name: "Large Banner", width: 48, height: 72 },
    { name: "Yard Sign", width: 18, height: 24 },
    { name: "Vehicle Wrap", width: 120, height: 60 },
    { name: "Window Graphic", width: 36, height: 48 },
    { name: "Custom", width: 0, height: 0 }
  ];

  const handlePresetSelect = (preset: typeof presetSizes[0]) => {
    if (preset.name === "Custom") return;
    setWidth(preset.width);
    setHeight(preset.height);
    setName(preset.name);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
                     <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0.9, opacity: 0 }}
             className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
           >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Ruler className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Create Custom Template</h2>
                  <p className="text-sm text-gray-600">Design your own sign specifications</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Template Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Template Name
                </Label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter template name..."
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Preset Sizes */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Quick Presets</Label>
                <div className="grid grid-cols-2 gap-2">
                  {presetSizes.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handlePresetSelect(preset)}
                      className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="font-medium text-sm text-gray-900">{preset.name}</div>
                      {preset.name !== "Custom" && (
                        <div className="text-xs text-gray-500">
                          {preset.width}" × {preset.height}"
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width" className="text-sm font-medium text-gray-700">
                    Width
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    min="1"
                    max="200"
                    className="text-center"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-sm font-medium text-gray-700">
                    Height
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min="1"
                    max="200"
                    className="text-center"
                  />
                </div>
              </div>

              {/* Unit */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inches">Inches</SelectItem>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="cm">Centimeters</SelectItem>
                    <SelectItem value="mm">Millimeters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Background Color */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Background Color</Label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                  />
                  <Input
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Preview</Label>
                <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div 
                    className="border border-gray-300 rounded"
                    style={{
                      width: `${Math.min(width * 2, 200)}px`,
                      height: `${Math.min(height * 2, 150)}px`,
                      backgroundColor: backgroundColor,
                      margin: '0 auto'
                    }}
                  />
                  <div className="text-center mt-2 text-sm text-gray-600">
                    {width} × {height} {unit}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="h-4 w-4" />
                  Create Template
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 