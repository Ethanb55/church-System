"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BrandingGuide } from "@/components/branding-guide"
import { AIBrainstorming } from "@/components/ai-brainstorming"
import { WhatsTrending } from "@/components/whats-trending"
import { CampaignManager } from "@/components/campaign-manager"
import { SocialMediaCalendar } from "@/components/social-media-calendar"
import { ResourceLibrary } from "@/components/creative-hub/resource-library"

export default function CreativeHubPage() {
  const [activeTab, setActiveTab] = useState("resource-library")

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Creative Hub</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="resource-library">Resource Library</TabsTrigger>
          <TabsTrigger value="project-management">Project Management</TabsTrigger>
          <TabsTrigger value="creative-blog">Creative Blog</TabsTrigger>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
          <TabsTrigger value="branding-guide">Branding Guide</TabsTrigger>
          <TabsTrigger value="whats-trending">What's Trending</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="social-media">Social Media</TabsTrigger>
        </TabsList>
        <TabsContent value="resource-library" className="space-y-4">
          <ResourceLibrary />
        </TabsContent>
        <TabsContent value="project-management" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Management Tools</CardTitle>
              <CardDescription>Integration with platforms like Trello or Asana for tracking team projects.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add project management integration here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="creative-blog" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Creative Blog</CardTitle>
              <CardDescription>Tips, tutorials, and inspiration for church creatives.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add creative blog content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai-tools" className="space-y-4">
          <AIBrainstorming />
        </TabsContent>
        <TabsContent value="branding-guide" className="space-y-4">
          <BrandingGuide />
        </TabsContent>
        <TabsContent value="whats-trending" className="space-y-4">
          <WhatsTrending />
        </TabsContent>
        <TabsContent value="campaigns" className="space-y-4">
          <CampaignManager />
        </TabsContent>
        <TabsContent value="social-media" className="space-y-4">
          <SocialMediaCalendar />
        </TabsContent>
      </Tabs>
    </div>
  )
}

