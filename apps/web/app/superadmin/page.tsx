import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardTopbar } from "@/components/dashboard/topbar"

export default function SuperAdminPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">Super Admin Hub</h1>
            <p className="text-muted-foreground">Main Content Area</p>
          </div>
        </main>
      </div>
    </div>
  )
}
