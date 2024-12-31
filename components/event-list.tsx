import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Event = {
  id: number
  title: string
  date: string
  description: string
  location: string
  time: string
}

type EventListProps = {
  events: Event[]
  onSelectEvent: (event: Event) => void
}

export function EventList({ events, onSelectEvent }: EventListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.date} | {event.time}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
            <p className="text-sm font-medium mb-2">Location: {event.location}</p>
            <Button onClick={() => onSelectEvent(event)}>Select for Planning</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

