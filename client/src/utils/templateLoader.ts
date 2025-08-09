import { Template, TemplateCategory } from '@/types/template';

// Import all template JSON files
// Note: In a real application, these would be loaded from an API
// For now, we'll create a mock data structure that can be easily replaced

const mockTemplates: Template[] = [
  // Expo/Display templates
  {
    id: "expo-display-stand-basic",
    name: "Expo Display Stand - Basic",
    category: { mainCategory: "Expo/Display" },
    thumbnail: "/assets/templates/expo-display/stand-basic-thumb.png",
    width: 800,
    height: 2000,
    description: "A vertical expo stand with title, subtitle, and image placeholders.",
    tags: ["expo", "stand", "display", "vertical", "basic"],
    document: {
      shapes: {
        title: {
          id: "title",
          type: "text",
          x: 400,
          y: 200,
          props: {
            text: "COMPANY NAME",
            fontSize: 48,
            fontWeight: "bold",
            textAlign: "center"
          }
        },
        subtitle: {
          id: "subtitle",
          type: "text",
          x: 400,
          y: 280,
          props: {
            text: "Tagline or Description",
            fontSize: 24,
            textAlign: "center"
          }
        },
        imagePlaceholder: {
          id: "imagePlaceholder",
          type: "image",
          x: 400,
          y: 800,
          props: {
            src: "",
            width: 400,
            height: 300
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Accessories templates
  {
    id: "mounting-hardware-basic",
    name: "Basic Mounting Hardware Layout",
    category: {
      mainCategory: "Accessories",
      subCategory: "Mounting Hardware for Signs and Banners"
    },
    thumbnail: "/assets/templates/accessories/mounting-hardware-basic-thumb.png",
    width: 500,
    height: 500,
    description: "Mounting hardware diagram with editable labels.",
    tags: ["accessories", "mounting", "hardware", "diagram", "layout"],
    document: {
      shapes: {
        title: {
          id: "title",
          type: "text",
          x: 250,
          y: 50,
          props: {
            text: "Mounting Hardware",
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center"
          }
        },
        bracket: {
          id: "bracket",
          type: "rectangle",
          x: 200,
          y: 150,
          props: {
            width: 100,
            height: 20,
            fill: "#cccccc"
          }
        },
        bracketLabel: {
          id: "bracketLabel",
          type: "text",
          x: 250,
          y: 200,
          props: {
            text: "Wall Bracket",
            fontSize: 14,
            textAlign: "center"
          }
        },
        screw: {
          id: "screw",
          type: "ellipse",
          x: 240,
          y: 120,
          props: {
            width: 20,
            height: 20,
            fill: "#666666"
          }
        },
        screwLabel: {
          id: "screwLabel",
          type: "text",
          x: 250,
          y: 100,
          props: {
            text: "Mounting Screw",
            fontSize: 12,
            textAlign: "center"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Laser Engraving templates
  {
    id: "laser-engraving-nameplate",
    name: "Laser Engraved Nameplate",
    category: { mainCategory: "Laser Engraving" },
    thumbnail: "/assets/templates/laser-engraving/nameplate-thumb.png",
    width: 300,
    height: 100,
    description: "Professional nameplate with company logo and contact information.",
    tags: ["laser", "engraving", "nameplate", "professional", "contact"],
    document: {
      shapes: {
        companyName: {
          id: "companyName",
          type: "text",
          x: 150,
          y: 30,
          props: {
            text: "COMPANY NAME",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center"
          }
        },
        contactInfo: {
          id: "contactInfo",
          type: "text",
          x: 150,
          y: 60,
          props: {
            text: "Phone: (555) 123-4567",
            fontSize: 14,
            textAlign: "center"
          }
        },
        logoPlaceholder: {
          id: "logoPlaceholder",
          type: "image",
          x: 50,
          y: 25,
          props: {
            src: "",
            width: 50,
            height: 50
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Banners/Flags templates
  {
    id: "banner-horizontal-basic",
    name: "Horizontal Banner - Basic",
    category: { mainCategory: "Banners/Flags" },
    thumbnail: "/assets/templates/banners-flags/horizontal-banner-thumb.png",
    width: 1200,
    height: 400,
    description: "Standard horizontal banner with header, content area, and call-to-action.",
    tags: ["banner", "horizontal", "advertising", "marketing", "basic"],
    document: {
      shapes: {
        header: {
          id: "header",
          type: "text",
          x: 600,
          y: 80,
          props: {
            text: "MAIN HEADLINE",
            fontSize: 64,
            fontWeight: "bold",
            textAlign: "center",
            color: "#ffffff"
          }
        },
        subheader: {
          id: "subheader",
          type: "text",
          x: 600,
          y: 160,
          props: {
            text: "Supporting text that explains your message",
            fontSize: 32,
            textAlign: "center",
            color: "#ffffff"
          }
        },
        ctaButton: {
          id: "ctaButton",
          type: "rectangle",
          x: 600,
          y: 280,
          props: {
            width: 200,
            height: 60,
            fill: "#ff6b35",
            stroke: "#ffffff",
            strokeWidth: 2
          }
        },
        ctaText: {
          id: "ctaText",
          type: "text",
          x: 600,
          y: 310,
          props: {
            text: "LEARN MORE",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "#ffffff"
          }
        },
        background: {
          id: "background",
          type: "rectangle",
          x: 600,
          y: 200,
          props: {
            width: 1200,
            height: 400,
            fill: "#2c3e50"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Signs templates
  {
    id: "outdoor-sign-basic",
    name: "Outdoor Sign - Basic",
    category: { mainCategory: "Signs" },
    thumbnail: "/assets/templates/signs/outdoor-sign-thumb.png",
    width: 600,
    height: 400,
    description: "Simple outdoor sign with company name and contact information.",
    tags: ["sign", "outdoor", "company", "contact", "basic"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 300,
          y: 200,
          props: {
            width: 600,
            height: 400,
            fill: "#34495e",
            stroke: "#2c3e50",
            strokeWidth: 4
          }
        },
        companyName: {
          id: "companyName",
          type: "text",
          x: 300,
          y: 150,
          props: {
            text: "COMPANY NAME",
            fontSize: 48,
            fontWeight: "bold",
            textAlign: "center",
            color: "#ffffff"
          }
        },
        tagline: {
          id: "tagline",
          type: "text",
          x: 300,
          y: 220,
          props: {
            text: "Your Business Tagline",
            fontSize: 24,
            textAlign: "center",
            color: "#ecf0f1"
          }
        },
        contactInfo: {
          id: "contactInfo",
          type: "text",
          x: 300,
          y: 300,
          props: {
            text: "Phone: (555) 123-4567 | www.company.com",
            fontSize: 18,
            textAlign: "center",
            color: "#bdc3c7"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  }
];

/**
 * Load all templates from a specific category or subcategory
 */
export function loadTemplatesByCategory(category: TemplateCategory): Template[] {
  return mockTemplates.filter(template => {
    if (category.subCategory) {
      return template.category.mainCategory === category.mainCategory &&
             template.category.subCategory === category.subCategory;
    }
    return template.category.mainCategory === category.mainCategory;
  });
}

/**
 * Search templates by name or tags
 */
export function searchTemplates(query: string): Template[] {
  const lowercaseQuery = query.toLowerCase();
  
  return mockTemplates.filter(template => {
    // Search in name
    if (template.name.toLowerCase().includes(lowercaseQuery)) {
      return true;
    }
    
    // Search in description
    if (template.description?.toLowerCase().includes(lowercaseQuery)) {
      return true;
    }
    
    // Search in tags
    if (template.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))) {
      return true;
    }
    
    return false;
  });
}

/**
 * Load a specific template by ID
 */
export function loadTemplateById(id: string): Template | null {
  return mockTemplates.find(template => template.id === id) || null;
}

/**
 * Get all available main categories
 */
export function getMainCategories(): string[] {
  const categories = new Set<string>();
  mockTemplates.forEach(template => {
    categories.add(template.category.mainCategory);
  });
  return Array.from(categories).sort();
}

/**
 * Get all available subcategories for a main category
 */
export function getSubCategories(mainCategory: string): string[] {
  const subCategories = new Set<string>();
  mockTemplates.forEach(template => {
    if (template.category.mainCategory === mainCategory && template.category.subCategory) {
      subCategories.add(template.category.subCategory);
    }
  });
  return Array.from(subCategories).sort();
}

/**
 * Get all templates (for debugging or admin purposes)
 */
export function getAllTemplates(): Template[] {
  return [...mockTemplates];
}

/**
 * Validate that a template document is valid tldraw JSON
 * This is a basic validation - in production you'd want more robust validation
 */
export function validateTemplateDocument(document: any): boolean {
  try {
    // Basic structure validation
    if (!document || typeof document !== 'object') {
      return false;
    }
    
    // Check for required tldraw properties
    if (!document.shapes || typeof document.shapes !== 'object') {
      return false;
    }
    
    // Check that shapes is an object (tldraw requirement)
    return true;
  } catch (error) {
    return false;
  }
}
