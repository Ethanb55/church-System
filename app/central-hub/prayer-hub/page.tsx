"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractivePrayerWall } from "@/components/prayer-hub/interactive-prayer-wall"

export default function PrayerHubPage() {
  const [activeTab, setActiveTab] = useState("prayer-wall")

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Prayer Hub</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="prayer-wall">Interactive Prayer Wall</TabsTrigger>
          <TabsTrigger value="prayer-requests">Prayer Requests</TabsTrigger>
          <TabsTrigger value="weekly-focus">Weekly Prayer Focus</TabsTrigger>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="prayer-wall" className="space-y-4">
          <InteractivePrayerWall />
        </TabsContent>
        <TabsContent value="prayer-requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit Prayer Requests</CardTitle>
              <CardDescription>Share your prayer needs with the community</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add prayer request submission form here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="weekly-focus" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Prayer Focus</CardTitle>
              <CardDescription>Highlight church-wide prayer needs</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add weekly prayer focus component here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai-tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Tools</CardTitle>
              <CardDescription>Prayer prompter, sentiment analysis, and 24/7 prayer bot</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add AI tools for prayer here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

