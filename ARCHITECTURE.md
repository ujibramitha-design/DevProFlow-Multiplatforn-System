# KPR Enterprise Dashboard - Merged Architecture

## Overview
Single unified dashboard application with all devpro features merged into the main dashboard component structure.

## Application Structure

```
/app
  ├── layout.tsx                 # Root layout with next-themes provider
  ├── globals.css               # Global styles
  └── page.tsx                  # Main dashboard page

/components/dashboard
  ├── sidebar.tsx               # Navigation with department submenu
  ├── topbar.tsx                # Header with dual-mode toggle & clock
  ├── header.tsx                # Dashboard header
  ├── kpi-cards.tsx             # KPI metrics cards
  ├── quick-stats.tsx           # Quick statistics
  ├── department-hubs-section.tsx  # Department hub tabs & content (Legal, Finance, Estate, Engineering, Executive, Admin)
  ├── theme-toggle.tsx          # Dark/Light mode toggle
  ├── logo-3d.tsx               # 3D logo component
  ├── mock-data.ts              # Sample data
  └── styles/                   # Component styles
```

## Core Features

### 1. Dashboard Header
- Company branding and title
- Responsive design across devices

### 2. KPI Cards
- Real-time metrics display
- Animated counters
- Performance indicators

### 3. Quick Stats Section
- Summary statistics cards
- Status overview
- Department snapshot

### 4. Department Hubs Section
Replaced "Antrian Pengajuan Terbaru" table with interactive tab system:

**Tabs:**
- Legal - Document management & compliance
- Finance - Analytics & reporting
- Estate - Property management
- Engineering - Technical infrastructure
- Executive - Strategic KPIs
- Admin - System administration

**Functionality:**
- Horizontal scrollable tabs
- Active state with cyan glow effect
- Dynamic content per department
- Glassmorphism design with backdrop blur

### 5. Navigation Sidebar
- Dashboard menu item (always visible)
- Expandable department submenu (Legal, Finance, Estate, Engineering, Executive, Admin)
- Settings menu (before Logout)
- Logout button
- Collapse/expand toggle

### 6. Topbar Features
- Real-time clock display
- Dual-mode toggle (Dark/Light theme via next-themes)
- User profile/settings access
- Responsive layout

## Merged Components

All functionality that was previously in `/components/devpro/` has been consolidated:

### Hub Functions
- Legal Hub → DepartmentHubsSection (Legal tab)
- Finance Hub → DepartmentHubsSection (Finance tab)
- BOD Panel → DepartmentHubsSection (Executive tab)
- Field Hub → DepartmentHubsSection (Estate tab)
- Sales Hub → DepartmentHubsSection (Engineering tab)
- Admin Hub → DepartmentHubsSection (Admin tab)

### Analytics & Monitoring
- KPI tracking → KpiCards component
- Real-time metrics → QuickStats component
- Document tracking → Integrated in DepartmentHubsSection
- Bottleneck detection → Part of department-specific content

## Design System

### Color Palette
- Primary: Cyan (#00d9ff)
- Background: Black (#000000)
- Success: Emerald (#00ff88)
- Warning: Amber (#ffb700)
- Error: Rose (#ff3366)
- Neutrals: Grayscale with opacity

### Key Design Patterns
- Glassmorphism with backdrop blur
- Neon glow effects
- Dark enterprise theme
- Smooth animations & transitions
- Right-aligned currency values
- 44px+ touch targets for mobile

## Routing

Single-page application using Next.js App Router:
- `/` - Main dashboard page (unified entry point)
- All features accessible via tabs and navigation without additional routes

## State Management

React hooks with `useState` for:
- Department/tab selection
- Theme toggling (via next-themes)
- Sidebar collapse/expand
- Dashboard navigation

## Technology Stack

- Next.js 16+ (App Router)
- React 19+
- Tailwind CSS v4
- next-themes (for theme switching)
- Lucide React (icons)
- shadcn/ui (component library)

## Benefits of Merge

1. **Single Entry Point** - No complex routing or separate platforms
2. **Simplified State** - All department data managed in one component
3. **Consistent UX** - Unified design language across all features
4. **Better Performance** - Reduced bundle size and faster navigation
5. **Easier Maintenance** - All components in dashboard folder
6. **Scalability** - Can be extended without folder proliferation

## Future Enhancements

- Add real API integration replacing mock data
- Implement WebSocket for real-time updates
- Add role-based access control (RBAC)
- Expand department content with full CRUD operations
- Add data visualization with Recharts
- Implement advanced filtering and search
