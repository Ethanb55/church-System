"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, UserCircle, Building2, MessageCircle } from 'lucide-react'

const departments = ["Worship", "Children's Ministry", "Youth Ministry", "Outreach", "Administration"]
const roles = ["Pastor", "Volunteer", "Staff", "Member"]

export function Messaging({ onSelectTarget }: { onSelectTarget: (target: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<'departments' | 'roles' | 'general' | 'direct'>('departments')

  return (
    <ScrollArea className="h-[500px]">
      <div className="space-y-4 p-4">
        <div className="flex space-x-2 mb-4">
          <Button
            variant={activeCategory === 'departments' ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory('departments')}
          >
            <Building2 className="w-4 h-4 mr-2" />
            Departments
          </Button>
          <Button
            variant={activeCategory === 'roles' ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory('roles')}
          >
            <UserCircle className="w-4 h-4 mr-2" />
            Roles
          </Button>
        </div>

        {activeCategory === 'departments' && (
          <div>
            <h3 className="mb-2 text-lg font-semibold">Departments</h3>
            {departments.map((dept) => (
              <Button
                key={dept}
                variant="ghost"
                className="w-full justify-start mb-2"
                onClick={() => onSelectTarget(`Department: ${dept}`)}
              >
                <Building2 className="mr-2 h-4 w-4" />
                {dept}
              </Button>
            ))}
          </div>
        )}

        {activeCategory === 'roles' && (
          <div>
            <h3 className="mb-2 text-lg font-semibold">Roles</h3>
            {roles.map((role) => (
              <Button
                key={role}
                variant="ghost"
                className="w-full justify-start mb-2"
                onClick={() => onSelectTarget(`Role: ${role}`)}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                {role}
              </Button>
            ))}
          </div>
        )}

        <div>
          <h3 className="mb-2 text-lg font-semibold">General</h3>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2"
            onClick={() => onSelectTarget("All Members")}
          >
            <Users className="mr-2 h-4 w-4" />
            All Members
          </Button>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">Direct Messages</h3>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2"
            onClick={() => onSelectTarget("Direct Message")}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            New Direct Message
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}

