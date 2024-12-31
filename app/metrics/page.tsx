"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AttendanceMetrics } from "@/components/metrics/attendance-metrics"
import { BaptismMetrics } from "@/components/metrics/baptism-metrics"
import { NextStepsMetrics } from "@/components/metrics/next-steps-metrics"
import { FirstTimeGuestMetrics } from "@/components/metrics/first-time-guest-metrics"
import { FollowUpMetrics } from "@/components/metrics/follow-up-metrics"
import { GivingMetrics } from "@/components/metrics/giving-metrics"
import { ParkingMetrics } from "@/components/metrics/parking-metrics"
import { ServeTeamMetrics } from "@/components/metrics/serve-team-metrics"
import { EventMetrics } from "@/components/metrics/event-metrics"
import { MetricsDashboard } from "@/components/metrics/metrics-dashboard"
import { ReportsSection } from "@/components/reports-section"

export default function MetricsPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Church Metrics</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="baptisms">Baptisms</TabsTrigger>
          <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
          <TabsTrigger value="first-time-guests">First Time Guests</TabsTrigger>
          <TabsTrigger value="follow-up">Follow Up</TabsTrigger>
          <TabsTrigger value="giving">Giving</TabsTrigger>
          <TabsTrigger value="parking">Parking</TabsTrigger>
          <TabsTrigger value="serve-team">Serve Team</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <MetricsDashboard />
        </TabsContent>
        <TabsContent value="attendance" className="space-y-4">
          <AttendanceMetrics />
        </TabsContent>
        <TabsContent value="baptisms" className="space-y-4">
          <BaptismMetrics />
        </TabsContent>
        <TabsContent value="next-steps" className="space-y-4">
          <NextStepsMetrics />
        </TabsContent>
        <TabsContent value="first-time-guests" className="space-y-4">
          <FirstTimeGuestMetrics />
        </TabsContent>
        <TabsContent value="follow-up" className="space-y-4">
          <FollowUpMetrics />
        </TabsContent>
        <TabsContent value="giving" className="space-y-4">
          <GivingMetrics />
        </TabsContent>
        <TabsContent value="parking" className="space-y-4">
          <ParkingMetrics />
        </TabsContent>
        <TabsContent value="serve-team" className="space-y-4">
          <ServeTeamMetrics />
        </TabsContent>
        <TabsContent value="events" className="space-y-4">
          <EventMetrics />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <ReportsSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

