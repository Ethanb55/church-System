"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Church } from 'lucide-react'
import { Home, Users, CheckSquare, Layers, Calendar, MessageSquare, BarChart, FileText, UserPlus, Palette, Globe, Music, Book, Heart, DollarSign, Zap, Film, Grid, ArrowLeft } from 'lucide-react'
import { motion } from "framer-motion"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/central-hub", label: "Central Hub", icon: Grid },
  { href: "/users", label: "Users", icon: Users },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/departments", label: "Departments", icon: Layers },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/communications", label: "Communications", icon: MessageSquare },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/follow-up", label: "Follow Up", icon: UserPlus },
  { href: "/metrics", label: "Metrics", icon: BarChart },
]

const centralHubItems = [
  { href: "/central-hub/creative-hub", label: "Creative Hub", icon: Palette },
  { href: "/central-hub/kids-ministry-hub", label: "Kids Ministry Hub", icon: Users },
  { href: "/central-hub/outreach-hub", label: "Outreach Hub", icon: Globe },
  { href: "/central-hub/worship-hub", label: "Worship Hub", icon: Music },
  { href: "/central-hub/discipleship-hub", label: "Discipleship Hub", icon: Book },
  { href: "/central-hub/events-hub", label: "Events Hub", icon: Calendar },
  { href: "/central-hub/prayer-hub", label: "Prayer Hub", icon: Heart },
  { href: "/central-hub/giving-hub", label: "Giving Hub", icon: DollarSign },
  { href: "/central-hub/volunteer-hub", label: "Volunteer Hub", icon: UserPlus },
  { href: "/central-hub/leadership-hub", label: "Leadership Hub", icon: Users },
  { href: "/central-hub/nextgen-hub", label: "NextGen Hub", icon: Zap },
  { href: "/central-hub/welcome-hub", label: "Welcome Hub", icon: Home },
  { href: "/central-hub/media-hub", label: "Media Hub", icon: Film },
]

// Assuming CollapsibleTrigger is imported
// import { CollapsibleTrigger } from '...'


export function MainNav() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inCentralHub, setInCentralHub] = useState(false)
  const [currentPageTitle, setCurrentPageTitle] = useState("")
  const router = useRouter()

  useEffect(() => {
    const path = router.pathname
    const title = navItems.find(item => item.href === path)?.label || 
                  centralHubItems.find(item => item.href === path)?.label ||
                  "Dashboard"
    setCurrentPageTitle(title)
  }, [router.pathname])

  return (
    <motion.nav 
      className={cn(
        "fixed left-0 top-0 z-50 h-full bg-card text-card-foreground transition-all duration-300 ease-in-out flex flex-col",
        isExpanded ? "w-64" : "w-16",
        "shadow-lg"
      )}
      initial={false}
      animate={{ width: isExpanded ? "16rem" : "4rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex-grow overflow-y-auto">
        <div className="mb-8 px-4 flex justify-center">
          <Church className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        {!inCentralHub ? (
          <>
            {navItems.map((item) => (
              item.label === "Central Hub" ? (
                <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start rounded-lg",
                      isExpanded ? "px-4" : "px-0 py-3",
                      "hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                    )}
                    onClick={() => setInCentralHub(true)}
                  >
                    <item.icon className={cn("h-5 w-5 text-blue-600 dark:text-blue-400", isExpanded ? "mr-3" : "mx-auto")} />
                    {isExpanded && <span className="text-gray-700 dark:text-gray-200">{item.label}</span>}
                  </Button>
                </motion.div>
              ) : (
                <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (item.label === "Central Hub") {
                        setInCentralHub(true)
                      }
                    }}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-lg",
                        isExpanded ? "px-4" : "px-0 py-3",
                        "hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5 text-blue-600 dark:text-blue-400", isExpanded ? "mr-3" : "mx-auto")} />
                      {isExpanded && <span className="text-gray-700 dark:text-gray-200">{item.label}</span>}
                    </Button>
                  </Link>
                </motion.div>
              )
            ))}
          </>
        ) : (
          <>
            {inCentralHub && (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start mb-4 rounded-lg",
                      isExpanded ? "px-4" : "px-0 py-3",
                      "hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                    )}
                    onClick={() => setInCentralHub(false)}
                  >
                    <ArrowLeft className={cn("h-5 w-5 text-blue-600 dark:text-blue-400", isExpanded ? "mr-3" : "mx-auto")} />
                    {isExpanded && <span className="text-gray-700 dark:text-gray-200">Back to Main</span>}
                  </Button>
                </motion.div>
                {centralHubItems.map((item) => (
                  <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start rounded-lg",
                          isExpanded ? "px-4" : "px-0 py-3",
                          "hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                        )}
                      >
                        <item.icon className={cn("h-5 w-5 text-blue-600 dark:text-blue-400", isExpanded ? "mr-3" : "mx-auto")} />
                        {isExpanded && <span className="text-gray-700 dark:text-gray-200">{item.label}</span>}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </>
            )}
          </>
        )}
      </div>
      <div className={cn(
        "p-4 border-t border-gray-200 dark:border-gray-700 transition-all duration-300",
        isExpanded ? "opacity-100" : "opacity-0"
      )}>
        <h2 className="text-lg font-semibold text-right">{currentPageTitle}</h2>
      </div>
    </motion.nav>
  )
}

