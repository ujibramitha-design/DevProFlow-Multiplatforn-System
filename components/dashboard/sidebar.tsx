"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Scale,
  Banknote,
  BarChart3,
  Database,
  HardHat,
  Key,
  Landmark,
  PenTool,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo3D } from "@/components/dashboard/logo-3d"
import { useAuth } from "@/components/auth/auth-provider"

const menuItems = [
  { icon: LayoutDashboard, label: "Main Dashboard", route: "/dashboard" },
  { icon: LayoutDashboard, label: "Executive Vision", route: "/executive" },
  { icon: Scale, label: "Legal Tracking", route: "/legal" },
  { icon: Banknote, label: "Finance", route: "/finance" },
  { icon: BarChart3, label: "Sales & Inventory", route: "/sales" },
  { icon: Database, label: "Document Control", route: "/master" },
  { icon: HardHat, label: "Construction", route: "/engineering" },
  { icon: Key, label: "Estate & BAST", route: "/estate" },
  { icon: Landmark, label: "Bank Portal", route: "/bank" },
  { icon: PenTool, label: "Notary Portal", route: "/notary" },
  { icon: Settings, label: "System Settings", route: "/settings" },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const isActive = (route: string) => {
    return pathname === route || pathname.startsWith(route + "/")
  }

  const handleLogout = () => {
    console.log('🚪 Logout clicked by user:', user?.email)
    logout()
  }

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col border-r border-border/40 transition-all duration-500 ease-in-out",
        "bg-gradient-to-b from-card via-card to-secondary/30 dark:from-[oklch(0.15_0.018_260)] dark:via-[oklch(0.15_0.018_260)] dark:to-[oklch(0.13_0.02_260)]",
        collapsed ? "w-[76px]" : "w-[260px]"
      )}
    >
      {/* Logo area */}
      <div className={cn(
        "flex items-center gap-3 px-5 pt-7 pb-6",
        collapsed && "justify-center px-0"
      )}>
        <Logo3D collapsed={collapsed} />
      </div>

      {/* Section label */}
      {!collapsed && (
        <div className="px-5 pb-2">
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground/50">
            Navigation
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className={cn("flex flex-1 flex-col gap-1", collapsed ? "px-3" : "px-3")}>
        {menuItems.map((item, index) => {
          const active = isActive(item.route)
          const IconComponent = item.icon
          
          return (
            <button
              key={item.route}
              onClick={() => router.push(item.route)}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all duration-300 animate-slide-in-right",
                collapsed && "justify-center px-0",
                active
                  ? "bg-primary/[0.08] text-primary"
                  : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              )}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* Active indicator bar */}
              {active && (
                <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
              )}
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
                  active
                    ? "bg-primary/10"
                    : "group-hover:bg-secondary"
                )}
              >
                <IconComponent
                  className={cn(
                    "size-[18px] transition-all duration-300",
                    active
                      ? "text-primary"
                      : "text-muted-foreground/70 group-hover:text-foreground"
                  )}
                  strokeWidth={active ? 2.2 : 1.8}
                />
              </div>
              {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-[72px] z-10 flex size-7 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground shadow-sm transition-all duration-300 hover:bg-secondary hover:text-foreground hover:shadow-md"
      >
        {collapsed ? (
          <ChevronRight className="size-3.5" />
        ) : (
          <ChevronLeft className="size-3.5" />
        )}
      </button>

      {/* Bottom user section */}
      <div className={cn("flex flex-col gap-3 border-t border-border/40 px-3 py-4", collapsed && "px-2")}>
        {/* User Profile */}
        <div className={cn(
          "flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-border/20",
          collapsed && "justify-center"
        )}>
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
            <span className="text-sm font-bold text-primary">MB</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Mas BramsRV</p>
              <p className="text-xs text-muted-foreground truncate">Super Admin / Owner</p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-muted-foreground transition-all duration-300 hover:bg-destructive/10 hover:text-destructive",
            "touch-manipulation cursor-pointer active:scale-95",
            collapsed && "justify-center px-0"
          )}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg">
            <LogOut className="size-[18px]" strokeWidth={1.8} />
          </div>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
