"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import RoomGrid from "@/components/dashboard/room-grid"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/chief-warden" },
  { icon: <span>➕</span>, label: "Add Student", href: "/dashboard/chief-warden/add-student" },
  { icon: <span>👥</span>, label: "Manage Wardens", href: "/dashboard/chief-warden/manage-wardens" },
  { icon: <span>⚠️</span>, label: "View Complaints", href: "/dashboard/chief-warden/complaints" },
  { icon: <span>📈</span>, label: "Reports", href: "/dashboard/chief-warden/reports" },
]

export default function ChiefWardenRoomsPage() {
  return (
    <DashboardLayout menuItems={menuItems} role="Chief Warden" userName="Chief Warden">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/chief-warden" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Room Allotment Management</h2>
            <p className="text-muted-foreground mt-1">Allocate and manage student room assignments</p>
          </div>
        </div>

        <RoomGrid isEditable={true} gridSize={6} roomType="3-sharing" />
      </div>
    </DashboardLayout>
  )
}
