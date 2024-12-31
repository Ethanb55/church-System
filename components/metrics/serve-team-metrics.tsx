"use client"

import { useState } from 'react'
import { BaseMetrics } from './base-metrics'

const initialData = [
  { date: '2023-01-01', value: 50 },
  { date: '2023-01-08', value: 55 },
  { date: '2023-01-15', value: 53 },
  { date: '2023-01-22', value: 58 },
  { date: '2023-01-29', value: 60 },
]

export function ServeTeamMetrics() {
  const [data, setData] = useState(initialData)

  const handleAddData = (newData: { date: string; value: number }) => {
    setData([...data, newData])
  }

  return (
    <BaseMetrics
      title="Serve Team Metrics"
      description="Track number of people serving on Sundays over time"
      data={data}
      onAddData={handleAddData}
    />
  )
}

