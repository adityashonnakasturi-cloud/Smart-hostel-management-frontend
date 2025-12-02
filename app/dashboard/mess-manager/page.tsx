"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import StatCard from "@/components/dashboard/stat-card"
import { Utensils, TrendingUp, Package } from 'lucide-react'
import ProtectedRoute from "@/components/auth/protected-route";

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/mess-manager" },
  { icon: <span>➕</span>, label: "Add Surplus Food", href: "/dashboard/mess-manager/add-surplus" },
  { icon: <span>📦</span>, label: "Manage Distribution", href: "/dashboard/mess-manager/manage" },
  { icon: <span>👥</span>, label: "View NGOs", href: "/dashboard/mess-manager/ngos" },
  { icon: <span>📈</span>, label: "Reports", href: "/dashboard/mess-manager/reports" },
]

export default function MessManagerDashboard() {
  const [surplus] = useState([
    { id: "1", item: "Rice", quantity: "5kg", expiry: "2025-11-03", status: "Available", requests: 3 },
    { id: "2", item: "Dal", quantity: "2kg", expiry: "2025-11-02", status: "Available", requests: 2 },
    { id: "3", item: "Vegetables", quantity: "10kg", expiry: "2025-11-04", status: "Distributed", requests: 1 },
  ])

  const [ngos] = useState([
    { id: "1", name: "Food for All", contact: "9876543210", email: "contact@foodforall.org", status: "Active" },
    { id: "2", name: "Community Kitchen", contact: "9876543211", email: "info@communitykitchen.org", status: "Active" },
  ])

  return (
    <ProtectedRoute allowedRoles={["messManager"]}>
    <DashboardLayout menuItems={menuItems} role="Mess Manager" userName="Manager">
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome, Mess Manager</h2>
          <p className="text-muted-foreground mt-1">Manage food surplus and coordinate with NGOs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={<Package size={24} />}
            title="Surplus Items"
            value="12"
            subtitle="Items available"
            trend={{ value: 25, isPositive: true }}
          />
          <StatCard
            icon={<TrendingUp size={24} />}
            title="Total Distributed"
            value="45kg"
            subtitle="This month"
            trend={{ value: 18, isPositive: true }}
          />
          <StatCard icon={<Utensils size={24} />} title="NGO Requests" value="8" subtitle="Pending requests" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Surplus */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Food Surplus</h3>
            <div className="space-y-3">
              {surplus.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.item}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} • Expires: {item.expiry}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium block mb-1 ${
                        item.status === "Available" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.requests} requests</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition font-medium">
              View All
            </button>
          </div>

          {/* NGO Partners */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">NGO Partners</h3>
            <div className="space-y-3">
              {ngos.map((ngo) => (
                <div
                  key={ngo.id}
                  className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{ngo.name}</p>
                    <p className="text-sm text-muted-foreground">{ngo.email}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {ngo.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition font-medium">
              View All NGOs
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-6 cursor-pointer hover:shadow-lg transition">
            <div className="text-3xl mb-3">➕</div>
            <h3 className="font-semibold text-foreground mb-1">Add Surplus Food</h3>
            <p className="text-sm text-muted-foreground">Log new surplus items</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-6 cursor-pointer hover:shadow-lg transition">
            <div className="text-3xl mb-3">📦</div>
            <h3 className="font-semibold text-foreground mb-1">Manage Distribution</h3>
            <p className="text-sm text-muted-foreground">Track and update distributions</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-6 cursor-pointer hover:shadow-lg transition">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-semibold text-foreground mb-1">View Reports</h3>
            <p className="text-sm text-muted-foreground">Analytics and insights</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  )
}
