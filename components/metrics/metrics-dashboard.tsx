"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AttendanceMetrics } from './attendance-metrics'
import { BaptismMetrics } from './baptism-metrics'
import { NextStepsMetrics } from './next-steps-metrics'
import { FirstTimeGuestMetrics } from './first-time-guest-metrics'
import { FollowUpMetrics } from './follow-up-metrics'
import { GivingMetrics } from './giving-metrics'
import { ParkingMetrics } from './parking-metrics'
import { ServeTeamMetrics } from './serve-team-metrics'
import { EventMetrics } from './event-metrics'

const mockTrendData = [
  { month: 'Jan', attendance: 500, baptisms: 5, nextSteps: 20, firstTimeGuests: 30, followUps: 25, giving: 50000, parking: 150, serveTeam: 50, events: 10 },
  { month: 'Feb', attendance: 520, baptisms: 7, nextSteps: 22, firstTimeGuests: 35, followUps: 28, giving: 52000, parking: 160, serveTeam: 52, events: 12 },
  { month: 'Mar', attendance: 550, baptisms: 6, nextSteps: 25, firstTimeGuests: 40, followUps: 30, giving: 55000, parking: 170, serveTeam: 55, events: 15 },
  { month: 'Apr', attendance: 580, baptisms: 8, nextSteps: 28, firstTimeGuests: 45, followUps: 35, giving: 58000, parking: 180, serveTeam: 58, events: 18 },
  { month: 'May', attendance: 600, baptisms: 10, nextSteps: 30, firstTimeGuests: 50, followUps: 40, giving: 60000, parking: 190, serveTeam: 60, events: 20 },
  { month: 'Jun', attendance: 620, baptisms: 9, nextSteps: 32, firstTimeGuests: 55, followUps: 45, giving: 62000, parking: 200, serveTeam: 62, events: 22 },
]

export function MetricsDashboard() {
  const [selectedMetric, setSelectedMetric] = useState('attendance')

  const metricOptions = [
    { value: 'attendance', label: 'Attendance' },
    { value: 'baptisms', label: 'Baptisms' },
    { value: 'nextSteps', label: 'Next Steps' },
    { value: 'firstTimeGuests', label: 'First Time Guests' },
    { value: 'followUps', label: 'Follow Ups' },
    { value: 'giving', label: 'Giving' },
    { value: 'parking', label: 'Parking' },
    { value: 'serveTeam', label: 'Serve Team' },
    { value: 'events', label: 'Events' },
  ]

  const renderMetricComponent = (metric: string) => {
    switch (metric) {
      case 'attendance':
        return <AttendanceMetrics />
      case 'baptisms':
        return <BaptismMetrics />
      case 'nextSteps':
        return <NextStepsMetrics />
      case 'firstTimeGuests':
        return <FirstTimeGuestMetrics />
      case 'followUps':
        return <FollowUpMetrics />
      case 'giving':
        return <GivingMetrics />
      case 'parking':
        return <ParkingMetrics />
      case 'serveTeam':
        return <ServeTeamMetrics />
      case 'events':
        return <EventMetrics />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Metrics Overview</CardTitle>
          <CardDescription>Key church metrics at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {metricOptions.map((option) => (
              <Card key={option.value}>
                <CardHeader>
                  <CardTitle>{option.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockTrendData[mockTrendData.length - 1][option.value as keyof typeof mockTrendData[0]]}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trend Analysis</CardTitle>
          <CardDescription>6-month trend for selected metric</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger>
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                {metricOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Metric View</CardTitle>
          <CardDescription>In-depth look at the selected metric</CardDescription>
        </CardHeader>
        <CardContent>
          {renderMetricComponent(selectedMetric)}
        </CardContent>
      </Card>
    </div>
  )
}

