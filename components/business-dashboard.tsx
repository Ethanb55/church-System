import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Business } from '@/lib/db-schema'
import { db } from '@/lib/db'

type BusinessDashboardProps = {
  business: Business
}

export function BusinessDashboard({ business: initialBusiness }: BusinessDashboardProps) {
  const { data: session } = useSession()
  const [business, setBusiness] = useState(initialBusiness)
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (session?.user?.role !== 'admin') return

    const updatedBusiness = await db.business.update(business.id, business)
    if (updatedBusiness) {
      setBusiness(updatedBusiness)
      setIsEditing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBusiness(prev => ({
      ...prev,
      [name]: value,
      theme: {
        ...prev.theme,
        [name]: value,
      }
    }))
  }

  if (session?.user?.role !== 'admin') {
    return <div>You do not have permission to access this dashboard.</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Dashboard</CardTitle>
        <CardDescription>Manage your business settings</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Business Name</Label>
            <Input
              id="name"
              name="name"
              value={business.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subdomain">Subdomain</Label>
            <Input
              id="subdomain"
              name="subdomain"
              value={business.subdomain}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customDomain">Custom Domain</Label>
            <Input
              id="customDomain"
              name="customDomain"
              value={business.customDomain || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <Input
              id="primaryColor"
              name="primaryColor"
              type="color"
              value={business.theme.primaryColor}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <Input
              id="secondaryColor"
              name="secondaryColor"
              type="color"
              value={business.theme.secondaryColor}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Font Family</Label>
            <Input
              id="fontFamily"
              name="fontFamily"
              value={business.theme.fontFamily}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          {isEditing ? (
            <Button type="submit">Save Changes</Button>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

