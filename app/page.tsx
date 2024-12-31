import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentTasks } from "@/components/recent-tasks"
import { UpcomingEvents } from "@/components/upcoming-events"
import { AttendanceChart } from "@/components/attendance-chart"
import { QuickActions } from "@/components/quick-actions"
import { FinancialOverview } from "@/components/financial-overview"
import { AnnouncementsBanner } from "@/components/announcements-banner"
import { PollSystem } from "@/components/poll-system"
import { motion } from "framer-motion"

export default function Home() {
  const isAdmin = true // In a real application, you would determine this through authentication

  return (
    <div className="space-y-6">
      <motion.h1 
        className="page-title text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Harmony Grove Church
      </motion.h1>
      <AnnouncementsBanner />
      <PollSystem isAdmin={isAdmin} />
      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, staggerChildren: 0.1 }}
      >
        <QuickActions />
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 card-hover">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <AttendanceChart />
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <FinancialOverview />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingEvents />
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Latest updates on your tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTasks />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

