// ============================================================================
// SIGN DESIGN SERVICE - Professional Sign Design Management
// ============================================================================

export interface SignTemplate {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  width: number;
  height: number;
  unit: 'inches' | 'feet' | 'cm' | 'mm';
  preview: string;
  description: string;
  popular: boolean;
  featured: boolean;
  tags: string[];
  basePrice: number;
  specifications: {
    material?: string;
    finish?: string;
    installation?: string;
    durability?: string;
  };
}

export interface SignSize {
  id: string;
  name: string;
  width: number;
  height: number;
  unit: 'inches' | 'feet' | 'cm' | 'mm';
  aspectRatio: number;
  commonUse: string[];
  basePrice: number;
}

export interface DesignFilter {
  category?: string;
  subCategory?: string;
  size?: string;
  priceRange?: { min: number; max: number };
  material?: string;
  popular?: boolean;
  featured?: boolean;
  search?: string;
}

export class SignDesignService {
  // Standard Sign Sizes
  private static signSizes: SignSize[] = [
    {
      id: 'small-banner',
      name: 'Small Banner',
      width: 24,
      height: 36,
      unit: 'inches',
      aspectRatio: 0.67,
      commonUse: ['Indoor', 'Events', 'Promotions'],
      basePrice: 29.99
    },
    {
      id: 'medium-banner',
      name: 'Medium Banner',
      width: 36,
      height: 48,
      unit: 'inches',
      aspectRatio: 0.75,
      commonUse: ['Trade Shows', 'Outdoor Events', 'Business'],
      basePrice: 49.99
    },
    {
      id: 'large-banner',
      name: 'Large Banner',
      width: 48,
      height: 72,
      unit: 'inches',
      aspectRatio: 0.67,
      commonUse: ['Outdoor Advertising', 'Construction', 'Events'],
      basePrice: 89.99
    },
    {
      id: 'xlarge-banner',
      name: 'Extra Large Banner',
      width: 60,
      height: 120,
      unit: 'inches',
      aspectRatio: 0.5,
      commonUse: ['Highway Signs', 'Large Events', 'Construction'],
      basePrice: 149.99
    },
    {
      id: 'vehicle-wrap',
      name: 'Vehicle Wrap',
      width: 120,
      height: 60,
      unit: 'inches',
      aspectRatio: 2,
      commonUse: ['Vehicle Graphics', 'Mobile Advertising'],
      basePrice: 299.99
    },
    {
      id: 'window-graphic',
      name: 'Window Graphic',
      width: 36,
      height: 48,
      unit: 'inches',
      aspectRatio: 0.75,
      commonUse: ['Store Fronts', 'Office Windows', 'Retail'],
      basePrice: 39.99
    },
    {
      id: 'yard-sign',
      name: 'Yard Sign',
      width: 18,
      height: 24,
      unit: 'inches',
      aspectRatio: 0.75,
      commonUse: ['Real Estate', 'Political', 'Events'],
      basePrice: 19.99
    },
    {
      id: 'channel-letters',
      name: 'Channel Letters',
      width: 12,
      height: 48,
      unit: 'inches',
      aspectRatio: 0.25,
      commonUse: ['Building Signs', 'Business Names', 'Exterior'],
      basePrice: 199.99
    }
  ];

  // Professional Sign Templates
  private static signTemplates: SignTemplate[] = [
    {
      id: 'business-banner-001',
      name: 'Professional Business Banner',
      category: 'Business',
      subCategory: 'Corporate',
      width: 36,
      height: 48,
      unit: 'inches',
      preview: '/templates/business-banner-001.jpg',
      description: 'Clean, professional design perfect for corporate events and business promotions',
      popular: true,
      featured: true,
      tags: ['business', 'corporate', 'professional', 'clean'],
      basePrice: 49.99,
      specifications: {
        material: 'Premium Vinyl',
        finish: 'Matte',
        installation: 'Grommets Included',
        durability: 'UV Resistant'
      }
    },
    {
      id: 'window-graphic-001',
      name: 'Window Display Graphic',
      category: 'Retail',
      subCategory: 'Window Graphics',
      width: 36,
      height: 48,
      unit: 'inches',
      preview: '/templates/window-graphic-001.jpg',
      description: 'Eye-catching window graphics for retail stores',
      popular: true,
      featured: false,
      tags: ['retail', 'window', 'display', 'commercial'],
      basePrice: 45.99,
      specifications: {
        material: 'Perforated Vinyl',
        finish: 'Semi-transparent',
        installation: 'Static Cling',
        durability: 'Indoor/Outdoor'
      }
    },
    {
      id: 'wall-mural-001',
      name: 'Wall Mural Design',
      category: 'Interior',
      subCategory: 'Murals',
      width: 120,
      height: 96,
      unit: 'inches',
      preview: '/templates/wall-mural-001.jpg',
      description: 'Large format wall murals for interior spaces',
      popular: true,
      featured: true,
      tags: ['mural', 'wall', 'interior', 'large-format'],
      basePrice: 599.99,
      specifications: {
        material: 'Wallpaper Vinyl',
        finish: 'Matte',
        installation: 'Professional Installation',
        durability: 'Long-term'
      }
    },
    {
      id: 'floor-graphic-001',
      name: 'Floor Safety Graphic',
      category: 'Safety',
      subCategory: 'Floor Graphics',
      width: 24,
      height: 36,
      unit: 'inches',
      preview: '/templates/floor-graphic-001.jpg',
      description: 'Anti-slip floor graphics for safety and branding',
      popular: false,
      featured: true,
      tags: ['floor', 'safety', 'anti-slip', 'commercial'],
      basePrice: 89.99,
      specifications: {
        material: 'Anti-slip Vinyl',
        finish: 'Matte',
        installation: 'Anti-slip Adhesive',
        durability: 'Heavy Traffic'
      }
    },
    {
      id: 'business-card-001',
      name: 'Business Card Design',
      category: 'Print',
      subCategory: 'Business Cards',
      width: 3.5,
      height: 2,
      unit: 'inches',
      preview: '/templates/business-card-001.jpg',
      description: 'Professional business card design',
      popular: true,
      featured: false,
      tags: ['business-card', 'print', 'professional', 'networking'],
      basePrice: 15.99,
      specifications: {
        material: 'Card Stock',
        finish: 'Matte',
        installation: 'Standard Size',
        durability: 'High Quality'
      }
    },
    {
      id: 'brochure-001',
      name: 'Tri-Fold Brochure',
      category: 'Print',
      subCategory: 'Marketing',
      width: 8.5,
      height: 11,
      unit: 'inches',
      preview: '/templates/brochure-001.jpg',
      description: 'Professional tri-fold brochure design',
      popular: true,
      featured: false,
      tags: ['brochure', 'marketing', 'print', 'folded'],
      basePrice: 45.99,
      specifications: {
        material: 'Gloss Paper',
        finish: 'Full Color',
        installation: 'Folded',
        durability: 'Standard'
      }
    },
    {
      id: 'poster-001',
      name: 'Event Poster',
      category: 'Print',
      subCategory: 'Posters',
      width: 18,
      height: 24,
      unit: 'inches',
      preview: '/templates/poster-001.jpg',
      description: 'High-quality event poster design',
      popular: true,
      featured: true,
      tags: ['poster', 'events', 'marketing', 'large-format'],
      basePrice: 35.99,
      specifications: {
        material: 'Poster Paper',
        finish: 'Matte',
        installation: 'Standard Size',
        durability: 'Indoor'
      }
    },
    {
      id: 'sticker-001',
      name: 'Custom Sticker',
      category: 'Decals',
      subCategory: 'Stickers',
      width: 3,
      height: 3,
      unit: 'inches',
      preview: '/templates/sticker-001.jpg',
      description: 'Custom die-cut stickers',
      popular: true,
      featured: false,
      tags: ['sticker', 'decals', 'custom', 'die-cut'],
      basePrice: 12.99,
      specifications: {
        material: 'Vinyl',
        finish: 'Gloss',
        installation: 'Die-cut',
        durability: 'Outdoor Rated'
      }
    },
    {
      id: 'real-estate-sign-001',
      name: 'Real Estate Yard Sign',
      category: 'Real Estate',
      subCategory: 'Yard Signs',
      width: 18,
      height: 24,
      unit: 'inches',
      preview: '/templates/real-estate-sign-001.jpg',
      description: 'Eye-catching design for real estate listings and property marketing',
      popular: true,
      featured: false,
      tags: ['real-estate', 'property', 'marketing', 'outdoor'],
      basePrice: 19.99,
      specifications: {
        material: 'Corrugated Plastic',
        finish: 'Gloss',
        installation: 'Stake Included',
        durability: 'Weather Resistant'
      }
    },
    {
      id: 'vehicle-wrap-001',
      name: 'Vehicle Wrap Template',
      category: 'Vehicle',
      subCategory: 'Wraps',
      width: 120,
      height: 60,
      unit: 'inches',
      preview: '/templates/vehicle-wrap-001.jpg',
      description: 'Professional vehicle graphics for mobile advertising',
      popular: false,
      featured: true,
      tags: ['vehicle', 'wrap', 'mobile', 'advertising'],
      basePrice: 299.99,
      specifications: {
        material: 'Premium Vinyl Wrap',
        finish: 'Gloss',
        installation: 'Professional Installation',
        durability: '3-5 Years'
      }
    },
    {
      id: 'event-banner-001',
      name: 'Event Promotion Banner',
      category: 'Events',
      subCategory: 'Promotions',
      width: 48,
      height: 72,
      unit: 'inches',
      preview: '/templates/event-banner-001.jpg',
      description: 'Vibrant design for events, festivals, and celebrations',
      popular: true,
      featured: false,
      tags: ['events', 'festivals', 'celebrations', 'vibrant'],
      basePrice: 89.99,
      specifications: {
        material: 'Heavy Duty Vinyl',
        finish: 'Satin',
        installation: 'Reinforced Grommets',
        durability: 'Outdoor Rated'
      }
    },
    {
      id: 'construction-sign-001',
      name: 'Construction Safety Sign',
      category: 'Construction',
      subCategory: 'Safety',
      width: 24,
      height: 36,
      unit: 'inches',
      preview: '/templates/construction-sign-001.jpg',
      description: 'Safety-compliant construction site signage',
      popular: false,
      featured: false,
      tags: ['construction', 'safety', 'compliance', 'warning'],
      basePrice: 29.99,
      specifications: {
        material: 'Reflective Vinyl',
        finish: 'High Visibility',
        installation: 'Mounting Hardware',
        durability: 'Industrial Grade'
      }
    },
    {
      id: 'restaurant-sign-001',
      name: 'Restaurant Menu Board',
      category: 'Restaurant',
      subCategory: 'Menu Boards',
      width: 36,
      height: 48,
      unit: 'inches',
      preview: '/templates/restaurant-sign-001.jpg',
      description: 'Appetizing design for restaurant menus and promotions',
      popular: true,
      featured: true,
      tags: ['restaurant', 'menu', 'food', 'appetizing'],
      basePrice: 59.99,
      specifications: {
        material: 'Premium Vinyl',
        finish: 'Matte',
        installation: 'Frame Included',
        durability: 'Easy Clean'
      }
    }
  ];

  // Get all sign sizes
  static getSignSizes(): SignSize[] {
    return this.signSizes;
  }

  // Get sign size by ID
  static getSignSizeById(id: string): SignSize | undefined {
    return this.signSizes.find(size => size.id === id);
  }

  // Get all templates
  static getTemplates(): SignTemplate[] {
    return this.signTemplates;
  }

  // Get templates with filters
  static getTemplatesWithFilter(filter: DesignFilter): SignTemplate[] {
    let templates = [...this.signTemplates];

    if (filter.category) {
      templates = templates.filter(t => t.category === filter.category);
    }

    if (filter.subCategory) {
      templates = templates.filter(t => t.subCategory === filter.subCategory);
    }

    if (filter.size) {
      templates = templates.filter(t => t.id.includes(filter.size!));
    }

    if (filter.priceRange) {
      templates = templates.filter(t => 
        t.basePrice >= filter.priceRange!.min && 
        t.basePrice <= filter.priceRange!.max
      );
    }

    if (filter.material) {
      templates = templates.filter(t => 
        t.specifications.material?.toLowerCase().includes(filter.material!.toLowerCase())
      );
    }

    if (filter.popular) {
      templates = templates.filter(t => t.popular);
    }

    if (filter.featured) {
      templates = templates.filter(t => t.featured);
    }

    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      templates = templates.filter(t => 
        t.name.toLowerCase().includes(searchTerm) ||
        t.description.toLowerCase().includes(searchTerm) ||
        t.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    return templates;
  }

  // Get template by ID
  static getTemplateById(id: string): SignTemplate | undefined {
    return this.signTemplates.find(template => template.id === id);
  }

  // Get popular templates
  static getPopularTemplates(): SignTemplate[] {
    return this.signTemplates.filter(template => template.popular);
  }

  // Get featured templates
  static getFeaturedTemplates(): SignTemplate[] {
    return this.signTemplates.filter(template => template.featured);
  }

  // Get templates by category
  static getTemplatesByCategory(category: string): SignTemplate[] {
    return this.signTemplates.filter(template => template.category === category);
  }

  // Get all categories
  static getCategories(): string[] {
    return [...new Set(this.signTemplates.map(template => template.category))];
  }

  // Get subcategories by category
  static getSubCategoriesByCategory(category: string): string[] {
    return [...new Set(
      this.signTemplates
        .filter(template => template.category === category)
        .map(template => template.subCategory)
    )];
  }

  // Calculate price based on size and template
  static calculatePrice(templateId: string, sizeId: string, quantity: number = 1): number {
    const template = this.getTemplateById(templateId);
    const size = this.getSignSizeById(sizeId);
    
    if (!template || !size) return 0;
    
    const basePrice = template.basePrice;
    const sizeMultiplier = (size.width * size.height) / (template.width * template.height);
    const totalPrice = basePrice * sizeMultiplier * quantity;
    
    return Math.round(totalPrice * 100) / 100;
  }

  // Get design recommendations based on category
  static getDesignRecommendations(category: string): SignTemplate[] {
    const categoryTemplates = this.getTemplatesByCategory(category);
    return categoryTemplates.slice(0, 6); // Return top 6
  }

  // Export design data for API
  static exportDesignData(canvasData: any, templateId: string, sizeId: string): any {
    const template = this.getTemplateById(templateId);
    const size = this.getSignSizeById(sizeId);
    
    return {
      canvasData,
      template,
      size,
      price: this.calculatePrice(templateId, sizeId),
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
  }
} 