import { notFound } from "next/navigation"
import { DepartmentDashboard } from "@/components/department-dashboard"

// This would typically come from a database or API
const departments = [
  "worship",
  "children's-ministry",
  "youth-ministry",
  "outreach",
  "administration",
]

export default function DepartmentPage({ params }: { params: { slug: string } }) {
  // Check if the department exists
  if (!departments.includes(params.slug)) {
    notFound()
  }

  // Convert slug to display name
  const departmentName = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return <DepartmentDashboard departmentName={departmentName} />
}

// Generate static params for all known departments
export function generateStaticParams() {
  return departments.map((dept) => ({
    slug: dept,
  }))
}

