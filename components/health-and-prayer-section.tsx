import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

type HealthAndPrayerSectionProps = {
  className?: string
}

const mockPrayerRequests = [
  { id: 1, user: "Emma Davis", request: "Recovering from surgery", department: "Children's Ministry" },
  { id: 2, user: "Michael Brown", request: "Family member in hospital", department: "Worship" },
  { id: 3, user: "Sophia Wilson", request: "Job interview this week", department: "Outreach" },
]

export function HealthAndPrayerSection({ className }: HealthAndPrayerSectionProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Health & Prayer Requests</CardTitle>
        <CardDescription>Recent prayer requests from your department</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockPrayerRequests.map((request) => (
            <div key={request.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={`/avatars/0${request.id}.png`} />
                <AvatarFallback>{request.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="text-sm font-medium">{request.user}</p>
                <p className="text-sm text-muted-foreground">{request.request}</p>
                <p className="text-xs text-muted-foreground">{request.department}</p>
              </div>
              <Button variant="outline" size="sm">Pray</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

