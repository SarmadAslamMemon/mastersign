// ============================================================================
// TEMPLATE SERVICE - Professional Sign Templates for TLDraw v2
// ============================================================================

import { createShapeId } from '@tldraw/tldraw';

export interface SignTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  dimensions: { width: number; height: number };
  price: number;
  thumbnail: string;
  backgroundImage?: string;
  backgroundColor?: string;
  elements: any[];
  tags: string[];
}

export interface TemplateElement {
  id: string;
  type: 'geo' | 'text' | 'image';
  x: number;
  y: number;
  props: any;
}

export class TemplateService {
  private static templates: SignTemplate[] = [
    {
      id: 'grass-whackers',
      name: 'GRASS WHACKERS',
      category: 'Lawn Care',
      description: 'Professional lawn care service sign with bold typography',
      dimensions: { width: 25, height: 19 },
      price: 29.99,
      thumbnail: '/templates/grass-whackers.jpg',
      backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      backgroundColor: '#f0f8f0',
      tags: ['lawn care', 'landscaping', 'professional', 'bold'],
      elements: [
        {
          id: createShapeId(),
          type: 'text',
          x: 12.5,
          y: 9.5,
          props: {
            text: 'GRASS WHACKERS',
            color: 'black',
            font: 'Arial Black',
            size: 48,
            weight: 'bold',
            style: 'normal',
            align: 'middle',
          },
        },
        {
          id: createShapeId(),
          type: 'text',
          x: 12.5,
          y: 14,
          props: {
            text: 'Professional Lawn Care',
            color: 'green',
            font: 'Arial',
            size: 24,
            weight: 'normal',
            style: 'normal',
            align: 'middle',
          },
        },
        {
          id: createShapeId(),
          type: 'geo',
          x: 12.5,
          y: 6,
          props: {
            geo: 'rectangle',
            w: 20,
            h: 2,
            fill: 'solid',
            color: 'green',
            dash: 'draw',
            size: 's',
            opacity: 1,
          },
        },
      ],
    },
    {
      id: 'for-sale',
      name: 'FOR SALE',
      category: 'Real Estate',
      description: 'Classic real estate sign with modern design',
      dimensions: { width: 18, height: 24 },
      price: 24.99,
      thumbnail: '/templates/for-sale.jpg',
      backgroundImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      backgroundColor: '#fff5f5',
      tags: ['real estate', 'for sale', 'property', 'classic'],
      elements: [
        {
          id: createShapeId(),
          type: 'text',
          x: 9,
          y: 8,
          props: {
            text: 'FOR SALE',
            color: 'red',
            font: 'Arial Black',
            size: 36,
            weight: 'bold',
            style: 'normal',
            align: 'middle',
          },
        },
        {
          id: createShapeId(),
          type: 'geo',
          x: 9,
          y: 12,
          props: {
            geo: 'rectangle',
            w: 14,
            h: 8,
            fill: 'none',
            color: 'black',
            dash: 'draw',
            size: 'l',
            opacity: 1,
          },
        },
        {
          id: createShapeId(),
          type: 'text',
          x: 9,
          y: 18,
          props: {
            text: 'Call Today',
            color: 'black',
            font: 'Arial',
            size: 20,
            weight: 'normal',
            style: 'normal',
            align: 'middle',
          },
        },
      ],
    },
    {
      id: 'now-open',
      name: 'NOW OPEN',
      category: 'Business',
      description: 'Grand opening sign for new businesses',
      dimensions: { width: 24, height: 18 },
      price: 27.99,
      thumbnail: '/templates/now-open.jpg',
      backgroundImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      backgroundColor: '#1e40af',
      tags: ['business', 'grand opening', 'new', 'attention'],
      elements: [
        {
          id: createShapeId(),
          type: 'text',
          x: 12,
          y: 6,
          props: {
            text: 'NOW OPEN',
            color: 'white',
            font: 'Arial Black',
            size: 42,
            weight: 'bold',
            style: 'normal',
            align: 'middle',
          },
        },
        {
          id: createShapeId(),
          type: 'geo',
          x: 12,
          y: 9,
          props: {
            geo: 'rectangle',
            w: 22,
            h: 12,
            fill: 'solid',
            color: 'blue',
            dash: 'draw',
            size: 'm',
            opacity: 1,
          },
        },
        {
          id: createShapeId(),
          type: 'text',
          x: 12,
          y: 15,
          props: {
            text: 'Grand Opening Sale!',
            color: 'white',
            font: 'Arial',
            size: 24,
            weight: 'bold',
            style: 'normal',
            align: 'middle',
          },
        },
      ],
    },
    {
      id: 'custom-business',
      name: 'Custom Business',
      category: 'Business',
      description: 'Professional business sign template',
      dimensions: { width: 20, height: 16 },
      price: 22.99,
      thumbnail: '/templates/custom-business.jpg',
      backgroundColor: '#ffffff',
      tags: ['business', 'professional', 'customizable', 'modern'],
      elements: [
        {
          id: createShapeId(),
          type: 'text',
          x: 10,
          y: 4,
          props: {
            text: 'BUSINESS NAME',
            color: 'black',
            font: 'Arial Black',
            size: 32,
            weight: 'bold',
            style: 'normal',
            align: 'middle',
          },
        },
        {
          id: createShapeId(),
          type: 'text',
          x: 10,
          y: 8,
          props: {
            text: 'Tagline or Description',
            color: 'gray',
            font: 'Arial',
            size: 18,
            weight: 'normal',
            style: 'normal',
            align: 'middle',
          },
        },
        {
          id: createShapeId(),
          type: 'geo',
          x: 10,
          y: 12,
          props: {
            geo: 'rectangle',
            w: 16,
            h: 2,
            fill: 'solid',
            color: 'blue',
            dash: 'draw',
            size: 's',
            opacity: 1,
          },
        },
      ],
    },
    {
      id: 'restaurant-menu',
      name: 'Restaurant Menu',
      category: 'Food & Beverage',
      description: 'Elegant restaurant menu sign with food imagery',
      dimensions: { width: 30, height: 20 },
      price: 34.99,
      thumbnail: '/templates/restaurant-menu.jpg',
      backgroundImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      backgroundColor: '#fef3c7',
      tags: ['restaurant', 'food', 'menu', 'elegant'],
      elements: [
        {
          id: createShapeId(),
          type: 'text',
          x: 15,
          y: 5,
          props: {
            text: 'RESTAURANT NAME',
            color: 'white',
            font: 'Playfair Display',
            size: 56,
            weight: 'bold',
            style: 'normal',
            align: 'middle',
          },
        },
        {
          id: createShapeId(),
          type: 'text',
          x: 15,
          y: 12,
          props: {
            text: 'Fine Dining & Cocktails',
            color: 'white',
            font: 'Playfair Display',
            size: 28,
            weight: 'normal',
            style: 'italic',
            align: 'middle',
          },
        },
        {
          id: createShapeId(),
          type: 'geo',
          x: 15,
          y: 16,
          props: {
            geo: 'rectangle',
            w: 24,
            h: 3,
            fill: 'solid',
            color: 'gold',
            dash: 'draw',
            size: 'm',
            opacity: 1,
          },
        },
      ],
    },
    {
      id: 'event-banner',
      name: 'Event Banner',
      category: 'Events',
      description: 'Dynamic event banner with modern design',
      dimensions: { width: 36, height: 12 },
      price: 39.99,
      thumbnail: '/templates/event-banner.jpg',
      backgroundImage: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      backgroundColor: '#7c3aed',
      tags: ['event', 'banner', 'modern', 'dynamic'],
      elements: [
        {
          id: createShapeId(),
          type: 'text',
          x: 18,
          y: 4,
          props: {
            text: 'EVENT TITLE',
            color: 'white',
            font: 'Impact',
            size: 72,
            weight: 'bold',
            style: 'normal',
            align: 'middle',
          },
        },
        {
          id: createShapeId(),
          type: 'text',
          x: 18,
          y: 8,
          props: {
            text: 'Date • Time • Location',
            color: 'white',
            font: 'Arial',
            size: 24,
            weight: 'normal',
            style: 'normal',
            align: 'middle',
          },
        },
        {
          id: createShapeId(),
          type: 'geo',
          x: 18,
          y: 10,
          props: {
            geo: 'rectangle',
            w: 32,
            h: 1,
            fill: 'solid',
            color: 'yellow',
            dash: 'draw',
            size: 's',
            opacity: 1,
          },
        },
      ],
    },
  ];

  static getAllTemplates(): SignTemplate[] {
    return this.templates;
  }

  static getTemplatesByCategory(category: string): SignTemplate[] {
    return this.templates.filter(template => template.category === category);
  }

  static getTemplateById(id: string): SignTemplate | undefined {
    return this.templates.find(template => template.id === id);
  }

  static searchTemplates(query: string): SignTemplate[] {
    const lowercaseQuery = query.toLowerCase();
    return this.templates.filter(template => 
      template.name.toLowerCase().includes(lowercaseQuery) ||
      template.description.toLowerCase().includes(lowercaseQuery) ||
      template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  static getCategories(): string[] {
    return [...new Set(this.templates.map(template => template.category))];
  }

  static createCustomTemplate(name: string, category: string, elements: TemplateElement[]): SignTemplate {
    const newTemplate: SignTemplate = {
      id: `custom-${Date.now()}`,
      name,
      category,
      description: 'Custom template',
      dimensions: { width: 20, height: 16 },
      price: 0,
      thumbnail: '/templates/custom.jpg',
      backgroundColor: '#ffffff',
      tags: ['custom', category.toLowerCase()],
      elements: elements.map(element => ({
        ...element,
        id: createShapeId(),
      })),
    };

    this.templates.push(newTemplate);
    return newTemplate;
  }

  static exportTemplate(template: SignTemplate): string {
    return JSON.stringify(template, null, 2);
  }

  static importTemplate(templateData: string): SignTemplate | null {
    try {
      const template = JSON.parse(templateData);
      if (this.validateTemplate(template)) {
        return template;
      }
      return null;
    } catch (error) {
      console.error('Error importing template:', error);
      return null;
    }
  }

  private static validateTemplate(template: any): boolean {
    return (
      template.id &&
      template.name &&
      template.category &&
      template.elements &&
      Array.isArray(template.elements)
    );
  }
} 