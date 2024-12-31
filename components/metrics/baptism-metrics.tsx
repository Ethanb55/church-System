"use client"

import { useState } from 'react'
import { BaseMetrics } from './base-metrics'

const initialData = [
  { date: '2023-01-01', value: 5 },
  { date: '2023-02-01', value: 7 },
  { date: '2023-03-01', value: 3 },
  { date: '2023-04-01', value: 10 },
  { date: '2023-05-01', value: 6 },
]

export function BaptismMetrics() {
  const [data, setData] = useState(initialData)

  const handleAddData = (newData: { date: string; value: number }) => {
    setData([...data, newData])
  }

  return (
    <BaseMetrics
      title="Baptism Metrics"
      description="Track baptisms over time"
      data={data}
      onAddData={handleAddData}
    />
  )
}

