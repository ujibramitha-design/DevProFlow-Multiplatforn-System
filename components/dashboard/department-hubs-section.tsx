'use client'

import { useState } from 'react'

type DepartmentType = 'legal' | 'finance' | 'estate' | 'engineering' | 'executive' | 'admin'

const departments: Array<{ id: DepartmentType; label: string; icon: string; color: string }> = [
  { id: 'legal', label: 'Legal', icon: '⚖️', color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30' },
  { id: 'finance', label: 'Finance', icon: '💰', color: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30' },
  { id: 'estate', label: 'Estate', icon: '🏢', color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30' },
  { id: 'engineering', label: 'Engineering', icon: '⚙️', color: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30' },
  { id: 'executive', label: 'Executive', icon: '👔', color: 'from-orange-500/20 to-orange-600/20 border-orange-500/30' },
  { id: 'admin', label: 'Admin', icon: '🔧', color: 'from-pink-500/20 to-pink-600/20 border-pink-500/30' },
]

export function DepartmentHubsSection() {
  const [activeDepartment, setActiveDepartment] = useState<DepartmentType>('legal')

  const activeTab = departments.find(d => d.id === activeDepartment)

  return (
    <div className="space-y-6">
      {/* Department Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setActiveDepartment(dept.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeDepartment === dept.id
                ? 'bg-cyan-500/30 border-2 border-cyan-400 text-cyan-300 font-semibold'
                : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <span>{dept.icon}</span>
            <span>{dept.label}</span>
          </button>
        ))}
      </div>

      {/* Department Content Area */}
      <div className={`p-8 rounded-2xl bg-gradient-to-br ${activeTab?.color} border backdrop-blur-sm min-h-96`}>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black text-white mb-3">Welcome to {activeTab?.label} Hub</h2>
          <p className="text-white/60 mb-6">
            You are currently viewing the {activeTab?.label} department dashboard.
          </p>
          
          {/* Department-specific content */}
          <div className="space-y-4">
            {activeDepartment === 'legal' && (
              <div className="space-y-2 text-white/70 text-sm">
                <p>✓ Document Management System</p>
                <p>✓ Compliance Tracking Dashboard</p>
                <p>✓ Contract Review Queue</p>
              </div>
            )}
            {activeDepartment === 'finance' && (
              <div className="space-y-2 text-white/70 text-sm">
                <p>✓ Financial Analytics & Reporting</p>
                <p>✓ Budget Tracking & Forecasting</p>
                <p>✓ Portfolio Performance Metrics</p>
              </div>
            )}
            {activeDepartment === 'estate' && (
              <div className="space-y-2 text-white/70 text-sm">
                <p>✓ Property Inventory Management</p>
                <p>✓ Asset Valuation & Appraisal</p>
                <p>✓ Estate Planning Tools</p>
              </div>
            )}
            {activeDepartment === 'engineering' && (
              <div className="space-y-2 text-white/70 text-sm">
                <p>✓ Technical Infrastructure Dashboard</p>
                <p>✓ System Performance Monitoring</p>
                <p>✓ API Management & Integration</p>
              </div>
            )}
            {activeDepartment === 'executive' && (
              <div className="space-y-2 text-white/70 text-sm">
                <p>✓ Executive KPI Dashboard</p>
                <p>✓ Board-Level Analytics</p>
                <p>✓ Strategic Planning Tools</p>
              </div>
            )}
            {activeDepartment === 'admin' && (
              <div className="space-y-2 text-white/70 text-sm">
                <p>✓ System Administration Console</p>
                <p>✓ User & Permission Management</p>
                <p>✓ Audit Log & Compliance</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
