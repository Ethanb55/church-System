"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AIBrainstorming() {
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState('')
  const [goal, setGoal] = useState('')
  const [generatedIdeas, setGeneratedIdeas] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setGeneratedIdeas('')

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const simulatedResponse = `Here are some creative ideas based on your input:

1. "${topic}" Themed Community Festival: Organize a community-wide event targeting ${audience} with activities, food, and entertainment centered around ${goal}.

2. Digital Storytelling Series: Create a social media campaign where ${audience} share their personal stories related to "${topic}", fostering ${goal} through authentic connections.

3. Interactive Prayer Walk: Design a guided outdoor experience for ${audience} that combines physical activity, reflection on "${topic}", and opportunities for ${goal}.

4. "${topic}" Mentorship Program: Pair experienced church members with ${audience} for one-on-one guidance, focusing on ${goal} through the lens of "${topic}".

5. Virtual Reality Church Tour: Develop a VR experience that allows ${audience} to explore the church and learn about "${topic}", enhancing ${goal} through innovative technology.`

      setGeneratedIdeas(simulatedResponse)
    } catch (error) {
      console.error('Error generating ideas:', error)
      setGeneratedIdeas('An error occurred while generating ideas. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Brainstorming</CardTitle>
        <CardDescription>Get AI-generated ideas for your church projects</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertTitle>AI Integration Note</AlertTitle>
          <AlertDescription>
            The AI integration is currently simulated. In a production environment, this would connect to an AI service to generate real-time, customized ideas based on your input.
          </AlertDescription>
        </Alert>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
              What's the topic or theme of your project?
            </label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Youth engagement, Community outreach"
              required
            />
          </div>
          <div>
            <label htmlFor="audience" className="block text-sm font-medium text-gray-700">
              Who is your target audience?
            </label>
            <Input
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g., Teenagers, Young families, Seniors"
              required
            />
          </div>
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
              What's the main goal of this project?
            </label>
            <Input
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Increase attendance, Foster community, Spiritual growth"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating Ideas...' : 'Generate Ideas'}
          </Button>
        </form>
        {generatedIdeas && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Generated Ideas:</h3>
            <Textarea
              value={generatedIdeas}
              readOnly
              className="w-full h-48"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

