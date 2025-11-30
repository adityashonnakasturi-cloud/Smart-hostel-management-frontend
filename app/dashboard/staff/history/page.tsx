"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import DataTable from "@/components/dashboard/data-table"
import { ArrowLeft, X } from 'lucide-react'
import Link from "next/link"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/staff" },
  
  { icon: "⚠️", label: "View Complaints", href: "/dashboard/staff/complaints" },
  { icon: "📋", label: "History", href: "/dashboard/staff/history" },
]

const historyData = [
  {
    id: "1",
    location: "Room 101",
    work: "Water leakage repair",
    completedDate: "2025-10-15",
    status: "Completed",
    duration: "2 hours",
    notes: "Fixed pipe connection and sealed ceiling",
  },
  {
    id: "2",
    location: "Room 105",
    work: "Fan replacement",
    completedDate: "2025-10-10",
    status: "Completed",
    duration: "1 hour",
    notes: "Replaced with new ceiling fan model",
  },
  {
    id: "3",
    location: "Common Area",
    work: "Light fixture installation",
    completedDate: "2025-10-05",
    status: "Completed",
    duration: "3 hours",
    notes: "Installed new LED lighting system",
  },
]

export default function HistoryPage() {
  const [selectedHistory, setSelectedHistory] = useState<(typeof historyData)[0] | null>(null)
  const [editStatus, setEditStatus] = useState("")

  return (
    <DashboardLayout menuItems={menuItems} role="Staff" userName="Maintenance Staff">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/staff" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Work History</h2>
            <p className="text-muted-foreground mt-1">View completed maintenance work</p>
          </div>
        </div>

        <DataTable
          columns={[
            { key: "location", label: "Location", sortable: true },
            { key: "work", label: "Work Done", sortable: false },
            { key: "completedDate", label: "Completed Date", sortable: true },
            
            { key: "status", label: "Status", sortable: true },
          ]}
          data={historyData}
          
        />

        {selectedHistory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Work Details</h3>
                <button
                  onClick={() => setSelectedHistory(null)}
                  className="p-1 hover:bg-muted rounded transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">{selectedHistory.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Work Done</p>
                  <p className="font-semibold text-foreground">{selectedHistory.work}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p className="font-semibold text-foreground">{selectedHistory.notes}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed Date</p>
                  <p className="font-semibold text-foreground">{selectedHistory.completedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold text-foreground">{selectedHistory.duration}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Update Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full mt-2 p-2 border border-border rounded bg-background text-foreground"
                  >
                    <option>Completed</option>
                    <option>Pending Review</option>
                    <option>Verified</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedHistory({ ...selectedHistory, status: editStatus })
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setSelectedHistory(null)}
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
