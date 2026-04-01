# 🚀 DevProFlow Enterprise - Turborepo Monorepo

> Platform enterprise untuk manajemen dan pemrosesan KPR secara modern dan efisien.

## 📋 Quick Start

### Prerequisites
- Node.js 18+ 
- PNPM 8+
- Git

### Installation

1. **Clone repository:**
```bash
git clone https://github.com/ujibramitha-design/WORKFLOW-PROTOCOL-DevPro-Enterprise-Full.git
cd DevProFlow-Enterprise
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Run development server:**
```bash
# Run all apps
pnpm dev

# Run specific app
pnpm dev --filter=@devproflow/web
```

4. **Open browser:**
```
http://localhost:3000
```

---

## 🏗️ Project Structure

```
DevProFlow-Enterprise/
├── apps/
│   ├── web/              # Next.js Web App (Source utama UI v0)
│   ├── mobile/           # React Native/Expo (Android APK)
│   └── desktop-winui/    # WinUI 3 Desktop App
│
├── packages/
│   ├── ui/               # Shared UI Components (v0)
│   ├── config/           # Shared Configs (Tailwind, TS, Shadcn)
│   └── utils/            # Shared Logic & Helpers
│
├── package.json          # Root workspace config
├── pnpm-workspace.yaml   # PNPM workspace
└── turbo.json            # Turborepo pipeline
```

📖 **[Lihat dokumentasi lengkap struktur →](./TURBOREPO-STRUCTURE.md)**

---

## 🎯 Features

### Dashboard KPR Enterprise
- ✅ **Authentication System** - Cookie-based auth dengan middleware
- ✅ **Real-time Dashboard** - KPI metrics & analytics
- ✅ **Data Tables** - Recent applications dengan filtering
- ✅ **Charts & Visualization** - Recharts integration
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **High Contrast UI** - Optimal readability

### Multi-Platform Support
- 🌐 **Web** - Next.js 16 dengan App Router
- 📱 **Mobile** - React Native/Expo (Android APK via EAS)
- 🖥️ **Desktop** - WinUI 3 dengan WebView2

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16, React 19
- **Styling:** Tailwind CSS 4
- **UI Components:** Shadcn/ui, Radix UI
- **Icons:** Lucide React
- **Charts:** Recharts
- **Fonts:** Plus Jakarta Sans, Geist Mono

### Monorepo
- **Build System:** Turborepo
- **Package Manager:** PNPM
- **TypeScript:** 5.7+

### Backend (Future)
- **API:** tRPC / REST API
- **Database:** PostgreSQL / Supabase
- **Auth:** NextAuth.js

---

## 📦 Available Scripts

### Development
```bash
pnpm dev                              # Run all apps
pnpm dev --filter=@devproflow/web     # Run web app only
pnpm dev --filter=@devproflow/mobile  # Run mobile app only
```

### Build
```bash
pnpm build                            # Build all apps
pnpm build --filter=@devproflow/web   # Build web app only
```

### Lint & Type Check
```bash
pnpm lint                             # Lint all workspaces
pnpm type-check                       # Type check all workspaces
```

---

## 🎨 Design System

### Color Palette
- **Primary:** Blue 600 (`#2563eb`)
- **Background:** Slate 50 (`#f8fafc`)
- **Foreground:** Slate 900 (`#0f172a`)
- **Border:** Slate 200 (`#e2e8f0`)

### Typography
- **Sans:** Plus Jakarta Sans
- **Mono:** Geist Mono

### High Contrast Guidelines
- NIK & Tanggal: `text-slate-600`
- Nama Nasabah: `text-slate-900 font-bold`
- Table Headers: `font-black text-slate-700`

---

## 📁 Workspace Packages

### `@devproflow/web`
Next.js web application dengan dashboard KPR.

### `@devproflow/mobile`
React Native/Expo app untuk Android.

### `@devproflow/desktop`
WinUI 3 desktop application untuk Windows.

### `@devproflow/ui`
Shared UI components yang bisa dipakai di semua platform.

### `@devproflow/config`
Shared configurations (Tailwind, TypeScript, ESLint).

### `@devproflow/utils`
Shared utilities dan helper functions.

---

## 🚀 Deployment

### Web (Vercel)
```bash
vercel --prod
```

### Mobile (EAS Build)
```bash
cd apps/mobile
eas build --platform android
```

### Desktop (MSIX)
```bash
cd apps/desktop-winui
dotnet publish -c Release
```

---

## 📚 Documentation

- [Turborepo Structure](./TURBOREPO-STRUCTURE.md) - Detailed structure documentation
- [Architecture](./ARCHITECTURE.md) - System architecture
- [Features & Modules](./FEATURES_AND_MODULES.md) - Feature list
- [GitHub Setup](./README-GITHUB-SETUP.md) - Git workflow

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 👥 Team

**DevProFlow Enterprise Team**
- Owner: Mas BramsRV
- GitHub: [@ujibramitha-design](https://github.com/ujibramitha-design)

---

## 🔗 Links

- **Repository:** [WORKFLOW-PROTOCOL-DevPro-Enterprise-Full](https://github.com/ujibramitha-design/WORKFLOW-PROTOCOL-DevPro-Enterprise-Full)
- **Documentation:** [Turborepo Docs](https://turbo.build/repo/docs)
- **Support:** Create an issue in GitHub

---

**Made with ❤️ by DevProFlow Team**
