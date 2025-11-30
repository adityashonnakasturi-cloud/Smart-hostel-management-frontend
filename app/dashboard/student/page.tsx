"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import StatCard from "@/components/dashboard/stat-card"
import { Home, Utensils, AlertCircle, FileText } from 'lucide-react'

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/student" },
  { icon: <span>🏠</span>, label: "Room Details", href: "/dashboard/student/room" },
  { icon: <span>⚠️</span>, label: "Submit Complaint", href: "/dashboard/student/complaint" },
  { icon: <span>📋</span>, label: "Complaint Status", href: "/dashboard/student/complaints" },
]

export default function StudentDashboard() {
  const [foodSurplus] = useState([
    {
      id: "1",
      item: "Rice",
      quantity: "5kg",
      source: "Mess Hall",
      expiry: "2025-11-03",
      pickup: "10:00 AM",
      available: true,
    },
    {
      id: "2",
      item: "Dal",
      quantity: "2kg",
      source: "Mess Hall",
      expiry: "2025-11-02",
      pickup: "2:00 PM",
      available: true,
    },
    {
      id: "3",
      item: "Vegetables",
      quantity: "10kg",
      source: "Dining Hall",
      expiry: "2025-11-04",
      pickup: "8:00 AM",
      available: false,
    },
  ])

  return (
    <DashboardLayout menuItems={menuItems} role="Student" userName="John Doe">
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome, John Doe</h2>
          <p className="text-muted-foreground mt-1">Manage your hostel account</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Home size={24} />} title="Room Number" value="101" subtitle="Block A • 2nd Floor" />
          <StatCard
            icon={<FileText size={24} />}
            title="Total Complaints"
            value="2"
            subtitle="1 resolved"
            trend={{ value: 50, isPositive: true }}
          />
          <StatCard icon={<AlertCircle size={24} />} title="Pending Issues" value="1" subtitle="Awaiting response" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">USN</span>
                <span className="font-medium text-foreground">USN001</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium text-foreground">john@college.edu</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium text-foreground">+91 9876543210</span>
              </div>
              
            </div>
            
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Room Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Room Number</span>
                <span className="font-medium text-foreground">101</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Block</span>
                <span className="font-medium text-foreground">A</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Floor</span>
                <span className="font-medium text-foreground">2nd</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Capacity</span>
                <span className="font-medium text-foreground">2 students</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Roommate</span>
                <span className="font-medium text-foreground">Mike Lee</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition font-medium">
              Room Details
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
