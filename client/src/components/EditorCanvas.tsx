import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { motion, AnimatePresence } from 'framer-motion';
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
  X,
  Star,
  Heart,
  Frame,
  Layout,
  Ruler,
  Droplets,
  Sparkles,
  Zap,
  Target,
  Crop,
  FlipHorizontal,
  FlipVertical,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Group,
  Ungroup,
  Lock,
  Unlock,
  EyeOff,
  Search,
  Filter,
  List,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Plus,
  Grid,
  Image,
  FileText,
  Settings2,
  ArrowRight,
  Hexagon,
  Tag,
  Phone,
  Clock,
  QrCode,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { SignDesignService, SignTemplate, SignSize } from '@/services/SignDesignService';
import { DesignFilter as DesignFilterType } from '@/services/SignDesignService';
import CustomTemplateModal from './CustomTemplateModal';
import TemplateBrowser from './TemplateBrowser';
import EditableTemplate from './EditableTemplate';
import { TemplateService, Template } from '@/services/TemplateService';

const EditorCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  
  // State Management
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [fontSize, setFontSize] = useState(32);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontStyle, setFontStyle] = useState("normal");
  const [showPreview, setShowPreview] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('templates');
  
  // Log when activeTab changes
  useEffect(() => {
    console.log('📑 Active tab changed to:', activeTab);
  }, [activeTab]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [showImageGallery, setShowImageGallery] = useState(false);
  
  // Load images from localStorage on component mount
  useEffect(() => {
    console.log('🔄 Loading images from localStorage...');
    const savedImages = localStorage.getItem('signflow-uploaded-images');
    console.log('💾 Saved images from localStorage:', savedImages);
    
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages);
        console.log('✅ Parsed images successfully:', parsedImages.length, 'images');
        setUploadedImages(parsedImages);
      } catch (error) {
        console.error('❌ Error loading saved images:', error);
      }
    } else {
      console.log('ℹ️ No saved images found in localStorage');
    }
  }, []);
  
  // Save images to localStorage whenever uploadedImages changes
  useEffect(() => {
    console.log('💾 Saving images to localStorage...');
    console.log('💾 Current uploadedImages count:', uploadedImages.length);
    localStorage.setItem('signflow-uploaded-images', JSON.stringify(uploadedImages));
    console.log('✅ Images saved to localStorage successfully');
  }, [uploadedImages]);
  const [selectedTemplate, setSelectedTemplate] = useState<SignTemplate | null>(null);
  const [selectedSize, setSelectedSize] = useState<SignSize | null>(null);
  const [currentFilter, setCurrentFilter] = useState<DesignFilterType>({});
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showCustomTemplateModal, setShowCustomTemplateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showTemplateBrowser, setShowTemplateBrowser] = useState(false);
  const [showTemplateCustomization, setShowTemplateCustomization] = useState(false);
  const [selectedTemplateElement, setSelectedTemplateElement] = useState<any>(null);

  const CANVAS_WIDTH = 960;
  const CANVAS_HEIGHT = 480;
  const GRID_SIZE = 20;

  // Load images from localStorage
  useEffect(() => {
    const savedImages = localStorage.getItem('signflow-uploaded-images');
    if (savedImages) {
      setUploadedImages(JSON.parse(savedImages));
    }
  }, []);

  // Save images to localStorage
  useEffect(() => {
    localStorage.setItem('signflow-uploaded-images', JSON.stringify(uploadedImages));
  }, [uploadedImages]);

  // Initialize canvas
  useEffect(() => {
    console.log('🎨 Initializing canvas...');
    console.log('🎨 Canvas ref:', canvasRef.current);
    
    if (!canvasRef.current) {
      console.log('❌ Canvas ref not available');
      return;
    }

    console.log('🎨 Creating fabric.Canvas...');
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: '#fff',
      preserveObjectStacking: true,
      selection: true,
      multipleSelection: true,
    });

    console.log('🎨 Canvas created successfully');
    console.log('🎨 Canvas dimensions:', { width: canvas.width, height: canvas.height });
    
    fabricRef.current = canvas;
    
    if (showGrid) drawGrid(canvas);

    // Event listeners
    canvas.on('selection:created', handleSelectionChange);
    canvas.on('selection:updated', handleSelectionChange);
    canvas.on('selection:cleared', () => {
      setSelectedObjects([]);
      setSelectedTemplateElement(null);
    });
    canvas.on('object:modified', saveToHistory);
    canvas.on('object:added', saveToHistory);
    canvas.on('object:removed', saveToHistory);
    canvas.on('mouse:down', (e) => {
      if (!e.target) {
        setSelectedTemplateElement(null);
      }
    });

    return () => {
      canvas.dispose();
    };
  }, []);

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

  const handleSelectionChange = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    const activeObjects = canvas.getActiveObjects();
    setSelectedObjects(activeObjects);
  };

  const saveToHistory = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    const json = canvas.toJSON();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(json);
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = fabricRef.current;
      if (!canvas) return;
      
      canvas.loadFromJSON(history[historyIndex - 1], () => {
        canvas.renderAll();
        setHistoryIndex(historyIndex - 1);
      });
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = fabricRef.current;
      if (!canvas) return;
      
      canvas.loadFromJSON(history[historyIndex + 1], () => {
        canvas.renderAll();
        setHistoryIndex(historyIndex + 1);
      });
    }
  };

  // Template Management
  const loadTemplate = (template: SignTemplate) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    // Clear canvas
    canvas.clear();
    
    // Set canvas size based on template
    canvas.setDimensions({
      width: template.width * 10, // Scale for display
      height: template.height * 10
    });

    // Add template background
    const background = new fabric.Rect({
      left: 0,
      top: 0,
      width: template.width * 10,
      height: template.height * 10,
      fill: '#f8f9fa',
      stroke: '#dee2e6',
      strokeWidth: 2,
      selectable: false,
      evented: false
    });
    
    canvas.add(background);
    // Ensure background is at the back
    canvas.renderAll();
    
    // Add template name as title
    const title = new fabric.Text(template.name, {
      left: 20,
      top: 20,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#495057',
      fontWeight: 'bold'
    });
    
    canvas.add(title);
    canvas.renderAll();
    
    setSelectedTemplate(template);
    setActiveTab('shapes'); // Switch to shapes tab after loading template
  };

  // New Editable Template Management
  const handleTemplateSelect = (template: Template) => {
    // Load template directly onto the main canvas
    loadTemplateToCanvas(template);
    setShowTemplateBrowser(false);
  };

  const loadTemplateToCanvas = (template: Template) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    // Clear existing canvas
    canvas.clear();
    
    // Set canvas dimensions based on template
    canvas.setDimensions({
      width: template.width * 10,
      height: template.height * 10
    });

    // Add background
    const background = new fabric.Rect({
      left: 0,
      top: 0,
      width: template.width * 10,
      height: template.height * 10,
      fill: '#ffffff',
      stroke: '#dee2e6',
      strokeWidth: 2,
      selectable: false,
      evented: false
    });
    canvas.add(background);

    // Add template elements to canvas
    template.elements.forEach(element => {
      addTemplateElementToCanvas(element);
    });

    canvas.renderAll();
    
    // Store template info for customization
    setSelectedTemplate({
      id: template.id,
      name: template.name,
      category: template.category,
      subCategory: template.subCategory,
      width: template.width,
      height: template.height,
      unit: template.unit,
      preview: template.preview,
      description: template.description,
      popular: template.popular,
      featured: template.featured,
      tags: template.tags,
      basePrice: template.basePrice,
      specifications: {}
    });

    // Switch to template customization tab
    setActiveTab('template-customization');
  };

  const addTemplateElementToCanvas = (element: any) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    let fabricObject: fabric.Object;

    switch (element.type) {
      case 'text':
        fabricObject = new fabric.Text(element.properties.text || 'Click to edit', {
          left: element.x,
          top: element.y,
          width: element.width,
          fontSize: element.properties.fontSize || 24,
          fontFamily: element.properties.fontFamily || 'Arial',
          fill: element.properties.fontColor || '#000000',
          fontWeight: element.properties.fontWeight || 'normal',
          fontStyle: element.properties.fontStyle || 'normal',
          selectable: true,
          editable: true
        });
        break;

      case 'image':
        fabric.Image.fromURL(element.properties.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjR0ZGRkZGIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZTwvdGV4dD4KPC9zdmc+', { crossOrigin: 'anonymous' }, (img) => {
          img.set({
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            selectable: true,
            evented: true
          });
          canvas.add(img);
          canvas.renderAll();
        });
        return;

      case 'shape':
        fabricObject = new fabric.Rect({
          left: element.x,
          top: element.y,
          width: element.width,
          height: element.height,
          fill: element.properties.backgroundColor || '#cccccc',
          stroke: element.properties.borderColor || '#000000',
          strokeWidth: element.properties.borderWidth || 0,
          rx: element.properties.borderRadius || 0,
          selectable: true,
          evented: true
        });
        break;

      default:
        return;
    }

    canvas.add(fabricObject);
    canvas.renderAll();
  };

  // Custom Template Creation
  const handleCreateCustomTemplate = (templateData: {
    name: string;
    width: number;
    height: number;
    unit: string;
    backgroundColor: string;
  }) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    // Clear canvas
    canvas.clear();
    
    // Set canvas size based on custom template
    canvas.setDimensions({
      width: templateData.width * 10,
      height: templateData.height * 10
    });

    // Add custom background
    const background = new fabric.Rect({
      left: 0,
      top: 0,
      width: templateData.width * 10,
      height: templateData.height * 10,
      fill: templateData.backgroundColor,
      stroke: '#dee2e6',
      strokeWidth: 2,
      selectable: false,
      evented: false
    });
    
    canvas.add(background);
    canvas.renderAll();
    
    // Add template name as title
    const title = new fabric.Text(templateData.name, {
      left: 20,
      top: 20,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#495057',
      fontWeight: 'bold'
    });
    
    canvas.add(title);
    canvas.renderAll();
    
    setSelectedTemplate({
      id: 'custom-template',
      name: templateData.name,
      category: 'Custom',
      subCategory: 'Custom Template',
      width: templateData.width,
      height: templateData.height,
      unit: templateData.unit as any,
      preview: '',
      description: `Custom template: ${templateData.width}${templateData.unit} × ${templateData.height}${templateData.unit}`,
      popular: false,
      featured: false,
      tags: ['custom'],
      basePrice: 0,
      specifications: {}
    });
    setActiveTab('shapes');
  };

  // Text Tools
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
      editable: true
    });
    
    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.renderAll();
  };

  // Shape Tools
  const handleAddShape = (shapeType: string) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    let shape: fabric.Object;

    switch (shapeType) {
      case 'rect':
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: '#007bff',
          stroke: '#0056b3',
          strokeWidth: 2
        });
        break;
      case 'circle':
        shape = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: '#28a745',
          stroke: '#1e7e34',
          strokeWidth: 2
        });
        break;
      case 'triangle':
        shape = new fabric.Triangle({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: '#ffc107',
          stroke: '#e0a800',
          strokeWidth: 2
        });
        break;
      case 'line':
        shape = new fabric.Line([50, 50, 200, 50], {
          stroke: '#dc3545',
          strokeWidth: 3
        });
        break;
      case 'ellipse':
        shape = new fabric.Ellipse({
          left: 100,
          top: 100,
          rx: 60,
          ry: 40,
          fill: '#6f42c1',
          stroke: '#5a2d91',
          strokeWidth: 2
        });
        break;
      case 'polygon':
        shape = new fabric.Polygon([
          { x: 0, y: -50 },
          { x: 43.3, y: -25 },
          { x: 43.3, y: 25 },
          { x: 0, y: 50 },
          { x: -43.3, y: 25 },
          { x: -43.3, y: -25 }
        ], {
          left: 100,
          top: 100,
          fill: '#fd7e14',
          stroke: '#e55a00',
          strokeWidth: 2
        });
        break;
      case 'star':
        shape = new fabric.Polygon([
          { x: 0, y: -50 },
          { x: 14.5, y: -20 },
          { x: 47.6, y: -15.5 },
          { x: 23.5, y: 7.7 },
          { x: 29.4, y: 40.5 },
          { x: 0, y: 25 },
          { x: -29.4, y: 40.5 },
          { x: -23.5, y: 7.7 },
          { x: -47.6, y: -15.5 },
          { x: -14.5, y: -20 }
        ], {
          left: 100,
          top: 100,
          fill: '#ffd700',
          stroke: '#ffb700',
          strokeWidth: 2
        });
        break;
      case 'arrow':
        shape = new fabric.Path('M 0 0 L 50 0 L 40 10 L 50 0 L 40 -10 Z', {
          left: 100,
          top: 100,
          fill: '#e83e8c',
          stroke: '#c73e6b',
          strokeWidth: 2
        });
        break;
      default:
        return;
    }

    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.renderAll();
  };

  // Image Tools - Fixed Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🖼️ handleImageUpload called');
    console.log('📁 Event:', e);
    console.log('📁 Files:', e.target.files);
    
    const file = e.target.files?.[0];
    if (!file) {
      console.log('❌ No file selected');
      return;
    }

    console.log('📄 File details:', {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified
    });

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.log('❌ Invalid file type:', file.type);
      alert('Please select a valid image file.');
      return;
    }

    console.log('✅ File type validated');

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.log('❌ File too large:', file.size);
      alert('Image size must be less than 10MB.');
      return;
    }

    console.log('✅ File size validated');

    try {
      console.log('🔄 Starting FileReader...');
      const reader = new FileReader();
      
      reader.onload = (event) => {
        console.log('📖 FileReader onload triggered');
        console.log('📖 Event result type:', typeof event.target?.result);
        
        const imgUrl = event.target?.result as string;
        console.log('🖼️ Image URL length:', imgUrl?.length);
        console.log('🖼️ Image URL preview:', imgUrl?.substring(0, 100) + '...');
        
        // Save to gallery only - don't add to canvas yet
        console.log('💾 Saving to uploadedImages...');
        console.log('💾 Current uploadedImages count:', uploadedImages.length);
        setUploadedImages(prev => {
          const newImages = [...prev, imgUrl];
          console.log('💾 New uploadedImages count:', newImages.length);
          return newImages;
        });
        
        console.log('✅ Image uploaded to gallery successfully');
        alert('Image uploaded successfully! Click on it in the gallery to add it to your design.');
      };
      
      reader.onerror = (error) => {
        console.error('❌ FileReader error:', error);
      };
      
      reader.onabort = () => {
        console.log('❌ FileReader aborted');
      };
      
      console.log('📖 Starting FileReader.readAsDataURL...');
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('❌ Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  // Add Frame to Canvas
  const handleAddFrame = (frameType: string) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    let frame: fabric.Object;

    switch (frameType) {
      case 'simple-border':
        frame = new fabric.Rect({
          left: 10,
          top: 10,
          width: canvas.width! - 20,
          height: canvas.height! - 20,
          fill: 'transparent',
          stroke: '#000000',
          strokeWidth: 3,
          selectable: false,
          evented: false
        });
        break;
      case 'double-border':
        frame = new fabric.Group([
          new fabric.Rect({
            left: 10,
            top: 10,
            width: canvas.width! - 20,
            height: canvas.height! - 20,
            fill: 'transparent',
            stroke: '#000000',
      strokeWidth: 2,
            selectable: false,
            evented: false
          }),
          new fabric.Rect({
            left: 20,
            top: 20,
            width: canvas.width! - 40,
            height: canvas.height! - 40,
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: 2,
            selectable: false,
            evented: false
          })
        ]);
        break;
      case 'ornate-frame':
        frame = new fabric.Group([
          new fabric.Rect({
            left: 10,
            top: 10,
            width: canvas.width! - 20,
            height: canvas.height! - 20,
            fill: 'transparent',
            stroke: '#8B4513',
            strokeWidth: 4,
            selectable: false,
            evented: false
          }),
          new fabric.Rect({
            left: 25,
            top: 25,
            width: canvas.width! - 50,
            height: canvas.height! - 50,
            fill: 'transparent',
            stroke: '#DAA520',
            strokeWidth: 2,
            selectable: false,
            evented: false
          })
        ]);
        break;
      case 'corner-frame':
        const cornerSize = 30;
        frame = new fabric.Group([
          // Top-left corner
          new fabric.Path(`M 10 10 L ${cornerSize} 10 L ${cornerSize} 15 L 15 15 L 15 ${cornerSize} L 10 ${cornerSize} Z`, {
            fill: '#000000',
            selectable: false,
            evented: false
          }),
          // Top-right corner
          new fabric.Path(`M ${canvas.width! - 10} 10 L ${canvas.width! - cornerSize} 10 L ${canvas.width! - cornerSize} 15 L ${canvas.width! - 15} 15 L ${canvas.width! - 15} ${cornerSize} L ${canvas.width! - 10} ${cornerSize} Z`, {
            fill: '#000000',
            selectable: false,
            evented: false
          }),
          // Bottom-left corner
          new fabric.Path(`M 10 ${canvas.height! - 10} L ${cornerSize} ${canvas.height! - 10} L ${cornerSize} ${canvas.height! - 15} L 15 ${canvas.height! - 15} L 15 ${canvas.height! - cornerSize} L 10 ${canvas.height! - cornerSize} Z`, {
            fill: '#000000',
            selectable: false,
            evented: false
          }),
          // Bottom-right corner
          new fabric.Path(`M ${canvas.width! - 10} ${canvas.height! - 10} L ${canvas.width! - cornerSize} ${canvas.height! - 10} L ${canvas.width! - cornerSize} ${canvas.height! - 15} L ${canvas.width! - 15} ${canvas.height! - 15} L ${canvas.width! - 15} ${canvas.height! - cornerSize} L ${canvas.width! - 10} ${canvas.height! - cornerSize} Z`, {
            fill: '#000000',
            selectable: false,
            evented: false
          })
        ]);
        break;
      case 'rounded-frame':
        frame = new fabric.Rect({
          left: 10,
          top: 10,
          width: canvas.width! - 20,
          height: canvas.height! - 20,
          fill: 'transparent',
          stroke: '#000000',
          strokeWidth: 3,
          rx: 20,
          ry: 20,
          selectable: false,
          evented: false
        });
        break;
      default:
        return;
    }

    canvas.add(frame);
    canvas.renderAll();
  };

  // Add Sign Board Elements
  const handleAddSignElement = (elementType: string) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    let element: fabric.Object;

    switch (elementType) {
      case 'price-tag':
        element = new fabric.Group([
          new fabric.Rect({
            left: 0,
            top: 0,
            width: 80,
            height: 40,
            fill: '#FF4444',
            rx: 5,
            ry: 5
          }),
          new fabric.Text('SALE', {
            left: 10,
            top: 8,
            fontSize: 12,
            fill: '#FFFFFF',
            fontWeight: 'bold'
          }),
          new fabric.Text('50% OFF', {
            left: 10,
            top: 22,
            fontSize: 10,
            fill: '#FFFFFF'
          })
        ], {
          left: 50,
          top: 50
        });
        break;
      case 'contact-info':
        element = new fabric.Group([
          new fabric.Rect({
            left: 0,
            top: 0,
            width: 120,
            height: 60,
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeWidth: 1
          }),
          new fabric.Text('Contact Us', {
            left: 10,
            top: 5,
            fontSize: 14,
            fill: '#000000',
            fontWeight: 'bold'
          }),
          new fabric.Text('Phone: (555) 123-4567', {
            left: 10,
            top: 25,
            fontSize: 10,
            fill: '#000000'
          }),
          new fabric.Text('Email: info@company.com', {
            left: 10,
            top: 40,
            fontSize: 10,
            fill: '#000000'
          })
        ], {
          left: 50,
          top: 50
        });
        break;
      case 'qr-code':
        element = new fabric.Rect({
          left: 50,
          top: 50,
          width: 60,
          height: 60,
          fill: '#000000',
          stroke: '#FFFFFF',
          strokeWidth: 2
        });
        // Add QR code pattern (simplified)
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if (Math.random() > 0.5) {
              const square = new fabric.Rect({
                left: 50 + i * 7.5,
                top: 50 + j * 7.5,
                width: 6,
                height: 6,
                fill: '#FFFFFF'
              });
              canvas.add(square);
            }
          }
        }
        canvas.add(element);
        canvas.setActiveObject(element);
        canvas.renderAll();
        return;
      case 'logo-placeholder':
        element = new fabric.Group([
          new fabric.Circle({
            left: 0,
            top: 0,
            radius: 30,
            fill: '#F0F0F0',
            stroke: '#CCCCCC',
            strokeWidth: 2
          }),
          new fabric.Text('LOGO', {
            left: 15,
            top: 20,
            fontSize: 12,
            fill: '#666666',
            fontWeight: 'bold'
          })
        ], {
          left: 50,
          top: 50
        });
        break;
      case 'business-hours':
        element = new fabric.Group([
          new fabric.Rect({
            left: 0,
            top: 0,
      width: 100,
            height: 80,
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeWidth: 1
          }),
          new fabric.Text('Hours', {
            left: 10,
            top: 5,
            fontSize: 12,
            fill: '#000000',
            fontWeight: 'bold'
          }),
          new fabric.Text('Mon-Fri: 9AM-6PM', {
            left: 10,
            top: 20,
            fontSize: 8,
            fill: '#000000'
          }),
          new fabric.Text('Sat: 10AM-4PM', {
            left: 10,
            top: 32,
            fontSize: 8,
            fill: '#000000'
          }),
          new fabric.Text('Sun: Closed', {
            left: 10,
            top: 44,
            fontSize: 8,
            fill: '#000000'
          })
        ], {
          left: 50,
          top: 50
        });
        break;
      case 'address-info':
        element = new fabric.Group([
          new fabric.Rect({
            left: 0,
            top: 0,
            width: 140,
            height: 70,
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeWidth: 1
          }),
          new fabric.Text('Visit Us', {
            left: 10,
            top: 5,
            fontSize: 14,
            fill: '#000000',
            fontWeight: 'bold'
          }),
          new fabric.Text('123 Main Street', {
            left: 10,
            top: 25,
            fontSize: 10,
            fill: '#000000'
          }),
          new fabric.Text('City, State 12345', {
            left: 10,
            top: 40,
            fontSize: 10,
            fill: '#000000'
          }),
          new fabric.Text('www.company.com', {
            left: 10,
            top: 55,
            fontSize: 10,
            fill: '#000000'
          })
        ], {
          left: 50,
          top: 50
        });
        break;
      case 'social-media':
        element = new fabric.Group([
          new fabric.Rect({
            left: 0,
            top: 0,
            width: 100,
            height: 50,
            fill: '#1877F2',
            rx: 5,
            ry: 5
          }),
          new fabric.Text('Follow Us', {
            left: 10,
            top: 8,
            fontSize: 12,
            fill: '#FFFFFF',
            fontWeight: 'bold'
          }),
          new fabric.Text('@company', {
            left: 10,
            top: 25,
            fontSize: 10,
            fill: '#FFFFFF'
          }),
          new fabric.Text('Facebook • Instagram', {
            left: 10,
            top: 38,
            fontSize: 8,
            fill: '#FFFFFF'
          })
        ], {
          left: 50,
          top: 50
        });
        break;
      case 'emergency-contact':
        element = new fabric.Group([
          new fabric.Rect({
            left: 0,
            top: 0,
            width: 120,
      height: 60,
            fill: '#FF0000',
            rx: 5,
            ry: 5
          }),
          new fabric.Text('EMERGENCY', {
            left: 10,
            top: 8,
            fontSize: 12,
            fill: '#FFFFFF',
            fontWeight: 'bold'
          }),
          new fabric.Text('Call: 911', {
            left: 10,
            top: 25,
            fontSize: 10,
            fill: '#FFFFFF'
          }),
          new fabric.Text('24/7 Service', {
            left: 10,
            top: 40,
            fontSize: 8,
            fill: '#FFFFFF'
          })
        ], {
          left: 50,
          top: 50
        });
        break;
      default:
        return;
    }

    canvas.add(element);
    canvas.setActiveObject(element);
    canvas.renderAll();
  };

  // Handle image selection from gallery
  const handleImageSelect = (imgUrl: string) => {
    console.log('🖼️ handleImageSelect called');
    console.log('🖼️ Image URL:', imgUrl);
    console.log('🖼️ Image URL length:', imgUrl.length);
    console.log('🖼️ Image URL preview:', imgUrl.substring(0, 100) + '...');
    
    const canvas = fabricRef.current;
    if (!canvas) {
      console.log('❌ Canvas not available for image selection');
      return;
    }

          console.log('🎨 Canvas available, starting fabric.Image.fromURL...');
      
            // Try creating image element first, then fabric image
      const imgElement = new Image();
      imgElement.onload = () => {
        console.log('✅ HTML Image loaded successfully');
        const fabricImg = new fabric.Image(imgElement);
        console.log('✅ fabric.Image created from HTML image');
        console.log('🎨 Selected image dimensions:', {
          width: fabricImg.width,
          height: fabricImg.height,
          scaleX: fabricImg.scaleX,
          scaleY: fabricImg.scaleY
        });
        
        console.log('🎨 Canvas dimensions for selection:', {
          width: canvas.width,
          height: canvas.height
        });

        // Scale image to fit canvas
        const scale = Math.min(
          (canvas.width! - 100) / fabricImg.width!,
          (canvas.height! - 100) / fabricImg.height!
        );
        
        console.log('📏 Calculated scale for selection:', scale);
        
        // Ensure minimum scale
        const finalScale = Math.max(scale, 0.1);
        
        fabricImg.scale(finalScale);
        fabricImg.left = 50;
        fabricImg.top = 50;
        
        console.log('🎨 Final image properties:', {
          scale: finalScale,
          left: fabricImg.left,
          top: fabricImg.top,
          width: fabricImg.width,
          height: fabricImg.height
        });
        
        console.log('🎨 Adding selected image to canvas...');
        console.log('🎨 Image position after scaling:', {
          left: fabricImg.left,
          top: fabricImg.top,
          scaleX: fabricImg.scaleX,
          scaleY: fabricImg.scaleY
        });
        
        canvas.add(fabricImg);
        canvas.setActiveObject(fabricImg);
        canvas.renderAll();
        
        console.log('✅ Selected image added to canvas successfully');
        console.log('🎨 Canvas objects count after adding:', canvas.getObjects().length);
        console.log('🎨 All canvas objects:', canvas.getObjects().map(obj => ({
          type: obj.type,
          left: obj.left,
          top: obj.top,
          width: obj.width,
          height: obj.height,
          scaleX: obj.scaleX,
          scaleY: obj.scaleY
        })));
      };
      
      imgElement.onerror = (error) => {
        console.error('❌ Error loading image:', error);
      };
      
      imgElement.src = imgUrl;
        console.log('✅ fabric.Image created from selection');
        console.log('🎨 Selected image dimensions:', {
          width: img.width,
          height: img.height,
          scaleX: img.scaleX,
          scaleY: img.scaleY
        });
        
        console.log('🎨 Canvas dimensions for selection:', {
          width: canvas.width,
          height: canvas.height
        });

        // Scale image to fit canvas
        const scale = Math.min(
          (canvas.width! - 100) / img.width!,
          (canvas.height! - 100) / img.height!
        );
        
        console.log('📏 Calculated scale for selection:', scale);
        
        // Ensure minimum scale
        const finalScale = Math.max(scale, 0.1);
        
        img.scale(finalScale);
        img.left = 50;
        img.top = 50;
        
        console.log('🎨 Final image properties:', {
          scale: finalScale,
          left: img.left,
          top: img.top,
          width: img.width,
          height: img.height
        });
        
        console.log('🎨 Adding selected image to canvas...');
        console.log('🎨 Image position after scaling:', {
          left: img.left,
          top: img.top,
          scaleX: img.scaleX,
          scaleY: img.scaleY
        });
        
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        
        console.log('✅ Selected image added to canvas successfully');
        console.log('🎨 Canvas objects count after adding:', canvas.getObjects().length);
        console.log('🎨 All canvas objects:', canvas.getObjects().map(obj => ({
          type: obj.type,
          left: obj.left,
          top: obj.top,
          width: obj.width,
          height: obj.height,
          scaleX: obj.scaleX,
          scaleY: obj.scaleY
        })));
      }, { crossOrigin: 'anonymous' });
      
      // Add error handling
      setTimeout(() => {
        console.log('⏰ Timeout check - if no success message above, image loading failed');
      }, 3000);
  };

  const handleDeleteImage = (imageIndex: number) => {
    console.log('🗑️ handleDeleteImage called');
    console.log('🗑️ Deleting image at index:', imageIndex);
    console.log('🗑️ Current uploadedImages count:', uploadedImages.length);
    
    setUploadedImages(prev => {
      const newImages = prev.filter((_, index) => index !== imageIndex);
      console.log('🗑️ New uploadedImages count after deletion:', newImages.length);
      return newImages;
    });
  };

  const handleClearAllImages = () => {
    console.log('🗑️ handleClearAllImages called');
    console.log('🗑️ Current uploadedImages count:', uploadedImages.length);
    
    if (uploadedImages.length > 0 && confirm('Are you sure you want to delete all uploaded images?')) {
      console.log('🗑️ User confirmed deletion of all images');
      setUploadedImages([]);
      console.log('🗑️ All images cleared');
    } else {
      console.log('🗑️ User cancelled or no images to delete');
    }
  };

  // Alignment Tools
  const alignObjects = (alignment: string) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length < 2) return;

    const bounds = new fabric.Rect();
    activeObjects.forEach(obj => {
      const objBounds = obj.getBoundingRect();
      bounds.left = Math.min(bounds.left || objBounds.left, objBounds.left);
      bounds.top = Math.min(bounds.top || objBounds.top, objBounds.top);
      bounds.width = Math.max(bounds.width || 0, objBounds.left + objBounds.width) - (bounds.left || 0);
      bounds.height = Math.max(bounds.height || 0, objBounds.top + objBounds.height) - (bounds.top || 0);
    });

    activeObjects.forEach(obj => {
      switch (alignment) {
        case 'left':
          obj.set('left', bounds.left);
          break;
        case 'center':
          obj.set('left', bounds.left + bounds.width / 2 - obj.width! / 2);
          break;
        case 'right':
          obj.set('left', bounds.left + bounds.width - obj.width!);
          break;
        case 'top':
          obj.set('top', bounds.top);
          break;
        case 'middle':
          obj.set('top', bounds.top + bounds.height / 2 - obj.height! / 2);
          break;
        case 'bottom':
          obj.set('top', bounds.top + bounds.height - obj.height!);
          break;
      }
    });

    canvas.renderAll();
  };

  // Group/Ungroup
  const groupObjects = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length < 2) return;

    const group = new fabric.Group(activeObjects);
    canvas.discardActiveObject();
    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.renderAll();
  };

  const ungroupObjects = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject || activeObject.type !== 'group') return;

    const group = activeObject as fabric.Group;
    const items = group.getObjects();
    
    canvas.remove(group);
    
    items.forEach(item => {
      canvas.add(item);
    });
    
    canvas.renderAll();
  };

  // Layer Management
  const bringForward = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      const objects = canvas.getObjects();
      const index = objects.indexOf(activeObject);
      if (index < objects.length - 1) {
        canvas.moveTo(activeObject, index + 1);
        canvas.renderAll();
      }
    }
  };

  const sendBackward = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      const objects = canvas.getObjects();
      const index = objects.indexOf(activeObject);
      if (index > 0) {
        canvas.moveTo(activeObject, index - 1);
        canvas.renderAll();
      }
    }
  };

  // Zoom Controls
  const handleZoomIn = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    const newZoom = Math.min(zoom * 1.2, 5);
    setZoom(newZoom);
    canvas.setZoom(newZoom);
  };

  const handleZoomOut = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    const newZoom = Math.max(zoom / 1.2, 0.1);
    setZoom(newZoom);
    canvas.setZoom(newZoom);
  };

  // Delete
  const handleDelete = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    const activeObjects = canvas.getActiveObjects();
    activeObjects.forEach(obj => canvas.remove(obj));
    canvas.renderAll();
  };

  // Duplicate
  const handleDuplicate = async () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    
    const cloned = await activeObject.clone();
    cloned.set({
      left: (activeObject.left || 0) + 20,
      top: (activeObject.top || 0) + 20
    });
    canvas.add(cloned);
    canvas.setActiveObject(cloned);
    canvas.renderAll();
  };

  // Preview
  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  // Download
  const handleDownload = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1
    });
    
    const link = document.createElement('a');
    link.download = 'sign-design.png';
    link.href = dataURL;
    link.click();
  };

  // Share
  const handleShare = async () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 0.8,
      multiplier: 1
    });
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Sign Design',
          text: 'Check out this sign design I created!',
          url: dataURL
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(dataURL);
      alert('Design URL copied to clipboard!');
    }
  };

  // Reset
  const handleReset = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    if (confirm('Are you sure you want to reset the canvas? This action cannot be undone.')) {
      canvas.clear();
      if (showGrid) drawGrid(canvas);
      setSelectedTemplate(null);
      setSelectedSize(null);
    }
  };

  // Render sidebar content
  const renderSidebarContent = () => {
    switch (activeTab) {
      case 'templates':
        return <TemplatePanel 
          onTemplateSelect={loadTemplate} 
          filter={currentFilter}
          onCreateCustomTemplate={() => setShowCustomTemplateModal(true)}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onOpenTemplateBrowser={() => setShowTemplateBrowser(true)}
        />;
      case 'shapes':
        return <ShapesPanel onShapeAdd={handleAddShape} />;
      case 'text':
        return <TextPanel 
          fontSize={fontSize} 
          setFontSize={setFontSize}
          fontColor={fontColor}
          setFontColor={setFontColor}
          onAddText={handleAddText}
        />;
      case 'images':
        return <ImagesPanel 
          uploadedImages={uploadedImages}
          onImageUpload={handleImageUpload}
          onImageSelect={handleImageSelect}
          onDeleteImage={handleDeleteImage}
          onClearAllImages={handleClearAllImages}
        />;
      case 'frames':
        return <FramesPanel onFrameAdd={handleAddFrame} />;
      case 'elements':
        return <ElementsPanel onElementAdd={handleAddSignElement} />;
      case 'layers':
        return <LayersPanel canvas={fabricRef.current} />;
      case 'template-customization':
        return <TemplateCustomizationPanel 
          selectedTemplate={selectedTemplate}
          onElementSelect={setSelectedTemplateElement}
          selectedElement={selectedTemplateElement}
          fabricRef={fabricRef}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex">
      {/* Left Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: sidebarCollapsed ? 80 : 320 }}
            exit={{ width: 0 }}
            className="bg-white/10 backdrop-blur-md border-r border-white/20 flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                {!sidebarCollapsed && <h2 className="text-lg font-semibold text-white">Design Tools</h2>}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="text-white hover:bg-white/20"
                  >
                    {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-white/20">
              {[
                { id: 'templates', label: 'Templates', icon: Layout },
                ...(selectedTemplate ? [{ id: 'template-customization', label: 'Customize', icon: Settings }] : []),
                { id: 'shapes', label: 'Shapes', icon: Square },
                { id: 'text', label: 'Text', icon: Type },
                { id: 'images', label: 'Images', icon: ImageIcon },
                { id: 'frames', label: 'Frames', icon: Square },
                { id: 'elements', label: 'Elements', icon: Tag },
                { id: 'layers', label: 'Layers', icon: Layers }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    console.log('📑 Tab clicked:', tab.id);
                    setActiveTab(tab.id);
                  }}
                  className={`flex-1 p-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  title={sidebarCollapsed ? tab.label : undefined}
                >
                  <tab.icon className="h-4 w-4 mx-auto mb-1" />
                  {!sidebarCollapsed && <span className="text-xs">{tab.label}</span>}
                </button>
              ))}
            </div>

            {/* Sidebar Content */}
            {!sidebarCollapsed && (
              <div className="flex-1 overflow-y-auto">
                {renderSidebarContent()}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  className="text-white hover:bg-white/20"
                >
                  Undo
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  className="text-white hover:bg-white/20"
                >
                  Redo
                </Button>
              </div>

              <div className="h-4 w-px bg-white/30"></div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  disabled={selectedObjects.length === 0}
                  className="text-red-300 hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDuplicate}
                  disabled={selectedObjects.length === 0}
                  className="text-white hover:bg-white/20"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="h-4 w-px bg-white/30"></div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={groupObjects}
                  disabled={selectedObjects.length < 2}
                  className="text-white hover:bg-white/20"
                >
                  <Group className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={ungroupObjects}
                  disabled={selectedObjects.length !== 1 || selectedObjects[0]?.type !== 'group'}
                  className="text-white hover:bg-white/20"
                >
                  <Ungroup className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomOut}
                  className="text-white hover:bg-white/20"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-white text-sm w-16 text-center">{Math.round(zoom * 100)}%</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomIn}
                  className="text-white hover:bg-white/20"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>

              <div className="h-4 w-px bg-white/30"></div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePreview}
                  className="text-white hover:bg-white/20"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="text-white hover:bg-white/20"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="text-white hover:bg-white/20"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-auto">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="border border-gray-300 shadow-lg"
            />
            
            {/* Canvas Info */}
            {selectedTemplate && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-sm font-medium text-gray-900">
                  {selectedTemplate.name}
                </div>
                <div className="text-xs text-gray-600">
                  {selectedTemplate.width}" × {selectedTemplate.height}"
                </div>
                <div className="text-xs text-gray-600">
                  ${selectedTemplate.basePrice}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Panel - Moved to top right */}
      <AnimatePresence>
        {showFilterPanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-20 right-4 w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Template Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilterPanel(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <FilterPanel 
                currentFilter={currentFilter}
                onFilterChange={setCurrentFilter}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowFilterPanel(!showFilterPanel)}
        className="absolute top-4 right-4 text-white hover:bg-white/20 z-40"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>

      {/* Template Browser Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowTemplateBrowser(true)}
        className="absolute top-4 right-20 text-white hover:bg-white/20 z-40"
      >
        Browse Templates
      </Button>

      {/* Custom Template Modal */}
      <CustomTemplateModal
        isOpen={showCustomTemplateModal}
        onClose={() => setShowCustomTemplateModal(false)}
        onCreateTemplate={handleCreateCustomTemplate}
      />

      {/* Template Browser */}
      <AnimatePresence>
        {showTemplateBrowser && (
          <TemplateBrowser
            onTemplateSelect={handleTemplateSelect}
            onClose={() => setShowTemplateBrowser(false)}
          />
        )}
      </AnimatePresence>


    </div>
  );
};

// Template Panel Component
const TemplatePanel: React.FC<{
  onTemplateSelect: (template: SignTemplate) => void;
  filter: DesignFilterType;
  onCreateCustomTemplate: () => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  onOpenTemplateBrowser: () => void;
}> = ({ onTemplateSelect, filter, onCreateCustomTemplate, viewMode, setViewMode, onOpenTemplateBrowser }) => {
  const templates = SignDesignService.getTemplatesWithFilter(filter);

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Choose Template</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="text-white"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="text-white"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-300 mb-4">Select a professional template or create your own</p>
      </div>

      {/* Template Browser Button */}
      <Button
        onClick={onOpenTemplateBrowser}
        className="w-full mb-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
      >
        Browse Professional Templates
      </Button>

      {/* Custom Template Button */}
      <Button
        onClick={onCreateCustomTemplate}
        className="w-full mb-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Custom Template
      </Button>
      
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4' : 'space-y-3'}>
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onTemplateSelect(template)}
            className={`bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors border border-white/20 ${
              viewMode === 'list' ? 'flex items-center space-x-4' : ''
            }`}
          >
            {viewMode === 'list' ? (
              <>
                <div className="w-16 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">{template.name}</h4>
                  <p className="text-xs text-gray-300">{template.description}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">{template.category}</span>
                    <span className="text-xs text-blue-300">${template.basePrice}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">{template.name}</h4>
                  <span className="text-xs text-blue-300">${template.basePrice}</span>
                </div>
                <p className="text-xs text-gray-300 mb-2">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{template.category}</span>
                  <span className="text-xs text-gray-400">{template.width}" × {template.height}"</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Shapes Panel Component
const ShapesPanel: React.FC<{
  onShapeAdd: (shapeType: string) => void;
}> = ({ onShapeAdd }) => {
  const shapes = [
    { type: 'rect', label: 'Rectangle', icon: Square, color: 'bg-blue-500' },
    { type: 'circle', label: 'Circle', icon: Circle, color: 'bg-green-500' },
    { type: 'triangle', label: 'Triangle', icon: Triangle, color: 'bg-yellow-500' },
    { type: 'line', label: 'Line', icon: Minus, color: 'bg-red-500' },
    { type: 'ellipse', label: 'Ellipse', icon: Circle, color: 'bg-purple-500' },
    { type: 'polygon', label: 'Hexagon', icon: Hexagon, color: 'bg-orange-500' },
    { type: 'star', label: 'Star', icon: Star, color: 'bg-yellow-400' },
    { type: 'arrow', label: 'Arrow', icon: ArrowRight, color: 'bg-pink-500' }
  ];

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-white mb-4">Shapes</h3>
      <div className="grid grid-cols-2 gap-3">
        {shapes.map((shape) => (
          <Button
            key={shape.type}
            variant="ghost"
            onClick={() => onShapeAdd(shape.type)}
            className="h-20 flex flex-col items-center justify-center text-white hover:bg-white/20 border border-white/20"
          >
            <div className={`w-8 h-8 ${shape.color} rounded mb-2`}></div>
            <span className="text-xs">{shape.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

// Text Panel Component
const TextPanel: React.FC<{
  fontSize: number;
  setFontSize: (size: number) => void;
  fontColor: string;
  setFontColor: (color: string) => void;
  onAddText: () => void;
}> = ({ fontSize, setFontSize, fontColor, setFontColor, onAddText }) => {
  const fontStyles = [
    { name: 'Arial', value: 'Arial' },
    { name: 'Times New Roman', value: 'Times New Roman' },
    { name: 'Helvetica', value: 'Helvetica' },
    { name: 'Georgia', value: 'Georgia' },
    { name: 'Verdana', value: 'Verdana' },
    { name: 'Courier New', value: 'Courier New' },
    { name: 'Impact', value: 'Impact' },
    { name: 'Comic Sans', value: 'Comic Sans MS' }
  ];

  const textStyles = [
    { name: 'Normal', value: 'normal' },
    { name: 'Bold', value: 'bold' },
    { name: 'Italic', value: 'italic' },
    { name: 'Bold Italic', value: 'bold italic' }
  ];

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-white mb-4">Text Tools</h3>
      
      <Button
        onClick={onAddText}
        className="w-full mb-6 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Type className="h-4 w-4 mr-2" />
        Add Text
      </Button>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-300 mb-2 block">Font Size</label>
          <Slider
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
            max={100}
            min={8}
            step={1}
            className="w-full"
          />
          <span className="text-xs text-gray-300">{fontSize}px</span>
        </div>

        <div>
          <label className="text-xs text-gray-300 mb-2 block">Font Family</label>
          <select className="w-full p-2 bg-white/20 border border-white/30 rounded text-white text-sm">
            {fontStyles.map((font) => (
              <option key={font.value} value={font.value} className="bg-gray-800">
                {font.name}
              </option>
            ))}
        </select>
        </div>

        <div>
          <label className="text-xs text-gray-300 mb-2 block">Font Style</label>
          <div className="grid grid-cols-2 gap-2">
            {textStyles.map((style) => (
              <button
                key={style.value}
                className="p-2 text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded text-white"
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-300 mb-2 block">Font Color</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="w-8 h-8 rounded border-0"
            />
            <Input
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="flex-1 bg-white/20 border-white/30 text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-300 mb-2 block">Quick Colors</label>
          <div className="grid grid-cols-6 gap-2">
            {['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080', '#008000', '#ffc0cb'].map((color) => (
              <button
                key={color}
                onClick={() => setFontColor(color)}
                className="w-6 h-6 rounded border-2 border-white/30 hover:border-white/60"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Frames Panel Component
const FramesPanel: React.FC<{
  onFrameAdd: (frameType: string) => void;
}> = ({ onFrameAdd }) => {
  const frames = [
    { type: 'simple-border', label: 'Simple Border', icon: Square, color: 'bg-gray-500' },
    { type: 'double-border', label: 'Double Border', icon: Square, color: 'bg-gray-600' },
    { type: 'ornate-frame', label: 'Ornate Frame', icon: Square, color: 'bg-amber-600' },
    { type: 'corner-frame', label: 'Corner Frame', icon: Square, color: 'bg-black' },
    { type: 'rounded-frame', label: 'Rounded Frame', icon: Square, color: 'bg-blue-500' }
  ];

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-white mb-4">Add Frames</h3>
      <div className="grid grid-cols-2 gap-3">
        {frames.map((frame) => (
          <Button
            key={frame.type}
            variant="ghost"
            onClick={() => onFrameAdd(frame.type)}
            className="h-20 flex flex-col items-center justify-center text-white hover:bg-white/20 border border-white/20"
          >
            <div className={`w-8 h-8 ${frame.color} rounded mb-2`}></div>
            <span className="text-xs">{frame.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

// Elements Panel Component
const ElementsPanel: React.FC<{
  onElementAdd: (elementType: string) => void;
}> = ({ onElementAdd }) => {
  const elements = [
    { type: 'price-tag', label: 'Price Tag', icon: Tag, color: 'bg-red-500' },
    { type: 'contact-info', label: 'Contact Info', icon: Phone, color: 'bg-blue-500' },
    { type: 'qr-code', label: 'QR Code', icon: QrCode, color: 'bg-black' },
    { type: 'logo-placeholder', label: 'Logo Placeholder', icon: Building2, color: 'bg-gray-400' },
    { type: 'business-hours', label: 'Business Hours', icon: Clock, color: 'bg-green-500' },
    { type: 'address-info', label: 'Address Info', icon: Building2, color: 'bg-purple-500' },
    { type: 'social-media', label: 'Social Media', icon: Tag, color: 'bg-blue-600' },
    { type: 'emergency-contact', label: 'Emergency', icon: Phone, color: 'bg-red-600' }
  ];

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-white mb-4">Sign Elements</h3>
      <div className="grid grid-cols-2 gap-3">
        {elements.map((element) => (
          <Button
            key={element.type}
            variant="ghost"
            onClick={() => onElementAdd(element.type)}
            className="h-20 flex flex-col items-center justify-center text-white hover:bg-white/20 border border-white/20"
          >
            <div className={`w-8 h-8 ${element.color} rounded mb-2`}></div>
            <span className="text-xs">{element.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

// Images Panel Component
const ImagesPanel: React.FC<{
  uploadedImages: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSelect: (image: string) => void;
  onDeleteImage: (index: number) => void;
  onClearAllImages: () => void;
}> = ({ uploadedImages, onImageUpload, onImageSelect, onDeleteImage, onClearAllImages }) => {
  console.log('🖼️ ImagesPanel rendered');
  console.log('🖼️ uploadedImages count:', uploadedImages.length);
  console.log('🖼️ onImageUpload function:', typeof onImageUpload);
  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-white mb-4">Images</h3>
      
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            console.log('🖼️ File input onChange triggered!');
            console.log('🖼️ Event:', e);
            console.log('🖼️ Files:', e.target.files);
            onImageUpload(e);
          }}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="block w-full p-3 border-2 border-dashed border-white/30 rounded-lg text-center text-white cursor-pointer hover:border-white/50 transition-colors"
          onClick={() => {
            console.log('🖼️ Upload button clicked');
            console.log('🖼️ Triggering file input...');
            // Test if the file input is accessible
            const fileInput = document.getElementById('image-upload') as HTMLInputElement;
            if (fileInput) {
              console.log('✅ File input found');
              fileInput.click();
            } else {
              console.log('❌ File input not found');
            }
          }}
        >
          <ImageIcon className="h-6 w-6 mx-auto mb-2" />
          Upload Image
        </label>
      </div>

      {uploadedImages.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs text-gray-300">Uploaded Images</h4>
            <button
              onClick={onClearAllImages}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className="relative cursor-pointer group"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('🖼️ Image container clicked in gallery');
                  console.log('🖼️ Image index:', index);
                  console.log('🖼️ Image URL length:', image.length);
                  onImageSelect(image);
                }}
              >
                <img
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-20 object-cover rounded border border-white/20 group-hover:border-white/40 transition-colors"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="text-white text-xs">Click to add</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteImage(index);
                  }}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample Images for Testing */}
      <div className="mt-4">
        <h4 className="text-xs text-gray-300 mb-2">Sample Images</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE1MCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkY2QjZCIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TYW1wbGUgMTwvdGV4dD4KPC9zdmc+',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE1MCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNEVDRENDIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TYW1wbGUgMjwvdGV4dD4KPC9zdmc+',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE1MCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNDVCN0QxIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TYW1wbGUgMzwvdGV4dD4KPC9zdmc+',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE1MCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjOTZDRUI0Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TYW1wbGUgNDwvdGV4dD4KPC9zdmc+'
          ].map((image, index) => (
            <div
              key={`sample-${index}`}
              onClick={() => onImageSelect(image)}
              className="relative cursor-pointer group"
            >
              <img
                src={image}
                alt={`Sample ${index + 1}`}
                className="w-full h-20 object-cover rounded border border-white/20 group-hover:border-white/40 transition-colors"
                onClick={() => {
                  console.log('🖼️ Sample image clicked');
                  console.log('🖼️ Sample image index:', index);
                  console.log('🖼️ Sample image URL length:', image.length);
                  onImageSelect(image);
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs">Click to add</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Layers Panel Component
const LayersPanel: React.FC<{
  canvas: fabric.Canvas | null;
}> = ({ canvas }) => {
  const [layers, setLayers] = useState<fabric.Object[]>([]);

  useEffect(() => {
    if (!canvas) return;
    
    const updateLayers = () => {
      setLayers(canvas.getObjects().reverse());
    };
    
    canvas.on('object:added', updateLayers);
    canvas.on('object:removed', updateLayers);
    canvas.on('object:modified', updateLayers);
    
    updateLayers();
    
    return () => {
      canvas.off('object:added', updateLayers);
      canvas.off('object:removed', updateLayers);
      canvas.off('object:modified', updateLayers);
    };
  }, [canvas]);

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-white mb-4">Layers</h3>
      <div className="space-y-2">
        {layers.map((layer, index) => (
          <div
            key={`layer-${index}`}
            className="flex items-center justify-between p-2 bg-white/10 rounded text-white text-sm"
          >
            <span className="truncate">{layer.type || 'Object'}</span>
            <div className="flex items-center space-x-1">
              <button className="p-1 hover:bg-white/20 rounded">
                <Eye className="h-3 w-3" />
              </button>
              <button className="p-1 hover:bg-white/20 rounded">
                <Lock className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Template Customization Panel Component
const TemplateCustomizationPanel: React.FC<{
  selectedTemplate: SignTemplate | null;
  onElementSelect: (element: any) => void;
  selectedElement: any;
  fabricRef: React.RefObject<fabric.Canvas>;
}> = ({ selectedTemplate, onElementSelect, selectedElement, fabricRef }) => {
  const [showSizeCustomization, setShowSizeCustomization] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(selectedTemplate?.width || 24);
  const [canvasHeight, setCanvasHeight] = useState(selectedTemplate?.height || 18);

  const handleSizeChange = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    canvas.setDimensions({
      width: canvasWidth * 10,
      height: canvasHeight * 10
    });

    // Update background
    const objects = canvas.getObjects();
    const background = objects.find(obj => obj.type === 'rect' && !obj.selectable);
    if (background) {
      background.set({
        width: canvasWidth * 10,
        height: canvasHeight * 10
      });
    }

    canvas.renderAll();
  };

  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgUrl = event.target?.result as string;
      
      fabric.Image.fromURL(imgUrl, { crossOrigin: 'anonymous' }, (img) => {
        const canvas = fabricRef.current;
        if (!canvas) return;

        // Scale image to fit canvas
        const scale = Math.min(
          (canvas.width! - 20) / img.width!,
          (canvas.height! - 20) / img.height!
        );
        
        img.scale(scale);
        img.left = 10;
        img.top = 10;
        img.selectable = false;
        img.evented = false;
        
        // Remove existing background image
        const objects = canvas.getObjects();
        const existingBg = objects.find(obj => obj.type === 'image' && !obj.selectable);
        if (existingBg) {
          canvas.remove(existingBg);
        }
        
        canvas.add(img);
        canvas.moveTo(img, 0); // Send to back
        canvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  if (!selectedTemplate) {
    return (
      <div className="p-4">
        <p className="text-white text-sm">No template selected</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-white mb-4">Template Customization</h3>
      
      {/* Template Info */}
      <div className="bg-white/10 rounded-lg p-3 mb-4">
        <h4 className="text-white font-medium">{selectedTemplate.name}</h4>
        <p className="text-gray-300 text-xs">{selectedTemplate.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-blue-300 text-xs">${selectedTemplate.basePrice}</span>
          <span className="text-gray-400 text-xs">{selectedTemplate.width}" × {selectedTemplate.height}"</span>
        </div>
      </div>

      {/* Size Customization */}
      <div className="mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSizeCustomization(!showSizeCustomization)}
          className="w-full text-white hover:bg-white/20"
        >
          <Settings className="h-4 w-4 mr-2" />
          Customize Size
        </Button>
        
        {showSizeCustomization && (
          <div className="mt-3 space-y-3">
            <div>
              <label className="text-xs text-gray-300 block mb-1">Width (inches)</label>
              <Input
                type="number"
                value={canvasWidth}
                onChange={(e) => setCanvasWidth(Number(e.target.value))}
                className="bg-white/20 border-white/30 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-300 block mb-1">Height (inches)</label>
              <Input
                type="number"
                value={canvasHeight}
                onChange={(e) => setCanvasHeight(Number(e.target.value))}
                className="bg-white/20 border-white/30 text-white text-sm"
              />
            </div>
            <Button
              size="sm"
              onClick={handleSizeChange}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Apply Size
            </Button>
          </div>
        )}
      </div>

      {/* Background Image */}
      <div className="mb-4">
        <label className="text-xs text-gray-300 block mb-2">Background Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundImageUpload}
          className="hidden"
          id="background-upload"
        />
        <label
          htmlFor="background-upload"
          className="block w-full p-2 border border-white/30 rounded text-center text-white cursor-pointer hover:border-white/50 transition-colors text-sm"
        >
          <ImageIcon className="h-4 w-4 mx-auto mb-1" />
          Upload Background
        </label>
      </div>

      {/* Template Elements */}
      <div>
        <h4 className="text-xs text-gray-300 mb-2">Template Elements</h4>
        <div className="space-y-2">
          {selectedTemplate && selectedTemplate.id.includes('clothes') && (
            <>
              <div
                className="p-2 bg-white/10 rounded cursor-pointer hover:bg-white/20"
                onClick={() => {
                  const canvas = fabricRef.current;
                  if (!canvas) return;
                  
                  // Find and select the title text object
                  const objects = canvas.getObjects();
                  const titleObject = objects.find(obj => 
                    obj.type === 'text' && 
                    obj.text && 
                    obj.text.includes('STYLE STORE')
                  );
                  
                  if (titleObject) {
                    canvas.setActiveObject(titleObject);
                    canvas.renderAll();
                    onElementSelect({ id: 'title', type: 'text', text: titleObject.text || 'STYLE STORE' });
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <Type className="h-4 w-4 text-blue-400" />
                  <div>
                    <p className="text-white text-xs font-medium">Title</p>
                    <p className="text-gray-400 text-xs">STYLE STORE</p>
                  </div>
                </div>
              </div>
              <div
                className="p-2 bg-white/10 rounded cursor-pointer hover:bg-white/20"
                onClick={() => {
                  const canvas = fabricRef.current;
                  if (!canvas) return;
                  
                  // Find and select the sale text object
                  const objects = canvas.getObjects();
                  const saleObject = objects.find(obj => 
                    obj.type === 'text' && 
                    obj.text && 
                    obj.text.includes('SALE')
                  );
                  
                  if (saleObject) {
                    canvas.setActiveObject(saleObject);
                    canvas.renderAll();
                    onElementSelect({ id: 'sale-text', type: 'text', text: saleObject.text || 'SALE 50% OFF' });
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <Type className="h-4 w-4 text-green-400" />
                  <div>
                    <p className="text-white text-xs font-medium">Sale Text</p>
                    <p className="text-gray-400 text-xs">SALE 50% OFF</p>
                  </div>
                </div>
              </div>
              <div
                className="p-2 bg-white/10 rounded cursor-pointer hover:bg-white/20"
                onClick={() => {
                  const canvas = fabricRef.current;
                  if (!canvas) return;
                  
                  // Find and select the address text object
                  const objects = canvas.getObjects();
                  const addressObject = objects.find(obj => 
                    obj.type === 'text' && 
                    obj.text && 
                    obj.text.includes('Fashion Ave')
                  );
                  
                  if (addressObject) {
                    canvas.setActiveObject(addressObject);
                    canvas.renderAll();
                    onElementSelect({ id: 'address', type: 'text', text: addressObject.text || '123 Fashion Ave, Style City' });
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <Type className="h-4 w-4 text-purple-400" />
                  <div>
                    <p className="text-white text-xs font-medium">Address</p>
                    <p className="text-gray-400 text-xs">123 Fashion Ave, Style City</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Element Properties */}
      {selectedElement && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <h4 className="text-xs text-gray-300 mb-2">Element Properties</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-300 block mb-1">Text Content</label>
              <Input
                value={selectedElement.text || ''}
                onChange={(e) => {
                  // Update canvas text
                  const canvas = fabricRef.current;
                  if (!canvas) return;
                  
                  const activeObject = canvas.getActiveObject();
                  if (activeObject && activeObject.type === 'text') {
                    activeObject.set('text', e.target.value);
                    canvas.renderAll();
                    // Update selected element
                    onElementSelect({ ...selectedElement, text: e.target.value });
                  }
                }}
                className="bg-white/20 border-white/30 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-300 block mb-1">Font Size</label>
              <Slider
                value={[selectedElement.fontSize || 32]}
                onValueChange={(value) => {
                  const canvas = fabricRef.current;
                  if (!canvas) return;
                  
                  const activeObject = canvas.getActiveObject();
                  if (activeObject && activeObject.type === 'text') {
                    activeObject.set('fontSize', value[0]);
                    canvas.renderAll();
                    // Update selected element
                    onElementSelect({ ...selectedElement, fontSize: value[0] });
                  }
                }}
                max={100}
                min={8}
                step={1}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-gray-300 block mb-1">Font Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={selectedElement.fontColor || '#4ECDC4'}
                  onChange={(e) => {
                    const canvas = fabricRef.current;
                    if (!canvas) return;
                    
                    const activeObject = canvas.getActiveObject();
                    if (activeObject && activeObject.type === 'text') {
                      activeObject.set('fill', e.target.value);
                      canvas.renderAll();
                      // Update selected element
                      onElementSelect({ ...selectedElement, fontColor: e.target.value });
                    }
                  }}
                  className="w-8 h-8 rounded border-0"
                />
                <Input
                  value={selectedElement.fontColor || '#4ECDC4'}
                  onChange={(e) => {
                    const canvas = fabricRef.current;
                    if (!canvas) return;
                    
                    const activeObject = canvas.getActiveObject();
                    if (activeObject && activeObject.type === 'text') {
                      activeObject.set('fill', e.target.value);
                      canvas.renderAll();
                      // Update selected element
                      onElementSelect({ ...selectedElement, fontColor: e.target.value });
                    }
                  }}
                  className="flex-1 bg-white/20 border-white/30 text-white text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Filter Panel Component
const FilterPanel: React.FC<{
  currentFilter: DesignFilterType;
  onFilterChange: (filter: DesignFilterType) => void;
}> = ({ currentFilter, onFilterChange }) => {
  const categories = SignDesignService.getCategories();
  const popularTemplates = SignDesignService.getPopularTemplates();
  const featuredTemplates = SignDesignService.getFeaturedTemplates();

  const handleFilterChange = (key: keyof DesignFilterType, value: any) => {
    const newFilter = { ...currentFilter, [key]: value };
    onFilterChange(newFilter);
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const priceRanges = [
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200+', min: 200, max: 1000 }
  ];

  const materials = [
    'Premium Vinyl',
    'Corrugated Plastic',
    'Heavy Duty Vinyl',
    'Reflective Vinyl',
    'Premium Vinyl Wrap'
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-white">Quick Filters</h4>
        {(currentFilter.category || currentFilter.subCategory || currentFilter.search) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-red-300 hover:bg-red-500/20 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <Button
          variant={currentFilter.popular ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleFilterChange('popular', !currentFilter.popular)}
          className="w-full text-white"
        >
          <Star className="h-4 w-4 mr-2" />
          Popular ({popularTemplates.length})
        </Button>
        
        <Button
          variant={currentFilter.featured ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleFilterChange('featured', !currentFilter.featured)}
          className="w-full text-white"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Featured ({featuredTemplates.length})
        </Button>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange('category', 
                currentFilter.category === category ? undefined : category
              )}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                currentFilter.category === category
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => handleFilterChange('priceRange', 
                currentFilter.priceRange?.min === range.min ? undefined : range
              )}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                currentFilter.priceRange?.min === range.min
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorCanvas;
