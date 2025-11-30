"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import DataTable from "@/components/dashboard/data-table"
import { ArrowLeft, X } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/staff" },
  
  { icon: "⚠️", label: "View Complaints", href: "/dashboard/staff/complaints" },
  { icon: "📋", label: "History", href: "/dashboard/staff/history" },
]

const complaintData = [
  {
    id: "1",
    room: "Room 101",
    complaint: "Water leakage",
    student: "John Doe",
    priority: "High",
    status: "Pending",
    date: "2025-11-01",
    description: "Severe water leakage from ceiling affecting room amenities",
    hostel: "shalmala",
  },
  {
    id: "2",
    room: "Room 105",
    complaint: "Fan not working",
    student: "Jane Smith",
    priority: "Medium",
    status: "In Progress",
    date: "2025-10-28",
    description: "Ceiling fan is not functioning properly",
    hostel: "abc",
  },
  {
    id: "3",
    room: "Common Area",
    complaint: "Light broken",
    student: "Admin",
    priority: "Medium",
    status: "Completed",
    date: "2025-10-20",
    description: "Broken light fixtures in common area",
    hostel: "xyz",
  },
]

export default function ComplaintsPage() {
  const [selectedComplaint, setSelectedComplaint] = useState<(typeof complaintData)[0] | null>(null)
  const [newStatus, setNewStatus] = useState("Pending")
  const [filterHostel, setFilterHostel] = useState("All")

  const handleStatusChange = () => {
    if (selectedComplaint) {
      setSelectedComplaint({ ...selectedComplaint, status: newStatus })
    }
  }

  const filteredComplaints = complaintData.filter(
    (complaint) => filterHostel === "All" || complaint.hostel === filterHostel,
  )

  return (
    <DashboardLayout menuItems={menuItems} role="Staff" userName="Maintenance Staff">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/staff" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">View Complaints</h2>
            <p className="text-muted-foreground mt-1">Track all facility complaints</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm text-muted-foreground">Filter by Hostel</label>
          <select
            value={filterHostel}
            onChange={(e) => setFilterHostel(e.target.value)}
            className="w-full mt-2 p-2 border border-border rounded bg-background text-foreground"
          >
            <option>All</option>
            <option>shalmala</option>
            <option>abc</option>
            <option>xyz</option>
          </select>
        </div>

        <DataTable
          columns={[
            { key: "room", label: "Location", sortable: true },
            { key: "complaint", label: "Complaint", sortable: false },
            { key: "student", label: "Reported By", sortable: true },
           
            { key: "status", label: "Status", sortable: true },
          ]}
          data={filteredComplaints}
          actions={(row) => (
            <button
              onClick={() => {
                setSelectedComplaint(row as (typeof complaintData)[0])
                setNewStatus((row as (typeof complaintData)[0]).status)
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition"
            >
              View Details
            </button>
          )}
        />

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
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.room}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Complaint</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.complaint}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reported By</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.student}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.priority}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.date}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Update Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full mt-2 p-2 border border-border rounded bg-background text-foreground"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleStatusChange}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
                >
                  Update Status
                </button>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="flex-1 py-2 border border-border rounded-lg hover:bg-muted transition font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
