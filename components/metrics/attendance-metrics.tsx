"use client"

import { useState } from 'react'
import { BaseMetrics } from './base-metrics'

const initialData = [
  { date: '2023-01-01', value: 500 },
  { date: '2023-01-08', value: 550 },
  { date: '2023-01-15', value: 525 },
  { date: '2023-01-22', value: 575 },
  { date: '2023-01-29', value: 600 },
]

export function AttendanceMetrics() {
  const [data, setData] = useState(initialData)

  const handleAddData = (newData: { date: string; value: number }) => {
    setData([...data, newData])
  }

  return (
    <BaseMetrics
      title="Attendance Metrics"
      description="Track Sunday service attendance over time"
      data={data}
      onAddData={handleAddData}
    />
  )
}

