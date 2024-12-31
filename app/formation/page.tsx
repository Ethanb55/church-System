import { FormationList } from "@/components/formation-list"

export default function FormationPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Formation</h2>
      <FormationList />
    </div>
  )
}

