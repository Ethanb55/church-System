import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PrayerRequestList({ departmentName }: { departmentName: string }) {
  // This would typically come from a database
  const prayerRequests = [
    { id: 1, request: "Healing for Sarah's mother", date: "2023-06-14" },
    { id: 2, request: "Guidance for the youth retreat planning", date: "2023-06-13" },
    { id: 3, request: "Strength for our missionaries abroad", date: "2023-06-12" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prayer Requests</CardTitle>
        <CardDescription>Prayer requests for the {departmentName.replace('-', ' ')} department</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {prayerRequests.map((request) => (
            <li key={request.id} className="flex justify-between items-center">
              <span>{request.request}</span>
              <span className="text-sm text-muted-foreground">{request.date}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

