import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Lock, Unlock } from 'lucide-react'

type Document = {
  id: number
  name: string
  type: string
  size: string
  lastModified: string
  ministryArea?: string
  isLocked?: boolean
}

type DocumentListProps = {
  documents: Document[]
}

export function DocumentList({ documents }: DocumentListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Last Modified</TableHead>
          <TableHead>Ministry Area</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell>{doc.name}</TableCell>
            <TableCell>{doc.type}</TableCell>
            <TableCell>{doc.size}</TableCell>
            <TableCell>{doc.lastModified}</TableCell>
            <TableCell>{doc.ministryArea}</TableCell>
            <TableCell>{doc.isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">Download</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

