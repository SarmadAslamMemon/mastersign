// ============================================================================
// TEMPLATE EDITOR SERVICE - Core service for managing sign template editing
// ============================================================================

import { 
  TemplateDefinition, 
  DesignElement, 
  TextElement, 
  ImageElement, 
  ShapeElement, 
  IconElement,
  EditorState,
  EditorAction,
  ExportOptions,
  UserDesign,
  TemplateCategory
} from '@/types/template-editor';
import { 
  createTextElement, 
  createImageElement, 
  createShapeElement, 
  createIconElement,
  deepClone,
  generateId,
  validateTemplate,
  calculateExportDimensions
} from '@/utils/template-editor';

export class TemplateEditorService {
  private static instance: TemplateEditorService;
  private templates: TemplateDefinition[] = [];
  private userDesigns: UserDesign[] = [];
  private categories: TemplateCategory[] = [];

  private constructor() {
    this.initializeDefaultTemplates();
    this.initializeCategories();
  }

  static getInstance(): TemplateEditorService {
    if (!TemplateEditorService.instance) {
      TemplateEditorService.instance = new TemplateEditorService();
    }
    return TemplateEditorService.instance;
  }

  // Template Management
  async getTemplates(category?: string): Promise<TemplateDefinition[]> {
    if (category) {
      return this.templates.filter(t => t.category === category);
    }
    return this.templates;
  }

  async getTemplateById(id: string): Promise<TemplateDefinition | null> {
    const template = this.templates.find(t => t.id === id);
    return template ? deepClone(template) : null;
  }

  async getPopularTemplates(): Promise<TemplateDefinition[]> {
    return this.templates.filter(t => t.metadata.popular);
  }

  async getFeaturedTemplates(): Promise<TemplateDefinition[]> {
    return this.templates.filter(t => t.metadata.featured);
  }

  async searchTemplates(query: string): Promise<TemplateDefinition[]> {
    const searchTerm = query.toLowerCase();
    return this.templates.filter(t => 
      t.name.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm) ||
      t.metadata.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Category Management
  async getCategories(): Promise<TemplateCategory[]> {
    return this.categories;
  }

  async getSubCategories(categoryId: string): Promise<string[]> {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.subCategories : [];
  }

  // Design Management
  async createDesignFromTemplate(
    templateId: string, 
    designName: string
  ): Promise<UserDesign> {
    const template = await this.getTemplateById(templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    const design: UserDesign = {
      id: generateId(),
      name: designName,
      templateId,
      elements: deepClone(template.elements),
      layers: deepClone(template.layers),
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        lastEdited: new Date(),
        version: 1,
        tags: [...template.metadata.tags]
      },
      exportHistory: []
    };

    this.userDesigns.push(design);
    return design;
  }

  async saveDesign(design: UserDesign): Promise<void> {
    const index = this.userDesigns.findIndex(d => d.id === design.id);
    if (index !== -1) {
      design.metadata.updatedAt = new Date();
      design.metadata.lastEdited = new Date();
      design.metadata.version++;
      this.userDesigns[index] = deepClone(design);
    } else {
      this.userDesigns.push(deepClone(design));
    }
  }

  async getUserDesigns(): Promise<UserDesign[]> {
    return this.userDesigns;
  }

  async getDesignById(id: string): Promise<UserDesign | null> {
    const design = this.userDesigns.find(d => d.id === id);
    return design ? deepClone(design) : null;
  }

  async deleteDesign(id: string): Promise<void> {
    const index = this.userDesigns.findIndex(d => d.id === id);
    if (index !== -1) {
      this.userDesigns.splice(index, 1);
    }
  }

  // Element Operations
  async addElement(
    designId: string, 
    elementType: 'text' | 'image' | 'shape' | 'icon',
    x: number = 100,
    y: number = 100
  ): Promise<DesignElement> {
    const design = await this.getDesignById(designId);
    if (!design) {
      throw new Error('Design not found');
    }

    let element: DesignElement;
    switch (elementType) {
      case 'text':
        element = createTextElement('Sample Text', x, y);
        break;
      case 'image':
        element = createImageElement('/placeholder-image.jpg', x, y);
        break;
      case 'shape':
        element = createShapeElement('rectangle', x, y);
        break;
      case 'icon':
        element = createIconElement('star', x, y);
        break;
      default:
        throw new Error('Invalid element type');
    }

    // Set z-index to be above existing elements
    element.zIndex = Math.max(...design.elements.map(el => el.zIndex), 0) + 1;
    
    design.elements.push(element);
    design.metadata.updatedAt = new Date();
    design.metadata.lastEdited = new Date();
    
    await this.saveDesign(design);
    return element;
  }

  async updateElement(
    designId: string, 
    elementId: string, 
    updates: Partial<DesignElement>
  ): Promise<DesignElement> {
    const design = await this.getDesignById(designId);
    if (!design) {
      throw new Error('Design not found');
    }

    const elementIndex = design.elements.findIndex(el => el.id === elementId);
    if (elementIndex === -1) {
      throw new Error('Element not found');
    }

    design.elements[elementIndex] = { ...design.elements[elementIndex], ...updates };
    design.metadata.updatedAt = new Date();
    design.metadata.lastEdited = new Date();
    
    await this.saveDesign(design);
    return design.elements[elementIndex];
  }

  async deleteElement(designId: string, elementId: string): Promise<void> {
    const design = await this.getDesignById(designId);
    if (!design) {
      throw new Error('Design not found');
    }

    const elementIndex = design.elements.findIndex(el => el.id === elementId);
    if (elementIndex === -1) {
      throw new Error('Element not found');
    }

    design.elements.splice(elementIndex, 1);
    design.metadata.updatedAt = new Date();
    design.metadata.lastEdited = new Date();
    
    await this.saveDesign(design);
  }

  async duplicateElement(designId: string, elementId: string): Promise<DesignElement> {
    const design = await this.getDesignById(designId);
    if (!design) {
      throw new Error('Design not found');
    }

    const element = design.elements.find(el => el.id === elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const duplicated = deepClone(element);
    duplicated.id = generateId();
    duplicated.x += 20;
    duplicated.y += 20;
    duplicated.zIndex = Math.max(...design.elements.map(el => el.zIndex), 0) + 1;

    design.elements.push(duplicated);
    design.metadata.updatedAt = new Date();
    design.metadata.lastEdited = new Date();
    
    await this.saveDesign(design);
    return duplicated;
  }

  // Export Operations
  async exportDesign(
    designId: string, 
    options: ExportOptions
  ): Promise<{ dataUrl: string; fileSize: number }> {
    const design = await this.getDesignById(designId);
    if (!design) {
      throw new Error('Design not found');
    }

    // This is a simplified export - in a real implementation, you'd use a canvas library
    // like Fabric.js or Konva.js to render the design and export it
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas context not available');
    }

    // Set canvas dimensions based on export options
    const dimensions = calculateExportDimensions(
      { width: 800, height: 600, unit: 'inches' } as TemplateDefinition,
      options.resolution,
      'inches'
    );
    
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Fill background if requested
    if (options.includeBackground) {
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Render design elements (simplified)
    design.elements.forEach(element => {
      if (!element.visible) return;
      
      ctx.save();
      ctx.globalAlpha = element.opacity;
      ctx.translate(element.x + element.width / 2, element.y + element.height / 2);
      ctx.rotate(element.rotation * Math.PI / 180);
      
      if (element.type === 'text') {
        const textElement = element as TextElement;
        ctx.font = `${textElement.fontWeight} ${textElement.fontSize}px ${textElement.fontFamily}`;
        ctx.fillStyle = textElement.color;
        ctx.textAlign = textElement.textAlign;
        ctx.fillText(textElement.content, -element.width / 2, element.height / 2);
      }
      
      ctx.restore();
    });

    // Convert to data URL
    const dataUrl = canvas.toDataURL(`image/${options.format}`, options.quality / 100);
    
    // Calculate file size (approximate)
    const base64Length = dataUrl.length - 'data:image/png;base64,'.length;
    const fileSize = Math.ceil(base64Length * 0.75);

    // Update export history
    design.exportHistory.push({
      format: options.format,
      exportedAt: new Date(),
      fileSize
    });
    
    await this.saveDesign(design);

    return { dataUrl, fileSize };
  }

  // Validation
  async validateDesign(designId: string): Promise<string[]> {
    const design = await this.getDesignById(designId);
    if (!design) {
      return ['Design not found'];
    }

    const errors: string[] = [];
    
    if (!design.name.trim()) {
      errors.push('Design name is required');
    }
    
    if (design.elements.length === 0) {
      errors.push('Design must have at least one element');
    }

    design.elements.forEach((element, index) => {
      if (element.width <= 0) errors.push(`Element ${index + 1}: Width must be greater than 0`);
      if (element.height <= 0) errors.push(`Element ${index + 1}: Height must be greater than 0`);
      if (element.opacity < 0 || element.opacity > 1) errors.push(`Element ${index + 1}: Opacity must be between 0 and 1`);
    });

    return errors;
  }

  // Private Methods
  private initializeDefaultTemplates(): void {
    // Add some default templates
    this.templates = [
      {
        id: 'business-sign-001',
        name: 'Professional Business Sign',
        category: 'Business',
        subCategory: 'Office Signs',
        description: 'Clean and professional business sign template',
        preview: '/templates/business-sign-preview.jpg',
        thumbnail: '/templates/business-sign-thumb.jpg',
        width: 24,
        height: 18,
        unit: 'inches',
        basePrice: 49.99,
        elements: [
          createTextElement('Your Business Name', 120, 90),
          createTextElement('Professional Services', 120, 120),
          createShapeElement('rectangle', 50, 50, 140, 100)
        ],
        layers: [
          {
            id: 'background',
            name: 'Background',
            visible: true,
            locked: false,
            opacity: 1,
            blendMode: 'normal',
            elements: []
          },
          {
            id: 'content',
            name: 'Content',
            visible: true,
            locked: false,
            opacity: 1,
            blendMode: 'normal',
            elements: ['element_1', 'element_2', 'element_3']
          }
        ],
        metadata: {
          tags: ['business', 'professional', 'office'],
          difficulty: 'beginner',
          estimatedTime: 15,
          popular: true,
          featured: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    ];
  }

  private initializeCategories(): void {
    this.categories = [
      {
        id: 'business',
        name: 'Business Signs',
        description: 'Professional business and office signage',
        icon: '🏢',
        color: '#3B82F6',
        subCategories: ['Office Signs', 'Storefront Signs', 'Directional Signs'],
        templateCount: 15
      },
      {
        id: 'events',
        name: 'Event Signs',
        description: 'Signs for events, parties, and celebrations',
        icon: '🎉',
        color: '#10B981',
        subCategories: ['Party Signs', 'Wedding Signs', 'Event Banners'],
        templateCount: 23
      },
      {
        id: 'real-estate',
        name: 'Real Estate',
        description: 'Property and real estate signage',
        icon: '🏠',
        color: '#F59E0B',
        subCategories: ['For Sale Signs', 'Open House Signs', 'Property Signs'],
        templateCount: 18
      }
    ];
  }
}
