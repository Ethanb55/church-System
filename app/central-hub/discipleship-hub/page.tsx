"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SmallGroupFinder } from "@/components/discipleship-hub/small-group-finder"
import { motion } from 'framer-motion'

export default function DiscipleshipHubPage() {
  const [activeTab, setActiveTab] = useState("small-group-finder")

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <motion.h2 
        className="text-4xl font-bold tracking-tight text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Discipleship Hub
      </motion.h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full justify-start bg-background p-1 rounded-lg shadow-md">
          <TabsTrigger value="small-group-finder" className="flex-1 py-2 rounded-md transition-all duration-300">Small Group Finder</TabsTrigger>
          <TabsTrigger value="bible-study" className="flex-1 py-2 rounded-md transition-all duration-300">Bible Study Resources</TabsTrigger>
          <TabsTrigger value="online-courses" className="flex-1 py-2 rounded-md transition-all duration-300">Online Courses</TabsTrigger>
          <TabsTrigger value="ai-tools" className="flex-1 py-2 rounded-md transition-all duration-300">AI Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="small-group-finder" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="text-2xl">Small Group Finder</CardTitle>
                <CardDescription className="text-primary-foreground/80">Find and join a small group that fits your schedule and interests</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <SmallGroupFinder />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="bible-study" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="text-2xl">Bible Study Resources</CardTitle>
                <CardDescription className="text-primary-foreground/80">Access to devotionals, videos, and reading plans</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Bible study resources content coming soon...</p>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="online-courses" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="text-2xl">Online Courses</CardTitle>
                <CardDescription className="text-primary-foreground/80">Classes on theology, leadership, or life skills</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Online courses content coming soon...</p>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="ai-tools" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="text-2xl">AI Tools</CardTitle>
                <CardDescription className="text-primary-foreground/80">Personalized Learning Path, Chatbot Mentor, and Daily Scripture Prompts</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground">AI tools content coming soon...</p>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

