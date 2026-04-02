# 🚀 DevProFlow Enterprise - Turborepo Monorepo Structure

## 📁 Struktur Proyek

```
DevProFlow-Enterprise/
├── apps/
│   ├── web/              # Next.js (Web App) - Source utama UI v0
│   │   ├── app/          # Next.js App Router
│   │   ├── components/   # Web-specific components
│   │   ├── public/       # Static assets
│   │   ├── lib/          # Web utilities
│   │   ├── hooks/        # React hooks
│   │   └── package.json  # @devproflow/web
│   │
│   ├── mobile/           # React Native/Expo (Android APK via EAS)
│   │   └── package.json  # Mengambil build dari web-app
│   │
│   └── desktop-winui/    # WinUI 3 Desktop App
│       └── package.json  # Mengambil build dari web-app
│
├── packages/
│   ├── ui/               # Shared UI Components (v0)
│   │   ├── components/   # Sidebar, Topbar, Table, dll
│   │   ├── index.ts      # Export semua components
│   │   └── package.json  # @devproflow/ui
│   │
│   ├── config/           # Shared Configurations
│   │   ├── tailwind.config.js  # Shared Tailwind config
│   │   ├── tsconfig.json       # Shared TypeScript config
│   │   └── package.json        # @devproflow/config
│   │
│   └── utils/            # Shared Logic & Helpers
│       ├── index.ts      # API calls, helper functions
│       └── package.json  # @devproflow/utils
│
├── package.json          # Root package.json dengan workspace config
├── pnpm-workspace.yaml   # PNPM workspace configuration
└── turbo.json            # Turborepo build pipeline
```

---

## 🎯 Deskripsi Setiap Workspace

### **Apps**

#### 1. **apps/web/** - Next.js Web App
- **Framework:** Next.js 16 dengan App Router
- **Purpose:** Source utama UI dari v0.dev
- **Features:**
  - Dashboard KPR Enterprise
  - Authentication system
  - Real-time data visualization
  - Responsive design
- **Dependencies:**
  - `@devproflow/ui` - Shared components
  - `@devproflow/utils` - Shared utilities
  - `@devproflow/config` - Shared configs

#### 2. **apps/mobile/** - React Native/Expo
- **Framework:** React Native dengan Expo
- **Purpose:** Android APK via EAS Build
- **Build Source:** Mengambil komponen dari `@devproflow/ui`
- **Platform:** Android (APK)

#### 3. **apps/desktop-winui/** - WinUI 3 Desktop
- **Framework:** WinUI 3 dengan WebView2
- **Purpose:** Desktop application untuk Windows
- **Build Source:** Mengambil build dari web-app
- **Platform:** Windows Desktop

---

### **Packages**

#### 1. **packages/ui/** - Shared UI Components
- **Purpose:** Komponen v0 yang bisa dipakai di semua platform
- **Components:**
  - Sidebar - Navigation component
  - Topbar - Header dengan profil & notifikasi
  - Table - Data table untuk Recent Applications
  - KPI Cards - Dashboard metrics
  - Charts - Data visualization
- **Design System:**
  - Clean white theme
  - High contrast untuk readability
  - No dark mode dependencies
  - Platform-agnostic (Web, Mobile, Desktop)

#### 2. **packages/config/** - Shared Configurations
- **Tailwind Config:**
  - Shared color palette
  - Consistent spacing & typography
  - Border radius & shadows
  - Custom utilities
- **TypeScript Config:**
  - Shared compiler options
  - Path aliases
  - Strict type checking
- **Shadcn Components:**
  - Component configuration
  - Theme tokens
  - Variant definitions

#### 3. **packages/utils/** - Shared Logic
- **Helper Functions:**
  - `cn()` - Class name merger (clsx + tailwind-merge)
  - API client utilities
  - Date formatters
  - Validation helpers
- **API Calls:**
  - Centralized API endpoints
  - Request/response handlers
  - Error handling

---

## 🔧 Scripts & Commands

### Development
```bash
# Run all apps in dev mode
turbo run dev

# Run specific app
turbo run dev --filter=@devproflow/web
turbo run dev --filter=@devproflow/mobile

# Run with pnpm
pnpm dev
pnpm dev --filter=@devproflow/web
```

### Build
```bash
# Build all apps
turbo run build

# Build specific app
turbo run build --filter=@devproflow/web
```

### Lint & Type Check
```bash
# Lint all workspaces
turbo run lint

# Type check all workspaces
turbo run type-check
```

---

## 📦 Package Dependencies

### Workspace Protocol
Menggunakan `workspace:*` untuk internal dependencies:

```json
{
  "dependencies": {
    "@devproflow/ui": "workspace:*",
    "@devproflow/utils": "workspace:*",
    "@devproflow/config": "workspace:*"
  }
}
```

### Peer Dependencies
Packages menggunakan peer dependencies untuk React:

```json
{
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

---

## 🎨 Design System

### Color Palette (Light Theme)
- **Background:** `#f8fafc` (Slate 50)
- **Foreground:** `#0f172a` (Slate 900)
- **Primary:** `#2563eb` (Blue 600)
- **Border:** `#e2e8f0` (Slate 200)

### Typography
- **Font Sans:** Plus Jakarta Sans
- **Font Mono:** Geist Mono

### High Contrast Guidelines
- **NIK & Tanggal:** `text-slate-600` untuk kontras optimal
- **Nama Nasabah:** `text-slate-900 font-bold`
- **Headers:** `font-black text-slate-700`

---

## 🚀 Build Pipeline (turbo.json)

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "type-check": {
      "dependsOn": ["^type-check"]
    }
  }
}
```

---

## 📝 Best Practices

### 1. **Component Development**
- Buat komponen di `packages/ui` jika akan dipakai di multiple apps
- Gunakan TypeScript untuk type safety
- Hindari library yang hanya jalan di web (seperti `next-themes`)

### 2. **Styling**
- Gunakan Tailwind classes dari `packages/config`
- Konsisten dengan design system
- High contrast untuk semua platform

### 3. **State Management**
- Shared logic di `packages/utils`
- API calls centralized
- Type-safe dengan TypeScript

### 4. **Build Optimization**
- Turbo cache untuk faster builds
- Incremental builds
- Parallel execution

---

## 🔄 Migration Status

✅ **Completed:**
- Struktur folder Turborepo
- Package.json untuk semua workspaces
- Turbo.json configuration
- PNPM workspace setup
- File Next.js copied ke apps/web
- Shared configs di packages/config
- Utils package dengan cn() helper

⏳ **Pending:**
- Install dependencies (perlu restart IDE)
- Pindahkan komponen v0 ke packages/ui
- Test build pipeline
- Setup EAS untuk mobile
- Configure WebView2 untuk desktop

---

## 📚 Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [PNPM Workspaces](https://pnpm.io/workspaces)
- [Next.js](https://nextjs.org)
- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [WinUI 3](https://learn.microsoft.com/en-us/windows/apps/winui/)

---

**Last Updated:** April 1, 2026
**Version:** 0.1.0
**Maintainer:** DevProFlow Team
