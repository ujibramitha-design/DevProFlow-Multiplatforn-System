"use client"

import { TrendingUp, Package2, DollarSign, Users, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react"
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from "recharts"

// MOCK DATA FOR CHARTS
const performanceChartData = [
  { date: "Jan", revenue: 12000000, projects: 24, users: 45 },
  { date: "Feb", revenue: 15000000, projects: 28, users: 52 },
  { date: "Mar", revenue: 18000000, projects: 32, users: 61 },
  { date: "Apr", revenue: 16500000, projects: 29, users: 58 },
  { date: "May", revenue: 21000000, projects: 35, users: 72 },
  { date: "Jun", revenue: 24500000, projects: 38, users: 85 },
]

const recentActivityData = [
  { id: 1, activity: "Proyek KPR Selesai", category: "Sales", timestamp: "2 jam lalu", user: "Ahmad Fauzi", status: "Success" },
  { id: 2, activity: "Dokumen Legal Diupload", category: "Legal", timestamp: "4 jam lalu", user: "Siti Nurhaliza", status: "Success" },
  { id: 3, activity: "Proses Notarial Tertunda", category: "Notary", timestamp: "6 jam lalu", user: "Eka Putri", status: "Pending" },
  { id: 4, activity: "Pencairan Dana Ditolak", category: "Finance", timestamp: "1 hari lalu", user: "Dr. Budi Santoso", status: "Failed" },
  { id: 5, activity: "Verifikasi Bank Berhasil", category: "Bank", timestamp: "1 hari lalu", user: "Bambang Irawan", status: "Success" },
  { id: 6, activity: "Data Master Disinkronkan", category: "System", timestamp: "2 hari lalu", user: "System Admin", status: "Success" },
]

// STATUS COLOR MAPPING
const statusColors = {
  Success: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  Pending: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  Failed: "bg-red-500/20 text-red-300 border border-red-500/30",
}

// QUICK STATS CARDS
const quickStatsData = [
  {
    label: "Total Proyek",
    value: "2,847",
    change: "+12.5%",
    icon: Package2,
    trend: "up",
    accentClass: "from-blue-500/15 to-blue-500/5 text-blue-400",
  },
  {
    label: "Unit Terjual",
    value: "1,524",
    change: "+8.2%",
    icon: TrendingUp,
    trend: "up",
    accentClass: "from-emerald-500/15 to-emerald-500/5 text-emerald-400",
  },
  {
    label: "Revenue",
    value: "Rp 24.5 M",
    change: "+18.7%",
    icon: DollarSign,
    trend: "up",
    accentClass: "from-amber-500/15 to-amber-500/5 text-amber-400",
  },
  {
    label: "Data User",
    value: "892",
    change: "+5.3%",
    icon: Users,
    trend: "up",
    accentClass: "from-purple-500/15 to-purple-500/5 text-purple-400",
  },
]

export function MainDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-bold tracking-tight">DevProFlow Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Selamat datang! Pantau performa sistem secara real-time</p>
      </div>

      {/* QUICK STATS - 4 CARDS */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: "80ms" }}>
        {quickStatsData.map((stat, index) => {
          const IconComponent = stat.icon
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight
          const trendColor = stat.trend === "up" ? "text-emerald-400" : "text-red-400"
          
          return (
            <div
              key={stat.label}
              className={`group rounded-2xl bg-gradient-to-br ${stat.accentClass} p-5 sm:p-6 ring-1 ring-border/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:ring-border/50 cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] sm:text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide">{stat.label}</p>
                  <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold">{stat.value}</p>
                  <div className="mt-2 sm:mt-3 flex items-center gap-1">
                    <TrendIcon className={`size-3 sm:size-3.5 ${trendColor}`} />
                    <span className={`text-[11px] sm:text-xs font-semibold ${trendColor}`}>{stat.change}</span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground/60">vs bulan lalu</span>
                  </div>
                </div>
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-card/50 transition-all duration-300 group-hover:bg-card">
                  <IconComponent className="size-5 sm:size-6" strokeWidth={1.8} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* MAIN CHART - PERFORMANCE AREA CHART */}
      <div className="rounded-2xl bg-card p-4 sm:p-6 ring-1 ring-border/30 backdrop-blur-sm animate-fade-in-up overflow-hidden" style={{ animationDelay: "160ms" }}>
        <div className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold">Performa Sistem - 6 Bulan Terakhir</h2>
          <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-muted-foreground">Revenue, Jumlah Proyek, dan Total User</p>
        </div>
        <div className="h-60 sm:h-80 w-full -mx-2 sm:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={performanceChartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
              <YAxis yAxisId="left" stroke="rgba(255,255,255,0.5)" />
              <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(0,0,0,0.8)", 
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px"
                }} 
                formatter={(value) => {
                  if (typeof value === 'number' && value > 1000000) {
                    return `Rp ${(value / 1000000).toFixed(1)}M`
                  }
                  return value
                }}
              />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="revenue" fill="url(#colorRevenue)" stroke="#3b82f6" strokeWidth={2} name="Revenue (Rp)" />
              <Bar yAxisId="right" dataKey="projects" fill="#10b981" radius={[8, 8, 0, 0]} name="Proyek" />
              <Line yAxisId="right" type="monotone" dataKey="users" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", r: 4 }} name="User" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT ACTIVITY TABLE */}
      <div className="rounded-2xl bg-card ring-1 ring-border/30 backdrop-blur-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: "240ms" }}>
        <div className="border-b border-border/30 px-4 sm:px-6 py-3 sm:py-4 bg-secondary/30">
          <div className="flex items-center gap-2">
            <Zap className="size-4 sm:size-5 text-primary" />
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-semibold">Recent Activity</h2>
              <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground">Aktivitas terbaru dari seluruh sistem</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border/20 bg-secondary/10">
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-muted-foreground text-xs sm:text-sm">Aktivitas</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-muted-foreground hidden sm:table-cell text-xs sm:text-sm">Kategori</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-muted-foreground hidden md:table-cell text-xs sm:text-sm">Pengguna</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-muted-foreground text-xs sm:text-sm">Waktu</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-muted-foreground text-xs sm:text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivityData.map((activity, index) => (
                <tr 
                  key={activity.id} 
                  className="border-b border-border/20 transition-colors hover:bg-secondary/20 animate-fade-in-up"
                  style={{ animationDelay: `${320 + index * 40}ms` }}
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-foreground text-xs sm:text-sm">{activity.activity}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-muted-foreground hidden sm:table-cell">
                    <span className="inline-flex items-center rounded-full bg-secondary/60 px-2 py-0.5 text-[10px] sm:text-xs font-medium">
                      {activity.category}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-muted-foreground hidden md:table-cell text-[10px] sm:text-xs">{activity.user}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-muted-foreground/70 text-[10px] sm:text-xs">{activity.timestamp}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className={`inline-flex items-center rounded-full px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold ${statusColors[activity.status as keyof typeof statusColors]}`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border/20 px-4 sm:px-6 py-2 sm:py-3 bg-secondary/5 text-center">
          <button className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
            Lihat Semua Aktivitas →
          </button>
        </div>
      </div>

      {/* MOBILE OPTIMIZATION NOTE - Hidden on desktop */}
      <div className="text-center text-xs text-muted-foreground/50">
        <p>Dashboard dioptimalkan untuk tampilan mobile dan tablet</p>
      </div>
    </div>
  )
}
