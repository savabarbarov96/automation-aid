# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Install dependencies
npm i

# Start development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

This is a React TypeScript application built with Vite, featuring:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC plugin for fast compilation
- **UI Components**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom animations
- **Backend**: Supabase for database, authentication, and storage
- **Routing**: React Router DOM with protected routes
- **State Management**: React Query for server state, React Hook Form for forms
- **Authentication**: Custom auth provider with Supabase integration

## Key Architecture Patterns

### Component Structure
- **Pages**: Main route components in `src/pages/`
- **Components**: Reusable UI components in `src/components/`
- **UI Components**: shadcn/ui components in `src/components/ui/`
- **Hooks**: Custom React hooks in `src/hooks/`
- **Types**: TypeScript definitions in `src/types/`

### Database Integration
- Supabase client configured in `src/integrations/supabase/client.ts`
- Database types auto-generated and extended in the client file
- Tables include: blog_posts, blog_users, contact_submissions, projects, clients, webhooks, and notification_settings

### Authentication Flow
- Protected routes use `ProtectedRoute` component
- Auth context provided by `AuthProvider` in `src/lib/auth.tsx`
- Login page handles authentication state

### Admin Functionality
- Blog admin at `/blog-admin` for content management
- Work admin at `/work-admin` for project portfolio management
- Protected routes require authentication

## Development Notes

- The app uses environment variables for Supabase configuration with fallbacks to hardcoded values
- Image uploads are handled through Supabase storage
- The codebase includes comprehensive TypeScript types for all database operations
- Components follow shadcn/ui patterns with consistent styling and accessibility
- The project is configured for deployment on Lovable platform but can be deployed anywhere

## File Structure Highlights

- `src/App.tsx`: Main app component with routing setup
- `src/integrations/supabase/`: Supabase configuration and types
- `src/components/ui/`: shadcn/ui component library
- `src/pages/`: Main application pages
- `supabase/`: Database migrations and edge functions