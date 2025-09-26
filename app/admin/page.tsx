"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ComplaintCard } from "@/components/complaint-card"
import { LeafletMap } from "@/components/leaflet-map"
import {
  ComplaintTrendChart,
  CategoryDistributionChart,
  ResolutionTimeChart,
  PredictionChart,
} from "@/components/analytics-charts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, AlertTriangle, CheckCircle, Clock, TrendingUp, Award, Star } from "lucide-react"

// Mock data for all complaints
const allComplaints = [
  {
    id: "1",
    title: "Pothole on Main Street",
    description: "Large pothole causing damage to vehicles near the intersection of Main St and Oak Ave.",
    category: "road",
    status: "in-progress" as const,
    location: "Main St & Oak Ave",
    createdAt: "2024-01-15",
    citizenName: "John Doe",
    contractorName: "Road Repair Co.",
    priority: "high",
  },
  {
    id: "2",
    title: "Overflowing Garbage Bin",
    description: "Garbage bin at Central Park has been overflowing for 3 days, attracting pests.",
    category: "garbage",
    status: "open" as const,
    location: "Central Park",
    createdAt: "2024-01-14",
    citizenName: "Jane Smith",
    priority: "medium",
  },
  {
    id: "3",
    title: "Street Light Not Working",
    description: "Street light has been out for over a week, making the area unsafe at night.",
    category: "electricity",
    status: "resolved" as const,
    location: "Pine Street",
    createdAt: "2024-01-10",
    citizenName: "Mike Johnson",
    contractorName: "Electric Solutions",
    priority: "high",
  },
  {
    id: "4",
    title: "Water Leak",
    description: "Water main leak causing flooding on the sidewalk.",
    category: "water",
    status: "in-progress" as const,
    location: "Elm Street",
    createdAt: "2024-01-12",
    citizenName: "Sarah Wilson",
    contractorName: "Plumbing Pros",
    priority: "high",
  },
]

// Mock analytics data
const citizenLeaderboard = [
  { name: "John Doe", complaints: 12, resolved: 10, rating: 4.8 },
  { name: "Jane Smith", complaints: 8, resolved: 7, rating: 4.6 },
  { name: "Mike Johnson", complaints: 6, resolved: 6, rating: 5.0 },
  { name: "Sarah Wilson", complaints: 5, resolved: 4, rating: 4.4 },
]

const contractorRanking = [
  { name: "Road Repair Co.", completed: 45, rating: 4.9, efficiency: 95 },
  { name: "Electric Solutions", completed: 38, rating: 4.7, efficiency: 92 },
  { name: "Plumbing Pros", completed: 32, rating: 4.8, efficiency: 88 },
  { name: "Waste Management Inc.", completed: 28, rating: 4.5, efficiency: 85 },
]

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const handleAssign = (id: string) => {
    console.log("Assigning complaint:", id)
  }

  const handleReopen = (id: string) => {
    console.log("Reopening complaint:", id)
  }

  const handleResolve = (id: string) => {
    console.log("Resolving complaint:", id)
  }

  const filteredComplaints = allComplaints.filter((complaint) => {
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
    const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesCategory && matchesSearch
  })

  const totalComplaints = allComplaints.length
  const openComplaints = allComplaints.filter((c) => c.status === "open").length
  const inProgressComplaints = allComplaints.filter((c) => c.status === "in-progress").length
  const resolvedComplaints = allComplaints.filter((c) => c.status === "resolved").length

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Oversee complaint management and system analytics</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 rounded-xl mb-8">
            <TabsTrigger value="overview" className="rounded-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="complaints" className="rounded-lg">
              Complaint Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Overview Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
                    <AlertTriangle className="w-4 h-4 text-[#FAC638]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalComplaints}</div>
                  <p className="text-xs text-muted-foreground mt-2">All time</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Open</CardTitle>
                    <Clock className="w-4 h-4 text-gray-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-600">{openComplaints}</div>
                  <p className="text-xs text-muted-foreground mt-2">Awaiting assignment</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{inProgressComplaints}</div>
                  <p className="text-xs text-muted-foreground mt-2">Being resolved</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{resolvedComplaints}</div>
                  <p className="text-xs text-muted-foreground mt-2">Completed</p>
                </CardContent>
              </Card>
            </div>

            {/* Map and Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle>System Overview Map</CardTitle>
                  <CardDescription>All complaints across the city with status indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <LeafletMap
                    complaints={allComplaints.map((complaint) => ({
                      id: complaint.id,
                      lat: 40.7128 + Math.random() * 0.2,
                      lng: -74.006 + Math.random() * 0.2,
                      title: complaint.title,
                      status: complaint.status,
                      category: complaint.category,
                      priority: complaint.priority,
                    }))}
                    height="h-64"
                    showHeatmap={true}
                  />
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system updates and actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Complaint Resolved</p>
                        <p className="text-sm text-muted-foreground">Street Light Not Working • Pine Street</p>
                      </div>
                      <span className="text-sm text-muted-foreground">1 hour ago</span>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Complaint Assigned</p>
                        <p className="text-sm text-muted-foreground">Pothole on Main Street • Road Repair Co.</p>
                      </div>
                      <span className="text-sm text-muted-foreground">2 hours ago</span>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">New Complaint</p>
                        <p className="text-sm text-muted-foreground">Overflowing Garbage Bin • Central Park</p>
                      </div>
                      <span className="text-sm text-muted-foreground">3 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="complaints">
            {/* Filters */}
            <Card className="rounded-2xl shadow-sm mb-6">
              <CardHeader>
                <CardTitle>Filter & Search</CardTitle>
                <CardDescription>Find and manage specific complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search complaints..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 rounded-xl"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48 rounded-xl">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-48 rounded-xl">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="road">Road & Infrastructure</SelectItem>
                      <SelectItem value="garbage">Waste Management</SelectItem>
                      <SelectItem value="water">Water & Drainage</SelectItem>
                      <SelectItem value="electricity">Electricity & Lighting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Complaints List */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Complaint Management</CardTitle>
                <CardDescription>
                  Showing {filteredComplaints.length} of {totalComplaints} complaints
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredComplaints.map((complaint) => (
                  <ComplaintCard
                    key={complaint.id}
                    complaint={complaint}
                    onAssign={handleAssign}
                    onReopen={handleReopen}
                    onMarkResolved={handleResolve}
                    showActions={true}
                    variant="admin"
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-8">
              {/* Charts Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                <ComplaintTrendChart />
                <CategoryDistributionChart />
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <ResolutionTimeChart />
                <Card className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#FAC638]" />
                      Performance Metrics
                    </CardTitle>
                    <CardDescription>Key system performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                        <div>
                          <p className="font-medium">Average Resolution Time</p>
                          <p className="text-sm text-muted-foreground">Across all categories</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#FAC638]">3.2 days</p>
                          <p className="text-sm text-green-600">↓ 15% from last month</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                        <div>
                          <p className="font-medium">Citizen Satisfaction</p>
                          <p className="text-sm text-muted-foreground">Average rating</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#FAC638]">4.7/5</p>
                          <p className="text-sm text-green-600">↑ 5% from last month</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                        <div>
                          <p className="font-medium">Resolution Rate</p>
                          <p className="text-sm text-muted-foreground">Complaints resolved</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#FAC638]">94%</p>
                          <p className="text-sm text-green-600">↑ 2% from last month</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Prediction Chart */}
              <PredictionChart />

              {/* Leaderboards */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Citizen Leaderboard */}
                <Card className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#FAC638]" />
                      Citizen Leaderboard
                    </CardTitle>
                    <CardDescription>Most active citizens in the community</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {citizenLeaderboard.map((citizen, index) => (
                        <div key={citizen.name} className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                          <div className="flex items-center justify-center w-8 h-8 bg-[#FAC638]/10 rounded-full">
                            <span className="text-sm font-bold text-[#FAC638]">#{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{citizen.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {citizen.complaints} complaints • {citizen.resolved} resolved
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-[#FAC638] text-[#FAC638]" />
                            <span className="text-sm font-medium">{citizen.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contractor Ranking */}
                <Card className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#FAC638]" />
                      Contractor Performance
                    </CardTitle>
                    <CardDescription>Top performing contractors by efficiency</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contractorRanking.map((contractor, index) => (
                        <div key={contractor.name} className="p-4 bg-muted/30 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-[#FAC638]/10 rounded-full">
                                <span className="text-sm font-bold text-[#FAC638]">#{index + 1}</span>
                              </div>
                              <div>
                                <p className="font-medium">{contractor.name}</p>
                                <p className="text-sm text-muted-foreground">{contractor.completed} completed</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-[#FAC638] text-[#FAC638]" />
                                <span className="text-sm font-medium">{contractor.rating}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{contractor.efficiency}% efficiency</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}