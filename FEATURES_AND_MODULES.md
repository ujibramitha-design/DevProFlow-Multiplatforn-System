# DevPro KPR Enterprise Dashboard - Features & Modules Extraction

## PROJECT OVERVIEW
**Platform**: Triple-Platform Hybrid System (Web, Mobile APK, Desktop)
**Purpose**: KPR (Mortgage) Application Management with Premium Enterprise Design
**Target Users**: Legal Teams, Finance Teams, BOD, Bank/Notary Staff, Sales Teams
**Theme**: Premium Enterprise Dark Mode (Deep Obsidian #000000)

---

## CORE FEATURES & MODULES

### 1. AUTHENTICATION & ROLE MANAGEMENT
**Module**: Role-Based Access Control (RBAC)
- **Legal (Web/Desktop Admin)**: Full system access, all platforms visible
- **BOD & Finance (Executive)**: Read-only analytics, KPI dashboards
- **Bank & Notary (Mobile APK)**: Field operations, document checklists
- **Sales (Web/Mobile)**: Status tracking only
**Components**: 
- `role-switcher.tsx` - Tab-based role selection interface
- `types.ts` - Role definitions and permission matrices

---

### 2. MAIN DASHBOARD HUBS
**Core Hubs**:
1. **Legal Hub** (Web/Desktop)
   - Document Management System
   - Full visibility into all three monitoring stages
   - Custom document builder with auto-monitoring queues
   - Compliance tracking

2. **Finance Hub** (Desktop)
   - KPI Analytics Dashboard
   - Currency tracking (Rp values right-aligned)
   - Financial risk assessment
   - Portfolio performance metrics
   - Budget forecasting

3. **BOD Panel** (Desktop Executive)
   - High-level strategic analytics
   - Executive KPI overview
   - Board-level reporting
   - Organizational performance tracking

4. **Field Hub** (Mobile APK)
   - Bank & Notary operations
   - Document stage visibility
   - On-ground document tracking
   - Unit/property inventory management
   - Simple status checklists

5. **Sales Hub** (Web)
   - Simple pipeline status
   - Akad ready tracking
   - TBO completion tracking
   - Retention claimed status

---

### 3. DOCUMENT & PIPELINE MONITORING
**Three Monitoring Stages**:
- **Pra-Akad**: Pre-agreement documents and initial processing
- **Akad**: Agreement/legal documentation stage
- **Pasca-Akad**: Post-agreement and retention management

**Modules**:
- `document-tracker.tsx` - Real-time document submission monitoring
- `bank-notary-tracking.tsx` - Pipeline stages with unit counts and values
- `bottleneck-detector.tsx` - Visual alerts for stuck units (>30 days stuck)
- `document-builder.tsx` - Dynamic custom document creation

---

### 4. DATA & ANALYTICS
**Features**:
- Currency formatting (Rp) with right-alignment
- Pipeline unit counts and valuation
- Completion percentage tracking
- Stage timing metrics
- Bottleneck risk levels (Green/Yellow/Red)
- Document profile segmentation (Fixed Income, Non-Fixed, Professional)
- Glassmorphism cards with glowing borders
- Real-time data synchronization readiness

**Components**:
- `mock-data.ts` - Data generators for all three platforms
- Recharts integration for analytics visualization
- Status indicator badges

---

### 5. USER INTERFACE COMPONENTS
**Design System**:
- Glassmorphism with gradient borders (Cyan/Blue glow)
- Premium Dark Theme (Obsidian background #000000)
- Status badges (Green/Yellow/Red glowing pills)
- Right-aligned numeric values in tables
- 44px minimum touch targets (Mobile)
- Responsive grid (Desktop 12 cols, Web 8 cols, Mobile 4 cols)
- Smooth animations and transitions

**UI Kit**:
- `theme.ts` - Premium dark theme configuration
- Tailwind CSS gradients and backdrop filters
- shadcn/ui component library integration
- Custom glassmorphic card styling

---

### 6. PLATFORM DETECTION & RESPONSIVENESS
**Module**: `platform-detector.tsx`
- Detects platform type (Desktop/Web/Mobile)
- Responsive layout switching
- Mobile-first design with scaling up
- Touch-optimized UI for mobile

**Responsive Breakpoints**:
- Desktop: Full analytics, high-density data
- Web: Standard dashboard layout
- Mobile (APK): Ultra-responsive, field-optimized

---

### 7. REAL-TIME MONITORING & ALERTS
**Features**:
- Bottleneck detection for units stuck >30 days
- Risk level assessment (Low/Medium/High)
- Visual alerting system
- Status change notifications
- Document submission tracking
- Compliance monitoring

**Components**:
- `bottleneck-detector.tsx` - Alert system
- Status indicator system with color coding

---

### 8. DATA SEGMENTATION & PROFILES
**Document Profiles**:
- **Profile A**: Fixed Income documents
- **Profile B**: Non-Fixed Income documents  
- **Profile C**: Professional/Self-employed documents
- Each profile has specific requirements and tracking

---

## FILE STRUCTURE
```
/components/
├── /devpro/
│   ├── types.ts (Role, Stage, Document interfaces)
│   ├── mock-data.ts (Data generators)
│   ├── command-center.tsx (Main orchestrator)
│   ├── role-switcher.tsx (Role selection UI)
│   ├── platform-detector.tsx (Platform adapter)
│   ├── /hubs/
│   │   ├── legal-hub.tsx
│   │   ├── finance-hub.tsx
│   │   ├── bod-panel.tsx
│   │   ├── field-hub.tsx
│   │   └── sales-hub.tsx
│   ├── /modules/
│   │   ├── document-tracker.tsx
│   │   ├── bank-notary-tracking.tsx
│   │   ├── bottleneck-detector.tsx
│   │   └── document-builder.tsx
│   └── /styles/
│       └── theme.ts
├── /dashboard/
│   ├── sidebar.tsx (Left navigation)
│   ├── topbar.tsx (Header with dual-mode toggle)
│   ├── header.tsx (Dashboard title)
│   ├── kpi-cards.tsx (Top stat cards)
│   ├── quick-stats.tsx (Performance metrics)
│   ├── department-hubs-section.tsx (Tab-based switcher)
│   └── theme-toggle.tsx (Light/Dark mode)
```

---

## KEY INTEGRATIONS
- **Chart Library**: Recharts for analytics visualizations
- **UI Component Library**: shadcn/ui (Tabs, Table, Badge, Card, Button)
- **Theme Management**: next-themes for light/dark mode
- **Styling**: Tailwind CSS with custom theme extensions
- **Font**: Plus Jakarta Sans + Geist Mono

---

## SUCCESS METRICS
- All three platforms render correctly with responsive design
- Role-based UI properly restricts/shows features
- Currency values consistently right-aligned
- Glassmorphism design applied throughout
- Data properly organized in tables with status indicators
- Bottleneck alerts visible with risk levels
- Mobile touch targets minimum 44px
- Smooth transitions and animations
- Real-time data syncing ready for backend integration
