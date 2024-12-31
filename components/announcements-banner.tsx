"use client"

import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const announcements = [
  {
    id: 1,
    title: "Upcoming Church Picnic",
    description: "Join us this Saturday for our annual church picnic at Central Park!"
  },
  {
    id: 2,
    title: "Volunteer Opportunity",
    description: "We need volunteers for next month's community outreach program."
  },
  {
    id: 3,
    title: "New Bible Study Series",
    description: "Starting next week: 'Understanding the Psalms' every Wednesday at 7 PM."
  }
]

export function AnnouncementsBanner() {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0)
  const [showBanner, setShowBanner] = useState(true)

  const currentAnnouncement = announcements[currentAnnouncementIndex]

  const nextAnnouncement = () => {
    setCurrentAnnouncementIndex((prevIndex) => 
      (prevIndex + 1) % announcements.length
    )
  }

  const previousAnnouncement = () => {
    setCurrentAnnouncementIndex((prevIndex) => 
      (prevIndex - 1 + announcements.length) % announcements.length
    )
  }

  if (!showBanner) return null

  return (
    <Alert>
      <AlertTitle className="flex items-center">
        {currentAnnouncement.title}
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={previousAnnouncement}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextAnnouncement}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setShowBanner(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertTitle>
      <AlertDescription>{currentAnnouncement.description}</AlertDescription>
    </Alert>
  )
}

