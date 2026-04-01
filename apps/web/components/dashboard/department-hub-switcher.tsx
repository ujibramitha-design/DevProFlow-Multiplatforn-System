'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, Briefcase, Landmark, Wrench, Crown, Settings } from 'lucide-react'

export type DepartmentType = 'legal' | 'finance' | 'estate' | 'engineering' | 'executive' | 'admin'

const DEPARTMENTS: Record<DepartmentType, { label: string; icon: React.ReactNode; description: string }> = {
  legal: { label: 'Legal', icon: <Briefcase className="size-4" />, description: 'Document Management & Compliance' },
  finance: { label: 'Finance', icon: <Building2 className="size-4" />, description: 'Financial Analytics & Reporting' },
  estate: { label: 'Estate', icon: <Landmark className="size-4" />, description: 'Property & Asset Management' },
  engineering: { label: 'Engineering', icon: <Wrench className="size-4" />, description: 'Technical Operations' },
  executive: { label: 'Executive', icon: <Crown className="size-4" />, description: 'Board & Leadership Dashboard' },
  admin: { label: 'Admin', icon: <Settings className="size-4" />, description: 'System Administration' }
}

interface DepartmentHubSwitcherProps {
  activeDepartment: DepartmentType
  onDepartmentChange: (dept: DepartmentType) => void
  isAllAccess?: boolean
}

export function DepartmentHubSwitcher({ 
  activeDepartment, 
  onDepartmentChange,
  isAllAccess = false 
}: DepartmentHubSwitcherProps) {
  const departments = Object.entries(DEPARTMENTS) as [DepartmentType, typeof DEPARTMENTS['legal']][]

  return (
    <div className="space-y-4 mb-8">
      {/* Header with Badge */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Department Hubs</h2>
          <p className="text-xs text-white/50 mt-1">Select a department to access its specialized dashboard</p>
        </div>
        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-400/50">
          {isAllAccess ? 'All Access Mode' : 'Limited Access'}
        </Badge>
      </div>

      {/* Horizontal Department Tabs */}
      <div className="flex flex-wrap gap-2">
        {departments.map(([key, dept]) => (
          <button
            key={key}
            onClick={() => onDepartmentChange(key)}
            className={`
              relative group flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm
              transition-all duration-300
              ${activeDepartment === key
                ? `
                  bg-gradient-to-r from-cyan-500/30 to-blue-600/30 
                  border border-cyan-400/60 
                  text-cyan-300
                  shadow-lg shadow-cyan-500/20
                  after:absolute after:inset-0 after:rounded-xl 
                  after:bg-gradient-to-r after:from-cyan-500/10 after:to-blue-500/10
                  after:blur-xl after:pointer-events-none
                `
                : `
                  bg-white/5 border border-white/10 
                  text-white/70 hover:text-white hover:bg-white/10 
                  hover:border-white/20
                `
              }
            `}
          >
            <span className={activeDepartment === key ? 'text-cyan-300' : 'text-white/50 group-hover:text-white/70'}>
              {dept.icon}
            </span>
            <span>{dept.label}</span>
            {activeDepartment === key && (
              <span className="ml-1 inline-block size-2 bg-cyan-400 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Active Department Info */}
      <div className="p-4 bg-gradient-to-r from-white/5 to-white/3 border border-white/10 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-cyan-400 mt-1">
            {DEPARTMENTS[activeDepartment].icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {DEPARTMENTS[activeDepartment].label} Hub
            </p>
            <p className="text-xs text-white/60 mt-1">
              {DEPARTMENTS[activeDepartment].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
