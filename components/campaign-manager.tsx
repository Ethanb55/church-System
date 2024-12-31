"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CampaignForm } from "./campaign-form"
import { CampaignList } from "./campaign-list"
import { CampaignDetails } from "./campaign-details"

type Campaign = {
  id: string
  name: string
  objective: string
  targetAudience: string
  keyMessage: string
  timeline: string
  budget: string
  status: 'planning' | 'active' | 'completed'
}

export function CampaignManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)

  const addCampaign = (campaign: Omit<Campaign, 'id'>) => {
    const newCampaign = { ...campaign, id: Date.now().toString() }
    setCampaigns([...campaigns, newCampaign])
    setShowForm(false)
  }

  const updateCampaign = (updatedCampaign: Campaign) => {
    setCampaigns(campaigns.map(c => c.id === updatedCampaign.id ? updatedCampaign : c))
    setSelectedCampaign(null)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Manager</CardTitle>
          <CardDescription>Launch and manage your church campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShowForm(true)}>Launch New Campaign</Button>
        </CardContent>
      </Card>

      {showForm && (
        <CampaignForm onSubmit={addCampaign} onCancel={() => setShowForm(false)} />
      )}

      {selectedCampaign ? (
        <CampaignDetails campaign={selectedCampaign} onUpdate={updateCampaign} onBack={() => setSelectedCampaign(null)} />
      ) : (
        <CampaignList campaigns={campaigns} onSelect={setSelectedCampaign} />
      )}
    </div>
  )
}

