# GovtJobsNow

## Overview

GovtJobsNow is a full-stack web application that serves as a government job portal, automatically collecting and displaying the latest government job openings from official websites. The application provides a clean, user-friendly interface for job seekers to search, filter, and view government positions with real-time updates. Built with modern web technologies, it features a React frontend with Tailwind CSS for styling, an Express.js backend, and PostgreSQL database with Drizzle ORM for data management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and better development experience
- **Styling**: Tailwind CSS with a comprehensive design system using CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **State Management**: TanStack Query for server state management and data fetching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture  
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the full stack
- **API Design**: RESTful API endpoints for job management (GET, POST operations)
- **Request Processing**: Express middleware for JSON parsing, URL encoding, and request logging
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Schema**: Well-defined job and user entities with proper relationships
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development and PostgreSQL for production
- **Migrations**: Drizzle Kit for database schema migrations

### Web Scraping System
- **Mock Implementation**: Simulated scraping functionality for government job sites
- **Data Structure**: Standardized job data format including title, department, location, qualifications, deadlines, and application links
- **Parsing Logic**: HTML content parsing to extract structured job information
- **Multiple Sources**: Support for scraping from multiple government job portals

### Authentication and Authorization
- **User Management**: Basic user schema with username/password authentication
- **Session Handling**: Prepared for session-based authentication (connect-pg-simple for PostgreSQL session storage)

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Connection**: Environment-based database URL configuration

### Development Tools
- **Vite Plugins**: Runtime error overlay and cartographer for enhanced development experience
- **TypeScript**: Full-stack type safety with shared schemas between client and server
- **ESBuild**: Fast bundling for production server builds

### UI and Styling
- **Radix UI**: Headless UI primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icon sets for social media and branding

### Data Management
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation and schema validation
- **Date-fns**: Date manipulation and formatting utilities

### Development Dependencies
- **Drizzle Kit**: Database schema management and migrations
- **TSX**: TypeScript execution for development server
- **PostCSS**: CSS processing with Tailwind CSS integration