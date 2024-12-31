"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FirstTimeGuests } from "@/components/first-time-guests"
import { MailchimpAutomation } from "@/components/mailchimp-automation"
import { ScheduledMessages } from "@/components/scheduled-messages"
import { FormationSection } from "@/components/formation-section"
import { FollowUpDashboard } from "@/components/follow-up-dashboard"

export default function FollowUpPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Follow Up</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="first-time-guests">First-Time Guests</TabsTrigger>
          <TabsTrigger value="mailchimp">Mailchimp Automation</TabsTrigger>
          <TabsTrigger value="scheduled-messages">Scheduled Messages</TabsTrigger>
          <TabsTrigger value="formation">Formation</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <FollowUpDashboard />
        </TabsContent>
        <TabsContent value="first-time-guests" className="space-y-4">
          <FirstTimeGuests />
        </TabsContent>
        <TabsContent value="mailchimp" className="space-y-4">
          <MailchimpAutomation />
        </TabsContent>
        <TabsContent value="scheduled-messages" className="space-y-4">
          <ScheduledMessages />
        </TabsContent>
        <TabsContent value="formation" className="space-y-4">
          <FormationSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

