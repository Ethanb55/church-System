"use client"

import { useState } from 'react'
import { BaseMetrics } from './base-metrics'

const initialData = [
  { date: '2023-01-01', value: 10 },
  { date: '2023-01-08', value: 15 },
  { date: '2023-01-15', value: 12 },
  { date: '2023-01-22', value: 18 },
  { date: '2023-01-29', value: 20 },
]

export function FirstTimeGuestMetrics() {
  const [data, setData] = useState(initialData)

  const handleAddData = (newData: { date: string; value: number }) => {
    setData([...data, newData])
  }

  return (
    <BaseMetrics
      title="First Time Guest Metrics"
      description="Track first time guests over time"
      data={data}
      onAddData={handleAddData}
    />
  )
}

