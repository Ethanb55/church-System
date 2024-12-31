"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'

type Poll = {
  id: string
  question: string
  options: string[]
  votes: { [key: string]: number }
}

type PollSystemProps = {
  isAdmin: boolean
}

export function PollSystem({ isAdmin }: PollSystemProps) {
  const [polls, setPolls] = useState<Poll[]>([])
  const [newPoll, setNewPoll] = useState({ question: '', options: ['', ''] })
  const [isCreatePollOpen, setIsCreatePollOpen] = useState(false)

  const handleCreatePoll = () => {
    if (newPoll.question && newPoll.options.every(option => option.trim() !== '')) {
      const poll: Poll = {
        id: Date.now().toString(),
        question: newPoll.question,
        options: newPoll.options,
        votes: newPoll.options.reduce((acc, option) => ({ ...acc, [option]: 0 }), {})
      }
      setPolls([...polls, poll])
      setNewPoll({ question: '', options: ['', ''] })
      setIsCreatePollOpen(false)
    }
  }

  const handleVote = (pollId: string, option: string) => {
    setPolls(polls.map(poll => 
      poll.id === pollId 
        ? { ...poll, votes: { ...poll.votes, [option]: (poll.votes[option] || 0) + 1 } }
        : poll
    ))
  }

  return (
    <div className="space-y-4">
      {isAdmin && (
        <Collapsible open={isCreatePollOpen} onOpenChange={setIsCreatePollOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full" onClick={() => setIsCreatePollOpen(!isCreatePollOpen)}>
              {isCreatePollOpen ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Hide Create Poll
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Poll
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Create New Poll</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="question">Question</Label>
                    <Input
                      id="question"
                      value={newPoll.question}
                      onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
                      placeholder="Enter your question"
                    />
                  </div>
                  {newPoll.options.map((option, index) => (
                    <div key={index}>
                      <Label htmlFor={`option-${index}`}>Option {index + 1}</Label>
                      <Input
                        id={`option-${index}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...newPoll.options]
                          newOptions[index] = e.target.value
                          setNewPoll({ ...newPoll, options: newOptions })
                        }}
                        placeholder={`Enter option ${index + 1}`}
                      />
                    </div>
                  ))}
                  <Button onClick={() => setNewPoll({ ...newPoll, options: [...newPoll.options, ''] })}>
                    Add Option
                  </Button>
                  <Button onClick={handleCreatePoll}>Create Poll</Button>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}

      {polls.map(poll => (
        <Card key={poll.id} className="bg-blue-100 dark:bg-blue-900">
          <CardHeader>
            <CardTitle>{poll.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={(value) => handleVote(poll.id, value)}>
              {poll.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${poll.id}-${index}`} />
                  <Label htmlFor={`option-${poll.id}-${index}`}>{option}</Label>
                  <span>({poll.votes[option] || 0} votes)</span>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

