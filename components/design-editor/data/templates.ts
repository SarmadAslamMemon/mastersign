import { CanvasObject } from '../types'

export interface Template {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  thumbnail: string // base64 data URL or placeholder
  dimensions: {
    width: number
    height: number
  }
  objects: TemplateObject[]
  colorVariations: ColorVariation[]
  textVariations?: TextVariation[]
}

export interface TemplateObject extends CanvasObject {
  isEditable: boolean
  isRequired: boolean
  placeholder?: string
  templateRole: 'background' | 'text' | 'logo' | 'decoration' | 'border'
}

export interface ColorVariation {
  id: string
  name: string
  preview: string // hex color for preview
  colors: { [objectId: string]: string }
}

export interface TextVariation {
  id: string
  name: string
  texts: { [objectId: string]: string }
}

// HARDCODED TEMPLATE DATA
export const TEMPLATE_CATEGORIES = [
  { id: 'business', name: 'Business Signs', icon: '🏪' },
  { id: 'safety', name: 'Safety Signs', icon: '⚠️' },
  { id: 'vehicle', name: 'Vehicle Graphics', icon: '🚗' },
  { id: 'property', name: 'Property Signs', icon: '🏡' },
  { id: 'marketing', name: 'Marketing Cards', icon: '🎨' }
]

export const MOCK_TEMPLATES: Template[] = [
  // BUSINESS SIGNS
  {
    id: 'open-closed-sign',
    name: 'Open/Closed Sign',
    description: 'Classic double-sided business hours sign',
    category: 'business',
    tags: ['hours', 'open', 'closed', 'retail'],
    thumbnail: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="100" fill="#2E7D32" stroke="#1B5E20" stroke-width="4"/>
        <text x="100" y="35" text-anchor="middle" fill="white" font-family="Arial" font-size="24" font-weight="bold">OPEN</text>
        <text x="100" y="65" text-anchor="middle" fill="white" font-family="Arial" font-size="14">MON-FRI 9AM-6PM</text>
      </svg>
    `),
    dimensions: { width: 400, height: 200 },
    objects: [
      {
        id: 'bg-1',
        type: 'rectangle',
        templateRole: 'background',
        isEditable: false,
        isRequired: true,
        properties: {
          left: 0, top: 0, width: 400, height: 200, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#2E7D32', stroke: '#1B5E20', strokeWidth: 8, opacity: 1,
          visible: true, selectable: false, evented: false, zIndex: 0
        }
      },
      {
        id: 'main-text-1',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: true,
        placeholder: 'OPEN',
        properties: {
          left: 200, top: 70, width: 200, height: 50, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#FFFFFF', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 1
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 48, fontWeight: 'bold', textAlign: 'center', text: 'OPEN'
        }
      },
      {
        id: 'hours-text-1',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: false,
        placeholder: 'Business Hours',
        properties: {
          left: 200, top: 130, width: 300, height: 30, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#FFFFFF', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 18, fontWeight: 'normal', textAlign: 'center', text: 'MON-FRI 9AM-6PM'
        }
      },
      {
        id: 'store-logo',
        type: 'image',
        templateRole: 'logo',
        isEditable: true,
        isRequired: false,
        placeholder: '🏪',
        properties: {
          left: 200, top: 160, width: 60, height: 60, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#000000', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 3
        },
        imageProperties: {
          src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0xMCAxMEg1MFY1MEgxMFYxMFoiIGZpbGw9IiM0Q0FGRjAiLz4KPHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgNUgyNVYyNUg1WiIgZmlsbD0iI0ZGRiIvPgo8L3N2Zz4KPC9zdmc+Cg==',
          filters: []
        }
      }
    ],
    colorVariations: [
      { id: 'green', name: 'Forest Green', preview: '#2E7D32', colors: { 'bg-1': '#2E7D32' } },
      { id: 'blue', name: 'Ocean Blue', preview: '#1976D2', colors: { 'bg-1': '#1976D2' } },
      { id: 'red', name: 'Cherry Red', preview: '#D32F2F', colors: { 'bg-1': '#D32F2F' } },
      { id: 'purple', name: 'Royal Purple', preview: '#7B1FA2', colors: { 'bg-1': '#7B1FA2' } }
    ],
    textVariations: [
      { id: 'open-closed', name: 'Open/Closed', texts: { 'main-text-1': 'OPEN' } },
      { id: 'welcome', name: 'Welcome', texts: { 'main-text-1': 'WELCOME' } },
      { id: 'sale', name: 'Sale', texts: { 'main-text-1': 'SALE' } }
    ]
  },

  {
    id: 'store-hours-sign',
    name: 'Store Hours',
    description: 'Professional business hours display',
    category: 'business',
    tags: ['hours', 'schedule', 'information'],
    thumbnail: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="150" fill="#FFFFFF" stroke="#333333" stroke-width="2"/>
        <text x="100" y="25" text-anchor="middle" fill="#333333" font-family="Arial" font-size="16" font-weight="bold">STORE HOURS</text>
        <text x="20" y="50" fill="#333333" font-family="Arial" font-size="12">MON-FRI: 9AM-8PM</text>
        <text x="20" y="70" fill="#333333" font-family="Arial" font-size="12">SATURDAY: 10AM-6PM</text>
        <text x="20" y="90" fill="#333333" font-family="Arial" font-size="12">SUNDAY: 12PM-5PM</text>
      </svg>
    `),
    dimensions: { width: 300, height: 400 },
    objects: [
      {
        id: 'bg-2',
        type: 'rectangle',
        templateRole: 'background',
        isEditable: false,
        isRequired: true,
        properties: {
          left: 0, top: 0, width: 300, height: 400, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#FFFFFF', stroke: '#333333', strokeWidth: 4, opacity: 1,
          visible: true, selectable: false, evented: false, zIndex: 0
        }
      },
      {
        id: 'title-2',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: true,
        placeholder: 'STORE HOURS',
        properties: {
          left: 150, top: 50, width: 250, height: 40, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#333333', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 1
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 24, fontWeight: 'bold', textAlign: 'center', text: 'STORE HOURS'
        }
      },
      {
        id: 'mon-fri-hours',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: false,
        placeholder: 'MON-FRI: 9AM-8PM',
        properties: {
          left: 50, top: 120, width: 200, height: 25, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#333333', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 16, fontWeight: 'normal', textAlign: 'left', text: 'MON-FRI: 9AM-8PM'
        }
      },
      {
        id: 'saturday-hours',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: false,
        placeholder: 'SATURDAY: 10AM-6PM',
        properties: {
          left: 50, top: 160, width: 200, height: 25, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#333333', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 3
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 16, fontWeight: 'normal', textAlign: 'left', text: 'SATURDAY: 10AM-6PM'
        }
      },
      {
        id: 'sunday-hours',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: false,
        placeholder: 'SUNDAY: 12PM-5PM',
        properties: {
          left: 50, top: 200, width: 200, height: 25, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#333333', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 4
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 16, fontWeight: 'normal', textAlign: 'left', text: 'SUNDAY: 12PM-5PM'
        }
      },
      {
        id: 'business-icon',
        type: 'image',
        templateRole: 'decoration',
        isEditable: true,
        isRequired: false,
        placeholder: '🏢',
        properties: {
          left: 150, top: 250, width: 50, height: 50, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#000000', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 5
        },
        imageProperties: {
          src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0xMCAxMEg0MFY0MEgxMFYxMFoiIGZpbGw9IiM2Nzc3OTAiLz4KPHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgNUgxNVYxNUg1WiIgZmlsbD0iI0ZGRiIvPgo8L3N2Zz4KPC9zdmc+Cg==',
          filters: []
        }
      }
    ],
    colorVariations: [
      { id: 'classic', name: 'Classic White', preview: '#FFFFFF', colors: { 'bg-2': '#FFFFFF' } },
      { id: 'cream', name: 'Cream', preview: '#FFF8E1', colors: { 'bg-2': '#FFF8E1' } },
      { id: 'light-blue', name: 'Light Blue', preview: '#E3F2FD', colors: { 'bg-2': '#E3F2FD' } }
    ]
  },

  // SAFETY SIGNS
  {
    id: 'caution-wet-floor',
    name: 'Caution Wet Floor',
    description: 'Standard wet floor warning sign',
    category: 'safety',
    tags: ['caution', 'wet floor', 'warning', 'safety'],
    thumbnail: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
        <polygon points="75,10 140,130 10,130" fill="#FFD600" stroke="#F57F17" stroke-width="3"/>
        <text x="75" y="40" text-anchor="middle" fill="#000000" font-family="Arial" font-size="16" font-weight="bold">!</text>
        <text x="75" y="80" text-anchor="middle" fill="#000000" font-family="Arial" font-size="12" font-weight="bold">CAUTION</text>
        <text x="75" y="100" text-anchor="middle" fill="#000000" font-family="Arial" font-size="10">WET FLOOR</text>
      </svg>
    `),
    dimensions: { width: 300, height: 300 },
    objects: [
      {
        id: 'triangle-bg',
        type: 'triangle',
        templateRole: 'background',
        isEditable: false,
        isRequired: true,
        properties: {
          left: 150, top: 150, width: 260, height: 260, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#FFD600', stroke: '#F57F17', strokeWidth: 6, opacity: 1,
          visible: true, selectable: false, evented: false, zIndex: 0
        }
      },
      {
        id: 'warning-icon',
        type: 'text',
        templateRole: 'decoration',
        isEditable: false,
        isRequired: true,
        properties: {
          left: 150, top: 80, width: 50, height: 50, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#000000', opacity: 1, visible: true, selectable: false, evented: false, zIndex: 1
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 48, fontWeight: 'bold', textAlign: 'center', text: '!'
        }
      },
      {
        id: 'caution-text',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: true,
        placeholder: 'CAUTION',
        properties: {
          left: 150, top: 150, width: 200, height: 30, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#000000', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 20, fontWeight: 'bold', textAlign: 'center', text: 'CAUTION'
        }
      },
                             {
         id: 'detail-text',
         type: 'text',
         templateRole: 'text',
         isEditable: true,
         isRequired: true,
         placeholder: 'WET FLOOR',
         properties: {
           left: 150, top: 190, width: 180, height: 25, angle: 0, scaleX: 1, scaleY: 1,
           fill: '#000000', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 3
         },
         textProperties: {
           fontFamily: 'Arial', fontSize: 16, fontWeight: 'normal', textAlign: 'center', text: 'WET FLOOR'
         }
       }
     ],
    colorVariations: [
      { id: 'yellow', name: 'Safety Yellow', preview: '#FFD600', colors: { 'triangle-bg': '#FFD600' } },
      { id: 'orange', name: 'Safety Orange', preview: '#FF9800', colors: { 'triangle-bg': '#FF9800' } },
      { id: 'red', name: 'Warning Red', preview: '#F44336', colors: { 'triangle-bg': '#F44336' } }
    ],
    textVariations: [
      { id: 'wet-floor', name: 'Wet Floor', texts: { 'detail-text': 'WET FLOOR' } },
      { id: 'slippery', name: 'Slippery Surface', texts: { 'detail-text': 'SLIPPERY SURFACE' } },
      { id: 'cleaning', name: 'Cleaning in Progress', texts: { 'detail-text': 'CLEANING IN PROGRESS' } }
    ]
  },

  // VEHICLE GRAPHICS
  {
    id: 'business-car-magnet',
    name: 'Business Car Magnet',
    description: 'Professional vehicle magnetic sign',
    category: 'vehicle',
    tags: ['car', 'magnet', 'business', 'mobile'],
    thumbnail: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="100" fill="#FFFFFF" stroke="#1976D2" stroke-width="3" rx="10"/>
        <text x="100" y="30" text-anchor="middle" fill="#1976D2" font-family="Arial" font-size="14" font-weight="bold">YOUR BUSINESS</text>
        <text x="100" y="50" text-anchor="middle" fill="#333333" font-family="Arial" font-size="10">Professional Services</text>
        <text x="100" y="75" text-anchor="middle" fill="#1976D2" font-family="Arial" font-size="12" font-weight="bold">(555) 123-4567</text>
      </svg>
    `),
    dimensions: { width: 480, height: 240 },
    objects: [
      {
        id: 'car-bg',
        type: 'rectangle',
        templateRole: 'background',
        isEditable: true,
        isRequired: true,
        properties: {
          left: 240, top: 120, width: 480, height: 240, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#FFFFFF', stroke: '#1976D2', strokeWidth: 6, opacity: 1,
          visible: true, selectable: true, evented: true, zIndex: 0
        }
      },
      {
        id: 'business-name',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: true,
        placeholder: 'YOUR BUSINESS NAME',
        properties: {
          left: 240, top: 80, width: 400, height: 40, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#1976D2', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 1
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 28, fontWeight: 'bold', textAlign: 'center', text: 'YOUR BUSINESS NAME'
        }
      },
      {
        id: 'service-line',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: false,
        placeholder: 'Service Description',
        properties: {
          left: 240, top: 130, width: 400, height: 25, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#333333', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 18, fontWeight: 'normal', textAlign: 'center', text: 'Professional Services'
        }
      },
      {
        id: 'phone-number',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: true,
        placeholder: 'Phone Number',
        properties: {
          left: 240, top: 180, width: 400, height: 30, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#1976D2', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 3
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 22, fontWeight: 'bold', textAlign: 'center', text: '(555) 123-4567'
        }
      }
    ],
    colorVariations: [
      { id: 'blue-white', name: 'Blue & White', preview: '#1976D2', colors: { 'car-bg': '#FFFFFF', 'business-name': '#1976D2', 'phone-number': '#1976D2' } },
      { id: 'green-white', name: 'Green & White', preview: '#388E3C', colors: { 'car-bg': '#FFFFFF', 'business-name': '#388E3C', 'phone-number': '#388E3C' } },
      { id: 'red-white', name: 'Red & White', preview: '#D32F2F', colors: { 'car-bg': '#FFFFFF', 'business-name': '#D32F2F', 'phone-number': '#D32F2F' } }
    ]
  },

  // PROPERTY SIGNS
  {
    id: 'for-sale-sign',
    name: 'For Sale Sign',
    description: 'Real estate for sale yard sign',
    category: 'property',
    tags: ['real estate', 'for sale', 'yard sign', 'property'],
    thumbnail: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="150" fill="#D32F2F" stroke="#B71C1C" stroke-width="3"/>
        <text x="100" y="40" text-anchor="middle" fill="white" font-family="Arial" font-size="18" font-weight="bold">FOR SALE</text>
        <text x="100" y="70" text-anchor="middle" fill="white" font-family="Arial" font-size="12">REALTY COMPANY</text>
        <text x="100" y="100" text-anchor="middle" fill="white" font-family="Arial" font-size="12">Agent Name</text>
        <text x="100" y="125" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">(555) 123-4567</text>
      </svg>
    `),
    dimensions: { width: 360, height: 270 },
    objects: [
      {
        id: 'sale-bg',
        type: 'rectangle',
        templateRole: 'background',
        isEditable: false,
        isRequired: true,
        properties: {
          left: 180, top: 135, width: 360, height: 270, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#D32F2F', stroke: '#B71C1C', strokeWidth: 6, opacity: 1,
          visible: true, selectable: false, evented: false, zIndex: 0
        }
      },
      {
        id: 'for-sale-text',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: true,
        placeholder: 'FOR SALE',
        properties: {
          left: 180, top: 80, width: 300, height: 50, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#FFFFFF', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 1
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 36, fontWeight: 'bold', textAlign: 'center', text: 'FOR SALE'
        }
      },
      {
        id: 'company-name',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: true,
        placeholder: 'REALTY COMPANY',
        properties: {
          left: 180, top: 140, width: 300, height: 25, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#FFFFFF', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 18, fontWeight: 'normal', textAlign: 'center', text: 'PREMIER REALTY'
        }
      },
      {
        id: 'agent-name',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: false,
        placeholder: 'Agent Name',
        properties: {
          left: 180, top: 175, width: 300, height: 25, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#FFFFFF', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 3
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 16, fontWeight: 'normal', textAlign: 'center', text: 'John Smith, Realtor'
        }
      },
      {
        id: 'contact-number',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: true,
        placeholder: 'Phone Number',
        properties: {
          left: 180, top: 220, width: 300, height: 30, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#FFFFFF', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 4
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 20, fontWeight: 'bold', textAlign: 'center', text: '(555) 123-4567'
        }
      },
      {
        id: 'property-image',
        type: 'image',
        templateRole: 'decoration',
        isEditable: true,
        isRequired: false,
        placeholder: '🏠',
        properties: {
          left: 180, top: 260, width: 80, height: 80, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#000000', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 5
        },
        imageProperties: {
          src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0xMCA0MEw0MCAxMEw3MCA0MFY3MEgxMFY0MFoiIGZpbGw9IiM2Nzc3OTAiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDEwSDMwVjMwSDEwWiIgZmlsbD0iI0ZGRiIvPgo8L3N2Zz4KPC9zdmc+Cg==',
          filters: []
        }
      }
    ],
    colorVariations: [
      { id: 'red', name: 'Classic Red', preview: '#D32F2F', colors: { 'sale-bg': '#D32F2F' } },
      { id: 'blue', name: 'Professional Blue', preview: '#1976D2', colors: { 'sale-bg': '#1976D2' } },
      { id: 'green', name: 'Success Green', preview: '#388E3C', colors: { 'sale-bg': '#388E3C' } }
    ],
    textVariations: [
      { id: 'for-sale', name: 'For Sale', texts: { 'for-sale-text': 'FOR SALE' } },
      { id: 'sold', name: 'Sold', texts: { 'for-sale-text': 'SOLD' } },
      { id: 'for-rent', name: 'For Rent', texts: { 'for-sale-text': 'FOR RENT' } }
    ]
  },

  // IMAGE CARD TEMPLATE
  {
    id: 'image-card',
    name: 'Image Card',
    description: 'Rectangle card with image background and editable text',
    category: 'marketing',
    tags: ['card', 'image', 'text', 'rectangle'],
    thumbnail: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="150" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
        <rect x="20" y="20" width="160" height="80" fill="#BBDEFB" stroke="#1976D2" stroke-width="1"/>
        <text x="100" y="120" text-anchor="middle" fill="#1976D2" font-family="Arial" font-size="16" font-weight="bold">IMAGE CARD</text>
      </svg>
    `),
    dimensions: { width: 600, height: 400 },
    objects: [
      {
        id: 'card-background',
        type: 'rectangle',
        templateRole: 'background',
        isEditable: false,
        isRequired: true,
        properties: {
          left: 500, top: 350, width: 600, height: 400, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#E3F2FD', stroke: '#1976D2', strokeWidth: 4, opacity: 1,
          visible: true, selectable: false, evented: false, zIndex: 0
        }
      },
      {
        id: 'image-placeholder',
        type: 'image',
        templateRole: 'background',
        isEditable: true,
        isRequired: false,
        placeholder: '🖼️',
        properties: {
          left: 500, top: 250, width: 500, height: 250, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#BBDEFB', stroke: '#1976D2', strokeWidth: 2, opacity: 1,
          visible: true, selectable: true, evented: true, zIndex: 1
        },
        imageProperties: {
          src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDUwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjQkJERUZCIi8+Cjx0ZXh0IHg9IjI1MCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTk3NkQyIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD4KPC9zdmc+Cg==',
          filters: []
        }
      },
      {
        id: 'main-title',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: true,
        placeholder: 'Main Title',
        properties: {
          left: 500, top: 520, width: 400, height: 40, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#1976D2', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 28, fontWeight: 'bold', textAlign: 'center', text: 'MAIN TITLE'
        }
      },
      {
        id: 'subtitle-text',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: false,
        placeholder: 'Subtitle or description',
        properties: {
          left: 500, top: 570, width: 400, height: 30, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#424242', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 3
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 18, fontWeight: 'normal', textAlign: 'center', text: 'Subtitle or description text'
        }
      }
    ],
    colorVariations: [
      { id: 'blue', name: 'Ocean Blue', preview: '#1976D2', colors: { 'card-background': '#E3F2FD' } },
      { id: 'green', name: 'Forest Green', preview: '#388E3C', colors: { 'card-background': '#E8F5E8' } },
      { id: 'purple', name: 'Royal Purple', preview: '#7B1FA2', colors: { 'card-background': '#F3E5F5' } },
      { id: 'orange', name: 'Sunset Orange', preview: '#F57C00', colors: { 'card-background': '#FFF3E0' } }
    ],
    textVariations: [
      { id: 'business', name: 'Business', texts: { 'main-title': 'BUSINESS CARD', 'subtitle-text': 'Professional business information' } },
      { id: 'event', name: 'Event', texts: { 'main-title': 'EVENT CARD', 'subtitle-text': 'Event details and information' } },
      { id: 'product', name: 'Product', texts: { 'main-title': 'PRODUCT CARD', 'subtitle-text': 'Product description and features' } }
    ]
  },

  // SIMPLE RECTANGLE CARD TEMPLATE
  {
    id: 'simple-rectangle-card',
    name: 'Simple Rectangle Card',
    description: 'Basic rectangle card with editable text and background',
    category: 'marketing',
    tags: ['card', 'rectangle', 'text', 'simple'],
    thumbnail: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="150" fill="#FFE0B2" stroke="#FF9800" stroke-width="3"/>
        <text x="100" y="60" text-anchor="middle" fill="#E65100" font-family="Arial" font-size="20" font-weight="bold">SIMPLE CARD</text>
        <text x="100" y="90" text-anchor="middle" fill="#E65100" font-family="Arial" font-size="14">Editable text</text>
      </svg>
    `),
    dimensions: { width: 500, height: 300 },
    objects: [
      {
        id: 'card-bg',
        type: 'rectangle',
        templateRole: 'background',
        isEditable: false,
        isRequired: true,
        properties: {
          left: 500, top: 350, width: 500, height: 300, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#FFE0B2', stroke: '#FF9800', strokeWidth: 6, opacity: 1,
          visible: true, selectable: false, evented: false, zIndex: 0
        }
      },
      {
        id: 'title-text',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: true,
        placeholder: 'Card Title',
        properties: {
          left: 500, top: 250, width: 300, height: 50, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#E65100', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 1
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 32, fontWeight: 'bold', textAlign: 'center', text: 'CARD TITLE'
        }
      },
      {
        id: 'description-text',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: false,
        placeholder: 'Description text',
        properties: {
          left: 500, top: 320, width: 300, height: 40, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#E65100', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 20, fontWeight: 'normal', textAlign: 'center', text: 'Description text goes here'
        }
      },
      {
        id: 'footer-text',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: false,
        placeholder: 'Footer text',
        properties: {
          left: 500, top: 380, width: 300, height: 30, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#E65100', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 3
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 16, fontWeight: 'normal', textAlign: 'center', text: 'Footer information'
        }
      }
    ],
    colorVariations: [
      { id: 'orange', name: 'Sunset Orange', preview: '#FF9800', colors: { 'card-bg': '#FFE0B2' } },
      { id: 'blue', name: 'Ocean Blue', preview: '#2196F3', colors: { 'card-bg': '#E3F2FD' } },
      { id: 'green', name: 'Nature Green', preview: '#4CAF50', colors: { 'card-bg': '#E8F5E8' } },
      { id: 'purple', name: 'Royal Purple', preview: '#9C27B0', colors: { 'card-bg': '#F3E5F5' } }
    ],
    textVariations: [
      { id: 'business', name: 'Business', texts: { 'title-text': 'BUSINESS CARD', 'description-text': 'Professional business information' } },
      { id: 'event', name: 'Event', texts: { 'title-text': 'EVENT CARD', 'description-text': 'Event details and information' } },
      { id: 'welcome', name: 'Welcome', texts: { 'title-text': 'WELCOME', 'description-text': 'Welcome message and details' } }
    ]
  },
  // CUSTOM BANNER TEMPLATE FOR TESTING BACKGROUND RENDERING
  {
    id: 'custom-banner-template',
    name: 'Custom Banner Template',
    description: 'A custom template with heading, banner area, and note section for testing background rendering',
    category: 'marketing',
    tags: ['custom', 'banner', 'heading', 'note', 'test'],
    thumbnail: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#f0f0f0" stroke="#ccc" stroke-width="2"/>
        <rect x="20" y="20" width="160" height="30" fill="#4A90E2" stroke="#2E5BBA" stroke-width="1"/>
        <rect x="20" y="60" width="160" height="40" fill="#FF6B6B" stroke="#E53E3E" stroke-width="1"/>
        <rect x="20" y="110" width="160" height="20" fill="#4ECDC4" stroke="#38B2AC" stroke-width="1"/>
        <text x="100" y="37" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">HEADING</text>
        <text x="100" y="80" text-anchor="middle" fill="white" font-family="Arial" font-size="10">BANNER</text>
        <text x="100" y="123" text-anchor="middle" fill="white" font-family="Arial" font-size="8">NOTE</text>
      </svg>
    `),
    dimensions: { width: 1200, height: 800 },
    objects: [
      {
        id: 'main-banner-area',
        type: 'rectangle',
        templateRole: 'background',
        isEditable: true,
        isRequired: true,
        placeholder: 'Main Banner Area',
        properties: {
          left: 600, top: 400, width: 1000, height: 600, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#f8f9fa', stroke: '#4A90E2', strokeWidth: 3, opacity: 1,
          visible: true, selectable: true, evented: true, zIndex: 1
        }
      },
      {
        id: 'heading-text',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: true,
        placeholder: 'MAIN HEADING',
        properties: {
          left: 600, top: 150, width: 800, height: 80, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#2C3E50', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
        },
        textProperties: {
          fontFamily: 'Arial Black', fontSize: 64, fontWeight: 'bold', textAlign: 'center', text: 'MAIN HEADING'
        }
      },
      {
        id: 'subheading-text',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: false,
        placeholder: 'Subheading text goes here',
        properties: {
          left: 600, top: 250, width: 600, height: 40, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#7F8C8D', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 28, fontWeight: 'normal', textAlign: 'center', text: 'Subheading text goes here'
        }
      },
      {
        id: 'note-section',
        type: 'rectangle',
        templateRole: 'text',
        isEditable: true,
        isRequired: false,
        placeholder: 'Note Section',
        properties: {
          left: 1000, top: 700, width: 300, height: 150, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#E8F5E8', stroke: '#4CAF50', strokeWidth: 2, opacity: 1,
          visible: true, selectable: true, evented: true, zIndex: 2
        }
      },
      {
        id: 'note-text',
        type: 'text',
        templateRole: 'text',
        isEditable: true,
        isRequired: false,
        placeholder: 'Important note text',
        properties: {
          left: 1000, top: 750, width: 250, height: 80, angle: 0, scaleX: 1, scaleY: 1,
          fill: '#2E7D32', opacity: 1, visible: true, selectable: true, evented: true, zIndex: 3
        },
        textProperties: {
          fontFamily: 'Arial', fontSize: 18, fontWeight: 'normal', textAlign: 'left', text: 'Important note text goes here. This section can contain additional information or reminders.'
        }
      },
      {
        id: 'banner-image',
        type: 'image',
        templateRole: 'background',
        isEditable: true,
        isRequired: false,
        placeholder: 'Banner Image',
        properties: {
          left: 600, top: 500, width: 400, height: 200, angle: 0, scaleX: 1, scaleY: 1,
          opacity: 1, visible: true, selectable: true, evented: true, zIndex: 2
        },
        imageProperties: {
          src: 'https://qwwptkqqybufsbeeyvcr.supabase.co/storage/v1/object/public/Master%20Sign/assets/Business%20Signage/20240118_151230.jpg',
          filters: []
        }
      }
    ],
    colorVariations: [
      { id: 'blue', name: 'Professional Blue', preview: '#4A90E2', colors: { 'main-banner-area': '#f8f9fa' } },
      { id: 'green', name: 'Nature Green', preview: '#4CAF50', colors: { 'main-banner-area': '#f1f8e9' } },
      { id: 'purple', name: 'Royal Purple', preview: '#9C27B0', colors: { 'main-banner-area': '#f3e5f5' } },
      { id: 'orange', name: 'Warm Orange', preview: '#FF9800', colors: { 'main-banner-area': '#fff3e0' } }
    ],
    textVariations: [
      { id: 'business', name: 'Business', texts: { 'heading-text': 'BUSINESS BANNER', 'subheading-text': 'Professional business solutions' } },
      { id: 'event', name: 'Event', texts: { 'heading-text': 'EVENT BANNER', 'subheading-text': 'Join us for an amazing event' } },
      { id: 'promotion', name: 'Promotion', texts: { 'heading-text': 'SPECIAL OFFER', 'subheading-text': 'Limited time promotion' } }
    ]
  }
]

// UTILITY FUNCTIONS
export const getTemplatesByCategory = (categoryId: string): Template[] => {
  return MOCK_TEMPLATES.filter(template => template.category === categoryId)
}

export const getTemplateById = (id: string): Template | undefined => {
  return MOCK_TEMPLATES.find(template => template.id === id)
}

export const getAllTemplates = (): Template[] => {
  return MOCK_TEMPLATES
}

export const getTemplateCategories = () => {
  return TEMPLATE_CATEGORIES
}

export const searchTemplates = (query: string, tags?: string[]): Template[] => {
  return MOCK_TEMPLATES.filter(template => {
    const matchesQuery = query === '' || 
      template.name.toLowerCase().includes(query.toLowerCase()) ||
      template.description.toLowerCase().includes(query.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    
    const matchesTags = !tags || tags.length === 0 || 
      tags.some(tag => template.tags.includes(tag))
    
    return matchesQuery && matchesTags
  })
}
