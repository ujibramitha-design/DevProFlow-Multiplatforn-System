import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardTopbar } from "@/components/dashboard/topbar"

export default function DocumentControlPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-8 py-7">
            <div className="flex items-center justify-center h-[60vh] text-muted-foreground text-sm">
              Document Control — Main Content Area
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
