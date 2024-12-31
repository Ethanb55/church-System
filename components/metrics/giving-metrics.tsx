"use client"

import { useState } from 'react'
import { BaseMetrics } from './base-metrics'

const initialData = [
  { date: '2023-01-01', value: 10000 },
  { date: '2023-01-08', value: 12000 },
  { date: '2023-01-15', value: 11500 },
  { date: '2023-01-22', value: 13000 },
  { date: '2023-01-29', value: 14000 },
]

export function GivingMetrics() {
  const [data, setData] = useState(initialData)

  const handleAddData = (newData: { date: string; value: number }) => {
    setData([...data, newData])
  }

  return (
    <BaseMetrics
      title="Giving Metrics"
      description="Track giving amounts over time"
      data={data}
      onAddData={handleAddData}
    />
  )
}

