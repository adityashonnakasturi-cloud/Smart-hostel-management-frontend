"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import DataTable from "@/components/dashboard/data-table"
import { ArrowLeft, X } from "lucide-react"
import Link from "next/link"
import CloseComplaintModal from "@/components/auth/close-complaint-modal"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/warden" },
  { icon: "👥", label: "Student List", href: "/dashboard/warden/students" },
  { icon: "🏠", label: "Room Management", href: "/dashboard/warden/rooms" },
  { icon: "📋", label: "View Complaints", href: "/dashboard/warden/complaints" },
]

const complaintData = [
  {
    id: "1",
    student: "John Doe",
    category: "Room Issue",
    description: "Water leakage",
    status: "Open",
    priority: "High",
    date: "2025-11-01",
  },
  {
    id: "2",
    student: "Jane Smith",
    category: "Maintenance",
    description: "Fan not working",
    status: "Assigned",
    priority: "Medium",
    date: "2025-10-28",
  },
  {
    id: "3",
    student: "Bob Wilson",
    category: "Noise",
    description: "Loud music",
    status: "Resolved",
    priority: "Low",
    date: "2025-10-20",
  },
  {
    id: "4",
    student: "Alice Brown",
    category: "Safety",
    description: "Emergency light broken",
    status: "Open",
    priority: "Critical",
    date: "2025-11-02",
  },
]

export default function ComplaintsPage() {
  const [selectedComplaint, setSelectedComplaint] = useState<(typeof complaintData)[0] | null>(null)
  const [updatedStatus, setUpdatedStatus] = useState<string>("")
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false)

  const handleStatusUpdate = (complaintId: string, newStatus: string) => {
    console.log("[v0] Complaint", complaintId, "status updated to", newStatus)
    setSelectedComplaint(null)
  }

  const handleCloseComplaint = async (reason: string) => {
    if (!selectedComplaint) return

    try {
      const response = await fetch("/complaints/close", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          complaint_id: selectedComplaint.id,
          closed_by: "current_user_id",
          reason,
        }),
      })

      if (response.ok) {
        console.log("[v0] Complaint closed:", selectedComplaint.id)
      } else {
        throw new Error("Failed to close complaint")
      }
    } catch (err) {
      console.warn("[v0] Backend endpoint missing: /complaints/close")
    }

    setIsCloseModalOpen(false)
    setSelectedComplaint(null)
  }

  return (
    <DashboardLayout menuItems={menuItems} role="Warden" userName="Mr. Warden">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/warden" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">View Complaints</h2>
            <p className="text-muted-foreground mt-1">Track all complaints raised</p>
          </div>
        </div>

        <DataTable
          columns={[
            { key: "student", label: "Student", sortable: true },
            { key: "category", label: "Category", sortable: true },
            { key: "description", label: "Description", sortable: false },
           
          ]}
          data={complaintData}
          actions={(row) => (
            <button
              onClick={() => setSelectedComplaint(row as (typeof complaintData)[0])}
              className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition"
            >
              Update
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
                  <p className="text-sm text-muted-foreground">Student</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.student}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.status}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsCloseModalOpen(true)}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                  data-testid="close-complaint-btn"
                >
                  Close
                </button>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="flex-1 py-2 border border-border rounded-lg hover:bg-muted transition font-medium"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        <CloseComplaintModal
          complaintId={selectedComplaint?.id || ""}
          isOpen={isCloseModalOpen}
          onClose={() => setIsCloseModalOpen(false)}
          onConfirm={handleCloseComplaint}
        />
      </div>
    </DashboardLayout>
  )
}
