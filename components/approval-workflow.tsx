import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Task } from './task-list'

type ApprovalWorkflowProps = {
  task: Task
  onApprove: (taskId: string) => void
  onRequestRevision: (taskId: string, revisionNotes: string) => void
}

export function ApprovalWorkflow({ task, onApprove, onRequestRevision }: ApprovalWorkflowProps) {
  const [revisionNotes, setRevisionNotes] = useState('')

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Assets for Approval</h3>
        {task.assets && task.assets.length > 0 ? (
          <ul className="list-disc list-inside">
            {task.assets.map((asset, index) => (
              <li key={index}>
                <a href={asset} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Asset {index + 1}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No assets submitted for this task.</p>
        )}
      </div>
      <div className="space-y-2">
        <Button onClick={() => onApprove(task.id)} className="w-full">
          Approve
        </Button>
        <div>
          <Label htmlFor="revisionNotes">Revision Notes</Label>
          <Input
            id="revisionNotes"
            value={revisionNotes}
            onChange={(e) => setRevisionNotes(e.target.value)}
            placeholder="Enter revision notes..."
          />
        </div>
        <Button onClick={() => onRequestRevision(task.id, revisionNotes)} variant="outline" className="w-full">
          Request Revision
        </Button>
      </div>
    </div>
  )
}

