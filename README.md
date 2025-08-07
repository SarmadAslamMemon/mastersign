# 🎨 Master Signs - Professional Sign Design Studio

A **world-class sign design platform** built with React, TypeScript, and Fabric.js. Create stunning custom signage with professional templates, advanced design tools, and seamless user experience.

## ✨ **Key Features**

### 🎯 **Professional Design Editor**
- **Full-screen immersive experience** with loading animations
- **Advanced Fabric.js canvas** with professional tools
- **Template-based design system** with real sign specifications
- **Real-time collaboration** ready for team workflows
- **Undo/Redo history** with unlimited steps
- **Layer management** with visibility controls

### 📐 **Sign Templates & Sizes**
- **8 Standard Sign Sizes**: From small banners to vehicle wraps
- **6 Professional Templates**: Business, Real Estate, Vehicle, Events, Construction, Restaurant
- **Real-world specifications**: Materials, finishes, installation methods
- **Dynamic pricing**: Based on size and material calculations
- **Category filtering**: Business, Real Estate, Vehicle, Events, Construction, Restaurant

### 🛠️ **Advanced Design Tools**

#### **Text Tools**
- **Editable text objects** with real-time editing
- **Font size control** (8px - 100px)
- **Color picker** with hex input
- **Multiple font styles** and weights
- **Text alignment** and positioning

#### **Shape Tools**
- **Rectangle, Circle, Triangle, Line**
- **Custom colors** and stroke widths
- **Resize and rotate** with precision
- **Group/ungroup** functionality
- **Layer ordering** (bring forward/send backward)

#### **Image Management**
- **Drag & drop upload** with preview
- **Image gallery** with localStorage persistence
- **Auto-scaling** to fit canvas
- **Multiple image formats** support
- **Image positioning** and transformation

#### **Professional Filters**
- **Category filtering**: Business, Real Estate, Vehicle, etc.
- **Price range filtering**: $0-$25, $25-$50, $50-$100, $100-$200, $200+
- **Material filtering**: Premium Vinyl, Corrugated Plastic, Heavy Duty Vinyl, etc.
- **Popular/Featured** template highlighting
- **Search functionality** across all templates

### 🎨 **Design Features**
- **Grid system** for precise alignment
- **Zoom controls** (10% - 500%)
- **Multiple selection** with group operations
- **Alignment tools**: Left, Center, Right, Top, Middle, Bottom
- **Duplicate objects** with offset positioning
- **Professional color palette** and gradients

### 📱 **User Experience**
- **Responsive design** for all devices
- **Smooth animations** with Framer Motion
- **Loading states** with professional feedback
- **Error handling** with user-friendly messages
- **Keyboard shortcuts** for power users
- **Fullscreen mode** for immersive editing

### 💾 **Export & Sharing**
- **High-quality PNG export** with custom resolution
- **Web Share API** integration for social sharing
- **Design preview** before export
- **Multiple export formats** (PNG, JPG, SVG)
- **Cloud storage** ready for backend integration

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Modern browser with Canvas support

### **Installation**
```bash
# Clone the repository
git clone https://github.com/your-username/master-signs.git
cd master-signs

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:5000
```

### **Environment Setup**
```bash
# Copy environment variables
cp .env.example .env

# Configure your environment
# Add your Supabase credentials for backend integration
```

## 🏗️ **Architecture**

### **Frontend Stack**
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Fabric.js** for canvas manipulation
- **Lucide React** for icons

### **Component Structure**
```
src/
├── components/
│   ├── EditorCanvas.tsx      # Main design editor
│   ├── DesignFilter.tsx      # Template filtering
│   ├── navigation.tsx        # Site navigation
│   └── ui/                   # Reusable UI components
├── services/
│   └── SignDesignService.ts  # Design logic & templates
├── pages/
│   ├── editor.tsx           # Editor page with loader
│   └── home.tsx             # Landing page
└── types/
    └── products.ts          # TypeScript interfaces
```

### **Design System**
- **Color Palette**: Blue (#1e40af), Black (#000000), White (#ffffff)
- **Typography**: Inter font family
- **Spacing**: Tailwind's 4px grid system
- **Animations**: Framer Motion with custom easing

## 🎯 **Professional Features**

### **Template System**
```typescript
interface SignTemplate {
  id: string;
  name: string;
  category: string;
  width: number;
  height: number;
  unit: 'inches' | 'feet' | 'cm' | 'mm';
  basePrice: number;
  specifications: {
    material?: string;
    finish?: string;
    installation?: string;
    durability?: string;
  };
}
```

### **Size Management**
```typescript
interface SignSize {
  id: string;
  name: string;
  width: number;
  height: number;
  aspectRatio: number;
  commonUse: string[];
  basePrice: number;
}
```

### **Design Service**
- **Template filtering** by category, price, material
- **Dynamic pricing** calculation
- **Design recommendations** based on category
- **Export functionality** for API integration

## 🔧 **Development**

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # TypeScript type checking
```

### **Code Quality**
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for git hooks

### **Testing**
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🌐 **Deployment**

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Netlify**
```bash
# Build the project
npm run build

# Deploy to Netlify
# Drag dist folder to Netlify dashboard
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔗 **API Integration**

### **Backend Ready**
The design service is structured for easy backend integration:

```typescript
// Future API integration
const saveDesign = async (designData: DesignData) => {
  const response = await fetch('/api/designs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(designData)
  });
  return response.json();
};
```

### **Supabase Integration**
- **User authentication** ready
- **Design storage** in PostgreSQL
- **Real-time collaboration** with Supabase Realtime
- **File uploads** to Supabase Storage

## 📊 **Performance**

### **Optimizations**
- **Lazy loading** for large components
- **Image optimization** with WebP support
- **Code splitting** for faster initial load
- **Canvas optimization** for smooth editing
- **Memory management** for large designs

### **Metrics**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🤝 **Contributing**

### **Development Workflow**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### **Code Standards**
- **TypeScript** for all new code
- **Component testing** with React Testing Library
- **Accessibility** compliance (WCAG 2.1)
- **Performance** monitoring with Lighthouse

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Fabric.js** for powerful canvas manipulation
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **Lucide React** for beautiful icons
- **Vite** for fast development experience

## 📞 **Support**

- **Documentation**: [docs.master-signs.com](https://docs.master-signs.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/master-signs/issues)
- **Discord**: [Join our community](https://discord.gg/master-signs)
- **Email**: support@master-signs.com

---

**Built with ❤️ for professional sign makers everywhere** 