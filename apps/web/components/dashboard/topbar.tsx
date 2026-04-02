"use client"

import { useState, useEffect } from "react"
import { Search, Bell, Command, MessageSquare, User, Settings, LogOut, X, Check } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/dashboard/theme-toggle"
import { useAuth } from "@/components/auth/auth-provider"

export function DashboardTopbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Pengajuan Baru", message: "Ahmad Fauzi mengajukan KPR Rp 450jt", time: "5 menit lalu", read: false },
    { id: 2, title: "Dokumen Disetujui", message: "Verifikasi dokumen Siti Nurhaliza selesai", time: "1 jam lalu", read: false },
    { id: 3, title: "Reminder", message: "3 pengajuan menunggu approval Anda", time: "2 jam lalu", read: true },
    { id: 4, title: "Update Status", message: "Budi Santoso - Status berubah ke Review", time: "3 jam lalu", read: true },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    console.log('🔍 Searching:', e.target.value)
  }

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const handleLogout = () => {
    console.log('🚪 Logging out...')
    logout()
    router.push('/auth')
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false)
      setShowProfile(false)
    }
    if (showNotifications || showProfile) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showNotifications, showProfile])

  // Breadcrumb mapping based on route
  const breadcrumbMap: { [key: string]: { primary: string; secondary: string } } = {
    "/dashboard": { primary: "Dashboard", secondary: "Ringkasan Sistem" },
    "/executive": { primary: "Executive", secondary: "Vision & Analytics" },
    "/legal": { primary: "Legal", secondary: "Tracking & Compliance" },
    "/finance": { primary: "Finance", secondary: "Management Hub" },
    "/sales": { primary: "Sales", secondary: "Inventory & Reporting" },
    "/master": { primary: "Master Data", secondary: "Document Control" },
    "/engineering": { primary: "Engineering", secondary: "Construction Tracking" },
    "/estate": { primary: "Estate", secondary: "BAST Management" },
    "/bank": { primary: "Bank", secondary: "Portal Integration" },
    "/notary": { primary: "Notary", secondary: "Portal Services" },
    "/settings": { primary: "Settings", secondary: "System Configuration" },
  }

  const breadcrumb = breadcrumbMap[pathname] || { primary: "Dashboard", secondary: "Ringkasan" }

  return (
    <header className="flex h-[64px] items-center justify-between bg-card/50 px-8 backdrop-blur-xl border-b border-border/30">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-1.5" aria-label="Breadcrumb">
          <span className="text-[13px] font-bold text-foreground">{breadcrumb.primary}</span>
          <span className="text-muted-foreground/40 select-none">/</span>
          <span className="text-[13px] font-medium text-muted-foreground">{breadcrumb.secondary}</span>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:flex">
          <Search className="absolute left-3 top-1/2 size-[15px] -translate-y-1/2 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Cari data..."
            value={searchQuery}
            onChange={handleSearch}
            className="h-9 w-52 rounded-xl border-0 bg-secondary/60 pl-9 pr-16 text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:bg-secondary focus:ring-2 focus:ring-primary/15 focus:shadow-sm"
          />
          <div className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded-md bg-background/80 px-1.5 py-0.5 border border-border/40">
            <Command className="size-3 text-muted-foreground/50" />
            <span className="text-[10px] font-semibold text-muted-foreground/50">K</span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden h-6 w-px bg-border/50 md:block" />

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Messages */}
        <button
          className="relative flex size-9 items-center justify-center rounded-xl bg-secondary/50 text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground hover:shadow-sm"
          aria-label="Pesan masuk"
        >
          <MessageSquare className="size-[15px]" strokeWidth={1.8} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="relative flex size-9 items-center justify-center rounded-xl bg-secondary/50 text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground hover:shadow-sm"
            aria-label="Notifikasi"
          >
            <Bell className="size-[15px]" strokeWidth={1.8} />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex size-2 items-center justify-center rounded-full bg-red-400 ring-2 ring-card">
                <span className="absolute size-full rounded-full bg-red-400" style={{ animation: "dot-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-card shadow-xl ring-1 ring-border/30 z-50" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-border/30 px-4 py-3">
                <div>
                  <h3 className="text-sm font-bold text-foreground">Notifikasi</h3>
                  <p className="text-xs text-muted-foreground">{unreadCount} belum dibaca</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs font-semibold text-primary hover:text-primary/80"
                  >
                    Tandai semua dibaca
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`border-b border-border/20 px-4 py-3 transition-colors hover:bg-secondary/50 cursor-pointer ${
                      !notif.read ? 'bg-primary/5' : ''
                    }`}
                    onClick={() => handleMarkAsRead(notif.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-foreground">{notif.title}</h4>
                          {!notif.read && <span className="size-2 rounded-full bg-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">{notif.time}</p>
                      </div>
                      {notif.read && <Check className="size-4 text-emerald-500" />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/30 px-4 py-2">
                <button className="w-full text-center text-xs font-semibold text-primary hover:text-primary/80">
                  Lihat semua notifikasi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-border/50" />

        {/* Profile */}
        <div className="relative">
          <button 
            onClick={(e) => { e.stopPropagation(); setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-all duration-300 hover:bg-secondary/60"
          >
            <div className="hidden text-right sm:block">
              <p className="text-[13px] font-bold text-foreground leading-tight">{user?.name || 'Analis Kredit'}</p>
              <p className="text-[11px] font-medium text-muted-foreground leading-tight">{user?.email || 'admin@kprflow.id'}</p>
            </div>
            <Avatar className="size-9 ring-2 ring-primary/10 ring-offset-2 ring-offset-card">
              <AvatarImage
                src={user?.avatar || "https://api.dicebear.com/9.x/notionists/svg?seed=Felix"}
                alt="Avatar pengguna"
              />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-[11px] font-bold">
                {user?.name?.substring(0, 2).toUpperCase() || 'AK'}
              </AvatarFallback>
            </Avatar>
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-card shadow-xl ring-1 ring-border/30 z-50" onClick={(e) => e.stopPropagation()}>
              <div className="border-b border-border/30 px-4 py-3">
                <p className="text-sm font-bold text-foreground">{user?.name || 'Analis Kredit'}</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'admin@kprflow.id'}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{user?.role || 'Admin'}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => { router.push('/settings'); setShowProfile(false); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <User className="size-4" />
                  Profil Saya
                </button>
                <button
                  onClick={() => { router.push('/settings'); setShowProfile(false); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <Settings className="size-4" />
                  Pengaturan
                </button>
              </div>
              <div className="border-t border-border/30 py-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="size-4" />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
