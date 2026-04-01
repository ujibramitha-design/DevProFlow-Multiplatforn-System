'use client'

import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopbar } from '@/components/dashboard/topbar'
import LegalMasterDashboard from '@/components/dashboard/legal-master-dashboard'

export default function LegalPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-8 py-7">
            <LegalMasterDashboard />
          </div>
        </main>
      </div>
    </div>
  )
}
