"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/student" },
  { icon: "👤", label: "Profile Overview", href: "/dashboard/student/profile" },
  { icon: "🏠", label: "Room Details", href: "/dashboard/student/room" },
  { icon: "⚠️", label: "Submit Complaint", href: "/dashboard/student/complaint" },
  { icon: "📋", label: "Complaint Status", href: "/dashboard/student/complaints" },
]

const complaintData = [
  {
    id: "1",
    category: "Room Issue",
    description: "Water leakage in bathroom",
    status: "Resolved",
    submittedDate: "2025-10-15",
    resolvedDate: "2025-10-22",
  },
  {
    id: "2",
    category: "Maintenance",
    description: "Fan not working properly",
    status: "In Progress",
    submittedDate: "2025-10-28",
    resolvedDate: null,
  },
]

export default function ComplaintsPage() {
  return (
    <DashboardLayout menuItems={menuItems} role="Student" userName="John Doe">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/student" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Complaint Status</h2>
            <p className="text-muted-foreground mt-1">Track your submitted complaints</p>
          </div>
        </div>

        <div className="space-y-4">
          {complaintData.map((complaint) => (
            <div key={complaint.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold text-foreground text-lg">{complaint.category}</p>
                  <p className="text-muted-foreground mt-1">{complaint.description}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    complaint.status === "Resolved"
                      ? "bg-green-100 text-green-800"
                      : complaint.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {complaint.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Submitted</p>
                  <p className="font-medium text-foreground">{complaint.submittedDate}</p>
                </div>
                {complaint.resolvedDate && (
                  <div>
                    <p className="text-xs text-muted-foreground">Resolved</p>
                    <p className="font-medium text-foreground">{complaint.resolvedDate}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
