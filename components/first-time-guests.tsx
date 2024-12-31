"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Guest = {
  id: number
  name: string
  email: string
  visitDate: string
  followUpStatus: "Pending" | "In Progress" | "Completed"
}

const initialGuests: Guest[] = [
  { id: 1, name: "John Doe", email: "john@example.com", visitDate: "2023-07-01", followUpStatus: "Pending" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", visitDate: "2023-07-02", followUpStatus: "In Progress" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", visitDate: "2023-07-03", followUpStatus: "Completed" },
]

export function FirstTimeGuests() {
  const [guests, setGuests] = useState<Guest[]>(initialGuests)
  const [newGuest, setNewGuest] = useState<Omit<Guest, 'id' | 'followUpStatus'>>({ name: "", email: "", visitDate: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewGuest(prev => ({ ...prev, [name]: value }))
  }

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault()
    const guestToAdd = {
      ...newGuest,
      id: guests.length + 1,
      followUpStatus: "Pending" as const
    }
    setGuests(prev => [...prev, guestToAdd])
    setNewGuest({ name: "", email: "", visitDate: "" })
  }

  const handleUpdateStatus = (id: number, newStatus: Guest['followUpStatus']) => {
    setGuests(prev => prev.map(guest => 
      guest.id === id ? { ...guest, followUpStatus: newStatus } : guest
    ))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New First-Time Guest</CardTitle>
          <CardDescription>Enter details of a new first-time guest</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddGuest} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={newGuest.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={newGuest.email} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visitDate">Visit Date</Label>
                <Input id="visitDate" name="visitDate" type="date" value={newGuest.visitDate} onChange={handleInputChange} required />
              </div>
            </div>
            <Button type="submit">Add Guest</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>First-Time Guests</CardTitle>
          <CardDescription>Manage and follow up with first-time guests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Visit Date</TableHead>
                <TableHead>Follow-Up Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.map(guest => (
                <TableRow key={guest.id}>
                  <TableCell>{guest.name}</TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>{guest.visitDate}</TableCell>
                  <TableCell>{guest.followUpStatus}</TableCell>
                  <TableCell>
                    <select 
                      value={guest.followUpStatus} 
                      onChange={(e) => handleUpdateStatus(guest.id, e.target.value as Guest['followUpStatus'])}
                      className="border rounded p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

