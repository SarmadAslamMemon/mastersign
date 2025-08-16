# SignFlow Sign Builder - Complete React Application

A modern, feature-rich sign building application built with React, TypeScript, and Fabric.js. This application provides a complete solution for creating, editing, and managing sign designs with a professional editor interface.

## 🚀 Features

### Core Editor
- **Canvas-based Design Editor** using Fabric.js
- **Real-time Object Manipulation** with drag, resize, and rotate
- **Professional Toolbar** with text, shapes, and image tools
- **Properties Panel** for detailed object editing
- **Undo/Redo System** with full history tracking
- **High-Quality Export** in PNG format

### Template System
- **Pre-built Templates** for business, events, and sales
- **Custom Template Creation** from your designs
- **Template Categories** with easy filtering
- **Import/Export Templates** in JSON format
- **Template Library Management** with local storage

### Design Tools
- **Text Editor** with font selection and styling
- **Shape Tools** including rectangles and circles
- **Image Upload** with automatic scaling
- **Color Picker** with Chrome picker integration
- **Layer Management** with object ordering
- **Grid and Snap** for precise alignment

## 🛠️ Technical Stack

- **React 18** with TypeScript
- **Fabric.js 5.3** for canvas manipulation
- **Tailwind CSS** for modern UI styling
- **Lucide React** for beautiful icons
- **React Color** for color selection
- **Local Storage** for data persistence

## 📁 Project Structure

```
components/sign-builder/
├── SignBuilder.tsx          # Main editor component
├── TemplateManager.tsx      # Template library management
├── SignBuilderApp.tsx       # Main app integration
└── index.ts                 # Component exports

pages/
└── sign-builder-demo.tsx    # Demo page
```

## 🚀 Getting Started

### 1. Installation

The required dependencies are already installed in your project:
- `fabric` - Canvas manipulation library
- `react-color` - Color picker component
- `lucide-react` - Icon library

### 2. Usage

```tsx
import { SignBuilderApp } from '../components/sign-builder';

function App() {
  return <SignBuilderApp />;
}
```

### 3. Basic Implementation

```tsx
import { SignBuilder } from '../components/sign-builder';

function MyComponent() {
  const handleSave = (data: any) => {
    console.log('Design saved:', data);
  };

  const handleExport = (imageData: string) => {
    // Handle image export
    console.log('Image exported:', imageData);
  };

  return (
    <SignBuilder
      width={1200}
      height={900}
      onSave={handleSave}
      onExport={handleExport}
    />
  );
}
```

## 🎨 Editor Interface

### Left Toolbar
- **Text Tool** - Add editable text elements
- **Rectangle Tool** - Create rectangular shapes
- **Circle Tool** - Create circular shapes
- **Image Tool** - Upload and add images
- **Undo/Redo** - History navigation
- **Save/Export** - Design persistence

### Top Toolbar
- **Template Selection** - Choose from available templates
- **Font Controls** - Font family and size selection
- **Color Picker** - Text and shape color selection

### Right Properties Panel
- **Position Controls** - X/Y coordinates
- **Text Properties** - Content, font, size (for text objects)
- **Fill Color** - Object color selection
- **Object Actions** - Duplicate and delete

## 📋 Template System

### Default Templates
1. **Blank Canvas** - Empty workspace
2. **Business Sign** - Professional business layout
3. **Event Sign** - Event announcement design
4. **Sale Promotion** - Sales and discount layout

### Custom Templates
- Create templates from your designs
- Save to local storage
- Export as JSON files
- Import existing templates

## 💾 Data Management

### Local Storage
- Templates are saved to `signBuilderTemplates`
- Designs are saved to `signBuilderDesigns`
- Automatic data persistence

### Export Options
- **PNG Images** - High-resolution design exports
- **JSON Data** - Editable design files
- **Template Files** - Reusable template exports

## 🎯 Key Features

### Object Manipulation
```typescript
// Add text
const text = new fabric.IText('Hello World', {
  left: 100,
  top: 100,
  fontSize: 48,
  fontFamily: 'Arial',
  fill: '#000000'
});
canvas.add(text);

// Add shape
const rect = new fabric.Rect({
  left: 200,
  top: 200,
  width: 100,
  height: 100,
  fill: '#ff0000'
});
canvas.add(rect);
```

### Template Loading
```typescript
const loadTemplate = (template: Template) => {
  canvas.clear();
  template.objects.forEach(obj => {
    // Create Fabric.js objects from template data
    if (obj.type === 'i-text') {
      const text = new fabric.IText(obj.text, obj);
      canvas.add(text);
    }
  });
  canvas.renderAll();
};
```

### History Management
```typescript
const saveToHistory = () => {
  const json = canvas.toJSON();
  const newHistory = history.slice(0, historyIndex + 1);
  newHistory.push(json);
  setHistory(newHistory);
  setHistoryIndex(newHistory.length - 1);
};
```

## 🔧 Customization

### Adding New Tools
```typescript
const addCustomTool = () => {
  const customObject = new fabric.CustomObject({
    // Custom properties
  });
  canvas.add(customObject);
  canvas.setActiveObject(customObject);
};
```

### Custom Templates
```typescript
const customTemplate: Template = {
  id: 'custom-1',
  name: 'My Custom Template',
  category: 'custom',
  width: 1200,
  height: 900,
  objects: [
    // Custom object definitions
  ],
  isCustom: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
```

## 📱 Responsive Design

- **Mobile-friendly** interface
- **Touch support** for mobile devices
- **Responsive layout** that adapts to screen size
- **Optimized performance** for various devices

## 🚀 Performance Features

- **Object pooling** for better memory management
- **Debounced rendering** during rapid changes
- **Efficient event handling** with proper cleanup
- **Canvas optimization** for smooth interactions

## 🔒 Security Considerations

- **Local file handling** with FileReader API
- **Data validation** for imported templates
- **Safe object creation** with Fabric.js
- **No external API calls** for core functionality

## 🧪 Testing

### Manual Testing Checklist
- [ ] Template loading and switching
- [ ] Object creation and manipulation
- [ ] Text editing and formatting
- [ ] Image upload and scaling
- [ ] Undo/redo functionality
- [ ] Save and export features
- [ ] Template creation and management
- [ ] Responsive design on different screen sizes

## 🐛 Troubleshooting

### Common Issues

1. **Canvas not rendering**
   - Check if Fabric.js is properly imported
   - Verify canvas element exists in DOM

2. **Images not loading**
   - Ensure proper file format (PNG, JPG, etc.)
   - Check file size limits

3. **Performance issues**
   - Reduce canvas size for complex designs
   - Limit number of objects on canvas

4. **Template loading errors**
   - Verify JSON format is valid
   - Check template object structure

## 📈 Future Enhancements

- **Cloud storage** integration
- **Collaborative editing** features
- **Advanced typography** tools
- **Vector graphics** support
- **Print optimization** tools
- **Template marketplace** integration

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for all new components
3. Maintain consistent styling with Tailwind CSS
4. Add proper error handling and validation
5. Test on multiple devices and browsers

## 📄 License

This project is part of the SignFlow application suite and follows the same licensing terms.

---

**Note**: This SignBuilder is a complete rewrite from scratch, providing a modern, professional sign design experience that rivals commercial solutions like buildasign.com.
