"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDropzone } from "react-dropzone"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { AddConnections } from "@/components/add-connections"

type Relationship = "Spouse" | "Child" | "Parent" | "Sibling" | "Other"

type RelatedUser = {
  id: string
  name: string
  relationship: Relationship
  age?: number
  grade?: string
}

type User = {
  id: string
  name: string
  email: string
  password: string
  birthday: string
  address: string
  marriageStatus: "Single" | "Married" | "Divorced" | "Widowed"
  role: string
  permissions: string[]
  profilePicture: string
  bio: string
  relatedUsers: RelatedUser[]
}

const initialUser: User = {
  id: "1",
  name: "John Smith",
  email: "john@example.com",
  password: "********",
  birthday: "1985-03-15",
  address: "123 Main St, Anytown, USA",
  marriageStatus: "Married",
  role: "Member",
  permissions: ["View Events", "RSVP to Events"],
  profilePicture: "/avatars/01.png",
  bio: "I'm a passionate member of this church community.",
  relatedUsers: [
    { id: "2", name: "Jane Smith", relationship: "Spouse" },
    { id: "3", name: "Tommy Smith", relationship: "Child", age: 10, grade: "5th Grade" },
    { id: "4", name: "Sarah Smith", relationship: "Child", age: 8, grade: "3rd Grade" },
  ],
}

export default function AccountPage() {
  const [user, setUser] = useState<User>(initialUser)
  const [isHovering, setIsHovering] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [crop, setCrop] = useState({ aspect: 1 })
  const [completedCrop, setCompletedCrop] = useState<any>(null)
  const [isCropping, setIsCropping] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated user data to your backend
    console.log("Updated user data:", user)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onload = () => {
      setUploadedImage(reader.result as string)
      setIsCropping(true)
    }

    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  })

  const handleCropComplete = (crop: any) => {
    setCompletedCrop(crop)
  }

  const handleSaveCrop = () => {
    if (completedCrop && uploadedImage) {
      const canvas = document.createElement("canvas")
      const image = new Image()
      image.src = uploadedImage

      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height
      canvas.width = completedCrop.width
      canvas.height = completedCrop.height
      const ctx = canvas.getContext("2d")

      if (ctx) {
        ctx.drawImage(
          image,
          completedCrop.x * scaleX,
          completedCrop.y * scaleY,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY,
          0,
          0,
          completedCrop.width,
          completedCrop.height
        )

        const croppedImageUrl = canvas.toDataURL("image/jpeg")
        setUser(prevUser => ({ ...prevUser, profilePicture: croppedImageUrl }))
      }
    }
    setIsCropping(false)
    setUploadedImage(null)
  }

  const handleAddFamilyMember = (newMember: Omit<RelatedUser, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newConnection = { ...newMember, id }

    setUser(prevUser => ({
      ...prevUser,
      relatedUsers: [...prevUser.relatedUsers, newConnection],
    }))

    // Simulate adding the corresponding connection to the other user's account
    console.log(`Adding corresponding connection to ${newMember.name}'s account:`, {
      id: user.id,
      name: user.name,
      relationship: getCorrespondingRelationship(newMember.relationship),
    })
  }

  const getCorrespondingRelationship = (relationship: Relationship): Relationship => {
    switch (relationship) {
      case 'Spouse':
        return 'Spouse'
      case 'Child':
        return 'Parent'
      case 'Parent':
        return 'Child'
      case 'Sibling':
        return 'Sibling'
      default:
        return 'Other'
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your personal information and account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <div
                {...getRootProps()}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="relative cursor-pointer"
              >
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.profilePicture} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {isHovering && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full">
                    Change Picture
                  </div>
                )}
                <input {...getInputProps()} />
              </div>
            </div>

            {isCropping && uploadedImage && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg">
                  <ReactCrop
                    src={uploadedImage}
                    crop={crop}
                    onChange={(newCrop) => setCrop(newCrop)}
                    onComplete={handleCropComplete}
                    aspect={1}
                  />
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button onClick={() => setIsCropping(false)}>Cancel</Button>
                    <Button onClick={handleSaveCrop}>Save</Button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={user.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" value={user.password} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="birthday">Birthday</Label>
                <Input id="birthday" name="birthday" type="date" value={user.birthday} onChange={handleInputChange} />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={user.address} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="marriageStatus">Marriage Status</Label>
                <Select name="marriageStatus" value={user.marriageStatus} onValueChange={(value) => handleSelectChange("marriageStatus", value)}>
                  <SelectTrigger>
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
              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" name="role" value={user.role} readOnly />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" value={user.bio} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Permissions</Label>
              <ul className="list-disc list-inside">
                {user.permissions.map((permission, index) => (
                  <li key={index}>{permission}</li>
                ))}
              </ul>
            </div>

            <div>
              <Label>Connections</Label>
              {user.relatedUsers.map((relatedUser) => (
                <div key={relatedUser.id} className="flex items-center space-x-2 mt-2">
                  <span>{relatedUser.name} - {relatedUser.relationship}</span>
                  {relatedUser.relationship === "Child" && (
                    <span>
                      (Age: {relatedUser.age}, Grade: {relatedUser.grade})
                    </span>
                  )}
                </div>
              ))}
              <div className="mt-4">
                <AddConnections onAddFamilyMember={handleAddFamilyMember} />
              </div>
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

