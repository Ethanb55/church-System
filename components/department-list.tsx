"use client"

import { useState } from "react"
import { Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const initialDepartments = [
  "Worship",
  "Children's Ministry",
  "Youth Ministry",
  "Outreach",
  "Administration",
  "Creative",
  "Hospitality",
  "I.T."
]

export function DepartmentList({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [departments, setDepartments] = useState(initialDepartments)
  const [newDepartment, setNewDepartment] = useState("")

  const handleAddDepartment = () => {
    if (newDepartment.trim() !== "") {
      setDepartments([...departments, newDepartment.trim()])
      setNewDepartment("")
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Departments</CardTitle>
        <CardDescription>Manage church departments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departments.map((dept, index) => (
            <Button key={index} variant="outline" className="w-full justify-start" asChild>
              <Link href={`/departments/${dept.toLowerCase().replace(/\s+/g, '-')}`}>
                {dept}
              </Link>
            </Button>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>
                  Enter the name of the new department you'd like to add.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddDepartment}>Add Department</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

