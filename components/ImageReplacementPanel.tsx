import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { Upload, Image, X, RotateCcw, Crop, Download } from 'lucide-react';
import { SignTemplate } from '../data/signTemplates';

interface ImageReplacementPanelProps {
  store: any;
  onImageReplace: (elementId: string, newImageFile: File) => void;
  onBackgroundChange?: (backgroundUrl: string | null, backgroundSize?: string) => void;
  selectedTemplate: SignTemplate | null;
}

export const ImageReplacementPanel = observer(({
  store,
  onImageReplace,
  onBackgroundChange,
  selectedTemplate
}: ImageReplacementPanelProps) => {
  const [replaceableImages, setReplaceableImages] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [dragOver, setDragOver] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundSize, setBackgroundSize] = useState<string>('contain');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const backgroundFileInputRef = useRef<HTMLInputElement>(null);

  // Get replaceable images from the current design
  useEffect(() => {
    const updateReplaceableImages = () => {
      const page = store.activePage;
      if (!page) return;

      const images = page.children.filter((child: any) => 
        child.type === 'image' && child.id && child.custom?.isTemplateImage
      );
      setReplaceableImages(images);
    };

    // Update when store changes
    updateReplaceableImages();
    
    // Listen for store changes using MobX reaction
    const dispose = reaction(
      () => store.activePage?.children,
      updateReplaceableImages,
      { fireImmediately: false }
    );
    return dispose;
  }, [store]);

  // Handle file selection
  const handleFileSelect = (file: File) => {
    if (selectedImage && file) {
      onImageReplace(selectedImage.id, file);
      setSelectedImage(null);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (selectedImage && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      }
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle background image upload
  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
      onBackgroundChange?.(imageUrl, backgroundSize);
    }
    // Reset input
    if (backgroundFileInputRef.current) {
      backgroundFileInputRef.current.value = '';
    }
  };

  // Reset background image
  const resetBackground = () => {
    setBackgroundImage(null);
    onBackgroundChange?.(null, backgroundSize);
  };

  // Reset image to placeholder
  const resetImage = (image: any) => {
    if (image.custom?.originalSrc) {
      image.set({ src: image.custom.originalSrc });
    }
  };

  // Download current image
  const downloadImage = (image: any) => {
    if (image.src) {
      const link = document.createElement('a');
      link.href = image.src;
      link.download = `${image.name || 'image'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!selectedTemplate) {
    return (
      <div className="image-replacement-panel w-80 bg-white border-r border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Image Tools</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <Image className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p>Select a template to use image tools</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="image-replacement-panel w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Image Tools</h2>
        <p className="text-sm text-gray-600">
          Set background and replace template images
        </p>
      </div>

      {/* Background Section */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Set Background</h3>
        <p className="text-sm text-gray-600 mb-3">
          Replace the template background with your own image
        </p>
        
        <div className="space-y-3">
          {/* Background Upload */}
          <label className="flex items-center justify-center w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer transition-colors">
            <div className="text-center">
              <div className="text-blue-500 mb-2">🎨</div>
              <span className="text-sm font-medium text-blue-700">Upload Background Image</span>
              <input
                ref={backgroundFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleBackgroundUpload}
                className="hidden"
              />
            </div>
          </label>
          
          {/* Background Size Control */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Background Size
            </label>
            <select
              value={backgroundSize}
              onChange={(e) => {
                const newSize = e.target.value;
                setBackgroundSize(newSize);
                if (backgroundImage) {
                  onBackgroundChange?.(backgroundImage, newSize);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="contain">Fit Inside (Contain)</option>
              <option value="cover">Fill Entire (Cover)</option>
              <option value="100% 100%">Stretch to Fit</option>
              <option value="auto">Original Size</option>
            </select>
            <p className="text-xs text-gray-500">
              Choose how the background image should be displayed
            </p>
          </div>
          
          {/* Current Background Display */}
          {backgroundImage && (
            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={backgroundImage}
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={resetBackground}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                title="Remove background"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image Replacement Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">Replace Images</h3>
          <p className="text-sm text-gray-600">
            Replace template image placeholders
          </p>
        </div>
        
        {replaceableImages.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>No replaceable images found</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {replaceableImages.map((image) => (
              <div
                key={image.id}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  selectedImage?.id === image.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedImage(image)}
              >
                {/* Image Preview */}
                <div className="relative mb-3">
                  <div className="aspect-video bg-gray-100 rounded overflow-hidden">
                    {image.src ? (
                      <img
                        src={image.src}
                        alt={image.name || 'Image'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Image className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  
                  {/* Image Status Badge */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs text-white ${
                    image.custom?.isTemplateImage && image.src === image.custom?.originalSrc
                      ? 'bg-orange-500'
                      : 'bg-green-500'
                  }`}>
                    {image.custom?.isTemplateImage && image.src === image.custom?.originalSrc
                      ? 'Placeholder'
                      : 'Custom'
                    }
                  </div>
                </div>

                {/* Image Info */}
                <div className="mb-3">
                  <h3 className="font-medium text-gray-900 text-sm mb-1">
                    {image.name || 'Image'}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {image.width} × {image.height} px
                  </p>
                </div>

                {/* Image Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Replace
                  </button>
                  
                  {image.custom?.originalSrc && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        resetImage(image);
                      }}
                      className="px-2 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      title="Reset to placeholder"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(image);
                    }}
                    className="px-2 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    title="Download image"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* File Upload Area */}
      {selectedImage && (
        <div className="p-4 border-t border-gray-200">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragOver
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">
              Drop your image here or click to browse
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
            >
              Choose Image
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Supports: JPG, PNG, GIF (Max: 10MB)
            </p>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
});

export default ImageReplacementPanel;
