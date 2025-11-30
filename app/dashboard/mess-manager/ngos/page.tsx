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

const ngoData = [
  {
    id: "1",
    name: "Food for All",
    email: "contact@foodforall.org",
    phone: "9876543210",
    address: "123 Main St, City",
    status: "Active",
    contact: "Mr. Sharma",
  },
  {
    id: "2",
    name: "Community Kitchen",
    email: "info@communitykitchen.org",
    phone: "9876543211",
    address: "456 Oak Ave, Town",
    status: "Active",
    contact: "Ms. Patel",
  },
  {
    id: "3",
    name: "Hunger Relief Foundation",
    email: "help@hungerrelief.org",
    phone: "9876543212",
    address: "789 Pine Rd, Village",
    status: "Active",
    contact: "Dr. Kumar",
  },
]

export default function NgosPage() {
  const [selectedNgo, setSelectedNgo] = useState<(typeof ngoData)[0] | null>(null)
  const [ngoStatus, setNgoStatus] = useState("")

  const handleStatusChange = () => {
    if (selectedNgo) {
      setSelectedNgo({ ...selectedNgo, status: ngoStatus })
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} role="Mess Manager" userName="Manager">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/mess-manager" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">NGO Partners</h2>
            <p className="text-muted-foreground mt-1">Manage NGO organizations receiving food surplus</p>
          </div>
        </div>

        <DataTable
          columns={[
            { key: "name", label: "Organization", sortable: true },
            { key: "email", label: "Email", sortable: false },
            { key: "phone", label: "Phone", sortable: false },
            { key: "status", label: "Status", sortable: true },
          ]}
          data={ngoData}
          actions={(row) => (
            <button
              onClick={() => {
                setSelectedNgo(row as (typeof ngoData)[0])
                setNgoStatus((row as (typeof ngoData)[0]).status)
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition"
            >
              View Details
            </button>
          )}
        />

        {selectedNgo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">NGO Details</h3>
                <button
                  onClick={() => setSelectedNgo(null)}
                  className="p-1 hover:bg-muted rounded transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Organization Name</p>
                  <p className="font-semibold text-foreground">{selectedNgo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Person</p>
                  <p className="font-semibold text-foreground">{selectedNgo.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">{selectedNgo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-semibold text-foreground">{selectedNgo.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-semibold text-foreground">{selectedNgo.address}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Update Status</label>
                  <select
                    value={ngoStatus}
                    onChange={(e) => setNgoStatus(e.target.value)}
                    className="w-full mt-2 p-2 border border-border rounded bg-background text-foreground"
                  >
                    <option>Active</option>
                    
                    <option>Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleStatusChange}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
                >
                  Update Status
                </button>
                <button
                  onClick={() => setSelectedNgo(null)}
                  className="flex-1 py-2 border border-border rounded-lg hover:bg-muted transition font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
