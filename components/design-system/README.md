# Universal Master Design System

A robust, modular, and stateless Master Design UI System for multi-platform applications (Web, Android Mobile, and Desktop) with Premium Dual Theme support.

## 🏗️ Architecture

- **Framework**: Next.js 14+, Tailwind CSS, Lucide React icons
- **Stateless Principle**: No API calls or Database logic inside UI components
- **Multi-Platform Ready**: Responsive layouts for Desktop, Mobile, and Tablet
- **Premium Dual Theme**: High-contrast but soft-on-eyes Light and Dark modes

## 🎨 Theme Specifications

### Light Mode
- Background: `#f8fafc` (Slate 50)
- Card/Surface: `#ffffff`
- Primary: `#2563eb` (Blue 600)
- Border: `#e2e8f0` (Slate 200)

### Dark Mode
- Background: `#0f172a` (Slate 900)
- Card/Surface: `#1e293b` (Slate 800)
- Primary: `#3b82f6` (Blue 500)
- Border: `#334155` (Slate 700)

### Transitions
- Smooth 500ms color transition for all elements

## 📦 Components

### MasterShell
Root wrapper component that includes ThemeProvider and global layout structure.

```tsx
import { MasterShell } from '@/components/design-system';

<MasterShell navigation={<AdaptiveNav items={navItems} />}>
  <YourAppContent />
</MasterShell>
```

### AdaptiveNav
Navigation component that automatically transforms based on screen size:
- **Desktop (>1024px)**: Fixed Glassmorphism Sidebar
- **Mobile (<1024px)**: Fixed Bottom Navigation Bar + Hamburger Menu

```tsx
import { AdaptiveNav, NavigationItem } from '@/components/design-system';

const navItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, href: '/settings' }
];

<AdaptiveNav items={navItems} />
```

### PremiumCard
Versatile card component with hover animations and theme support.

```tsx
import { PremiumCard, PremiumCardHeader, PremiumCardContent } from '@/components/design-system';

<PremiumCard hover glassmorphism>
  <PremiumCardHeader title="Card Title" description="Card description" />
  <PremiumCardContent>
    Your content here
  </PremiumCardContent>
</PremiumCard>
```

### ThemeToggle
Toggle switch with Sun/Moon icons and smooth animations.

```tsx
import { ThemeToggle } from '@/components/design-system';

<ThemeToggle size="md" />
```

### StatelessTable
Clean data table component that accepts data via props.

```tsx
import { StatelessTable, TableColumn } from '@/components/design-system';

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', align: 'center' }
];

<StatelessTable 
  data={tableData} 
  columns={columns}
  hover
  striped
  bordered
/>
```

## 🔧 Usage

### Installation
All components are ready to use. Just import from the design system:

```tsx
import { 
  MasterShell, 
  AdaptiveNav, 
  PremiumCard, 
  ThemeToggle, 
  StatelessTable 
} from '@/components/design-system';
```

### TypeScript Support
Full TypeScript support with comprehensive interfaces:

```tsx
import type { 
  NavigationItem, 
  TableColumn, 
  PremiumCardProps 
} from '@/components/design-system';
```

## 📱 Platform Detection

Built-in platform detection hook:

```tsx
import { usePlatformDetection } from '@/components/design-system';

const { isMobile, isDesktop, platform } = usePlatformDetection();
```

## 🎯 Features

- ✅ **100% TypeScript** with strict typing
- ✅ **Responsive Design** for all screen sizes
- ✅ **Touch-Friendly** with 44px+ touch targets
- ✅ **Theme Support** with smooth transitions
- ✅ **Glassmorphism Effects** for modern aesthetics
- ✅ **Accessibility** with proper ARIA labels
- ✅ **Performance Optimized** with minimal re-renders
- ✅ **Modular Architecture** for easy customization

## 📁 Folder Structure

```
components/design-system/
├── interfaces/
│   └── index.ts              # TypeScript interfaces
├── hooks/
│   └── use-platform-detection.ts
├── components/
│   ├── MasterShell.tsx
│   ├── AdaptiveNav.tsx
│   ├── PremiumCard.tsx
│   ├── ThemeToggle.tsx
│   └── StatelessTable.tsx
├── index.ts                  # Main export file
└── README.md                 # This documentation
```

## 🚀 Getting Started

1. **Import components** from the design system
2. **Wrap your app** with `MasterShell`
3. **Add navigation** with `AdaptiveNav`
4. **Build UI** with `PremiumCard` and `StatelessTable`
5. **Customize theme** using CSS variables in `globals.css`

## 🎨 Customization

### Theme Variables
Override CSS variables in your global styles:

```css
:root {
  --primary: #your-color;
  --background: #your-bg;
  /* ... */
}
```

### Component Variants
All components support extensive customization via props:

```tsx
<PremiumCard 
  hover={true}
  glassmorphism={true}
  padding="lg"
  border={true}
  shadow={true}
/>
```

## 🔒 Stateless Design

All components are completely stateless:
- **No API calls** inside components
- **No database logic** in UI layer
- **Data passed via props** only
- **Easy integration** with any backend (Firebase, Supabase, etc.)

## 📱 Mobile Optimization

- **Touch targets**: Minimum 44px for accessibility
- **Responsive navigation**: Bottom nav for mobile, sidebar for desktop
- **Gesture support**: Touch-manipulation CSS for better mobile experience
- **Viewport awareness**: Platform detection hook for conditional rendering

## 🌙 Theme System

Built-in theme system with:
- **System preference detection**
- **Manual theme switching**
- **Smooth transitions** (500ms)
- **Persistent theme storage**
- **CSS custom properties** for easy customization
