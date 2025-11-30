"use client"

import { useState } from "react"
import Link from "next/link"
import DashboardLayout from "@/components/layout/dashboard-layout"
import StatCard from "@/components/dashboard/stat-card"
import { Package, CheckCircle, Clock } from 'lucide-react'
import ProtectedRoute from "@/components/auth/protected-route";

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/ngo" },
  { icon: <span>🍽️</span>, label: "Available Food", href: "/dashboard/ngo/food" },

  { icon: <span>📦</span>, label: "Pickups", href: "/dashboard/ngo/pickups" },
  { icon: <span>📈</span>, label: "Reports", href: "/dashboard/ngo/reports" },
]

export default function NGODashboard() {
  const [foodItems] = useState([
    { id: "1", item: "Rice", quantity: "5kg", available: true, expiryDate: "2025-11-03" },
    { id: "2", item: "Dal", quantity: "2kg", available: true, expiryDate: "2025-11-02" },
    { id: "3", item: "Vegetables", quantity: "10kg", available: false, expiryDate: "2025-11-04" },
  ])

  const [requests] = useState([
    { id: "1", item: "Rice", quantity: "5kg", status: "Approved", date: "2025-11-01" },
    { id: "2", item: "Dal", quantity: "2kg", status: "Pending", date: "2025-10-28" },
  ])

  return (
    <ProtectedRoute allowedRoles={["ngo"]}>
      <DashboardLayout menuItems={menuItems} role="NGO" userName="NGO Representative">
        <div className="p-6 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Welcome, Food for All</h2>
            <p className="text-muted-foreground mt-1">Browse available surplus food and manage requests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              icon={<Package size={24} />}
              title="Available Items"
              value={foodItems.filter((f) => f.available).length}
              subtitle="Ready for pickup"
            />
            <StatCard
              icon={<Clock size={24} />}
              title="Pending Requests"
              value={requests.filter((r) => r.status === "Pending").length}
              subtitle="Awaiting approval"
            />
            <StatCard
              icon={<CheckCircle size={24} />}
              title="Total Pickups"
              value="24"
              subtitle="This month"
              trend={{ value: 12, isPositive: true }}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Available Food */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Available Surplus Food</h3>
              <div className="space-y-3">
                {foodItems
                  .filter((f) => f.available)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.item}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity} • Expires: {item.expiryDate}
                        </p>
                      </div>
                      <Link
                        href="/dashboard/ngo/food"
                        className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition"
                      >
                        Request
                      </Link>
                    </div>
                  ))}
              </div>
              <Link
                href="/dashboard/ngo/food"
                className="w-full mt-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition font-medium block text-center"
              >
                View All Items
              </Link>
            </div>

            {/* Request Status */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Requests</h3>
              <div className="space-y-3">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{req.item}</p>
                      <p className="text-sm text-muted-foreground">
                        {req.quantity} • {req.date}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${req.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/dashboard/ngo/requests"
                className="w-full mt-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition font-medium block text-center"
              >
                View All Requests
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/dashboard/ngo/food"
              className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-3">🍽️</div>
              <h3 className="font-semibold text-foreground mb-1">Browse Food</h3>
              <p className="text-sm text-muted-foreground">View all available surplus items</p>
            </Link>
            <Link
              href="/dashboard/ngo/requests"
              className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-semibold text-foreground mb-1">My Requests</h3>
              <p className="text-sm text-muted-foreground">Track your pickup requests</p>
            </Link>
            <Link
              href="/dashboard/ngo/pickups"
              className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-3">📞</div>
              <h3 className="font-semibold text-foreground mb-1">My Pickups</h3>
              <p className="text-sm text-muted-foreground">View scheduled pickups</p>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
