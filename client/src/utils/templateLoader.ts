import { Template, TemplateCategory } from '@/types/template';

// Import all template JSON files
// Note: In a real application, these would be loaded from an API
// For now, we'll create a mock data structure that can be easily replaced

const mockTemplates: Template[] = [
  // Expo/Display templates
  {
    id: "expo-display-stand-basic",
    name: "Expo Display Stand - Modern Gradient",
    categories: [
      { mainCategory: "Expo/Display" },
      { mainCategory: "Marketing" }
    ],
    thumbnail: "/assets/templates/expo-display/stand-basic-thumb.png",
    width: 800,
    height: 2000,
    description: "A vertical expo stand with gradient background and modern typography.",
    tags: ["expo", "stand", "display", "vertical", "gradient"],
    svgAssets: ["/assets/icons/camera.svg", "/assets/icons/icon-placeholder.svg"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 400,
          y: 1000,
          props: {
            width: 800,
            height: 2000,
            fill: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            radius: 20
          }
        },
        titleCard: {
          id: "titleCard",
          type: "rectangle",
          x: 400,
          y: 300,
          props: {
            width: 600,
            height: 150,
            fill: "rgba(255, 255, 255, 0.95)",
            radius: 16,
            shadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
          }
        },
        title: {
          id: "title",
          type: "text",
          x: 400,
          y: 280,
          props: {
            text: "INNOVATE FUTURE",
            fontSize: 48,
            fontWeight: "800",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#1a202c"
          }
        },
        subtitle: {
          id: "subtitle",
          type: "text",
          x: 400,
          y: 340,
          props: {
            text: "Technology Solutions & Consulting",
            fontSize: 20,
            textAlign: "center",
            fontFamily: "Inter",
            color: "#4a5568"
          }
        },
        decorativeBlob: {
          id: "decorativeBlob",
          type: "ellipse",
          x: 150,
          y: 600,
          props: {
            width: 200,
            height: 300,
            fill: "rgba(255, 255, 255, 0.15)",
            radius: 100
          }
        },
        imagePlaceholder: {
          id: "imagePlaceholder",
          type: "rectangle",
          x: 400,
          y: 1000,
          props: {
            src: "",
            width: 500,
            height: 400,
            radius: 20,
            fill: "rgba(255, 255, 255, 0.1)",
            stroke: "rgba(255, 255, 255, 0.3)",
            strokeWidth: 2
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Enhanced Accessories templates
  {
    id: "mounting-hardware-modern",
    name: "Premium Mounting Hardware Guide",
    categories: [
      { mainCategory: "Accessories", subCategory: "Mounting Hardware for Signs and Banners" }
    ],
    thumbnail: "/assets/templates/accessories/mounting-hardware-modern-thumb.png",
    width: 600,
    height: 800,
    description: "Modern mounting hardware diagram with gradient design.",
    tags: ["accessories", "mounting", "hardware", "premium", "guide"],
    svgAssets: ["/assets/icons/icon-placeholder.svg"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 300,
          y: 400,
          props: {
            width: 600,
            height: 800,
            fill: "linear-gradient(180deg, #f7fafc 0%, #e2e8f0 100%)",
            radius: 12
          }
        },
        headerCard: {
          id: "headerCard",
          type: "rectangle",
          x: 300,
          y: 120,
          props: {
            width: 520,
            height: 100,
            fill: "linear-gradient(135deg, #4299e1 0%, #3182ce 100%)",
            radius: 16,
            shadow: "0 4px 16px rgba(66, 153, 225, 0.3)"
          }
        },
        title: {
          id: "title",
          type: "text",
          x: 300,
          y: 120,
          props: {
            text: "Premium Mounting System",
            fontSize: 28,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff"
          }
        },
        bracket: {
          id: "bracket",
          type: "rectangle",
          x: 300,
          y: 300,
          props: {
            width: 180,
            height: 40,
            fill: "linear-gradient(135deg, #718096 0%, #4a5568 100%)",
            radius: 8,
            shadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
          }
        },
        bracketLabel: {
          id: "bracketLabel",
          type: "text",
          x: 300,
          y: 360,
          props: {
            text: "Wall Bracket - Heavy Duty",
            fontSize: 16,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#2d3748"
          }
        },
        screw: {
          id: "screw",
          type: "ellipse",
          x: 300,
          y: 250,
          props: {
            width: 30,
            height: 30,
            fill: "linear-gradient(135deg, #a0aec0 0%, #718096 100%)",
            shadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          }
        },
        screwLabel: {
          id: "screwLabel",
          type: "text",
          x: 300,
          y: 220,
          props: {
            text: "M8 Mounting Screw",
            fontSize: 14,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#4a5568"
          }
        },
        instructionCard: {
          id: "instructionCard",
          type: "rectangle",
          x: 300,
          y: 500,
          props: {
            width: 480,
            height: 200,
            fill: "rgba(255, 255, 255, 0.9)",
            radius: 12,
            shadow: "0 2px 12px rgba(0, 0, 0, 0.08)"
          }
        },
        instructions: {
          id: "instructions",
          type: "text",
          x: 300,
          y: 500,
          props: {
            text: "Installation Instructions:\n\n1. Mark mounting points\n2. Drill pilot holes\n3. Secure with provided screws\n4. Test stability before use",
            fontSize: 14,
            textAlign: "center",
            fontFamily: "Inter",
            color: "#2d3748",
            lineHeight: 1.6
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Enhanced Laser Engraving templates
  {
    id: "laser-engraving-nameplate-premium",
    name: "Premium Laser Engraved Nameplate",
    categories: [{ mainCategory: "Laser Engraving" }],
    thumbnail: "/assets/templates/laser-engraving/nameplate-premium-thumb.png",
    width: 400,
    height: 120,
    description: "Premium nameplate with gradient background and elegant typography.",
    tags: ["laser", "engraving", "nameplate", "premium", "executive"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 200,
          y: 60,
          props: {
            width: 400,
            height: 120,
            fill: "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
            radius: 8,
            shadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
          }
        },
        accentStripe: {
          id: "accentStripe",
          type: "rectangle",
          x: 200,
          y: 35,
          props: {
            width: 400,
            height: 8,
            fill: "linear-gradient(90deg, #4299e1 0%, #3182ce 100%)",
            radius: 4
          }
        },
        companyName: {
          id: "companyName",
          type: "text",
          x: 200,
          y: 70,
          props: {
            text: "ENTERPRISE SOLUTIONS",
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "0.05em"
          }
        },
        contactInfo: {
          id: "contactInfo",
          type: "text",
          x: 200,
          y: 95,
          props: {
            text: "contact@enterprise.com • +1 (555) 123-4567",
            fontSize: 11,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#a0aec0"
          }
        },
        logoPlaceholder: {
          id: "logoPlaceholder",
          type: "ellipse",
          x: 80,
          y: 60,
          props: {
            width: 40,
            height: 40,
            fill: "rgba(255, 255, 255, 0.1)",
            stroke: "rgba(255, 255, 255, 0.3)",
            strokeWidth: 1
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Enhanced Banners/Flags templates
  {
    id: "banner-horizontal-gradient",
    name: "Horizontal Banner - Gradient Pro",
    categories: [
      { mainCategory: "Banners/Flags" },
      { mainCategory: "Marketing" }
    ],
    thumbnail: "/assets/templates/banners-flags/horizontal-banner-gradient-thumb.png",
    width: 1200,
    height: 400,
    description: "Professional horizontal banner with vibrant gradient and modern design.",
    tags: ["banner", "horizontal", "gradient", "marketing", "professional"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 600,
          y: 200,
          props: {
            width: 1200,
            height: 400,
            fill: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            radius: 16
          }
        },
        decorativeBlob1: {
          id: "decorativeBlob1",
          type: "ellipse",
          x: 950,
          y: 120,
          props: {
            width: 300,
            height: 200,
            fill: "rgba(255, 255, 255, 0.1)",
            rotation: 0.3
          }
        },
        decorativeBlob2: {
          id: "decorativeBlob2",
          type: "ellipse",
          x: 200,
          y: 280,
          props: {
            width: 250,
            height: 150,
            fill: "rgba(255, 255, 255, 0.08)",
            rotation: -0.4
          }
        },
        header: {
          id: "header",
          type: "text",
          x: 600,
          y: 120,
          props: {
            text: "TRANSFORM YOUR BUSINESS",
            fontSize: 64,
            fontWeight: "900",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "-0.02em"
          }
        },
        subheader: {
          id: "subheader",
          type: "text",
          x: 600,
          y: 200,
          props: {
            text: "Innovative solutions for the modern enterprise",
            fontSize: 28,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "rgba(255, 255, 255, 0.9)"
          }
        },
        ctaButton: {
          id: "ctaButton",
          type: "rectangle",
          x: 600,
          y: 280,
          props: {
            width: 220,
            height: 60,
            fill: "rgba(255, 255, 255, 0.95)",
            radius: 30,
            shadow: "0 4px 16px rgba(0, 0, 0, 0.1)"
          }
        },
        ctaText: {
          id: "ctaText",
          type: "text",
          x: 600,
          y: 280,
          props: {
            text: "GET STARTED",
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#667eea",
            letterSpacing: "0.05em"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Enhanced Signs templates
  {
    id: "road-sign-traffic-modern",
    name: "Modern Traffic Warning Sign",
    categories: [{ mainCategory: "Signs" }],
    thumbnail: "/assets/templates/signs/road-sign-traffic-modern-thumb.png",
    width: 800,
    height: 600,
    description: "Modern traffic warning sign with gradient background and clear typography.",
    tags: ["sign", "road", "traffic", "warning", "modern"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 400,
          y: 300,
          props: {
            width: 800,
            height: 600,
            fill: "#ffffff",
            radius: 12,
            shadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
          }
        },
        signBackground: {
          id: "signBackground",
          type: "rectangle",
          x: 400,
          y: 300,
          props: {
            width: 600,
            height: 400,
            fill: "linear-gradient(135deg, #f56500 0%, #ff8500 100%)",
            radius: 20,
            shadow: "0 4px 20px rgba(245, 101, 0, 0.3)"
          }
        },
        warningIcon: {
          id: "warningIcon",
          type: "ellipse",
          x: 400,
          y: 220,
          props: {
            width: 120,
            height: 120,
            fill: "rgba(255, 255, 255, 0.95)",
            shadow: "0 2px 12px rgba(0, 0, 0, 0.1)"
          }
        },
        warningSymbol: {
          id: "warningSymbol",
          type: "text",
          x: 400,
          y: 220,
          props: {
            text: "⚠",
            fontSize: 80,
            textAlign: "center",
            color: "#f56500"
          }
        },
        mainText: {
          id: "mainText",
          type: "text",
          x: 400,
          y: 350,
          props: {
            text: "SLOW DOWN",
            fontSize: 72,
            fontWeight: "900",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            shadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
          }
        },
        subText: {
          id: "subText",
          type: "text",
          x: 400,
          y: 420,
          props: {
            text: "Construction Zone Ahead",
            fontSize: 32,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "Inter",
            color: "rgba(255, 255, 255, 0.95)"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Enhanced Business Sign template
  {
    id: "business-sign-modern-gradient",
    name: "Business Sign - Modern Gradient",
    categories: [{ mainCategory: "Signs" }],
    thumbnail: "/assets/templates/signs/business-sign-modern-gradient-thumb.png",
    width: 800,
    height: 600,
    description: "Modern business sign with gradient background and premium styling.",
    tags: ["sign", "business", "modern", "gradient", "premium"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 400,
          y: 300,
          props: {
            width: 800,
            height: 600,
            fill: "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
            radius: 20,
            shadow: "0 12px 40px rgba(0, 0, 0, 0.2)"
          }
        },
        accentBar: {
          id: "accentBar",
          type: "rectangle",
          x: 400,
          y: 200,
          props: {
            width: 600,
            height: 8,
            fill: "linear-gradient(90deg, #4299e1 0%, #3182ce 100%)",
            radius: 4
          }
        },
        companyName: {
          id: "companyName",
          type: "text",
          x: 400,
          y: 260,
          props: {
            text: "INNOVATE SOLUTIONS",
            fontSize: 56,
            fontWeight: "800",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "-0.02em"
          }
        },
        tagline: {
          id: "tagline",
          type: "text",
          x: 400,
          y: 330,
          props: {
            text: "Premium Business Services & Consulting",
            fontSize: 24,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#a0aec0"
          }
        },
        logoContainer: {
          id: "logoContainer",
          type: "ellipse",
          x: 400,
          y: 420,
          props: {
            width: 100,
            height: 100,
            fill: "rgba(255, 255, 255, 0.1)",
            stroke: "rgba(255, 255, 255, 0.2)",
            strokeWidth: 2
          }
        },
        logoPlaceholder: {
          id: "logoPlaceholder",
          type: "text",
          x: 400,
          y: 420,
          props: {
            text: "LOGO",
            fontSize: 14,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "Inter",
            color: "rgba(255, 255, 255, 0.6)"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Enhanced Outdoor Sign template
  {
    id: "outdoor-sign-premium",
    name: "Premium Outdoor Sign",
    categories: [{ mainCategory: "Signs" }],
    thumbnail: "/assets/templates/signs/outdoor-sign-premium-thumb.png",
    width: 1000,
    height: 400,
    description: "Premium outdoor sign with modern gradient and professional typography.",
    tags: ["sign", "outdoor", "premium", "gradient", "professional"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 500,
          y: 200,
          props: {
            width: 1000,
            height: 400,
            fill: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            radius: 24,
            shadow: "0 16px 48px rgba(102, 126, 234, 0.3)"
          }
        },
        decorativeElement: {
          id: "decorativeElement",
          type: "ellipse",
          x: 850,
          y: 120,
          props: {
            width: 200,
            height: 160,
            fill: "rgba(255, 255, 255, 0.1)",
            rotation: 0.4
          }
        },
        title: {
          id: "title",
          type: "text",
          x: 500,
          y: 150,
          props: {
            text: "PREMIUM OUTDOOR SIGNAGE",
            fontSize: 48,
            fontWeight: "900",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            shadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
          }
        },
        subtitle: {
          id: "subtitle",
          type: "text",
          x: 500,
          y: 220,
          props: {
            text: "Weather-Resistant • High-Visibility • Professional Design",
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "rgba(255, 255, 255, 0.9)"
          }
        },
        badge: {
          id: "badge",
          type: "rectangle",
          x: 500,
          y: 280,
          props: {
            width: 180,
            height: 40,
            fill: "rgba(255, 255, 255, 0.15)",
            radius: 20,
            stroke: "rgba(255, 255, 255, 0.3)",
            strokeWidth: 1
          }
        },
        badgeText: {
          id: "badgeText",
          type: "text",
          x: 500,
          y: 280,
          props: {
            text: "UV PROTECTED",
            fontSize: 14,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "0.1em"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Enhanced Two-tone sign template
  {
    id: "sign-two-tone-modern",
    name: "Modern Two-Tone Messaging Sign",
    categories: [{ mainCategory: "Signs" }],
    thumbnail: "/assets/templates/signs/sign-two-tone-modern-thumb.png",
    width: 800,
    height: 1200,
    description: "Modern two-tone sign with gradient panels and clean typography.",
    tags: ["sign", "two-tone", "modern", "gradient", "messaging"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 400,
          y: 600,
          props: {
            width: 800,
            height: 1200,
            fill: "#ffffff",
            radius: 16,
            shadow: "0 16px 48px rgba(0, 0, 0, 0.15)"
          }
        },
        topPanel: {
          id: "topPanel",
          type: "rectangle",
          x: 400,
          y: 400,
          props: {
            width: 680,
            height: 600,
            fill: "linear-gradient(135deg, #e53e3e 0%, #c53030 100%)",
            radius: 12,
            shadow: "0 4px 16px rgba(229, 62, 62, 0.3)"
          }
        },
        bottomPanel: {
          id: "bottomPanel",
          type: "rectangle",
          x: 400,
          y: 900,
          props: {
            width: 680,
            height: 300,
            fill: "linear-gradient(135deg, #3182ce 0%, #2c5282 100%)",
            radius: 12,
            shadow: "0 4px 16px rgba(49, 130, 206, 0.3)"
          }
        },
        topMessage: {
          id: "topMessage",
          type: "text",
          x: 400,
          y: 400,
          props: {
            text: "ATTENTION\nIMPORTANT NOTICE",
            fontSize: 64,
            fontWeight: "900",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            shadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
          }
        },
        bottomMessage: {
          id: "bottomMessage",
          type: "text",
          x: 400,
          y: 900,
          props: {
            text: "Follow Safety Protocols\nAt All Times",
            fontSize: 32,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            lineHeight: 1.3
          }
        },
        iconBackground: {
          id: "iconBackground",
          type: "ellipse",
          x: 400,
          y: 750,
          props: {
            width: 80,
            height: 80,
            fill: "rgba(255, 255, 255, 0.95)",
            shadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
          }
        },
        icon: {
          id: "icon",
          type: "text",
          x: 400,
          y: 750,
          props: {
            text: "⚠",
            fontSize: 48,
            textAlign: "center",
            color: "#e53e3e"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Enhanced Warning Video Surveillance template
  {
    id: "warning-video-surveillance-modern",
    name: "Modern Video Surveillance Warning",
    categories: [{ mainCategory: "Signs" }],
    thumbnail: "/assets/templates/signs/warning-video-surveillance-modern-thumb.png",
    width: 800,
    height: 1200,
    description: "Modern warning sign with gradient design and security iconography.",
    tags: ["sign", "warning", "surveillance", "security", "modern"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 400,
          y: 600,
          props: {
            width: 800,
            height: 1200,
            fill: "#ffffff",
            radius: 20,
            shadow: "0 16px 48px rgba(0, 0, 0, 0.15)"
          }
        },
        topPanel: {
          id: "topPanel",
          type: "rectangle",
          x: 400,
          y: 150,
          props: {
            width: 720,
            height: 180,
            fill: "linear-gradient(135deg, #e53e3e 0%, #c53030 100%)",
            radius: 12,
            shadow: "0 6px 20px rgba(229, 62, 62, 0.4)"
          }
        },
        topMessage: {
          id: "topMessage",
          type: "text",
          x: 400,
          y: 150,
          props: {
            text: "WARNING",
            fontSize: 88,
            fontWeight: "900",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            shadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
          }
        },
        cameraContainer: {
          id: "cameraContainer",
          type: "ellipse",
          x: 400,
          y: 400,
          props: {
            width: 160,
            height: 160,
            fill: "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)",
            shadow: "0 8px 24px rgba(45, 55, 72, 0.4)"
          }
        },
        cameraIcon: {
          id: "cameraIcon",
          type: "text",
          x: 400,
          y: 400,
          props: {
            text: "📹",
            fontSize: 80,
            textAlign: "center"
          }
        },
        middleMessage: {
          id: "middleMessage",
          type: "text",
          x: 400,
          y: 580,
          props: {
            text: "THIS PROPERTY IS\nPROTECTED BY\nVIDEO SURVEILLANCE",
            fontSize: 44,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#1a202c",
            lineHeight: 1.2,
            letterSpacing: "-0.01em"
          }
        },
        bottomPanel: {
          id: "bottomPanel",
          type: "rectangle",
          x: 400,
          y: 1000,
          props: {
            width: 720,
            height: 160,
            fill: "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)",
            radius: 12,
            shadow: "0 4px 16px rgba(45, 55, 72, 0.3)"
          }
        },
        bottomMessage: {
          id: "bottomMessage",
          type: "text",
          x: 400,
          y: 1000,
          props: {
            text: "24/7 MONITORING\nACTIVE",
            fontSize: 36,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            lineHeight: 1.2
          }
        },
        securityBadge: {
          id: "securityBadge",
          type: "rectangle",
          x: 400,
          y: 800,
          props: {
            width: 200,
            height: 50,
            fill: "rgba(229, 62, 62, 0.1)",
            radius: 25,
            stroke: "#e53e3e",
            strokeWidth: 2
          }
        },
        badgeText: {
          id: "badgeText",
          type: "text",
          x: 400,
          y: 800,
          props: {
            text: "AUTHORIZED ONLY",
            fontSize: 14,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#e53e3e"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Enhanced Road Sign Speed Limit
  {
    id: "road-sign-speed-limit-modern",
    name: "Modern Speed Limit Sign",
    categories: [{ mainCategory: "Signs" }],
    thumbnail: "/assets/templates/signs/road-sign-speed-limit-modern-thumb.png",
    width: 600,
    height: 800,
    description: "Modern speed limit sign with gradient background and clear typography.",
    tags: ["sign", "road", "speed", "limit", "modern"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 300,
          y: 400,
          props: {
            width: 600,
            height: 800,
            fill: "linear-gradient(180deg, #ffffff 0%, #f7fafc 100%)",
            radius: 16,
            shadow: "0 12px 40px rgba(0, 0, 0, 0.15)"
          }
        },
        board: {
          id: "board",
          type: "rectangle",
          x: 300,
          y: 400,
          props: {
            width: 520,
            height: 720,
            fill: "#ffffff",
            stroke: "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)",
            strokeWidth: 12,
            radius: 12,
            shadow: "0 8px 24px rgba(0, 0, 0, 0.1)"
          }
        },
        titleBackground: {
          id: "titleBackground",
          type: "rectangle",
          x: 300,
          y: 200,
          props: {
            width: 400,
            height: 120,
            fill: "linear-gradient(135deg, #4299e1 0%, #3182ce 100%)",
            radius: 8
          }
        },
        title: {
          id: "title",
          type: "text",
          x: 300,
          y: 200,
          props: {
            text: "SPEED\nLIMIT",
            fontSize: 64,
            fontWeight: "900",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            lineHeight: 1.0,
            letterSpacing: "-0.02em"
          }
        },
        numberBackground: {
          id: "numberBackground",
          type: "ellipse",
          x: 300,
          y: 480,
          props: {
            width: 280,
            height: 280,
            fill: "linear-gradient(135deg, #e53e3e 0%, #c53030 100%)",
            shadow: "0 8px 24px rgba(229, 62, 62, 0.3)"
          }
        },
        number: {
          id: "number",
          type: "text",
          x: 300,
          y: 480,
          props: {
            text: "50",
            fontSize: 180,
            fontWeight: "900",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "-0.05em",
            shadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
          }
        },
        unit: {
          id: "unit",
          type: "text",
          x: 300,
          y: 650,
          props: {
            text: "KM/H",
            fontSize: 32,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#2d3748",
            letterSpacing: "0.1em"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Enhanced Caution Sign
  {
    id: "road-sign-caution-modern",
    name: "Modern Caution Warning Sign",
    categories: [{ mainCategory: "Signs" }],
    thumbnail: "/assets/templates/signs/road-sign-caution-modern-thumb.png",
    width: 800,
    height: 600,
    description: "High-visibility modern caution sign with gradient background.",
    tags: ["sign", "caution", "warning", "modern", "safety"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 400,
          y: 300,
          props: {
            width: 800,
            height: 600,
            fill: "#ffffff",
            radius: 16,
            shadow: "0 12px 40px rgba(0, 0, 0, 0.15)"
          }
        },
        frame: {
          id: "frame",
          type: "rectangle",
          x: 400,
          y: 300,
          props: {
            width: 720,
            height: 520,
            fill: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
            radius: 12,
            shadow: "0 8px 32px rgba(251, 191, 36, 0.4)"
          }
        },
        warningStripe: {
          id: "warningStripe",
          type: "rectangle",
          x: 400,
          y: 120,
          props: {
            width: 720,
            height: 40,
            fill: "linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)",
            radius: 8
          }
        },
        cautionText: {
          id: "cautionText",
          type: "text",
          x: 400,
          y: 220,
          props: {
            text: "CAUTION",
            fontSize: 96,
            fontWeight: "900",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            shadow: "0 4px 16px rgba(0, 0, 0, 0.3)"
          }
        },
        messageBackground: {
          id: "messageBackground",
          type: "rectangle",
          x: 400,
          y: 360,
          props: {
            width: 600,
            height: 80,
            fill: "rgba(255, 255, 255, 0.95)",
            radius: 12,
            shadow: "0 2px 12px rgba(0, 0, 0, 0.1)"
          }
        },
        messageText: {
          id: "messageText",
          type: "text",
          x: 400,
          y: 360,
          props: {
            text: "Construction Zone - Reduce Speed",
            fontSize: 36,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#1a202c"
          }
        },
        iconBackground: {
          id: "iconBackground",
          type: "ellipse",
          x: 400,
          y: 480,
          props: {
            width: 100,
            height: 100,
            fill: "rgba(255, 255, 255, 0.9)",
            shadow: "0 4px 16px rgba(0, 0, 0, 0.1)"
          }
        },
        icon: {
          id: "icon",
          type: "text",
          x: 400,
          y: 480,
          props: {
            text: "🚧",
            fontSize: 60,
            textAlign: "center"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Enhanced Business Card Templates
  {
    id: "business-card-executive-blue",
    name: "Executive Business Card - Ocean Blue",
    categories: [{ mainCategory: "Business Cards" }],
    thumbnail: "/assets/templates/cards/business-card-executive-blue-thumb.png",
    width: 1050,
    height: 600,
    description: "Premium executive business card with ocean blue gradient and modern layout.",
    tags: ["business", "card", "executive", "blue", "premium"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 525,
          y: 300,
          props: {
            width: 1050,
            height: 600,
            fill: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
            radius: 16,
            shadow: "0 8px 32px rgba(30, 64, 175, 0.3)"
          }
        },
        decorativeElement: {
          id: "decorativeElement",
          type: "ellipse",
          x: 850,
          y: 200,
          props: {
            width: 300,
            height: 200,
            fill: "rgba(255, 255, 255, 0.08)",
            rotation: 0.3
          }
        },
        accentStripe: {
          id: "accentStripe",
          type: "rectangle",
          x: 200,
          y: 300,
          props: {
            width: 8,
            height: 600,
            fill: "linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%)",
            radius: 4
          }
        },
        logoContainer: {
          id: "logoContainer",
          type: "ellipse",
          x: 280,
          y: 200,
          props: {
            width: 120,
            height: 120,
            fill: "rgba(255, 255, 255, 0.1)",
            stroke: "rgba(255, 255, 255, 0.2)",
            strokeWidth: 2
          }
        },
        name: {
          id: "name",
          type: "text",
          x: 650,
          y: 220,
          props: {
            text: "Alexandra Chen",
            fontSize: 56,
            fontWeight: "700",
            textAlign: "left",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "-0.02em"
          }
        },
        title: {
          id: "title",
          type: "text",
          x: 650,
          y: 290,
          props: {
            text: "Chief Executive Officer",
            fontSize: 24,
            fontWeight: "500",
            textAlign: "left",
            fontFamily: "Inter",
            color: "#bfdbfe"
          }
        },
        company: {
          id: "company",
          type: "text",
          x: 650,
          y: 340,
          props: {
            text: "Innovation Corp",
            fontSize: 20,
            fontWeight: "600",
            textAlign: "left",
            fontFamily: "Inter",
            color: "#93c5fd"
          }
        },
        contactBackground: {
          id: "contactBackground",
          type: "rectangle",
          x: 700,
          y: 430,
          props: {
            width: 400,
            height: 120,
            fill: "rgba(255, 255, 255, 0.05)",
            radius: 8
          }
        },
        phone: {
          id: "phone",
          type: "text",
          x: 650,
          y: 400,
          props: {
            text: "+1 (555) 123-4567",
            fontSize: 18,
            fontWeight: "500",
            textAlign: "left",
            fontFamily: "Inter",
            color: "#e0e7ff"
          }
        },
        email: {
          id: "email",
          type: "text",
          x: 650,
          y: 430,
          props: {
            text: "alexandra@innovationcorp.com",
            fontSize: 18,
            fontWeight: "500",
            textAlign: "left",
            fontFamily: "Inter",
            color: "#e0e7ff"
          }
        },
        website: {
          id: "website",
          type: "text",
          x: 650,
          y: 460,
          props: {
            text: "www.innovationcorp.com",
            fontSize: 18,
            fontWeight: "500",
            textAlign: "left",
            fontFamily: "Inter",
            color: "#e0e7ff"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  {
    id: "business-card-creative-green",
    name: "Creative Business Card - Forest Green",
    categories: [{ mainCategory: "Business Cards" }],
    thumbnail: "/assets/templates/cards/business-card-creative-green-thumb.png",
    width: 1050,
    height: 600,
    description: "Creative business card with forest green gradient and modern geometric elements.",
    tags: ["business", "card", "creative", "green", "modern"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 525,
          y: 300,
          props: {
            width: 1050,
            height: 600,
            fill: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            radius: 16,
            shadow: "0 8px 32px rgba(5, 150, 105, 0.3)"
          }
        },
        geometricShape1: {
          id: "geometricShape1",
          type: "rectangle",
          x: 150,
          y: 150,
          props: {
            width: 200,
            height: 200,
            fill: "rgba(255, 255, 255, 0.1)",
            radius: 100,
            rotation: 0.785
          }
        },
        geometricShape2: {
          id: "geometricShape2",
          type: "rectangle",
          x: 900,
          y: 450,
          props: {
            width: 150,
            height: 150,
            fill: "rgba(255, 255, 255, 0.08)",
            radius: 20,
            rotation: 0.4
          }
        },
        nameBackground: {
          id: "nameBackground",
          type: "rectangle",
          x: 600,
          y: 200,
          props: {
            width: 500,
            height: 80,
            fill: "rgba(255, 255, 255, 0.95)",
            radius: 12,
            shadow: "0 4px 16px rgba(0, 0, 0, 0.1)"
          }
        },
        name: {
          id: "name",
          type: "text",
          x: 600,
          y: 200,
          props: {
            text: "Marcus Rodriguez",
            fontSize: 48,
            fontWeight: "800",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#065f46",
            letterSpacing: "-0.02em"
          }
        },
        title: {
          id: "title",
          type: "text",
          x: 600,
          y: 280,
          props: {
            text: "Creative Director & Designer",
            fontSize: 24,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#d1fae5"
          }
        },
        contactCard: {
          id: "contactCard",
          type: "rectangle",
          x: 600,
          y: 400,
          props: {
            width: 450,
            height: 140,
            fill: "rgba(255, 255, 255, 0.1)",
            radius: 12,
            stroke: "rgba(255, 255, 255, 0.2)",
            strokeWidth: 1
          }
        },
        phone: {
          id: "phone",
          type: "text",
          x: 600,
          y: 360,
          props: {
            text: "📱 +1 (555) 987-6543",
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff"
          }
        },
        email: {
          id: "email",
          type: "text",
          x: 600,
          y: 400,
          props: {
            text: "✉ marcus@creativestudio.com",
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff"
          }
        },
        website: {
          id: "website",
          type: "text",
          x: 600,
          y: 440,
          props: {
            text: "🌐 creativestudio.com",
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Indoor Signage Templates
  {
    id: "indoor-directional-modern",
    name: "Modern Indoor Directional Sign",
    categories: [{ mainCategory: "Indoor Signs" }],
    thumbnail: "/assets/templates/indoor/directional-modern-thumb.png",
    width: 1200,
    height: 400,
    description: "Sleek indoor directional signage with gradient background and clear icons.",
    tags: ["indoor", "directional", "wayfinding", "modern", "navigation"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 600,
          y: 200,
          props: {
            width: 1200,
            height: 400,
            fill: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
            radius: 20,
            shadow: "0 12px 40px rgba(0, 0, 0, 0.2)"
          }
        },
        accentLine: {
          id: "accentLine",
          type: "rectangle",
          x: 600,
          y: 50,
          props: {
            width: 1000,
            height: 8,
            fill: "linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)",
            radius: 4
          }
        },
        arrow1: {
          id: "arrow1",
          type: "text",
          x: 200,
          y: 150,
          props: {
            text: "←",
            fontSize: 80,
            textAlign: "center",
            color: "#60a5fa"
          }
        },
        location1: {
          id: "location1",
          type: "text",
          x: 200,
          y: 220,
          props: {
            text: "Conference Room A\nMeeting Rooms 1-5",
            fontSize: 24,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            lineHeight: 1.3
          }
        },
        arrow2: {
          id: "arrow2",
          type: "text",
          x: 600,
          y: 150,
          props: {
            text: "↑",
            fontSize: 80,
            textAlign: "center",
            color: "#34d399"
          }
        },
        location2: {
          id: "location2",
          type: "text",
          x: 600,
          y: 220,
          props: {
            text: "Reception\nElevators\nRestrooms",
            fontSize: 24,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            lineHeight: 1.3
          }
        },
        arrow3: {
          id: "arrow3",
          type: "text",
          x: 1000,
          y: 150,
          props: {
            text: "→",
            fontSize: 80,
            textAlign: "center",
            color: "#f59e0b"
          }
        },
        location3: {
          id: "location3",
          type: "text",
          x: 1000,
          y: 220,
          props: {
            text: "Office Suites\nExecutive Floor\nAdmin",
            fontSize: 24,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            lineHeight: 1.3
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  {
    id: "indoor-office-nameplate",
    name: "Premium Office Nameplate",
    categories: [{ mainCategory: "Indoor Signs" }],
    thumbnail: "/assets/templates/indoor/office-nameplate-thumb.png",
    width: 600,
    height: 200,
    description: "Elegant office nameplate with gradient background and professional typography.",
    tags: ["indoor", "office", "nameplate", "professional", "executive"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 300,
          y: 100,
          props: {
            width: 600,
            height: 200,
            fill: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
            radius: 12,
            shadow: "0 8px 32px rgba(0, 0, 0, 0.15)"
          }
        },
        accentBar: {
          id: "accentBar",
          type: "rectangle",
          x: 300,
          y: 40,
          props: {
            width: 500,
            height: 6,
            fill: "linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)",
            radius: 3
          }
        },
        name: {
          id: "name",
          type: "text",
          x: 300,
          y: 80,
          props: {
            text: "Dr. Sarah Johnson",
            fontSize: 36,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "-0.02em"
          }
        },
        title: {
          id: "title",
          type: "text",
          x: 300,
          y: 120,
          props: {
            text: "Chief Medical Officer",
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#d1d5db"
          }
        },
        department: {
          id: "department",
          type: "text",
          x: 300,
          y: 150,
          props: {
            text: "Cardiology Department",
            fontSize: 16,
            fontWeight: "400",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#9ca3af"
          }
        },
        decorativeElements: {
          id: "decorativeElements",
          type: "ellipse",
          x: 100,
          y: 100,
          props: {
            width: 40,
            height: 40,
            fill: "rgba(59, 130, 246, 0.2)"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  {
    id: "indoor-room-identification",
    name: "Modern Room Identification Sign",
    categories: [{ mainCategory: "Indoor Signs" }],
    thumbnail: "/assets/templates/indoor/room-identification-thumb.png",
    width: 800,
    height: 300,
    description: "Contemporary room identification sign with icons and clear typography.",
    tags: ["indoor", "room", "identification", "modern", "wayfinding"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 400,
          y: 150,
          props: {
            width: 800,
            height: 300,
            fill: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            radius: 16,
            shadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
          }
        },
        colorStripe: {
          id: "colorStripe",
          type: "rectangle",
          x: 50,
          y: 150,
          props: {
            width: 20,
            height: 300,
            fill: "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)",
            radius: 10
          }
        },
        roomNumber: {
          id: "roomNumber",
          type: "text",
          x: 200,
          y: 100,
          props: {
            text: "245",
            fontSize: 88,
            fontWeight: "900",
            textAlign: "left",
            fontFamily: "Inter",
            color: "#1f2937",
            letterSpacing: "-0.05em"
          }
        },
        roomName: {
          id: "roomName",
          type: "text",
          x: 200,
          y: 180,
          props: {
            text: "Conference Room Aurora",
            fontSize: 32,
            fontWeight: "600",
            textAlign: "left",
            fontFamily: "Inter",
            color: "#374151"
          }
        },
        capacity: {
          id: "capacity",
          type: "text",
          x: 200,
          y: 220,
          props: {
            text: "Capacity: 12 people",
            fontSize: 18,
            fontWeight: "500",
            textAlign: "left",
            fontFamily: "Inter",
            color: "#6b7280"
          }
        },
        iconBackground: {
          id: "iconBackground",
          type: "ellipse",
          x: 650,
          y: 150,
          props: {
            width: 120,
            height: 120,
            fill: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
            stroke: "#3b82f6",
            strokeWidth: 3
          }
        },
        icon: {
          id: "icon",
          type: "text",
          x: 650,
          y: 150,
          props: {
            text: "🏢",
            fontSize: 60,
            textAlign: "center"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // More Company Sign Templates
  {
    id: "company-lobby-sign",
    name: "Premium Company Lobby Sign",
    categories: [{ mainCategory: "Company Signs" }],
    thumbnail: "/assets/templates/company/lobby-sign-thumb.png",
    width: 1600,
    height: 600,
    description: "Premium lobby sign with company branding and modern gradient design.",
    tags: ["company", "lobby", "reception", "branding", "premium"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 800,
          y: 300,
          props: {
            width: 1600,
            height: 600,
            fill: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            radius: 24,
            shadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
          }
        },
        accentPanel: {
          id: "accentPanel",
          type: "rectangle",
          x: 800,
          y: 100,
          props: {
            width: 1200,
            height: 120,
            fill: "linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)",
            radius: 16
          }
        },
        companyName: {
          id: "companyName",
          type: "text",
          x: 800,
          y: 240,
          props: {
            text: "NEXUS TECHNOLOGIES",
            fontSize: 88,
            fontWeight: "900",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            shadow: "0 4px 16px rgba(0, 0, 0, 0.2)"
          }
        },
        tagline: {
          id: "tagline",
          type: "text",
          x: 800,
          y: 340,
          props: {
            text: "Innovating Tomorrow's Solutions Today",
            fontSize: 36,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#cbd5e1",
            letterSpacing: "0.02em"
          }
        },
        establishedBadge: {
          id: "establishedBadge",
          type: "rectangle",
          x: 800,
          y: 430,
          props: {
            width: 300,
            height: 60,
            fill: "rgba(255, 255, 255, 0.1)",
            radius: 30,
            stroke: "rgba(255, 255, 255, 0.2)",
            strokeWidth: 2
          }
        },
        established: {
          id: "established",
          type: "text",
          x: 800,
          y: 430,
          props: {
            text: "ESTABLISHED 1995",
            fontSize: 20,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "0.1em"
          }
        },
        logoPlaceholder: {
          id: "logoPlaceholder",
          type: "ellipse",
          x: 200,
          y: 300,
          props: {
            width: 200,
            height: 200,
            fill: "rgba(255, 255, 255, 0.1)",
            stroke: "rgba(255, 255, 255, 0.3)",
            strokeWidth: 3
          }
        },
        decorativeElement1: {
          id: "decorativeElement1",
          type: "ellipse",
          x: 1400,
          y: 200,
          props: {
            width: 300,
            height: 200,
            fill: "rgba(59, 130, 246, 0.08)",
            rotation: 0.4
          }
        },
        decorativeElement2: {
          id: "decorativeElement2",
          type: "rectangle",
          x: 100,
          y: 500,
          props: {
            width: 150,
            height: 150,
            fill: "rgba(59, 130, 246, 0.06)",
            radius: 20,
            rotation: 0.3
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  {
    id: "company-department-sign",
    name: "Modern Department Sign",
    categories: [{ mainCategory: "Company Signs" }],
    thumbnail: "/assets/templates/company/department-sign-thumb.png",
    width: 1000,
    height: 300,
    description: "Clean department identification sign with gradient background.",
    tags: ["company", "department", "office", "identification", "modern"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 500,
          y: 150,
          props: {
            width: 1000,
            height: 300,
            fill: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
            radius: 16,
            shadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
          }
        },
        colorAccent: {
          id: "colorAccent",
          type: "rectangle",
          x: 60,
          y: 150,
          props: {
            width: 20,
            height: 300,
            fill: "linear-gradient(180deg, #059669 0%, #047857 100%)",
            radius: 10
          }
        },
        departmentName: {
          id: "departmentName",
          type: "text",
          x: 550,
          y: 120,
          props: {
            text: "HUMAN RESOURCES",
            fontSize: 48,
            fontWeight: "800",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#1f2937",
            letterSpacing: "-0.02em"
          }
        },
        subtitle: {
          id: "subtitle",
          type: "text",
          x: 550,
          y: 180,
          props: {
            text: "Employee Services & Support",
            fontSize: 24,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#6b7280"
          }
        },
        floorInfo: {
          id: "floorInfo",
          type: "rectangle",
          x: 800,
          y: 80,
          props: {
            width: 120,
            height: 60,
            fill: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            radius: 12
          }
        },
        floorText: {
          id: "floorText",
          type: "text",
          x: 800,
          y: 80,
          props: {
            text: "FLOOR 3",
            fontSize: 16,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "0.05em"
          }
        },
        iconBackground: {
          id: "iconBackground",
          type: "ellipse",
          x: 150,
          y: 150,
          props: {
            width: 100,
            height: 100,
            fill: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
            stroke: "#059669",
            strokeWidth: 3
          }
        },
        icon: {
          id: "icon",
          type: "text",
          x: 150,
          y: 150,
          props: {
            text: "👥",
            fontSize: 50,
            textAlign: "center"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  {
    id: "company-reception-hours",
    name: "Reception Hours Sign",
    categories: [{ mainCategory: "Company Signs" }],
    thumbnail: "/assets/templates/company/reception-hours-thumb.png",
    width: 600,
    height: 800,
    description: "Professional reception hours sign with modern gradient design.",
    tags: ["company", "reception", "hours", "information", "office"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 300,
          y: 400,
          props: {
            width: 600,
            height: 800,
            fill: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
            radius: 20,
            shadow: "0 12px 40px rgba(30, 64, 175, 0.3)"
          }
        },
        headerPanel: {
          id: "headerPanel",
          type: "rectangle",
          x: 300,
          y: 120,
          props: {
            width: 520,
            height: 120,
            fill: "rgba(255, 255, 255, 0.95)",
            radius: 16,
            shadow: "0 4px 16px rgba(0, 0, 0, 0.1)"
          }
        },
        title: {
          id: "title",
          type: "text",
          x: 300,
          y: 120,
          props: {
            text: "RECEPTION HOURS",
            fontSize: 32,
            fontWeight: "800",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#1e40af",
            letterSpacing: "-0.01em"
          }
        },
        hoursCard: {
          id: "hoursCard",
          type: "rectangle",
          x: 300,
          y: 350,
          props: {
            width: 480,
            height: 400,
            fill: "rgba(255, 255, 255, 0.1)",
            radius: 16,
            stroke: "rgba(255, 255, 255, 0.2)",
            strokeWidth: 2
          }
        },
        mondayFriday: {
          id: "mondayFriday",
          type: "text",
          x: 300,
          y: 280,
          props: {
            text: "MONDAY - FRIDAY",
            fontSize: 24,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "0.02em"
          }
        },
        weekdayHours: {
          id: "weekdayHours",
          type: "text",
          x: 300,
          y: 320,
          props: {
            text: "8:00 AM - 6:00 PM",
            fontSize: 36,
            fontWeight: "800",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff"
          }
        },
        saturday: {
          id: "saturday",
          type: "text",
          x: 300,
          y: 400,
          props: {
            text: "SATURDAY",
            fontSize: 24,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "0.02em"
          }
        },
        saturdayHours: {
          id: "saturdayHours",
          type: "text",
          x: 300,
          y: 440,
          props: {
            text: "9:00 AM - 2:00 PM",
            fontSize: 32,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff"
          }
        },
        sunday: {
          id: "sunday",
          type: "text",
          x: 300,
          y: 500,
          props: {
            text: "SUNDAY",
            fontSize: 24,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "0.02em"
          }
        },
        sundayHours: {
          id: "sundayHours",
          type: "text",
          x: 300,
          y: 540,
          props: {
            text: "CLOSED",
            fontSize: 32,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#fca5a5"
          }
        },
        contactInfo: {
          id: "contactInfo",
          type: "text",
          x: 300,
          y: 650,
          props: {
            text: "For after hours assistance\nCall: (555) 123-4567",
            fontSize: 18,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#bfdbfe",
            lineHeight: 1.4
          }
        },
        clockIcon: {
          id: "clockIcon",
          type: "text",
          x: 300,
          y: 750,
          props: {
            text: "🕐",
            fontSize: 40,
            textAlign: "center"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Enhanced Poster templates
  {
    id: "poster-corporate-event",
    name: "Corporate Event Poster - Premium",
    categories: [
      { mainCategory: "Posters" },
      { mainCategory: "Marketing" }
    ],
    thumbnail: "/assets/templates/posters/poster-corporate-event-thumb.png",
    width: 1200,
    height: 1800,
    description: "Premium corporate event poster with gradient background and professional layout.",
    tags: ["poster", "corporate", "event", "premium", "professional"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 600,
          y: 900,
          props: {
            width: 1200,
            height: 1800,
            fill: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            radius: 24
          }
        },
        accentPanel: {
          id: "accentPanel",
          type: "rectangle",
          x: 600,
          y: 200,
          props: {
            width: 1000,
            height: 300,
            fill: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            radius: 20,
            shadow: "0 8px 32px rgba(59, 130, 246, 0.4)"
          }
        },
        decorativeBlob1: {
          id: "decorativeBlob1",
          type: "ellipse",
          x: 200,
          y: 600,
          props: {
            width: 300,
            height: 400,
            fill: "rgba(59, 130, 246, 0.1)",
            rotation: 0.3
          }
        },
        decorativeBlob2: {
          id: "decorativeBlob2",
          type: "ellipse",
          x: 1000,
          y: 1200,
          props: {
            width: 250,
            height: 350,
            fill: "rgba(59, 130, 246, 0.08)",
            rotation: -0.4
          }
        },
        eventTitle: {
          id: "eventTitle",
          type: "text",
          x: 600,
          y: 180,
          props: {
            text: "ANNUAL TECH\nSUMMIT 2024",
            fontSize: 88,
            fontWeight: "900",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1.0,
            shadow: "0 4px 16px rgba(0, 0, 0, 0.3)"
          }
        },
        subtitle: {
          id: "subtitle",
          type: "text",
          x: 600,
          y: 420,
          props: {
            text: "Innovation • Technology • Future",
            fontSize: 32,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#cbd5e1",
            letterSpacing: "0.1em"
          }
        },
        dateTimeCard: {
          id: "dateTimeCard",
          type: "rectangle",
          x: 600,
          y: 650,
          props: {
            width: 800,
            height: 200,
            fill: "rgba(255, 255, 255, 0.95)",
            radius: 16,
            shadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
          }
        },
        dateTime: {
          id: "dateTime",
          type: "text",
          x: 600,
          y: 620,
          props: {
            text: "MARCH 15-16, 2024",
            fontSize: 48,
            fontWeight: "800",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#1e293b",
            letterSpacing: "-0.01em"
          }
        },
        venue: {
          id: "venue",
          type: "text",
          x: 600,
          y: 680,
          props: {
            text: "Grand Convention Center • Hall A & B",
            fontSize: 24,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#475569"
          }
        },
        speakersSection: {
          id: "speakersSection",
          type: "rectangle",
          x: 600,
          y: 950,
          props: {
            width: 900,
            height: 250,
            fill: "rgba(255, 255, 255, 0.05)",
            radius: 16,
            stroke: "rgba(255, 255, 255, 0.1)",
            strokeWidth: 2
          }
        },
        speakersTitle: {
          id: "speakersTitle",
          type: "text",
          x: 600,
          y: 880,
          props: {
            text: "KEYNOTE SPEAKERS",
            fontSize: 32,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "0.05em"
          }
        },
        speakers: {
          id: "speakers",
          type: "text",
          x: 600,
          y: 950,
          props: {
            text: "• Dr. Sarah Chen - AI Research Director\n• Mark Rodriguez - Tech Innovation Lead\n• Prof. Lisa Wang - Future Technologies\n• James Mitchell - Digital Transformation",
            fontSize: 24,
            fontWeight: "500",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#e2e8f0",
            lineHeight: 1.6
          }
        },
        registrationCTA: {
          id: "registrationCTA",
          type: "rectangle",
          x: 600,
          y: 1350,
          props: {
            width: 400,
            height: 80,
            fill: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            radius: 40,
            shadow: "0 8px 24px rgba(5, 150, 105, 0.4)"
          }
        },
        ctaText: {
          id: "ctaText",
          type: "text",
          x: 600,
          y: 1350,
          props: {
            text: "REGISTER NOW",
            fontSize: 28,
            fontWeight: "800",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff",
            letterSpacing: "0.05em"
          }
        },
        website: {
          id: "website",
          type: "text",
          x: 600,
          y: 1500,
          props: {
            text: "www.techsummit2024.com",
            fontSize: 24,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#3b82f6"
          }
        },
        bottomAccent: {
          id: "bottomAccent",
          type: "rectangle",
          x: 600,
          y: 1720,
          props: {
            width: 800,
            height: 8,
            fill: "linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)",
            radius: 4
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },

  // Additional Sign Templates
  {
    id: "restroom-sign-modern",
    name: "Modern Restroom Sign",
    categories: [{ mainCategory: "Indoor Signs" }],
    thumbnail: "/assets/templates/indoor/restroom-sign-thumb.png",
    width: 600,
    height: 300,
    description: "Modern restroom identification sign with universal icons.",
    tags: ["indoor", "restroom", "bathroom", "universal", "accessibility"],
    document: {
      shapes: {
        background: {
          id: "background",
          type: "rectangle",
          x: 300,
          y: 150,
          props: {
            width: 600,
            height: 300,
            fill: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
            radius: 16,
            shadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
          }
        },
        menSection: {
          id: "menSection",
          type: "rectangle",
          x: 150,
          y: 150,
          props: {
            width: 250,
            height: 250,
            fill: "rgba(59, 130, 246, 0.1)",
            radius: 12,
            stroke: "#3b82f6",
            strokeWidth: 2
          }
        },
        womenSection: {
          id: "womenSection",
          type: "rectangle",
          x: 450,
          y: 150,
          props: {
            width: 250,
            height: 250,
            fill: "rgba(236, 72, 153, 0.1)",
            radius: 12,
            stroke: "#ec4899",
            strokeWidth: 2
          }
        },
        menIcon: {
          id: "menIcon",
          type: "text",
          x: 150,
          y: 120,
          props: {
            text: "🚹",
            fontSize: 80,
            textAlign: "center"
          }
        },
        womenIcon: {
          id: "womenIcon",
          type: "text",
          x: 450,
          y: 120,
          props: {
            text: "🚺",
            fontSize: 80,
            textAlign: "center"
          }
        },
        menText: {
          id: "menText",
          type: "text",
          x: 150,
          y: 190,
          props: {
            text: "MEN",
            fontSize: 32,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#3b82f6"
          }
        },
        womenText: {
          id: "womenText",
          type: "text",
          x: 450,
          y: 190,
          props: {
            text: "WOMEN",
            fontSize: 32,
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ec4899"
          }
        },
        accessibilityIcon: {
          id: "accessibilityIcon",
          type: "text",
          x: 300,
          y: 250,
          props: {
            text: "♿",
            fontSize: 40,
            textAlign: "center"
          }
        },
        accessibilityText: {
          id: "accessibilityText",
          type: "text",
          x: 300,
          y: 280,
          props: {
            text: "ACCESSIBLE",
            fontSize: 16,
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "Inter",
            color: "#ffffff"
          }
        }
      },
      bindings: {},
      assets: {}
    }
  },
  // FOR SALE Sign Template
  {
    id: "for-sale-sign-basic",
    name: "FOR SALE Sign",
    categories: [
      { mainCategory: "Yard Signs" },
      { mainCategory: "Real Estate" }
    ],
    thumbnail: "/assets/templates/yard-signs/for-sale-thumb.png",
    width: 24,
    height: 18,
    description: "Classic FOR SALE sign with house icon and contact information.",
    tags: ["for sale", "real estate", "yard sign", "house", "contact"],
    document: {
      shapes: {
        "shape:background": {
          id: "shape:background",
          type: "rectangle",
          x: 12,
          y: 9,
          rotation: 0,
          isLocked: false,
          isVisible: true,
          meta: {},
          childIndex: 1,
          name: "Background",
          style: "fill",
          size: "m",
          w: 24,
          h: 18,
          fill: "#fbbf24",
          stroke: "#d97706",
          strokeWidth: 0.125,
          strokeType: "solid",
          dash: "solid",
          opacity: 1,
          radius: 0.5
        },
        "shape:mainText": {
          id: "shape:mainText",
          type: "text",
          x: 12,
          y: 7,
          rotation: 0,
          isLocked: false,
          isVisible: true,
          meta: {},
          childIndex: 2,
          name: "Main Text",
          text: "FOR SALE",
          font: "draw",
          size: "xl",
          align: "middle",
          color: "#1f2937",
          opacity: 1,
          scale: 1,
          autoSize: false,
          w: 150,
          h: 50
        },
        "shape:houseIcon": {
          id: "shape:houseIcon",
          type: "text",
          x: 12,
          y: 11,
          rotation: 0,
          isLocked: false,
          isVisible: true,
          meta: {},
          childIndex: 3,
          name: "House Icon",
          text: "🏠",
          font: "draw",
          size: "l",
          align: "middle",
          color: "#1f2937",
          opacity: 1,
          scale: 1,
          autoSize: false,
          w: 40,
          h: 40
        },
        "shape:phoneText": {
          id: "shape:phoneText",
          type: "text",
          x: 12,
          y: 15,
          rotation: 0,
          isLocked: false,
          isVisible: true,
          meta: {},
          childIndex: 4,
          name: "Phone Text",
          text: "555-555-5555",
          font: "draw",
          size: "s",
          align: "middle",
          color: "#1f2937",
          opacity: 1,
          scale: 1,
          autoSize: false,
          w: 120,
          h: 30
        }
      },
      bindings: {},
      assets: {}
    }
  },
  // NOW OPEN Sign Template
  {
    id: "now-open-sign-modern",
    name: "NOW OPEN Sign",
    categories: [
      { mainCategory: "Business Signs" },
      { mainCategory: "Grand Opening" }
    ],
    thumbnail: "/assets/templates/business-signs/now-open-thumb.png",
    width: 25,
    height: 19,
    description: "Modern NOW OPEN sign with blue bars and yellow accent text.",
    tags: ["now open", "business", "grand opening", "modern", "blue"],
    document: {
      shapes: {
        "shape:background": {
          id: "shape:background",
          type: "rectangle",
          x: 12.5,
          y: 9.5,
          rotation: 0,
          isLocked: false,
          isVisible: true,
          meta: {},
          childIndex: 1,
          name: "Background",
          style: "fill",
          size: "m",
          w: 25,
          h: 19,
          fill: "#ffffff",
          stroke: "#e5e7eb",
          strokeWidth: 0.125,
          strokeType: "solid",
          dash: "solid",
          opacity: 1,
          radius: 0.25
        },
        "shape:topBar": {
          id: "shape:topBar",
          type: "rectangle",
          x: 12.5,
          y: 1.5,
          rotation: 0,
          isLocked: false,
          isVisible: true,
          meta: {},
          childIndex: 2,
          name: "Top Bar",
          style: "fill",
          size: "m",
          w: 25,
          h: 2.5,
          fill: "#2563eb",
          stroke: "none",
          strokeWidth: 0,
          strokeType: "solid",
          dash: "solid",
          opacity: 1,
          radius: 0.25
        },
        "shape:bottomBar": {
          id: "shape:bottomBar",
          type: "rectangle",
          x: 12.5,
          y: 17.5,
          rotation: 0,
          isLocked: false,
          isVisible: true,
          meta: {},
          childIndex: 3,
          name: "Bottom Bar",
          style: "fill",
          size: "m",
          w: 25,
          h: 1.5,
          fill: "#2563eb",
          stroke: "none",
          strokeWidth: 0,
          strokeType: "solid",
          dash: "solid",
          opacity: 1,
          radius: 0.25
        },
        "shape:topText": {
          id: "shape:topText",
          type: "text",
          x: 12.5,
          y: 2.75,
          rotation: 0,
          isLocked: false,
          isVisible: true,
          meta: {},
          childIndex: 4,
          name: "Top Text",
          text: "NOW OPEN",
          font: "draw",
          size: "l",
          align: "middle",
          color: "#ffffff",
          opacity: 1,
          scale: 1,
          autoSize: false,
          w: 120,
          h: 40
        },
        "shape:middleText": {
          id: "shape:mainText",
          type: "text",
          x: 12.5,
          y: 9.5,
          rotation: 0,
          isLocked: false,
          isVisible: true,
          meta: {},
          childIndex: 5,
          name: "Middle Text",
          text: "Please Come In and Visit Us!",
          font: "draw",
          size: "m",
          align: "middle",
          color: "#fbbf24",
          opacity: 1,
          scale: 1,
          autoSize: false,
          w: 200,
          h: 30
        },
        "shape:bottomText": {
          id: "shape:bottomText",
          type: "text",
          x: 12.5,
          y: 18.25,
          rotation: 0,
          isLocked: false,
          isVisible: true,
          meta: {},
          childIndex: 6,
          name: "Bottom Text",
          text: "555-5555",
          font: "draw",
          size: "l",
          align: "middle",
          color: "#ffffff",
          opacity: 1,
          scale: 1,
          autoSize: false,
          w: 100,
          h: 40
        }
      },
      bindings: {},
      assets: {}
    }
  },
  // Concert Parking Sign Template
  {
    id: "concert-parking-sign",
    name: "Concert Parking Sign",
    categories: [
      { mainCategory: "Event Signs" },
      { mainCategory: "Parking" }
    ],
    thumbnail: "/assets/templates/event-signs/concert-parking-thumb.png",
    width: 24,
    height: 18,
    description: "Concert parking sign with blue background and directional arrow.",
    tags: ["concert", "parking", "event", "arrow", "blue"],
    document: {
      shapes: {
        "shape:background": {
          id: "shape:background",
          type: "rectangle",
          x: 12,
          y: 9,
          rotation: 0,
          isLocked: false,
          isVisible: true,
          meta: {},
          childIndex: 1,
          name: "Background",
          style: "fill",
          size: "m",
          w: 24,
          h: 18,
          fill: "#2563eb",
          stroke: "#1d4ed8",
          strokeWidth: 0.125,
          strokeType: "solid",
          dash: "solid",
          opacity: 1,
          radius: 0.5
        },
        "shape:mainText": {
          id: "shape:mainText",
          type: "text",
          x: 12,
          y: 8,
          rotation: 0,
          isLocked: false,
          isVisible: true,
          meta: {},
          childIndex: 2,
          name: "Main Text",
          text: "Concert Parking",
          font: "draw",
          size: "m",
          align: "middle",
          color: "#ffffff",
          opacity: 1,
          scale: 1,
          autoSize: false,
          w: 120,
          h: 40
        },
        "shape:arrowIcon": {
          id: "shape:arrowIcon",
          type: "text",
          x: 12,
          y: 12,
          rotation: 0,
          isLocked: false,
          isVisible: true,
          meta: {},
          childIndex: 3,
          name: "Arrow",
          text: "←",
          font: "draw",
          size: "xl",
          align: "middle",
          color: "#ffffff",
          opacity: 1,
          scale: 1,
          autoSize: false,
          w: 60,
          h: 60
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
      return template.categories.some(cat => 
        cat.mainCategory === category.mainCategory && 
        cat.subCategory === category.subCategory
      );
    }
    return template.categories.some(cat => cat.mainCategory === category.mainCategory);
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
    template.categories.forEach(cat => {
      categories.add(cat.mainCategory);
    });
  });
  return Array.from(categories).sort();
}

/**
 * Get all available subcategories for a main category
 */
export function getSubCategories(mainCategory: string): string[] {
  const subCategories = new Set<string>();
  mockTemplates.forEach(template => {
    template.categories.forEach(cat => {
      if (cat.mainCategory === mainCategory && cat.subCategory) {
        subCategories.add(cat.subCategory);
      }
    });
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