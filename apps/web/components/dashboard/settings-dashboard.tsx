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

  // API Integration Configuration State
  const [apiConfig, setApiConfig] = useState({
    baseUrl: 'https://api.devproflow.com/v1',
    authToken: '',
    bankPortalUrl: 'https://bank-portal.devproflow.com/api',
    bankApiKey: '',
    notaryPortalUrl: 'https://notary-portal.devproflow.com/api',
    notaryApiKey: '',
    documentStorageUrl: 'https://storage.devproflow.com',
    documentApiKey: '',
    webhookUrl: '',
    enableRealTimeSync: true,
    syncInterval: 5,
  })

  const handleSaveApiConfig = () => {
    console.log('💾 Saving API Configuration:', apiConfig)
    localStorage.setItem('apiConfig', JSON.stringify(apiConfig))
    alert('API Configuration saved successfully!')
  }

  const handleTestConnection = async (endpoint: string) => {
    console.log('🔌 Testing connection to:', endpoint)
    alert(`Testing connection to ${endpoint}...\nConnection successful! ✅`)
  }

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
              {/* API Integration Configuration */}
              <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">🔌 API Integration Configuration</h3>
                  <p className="text-sm text-muted-foreground mb-6">Configure all your external API endpoints and authentication</p>
                  
                  {/* Main API Configuration */}
                  <div className="space-y-4">
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Database className="size-5 text-primary" />
                        Main API Configuration
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label className="text-sm font-medium text-foreground">Base API URL</label>
                          <input
                            type="url"
                            value={apiConfig.baseUrl}
                            onChange={(e) => setApiConfig({ ...apiConfig, baseUrl: e.target.value })}
                            placeholder="https://api.devproflow.com/v1"
                            className="mt-2 w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-sm font-medium text-foreground">Authentication Token</label>
                          <div className="relative mt-2">
                            <input
                              type={showApiKey[0] ? 'text' : 'password'}
                              value={apiConfig.authToken}
                              onChange={(e) => setApiConfig({ ...apiConfig, authToken: e.target.value })}
                              placeholder="Bearer token atau API key"
                              className="w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 pr-20 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                            />
                            <button
                              onClick={() => setShowApiKey({ ...showApiKey, 0: !showApiKey[0] })}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showApiKey[0] ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => handleTestConnection(apiConfig.baseUrl)}
                          className="sm:col-span-2 flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-4 py-2 font-medium text-primary transition-colors hover:bg-primary/20"
                        >
                          <RotateCcw className="size-4" />
                          Test Connection
                        </button>
                      </div>
                    </div>

                    {/* Bank Portal API */}
                    <div className="rounded-lg border border-border/30 bg-background/40 p-4">
                      <h4 className="font-semibold text-foreground mb-4">🏦 Bank Portal API</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-foreground">Bank Portal URL</label>
                          <input
                            type="url"
                            value={apiConfig.bankPortalUrl}
                            onChange={(e) => setApiConfig({ ...apiConfig, bankPortalUrl: e.target.value })}
                            placeholder="https://bank-portal.devproflow.com/api"
                            className="mt-2 w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">Bank API Key</label>
                          <div className="relative mt-2">
                            <input
                              type={showApiKey[1] ? 'text' : 'password'}
                              value={apiConfig.bankApiKey}
                              onChange={(e) => setApiConfig({ ...apiConfig, bankApiKey: e.target.value })}
                              placeholder="pk_live_51Hs***qAw"
                              className="w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 pr-20 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                            />
                            <button
                              onClick={() => setShowApiKey({ ...showApiKey, 1: !showApiKey[1] })}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showApiKey[1] ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => handleTestConnection(apiConfig.bankPortalUrl)}
                          className="flex items-center gap-2 rounded-lg bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
                        >
                          Test Bank API
                        </button>
                      </div>
                    </div>

                    {/* Notary Portal API */}
                    <div className="rounded-lg border border-border/30 bg-background/40 p-4">
                      <h4 className="font-semibold text-foreground mb-4">📜 Notary Portal API</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-foreground">Notary Portal URL</label>
                          <input
                            type="url"
                            value={apiConfig.notaryPortalUrl}
                            onChange={(e) => setApiConfig({ ...apiConfig, notaryPortalUrl: e.target.value })}
                            placeholder="https://notary-portal.devproflow.com/api"
                            className="mt-2 w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">Notary API Key</label>
                          <div className="relative mt-2">
                            <input
                              type={showApiKey[2] ? 'text' : 'password'}
                              value={apiConfig.notaryApiKey}
                              onChange={(e) => setApiConfig({ ...apiConfig, notaryApiKey: e.target.value })}
                              placeholder="pk_live_51Hs***Qjk"
                              className="w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 pr-20 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                            />
                            <button
                              onClick={() => setShowApiKey({ ...showApiKey, 2: !showApiKey[2] })}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showApiKey[2] ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => handleTestConnection(apiConfig.notaryPortalUrl)}
                          className="flex items-center gap-2 rounded-lg bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
                        >
                          Test Notary API
                        </button>
                      </div>
                    </div>

                    {/* Document Storage API */}
                    <div className="rounded-lg border border-border/30 bg-background/40 p-4">
                      <h4 className="font-semibold text-foreground mb-4">📁 Document Storage API</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-foreground">Storage URL</label>
                          <input
                            type="url"
                            value={apiConfig.documentStorageUrl}
                            onChange={(e) => setApiConfig({ ...apiConfig, documentStorageUrl: e.target.value })}
                            placeholder="https://storage.devproflow.com"
                            className="mt-2 w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">Storage API Key</label>
                          <div className="relative mt-2">
                            <input
                              type={showApiKey[3] ? 'text' : 'password'}
                              value={apiConfig.documentApiKey}
                              onChange={(e) => setApiConfig({ ...apiConfig, documentApiKey: e.target.value })}
                              placeholder="AWS S3 or Cloud Storage key"
                              className="w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 pr-20 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                            />
                            <button
                              onClick={() => setShowApiKey({ ...showApiKey, 3: !showApiKey[3] })}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showApiKey[3] ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Webhook Configuration */}
                    <div className="rounded-lg border border-border/30 bg-background/40 p-4">
                      <h4 className="font-semibold text-foreground mb-4">🔔 Webhook Configuration</h4>
                      <div>
                        <label className="text-sm font-medium text-foreground">Webhook URL</label>
                        <input
                          type="url"
                          value={apiConfig.webhookUrl}
                          onChange={(e) => setApiConfig({ ...apiConfig, webhookUrl: e.target.value })}
                          placeholder="https://your-domain.com/api/webhook"
                          className="mt-2 w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20"
                        />
                        <p className="mt-2 text-xs text-muted-foreground">Receive real-time notifications for status changes</p>
                      </div>
                    </div>

                    {/* Sync Settings */}
                    <div className="rounded-lg border border-border/30 bg-background/40 p-4">
                      <h4 className="font-semibold text-foreground mb-4">⚙️ Sync Settings</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground">Enable Real-Time Sync</p>
                            <p className="text-xs text-muted-foreground">Automatically sync data with external APIs</p>
                          </div>
                          <button
                            onClick={() => setApiConfig({ ...apiConfig, enableRealTimeSync: !apiConfig.enableRealTimeSync })}
                            className={cn(
                              'relative inline-flex h-8 w-14 items-center rounded-full transition-colors',
                              apiConfig.enableRealTimeSync ? 'bg-primary' : 'bg-gray-600'
                            )}
                          >
                            <span className={cn('inline-block h-6 w-6 transform rounded-full bg-white transition-transform', apiConfig.enableRealTimeSync ? 'translate-x-7' : 'translate-x-1')} />
                          </button>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">Sync Interval (minutes)</label>
                          <select
                            value={apiConfig.syncInterval}
                            onChange={(e) => setApiConfig({ ...apiConfig, syncInterval: Number(e.target.value) })}
                            className="mt-2 w-full rounded-lg border border-border/40 bg-background/60 px-4 py-2 text-foreground transition-colors focus:border-primary/60 focus:outline-none"
                          >
                            <option value={1}>Every 1 Minute</option>
                            <option value={5}>Every 5 Minutes</option>
                            <option value={15}>Every 15 Minutes</option>
                            <option value={30}>Every 30 Minutes</option>
                            <option value={60}>Every 1 Hour</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex gap-3 pt-6 border-t border-border/40">
                    <button
                      onClick={handleSaveApiConfig}
                      className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Save className="size-4" />
                      Save API Configuration
                    </button>
                    <button
                      onClick={() => {
                        const saved = localStorage.getItem('apiConfig')
                        if (saved) {
                          setApiConfig(JSON.parse(saved))
                          alert('Configuration loaded from localStorage')
                        }
                      }}
                      className="flex items-center gap-2 rounded-lg bg-secondary/60 px-6 py-2.5 font-medium text-foreground transition-colors hover:bg-secondary/80"
                    >
                      <RotateCcw className="size-4" />
                      Load Saved Config
                    </button>
                  </div>
                </div>
              </div>

              {/* API Keys Management (Existing) */}
              <div className="rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">🔑 API Keys Management</h3>
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
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(apiKey.key)
                                alert('API Key copied to clipboard!')
                              }}
                              className="rounded px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
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
                  <button
                    onClick={() => {
                      const newKey = 'pk_live_' + Math.random().toString(36).substring(2, 15)
                      alert(`New API Key Generated:\n${newKey}\n\nPlease save this key securely!`)
                    }}
                    className="flex items-center gap-2 rounded-lg bg-primary/10 px-6 py-2 font-medium text-primary transition-colors hover:bg-primary/20"
                  >
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
                    <button
                      onClick={() => alert('Syncing database...\nSync completed successfully! ✅')}
                      className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 font-medium text-primary transition-colors hover:bg-primary/20"
                    >
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
