"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileUp, Download, Search, Plus } from 'lucide-react'

type Resource = {
  id: string
  name: string
  type: string
  category: string
  uploadDate: string
  uploadedBy: string
  downloadUrl: string
}

const initialResources: Resource[] = [
  {
    id: '1',
    name: 'Sunday Service Flyer Template',
    type: 'PSD',
    category: 'Graphics',
    uploadDate: '2023-07-01',
    uploadedBy: 'John Doe',
    downloadUrl: '#'
  },
  {
    id: '2',
    name: 'Worship Background Loop',
    type: 'MP4',
    category: 'Video',
    uploadDate: '2023-07-05',
    uploadedBy: 'Jane Smith',
    downloadUrl: '#'
  },
  {
    id: '3',
    name: 'Church Logo Pack',
    type: 'AI',
    category: 'Branding',
    uploadDate: '2023-07-10',
    uploadedBy: 'Mike Johnson',
    downloadUrl: '#'
  }
]

export function ResourceLibrary() {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [newResource, setNewResource] = useState<Omit<Resource, 'id' | 'uploadDate'>>({
    name: '',
    type: '',
    category: '',
    uploadedBy: '',
    downloadUrl: ''
  })

  const filteredResources = resources.filter(resource => 
    (resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
     resource.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === 'All' || resource.category === categoryFilter)
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewResource(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setNewResource(prev => ({ ...prev, category: value }))
  }

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault()
    const newResourceWithId: Resource = {
      ...newResource,
      id: (resources.length + 1).toString(),
      uploadDate: new Date().toISOString().split('T')[0]
    }
    setResources(prev => [...prev, newResourceWithId])
    setNewResource({
      name: '',
      type: '',
      category: '',
      uploadedBy: '',
      downloadUrl: ''
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Library</CardTitle>
        <CardDescription>Manage and access creative resources for your church</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Graphics">Graphics</SelectItem>
              <SelectItem value="Video">Video</SelectItem>
              <SelectItem value="Audio">Audio</SelectItem>
              <SelectItem value="Branding">Branding</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogDescription>
                  Enter the details of the new resource you'd like to add to the library.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddResource}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newResource.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Input
                      id="type"
                      name="type"
                      value={newResource.type}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select
                      value={newResource.category}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Graphics">Graphics</SelectItem>
                        <SelectItem value="Video">Video</SelectItem>
                        <SelectItem value="Audio">Audio</SelectItem>
                        <SelectItem value="Branding">Branding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="uploadedBy" className="text-right">
                      Uploaded By
                    </Label>
                    <Input
                      id="uploadedBy"
                      name="uploadedBy"
                      value={newResource.uploadedBy}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="downloadUrl" className="text-right">
                      Download URL
                    </Label>
                    <Input
                      id="downloadUrl"
                      name="downloadUrl"
                      value={newResource.downloadUrl}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Resource</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>{resource.name}</TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>{resource.category}</TableCell>
                <TableCell>{resource.uploadDate}</TableCell>
                <TableCell>{resource.uploadedBy}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <a href={resource.downloadUrl} download>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

