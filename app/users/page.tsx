import { UserList } from "@/components/user-list"
import { OrgChart } from "@/components/org-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UsersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      </div>
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">User List</TabsTrigger>
          <TabsTrigger value="org-chart">Org Chart</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <UserList />
        </TabsContent>
        <TabsContent value="org-chart" className="space-y-4">
          <OrgChart />
        </TabsContent>
      </Tabs>
    </div>
  )
}

