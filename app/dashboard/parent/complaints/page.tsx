"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import DataTable from "@/components/dashboard/data-table"
import { ArrowLeft, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/parent" },
  { icon: "⚠️", label: "View Complaints", href: "/dashboard/parent/complaints" },
]

const complaintData = [
  {
    id: "1",
    complaint: "Water leakage in room",
    status: "In Progress",
    date: "2025-11-01",
    priority: "High",
    description: "Severe water leakage from ceiling affecting room condition",
    staffAssigned: "Rajesh Kumar",
    target: "parent",
    source: "warden",
  },
  {
    id: "2",
    complaint: "Fan not working",
    status: "Resolved",
    date: "2025-10-28",
    priority: "Medium",
    description: "Ceiling fan was not functioning, now replaced",
    staffAssigned: "Amit Singh",
    target: "parent",
    source: "warden",
  },
  {
    id: "3",
    complaint: "Network issues",
    status: "Pending",
    date: "2025-10-25",
    priority: "Medium",
    description: "WiFi connectivity problem in room",
    staffAssigned: "Pending Assignment",
    target: "student",
    source: "student",
  },
]

export default function ComplaintsPage() {
  const [selectedComplaint, setSelectedComplaint] = useState<(typeof complaintData)[0] | null>(null)

  const filteredComplaints = complaintData.filter((c) => c.target === "parent" || c.source === "warden")

  return (
    <DashboardLayout menuItems={menuItems} role="Parent" userName="Parent">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/parent" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">My Child's Complaints</h2>
            <p className="text-muted-foreground mt-1">Monitor status of complaints notified by warden</p>
          </div>
        </div>

        {filteredComplaints.length === 0 && (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground text-lg">No complaints to display</p>
            <p className="text-sm text-muted-foreground mt-2">Parents only receive warden-notified complaints</p>
          </div>
        )}

        {filteredComplaints.length > 0 && (
          <DataTable
            columns={[
              { key: "complaint", label: "Complaint", sortable: true },
              { key: "status", label: "Status", sortable: true },
              { key: "priority", label: "Priority", sortable: true },
              { key: "date", label: "Date", sortable: true },
            ]}
            data={filteredComplaints}
            actions={(row) => (
              <button
                onClick={() => setSelectedComplaint(row as (typeof complaintData)[0])}
                className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition"
              >
                View Details
              </button>
            )}
          />
        )}

        {selectedComplaint && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Complaint Details</h3>
                <button onClick={() => setSelectedComplaint(null)} className="p-1 hover:bg-muted rounded transition">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Complaint</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.complaint}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.priority}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                      selectedComplaint.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedComplaint.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {selectedComplaint.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Staff Assigned</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.staffAssigned}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date Filed</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.date}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedComplaint(null)}
                className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
