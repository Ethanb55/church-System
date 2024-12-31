import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function EmailingSection() {
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically integrate with an email service
    // For now, we'll just open the default email client
    const subject = encodeURIComponent((document.getElementById('subject') as HTMLInputElement).value)
    const body = encodeURIComponent((document.getElementById('body') as HTMLTextAreaElement).value)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Email</CardTitle>
        <CardDescription>Compose and send emails to church members</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSendEmail} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Enter email subject" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Message</Label>
            <Textarea id="body" placeholder="Type your message here" required />
          </div>
          <Button type="submit">Send Email</Button>
        </form>
      </CardContent>
    </Card>
  )
}

