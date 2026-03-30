'use client'

import { useState } from 'react'
import {
  Settings,
  User,
  Lock,
  Users,
  Globe,
  Database,
  Eye,
  EyeOff,
  Save,
  Plus,
  RotateCcw,
  Copy,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// STAFF DATA FOR USER MANAGEMENT
const staffData = [
  { id: 1, name: 'Ahmad Fauzi', role: 'Legal Head', email: 'ahmad@devproflow.com', status: 'Active', joinDate: '05 Jan 2024' },
  { id: 2, name: 'Siti Nurhaliza', role: 'Finance Manager', email: 'siti@devproflow.com', status: 'Active', joinDate: '10 Jan 2024' },
  { id: 3, name: 'Budi Santoso', role: 'Sales Lead', email: 'budi@devproflow.com', status: 'Active', joinDate: '15 Jan 2024' },
]

// API KEYS DATA
const apiKeysData = [
  { id: 1, name: 'Bank Portal API', key: 'pk_live_51Hs***qAw', createdDate: '22 Feb 2024', lastUsed: '29 Mar 2026', status: 'Active' },
  { id: 2, name: 'Notary Portal API', key: 'pk_live_51Hs***Qjk', createdDate: '01 Mar 2024', lastUsed: '28 Mar 2026', status: 'Active' },
]

export function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'user-management' | 'preferences' | 'database'>('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showApiKey, setShowApiKey] = useState<Record<number, boolean>>({})
  const [formData, setFormData] = useState({
    fullName: 'Mas BramsRV',
    email: 'mbrams@devproflow.com',
    phone: '+62 812 3456 7890',
    profilePicture: null as string | null,
  })

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const [preferences, setPreferences] = useState({
    language: 'ID',
    currencyFormat: 'B',
    autoSyncFrequency: '5',
  })

  const [twoFAEnabled, setTwoFAEnabled] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">System Settings</h1>
        <p className="mt-2 text-muted-foreground">Configure your account, security, and system preferences</p>
      </div>

      {/* Tab Navigation - Sidebar Style */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar Navigation */}
        <div className="flex flex-col gap-2 rounded-xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm h-fit lg:col-span-1">
          {[
            { id: 'profile', label: 'User Profile', icon: User },
            { id: 'security', label: 'Security', icon: Lock },
            { id: 'user-management', label: 'User Management', icon: Users },
            { id: 'preferences', label: 'System Preferences', icon: Globe },
            { id: 'database', label: 'Database & API', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary border-l-2 border-primary'
                    : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                )}
              >
                <Icon className="size-5" />
                <span className="text-sm">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-3">
          {/* USER PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Picture Card */}
              <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
                <div className="flex items-center gap-6">
                  <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10">
                    <User className="size-12 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{formData.fullName}</h3>
                    <p className="text-sm text-muted-foreground">Super Admin / Owner</p>
                    <button className="mt-3 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20">
                      Upload Profile Picture
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                    <Save className="size-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Change Password Card */}
              <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
                <h3 className="mb-6 text-lg font-semibold text-foreground">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Current Password</label>
                    <div className="relative mt-2">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordForm.current}
                        onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                        className="w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">New Password</label>
                    <div className="relative mt-2">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordForm.new}
                        onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                        className="w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                      />
                      <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirm}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>

              {/* Two-Factor Authentication Card */}
              <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                    className={cn(
                      'relative inline-flex h-8 w-14 items-center rounded-full transition-colors',
                      twoFAEnabled ? 'bg-primary' : 'bg-gray-600'
                    )}
                  >
                    <span className={cn('inline-block h-6 w-6 transform rounded-full bg-white transition-transform', twoFAEnabled ? 'translate-x-7' : 'translate-x-1')} />
                  </button>
                </div>
                {twoFAEnabled && (
                  <div className="mt-4 rounded-lg bg-primary/10 p-4 text-sm text-primary">
                    ✓ Two-factor authentication is now enabled on your account
                  </div>
                )}
              </div>
            </div>
          )}

          {/* USER MANAGEMENT TAB (ADMIN ONLY) */}
          {activeTab === 'user-management' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Team Members</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Manage your team and invite new members</p>
                </div>
                <button
                  onClick={() => setShowInviteModal(!showInviteModal)}
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Plus className="size-4" />
                  Invite New Member
                </button>
              </div>

              {/* Invite Modal */}
              {showInviteModal && (
                <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm space-y-4">
                  <h4 className="font-semibold text-foreground">Invite New Team Member</h4>
                  <input type="email" placeholder="Enter email address" className="w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none" />
                  <select className="w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground transition-colors focus:border-primary/60 focus:outline-none">
                    <option>Legal</option>
                    <option>Finance</option>
                    <option>Sales</option>
                  </select>
                  <div className="flex gap-3">
                    <button className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                      Send Invitation
                    </button>
                    <button onClick={() => setShowInviteModal(false)} className="rounded-lg bg-secondary/60 px-4 py-2 font-medium text-foreground transition-colors hover:bg-secondary/80">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Staff Table */}
              <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/40 bg-card/50">
                        <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Name</th>
                        <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Role</th>
                        <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Email</th>
                        <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Join Date</th>
                        <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffData.map((staff, idx) => (
                        <tr key={idx} className="border-b border-border/20 transition-colors hover:bg-card/50">
                          <td className="px-6 py-4 font-medium text-foreground">{staff.name}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{staff.role}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{staff.email}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{staff.joinDate}</td>
                          <td className="px-6 py-4">
                            <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', getStatusColor(staff.status))}>
                              {staff.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SYSTEM PREFERENCES TAB */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground">Language</label>
                  <select
                    value={preferences.language}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground transition-colors focus:border-primary/60 focus:outline-none"
                  >
                    <option value="ID">Bahasa Indonesia (ID)</option>
                    <option value="EN">English (EN)</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Currency Format</label>
                  <select
                    value={preferences.currencyFormat}
                    onChange={(e) => setPreferences({ ...preferences, currencyFormat: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground transition-colors focus:border-primary/60 focus:outline-none"
                  >
                    <option value="B">Show Billions as 'B' (e.g., Rp 1.5B)</option>
                    <option value="M">Show Millions as 'M' (e.g., Rp 1,500M)</option>
                    <option value="full">Show Full Amount (e.g., Rp 1,500,000,000)</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Auto-Sync Frequency (Document Control)</label>
                  <select
                    value={preferences.autoSyncFrequency}
                    onChange={(e) => setPreferences({ ...preferences, autoSyncFrequency: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground transition-colors focus:border-primary/60 focus:outline-none"
                  >
                    <option value="disabled">Disabled</option>
                    <option value="1">Every 1 Minute</option>
                    <option value="5">Every 5 Minutes</option>
                    <option value="15">Every 15 Minutes</option>
                    <option value="30">Every 30 Minutes</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                    <Save className="size-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DATABASE & API TAB */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">API Keys Management</h3>
                  <div className="space-y-4">
                    {apiKeysData.map((apiKey) => (
                      <div key={apiKey.id} className="rounded-lg border border-border/30 bg-background/40 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">{apiKey.name}</h4>
                          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {apiKey.status}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <code className="flex-1 rounded bg-background/60 px-3 py-2 text-muted-foreground text-xs">{apiKey.key}</code>
                            <button className="rounded px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                              <Copy className="size-4" />
                            </button>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Created: {apiKey.createdDate}</span>
                            <span>Last Used: {apiKey.lastUsed}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40">
                  <h4 className="font-medium text-foreground mb-4">Generate New API Key</h4>
                  <button className="flex items-center gap-2 rounded-lg bg-primary/10 px-6 py-2 font-medium text-primary transition-colors hover:bg-primary/20">
                    <Plus className="size-4" />
                    Generate API Key
                  </button>
                </div>

                <div className="pt-4 border-t border-border/40">
                  <h4 className="font-medium text-foreground mb-4">Document Control Sync Settings</h4>
                  <div className="flex items-center justify-between rounded-lg bg-background/40 p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">Auto-Sync Database</p>
                      <p className="text-xs text-muted-foreground">Automatically sync Document Control changes</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 font-medium text-primary transition-colors hover:bg-primary/20">
                      <RotateCcw className="size-4" />
                      Sync Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
