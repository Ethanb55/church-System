"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NextGenHubPage() {
  const [activeTab, setActiveTab] = useState("youth")

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">NextGen Hub</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="youth">Youth Resources</TabsTrigger>
          <TabsTrigger value="young-adults">Young Adults</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship Program</TabsTrigger>
          <TabsTrigger value="events">NextGen Events</TabsTrigger>
        </TabsList>
        <TabsContent value="youth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Youth Resources</CardTitle>
              <CardDescription>Access resources tailored for youth ministry</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add youth resources component here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="young-adults" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Young Adults</CardTitle>
              <CardDescription>Resources and programs for young adults</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add young adults component here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="mentorship" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mentorship Program</CardTitle>
              <CardDescription>Connect mentors with mentees in the NextGen community</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add mentorship program component here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>NextGen Events</CardTitle>
              <CardDescription>View and manage events for youth and young adults</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add NextGen events component here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

