import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PersonDetails } from "./person-details"
import { AnimatedProgress } from "./animated-progress"
import { AnimatedEmoji } from "./animated-emoji"
import Confetti from 'react-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export type FollowUpStage = 'initial_contact' | 'second_contact' | 'meeting_scheduled' | 'meeting_completed' | 'next_steps' | 'completed'

export type Person = {
  id: string
  name: string
  stage: FollowUpStage
  lastContact: string
  priority: number
  notes: string
  assignedTo: string
}

export const stageInfo: Record<FollowUpStage, { emoji: string; label: string; moodEmoji: string }> = {
  initial_contact: { emoji: '👋', label: 'Initial Contact', moodEmoji: '😐' },
  second_contact: { emoji: '📞', label: 'Second Contact', moodEmoji: '🙂' },
  meeting_scheduled: { emoji: '📅', label: 'Meeting Scheduled', moodEmoji: '😊' },
  meeting_completed: { emoji: '🤝', label: 'Meeting Completed', moodEmoji: '😄' },
  next_steps: { emoji: '🚀', label: 'Next Steps', moodEmoji: '😁' },
  completed: { emoji: '🎉', label: 'Completed', moodEmoji: '🥳' }
}

export const calculateProgress = (stage: FollowUpStage): number => {
  const stages = Object.keys(stageInfo);
  const index = stages.indexOf(stage);
  return Math.round(((index + 1) / stages.length) * 100);
}

const calculatePriority = (person: Person): number => {
  const stageValue = Object.keys(stageInfo).indexOf(person.stage)
  const daysSinceLastContact = Math.floor((Date.now() - new Date(person.lastContact).getTime()) / (1000 * 3600 * 24))
  return stageValue * 10 + daysSinceLastContact
}

export function FollowUpDashboard() {
  const [people, setPeople] = useState<Person[]>([
    { id: '1', name: 'John Doe', stage: 'initial_contact', lastContact: '2023-07-01', priority: 0, notes: 'First time visitor', assignedTo: 'Sarah' },
    { id: '2', name: 'Jane Smith', stage: 'second_contact', lastContact: '2023-07-05', priority: 0, notes: 'Interested in youth group', assignedTo: 'Mike' },
    { id: '3', name: 'Bob Johnson', stage: 'meeting_scheduled', lastContact: '2023-07-10', priority: 0, notes: 'Meeting scheduled for next week', assignedTo: 'Lisa' },
    { id: '4', name: 'Alice Brown', stage: 'meeting_completed', lastContact: '2023-07-15', priority: 0, notes: 'Enjoyed the meeting, considering membership', assignedTo: 'Tom' },
    { id: '5', name: 'Charlie Davis', stage: 'next_steps', lastContact: '2023-07-20', priority: 0, notes: 'Ready to join a small group', assignedTo: 'Emma' },
  ])

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  const sortedPeople = people
    .map(person => ({
      ...person,
      priority: calculatePriority(person),
      progress: calculateProgress(person.stage)
    }))
    .sort((a, b) => a.progress - b.progress)

  const activePeople = sortedPeople.filter(person => person.stage !== 'completed')
  const completedPeople = sortedPeople.filter(person => person.stage === 'completed')

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person)
  }

  const handlePersonUpdate = (updatedPerson: Person) => {
    const oldStage = people.find(p => p.id === updatedPerson.id)?.stage
    const newStage = updatedPerson.stage

    setPeople(prevPeople => prevPeople.map(p => p.id === updatedPerson.id ? updatedPerson : p))
    setSelectedPerson(null)

    if (oldStage !== newStage && newStage === 'completed') {
      setShowConfetti(true)
    }
  }

  return (
    <div className="space-y-4">
      {showConfetti && <Confetti />}
      <Card>
        <CardHeader>
          <CardTitle>Follow-Up Dashboard</CardTitle>
          <CardDescription>Track progress of people in the follow-up process</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {activePeople.map(person => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-4 last:mb-0"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <Button variant="link" className="p-0" onClick={() => handlePersonClick(person)}>
                      <span className="font-semibold">{person.name}</span>
                    </Button>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {stageInfo[person.stage].emoji} {stageInfo[person.stage].label}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Last Contact: {person.lastContact} 📆
                  </span>
                </div>
                <AnimatedProgress value={calculateProgress(person.stage)} className="h-2" max={100} />
                <div className="flex justify-between text-sm mt-1">
                  <span>Priority: {person.priority} 🔥</span>
                  <span>
                    {calculateProgress(person.stage).toFixed(0)}% Complete
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>

      {completedPeople.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Completed Follow-Ups</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence>
              {completedPeople.map(person => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 last:mb-0"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{person.name}</span>
                    <span>{stageInfo[person.stage].emoji} Completed</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      <Dialog open={selectedPerson !== null} onOpenChange={(open) => !open && setSelectedPerson(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Follow-Up Status</DialogTitle>
          </DialogHeader>
          {selectedPerson && (
            <PersonDetails
              person={selectedPerson}
              onUpdate={handlePersonUpdate}
              onClose={() => setSelectedPerson(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

