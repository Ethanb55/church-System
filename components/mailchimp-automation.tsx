"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type AutomationRule = {
  id: number
  name: string
  trigger: string
  action: string
  status: "Active" | "Inactive"
}

const initialRules: AutomationRule[] = [
  { id: 1, name: "Welcome Series", trigger: "New Subscriber", action: "Send 3-part email series", status: "Active" },
  { id: 2, name: "Re-engagement", trigger: "Inactive for 30 days", action: "Send re-engagement email", status: "Active" },
  { id: 3, name: "Birthday Greeting", trigger: "Member's birthday", action: "Send birthday email", status: "Inactive" },
]

export function MailchimpAutomation() {
  const [rules, setRules] = useState<AutomationRule[]>(initialRules)
  const [newRule, setNewRule] = useState<Omit<AutomationRule, 'id' | 'status'>>({ name: "", trigger: "", action: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewRule(prev => ({ ...prev, [name]: value }))
  }

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault()
    const ruleToAdd = {
      ...newRule,
      id: rules.length + 1,
      status: "Active" as const
    }
    setRules(prev => [...prev, ruleToAdd])
    setNewRule({ name: "", trigger: "", action: "" })
  }

  const handleToggleStatus = (id: number) => {
    setRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, status: rule.status === "Active" ? "Inactive" : "Active" } : rule
    ))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Automation Rule</CardTitle>
          <CardDescription>Create a new Mailchimp automation rule</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddRule} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Rule Name</Label>
              <Input id="name" name="name" value={newRule.name} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trigger">Trigger</Label>
              <Input id="trigger" name="trigger" value={newRule.trigger} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="action">Action</Label>
              <Textarea id="action" name="action" value={newRule.action} onChange={handleInputChange} required />
            </div>
            <Button type="submit">Add Rule</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
          <CardDescription>Manage your Mailchimp automation rules</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Toggle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map(rule => (
                <TableRow key={rule.id}>
                  <TableCell>{rule.name}</TableCell>
                  <TableCell>{rule.trigger}</TableCell>
                  <TableCell>{rule.action}</TableCell>
                  <TableCell>{rule.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleToggleStatus(rule.id)}>
                      {rule.status === "Active" ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

