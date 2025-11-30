"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { ArrowLeft, Users, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/student" },
  { icon: "👤", label: "Profile Overview", href: "/dashboard/student/profile" },
  { icon: "🏠", label: "Room Details", href: "/dashboard/student/room" },
  { icon: "⚠️", label: "Submit Complaint", href: "/dashboard/student/complaint" },
  { icon: "📋", label: "Complaint Status", href: "/dashboard/student/complaints" },
  { icon: "🍽️", label: "Food Surplus", href: "/dashboard/student/food-surplus" },
]

export default function RoomPage() {
  return (
    <DashboardLayout menuItems={menuItems} role="Student" userName="John Doe">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/student" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Room Details</h2>
            <p className="text-muted-foreground mt-1">View your room information</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Room Information</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1" size={20} />
                <div>
                  <p className="text-sm text-muted-foreground">Room Number</p>
                  <p className="font-semibold text-foreground text-lg">101</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1" size={20} />
                <div>
                  <p className="text-sm text-muted-foreground">Block & Floor</p>
                  <p className="font-semibold text-foreground">Block A • 2nd Floor</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="text-primary mt-1" size={20} />
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-semibold text-foreground">2 Students</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="text-primary mt-1" size={20} />
                <div>
                  <p className="text-sm text-muted-foreground">Allocated Date</p>
                  <p className="font-semibold text-foreground">2024-08-15</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Roommates</h3>

            <div className="flex items-center gap-4 pb-6 border-b border-border">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                ML
              </div>
              <div>
                <p className="font-semibold text-foreground">Mike Lee</p>
                <p className="text-sm text-muted-foreground">USN002</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pb-6 border-b border-border mt-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                V
              </div>
              <div>
                <p className="font-semibold text-foreground">Vacant</p>
              </div>
            </div>

            <button className="w-full mt-6 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition font-medium">
              Contact Roommate
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-3">Room Facilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛏️</span>
              <span className="text-sm text-foreground">Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🪟</span>
              <span className="text-sm text-foreground">Windows</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">💡</span>
              <span className="text-sm text-foreground">Lights</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🚪</span>
              <span className="text-sm text-foreground">Locker</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🛁</span>
              <span className="text-sm text-foreground">Bathroom</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">💨</span>
              <span className="text-sm text-foreground">Fan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🧹</span>
              <span className="text-sm text-foreground">Cleaning</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📶</span>
              <span className="text-sm text-foreground">WiFi</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
