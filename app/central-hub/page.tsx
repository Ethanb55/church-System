"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Palette, Users, Globe, Music, Book, Calendar, Heart, DollarSign, UserPlus, UsersIcon, Zap, HomeIcon, Film } from 'lucide-react'

const hubs = [
  { name: "Creative Hub", icon: Palette, href: "/central-hub/creative-hub" },
  { name: "Kids Ministry Hub", icon: Users, href: "/central-hub/kids-ministry-hub" },
  { name: "Outreach Hub", icon: Globe, href: "/central-hub/outreach-hub" },
  { name: "Worship Hub", icon: Music, href: "/central-hub/worship-hub" },
  { name: "Discipleship Hub", icon: Book, href: "/central-hub/discipleship-hub" },
  { name: "Events Hub", icon: Calendar, href: "/central-hub/events-hub" },
  { name: "Prayer Hub", icon: Heart, href: "/central-hub/prayer-hub" },
  { name: "Giving Hub", icon: DollarSign, href: "/central-hub/giving-hub" },
  { name: "Volunteer Hub", icon: UserPlus, href: "/central-hub/volunteer-hub" },
  { name: "Leadership Hub", icon: UsersIcon, href: "/central-hub/leadership-hub" },
  { name: "NextGen Hub", icon: Zap, href: "/central-hub/nextgen-hub" },
  { name: "Welcome Hub", icon: HomeIcon, href: "/central-hub/welcome-hub" },
  { name: "Media Hub", icon: Film, href: "/central-hub/media-hub" },
]

export default function CentralHubPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Central Hub</h2>
      <p>Select a hub from the navigation menu on the left to get started.</p>
    </div>
  )
}

