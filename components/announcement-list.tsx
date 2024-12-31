import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AnnouncementList({ departmentName }: { departmentName: string }) {
  // This would typically come from a database
  const announcements = [
    { id: 1, title: "Upcoming Team Meeting", date: "2023-06-15" },
    { id: 2, title: "Volunteer Appreciation Day", date: "2023-06-20" },
    { id: 3, title: "New Training Session Available", date: "2023-06-25" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Announcements</CardTitle>
        <CardDescription>Latest announcements for the {departmentName.replace('-', ' ')} department</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="flex justify-between items-center">
              <span>{announcement.title}</span>
              <span className="text-sm text-muted-foreground">{announcement.date}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

