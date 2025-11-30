"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import StatCard from "@/components/dashboard/stat-card"
import { Wrench, AlertCircle, CheckCircle } from 'lucide-react'

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/staff" },

  { icon: <span>⚠️</span>, label: "View Complaints", href: "/dashboard/staff/complaints" },
  { icon: <span>📋</span>, label: "History", href: "/dashboard/staff/history" },
]

export default function StaffDashboard() {
  const [tasks] = useState([
    {
      id: "1",
      location: "Room 101",
      issue: "Water leakage in bathroom",
      status: "Pending",
      priority: "High",
      date: "2025-11-01",
    },
    {
      id: "2",
      location: "Room 105",
      issue: "Fan not working",
      status: "In Progress",
      priority: "Medium",
      date: "2025-10-28",
    },
    {
      id: "3",
      location: "Common Area",
      issue: "Light fixture broken",
      status: "Completed",
      priority: "Medium",
      date: "2025-10-20",
    },
  ])

  return (
    <DashboardLayout menuItems={menuItems} role="Staff" userName="Maintenance Staff">
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome, Maintenance Staff</h2>
          <p className="text-muted-foreground mt-1">Manage hostel facility maintenance and repairs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={<AlertCircle size={24} />}
            title="Pending Tasks"
            value={tasks.filter((t) => t.status === "Pending").length}
            subtitle="Awaiting action"
          />
          <StatCard
            icon={<Wrench size={24} />}
            title="In Progress"
            value={tasks.filter((t) => t.status === "In Progress").length}
            subtitle="Currently working on"
          />
          <StatCard
            icon={<CheckCircle size={24} />}
            title="Completed"
            value={tasks.filter((t) => t.status === "Completed").length}
            subtitle="This month"
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Active Tasks</h3>
          <div className="space-y-3">
            {tasks
              .filter((t) => t.status !== "Completed")
              .map((task) => (
                <div
                  key={task.id}
                  className="flex items-start justify-between pb-4 border-b border-border last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{task.location}</p>
                    <p className="text-sm text-muted-foreground">{task.issue}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium block mb-2 ${
                        task.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {task.status}
                    </span>
                    <span
                      className={`text-xs font-medium ${task.priority === "High" ? "text-red-600" : "text-orange-600"}`}
                    >
                      {task.priority} Priority
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <button className="w-full mt-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition font-medium">
            View All Tasks
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
