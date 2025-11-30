"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import DataTable from "@/components/dashboard/data-table"
import { ArrowLeft, X } from 'lucide-react'
import Link from "next/link"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/warden" },
  { icon: "👥", label: "Student List", href: "/dashboard/warden/students" },
  { icon: "🏠", label: "Room Management", href: "/dashboard/warden/rooms" },
  { icon: "📋", label: "View Complaints", href: "/dashboard/warden/complaints" },
]

const studentData = [
  {
    id: "1",
    name: "John Doe",
    usn: "USN001",
    email: "john@college.edu",
    phone: "9876543210",
    room: "101",
    year: "2nd",
    branch: "CSE",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    usn: "USN002",
    email: "jane@college.edu",
    phone: "9876543211",
    room: "102",
    year: "1st",
    branch: "ECE",
    status: "Active",
  },
  {
    id: "3",
    name: "Bob Wilson",
    usn: "USN003",
    email: "bob@college.edu",
    phone: "9876543212",
    room: "103",
    year: "3rd",
    branch: "CSE",
    status: "Active",
  },
  {
    id: "4",
    name: "Alice Brown",
    usn: "USN004",
    email: "alice@college.edu",
    phone: "9876543213",
    room: "104",
    year: "2nd",
    branch: "ME",
    status: "On Leave",
  },
  {
    id: "5",
    name: "Charlie Davis",
    usn: "USN005",
    email: "charlie@college.edu",
    phone: "9876543214",
    room: "105",
    year: "1st",
    branch: "CE",
    status: "Active",
  },
]

export default function StudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState<(typeof studentData)[0] | null>(null)

  return (
    <DashboardLayout menuItems={menuItems} role="Warden" userName="Mr. Warden">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/warden" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Student List</h2>
            <p className="text-muted-foreground mt-1">Manage all students under your care</p>
          </div>
        </div>

        <DataTable
          columns={[
            { key: "name", label: "Name", sortable: true },
            { key: "usn", label: "USN", sortable: true },
            { key: "room", label: "Room", sortable: true },
            
          ]}
          data={studentData}
          actions={(row) => (
            <button
              onClick={() => setSelectedStudent(row as (typeof studentData)[0])}
              className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition"
            >
              Details
            </button>
          )}
        />

        {selectedStudent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Student Details</h3>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-1 hover:bg-muted rounded transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">{selectedStudent.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">USN</p>
                  <p className="font-semibold text-foreground">{selectedStudent.usn}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-semibold text-foreground">{selectedStudent.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Room</p>
                  <p className="font-semibold text-foreground">{selectedStudent.room}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-semibold text-foreground">{selectedStudent.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Branch</p>
                  <p className="font-semibold text-foreground">{selectedStudent.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold text-foreground">{selectedStudent.status}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="w-full mt-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
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
