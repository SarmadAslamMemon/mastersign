// Sign Templates Data
// This file contains all the sign templates organized by category

export interface SignTemplate {
  id: string;
  name: string;
  category: string;
  dimensions: { width: number; height: number };
  thumbnail: string;
  description: string;
  json: any;
}

// Real Estate Sign Templates
export const realEstateTemplates: SignTemplate[] = [
  {
    id: 'for-sale-deluxe',
    name: 'For Sale - Deluxe',
    category: 'real-estate',
    dimensions: { width: 1800, height: 2400 }, // 18"x24"
    thumbnail: '/templates/for-sale-thumb.jpg',
    description: 'Professional real estate sign with property photo, agent info, and company branding',
    json: {
      width: 1800,
      height: 2400,
      background: '#ffffff',
      pages: [{
        id: 'page-1',
        children: [
          // Header text
          {
            type: 'text',
            text: 'FOR SALE',
            fontSize: 140,
            fontFamily: 'Arial Black',
            fill: '#cc0000',
            x: 900,
            y: 150,
            align: 'center',
            width: 1600,
            id: 'header-text'
          },
          // Property image placeholder
          {
            type: 'image',
            src: '/placeholders/house-placeholder.jpg',
            x: 150,
            y: 400,
            width: 1500,
            height: 900,
            id: 'property-photo',
            name: 'Property Photo'
          },
          // Agent photo
          {
            type: 'image',
            src: '/placeholders/agent-placeholder.jpg',
            x: 150,
            y: 1400,
            width: 300,
            height: 300,
            id: 'agent-photo',
            name: 'Agent Photo'
          },
          // Contact info
          {
            type: 'text',
            text: 'John Smith, Realtor\n555-SOLD-NOW\nwww.johnsellshouses.com',
            fontSize: 60,
            fontFamily: 'Arial',
            fill: '#000000',
            x: 500,
            y: 1450,
            width: 1200,
            id: 'contact-info'
          },
          // Company logo placeholder
          {
            type: 'image',
            src: '/placeholders/logo-placeholder.png',
            x: 1400,
            y: 1400,
            width: 250,
            height: 250,
            id: 'company-logo',
            name: 'Company Logo'
          }
        ]
      }]
    }
  },
  {
    id: 'for-rent-simple',
    name: 'For Rent - Simple',
    category: 'real-estate',
    dimensions: { width: 1200, height: 1800 }, // 12"x18"
    thumbnail: '/templates/for-rent-thumb.jpg',
    description: 'Clean rental sign with property details and contact information',
    json: {
      width: 1200,
      height: 1800,
      background: '#f8f9fa',
      pages: [{
        id: 'page-1',
        children: [
          {
            type: 'text',
            text: 'FOR RENT',
            fontSize: 100,
            fontFamily: 'Arial Black',
            fill: '#0066cc',
            x: 600,
            y: 100,
            align: 'center',
            width: 1000,
            id: 'rent-header'
          },
          {
            type: 'image',
            src: '/placeholders/apartment-placeholder.jpg',
            x: 100,
            y: 250,
            width: 1000,
            height: 600,
            id: 'rental-photo',
            name: 'Rental Photo'
          },
          {
            type: 'text',
            text: '2 Bed, 2 Bath\n$1,200/month\nAvailable Now',
            fontSize: 50,
            fontFamily: 'Arial',
            fill: '#333333',
            x: 600,
            y: 950,
            align: 'center',
            width: 1000,
            id: 'rental-details'
          },
          {
            type: 'text',
            text: 'Call: 555-RENT-NOW',
            fontSize: 40,
            fontFamily: 'Arial',
            fill: '#0066cc',
            x: 600,
            y: 1200,
            align: 'center',
            width: 1000,
            id: 'rental-contact'
          }
        ]
      }]
    }
  }
];

// Business Promotion Templates
export const businessTemplates: SignTemplate[] = [
  {
    id: 'grand-opening',
    name: 'Grand Opening Special',
    category: 'business',
    dimensions: { width: 2400, height: 1800 }, // 24"x18" landscape
    thumbnail: '/templates/grand-opening-thumb.jpg',
    description: 'Eye-catching grand opening banner with promotional offers',
    json: {
      width: 2400,
      height: 1800,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      pages: [{
        id: 'page-1',
        children: [
          // Decorative background elements
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#ffffff" opacity="0.3"/></svg>',
            x: 100,
            y: 100,
            width: 200,
            height: 200,
            id: 'star-1'
          },
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#ffffff" opacity="0.2"/></svg>',
            x: 2100,
            y: 150,
            width: 150,
            height: 150,
            id: 'star-2'
          },
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#ffffff" opacity="0.25"/></svg>',
            x: 150,
            y: 1400,
            width: 180,
            height: 180,
            id: 'star-3'
          },
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#ffffff" opacity="0.15"/></svg>',
            x: 2000,
            y: 1300,
            width: 120,
            height: 120,
            id: 'star-4'
          },
          // Decorative circles
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.2"/></svg>',
            x: 400,
            y: 300,
            width: 100,
            height: 100,
            id: 'circle-1'
          },
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.2"/></svg>',
            x: 1900,
            y: 400,
            width: 100,
            height: 100,
            id: 'circle-2'
          },
          // Main headline
          {
            type: 'text',
            text: 'GRAND OPENING',
            fontSize: 120,
            fontFamily: 'Impact',
            fill: '#ffffff',
            stroke: '#000000',
            strokeWidth: 4,
            x: 1200,
            y: 200,
            align: 'center',
            width: 2000,
            id: 'grand-opening-header'
          },
          // Business photo placeholder
          {
            type: 'image',
            src: '/placeholders/business-exterior.jpg',
            x: 200,
            y: 400,
            width: 800,
            height: 600,
            id: 'business-photo',
            name: 'Business Photo'
          },
          // Promotional text
          {
            type: 'text',
            text: '50% OFF\nEVERYTHING!',
            fontSize: 80,
            fontFamily: 'Arial Black',
            fill: '#ffff00',
            stroke: '#cc0000',
            strokeWidth: 3,
            x: 1400,
            y: 600,
            align: 'center',
            width: 800,
            id: 'promo-text'
          },
          // Date/hours info
          {
            type: 'text',
            text: 'March 15-17\n9 AM - 9 PM',
            fontSize: 60,
            fontFamily: 'Arial',
            fill: '#ffffff',
            x: 1200,
            y: 1200,
            align: 'center',
            width: 2000,
            id: 'opening-details'
          }
        ]
      }]
    }
  },
  {
    id: 'sale-banner',
    name: 'Sale Banner',
    category: 'business',
    dimensions: { width: 2400, height: 1200 }, // 24"x12" banner
    thumbnail: '/templates/sale-banner-thumb.jpg',
    description: 'Professional sale banner with product showcase area',
    json: {
      width: 2400,
      height: 1200,
      background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      pages: [{
        id: 'page-1',
        children: [
          // Decorative elements
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#ff6b9d" opacity="0.4"/></svg>',
            x: 150,
            y: 80,
            width: 120,
            height: 120,
            id: 'sale-star-1'
          },
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#ff6b9d" opacity="0.3"/></svg>',
            x: 2150,
            y: 100,
            width: 100,
            height: 100,
            id: 'sale-star-2'
          },
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="none" stroke="#ff6b9d" stroke-width="4" opacity="0.3"/></svg>',
            x: 300,
            y: 200,
            width: 150,
            height: 150,
            id: 'sale-circle-1'
          },
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="none" stroke="#ff6b9d" stroke-width="4" opacity="0.3"/></svg>',
            x: 1950,
            y: 250,
            width: 150,
            height: 150,
            id: 'sale-circle-2'
          },
          {
            type: 'text',
            text: 'MEGA SALE',
            fontSize: 100,
            fontFamily: 'Arial Black',
            fill: '#ff0000',
            x: 1200,
            y: 100,
            align: 'center',
            width: 2000,
            id: 'sale-header'
          },
          {
            type: 'image',
            src: '/placeholders/product-showcase.jpg',
            x: 200,
            y: 250,
            width: 800,
            height: 500,
            id: 'product-photo',
            name: 'Product Photo'
          },
          {
            type: 'text',
            text: 'Up to 70% Off\nSelected Items',
            fontSize: 70,
            fontFamily: 'Arial',
            fill: '#333333',
            x: 1400,
            y: 400,
            align: 'center',
            width: 800,
            id: 'sale-details'
          },
          {
            type: 'text',
            text: 'Limited Time Only!',
            fontSize: 50,
            fontFamily: 'Arial',
            fill: '#ff6600',
            x: 1200,
            y: 800,
            align: 'center',
            width: 2000,
            id: 'sale-timing'
          }
        ]
      }]
    }
  }
];

// Political Campaign Templates
export const politicalTemplates: SignTemplate[] = [
  {
    id: 'campaign-yard-sign',
    name: 'Campaign Yard Sign',
    category: 'political',
    dimensions: { width: 1200, height: 1800 }, // 12"x18"
    thumbnail: '/templates/campaign-yard-thumb.jpg',
    description: 'Classic political yard sign with candidate photo and slogan',
    json: {
      width: 1200,
      height: 1800,
      background: '#ffffff',
      pages: [{
        id: 'page-1',
        children: [
          {
            type: 'text',
            text: 'VOTE FOR',
            fontSize: 80,
            fontFamily: 'Arial Black',
            fill: '#000080',
            x: 600,
            y: 100,
            align: 'center',
            width: 1000,
            id: 'vote-text'
          },
          {
            type: 'image',
            src: '/placeholders/candidate-photo.jpg',
            x: 200,
            y: 250,
            width: 800,
            height: 800,
            id: 'candidate-photo',
            name: 'Candidate Photo'
          },
          {
            type: 'text',
            text: 'JOHN DOE',
            fontSize: 100,
            fontFamily: 'Arial Black',
            fill: '#000080',
            x: 600,
            y: 1100,
            align: 'center',
            width: 1000,
            id: 'candidate-name'
          },
          {
            type: 'text',
            text: 'MAYOR',
            fontSize: 60,
            fontFamily: 'Arial',
            fill: '#333333',
            x: 600,
            y: 1250,
            align: 'center',
            width: 1000,
            id: 'candidate-position'
          },
          {
            type: 'text',
            text: 'November 5, 2024',
            fontSize: 40,
            fontFamily: 'Arial',
            fill: '#666666',
            x: 600,
            y: 1400,
            align: 'center',
            width: 1000,
            id: 'election-date'
          }
        ]
      }]
    }
  }
];

// Events & Announcements Templates
export const eventTemplates: SignTemplate[] = [
  {
    id: 'event-banner',
    name: 'Event Banner',
    category: 'events',
    dimensions: { width: 2400, height: 1200 }, // 24"x12" banner
    thumbnail: '/templates/event-banner-thumb.jpg',
    description: 'Dynamic event banner with date, location, and event details',
    json: {
      width: 2400,
      height: 1200,
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      pages: [{
        id: 'page-1',
        children: [
          {
            type: 'text',
            text: 'ANNUAL FESTIVAL',
            fontSize: 120,
            fontFamily: 'Impact',
            fill: '#ffffff',
            stroke: '#000000',
            strokeWidth: 3,
            x: 1200,
            y: 150,
            align: 'center',
            width: 2000,
            id: 'event-title'
          },
          {
            type: 'image',
            src: '/placeholders/event-photo.jpg',
            x: 300,
            y: 350,
            width: 600,
            height: 400,
            id: 'event-photo',
            name: 'Event Photo'
          },
          {
            type: 'text',
            text: 'June 15-17, 2024\nDowntown Plaza',
            fontSize: 70,
            fontFamily: 'Arial',
            fill: '#ffffff',
            x: 1400,
            y: 450,
            align: 'center',
            width: 800,
            id: 'event-details'
          },
          {
            type: 'text',
            text: 'Live Music • Food • Fun',
            fontSize: 50,
            fontFamily: 'Arial',
            fill: '#ffff00',
            x: 1200,
            y: 800,
            align: 'center',
            width: 2000,
            id: 'event-highlights'
          }
        ]
      }]
    }
  }
];

// Construction & Safety Templates
export const constructionTemplates: SignTemplate[] = [
  {
    id: 'construction-warning',
    name: 'Construction Warning',
    category: 'construction',
    dimensions: { width: 1800, height: 1200 }, // 18"x12"
    thumbnail: '/templates/construction-warning-thumb.jpg',
    description: 'Safety warning sign for construction zones',
    json: {
      width: 1800,
      height: 1200,
      background: '#ff6600',
      pages: [{
        id: 'page-1',
        children: [
          {
            type: 'text',
            text: '⚠️',
            fontSize: 200,
            fontFamily: 'Arial',
            fill: '#ffffff',
            x: 900,
            y: 150,
            align: 'center',
            width: 1600,
            id: 'warning-symbol'
          },
          {
            type: 'text',
            text: 'CONSTRUCTION ZONE',
            fontSize: 100,
            fontFamily: 'Arial Black',
            fill: '#ffffff',
            x: 900,
            y: 400,
            align: 'center',
            width: 1600,
            id: 'construction-text'
          },
          {
            type: 'text',
            text: 'SLOW DOWN',
            fontSize: 80,
            fontFamily: 'Arial Black',
            fill: '#ffff00',
            x: 900,
            y: 600,
            align: 'center',
            width: 1600,
            id: 'slow-down-text'
          },
          {
            type: 'text',
            text: 'Work in Progress\nExpected Completion: Dec 2024',
            fontSize: 50,
            fontFamily: 'Arial',
            fill: '#ffffff',
            x: 900,
            y: 800,
            align: 'center',
            width: 1600,
            id: 'completion-info'
          }
        ]
      }]
    }
  }
];

// Template Categories
export const templateCategories = {
  'real-estate': {
    name: 'Real Estate Signs',
    templates: realEstateTemplates,
    icon: '🏠',
    description: 'Professional signs for property sales and rentals'
  },
  'business': {
    name: 'Business Promotion',
    templates: businessTemplates,
    icon: '🏢',
    description: 'Marketing materials for businesses and promotions'
  },
  'political': {
    name: 'Political Campaign',
    templates: politicalTemplates,
    icon: '🗳️',
    description: 'Campaign signs and political messaging'
  },
  'events': {
    name: 'Events & Announcements',
    templates: eventTemplates,
    icon: '🎉',
    description: 'Event banners and promotional materials'
  },
  'construction': {
    name: 'Construction & Safety',
    templates: constructionTemplates,
    icon: '🚧',
    description: 'Safety signs and construction zone warnings'
  }
};

// Simple Geometric Templates
export const geometricTemplates: SignTemplate[] = [
  {
    id: 'triangle-sign',
    name: 'Triangle Sign',
    category: 'geometric',
    dimensions: { width: 400, height: 400 }, // Small 4"x4"
    thumbnail: '/templates/triangle-thumb.jpg',
    description: 'Simple triangular sign with clean design',
    json: {
      width: 400,
      height: 400,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      pages: [{
        id: 'page-1',
        children: [
          // Decorative background elements
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#ffffff" opacity="0.2"/></svg>',
            x: 50,
            y: 50,
            width: 60,
            height: 60,
            id: 'triangle-star-1'
          },
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#ffffff" opacity="0.15"/></svg>',
            x: 300,
            y: 80,
            width: 50,
            height: 50,
            id: 'triangle-star-2'
          },
          // Triangle shape (using CSS triangle)
          {
            type: 'text',
            text: '▲',
            fontSize: 200,
            fontFamily: 'Arial',
            fill: '#ffffff',
            x: 200,
            y: 200,
            align: 'center',
            width: 200,
            height: 200,
            id: 'triangle-shape'
          },
          // Text label
          {
            type: 'text',
            text: 'TRIANGLE',
            fontSize: 40,
            fontFamily: 'Arial Black',
            fill: '#1f2937',
            x: 200,
            y: 320,
            align: 'center',
            width: 300,
            id: 'triangle-label'
          }
        ]
      }]
    }
  },
  {
    id: 'circle-sign',
    name: 'Circle Sign',
    category: 'geometric',
    dimensions: { width: 400, height: 400 }, // Small 4"x4"
    thumbnail: '/templates/circle-thumb.jpg',
    description: 'Simple circular sign with centered design',
    json: {
      width: 400,
      height: 400,
      background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%)',
      pages: [{
        id: 'page-1',
        children: [
          // Decorative background elements
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#ff6b9d" opacity="0.3"/></svg>',
            x: 60,
            y: 60,
            width: 70,
            height: 70,
            id: 'circle-star-1'
          },
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#ff6b9d" opacity="0.2"/></svg>',
            x: 280,
            y: 70,
            width: 60,
            height: 60,
            id: 'circle-star-2'
          },
          // Circle shape (using CSS circle)
          {
            type: 'text',
            text: '●',
            fontSize: 200,
            fontFamily: 'Arial',
            fill: '#ffffff',
            x: 200,
            y: 200,
            align: 'center',
            width: 200,
            height: 200,
            id: 'circle-shape'
          },
          // Text label
          {
            type: 'text',
            text: 'CIRCLE',
            fontSize: 40,
            fontFamily: 'Arial Black',
            fill: '#1f2937',
            x: 200,
            y: 320,
            align: 'center',
            width: 300,
            id: 'circle-label'
          }
        ]
      }]
    }
  },
  {
    id: 'square-sign',
    name: 'Square Sign',
    category: 'geometric',
    dimensions: { width: 400, height: 400 }, // Small 4"x4"
    thumbnail: '/templates/square-thumb.jpg',
    description: 'Simple square sign with geometric design',
    json: {
      width: 400,
      height: 400,
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      pages: [{
        id: 'page-1',
        children: [
          // Decorative background elements
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#10b981" opacity="0.3"/></svg>',
            x: 70,
            y: 70,
            width: 80,
            height: 80,
            id: 'square-star-1'
          },
          {
            type: 'svg',
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#10b981" opacity="0.2"/></svg>',
            x: 260,
            y: 80,
            width: 70,
            height: 70,
            id: 'square-star-2'
          },
          // Square shape (using CSS square)
          {
            type: 'text',
            text: '■',
            fontSize: 200,
            fontFamily: 'Arial',
            fill: '#ffffff',
            x: 200,
            y: 200,
            align: 'center',
            width: 200,
            height: 200,
            id: 'square-shape'
          },
          // Text label
          {
            type: 'text',
            text: 'SQUARE',
            fontSize: 40,
            fontFamily: 'Arial Black',
            fill: '#1f2937',
            x: 200,
            y: 320,
            align: 'center',
            width: 300,
            id: 'square-label'
          }
        ]
      }]
    }
  }
];

// All templates combined
export const allTemplates = [
  ...realEstateTemplates,
  ...businessTemplates,
  ...politicalTemplates,
  ...eventTemplates,
  ...constructionTemplates,
  ...geometricTemplates
];

// Add geometric category after geometricTemplates is defined
templateCategories.geometric = {
  name: 'Geometric Shapes',
  templates: geometricTemplates,
  icon: '🔷',
  description: 'Simple geometric shapes for testing and basic designs'
};

// Template by ID helper
export const getTemplateById = (id: string): SignTemplate | undefined => {
  return allTemplates.find(template => template.id === id);
};

// Templates by category helper
export const getTemplatesByCategory = (category: string): SignTemplate[] => {
  return templateCategories[category as keyof typeof templateCategories]?.templates || [];
};
