"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import StatCard from "@/components/dashboard/stat-card"
import { UserCheck, AlertCircle, Home } from "lucide-react"
import RoomGrid from "@/components/dashboard/room-grid"

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/chief-warden" },
  { icon: <span>➕</span>, label: "Add Student", href: "/dashboard/chief-warden/add-student" },
  { icon: <span>👥</span>, label: "Manage Wardens", href: "/dashboard/chief-warden/manage-wardens" },
  { icon: <span>⚠️</span>, label: "View Complaints", href: "/dashboard/chief-warden/complaints" },
  { icon: <span>📈</span>, label: "Reports", href: "/dashboard/chief-warden/reports" },
]

export default function ChiefWardenDashboard() {
  const router = useRouter()
  const [students] = useState([
    { id: "1", name: "John Doe", usn: "USN001", room: "101", status: "Active" },
    { id: "2", name: "Jane Smith", usn: "USN002", room: "102", status: "Active" },
    { id: "3", name: "Bob Wilson", usn: "USN003", room: "103", status: "Inactive" },
  ])

  const [complaints] = useState([
    { id: "1", student: "John Doe", category: "Room Issue", status: "Pending", date: "2025-11-01" },
    { id: "2", student: "Jane Smith", category: "Maintenance", status: "In Progress", date: "2025-10-28" },
  ])

  const [hostelFilter, setHostelFilter] = useState("All")
  const handleManageRooms = () => {
    router.push("/dashboard/chief-warden/rooms")
  }

  const handleResetData = () => {
    // Logic to reset data
  }

  return (
    <DashboardLayout menuItems={menuItems} role="Chief Warden" userName="Dr. Admin">
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome, Chief Warden</h2>
          <p className="text-muted-foreground mt-1">Manage your hostel operations and monitor all activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<span>👥</span>}
            title="Total Students"
            value="256"
            subtitle="Active residents"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            icon={<UserCheck size={24} />}
            title="Total Wardens"
            value="8"
            subtitle="All hostel blocks"
            trend={{ value: 0, isPositive: true }}
          />
          
          <StatCard
            icon={<Home size={24} />}
            title="Room Occupancy"
            value="92%"
            subtitle="Rooms filled"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Students */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Students</h3>
            <div className="space-y-3">
              {students.slice(0, 3).map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.usn} • Room {student.room}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition font-medium">
              View All Students
            </button>
          </div>

          
        </div>

        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Hostel Room Allocation</h3>
            <p className="text-muted-foreground">Theater-style room layout with Left Wing and Right Wing</p>
          </div>

          <div className="space-y-6">
            {/* Hostel Filter */}
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-foreground">Filter by Hostel:</label>
              <select
                value={hostelFilter}
                onChange={(e) => setHostelFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg text-sm text-foreground"
              >
                <option value="All">Shalmala</option>
                <option value="Left Wing">abc</option>
                <option value="Right Wing">xyz</option>
              </select>
            </div>

            {/* Room Grid */}
            <RoomGrid filter={hostelFilter} />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 p-4 bg-muted rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500"></div>
              <span className="text-sm font-medium">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span className="text-sm font-medium">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-400"></div>
              <span className="text-sm font-medium">Maintenance</span>
            </div>
          </div>

          {/* View Full Grid Button */}
          <button
            onClick={handleManageRooms}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition"
          >
            Manage Rooms (Full Grid)
          </button>

          {/* Reset Data Button */}
          <button
            onClick={handleResetData}
            className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition"
          >
            Reset Data
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-6 cursor-pointer hover:shadow-lg transition">
            <div className="text-3xl mb-3">➕</div>
            <h3 className="font-semibold text-foreground mb-1">Add New Student</h3>
            <p className="text-sm text-muted-foreground">Register new hostel residents</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-6 cursor-pointer hover:shadow-lg transition">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-semibold text-foreground mb-1">Manage Wardens</h3>
            <p className="text-sm text-muted-foreground">Assign or update warden duties</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-6 cursor-pointer hover:shadow-lg transition">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-semibold text-foreground mb-1">View Reports</h3>
            <p className="text-sm text-muted-foreground">Analyze hostel analytics</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
