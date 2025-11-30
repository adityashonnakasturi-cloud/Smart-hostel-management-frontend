"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import DataTable from "@/components/dashboard/data-table"
import { ArrowLeft, X } from 'lucide-react'
import Link from "next/link"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/mess-manager" },
  { icon: "➕", label: "Add Surplus Food", href: "/dashboard/mess-manager/add-surplus" },
  { icon: "📦", label: "Manage Distribution", href: "/dashboard/mess-manager/manage" },
  { icon: "👥", label: "View NGOs", href: "/dashboard/mess-manager/ngos" },
  { icon: "📈", label: "Reports", href: "/dashboard/mess-manager/reports" },
]

const distributionData = [
  {
    id: "1",
    item: "Rice",
    quantity: "5kg",
    ngo: "Food for All",
    status: "Distributed",
    date: "2025-11-01",
  },
  {
    id: "2",
    item: "Dal",
    quantity: "2kg",
    ngo: "Community Kitchen",
    status: "Distributed",
    date: "2025-11-02",
  },
  {
    id: "3",
    item: "Vegetables",
    quantity: "10kg",
    ngo: "Food for All",
    status: "",
    date: "2025-11-03",
  },
]

export default function ManageDistributionPage() {
  const [selectedDistribution, setSelectedDistribution] = useState<(typeof distributionData)[0] | null>(null)
  const [updatedStatus, setUpdatedStatus] = useState("")

  const handleStatusUpdate = (id: string, newStatus: string) => {
    console.log("[v0] Distribution", id, "status updated to", newStatus)
    setSelectedDistribution(null)
  }

  return (
    <DashboardLayout menuItems={menuItems} role="Mess Manager" userName="Manager">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/mess-manager" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Manage Distribution</h2>
            <p className="text-muted-foreground mt-1">Track and manage food distribution to NGOs</p>
          </div>
        </div>

        <DataTable
          columns={[
            { key: "item", label: "Item", sortable: true },
            { key: "quantity", label: "Quantity", sortable: false },
            { key: "ngo", label: "NGO", sortable: true },
            { key: "status", label: "Status", sortable: true },
            { key: "date", label: "Date", sortable: true },
          ]}
          data={distributionData}
          actions={(row) => (
            <button
              onClick={() => setSelectedDistribution(row as (typeof distributionData)[0])}
              className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition"
            >
              Update
            </button>
          )}
        />

        {selectedDistribution && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Update Distribution</h3>
                <button
                  onClick={() => setSelectedDistribution(null)}
                  className="p-1 hover:bg-muted rounded transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Item</p>
                  <p className="font-semibold text-foreground">{selectedDistribution.item}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-semibold text-foreground">{selectedDistribution.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">NGO</p>
                  <p className="font-semibold text-foreground">{selectedDistribution.ngo}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Update Status</label>
                  <select
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                    className="w-full mt-2 px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="">Select Status</option>
                    
                    <option value="Distributed">Distributed</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleStatusUpdate(selectedDistribution.id, updatedStatus)}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
                >
                  Update
                </button>
                <button
                  onClick={() => setSelectedDistribution(null)}
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
