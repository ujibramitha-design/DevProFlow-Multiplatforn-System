import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardTopbar } from "@/components/dashboard/topbar"
import { MainDashboard } from "@/components/dashboard/main-dashboard"

export default function MainDashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 sm:px-8 py-6 sm:py-7">
            <MainDashboard />
          </div>
        </main>
      </div>
    </div>
  )
}
