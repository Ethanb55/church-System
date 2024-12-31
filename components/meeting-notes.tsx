"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type MeetingNote = {
  id: number
  title: string
  date: string
  content: string
  department: string
}

const initialMeetingNotes: MeetingNote[] = [
  {
    id: 1,
    title: "Weekly Staff Meeting",
    date: "2023-07-01",
    content: "Discussed upcoming events and budget allocation.",
    department: "Administration"
  },
  {
    id: 2,
    title: "Worship Team Rehearsal",
    date: "2023-07-02",
    content: "Planned songs for next Sunday and discussed new equipment needs.",
    department: "Worship"
  },
  {
    id: 3,
    title: "Youth Group Planning",
    date: "2023-07-03",
    content: "Brainstormed ideas for summer camp activities.",
    department: "Youth"
  }
]

export function MeetingNotes() {
  const [meetingNotes, setMeetingNotes] = useState<MeetingNote[]>(initialMeetingNotes)
  const [newNote, setNewNote] = useState<Omit<MeetingNote, 'id'>>({
    title: "",
    date: "",
    content: "",
    department: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewNote(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newNoteWithId = { ...newNote, id: Date.now() }
    setMeetingNotes(prev => [...prev, newNoteWithId])
    setNewNote({ title: "", date: "", content: "", department: "" })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Meeting Note</CardTitle>
          <CardDescription>Record notes from your latest meeting</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={newNote.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={newNote.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                value={newNote.department}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={newNote.content}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">Add Meeting Note</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {meetingNotes.map(note => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
              <CardDescription>{note.date} - {note.department}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

