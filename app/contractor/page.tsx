"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ComplaintCard } from "@/components/complaint-card"
import { LeafletMap } from "@/components/leaflet-map"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Star, TrendingUp } from "lucide-react"

// Mock data for assigned complaints
const assignedComplaints = [
  {
    id: "1",
    title: "Pothole on Main Street",
    description: "Large pothole causing damage to vehicles near the intersection of Main St and Oak Ave.",
    category: "road",
    status: "in-progress" as const,
    location: "Main St & Oak Ave",
    createdAt: "2024-01-15",
    citizenName: "John Doe",
    priority: "high",
    estimatedCompletion: "2024-01-20",
  },
  {
    id: "5",
    title: "Broken Sidewalk",
    description: "Cracked sidewalk creating tripping hazard for pedestrians.",
    category: "road",
    status: "in-progress" as const,
    location: "Park Avenue",
    createdAt: "2024-01-16",
    citizenName: "Alice Brown",
    priority: "medium",
    estimatedCompletion: "2024-01-22",
  },
  {
    id: "6",
    title: "Road Sign Replacement",
    description: "Stop sign damaged and needs immediate replacement for safety.",
    category: "road",
    status: "open" as const,
    location: "5th Street",
    createdAt: "2024-01-17",
    citizenName: "Bob Wilson",
    priority: "high",
    estimatedCompletion: "2024-01-19",
  },
]

const completedComplaints = [
  {
    id: "7",
    title: "Street Light Repair",
    description: "Replaced faulty street light bulb and checked electrical connections.",
    category: "electricity",
    status: "resolved" as const,
    location: "Pine Street",
    createdAt: "2024-01-10",
    citizenName: "Mike Johnson",
    completedAt: "2024-01-14",
    rating: 5,
  },
  {
    id: "8",
    title: "Pothole Repair",
    description: "Filled and sealed pothole on residential street.",
    category: "road",
    status: "resolved" as const,
    location: "Maple Drive",
    createdAt: "2024-01-08",
    citizenName: "Lisa Davis",
    completedAt: "2024-01-12",
    rating: 4,
  },
]

export default function ContractorDashboard() {
  const [selectedTab, setSelectedTab] = useState("active")

  const handleMarkResolved = (id: string) => {
    console.log("Marked as resolved:", id)
  }

  const performanceScore = 87
  const completionRate = 94
  const averageRating = 4.6
  const totalCompleted = 23

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Contractor Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your assigned tasks and track performance</p>
        </div>

        {/* Performance Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary mb-2">{performanceScore}%</div>
              <Progress value={performanceScore} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Above average</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageRating}</div>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= Math.floor(averageRating) ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                <Clock className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCompleted}</div>
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div>
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Assigned Locations</CardTitle>
                <CardDescription>Map showing your assigned complaint locations</CardDescription>
              </CardHeader>
              <CardContent>
                <LeafletMap
                  complaints={assignedComplaints.map((complaint) => ({
                    id: complaint.id,
                    lat: 40.7128 + Math.random() * 0.1,
                    lng: -74.006 + Math.random() * 0.1,
                    title: complaint.title,
                    status: complaint.status,
                    category: complaint.category,
                    priority: complaint.priority,
                  }))}
                  height="h-64"
                />
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>High Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Medium Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Low Priority</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks Section */}
          <div>
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Your Tasks</CardTitle>
                <CardDescription>Manage your assigned complaints and track progress</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-2 rounded-xl">
                    <TabsTrigger value="active" className="rounded-lg">
                      Active ({assignedComplaints.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="rounded-lg">
                      Completed ({completedComplaints.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="active" className="space-y-4 mt-6">
                    {assignedComplaints.map((complaint) => (
                      <div key={complaint.id} className="relative">
                        <ComplaintCard
                          complaint={complaint}
                          onMarkResolved={handleMarkResolved}
                          showActions={true}
                          variant="contractor"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge
                            variant="secondary"
                            className={`rounded-full ${
                              complaint.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : complaint.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {complaint.priority} priority
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-4 mt-6">
                    {completedComplaints.map((complaint) => (
                      <div key={complaint.id} className="relative">
                        <ComplaintCard complaint={complaint} variant="contractor" />
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-primary text-primary" />
                            <span className="text-sm font-medium">{complaint.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest task updates and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Completed: Street Light Repair</p>
                    <p className="text-sm text-muted-foreground">Pine Street • Rated 5 stars by citizen</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>

                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Started: Pothole on Main Street</p>
                    <p className="text-sm text-muted-foreground">Main St & Oak Ave • High priority task</p>
                  </div>
                  <span className="text-sm text-muted-foreground">1 day ago</span>
                </div>

                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Achievement: Performance Score Increased</p>
                    <p className="text-sm text-muted-foreground">Your score improved to 87% this month</p>
                  </div>
                  <span className="text-sm text-muted-foreground">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
