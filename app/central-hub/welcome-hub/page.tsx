"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WelcomeHubPage() {
  const [activeTab, setActiveTab] = useState("new-members")

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Welcome Hub</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="new-members">New Members</TabsTrigger>
          <TabsTrigger value="orientation">Orientation</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
        </TabsList>
        <TabsContent value="new-members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Members</CardTitle>
              <CardDescription>Welcome and onboarding for new church members</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add new members welcome component here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orientation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orientation</CardTitle>
              <CardDescription>Church orientation materials and resources</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add orientation component here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="faqs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions and answers for newcomers</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add FAQs component here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="next-steps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>Guidance on getting involved and connected</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add next steps component here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

