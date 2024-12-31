import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Person, FollowUpStage, stageInfo, calculateProgress } from "./follow-up-dashboard"
import { AnimatedProgress } from "./animated-progress"
import { AnimatedEmoji } from "./animated-emoji"

type PersonDetailsProps = {
  person: Person
  onUpdate: (updatedPerson: Person) => void
  onClose: () => void
}

export function PersonDetails({ person, onUpdate, onClose }: PersonDetailsProps) {
  const [editedPerson, setEditedPerson] = useState(person)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedPerson(prev => ({ ...prev, [name]: value }))
  }

  const handleStageChange = (value: FollowUpStage) => {
    setEditedPerson(prev => ({ ...prev, stage: value }))
  }

  const handleSave = () => {
    onUpdate(editedPerson)
  }

  const getNextStep = (stage: FollowUpStage): string => {
    switch (stage) {
      case 'initial_contact':
        return 'Schedule second contact'
      case 'second_contact':
        return 'Schedule meeting'
      case 'meeting_scheduled':
        return 'Complete meeting'
      case 'meeting_completed':
        return 'Plan next steps'
      case 'next_steps':
        return 'Follow up on next steps'
      case 'completed':
        return 'Follow-up process completed'
      default:
        return ''
    }
  }

  const handleCompleteNextStep = () => {
    const stages = Object.keys(stageInfo) as FollowUpStage[]
    const currentIndex = stages.indexOf(editedPerson.stage)
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1]
      setEditedPerson(prev => ({ ...prev, stage: nextStage }))
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={editedPerson.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="stage">Stage</Label>
        <Select value={editedPerson.stage} onValueChange={handleStageChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select stage" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(stageInfo).map(([stage, info]) => (
              <SelectItem key={stage} value={stage}>
                {info.emoji} {info.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastContact">Last Contact</Label>
        <Input
          id="lastContact"
          name="lastContact"
          type="date"
          value={editedPerson.lastContact}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={editedPerson.notes}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="assignedTo">Assigned To</Label>
        <Input
          id="assignedTo"
          name="assignedTo"
          value={editedPerson.assignedTo}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Progress</Label>
        <AnimatedProgress value={calculateProgress(editedPerson.stage)} className="h-2" />
        <div className="flex justify-between text-sm">
          <span>{calculateProgress(editedPerson.stage).toFixed(0)}% Complete</span>
          <AnimatedEmoji emoji={stageInfo[editedPerson.stage].moodEmoji} />
        </div>
      </div>
      <div className="pt-4 border-t">
        <h3 className="text-lg font-semibold mb-2">Next Step</h3>
        <p className="mb-2">{getNextStep(editedPerson.stage)}</p>
        <Button onClick={handleCompleteNextStep} disabled={editedPerson.stage === 'completed'}>
          Complete Next Step
        </Button>
      </div>
      <div className="flex justify-between">
        <Button onClick={handleSave}>Save Changes</Button>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </div>
    </div>
  )
}

