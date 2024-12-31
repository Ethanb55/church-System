"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRight, ChevronDown } from 'lucide-react'

type FormationUser = {
  id: string
  name: string
  lastServed: string
  lastGave: string
  lastSmallGroup: string
  stageEmoji: string
  assignedTo: string
  action: string
  completed: boolean
  notes: string
}

const mockUsers: FormationUser[] = [
  {
    id: "1",
    name: "Alice Johnson",
    lastServed: "2023-06-01",
    lastGave: "2023-06-15",
    lastSmallGroup: "2023-06-10",
    stageEmoji: "🌱",
    assignedTo: "",
    action: "",
    completed: false,
    notes: ""
  },
  {
    id: "2",
    name: "Bob Smith",
    lastServed: "2023-05-15",
    lastGave: "2023-06-01",
    lastSmallGroup: "2023-05-20",
    stageEmoji: "🌿",
    assignedTo: "",
    action: "",
    completed: false,
    notes: ""
  },
  {
    id: "3",
    name: "Charlie Brown",
    lastServed: "2023-05-01",
    lastGave: "2023-05-10",
    lastSmallGroup: "2023-05-05",
    stageEmoji: "🌳",
    assignedTo: "",
    action: "",
    completed: false,
    notes: ""
  }
]

export function FormationSection() {
  const [users, setUsers] = useState<FormationUser[]>(mockUsers)
  const [newUser, setNewUser] = useState<Omit<FormationUser, 'id' | 'completed'>>({
    name: '',
    lastServed: '',
    lastGave: '',
    lastSmallGroup: '',
    stageEmoji: '🌱',
    assignedTo: '',
    action: '',
    notes: ''
  })
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewUser(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewUser(prev => ({ ...prev, [name]: value }))
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    const newUserWithId: FormationUser = {
      ...newUser,
      id: (users.length + 1).toString(),
      completed: false
    }
    setUsers(prev => [...prev, newUserWithId])
    setNewUser({
      name: '',
      lastServed: '',
      lastGave: '',
      lastSmallGroup: '',
      stageEmoji: '🌱',
      assignedTo: '',
      action: '',
      notes: ''
    })
  }

  return (
    <div className="flex space-x-4">
      <Card className="flex-grow">
        <CardHeader>
          <CardTitle>Formation List</CardTitle>
          <CardDescription>Track and manage member formation</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Last Served</TableHead>
                <TableHead>Last Gave</TableHead>
                <TableHead>Last Small Group</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.stageEmoji}</TableCell>
                  <TableCell>{user.lastServed}</TableCell>
                  <TableCell>{user.lastGave}</TableCell>
                  <TableCell>{user.lastSmallGroup}</TableCell>
                  <TableCell>{user.assignedTo}</TableCell>
                  <TableCell>{user.action}</TableCell>
                  <TableCell>{user.completed ? "Completed" : "Pending"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Collapsible
        open={isAddSectionOpen}
        onOpenChange={setIsAddSectionOpen}
        className="w-[300px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            Add New Formation Plan
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {isAddSectionOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <Card>
            <CardContent className="pt-4">
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stageEmoji">Stage</Label>
                  <Select
                    name="stageEmoji"
                    value={newUser.stageEmoji}
                    onValueChange={(value) => handleSelectChange("stageEmoji", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="🌱">🌱 New Believer</SelectItem>
                      <SelectItem value="🌿">🌿 Growing in Faith</SelectItem>
                      <SelectItem value="🌳">🌳 Mature Believer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastServed">Last Served</Label>
                  <Input
                    id="lastServed"
                    name="lastServed"
                    type="date"
                    value={newUser.lastServed}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastGave">Last Gave</Label>
                  <Input
                    id="lastGave"
                    name="lastGave"
                    type="date"
                    value={newUser.lastGave}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastSmallGroup">Last Small Group</Label>
                  <Input
                    id="lastSmallGroup"
                    name="lastSmallGroup"
                    type="date"
                    value={newUser.lastSmallGroup}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input
                    id="assignedTo"
                    name="assignedTo"
                    value={newUser.assignedTo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="action">Action</Label>
                  <Input
                    id="action"
                    name="action"
                    value={newUser.action}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={newUser.notes}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit">Add Formation Plan</Button>
              </form>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

