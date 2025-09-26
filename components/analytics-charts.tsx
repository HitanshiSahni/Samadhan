"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Calendar, BarChart3 } from "lucide-react"

// Mock data for charts
const complaintTrendData = [
  { month: "Jan", complaints: 45, resolved: 38 },
  { month: "Feb", complaints: 52, resolved: 45 },
  { month: "Mar", complaints: 48, resolved: 42 },
  { month: "Apr", complaints: 61, resolved: 55 },
  { month: "May", complaints: 55, resolved: 48 },
  { month: "Jun", complaints: 67, resolved: 62 },
]

const categoryData = [
  { name: "Road & Infrastructure", value: 35, color: "#2E7D32" },
  { name: "Waste Management", value: 25, color: "#A5D6A7" },
  { name: "Water & Drainage", value: 20, color: "#1976D2" },
  { name: "Electricity & Lighting", value: 20, color: "#9E9E9E" },
]

const resolutionTimeData = [
  { category: "Road", avgDays: 5.2, target: 7 },
  { category: "Garbage", avgDays: 2.1, target: 3 },
  { category: "Water", avgDays: 3.8, target: 5 },
  { category: "Electricity", avgDays: 1.9, target: 2 },
]

const predictionData = [
  { month: "Jul", predicted: 58, actual: null },
  { month: "Aug", predicted: 62, actual: null },
  { month: "Sep", predicted: 55, actual: null },
  { month: "Oct", predicted: 48, actual: null },
  { month: "Nov", predicted: 52, actual: null },
  { month: "Dec", predicted: 45, actual: null },
]

export function ComplaintTrendChart() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Complaint Trends
        </CardTitle>
        <CardDescription>Monthly complaint submissions vs resolutions</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={complaintTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="complaints"
              stroke="#2E7D32"
              strokeWidth={3}
              dot={{ fill: "#2E7D32", strokeWidth: 2, r: 4 }}
              name="Complaints"
            />
            <Line
              type="monotone"
              dataKey="resolved"
              stroke="#A5D6A7"
              strokeWidth={3}
              dot={{ fill: "#A5D6A7", strokeWidth: 2, r: 4 }}
              name="Resolved"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function CategoryDistributionChart() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Category Distribution
        </CardTitle>
        <CardDescription>Breakdown of complaints by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {categoryData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-muted-foreground">{item.name}</span>
              <span className="text-sm font-medium ml-auto">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ResolutionTimeChart() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Resolution Time Analysis
        </CardTitle>
        <CardDescription>Average resolution time vs target by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={resolutionTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" stroke="#666" />
            <YAxis stroke="#666" label={{ value: "Days", angle: -90, position: "insideLeft" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="avgDays" fill="#2E7D32" name="Average Days" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" fill="#A5D6A7" name="Target Days" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function PredictionChart() {
  const combinedData = [...complaintTrendData, ...predictionData]

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>AI Prediction Timeline</CardTitle>
        <CardDescription>Predictive analytics for complaint resolution trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="complaints"
              stroke="#2E7D32"
              fill="#A5D6A7"
              fillOpacity={0.3}
              name="Historical"
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#1976D2"
              fill="#90CAF9"
              fillOpacity={0.3}
              strokeDasharray="5 5"
              name="Predicted"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary/30 rounded-sm" />
            <span className="text-muted-foreground">Historical Data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-300 rounded-sm border-dashed border border-blue-500" />
            <span className="text-muted-foreground">AI Predictions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
