"use client"

import { AlertTriangle, TrendingUp, DollarSign, BarChart3 } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from "recharts"

const topMetricsData = [
  {
    title: "Total Nilai Pipeline",
    value: "Rp 277.500.000.000",
    icon: DollarSign,
    gradientFrom: "from-primary/15",
    gradientTo: "to-primary/5",
    iconColor: "text-primary",
  },
  {
    title: "Rata-rata Approval Bank",
    value: "82%",
    icon: TrendingUp,
    gradientFrom: "from-emerald-500/15",
    gradientTo: "to-emerald-500/5",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
]

const bottleneckData = [
  {
    departemen: "Legal Internal",
    titikProses: "Pemberkasan Pra-Akad",
    unitMandek: 14,
    potensiTertahan: "Rp 10.500.000.000",
    tingkatRisiko: "Kritis",
    warnaRisiko: "red",
  },
  {
    departemen: "Bank",
    titikProses: "Menunggu Terbit SP3K",
    unitMandek: 8,
    potensiTertahan: "Rp 6.200.000.000",
    tingkatRisiko: "Waspada",
    warnaRisiko: "yellow",
  },
  {
    departemen: "Notaris",
    titikProses: "Proses Balik Nama",
    unitMandek: 22,
    potensiTertahan: "Rp 18.400.000.000",
    tingkatRisiko: "Kritis",
    warnaRisiko: "red",
  },
  {
    departemen: "Finance",
    titikProses: "Pencairan Klaim Retensi",
    unitMandek: 2,
    potensiTertahan: "Rp 850.000.000",
    tingkatRisiko: "Terkendali",
    warnaRisiko: "green",
  },
]

const analyticsChartData = [
  { bulan: "Jan", nilai: 45000000000, approval: 72 },
  { bulan: "Feb", nilai: 52000000000, approval: 75 },
  { bulan: "Mar", nilai: 48000000000, approval: 80 },
  { bulan: "Apr", nilai: 61000000000, approval: 82 },
  { bulan: "May", nilai: 55000000000, approval: 78 },
  { bulan: "Jun", nilai: 67000000000, approval: 85 },
]

const bottleneckChartData = [
  { department: "Legal", mandek: 14 },
  { department: "Bank", mandek: 8 },
  { department: "Notaris", mandek: 22 },
  { department: "Finance", mandek: 2 },
]

function RiskBadge({ risk, color }: { risk: string; color: string }) {
  const colorClasses = {
    red: "bg-red-500/20 text-red-400 ring-1 ring-red-500/30",
    yellow: "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30",
    green: "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30",
  }

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${colorClasses[color as keyof typeof colorClasses] || colorClasses.green}`}>
      {risk}
    </span>
  )
}

export function ExecutiveDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight">Executive Vision & Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Real-time performance metrics and bottleneck analysis</p>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 animate-fade-in-up" style={{ animationDelay: "120ms" }}>
        {topMetricsData.map((metric) => (
          <div
            key={metric.title}
            className={`rounded-2xl bg-gradient-to-br ${metric.gradientFrom} ${metric.gradientTo} p-6 ring-1 ring-border/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:ring-border/50`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <p className="mt-3 text-2xl font-bold tracking-tight text-right">{metric.value}</p>
              </div>
              <div className={`ml-4 flex size-12 shrink-0 items-center justify-center rounded-xl bg-card/50 ${metric.iconColor}`}>
                <metric.icon className="size-6" strokeWidth={2} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* High-Level Analytics Chart */}
      <div className="rounded-2xl bg-card p-6 ring-1 ring-border/30 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: "240ms" }}>
        <h2 className="text-lg font-semibold">High-Level Analytics</h2>
        <p className="text-xs text-muted-foreground">Pipeline Value vs Approval Rate (6 bulan terakhir)</p>
        <div className="mt-6 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={analyticsChartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="bulan" stroke="rgba(255,255,255,0.5)" />
              <YAxis yAxisId="left" stroke="rgba(255,255,255,0.5)" />
              <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.5)" />
              <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }} />
              <Legend />
              <Bar yAxisId="left" dataKey="nilai" fill="url(#colorNilai)" radius={[8, 8, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="approval" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottleneck Warning Chart */}
      <div className="rounded-2xl bg-card p-6 ring-1 ring-border/30 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: "360ms" }}>
        <div className="mb-6 flex items-center gap-2">
          <AlertTriangle className="size-5 text-red-500" />
          <h2 className="text-lg font-semibold">Unit Mandek (lebih dari 90 Hari)</h2>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bottleneckChartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="department" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }} />
              <Bar dataKey="mandek" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottleneck Summary Table */}
      <div className="rounded-2xl bg-card ring-1 ring-border/30 backdrop-blur-sm animate-fade-in-up overflow-hidden" style={{ animationDelay: "480ms" }}>
        <div className="border-b border-border/30 px-6 py-4">
          <h2 className="text-lg font-semibold">Bottleneck Summary</h2>
          <p className="mt-1 text-xs text-muted-foreground">Units stuck for more than 90 days</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20 bg-secondary/30">
                <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Departemen/Pihak</th>
                <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Titik Proses</th>
                <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Unit Mandek (lebih dari 90 Hari)</th>
                <th className="px-6 py-4 text-right font-semibold text-muted-foreground">Potensi Nilai Tertahan</th>
                <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Tingkat Risiko</th>
              </tr>
            </thead>
            <tbody>
              {bottleneckData.map((item, index) => (
                <tr key={index} className="border-b border-border/20 transition-colors hover:bg-secondary/20">
                  <td className="px-6 py-4 font-medium">{item.departemen}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.titikProses}</td>
                  <td className="px-6 py-4 text-right font-semibold">{item.unitMandek}</td>
                  <td className="px-6 py-4 text-right font-semibold text-primary">{item.potensiTertahan}</td>
                  <td className="px-6 py-4">
                    <RiskBadge risk={item.tingkatRisiko} color={item.warnaRisiko} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
