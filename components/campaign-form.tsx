"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type CampaignFormProps = {
  onSubmit: (campaign: any) => void
  onCancel: () => void
}

export function CampaignForm({ onSubmit, onCancel }: CampaignFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    objective: '',
    targetAudience: '',
    keyMessage: '',
    timeline: '',
    budget: '',
    status: 'planning' as const
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Launch New Campaign</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Launch Campaign</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

