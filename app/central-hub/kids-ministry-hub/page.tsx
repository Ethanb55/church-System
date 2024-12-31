"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function KidsMinistryHubPage() {
  const [activeTab, setActiveTab] = useState("parent-resources")

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Kids Ministry Hub</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="parent-resources">Parent Resources</TabsTrigger>
          <TabsTrigger value="volunteer-portal">Volunteer Portal</TabsTrigger>
          <TabsTrigger value="event-calendar">Event Calendar</TabsTrigger>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="parent-resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parent Resources</CardTitle>
              <CardDescription>Weekly lesson plans, family devotionals, and activity sheets.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add parent resources content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="volunteer-portal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Portal</CardTitle>
              <CardDescription>Sign-ups, schedules, and training materials.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add volunteer portal content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="event-calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
              <CardDescription>Details on upcoming events like VBS or Candy Fest.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add event calendar content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai-tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Tools</CardTitle>
              <CardDescription>Lesson Personalizer, Automated Check-In System, and Interactive Bible Stories.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add AI tools content here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

