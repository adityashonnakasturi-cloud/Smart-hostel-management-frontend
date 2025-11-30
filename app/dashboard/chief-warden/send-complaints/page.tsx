"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { ArrowLeft, X } from 'lucide-react'
import Link from "next/link"

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/chief-warden" },
  { icon: <span>➕</span>, label: "Add Student", href: "/dashboard/chief-warden/add-student" },
  { icon: <span>👥</span>, label: "Manage Wardens", href: "/dashboard/chief-warden/manage-wardens" },
  { icon: <span>⚠️</span>, label: "View Complaints", href: "/dashboard/chief-warden/complaints" },
  { icon: <span>📤</span>, label: "Send to Parents", href: "/dashboard/chief-warden/send-complaints" },
  { icon: <span>📈</span>, label: "Reports", href: "/dashboard/chief-warden/reports" },
]

const studentComplaints = [
  { id: "1", name: "John Doe", usn: "USN001", email: "john@parent.com", complaint: "Water leakage in room", date: "2025-11-01" },
  { id: "2", name: "Jane Smith", usn: "USN002", email: "jane@parent.com", complaint: "Fan not working", date: "2025-10-28" },
  { id: "3", name: "Bob Wilson", usn: "USN003", email: "bob@parent.com", complaint: "Network issue", date: "2025-10-25" },
]

export default function SendComplaintsPage() {
  const [selectedComplaint, setSelectedComplaint] = useState<(typeof studentComplaints)[0] | null>(null)
  const [sent, setSent] = useState<string[]>([])

  const handleSendToParent = () => {
    if (selectedComplaint && !sent.includes(selectedComplaint.id)) {
      setSent([...sent, selectedComplaint.id])
      setSelectedComplaint(null)
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
            <h2 className="text-3xl font-bold text-foreground">Send Complaints to Parents</h2>
            <p className="text-muted-foreground mt-1">Notify parents of student complaints</p>
          </div>
        </div>

        <div className="grid gap-4">
          {studentComplaints.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.usn} • {item.complaint}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
              </div>
              <button
                onClick={() => setSelectedComplaint(item)}
                disabled={sent.includes(item.id)}
                className={`px-4 py-2 rounded text-sm font-medium transition ${
                  sent.includes(item.id)
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {sent.includes(item.id) ? "Sent" : "Send to Parent"}
              </button>
            </div>
          ))}
        </div>

        {selectedComplaint && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Send Complaint</h3>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="p-1 hover:bg-muted rounded transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Student USN</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.usn}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Parent Email</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Complaint</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.complaint}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold text-foreground">{selectedComplaint.date}</p>
                </div>
              </div>

              <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded mb-6">
                A notification email will be sent to the parent with complaint details.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleSendToParent}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
                >
                  Send Now
                </button>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="flex-1 py-2 border border-border rounded-lg hover:bg-muted transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
