"use client"
import DashboardLayout from "@/components/layout/dashboard-layout"
import StatCard from "@/components/dashboard/stat-card"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/parent" },
  { icon: <span>⚠️</span>, label: "View Complaints", href: "/dashboard/parent/complaints" },
]

const studentComplaints = [
  {
    id: "1",
    complaint: "Water leakage in room",
    status: "In Progress",
    date: "2025-11-01",
    priority: "High",
    target: "parent",
    source: "warden",
  },
  {
    id: "2",
    complaint: "Fan not working",
    status: "Resolved",
    date: "2025-10-28",
    priority: "Medium",
    target: "parent",
    source: "student",
  },
  {
    id: "3",
    complaint: "Network issues",
    status: "Pending",
    date: "2025-10-25",
    priority: "Medium",
    target: "warden",
    source: "warden",
  },
]

export default function ParentDashboard() {
  const filteredComplaints = studentComplaints.filter((c) => c.target === "parent" || c.source === "warden")
  const pendingComplaints = filteredComplaints.filter((c) => c.status === "Pending").length
  const resolvedComplaints = filteredComplaints.filter((c) => c.status === "Resolved").length
  const inProgressComplaints = filteredComplaints.filter((c) => c.status === "In Progress").length

  return (
    <DashboardLayout menuItems={menuItems} role="Parent" userName="Parent">
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome, Parent</h2>
          <p className="text-muted-foreground mt-1">Monitor your child's hostel complaints and status updates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={<AlertCircle size={24} />}
            title="Pending Complaints"
            value={pendingComplaints}
            subtitle="Awaiting action"
          />
          <StatCard
            icon={<Clock size={24} />}
            title="In Progress"
            value={inProgressComplaints}
            subtitle="Being resolved"
          />
          <StatCard
            icon={<CheckCircle size={24} />}
            title="Resolved"
            value={resolvedComplaints}
            subtitle="Completed"
            trend={{ value: 2, isPositive: true }}
          />
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Complaints</h3>
          <div className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className="flex items-start justify-between pb-4 border-b border-border last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{complaint.complaint}</p>
                  <p className="text-sm text-muted-foreground mt-1">{complaint.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      complaint.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : complaint.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {complaint.status}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      complaint.priority === "High" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {complaint.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/parent/complaints"
            className="w-full mt-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition font-medium block text-center"
          >
            View All Complaints
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
