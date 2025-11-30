"use client"

import type React from "react"

import Sidebar from "./sidebar"
import Topbar from "./topbar"

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
  menuItems: MenuItem[]
  role: string
  userName?: string
}

export default function DashboardLayout({ children, menuItems, role, userName = "User" }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar items={menuItems} role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar userName={userName} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
