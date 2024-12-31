"use client"

import { useState } from 'react'
import { BaseMetrics } from './base-metrics'

const initialData = [
  { date: '2023-01-01', value: 15 },
  { date: '2023-02-01', value: 20 },
  { date: '2023-03-01', value: 18 },
  { date: '2023-04-01', value: 25 },
  { date: '2023-05-01', value: 22 },
]

export function NextStepsMetrics() {
  const [data, setData] = useState(initialData)

  const handleAddData = (newData: { date: string; value: number }) => {
    setData([...data, newData])
  }

  return (
    <BaseMetrics
      title="Next Steps Metrics"
      description="Track completed Next Steps over time"
      data={data}
      onAddData={handleAddData}
    />
  )
}

