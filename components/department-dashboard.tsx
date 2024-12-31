"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskList } from "@/components/task-list"
import { MessagingSystem } from "@/components/messaging-system"
import { SOPList } from "@/components/sop-list"
import { VisionMission } from "@/components/vision-mission"
import { AnnouncementList } from "@/components/announcement-list"
import { DepartmentCalendar } from "@/components/department-calendar"
import { FormList } from "@/components/form-list"
import { PrayerRequestList } from "@/components/prayer-request-list"
import { VolunteerTraining } from "@/components/volunteer-training"
import { ResourceList } from "@/components/resource-list"
import { MeetingNotes } from "@/components/meeting-notes"

export function DepartmentDashboard({ departmentName }: { departmentName: string }) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">{departmentName} Department</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
          <TabsTrigger value="sops">SOPs</TabsTrigger>
          <TabsTrigger value="vision-mission">Vision & Mission</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="prayer-requests">Prayer Requests</TabsTrigger>
          <TabsTrigger value="training">Volunteer Training</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="meeting-notes">Meeting Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Department Overview</CardTitle>
              <CardDescription>Key information about the {departmentName} department</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is an overview of the {departmentName} department.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks">
          <TaskList />
        </TabsContent>
        <TabsContent value="messaging">
          <MessagingSystem departmentName={departmentName} />
        </TabsContent>
        <TabsContent value="sops">
          <SOPList departmentName={departmentName} />
        </TabsContent>
        <TabsContent value="vision-mission">
          <VisionMission departmentName={departmentName} />
        </TabsContent>
        <TabsContent value="announcements">
          <AnnouncementList departmentName={departmentName} />
        </TabsContent>
        <TabsContent value="calendar">
          <DepartmentCalendar departmentName={departmentName} />
        </TabsContent>
        <TabsContent value="forms">
          <FormList departmentName={departmentName} />
        </TabsContent>
        <TabsContent value="prayer-requests">
          <PrayerRequestList departmentName={departmentName} />
        </TabsContent>
        <TabsContent value="training">
          <VolunteerTraining departmentName={departmentName} />
        </TabsContent>
        <TabsContent value="resources">
          <ResourceList departmentName={departmentName} />
        </TabsContent>
        <TabsContent value="meeting-notes">
          <MeetingNotes />
        </TabsContent>
      </Tabs>
    </div>
  )
}

