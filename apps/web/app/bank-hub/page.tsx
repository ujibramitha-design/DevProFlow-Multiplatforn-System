import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardTopbar } from "@/components/dashboard/topbar"

export default function BankHubPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-8 py-7">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Bank</h1>
              <p className="text-sm text-muted-foreground">Main Content Area</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
