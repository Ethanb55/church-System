import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Relationship = "Spouse" | "Child" | "Parent" | "Sibling" | "Other"

type RelatedUser = {
  id: string
  name: string
  relationship: Relationship
  age?: number
  grade?: string
}

type AddConnectionsProps = {
  onAddFamilyMember: (newMember: Omit<RelatedUser, 'id'>) => void
}

export function AddConnections({ onAddFamilyMember }: AddConnectionsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newFamilyMember, setNewFamilyMember] = useState<Omit<RelatedUser, 'id'>>({
    name: '',
    relationship: 'Other',
    age: undefined,
    grade: undefined,
  })

  const handleAddFamilyMember = () => {
    onAddFamilyMember(newFamilyMember)
    setNewFamilyMember({
      name: '',
      relationship: 'Other',
      age: undefined,
      grade: undefined,
    })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0 h-auto">
          <Plus className="h-4 w-4 mr-1" />
          <span className="text-xs">Add Connections</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Connection</DialogTitle>
          <DialogDescription>
            Add a new family member or connection to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newFamilyMember.name}
              onChange={(e) => setNewFamilyMember(prev => ({ ...prev, name: e.target.value }))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="relationship" className="text-right">
              Relationship
            </Label>
            <Select
              value={newFamilyMember.relationship}
              onValueChange={(value) => setNewFamilyMember(prev => ({ ...prev, relationship: value as Relationship }))}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Spouse">Spouse</SelectItem>
                <SelectItem value="Child">Child</SelectItem>
                <SelectItem value="Parent">Parent</SelectItem>
                <SelectItem value="Sibling">Sibling</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {newFamilyMember.relationship === 'Child' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={newFamilyMember.age || ''}
                  onChange={(e) => setNewFamilyMember(prev => ({ ...prev, age: parseInt(e.target.value) || undefined }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">
                  Grade
                </Label>
                <Input
                  id="grade"
                  value={newFamilyMember.grade || ''}
                  onChange={(e) => setNewFamilyMember(prev => ({ ...prev, grade: e.target.value }))}
                  className="col-span-3"
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleAddFamilyMember}>Add Connection</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

