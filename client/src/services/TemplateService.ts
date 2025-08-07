export interface EditableElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'background';
  x: number;
  y: number;
  width: number;
  height: number;
  properties: {
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    fontColor?: string;
    fontWeight?: string;
    fontStyle?: string;
    imageUrl?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    opacity?: number;
    rotation?: number;
    zIndex?: number;
  };
  isEditable: boolean;
  isRequired: boolean;
  placeholder?: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  width: number;
  height: number;
  unit: 'in' | 'cm' | 'mm';
  preview: string;
  thumbnail: string;
  elements: EditableElement[];
  tags: string[];
  popular: boolean;
  featured: boolean;
  basePrice: number;
  description: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  templates: Template[];
}

export class TemplateService {
  private static categories: TemplateCategory[] = [
    {
      id: 'clothes',
      name: 'Clothes & Fashion',
      icon: '👕',
      description: 'Professional clothing and fashion templates',
      templates: [
        {
          id: 'clothes-fashion-001',
          name: 'Fashion Boutique Sign',
          category: 'clothes',
          subCategory: 'fashion',
          width: 24,
          height: 18,
          unit: 'in',
          preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkY2QjlEIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GYXNoaW9uIEJvdXRpcXVlPC90ZXh0Pgo8L3N2Zz4=',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRkY2QjlEIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZhc2hpb248L3RleHQ+Cjwvc3ZnPg==',
          description: 'Elegant fashion boutique sign with modern typography',
          tags: ['fashion', 'boutique', 'elegant', 'modern'],
          popular: true,
          featured: true,
          basePrice: 45,
          elements: [
            {
              id: 'title',
              type: 'text',
              x: 50,
              y: 30,
              width: 300,
              height: 60,
              properties: {
                text: 'FASHION BOUTIQUE',
                fontSize: 48,
                fontFamily: 'Arial',
                fontColor: '#FF6B9D',
                fontWeight: 'bold',
                fontStyle: 'normal'
              },
              isEditable: true,
              isRequired: true,
              placeholder: 'Enter your business name'
            },
            {
              id: 'subtitle',
              type: 'text',
              x: 50,
              y: 100,
              width: 250,
              height: 40,
              properties: {
                text: 'Elegant Style, Affordable Prices',
                fontSize: 24,
                fontFamily: 'Arial',
                fontColor: '#333333',
                fontWeight: 'normal',
                fontStyle: 'italic'
              },
              isEditable: true,
              isRequired: false,
              placeholder: 'Enter your tagline'
            },
            {
              id: 'contact',
              type: 'text',
              x: 50,
              y: 150,
              width: 200,
              height: 30,
              properties: {
                text: 'Call: (555) 123-4567',
                fontSize: 18,
                fontFamily: 'Arial',
                fontColor: '#666666',
                fontWeight: 'normal'
              },
              isEditable: true,
              isRequired: true,
              placeholder: 'Enter contact information'
            },
            {
              id: 'logo-placeholder',
              type: 'image',
              x: 350,
              y: 50,
              width: 100,
              height: 100,
                             properties: {
                 imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkY2QjlEIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TE9HTzwvdGV4dD4KPC9zdmc+',
                 borderRadius: 50
               },
              isEditable: true,
              isRequired: false,
              placeholder: 'Upload your logo'
            }
          ]
        },
        {
          id: 'clothes-fashion-002',
          name: 'Clothing Store Sign',
          category: 'clothes',
          subCategory: 'retail',
          width: 24,
          height: 18,
          unit: 'in',
          preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNEVDRENDIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DbG90aGluZyBTdG9yZTwvdGV4dD4KPC9zdmc+',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNEVDRENDIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNsb3RoaW5nPC90ZXh0Pgo8L3N2Zz4=',
          description: 'Modern clothing store sign with bold typography',
          tags: ['clothing', 'store', 'modern', 'bold'],
          popular: true,
          featured: false,
          basePrice: 40,
          elements: [
            {
              id: 'title',
              type: 'text',
              x: 50,
              y: 40,
              width: 350,
              height: 80,
              properties: {
                text: 'STYLE STORE',
                fontSize: 56,
                fontFamily: 'Impact',
                fontColor: '#4ECDC4',
                fontWeight: 'bold'
              },
              isEditable: true,
              isRequired: true,
              placeholder: 'Enter your store name'
            },
            {
              id: 'sale-text',
              type: 'text',
              x: 50,
              y: 130,
              width: 200,
              height: 50,
              properties: {
                text: 'SALE 50% OFF',
                fontSize: 32,
                fontFamily: 'Arial',
                fontColor: '#FF6B6B',
                fontWeight: 'bold'
              },
              isEditable: true,
              isRequired: false,
              placeholder: 'Enter sale text'
            },
            {
              id: 'address',
              type: 'text',
              x: 50,
              y: 190,
              width: 250,
              height: 30,
              properties: {
                text: '123 Fashion Ave, Style City',
                fontSize: 16,
                fontFamily: 'Arial',
                fontColor: '#333333'
              },
              isEditable: true,
              isRequired: true,
              placeholder: 'Enter your address'
            }
          ]
        }
      ]
    },
    {
      id: 'vehicle',
      name: 'Vehicle Graphics',
      icon: '🚗',
      description: 'Professional vehicle wrap and graphics templates',
      templates: [
        {
          id: 'vehicle-graphics-001',
          name: 'Food Truck Wrap',
          category: 'vehicle',
          subCategory: 'food-truck',
          width: 36,
          height: 12,
          unit: 'in',
          preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZBNTAwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Gb29kIFRydWNrPC90ZXh0Pgo8L3N2Zz4=',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRkZBNTAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvb2QgVHJ1Y2s8L3RleHQ+Cjwvc3ZnPg==',
          description: 'Eye-catching food truck wrap design',
          tags: ['food-truck', 'wrap', 'eye-catching', 'professional'],
          popular: true,
          featured: true,
          basePrice: 120,
          elements: [
            {
              id: 'business-name',
              type: 'text',
              x: 50,
              y: 50,
              width: 400,
              height: 80,
              properties: {
                text: 'TASTY BURGERS',
                fontSize: 64,
                fontFamily: 'Impact',
                fontColor: '#FFA500',
                fontWeight: 'bold'
              },
              isEditable: true,
              isRequired: true,
              placeholder: 'Enter your business name'
            },
            {
              id: 'tagline',
              type: 'text',
              x: 50,
              y: 140,
              width: 350,
              height: 40,
              properties: {
                text: 'Best Burgers in Town!',
                fontSize: 28,
                fontFamily: 'Arial',
                fontColor: '#FFFFFF',
                fontWeight: 'bold'
              },
              isEditable: true,
              isRequired: false,
              placeholder: 'Enter your tagline'
            },
            {
              id: 'phone',
              type: 'text',
              x: 50,
              y: 200,
              width: 200,
              height: 30,
              properties: {
                text: 'Call: (555) 123-4567',
                fontSize: 20,
                fontFamily: 'Arial',
                fontColor: '#FFFFFF',
                fontWeight: 'bold'
              },
              isEditable: true,
              isRequired: true,
              placeholder: 'Enter phone number'
            },
            {
              id: 'food-image',
              type: 'image',
              x: 500,
              y: 50,
              width: 150,
              height: 150,
                             properties: {
                 imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRkZBNTAwIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+RjTwvdGV4dD4KPC9zdmc+',
                 borderRadius: 10
               },
              isEditable: true,
              isRequired: false,
              placeholder: 'Upload food image'
            }
          ]
        },
        {
          id: 'vehicle-graphics-002',
          name: 'Delivery Van Wrap',
          category: 'vehicle',
          subCategory: 'delivery',
          width: 36,
          height: 12,
          unit: 'in',
          preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNDVCN0QxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5EZWxpdmVyeSBWYW48L3RleHQ+Cjwvc3ZnPg==',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNDVCN0QxIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRlbGl2ZXJ5PC90ZXh0Pgo8L3N2Zz4=',
          description: 'Professional delivery van graphics',
          tags: ['delivery', 'van', 'professional', 'logistics'],
          popular: true,
          featured: false,
          basePrice: 100,
          elements: [
            {
              id: 'company-name',
              type: 'text',
              x: 50,
              y: 60,
              width: 350,
              height: 70,
              properties: {
                text: 'FAST DELIVERY',
                fontSize: 52,
                fontFamily: 'Arial',
                fontColor: '#45B7D1',
                fontWeight: 'bold'
              },
              isEditable: true,
              isRequired: true,
              placeholder: 'Enter company name'
            },
            {
              id: 'service-text',
              type: 'text',
              x: 50,
              y: 140,
              width: 300,
              height: 40,
              properties: {
                text: 'Same Day Delivery Available',
                fontSize: 24,
                fontFamily: 'Arial',
                fontColor: '#333333',
                fontWeight: 'normal'
              },
              isEditable: true,
              isRequired: false,
              placeholder: 'Enter service description'
            },
            {
              id: 'contact-info',
              type: 'text',
              x: 50,
              y: 200,
              width: 250,
              height: 30,
              properties: {
                text: 'www.fastdelivery.com | (555) 987-6543',
                fontSize: 18,
                fontFamily: 'Arial',
                fontColor: '#666666'
              },
              isEditable: true,
              isRequired: true,
              placeholder: 'Enter contact information'
            }
          ]
        }
      ]
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      icon: '🏠',
      description: 'Professional real estate signs and marketing materials',
      templates: [
        {
          id: 'real-estate-001',
          name: 'For Sale Sign',
          category: 'real-estate',
          subCategory: 'for-sale',
          width: 24,
          height: 18,
          unit: 'in',
          preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjOEI0NTEzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Gb3IgU2FsZTwvdGV4dD4KPC9zdmc+',
          thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjOEI0NTEzIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvciBTYWxlPC90ZXh0Pgo8L3N2Zz4=',
          description: 'Classic for sale sign with agent information',
          tags: ['for-sale', 'real-estate', 'classic', 'agent'],
          popular: true,
          featured: true,
          basePrice: 35,
          elements: [
            {
              id: 'for-sale-text',
              type: 'text',
              x: 50,
              y: 30,
              width: 300,
              height: 60,
              properties: {
                text: 'FOR SALE',
                fontSize: 48,
                fontFamily: 'Impact',
                fontColor: '#8B4513',
                fontWeight: 'bold'
              },
              isEditable: true,
              isRequired: true,
              placeholder: 'Enter status text'
            },
            {
              id: 'agent-name',
              type: 'text',
              x: 50,
              y: 100,
              width: 250,
              height: 40,
              properties: {
                text: 'John Smith Realty',
                fontSize: 24,
                fontFamily: 'Arial',
                fontColor: '#333333',
                fontWeight: 'bold'
              },
              isEditable: true,
              isRequired: true,
              placeholder: 'Enter agent/company name'
            },
            {
              id: 'phone',
              type: 'text',
              x: 50,
              y: 150,
              width: 200,
              height: 30,
              properties: {
                text: '(555) 123-4567',
                fontSize: 20,
                fontFamily: 'Arial',
                fontColor: '#666666',
                fontWeight: 'bold'
              },
              isEditable: true,
              isRequired: true,
              placeholder: 'Enter phone number'
            },
            {
              id: 'agent-photo',
              type: 'image',
              x: 350,
              y: 50,
              width: 80,
              height: 80,
                             properties: {
                 imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM4QjQ1MTMiLz4KPHRleHQgeD0iNDAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BR0VOVDwvdGV4dD4KPC9zdmc+',
                 borderRadius: 40
               },
              isEditable: true,
              isRequired: false,
              placeholder: 'Upload agent photo'
            }
          ]
        }
      ]
    },
    {
      id: 'business',
      name: 'Business & Corporate',
      icon: '💼',
      description: 'Professional business signs and corporate materials',
      templates: [
        {
          id: 'business-001',
          name: 'Office Sign',
          category: 'business',
          subCategory: 'office',
          width: 24,
          height: 18,
          unit: 'in',
                     preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMkMzRTUwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5PZmZpY2UgU2lnbjwvdGV4dD4KPC9zdmc+',
           thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMkMzRTUwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk9mZmljZTwvdGV4dD4KPC9zdmc+',
          description: 'Professional office signage',
          tags: ['office', 'professional', 'corporate', 'clean'],
          popular: true,
          featured: true,
          basePrice: 50,
          elements: [
            {
              id: 'company-name',
              type: 'text',
              x: 50,
              y: 40,
              width: 350,
              height: 70,
              properties: {
                text: 'ACME CORPORATION',
                fontSize: 52,
                fontFamily: 'Arial',
                fontColor: '#2C3E50',
                fontWeight: 'bold'
              },
              isEditable: true,
              isRequired: true,
              placeholder: 'Enter company name'
            },
            {
              id: 'tagline',
              type: 'text',
              x: 50,
              y: 120,
              width: 300,
              height: 40,
              properties: {
                text: 'Excellence in Every Detail',
                fontSize: 24,
                fontFamily: 'Arial',
                fontColor: '#7F8C8D',
                fontWeight: 'normal',
                fontStyle: 'italic'
              },
              isEditable: true,
              isRequired: false,
              placeholder: 'Enter company tagline'
            },
            {
              id: 'contact',
              type: 'text',
              x: 50,
              y: 170,
              width: 250,
              height: 30,
              properties: {
                text: 'www.acmecorp.com | (555) 987-6543',
                fontSize: 16,
                fontFamily: 'Arial',
                fontColor: '#34495E'
              },
              isEditable: true,
              isRequired: true,
              placeholder: 'Enter contact information'
            }
          ]
        }
      ]
    }
  ];

  static getCategories(): TemplateCategory[] {
    return this.categories;
  }

  static getCategoryById(id: string): TemplateCategory | undefined {
    return this.categories.find(cat => cat.id === id);
  }

  static getTemplatesByCategory(categoryId: string): Template[] {
    const category = this.getCategoryById(categoryId);
    return category ? category.templates : [];
  }

  static getTemplateById(templateId: string): Template | undefined {
    for (const category of this.categories) {
      const template = category.templates.find(t => t.id === templateId);
      if (template) return template;
    }
    return undefined;
  }

  static searchTemplates(query: string): Template[] {
    const results: Template[] = [];
    const searchTerm = query.toLowerCase();

    for (const category of this.categories) {
      for (const template of category.templates) {
        if (
          template.name.toLowerCase().includes(searchTerm) ||
          template.description.toLowerCase().includes(searchTerm) ||
          template.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          template.category.toLowerCase().includes(searchTerm) ||
          template.subCategory.toLowerCase().includes(searchTerm)
        ) {
          results.push(template);
        }
      }
    }

    return results;
  }

  static getPopularTemplates(): Template[] {
    const popular: Template[] = [];
    for (const category of this.categories) {
      popular.push(...category.templates.filter(t => t.popular));
    }
    return popular;
  }

  static getFeaturedTemplates(): Template[] {
    const featured: Template[] = [];
    for (const category of this.categories) {
      featured.push(...category.templates.filter(t => t.featured));
    }
    return featured;
  }

  static getTemplatesByPriceRange(minPrice: number, maxPrice: number): Template[] {
    const results: Template[] = [];
    for (const category of this.categories) {
      results.push(...category.templates.filter(t => t.basePrice >= minPrice && t.basePrice <= maxPrice));
    }
    return results;
  }
} 