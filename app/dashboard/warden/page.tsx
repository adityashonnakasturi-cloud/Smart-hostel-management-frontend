"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import StatCard from "@/components/dashboard/stat-card"
import { Users, AlertCircle, DoorOpen } from "lucide-react"
import AddStaffModal from "@/components/auth/add-staff-modal"
import CloseComplaintModal from "@/components/auth/close-complaint-modal"
import ProtectedRoute from "@/components/auth/protected-route"

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/warden" },
  { icon: <span>👥</span>, label: "Student List", href: "/dashboard/warden/students" },
  { icon: <span>🏠</span>, label: "Room Management", href: "/dashboard/warden/rooms" },
  { icon: <span>📋</span>, label: "View Complaints", href: "/dashboard/warden/complaints" },
]

export default function WardenDashboard() {
  const [students] = useState([
    { id: "1", name: "John Doe", usn: "USN001", room: "101", year: "2nd", status: "Active" },
    { id: "2", name: "Jane Smith", usn: "USN002", room: "102", year: "1st", status: "Active" },
    { id: "3", name: "Bob Wilson", usn: "USN003", room: "103", year: "3rd", status: "Active" },
  ])

  const [complaints] = useState([
    { id: "1", student: "John Doe", complaint: "Room maintenance needed", status: "Open", date: "2025-11-01" },
    { id: "2", student: "Jane Smith", complaint: "Fan not working", status: "Assigned", date: "2025-10-28" },
  ])

  const router = useRouter()

  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)
  const [isViewComplaintsOpen, setIsViewComplaintsOpen] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState<{
    id: string
    student: string
    complaint: string
    status: string
    date: string
  } | null>(null)

  const handleCloseComplaint = async (reason: string) => {
    try {
      const response = await fetch("/complaints/close", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complaint_id: selectedComplaint?.id, closed_by: "current_user_id", reason }),
      })

      if (response.ok) {
        console.log("[v0] Complaint closed:", selectedComplaint?.id)
      } else {
        throw new Error("Failed to close complaint")
      }
    } catch (err) {
      console.warn("[v0] Backend endpoint missing: /complaints/close")
    }
  }

  return (
    <ProtectedRoute allowedRoles={["warden"]}>
    <DashboardLayout menuItems={menuItems} role="Warden" userName="Mr. Warden">
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome, Warden</h2>
          <p className="text-muted-foreground mt-1">Manage your assigned block and students</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={<Users size={24} />}
            title="Students Under Care"
            value="64"
            subtitle="Block A residents"
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            icon={<DoorOpen size={24} />}
            title="Assigned Rooms"
            value="32"
            subtitle="Rooms managed"
            trend={{ value: 0, isPositive: true }}
          />
          <StatCard
            icon={<AlertCircle size={24} />}
            title="Active Complaints"
            value="8"
            subtitle="Pending issues"
            trend={{ value: 2, isPositive: false }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Add Staff Panel */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Add Staff</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-foreground">Staff Name</p>
                  <p className="text-sm text-muted-foreground">Staff ID • Position</p>
                </div>
                <button className="text-primary hover:text-primary/80 transition text-sm font-medium">View</button>
              </div>
            </div>
            <button
              onClick={() => setIsAddStaffOpen(true)}
              className="w-full mt-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition font-medium"
              data-testid="add-staff-btn"
            >
              Add Staff Member
            </button>
          </div>

          {/* Non-Resolvable Complaints Summary */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Non-Resolvable Complaints</h3>
            <div className="space-y-3">
              {complaints
                .filter((complaint) => complaint.status === "Open")
                .map((complaint) => (
                  <div key={complaint.id} className="pb-3 border-b border-border last:border-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{complaint.student}</p>
                        <p className="text-sm text-muted-foreground">{complaint.complaint}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${complaint.status === "Open" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {complaint.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{complaint.date}</p>
                  </div>
                ))}
            </div>
            <button
              onClick={() => router.push("/dashboard/warden/complaints")}
              className="w-full mt-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition font-medium"
              data-testid="view-all-complaints-btn"
            >
              View All Non-Resolvable Complaints
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-6 cursor-pointer hover:shadow-lg transition">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-foreground mb-1">Manage Rooms</h3>
            <p className="text-sm text-muted-foreground">View room assignments and availability</p>
          </div>
        </div>
      </div>

      <AddStaffModal
        isOpen={isAddStaffOpen}
        onClose={() => setIsAddStaffOpen(false)}
        onSuccess={() => {
          // Show success toast - optional
        }}
      />
      <CloseComplaintModal
        isOpen={isViewComplaintsOpen}
        onClose={() => setIsViewComplaintsOpen(false)}
        complaintId={selectedComplaint?.id ?? ""}   // pass ID only
        onConfirm={handleCloseComplaint}
      />
    </DashboardLayout>
    </ProtectedRoute>
  )
}
