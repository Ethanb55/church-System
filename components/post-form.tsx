"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type PostFormProps = {
  date: Date | null
  onClose: () => void
  onSubmit: (data: PostFormData) => void
}

type PostFormData = {
  type: string
  caption: string
  collaborator: string
  script: string
}

export function PostForm({ date, onClose, onSubmit }: PostFormProps) {
  const [formData, setFormData] = useState<PostFormData>({
    type: '',
    caption: '',
    collaborator: '',
    script: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Social Media Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="caption" className="text-right">
                Caption
              </Label>
              <Textarea
                id="caption"
                name="caption"
                value={formData.caption}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="collaborator" className="text-right">
                Collaborator
              </Label>
              <Input
                id="collaborator"
                name="collaborator"
                value={formData.collaborator}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="script" className="text-right">
                Script
              </Label>
              <Textarea
                id="script"
                name="script"
                value={formData.script}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

