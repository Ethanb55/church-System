"use client"

import { useState } from "react"
import { TaskList, Task } from "@/components/task-list"
import { TaskCalendar } from "@/components/task-calendar"
import { TaskForms } from "@/components/task-forms"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const initialTasks: Task[] = [
  {
    id: "TASK-1",
    title: "Prepare Sunday sermon",
    status: "in progress",
    priority: "high",
    assignee: "Pastor Johnson",
    department: "Pastoral",
    finalApproval: "Senior Pastor",
    dueDate: "2023-07-15",
  },
  {
    id: "TASK-2",
    title: "Organize youth group outing",
    status: "todo",
    priority: "medium",
    assignee: "Sarah Lee",
    department: "Youth Ministry",
    finalApproval: "Youth Pastor",
    dueDate: "2023-07-20",
  },
  {
    id: "TASK-3",
    title: "Update church website",
    status: "done",
    priority: "low",
    assignee: "Mike Wilson",
    department: "Communications",
    finalApproval: "Communications Director",
    dueDate: "2023-07-10",
  },
  {
    id: "TASK-4",
    title: "Plan community outreach event",
    status: "todo",
    priority: "high",
    assignee: "Emily Brown",
    department: "Outreach",
    finalApproval: "Outreach Coordinator",
    dueDate: "2023-07-25",
  },
  {
    id: "TASK-5",
    title: "Conduct choir rehearsal",
    status: "in progress",
    priority: "medium",
    assignee: "David Kim",
    department: "Music",
    finalApproval: "Music Director",
    dueDate: "2023-07-18",
  },
  {
    id: "TASK-6",
    title: "Prepare nursery for Sunday service",
    status: "todo",
    priority: "high",
    assignee: "Lisa Chen",
    department: "Children's Ministry",
    finalApproval: "Children's Pastor",
    dueDate: "2023-07-16",
  },
  {
    id: "TASK-7",
    title: "Review monthly budget",
    status: "in progress",
    priority: "high",
    assignee: "Tom Harris",
    department: "Finance",
    finalApproval: "Treasurer",
    dueDate: "2023-07-30",
  },
  {
    id: "TASK-8",
    title: "Coordinate volunteers for food bank",
    status: "todo",
    priority: "medium",
    assignee: "Grace Taylor",
    department: "Community Service",
    finalApproval: "Outreach Coordinator",
    dueDate: "2023-07-22",
  },
  {
    id: "TASK-9",
    title: "Prepare communion elements",
    status: "done",
    priority: "high",
    assignee: "Robert Clark",
    department: "Worship",
    finalApproval: "Senior Pastor",
    dueDate: "2023-07-14",
  },
  {
    id: "TASK-10",
    title: "Plan next leadership meeting",
    status: "todo",
    priority: "medium",
    assignee: "Amanda White",
    department: "Administration",
    finalApproval: "Senior Pastor",
    dueDate: "2023-07-28",
  },
]

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("list")
  const [tasks, setTasks] = useState(initialTasks)

  const addTask = (newTask: Task) => {
    setTasks([...tasks, { ...newTask, id: `TASK-${Math.random().toString(36).substr(2, 4)}` }])
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Task Management</h2>
      </div>
      <div className="flex space-x-4">
        <div className="w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="space-y-4">
              <TaskList initialTasks={tasks} />
            </TabsContent>
            <TabsContent value="calendar" className="space-y-4">
              <TaskCalendar tasks={tasks} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-1/3">
          <TaskForms onAddTask={addTask} />
        </div>
      </div>
    </div>
  )
}

