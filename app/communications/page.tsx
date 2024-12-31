"use client"

import dynamic from 'next/dynamic'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnnouncementsBanner } from "@/components/announcements-banner"

const DynamicMessagingSystem = dynamic(() => import('@/components/messaging-system'), { ssr: false })
const DynamicEmailingSection = dynamic(() => import('@/components/emailing-section'), { ssr: false })

export default function CommunicationsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Communications</h2>
      <AnnouncementsBanner />
      <Tabs defaultValue="messaging" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="messaging" className="space-y-4">
          <DynamicMessagingSystem />
        </TabsContent>
        <TabsContent value="email" className="space-y-4">
          <DynamicEmailingSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

