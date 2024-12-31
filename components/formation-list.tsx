"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

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

export function FormationList() {
  const [users, setUsers] = useState<FormationUser[]>(mockUsers)

  const [selectedUser, setSelectedUser] = useState<FormationUser | null>(null)

  const handleAssign = (userId: string, assignedTo: string, action: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, assignedTo, action } : user
    ))
  }

  const handleComplete = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, completed: true } : user
    ))
  }

  const handleAddNotes = (userId: string, notes: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, notes } : user
    ))
  }

  return (
    <Card>
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
              <TableHead>Actions</TableHead>
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
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setSelectedUser(user)}>Manage</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Manage Formation</DialogTitle>
                        <DialogDescription>
                          Assign actions and add notes for {selectedUser?.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="assignedTo" className="text-right">
                            Assigned To
                          </Label>
                          <Input
                            id="assignedTo"
                            defaultValue={selectedUser?.assignedTo}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="action" className="text-right">
                            Action
                          </Label>
                          <Input
                            id="action"
                            defaultValue={selectedUser?.action}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="notes" className="text-right">
                            Notes
                          </Label>
                          <Textarea
                            id="notes"
                            defaultValue={selectedUser?.notes}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => {
                          if (selectedUser) {
                            const assignedTo = (document.getElementById('assignedTo') as HTMLInputElement).value
                            const action = (document.getElementById('action') as HTMLInputElement).value
                            const notes = (document.getElementById('notes') as HTMLTextAreaElement).value
                            handleAssign(selectedUser.id, assignedTo, action)
                            handleAddNotes(selectedUser.id, notes)
                          }
                        }}>Save changes</Button>
                        {!selectedUser?.completed && (
                          <Button variant="outline" onClick={() => {
                            if (selectedUser) {
                              handleComplete(selectedUser.id)
                            }
                          }}>Mark as Completed</Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Stage Legend:</h3>
          <ul className="list-disc list-inside">
            <li>🌱 New Believer</li>
            <li>🌿 Growing in Faith</li>
            <li>🌳 Mature Believer</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

