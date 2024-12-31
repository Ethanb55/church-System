"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Messaging } from "./messaging"

// Mock messages
const mockMessages = [
  { id: 1, sender: "John Doe", content: "Hello everyone!", timestamp: "10:00 AM" },
  { id: 2, sender: "Jane Smith", content: "Hi there!", timestamp: "10:05 AM" },
  { id: 3, sender: "Mike Johnson", content: "Any updates for the meeting?", timestamp: "10:10 AM" }
]

export function MessagingSystem() {
  const [message, setMessage] = useState("")
  const [selectedTarget, setSelectedTarget] = useState("All Members")
  const [messages, setMessages] = useState(mockMessages)

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Messaging</CardTitle>
          <CardDescription>Manage your messages and recipients</CardDescription>
        </CardHeader>
        <CardContent>
          <Messaging onSelectTarget={setSelectedTarget} />
        </CardContent>
      </Card>
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>{selectedTarget} Chat</CardTitle>
          <CardDescription>Communicate with your team</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] mb-4 p-4 border rounded-md">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={`/avatars/0${msg.id}.png`} alt={msg.sender} />
                  <AvatarFallback>{msg.sender.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{msg.sender}</p>
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-gray-500">{msg.timestamp}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

