"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CreateSheetPage() {
  const [sheetName, setSheetName] = useState('')
  const [department, setDepartment] = useState('')
  const [cells, setCells] = useState(Array(10).fill(Array(5).fill('')))

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newCells = cells.map((row, i) =>
      i === rowIndex ? row.map((cell, j) => j === colIndex ? value : cell) : row
    )
    setCells(newCells)
  }

  const handleSave = () => {
    // Here you would implement the logic to save the sheet
    console.log('Saving sheet:', { sheetName, department, cells })
    // In a real application, you'd send this data to your backend
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Create New Sheet</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="sheetName">Sheet Name</Label>
          <Input
            id="sheetName"
            value={sheetName}
            onChange={(e) => setSheetName(e.target.value)}
            placeholder="Enter sheet name"
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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {Array(5).fill(null).map((_, index) => (
                  <TableHead key={index}>{String.fromCharCode(65 + index)}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {cells.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <TableCell key={colIndex} className="p-0">
                      <Input
                        value={cell}
                        onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                        className="border-0 focus:ring-0"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button onClick={handleSave}>Save Sheet</Button>
      </div>
    </div>
  )
}

