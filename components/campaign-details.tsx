"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

type CampaignDetailsProps = {
  campaign: Campaign
  onUpdate: (campaign: Campaign) => void
  onBack: () => void
}

export function CampaignDetails({ campaign, onUpdate, onBack }: CampaignDetailsProps) {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState(campaign)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
    setEditMode(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editMode ? 'Edit Campaign' : campaign.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="digital">Digital Marketing</TabsTrigger>
            <TabsTrigger value="physical">Physical Promotion</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="outreach">Outreach</TabsTrigger>
            <TabsTrigger value="measurement">Measurement</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="objective">Objective</Label>
                  <Textarea id="objective" name="objective" value={formData.objective} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input id="targetAudience" name="targetAudience" value={formData.targetAudience} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keyMessage">Key Message</Label>
                  <Textarea id="keyMessage" name="keyMessage" value={formData.keyMessage} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input id="budget" name="budget" value={formData.budget} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'planning' | 'active' | 'completed' }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Objective</h3>
                  <p>{campaign.objective}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Target Audience</h3>
                  <p>{campaign.targetAudience}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Key Message</h3>
                  <p>{campaign.keyMessage}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Timeline</h3>
                  <p>{campaign.timeline}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Budget</h3>
                  <p>{campaign.budget}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <p>{campaign.status}</p>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="branding">
            <div className="space-y-4">
              <h3 className="font-semibold">Branding and Creative Assets</h3>
              <ul className="list-disc pl-5">
                <li>Logo and Tagline</li>
                <li>Theme Design</li>
                <li>Promotional Materials</li>
                <li>Merchandise (Optional)</li>
              </ul>
              {/* Add form or details for branding assets */}
            </div>
          </TabsContent>
          <TabsContent value="content">
            <div className="space-y-4">
              <h3 className="font-semibold">Content Creation</h3>
              <ul className="list-disc pl-5">
                <li>Storytelling</li>
                <li>Scripted Content</li>
                <li>Photography & Videography</li>
              </ul>
              {/* Add form or details for content creation */}
            </div>
          </TabsContent>
          <TabsContent value="digital">
            <div className="space-y-4">
              <h3 className="font-semibold">Digital Marketing Tools</h3>
              <ul className="list-disc pl-5">
                <li>Social Media</li>
                <li>Website</li>
                <li>Email Marketing</li>
                <li>SEO Optimization</li>
              </ul>
              {/* Add form or details for digital marketing */}
            </div>
          </TabsContent>
          <TabsContent value="physical">
            <div className="space-y-4">
              <h3 className="font-semibold">Physical Promotion</h3>
              <ul className="list-disc pl-5">
                <li>Community Outreach</li>
                <li>Signage</li>
                <li>Print Ads</li>
              </ul>
              {/* Add form or details for physical promotion */}
            </div>
          </TabsContent>
          <TabsContent value="events">
            <div className="space-y-4">
              <h3 className="font-semibold">Events and Experiences</h3>
              <ul className="list-disc pl-5">
                <li>Pre-Launch Event</li>
                <li>Main Event</li>
                <li>Post-Event Follow-Up</li>
              </ul>
              {/* Add form or details for events */}
            </div>
          </TabsContent>
          <TabsContent value="outreach">
            <div className="space-y-4">
              <h3 className="font-semibold">Outreach and Collaboration</h3>
              <ul className="list-disc pl-5">
                <li>Partnerships</li>
                <li>Influencers</li>
                <li>Volunteer Teams</li>
              </ul>
              {/* Add form or details for outreach */}
            </div>
          </TabsContent>
          <TabsContent value="measurement">
            <div className="space-y-4">
              <h3 className="font-semibold">Measurement and Follow-Up</h3>
              <ul className="list-disc pl-5">
                <li>Analytics</li>
                <li>Feedback</li>
                <li>Impact Report</li>
              </ul>
              {/* Add form or details for measurement */}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onBack}>Back to List</Button>
        {editMode ? (
          <>
            <Button onClick={() => setEditMode(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </>
        ) : (
          <Button onClick={() => setEditMode(true)}>Edit Campaign</Button>
        )}
      </CardFooter>
    </Card>
  )
}

