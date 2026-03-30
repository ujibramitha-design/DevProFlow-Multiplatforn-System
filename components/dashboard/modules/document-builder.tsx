'use client'

import { useState } from 'react'
import { DocumentProfile, ProfileType } from '../types'
import { mockDocumentProfiles } from '../mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Plus, X } from 'lucide-react'

interface DocumentBuilderProps {
  profiles: DocumentProfile[]
}

export function DocumentBuilder({ profiles = mockDocumentProfiles }: DocumentBuilderProps) {
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>('FIXED_INCOME')
  const [newDocument, setNewDocument] = useState('')
  const [customDocuments, setCustomDocuments] = useState<Record<ProfileType, string[]>>({
    FIXED_INCOME: [],
    NON_FIXED: [],
    PROFESSIONAL: []
  })

  const currentProfile = profiles.find(p => p.type === selectedProfile)

  const handleAddDocument = () => {
    if (newDocument.trim() && selectedProfile) {
      setCustomDocuments(prev => ({
        ...prev,
        [selectedProfile]: [...(prev[selectedProfile] || []), newDocument]
      }))
      setNewDocument('')
    }
  }

  const handleRemoveDocument = (index: number) => {
    if (selectedProfile) {
      setCustomDocuments(prev => ({
        ...prev,
        [selectedProfile]: prev[selectedProfile].filter((_, i) => i !== index)
      }))
    }
  }

  const profileTypes: ProfileType[] = ['FIXED_INCOME', 'NON_FIXED', 'PROFESSIONAL']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black text-white mb-2">Document Profile Builder</h1>
        <p className="text-white/60">Create and customize document requirements for different profile types</p>
      </div>

      {/* Profile Selection */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Select Profile Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {profileTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedProfile(type)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedProfile === type
                    ? 'bg-cyan-500/20 border-cyan-500 shadow-lg shadow-cyan-500/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <p className="text-sm font-semibold text-white mb-1">{type.replace(/_/g, ' ')}</p>
                <p className="text-xs text-white/60">
                  {type === 'FIXED_INCOME' && 'Salaried employees'}
                  {type === 'NON_FIXED' && 'Business owners'}
                  {type === 'PROFESSIONAL' && 'Professionals'}
                </p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stage Requirements */}
      {currentProfile && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Standard Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['PRA_AKAD', 'AKAD', 'PASCA_AKAD'].map((stage) => (
                <div key={stage}>
                  <p className="text-sm font-semibold text-white mb-2">{stage.replace(/_/g, ' ')}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.stageRequirements[stage as keyof typeof currentProfile.stageRequirements]?.map((doc, i) => (
                      <Badge key={i} className="bg-green-500/20 text-green-300 border-green-500/30 border flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Custom Documents */}
      {selectedProfile && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Custom Additional Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add custom document requirement..."
                value={newDocument}
                onChange={(e) => setNewDocument(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddDocument()}
                className="bg-white/5 border-white/20 text-white placeholder-white/30 flex-1"
              />
              <Button
                onClick={handleAddDocument}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white"
                size="sm"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {customDocuments[selectedProfile]?.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-white/60">Added Documents:</p>
                <div className="flex flex-wrap gap-2">
                  {customDocuments[selectedProfile].map((doc, i) => (
                    <Badge 
                      key={i} 
                      className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 border flex items-center gap-2 pl-3 pr-1 py-1 cursor-pointer hover:bg-cyan-500/30 transition-colors"
                    >
                      {doc}
                      <button
                        onClick={() => handleRemoveDocument(i)}
                        className="hover:bg-cyan-400/20 rounded p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Configuration Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-white/70">
            <p>Selected Profile: <span className="text-white font-semibold">{selectedProfile?.replace(/_/g, ' ')}</span></p>
            <p>Standard Documents: <span className="text-white font-semibold">9</span></p>
            <p>Custom Documents: <span className="text-white font-semibold">{customDocuments[selectedProfile || 'FIXED_INCOME']?.length || 0}</span></p>
          </div>
          <Button className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white">
            Save Profile Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
