"use client"

import { Calendar, Bell, Settings } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Selamat Datang Kembali</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Berikut adalah ringkasan performa sistem Anda hari ini
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-secondary/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground">
          <Calendar className="size-4" />
          Hari Ini
        </button>
        <button className="flex size-10 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground">
          <Bell className="size-5" />
        </button>
        <button className="flex size-10 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground">
          <Settings className="size-5" />
        </button>
      </div>
    </div>
  )
}
