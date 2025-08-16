import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { 
  Plus, 
  Save, 
  Trash2, 
  Edit3, 
  Download, 
  Upload,
  FolderOpen,
  Star
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description?: string;
  category: string;
  thumbnail?: string;
  objects: any[];
  width: number;
  height: number;
  isCustom: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TemplateManagerProps {
  onTemplateSelect: (template: Template) => void;
  onTemplateSave: (template: Template) => void;
  onTemplateDelete: (templateId: string) => void;
  currentCanvas?: fabric.Canvas | null;
}

const TemplateManager: React.FC<TemplateManagerProps> = ({
  onTemplateSelect,
  onTemplateSave,
  onTemplateDelete,
  currentCanvas
}) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: 'business'
  });

  const categories = [
    { id: 'all', name: 'All Templates', icon: '📁' },
    { id: 'business', name: 'Business & Retail', icon: '🏢' },
    { id: 'event', name: 'Events & Celebrations', icon: '🎉' },
    { id: 'sale', name: 'Sales & Promotions', icon: '💰' },
    { id: 'blank', name: 'Blank Canvas', icon: '🎨' },
    { id: 'custom', name: 'Custom', icon: '⭐' }
  ];

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    // Load from localStorage
    const savedTemplates = localStorage.getItem('signBuilderTemplates');
    if (savedTemplates) {
      const parsed = JSON.parse(savedTemplates);
      setTemplates(parsed);
    } else {
      // Load sophisticated default templates
      const defaultTemplates: Template[] = [
        {
          id: 'blank-canvas',
          name: 'Blank Canvas',
          description: 'Start with a clean slate for your custom design',
          category: 'blank',
          width: 1200,
          height: 900,
          objects: [],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'restaurant-sign-premium',
          name: 'Premium Restaurant Sign',
          description: 'Elegant restaurant sign with modern typography and layout',
          category: 'business',
          width: 1200,
          height: 900,
          objects: [
            {
              type: 'image',
              src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop',
              left: 0,
              top: 0,
              width: 1200,
              height: 900,
              scaleX: 1,
              scaleY: 1,
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 0,
              top: 0,
              width: 1200,
              height: 900,
              fill: 'rgba(0,0,0,0.6)',
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 50,
              top: 50,
              width: 1100,
              height: 800,
              fill: 'rgba(255,255,255,0.95)',
              stroke: '#d4af37',
              strokeWidth: 8,
              selectable: false,
              evented: false
            },
            {
              type: 'i-text',
              left: 600,
              top: 200,
              text: 'LA BELLE CUISINE',
              fontSize: 64,
              fontFamily: 'Georgia',
              fill: '#1a1a1a',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold',
              fontStyle: 'italic'
            },
            {
              type: 'i-text',
              left: 600,
              top: 320,
              text: 'Fine Dining & Wine',
              fontSize: 32,
              fontFamily: 'Georgia',
              fill: '#8b4513',
              originX: 'center',
              originY: 'center',
              fontStyle: 'italic'
            },
            {
              type: 'i-text',
              left: 600,
              top: 450,
              text: 'Open Daily 5:00 PM - 11:00 PM',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#666666',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 520,
              text: 'Reservations: (555) 123-4567',
              fontSize: 20,
              fontFamily: 'Arial',
              fill: '#666666',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 650,
              text: '123 Gourmet Street • Downtown • www.labellecuisine.com',
              fontSize: 18,
              fontFamily: 'Arial',
              fill: '#999999',
              originX: 'center',
              originY: 'center'
            }
          ],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'coffee-shop-modern',
          name: 'Modern Coffee Shop',
          description: 'Contemporary coffee shop sign with clean design',
          category: 'business',
          width: 1200,
          height: 900,
          objects: [
            {
              type: 'image',
              src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=900&fit=crop',
              left: 0,
              top: 0,
              width: 1200,
              height: 900,
              scaleX: 1,
              scaleY: 1,
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 100,
              top: 100,
              width: 1000,
              height: 700,
              fill: '#8b4513',
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 120,
              top: 120,
              width: 960,
              height: 660,
              fill: '#ffffff',
              selectable: false,
              evented: false
            },
            {
              type: 'i-text',
              left: 600,
              top: 250,
              text: 'BREW & BEANS',
              fontSize: 72,
              fontFamily: 'Helvetica',
              fill: '#8b4513',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 380,
              text: 'Artisan Coffee • Fresh Pastries',
              fontSize: 28,
              fontFamily: 'Helvetica',
              fill: '#666666',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 480,
              text: 'Open 7AM - 8PM Daily',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#8b4513',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 580,
              text: 'Free WiFi • Outdoor Seating',
              fontSize: 20,
              fontFamily: 'Arial',
              fill: '#999999',
              originX: 'center',
              originY: 'center'
            }
          ],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'wedding-elegant',
          name: 'Elegant Wedding Sign',
          description: 'Sophisticated wedding announcement with elegant typography',
          category: 'event',
          width: 1200,
          height: 900,
          objects: [
            {
              type: 'image',
              src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=900&fit=crop',
              left: 0,
              top: 0,
              width: 1200,
              height: 900,
              scaleX: 1,
              scaleY: 1,
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 100,
              top: 100,
              width: 1000,
              height: 700,
              fill: '#d4af37',
              stroke: '#8b4513',
              strokeWidth: 3,
              selectable: false,
              evented: false
            },
            {
              type: 'i-text',
              left: 600,
              top: 180,
              text: 'Sarah & Michael',
              fontSize: 56,
              fontFamily: 'Georgia',
              fill: '#8b4513',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 280,
              text: 'Request the pleasure of your company',
              fontSize: 24,
              fontFamily: 'Georgia',
              fill: '#8b4513',
              originX: 'center',
              originY: 'center',
              fontStyle: 'italic'
            },
            {
              type: 'i-text',
              left: 600,
              top: 350,
              text: 'at their wedding celebration',
              fontSize: 24,
              fontFamily: 'Georgia',
              fill: '#8b4513',
              originX: 'center',
              originY: 'center',
              fontStyle: 'italic'
            },
            {
              type: 'i-text',
              left: 600,
              top: 450,
              text: 'Saturday, June 15th, 2024',
              fontSize: 28,
              fontFamily: 'Georgia',
              fill: '#8b4513',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 520,
              text: 'Four o\'clock in the afternoon',
              fontSize: 24,
              fontFamily: 'Georgia',
              fill: '#8b4513',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 620,
              text: 'The Grand Ballroom • 123 Elegant Avenue',
              fontSize: 20,
              fontFamily: 'Georgia',
              fill: '#8b4513',
              originX: 'center',
              originY: 'center'
            }
          ],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'black-friday-premium',
          name: 'Premium Black Friday',
          description: 'High-impact Black Friday sale sign with modern design',
          category: 'sale',
          width: 1200,
          height: 900,
          objects: [
            {
              type: 'rect',
              left: 0,
              top: 0,
              width: 1200,
              height: 900,
              fill: '#000000',
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 50,
              top: 50,
              width: 1100,
              height: 800,
              fill: '#ff0000',
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 70,
              top: 70,
              width: 1060,
              height: 760,
              fill: '#000000',
              selectable: false,
              evented: false
            },
            {
              type: 'i-text',
              left: 600,
              top: 200,
              text: 'BLACK FRIDAY',
              fontSize: 88,
              fontFamily: 'Arial',
              fill: '#ff0000',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 350,
              text: 'MEGA SALE',
              fontSize: 64,
              fontFamily: 'Arial',
              fill: '#ffffff',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 480,
              text: 'UP TO 80% OFF',
              fontSize: 48,
              fontFamily: 'Arial',
              fill: '#ffff00',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 600,
              text: 'November 24th - 27th, 2024',
              fontSize: 28,
              fontFamily: 'Arial',
              fill: '#ffffff',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 680,
              text: 'Online & In-Store • Limited Time Only',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#ffff00',
              originX: 'center',
              originY: 'center'
            }
          ],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'real-estate-premium',
          name: 'Premium Real Estate',
          description: 'Professional real estate sign with modern layout',
          category: 'business',
          width: 1200,
          height: 900,
          objects: [
            {
              type: 'image',
              src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=900&fit=crop',
              left: 0,
              top: 0,
              width: 1200,
              height: 900,
              scaleX: 1,
              scaleY: 1,
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 80,
              top: 80,
              width: 1040,
              height: 740,
              fill: '#ffffff',
              stroke: '#4169e1',
              strokeWidth: 4,
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 100,
              top: 100,
              width: 1000,
              height: 200,
              fill: '#4169e1',
              selectable: false,
              evented: false
            },
            {
              type: 'i-text',
              left: 600,
              top: 150,
              text: 'PREMIUM PROPERTIES',
              fontSize: 48,
              fontFamily: 'Arial',
              fill: '#ffffff',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 200,
              text: 'Luxury Real Estate Specialists',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#ffffff',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 380,
              text: 'NEW LISTING',
              fontSize: 36,
              fontFamily: 'Arial',
              fill: '#4169e1',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 450,
              text: '4 Bedroom • 3.5 Bath • 3,200 sq ft',
              fontSize: 28,
              fontFamily: 'Arial',
              fill: '#333333',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 520,
              text: 'Gated Community • Pool • Mountain Views',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#666666',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 620,
              text: 'Contact: John Smith • (555) 987-6543',
              fontSize: 20,
              fontFamily: 'Arial',
              fill: '#4169e1',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 680,
              text: 'www.premiumproperties.com',
              fontSize: 18,
              fontFamily: 'Arial',
              fill: '#999999',
              originX: 'center',
              originY: 'center'
            }
          ],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'fitness-center-modern',
          name: 'Modern Fitness Center',
          description: 'Dynamic fitness center sign with energetic design',
          category: 'business',
          width: 1200,
          height: 900,
          objects: [
            {
              type: 'image',
              src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=900&fit=crop',
              left: 0,
              top: 0,
              width: 1200,
              height: 900,
              scaleX: 1,
              scaleY: 1,
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 60,
              top: 60,
              width: 1080,
              height: 780,
              fill: '#ff6b35',
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 80,
              top: 80,
              width: 1040,
              height: 740,
              fill: '#1a1a1a',
              selectable: false,
              evented: false
            },
            {
              type: 'i-text',
              left: 600,
              top: 180,
              text: 'POWER HOUSE',
              fontSize: 76,
              fontFamily: 'Arial',
              fill: '#ff6b35',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 300,
              text: 'FITNESS CENTER',
              fontSize: 48,
              fontFamily: 'Arial',
              fill: '#ffffff',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 420,
              text: '24/7 Access • Personal Training • Group Classes',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#ff6b35',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 520,
              text: 'FREE 7-Day Trial • No Contracts',
              fontSize: 28,
              fontFamily: 'Arial',
              fill: '#ffffff',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 620,
              text: 'Join Today: (555) 456-7890',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#ff6b35',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 700,
              text: 'www.powerhousefitness.com',
              fontSize: 20,
              fontFamily: 'Arial',
              fill: '#999999',
              originX: 'center',
              originY: 'center'
            }
          ],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'holiday-sale-premium',
          name: 'Premium Holiday Sale',
          description: 'Festive holiday sale sign with seasonal colors',
          category: 'sale',
          width: 1200,
          height: 900,
          objects: [
            {
              type: 'image',
              src: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&h=900&fit=crop',
              left: 0,
              top: 0,
              width: 1200,
              height: 900,
              scaleX: 1,
              scaleY: 1,
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 50,
              top: 50,
              width: 1100,
              height: 800,
              fill: '#dc143c',
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 70,
              top: 70,
              width: 1060,
              height: 760,
              fill: '#ffffff',
              selectable: false,
              evented: false
            },
            {
              type: 'i-text',
              left: 600,
              top: 150,
              text: '🎄 HOLIDAY SALE 🎄',
              fontSize: 64,
              fontFamily: 'Arial',
              fill: '#dc143c',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 280,
              text: 'SAVE BIG THIS SEASON',
              fontSize: 48,
              fontFamily: 'Arial',
              fill: '#228b22',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 400,
              text: 'Up to 70% OFF',
              fontSize: 56,
              fontFamily: 'Arial',
              fill: '#dc143c',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 520,
              text: 'Gifts • Electronics • Home • Fashion',
              fontSize: 28,
              fontFamily: 'Arial',
              fill: '#228b22',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 620,
              text: 'December 1st - January 5th',
              fontSize: 32,
              fontFamily: 'Arial',
              fill: '#dc143c',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 720,
              text: 'Shop Early • Best Selection • Free Shipping',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#666666',
              originX: 'center',
              originY: 'center'
            }
          ],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'spa-wellness-premium',
          name: 'Premium Spa & Wellness',
          description: 'Luxurious spa sign with calming design',
          category: 'business',
          width: 1200,
          height: 900,
          objects: [
            {
              type: 'image',
              src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=900&fit=crop',
              left: 0,
              top: 0,
              width: 1200,
              height: 900,
              scaleX: 1,
              scaleY: 1,
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 0,
              top: 0,
              width: 1200,
              height: 900,
              fill: 'rgba(0,0,0,0.4)',
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 100,
              top: 100,
              width: 1000,
              height: 700,
              fill: 'rgba(255,255,255,0.9)',
              stroke: '#8b5a96',
              strokeWidth: 3,
              selectable: false,
              evented: false
            },
            {
              type: 'i-text',
              left: 600,
              top: 200,
              text: 'SERENITY SPA',
              fontSize: 64,
              fontFamily: 'Georgia',
              fill: '#8b5a96',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 320,
              text: 'Wellness & Relaxation',
              fontSize: 28,
              fontFamily: 'Georgia',
              fill: '#666666',
              originX: 'center',
              originY: 'center',
              fontStyle: 'italic'
            },
            {
              type: 'i-text',
              left: 600,
              top: 420,
              text: 'Massage • Facials • Body Treatments',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#8b5a96',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 500,
              text: 'Open Daily 9AM - 8PM',
              fontSize: 22,
              fontFamily: 'Arial',
              fill: '#666666',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 600,
              text: 'Book Now: (555) 789-0123',
              fontSize: 20,
              fontFamily: 'Arial',
              fill: '#8b5a96',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 680,
              text: 'www.serenityspa.com',
              fontSize: 18,
              fontFamily: 'Arial',
              fill: '#999999',
              originX: 'center',
              originY: 'center'
            }
          ],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'bakery-artisan-premium',
          name: 'Artisan Bakery',
          description: 'Charming bakery sign with warm, inviting design',
          category: 'business',
          width: 1200,
          height: 900,
          objects: [
            {
              type: 'image',
              src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=900&fit=crop',
              left: 0,
              top: 0,
              width: 1200,
              height: 900,
              scaleX: 1,
              scaleY: 1,
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 0,
              top: 0,
              width: 1200,
              height: 900,
              fill: 'rgba(139,69,19,0.3)',
              selectable: false,
              evented: false
            },
            {
              type: 'rect',
              left: 80,
              top: 80,
              width: 1040,
              height: 740,
              fill: 'rgba(255,255,255,0.95)',
              stroke: '#8b4513',
              strokeWidth: 4,
              selectable: false,
              evented: false
            },
            {
              type: 'i-text',
              left: 600,
              top: 180,
              text: 'SWEET DELIGHTS',
              fontSize: 68,
              fontFamily: 'Georgia',
              fill: '#8b4513',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 300,
              text: 'Artisan Bakery & Pastries',
              fontSize: 32,
              fontFamily: 'Georgia',
              fill: '#d2691e',
              originX: 'center',
              originY: 'center',
              fontStyle: 'italic'
            },
            {
              type: 'i-text',
              left: 600,
              top: 420,
              text: 'Fresh Bread • Croissants • Cakes',
              fontSize: 26,
              fontFamily: 'Arial',
              fill: '#8b4513',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 500,
              text: 'Open 6AM - 6PM Daily',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#d2691e',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 580,
              text: 'Custom Orders Welcome',
              fontSize: 22,
              fontFamily: 'Arial',
              fill: '#8b4513',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 680,
              text: 'www.sweetdelightsbakery.com',
              fontSize: 18,
              fontFamily: 'Arial',
              fill: '#999999',
              originX: 'center',
              originY: 'center'
            }
          ],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'triangle-warning-sign',
          name: 'Triangle Warning Sign',
          description: 'Professional warning sign with triangle shape',
          category: 'business',
          width: 1200,
          height: 900,
          objects: [
            {
              type: 'triangle',
              left: 500,
              top: 200,
              width: 200,
              height: 200,
              fill: '#ff6b35',
              stroke: '#ffffff',
              strokeWidth: 8,
              selectable: false,
              evented: false
            },
            {
              type: 'i-text',
              left: 600,
              top: 350,
              text: 'WARNING',
              fontSize: 48,
              fontFamily: 'Arial',
              fill: '#ffffff',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 420,
              text: 'Construction Zone',
              fontSize: 32,
              fontFamily: 'Arial',
              fill: '#ffffff',
              originX: 'center',
              originY: 'center'
            },
            {
              type: 'i-text',
              left: 600,
              top: 480,
              text: 'Proceed with Caution',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#ffffff',
              originX: 'center',
              originY: 'center'
            }
          ],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'triangle-yield-sign',
          name: 'Triangle Yield Sign',
          description: 'Classic yield sign design',
          category: 'business',
          width: 1200,
          height: 900,
          objects: [
            {
              type: 'triangle',
              left: 500,
              top: 200,
              width: 200,
              height: 200,
              fill: '#ffff00',
              stroke: '#000000',
              strokeWidth: 6,
              selectable: false,
              evented: false
            },
            {
              type: 'i-text',
              left: 600,
              top: 350,
              text: 'YIELD',
              fontSize: 56,
              fontFamily: 'Arial',
              fill: '#000000',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            }
          ],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'triangle-info-sign',
          name: 'Triangle Info Sign',
          description: 'Information sign with triangle design',
          category: 'business',
          width: 1200,
          height: 900,
          objects: [
            {
              type: 'triangle',
              left: 500,
              top: 200,
              width: 200,
              height: 200,
              fill: '#4169e1',
              stroke: '#ffffff',
              strokeWidth: 6,
              selectable: false,
              evented: false
            },
            {
              type: 'i-text',
              left: 600,
              top: 320,
              text: 'INFO',
              fontSize: 48,
              fontFamily: 'Arial',
              fill: '#ffffff',
              originX: 'center',
              originY: 'center',
              fontWeight: 'bold'
            },
            {
              type: 'i-text',
              left: 600,
              top: 380,
              text: 'Important Information',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#ffffff',
              originX: 'center',
              originY: 'center'
            }
          ],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      setTemplates(defaultTemplates);
      localStorage.setItem('signBuilderTemplates', JSON.stringify(defaultTemplates));
    }
  };

  const saveTemplateToStorage = (updatedTemplates: Template[]) => {
    localStorage.setItem('signBuilderTemplates', JSON.stringify(updatedTemplates));
    setTemplates(updatedTemplates);
  };

  const createTemplateFromCanvas = () => {
    if (!currentCanvas) return;

    const canvasData = currentCanvas.toJSON();
    const template: Template = {
      id: `custom-${Date.now()}`,
      name: newTemplate.name,
      description: newTemplate.description,
      category: newTemplate.category,
      width: currentCanvas.width || 1200,
      height: currentCanvas.height || 900,
      objects: canvasData.objects || [],
      isCustom: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedTemplates = [...templates, template];
    saveTemplateToStorage(updatedTemplates);
    onTemplateSave(template);
    
    setNewTemplate({ name: '', description: '', category: 'business' });
    setShowCreateModal(false);
  };

  const deleteTemplate = (templateId: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      const updatedTemplates = templates.filter(t => t.id !== templateId);
      saveTemplateToStorage(updatedTemplates);
      onTemplateDelete(templateId);
    }
  };

  const exportTemplate = (template: Template) => {
    const dataStr = JSON.stringify(template, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.name.replace(/\s+/g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importTemplate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const template: Template = JSON.parse(e.target?.result as string);
          template.id = `imported-${Date.now()}`;
          template.isCustom = true;
          template.createdAt = new Date();
          template.updatedAt = new Date();
          
          const updatedTemplates = [...templates, template];
          saveTemplateToStorage(updatedTemplates);
        } catch (error) {
          alert('Invalid template file');
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredTemplates = templates.filter(template => 
    selectedCategory === 'all' || template.category === selectedCategory
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Template Library</h1>
          <p className="text-gray-600 mt-2">Choose from our collection or create your own</p>
        </div>
        
        <div className="flex space-x-3">
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".json"
              onChange={importTemplate}
              className="hidden"
            />
            <div className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </div>
          </label>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Template Preview */}
            <div className="h-48 bg-gray-100 flex items-center justify-center relative">
              {template.thumbnail ? (
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📋</div>
                  <div className="text-sm">{template.width} × {template.height}</div>
                </div>
              )}
              
              {template.isCustom && (
                <div className="absolute top-2 right-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
              {template.description && (
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              )}
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span className="capitalize">{template.category}</span>
                <span>{template.objects.length} objects</span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => onTemplateSelect(template)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  Use Template
                </button>
                
                <button
                  onClick={() => exportTemplate(template)}
                  className="px-3 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                  title="Export Template"
                >
                  <Download className="w-4 h-4" />
                </button>
                
                {template.isCustom && (
                  <button
                    onClick={() => deleteTemplate(template.id)}
                    className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                    title="Delete Template"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-4">Create New Template</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Name
                </label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter template name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Enter template description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                                 <select
                   value={newTemplate.category}
                   onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
                 >
                   <option value="business">Business & Retail</option>
                   <option value="event">Events & Celebrations</option>
                   <option value="sale">Sales & Promotions</option>
                   <option value="blank">Blank Canvas</option>
                   <option value="custom">Custom</option>
                 </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              
              <button
                onClick={createTemplateFromCanvas}
                disabled={!newTemplate.name || !currentCanvas}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2 inline" />
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateManager;
