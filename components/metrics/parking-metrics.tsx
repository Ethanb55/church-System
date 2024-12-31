"use client"

import { useState } from 'react'
import { BaseMetrics } from './base-metrics'

const initialData = [
  { date: '2023-01-01', value: 150 },
  { date: '2023-01-08', value: 165 },
  { date: '2023-01-15', value: 160 },
  { date: '2023-01-22', value: 175 },
  { date: '2023-01-29', value: 180 },
]

export function ParkingMetrics() {
  const [data, setData] = useState(initialData)

  const handleAddData = (newData: { date: string; value: number }) => {
    setData([...data, newData])
  }

  return (
    <BaseMetrics
      title="Parking Metrics"
      description="Track number of cars parked over time"
      data={data}
      onAddData={handleAddData}
    />
  )
}

