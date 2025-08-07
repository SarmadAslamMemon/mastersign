import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { 
  Type, 
  Square, 
  Circle, 
  Triangle, 
  Minus, 
  Image as ImageIcon,
  ZoomIn, 
  ZoomOut, 
  Trash2, 
  Copy, 
  MoveUp, 
  MoveDown, 
  Grid3X3,
  Eye,
  Download,
  Share2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Palette,
  Settings,
  Layers,
  FolderOpen,
  X
} from 'lucide-react';

const EditorCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [fontSize, setFontSize] = useState(32);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontStyle, setFontStyle] = useState("normal");
  const [showPreview, setShowPreview] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('text');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [showImageGallery, setShowImageGallery] = useState(false);

  const CANVAS_WIDTH = 960;
  const CANVAS_HEIGHT = 480;
  const GRID_SIZE = 20;

  // Load images from localStorage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem('signflow-uploaded-images');
    if (savedImages) {
      setUploadedImages(JSON.parse(savedImages));
    }
  }, []);

  // Save images to localStorage whenever uploadedImages changes
  useEffect(() => {
    localStorage.setItem('signflow-uploaded-images', JSON.stringify(uploadedImages));
  }, [uploadedImages]);

  const drawGrid = (canvas: fabric.Canvas) => {
    for (let i = 0; i < (CANVAS_WIDTH / GRID_SIZE); i++) {
      canvas.add(new fabric.Line([i * GRID_SIZE, 0, i * GRID_SIZE, CANVAS_HEIGHT], {
        stroke: '#eee', selectable: false, evented: false }));
    }
    for (let i = 0; i < (CANVAS_HEIGHT / GRID_SIZE); i++) {
      canvas.add(new fabric.Line([0, i * GRID_SIZE, CANVAS_WIDTH, i * GRID_SIZE], {
        stroke: '#eee', selectable: false, evented: false }));
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: '#fff',
      preserveObjectStacking: true,
    });
    fabricRef.current = canvas;
    if (showGrid) drawGrid(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  const handleAddText = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const textbox = new fabric.Textbox("CLICK TO EDIT", {
      left: 100,
      top: 100,
      width: 200,
      fontSize,
      fill: fontColor,
      fontStyle,
      fontFamily: 'Arial',
    });
    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.requestRenderAll();
  };

  const handleAddTriangle = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const triangle = new fabric.Triangle({
      left: 300,
      top: 150,
      width: 80,
      height: 80,
      fill: '#A78BFA',
    });
    canvas.add(triangle);
    canvas.setActiveObject(triangle);
    canvas.requestRenderAll();
  };

  const handleAddLine = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const line = new fabric.Line([50, 50, 200, 50], {
      stroke: 'black',
      strokeWidth: 2,
    });
    canvas.add(line);
    canvas.setActiveObject(line);
    canvas.requestRenderAll();
  };

  const handleAddRect = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const rect = new fabric.Rect({
      left: 150,
      top: 150,
      width: 100,
      height: 60,
      fill: '#60A5FA',
      rx: 10,
      ry: 10,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.requestRenderAll();
  };

  const handleAddCircle = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const circle = new fabric.Circle({
      left: 250,
      top: 150,
      radius: 40,
      fill: '#F59E0B',
    });
    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.requestRenderAll();
  };

  const handleAddEllipse = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const ellipse = new fabric.Ellipse({
      left: 400,
      top: 200,
      rx: 50,
      ry: 30,
      fill: '#10B981',
    });
    canvas.add(ellipse);
    canvas.setActiveObject(ellipse);
    canvas.requestRenderAll();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result;
      if (!result) return;

      const imageDataUrl = result as string;
      
      // Add to uploaded images if not already present
      if (!uploadedImages.includes(imageDataUrl)) {
        setUploadedImages(prev => [...prev, imageDataUrl]);
      }

      const img = await fabric.Image.fromURL(imageDataUrl, { crossOrigin: 'anonymous' });
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
      });
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.requestRenderAll();
    };
    reader.readAsDataURL(file);
  };

  const handleAddImageFromGallery = async (imageDataUrl: string) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    try {
      const img = await fabric.Image.fromURL(imageDataUrl, { crossOrigin: 'anonymous' });
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
      });
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.requestRenderAll();
      setShowImageGallery(false);
    } catch (error) {
      console.error('Error adding image from gallery:', error);
    }
  };

  const handleRemoveImageFromGallery = (imageDataUrl: string) => {
    setUploadedImages(prev => prev.filter(img => img !== imageDataUrl));
  };

  const handleZoomIn = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const newZoom = zoom + 0.1;
    canvas.setZoom(newZoom);
    setZoom(newZoom);
  };

  const handleZoomOut = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const newZoom = zoom - 0.1;
    canvas.setZoom(newZoom);
    setZoom(newZoom);
  };

  const handleDelete = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (active) {
      canvas.remove(active);
      canvas.requestRenderAll();
    }
  };

  const handleDuplicate = async () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;
    const cloned = await active.clone();
    cloned.set({
      left: (active.left || 0) + 20,
      top: (active.top || 0) + 20,
    });
    canvas.add(cloned);
    canvas.setActiveObject(cloned);
    canvas.requestRenderAll();
  };

  const bringForward = () => {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (canvas && active) {
      active.bringToFront();
      canvas.requestRenderAll();
    }
  };

  const sendBackward = () => {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (canvas && active) {
      active.sendToBack();
      canvas.requestRenderAll();
    }
  };

  const toggleGrid = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    setShowGrid(!showGrid);
    canvas.getObjects('line').forEach(line => canvas.remove(line));
    if (!showGrid) drawGrid(canvas);
    canvas.requestRenderAll();
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleDownload = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1
    });
    
    const link = document.createElement('a');
    link.download = 'sign-design.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    try {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1
      });
      
      if (navigator.share) {
        const blob = await fetch(dataURL).then(r => r.blob());
        const file = new File([blob], 'sign-design.png', { type: 'image/png' });
        
        await navigator.share({
          title: 'My Custom Sign Design',
          text: 'Check out this sign design I created!',
          files: [file]
        });
      } else {
        await navigator.clipboard.writeText('Check out my sign design!');
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Sharing failed. Try downloading instead.');
    }
  };

  const handleReset = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    if (confirm('Are you sure you want to clear the canvas?')) {
      canvas.clear();
      if (showGrid) drawGrid(canvas);
      canvas.requestRenderAll();
    }
  };

  const tabs = [
    { id: 'text', label: 'Text', icon: Type, color: 'blue' },
    { id: 'shapes', label: 'Shapes', icon: Square, color: 'green' },
    { id: 'media', label: 'Media', icon: ImageIcon, color: 'purple' },
    { id: 'tools', label: 'Tools', icon: Settings, color: 'gray' },
    { id: 'layers', label: 'Layers', icon: Layers, color: 'orange' },
    { id: 'export', label: 'Export', icon: Download, color: 'emerald' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'text':
  return (
          <div className="space-y-4">
            <button 
              className="w-full flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handleAddText}
            >
              <Type className="h-5 w-5" />
              Add Text
            </button>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Text Color</label>
              <input 
                type="color" 
                value={fontColor} 
                onChange={(e) => setFontColor(e.target.value)} 
                className="w-full h-10 border rounded-lg cursor-pointer" 
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Font Size</label>
              <input 
                type="number" 
                value={fontSize} 
                onChange={(e) => setFontSize(Number(e.target.value))} 
                className="w-full border rounded-lg px-3 py-2" 
                placeholder="Size"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Font Style</label>
              <select 
                value={fontStyle} 
                onChange={(e) => setFontStyle(e.target.value)} 
                className="w-full border rounded-lg px-3 py-2"
              >
          <option value="normal">Normal</option>
          <option value="italic">Italic</option>
          <option value="bold">Bold</option>
        </select>
            </div>
          </div>
        );

      case 'shapes':
        return (
          <div className="space-y-3">
            <button 
              className="w-full flex items-center gap-3 bg-sky-500 hover:bg-sky-600 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handleAddRect}
            >
              <Square className="h-5 w-5" />
              Rectangle
            </button>
            <button 
              className="w-full flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handleAddCircle}
            >
              <Circle className="h-5 w-5" />
              Circle
            </button>
            <button 
              className="w-full flex items-center gap-3 bg-violet-500 hover:bg-violet-600 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handleAddTriangle}
            >
              <Triangle className="h-5 w-5" />
              Triangle
            </button>
            <button 
              className="w-full flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handleAddEllipse}
            >
              <Circle className="h-5 w-5" />
              Ellipse
            </button>
            <button 
              className="w-full flex items-center gap-3 bg-gray-700 hover:bg-gray-800 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handleAddLine}
            >
              <Minus className="h-5 w-5" />
              Line
            </button>
          </div>
        );

      case 'media':
        return (
          <div className="space-y-3">
            <label className="w-full flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg transition-colors cursor-pointer">
              <ImageIcon className="h-5 w-5" />
              Upload New Image
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
            <button 
              className="w-full flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={() => setShowImageGallery(true)}
            >
              <FolderOpen className="h-5 w-5" />
              Image Gallery ({uploadedImages.length})
            </button>
          </div>
        );

      case 'tools':
        return (
          <div className="space-y-3">
            <button 
              className="w-full flex items-center gap-3 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handleZoomIn}
            >
              <ZoomIn className="h-5 w-5" />
              Zoom In
            </button>
            <button 
              className="w-full flex items-center gap-3 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handleZoomOut}
            >
              <ZoomOut className="h-5 w-5" />
              Zoom Out
            </button>
            <button 
              className="w-full flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={toggleGrid}
            >
              <Grid3X3 className="h-5 w-5" />
              {showGrid ? 'Hide' : 'Show'} Grid
            </button>
            <button 
              className="w-full flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handleReset}
            >
              <RotateCcw className="h-5 w-5" />
              Reset Canvas
            </button>
          </div>
        );

      case 'layers':
        return (
          <div className="space-y-3">
            <button 
              className="w-full flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handleDelete}
            >
              <Trash2 className="h-5 w-5" />
              Delete Selected
            </button>
            <button 
              className="w-full flex items-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handleDuplicate}
            >
              <Copy className="h-5 w-5" />
              Duplicate
            </button>
            <button 
              className="w-full flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={bringForward}
            >
              <MoveUp className="h-5 w-5" />
              Bring Forward
            </button>
            <button 
              className="w-full flex items-center gap-3 bg-green-700 hover:bg-green-800 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={sendBackward}
            >
              <MoveDown className="h-5 w-5" />
              Send Backward
            </button>
          </div>
        );

      case 'export':
        return (
          <div className="space-y-3">
            <button 
              className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handlePreview}
            >
              <Eye className="h-5 w-5" />
              Preview Design
            </button>
            <button 
              className="w-full flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handleDownload}
            >
              <Download className="h-5 w-5" />
              Download PNG
            </button>
            <button 
              className="w-full flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
              Share Design
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {sidebarOpen && <h2 className="text-lg font-semibold text-gray-800">Design Tools</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex-1 overflow-y-auto">
          {sidebarOpen ? (
            <>
              {/* Tab Buttons */}
              <div className="p-4 border-b border-gray-200">
                <div className="grid grid-cols-3 gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? `bg-${tab.color}-500 text-white`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <tab.icon className="h-4 w-4 mx-auto mb-1" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4">
                {renderTabContent()}
              </div>
            </>
          ) : (
            /* Collapsed Sidebar */
            <div className="p-2 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full p-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? `bg-${tab.color}-500 text-white`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={tab.label}
                >
                  <tab.icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Sign Design Editor</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Zoom: {Math.round(zoom * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="border shadow-xl rounded-lg overflow-hidden bg-white">
        <canvas ref={canvasRef} id="editor-canvas" />
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {showImageGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Image Gallery</h3>
              <button 
                onClick={() => setShowImageGallery(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {uploadedImages.length === 0 ? (
              <div className="text-center py-8">
                <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No images uploaded yet</p>
                <p className="text-sm text-gray-500">Upload images to see them here</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedImages.map((imageDataUrl, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={imageDataUrl} 
                      alt={`Uploaded image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleAddImageFromGallery(imageDataUrl)}
                    />
                    <button
                      onClick={() => handleRemoveImageFromGallery(imageDataUrl)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove from gallery"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-6 text-center">
              <label className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
                <ImageIcon className="h-4 w-4" />
                Upload New Image
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Design Preview</h3>
              <button 
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex justify-center">
              <img 
                src={fabricRef.current?.toDataURL({ format: 'png', quality: 1 })} 
                alt="Design Preview"
                className="max-w-full max-h-[70vh] object-contain border rounded"
              />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorCanvas;
