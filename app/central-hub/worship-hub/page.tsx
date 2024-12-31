"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WorshipHubPage() {
  const [activeTab, setActiveTab] = useState("setlists")

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Worship Hub</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="setlists">Setlists & Chord Charts</TabsTrigger>
          <TabsTrigger value="live-stream">Live Stream Library</TabsTrigger>
          <TabsTrigger value="team-collaboration">Team Collaboration</TabsTrigger>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="setlists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Setlists & Chord Charts</CardTitle>
              <CardDescription>Easy access to upcoming worship songs.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add setlists and chord charts content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="live-stream" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Stream Library</CardTitle>
              <CardDescription>Past worship sets and team training videos.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add live stream library content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team-collaboration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>Schedules, song ideas, and rehearsal notes.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add team collaboration content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai-tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Tools</CardTitle>
              <CardDescription>Songwriting Assistant, Practice Tools, and Dynamic Lyric Display.</CardDescription>
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

