"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Event = {
  id: number
  title: string
  date: string
  description: string
  location: string
  time: string
  planningDetails: {
    questions: string[]
    brainstorming: string[]
    adminDetails: string
    notes: string
    ideas: string[]
    approvalPlan: string
    resources: string[]
  }
}

type EventPlanningProps = {
  events: Event[]
  selectedEvent: Event | null
  onSelectEvent: (event: Event | null) => void
  onUpdateEvent: (event: Event) => void
}

export function EventPlanning({ events, selectedEvent, onSelectEvent, onUpdateEvent }: EventPlanningProps) {
  const [localEvent, setLocalEvent] = useState<Event | null>(null)

  useEffect(() => {
    setLocalEvent(selectedEvent)
  }, [selectedEvent])

  const handleInputChange = (field: string, value: string) => {
    if (!localEvent) return
    setLocalEvent({
      ...localEvent,
      planningDetails: {
        ...localEvent.planningDetails,
        [field]: value
      }
    })
  }

  const handleArrayInputChange = (field: string, value: string) => {
    if (!localEvent) return
    setLocalEvent({
      ...localEvent,
      planningDetails: {
        ...localEvent.planningDetails,
        [field]: value.split('\n').filter(item => item.trim() !== '')
      }
    })
  }

  const handleSave = () => {
    if (localEvent) {
      onUpdateEvent(localEvent)
    }
  }

  if (!localEvent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Event Planning</CardTitle>
          <CardDescription>Select an event to start planning</CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(value) => onSelectEvent(events.find(e => e.id.toString() === value) || null)}>
            <SelectTrigger>
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent>
              {events.map(event => (
                <SelectItem key={event.id} value={event.id.toString()}>{event.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Planning for: {localEvent.title}</CardTitle>
          <CardDescription>{localEvent.date} | {localEvent.time}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="questions">Questions to Consider</Label>
            <Textarea
              id="questions"
              value={localEvent.planningDetails.questions.join('\n')}
              onChange={(e) => handleArrayInputChange('questions', e.target.value)}
              placeholder="Enter questions, one per line"
            />
          </div>
          <div>
            <Label htmlFor="brainstorming">Brainstorming</Label>
            <Textarea
              id="brainstorming"
              value={localEvent.planningDetails.brainstorming.join('\n')}
              onChange={(e) => handleArrayInputChange('brainstorming', e.target.value)}
              placeholder="Enter brainstorming ideas, one per line"
            />
          </div>
          <div>
            <Label htmlFor="adminDetails">Administrative Details</Label>
            <Textarea
              id="adminDetails"
              value={localEvent.planningDetails.adminDetails}
              onChange={(e) => handleInputChange('adminDetails', e.target.value)}
              placeholder="Enter administrative details"
            />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={localEvent.planningDetails.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Enter any additional notes"
            />
          </div>
          <div>
            <Label htmlFor="ideas">Ideas</Label>
            <Textarea
              id="ideas"
              value={localEvent.planningDetails.ideas.join('\n')}
              onChange={(e) => handleArrayInputChange('ideas', e.target.value)}
              placeholder="Enter ideas, one per line"
            />
          </div>
          <div>
            <Label htmlFor="approvalPlan">Idea Approval Plan</Label>
            <Textarea
              id="approvalPlan"
              value={localEvent.planningDetails.approvalPlan}
              onChange={(e) => handleInputChange('approvalPlan', e.target.value)}
              placeholder="Enter the idea approval plan"
            />
          </div>
          <div>
            <Label htmlFor="resources">Resources</Label>
            <Textarea
              id="resources"
              value={localEvent.planningDetails.resources.join('\n')}
              onChange={(e) => handleArrayInputChange('resources', e.target.value)}
              placeholder="Enter resources, one per line"
            />
          </div>
          <Button onClick={handleSave}>Save Planning Details</Button>
        </CardContent>
      </Card>
    </div>
  )
}

