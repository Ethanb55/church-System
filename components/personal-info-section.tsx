import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PersonalInfoSectionProps = {
  className?: string
}

export function PersonalInfoSection({ className }: PersonalInfoSectionProps) {
  const [birthday, setBirthday] = useState('')
  const [marriageStatus, setMarriageStatus] = useState('')
  const [children, setChildren] = useState('')
  const [anniversaryDate, setAnniversaryDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log('Submitted:', { birthday, marriageStatus, children, anniversaryDate })
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birthday">Birthday</Label>
            <Input
              id="birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="marriageStatus">Marriage Status</Label>
            <Select value={marriageStatus} onValueChange={setMarriageStatus}>
              <SelectTrigger id="marriageStatus">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Married">Married</SelectItem>
                <SelectItem value="Divorced">Divorced</SelectItem>
                <SelectItem value="Widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="children">Children (comma-separated)</Label>
            <Input
              id="children"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              placeholder="e.g. Emma, Liam"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="anniversaryDate">Anniversary Date</Label>
            <Input
              id="anniversaryDate"
              type="date"
              value={anniversaryDate}
              onChange={(e) => setAnniversaryDate(e.target.value)}
            />
          </div>
          <Button type="submit">Update</Button>
        </form>
      </CardContent>
    </Card>
  )
}

