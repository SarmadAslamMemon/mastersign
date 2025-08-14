# SignFlow - Professional Sign Board Editor

A complete, professional-grade sign design editor built with Polotno, React, and TypeScript. This editor provides everything needed to create professional signs for real estate, business promotion, political campaigns, events, and construction projects.

## 🚀 Features

### ✨ Core Editor Features
- **Professional Sign Templates** - Pre-designed templates for various sign types
- **Image Replacement System** - Easy drag-and-drop image replacement
- **Print-Ready Export** - High-resolution PDF/PNG export with proper DPI settings
- **Sign-Specific Tools** - Specialized panels for sign design requirements
- **Professional Color Palettes** - Print-safe colors with contrast checking
- **Standard Sign Dimensions** - Common sign sizes (18"×24", 24"×36", etc.)

### 🏗️ Template System
- **Real Estate Signs** - For Sale, For Rent, Open House signs
- **Business Promotion** - Grand Opening, Sale, Marketing materials
- **Political Campaign** - Yard signs, campaign materials
- **Events & Announcements** - Festival banners, event promotions
- **Construction & Safety** - Warning signs, safety notices

### 🎨 Design Tools
- **Text Tools Panel** - Sign-appropriate fonts, sizing, and styling
- **Color Panel** - Professional color palettes with print safety warnings
- **Image Replacement** - One-click template image replacement
- **Specifications Panel** - Dimensions, materials, quantities, export settings

## 🛠️ Installation

The project already includes all required dependencies:

```bash
# Dependencies are already installed in package.json
npm install  # Install all dependencies
```

### Required Dependencies
- `polotno` - Main editor library
- `react` & `react-dom` - React framework
- `mobx` & `mobx-react-lite` - State management
- `lucide-react` - Icon library
- `tailwindcss` - Styling framework

## 📁 Project Structure

```
components/
├── SignBoardEditor.tsx          # Main editor component
├── TemplateBrowserPanel.tsx     # Template selection panel
├── ImageReplacementPanel.tsx    # Image replacement tools
├── SignSpecificationsPanel.tsx  # Dimensions, materials, export
├── SignTextToolsPanel.tsx       # Text editing tools
└── SignColorPanel.tsx           # Color management tools

data/
└── signTemplates.ts             # Template definitions

pages/
└── sign-board-editor-demo.tsx   # Demo page
```

## 🎯 Usage

### Basic Usage

```tsx
import { SignBoardEditor } from './components/SignBoardEditor';

function App() {
  return (
    <SignBoardEditor
      onTemplateSelect={(template) => console.log('Template:', template)}
      onImageReplace={(id, file) => console.log('Image replaced:', id, file)}
      onExportReady={(blob) => console.log('Export ready:', blob)}
      initialCategory="real-estate"
    />
  );
}
```

### Template Selection

1. **Browse Templates** - Use the Template Browser Panel to view available templates
2. **Select Category** - Choose from Real Estate, Business, Political, Events, or Construction
3. **Load Template** - Click on any template to load it into the editor
4. **Customize** - Modify text, colors, and replace images as needed

### Image Replacement

1. **Select Template** - Load a template with placeholder images
2. **Choose Image** - Click on any template image in the Image Replacement Panel
3. **Upload New Image** - Drag & drop or browse for your image
4. **Preview & Apply** - See changes in real-time and apply to your design

### Export for Print

1. **Configure Settings** - Set DPI, format, bleed, and color profile
2. **Review Design** - Ensure all elements are properly positioned
3. **Export** - Click "Export for Print Production" to generate files
4. **Download** - Files are automatically downloaded in your chosen format

## 🎨 Template System

### Template Structure

Each template includes:
- **Metadata** - ID, name, category, dimensions
- **JSON Definition** - Complete design structure for Polotno
- **Placeholder Images** - Identified images that can be replaced
- **Professional Layout** - Industry-standard sign design principles

### Example Template

```typescript
{
  id: 'for-sale-deluxe',
  name: 'For Sale - Deluxe',
  category: 'real-estate',
  dimensions: { width: 1800, height: 2400 }, // 18"×24"
  json: {
    width: 1800,
    height: 2400,
    background: '#ffffff',
    pages: [{
      children: [
        // Text elements
        {
          type: 'text',
          text: 'FOR SALE',
          fontSize: 140,
          fontFamily: 'Arial Black',
          fill: '#cc0000',
          x: 900, y: 150,
          align: 'center'
        },
        // Image placeholders
        {
          type: 'image',
          src: '/placeholders/house-placeholder.jpg',
          x: 150, y: 400,
          width: 1500, height: 900,
          id: 'property-photo', // Important for replacement
          name: 'Property Photo'
        }
      ]
    }]
  }
}
```

## 🎨 Color Management

### Print-Safe Colors

The editor includes professional color palettes optimized for:
- **Real Estate** - Trust-building colors (blues, greens, reds)
- **Business** - Corporate and promotional colors
- **Political** - Campaign-appropriate colors
- **Events** - Vibrant, attention-grabbing colors
- **Construction** - Safety and warning colors

### Color Features

- **Contrast Checking** - Automatic contrast ratio calculation
- **Print Safety Warnings** - Alerts for colors that may not print well
- **Custom Color Support** - Add your own brand colors
- **Palette Export/Import** - Save and share color schemes

## 📏 Sign Specifications

### Standard Dimensions

- **Yard Signs** - 12"×18", 18"×24"
- **Real Estate** - 18"×24", 24"×36"
- **Banners** - 24"×12", 24"×18", 4'×8'
- **Custom Sizes** - Any dimensions up to 120"×120"

### Material Options

- **Coroplast** - Lightweight, weather-resistant
- **Aluminum** - Durable, professional finish
- **Vinyl Banner** - Flexible, cost-effective
- **Magnetic** - Perfect for vehicles
- **Acrylic** - Premium indoor signage

### Export Settings

- **Resolution** - 150, 300, or 600 DPI
- **Format** - PDF (recommended), PNG, JPG
- **Bleed** - 0.125" bleed area for professional printing
- **Color Profile** - CMYK for print, RGB for digital

## 🔧 Customization

### Adding New Templates

1. **Create Template JSON** - Design your template in Polotno
2. **Add to Templates** - Include in the appropriate category
3. **Define Placeholders** - Mark images with IDs for replacement
4. **Test Template** - Ensure it loads and functions correctly

### Custom Color Palettes

```typescript
const customPalette = {
  name: 'Brand Colors',
  description: 'Company brand colors',
  colors: [
    { name: 'Brand Blue', value: '#0066cc', category: 'Primary' },
    { name: 'Brand Red', value: '#cc0000', category: 'Primary' }
  ]
};
```

### Extending Panels

Each panel is a standalone React component that can be:
- **Modified** - Change functionality and appearance
- **Replaced** - Use your own custom panels
- **Extended** - Add new features and tools

## 🚀 Advanced Features

### Image Replacement System

- **Drag & Drop** - Intuitive image replacement
- **Aspect Ratio Maintenance** - Preserve image proportions
- **Preview Support** - See changes before applying
- **Batch Operations** - Replace multiple images at once

### Print Production

- **High Resolution** - Up to 600 DPI for professional printing
- **Bleed Support** - Proper bleed areas for cutting
- **Color Management** - CMYK color space support
- **File Optimization** - Optimized file sizes

### Professional Tools

- **Font Management** - Sign-appropriate typography
- **Layout Tools** - Professional alignment and spacing
- **Quality Checks** - Automatic design validation
- **Export Validation** - Ensure print-ready output

## 📱 Responsive Design

The editor is designed to work on:
- **Desktop** - Full-featured editing experience
- **Tablet** - Touch-optimized interface
- **Mobile** - Responsive design for smaller screens

## 🔒 Security & Performance

- **File Validation** - Secure file upload handling
- **Memory Management** - Efficient image processing
- **Error Handling** - Graceful error recovery
- **Performance Optimization** - Smooth editing experience

## 🧪 Testing

### Manual Testing

1. **Template Loading** - Test all template categories
2. **Image Replacement** - Verify image upload and replacement
3. **Export Functionality** - Test all export formats and settings
4. **Responsive Design** - Test on different screen sizes

### Automated Testing

```bash
# Run tests (if implemented)
npm test

# Run type checking
npm run check
```

## 🚀 Deployment

### Build Process

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start
```

### Environment Variables

- `NODE_ENV` - Development/production mode
- `API_URL` - Backend API endpoint (if applicable)

## 🤝 Contributing

### Development Setup

1. **Fork Repository** - Create your own fork
2. **Install Dependencies** - Run `npm install`
3. **Make Changes** - Implement your features
4. **Test Thoroughly** - Ensure everything works
5. **Submit PR** - Create a pull request

### Code Standards

- **TypeScript** - Use proper typing
- **React Hooks** - Follow React best practices
- **Component Structure** - Maintain clean component architecture
- **Documentation** - Update docs for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Polotno** - Core editor functionality
- **React Team** - Frontend framework
- **Tailwind CSS** - Styling framework
- **Lucide Icons** - Icon library

## 📞 Support

For questions, issues, or contributions:
- **GitHub Issues** - Report bugs and request features
- **Documentation** - Check this README and code comments
- **Community** - Join discussions and share ideas

---

**SignFlow** - Professional Sign Design Made Simple

Transform your sign design workflow with this comprehensive, professional-grade editor. Create stunning signs for any purpose with ease and confidence.

