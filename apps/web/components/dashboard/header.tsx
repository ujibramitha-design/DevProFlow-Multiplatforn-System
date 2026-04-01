import { Calendar } from "lucide-react"
import { LiveClock } from "@/components/dashboard/live-clock"
import { ProposalGenerator } from "@/components/proposal/proposal-generator"

export function DashboardHeader() {
  const today = new Date()
  const formattedDate = today.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-in-up">
      <div>
        <p className="text-[13px] font-semibold text-primary/80 dark:text-primary/90 animate-slide-in-right">
          Selamat Datang Kembali
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-widest bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent text-balance leading-snug">
          DASHBOARD DEVPROFLOW
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <ProposalGenerator />
        <LiveClock />
        <button className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-[13px] font-bold text-primary-foreground shadow-md shadow-primary/15 transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 dark:shadow-primary/25 dark:hover:shadow-primary/35">
          <Calendar className="size-4" strokeWidth={2} />
          <span className="hidden sm:inline">{formattedDate}</span>
        </button>
      </div>
    </div>
  )
}
