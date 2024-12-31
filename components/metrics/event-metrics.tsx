"use client"

import { useState } from 'react'
import { BaseMetrics } from './base-metrics'

const initialData = [
  { date: '2023-01-01', value: 100 },
  { date: '2023-02-01', value: 120 },
  { date: '2023-03-01', value: 115 },
  { date: '2023-04-01', value: 130 },
  { date: '2023-05-01', value: 125 },
]

export function EventMetrics() {
  const [data, setData] = useState(initialData)

  const handleAddData = (newData: { date: string; value: number }) => {
    setData([...data, newData])
  }

  return (
    <BaseMetrics
      title="Event Metrics"
      description="Track event attendance over time"
      data={data}
      onAddData={handleAddData}
    />
  )
}

