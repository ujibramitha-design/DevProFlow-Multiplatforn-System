'use client'

import { UserRole } from './types'
import { getRoleDisplayName, mockUsers } from './mock-data'
import { Button } from '@/components/ui/button'

interface RoleSwitcherProps {
  currentRole: UserRole
  onRoleChange: (role: UserRole) => void
}

const availableRoles: UserRole[] = ['LEGAL', 'FINANCE', 'BOD', 'BANK', 'NOTARY', 'SALES']

export function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
      <span className="text-white/70 text-sm font-medium w-full mb-2">Switch Role:</span>
      <div className="flex flex-wrap gap-2">
        {availableRoles.map((role) => (
          <Button
            key={role}
            onClick={() => onRoleChange(role)}
            variant={currentRole === role ? 'default' : 'outline'}
            size="sm"
            className={`transition-all ${
              currentRole === role
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/50'
                : 'bg-white/10 border-white/20 hover:bg-white/15 text-white/80 hover:text-white'
            }`}
          >
            <span className="text-xs">{role}</span>
          </Button>
        ))}
      </div>
      
      {/* Current user info */}
      <div className="w-full mt-4 pt-4 border-t border-white/10">
        <div className="text-xs text-white/60">
          <p className="mb-1">Current User: <span className="text-white font-semibold">{mockUsers[currentRole].name}</span></p>
          <p>Role: <span className="text-cyan-400 font-semibold">{getRoleDisplayName(currentRole)}</span></p>
          <p className="mt-1">Email: <span className="text-white/70">{mockUsers[currentRole].email}</span></p>
        </div>
      </div>
    </div>
  )
}

// Role badge component for displaying role in headers
export function RoleBadge({ role, className = '' }: { role: UserRole; className?: string }) {
  const colorMap: Record<UserRole, string> = {
    LEGAL: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    BOD: 'bg-red-500/20 text-red-300 border-red-500/30',
    FINANCE: 'bg-green-500/20 text-green-300 border-green-500/30',
    BANK: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    NOTARY: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    SALES: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorMap[role]} ${className}`}>
      {role}
    </span>
  )
}
