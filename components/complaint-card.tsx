"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, User, CheckCircle, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type ComplaintStatus = "open" | "in-progress" | "resolved"

interface Complaint {
  id: string
  title: string
  description: string
  category: string
  status: ComplaintStatus
  location: string
  createdAt: string
  citizenName?: string
  contractorName?: string
}

interface ComplaintCardProps {
  complaint: Complaint
  onConfirmResolved?: (id: string) => void
  onReopen?: (id: string) => void
  onAssign?: (id: string) => void
  onMarkResolved?: (id: string) => void
  showActions?: boolean
  variant?: "citizen" | "contractor" | "admin"
}

const statusConfig = {
  open: {
    label: "Open",
    className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    color: "#9E9E9E",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    color: "#1976D2",
  },
  resolved: {
    label: "Resolved",
    className: "bg-green-100 text-green-800 hover:bg-green-200",
    color: "#2E7D32",
  },
}

const categoryIcons = {
  road: "🛣️",
  garbage: "🗑️",
  water: "💧",
  electricity: "⚡",
}

export function ComplaintCard({
  complaint,
  onConfirmResolved,
  onReopen,
  onAssign,
  onMarkResolved,
  showActions = false,
  variant = "citizen",
}: ComplaintCardProps) {
  const statusInfo = statusConfig[complaint.status]

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{categoryIcons[complaint.category as keyof typeof categoryIcons] || "📋"}</div>
            <div>
              <CardTitle className="text-lg">{complaint.title}</CardTitle>
              <div className="flex items-center gap-4 mt-1">
                <Badge variant="secondary" className={cn("rounded-full", statusInfo.className)}>
                  {statusInfo.label}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {complaint.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CardDescription className="mb-4">{complaint.description}</CardDescription>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(complaint.createdAt).toLocaleDateString()}
            </div>
            {complaint.citizenName && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {complaint.citizenName}
              </div>
            )}
          </div>

          {showActions && (
            <div className="flex gap-2">
              {complaint.status === "resolved" && variant === "citizen" && (
                <Button size="sm" variant="outline" onClick={() => onReopen?.(complaint.id)} className="rounded-xl">
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reopen
                </Button>
              )}
              {complaint.status === "in-progress" && variant === "citizen" && (
                <Button size="sm" onClick={() => onConfirmResolved?.(complaint.id)} className="rounded-xl">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Confirm Resolved
                </Button>
              )}
              {complaint.status === "in-progress" && variant === "contractor" && (
                <Button size="sm" onClick={() => onMarkResolved?.(complaint.id)} className="rounded-xl">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Mark Resolved
                </Button>
              )}
              {complaint.status === "open" && variant === "admin" && (
                <Button size="sm" onClick={() => onAssign?.(complaint.id)} className="rounded-xl">
                  Assign
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
