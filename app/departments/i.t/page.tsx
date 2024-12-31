"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DepartmentDashboard } from "@/components/department-dashboard"

export default function ITDepartmentPage() {
  const [tickets, setTickets] = useState([
    { id: 1, title: "Printer not working", status: "Open", priority: "Medium" },
    { id: 2, title: "New laptop setup", status: "In Progress", priority: "High" },
    { id: 3, title: "Wi-Fi issues in sanctuary", status: "Closed", priority: "High" },
  ])

  const [inventory, setInventory] = useState([
    { id: 1, name: "Dell Laptop", type: "Computer", tag: "Office" },
    { id: 2, name: "HP Printer", type: "Printer", tag: "Office" },
    { id: 3, name: "Projector", type: "AV Equipment", tag: "Sanctuary" },
  ])

  const [newTicket, setNewTicket] = useState({ title: "", description: "", priority: "Medium" })
  const [newItem, setNewItem] = useState({ name: "", type: "", tag: "" })

  const handleNewTicket = (e: React.FormEvent) => {
    e.preventDefault()
    setTickets([...tickets, { id: tickets.length + 1, ...newTicket, status: "Open" }])
    setNewTicket({ title: "", description: "", priority: "Medium" })
  }

  const handleNewItem = (e: React.FormEvent) => {
    e.preventDefault()
    setInventory([...inventory, { id: inventory.length + 1, ...newItem }])
    setNewItem({ name: "", type: "", tag: "" })
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">I.T. Department</h2>
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="support">Support Tickets</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <DepartmentDashboard departmentName="I.T." />
        </TabsContent>
        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Manage I.T. support tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewTicket} className="space-y-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <Button type="submit">Create Ticket</Button>
              </form>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.status}</TableCell>
                      <TableCell>{ticket.priority}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>I.T. Inventory</CardTitle>
              <CardDescription>Manage I.T. equipment and assets</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewItem} className="space-y-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tag">Tag</Label>
                  <Input
                    id="tag"
                    value={newItem.tag}
                    onChange={(e) => setNewItem({ ...newItem, tag: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit">Add Item</Button>
              </form>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Tag</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.tag}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

