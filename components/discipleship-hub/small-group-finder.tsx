"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Users, MapPin, Clock, ChevronDown, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type SmallGroup = {
  id: string
  name: string
  description: string
  day: string
  time: string
  location: string
  leader: string
  members: number
  maxMembers: number
  ageGroup: string
  type: string
}

const sampleGroups: SmallGroup[] = [
  {
    id: "1",
    name: "Young Adults Bible Study",
    description: "A group for young adults to study the Bible and discuss its application in daily life.",
    day: "Tuesday",
    time: "7:00 PM",
    location: "Church Fellowship Hall",
    leader: "Sarah Johnson",
    members: 8,
    maxMembers: 12,
    ageGroup: "Young Adults",
    type: "Bible Study"
  },
  {
    id: "2",
    name: "Men's Prayer Breakfast",
    description: "A weekly gathering for men to pray together and enjoy fellowship over breakfast.",
    day: "Saturday",
    time: "8:00 AM",
    location: "Local Diner",
    leader: "Mike Thompson",
    members: 6,
    maxMembers: 10,
    ageGroup: "Adults",
    type: "Community"
  },
  {
    id: "3",
    name: "Women's Book Club",
    description: "A monthly book club focusing on Christian literature and personal growth.",
    day: "First Thursday",
    time: "7:30 PM",
    location: "Rotating Homes",
    leader: "Emily Davis",
    members: 10,
    maxMembers: 15,
    ageGroup: "Adults",
    type: "Book Study"
  },
  {
    id: "4",
    name: "Family Bible Study",
    description: "A family-friendly Bible study with activities for all ages.",
    day: "Wednesday",
    time: "6:30 PM",
    location: "Church Classroom 3",
    leader: "The Wilson Family",
    members: 12,
    maxMembers: 20,
    ageGroup: "All Ages",
    type: "Families"
  },
  {
    id: "5",
    name: "Newlyweds Small Group",
    description: "A supportive community for newlyweds to discuss marriage and faith.",
    day: "Monday",
    time: "7:00 PM",
    location: "Church Lounge",
    leader: "John and Mary Smith",
    members: 8,
    maxMembers: 12,
    ageGroup: "Adults",
    type: "Marriage"
  }
]

export function SmallGroupFinder() {
  const [groups, setGroups] = useState<SmallGroup[]>(sampleGroups)
  const [filter, setFilter] = useState("")
  const [dayFilter, setDayFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")
  const [ageFilter, setAgeFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredGroups = groups.filter(group => 
    (group.name.toLowerCase().includes(filter.toLowerCase()) ||
    group.description.toLowerCase().includes(filter.toLowerCase())) &&
    (dayFilter === "all" || group.day.toLowerCase() === dayFilter.toLowerCase()) &&
    (locationFilter === "all" || group.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
    (timeFilter === "all" || group.time.toLowerCase().includes(timeFilter.toLowerCase())) &&
    (ageFilter === "all" || group.ageGroup.toLowerCase() === ageFilter.toLowerCase()) &&
    (typeFilter === "all" || group.type.toLowerCase() === typeFilter.toLowerCase())
  )

  const handleSignUp = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId && group.members < group.maxMembers
        ? { ...group, members: group.members + 1 }
        : group
    ))
  }

  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 rounded-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search groups..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-12 pr-4 py-3 w-full bg-white dark:bg-gray-800 rounded-full shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-300"
            aria-label="Search groups"
          />
        </div>
        <Select value={dayFilter} onValueChange={setDayFilter}>
          <SelectTrigger className="w-full sm:w-[200px] bg-white dark:bg-gray-800 rounded-full shadow-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300">
            <SelectValue placeholder="Filter by day" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All days</SelectItem>
            <SelectItem value="monday">Monday</SelectItem>
            <SelectItem value="tuesday">Tuesday</SelectItem>
            <SelectItem value="wednesday">Wednesday</SelectItem>
            <SelectItem value="thursday">Thursday</SelectItem>
            <SelectItem value="friday">Friday</SelectItem>
            <SelectItem value="saturday">Saturday</SelectItem>
            <SelectItem value="sunday">Sunday</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-full sm:w-[200px] bg-white dark:bg-gray-800 rounded-full shadow-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            <SelectItem value="church">Church</SelectItem>
            <SelectItem value="homes">Homes</SelectItem>
            <SelectItem value="community">Community</SelectItem>
          </SelectContent>
        </Select>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-full sm:w-[200px] bg-white dark:bg-gray-800 rounded-full shadow-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300">
            <SelectValue placeholder="Filter by time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All times</SelectItem>
            <SelectItem value="morning">Morning</SelectItem>
            <SelectItem value="afternoon">Afternoon</SelectItem>
            <SelectItem value="evening">Evening</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ageFilter} onValueChange={setAgeFilter}>
          <SelectTrigger className="w-full sm:w-[200px] bg-white dark:bg-gray-800 rounded-full shadow-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300">
            <SelectValue placeholder="Filter by age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ages</SelectItem>
            <SelectItem value="Young Adults">Young Adults</SelectItem>
            <SelectItem value="Adults">Adults</SelectItem>
            <SelectItem value="Seniors">Seniors</SelectItem>
            <SelectItem value="All Ages">All Ages</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[200px] bg-white dark:bg-gray-800 rounded-full shadow-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="Bible Study">Bible Study</SelectItem>
            <SelectItem value="Community">Community</SelectItem>
            <SelectItem value="Families">Families</SelectItem>
            <SelectItem value="Marriage">Marriage</SelectItem>
            <SelectItem value="Book Study">Book Study</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" aria-label="Loading" role="status"></div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
            {filteredGroups.map(group => (
              <motion.div
                key={group.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="flex flex-col h-full overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 rounded-xl border-none">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white transition-colors duration-300">
                    <CardTitle className="text-xl font-semibold text-white">{group.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1 text-sm text-blue-100">
                      <Calendar className="w-4 h-4 mr-1" />
                      {group.day}, <Clock className="w-4 h-4 mx-1" /> {group.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{group.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                        <span>Led by {group.leader}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{group.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Filter className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{group.type} | {group.ageGroup}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center bg-gray-50 dark:bg-gray-700">
                    <Badge variant={group.members >= group.maxMembers ? "secondary" : "default"} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      {group.members}/{group.maxMembers} members
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="bg-white hover:bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-400 dark:border-blue-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300" aria-label="View group details">
                          View Details
                          <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{group.name}</DialogTitle>
                          <DialogDescription>{group.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-muted-foreground" />
                            <p><strong>Day and Time:</strong> {group.day} at {group.time}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-muted-foreground" />
                            <p><strong>Location:</strong> {group.location}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-muted-foreground" />
                            <p><strong>Leader:</strong> {group.leader}</p>
                          </div>
                          <p><strong>Members:</strong> {group.members}/{group.maxMembers}</p>
                          <p><strong>Age Group:</strong> {group.ageGroup}</p>
                          <p><strong>Type:</strong> {group.type}</p>
                        </div>
                        <DialogFooter>
                          <Button 
                            onClick={() => handleSignUp(group.id)}
                            disabled={group.members >= group.maxMembers}
                            className="w-full"
                          >
                            {group.members >= group.maxMembers ? "Group Full" : "Sign Up"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

