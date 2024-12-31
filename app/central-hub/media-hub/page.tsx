"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MediaHubPage() {
  const [activeTab, setActiveTab] = useState("sermons")

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Media Hub</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="sermons">Sermons</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="event-highlights">Event Highlights</TabsTrigger>
        </TabsList>
        <TabsContent value="sermons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sermons</CardTitle>
              <CardDescription>Access and watch recorded sermons</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add sermons component here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="podcasts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Podcasts</CardTitle>
              <CardDescription>Listen to church podcasts and audio content</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add podcasts component here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="blog" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blog</CardTitle>
              <CardDescription>Read articles and blog posts from church leaders</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add blog component here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="event-highlights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Highlights</CardTitle>
              <CardDescription>View photos and videos from recent church events</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add event highlights component here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

