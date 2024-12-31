"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateDocPage() {
  const [docName, setDocName] = useState('')
  const [content, setContent] = useState('')
  const [department, setDepartment] = useState('')

  const handleSave = () => {
    // Here you would implement the logic to save the document
    console.log('Saving document:', { docName, content, department })
    // In a real application, you'd send this data to your backend
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Create New Document</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="docName">Document Name</Label>
          <Input
            id="docName"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            placeholder="Enter document name"
          />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger id="department">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="worship">Worship</SelectItem>
              <SelectItem value="childrens-ministry">Children's Ministry</SelectItem>
              <SelectItem value="youth-ministry">Youth Ministry</SelectItem>
              <SelectItem value="outreach">Outreach</SelectItem>
              <SelectItem value="administration">Administration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your document here..."
            className="min-h-[300px]"
          />
        </div>
        <Button onClick={handleSave}>Save Document</Button>
      </div>
    </div>
  )
}

