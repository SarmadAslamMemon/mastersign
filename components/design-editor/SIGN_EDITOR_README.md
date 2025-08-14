# SignEditor - Konva.js-based Sign Design Tool

A professional React sign board editor built with Konva.js, featuring a modern UI and comprehensive design tools.

## Features

### 🎨 Core Design Tools
- **Text Tool**: Click to add editable text with customizable font size and color
- **Image Upload**: Drag & drop images with resize handles and positioning
- **Background Management**: Color picker and image upload support
- **Template System**: 3 preset sign templates (Yard Sign, Banner, Business Sign)

### 🖱️ User Experience
- **Intuitive Interface**: Three-panel layout with tools, canvas, and properties
- **Real-time Editing**: Double-click text to edit, drag elements to reposition
- **Visual Feedback**: Selected elements show transform handles and properties
- **Responsive Design**: Optimized for desktop and tablet use

### 💾 Project Management
- **Undo/Redo**: Full history management with keyboard shortcuts
- **Export Options**: Download designs as PNG/JPG
- **Save System**: Local project saving (ready for backend integration)

## Installation

```bash
npm install react-konva konva use-image
npm install --save-dev @types/react-konva
```

## Usage

### Basic Implementation

```tsx
import { SignEditor } from './components/design-editor';

function App() {
  return (
    <div className="App">
      <SignEditor />
    </div>
  );
}
```

### With Custom Styling

```tsx
import { SignEditor } from './components/design-editor';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SignEditor />
    </div>
  );
}
```

## Component Architecture

### Main Components

1. **SignEditor** - Main container component
2. **Left Sidebar** - Tools and template selection
3. **Canvas Area** - Konva.js stage with 800x600 dimensions
4. **Right Sidebar** - Properties panel for selected elements
5. **Top Toolbar** - Undo/redo, save, and export controls

### State Management

The component uses React hooks for state management:

- `elements`: Array of canvas elements (text, images)
- `selectedElement`: Currently selected element for editing
- `activeTool`: Active tool state (text, image, background)
- `background`: Canvas background color
- `backgroundImage`: Background image URL
- `history`: Undo/redo history stack

## API Reference

### Canvas Elements

```typescript
interface CanvasElement {
  id: string;
  type: 'text' | 'image';
  x: number;
  y: number;
  width?: number;
  height?: number;
  content?: string;
  fontSize?: number;
  fontColor?: string;
  imageSrc?: string;
  rotation?: number;
}
```

### Templates

```typescript
interface Template {
  id: string;
  name: string;
  elements: CanvasElement[];
  background: string;
}
```

## Built-in Templates

### 1. Yard Sign
- **Background**: Yellow (#ffff00)
- **Elements**: "YARD SALE" (48px, red) + "Saturday 9AM-3PM" (24px, black)

### 2. Banner
- **Background**: Black (#000000)
- **Elements**: "GRAND OPENING" (64px, white) + "50% OFF EVERYTHING" (36px, white)

### 3. Business Sign
- **Background**: White (#ffffff)
- **Elements**: Company name, tagline, and contact information

## Customization

### Adding New Tools

```tsx
// Add new tool button to left sidebar
<button
  onClick={() => setActiveTool('shape')}
  className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
>
  <Shape size={20} />
  <span>Shape Tool</span>
</button>
```

### Custom Templates

```tsx
const customTemplates: Template[] = [
  {
    id: 'custom-sign',
    name: 'Custom Sign',
    elements: [
      {
        id: '1',
        type: 'text',
        x: 400,
        y: 300,
        content: 'Custom Text',
        fontSize: 36,
        fontColor: '#333333'
      }
    ],
    background: '#f0f0f0'
  }
];
```

## Styling

The component uses Tailwind CSS classes and can be customized by:

1. **Modifying CSS classes** in the component
2. **Overriding Tailwind config** for custom color schemes
3. **Adding custom CSS** for specific styling needs

## Performance Considerations

- **Canvas Optimization**: Konva.js handles rendering efficiently
- **Image Loading**: Images are loaded asynchronously with proper error handling
- **State Updates**: Optimized with useCallback for performance
- **Memory Management**: Proper cleanup of image resources

## Browser Support

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+
- **Mobile**: Responsive design for tablet devices
- **Canvas API**: Full support for HTML5 Canvas operations

## Troubleshooting

### Common Issues

1. **Images not loading**: Check file format and size limits
2. **Text not editable**: Ensure double-click is working properly
3. **Export not working**: Verify canvas element is properly rendered

### Debug Mode

Enable debug logging by adding console.log statements to key functions:

```tsx
const addText = useCallback((x: number, y: number) => {
  console.log('Adding text at:', x, y);
  // ... rest of function
}, [elements, fontSize, fontColor, addToHistory]);
```

## Future Enhancements

- [ ] Layer management system
- [ ] Advanced text formatting (bold, italic, alignment)
- [ ] Shape tools (rectangles, circles, lines)
- [ ] Grouping and alignment tools
- [ ] Cloud storage integration
- [ ] Collaborative editing features
- [ ] Print-ready export options

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the code examples
3. Open an issue on GitHub
4. Contact the development team

---

**Built with ❤️ using React, Konva.js, and Tailwind CSS**
