"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type MetricData = {
  date: string
  value: number
}

type BaseMetricsProps = {
  title: string
  description: string
  data: MetricData[]
  onAddData: (newData: MetricData) => void
}

export function BaseMetrics({ title, description, data, onAddData }: BaseMetricsProps) {
  const [showInput, setShowInput] = useState(false)
  const [newDate, setNewDate] = useState('')
  const [newValue, setNewValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddData({ date: newDate, value: Number(newValue) })
    setNewDate('')
    setNewValue('')
    setShowInput(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        {showInput ? (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        ) : (
          <Button onClick={() => setShowInput(true)} className="mt-4">Add Data</Button>
        )}
      </CardContent>
    </Card>
  )
}

