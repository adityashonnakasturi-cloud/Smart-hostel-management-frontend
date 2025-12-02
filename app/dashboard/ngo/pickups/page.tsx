"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import DataTable from "@/components/dashboard/data-table"
import { ArrowLeft, X } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/ngo" },
  { icon: "📦", label: "Pickups", href: "/dashboard/ngo/pickups" },
]

const pickupData = [
  {
    id: "1",
    item: "Rice",
    quantity: "5kg",
    scheduledDate: "2025-11-03",
    pickupTime: "10:00 AM",
    location: "Main Store",
    status: "Scheduled",
    contact: "9876543210",
  },
  {
    id: "2",
    item: "Dal",
    quantity: "2kg",
    scheduledDate: "2025-11-04",
    pickupTime: "2:00 PM",
    location: "Storage Room",
    status: "Scheduled",
    contact: "9876543210",
  },
  {
    id: "3",
    item: "Bread",
    quantity: "30pcs",
    scheduledDate: "2025-11-02",
    pickupTime: "8:00 AM",
    location: "Bakery",
    status: "Completed",
    contact: "9876543210",
  },
]

export default function PickupsPage() {
  const [selectedPickup, setSelectedPickup] = useState<(typeof pickupData)[0] | null>(null)

  return (
    <DashboardLayout menuItems={menuItems} role="NGO" userName="NGO Representative">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/ngo" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">My Pickups</h2>
            <p className="text-muted-foreground mt-1">Track scheduled and completed food pickups</p>
          </div>
        </div>

        <DataTable
          columns={[
            { key: "item", label: "Item", sortable: true },
            { key: "quantity", label: "Quantity", sortable: false },
            { key: "scheduledDate", label: "Date", sortable: true },
            { key: "pickupTime", label: "Time", sortable: false },
            { key: "status", label: "Status", sortable: true },
          ]}
          data={pickupData}
          actions={(row) => (
            <button
              onClick={() => setSelectedPickup(row as (typeof pickupData)[0])}
              className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition"
            >
              Details
            </button>
          )}
        />

        {selectedPickup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Pickup Details</h3>
                <button
                  onClick={() => setSelectedPickup(null)}
                  className="p-1 hover:bg-muted rounded transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Item</p>
                  <p className="font-semibold text-foreground">{selectedPickup.item}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-semibold text-foreground">{selectedPickup.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled Date</p>
                  <p className="font-semibold text-foreground">{selectedPickup.scheduledDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Time</p>
                  <p className="font-semibold text-foreground">{selectedPickup.pickupTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">{selectedPickup.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-semibold text-foreground">{selectedPickup.contact}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPickup(null)}
                className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
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
