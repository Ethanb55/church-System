"use client"

import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Event = {
  id: number
  title: string
  date: string
  description: string
  location: string
  time: string
}

type EventCalendarProps = {
  events: Event[]
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
  onSelectEvent: (event: Event) => void
}

export function EventCalendar({ events, selectedDate, setSelectedDate, onSelectEvent }: EventCalendarProps) {
  const eventsByDate = events.reduce((acc, event) => {
    const date = event.date
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(event)
    return acc
  }, {} as { [key: string]: Event[] })

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border"
        components={{
          DayContent: ({ day }) => {
            if (!day) return null;
            const dateKey = day.toISOString().split('T')[0]
            const eventsForDay = eventsByDate[dateKey] || []
            return (
              <div className="relative h-full w-full p-2">
                <span>{day.getDate()}</span>
                {eventsForDay.length > 0 && (
                  <Badge variant="secondary" className="absolute bottom-1 right-1">
                    {eventsForDay.length}
                  </Badge>
                )}
              </div>
            )
          },
        }}
      />
      {selectedDate && (
        <div>
          <h3 className="font-semibold mb-2">Events on {selectedDate.toDateString()}:</h3>
          {eventsByDate[selectedDate.toISOString().split('T')[0]]?.map(event => (
            <Button
              key={event.id}
              variant="outline"
              className="w-full justify-start mb-2"
              onClick={() => onSelectEvent(event)}
            >
              {event.title} - {event.time}
            </Button>
          )) || <p>No events on this date.</p>}
        </div>
      )}
    </div>
  )
}

