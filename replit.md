# Master Signs Website

## Overview

Master Signs is a professional signage company website built with React and TypeScript, featuring a modern glassmorphism design. The application serves as a comprehensive platform for showcasing custom signage services including LED digital signs, vehicle wraps, laser engraving, custom banners, architectural signs, and installation services. The site emphasizes the company's faith-driven values and local community focus while providing an intuitive interface for customers to explore services and request quotes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Styling**: Tailwind CSS with custom CSS variables for consistent theming and responsive design
- **UI Components**: Radix UI primitives with shadcn/ui component library for accessible, customizable components
- **Animations**: Framer Motion for smooth transitions, hover effects, and scroll-triggered animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript throughout the entire stack for consistency
- **API Design**: RESTful endpoints for quote requests and testimonials management
- **Development Server**: Vite for fast development with HMR (Hot Module Replacement)
- **Build System**: esbuild for production builds with ESM output format

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Development Storage**: In-memory storage implementation for development and testing
- **Schema Management**: Drizzle Kit for database migrations and schema updates
- **Connection**: Neon Database serverless PostgreSQL for production deployment

### Authentication and Authorization
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL session storage
- **Future Implementation**: Customer login system with placeholder UI components ready for integration
- **Security**: Prepared infrastructure for user authentication and role-based access control

### Component Architecture
- **Layout Components**: Navigation, Hero, Services, About, Quote Form, Testimonials, Footer
- **UI Components**: Comprehensive shadcn/ui component library with custom Master Signs theming
- **Form Components**: Quote request form with file upload capabilities and validation
- **Responsive Design**: Mobile-first approach with responsive navigation and layouts

### Development and Build Process
- **Development**: Vite development server with TypeScript checking and fast refresh
- **Production Build**: Vite for client build, esbuild for server bundling
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Asset Management**: Vite asset pipeline with automatic optimization

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, TypeScript for the frontend framework
- **Vite**: Build tool and development server with React plugin and runtime error overlay
- **Express.js**: Backend web framework for API routes and server-side logic

### UI and Styling Libraries
- **Tailwind CSS**: Utility-first CSS framework with PostCSS and Autoprefixer
- **Radix UI**: Comprehensive collection of accessible, unstyled UI primitives
- **shadcn/ui**: Pre-built component library built on Radix UI with Tailwind styling
- **Framer Motion**: Animation library for smooth transitions and interactions
- **Lucide React**: Icon library for consistent iconography throughout the application

### Data Management
- **TanStack Query**: Server state management, caching, and synchronization
- **Drizzle ORM**: Type-safe SQL ORM for PostgreSQL database interactions
- **Drizzle Kit**: Database migration and schema management tools
- **Zod**: TypeScript-first schema validation library

### Form and Validation
- **React Hook Form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation resolver for Zod integration
- **Drizzle Zod**: Schema validation integration between Drizzle ORM and Zod

### Database and Storage
- **@neondatabase/serverless**: Serverless PostgreSQL database driver
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Development Tools
- **TypeScript**: Static type checking and enhanced developer experience
- **Wouter**: Lightweight routing library for React applications
- **date-fns**: Date utility library for date formatting and manipulation
- **clsx**: Utility for constructing className strings conditionally
- **class-variance-authority**: Utility for creating type-safe component variants

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for Replit environment
- **@replit/vite-plugin-cartographer**: Development tooling integration for Replit

### Additional Utilities
- **cmdk**: Command menu component for search functionality
- **embla-carousel-react**: Carousel component for testimonials and image galleries
- **nanoid**: Unique ID generation for various application needs