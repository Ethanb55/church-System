"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, Send } from 'lucide-react'

type PrayerRequest = {
  id: string
  user: string
  content: string
  timestamp: string
  prayerCount: number
  comments: Comment[]
}

type Comment = {
  id: string
  user: string
  content: string
  timestamp: string
}

const initialPrayerRequests: PrayerRequest[] = [
  {
    id: '1',
    user: 'John Doe',
    content: 'Please pray for my mother who is undergoing surgery tomorrow.',
    timestamp: '2023-07-15T10:30:00Z',
    prayerCount: 5,
    comments: [
      {
        id: '1',
        user: 'Jane Smith',
        content: 'Praying for a successful surgery and quick recovery.',
        timestamp: '2023-07-15T11:00:00Z'
      }
    ]
  },
  {
    id: '2',
    user: 'Alice Johnson',
    content: 'Seeking prayers for guidance in my career decision.',
    timestamp: '2023-07-14T15:45:00Z',
    prayerCount: 3,
    comments: []
  }
]

export function InteractivePrayerWall() {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(initialPrayerRequests)
  const [newRequest, setNewRequest] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [newComment, setNewComment] = useState('')
  const [activeRequest, setActiveRequest] = useState<string | null>(null)

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    if (newRequest.trim()) {
      const newPrayerRequest: PrayerRequest = {
        id: (prayerRequests.length + 1).toString(),
        user: 'Current User', // In a real app, this would be the logged-in user
        content: newRequest,
        timestamp: new Date().toISOString(),
        prayerCount: 0,
        comments: []
      }
      setPrayerRequests([newPrayerRequest, ...prayerRequests])
      setNewRequest('')
    }
  }

  const handlePray = (id: string) => {
    setPrayerRequests(prayerRequests.map(request => 
      request.id === id ? { ...request, prayerCount: request.prayerCount + 1 } : request
    ))
  }

  const handleComment = (requestId: string) => {
    if (newComment.trim()) {
      setPrayerRequests(prayerRequests.map(request => 
        request.id === requestId ? {
          ...request,
          comments: [
            ...request.comments,
            {
              id: (request.comments.length + 1).toString(),
              user: 'Current User', // In a real app, this would be the logged-in user
              content: newComment,
              timestamp: new Date().toISOString()
            }
          ]
        } : request
      ))
      setNewComment('')
      setActiveRequest(null)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Interactive Prayer Wall</CardTitle>
        <CardDescription>Share your prayer requests and pray for others</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitRequest} className="mb-6">
          <Textarea
            placeholder="Share your prayer request..."
            value={newRequest}
            onChange={(e) => setNewRequest(e.target.value)}
            className="mb-2"
          />
          <Button type="submit">Submit Prayer Request</Button>
        </form>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="mine">My Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ScrollArea className="h-[600px]">
              {prayerRequests.map((request) => (
                <Card key={request.id} className="mb-4">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${request.user}`} />
                          <AvatarFallback>{request.user[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-sm font-medium">{request.user}</CardTitle>
                          <CardDescription className="text-xs">{new Date(request.timestamp).toLocaleString()}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary">{request.prayerCount} Prayers</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{request.content}</p>
                    <div className="flex items-center space-x-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handlePray(request.id)}>
                        <Heart className="w-4 h-4 mr-2" />
                        Pray
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setActiveRequest(request.id)}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Comment
                      </Button>
                    </div>
                    {activeRequest === request.id && (
                      <div className="mt-4">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="mb-2"
                        />
                        <Button size="sm" onClick={() => handleComment(request.id)}>
                          <Send className="w-4 h-4 mr-2" />
                          Send
                        </Button>
                      </div>
                    )}
                    {request.comments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {request.comments.map((comment) => (
                          <div key={comment.id} className="bg-muted p-2 rounded-md">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.user}`} />
                                <AvatarFallback>{comment.user[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{comment.user}</span>
                              <span className="text-xs text-muted-foreground">{new Date(comment.timestamp).toLocaleString()}</span>
                            </div>
                            <p className="text-sm mt-1">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="mine">
            {/* Similar to 'all' tab, but filtered for current user's requests */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

