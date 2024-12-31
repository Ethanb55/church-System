"use client"

import { useState, useEffect } from "react"
import { EventCalendar } from "@/components/event-calendar"
import { EventList } from "@/components/event-list"
import { EventBuilder } from "@/components/event-builder"
import { EventPlanning } from "@/components/event-planning"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample events data
const initialEvents = [
  {
    id: 1,
    title: "Sunday Worship Service",
    date: "2023-07-02",
    description: "Weekly worship service for all members and visitors.",
    location: "Main Sanctuary",
    time: "10:00 AM - 11:30 AM",
    planningDetails: {
      questions: [],
      brainstorming: [],
      adminDetails: "",
      notes: "",
      ideas: [],
      approvalPlan: "",
      resources: []
    }
  },
  {
    id: 2,
    title: "Youth Group Meeting",
    date: "2023-07-05",
    description: "Weekly gathering for teenagers to discuss faith and life.",
    location: "Youth Room",
    time: "7:00 PM - 8:30 PM",
    planningDetails: {
      questions: [],
      brainstorming: [],
      adminDetails: "",
      notes: "",
      ideas: [],
      approvalPlan: "",
      resources: []
    }
  },
  {
    id: 3,
    title: "Bible Study",
    date: "2023-07-07",
    description: "In-depth study of the Book of Romans.",
    location: "Fellowship Hall",
    time: "6:30 PM - 8:00 PM",
    planningDetails: {
      questions: [],
      brainstorming: [],
      adminDetails: "",
      notes: "",
      ideas: [],
      approvalPlan: "",
      resources: []
    }
  },
  {
    id: 4,
    title: "Community Outreach",
    date: "2023-07-09",
    description: "Volunteering at the local food bank.",
    location: "City Food Bank",
    time: "9:00 AM - 12:00 PM",
    planningDetails: {
      questions: [],
      brainstorming: [],
      adminDetails: "",
      notes: "",
      ideas: [],
      approvalPlan: "",
      resources: []
    }
  },
  {
    id: 5,
    title: "Children's Ministry Training",
    date: "2023-07-12",
    description: "Training session for all children's ministry volunteers.",
    location: "Children's Area",
    time: "6:00 PM - 8:00 PM",
    planningDetails: {
      questions: [],
      brainstorming: [],
      adminDetails: "",
      notes: "",
      ideas: [],
      approvalPlan: "",
      resources: []
    }
  },
  {
    id: 6,
    title: "Men's Breakfast",
    date: "2023-07-15",
    description: "Monthly men's fellowship breakfast with guest speaker.",
    location: "Church Cafeteria",
    time: "8:00 AM - 9:30 AM",
    planningDetails: {
      questions: [],
      brainstorming: [],
      adminDetails: "",
      notes: "",
      ideas: [],
      approvalPlan: "",
      resources: []
    }
  },
  {
    id: 7,
    title: "Women's Book Club",
    date: "2023-07-18",
    description: "Discussion of 'The Screwtape Letters' by C.S. Lewis.",
    location: "Church Library",
    time: "7:00 PM - 8:30 PM",
    planningDetails: {
      questions: [],
      brainstorming: [],
      adminDetails: "",
      notes: "",
      ideas: [],
      approvalPlan: "",
      resources: []
    }
  },
  {
    id: 8,
    title: "Church Picnic",
    date: "2023-07-22",
    description: "Annual church picnic with games and fellowship.",
    location: "City Park",
    time: "11:00 AM - 3:00 PM",
    planningDetails: {
      questions: [],
      brainstorming: [],
      adminDetails: "",
      notes: "",
      ideas: [],
      approvalPlan: "",
      resources: []
    }
  },
  {
    id: 9,
    title: "Worship Team Rehearsal",
    date: "2023-07-25",
    description: "Preparation for upcoming Sunday service.",
    location: "Main Sanctuary",
    time: "6:30 PM - 8:30 PM",
    planningDetails: {
      questions: [],
      brainstorming: [],
      adminDetails: "",
      notes: "",
      ideas: [],
      approvalPlan: "",
      resources: []
    }
  },
  {
    id: 10,
    title: "New Members Class",
    date: "2023-07-29",
    description: "Orientation for those interested in church membership.",
    location: "Conference Room",
    time: "9:00 AM - 12:00 PM",
    planningDetails: {
      questions: [],
      brainstorming: [],
      adminDetails: "",
      notes: "",
      ideas: [],
      approvalPlan: "",
      resources: []
    }
  }
]

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState(initialEvents)
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null)
  const [activeTab, setActiveTab] = useState("calendar")

  const addEvent = (newEvent) => {
    const eventWithPlanning = {
      ...newEvent,
      id: events.length + 1,
      planningDetails: {
        questions: [],
        brainstorming: [],
        adminDetails: "",
        notes: "",
        ideas: [],
        approvalPlan: "",
        resources: []
      }
    }
    setEvents([...events, eventWithPlanning])
  }

  const updateEventPlanning = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event))
  }

  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
    setActiveTab("planning")
  }

  useEffect(() => {
    if (selectedEvent) {
      setActiveTab("planning")
    }
  }, [selectedEvent])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Events</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="space-y-4">
          <div className="flex gap-4">
            <div className="w-3/4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Event Calendar</CardTitle>
                  <CardDescription>View and manage upcoming church events</CardDescription>
                </CardHeader>
                <CardContent>
                  <EventCalendar 
                    events={events} 
                    selectedDate={selectedDate} 
                    setSelectedDate={setSelectedDate}
                    onSelectEvent={handleSelectEvent}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>List of all scheduled events</CardDescription>
                </CardHeader>
                <CardContent>
                  <EventList events={events} onSelectEvent={handleSelectEvent} />
                </CardContent>
              </Card>
            </div>
            <div className="w-1/4">
              <EventBuilder onAddEvent={addEvent} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="planning" className="space-y-4">
          <EventPlanning 
            events={events}
            selectedEvent={selectedEvent}
            onSelectEvent={setSelectedEvent}
            onUpdateEvent={updateEventPlanning}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

