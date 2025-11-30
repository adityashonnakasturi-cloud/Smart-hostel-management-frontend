"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import DataTable from "@/components/dashboard/data-table"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/chief-warden" },
  { icon: <span>➕</span>, label: "Add Student", href: "/dashboard/chief-warden/add-student" },
  { icon: <span>👥</span>, label: "Manage Wardens", href: "/dashboard/chief-warden/manage-wardens" },
  { icon: <span>⚠️</span>, label: "View Complaints", href: "/dashboard/chief-warden/complaints" },
  { icon: <span>📈</span>, label: "Reports", href: "/dashboard/chief-warden/reports" },
]

const complaintData = [
  {
    id: "1",
    student: "John Doe",
    category: "Room Issue",
    description: "Water leakage in room",
    status: "Pending",
  },
  {
    id: "2",
    student: "Jane Smith",
    category: "Maintenance",
    description: "Fan not working",
    status: "In Progress",
  },
  {
    id: "3",
    student: "Bob Wilson",
    category: "Noise Complaint",
    description: "Loud music at night",
    status: "Resolved",
  },
  {
    id: "4",
    student: "Alice Brown",
    category: "Amenity Issue",
    description: "Bathroom plumbing problem",
    status: "Pending",
  },
  {
    id: "5",
    student: "Charlie Davis",
    category: "Safety",
    description: "Emergency light not functioning",
    status: "In Progress",
  },
]

export default function ComplaintsPage() {
  const [selectedComplaint, setSelectedComplaint] = useState<(typeof complaintData)[0] | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} role="Chief Warden" userName="Dr. Admin">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/chief-warden" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">All Complaints</h2>
            <p className="text-muted-foreground mt-1">View and manage student complaints</p>
          </div>
        </div>

        {selectedComplaint && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{selectedComplaint.category}</h3>
                  <p className="text-muted-foreground mt-1">Student: {selectedComplaint.student}</p>
                </div>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="text-muted-foreground hover:text-foreground text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Description</p>
                  <p className="text-foreground mt-1">{selectedComplaint.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Status</p>
                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedComplaint.status)}`}
                    >
                      {selectedComplaint.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-border">
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition font-medium">
                  Resolve
                </button>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="flex-1 px-4 py-2 bg-muted text-foreground rounded hover:bg-muted/80 transition font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <DataTable
          columns={[
            { key: "student", label: "Student", sortable: true },
            { key: "category", label: "Category", sortable: true },
            { key: "description", label: "Description", sortable: false },
            { key: "status", label: "Status", sortable: true },
          ]}
          data={complaintData}
          
        />
      </div>
    </DashboardLayout>
  )
}
