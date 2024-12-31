import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type DepartmentLeadSectionProps = {
  department: string
}

const mockDepartmentActivity = [
  { id: 1, user: "Alice Johnson", action: "completed a task", time: "2 hours ago" },
  { id: 2, user: "Bob Smith", action: "updated an event", time: "4 hours ago" },
  { id: 3, user: "Carol Williams", action: "submitted a report", time: "yesterday" },
]

export function DepartmentLeadSection({ department }: DepartmentLeadSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{department} Department Activity</CardTitle>
        <CardDescription>Recent actions by department members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockDepartmentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={`/avatars/0${activity.id}.png`} />
                <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

