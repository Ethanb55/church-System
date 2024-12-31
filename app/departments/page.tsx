import { DepartmentOverview } from "@/components/department-overview"
import { DepartmentList } from "@/components/department-list"

export default function DepartmentsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Departments</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <DepartmentOverview className="col-span-4" />
        <DepartmentList className="col-span-3" />
      </div>
    </div>
  )
}

