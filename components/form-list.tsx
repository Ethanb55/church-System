import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FormList({ departmentName }: { departmentName: string }) {
  // This would typically come from a database
  const forms = [
    { id: 1, title: "Volunteer Application" },
    { id: 2, title: "Event Registration" },
    { id: 3, title: "Feedback Survey" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forms</CardTitle>
        <CardDescription>Available forms for the {departmentName.replace('-', ' ')} department</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {forms.map((form) => (
            <Button key={form.id} variant="outline" className="w-full justify-start">
              {form.title}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

