"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentList } from "@/components/document-list"
import { MeetingNotes } from "@/components/meeting-notes"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CollapsibleSidebar } from "@/components/collapsible-sidebar"

type Document = {
  id: number
  name: string
  type: string
  size: string
  lastModified: string
  ministryArea?: string
  isLocked?: boolean
}

// Sample documents data
const initialDocuments: Document[] = [
  { id: 1, name: "Church Constitution", type: "PDF", size: "2.5 MB", lastModified: "2023-06-15", ministryArea: "Administration", isLocked: true },
  { id: 2, name: "Annual Report 2022", type: "PDF", size: "5.1 MB", lastModified: "2023-01-30", ministryArea: "Administration", isLocked: false },
  { id: 3, name: "Staff Handbook", type: "DOCX", size: "1.8 MB", lastModified: "2023-03-10", ministryArea: "Administration", isLocked: true },
  { id: 4, name: "Song List", type: "XLSX", size: "500 KB", lastModified: "2023-06-20", ministryArea: "Worship", isLocked: false },
  { id: 5, name: "Curriculum Guide", type: "PDF", size: "2.7 MB", lastModified: "2023-06-01", ministryArea: "Children's Ministry", isLocked: false },
]

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic here
    console.log("Searching for:", searchQuery)
  }

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeTab === "all" || doc.ministryArea === activeTab)
  )

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 pr-16">
      <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Document Search</CardTitle>
          <CardDescription>Search through all church documents</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          {Array.from(new Set(documents.map(doc => doc.ministryArea))).map((area) => (
            <TabsTrigger key={area} value={area || ""}>{area}</TabsTrigger>
          ))}
          <TabsTrigger value="meeting-notes">Meeting Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <DocumentList documents={filteredDocuments} />
        </TabsContent>
        {Array.from(new Set(documents.map(doc => doc.ministryArea))).map((area) => (
          <TabsContent key={area} value={area || ""}>
            <DocumentList documents={filteredDocuments.filter(doc => doc.ministryArea === area)} />
          </TabsContent>
        ))}
        <TabsContent value="meeting-notes">
          <MeetingNotes />
        </TabsContent>
      </Tabs>

      <CollapsibleSidebar />
    </div>
  )
}

