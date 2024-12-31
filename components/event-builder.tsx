"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type EventBuilderProps = {
  onAddEvent: (event: any) => void
}

export function EventBuilder({ onAddEvent }: EventBuilderProps) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
    time: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddEvent(newEvent)
    setNewEvent({
      title: "",
      date: "",
      description: "",
      location: "",
      time: ""
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEvent(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
        <CardDescription>Add a new event to the calendar</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              name="title"
              value={newEvent.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={newEvent.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              name="time"
              value={newEvent.time}
              onChange={handleChange}
              placeholder="e.g. 2:00 PM - 4:00 PM"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={newEvent.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newEvent.description}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Add Event</Button>
        </form>
      </CardContent>
    </Card>
  )
}

