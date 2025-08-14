# SignFlow Template Editor

A professional, full-featured template-based design editor built with React, TypeScript, and Fabric.js. This editor allows users to create, customize, and export professional sign designs using pre-built templates.

## 🚀 Features

### Core Functionality
- **Template System**: Pre-built professional sign templates
- **Drag & Drop Editing**: Intuitive canvas-based editing
- **Real-time Preview**: See changes instantly as you edit
- **Export Options**: Save designs as PNG images
- **Responsive Design**: Works on desktop and tablet devices

### Template Features
- **Multiple Categories**: Business signs, safety signs, vehicle graphics, property signs
- **Color Variations**: Multiple color schemes for each template
- **Text Variations**: Pre-built text options for common use cases
- **Editable Elements**: Customize text, images, and colors
- **Required vs Optional**: Some elements are locked for consistency

### Editing Tools
- **Text Editing**: Double-click to edit text content
- **Image Replacement**: Click editable images to upload custom images
- **Shape Manipulation**: Resize, rotate, and move elements
- **Layer Management**: Proper z-index ordering
- **Zoom & Pan**: Navigate large designs easily

## 🏗️ Architecture

### Components Structure
```
components/design-editor/
├── DesignEditor.tsx          # Main editor component
├── TemplateEditor.tsx        # Template-focused editor
├── TemplateEditorDemo.tsx    # Demo page
├── hooks/
│   └── useCanvasEditor.ts   # Core canvas logic
├── data/
│   └── templates.ts         # Template definitions
└── types.ts                 # TypeScript interfaces
```

### Key Technologies
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Fabric.js**: Canvas manipulation library
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library

## 📖 Usage

### Basic Implementation

```tsx
import { TemplateEditor } from '@/components/design-editor'

function App() {
  return (
    <TemplateEditor 
      width={1000} 
      height={700}
      className="custom-styles"
    />
  )
}
```

### Using the Hook Directly

```tsx
import { useCanvasEditor } from '@/components/design-editor'

function CustomEditor() {
  const {
    canvas,
    selectedObjects,
    loadTemplate,
    addText,
    exportToPNG
  } = useCanvasEditor({
    canvasId: 'my-canvas',
    width: 800,
    height: 600
  })

  return (
    <div>
      <canvas id="my-canvas" />
      <button onClick={() => addText('Hello World')}>
        Add Text
      </button>
    </div>
  )
}
```

## 🎨 Template System

### Template Structure

Each template follows this structure:

```typescript
interface Template {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  thumbnail: string
  dimensions: { width: number; height: number }
  objects: TemplateObject[]
  colorVariations: ColorVariation[]
  textVariations?: TextVariation[]
}
```

### Object Types

Supported object types:
- **Text**: Editable text with font properties
- **Rectangle**: Geometric shapes
- **Circle**: Circular elements
- **Triangle**: Triangular shapes
- **Image**: Uploadable images with placeholders

### Creating Custom Templates

```typescript
const customTemplate: Template = {
  id: 'my-custom-sign',
  name: 'Custom Business Sign',
  category: 'business',
  dimensions: { width: 400, height: 300 },
  objects: [
    {
      id: 'background',
      type: 'rectangle',
      templateRole: 'background',
      isEditable: false,
      isRequired: true,
      properties: {
        left: 200, top: 150, width: 400, height: 300,
        fill: '#2E7D32', stroke: '#1B5E20', strokeWidth: 4
      }
    },
    {
      id: 'company-name',
      type: 'text',
      templateRole: 'text',
      isEditable: true,
      isRequired: true,
      properties: {
        left: 200, top: 100, fill: '#FFFFFF'
      },
      textProperties: {
        text: 'Your Company',
        fontSize: 24,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        textAlign: 'center'
      }
    }
  ],
  colorVariations: [
    {
      id: 'green',
      name: 'Forest Green',
      preview: '#2E7D32',
      colors: { 'background': '#2E7D32' }
    }
  ]
}
```

## 🔧 Customization

### Styling
The editor uses Tailwind CSS classes and can be customized by:
- Overriding default classes
- Adding custom CSS
- Modifying the component props

### Adding New Tools
Extend the editor by adding new tools to the `useCanvasEditor` hook:

```typescript
const addCustomShape = () => {
  if (!canvasRef.current) return
  
  const customShape = new fabric.Path('M 0 0 L 100 100 L 0 100 Z', {
    left: 100,
    top: 100,
    fill: '#FF6B6B'
  })
  
  canvasRef.current.add(customShape)
  canvasRef.current.renderAll()
}
```

### Event Handling
Listen to canvas events for custom functionality:

```typescript
useEffect(() => {
  if (!canvas) return
  
  canvas.on('object:modified', (e) => {
    console.log('Object modified:', e.target)
    // Custom logic here
  })
}, [canvas])
```

## 📱 Responsive Design

The editor automatically adapts to different screen sizes:
- **Desktop**: Full sidebar + canvas layout
- **Tablet**: Collapsible sidebar
- **Mobile**: Stacked layout with touch-friendly controls

## 🚀 Performance

### Optimization Features
- **Lazy Loading**: Templates load on demand
- **Canvas Caching**: Efficient rendering with Fabric.js
- **Memory Management**: Proper cleanup of canvas objects
- **Debounced Updates**: Smooth editing experience

### Best Practices
- Use appropriate canvas dimensions for your use case
- Implement proper error handling for image uploads
- Clean up event listeners when components unmount
- Use React.memo for expensive components

## 🐛 Troubleshooting

### Common Issues

**Canvas not rendering:**
- Check if Fabric.js is properly imported
- Verify canvas element exists in DOM
- Ensure proper dimensions are set

**Images not loading:**
- Check image URLs are accessible
- Verify file format support
- Check browser console for CORS errors

**Template objects not editable:**
- Verify `isEditable` property is set to `true`
- Check if object has proper event handlers
- Ensure canvas selection is enabled

### Debug Mode
Enable debug logging by setting:

```typescript
const { canvas } = useCanvasEditor({
  canvasId: 'debug-canvas',
  width: 800,
  height: 600,
  onObjectModified: (obj) => {
    console.log('Object modified:', obj)
  }
})
```

## 🔮 Future Enhancements

### Planned Features
- **Undo/Redo System**: History management
- **Collaborative Editing**: Real-time collaboration
- **Advanced Typography**: Font management system
- **Export Formats**: PDF, SVG, and more
- **Template Marketplace**: User-generated templates
- **AI Integration**: Smart design suggestions

### Contributing
To contribute to the template editor:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests and documentation
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the example implementations
- Join our community discussions

---

**Happy Designing! 🎨✨**
