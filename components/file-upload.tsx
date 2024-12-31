"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Upload, Lock, Unlock } from 'lucide-react'

type FileUploadProps = {
  onFileUpload: (file: File, metadata: FileMetadata) => void
}

type FileMetadata = {
  name: string
  ministryArea: string
  isLocked: boolean
}

const ministryAreas = [
  "Worship", "Children's Ministry", "Youth Ministry", "Outreach",
  "Administration", "Adult Education", "Small Groups", "Missions"
]

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [metadata, setMetadata] = useState<FileMetadata>({
    name: '',
    ministryArea: '',
    isLocked: false
  })

  const handleFileUpload = (file: File, metadata: FileMetadata) => {
    // Implement your file upload logic here
    console.log('File uploaded:', file, metadata)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setMetadata(prev => ({ ...prev, name: selectedFile.name }))
    }
  }

  const handleMetadataChange = (key: keyof FileMetadata, value: string | boolean) => {
    setMetadata(prev => ({ ...prev, [key]: value }))
  }

  const handleUpload = () => {
    if (file && metadata.name && metadata.ministryArea) {
      handleFileUpload(file, metadata)
      setFile(null)
      setMetadata({ name: '', ministryArea: '', isLocked: false })
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      if (file) {
        handleFileUpload(file, metadata)
      }
    }}>
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>Upload documents, sheets, videos, or images</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file">Select File</Label>
          <Input id="file" type="file" onChange={handleFileChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">File Name</Label>
          <Input
            id="name"
            value={metadata.name}
            onChange={(e) => handleMetadataChange('name', e.target.value)}
            placeholder="Enter file name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ministryArea">Ministry Area</Label>
          <Select
            value={metadata.ministryArea}
            onValueChange={(value) => handleMetadataChange('ministryArea', value)}
          >
            <SelectTrigger id="ministryArea">
              <SelectValue placeholder="Select ministry area" />
            </SelectTrigger>
            <SelectContent>
              {ministryAreas.map((area) => (
                <SelectItem key={area} value={area}>{area}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="locked"
            checked={metadata.isLocked}
            onCheckedChange={(checked) => handleMetadataChange('isLocked', checked)}
          />
          <Label htmlFor="locked">Lock Content</Label>
          {metadata.isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
        </div>
        <Button type="submit" disabled={!file || !metadata.name || !metadata.ministryArea}>
          <Upload className="mr-2 h-4 w-4" /> Upload File
        </Button>
      </CardContent>
    </Card>
    </form>
  )
}

